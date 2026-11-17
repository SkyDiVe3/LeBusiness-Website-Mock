---
title: Documentation Style
status: active
tags:
  - doingbusiness
  - documentation
updated: 2026-11-16
related:
  - "[[plan]]"
  - "[[Architecture]]"
  - "[[Design]]"
  - "[[Roadmap]]"
---

# Documentation style

`docs/` is structured as an Obsidian vault where every note stands alone as concise engineering prose free of filler patterns.

> [!info] Required note format
> Each Markdown file includes YAML frontmatter (`title`, `status`, `tags`, `updated`, `related`), at least one `> [!info]` callout, and valid [[plan|wikilinks]] to related notes.

- Match sentence-case headings and clear filenames with Obsidian wikilinks between vault notes and standard Markdown links only for external URLs.
- Avoid em dashes, en dashes, mid-sentence colons, decorative emojis, and generic filler phrasing.
- Update `updated` dates and reciprocal links whenever architectural or design decisions change.
- Validate the complete vault with `node scripts/validate-docs.mjs` (`pnpm validate:docs`) before finishing a task.

The visual system map is ![[Production Rebuild.canvas]] and the tracked roadmap view is ![[Roadmap.base]].
