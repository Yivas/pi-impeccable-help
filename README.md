# Pi Impeccable Help

Browse Impeccable guidance inside Pi, then prepare a command in the editor **without sending it**.

Version 0.1.0 · Pi 0.85.0 · MIT

[Usage](#usage) · [Installation](#installation) · [Releases](https://github.com/Yivas/pi-impeccable-help/releases) · [Contributing](https://github.com/Yivas/pi-impeccable-help/blob/main/CONTRIBUTING.md) · [Security](https://github.com/Yivas/pi-impeccable-help/blob/main/SECURITY.md)

This is a local terminal help panel, not a prompt template. Opening help, searching, and reading examples do not contact a model. The panel does not run Impeccable or install it for you.

## What it does

- Search 23 command entries by name or intent, in Spanish or English.
- Read when a command fits, when it does not, and what it may change.
- Prepare an example only after an explicit selection; confirm before replacing an existing draft.
- Browse without the Impeccable skill. Preparing a command requires its skill command to be loaded in Pi.

## Status and compatibility

Version **0.1.0** targets Pi **0.85.0** and Node **22.19 or newer**. Checks cover Node 22.19 and 24 on Linux, plus Node 24 on Windows. See [changes](https://github.com/Yivas/pi-impeccable-help/blob/main/CHANGELOG.md) and [release artifacts](https://github.com/Yivas/pi-impeccable-help/releases).

The panel requires Pi's interactive TUI. RPC, print, and JSON modes do not open it. Its reference catalog was checked against **Impeccable skill 4.2.0**; the loaded skill's instructions remain authoritative. Detecting a loaded skill does not verify its version.

## Installation

Install [Pi](https://github.com/earendil-works/pi-mono/tree/main/packages/coding-agent) first. From a terminal:

```sh
pi install npm:pi-impeccable-help
```

In an existing Pi session, run `/reload`, then `/impeccable-help`. No build is required. Pi provides the TUI runtime dependency. This installs in user scope; use Pi's `-l` option only if you want a project-local installation.

To pin this version instead, use `pi install npm:pi-impeccable-help@0.1.0`. Pinned packages do not advance during normal package updates.

For development, clone this repository and run `pi install .` from its root. That registers the checkout without copying it, so keep the directory in place. Before switching between a checkout and npm, unregister the old source to avoid loading the command twice.

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

Read the release notes before updating. For an unpinned npm installation:

```sh
pi update npm:pi-impeccable-help
```

To remove it:

```sh
pi remove npm:pi-impeccable-help
```

Run `/reload` afterward. To select or return to a specific version, install its exact npm spec, such as `pi install npm:pi-impeccable-help@0.1.0`; pinning disables normal package updates. None of these commands uninstalls Impeccable itself.

For a source checkout, pull reviewed changes to update, or run `pi remove .` from that checkout to unregister it. Remove the directory only after unregistering it.

If the command is missing, check `pi list` and that its package source is still available, then reload. If help says the skill is not loaded, check that Impeccable is installed and skill commands are enabled in that session. Do not infer a skill installation from the presence of this help panel.

## Privacy and limits

The extension has no network, telemetry, process execution, or session-persistence code. It reads Pi's loaded command metadata and the current editor text, keeping both in memory. It does not log or transmit drafts. Like any Pi extension, it runs with the host process's privileges; these are implementation limits, not a sandbox.

The catalog provides guidance, not accessibility certification or guaranteed design improvements. Review the diff, render, and interactions after running a modifying command. `live` in particular needs recoverable source state and checks of IDs, listeners, and dynamic state.

## Development and participation

```sh
npm ci --ignore-scripts
npm test
```

Tests exercise the actual TUI components and a command-handler harness; no model account is required. See [CONTRIBUTING.md](https://github.com/Yivas/pi-impeccable-help/blob/main/CONTRIBUTING.md) for scope and checks.

This project is **collaborative open source under MIT**. Issues and pull requests are welcome. Report vulnerabilities through the private channel described in [SECURITY.md](https://github.com/Yivas/pi-impeccable-help/blob/main/SECURITY.md), not through public issues. The catalog descriptions and examples are original text. Impeccable is a separate Apache-2.0 project; this package does not redistribute its skill or engine.
