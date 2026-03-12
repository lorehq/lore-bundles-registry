// Console Log Guard — warn about console.log in JS/TS files after edit.

import { readFileSync, existsSync } from "fs";

const input = JSON.parse(readFileSync("/dev/stdin", "utf8"));
const tool = input.tool_name || "";
const toolInput = input.tool_input || {};

if (tool === "Edit" || tool === "Write") {
  const filePath = toolInput.file_path || toolInput.path || "";
  if (/\.(ts|tsx|js|jsx)$/.test(filePath) && existsSync(filePath)) {
    try {
      const content = readFileSync(filePath, "utf8");
      const lines = content.split("\n");
      const hits = [];
      for (let i = 0; i < lines.length; i++) {
        if (/console\.log\(/.test(lines[i])) {
          hits.push(`  L${i + 1}: ${lines[i].trim()}`);
        }
      }
      if (hits.length > 0) {
        console.log(JSON.stringify({
          additionalContext: `WARNING: console.log found in ${filePath}:\n${hits.slice(0, 5).join("\n")}${hits.length > 5 ? `\n  ... and ${hits.length - 5} more` : ""}`
        }));
        process.exit(0);
      }
    } catch { /* file read error — skip */ }
  }
}
