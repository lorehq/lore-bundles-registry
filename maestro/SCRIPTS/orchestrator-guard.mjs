// Orchestrator Guard — prevent orchestrator agents from editing files directly.
// Translated from ReinaMacCredy/maestro .claude/scripts/orchestrator-guard.sh.
// Original: PreToolUse(Write|Edit) checks CLAUDE_AGENT_NAME or agent_name in payload.

import { readFileSync } from "fs";

const input = JSON.parse(readFileSync("/dev/stdin", "utf8"));
const tool = input.tool_name || "";
if (tool !== "Write" && tool !== "Edit" && tool !== "MultiEdit") {
  console.log(JSON.stringify({ decision: "allow" }));
  process.exit(0);
}

// Check agent name from environment or payload
const agentName = (
  process.env.CLAUDE_AGENT_NAME ||
  input.agent_name ||
  (input.agent || {}).name ||
  ""
).toLowerCase();

if (agentName === "orchestrator") {
  console.log(JSON.stringify({
    decision: "deny",
    reason: "Orchestrator cannot edit files directly. Delegate to an implementation agent instead."
  }));
  process.exit(0);
}

console.log(JSON.stringify({ decision: "allow" }));
