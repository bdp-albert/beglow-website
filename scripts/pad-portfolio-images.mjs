/**
 * Pad design portfolio renders to 16:9 on #050505 — extend only, never crop.
 *
 * Source: public/images/projects/design/<folder>/*
 * Output: public/images/projects/design/16x9/<slug>/01.png, …
 */
import sharp from "sharp";
import { existsSync, mkdirSync, readdirSync, writeFileSync } from "fs";
import { dirname, extname, join } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const designDir = join(root, "public/images/projects/design");
const outputRoot = join(designDir, "16x9");

const TARGET_RATIO = 16 / 9;
const PAD = { r: 5, g: 5, b: 5, alpha: 255 };
const IMAGE_EXT = new Set([".png", ".jpg", ".jpeg", ".webp"]);

const projects = [
  { slug: "kuwait-warba-tower", folder: "Warba towers Kuwait" },
  { slug: "bahrain-yacht-club", folder: "Yacht Club Bharain" },
  { slug: "kuwait-pixel-tower", folder: "Pixel Tower Kuwait" },
  { slug: "india-advant-atrium", folder: "Advant Atrium India" },
  { slug: "india-advant-facade", folder: "Advant Facade India" },
  { slug: "libya-ahayes-mall", folder: "Ahayes Mall Lybia" }
];

async function padTo169(inputPath, outputPath) {
  const image = sharp(inputPath);
  const meta = await image.metadata();
  const width = meta.width ?? 0;
  const height = meta.height ?? 0;
  if (!width || !height) throw new Error(`Invalid image: ${inputPath}`);

  const ratio = width / height;
  let outW = width;
  let outH = height;

  if (ratio < TARGET_RATIO) {
    outW = Math.round(height * TARGET_RATIO);
  } else if (ratio > TARGET_RATIO) {
    outH = Math.round(width / TARGET_RATIO);
  }

  await image
    .extend({
      top: Math.floor((outH - height) / 2),
      bottom: Math.ceil((outH - height) / 2),
      left: Math.floor((outW - width) / 2),
      right: Math.ceil((outW - width) / 2),
      background: PAD
    })
    .png()
    .toFile(outputPath);
}

function listImages(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((name) => IMAGE_EXT.has(extname(name).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
}

const manifest = [];

for (const { slug, folder } of projects) {
  const sourceDir = join(designDir, folder);
  const files = listImages(sourceDir);
  if (!files.length) {
    console.warn(`Skip ${slug}: no images in ${sourceDir}`);
    continue;
  }

  const outDir = join(outputRoot, slug);
  mkdirSync(outDir, { recursive: true });

  let index = 0;
  for (const file of files) {
    index += 1;
    const outName = `${String(index).padStart(2, "0")}.png`;
    await padTo169(join(sourceDir, file), join(outDir, outName));
    console.log(`  ${slug}/${outName} ← ${folder}/${file}`);
  }

  manifest.push({ slug, folder, count: index });
}

mkdirSync(outputRoot, { recursive: true });
writeFileSync(join(outputRoot, "manifest.json"), JSON.stringify(manifest, null, 2));
console.log(`Done — ${manifest.length} projects, ${manifest.reduce((n, p) => n + p.count, 0)} images`);
