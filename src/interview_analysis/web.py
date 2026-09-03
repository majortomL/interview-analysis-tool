from __future__ import annotations

import io
import json
import mimetypes
import os
import threading
import uuid
import zipfile
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
from typing import Any

from flask import Flask, jsonify, request, send_file

from interview_analysis import __version__
from interview_analysis.storage import Conflict, InvalidData, NotFound, ProjectStore, StorageError, utc_now
from interview_analysis.transcription import transcribe_interview


def create_app(data_dir: Path | str | None = None) -> Flask:
    static_dir = Path(__file__).with_name("static")
    app = Flask(__name__, static_folder=str(static_dir), static_url_path="")
    root = Path(data_dir or os.environ.get("INTERVIEW_ANALYSIS_DATA_DIR", "data"))
    app.config.update(
        MAX_CONTENT_LENGTH=int(os.environ.get("INTERVIEW_ANALYSIS_MAX_UPLOAD_MB", "2048")) * 1024 * 1024,
        STORE=ProjectStore(root),
        JOBS={},
        JOBS_LOCK=threading.Lock(),
        EXECUTOR=ThreadPoolExecutor(max_workers=int(os.environ.get("INTERVIEW_ANALYSIS_WORKERS", "1"))),
    )

    @app.after_request
    def security_headers(response):
        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["X-Frame-Options"] = "DENY"
        response.headers["Referrer-Policy"] = "no-referrer"
        response.headers["Content-Security-Policy"] = (
            "default-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self'; "
            "img-src 'self' data:; media-src 'self'; connect-src 'self'; frame-ancestors 'none'"
        )
        if request.path.startswith("/api/"):
            response.headers["Cache-Control"] = "no-store"
        return response

    @app.errorhandler(StorageError)
    def storage_error(error: StorageError):
        status = 404 if isinstance(error, NotFound) else 409 if isinstance(error, Conflict) else 400
        return jsonify({"error": str(error)}), status

    @app.errorhandler(413)
    def upload_too_large(_error):
        return jsonify({"error": "upload exceeds the configured size limit"}), 413

    @app.get("/")
    def index():
        return app.send_static_file("index.html")

    @app.get("/api/health")
    def health():
        return jsonify({"status": "ok", "version": __version__})

    @app.get("/api/projects")
    def list_projects():
        return jsonify(store().list_projects())

    @app.post("/api/projects")
    def create_project_route():
        payload = request.get_json(silent=True) or {}
        return jsonify(store().create_project(payload.get("name", ""), payload.get("language", "de"))), 201

    @app.get("/api/projects/<project_id>")
    def get_project_route(project_id: str):
        return jsonify(store().get_project(project_id))

    @app.patch("/api/projects/<project_id>/settings")
    def update_settings_route(project_id: str):
        return jsonify(store().update_settings(project_id, request.get_json(silent=True)))

    @app.post("/api/projects/<project_id>/interviews")
    def add_interviews(project_id: str):
        store().get_project(project_id)
        uploads = request.files.getlist("audio")
        if not uploads:
            raise InvalidData("at least one audio file is required")
        records = [store().add_interview(project_id, upload) for upload in uploads]
        return jsonify(records), 201

    @app.get("/api/projects/<project_id>/interviews/<interview_id>/audio")
    def audio(project_id: str, interview_id: str):
        path = store().playable_audio_path(project_id, interview_id)
        mimetype = mimetypes.guess_type(path.name)[0] or "application/octet-stream"
        return send_file(path, mimetype=mimetype, conditional=True)

    @app.get("/api/projects/<project_id>/interviews/<interview_id>/transcript")
    def transcript(project_id: str, interview_id: str):
        return jsonify(store().get_transcript(project_id, interview_id))

    @app.put("/api/projects/<project_id>/interviews/<interview_id>/transcript")
    def save_transcript(project_id: str, interview_id: str):
        return jsonify(
            store().save_reviewed_transcript(project_id, interview_id, request.get_json(silent=True))
        )

    @app.post("/api/projects/<project_id>/interviews/<interview_id>/transcribe")
    def start_transcription(project_id: str, interview_id: str):
        store().source_audio_path(project_id, interview_id)
        if store().transcript_path(project_id, interview_id).exists():
            store().ensure_transcript_replaceable(project_id, interview_id)
        with app.config["JOBS_LOCK"]:
            for existing in app.config["JOBS"].values():
                if (
                    existing["project_id"] == project_id
                    and existing["interview_id"] == interview_id
                    and existing["status"] in {"queued", "running"}
                ):
                    return jsonify(existing), 202
            job_id = f"job-{uuid.uuid4()}"
            job = {
                "id": job_id,
                "project_id": project_id,
                "interview_id": interview_id,
                "status": "queued",
                "stage": "queued",
                "percent": 0,
                "message": "Wartet auf Verarbeitung",
                "error": None,
                "created_at": utc_now(),
                "updated_at": utc_now(),
            }
            app.config["JOBS"][job_id] = job
        store().update_interview(project_id, interview_id, status="queued", error=None)
        app.config["EXECUTOR"].submit(run_job, app, job_id)
        return jsonify(job), 202

    @app.get("/api/jobs/<job_id>")
    def get_job(job_id: str):
        with app.config["JOBS_LOCK"]:
            job = app.config["JOBS"].get(job_id)
            if not job:
                raise NotFound("unknown transcription job")
            return jsonify(job.copy())

    @app.get("/api/projects/<project_id>/analysis")
    def analysis(project_id: str):
        return jsonify(store().get_analysis(project_id))

    @app.put("/api/projects/<project_id>/analysis")
    def save_analysis(project_id: str):
        return jsonify(store().save_analysis(project_id, request.get_json(silent=True)))

    @app.get("/api/projects/<project_id>/ai-bundle.json")
    def ai_bundle(project_id: str):
        payload = build_ai_bundle(store(), project_id)
        buffer = io.BytesIO(json.dumps(payload, ensure_ascii=False, indent=2).encode("utf-8"))
        return send_file(
            buffer,
            mimetype="application/json",
            as_attachment=True,
            download_name="ai-precode-input.json",
        )

    @app.get("/api/projects/<project_id>/export.zip")
    def export_project(project_id: str):
        include_media = request.args.get("include_media") == "1"
        return export_archive(store(), project_id, include_media)

    return app


