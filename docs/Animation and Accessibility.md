---
title: Animation and Accessibility
status: active
tags:
  - doingbusiness
  - accessibility
  - design
updated: 2026-11-16
related:
  - "[[Design]]"
  - "[[Mobile Marketing UX]]"
  - "[[Performance and Optimization]]"
  - "[[Test Strategy]]"
---

# Animation and accessibility

Motion stays restrained to GPU-composited `transform` and `opacity` transitions using spring easing (`cubic-bezier(0.22, 1, 0.36, 1)`). Route transitions and Suspense boundaries display left-to-right skeleton shimmer blocks (`@keyframes skeleton-ltr`), and all animations disable automatically under `prefers-reduced-motion`.

> [!info] Accessibility baseline
> Visitors can reach every public route by keyboard alone, navigate multi-level sections through focusable desktop dropdowns or an accessible `44px` modal accordion drawer (with `Escape` dismiss), and validate form inputs with explicit top labels and live status announcements.

- Semantic `<header>`, `<nav>`, `<main>`, `<article>`, `<aside>`, and `<footer>` landmarks on every route.
- Skip link (`Sari la continut`), `#B45309` visible focus outlines, explicit labels above inputs (`Prenume *`, `Nume *`, `Email *`, `Telefon`, `Companie`, `Pozitia`, `Mesaj *`), and `role="status"` / `role="alert"` announcements.
- Responsive single-column collapse below `768px` with zero horizontal clipping and `44px` minimum touch targets.

Automated checks live in [[Test Strategy]], visual specifications live in [[Design]], and runtime performance limits live in [[Performance and Optimization]].
