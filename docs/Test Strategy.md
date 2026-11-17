---
title: Test Strategy
status: active
tags:
  - doingbusiness
  - testing
  - quality
updated: 2026-11-16
related:
  - "[[Domain Schema]]"
  - "[[Animation and Accessibility]]"
  - "[[CI CD]]"
---

# Test strategy

Tests exercise stable public seams across domain validation, API responses, documentation structure, and browser accessibility rather than private component internals.

> [!info] Test seams
> `searchCompanies`, `findCompanyByCui`, `getEditorialItems`, `normalizeLegacyRoute`, and HTTP endpoints form the primary verification boundary.

## Required coverage

1. Valid Romanian CUI, CAEN, judet, turnover, net profit, and employee queries return matching company records.
2. Malformed CUI strings, invalid CAEN codes, unknown county codes, invalid contact payloads, and broken import routes fail Zod validation cleanly.
3. Editorial, event, company directory, and profile routes render with localized media, valid JSON-LD, and working URL filter synchronization.
4. Desktop and mobile (`390x844`) browser audits confirm zero horizontal overflow, accessible mobile navigation drawers, keyboard focus outlines, and WCAG AA footer contrast.
5. Machine-readable endpoints (`/robots.txt`, `/sitemap.xml`, `/llms.txt`, `/openapi.json`, `/.well-known/api-catalog`) return valid status codes and structured formats.
6. Vault checks in `scripts/validate-docs.mjs` validate YAML frontmatter, [[Documentation Style|wikilinks]], `[!info]` callouts, Canvas JSON, and Base filters.

Pipeline scheduling is specified in [[CI CD]].
