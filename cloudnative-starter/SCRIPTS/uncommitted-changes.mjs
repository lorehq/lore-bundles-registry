// Uncommitted Changes — reminds about uncommitted changes before session ends.

import { execSync } from "child_process";

try {
  execSync("git rev-parse --git-dir", { encoding: "utf8", stdio: "pipe" });

  const uncommitted = execSync("git diff --name-only 2>/dev/null", {
    encoding: "utf8",
    stdio: "pipe"
  }).trim();

  if (uncommitted) {
    const count = uncommitted.split("\n").length;
    console.log(JSON.stringify({
      additionalContext: `REMINDER: ${count} file${count > 1 ? "s" : ""} with uncommitted changes.`
    }));
  }
} catch {
  // Not a git repo — skip
}
