import { rmSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const nextDir = join(root, ".next");

try {
  rmSync(nextDir, { recursive: true, force: true });
  console.log("Removed .next");
} catch {
  console.log(".next already clean");
}
