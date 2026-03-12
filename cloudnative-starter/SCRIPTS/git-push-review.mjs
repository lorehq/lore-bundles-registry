// Git Push Review — prompt for confirmation before pushing to remote.
// Translated from cloudnative-co/claude-code-starter-kit features/git-push-review.
// Original used interactive `read -r` to block; Lore uses the `ask` decision.

import { readFileSync } from "fs";

const input = JSON.parse(readFileSync("/dev/stdin", "utf8"));
const tool = input.tool_name || "";
if (tool !== "Bash") {
  console.log(JSON.stringify({ decision: "allow" }));
  process.exit(0);
}

const cmd = (input.tool_input || {}).command || "";
if (/\bgit\s+push\b/.test(cmd)) {
  console.log(JSON.stringify({
    decision: "ask",
    message: "About to push to remote. Review changes first?"
  }));
  process.exit(0);
}

console.log(JSON.stringify({ decision: "allow" }));
