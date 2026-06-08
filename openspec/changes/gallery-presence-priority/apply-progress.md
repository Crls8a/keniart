# Gallery Presence Priority — Apply Note

## Goal
Make `Presencia en galerías` read as standalone context before the artwork/gallery experience on `/galerias`.

## Completed
- [x] Rendered `GalleryPresenceSection` before `GalleryExperience` on `/galerias`.
- [x] Moved the gallery presence layout shell into its own `PageSection`, keeping gallery presence photos separate from artwork data.

## Scope Notes
- Did not touch `src/data/artworks.ts` or Cartografías.
- Preserved existing Spanish copy.
- Consulted local Next.js docs: `node_modules/next/dist/docs/01-app/01-getting-started/03-layouts-and-pages.md` and `05-server-and-client-components.md`.

## Review Workload Forecast
- 400-line budget risk: Low
- Chained PRs recommended: No
- Decision needed before apply: No

## Validation
- `pnpm lint` — PASS
- `pnpm exec tsc --noEmit` — PASS
- `pnpm build` — PASS
- `pnpm doctor:react --no-score --no-telemetry --blocking none --verbose` — PASS, no issues found
- `git diff --check` — PASS
