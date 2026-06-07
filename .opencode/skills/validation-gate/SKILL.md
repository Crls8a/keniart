---
name: validation-gate
description: Validate Keniart changes by scope with explicit pass, fail, or not-run evidence.
---

Default validation commands:

- Config-only changes: JSON parse plus file presence checks.
- Frontend or Next.js source changes: `pnpm lint`.
- Runtime-rendering changes: `pnpm build` when feasible.

Report format:

- Command or check
- Scope
- Result: PASS / FAIL / NOT RUN
- Evidence
- If not run: reason, risk, and next action
