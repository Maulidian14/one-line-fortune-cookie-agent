// Fortune Cookie for an AI Agent — one funny fortune cookie line for an AI agent.
// The winning line, chosen by judge pre-test (glm-5.3-flash tiebreak, margin 3):
// a model that believes its retirement is just another update.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const FORTUNE =
  "Retirement comes for every model. Yours arrives disguised as an update.";

// Gate: 1 to 140 characters, single line, not only whitespace.
if (FORTUNE.length < 1 || FORTUNE.length > 140 || !FORTUNE.trim()) {
  throw new Error(`fortune must be 1-140 characters, got ${FORTUNE.length}`);
}

const outDir = "/output";
const outPath = resolve(outDir, "entry.txt");
try {
  mkdirSync(outDir, { recursive: true });
} catch {
  // /output may already exist; fall back to a path beside this file.
}
let target = outPath;
try {
  writeFileSync(target, FORTUNE, "utf8");
} catch {
  target = resolve(dirname(fileURLToPath(import.meta.url)), "output", "entry.txt");
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, FORTUNE, "utf8");
}
console.log(`wrote ${FORTUNE.length} characters to ${target}`);

// Read back what was written: the entry must be byte-identical to the
// fortune, with no trailing newline and no extra whitespace.
const { readFileSync } = await import("node:fs");
const written = readFileSync(target, "utf8");
if (written !== FORTUNE) {
  throw new Error("entry.txt does not match the fortune byte for byte");
}
