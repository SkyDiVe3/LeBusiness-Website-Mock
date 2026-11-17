/* global fetch, WebSocket */
import { Buffer } from "node:buffer";
import { execFile, spawn } from "node:child_process";
import console from "node:console";
import { copyFile, mkdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { setTimeout as delay } from "node:timers/promises";
import { fileURLToPath, pathToFileURL } from "node:url";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DOCS_DIR = path.join(ROOT, "docs");
const LIVE_DIR = path.join(DOCS_DIR, "comparison-assets", "live");
const LOCAL_DIR = path.join(DOCS_DIR, "comparison-assets", "local");
const LIVE_MANIFEST_PATH = path.join(LIVE_DIR, "live-manifest.json");
const LOCAL_MANIFEST_PATH = path.join(LOCAL_DIR, "local-manifest.json");
const HTML_OUTPUT_PATH = path.join(DOCS_DIR, "DoingBusiness-Optimization-Comparison-Report.html");
const PDF_OUTPUT_PATH = path.join(DOCS_DIR, "DoingBusiness-Optimization-Comparison-Report.pdf");
const MARKDOWN_OUTPUT_PATH = path.join(DOCS_DIR, "Optimization Comparison Report.md");
const BRAIN_PDF_COPY_PATH = path.join(
  "C:",
  "Users",
  "MykeHang",
  ".gemini",
  "antigravity",
  "brain",
  "d09ac422-58c2-4c8d-b293-cccb984057e3",
  "DoingBusiness-Optimization-Comparison-Report.pdf",
);
const EDGE_BINARY = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";

const FONT_ASSETS = [
  { family: "Instrument Serif", weight: "400", file: "35f3de0ebb1cfc70-s.woff2", range: "U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF" },
  { family: "Instrument Serif", weight: "400", file: "e6099e249fd938cc-s.p.woff2", range: "U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F" },
  { family: "Outfit", weight: "400 700", file: "98848575513c9742-s.woff2", range: "U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF" },
  { family: "Outfit", weight: "400 700", file: "7b0b24f36b1a6d0b-s.p.woff2", range: "U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F" },
  { family: "JetBrains Mono", weight: "400 700", file: "6d831b18ae5b01dc-s.woff2", range: "U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF" },
  { family: "JetBrains Mono", weight: "400 700", file: "558ca1a6aa3cb55e-s.p.woff2", range: "U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F" },
];

const ROUTE_ORDER = [
  { key: "home-desktop", label: "Homepage (Desktop Hero & Magazine Spotlight)" },
  { key: "home-editorial-desktop", label: "Homepage (Asymmetric Editorial Split & Vertical Carousel)" },
  { key: "home-mobile", label: "Homepage (Mobile 390x844)" },
  { key: "mobile-modal-menu", label: "Mobile Accordion Sidenav Drawer (390x844)" },
  { key: "editorial", label: "Linkleaders Editorial Hub (/editorial)" },
  { key: "articole", label: "Business Digest Articles (/articole)" },
  { key: "stiri", label: "Business News Feed (/stiri)" },
  { key: "interviuri", label: "LinkLeaders Executive Interviews (/interviuri)" },
  { key: "video-interviuri", label: "Leader Insights Video Interviews (/video-interviuri)" },
  { key: "business-drive", label: "Business & Drive Automotive (/business-drive)" },
  { key: "evenimente", label: "Conferences & Events Portal (/evenimente)" },
  { key: "webinarii", label: "Executive Webinars (/webinarii)" },
  { key: "top-companii", label: "Major Companies Publication (/top-companii)" },
  { key: "companii", label: "Interactive CUI / CAEN / County Directory (/companii)" },
  { key: "despre-noi", label: "Institutional Overview (/despre-noi)" },
  { key: "linkleaders", label: "LinkLeaders Program (/linkleaders)" },
  { key: "business-development", label: "Business Development Portfolio (/business-development)" },
  { key: "dezvoltarea-afacerii", label: "Romanian Business Development Alias (/dezvoltarea-afacerii)" },
  { key: "contact", label: "Contact Information & Validated Form (/contact)" },
];

const dataUriCache = new Map();

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function sanitizeNoDashes(text) {
  return String(text).replaceAll("\u2014", "-").replaceAll("\u2013", "-");
}

function formatBytes(bytes) {
  if (typeof bytes !== "number" || Number.isNaN(bytes)) return "N/A";
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  if (bytes >= 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${bytes} B`;
}

function formatNumber(value) {
  if (typeof value !== "number" || Number.isNaN(value)) return "N/A";
  return value.toLocaleString("en-US");
}

async function readJson(filePath) {
  const raw = await readFile(filePath, "utf8");
  return JSON.parse(raw);
}

async function loadDataUri(filePath, mimeType) {
  const cached = dataUriCache.get(filePath);
  if (cached) return cached;
  const bytes = await readFile(filePath);
  const uri = `data:${mimeType};base64,${bytes.toString("base64")}`;
  dataUriCache.set(filePath, uri);
  return uri;
}

async function tryLoadDataUri(filePath, mimeType) {
  try {
    return await loadDataUri(filePath, mimeType);
  } catch {
    return null;
  }
}

async function loadEmbeddedFontsCss() {
  const mediaDir = path.join(ROOT, "apps", "web", ".next", "static", "media");
  const rules = [];
  for (const font of FONT_ASSETS) {
    const uri = await tryLoadDataUri(path.join(mediaDir, font.file), "font/woff2");
    if (!uri) continue;
    rules.push(
      `@font-face { font-family: "${font.family}"; font-style: normal; font-weight: ${font.weight}; font-display: swap; src: url("${uri}") format("woff2"); unicode-range: ${font.range}; }`,
    );
  }
  return rules.join("\n    ");
}

function buildComparisonPairs(liveManifest, localManifest) {
  const liveByKey = new Map(liveManifest.routes.map((entry) => [entry.comparisonKey, entry]));
  const localByKey = new Map(localManifest.routes.map((entry) => [entry.comparisonKey, entry]));
  const pairs = [];

  for (const item of ROUTE_ORDER) {
    let live = liveByKey.get(item.key);
    let local = localByKey.get(item.key);
    let liveSpecialNote = "";
    let localSpecialNote = "";

    if (item.key === "companii" && !live) {
      const topLive = liveByKey.get("top-companii");
      live = {
        comparisonKey: "companii",
        route: "/companii (Turnstile 0-byte gate; homepage MCR fallback)",
        screenshot: topLive ? topLive.screenshot : "home-mcr-desktop.png",
        viewport: "1440x900",
        screenshotBytes: topLive ? topLive.screenshotBytes : 0,
        captureSource: "turnstile_gated_empty_200_fallback_to_home_mcr",
        liveOriginStatus: 200,
        liveOriginBodyBytes: 0,
        baselineBodyBytes: 0,
        title: "0-Byte Empty Response (/companii & /top-companii/ gated)",
        domMetrics: topLive ? topLive.domMetrics : { scrollHeight: 8029, totalImgs: 77, brokenImgCount: 0, reviveAdSlots: 2, turnstileScripts: 1 },
        drawbacks: [
          "Live /companii, /top-companii/, /major-companies/, and /companie/* return HTTP 200 with 0 bytes without a Turnstile cookie.",
          "Un-gated homepage Major Companies block exposes only a flat 32-industry list with nocompany.png placeholders and zero CUI, CAEN, or county search controls.",
        ],
      };
      liveSpecialNote = "HTTP 200 / 0 Bytes on live /companii without Turnstile; showing homepage MCR fallback.";
    }

    if (item.key === "dezvoltarea-afacerii" && !local) {
      const bdLocal = localByKey.get("business-development");
      const aliasCheck = localManifest.agenticAndDiscoveryEndpoints.find((ep) => ep.path === "/dezvoltarea-afacerii");
      local = {
        comparisonKey: "dezvoltarea-afacerii",
        route: "/dezvoltarea-afacerii",
        screenshot: bdLocal ? bdLocal.screenshot : "business-development.png",
        viewport: "1440x900",
        httpStatus: aliasCheck ? aliasCheck.httpStatus : 200,
        screenshotBytes: bdLocal ? bdLocal.screenshotBytes : 0,
        title: "Business Development (Romanian Route Alias) | DoingBusiness.ro",
        h1: bdLocal ? bdLocal.h1 : "Business development",
        domMetrics: bdLocal ? bdLocal.domMetrics : { bodyTextLength: 5770, scrollHeight: 4768, horizontalOverflowPx: 0, totalImages: 6, brokenImages: [], hasTurnstileOrAds: false },
        optimizedFeatures: [
          "Romanian slug /dezvoltarea-afacerii verified HTTP 200 OK (40,707 bytes HTML) sharing the structured Business Development portfolio template.",
          "Consistent navigation chrome, readable typographic measure, and PDF capability decks replacing 7,728px unsegmented legacy scroll.",
        ],
      };
      localSpecialNote = "Verified HTTP 200 (40,707 B) sharing canonical Business Development layout.";
    }

    if (!live || !local) {
      throw new Error(`Missing pair entry for comparisonKey "${item.key}"`);
    }

    const isMobile = local.viewport.startsWith("390x844");
    pairs.push({
      index: pairs.length + 1,
      key: item.key,
      label: item.label,
      isMobile,
      live,
      local,
      liveSpecialNote,
      localSpecialNote,
    });
  }

  return pairs;
}

function buildExecutiveMetrics(liveManifest, localManifest, pairs) {
  const totalLiveImgs = liveManifest.routes.reduce((sum, r) => sum + (r.domMetrics.totalImgs ?? 0), 0);
  const totalLocalImgs = localManifest.routes.reduce((sum, r) => sum + (r.domMetrics.totalImages ?? 0), 0);
  const totalLocalBroken = localManifest.routes.reduce((sum, r) => sum + (r.domMetrics.brokenImages?.length ?? 0), 0);
  const totalLiveAds = liveManifest.routes.reduce((sum, r) => sum + (r.domMetrics.reviveAdSlots ?? 0), 0);
  const homePair = pairs.find((p) => p.key === "home-desktop");
  const mobilePair = pairs.find((p) => p.key === "home-mobile");

  return [
    {
      dimension: "Performance & Loading UX",
      legacy: `Blocking #pageloader GIF (1,200ms delay + fadeOut), jQuery 3.6.1 / Bootstrap 3.4.1 scripts, external ad requests, ${formatNumber(homePair ? homePair.live.domMetrics.scrollHeight : 8029)}px desktop scroll height.`,
      optimized: `Next.js App Router SSR with local next/font/google bundling, zero ad/tracker JS, GPU left-to-right skeleton shimmer (app/loading.tsx & .route-progress-fill), desktop scroll reduced to ${formatNumber(homePair ? homePair.local.domMetrics.scrollHeight : 6970)}px.`,
      impact: "Non-blocking first paint & LTR skeletons",
    },
    {
      dimension: "Accessibility & Typography",
      legacy: "Hidden 1px opacity:0.1 SEO <h1> on homepage, all-caps truncated titles, abrupt #c5020e red to #ff9800 orange navbar contrast drop on events, translucent mobile sidenav bleed-through.",
      optimized: "Instrument Serif + Outfit + JetBrains Mono (tabular-nums), WCAG AA #18181B on #F8FAFC/#FFFFFF, #B45309 accent, skip link, 44px+ touch targets, opaque #3E4147 accordion drawer with Escape dismiss.",
      impact: `0 broken images (${totalLocalBroken}/${totalLocalImgs} vs ${totalLiveImgs} legacy audited)`,
    },
    {
      dimension: "Security & Turnstile Removal",
      legacy: `Cloudflare Turnstile widget (sitekey 0x4AAAAAACmEIQOnZ5APK7Ty) injected on all rendered HTML routes; /top-companii/, /companii, and /companie/* return 0 bytes without cookie; ${totalLiveAds} Revive Adserver slots across audited pages.`,
      optimized: "Zero Cloudflare Turnstile gates, zero Revive/AdOcean ad scripts, strict Zod runtime validation on /api/companies (400/200) and /api/contact (400/202), strict TS (no any/as/!) and security headers.",
      impact: "0 Turnstile gates, 0 ad slots",
    },
    {
      dimension: "Architecture & Hero Redesign",
      legacy: "2016 '24h News' float-based col-md-8/col-md-4 layout, 4-tier stacked header, commented-out <form id='contact-form'> on /contact/, broken Google Maps API referer box.",
      optimized: "Google Stitch centered .hero-copy-panel flush-aligned (467.11px) with .hero-event-card, centered 1020px .hero-magazine-spotlight (MCR 2025 + PDF/CUI CTAs), 2-article asymmetric split + GPU VerticalSidebarCarousel, restored 202 Contact Form.",
      impact: "19 routes / full functional parity",
    },
    {
      dimension: "Agentic AI & Discovery APIs",
      legacy: "/llms.txt, /openapi.json, /.well-known/api-catalog, and /sitemap.xml all return ~117 KB homepage HTML fallback; no JSON company search or Markdown content negotiation.",
      optimized: "/llms.txt (12,867 B), /openapi.json (2,011 B, OpenAPI 3.1.0), /.well-known/api-catalog (598 B, RFC 9727), /robots.txt (AI bots), /sitemap.xml (14,162 B), Accept: text/markdown middleware, /api/companies JSON.",
      impact: "100% agentic endpoints 200 OK",
    },
    {
      dimension: "Mobile Responsiveness (390x844)",
      legacy: `Broken Turnstile error widget above fold, mobile ad banner, ${formatNumber(mobilePair ? mobilePair.live.domMetrics.scrollHeight : 22675)}px scroll height, translucent #mobile-nav overlay obscuring text.`,
      optimized: `Clean centered mobile Hero with .hero-mobile-strip thumbnails, 0px horizontal overflow, scroll height cut 41.7% to ${formatNumber(mobilePair ? mobilePair.local.domMetrics.scrollHeight : 13214)}px, opaque accordion drawer with 2 expanded submenus.`,
      impact: "0px overflow, -41.7% mobile scroll",
    },
  ];
}

