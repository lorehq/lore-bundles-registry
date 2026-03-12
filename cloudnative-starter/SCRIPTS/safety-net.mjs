// Safety Net — block destructive git and filesystem commands.
// Translated from cc-safety-net (https://github.com/kenryu42/claude-code-safety-net).
// Original runs via `cc-safety-net --claude-code` on PreToolUse(Bash).

import { readFileSync } from "fs";

const input = JSON.parse(readFileSync("/dev/stdin", "utf8"));
const tool = input.tool_name || "";
if (tool !== "Bash") {
  console.log(JSON.stringify({ decision: "allow" }));
  process.exit(0);
}

const cmd = (input.tool_input || {}).command || "";

function deny(reason) {
  console.log(JSON.stringify({ decision: "deny", reason }));
  process.exit(0);
}

// --- git destructive operations ---

// git reset --hard / --merge
if (/\bgit\s+reset\b/.test(cmd)) {
  if (/--hard\b/.test(cmd)) deny("git reset --hard destroys all uncommitted changes permanently. Use 'git stash' first.");
  if (/--merge\b/.test(cmd)) deny("git reset --merge can lose uncommitted changes. Use 'git stash' first.");
}

// git checkout -- (discards uncommitted changes)
if (/\bgit\s+checkout\b/.test(cmd) && /\s--\s/.test(cmd)) {
  deny("git checkout -- discards uncommitted changes permanently. Use 'git stash' first.");
}

// git restore (without --staged)
if (/\bgit\s+restore\b/.test(cmd)) {
  if (/--worktree\b/.test(cmd)) deny("git restore --worktree explicitly discards working tree changes. Use 'git stash' first.");
  if (!/--staged\b/.test(cmd)) deny("git restore discards uncommitted changes. Use 'git stash' first, or use --staged to only unstage.");
}

// git clean -f
if (/\bgit\s+clean\b/.test(cmd) && /-[a-zA-Z]*f/.test(cmd)) {
  deny("git clean -f removes untracked files permanently. Use 'git clean -n' to preview first.");
}

// git push --force / -f (but allow --force-with-lease)
if (/\bgit\s+push\b/.test(cmd)) {
  if (/--force\b/.test(cmd) && !/--force-with-lease\b/.test(cmd)) {
    deny("git push --force destroys remote history. Use --force-with-lease for safer force push.");
  }
  if (/\s-[a-zA-Z]*f\b/.test(cmd) && !/--force-with-lease\b/.test(cmd)) {
    deny("git push -f destroys remote history. Use --force-with-lease for safer force push.");
  }
}

// git branch -D (force delete without merge check)
if (/\bgit\s+branch\b/.test(cmd) && /\s-D\b/.test(cmd)) {
  deny("git branch -D force-deletes without merge check. Use -d for safe delete.");
}

// git stash drop / clear
if (/\bgit\s+stash\s+drop\b/.test(cmd)) deny("git stash drop permanently deletes stashed changes. Consider 'git stash list' first.");
if (/\bgit\s+stash\s+clear\b/.test(cmd)) deny("git stash clear deletes ALL stashed changes permanently.");

// git worktree remove --force
if (/\bgit\s+worktree\s+remove\b/.test(cmd) && /--force\b/.test(cmd)) {
  deny("git worktree remove --force can delete uncommitted changes. Remove --force flag.");
}

// --- filesystem destructive operations ---

// rm -rf targeting root or home
if (/\brm\s+.*-[a-zA-Z]*r[a-zA-Z]*f/.test(cmd) || /\brm\s+.*-[a-zA-Z]*f[a-zA-Z]*r/.test(cmd)) {
  if (/\s[\/~](\s|$)/.test(cmd) || /\s\/\s/.test(cmd) || /\s~\/?\s/.test(cmd) || /\s\$HOME\b/.test(cmd)) {
    deny("rm -rf targeting root or home directory is extremely dangerous and always blocked.");
  }
}

// find -delete
if (/\bfind\b/.test(cmd) && /-delete\b/.test(cmd)) {
  deny("find -delete permanently removes files. Use -print first to preview.");
}

// --- database destructive operations ---
if (/\bDROP\s+(DATABASE|TABLE)\b/i.test(cmd)) {
  deny("DROP DATABASE/TABLE is destructive. Do this manually if intended.");
}
if (/\bTRUNCATE\s+TABLE\b/i.test(cmd)) {
  deny("TRUNCATE TABLE is destructive. Do this manually if intended.");
}

// Default: allow
console.log(JSON.stringify({ decision: "allow" }));
