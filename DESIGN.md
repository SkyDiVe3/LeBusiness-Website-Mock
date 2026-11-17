# Design system for DoingBusiness.ro

## 1. Visual theme and atmosphere

DoingBusiness.ro blends high-trust editorial journalism with a high-density Romanian corporate directory and B2B event platform. The design uses crisp hairline dividers, warm stone surfaces, and disciplined contrast across editorial stories, LinkLeaders interviews, Business Development services, and Major Companies profiles.

- **Editorial surface density (6 out of 10):** Generous breathing room around headlines, excerpts, and portrait photography so business leaders can scan news, interviews, and sector reports without clutter.
- **Directory and table density (8 out of 10):** Compact, horizontally aligned financial records, CUI identifiers, CAEN codes, and employee counts separated by 1px hairline borders instead of heavy shadowed boxes.
- **Layout variance (7 out of 10):** Asymmetric 2-column splits pairing main content columns (`Stiri`, `Business Digest`, `Linkleaders`) with structured sidebars (`Interviuri`, `Articole`, `Webinarii`), avoiding uniform 3-column grids.
- **Motion calibration (6 out of 10):** Left-to-right skeleton loading animations, spring-physics micro-interactions (`transform` and `opacity`), and `prefers-reduced-motion` compliance.

## 2. Color palette and roles

The application uses a calibrated Zinc/Slate neutral scale, a dark charcoal modal navigation surface for section hierarchy clarity, and a warm Signal Terracotta accent below 80% saturation. Pure `#000000` black, purple gradients, and neon glows are prohibited.

- **Canvas Alabaster (`#F8FAFC`):** Primary page background across all routes.
- **Pure Surface (`#FFFFFF`):** Elevated sticky header, directory filter controls, editorial sidebars, and service panels.
- **Zinc Slate (`#F1F5F9`) & Track (`#E2E8F0`):** Secondary band backgrounds, subtle table row striping, and left-to-right skeleton tracks.
- **Charcoal Ink (`#18181B`):** Primary headlines, company names, body copy, and active navigation labels.
- **Muted Steel (`#64748B`):** Secondary descriptions, author metadata, reading durations, and helper text.
- **Modal Sidenav Surface (`#3E4147`) & Submenu (`#5C616A`):** Full-height accordion navigation drawer with high-contrast expanded parent toggle (`#D90429`).
- **Whisper Border (`rgba(226, 232, 240, 0.7)`):** 1px structural borders, grid dividers, and metric separators.
- **Footer Slate (`#0F172A`):** Deep dark-slate footer surface paired with `#F8FAFC` headings, `#CBD5E1` links, and a muted local edition notice (`Versiune de reconstructie locala · 2026`).
- **Signal Terracotta (`#B45309`, 74% saturation):** Primary CTA buttons, active underline indicators, route-transition progress sweep, and key eyebrow labels.

Semantic feedback states remain strictly functional and muted:
- **Verified Status Surface (`#ECFDF5` fill, `#065F46` ink):** Validated form confirmation banners.
- **Validation Error Surface (`#FEF2F2` fill, `#991B1B` ink):** Inline form validation and failed request alerts.

## 3. Typography rules

All fonts load locally via `next/font/google` (`Instrument Serif`, `Outfit`, `JetBrains Mono`) with zero external runtime font network requests after build.

- **Display headlines (`Instrument Serif`):** Editorial hero titles, article titles, event titles, and service section headings. Tight tracking (`-0.03em`), line-height `1.04`, fluid clamp sizing. Prohibited inside directory controls, financial tables, and CUI/CAEN badges.
- **UI and body (`Outfit`):** Navigation links, editorial summaries, service lists, and form inputs with `1.65` line-height, `65ch` prose limit, and `1rem` minimum mobile body text.
- **Tabular financial and metadata (`JetBrains Mono`):** Company CUIs, CAEN codes, RON turnover and net profit figures, employee counts, dates, phone numbers, and footer build notice with `font-variant-numeric: tabular-nums`.
- **Banned typefaces:** `Inter`, `Arial`, `Helvetica`, `Times New Roman`, `Georgia`, `Garamond`, and `Palatino` are prohibited.

## 4. Component stylings

### Hero section with centered copy panel, flagship event card, and magazine spotlight

- **Balanced two-column hero grid:** Desktop viewports use a `1.15fr 0.85fr` `.hero-grid` with `align-items: stretch`, collapsing cleanly to `1fr` below `768px`. Both columns align flush top and bottom.
- **Centered hero copy panel (`.hero-copy-panel`):** Eliminates vertical dead space by wrapping the eyebrow (`DOINGBUSINESS.RO · B2B ROMANIA`), headline (`Instrument Serif`), centered `.hero-lead` (`margin-inline: auto`), and centered `.button-row` inside a `#FFFFFF` surface card with `3px` Signal Terracotta top accent border, `0.95rem` radius, and `--shadow-whisper`.
- **Inline image punctuation:** Captured local images sit inline inside the main headline with explicit `{" "}` surrounding spaces so mobile viewports never concatenate adjacent words when `.inline-pill-img` collapses into `.hero-mobile-strip`.
- **Stretched flagship event showcase (`.hero-event-card`):** Pairs the right column at `height: 100%` (`display: flex; flex-direction: column`) with `CEO Conference - THE BIG RETHINK - LEADERSHIP IN AN OUT OF BALANCE WORLD` and bottom-anchored edition metadata and CTA.
- **Centered magazine and PDF spotlight (`.hero-magazine-spotlight`):** Sits directly below `.hero-grid` inside `<section className="hero">` (`max-width: 1020px; margin: 2rem auto 0`) with a `3px` Footer Slate (`#0F172A`) top accent, balanced `156x214px` `/media/downloads/2025/MCR-2025-Digital.jpg` cover, centered publication summary (`Publicatie Anuala Bilingva · Editia 2025`), `JetBrains Mono` indicator chips (`3.000 Companii`, `32 Industrii`, `300+ Domenii CAEN`, `RO / EN · PDF`), and centered action buttons (`Descarca Prezentarea PDF`, `Vezi Editia Digitala`, `Cauta in Directorul CUI`).

