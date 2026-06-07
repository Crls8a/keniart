---
description: Run a scoped Keniart work unit with delegation and validation evidence.
agent: keniart-orchestrator
---

Work Unit:

$ARGUMENTS

Process:

1. Load relevant skills.
2. Delegate exploration to `keniart-explorer`.
3. Define a closed scope.
4. Delegate implementation to `keniart-implementer` only when code changes are needed.
5. Review with `keniart-reviewer`.
6. Validate with `keniart-test-runner`.
7. Close with validation evidence, risks, and rollback.
