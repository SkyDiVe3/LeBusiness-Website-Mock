---
title: CI CD
status: active
tags:
  - doingbusiness
  - ci
  - delivery
updated: 2026-11-16
related:
  - "[[Test Strategy]]"
  - "[[Operations]]"
  - "[[Import and Legacy Routes]]"
---

# CI CD

GitHub Actions automates code quality, documentation validation, and baseline reconciliation checks in `.github/workflows/`. Workflows are committed as portable pipeline definitions.

> [!info] Promotion rule
> Container images are eligible for release only after lint, strict typecheck, unit tests, Obsidian vault validation, Next.js build, and Docker Compose validation pass.

## Workflows

| Workflow | Trigger | Scope |
| --- | --- | --- |
| `quality.yml` | Pull requests and pushes | Install, lint, strict typecheck, Vitest suite, `validate-docs.mjs`, production build |
| `reconciliation.yml` | Scheduled cron or manual dispatch | Report-only verification of `baseline/` manifest counts without mutating production data |

Verification targets live in [[Test Strategy]] and local container procedures live in [[Operations]].
