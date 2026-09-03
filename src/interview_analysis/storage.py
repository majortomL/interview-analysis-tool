from __future__ import annotations

import json
import os
import re
import shutil
import tempfile
import threading
import uuid
from collections.abc import Callable
from datetime import UTC, datetime
from pathlib import Path
from typing import Any

from werkzeug.datastructures import FileStorage
from werkzeug.utils import secure_filename

SCHEMA_VERSION = 1
ALLOWED_AUDIO_EXTENSIONS = {".mp3", ".m4a", ".wav", ".mp4", ".aac", ".flac", ".ogg"}
SAFE_ID = re.compile(r"^[a-zA-Z0-9_-]+$")
SPEAKERS = {None, "interviewer", "interviewee", "other"}


class StorageError(RuntimeError):
    pass


class NotFound(StorageError):
    pass


class Conflict(StorageError):
    pass


class InvalidData(StorageError):
    pass


def utc_now() -> str:
    return datetime.now(UTC).isoformat()


def new_id(prefix: str) -> str:
    return f"{prefix}-{uuid.uuid4()}"


def _require_id(value: str) -> str:
    if not isinstance(value, str) or not SAFE_ID.fullmatch(value):
        raise InvalidData("invalid identifier")
    return value


class ProjectStore:
    """Filesystem project store with atomic writes and optimistic revisions."""

    def __init__(self, root: Path):
        self.root = Path(root).expanduser().resolve()
        self.projects_dir = self.root / "projects"
        self.projects_dir.mkdir(parents=True, exist_ok=True)
        self._locks: dict[str, threading.RLock] = {}
        self._locks_guard = threading.Lock()
        self._recover_interrupted_jobs()

    def _recover_interrupted_jobs(self) -> None:
        """A process restart cannot resume an in-memory ASR job; make that state explicit."""
        for path in self.projects_dir.glob("*/project.json"):
            try:
                project = self.read_json(path)
            except StorageError:
                continue
            changed = False
            for interview in project.get("interviews", []):
                if interview.get("status") in {"queued", "transcribing"}:
                    interview["status"] = "failed"
                    interview["error"] = "Transcription was interrupted by an application restart."
                    interview["updated_at"] = utc_now()
                    changed = True
            if changed:
                project["updated_at"] = utc_now()
                self.write_json_atomic(path, project)

    def _lock(self, project_id: str) -> threading.RLock:
        with self._locks_guard:
            return self._locks.setdefault(project_id, threading.RLock())

    def project_dir(self, project_id: str) -> Path:
        _require_id(project_id)
        path = (self.projects_dir / project_id).resolve()
        if path.parent != self.projects_dir:
            raise InvalidData("invalid project path")
        return path

    def project_path(self, project_id: str) -> Path:
        return self.project_dir(project_id) / "project.json"

    def transcript_path(self, project_id: str, interview_id: str) -> Path:
        _require_id(interview_id)
        return self.project_dir(project_id) / "interviews" / interview_id / "transcript.json"

    def analysis_path(self, project_id: str) -> Path:
        return self.project_dir(project_id) / "analysis.json"

    @staticmethod
    def read_json(path: Path) -> dict[str, Any]:
        try:
            with path.open(encoding="utf-8") as stream:
                payload = json.load(stream)
        except FileNotFoundError as exc:
            raise NotFound(f"missing file: {path.name}") from exc
        except json.JSONDecodeError as exc:
            raise InvalidData(f"invalid JSON in {path.name}") from exc
        if not isinstance(payload, dict):
            raise InvalidData(f"{path.name} must contain a JSON object")
        return payload

    @staticmethod
    def write_json_atomic(path: Path, payload: dict[str, Any]) -> None:
        path.parent.mkdir(parents=True, exist_ok=True)
        handle, temp_name = tempfile.mkstemp(prefix=f".{path.name}.", suffix=".tmp", dir=path.parent)
        try:
            with os.fdopen(handle, "w", encoding="utf-8", newline="\n") as stream:
                json.dump(payload, stream, ensure_ascii=False, indent=2)
                stream.write("\n")
                stream.flush()
                os.fsync(stream.fileno())
            os.replace(temp_name, path)
        finally:
            if os.path.exists(temp_name):
                os.unlink(temp_name)

    @staticmethod
    def _backup(path: Path, keep: int = 30) -> None:
        if not path.exists():
            return
        backup_dir = path.parent / "backups"
        backup_dir.mkdir(parents=True, exist_ok=True)
        stamp = datetime.now().strftime("%Y%m%d-%H%M%S-%f")
        shutil.copy2(path, backup_dir / f"{path.stem}-{stamp}.json")
        backups = sorted(backup_dir.glob(f"{path.stem}-*.json"), reverse=True)
        for stale in backups[keep:]:
            stale.unlink()

    def create_project(self, name: str, language: str = "de") -> dict[str, Any]:
        clean_name = str(name or "").strip()
        if not clean_name or len(clean_name) > 120:
            raise InvalidData("project name must contain 1 to 120 characters")
        clean_language = str(language or "auto").strip().lower()
        if not re.fullmatch(r"auto|[a-z]{2,3}(?:-[a-z0-9]+)?", clean_language):
            raise InvalidData("language must be 'auto' or a language code such as 'de' or 'en'")

        project_id = new_id("project")
        now = utc_now()
        payload = {
            "schema_version": SCHEMA_VERSION,
            "id": project_id,
            "name": clean_name,
            "created_at": now,
            "updated_at": now,
            "settings": {
                "language": clean_language,
                "model": "small",
                "device": "auto",
                "compute_type": "auto",
                "initial_prompt": "",
                "diarize": False,
            },
            "interviews": [],
        }
        project_dir = self.project_dir(project_id)
        project_dir.mkdir(parents=True)
        self.write_json_atomic(self.project_path(project_id), payload)
        self.write_json_atomic(self.analysis_path(project_id), self.empty_analysis(project_id))
        return payload

    @staticmethod
    def empty_analysis(project_id: str) -> dict[str, Any]:
        return {
            "schema_version": SCHEMA_VERSION,
            "project_id": project_id,
            "revision": 0,
            "updated_at": utc_now(),
            "research_question": "",
            "reflexive_memo": "",
            "codes": [],
            "themes": [],
            "codings": [],
            "suggestions": [],
            "interview_notes": {},
        }

    def list_projects(self) -> list[dict[str, Any]]:
        projects = []
        for path in self.projects_dir.glob("*/project.json"):
            try:
                project = self.read_json(path)
            except StorageError:
                continue
            projects.append(
                {
                    "id": project.get("id"),
                    "name": project.get("name"),
                    "updated_at": project.get("updated_at"),
                    "interview_count": len(project.get("interviews", [])),
                }
            )
        return sorted(projects, key=lambda item: item.get("updated_at") or "", reverse=True)

    def get_project(self, project_id: str) -> dict[str, Any]:
        project = self.read_json(self.project_path(project_id))
        if project.get("id") != project_id:
            raise InvalidData("project identifier does not match its directory")
        return project

    def mutate_project(self, project_id: str, callback: Callable[[dict[str, Any]], None]) -> dict[str, Any]:
        with self._lock(project_id):
            path = self.project_path(project_id)
            project = self.read_json(path)
            callback(project)
            project["updated_at"] = utc_now()
            self._backup(path)
            self.write_json_atomic(path, project)
            return project

    def update_settings(self, project_id: str, incoming: object) -> dict[str, Any]:
        if not isinstance(incoming, dict):
            raise InvalidData("settings must be a JSON object")
        allowed = {"language", "model", "device", "compute_type", "initial_prompt", "diarize"}

        def update(project: dict[str, Any]) -> None:
            settings = project.setdefault("settings", {})
            for key in allowed:
                if key in incoming:
                    settings[key] = incoming[key]
            for key in ("language", "model", "device", "compute_type", "initial_prompt"):
                settings[key] = str(settings.get(key, "")).strip()
            settings["diarize"] = bool(settings.get("diarize", False))
            if len(settings["initial_prompt"]) > 4_000:
                raise InvalidData("initial prompt is too long")
            if not re.fullmatch(r"auto|[a-z]{2,3}(?:-[a-z0-9]+)?", settings["language"]):
                raise InvalidData("invalid language setting")
            if settings["device"] not in {"auto", "cpu", "cuda"}:
                raise InvalidData("device must be auto, cpu, or cuda")
            if settings["compute_type"] not in {"auto", "int8", "float16", "float32"}:
                raise InvalidData("unsupported compute type")
            if not settings["model"] or len(settings["model"]) > 200:
                raise InvalidData("invalid model name")

        return self.mutate_project(project_id, update)

    def add_interview(self, project_id: str, upload: FileStorage) -> dict[str, Any]:
        original_name = secure_filename(upload.filename or "")
        suffix = Path(original_name).suffix.lower()
        if suffix not in ALLOWED_AUDIO_EXTENSIONS:
            allowed = ", ".join(sorted(ALLOWED_AUDIO_EXTENSIONS))
            raise InvalidData(f"unsupported audio format; allowed: {allowed}")

        interview_id = new_id("interview")
        interview_dir = self.project_dir(project_id) / "interviews" / interview_id
        interview_dir.mkdir(parents=True)
        media_name = f"source{suffix}"
        upload.save(interview_dir / media_name)
        now = utc_now()
        record = {
            "id": interview_id,
            "name": Path(original_name).stem[:120] or interview_id,
            "source_filename": original_name,
            "media_filename": media_name,
            "status": "uploaded",
            "created_at": now,
            "updated_at": now,
            "duration_seconds": None,
            "error": None,
        }

        def add(project: dict[str, Any]) -> None:
            project.setdefault("interviews", []).append(record)

        try:
            self.mutate_project(project_id, add)
        except Exception:
            shutil.rmtree(interview_dir, ignore_errors=True)
            raise
        return record

    def find_interview(self, project_id: str, interview_id: str) -> dict[str, Any]:
        project = self.get_project(project_id)
        for interview in project.get("interviews", []):
            if interview.get("id") == interview_id:
                return interview
        raise NotFound("unknown interview")

    def update_interview(self, project_id: str, interview_id: str, **changes: Any) -> dict[str, Any]:
        found: dict[str, Any] | None = None

        def update(project: dict[str, Any]) -> None:
            nonlocal found
            for interview in project.get("interviews", []):
                if interview.get("id") == interview_id:
                    interview.update(changes)
                    interview["updated_at"] = utc_now()
                    found = interview
                    return
            raise NotFound("unknown interview")

        self.mutate_project(project_id, update)
        assert found is not None
        return found

    def source_audio_path(self, project_id: str, interview_id: str) -> Path:
        interview = self.find_interview(project_id, interview_id)
        path = self.project_dir(project_id) / "interviews" / interview_id / interview["media_filename"]
        if not path.is_file():
            raise NotFound("audio file is missing")
        return path

    def playable_audio_path(self, project_id: str, interview_id: str) -> Path:
        interview_dir = self.project_dir(project_id) / "interviews" / _require_id(interview_id)
        prepared = interview_dir / "audio_16k.wav"
        return prepared if prepared.is_file() else self.source_audio_path(project_id, interview_id)

    def get_transcript(self, project_id: str, interview_id: str) -> dict[str, Any]:
        self.find_interview(project_id, interview_id)
        return self.read_json(self.transcript_path(project_id, interview_id))

    def save_generated_transcript(
        self, project_id: str, interview_id: str, transcript: dict[str, Any]
    ) -> dict[str, Any]:
        path = self.transcript_path(project_id, interview_id)
        with self._lock(project_id):
            if path.exists():
                self.ensure_transcript_replaceable(project_id, interview_id)
                self._backup(path)
            self.write_json_atomic(path, transcript)
        return transcript

    def ensure_transcript_replaceable(self, project_id: str, interview_id: str) -> None:
        """Protect analysis references before a transcript is replaced."""
        path = self.analysis_path(project_id)
        if not path.exists():
            return
        analysis = self.read_json(path)
        if any(
            item.get("interview_id") == interview_id
            for item in [*analysis.get("codings", []), *analysis.get("suggestions", [])]
        ):
            raise Conflict(
                "this transcript is referenced by codings or AI suggestions; "
                "remove those references before transcribing it again"
            )

    def save_reviewed_transcript(self, project_id: str, interview_id: str, payload: object) -> dict[str, Any]:
        if not isinstance(payload, dict) or not isinstance(payload.get("segments"), list):
            raise InvalidData("expected an object containing a segments array")
        path = self.transcript_path(project_id, interview_id)
        with self._lock(project_id):
            current = self.read_json(path)
            expected = payload.get("revision")
            if not isinstance(expected, int) or expected != current.get("revision", 0):
                raise Conflict("the transcript changed in another browser; reload before saving")
            original_by_id = {segment.get("id"): segment for segment in current.get("segments", [])}
            normalized = []
            seen_ids: set[str] = set()
            for raw in payload["segments"]:
                if not isinstance(raw, dict):
                    raise InvalidData("every segment must be an object")
                segment_id = str(raw.get("id") or "")
                if not SAFE_ID.fullmatch(segment_id) or segment_id in seen_ids:
                    raise InvalidData("segment identifiers must be unique and safe")
                seen_ids.add(segment_id)
                try:
                    start = float(raw.get("start"))
                    end = float(raw.get("end"))
                except (TypeError, ValueError) as exc:
                    raise InvalidData("segment times must be numbers") from exc
                if start < 0 or end < start:
                    raise InvalidData("segment times are invalid")
                speaker = raw.get("speaker")
                if speaker not in SPEAKERS:
                    raise InvalidData("unknown speaker role")
                text = str(raw.get("text", ""))
                if len(text) > 100_000:
                    raise InvalidData("segment text is too long")
                original = original_by_id.get(segment_id, {})
                normalized.append(
                    {
                        "id": segment_id,
                        "start": round(start, 3),
                        "end": round(end, 3),
                        "text": text,
                        "asr_text": str(original.get("asr_text", raw.get("asr_text", text))),
                        "avg_logprob": original.get("avg_logprob"),
                        "no_speech_prob": original.get("no_speech_prob"),
                        "speaker": speaker,
                        "diarization_speaker": original.get("diarization_speaker"),
                        "reviewed": bool(raw.get("reviewed", False)),
                        "deleted": bool(raw.get("deleted", False)),
                    }
                )
            missing_originals = set(original_by_id) - seen_ids
            if missing_originals:
                raise InvalidData("segments cannot be removed; mark them as deleted instead")

            analysis_path = self.analysis_path(project_id)
            if analysis_path.exists():
                analysis = self.read_json(analysis_path)
                referenced_ids = {
                    item.get("segment_id")
                    for item in [*analysis.get("codings", []), *analysis.get("suggestions", [])]
                    if item.get("interview_id") == interview_id
                }
                changed_references = [
                    segment["id"]
                    for segment in normalized
                    if segment["id"] in referenced_ids
                    and (
                        segment["deleted"]
                        or segment["text"] != str(original_by_id[segment["id"]].get("text", ""))
                    )
                ]
                if changed_references:
                    raise Conflict(
                        "this edit would invalidate existing codings or AI suggestions; "
                        "remove those references in the analysis first"
                    )
            current["segments"] = normalized
            current["revision"] = expected + 1
            current["updated_at"] = utc_now()
            self._backup(path)
            self.write_json_atomic(path, current)

        active = [segment for segment in normalized if not segment["deleted"]]
        complete = bool(active) and all(
            segment["reviewed"] and segment["speaker"] in {"interviewer", "interviewee", "other"}
            for segment in active
        )
        self.update_interview(
            project_id,
            interview_id,
            status="reviewed" if complete else "reviewing",
            error=None,
        )
        return current

    def get_analysis(self, project_id: str) -> dict[str, Any]:
        self.get_project(project_id)
        path = self.analysis_path(project_id)
        if not path.exists():
            self.write_json_atomic(path, self.empty_analysis(project_id))
        return self.read_json(path)

    def save_analysis(self, project_id: str, payload: object) -> dict[str, Any]:
        if not isinstance(payload, dict):
            raise InvalidData("analysis must be a JSON object")
        with self._lock(project_id):
            path = self.analysis_path(project_id)
            current = self.get_analysis(project_id)
            expected = payload.get("revision")
            if not isinstance(expected, int) or expected != current.get("revision", 0):
                raise Conflict("the analysis changed in another browser; reload before saving")
            normalized = validate_analysis(project_id, payload)
            self._validate_analysis_targets(project_id, normalized)
            normalized["revision"] = expected + 1
            normalized["updated_at"] = utc_now()
            self._backup(path)
            self.write_json_atomic(path, normalized)
            return normalized

    def _validate_analysis_targets(self, project_id: str, analysis: dict[str, Any]) -> None:
        transcript_cache: dict[str, dict[str, Any]] = {}
        for item in [*analysis.get("codings", []), *analysis.get("suggestions", [])]:
            interview_id = item["interview_id"]
            if interview_id not in transcript_cache:
                transcript_cache[interview_id] = self.get_transcript(project_id, interview_id)
            segments = {
                segment.get("id"): segment for segment in transcript_cache[interview_id].get("segments", [])
            }
            segment = segments.get(item["segment_id"])
            if not segment or segment.get("deleted") or not segment.get("reviewed"):
                raise InvalidData("a coding references an unavailable or unreviewed segment")
            quote = str(item.get("quote", ""))
            if not quote:
                raise InvalidData("coding quotes cannot be empty")
            text = str(segment.get("text", ""))
            valid_starts = utf16_occurrences(text, quote)
            if item["start"] not in valid_starts or item["end"] != item["start"] + utf16_length(quote):
                raise InvalidData("a coding quote no longer matches its segment offsets")


