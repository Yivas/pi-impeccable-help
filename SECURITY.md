# Security policy

## Supported versions

| Line | Status |
|---|---|
| 0.1.x | Supported |
| Current `main` | Maintained development source |
| Older source snapshots | No separate maintenance commitment |

Compatibility is currently tested against Pi 0.85.0. Include the package version or source commit in reports.

## Scope

Report unintended execution, message sending, disclosure or loss of editor content, unsafe terminal output, or supply-chain problems in this extension. The panel is not a sandbox: installed Pi extensions run with the host process's privileges. This implementation avoids network requests, process execution, and session persistence; the host and other extensions remain outside those limits.

Impeccable is installed separately. Problems in its skill or engine should be reported to its maintainers. Sending a skill command is agent execution, not local help.

## Report privately

Use [GitHub private vulnerability reporting](https://github.com/Yivas/pi-impeccable-help/security/advisories/new). Do not publish an exploit or sensitive reproduction in an issue.

Include the source commit, Pi and Node versions, operating system, minimal synthetic reproduction, expected and observed results, impact, and any workaround. Remove tokens, real drafts, prompts, session IDs, personal paths, and private configuration. Do not attach a full session log.

The maintainer will review the report, ask for clarification when needed, and coordinate a fix and disclosure through the private advisory. No response deadline, bounty, or CVE assignment is promised.
