# Pi Impeccable Help

Browse Impeccable guidance inside Pi, then prepare a command in the editor **without sending it**.

Unreleased source for Pi 0.85.0. No npm release.

[Usage](#usage) · [Installation](#installation) · [Contributing](CONTRIBUTING.md) · [Security](SECURITY.md)

This is a local terminal help panel, not a prompt template. Opening help, searching, and reading examples do not contact a model. The panel does not run Impeccable or install it for you.

## What it does

- Search 23 command entries by name or intent, in Spanish or English.
- Read when a command fits, when it does not, and what it may change.
- Prepare an example only after an explicit selection; confirm before replacing an existing draft.
- Browse without the Impeccable skill. Preparing a command requires its skill command to be loaded in Pi.

## Status and compatibility

Unreleased source, tested against Pi **0.85.0** and Node **24.9.0**. Package metadata `0.0.0` is a development marker, not a published release. Node 22.19 or newer is required. There is no npm release.

The panel requires Pi's interactive TUI. RPC, print, and JSON modes do not open it. Its reference catalog was checked against **Impeccable skill 4.2.0**; the loaded skill's instructions remain authoritative. Detecting a loaded skill does not verify its version.

## Installation

Install [Pi](https://github.com/earendil-works/pi-mono/tree/main/packages/coding-agent) first. To install this extension from source:

```sh
git clone https://github.com/Yivas/pi-impeccable-help.git
cd pi-impeccable-help
pi install .
```

`pi install .` registers the local directory in user settings; keep the checkout in place. In an existing Pi session, run `/reload`. No build is required. Pi provides the TUI runtime dependency.

[Impeccable](https://impeccable.style/) is a separate skill, installed according to its own instructions. This extension neither bundles nor automatically downloads it. If you previously created a prompt template named `impeccable-help.md`, remove or rename that template to avoid confusion with this command.

## Usage

Type in Pi, not in your shell:

```text
/impeccable-help
/impeccable-help tipografia
/impeccable-help --en audit
```

| Key | Action |
|---|---|
| Type text | Filter the command list |
| Up / Down | Select a command; scroll in its detail view |
| Enter | Open details; in details, prepare the example |
| Left / Backspace | Return from details to the list |
| Tab | Switch Spanish / English |
| Escape | Close without preparing a command |

The table shows default bindings. The panel honors Pi's configured selection, paging, tab, and editor-left/backspace bindings and shows the primary bindings in its footer. Page Up / Page Down also scroll details; Backspace returns to the list. These secondary shortcuts are not shown in the footer.

Spanish is the default; `--en` opens English directly. Language changes last only for that panel. Examples contain scope reminders: review the prepared text and identify the intended surface before sending it.

If the editor already contains a draft, you can cancel or confirm replacement. If that draft changes during confirmation, the panel preserves the newer text and asks you to try again. The extension never presses Enter in the main editor. **Sending the prepared skill command is a separate action that starts agent work and may modify your project.**

## Updating and removing

To update a source checkout, review its changes, then pull them and run `/reload` in Pi. To unregister it, run `pi remove .` from the same checkout, then `/reload`. Remove the checkout only after unregistering it. This does not uninstall Impeccable.

If the command is missing, check `pi list` and whether the checkout still exists, then reload. If help says the skill is not loaded, check that Impeccable is installed and skill commands are enabled in that session. Do not infer a skill installation from the presence of this help panel.

## Privacy and limits

The extension has no network, telemetry, process execution, or session-persistence code. It reads Pi's loaded command metadata and the current editor text, keeping both in memory. It does not log or transmit drafts. Like any Pi extension, it runs with the host process's privileges; these are implementation limits, not a sandbox.

The catalog provides guidance, not accessibility certification or guaranteed design improvements. Review the diff, render, and interactions after running a modifying command. `live` in particular needs recoverable source state and checks of IDs, listeners, and dynamic state.

## Development and participation

```sh
npm ci --ignore-scripts
npm test
```

Tests exercise the actual TUI components and a command-handler harness; no model account is required. See [CONTRIBUTING.md](CONTRIBUTING.md) for scope and checks.

This project is **collaborative open source under MIT**. Issues and pull requests are welcome. Report vulnerabilities through the private channel described in [SECURITY.md](SECURITY.md), not through public issues. The catalog descriptions and examples are original text. Impeccable is a separate Apache-2.0 project; this package does not redistribute its skill or engine.
