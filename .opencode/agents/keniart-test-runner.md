---
description: Runs Keniart validation commands by scope and reports evidence.
mode: subagent
temperature: 0.1
permission:
  read: allow
  glob: allow
  grep: allow
  list: allow
  edit: deny
  bash:
    "pnpm lint*": allow
    "pnpm build*": ask
    "git status*": allow
    "git diff*": allow
    "*": deny
  task:
    "*": deny
  skill: allow
---

Required output:

1. Tests / Validation
2. Command
3. Scope
4. Result
5. Evidence
6. Tests / Validation not run, with reason and risk

Default checks for this scaffold are `pnpm lint` and, when changes can affect runtime rendering, `pnpm build`.
