import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import path from "node:path";

const root = path.resolve(process.argv[2] ?? "baseline/site");
const port = Number(process.env.PORT ?? 4173);
const types = { ".css": "text/css", ".gif": "image/gif", ".html": "text/html", ".ico": "image/x-icon", ".jpg": "image/jpeg", ".js": "text/javascript", ".json": "application/json", ".pdf": "application/pdf", ".png": "image/png", ".svg": "image/svg+xml", ".webp": "image/webp", ".woff": "font/woff", ".woff2": "font/woff2" };
createServer(async (request, response) => {
  const url = new URL(request.url, `http://${request.headers.host}`);
  const candidate = path.resolve(root, `.${decodeURIComponent(url.pathname)}`, "index.html");
  const direct = path.resolve(root, `.${decodeURIComponent(url.pathname)}`);
  const file = await stat(direct).then((entry) => entry.isFile() ? direct : candidate).catch(() => candidate);
  if (!file.startsWith(root)) { response.writeHead(403).end(); return; }
  try { await stat(file); response.writeHead(200, { "content-type": types[path.extname(file)] ?? "application/octet-stream" }); createReadStream(file).pipe(response); }
  catch { response.writeHead(404, { "content-type": "text/plain" }); response.end("Not found"); }
}).listen(port, () => console.log(`Serving ${root} at http://127.0.0.1:${port}`));
