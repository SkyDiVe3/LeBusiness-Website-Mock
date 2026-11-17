import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const root = path.resolve("docs");
const requiredProperties = ["title:", "status:", "tags:", "updated:", "related:"];

async function filesAt(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map(async (entry) => {
    const target = path.join(directory, entry.name);
    return entry.isDirectory() ? filesAt(target) : [target];
  }));
  return nested.flat();
}

const files = await filesAt(root);
const markdownFiles = files.filter((file) => file.endsWith(".md") && path.basename(file) !== "Reconstruct DoingBusiness website chat.md");
const knownNames = new Set(files.flatMap((file) => [path.basename(file, path.extname(file)), path.basename(file)]));
const problems = [];

for (const file of markdownFiles) {
  const text = await readFile(file, "utf8");
  const relative = path.relative(root, file);
  const frontmatter = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!frontmatter) {
    problems.push(`${relative}: missing YAML frontmatter`);
    continue;
  }
  for (const property of requiredProperties) if (!frontmatter[1].includes(property)) problems.push(`${relative}: missing ${property}`);
  if (!text.includes("> [!info]")) problems.push(`${relative}: missing [!info] callout`);
  for (const match of text.matchAll(/\[\[([^\]|#]+)(?:[|#][^\]]+)?\]\]/g)) {
    const target = match[1]?.trim();
    if (target && !knownNames.has(target)) problems.push(`${relative}: unresolved wikilink [[${target}]]`);
  }
}

for (const file of files.filter((candidate) => candidate.endsWith(".canvas"))) {
  const text = await readFile(file, "utf8");
  let canvas;
  try { canvas = JSON.parse(text); } catch { problems.push(`${path.basename(file)}: invalid JSON`); continue; }
  if (!Array.isArray(canvas.nodes) || !Array.isArray(canvas.edges)) { problems.push(`${path.basename(file)}: nodes/edges arrays required`); continue; }
  const ids = new Set(canvas.nodes.map((node) => node.id));
  if (ids.size !== canvas.nodes.length) problems.push(`${path.basename(file)}: duplicate node ID`);
  for (const edge of canvas.edges) if (!ids.has(edge.fromNode) || !ids.has(edge.toNode)) problems.push(`${path.basename(file)}: dangling edge ${edge.id}`);
}

for (const file of files.filter((candidate) => candidate.endsWith(".base"))) {
  const text = await readFile(file, "utf8");
  if (!text.includes("views:") || !text.includes("filters:")) problems.push(`${path.basename(file)}: Base needs filters and views`);
}

if (problems.length > 0) {
  console.error(problems.join("\n"));
  process.exit(1);
}

console.log(`Validated ${markdownFiles.length} Obsidian notes, Canvas, and Base.`);
