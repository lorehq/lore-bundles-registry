// Doc Blocker — prevent creating stray documentation files at project root.
// Only standard docs (README, CONTRIBUTING, etc.) should be .md at root.

import { readFileSync } from "fs";

const input = JSON.parse(readFileSync("/dev/stdin", "utf8"));
const tool = input.tool_name || "";
const toolInput = input.tool_input || {};

if (tool === "Write") {
  const filePath = toolInput.file_path || toolInput.path || "";
  if (/\.(md|txt)$/i.test(filePath)) {
    const basename = filePath.split("/").pop();
    const allowed = /^(README|CONTRIBUTING|AGENTS|CHANGELOG|LICENSE|SECURITY)\.(md|txt)$/i;
    const isRootLevel = !filePath.includes("/") || /^[^/]+\.(md|txt)$/i.test(filePath);
    if (isRootLevel && !allowed.test(basename)) {
      console.log(JSON.stringify({
        decision: "deny",
        reason: `Blocked: creating non-standard doc file '${basename}'. Use README.md or a subdirectory for documentation.`
      }));
      process.exit(0);
    }
  }
}

console.log(JSON.stringify({ decision: "allow" }));
