---
title: Performance and Optimization
status: active
tags:
  - doingbusiness
  - performance
  - optimization
updated: 2026-11-16
related:
  - "[[Design]]"
  - "[[Mobile Marketing UX]]"
  - "[[Operations]]"
  - "[[CI CD]]"
---

# Performance and optimization

Public editorial and company routes render on the server and limit client JavaScript islands to directory search, mobile navigation drawer state, clipboard CUI copy, and contact form submission.

> [!info] Performance budget
> Keep mobile LCP below `2.5` seconds, INP below `200` milliseconds, CLS below `0.1`, and avoid external ad, analytics, or consent scripts on the public path.

- Cache `/api/companies` responses with `public, max-age=60, stale-while-revalidate=300` headers.
- Load `Instrument Serif`, `Outfit`, and `JetBrains Mono` through `next/font/google` so fonts bundle locally with zero layout shift.
- Serve localized images from `apps/web/public/media/` with explicit dimensions and `loading="lazy"` below the fold.
- Render skeletal shimmer loaders inside `/companii` during filter updates instead of blocking spinners.

Runtime telemetry is detailed in [[Operations]] and automated gates are defined in [[CI CD]] and [[Test Strategy]].
