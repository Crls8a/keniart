# Apply Progress: Mobile Responsive Architecture

## Scope

- Change: `mobile-responsive-architecture`
- Issue: ACE-119
- Current apply slice: PR 2 / Unit 2 only — gallery SSR catalog migration
- Mode: Standard (strict TDD disabled; no test runner)
- Delivery: feature-branch-chain, PR 2 boundary based on previous Unit 1 commit `d78296b`

## Completed Tasks

- [x] 1.1 Created `src/components/artwork/ArtworkMediaFrame.tsx` with server-safe `relative`, sizing, background, overflow, and orientation padding variants.
- [x] 1.2 Updated `src/components/artwork/ResponsiveArtworkImage.tsx` docs/types to state the SSR-sized parent frame contract without changing `<picture>` behavior.
- [x] 1.3 Updated `src/components/layout/SiteHeader.tsx` to publish the shared header-height CSS variable/class contract.
- [x] 1.4 Updated `src/components/layout/MobileNavigation.tsx` to use the shared header offset instead of `top-[65px]`; native `<details>` remains intact and links remain focusable.
- [x] 1.5 Updated `src/components/artwork/ArtworkDetail.tsx` sticky offsets to use the same header contract.
- [x] 2.1 Converted `src/components/gallery/GalleryExperience.tsx` to a server component by removing `use client`, Motion, hooks, and client-side memoization; catalog order is sorted during server render.
- [x] 2.2 Converted `src/components/gallery/GalleryArtworkGrid.tsx` to server card markup using CSS `motion-safe:*` transitions and `ArtworkMediaFrame`.
- [x] 2.3 Verified `src/app/obras/page.tsx` and `src/app/galerias/page.tsx` keep using server data paths through `GalleryExperience`; catalog links, titles, and images now render from server component markup before hydration.

## Files Changed

| File | Action | What changed |
|---|---|---|
| `src/components/artwork/ArtworkMediaFrame.tsx` | Previously created | Adds SSR-safe reusable media frame primitive with `relative`, stable sizing variants, dark background, overflow clipping, and orientation padding hooks. |
| `src/components/artwork/ResponsiveArtworkImage.tsx` | Previously modified | Documents the parent sizing contract while keeping existing server-safe `<picture>` rendering unchanged. |
| `src/components/layout/siteHeaderContract.ts` | Previously created | Centralizes header height, mobile menu top offset, and detail sticky offset Tailwind class contracts. |
| `src/components/layout/SiteHeader.tsx` | Previously modified | Applies shared `--site-header-height` contract on the sticky header. |
| `src/components/layout/MobileNavigation.tsx` | Previously modified | Replaces hard-coded mobile overlay top offset with shared contract. |
| `src/components/artwork/ArtworkDetail.tsx` | Previously modified | Applies shared header contract and sticky offset for the media column. |
| `src/components/gallery/GalleryExperience.tsx` | Modified | Removes client boundary, Motion, and hooks; sorts artworks server-side and renders hero/list SSR markup with `ArtworkMediaFrame`. |
| `src/components/gallery/GalleryArtworkGrid.tsx` | Modified | Removes client boundary and Motion wrappers; renders server card/grid markup with CSS motion-safe enhancement and `ArtworkMediaFrame`. |
| `openspec/changes/mobile-responsive-architecture/tasks.md` | Modified | Marks Unit 2 tasks complete; Unit 3 and Phase 4 remain pending. |
| `openspec/changes/mobile-responsive-architecture/apply-progress.md` | Created | Stores merged Unit 1 + Unit 2 apply progress for hybrid artifact mode. |

## Validation Evidence

| Command | Scope | Result | Evidence |
|---|---|---|---|
| `pnpm lint` | Frontend source + OpenSpec artifacts | PASS | ESLint completed with no diagnostics. |
| `pnpm exec tsc --noEmit` | TypeScript source | PASS | Type checker completed with no output/errors. |
| `pnpm validate:artworks` | Artwork image manifest/assets | PASS | `Artwork image validation passed: 9 artwork(s), 100 unique optimized image path(s).` |
| `pnpm build` | Critical `/obras` and `/galerias` render path | PASS | Next.js 16.2.7 build compiled successfully and generated 21 static pages, including static `/obras` and `/galerias`. |
| `pnpm doctor:react --no-score --no-telemetry --blocking none` | React/Next debt review | PASS | Command completed in non-blocking mode and reported 9 advisory warnings; no blocking failures. |
| Manual responsive inspection | mobile/tablet/desktop and disabled-JS baseline | NOT RUN | Unit 2 apply was code + command validation only; full browser/device evidence remains Phase 4 / verify scope. |

## Deviations

None — implementation matches Unit 2 scope and avoids Unit 3 detail carousel work.

## Remaining Tasks

- [ ] Unit 3 / PR 3: detail carousel baseline/client island and `/obras/kooper` no-JS validation.
- [ ] Phase 4: remaining route/manual validation evidence and final verification report.

## Risks / Notes

- React Doctor advisory warnings are pre-existing or outside this Unit 2 slice until investigated in verification; the command did not fail because it was run with `--blocking none`.
- Manual disabled-JS/browser inspection remains necessary in Phase 4 to prove responsive behavior beyond command-level evidence.
