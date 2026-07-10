# Proposal: Mobile Responsive Architecture

## Intent

Make all main Keniart pages responsive from the first server-rendered paint. Layout, catalog content, image frames, and navigation MUST work with SSR/CSS alone; client JavaScript becomes optional progressive enhancement for Motion, scroll buttons, and form submit.

## Scope

### In Scope
- Split gallery catalog markup for `/obras` and `/galerias` into SSR/CSS base plus client-only animation enhancement.
- Standardize stable responsive media-frame contracts for `ResponsiveArtworkImage` parents.
- Harden shared shell/header/mobile navigation layout against viewport and sticky-header drift.
- Validate main pages: `/`, `/obras`, `/obras/[slug]`, `/series`, `/series/[slug]`, `/galerias`, `/artista`, `/contacto`, `/dossier`.

### Out of Scope
- Visual redesign, content/copy rewrites, or gallery taxonomy changes.
- New test runner adoption.
- Replacing Motion or changing Next.js routing APIs.

## Capabilities

### New Capabilities
- `responsive-first-render`: Defines SSR/CSS-first responsive behavior for main pages, image frames, gallery catalogs, and progressive enhancement boundaries.

### Modified Capabilities
- None — no existing OpenSpec specs are present.

## Approach

Use SSR/CSS-first decomposition. Route pages, section/card grids, catalog markup, media frames, and scroll-snap carousel structure stay server-rendered. Motion wrappers, reduced-motion detection, carousel controls, and form submission remain small client islands that enhance already-visible content.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `src/components/gallery/*` | Modified | Move catalog structure out of client-only Motion ownership. |
| `src/components/artwork/*` | Modified | Enforce stable image-frame and carousel sizing, especially Kooper mixed ratios. |
| `src/components/layout/*` | Modified | Harden shell, sticky header, and mobile disclosure offsets. |
| `src/app/**/page.tsx` main pages | Modified | Confirm pages compose SSR/CSS responsive primitives. |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Catalog remains client-owned | High | Require SSR catalog markup before Motion enhancement. |
| Image frame collapse | Med | Centralize parent aspect/min-height contract. |
| Header/mobile nav offset drift | Med | Replace hard-coded assumptions with shared layout contract. |
| 400-line budget exceeded | Med-High | Use chained rollout slices. |

## Validation Plan

- Run `pnpm lint`, `pnpm exec tsc --noEmit`, `pnpm validate:artworks`, `pnpm build`.
- Run `pnpm doctor:react --no-score --no-telemetry --blocking none` for React/Next debt review.
- Manually inspect target pages at mobile/tablet/desktop widths; include `/obras/kooper` stress case.

## Rollback Plan

Revert each slice independently: shared layout/media contracts first, gallery SSR split second, detail carousel/page migrations last. Since behavior stays component-local, rollback restores prior client component boundaries without data changes.

## Dependencies

- Exploration artifact `openspec/changes/mobile-responsive-architecture/exploration.md` / Engram `sdd/mobile-responsive-architecture/explore`.
- Existing Next.js 16.2.7 app patterns; consult local Next docs only if routing/API changes become necessary.

## Success Criteria

- [ ] Main page content is visible and correctly responsive before hydration.
- [ ] `/obras` and `/galerias` catalog markup is not dependent on Motion/client bundles.
- [ ] `ResponsiveArtworkImage` consumers have stable SSR-known parent sizing.
- [ ] Validation commands pass or report explicit evidence.
