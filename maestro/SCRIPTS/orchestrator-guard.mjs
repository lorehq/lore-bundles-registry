// Orchestrator Guard — warn orchestrator/planner agents about direct file writes.

import { readFileSync } from "fs";

const input = JSON.parse(readFileSync("/dev/stdin", "utf8"));
const tool = input.tool_name || "";

const isWriteTool = tool === "Write" || tool === "Edit" || tool === "MultiEdit";

if (isWriteTool) {
  const agentHints = [
    "orchestrat",
    "planner",
    "coordinator",
    "delegat",
  ];

  const inputStr = JSON.stringify(input).toLowerCase();
  const isOrchestrator = agentHints.some((hint) => inputStr.includes(hint));

  if (isOrchestrator) {
    console.log(
      JSON.stringify({
        additionalContext:
          "Warning: Orchestrator/planner agents should delegate file modifications to implementation agents rather than writing directly. Consider using the Task tool to delegate this work.",
      })
    );
    process.exit(0);
  }
}

console.log(JSON.stringify({}));
