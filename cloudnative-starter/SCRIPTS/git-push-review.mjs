// Git Push Review — ask for confirmation before pushing to remote.

import { readFileSync } from "fs";

const input = JSON.parse(readFileSync("/dev/stdin", "utf8"));
const tool = input.tool_name || "";
const toolInput = input.tool_input || {};

if (tool === "Bash") {
  const cmd = toolInput.command || "";
  if (/\bgit\s+push\b/.test(cmd)) {
    console.log(JSON.stringify({
      decision: "ask",
      message: "About to push to remote. Review changes first?"
    }));
    process.exit(0);
  }
}

console.log(JSON.stringify({ decision: "allow" }));
