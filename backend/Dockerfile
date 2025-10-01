# syntax=docker/dockerfile:1.7-labs
FROM python:3.12-slim AS base

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1

WORKDIR /app

# System deps
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential curl && rm -rf /var/lib/apt/lists/*

# Install deps
COPY backend/pyproject.toml backend/uv.lock ./
RUN pip install --upgrade pip && pip install uv && uv pip install --system -r <(uv pip compile --python-version 3.12 --no-header --no-annotate pyproject.toml)

# Copy source
COPY backend/ ./

EXPOSE 8000
CMD ["python", "-m", "uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000"]
