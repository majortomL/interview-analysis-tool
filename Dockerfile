FROM python:3.12-slim-bookworm@sha256:782412e85d0f0984994c290652577d4018aff08145c85b262bb63dc0c7522254

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    INTERVIEW_ANALYSIS_DATA_DIR=/data \
    INTERVIEW_ANALYSIS_HOST=0.0.0.0 \
    INTERVIEW_ANALYSIS_PORT=8080

RUN apt-get update \
    && apt-get install --no-install-recommends -y ffmpeg \
    && rm -rf /var/lib/apt/lists/* \
    && useradd --create-home --uid 10001 appuser \
    && mkdir -p /data \
    && chown appuser:appuser /data

ARG INSTALL_EXTRAS=asr

WORKDIR /app
COPY pyproject.toml README.md LICENSE ./
COPY src ./src
RUN pip install --no-cache-dir ".[${INSTALL_EXTRAS}]"

USER appuser
VOLUME ["/data"]
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD python -c "import urllib.request; urllib.request.urlopen('http://127.0.0.1:8080/api/health', timeout=3)"

CMD ["interview-analysis", "serve", "--host", "0.0.0.0", "--port", "8080", "--data-dir", "/data", "--no-browser"]