def validate_analysis(project_id: str, payload: dict[str, Any]) -> dict[str, Any]:
    for field in ("codes", "themes", "codings", "suggestions"):
        if not isinstance(payload.get(field, []), list):
            raise InvalidData(f"{field} must be an array")
    if not isinstance(payload.get("interview_notes", {}), dict):
        raise InvalidData("interview_notes must be an object")

    codes = payload.get("codes", [])
    code_ids: set[str] = set()
    for code in codes:
        if not isinstance(code, dict) or not SAFE_ID.fullmatch(str(code.get("id", ""))):
            raise InvalidData("every code requires a safe identifier")
        if code["id"] in code_ids or not str(code.get("name", "")).strip():
            raise InvalidData("code identifiers must be unique and code names cannot be empty")
        if not isinstance(code.get("name"), str) or not isinstance(code.get("description", ""), str):
            raise InvalidData("code names and descriptions must be strings")
        if not re.fullmatch(r"#[0-9a-fA-F]{6}", str(code.get("color", ""))):
            raise InvalidData("code colors must use #RRGGBB")
        code_ids.add(code["id"])

    themes = payload.get("themes", [])
    if any(not isinstance(theme, dict) or not isinstance(theme.get("id"), str) for theme in themes):
        raise InvalidData("every theme requires an identifier")
    theme_ids = {theme["id"] for theme in themes}
    if len(theme_ids) != len(themes) or any(not SAFE_ID.fullmatch(value) for value in theme_ids):
        raise InvalidData("theme identifiers must be unique and safe")
    for theme in themes:
        if not isinstance(theme.get("name"), str) or not theme["name"].strip():
            raise InvalidData("theme names cannot be empty")
        if not isinstance(theme.get("description", ""), str) or not isinstance(
            theme.get("code_ids", []), list
        ):
            raise InvalidData("theme descriptions must be strings and code_ids must be an array")
        if theme.get("parent_id") and theme["parent_id"] not in theme_ids:
            raise InvalidData("theme parent does not exist")
        if any(code_id not in code_ids for code_id in theme.get("code_ids", [])):
            raise InvalidData("theme references an unknown code")

    coding_ids: set[str] = set()
    for coding in payload.get("codings", []):
        if not isinstance(coding, dict) or not SAFE_ID.fullmatch(str(coding.get("id", ""))):
            raise InvalidData("every coding requires a safe identifier")
        if coding["id"] in coding_ids or coding.get("code_id") not in code_ids:
            raise InvalidData("coding identifiers must be unique and reference an existing code")
        if not SAFE_ID.fullmatch(str(coding.get("interview_id", ""))) or not SAFE_ID.fullmatch(
            str(coding.get("segment_id", ""))
        ):
            raise InvalidData("coding target is invalid")
        if not isinstance(coding.get("start"), int) or not isinstance(coding.get("end"), int):
            raise InvalidData("coding offsets must be integers")
        start, end = coding["start"], coding["end"]
        if start < 0 or end <= start:
            raise InvalidData("coding offsets are invalid")
        if not isinstance(coding.get("quote"), str) or not coding["quote"]:
            raise InvalidData("coding quotes must be non-empty strings")
        coding_ids.add(coding["id"])

    suggestion_ids: set[str] = set()
    for suggestion in payload.get("suggestions", []):
        if not isinstance(suggestion, dict) or not SAFE_ID.fullmatch(str(suggestion.get("id", ""))):
            raise InvalidData("every suggestion requires a safe identifier")
        if suggestion["id"] in suggestion_ids or suggestion.get("code_id") not in code_ids:
            raise InvalidData("suggestions must be unique and reference an existing code")
        if not SAFE_ID.fullmatch(str(suggestion.get("interview_id", ""))) or not SAFE_ID.fullmatch(
            str(suggestion.get("segment_id", ""))
        ):
            raise InvalidData("suggestion target is invalid")
        if not isinstance(suggestion.get("start"), int) or not isinstance(suggestion.get("end"), int):
            raise InvalidData("suggestion offsets must be integers")
        start, end = suggestion["start"], suggestion["end"]
        if start < 0 or end <= start:
            raise InvalidData("suggestion offsets are invalid")
        if not isinstance(suggestion.get("quote"), str) or not suggestion["quote"]:
            raise InvalidData("suggestion quotes must be non-empty strings")
        suggestion_ids.add(suggestion["id"])

    return {
        "schema_version": SCHEMA_VERSION,
        "project_id": project_id,
        "revision": payload.get("revision", 0),
        "updated_at": utc_now(),
        "research_question": str(payload.get("research_question", ""))[:10_000],
        "reflexive_memo": str(payload.get("reflexive_memo", ""))[:100_000],
        "codes": codes,
        "themes": themes,
        "codings": payload.get("codings", []),
        "suggestions": payload.get("suggestions", []),
        "interview_notes": payload.get("interview_notes", {}),
    }


def utf16_length(value: str) -> int:
    """Return the JavaScript/DOM string length used by browser selection offsets."""
    return len(value.encode("utf-16-le")) // 2


def utf16_occurrences(text: str, quote: str) -> set[int]:
    starts: set[int] = set()
    cursor = 0
    while True:
        position = text.find(quote, cursor)
        if position < 0:
            return starts
        starts.add(utf16_length(text[:position]))
        cursor = position + 1
