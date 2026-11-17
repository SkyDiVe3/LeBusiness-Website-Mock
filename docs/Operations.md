---
title: Operations
status: active
tags:
  - doingbusiness
  - operations
  - observability
updated: 2026-11-16
related:
  - "[[Architecture]]"
  - "[[Performance and Optimization]]"
  - "[[Security and Privacy]]"
---

# Operations

Local development supports both a single-command Node mock on port `3010` and a full multi-container Docker Compose stack on port `8080`.

> [!info] Readiness rule
> Caddy waits for `/api/health` to return HTTP `200`, and application services wait on explicit health checks for PostgreSQL, Valkey, and Meilisearch.

## Local mock workflow on port 3010

1. Run `node scripts/serve-mock.mjs --build` (or `pnpm serve:mock`) to stage captured local media into `apps/web/public/media/`, compile `@doingbusiness/web`, and listen on `http://localhost:3010/`.
2. Verify `GET /api/health`, `GET /robots.txt`, `GET /sitemap.xml`, `GET /llms.txt`, and `GET /api/companies?q=1590082`.

## Docker Compose workflow

1. Copy `.env.example` to `.env` and replace placeholder credentials.
2. Run `docker compose up --build` (`.dockerignore` keeps `baseline/` and `reconstruction/` out of the image build context).
3. Open `http://localhost:8080/` for the app and `http://localhost:8025/` for Mailpit.
4. Add `-f docker-compose.observability.yml` when Prometheus, Loki, Tempo, and Grafana (`http://localhost:3001/`) are needed.

## Operational signals

Pino emits structured JSON logs for contact intake, import validation, and worker faults. The optional observability profile scrapes OpenTelemetry metrics and traces into Prometheus, Loki, and Tempo dashboards. Release automation lives in [[CI CD]].
