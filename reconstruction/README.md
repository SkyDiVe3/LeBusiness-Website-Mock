---
title: DoingBusiness.ro Local Reconstruction
tags:
  - doingbusiness
  - reverse-engineering
  - reconstruction
  - homepage
status: captured
source: https://doingbusiness.ro/
captured: 2026-11-15
aliases:
  - DoingBusiness Homepage Capture
---

# DoingBusiness.ro Local Reconstruction

This directory contains the original homepage snapshot and the full public-site capture. Open [[Reconstruction Evidence]] for the capture record, observed structure, asset inventory, and known boundaries. The complete crawl lives in `../baseline/`.

## Run locally

Serve `offline-site` with any static-file server, then open its `index.html` at the server root. For example, from this directory:

```powershell
npx --yes serve offline-site
```

> [!warning] Scope boundary
> This is a static snapshot of the public homepage, not a clone of the site's private backend, database, search service, advertising service, consent manager, or articles that were not captured. Some outbound links and third-party scripts intentionally remain external.

## Directory map

| Path | Purpose |
| --- | --- |
| `offline-site/index.html` | Local homepage entry point, with same-origin homepage asset URLs rewritten locally. |
| `offline-site/assets/`, `offline-site/media/`, `offline-site/lib/` | Localized homepage assets and JavaScript dependencies. |
| `reference-assets/` | Immutable browser-exported asset bundle plus `manifest.json`. |
| `reference-page.html` | Original public HTML response used to create the local entry point. |
| `Reconstruction Evidence.md` | Obsidian-formatted evidence and limitations. |
| `../baseline/site/` | Full route-preserving public site mirror. |
| `../baseline/reports/route-manifest.json` | Per-route and per-asset checksums, capture status, and failures. |

## Next phase

Use the installed Matt Pocock skills in the next task to define an improvement spec, retain only evidenced behavior, and optimize the reconstructed frontend without treating this static capture as the original application source.
