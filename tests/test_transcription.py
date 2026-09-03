from __future__ import annotations

import io
import wave
from types import SimpleNamespace

from werkzeug.datastructures import FileStorage

from interview_analysis import transcription
from interview_analysis.storage import ProjectStore


def test_transcription_pipeline_persists_provenance_and_stable_segments(tmp_path, monkeypatch):
    store = ProjectStore(tmp_path)
    project = store.create_project("Synthetic transcription", "de")
    interview = store.add_interview(
        project["id"],
        FileStorage(stream=io.BytesIO(b"placeholder"), filename="synthetic.wav"),
    )

    def prepare_audio(_source, destination):
        with wave.open(str(destination), "wb") as output:
            output.setnchannels(1)
            output.setsampwidth(2)
            output.setframerate(16_000)
            output.writeframes(b"\0\0" * 16_000)

    class Model:
        def transcribe(self, *_args, **_kwargs):
            segments = [
                SimpleNamespace(
                    start=0.0,
                    end=1.0,
                    text=" Synthetischer Text ",
                    avg_logprob=-0.1,
                    no_speech_prob=0.02,
                )
            ]
            info = SimpleNamespace(language="de", language_probability=0.99)
            return iter(segments), info

    monkeypatch.setattr(transcription, "_prepare_audio", prepare_audio)
    monkeypatch.setattr(transcription, "_load_model", lambda *_args: Model())
    monkeypatch.setattr(transcription.importlib.metadata, "version", lambda _name: "test-version")

    updates = []
    result = transcription.transcribe_interview(
        store,
        project["id"],
        interview["id"],
        progress=lambda **values: updates.append(values),
    )

    assert result["transcription"]["engine"] == "faster-whisper"
    assert result["transcription"]["engine_version"] == "test-version"
    assert result["segments"][0]["id"].startswith("segment-")
    assert result["segments"][0]["text"] == "Synthetischer Text"
    assert store.find_interview(project["id"], interview["id"])["status"] == "needs_review"
    assert updates[-1]["percent"] == 100
