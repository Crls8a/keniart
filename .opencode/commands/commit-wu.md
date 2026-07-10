---
description: Prepare modular commit slicing for the current Keniart work unit without committing.
agent: keniart-closer
---

Context:

$ARGUMENTS

Do not commit. Only propose slicing and messages.

Required format:

1. Current tree state
2. Files excluded
3. Proposed commit order
4. Message per commit
5. Validation required per commit or block
6. Risks and rollback

Rules:

- Do not use `git add .`.
- Do not include secrets, local env files, `.opencode/node_modules`, caches, or unrelated generated files.
