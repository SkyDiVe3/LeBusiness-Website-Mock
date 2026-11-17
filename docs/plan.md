---
title: Production Rebuild Plan
status: in-progress
tags:
  - doingbusiness
  - delivery
  - architecture
updated: 2026-11-16
related:
  - "[[Architecture]]"
  - "[[Design]]"
  - "[[Domain Schema]]"
  - "[[Performance and Optimization]]"
---

# Production rebuild plan

This vault tracks the DoingBusiness.ro reconstruction from raw static capture to a validated web application. The preserved crawl in `baseline/` stays read-only evidence, and the production application lives in `apps/web`, `apps/worker`, and `packages/`.

> [!info] Delivery principle
> Capture evidence is immutable. Every imported record requires a validated Zod schema, explicit source provenance, and a classified route disposition before publication.

## Completed foundation

- [x] Established strict TypeScript (`strict`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, `useUnknownInCatchVariables`, `noImplicitOverride`) and ESLint rules banning `any` and type assertions.
- [x] Created Zod-first Romanian company schemas (`cui`, `caenCode`, `countyCode`, `turnoverRon`, `netProfitRon`, `employeeCount`), editorial schemas, contact intake validation, and legacy route models.
- [x] Captured the public baseline corpus (`19,151` declared sitemap URLs, `65,691` captured route records, `12,245` localized first-party assets, and `287` recorded crawl failures in `baseline/reports/Capture Report.md`).
- [x] Added local Docker Compose service definitions, PostgreSQL schema and seed SQL, Caddy edge config, and the optional OpenTelemetry observability profile.
- [x] Defined CI workflows in `.github/workflows/` and automated Obsidian vault checks in `scripts/validate-docs.mjs`.

## Mock server and design remediation

- [x] Diagnosed the initial Codex port `3010` prototype via live browser audit (`Arial` font fallback, blue gradient hero, 3-column equal card grid, horizontal mobile nav clipping, zero captured images, and missing `/robots.txt`, `/sitemap.xml`, `/llms.txt`, and JSON-LD).
- [x] Added `scripts/serve-mock.mjs` (`pnpm serve:mock` and `pnpm build:mock`) to stage captured local media into `apps/web/public/media/`, build `@doingbusiness/web`, and serve `http://localhost:3010/`.
- [x] Added `.dockerignore` and updated `infrastructure/docker/Dockerfile.web` so Docker builds exclude the multi-gigabyte `baseline/` crawl and start `next start` cleanly on port `3000`.
- [x] Generated `DESIGN.md` and [[Design]] to enforce `Instrument Serif`, `Outfit`, `JetBrains Mono` tabular numerals, `#F8FAFC` surfaces, `#B45309` single accent, inline image hero typography, and mobile drawer collapse.
- [x] Added machine-readable agent endpoints (`/robots.txt`, `/sitemap.xml`, `/llms.txt`, `/openapi.json`, `/.well-known/api-catalog`, JSON-LD, and `Accept: text/markdown` negotiation).

## Controlled import sequence

1. Reconcile `baseline/reports/route-manifest.json` and classify each of the `65,691` captured records and `287` logged failure entries as `render`, `redirect`, `excluded`, or `failed`.
2. Parse verified HTML into the schemas specified in [[Import and Legacy Routes]].
3. Import editorial items, events, and asset metadata with source URLs and SHA-256 checksums into PostgreSQL and MinIO, rejecting invalid records.
4. Index approved companies and articles in Meilisearch and regenerate canonical sitemaps.
5. Run the full acceptance suite in [[Test Strategy]] and verify Docker Compose health checks before promoting images.

## Operating decisions

- Local review delivery runs on `http://localhost:3010/` through `scripts/serve-mock.mjs` and on `http://localhost:8080/` when orchestrated through Docker Compose. Cloud hosting, public billing, user accounts, and company-claim workflows are out of scope.
- Romanian is the primary public locale, and English routes under `/en` stay reachable while legacy counterparts are reconciled.
- Seeded company financial figures are illustrative model records and must be replaced by a licensed dataset before public financial publishing.

See [[Architecture]], [[Design]], [[Domain Schema]], [[Mobile Marketing UX]], [[CI CD]], and [[Operations]].
