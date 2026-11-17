import { spawnSync } from "node:child_process";
import { cp, mkdir, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const webDir = path.join(root, "apps", "web");
const publicMediaDir = path.join(webDir, "public", "media");
const offlineMediaDir = path.join(root, "reconstruction", "offline-site", "media");
const baselineMediaDir = path.join(root, "baseline", "site", "media");
const baselineLogosDir = path.join(baselineMediaDir, "logos");
const baselineCoversDir = path.join(baselineMediaDir, "covers");
const baselineDownloadsDir = path.join(baselineMediaDir, "downloads");
const nextCli = path.join(webDir, "node_modules", "next", "dist", "bin", "next");

const args = new Set(process.argv.slice(2));
const forceBuild = args.has("--build") || args.has("--build-only");
const buildOnly = args.has("--build-only");
const portIndex = process.argv.indexOf("--port");
const port = portIndex !== -1 ? (process.argv[portIndex + 1] ?? "3010") : (process.env["PORT"] ?? "3010");

const selectedBaselineLogos = [
  "5b48953e6075e_omv_petrom.jpeg",
  "5c9b4e5fb2aa6_logo_bitdefender_red_white.png",
  "5b4894663dc82_raiffeisen_bank.jpeg",
  "5c37515e703e9_logo_ibcargo_300.jpg",
  "5bd32e2f2026a_klg_europe.jpg",
  "company_logo_951.jpg"
];

const selectedBaselineCovers = [
  "6a6b46005091b_ceo_conference_2026.jpg",
  "6a6c7f19cb562_cluj.png",
  "6895e431ba996_ceo_conference_2025.png",
  "66e8143923267_ceo_conference_2024_cluj.jpg",
  "65cb9509ba75f_ceo_conference_2024_bucuresti.png",
  "6a140b04b37ff_business_evolution_hunedoara_2026.jpeg",
  "6a6c7f8b2fd61_iasi.png",
  "6a6b52d242f06_wealtinvestment.png",
  "6af5cd072f594_cover.jpg",
  "6af5bbc5ba26d_cover.jpg",
  "6af4ea8f038cb_cover.jpg",
  "6af3689fe85ec_cover.jpg",
  "6ae9d1cd5618f_cover.jpg",
  "6ae86a044e8ad_cover.jpg",
  "6af5aa64e639b_magda.jpg",
  "6af4520599a4a_elena.jpg",
  "6ae9e4962c0bf_cover.jpg",
  "6ae36cc5bc50f_cover.jpg",
  "6ae08a602b515_cover.jpg",
  "6adf305a7b8f1_cover.jpg",
  "6adf2b840c909_cover.jpg",
  "6ad73e5eaf7d6_cover.jpg",
  "6af5dda744519_cover.jpg",
  "6ae8f1d9af1cb_cover.jpg",
  "6ae216c51f4b3_cover.jpg",
  "6aba38ac23a0c_cover.jpg",
  "6aa7bd8a1d00b_cover.jpg",
  "6aa2c3517c93a_cover.jpg",
  "6949bd498aa9e_poza_cristian_sporis.jpg",
  "694a79937ea6d_poza_karan_khurana.jpg",
  "694a8c48f2140_poza_marius_melesteu.jpg",
  "694a9f2e7c1a8_poza_razvan_copoiu.jpg",
  "6968e842a1ca6_poza_alexandru_aldescu.jpg",
  "6968deed214b2_poza_dorel_gutu.jpg",
  "657733f53c604_anda_marian_ceo_conference_cluj_2023.png",
  "6576daebb2671_anca_rarau_ceo_conference_cluj_2023.png",
  "6571c8c17d3d3_florin_frunza_ceoconference_cluj_2023.png",
  "6570d4be3bd19_florin_popa_ceo_conference.jpg",
  "656ee9ad4c538_gabriel_pavel_ceo_conference_2023.jpg",
  "60db22fa1bd5e_cover_business_evolution.jpg",
  "60db2114a3c06_cover_image_canon.jpg",
  "60db1e04bfa42_ceo_conference_3_martie_2021.jpg",
  "5fd8d175e7304_new_organizational_culture_banner_spk.jpg",
  "5f928d53844a4_technology_and_the_new_innovative_business_models.jpg"
];

async function pathExists(target) {
  return stat(target).then(() => true).catch(() => false);
}

async function copySelectedFiles(sourceDir, targetDir, files) {
  await mkdir(targetDir, { recursive: true });
  for (const file of files) {
    const sourceFile = path.join(sourceDir, file);
    const targetFile = path.join(targetDir, file);
    if ((await pathExists(sourceFile)) && !(await pathExists(targetFile))) {
      await cp(sourceFile, targetFile);
    }
  }
}

async function stageMedia() {
  if (await pathExists(offlineMediaDir)) {
    await mkdir(publicMediaDir, { recursive: true });
    await cp(offlineMediaDir, publicMediaDir, { recursive: true, force: false });
  }
  if (await pathExists(baselineDownloadsDir)) {
    const targetDownloadsDir = path.join(publicMediaDir, "downloads");
    await mkdir(targetDownloadsDir, { recursive: true });
    await cp(baselineDownloadsDir, targetDownloadsDir, { recursive: true, force: false });
  }
  await copySelectedFiles(baselineLogosDir, path.join(publicMediaDir, "logos"), selectedBaselineLogos);
  await copySelectedFiles(baselineCoversDir, path.join(publicMediaDir, "covers"), selectedBaselineCovers);

  const staged = await readdir(publicMediaDir, { recursive: true }).catch(() => []);
  console.log(`[serve-mock] Staged public media entries: ${staged.length}`);
}

function buildWeb() {
  console.log("[serve-mock] Building @doingbusiness/web...");
  const result = spawnSync(process.execPath, [nextCli, "build", webDir], {
    cwd: root,
    stdio: "inherit",
    env: { ...process.env, NODE_ENV: "production" }
  });
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

await stageMedia();

const buildIdPath = path.join(webDir, ".next", "BUILD_ID");
if (forceBuild || !(await pathExists(buildIdPath))) {
  buildWeb();
}

if (buildOnly) {
  console.log("[serve-mock] Build completed (--build-only).");
  process.exit(0);
}

console.log(`[serve-mock] Starting DoingBusiness mock on http://localhost:${port}/`);
const server = spawnSync(process.execPath, [nextCli, "start", webDir, "-p", String(port)], {
  cwd: root,
  stdio: "inherit",
  env: { ...process.env, NODE_ENV: "production", PORT: String(port) }
});
process.exit(server.status ?? 0);
