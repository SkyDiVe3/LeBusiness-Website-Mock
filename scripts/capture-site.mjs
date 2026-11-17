import { createHash } from "node:crypto";
import { mkdir, readFile, readdir, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT_URL = "https://doingbusiness.ro/";
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const args = new Set(process.argv.slice(2));
const valueAfter = (flag, fallback) => {
  const index = process.argv.indexOf(flag);
  return index === -1 ? fallback : process.argv[index + 1] ?? fallback;
};
const limit = Number(valueAfter("--limit", "0"));
const concurrency = Math.max(1, Number(valueAfter("--concurrency", "4")));
const destination = path.resolve(ROOT, valueAfter("--output", "baseline"));
const resume = args.has("--resume");
const sleep = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));
const sha256 = (bytes) => createHash("sha256").update(bytes).digest("hex");
const isPublicFirstParty = (url) => url.hostname === "doingbusiness.ro" && !url.pathname.startsWith("/admin/");
const isIgnoredScheme = (value) => /^(?:#|data:|mailto:|tel:|javascript:)/i.test(value.trim());
const trackingKeys = new Set(["fbclid", "gclid", "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"]);

function canonicalize(input, base = ROOT_URL) {
  const url = new URL(input, base);
  url.hash = "";
  for (const key of [...url.searchParams.keys()]) {
    if (trackingKeys.has(key.toLowerCase())) url.searchParams.delete(key);
  }
  return url;
}

function routePath(url) {
  const pathname = decodeURIComponent(url.pathname);
  const normalized = pathname === "/" ? "/" : pathname.replace(/\/+$/, "");
  return normalized === "/" ? "/index.html" : `${normalized}/index.html`;
}

function assetPath(url) {
  const cleanPath = decodeURIComponent(url.pathname).replace(/^\/+/, "");
  const safePath = cleanPath || "index";
  if (!url.search) return `/${safePath}`;
  const extension = path.extname(safePath);
  const stem = extension ? safePath.slice(0, -extension.length) : safePath;
  return `/${stem}--${sha256(url.search).slice(0, 12)}${extension}`;
}

function localUrl(url, kind) {
  return kind === "page" ? routePath(url).replace(/index\.html$/, "") || "/" : assetPath(url);
}

function contentType(response) {
  return response.headers.get("content-type")?.split(";")[0].trim().toLowerCase() ?? "application/octet-stream";
}

function isHtml(type) {
  return type === "text/html" || type === "application/xhtml+xml";
}

function isCss(type, url) {
  return type === "text/css" || /\.css(?:$|\?)/i.test(url.pathname);
}

function isLikelyPage(url) {
  return !/\.(?:avif|bmp|css|csv|docx?|eot|gif|ico|jpe?g|js|json|m4[av]|mov|mp3|mp4|ogg|otf|pdf|png|svg|ttf|txt|web[mp]|woff2?|xlsx?|xml|zip)$/i.test(url.pathname);
}

async function fetchWithRetry(url) {
  let error;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const response = await fetch(url, { headers: { "user-agent": "DoingBusinessLocalMirror/1.0 (local educational reconstruction)" }, redirect: "follow" });
      if (response.ok) return response;
      if (![408, 425, 429, 500, 502, 503, 504].includes(response.status)) return response;
      error = new Error(`HTTP ${response.status}`);
    } catch (caught) {
      error = caught;
    }
    await sleep(attempt * 800);
  }
  throw error;
}

function collectUrls(text, base, pattern, callback) {
  for (const match of text.matchAll(pattern)) {
    const value = match[1]?.trim();
    if (!value || isIgnoredScheme(value)) continue;
    try { callback(canonicalize(value, base)); } catch { /* malformed source URL */ }
  }
}

