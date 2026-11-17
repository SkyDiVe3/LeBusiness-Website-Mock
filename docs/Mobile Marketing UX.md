---
title: Mobile Marketing UX
status: active
tags:
  - doingbusiness
  - ux
  - mobile
updated: 2026-11-16
related:
  - "[[Design]]"
  - "[[Animation and Accessibility]]"
  - "[[Performance and Optimization]]"
  - "[[plan]]"
---

# Mobile marketing UX

The public site treats mobile viewports (`390px` and wider) as the primary discovery and conversion surface. Each page pairs an asymmetric headline and visual context with a single primary action and zero horizontal navigation overflow.

> [!info] Conversion rule
> Every editorial and marketing block leads to one clear action and operates by keyboard, touch (`44px` minimum targets), and screen reader without third-party trackers or CAPTCHAs.

## Key flows

- Home to company directory (`/companii`) with URL-synchronized search, county, CAEN, and sort parameters.
- Home to Business Digest (`/stiri`), LinkLeaders (`/interviuri`), or Evenimente (`/evenimente`) with cover photography and author metadata.
- Editorial detail or event page to validated contact intake (`/contact`) with inline field errors and honeypot protection.
- Legacy URL fallback (`/en/...` or `/...`) to canonical sections with clear archival context.

Visual tokens, typography scales, and banned anti-patterns are specified in [[Design]]. Input accessibility and motion rules live in [[Animation and Accessibility]] and [[Security and Privacy]].
