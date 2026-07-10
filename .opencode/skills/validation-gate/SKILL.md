---
name: validation-gate
description: Validate Keniart changes by scope with explicit pass, fail, or not-run evidence.
---

Default validation commands:

- Config-only changes: JSON parse plus file presence checks.
- Frontend or Next.js source changes: `pnpm lint`.
- Runtime-rendering changes: `pnpm build` when feasible.
- React/Next debt review: `pnpm doctor:react --no-score --no-telemetry --blocking none`.

React Doctor notes:

- Current supported command: `pnpm doctor:react`.
- The project pins `react-doctor@0.4.2` as a dev dependency so every worktree uses the same version.
- Detected compatible runtime: Node `v22.22.0`; `react-doctor@0.4.2` requires `^20.19.0 || >=22.12.0`.
- Use `--no-score --no-telemetry` for local advisory scans unless the user explicitly wants shared scoring.

Report format:

- Command or check
- Scope
- Result: PASS / FAIL / NOT RUN
- Evidence
- If not run: reason, risk, and next action
