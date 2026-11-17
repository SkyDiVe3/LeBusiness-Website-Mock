---
title: Security and Privacy
status: active
tags:
  - doingbusiness
  - security
  - privacy
updated: 2026-11-16
related:
  - "[[Domain Schema]]"
  - "[[Operations]]"
  - "[[CI CD]]"
---

# Security and privacy

Every API and persistence boundary runs explicit Zod parsing at runtime. Strict TypeScript checks code at build time, while Zod guards incoming payloads in production.

> [!info] Publication rule
> Demonstrative financial seed data is not certified statutory reporting. Verified data licences, provenance tracking, and editorial approval are mandatory before publishing official company financials.

- Caddy (`infrastructure/caddy/Caddyfile`) and Next.js (`apps/web/next.config.ts`) send `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, and `Permissions-Policy` headers on every response.
- The contact route (`/api/contact`) validates payloads, blocks honeypot submissions, and logs domain-only metadata without persisting message PII in the mock build.
- Environment variables reside outside version control; `.env.example` supplies non-sensitive local placeholders only.
- Public accounts, billing flows, company claims, ad trackers, and third-party analytics remain excluded by design.

Operational monitoring is covered in [[Operations]] and build verification is covered in [[CI CD]].
