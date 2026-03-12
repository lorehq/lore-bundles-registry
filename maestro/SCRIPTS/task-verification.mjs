// Task Verification — remind to verify results after delegated task completes.

import { readFileSync } from "fs";

const input = JSON.parse(readFileSync("/dev/stdin", "utf8"));
const tool = input.tool_name || "";

if (tool === "Task") {
  console.log(
    JSON.stringify({
      additionalContext:
        "Delegated task completed. Verify the work: check that files were created/modified as expected, tests pass, and the output matches requirements before proceeding.",
    })
  );
  process.exit(0);
}
