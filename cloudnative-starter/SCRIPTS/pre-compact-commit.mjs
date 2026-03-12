// Pre-Compact Commit — auto-commit staged changes before context compression.
// Translated from cloudnative-co/claude-code-starter-kit features/pre-compact-commit.
// Original: PreCompact one-liner: cd "$CLAUDE_PROJECT_DIR" && git add -A && git diff --cached --quiet || git commit -m 'checkpoint: pre-compact auto-commit'

import { execSync } from "child_process";

try {
  execSync("git rev-parse --git-dir", { encoding: "utf8", stdio: "pipe" });
  execSync("git add -A", { encoding: "utf8", stdio: "pipe" });

  try {
    execSync("git diff --cached --quiet", { stdio: "pipe" });
    // No staged changes — nothing to commit
  } catch {
    // There are staged changes — commit them
    execSync('git commit -m "checkpoint: pre-compact auto-commit"', {
      encoding: "utf8", stdio: "pipe"
    });
    console.log(JSON.stringify({
      additionalContext: "Auto-committed changes before context compression."
    }));
  }
} catch { /* not a git repo or git not available */ }
