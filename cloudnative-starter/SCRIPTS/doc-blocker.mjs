// Doc Blocker — prevent creating stray documentation files at project root.
// Translated from cloudnative-co/claude-code-starter-kit features/doc-blocker.
// Original: PreToolUse(Write) with matcher for .md/.txt files.

import { readFileSync } from "fs";

const input = JSON.parse(readFileSync("/dev/stdin", "utf8"));
const tool = input.tool_name || "";
if (tool !== "Write") {
  console.log(JSON.stringify({ decision: "allow" }));
  process.exit(0);
}

const filePath = (input.tool_input || {}).file_path || (input.tool_input || {}).path || "";
if (!/\.(md|txt)$/i.test(filePath)) {
  console.log(JSON.stringify({ decision: "allow" }));
  process.exit(0);
}

const basename = filePath.split("/").pop();
const allowed = /^(README|CLAUDE|AGENTS|CONTRIBUTING|CHANGELOG|LICENSE|SECURITY)\.(md|txt)$/i;

// Allow docs in subdirectories — only block non-standard files at project root
const isRootLevel = !filePath.includes("/") || /^[^/]+\.(md|txt)$/i.test(filePath);
if (isRootLevel && !allowed.test(basename)) {
  console.log(JSON.stringify({
    decision: "deny",
    reason: `Blocked: creating non-standard doc file '${basename}'. Use README.md or a subdirectory for documentation.`
  }));
  process.exit(0);
}

console.log(JSON.stringify({ decision: "allow" }));
