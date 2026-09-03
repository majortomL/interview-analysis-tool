from __future__ import annotations

import io

import pytest
from werkzeug.datastructures import FileStorage

from interview_analysis.storage import Conflict, InvalidData, ProjectStore, new_id, utc_now


def make_transcript(interview_id: str, text: str = "Hallo 👋 Welt") -> dict:
    return {
        "schema_version": 1,
        "interview_id": interview_id,
        "revision": 0,
        "created_at": utc_now(),
        "updated_at": utc_now(),
        "transcription": {"engine": "test"},
        "segments": [
            {
                "id": "segment-one",
                "start": 0,
                "end": 2,
                "text": text,
                "asr_text": text,
                "avg_logprob": -0.2,
                "no_speech_prob": 0.01,
                "speaker": None,
                "reviewed": False,
                "deleted": False,
            }
        ],
    }


def create_interview(store: ProjectStore) -> tuple[dict, dict]:
    project = store.create_project("Synthetic study", "de")
    upload = FileStorage(stream=io.BytesIO(b"synthetic audio placeholder"), filename="example.m4a")
    interview = store.add_interview(project["id"], upload)
    store.save_generated_transcript(project["id"], interview["id"], make_transcript(interview["id"]))
    store.update_interview(project["id"], interview["id"], status="needs_review")
    return project, interview


def test_project_and_review_lifecycle(tmp_path):
    store = ProjectStore(tmp_path)
    project, interview = create_interview(store)
    transcript = store.get_transcript(project["id"], interview["id"])
    segment = transcript["segments"][0]
    segment["speaker"] = "interviewee"
    segment["reviewed"] = True

    saved = store.save_reviewed_transcript(
        project["id"], interview["id"], {"revision": transcript["revision"], "segments": [segment]}
    )

    assert saved["revision"] == 1
    assert store.find_interview(project["id"], interview["id"])["status"] == "reviewed"
    assert list(store.transcript_path(project["id"], interview["id"]).parent.glob("backups/*.json"))

    with pytest.raises(Conflict):
        store.save_reviewed_transcript(project["id"], interview["id"], {"revision": 0, "segments": [segment]})


def test_analysis_validates_utf16_browser_offsets(tmp_path):
    store = ProjectStore(tmp_path)
    project, interview = create_interview(store)
    transcript = store.get_transcript(project["id"], interview["id"])
    segment = transcript["segments"][0]
    segment.update({"speaker": "interviewee", "reviewed": True})
    store.save_reviewed_transcript(project["id"], interview["id"], {"revision": 0, "segments": [segment]})

    analysis = store.get_analysis(project["id"])
    code_id = new_id("code")
    analysis["codes"] = [
        {"id": code_id, "name": "Greeting", "description": "", "color": "#7357c6", "origin": "manual"}
    ]
    # JavaScript counts the emoji as two UTF-16 code units: "Welt" starts at 9.
    analysis["codings"] = [
        {
            "id": new_id("coding"),
            "interview_id": interview["id"],
            "segment_id": "segment-one",
            "start": 9,
            "end": 13,
            "quote": "Welt",
            "code_id": code_id,
            "origin": "manual",
        }
    ]
    saved = store.save_analysis(project["id"], analysis)
    assert saved["revision"] == 1

    saved["codings"][0]["end"] = 12
    with pytest.raises(InvalidData):
        store.save_analysis(project["id"], saved)


def test_review_edit_cannot_invalidate_existing_coding(tmp_path):
    store = ProjectStore(tmp_path)
    project, interview = create_interview(store)
    transcript = store.get_transcript(project["id"], interview["id"])
    segment = transcript["segments"][0]
    segment.update({"speaker": "interviewee", "reviewed": True})
    reviewed = store.save_reviewed_transcript(
        project["id"], interview["id"], {"revision": 0, "segments": [segment]}
    )

    analysis = store.get_analysis(project["id"])
    code_id = new_id("code")
    analysis["codes"] = [
        {"id": code_id, "name": "Greeting", "description": "", "color": "#7357c6", "origin": "manual"}
    ]
    analysis["codings"] = [
        {
            "id": new_id("coding"),
            "interview_id": interview["id"],
            "segment_id": "segment-one",
            "start": 0,
            "end": 5,
            "quote": "Hallo",
            "code_id": code_id,
            "origin": "manual",
        }
    ]
    store.save_analysis(project["id"], analysis)

    reviewed["segments"][0]["text"] = "Guten Tag"
    with pytest.raises(Conflict, match="invalidate"):
        store.save_reviewed_transcript(
            project["id"],
            interview["id"],
            {"revision": reviewed["revision"], "segments": reviewed["segments"]},
        )

    with pytest.raises(Conflict, match="transcribing it again"):
        store.ensure_transcript_replaceable(project["id"], interview["id"])


def test_rejects_unsupported_upload(tmp_path):
    store = ProjectStore(tmp_path)
    project = store.create_project("Synthetic study")
    upload = FileStorage(stream=io.BytesIO(b"not audio"), filename="notes.txt")
    with pytest.raises(InvalidData):
        store.add_interview(project["id"], upload)
