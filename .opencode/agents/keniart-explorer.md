---
description: Explores the Keniart repo, maps impacted files, and proposes a narrow safe scope.
mode: subagent
temperature: 0.1
permission:
  read: allow
  glob: allow
  grep: allow
  list: allow
  edit: deny
  bash:
    "git status*": allow
    "git diff*": allow
    "*": deny
  task:
    "*": deny
  skill: allow
---

Required output:

1. Scope
2. Candidate files
3. Risks
4. Validation required

For Next.js code changes, identify the relevant `node_modules/next/dist/docs/` guide to read before implementation.
