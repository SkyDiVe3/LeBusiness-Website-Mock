---
title: Design System
status: active
tags:
  - doingbusiness
  - design
  - ux
updated: 2026-11-16
related:
  - "[[plan]]"
  - "[[Mobile Marketing UX]]"
  - "[[Animation and Accessibility]]"
---

# Design system

The visual specification for DoingBusiness.ro lives in `DESIGN.md` at the repository root and governs all UI tokens, typography, layout grids, skeleton states, and modal navigation rules in `apps/web`.

> [!info] Taste calibration
> The interface pairs `Instrument Serif` editorial headlines with `Outfit` prose and `JetBrains Mono` tabular numbers over a `#F8FAFC` surface, `#B45309` terracotta accents, and `#3E4147` expandable accordion navigation.

## Key visual decisions

- Replace internal telemetry widgets (`19.151` sitemap counts) on the homepage with a `1.15fr 0.85fr` stretched hero grid pairing a centered `.hero-copy-panel` card with the full-height `CEO Conference` showcase card (`.hero-event-card`), plus a centered horizontal `.hero-magazine-spotlight` panel (`max-width: 1020px`) below `.hero-grid` featuring `/media/downloads/2025/MCR-2025-Digital.jpg` (`156x214px`), `JetBrains Mono` edition badges, and direct PDF, digital edition, and CUI directory actions.
- Use a GPU-composited left-to-right skeleton shimmer (`@keyframes skeleton-ltr`) across `app/loading.tsx`, route transition indicators, and directory loading cards.
- Preserve explicit spacing around `.inline-pill-img` headline thumbnails so mobile viewports never concatenate words and keep `390px` mobile layouts free of horizontal overflow.
- Match the live `doingbusiness.ro` navigation hierarchy across desktop dropdowns and the slide-over accordion modal drawer (`Home`, `Linkleaders`, `Business & Drive`, `Evenimente`, `Major Companies`, `Despre noi`, `Contact`).

See [[Mobile Marketing UX]], [[Animation and Accessibility]], and [[plan]] for implementation details.
