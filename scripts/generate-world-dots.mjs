/**
 * Generate land dot grid for the About page world map.
 * Output: public/world-map/land-dots.json
 */
import { readFileSync, mkdirSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { feature } from "topojson-client";
import { geoContains } from "d3-geo";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const worldPath = join(root, "node_modules/world-atlas/countries-110m.json");
const outDir = join(root, "public/world-map");
const outPath = join(outDir, "land-dots.json");

const WIDTH = 960;
const HEIGHT = 480;
const STEP = 5;

const world = JSON.parse(readFileSync(worldPath, "utf8"));
const land = feature(world, world.objects.countries);

const dots = [];

for (let y = 0; y < HEIGHT; y += STEP) {
  const lat = 90 - (y / HEIGHT) * 180;
  for (let x = 0; x < WIDTH; x += STEP) {
    const lng = (x / WIDTH) * 360 - 180;
    if (geoContains(land, [lng, lat])) {
      dots.push([
        Math.round((x / WIDTH) * 10000) / 10000,
        Math.round((y / HEIGHT) * 10000) / 10000
      ]);
    }
  }
}

mkdirSync(outDir, { recursive: true });
writeFileSync(
  outPath,
  JSON.stringify({ width: WIDTH, height: HEIGHT, step: STEP, dots })
);
console.log(`Wrote ${dots.length} land dots to ${outPath}`);
