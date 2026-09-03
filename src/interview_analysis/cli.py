from __future__ import annotations

import argparse
import importlib.util
import os
import shutil
import sys
import threading
import webbrowser
from pathlib import Path


def default_data_dir() -> Path:
    configured = os.environ.get("INTERVIEW_ANALYSIS_DATA_DIR")
    if configured:
        return Path(configured).expanduser().resolve()
    return (Path.cwd() / "data").resolve()


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        prog="interview-analysis",
        description="Transcribe, review, and thematically analyse interviews locally.",
    )
    subparsers = parser.add_subparsers(dest="command")

    serve = subparsers.add_parser("serve", help="start the local web application")
    serve.add_argument("--host", default=os.environ.get("INTERVIEW_ANALYSIS_HOST", "127.0.0.1"))
    serve.add_argument("--port", type=int, default=int(os.environ.get("INTERVIEW_ANALYSIS_PORT", "8080")))
    serve.add_argument("--data-dir", type=Path, default=default_data_dir())
    serve.add_argument("--no-browser", action="store_true", help="do not open a browser automatically")

    doctor = subparsers.add_parser("doctor", help="check optional runtime dependencies")
    doctor.add_argument("--data-dir", type=Path, default=default_data_dir())
    return parser


def run_doctor(data_dir: Path) -> int:
    checks = {
        "Python >= 3.11": sys.version_info >= (3, 11),
        "ffmpeg": shutil.which("ffmpeg") is not None,
        "faster-whisper": importlib.util.find_spec("faster_whisper") is not None,
    }
    try:
        data_dir.mkdir(parents=True, exist_ok=True)
        probe = data_dir / ".write-test"
        probe.touch()
        probe.unlink()
        checks[f"writable data directory ({data_dir})"] = True
    except OSError:
        checks[f"writable data directory ({data_dir})"] = False

    for label, ok in checks.items():
        print(f"[{'ok' if ok else 'missing'}] {label}")
    required = checks["Python >= 3.11"] and checks[f"writable data directory ({data_dir})"]
    return 0 if required else 1


def run_server(host: str, port: int, data_dir: Path, open_browser: bool) -> None:
    from waitress import serve

    from interview_analysis.web import create_app

    app = create_app(data_dir=data_dir)
    url = f"http://{host if host not in {'0.0.0.0', '::'} else '127.0.0.1'}:{port}"
    if open_browser:
        threading.Timer(0.8, lambda: webbrowser.open(url)).start()
    print(f"Interview Analysis Tool: {url}")
    print(f"Project data: {data_dir}")
    serve(app, host=host, port=port, threads=8)


def main() -> None:
    parser = build_parser()
    args = parser.parse_args()
    command = args.command or "serve"
    if command == "doctor":
        raise SystemExit(run_doctor(args.data_dir.resolve()))
    if command == "serve":
        if args.command is None:
            args = parser.parse_args(["serve"])
        run_server(args.host, args.port, args.data_dir.resolve(), not args.no_browser)


if __name__ == "__main__":
    main()
