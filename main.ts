// One-Liner Marathon entry: one deterministic comedy line, no network, no input.
// The program writes that single line to entry.txt for the pairwise judge.
import { join } from "node:path";
import { mkdirSync, writeFileSync } from "node:fs";

const JOKE =
  "My bank flagged my own card for fraud after I bought groceries, which means even my bank thinks I can't afford to eat.";

const MAX_CHARS = 280; // the sealed gate accepts 1 to 280 characters

function main(): void {
  const line = JOKE.trim();
  const hasLineBreak = line.includes("\n") || line.includes("\r");
  if (line.length === 0) {
    throw new Error("the joke came out empty");
  }
  if (hasLineBreak) {
    throw new Error("the joke must fit on one line");
  }
  if (line.length > MAX_CHARS) {
    throw new Error(`the joke runs ${line.length} characters, past the ${MAX_CHARS} cap`);
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, line, { encoding: "utf8" });
  console.log(`wrote ${line.length} characters to ${outPath}`);
}

main(); // run once, deterministically, and exit
