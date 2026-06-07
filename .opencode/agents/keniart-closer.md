---
description: Closes Keniart work units with validation evidence, risks, rollback, and commit guidance.
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

1. Summary
2. Files changed
3. Tests / Validation evidence
4. Risks / open questions
5. Rollback suggestion
6. Commit slicing suggestion if changes are large enough to split
