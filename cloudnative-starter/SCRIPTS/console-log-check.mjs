// Console Log Check — checks for console.log in all modified files before session ends.

import { readFileSync, existsSync } from "fs";
import { execSync } from "child_process";

try {
  execSync("git rev-parse --git-dir", { encoding: "utf8", stdio: "pipe" });

  const modified = execSync("git diff --name-only HEAD 2>/dev/null", {
    encoding: "utf8",
    stdio: "pipe"
  }).trim();

  if (modified) {
    const jsFiles = modified.split("\n").filter(f => /\.(ts|tsx|js|jsx)$/.test(f));
    const filesWithLogs = [];

    for (const file of jsFiles) {
      if (existsSync(file)) {
        try {
          const content = readFileSync(file, "utf8");
          if (/console\.log\(/.test(content)) {
            filesWithLogs.push(file);
          }
        } catch { /* skip unreadable files */ }
      }
    }

    if (filesWithLogs.length > 0) {
      console.log(JSON.stringify({
        additionalContext: `REMINDER: console.log found in modified files:\n${filesWithLogs.map(f => `  - ${f}`).join("\n")}\nRemove debug logging before committing.`
      }));
    }
  }
} catch {
  // Not a git repo — skip
}
