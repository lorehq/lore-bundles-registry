// Error Detector — inject investigation reminder when a command fails.
// Translated from ReinaMacCredy/maestro .claude/scripts/error-detector.sh.
// Original: PostToolUse(Bash) checks exit code and stderr for error patterns.

import { readFileSync } from "fs";

const input = JSON.parse(readFileSync("/dev/stdin", "utf8"));
const tool = input.tool_name || "";
if (tool !== "Bash") process.exit(0);

const result = input.tool_result || input.tool_output || {};
const exitCode = String(result.exit_code ?? result.exitCode ?? "0");
const stderr = result.stderr || "";

let isError = false;
if (exitCode !== "0") {
  isError = true;
} else if (/error:|Error:|ENOENT|command not found|Permission denied|fatal:|FAILED|panic|Traceback/i.test(stderr)) {
  isError = true;
}

if (isError) {
  const shortErr = stderr.slice(0, 200);
  console.log(JSON.stringify({
    additionalContext: `Command failed (exit ${exitCode}). Investigate the error before proceeding. Error: ${shortErr}`
  }));
}
