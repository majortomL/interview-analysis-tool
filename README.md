# Interview Analysis Tool

A local-first, self-hosted workflow for qualitative interview research:

1. import audio recordings;
2. transcribe them locally with `faster-whisper`;
3. verify text, timestamps, and speaker roles while listening to the audio;
4. create codes, memos, candidate themes, and review optional AI suggestions;
5. export a portable project archive.

The application is an early **V1 alpha**. It is designed for a single researcher or a trusted team sharing one deployment. It does not send interview data to a cloud service by itself.

The frontend is a small React app (via the `htm` tagged-template helper, no JSX) loaded directly as a `<script>` tag. React, ReactDOM, and `htm` are vendored under `src/interview_analysis/static/vendor/`; there is no npm dependency, bundler, or build step for the UI.

## Quick start with Docker

Requirements: Docker Desktop or Docker Engine with Compose.

```bash
cd interview-analysis-tool
docker compose up --build
```

Open <http://127.0.0.1:8080>. Project data is stored in the Docker volume `interview-analysis-data` and survives container rebuilds.

The interface is available in German and English. Use the persistent `DE | EN` switch in the header; this does not change the transcription language of existing projects.

The first transcription downloads the selected Whisper model. CPU transcription works out of the box but can be slow for larger models. The default `small` model is a practical first test.

## Native Python installation

Requirements:

- Python 3.11 or newer;
- `ffmpeg` available on `PATH`;
- optionally, a supported NVIDIA/CUDA environment for GPU transcription.

```bash
python -m venv .venv
# Linux/macOS
source .venv/bin/activate
# Windows PowerShell
# .venv\Scripts\Activate.ps1

python -m pip install -e ".[asr]"
interview-analysis doctor
interview-analysis serve
```

The server listens on `127.0.0.1:8080` by default and opens the browser automatically. Change the data directory with:

```bash
interview-analysis serve --data-dir /path/to/private/project-data
```

## Workflow

### 1. Import

Create a project, select the interview language and Whisper model, then add one or more recordings — via the file picker or by dragging files onto the drop zone (multiple drops accumulate into one removable list). Supported formats are MP3, M4A, WAV, MP4, AAC, FLAC, and OGG. Each import batch requires a transcription name, prefilled with an incrementing "Transcription N" and applied per file when importing several at once.

### 2. Transcribe

Each recording is normalized to mono 16 kHz audio before local ASR. The transcript records the model, engine version, device, language detection, and confidence values. Jobs run sequentially by default to avoid exhausting GPU memory. Use **Transcribe all** to queue every not-yet-transcribed recording at once. Progress bars survive a page reload (the app re-attaches to any job still running on the server).

### 3. Review

Listen to the recording, correct the draft, assign a speaker role, and mark every retained segment as reviewed. The segment matching the current playback position is highlighted automatically, and each segment has a play button that jumps the audio to its start. Analysis is enabled only after all retained segments have a speaker role and are reviewed.

Raw ASR text is retained separately from corrected text. Saves are atomic, versioned, and rejected when another browser has already saved a newer revision.

### 4. Analyse

Record the research question and reflexive memo, select passages, create codes, and group codes into candidate themes. Codings reference stable interview and segment IDs plus exact quote offsets. Hover over a code in the codebook to isolate its highlights in the transcript and dim every other code.

The **Prepare AI suggestions** export contains all reviewed transcript text. It includes a machine-readable prompt and result schema. The application never uploads that file. Only give it to an external model if participant consent, institutional policy, and the applicable data-protection basis permit the transfer. Imported results remain suggestions until individually accepted.

## Speaker diarization

Diarization is optional because it adds a large dependency and requires access to the configured pyannote model.

Native installation:

```bash
python -m pip install -e ".[diarization]"
```

Set `HF_TOKEN`, enable diarization in project settings, and restart the app. Diarization clusters are preserved as metadata; the researcher still assigns semantic roles such as interviewer and interviewee during review.

For Docker, change the build argument in `docker-compose.yml` from `asr` to `asr,diarization`, rebuild, and provide `HF_TOKEN` through a local `.env` file. Never commit that file.

## NVIDIA GPU

The application selects CUDA automatically when CTranslate2 reports a usable GPU; otherwise it uses CPU/int8. The portable Docker image is CPU-oriented. For GPU use, native installation is currently recommended; a CUDA base image and GPU reservation must be configured deliberately for a GPU-enabled container.

The Import step shows a live GPU status line so you can see whether CUDA is available before you start a transcription.

If a GPU is detected but transcription fails with `Library cublas64_12.dll is not found or cannot be loaded` (or a similar `cudnn`/`libcublas` message), CTranslate2 can see the card through the driver but the CUDA runtime libraries themselves are missing — they are not bundled in the Windows/Linux wheels. Install them into the same virtual environment:

```bash
pip install nvidia-cublas-cu12 nvidia-cudnn-cu12
```

Then restart the server. If you'd rather not manage CUDA runtime libraries, set the project's "Device" setting to `CPU` instead of `Automatic`/`NVIDIA CUDA` — transcription will be slower but works without any extra installation.

## Data layout and backups

For a native installation, all runtime data lives below `INTERVIEW_ANALYSIS_DATA_DIR`. Docker stores the same structure in its named volume:

```text
data/
└── projects/
    └── project-<uuid>/
        ├── project.json
        ├── analysis.json
        └── interviews/
            └── interview-<uuid>/
                ├── source.<extension>
                ├── audio_16k.wav
                └── transcript.json
```

Previous JSON revisions are retained in adjacent `backups/` directories. The normal export excludes media; **Full backup** includes source and processed audio.

Back up the complete data directory separately. The in-app archive is an export mechanism, not a replacement for tested backups.

## Security and privacy

- The default CLI and Docker Compose configuration expose the app only on localhost.
- The application currently has no user accounts or permission model. Do not expose it directly to the internet.
- For remote access, put it behind HTTPS and an authentication-capable reverse proxy, restrict network access, and document retention/deletion procedures.
- Interview voices and transcripts can be personal data. Pseudonymous participant IDs do not necessarily make data anonymous.
- Runtime data, audio, `.env`, model tokens, and exports are excluded by `.gitignore`; verify staged files before every push.

See [SECURITY.md](SECURITY.md) for deployment boundaries.

## Development

Install the development environment and run checks:

```bash
python -m pip install -e ".[dev]"
ruff check .
pytest
python -m build
```

The tests use generated metadata and dummy bytes only. Real interview material must never be added as a fixture.

## Project status and limitations

- single deployment / single shared workspace;
- one in-process transcription worker by default;
- interrupted jobs are marked failed and can be restarted;
- JSON project schema version 1; migrations will be required before incompatible changes;
- no REFI-QDA/QDPX interoperability yet;
- no collaborative coding or inter-coder comparison features;
- interface available in German and English only; other languages require a translation contribution.

Contributions and issue reports are welcome. Please do not attach interview data, logs containing interview text, tokens, or other confidential material to public issues.

## License

MIT. See [LICENSE](LICENSE).