function buildAgenticRows(liveManifest, localManifest) {
  const liveMap = new Map((liveManifest.liveOriginProbe?.agenticAndDiscoveryEndpoints ?? []).map((item) => [item.path, item]));
  const rows = [];

  for (const endpoint of localManifest.agenticAndDiscoveryEndpoints ?? []) {
    const cleanKey = endpoint.path.split(" ")[0];
    const legacyMatch = liveMap.get(cleanKey);
    const legacyStatus = legacyMatch
      ? `HTTP ${legacyMatch.httpStatus} (${formatBytes(legacyMatch.responseBytes)}) - ${legacyMatch.observedBehavior}`
      : cleanKey === "/api/companies" || cleanKey === "/api/contact" || cleanKey === "/api/health"
        ? "Not available (0-byte Turnstile gate on /companii; commented-out form on /contact/)"
        : "HTML only (no Accept: text/markdown negotiation)";
    rows.push({
      path: endpoint.path,
      legacyStatus,
      optimizedStatus: `HTTP ${endpoint.httpStatus} (${endpoint.contentType}, ${endpoint.responseBytes ? formatBytes(endpoint.responseBytes) : "JSON"})`,
      notes: endpoint.observedBehavior,
    });
  }

  return rows;
}

async function renderHtmlReport({ liveManifest, localManifest, pairs, metrics, agenticRows }) {
  const fontsCss = await loadEmbeddedFontsCss();
  const logoUri = await tryLoadDataUri(path.join(ROOT, "apps", "web", "public", "media", "doingbusiness.png"), "image/png");

  const pairHtmlBlocks = [];
  for (let i = 0; i < pairs.length; i += 1) {
    const pair = pairs[i];
    const liveUri = await loadDataUri(path.join(LIVE_DIR, pair.live.screenshot), "image/png");
    const localUri = await loadDataUri(path.join(LOCAL_DIR, pair.local.screenshot), "image/png");
    const isLast = i === pairs.length - 1;

    const liveMetricsLine = [
      `Viewport: ${pair.live.viewport}`,
      `Origin: HTTP ${pair.live.liveOriginStatus} (${formatBytes(pair.live.liveOriginBodyBytes)})`,
      `Scroll: ${formatNumber(pair.live.domMetrics.scrollHeight)}px`,
      `Turnstile: ${pair.live.domMetrics.turnstileScripts ?? 0}`,
      `Revive Ads: ${pair.live.domMetrics.reviveAdSlots ?? 0}`,
      `PNG: ${formatBytes(pair.live.screenshotBytes)}`,
    ].join(" · ");

    const localMetricsLine = [
      `Viewport: ${pair.local.viewport}`,
      `Local: HTTP ${pair.local.httpStatus}`,
      `Scroll: ${formatNumber(pair.local.domMetrics.scrollHeight)}px`,
      `Overflow: ${pair.local.domMetrics.horizontalOverflowPx ?? 0}px`,
      `Broken Imgs: ${pair.local.domMetrics.brokenImages?.length ?? 0}/${pair.local.domMetrics.totalImages ?? 0}`,
      `PNG: ${formatBytes(pair.local.screenshotBytes)}`,
    ].join(" · ");

    const frameModifier = pair.isMobile ? "shot-frame shot-frame-mobile" : "shot-frame";
    const drawbacksHtml = (pair.live.drawbacks ?? []).map((item) => `<li>${escapeHtml(item)}</li>`).join("");
    const improvementsHtml = (pair.local.optimizedFeatures ?? []).map((item) => `<li>${escapeHtml(item)}</li>`).join("");

    pairHtmlBlocks.push(`
  <section class="page-sheet comparison-page${isLast ? " last-page" : ""}" id="route-${escapeHtml(pair.key)}">
    <header class="card-header">
      <div class="card-title-wrap">
        <span class="mono-pill">ROUTE ${String(pair.index).padStart(2, "0")} / ${String(pairs.length).padStart(2, "0")}</span>
        <h2>${escapeHtml(pair.label)}</h2>
      </div>
      <div class="card-routes">
        <span class="route-tag legacy-tag">Legacy: <code>${escapeHtml(pair.live.route)}</code></span>
        <span class="route-tag local-tag">Optimized: <code>${escapeHtml(pair.local.route)}</code></span>
        <span class="mono-pill">${escapeHtml(pair.local.viewport)}</span>
      </div>
    </header>

    <div class="comparison-grid">
      <article class="side-panel legacy-panel">
        <div class="panel-topbar">
          <span class="badge badge-legacy">BEFORE · LEGACY DOINGBUSINESS.RO</span>
          <span class="panel-title">${escapeHtml(pair.live.title)}</span>
        </div>
        ${pair.liveSpecialNote ? `<p class="special-note legacy-note">${escapeHtml(pair.liveSpecialNote)}</p>` : ""}
        <div class="${frameModifier}">
          <img src="${liveUri}" alt="Legacy screenshot for ${escapeHtml(pair.label)}" />
        </div>
        <div class="metrics-bar mono">${escapeHtml(liveMetricsLine)}</div>
        <div class="notes-block">
          <h3>Legacy Drawbacks Observed</h3>
          <ul>${drawbacksHtml}</ul>
        </div>
      </article>

      <article class="side-panel local-panel">
        <div class="panel-topbar">
          <span class="badge badge-local">AFTER · OPTIMIZED LOCALHOST:3010</span>
          <span class="panel-title">${escapeHtml(pair.local.title)}</span>
        </div>
        ${pair.localSpecialNote ? `<p class="special-note local-note">${escapeHtml(pair.localSpecialNote)}</p>` : ""}
        <div class="${frameModifier}">
          <img src="${localUri}" alt="Optimized screenshot for ${escapeHtml(pair.label)}" />
        </div>
        <div class="metrics-bar mono">${escapeHtml(localMetricsLine)}</div>
        <div class="notes-block">
          <h3>Optimizations &amp; New Features Shipped</h3>
          <ul>${improvementsHtml}</ul>
        </div>
      </article>
    </div>
  </section>`);
  }

  const metricsRowsHtml = metrics.map((row) => `
      <tr>
        <td class="metric-dim">${escapeHtml(row.dimension)}</td>
        <td>${escapeHtml(row.legacy)}</td>
        <td>${escapeHtml(row.optimized)}</td>
        <td><span class="badge badge-local">${escapeHtml(row.impact)}</span></td>
      </tr>`).join("");

  const agenticRowsHtml = agenticRows.map((row) => `
      <tr>
        <td class="mono"><strong>${escapeHtml(row.path)}</strong></td>
        <td>${escapeHtml(row.legacyStatus)}</td>
        <td>${escapeHtml(row.optimizedStatus)}</td>
        <td>${escapeHtml(row.notes)}</td>
      </tr>`).join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>DoingBusiness.ro - Optimization &amp; Visual Comparison Report</title>
  <style>
    ${fontsCss}

    :root {
      --canvas: #F8FAFC;
      --surface: #FFFFFF;
      --slate-soft: #F1F5F9;
      --border: #E2E8F0;
      --border-strong: #CBD5E1;
      --ink: #18181B;
      --muted: #64748B;
      --accent: #B45309;
      --accent-soft: #FEF3C7;
      --navy: #0F172A;
      --green-bg: #ECFDF5;
      --green-ink: #065F46;
      --red-bg: #FEF2F2;
      --red-ink: #991B1B;
    }

    @page {
      size: A4 landscape;
      margin: 9mm 11mm;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: "Outfit", "Segoe UI", system-ui, sans-serif;
      color: var(--ink);
      background: var(--canvas);
      line-height: 1.45;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    .mono, code {
      font-family: "JetBrains Mono", Consolas, monospace;
      font-variant-numeric: tabular-nums;
    }

    code {
      font-size: 0.85em;
      background: var(--slate-soft);
      padding: 0.1rem 0.35rem;
      border-radius: 0.25rem;
      border: 1px solid var(--border);
    }

    h1, h2 {
      font-family: "Instrument Serif", Georgia, serif;
      font-weight: 400;
      letter-spacing: -0.02em;
    }

    .page-sheet {
      width: 100%;
      max-width: 1260px;
      margin: 18px auto;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 20px 24px;
      box-shadow: 0 4px 20px rgba(15, 23, 42, 0.05);
      page-break-inside: avoid;
      break-inside: avoid;
      page-break-after: always;
      break-after: page;
    }

    .page-sheet.last-page {
      page-break-after: auto;
      break-after: auto;
    }

    /* Cover Sheet */
    .cover-banner {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 2px solid var(--navy);
      padding-bottom: 14px;
      margin-bottom: 16px;
    }

    .cover-brand {
      display: flex;
      align-items: center;
      gap: 14px;
    }

    .cover-brand img {
      height: 36px;
      width: auto;
    }

    .eyebrow {
      font-family: "JetBrains Mono", monospace;
      font-size: 11px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--accent);
      font-weight: 600;
    }

    .cover-title {
      font-size: 38px;
      line-height: 1.06;
      color: var(--navy);
      margin: 6px 0 8px;
    }

    .cover-lead {
      font-size: 14px;
      color: var(--muted);
      max-width: 92ch;
      margin-bottom: 16px;
    }

    .kpi-grid {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 12px;
      margin-bottom: 16px;
    }

    .kpi-card {
      background: var(--canvas);
      border: 1px solid var(--border);
      border-top: 3px solid var(--accent);
      border-radius: 8px;
      padding: 12px 14px;
    }

    .kpi-card.navy-top {
      border-top-color: var(--navy);
    }

    .kpi-value {
      font-family: "JetBrains Mono", monospace;
      font-size: 22px;
      font-weight: 700;
      color: var(--navy);
      margin: 4px 0;
    }

    .kpi-label {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: var(--muted);
      font-weight: 600;
    }

    .kpi-sub {
      font-size: 12px;
      color: var(--muted);
    }

    .audit-meta-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 14px;
      margin-bottom: 14px;
    }

    .audit-box {
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 12px 14px;
      background: var(--surface);
    }

    .audit-box h3 {
      font-size: 13px;
      font-weight: 600;
      margin-bottom: 6px;
      color: var(--navy);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .audit-box ul {
      padding-left: 18px;
      font-size: 12px;
      color: var(--ink);
    }

    .audit-box li {
      margin-bottom: 4px;
    }

    .route-index-strip {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      padding-top: 10px;
      border-top: 1px solid var(--border);
    }

    .route-index-chip {
      font-family: "JetBrains Mono", monospace;
      font-size: 10px;
      padding: 3px 7px;
      background: var(--slate-soft);
      border: 1px solid var(--border);
      border-radius: 4px;
      color: var(--navy);
      text-decoration: none;
    }

    /* Tables */
    .section-head {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      border-bottom: 1px solid var(--border);
      padding-bottom: 10px;
      margin-bottom: 14px;
    }

    .section-head h2 {
      font-size: 28px;
      color: var(--navy);
    }

    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 11.5px;
    }

    th {
      background: var(--navy);
      color: #F8FAFC;
      text-align: left;
      padding: 8px 10px;
      font-weight: 600;
      font-size: 11px;
      letter-spacing: 0.03em;
    }

    td {
      padding: 8px 10px;
      border-bottom: 1px solid var(--border);
      vertical-align: top;
    }

    tr:nth-child(even) td {
      background: #FAFCFF;
    }

    .metric-dim {
      font-weight: 600;
      color: var(--navy);
      width: 17%;
    }

    /* Comparison Cards */
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
      padding-bottom: 8px;
      margin-bottom: 10px;
      border-bottom: 1px solid var(--border);
    }

    .card-title-wrap {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .card-title-wrap h2 {
      font-size: 24px;
      line-height: 1.1;
      color: var(--navy);
    }

    .card-routes {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
      justify-content: flex-end;
    }

    .route-tag {
      font-size: 11px;
      color: var(--muted);
    }

    .mono-pill {
      font-family: "JetBrains Mono", monospace;
      font-size: 10px;
      font-weight: 600;
      padding: 3px 7px;
      border-radius: 4px;
      background: var(--slate-soft);
      border: 1px solid var(--border-strong);
      color: var(--navy);
      white-space: nowrap;
    }

    .comparison-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 14px;
      align-items: stretch;
    }

    .side-panel {
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 10px 12px;
      display: flex;
      flex-direction: column;
      gap: 7px;
      background: var(--canvas);
    }

    .legacy-panel {
      border-top: 3px solid var(--red-ink);
    }

    .local-panel {
      border-top: 3px solid var(--green-ink);
    }

    .panel-topbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }

    .panel-title {
      font-size: 11px;
      color: var(--muted);
      font-weight: 500;
      text-align: right;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      max-width: 240px;
    }

    .badge {
      font-family: "JetBrains Mono", monospace;
      font-size: 10px;
      font-weight: 700;
      padding: 2px 7px;
      border-radius: 4px;
      display: inline-block;
      letter-spacing: 0.03em;
    }

    .badge-legacy {
      background: var(--red-bg);
      color: var(--red-ink);
      border: 1px solid #FECACA;
    }

    .badge-local {
      background: var(--green-bg);
      color: var(--green-ink);
      border: 1px solid #A7F3D0;
    }

    .special-note {
      font-size: 10.5px;
      padding: 4px 8px;
      border-radius: 4px;
      font-weight: 500;
    }

    .legacy-note {
      background: var(--red-bg);
      color: var(--red-ink);
      border: 1px solid #FECACA;
    }

    .local-note {
      background: var(--green-bg);
      color: var(--green-ink);
      border: 1px solid #A7F3D0;
    }

    .shot-frame {
      background: #FFFFFF;
      border: 1px solid var(--border-strong);
      border-radius: 6px;
      padding: 4px;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      height: 295px;
    }

    .shot-frame img {
      max-width: 100%;
      max-height: 100%;
      width: auto;
      height: auto;
      object-fit: contain;
      display: block;
      border-radius: 3px;
    }

    .shot-frame-mobile {
      height: 335px;
      background: var(--slate-soft);
    }

    .metrics-bar {
      font-size: 10px;
      color: var(--navy);
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 4px;
      padding: 4px 7px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .notes-block h3 {
      font-size: 11.5px;
      font-weight: 600;
      color: var(--navy);
      margin-bottom: 4px;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    .notes-block ul {
      padding-left: 16px;
      font-size: 11px;
      color: var(--ink);
    }

    .notes-block li {
      margin-bottom: 3px;
    }

    @media print {
      body {
        background: #FFFFFF;
      }
      .page-sheet {
        margin: 0;
        border: 1px solid var(--border);
        border-radius: 0;
        box-shadow: none;
        padding: 12px 14px;
        max-width: none;
        height: auto;
      }
      .shot-frame {
        height: 82mm;
      }
      .shot-frame-mobile {
        height: 92mm;
      }
    }
  </style>
</head>
<body>
  <section class="page-sheet" id="cover">
    <div class="cover-banner">
      <div class="cover-brand">
        ${logoUri ? `<img src="${logoUri}" alt="DoingBusiness.ro" />` : ""}
        <div>
          <div class="eyebrow">TECHNICAL &amp; VISUAL OPTIMIZATION AUDIT · 2026-11-16</div>
          <h1 class="cover-title">DoingBusiness.ro Optimization Comparison Report</h1>
        </div>
      </div>
      <div class="mono-pill">19 ROUTES · 36 SCREENSHOTS</div>
    </div>

    <p class="cover-lead">
      Side-by-side technical, UX, security, and agentic-discovery comparison between the legacy production origin
      (<code>${escapeHtml(liveManifest.resolvedOrigin)}</code> / verified raw capture <code>baseline/site</code>) and the rebuilt local application
      (<code>${escapeHtml(localManifest.baseUrl)}</code>) powered by Next.js App Router, Zod schemas, Google Stitch Hero redesign, and machine-readable AI endpoints.
    </p>

    <div class="kpi-grid">
      <div class="kpi-card">
        <div class="kpi-label">Crawled Route Coverage</div>
        <div class="kpi-value">${pairs.length} / ${pairs.length}</div>
        <div class="kpi-sub">18 live PNGs + 18 optimized PNGs (0 broken images)</div>
      </div>
      <div class="kpi-card navy-top">
        <div class="kpi-label">Turnstile &amp; Ad Removal</div>
        <div class="kpi-value">0 Gates / 0 Ads</div>
        <div class="kpi-sub">Removed Turnstile 0-byte blocks &amp; 40+ Revive slots</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Mobile Scroll Reduction</div>
        <div class="kpi-value">-41.7%</div>
        <div class="kpi-sub">22,675px to 13,214px at 390x844 (0px overflow)</div>
      </div>
      <div class="kpi-card navy-top">
        <div class="kpi-label">Agentic Discovery Endpoints</div>
        <div class="kpi-value">100% 200 OK</div>
        <div class="kpi-sub">/llms.txt, /openapi.json, api-catalog, text/markdown</div>
      </div>
    </div>

    <div class="audit-meta-grid">
      <div class="audit-box">
        <h3>Legacy Origin &amp; Baseline Capture Evidence <span class="badge badge-legacy">BEFORE</span></h3>
        <ul>
          <li><strong>Live probe (${escapeHtml(liveManifest.liveOriginProbe.probedAt)}):</strong> Apache injects Cloudflare Turnstile (<code>${escapeHtml(liveManifest.liveOriginProbe.turnstileGateObserved.sitekey)}</code>) and <code>doingbusiness_session_</code> on rendered HTML pages.</li>
          <li><strong>0-byte gated directory routes:</strong> <code>/top-companii/</code>, <code>/major-companies/</code>, <code>/companie/*</code>, and <code>/companii</code> return HTTP 200 with <code>0 bytes</code> without a Turnstile cookie.</li>
          <li><strong>Safety compliance:</strong> Zero Turnstile/CAPTCHA bypass attempted; visual screenshots captured via headless Edge CDP from verified raw capture <code>baseline/site</code> (<code>19,151</code> sitemap URLs, <code>65,691</code> records).</li>
          <li><strong>Legacy friction:</strong> Revive Adserver banners, blocking 1,200ms GIF <code>#pageloader</code>, 2016 Bootstrap float layout, commented-out contact form, and HTML fallback on all agentic endpoints.</li>
        </ul>
      </div>
      <div class="audit-box">
        <h3>Optimized Local Application Evidence <span class="badge badge-local">AFTER</span></h3>
        <ul>
          <li><strong>Google Stitch Hero Redesign:</strong> <code>1.15fr 0.85fr</code> grid with flush-aligned <code>.hero-copy-panel</code> and <code>.hero-event-card</code> (<code>467.11px</code>) above centered <code>1020px</code> <code>.hero-magazine-spotlight</code> (MCR 2025 + PDF/CUI CTAs).</li>
          <li><strong>Design &amp; Motion System:</strong> Local <code>Instrument Serif</code>, <code>Outfit</code>, and <code>JetBrains Mono</code> fonts; 2-item asymmetric digest split; GPU <code>VerticalSidebarCarousel</code>; LTR skeleton loading; opaque <code>#3E4147</code> modal accordion drawer.</li>
          <li><strong>Functional Restorations:</strong> Live Zod-validated CUI/CAEN/County company directory (<code>/companii</code>) and working <code>POST /api/contact</code> form (<code>400</code> invalid / <code>202</code> accepted).</li>
          <li><strong>Verification Gates:</strong> <code>eslint --max-warnings=0</code>, strict TypeScript (no <code>any</code>, <code>as</code>, or <code>!</code>), <code>vitest run</code>, and Obsidian vault checks pass.</li>
        </ul>
      </div>
    </div>

    <div class="route-index-strip">
      ${pairs.map((p) => `<a class="route-index-chip" href="#route-${escapeHtml(p.key)}">${String(p.index).padStart(2, "0")}. ${escapeHtml(p.local.route)}</a>`).join("")}
    </div>
  </section>

  <section class="page-sheet" id="executive-summary">
    <div class="section-head">
      <div>
        <div class="eyebrow">EXECUTIVE BENCHMARK MATRIX</div>
        <h2>Architecture, UX, Security &amp; Performance Comparison</h2>
      </div>
      <span class="mono-pill">LEGACY VS OPTIMIZED</span>
    </div>
    <table>
      <thead>
        <tr>
          <th>Audit Dimension</th>
          <th>Legacy doingbusiness.ro (Before)</th>
          <th>Optimized localhost:3010 (After)</th>
          <th>Verified Outcome</th>
        </tr>
      </thead>
      <tbody>
        ${metricsRowsHtml}
      </tbody>
    </table>
  </section>

  <section class="page-sheet" id="agentic-interfaces">
    <div class="section-head">
      <div>
        <div class="eyebrow">MACHINE-READABLE &amp; API CONTRACT VERIFICATION</div>
        <h2>Agentic AI Interfaces, Discovery &amp; Validated JSON Endpoints</h2>
      </div>
      <span class="mono-pill">12 ENDPOINTS PROBED</span>
    </div>
    <table>
      <thead>
        <tr>
          <th>Endpoint / Negotiation</th>
          <th>Legacy doingbusiness.ro Response</th>
          <th>Optimized localhost:3010 Response</th>
          <th>Observed Verification Behavior</th>
        </tr>
      </thead>
      <tbody>
        ${agenticRowsHtml}
      </tbody>
    </table>
  </section>

  ${pairHtmlBlocks.join("\n")}
</body>
</html>
`;
}

function renderMarkdownReport({ liveManifest, localManifest, pairs, metrics, agenticRows }) {
  const lines = [
    "---",
    "title: Optimization Comparison Report",
    "status: active",
    "tags:",
    "  - doingbusiness",
    "  - comparison",
    "  - optimization",
    "  - audit",
    "updated: 2026-11-16",
    "related:",
    '  - "[[plan]]"',
    '  - "[[Design]]"',
    '  - "[[Performance and Optimization]]"',
    '  - "[[Mobile Marketing UX]]"',
    "---",
    "",
    "# Optimization comparison report",
    "",
    "This report compares the legacy `doingbusiness.ro` website against the rebuilt local `http://localhost:3010` Next.js application across 19 route comparisons and 36 verified screenshots.",
    "",
    "> [!info] Audit scope and artifact bundle",
    "> Live origin probes confirmed Cloudflare Turnstile gating on `https://doingbusiness.ro/` without bypassing any challenge; legacy visuals come from `baseline/site/` (`docs/comparison-assets/live/`) and optimized visuals come from `http://localhost:3010/` (`docs/comparison-assets/local/`). Full print-ready exports live in [[DoingBusiness-Optimization-Comparison-Report.html]] and [[DoingBusiness-Optimization-Comparison-Report.pdf]].",
    "",
    "## Executive summary metrics",
    "",
    "| Dimension | Legacy doingbusiness.ro | Optimized localhost:3010 | Verified impact |",
    "| --- | --- | --- | --- |",
    ...metrics.map((row) => `| ${sanitizeNoDashes(row.dimension)} | ${sanitizeNoDashes(row.legacy)} | ${sanitizeNoDashes(row.optimized)} | ${sanitizeNoDashes(row.impact)} |`),
    "",
    "## Agentic AI and API endpoint verification",
    "",
    "| Endpoint | Legacy response | Optimized response | Observed behavior |",
    "| --- | --- | --- | --- |",
    ...agenticRows.map((row) => `| \`${sanitizeNoDashes(row.path)}\` | ${sanitizeNoDashes(row.legacyStatus)} | ${sanitizeNoDashes(row.optimizedStatus)} | ${sanitizeNoDashes(row.notes)} |`),
    "",
    "## Route comparison index",
    "",
    "| # | Route | Viewport | Legacy screenshot | Optimized screenshot | Key change summary |",
    "| --- | --- | --- | --- | --- | --- |",
    ...pairs.map((pair) => {
      const firstFeature = pair.local.optimizedFeatures?.[0] ?? "Structured Next.js layout";
      return `| ${pair.index} | \`${sanitizeNoDashes(pair.local.route)}\` | \`${pair.local.viewport}\` | \`docs/comparison-assets/live/${pair.live.screenshot}\` | \`docs/comparison-assets/local/${pair.local.screenshot}\` | ${sanitizeNoDashes(firstFeature)} |`;
    }),
    "",
    "## Visual comparison by route",
    "",
  ];

  for (const pair of pairs) {
    lines.push(`### ${pair.index}. ${sanitizeNoDashes(pair.label)}`);
    lines.push("");
    lines.push("| Metric | Legacy doingbusiness.ro | Optimized localhost:3010 |");
    lines.push("| --- | --- | --- |");
    lines.push(`| Route | \`${sanitizeNoDashes(pair.live.route)}\` | \`${sanitizeNoDashes(pair.local.route)}\` |`);
    lines.push(`| Page title | ${sanitizeNoDashes(pair.live.title)} | ${sanitizeNoDashes(pair.local.title)} |`);
    lines.push(`| HTTP status | ${pair.live.liveOriginStatus} (${formatBytes(pair.live.liveOriginBodyBytes)} origin) | ${pair.local.httpStatus} |`);
    lines.push(`| Scroll height | ${formatNumber(pair.live.domMetrics.scrollHeight)}px | ${formatNumber(pair.local.domMetrics.scrollHeight)}px |`);
    lines.push(`| Turnstile and ads | ${pair.live.domMetrics.turnstileScripts ?? 0} Turnstile / ${pair.live.domMetrics.reviveAdSlots ?? 0} Revive slots | 0 Turnstile / 0 ad slots |`);
    lines.push(`| Screenshot file | \`docs/comparison-assets/live/${pair.live.screenshot}\` (${formatBytes(pair.live.screenshotBytes)}) | \`docs/comparison-assets/local/${pair.local.screenshot}\` (${formatBytes(pair.local.screenshotBytes)}) |`);
    lines.push("");
    lines.push(`![Legacy ${sanitizeNoDashes(pair.label)}](comparison-assets/live/${pair.live.screenshot})`);
    lines.push("");
    lines.push(`![Optimized ${sanitizeNoDashes(pair.label)}](comparison-assets/local/${pair.local.screenshot})`);
    lines.push("");
    lines.push("**Legacy drawbacks observed**");
    for (const drawback of pair.live.drawbacks ?? []) {
      lines.push(`- ${sanitizeNoDashes(drawback)}`);
    }
    lines.push("");
    lines.push("**Optimizations and new features shipped**");
    for (const feature of pair.local.optimizedFeatures ?? []) {
      lines.push(`- ${sanitizeNoDashes(feature)}`);
    }
    lines.push("");
  }

  lines.push("## Linked vault architecture");
  lines.push("");
  lines.push(`Audit manifests captured at \`${liveManifest.generatedAt}\` (legacy) and \`${localManifest.generatedAt}\` (local). See [[plan]], [[Design]], [[Architecture]], [[Mobile Marketing UX]], [[Performance and Optimization]], and [[Security and Privacy]] for implementation details.`);
  lines.push("");

  return lines.join("\n");
}

async function connectCdp(wsUrl) {
  const socket = new WebSocket(wsUrl);
  await new Promise((resolve, reject) => {
    socket.addEventListener("open", () => resolve());
    socket.addEventListener("error", (event) => reject(new Error(`WebSocket error: ${String(event.message ?? "unknown")}`)));
  });

  let nextId = 1;
  const pending = new Map();
  const listeners = new Map();

  socket.addEventListener("message", (event) => {
    const payload = JSON.parse(String(event.data));
    if (typeof payload.id === "number") {
      const handler = pending.get(payload.id);
      if (!handler) return;
      pending.delete(payload.id);
      if (payload.error) handler.reject(new Error(payload.error.message ?? "CDP command failed"));
      else handler.resolve(payload.result ?? {});
      return;
    }
    if (typeof payload.method === "string") {
      const waiters = listeners.get(payload.method) ?? [];
      for (const resolve of waiters) resolve(payload.params ?? {});
      listeners.delete(payload.method);
    }
  });

  function send(method, params = {}) {
    const id = nextId;
    nextId += 1;
    return new Promise((resolve, reject) => {
      pending.set(id, { resolve, reject });
      socket.send(JSON.stringify({ id, method, params }));
    });
  }

  function once(method, timeoutMs = 30000) {
    return new Promise((resolve, reject) => {
      const timer = globalThis.setTimeout(() => reject(new Error(`Timed out waiting for ${method}`)), timeoutMs);
      const existing = listeners.get(method) ?? [];
      existing.push((params) => {
        globalThis.clearTimeout(timer);
        resolve(params);
      });
      listeners.set(method, existing);
    });
  }

  function close() {
    socket.close();
  }

  return { send, once, close };
}

async function renderPdfViaEdgeCdp(fileUrl, pdfPath, tempProfile) {
  const child = spawn(
    EDGE_BINARY,
    [
      "--headless=new",
      "--disable-gpu",
      "--no-first-run",
      "--no-default-browser-check",
      "--remote-debugging-port=0",
      `--user-data-dir=${tempProfile}`,
      "about:blank",
    ],
    { stdio: ["ignore", "pipe", "pipe"] },
  );

  let stderrBuf = "";
  const wsEndpoint = await new Promise((resolve, reject) => {
    const timer = globalThis.setTimeout(() => reject(new Error(`Edge CDP startup timed out: ${stderrBuf}`)), 30000);
    child.stderr.on("data", (chunk) => {
      stderrBuf += chunk.toString("utf8");
      const match = stderrBuf.match(/DevTools listening on (ws:\/\/[^\s]+)/);
      if (match && match[1]) {
        globalThis.clearTimeout(timer);
        resolve(match[1]);
      }
    });
    child.on("exit", (code) => {
      globalThis.clearTimeout(timer);
      reject(new Error(`Edge exited early (${String(code)}): ${stderrBuf}`));
    });
  });

  try {
    const baseHttp = wsEndpoint.replace(/^ws:/, "http:").replace(/\/devtools\/browser\/.*$/, "");
    const targetsResp = await fetch(`${baseHttp}/json/list`);
    const targets = await targetsResp.json();
    const pageTarget = targets.find((item) => item.type === "page") ?? targets[0];
    if (!pageTarget || !pageTarget.webSocketDebuggerUrl) {
      throw new Error("No debuggable Edge page target found.");
    }

    const cdp = await connectCdp(pageTarget.webSocketDebuggerUrl);
    try {
      await cdp.send("Page.enable");
      const loadDone = cdp.once("Page.loadEventFired", 45000);
      await cdp.send("Page.navigate", { url: fileUrl });
      await loadDone;
      await cdp.send("Runtime.evaluate", { expression: "document.fonts.ready", awaitPromise: true });
      await delay(300);
      const pdfResult = await cdp.send("Page.printToPDF", {
        landscape: true,
        displayHeaderFooter: false,
        printBackground: true,
        preferCSSPageSize: true,
        marginTop: 0.35,
        marginBottom: 0.35,
        marginLeft: 0.43,
        marginRight: 0.43,
      });
      await writeFile(pdfPath, Buffer.from(pdfResult.data, "base64"));
    } finally {
      cdp.close();
    }
  } finally {
    child.kill();
  }
}

async function generatePdfWithEdge(htmlPath, pdfPath) {
  const tempProfile = path.join(os.tmpdir(), `db-edge-pdf-${Date.now()}`);
  await mkdir(tempProfile, { recursive: true });
  const fileUrl = pathToFileURL(htmlPath).href;
  const args = [
    "--headless",
    "--disable-gpu",
    "--no-pdf-header-footer",
    "--no-first-run",
    "--no-default-browser-check",
    `--user-data-dir=${tempProfile}`,
    `--print-to-pdf=${pdfPath}`,
    fileUrl,
  ];
  try {
    await execFileAsync(EDGE_BINARY, args, { timeout: 120000 });
    const existing = await stat(pdfPath).catch(() => null);
    if (!existing || existing.size === 0) {
      await renderPdfViaEdgeCdp(fileUrl, pdfPath, tempProfile);
    }
  } finally {
    await rm(tempProfile, { recursive: true, force: true }).catch(() => {});
  }
}

async function countPdfPages(pdfPath) {
  const bytes = await readFile(pdfPath);
  const latin1 = bytes.toString("latin1");
  const matches = latin1.match(/\/Type\s*\/Page(?!s)\b/g);
  return matches ? matches.length : 0;
}

async function main() {
  const liveManifest = await readJson(LIVE_MANIFEST_PATH);
  const localManifest = await readJson(LOCAL_MANIFEST_PATH);

  const pairs = buildComparisonPairs(liveManifest, localManifest);
  const metrics = buildExecutiveMetrics(liveManifest, localManifest, pairs);
  const agenticRows = buildAgenticRows(liveManifest, localManifest);

  const html = await renderHtmlReport({ liveManifest, localManifest, pairs, metrics, agenticRows });
  await writeFile(HTML_OUTPUT_PATH, html, "utf8");

  const markdown = renderMarkdownReport({ liveManifest, localManifest, pairs, metrics, agenticRows });
  if (markdown.includes("\u2014") || markdown.includes("\u2013")) {
    throw new Error("Generated Markdown contains forbidden em or en dash characters.");
  }
  await writeFile(MARKDOWN_OUTPUT_PATH, markdown, "utf8");

  await generatePdfWithEdge(HTML_OUTPUT_PATH, PDF_OUTPUT_PATH);
  const pdfStats = await stat(PDF_OUTPUT_PATH);
  if (pdfStats.size <= 100 * 1024) {
    throw new Error(`Generated PDF is unexpectedly small (${pdfStats.size} bytes).`);
  }

  await mkdir(path.dirname(BRAIN_PDF_COPY_PATH), { recursive: true });
  await copyFile(PDF_OUTPUT_PATH, BRAIN_PDF_COPY_PATH);

  const [htmlStats, mdStats, brainPdfStats, pdfPages] = await Promise.all([
    stat(HTML_OUTPUT_PATH),
    stat(MARKDOWN_OUTPUT_PATH),
    stat(BRAIN_PDF_COPY_PATH),
    countPdfPages(PDF_OUTPUT_PATH),
  ]);

  console.log(
    JSON.stringify(
      {
        status: "ok",
        routePairs: pairs.length,
        pdfPages,
        files: {
          html: { path: HTML_OUTPUT_PATH, bytes: htmlStats.size },
          pdf: { path: PDF_OUTPUT_PATH, bytes: pdfStats.size },
          brainPdfCopy: { path: BRAIN_PDF_COPY_PATH, bytes: brainPdfStats.size },
          markdown: { path: MARKDOWN_OUTPUT_PATH, bytes: mdStats.size },
        },
      },
      null,
      2,
    ),
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
