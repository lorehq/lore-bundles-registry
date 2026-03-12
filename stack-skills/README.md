# Stack Skills (Lore Bundle)

5 cognitive firewall skills for AI agents, packaged as a Lore bundle.

## What It Does

AI agents are confident by default. They anchor on the first solution they find, hallucinate sources, skip failure analysis, and produce reasoning you cannot audit. Stack Skills provides five structured skills that counteract specific cognitive failure modes -- each one a deliberate thinking protocol, not a vague instruction to "be careful."

When you need to stress-test a decision or PR before committing to it, `adversarial-review` runs a three-vector attack. It steel-mans the current approach first (why was this chosen? what does it optimize for?), then systematically attacks logical soundness, edge cases, and structural integrity. Every finding gets a severity classification and a concrete counter-proposal with trade-offs. It is not a code review -- it is a deliberate attempt to break your reasoning.

When you are stuck on the obvious answer, `creativity-sampler` generates five alternatives across a typicality spectrum from conventional to wild card, using probability weighting to break anchoring bias. It exposes hidden assumptions that constrain your option space.

When accuracy matters more than speed, `cross-verified-research` enforces source tracing with anti-hallucination safeguards. Every claim must be cross-verified by two or more independent sources, graded on a confidence tier system (S/A/B/C). The agent cannot assert facts without citing where they came from.

Before committing to a plan or irreversible decision, `pre-mortem` assumes complete failure six months out and works backward through five categories (technical, organizational, external, temporal, assumption) to surface risks. Each scenario must name specific technologies and quantities -- "the database might not scale" is banned. The output includes measurable leading indicators and circuit breakers with concrete trigger conditions.

When you need to see why a conclusion was reached, `reasoning-tracer` forces the agent to make its reasoning chain visible: assumption inventories, decision branching, confidence decomposition, and weakest-link identification. It turns opaque "here's what I think" into auditable reasoning you can challenge.

The skills are designed to chain: run `creativity-sampler` to generate options, `cross-verified-research` to validate them, then `adversarial-review` to stress-test the winner. Or run `pre-mortem` on a plan, then `creativity-sampler` to generate mitigations for the top risks.

## Attribution

Originally created by [@thestack_ai](https://github.com/whynowlab) as [whynowlab/stack-skills](https://github.com/whynowlab/stack-skills). Licensed under MIT.

## What's Included

| Skill | Purpose |
|-------|---------|
| adversarial-review | Devil's Advocate stress-testing with 3-vector attack |
| creativity-sampler | Probability-weighted option generation that breaks anchoring bias |
| cross-verified-research | Source-traced research with anti-hallucination safeguards |
| pre-mortem | Prospective failure analysis using Gary Klein's technique |
| reasoning-tracer | Makes reasoning chains visible and auditable |

## What Changed from the Original

- Converted from Claude Code skill format to Lore bundle format
- Skill directories moved from `skills/` (lowercase) to `SKILLS/` (uppercase per Lore convention)
- Frontmatter: removed embedded trigger keyword lists from descriptions; added `user-invocable: true` (Lore standard); `argument-hint` and `allowed-tools` preserved as pass-through fields
- Removed references to skills not included in this bundle (deep-dive-analyzer, skill-composer, orchestrator strategy team)
- Skill body content preserved as-is -- no rewrites
- Added `manifest.json` and `LORE.md` per Lore bundle standard

## License

MIT License. See the original repo for full license text.