### Hierarchical navigation header and modal sidenav drawer

- **Utility bar:** Displays DoingBusiness.ro telephone (`+40-21-317.03.90`), email (`office@doingbusiness.ro`), directory link, and `RO / EN` locale switch.
- **Primary desktop navigation:** Sticky bar pairing official `/media/doingbusiness.png` wordmark with hover/focus dropdown menus matching DoingBusiness.ro structure:
  - `Home` (`/`)
  - `Linkleaders` (`/editorial`) -> `Interviuri` (`/interviuri`), `Leader Insights` (`/video-interviuri`), `Business Digest` (`/articole`), `Stiri` (`/stiri`)
  - `Business & Drive` (`/business-drive`)
  - `Evenimente` (`/evenimente`) -> `CEO Conference` (`/evenimente/ceo-conference`), `Alte Evenimente` (`/evenimente/alte-evenimente`), `Business Evolution` (`/evenimente/business-evolution`), `Webinarii` (`/webinarii`)
  - `Major Companies` (`/top-companii`) -> `Major Companies in Romania` (`/top-companii`), `Director companii` (`/companii`)
  - `Despre noi` (`/despre-noi`) -> `LinkLeaders` (`/linkleaders`), `Business development` (`/dezvoltarea-afacerii`)
  - `Contact` (`/contact`)
- **Accordion modal drawer:** Accessible toggle button opens the slide-over `#3E4147` accordion navigation modal with independent expand/collapse buttons per parent section and ESC/backdrop dismiss.

### Left-to-right skeleton loading states

- **Route transition feedback:** Internal navigation displays a fixed top progress bar (`.route-progress-track` with `.route-progress-fill`) and subtle transition toast with left-to-right shimmer bars while the next page resolves.
- **Route segment Suspense loader (`app/loading.tsx`):** Mirrors the active asymmetric grid (`1.35fr 0.65fr`) using `#E2E8F0` blocks swept by a GPU-accelerated `::after` highlight translating strictly left-to-right (`transform: translateX(-100%)` to `transform: translateX(100%)` under `@keyframes skeleton-ltr`).
- **Directory loaders & empty states:** Company directory searches use matching `14rem` left-to-right `.skeleton-card` tiles. Circular loading spinners are prohibited.

### Content pages, company directory, and contact forms

- **Authentic section feeds (`/` & `/editorial`):** Feature verified stories, authors, dates, and covers extracted from the DoingBusiness archive alongside right-hand `Interviuri`, `Articole`, and `Webinarii` sidebar blocks.
- **Vertical sidebar carousel widgets:** `Interviuri` (box 1) and `Articole recente` / `Articole` (box 3) rotate through all items one by one in a seamless upward loop (`translate3d` over `333ms` spring swipe and `1000ms` wait pause between items, `84px` fixed row height, 4 visible rows, pause on hover/focus, and `prefers-reduced-motion` support).
- **Service & institutional pages (`/despre-noi`, `/linkleaders`, `/business-development`, `/dezvoltarea-afacerii`):** Pair official program illustrations from `/media/downloads/` with structured capability sections and downloadable PDF presentations.
- **Contact page (`/contact`):** Presents real office address (`Strada Prof. Ion Bogdan, Nr. 4-6, Sector 1, Bucuresti`), phone, fax, `office@doingbusiness.ro`, map link, and structured form (`Prenume *`, `Nume *`, `Email *`, `Telefon`, `Companie`, `Pozitia`, `Mesaj *`) with visible top labels and Zod API validation.

## 5. Layout principles

- **Grid discipline:** Use CSS Grid across page shells (`max-width: 1360px`), hero splits, `section-split` (`1.55fr 0.85fr`), `about-split`, and directory filter bars. Never use Flexbox `calc()` width math.
- **Responsive rules:** Collapse navigation below `1024px` into the modal drawer trigger and stack grids to `1fr` below `768px` with `overflow-x: clip` and `44px` minimum tap targets.

## 6. Motion and interaction

- **Spring easing:** `cubic-bezier(0.22, 1, 0.36, 1)` for micro-interactions, dropdown transitions, and left-to-right skeleton sweeps.
- **GPU-only properties:** Animate only `transform` and `opacity` (never `background-position`, `width`, or `left`), disabled automatically under `@media (prefers-reduced-motion: reduce)`.

## 7. Anti-patterns

Never ship any of the following patterns on DoingBusiness.ro:

1. No `Inter`, `Arial`, `Helvetica`, or generic system serif fonts.
2. No pure `#000000` black or purple/neon gradient hero backgrounds.
3. No internal sitemap counters (`19.151`), crawler status cards, or reconstruction prose in public page content (keep the single subtle `Versiune de reconstructie locala · 2026` disclaimer in the footer only).
4. No unverified or invented article titles when official baseline stories exist.
5. No missing space around `.inline-pill-img` spans that concatenate words on mobile.
6. No circular loading spinners; all pending states use left-to-right skeleton shimmer blocks.
7. No flat top menus hiding sub-routes (`Linkleaders`, `Evenimente`, `Despre noi`); provide desktop dropdowns and expandable modal accordions.
8. No broken image paths; all covers, downloads, and company logos resolve to local `/media/` files.
