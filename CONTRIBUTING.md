# Contributing

Bug reports, focused feature proposals, documentation fixes, translations, and pull requests are welcome. Read our [Code of Conduct](CODE_OF_CONDUCT.md).

## Report or propose a change

Search [existing issues](https://github.com/Yivas/pi-impeccable-help/issues) first. Use the bug or proposal form under [New issue](https://github.com/Yivas/pi-impeccable-help/issues/new/choose). For bugs, include the Pi and Node versions, operating system, terminal dimensions, relevant custom keybindings, minimal reproduction, and expected versus observed behavior.

Use synthetic text. Remove credentials, personal paths, project prompts, drafts, session identifiers, and private configuration from examples and screenshots. Report suspected vulnerabilities privately through [SECURITY.md](SECURITY.md), not a public issue.

## Develop and test

Use Node 22.19 or newer and npm. The current compatibility baseline is Pi 0.85.0; the TUI development dependency is pinned in the lockfile.

```sh
npm ci --ignore-scripts
npm test
```

The package is JavaScript ESM and needs no build. Keep runtime dependencies limited to Pi's native TUI library. Test the extension in a separate Pi test session before changing global settings.

The tests use real TUI components and a command-handler harness. For UI changes, also check the interactive panel: search, selection, detail scrolling, language switching, Escape, preparation, rejected draft replacement, and a narrow terminal. Do not submit a prepared skill command during help-only tests.

## Pull requests

Open a focused branch in your fork and submit a pull request against `main`. Explain the user-visible problem, why the change fixes it, tests run, compatibility impact, and remaining limitations. Update README usage if behavior changes and keep Spanish/English locale entries in sync. Add regression tests for bug fixes.

Preserve these boundaries:

- Help does not call a model, send a message, run a process, use the network, or persist session state.
- Preparation only writes the editor after selection and required confirmation; newer drafts must survive.
- Use Pi's public APIs, theme, keyboard configuration, and terminal dimensions.
- Keep human-facing strings in the locale files. Code, comments, and project documentation use English.
- Do not bundle Impeccable's skill, engine, or third-party assets. Include only material you have permission to contribute.

Contributions are distributed under this project's MIT license. Maintainers may request changes or decline proposals outside this scope; there is no guaranteed review timeline.
