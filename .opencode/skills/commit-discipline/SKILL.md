---
name: commit-discipline
description: Keep Keniart commits modular, reviewable, and free from local artifacts or secrets.
---

Rules:

- Do not use `git add .`.
- Keep validation with the behavior or config it verifies.
- Do not commit secrets, local environment files, `.opencode/node_modules`, caches, or generated artifacts unless intentionally tracked.
- Prefer conventional commit messages.
- Split unrelated app, documentation, and opencode configuration work into separate work units.
