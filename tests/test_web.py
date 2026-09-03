from __future__ import annotations

import io
import zipfile

from interview_analysis.web import create_app


def test_project_upload_and_export_without_media(tmp_path):
    app = create_app(tmp_path)
    app.config.update(TESTING=True)
    client = app.test_client()

    created = client.post("/api/projects", json={"name": "Synthetic project", "language": "en"})
    assert created.status_code == 201
    project_id = created.get_json()["id"]

    uploaded = client.post(
        f"/api/projects/{project_id}/interviews",
        data={"audio": (io.BytesIO(b"dummy"), "interview.wav")},
        content_type="multipart/form-data",
    )
    assert uploaded.status_code == 201

    exported = client.get(f"/api/projects/{project_id}/export.zip")
    assert exported.status_code == 200
    with zipfile.ZipFile(io.BytesIO(exported.data)) as archive:
        names = archive.namelist()
    assert "project.json" in names
    assert "analysis.json" in names
    assert "EXPORT-INFO.json" in names
    assert not any(name.endswith("source.wav") for name in names)


def test_security_headers_and_health(tmp_path):
    app = create_app(tmp_path)
    app.config.update(TESTING=True)
    response = app.test_client().get("/api/health")
    assert response.get_json()["status"] == "ok"
    assert response.headers["X-Content-Type-Options"] == "nosniff"
    assert "frame-ancestors 'none'" in response.headers["Content-Security-Policy"]
