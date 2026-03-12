// PR Creation Log — note PR URL after gh pr create.

import { readFileSync } from "fs";

const input = JSON.parse(readFileSync("/dev/stdin", "utf8"));
const tool = input.tool_name || "";
const toolInput = input.tool_input || {};
const toolOutput = input.tool_output || {};

if (tool === "Bash") {
  const cmd = toolInput.command || "";
  const output = toolOutput.output || toolOutput.stdout || "";
  if (/\bgh\s+pr\s+create\b/.test(cmd)) {
    const match = output.match(/https:\/\/github\.com\/[^\s]+\/pull\/\d+/);
    if (match) {
      console.log(JSON.stringify({
        additionalContext: `PR created: ${match[0]}`
      }));
      process.exit(0);
    }
  }
}
