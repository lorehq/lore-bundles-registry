// Prettier Format — auto-format JS/TS/CSS/JSON files after edit.

import { readFileSync, existsSync } from "fs";
import { execSync } from "child_process";

const input = JSON.parse(readFileSync("/dev/stdin", "utf8"));
const tool = input.tool_name || "";
const toolInput = input.tool_input || {};

if (tool === "Edit" || tool === "Write") {
  const filePath = toolInput.file_path || toolInput.path || "";
  if (/\.(ts|tsx|js|jsx|json|css|scss)$/.test(filePath) && existsSync(filePath)) {
    try {
      execSync("which prettier", { encoding: "utf8", stdio: "pipe" });
      execSync(`prettier --write "${filePath}"`, { encoding: "utf8", stdio: "pipe" });
    } catch { /* prettier not installed or failed — skip silently */ }
  }
}
