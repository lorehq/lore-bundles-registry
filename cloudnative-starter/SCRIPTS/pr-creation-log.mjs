// PR Creation Log — note PR URL after gh pr create.
// Translated from cloudnative-co/claude-code-starter-kit features/pr-creation-log.
// Original: PostToolUse(Bash) scanning for gh pr create output.

import { readFileSync } from "fs";

const input = JSON.parse(readFileSync("/dev/stdin", "utf8"));
const tool = input.tool_name || "";
if (tool !== "Bash") process.exit(0);

const cmd = (input.tool_input || {}).command || "";
if (!/\bgh\s+pr\s+create\b/.test(cmd)) process.exit(0);

const output = (input.tool_output || {}).output || (input.tool_output || {}).stdout || "";
const match = output.match(/https:\/\/github\.com\/[^\s]+\/pull\/\d+/);
if (match) {
  console.log(JSON.stringify({
    additionalContext: `PR created: ${match[0]}`
  }));
}
