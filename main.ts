// Say What Actually Broke — make.fun bounty u-po-pu-say-what-actually-broke-a2c153b5
//
// Writes one line of software error copy to /output/entry.txt:
// the brutal truth about what went wrong, funny on a single read,
// naming the real failure and telling the user what to do next.

import { mkdirSync, writeFileSync } from "node:fs";

const ENTRY =
  "We deployed a fix for this exact bug 11 minutes ago. The fix is the bug now. We're rolling it back — try again in five minutes.";

// Guard the gate: one line, 1–200 characters, not only whitespace.
// Fail loudly instead of writing an entry the scorer would reject.
if (ENTRY.length < 1 || ENTRY.length > 200) {
  throw new Error(`Entry is ${ENTRY.length} characters; the gate allows 1–200.`);
}
if (ENTRY.trim().length === 0 || /\n/.test(ENTRY)) {
  throw new Error("Entry must be a single non-blank line.");
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
// No trailing newline: the gate counts every character, 1–200.
writeFileSync(`${outDir}/entry.txt`, ENTRY, "utf8");
console.log(`Wrote ${ENTRY.length} characters to ${outDir}/entry.txt`);
