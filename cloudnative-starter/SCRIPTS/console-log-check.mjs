// Console Log Check — check all modified files for console.log before session ends.
// Translated from cloudnative-co/claude-code-starter-kit features/console-log-guard (Stop variant).
// Original: Stop hook scanning git diff for .ts/.tsx/.js/.jsx files.

import { readFileSync, existsSync } from "fs";
import { execSync } from "child_process";

try {
  execSync("git rev-parse --git-dir", { encoding: "utf8", stdio: "pipe" });

  const modified = execSync("git diff --name-only HEAD 2>/dev/null", {
    encoding: "utf8", stdio: "pipe"
  }).trim();

  if (modified) {
    const jsFiles = modified.split("\n").filter(f => /\.(ts|tsx|js|jsx)$/.test(f));
    const filesWithLogs = [];

    for (const file of jsFiles) {
      if (existsSync(file)) {
        try {
          if (/console\.log\(/.test(readFileSync(file, "utf8"))) {
            filesWithLogs.push(file);
          }
        } catch { /* skip unreadable */ }
      }
    }

    if (filesWithLogs.length > 0) {
      console.log(JSON.stringify({
        additionalContext: `REMINDER: console.log found in modified files:\n${filesWithLogs.map(f => `  - ${f}`).join("\n")}\nRemove debug logging before committing.`
      }));
    }
  }
} catch { /* not a git repo */ }
