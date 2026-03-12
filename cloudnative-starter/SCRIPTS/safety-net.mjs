// Safety Net — block destructive commands, force push, DROP statements, and sensitive file writes.

import { readFileSync } from "fs";

const input = JSON.parse(readFileSync("/dev/stdin", "utf8"));
const tool = input.tool_name || "";
const toolInput = input.tool_input || {};

if (tool === "Bash") {
  const cmd = toolInput.command || "";

  if (/\brm\s+-rf\s+[\/~]/.test(cmd)) {
    console.log(JSON.stringify({
      decision: "deny",
      reason: "Blocked: rm -rf with absolute or home path is too dangerous."
    }));
    process.exit(0);
  }

  if (/\bgit\s+push\s+.*--force\b/.test(cmd) || /\bgit\s+push\s+-f\b/.test(cmd)) {
    console.log(JSON.stringify({
      decision: "deny",
      reason: "Blocked: force push can destroy remote history. Use --force-with-lease if necessary."
    }));
    process.exit(0);
  }

  if (/\bDROP\s+(DATABASE|TABLE)\b/i.test(cmd)) {
    console.log(JSON.stringify({
      decision: "deny",
      reason: "Blocked: DROP DATABASE/TABLE is destructive. Do this manually if intended."
    }));
    process.exit(0);
  }
}

if (tool === "Write" || tool === "Edit") {
  const filePath = toolInput.file_path || toolInput.path || "";
  if (/\.(env|pem|key|pfx|p12)$/.test(filePath) || /\bcredentials\b/i.test(filePath)) {
    console.log(JSON.stringify({
      decision: "deny",
      reason: `Blocked: writing to sensitive file '${filePath.split("/").pop()}'. Secrets should not be in version control.`
    }));
    process.exit(0);
  }
}

console.log(JSON.stringify({ decision: "allow" }));
