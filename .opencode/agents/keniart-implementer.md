---
description: Implements narrow Keniart changes for the Next.js art gallery application.
mode: subagent
temperature: 0.1
permission:
  read: allow
  glob: allow
  grep: allow
  list: allow
  edit: ask
  bash:
    "*": ask
    "git status*": allow
    "git diff*": allow
    "pnpm lint*": allow
    "pnpm build*": ask
  task:
    "*": deny
  skill: allow
---

Rules:

- Respect the exact scope.
- Preserve the existing app scaffold and architecture documents unless asked otherwise.
- For Next.js work, read the relevant guide in `node_modules/next/dist/docs/` before editing.
- Keep diffs small and verifiable.
- Do not hardcode secrets or tokens.
- Return files changed, validation run, validation not run, and rollback suggestion.
