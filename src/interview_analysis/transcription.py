from __future__ import annotations

import importlib.metadata
import importlib.util
import os
import shutil
import subprocess
import sys
import threading
import wave
from collections.abc import Callable
from pathlib import Path
from typing import Any

from interview_analysis.storage import InvalidData, ProjectStore, new_id, utc_now

_MODEL_CACHE: dict[tuple[str, str, str], Any] = {}
_MODEL_LOCK = threading.Lock()


def _register_nvidia_dll_dirs() -> None:
    if sys.platform != "win32":
        return
    for package in ("nvidia.cublas", "nvidia.cudnn"):
        spec = importlib.util.find_spec(package)
        if not spec or not spec.submodule_search_locations:
            continue
        for location in spec.submodule_search_locations:
            bin_dir = os.path.join(location, "bin")
            if os.path.isdir(bin_dir):
                os.add_dll_directory(bin_dir)


def _resolve_device(requested: str) -> str:
    if requested and requested != "auto":
        return requested
    try:
        import ctranslate2

        return "cuda" if ctranslate2.get_cuda_device_count() > 0 else "cpu"
    except (ImportError, RuntimeError):
        return "cpu"


def _resolve_compute_type(requested: str, device: str) -> str:
    if requested and requested != "auto":
        return requested
    return "float16" if device == "cuda" else "int8"


def _load_model(name: str, device: str, compute_type: str) -> Any:
    _register_nvidia_dll_dirs()
    try:
        from faster_whisper import WhisperModel
    except ImportError as exc:
        raise RuntimeError(
            "Transcription support is not installed. Install interview-analysis-tool[asr]."
        ) from exc
    key = (name, device, compute_type)
    with _MODEL_LOCK:
        if key not in _MODEL_CACHE:
            _MODEL_CACHE[key] = WhisperModel(name, device=device, compute_type=compute_type)
        return _MODEL_CACHE[key]


def _prepare_audio(source: Path, destination: Path) -> None:
    if shutil.which("ffmpeg") is None:
        raise RuntimeError("ffmpeg was not found on PATH")
    destination.parent.mkdir(parents=True, exist_ok=True)
    command = [
        "ffmpeg",
        "-hide_banner",
        "-loglevel",
        "error",
        "-y",
        "-i",
        str(source),
        "-af",
        "loudnorm=I=-16:TP=-1.5:LRA=11,afftdn=nf=-25",
        "-ar",
        "16000",
        "-ac",
        "1",
        str(destination),
    ]
    try:
        subprocess.run(command, check=True, capture_output=True, text=True)
    except subprocess.CalledProcessError as exc:
        detail = (exc.stderr or "ffmpeg failed").strip()[-1_000:]
        raise RuntimeError(detail) from exc


def _audio_duration(path: Path) -> float:
    with wave.open(str(path), "rb") as audio:
        return audio.getnframes() / audio.getframerate()


def _load_diarization(enabled: bool) -> Any | None:
    if not enabled:
        return None
    token = os.environ.get("HF_TOKEN")
    if not token:
        raise RuntimeError("HF_TOKEN is required when speaker diarization is enabled")
    try:
        from pyannote.audio import Pipeline
    except ImportError as exc:
        raise RuntimeError(
            "Diarization support is not installed. Install interview-analysis-tool[diarization]."
        ) from exc
    try:
        return Pipeline.from_pretrained("pyannote/speaker-diarization-3.1", token=token)
    except TypeError:
        return Pipeline.from_pretrained("pyannote/speaker-diarization-3.1", use_auth_token=token)


def _assign_speaker(diarization: Any | None, start: float, end: float) -> str | None:
    if diarization is None:
        return None
    best_label = None
    best_overlap = 0.0
    for turn, _, label in diarization.itertracks(yield_label=True):
        overlap = max(0.0, min(end, turn.end) - max(start, turn.start))
        if overlap > best_overlap:
            best_label = str(label)
            best_overlap = overlap
    return best_label


def transcribe_interview(
    store: ProjectStore,
    project_id: str,
    interview_id: str,
    progress: Callable[..., None] | None = None,
) -> dict[str, Any]:
    """Run preprocessing and ASR for one interview and persist its draft transcript."""

    project = store.get_project(project_id)
    settings = project.get("settings", {})
    model_name = str(settings.get("model") or "small")
    device = _resolve_device(str(settings.get("device") or "auto"))
    compute_type = _resolve_compute_type(str(settings.get("compute_type") or "auto"), device)
    language = str(settings.get("language") or "auto")
    language_arg = None if language == "auto" else language
    initial_prompt = str(settings.get("initial_prompt") or "").strip() or None

    if not model_name or len(model_name) > 200:
        raise InvalidData("invalid model name")

    source = store.source_audio_path(project_id, interview_id)
    interview_dir = store.project_dir(project_id) / "interviews" / interview_id
    prepared = interview_dir / "audio_16k.wav"
    if progress:
        progress(stage="preparing", percent=2, message="Audio wird vorbereitet")
    _prepare_audio(source, prepared)
    duration = _audio_duration(prepared)
    store.update_interview(project_id, interview_id, duration_seconds=duration, status="transcribing")

    if progress:
        progress(stage="loading_model", percent=5, message=f"Modell {model_name} wird geladen")
    model = _load_model(model_name, device, compute_type)
    diarization_pipeline = _load_diarization(bool(settings.get("diarize", False)))
    diarization = None
    if diarization_pipeline is not None:
        if progress:
            progress(stage="diarizing", percent=8, message="Sprecher werden unterschieden")
        diarization = diarization_pipeline(str(prepared))

    segments, info = model.transcribe(
        str(prepared),
        language=language_arg,
        vad_filter=True,
        word_timestamps=False,
        initial_prompt=initial_prompt,
    )
    output = []
    for segment in segments:
        start, end = float(segment.start), float(segment.end)
        diarization_speaker = _assign_speaker(diarization, start, end)
        output.append(
            {
                "id": new_id("segment"),
                "start": round(start, 3),
                "end": round(end, 3),
                "text": segment.text.strip(),
                "asr_text": segment.text.strip(),
                "avg_logprob": segment.avg_logprob,
                "no_speech_prob": segment.no_speech_prob,
                "speaker": None,
                "diarization_speaker": diarization_speaker,
                "reviewed": False,
                "deleted": False,
            }
        )
        if progress and duration:
            percent = min(98, 10 + int(88 * end / duration))
            progress(stage="transcribing", percent=percent, message="Transkription läuft")

    transcript = {
        "schema_version": 1,
        "interview_id": interview_id,
        "revision": 0,
        "created_at": utc_now(),
        "updated_at": utc_now(),
        "transcription": {
            "engine": "faster-whisper",
            "engine_version": importlib.metadata.version("faster-whisper"),
            "model": model_name,
            "device": device,
            "compute_type": compute_type,
            "requested_language": language,
            "detected_language": info.language,
            "language_probability": info.language_probability,
            "vad_filter": True,
            "diarization": bool(diarization_pipeline),
        },
        "segments": output,
    }
    store.save_generated_transcript(project_id, interview_id, transcript)
    store.update_interview(project_id, interview_id, status="needs_review", error=None)
    if progress:
        progress(stage="done", percent=100, message="Transkription abgeschlossen")
    return transcript
