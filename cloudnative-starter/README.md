# CloudNative Starter

Comprehensive development bundle providing structured agents, skills, and rules for professional software engineering workflows.

## What It Does

Most AI coding sessions drift: the agent jumps straight into code, skips tests, produces a single massive commit, and misses security issues you only catch in review. CloudNative Starter imposes a professional development workflow that prevents this.

When you start a feature, the planner agent analyzes your codebase, identifies affected components and risks, and produces a phased implementation plan with dependencies -- before any code is written. The tdd-guide agent enforces red-green-refactor: it writes failing tests first, implements minimally to pass them, then refactors, targeting 80%+ coverage. After implementation, the code-reviewer agent runs your diff through a checklist covering security (OWASP Top 10, hardcoded secrets, SQL injection), code quality (function size, nesting depth, dead code), and performance (algorithm complexity, N+1 queries, missing caching). A separate security-reviewer agent does a focused pass on authentication, input validation, and dependency vulnerabilities.

Beyond agents, 13 hook scripts automate the tedious parts of a disciplined workflow. A safety net blocks dangerous tool calls (file deletions outside the project, writes to system paths). A doc blocker prevents edits to files marked read-only. An auto-formatter runs Prettier after every file write. A pre-compact hook auto-commits a checkpoint before context compaction so you never lose work. Session memory is saved on exit and restored on start, so context survives restarts.

The bundle also includes 25 skills covering backend patterns, frontend patterns, TDD workflows, e2e testing with Playwright, code review checklists, security review procedures, refactoring workflows, and a full verification loop (build, types, lint, tests, security scan). The 8 rules enforce coding style, git workflow (conventional commits, atomic changes), testing standards, and performance guidelines across every session.

If you want a single bundle that gives your AI agent the habits of a senior engineer -- plan first, test first, review everything, automate the guardrails -- this is it.

## Attribution

Adapted from [cloudnative-co/claude-code-starter-kit](https://github.com/cloudnative-co/claude-code-starter-kit) (MIT License).

## What's Included

- **8 rules** — coding style, git workflow, testing, security, performance, patterns, agent orchestration, automation hooks
- **25 skills** — 11 reference skills + 14 user-invocable workflow skills (converted from commands), with 5 deep reference documents
- **9 agents** — architect, planner, tdd-guide, code-reviewer, security-reviewer, build-error-resolver, e2e-runner, refactor-cleaner, doc-updater
- **13 hook scripts** across 5 events — session-start (auto-update, memory restore), pre-tool-use (safety net, doc blocker, push review, tmux guard, strategic compact), post-tool-use (console.log warning, auto-format, PR logging), pre-compact (auto-commit checkpoint), stop (debug logging reminder, memory save)

## Changes from Original

### Format
- Converted to Lore bundle format (manifest.json, RULES/, SKILLS/, AGENTS/)
- Added YAML frontmatter with `description` to all rules (required by Lore)
- Added YAML frontmatter with `name`, `description`, `user-invocable` to skills converted from commands
- Large code examples in e2e and tdd skills extracted to `references/` subdirectories (progressive disclosure)

### Content Preserved
- All 9 agents converted with full original content (role descriptions, workflows, checklists, examples)
- All 11 reference skills converted with full original content (patterns, code samples, configuration guides)
- All 14 command→skill conversions preserve complete workflows, code examples, and diagrams
- 3 memory reference files (architecture patterns, best practices, context engineering) included as skill references under orchestrate/, strategic-context/, and continuous-learning/

### Removed
- `model: opus` from all agents (platform-specific, not portable)
- Installer infrastructure (setup.sh, wizard, profiles, i18n, lib)
- Claude Code memory files and settings configs
- Model selection guidance from performance rule (platform-specific)
- `settings-reference.md` and `MEMORY.md` index file (Claude Code-specific)

### Hooks Converted
- 12 Claude Code hooks (hooks.json format with inline bash) converted to 13 Node.js ES module scripts (.mjs)
- Each behavior is a separate script file (one behavior per file)
- `safety-net` rewritten from cc-safety-net binary dependency to standalone JS logic
- `tmux-hooks` converted to `tmux-guard.mjs` — blocks dev servers, warns on long-running commands outside tmux
- `auto-update` checks for bundle updates via `git fetch --dry-run` on session start
- `memory-session-start` / `memory-session-end` persist session state across restarts
- `strategic-compact` suggests context management after sustained tool use

### Hooks Dropped
- `statusline` — Claude Code terminal API, not portable
- `fonts` / `ghostty` / `codex-mcp` — infrastructure/integration, not agent behavior

### Generalized
- Platform-specific path references (`~/.claude/agents/`, `~/.claude/commands/`) removed or made generic
- Slash command syntax (`/compact`, `/verify`) replaced with workflow descriptions
- References to Claude Code-specific features (settings.json hooks, model selection) generalized
- Agent SDK vs CLI distinctions removed from architecture patterns

### Upgraded
- Commands converted to user-invocable skills with proper frontmatter and workflow descriptions
- Thin agent-wrapper commands (e2e, plan, tdd) expanded into proper skills with pre-conditions, inputs/outputs, and success criteria
- `project-guidelines-example` converted from filled-in example to a skill about HOW to write project guidelines
- `strategic-compact` rewritten as platform-agnostic `strategic-context` (manage context window proactively)
- Memory reference files generalized and distributed as deep skill references

## License

MIT (same as original)
