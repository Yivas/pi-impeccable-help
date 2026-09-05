# Changelog

## Unreleased

## 0.1.0 — 2026-09-05

### Added

- Local `/impeccable-help` panel with 23 command entries, intent search, Spanish/English text, usage guidance, and examples.
- Explicit editor preparation without sending a message, confirmation before replacing drafts, and protection against concurrent edits or a skill unloaded during confirmation.
- Pi theme and configurable keyboard support, scrollable details, and bounded rendering for small terminals.
- npm package distribution with no bundled Impeccable skill or engine.

### Compatibility and limits

- Targets Pi 0.85.0; requires Node 22.19 or newer. The reference catalog follows Impeccable skill 4.2.0.
- Help requires interactive TUI mode. It does not invoke a model, execute Impeccable, use the network, or persist session state.
- Impeccable must be installed separately. When migrating from a local checkout, unregister that source before enabling the npm package, then reload Pi.
