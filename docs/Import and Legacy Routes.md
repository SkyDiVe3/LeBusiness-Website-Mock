---
title: Import and Legacy Routes
status: in-progress
tags:
  - doingbusiness
  - import
  - migration
updated: 2026-11-16
related:
  - "[[plan]]"
  - "[[Architecture]]"
  - "[[Domain Schema]]"
---

# Import and legacy routes

The `baseline/` crawl is a read-only archival dataset containing captured HTML, media files, and `baseline/reports/route-manifest.json`. It is never executed as production application code.

> [!info] Reconciliation rule
> Every discovered URL must be classified as `render`, `redirect`, `excluded`, or `failed`. Only routes mapped to a validated canonical record enter production sitemaps.

## Import adapter responsibilities

1. Parse `baseline/reports/route-manifest.json` records through `LegacyRouteSchema` and `ImportFailureSchema`.
2. Reject malformed paths, unsupported content types, and pages missing provenance metadata.
3. Separate Windows path character collisions (`?`, `:`, `"`, `|`) and crawler content-type classification bugs from genuine HTTP failures when auditing the `287` entries in `baseline/reports/Capture Report.md`.
4. Store source URL, SHA-256 checksum, canonical target, disposition, timestamp, and failure reason in `legacy_routes`.
5. Keep unverified legacy URLs isolated on the compatibility catch-all page while excluding `/robots.txt`, `/sitemap.xml`, `/llms.txt`, and `/openapi.json` from legacy fallback.

Review [[Architecture]] for module ownership and [[CI CD]] for scheduled reconciliation jobs.
