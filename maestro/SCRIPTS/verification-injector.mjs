// Verification Injector — remind to verify results after task delegation.
// Translated from ReinaMacCredy/maestro .claude/scripts/verification-injector.sh.
// Original: PostToolUse(Task) injects static verification reminder.

import { readFileSync } from "fs";

const input = JSON.parse(readFileSync("/dev/stdin", "utf8"));
const tool = input.tool_name || "";
if (tool !== "Task") process.exit(0);

console.log(JSON.stringify({
  additionalContext: "VERIFICATION REQUIRED: Read files claimed modified, run tests claimed to pass, and check for errors. Evidence older than 5 minutes is STALE — re-run verification commands for fresh output."
}));
