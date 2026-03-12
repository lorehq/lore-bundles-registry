# Maestro Bundle

Multi-agent orchestration for autonomous feature development. Adapted from [ReinaMacCredy/maestro](https://github.com/ReinaMacCredy/maestro).

## What It Does

Maestro turns a feature request into a completed, tested, reviewed implementation -- using a team of specialized agents that coordinate themselves. Instead of one agent context-switching between planning, coding, testing, and reviewing, Maestro separates these concerns into distinct roles with enforced boundaries.

You describe what you want built. The `/new-track` skill runs an interactive interview to produce a spec and phased plan, or `/design` does a deep 10-step discovery for complex features. Then `/implement` executes the plan. In single-agent mode, it works sequentially with TDD. In team mode, an orchestrator agent spawns parallel workers: kraken (TDD specialist -- writes failing tests, then implements), spark (quick fixes, single-file changes), and build-fixer (compile errors, lint failures). The orchestrator delegates but cannot edit files itself -- it verifies every result by re-reading files and re-running tests. Workers self-coordinate: they claim tasks, mark progress, and claim the next one without orchestrator micromanagement.

What makes Maestro distinctive is the wisdom loop. During implementation, workers emit `<remember>` tags when they discover something non-obvious -- a codebase convention, a tricky API behavior, an architectural constraint. Hook scripts extract these into `.maestro/wisdom/` files. On the next session, context hooks inject accumulated wisdom into the orchestrator and workers. The team literally gets smarter over time, across sessions and across plans.

Safety hooks enforce the orchestration model: the orchestrator is blocked from editing files (it must delegate), workers are blocked from editing plan files (only the orchestrator manages plans), dev servers are blocked in agent sessions, and workers are kept running until their tasks complete. Every tool use is logged to a trace file for auditability.

The bundle ships with 71 skills spanning orchestration workflows and language-specific patterns for Go, Python, Swift, TypeScript, C++, Java, Django, and Spring Boot, plus 29 glob-scoped rules that activate only for the relevant language files.

## How Maestro Works

Maestro turns a feature request into a completed implementation through three phases, using a `.maestro/` workspace directory to manage state.

### 1. Design

Start with `/setup` to initialize the workspace, then either:

- **`/new-track "add OAuth login"`** -- Quick interview generates a requirements spec + phased implementation plan
- **`/design "HIPAA-compliant patient portal"`** -- Deep 10-step BMAD-inspired discovery for complex features

Both produce a track directory (`.maestro/tracks/{id}/`) with `spec.md` and `plan.md`.

### 2. Implement

**`/implement`** executes the plan. Three modes:

| Mode | Command | How it works |
|------|---------|-------------|
| Single-agent | `/implement` | Executes tasks sequentially with TDD |
| Team | `/implement --team` | Orchestrator spawns parallel workers |
| Parallel | `/implement --parallel` | Sub-agents in isolated worktrees |

In **team mode**, the orchestrator delegates to specialized workers:

| Agent | Role |
|-------|------|
| **orchestrator** | Team lead -- delegates, verifies, extracts wisdom. Cannot edit files. |
| **kraken** | TDD specialist -- failing test first, then implement. Multi-file features. |
| **spark** | Quick-fix specialist -- single-file changes, config updates. |
| **build-fixer** | Handles compile errors, lint failures, type check errors. |
| **oracle** | Strategic advisor for architecture decisions. |
| **critic** | Post-implementation code review. |
| **security-reviewer** | Security analysis on diffs before final commit. |

Workers self-coordinate: claim tasks, mark progress, claim next. The orchestrator verifies every result by re-reading files and re-running tests.

### 3. Review

**`/review`** runs quality and security review on the completed track.

### The Wisdom Loop

Workers discover things during implementation and emit `<remember category="learning">...</remember>` tags. The `remember-extractor` hook captures these into `.maestro/wisdom/` files. On the next session, hooks inject accumulated wisdom into the orchestrator and workers. Knowledge persists across sessions and plans.

### Safety Hooks

17 hooks enforce the orchestration model and development quality:

| Hook | Purpose |
|------|---------|
| Orchestrator Guard | Blocks orchestrator from editing files -- must delegate |
| Plan Protection | Blocks workers from editing plan files -- only orchestrator manages plans |
| Dev Server Blocker | Blocks dev servers (npm run dev, vite, etc.) in agent sessions |
| Worker Persistence | Blocks workers from stopping while tasks remain |
| Verification Injector | Reminds to verify after delegation -- "don't trust, verify" |
| Error Detector | Injects investigation prompt when commands fail |
| Plan Validator | Checks plan files have required sections after write |
| Wisdom Injector | Surfaces wisdom files when reading plans |
| Remember Extractor | Captures `<remember>` tags from worker output into wisdom |
| Trace Logger | Logs every tool use to `.maestro/trace.jsonl` |
| Bash History | Mirrors successful agent commands to `~/.bash_history` |
| Tmux Reminder | Warns when long-running commands run outside tmux |
| Session Start | Injects active plans, wisdom, priority notes at session start |
| Subagent Context | Injects plan + wisdom when workers spawn |
| Plan Context | Preserves active plan names through context compaction |
| Keyword Detector | Detects `eco`/`ultrawork`/`think` keywords for mode switching |
| Git Push Reminder | Reminds about unpushed commits when session ends |

## What's Included

- **10 agents** -- orchestrator, kraken, spark, build-fixer, oracle, critic, security-reviewer, leviathan, progress-reporter, wisdom-synthesizer
- **71 skills** -- orchestration workflows, language patterns (Go, Python, Swift, TypeScript, C++, Java, Django, Spring Boot), testing, security, infrastructure, frontend, API design, content creation, AI/ML, and meta-development
- **29 rules** -- 9 common + 5 each for Go, Python, Swift, TypeScript (scoped by file glob)
- **17 hooks** across 7 events

## Changes From Source

- Directory names stripped of `maestro:` prefix (e.g., `maestro:design` became `design`)
- `maestro:AGENTS.md` skill renamed to `agents-guide`
- Rules flattened from nested language directories into a single `RULES/` directory with language prefixes
- Source `paths:` frontmatter field converted to Lore `globs:` field
- Claude-specific frontmatter fields (`lifecycle`, `domain`) removed; `argument-hint` preserved as pass-through; Lore-standard `user-invocable: true` added
- All 10 agents added with full frontmatter preserved (`phase`, `model`, `disallowedTools`, `tools` as YAML list)
- References to `maestro:` prefixed skill names updated to unprefixed names throughout skill bodies
- All 17 hook scripts converted from bash to Node.js ES modules (.mjs) and generalized for cross-platform use; 3 ECC hooks (dev server blocker, tmux reminder, git push reminder) included with `MAESTRO_ENABLE_ECC_QUALITY_GATES` toggle; 5 ECC hooks excluded (learning-observe, continuous-learning, skill-stocktake, strategic-compact, dev-server-blocker-v2) as they depend on the ECC skillpack config system
- Source infrastructure files (PRECEDENCE.md, README.md, install.sh, CHANGELOG.md, evals/, templates/) not included

## License

MIT License -- Copyright (c) 2025 Reina MacCredy. See the original repository for the full license text.
