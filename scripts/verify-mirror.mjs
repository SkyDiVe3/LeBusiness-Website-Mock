import { readFile, stat } from "node:fs/promises";
import path from "node:path";

const siteRoot = path.resolve(process.argv[2] ?? "baseline/site");
const manifest = JSON.parse(await readFile(path.resolve(process.argv[3] ?? "baseline/reports/route-manifest.json"), "utf8"));
const missing = [];
for (const record of [...manifest.routes, ...manifest.assets]) {
  try { await stat(path.join(siteRoot, record.localPath)); } catch { missing.push(record.localPath); }
}
const summary = { declaredRoutes: manifest.sitemap.declaredRouteCount, capturedRoutes: manifest.routes.length, assets: manifest.assets.length, manifestFailures: manifest.failures.length, missingFiles: missing.length };
console.log(JSON.stringify(summary, null, 2));
if (missing.length || manifest.failures.length) process.exitCode = 1;
