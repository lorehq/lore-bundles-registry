# Lore Bundle Registry

The registry index for [Lore](https://github.com/lorehq/lore) bundle discovery. Used by the CLI and TUI marketplace.

## Registry

The [`registry.json`](registry.json) file lists all published bundles with their repo URLs, descriptions, and metadata.

## Bundles

| Bundle | Repo | Description |
|--------|------|-------------|
| lore-os | [lorehq/lore-os](https://github.com/lorehq/lore-os) | Behavioral layer — hook scripts, ambiguity scanning, session memory |
| cloudnative-starter | [lorehq/bundle-cloudnative-starter](https://github.com/lorehq/bundle-cloudnative-starter) | Code review, TDD, architecture, security |
| stack-skills | [lorehq/bundle-stack-skills](https://github.com/lorehq/bundle-stack-skills) | Cognitive firewall skills — adversarial review, reasoning tracing |
| maestro | [lorehq/bundle-maestro](https://github.com/lorehq/bundle-maestro) | Multi-agent orchestration with parallel workers |
| dev-discipline | [lorehq/bundle-dev-discipline](https://github.com/lorehq/bundle-dev-discipline) | Git workflow discipline — commit enforcement, execution planning |

## Install a Bundle

```bash
lore bundle install <slug>
```

Or browse and install from the TUI dashboard's Marketplace tab.

## Contributing

To add a bundle to the registry, submit a PR adding an entry to `registry.json`.

## License

Each bundle retains its original license. See individual bundle repos.
