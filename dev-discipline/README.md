# Dev Discipline (Lore Bundle)

A Lore bundle converted from [hunterassembly/dev-discipline](https://github.com/hunterassembly/dev-discipline), licensed under MIT.

## What It Does

AI agents are productive but messy committers. They bundle unrelated changes into single commits, write vague messages like "update stuff," skip tests for behavioral changes, and leave documentation out of date. Dev Discipline fixes this by enforcing git workflow hygiene at every stage of the development process.

The core `dev-discipline` skill installs git hooks (pre-commit, commit-msg, post-commit) that enforce the rules in real time. The pre-commit hook warns when staging too many files or when source changes lack corresponding test files. The commit-msg hook enforces conventional commit format (`type(scope): description`) and requires a `why:` line explaining the motivation -- not just the what. Every commit must address exactly one logical concern: no mixing refactors with features, no bundling formatting with bug fixes.

The post-commit hook feeds into `dev-diary`, which automatically maintains a work log in `.dev/diary/`. Every commit appends an entry. The skill can then summarize a day's work, generate standup updates, or search the diary for past decisions.

At the end of a session (or before a PR), the `dev-reconciliation` skill audits everything: it checks each commit for atomicity violations, identifies test gaps (new functions without tests, bug fixes without regression tests), flags stale documentation, and detects missing decision records. It also catches commits that bypassed hooks. The output is a structured reconciliation report with specific recommendations -- not auto-fixes, but a clear list of what needs attention.

For teams running parallel agent workstreams, the `orchestrator` skill defines branching strategy, agent identity, and merge protocol. The `planner` skill enforces execution plans that follow the Codex Exec Plans standard, with validation scripts to check plan completeness.

The bundle includes setup and teardown scripts, decision record templates, standup update templates, and a health-check script for one-shot local quality loops.

## What's Included

Five skills with supporting scripts, templates, and assets:

| Skill | Purpose |
|-------|---------|
| `dev-discipline` | Core commit discipline -- git hooks, conventional commits, one-concern-per-commit enforcement |
| `dev-diary` | Automatic commit diary maintained by post-commit hook, with summarization and standup generation |
| `dev-reconciliation` | End-of-session audit -- commit atomicity, test gaps, doc staleness, decision logging |
| `planner` | Execution plan compliance with the Codex Exec Plans standard |
| `orchestrator` | Multi-agent coordination -- branching, identity, merge gates |

### Supporting files

- **scripts/** -- setup.sh, teardown.sh, health-check.sh, doc-gardener.sh, committer, validation scripts, and more
- **templates/** -- decision records, standup updates, reconciliation reports, execution plans, architecture docs
- **assets/** -- git hooks (pre-commit, commit-msg, post-commit), discipline contract, env example

## What Changed From Source

- Skills moved from `skills/` to `SKILLS/` (Lore convention)
- YAML frontmatter updated: removed `license` and `metadata` fields, added `user-invocable: true`
- Removed source-project-specific path references (`.agents/skills/...`, `.agent/PLANS.md`) from SKILL.md bodies
- Added `manifest.json`, `LORE.md`, and this `README.md` for Lore bundle compatibility
- All scripts, templates, and assets copied verbatim -- no behavioral changes

## License

MIT -- see the original repository for full license text.
