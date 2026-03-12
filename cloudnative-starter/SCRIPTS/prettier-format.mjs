// Prettier Format — auto-format JS/TS/CSS/JSON files after edit.
// Translated from cloudnative-co/claude-code-starter-kit features/prettier-hooks.
// Original: PostToolUse(Edit) with matcher for .ts/.tsx/.js/.jsx files.
// Extended to also match .json/.css/.scss per original regex.

import { readFileSync, existsSync } from "fs";
import { execSync } from "child_process";

const input = JSON.parse(readFileSync("/dev/stdin", "utf8"));
const tool = input.tool_name || "";
if (tool !== "Edit" && tool !== "Write") process.exit(0);

const filePath = (input.tool_input || {}).file_path || (input.tool_input || {}).path || "";
if (!/\.(ts|tsx|js|jsx|json|css|scss)$/.test(filePath) || !existsSync(filePath)) process.exit(0);

try {
  execSync("which prettier", { encoding: "utf8", stdio: "pipe" });
  execSync(`prettier --write "${filePath}"`, { encoding: "utf8", stdio: "pipe" });
} catch { /* prettier not installed or failed — skip silently */ }
