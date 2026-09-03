FROM python:3.14-slim-bookworm@sha256:9ab8d9c8514b44f90cf0029dd42fdd7e9e211e639c8b995304cc04568dee900f

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
