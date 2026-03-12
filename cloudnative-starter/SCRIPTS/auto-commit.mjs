// Auto Commit — auto-commits staged changes before context compression to prevent work loss.

import { execSync } from "child_process";

try {
  execSync("git rev-parse --git-dir", { encoding: "utf8", stdio: "pipe" });
  execSync("git add -A", { encoding: "utf8", stdio: "pipe" });

  try {
    execSync("git diff --cached --quiet", { stdio: "pipe" });
  } catch {
    execSync('git commit -m "checkpoint: pre-compact auto-commit"', {
      encoding: "utf8",
      stdio: "pipe"
    });
    console.log(JSON.stringify({
      additionalContext: "Auto-committed changes before context compression."
    }));
  }
} catch {
  // Not a git repo or git not available — skip silently
}