function rewriteHtml(html, pageUrl, enqueuePage, enqueueAsset) {
  const attributePattern = /\b(?:href|src|poster|data-src)\s*=\s*(["'])(.*?)\1/gi;
  return html.replace(attributePattern, (whole, quote, value) => {
    if (isIgnoredScheme(value)) return whole;
    let url;
    try { url = canonicalize(value, pageUrl); } catch { return whole; }
    if (!isPublicFirstParty(url)) return whole;
    if (isLikelyPage(url)) {
      enqueuePage(url);
      return whole.replace(value, localUrl(url, "page"));
    }
    enqueueAsset(url);
    return whole.replace(value, localUrl(url, "asset"));
  });
}

function rewriteCss(css, stylesheetUrl, enqueueAsset) {
  const comments = [];
  const withoutComments = css.replace(/\/\*[\s\S]*?\*\//g, (comment) => {
    const token = `__MIRROR_COMMENT_${comments.length}__`;
    comments.push(comment);
    return token;
  });
  const pattern = /url\(\s*(["']?)([^"')]+)\1\s*\)/gi;
  const rewritten = withoutComments.replace(pattern, (whole, quote, value) => {
    if (isIgnoredScheme(value)) return whole;
    let url;
    try { url = canonicalize(value, stylesheetUrl); } catch { return whole; }
    if (!isPublicFirstParty(url)) return whole;
    enqueueAsset(url);
    return `url(${quote}${localUrl(url, "asset")}${quote})`;
  });
  return rewritten.replace(/__MIRROR_COMMENT_(\d+)__/g, (_, index) => comments[Number(index)]);
}

async function writeAt(relativePath, content) {
  const target = path.join(destination, "site", relativePath);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, content);
}

async function inventoryFiles(directory, prefix = "") {
  const found = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const relative = path.posix.join(prefix, entry.name);
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) found.push(...await inventoryFiles(absolute, relative));
    else found.push({ relative: `/${relative.replaceAll("\\", "/")}`, absolute });
  }
  return found;
}

async function getSitemapUrls() {
  const robots = await fetchWithRetry(new URL("robots.txt", ROOT_URL));
  const declared = [...(await robots.text()).matchAll(/^Sitemap:\s*(\S+)$/gim)].map((match) => match[1]);
  const indexUrl = declared[0] ?? new URL("sitemap-index.xml", ROOT_URL).href;
  const index = await fetchWithRetry(indexUrl);
  const childMaps = [...(await index.text()).matchAll(/<loc>([^<]+)<\/loc>/gi)].map((match) => match[1]);
  const urls = new Set();
  for (const sitemapUrl of childMaps) {
    const map = await fetchWithRetry(sitemapUrl);
    collectUrls(await map.text(), sitemapUrl, /<loc>([^<]+)<\/loc>/gi, (url) => {
      if (isPublicFirstParty(url)) urls.add(url.href);
    });
  }
  return { indexUrl, childMaps, urls };
}

async function main() {
  if (!resume) await rm(destination, { recursive: true, force: true });
  await mkdir(path.join(destination, "reports"), { recursive: true });
  const startedAt = new Date().toISOString();
  const routes = new Map();
  const assets = new Map();
  const failures = [];
  const manifestPath = path.join(destination, "reports", "route-manifest.json");
  if (resume) {
    try {
      const previous = JSON.parse(await readFile(manifestPath, "utf8"));
      for (const route of previous.routes ?? []) routes.set(route.sourceUrl, route);
      for (const asset of previous.assets ?? []) assets.set(asset.sourceUrl, asset);
      failures.push(...(previous.failures ?? []));
      console.log(`Resuming from ${routes.size} routes and ${assets.size} assets.`);
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
    }
  }
  const queuedPages = new Set(routes.keys());
  const queuedAssets = new Set(assets.keys());
  const pageQueue = [];
  const assetQueue = [];
  const enqueuePage = (url) => {
    if (!isPublicFirstParty(url) || queuedPages.has(url.href)) return;
    queuedPages.add(url.href); pageQueue.push(url);
  };
  const enqueueAsset = (url) => {
    if (!isPublicFirstParty(url) || queuedAssets.has(url.href)) return;
    queuedAssets.add(url.href); assetQueue.push(url);
  };

  const sitemap = await getSitemapUrls();
  const allSitemapUrls = [...sitemap.urls];
  const existingFiles = await inventoryFiles(path.join(destination, "site")).catch(() => []);
  const pageByPath = new Map(allSitemapUrls.map((value) => [routePath(new URL(value)), value]));
  for (const file of existingFiles) {
    const sourceUrl = pageByPath.get(file.relative);
    if (sourceUrl && !routes.has(sourceUrl)) {
      const content = await readFile(file.absolute);
      routes.set(sourceUrl, { sourceUrl, finalUrl: sourceUrl, localPath: file.relative, status: 200, contentType: "text/html", checksum: sha256(content), capturedAt: "recovered-from-existing-file" });
    }
  }
  for (const url of allSitemapUrls) enqueuePage(new URL(url));
  const sitemapPageCount = allSitemapUrls.length;
  if (resume && routes.size) console.log(`Recovered ${routes.size} existing sitemap routes from disk.`);
  console.log(`Discovered ${sitemapPageCount} sitemap routes.`);

  async function capturePage(url) {
    const sourceUrl = url.href;
    try {
      const response = await fetchWithRetry(url);
      const type = contentType(response);
      const finalUrl = canonicalize(response.url);
      const bytes = Buffer.from(await response.arrayBuffer());
      if (!response.ok || !isHtml(type)) {
        failures.push({ sourceUrl, phase: "page", status: response.status, reason: `Expected HTML, received ${type}` });
        return;
      }
      const html = rewriteHtml(bytes.toString("utf8"), finalUrl, enqueuePage, enqueueAsset);
      const localPath = routePath(url);
      await writeAt(localPath, html);
      routes.set(sourceUrl, { sourceUrl, finalUrl: finalUrl.href, localPath, status: response.status, contentType: type, checksum: sha256(html), capturedAt: new Date().toISOString() });
    } catch (error) {
      failures.push({ sourceUrl, phase: "page", reason: String(error) });
    }
  }

  async function captureAsset(url) {
    const sourceUrl = url.href;
    try {
      const response = await fetchWithRetry(url);
      const type = contentType(response);
      if (!response.ok) {
        failures.push({ sourceUrl, phase: "asset", status: response.status, reason: `HTTP ${response.status}` });
        return;
      }
      let bytes = Buffer.from(await response.arrayBuffer());
      if (isCss(type, url)) bytes = Buffer.from(rewriteCss(bytes.toString("utf8"), url, enqueueAsset), "utf8");
      const localPath = assetPath(url);
      await writeAt(localPath, bytes);
      assets.set(sourceUrl, { sourceUrl, localPath, status: response.status, contentType: type, bytes: bytes.length, checksum: sha256(bytes), capturedAt: new Date().toISOString() });
    } catch (error) {
      failures.push({ sourceUrl, phase: "asset", reason: String(error) });
    }
  }

  async function drain(queue, handler, label) {
    let completed = 0;
    while (queue.length > 0) {
      if (label === "pages" && limit > 0 && completed >= limit) break;
      const batch = queue.splice(0, concurrency);
      await Promise.all(batch.map(handler));
      completed += batch.length;
      if (completed % 100 === 0 || queue.length === 0) console.log(`${label}: ${completed} processed; ${queue.length} queued.`);
      await sleep(80);
    }
  }

  await drain(pageQueue, capturePage, "pages");
  await drain(assetQueue, captureAsset, "assets");
  const finishedAt = new Date().toISOString();
  const report = {
    source: ROOT_URL, startedAt, finishedAt, captureMode: limit ? `limited-${limit}` : "full", sitemap: { indexUrl: sitemap.indexUrl, childMaps: sitemap.childMaps, declaredRouteCount: sitemapPageCount }, routes: [...routes.values()], assets: [...assets.values()], failures
  };
  await writeFile(path.join(destination, "reports", "route-manifest.json"), JSON.stringify(report, null, 2));
  const note = `---\ntitle: DoingBusiness mirror capture\ntags:\n  - doingbusiness\n  - reconstruction\n  - crawl-report\ncaptured: ${finishedAt}\n---\n\n# DoingBusiness mirror capture\n\n- Sitemap routes declared: ${sitemapPageCount}\n- Routes captured: ${routes.size}\n- First-party assets captured: ${assets.size}\n- Failures: ${failures.length}\n- Mode: ${report.captureMode}\n\n> [!note]\n> See ![[route-manifest.json]] for the machine-readable crawl manifest.\n\n## Failures\n\n${failures.length ? failures.map((failure) => `- ${failure.phase}: ${failure.sourceUrl} — ${failure.reason ?? `HTTP ${failure.status}`}`).join("\n") : "None."}\n`;
  await writeFile(path.join(destination, "reports", "Capture Report.md"), note);
  console.log(JSON.stringify({ routes: routes.size, assets: assets.size, failures: failures.length, output: destination }, null, 2));
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
