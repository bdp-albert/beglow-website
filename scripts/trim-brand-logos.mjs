/**
 * Remove top/bottom white bars and excess padding from BEGLOW logos.
 */
import sharp from "sharp";
import { existsSync, mkdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "public/brand");

const sources = [
  {
    name: "beglow-logo-white-on-black.png",
    candidates: [
      join(root, "public/images/projects/supply/brand/beglow-logo-white-on-black.png"),
      join(root, "public/brand/beglow-logo-white-on-black.png")
    ]
  },
  {
    name: "beglow-logo-black-on-white.png",
    candidates: [
      join(root, "public/images/projects/supply/brand/beglow-logo-black-on-white.png"),
      join(root, "public/brand/beglow-logo-black-on-white.png")
    ]
  }
];

function rowIsMostlyBlack(data, width, channels, y, maxNonBlack = 0.05) {
  let nonBlack = 0;
  let samples = 0;
  for (let x = 0; x < width; x += 4) {
    const i = (y * width + x) * channels;
    samples++;
    if (data[i] + data[i + 1] + data[i + 2] > 40) nonBlack++;
  }
  return nonBlack / samples <= maxNonBlack;
}

function rowIsWhiteLine(data, width, channels, y, threshold = 0.88) {
  let white = 0;
  let samples = 0;
  for (let x = 0; x < width; x += 4) {
    const i = (y * width + x) * channels;
    samples++;
    if (data[i] > 235 && data[i + 1] > 235 && data[i + 2] > 235) white++;
  }
  return white / samples >= threshold;
}

async function stripWhiteHorizontalLines(inputPath) {
  const { data, info } = await sharp(inputPath)
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  let top = 0;
  let bottom = height - 1;

  const isWhiteRow = (y) => {
    let white = 0;
    let samples = 0;
    for (let x = 0; x < width; x += 2) {
      const i = (y * width + x) * channels;
      samples++;
      if (data[i] > 248 && data[i + 1] > 248 && data[i + 2] > 248) white++;
    }
    return white / samples > 0.5;
  };

  while (top < height && isWhiteRow(top)) top++;
  while (bottom > top && isWhiteRow(bottom)) bottom--;

  if (bottom <= top) return sharp(inputPath);

  return sharp(inputPath).extract({
    left: 0,
    top,
    width,
    height: bottom - top + 1
  });
}

async function trimLogo(inputPath, outputPath) {
  let pipeline = await stripWhiteHorizontalLines(inputPath);

  pipeline = sharp(await pipeline.toBuffer()).trim({
    background: { r: 0, g: 0, b: 0 },
    threshold: 15
  });

  // black-on-white: also trim white surround
  const metaIn = await sharp(inputPath).metadata();
  if (metaIn.channels && (await sharp(inputPath).stats()).channels[0].mean > 128) {
    pipeline = sharp(await pipeline.toBuffer()).trim({
      background: { r: 255, g: 255, b: 255 },
      threshold: 15
    });
  }

  await pipeline.png({ compressionLevel: 9 }).toFile(outputPath);
  return sharp(outputPath).metadata();
}

mkdirSync(outDir, { recursive: true });

const dimensions = {};

for (const { name, candidates } of sources) {
  const input = candidates.find((p) => existsSync(p));
  if (!input) {
    console.warn(`Skip ${name}: source not found`);
    continue;
  }
  const meta = await trimLogo(input, join(outDir, name));
  dimensions[name] = { width: meta.width, height: meta.height };
  console.log(`${name}: ${meta.width}x${meta.height}`);
}

console.log(JSON.stringify(dimensions, null, 2));