def store_from_app(app: Flask) -> ProjectStore:
    return app.config["STORE"]


def store() -> ProjectStore:
    from flask import current_app

    return store_from_app(current_app)


def update_job(app: Flask, job_id: str, **changes: Any) -> None:
    with app.config["JOBS_LOCK"]:
        job = app.config["JOBS"][job_id]
        job.update(changes)
        job["updated_at"] = utc_now()


def run_job(app: Flask, job_id: str) -> None:
    with app.app_context():
        with app.config["JOBS_LOCK"]:
            job = app.config["JOBS"][job_id].copy()
        update_job(app, job_id, status="running")

        def progress(**changes: Any) -> None:
            update_job(app, job_id, status="running", **changes)

        try:
            transcribe_interview(
                store_from_app(app),
                job["project_id"],
                job["interview_id"],
                progress=progress,
            )
            update_job(app, job_id, status="done", stage="done", percent=100)
        except Exception as exc:  # background boundary: persist a user-visible error
            message = str(exc)[:1_000] or exc.__class__.__name__
            update_job(app, job_id, status="failed", stage="failed", message=message, error=message)
            store_from_app(app).update_interview(
                job["project_id"], job["interview_id"], status="failed", error=message
            )


def build_ai_bundle(project_store: ProjectStore, project_id: str) -> dict[str, Any]:
    project = project_store.get_project(project_id)
    corpus = []
    for interview in project.get("interviews", []):
        if interview.get("status") != "reviewed":
            continue
        try:
            transcript = project_store.get_transcript(project_id, interview["id"])
        except NotFound:
            continue
        segments = [
            {
                "segment_id": segment["id"],
                "speaker": segment["speaker"],
                "text": segment["text"],
            }
            for segment in transcript.get("segments", [])
            if segment.get("reviewed") and not segment.get("deleted") and segment.get("text", "").strip()
        ]
        corpus.append({"interview_id": interview["id"], "name": interview["name"], "segments": segments})
    return {
        "schema_version": 1,
        "purpose": "Provisional coding suggestions for reflexive thematic analysis",
        "privacy_warning": (
            "This file contains interview text. Upload it to an external service only when your consent, "
            "data-protection basis, and institutional policy permit that transfer."
        ),
        "instructions": [
            "Read the complete corpus before suggesting codes.",
            "Use an inductive, reflexive thematic analysis orientation.",
            "Return JSON only and follow output_schema exactly.",
            "Every quote must be an exact contiguous substring of the referenced segment text.",
            "Suggestions are provisional and must be reviewed by the researcher.",
        ],
        "output_schema": {
            "codes": [{"name": "string", "description": "string", "color": "#RRGGBB"}],
            "themes": [{"name": "string", "description": "string", "code_names": ["string"]}],
            "codings": [
                {
                    "interview_id": "string",
                    "segment_id": "string",
                    "quote": "exact substring",
                    "code_names": ["string"],
                    "rationale": "string",
                }
            ],
        },
        "corpus": corpus,
    }


def export_archive(project_store: ProjectStore, project_id: str, include_media: bool):
    project = project_store.get_project(project_id)
    project_dir = project_store.project_dir(project_id)
    buffer = io.BytesIO()
    with zipfile.ZipFile(buffer, "w", compression=zipfile.ZIP_DEFLATED) as archive:
        for path in project_dir.rglob("*"):
            if not path.is_file() or ("backups" in path.parts and not include_media):
                continue
            relative = path.relative_to(project_dir)
            if not include_media and (
                relative.name.startswith("source.") or relative.name == "audio_16k.wav"
            ):
                continue
            archive.write(path, relative.as_posix())
        archive.writestr(
            "EXPORT-INFO.json",
            json.dumps(
                {
                    "tool_version": __version__,
                    "exported_at": utc_now(),
                    "project_id": project_id,
                    "project_name": project.get("name"),
                    "includes_media": include_media,
                },
                ensure_ascii=False,
                indent=2,
            ),
        )
    buffer.seek(0)
    safe_name = "".join(
        character if character.isalnum() or character in "-_" else "-" for character in project["name"]
    )
    return send_file(
        buffer,
        mimetype="application/zip",
        as_attachment=True,
        download_name=f"{safe_name or 'interview-project'}.zip",
    )
