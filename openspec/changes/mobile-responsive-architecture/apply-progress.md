# Apply Progress: Mobile Responsive Architecture

## Scope

- Change: `mobile-responsive-architecture`
- Issue: ACE-119
- Current apply slice: PR 3 / Unit 3 only — detail carousel baseline + validation evidence hooks
- Mode: Standard (strict TDD disabled; no test runner)
- Delivery: feature-branch-chain, PR 3 boundary based on previous Unit 2 commit `cf304cf`

## Completed Tasks

- [x] 1.1 Created `src/components/artwork/ArtworkMediaFrame.tsx` with server-safe `relative`, sizing, background, overflow, and orientation padding variants.
- [x] 1.2 Updated `src/components/artwork/ResponsiveArtworkImage.tsx` docs/types to state the SSR-sized parent frame contract without changing `<picture>` behavior.
- [x] 1.3 Updated `src/components/layout/SiteHeader.tsx` to publish the shared header-height CSS variable/class contract.
- [x] 1.4 Updated `src/components/layout/MobileNavigation.tsx` to use the shared header offset instead of `top-[65px]`; native `<details>` remains intact and links remain focusable.
- [x] 1.5 Updated `src/components/artwork/ArtworkDetail.tsx` sticky offsets to use the same header contract.
- [x] 2.1 Converted `src/components/gallery/GalleryExperience.tsx` to a server component by removing `use client`, Motion, hooks, and client-side memoization; catalog order is sorted during server render.
- [x] 2.2 Converted `src/components/gallery/GalleryArtworkGrid.tsx` to server card markup using CSS `motion-safe:*` transitions and `ArtworkMediaFrame`.
- [x] 2.3 Verified `src/app/obras/page.tsx` and `src/app/galerias/page.tsx` keep using server data paths through `GalleryExperience`; catalog links, titles, and images now render from server component markup before hydration.
- [x] 3.1 Converted `src/components/artwork/ArtworkImageGallery.tsx` from a client-owned gallery to a server-rendered scroll-snap baseline with figure ids, anchor thumbnails, and stable `ArtworkMediaFrame` detail/thumbnail sizing.
- [x] 3.2 Created `src/components/artwork/ArtworkCarouselControls.tsx` as the only client island for progressive previous/next smooth-scroll enhancement.
- [x] 3.3 Verified `src/app/obras/[slug]/page.tsx`, especially generated `/obras/kooper`, keeps detail media markup reachable without JS controls through SSR figures, native horizontal scroll, and thumbnail anchors.
- [x] 4.2 Ran and reported command validation for lint, type checking, artwork validation, build, and React Doctor.

## Files Changed

| File | Action | What changed |
|---|---|---|
| `src/components/artwork/ArtworkMediaFrame.tsx` | Previously created | Adds SSR-safe reusable media frame primitive with `relative`, stable sizing variants, dark background, overflow clipping, and orientation padding hooks. |
| `src/components/artwork/ResponsiveArtworkImage.tsx` | Previously modified | Documents the parent sizing contract while keeping existing server-safe `<picture>` rendering unchanged. |
| `src/components/layout/siteHeaderContract.ts` | Previously created | Centralizes header height, mobile menu top offset, and detail sticky offset Tailwind class contracts. |
| `src/components/layout/SiteHeader.tsx` | Previously modified | Applies shared `--site-header-height` contract on the sticky header. |
| `src/components/layout/MobileNavigation.tsx` | Previously modified | Replaces hard-coded mobile overlay top offset with shared contract. |
| `src/components/artwork/ArtworkDetail.tsx` | Previously modified | Applies shared header contract and sticky offset for the media column. |
| `src/components/gallery/GalleryExperience.tsx` | Previously modified | Removes client boundary, Motion, and hooks; sorts artworks server-side and renders hero/list SSR markup with `ArtworkMediaFrame`. |
| `src/components/gallery/GalleryArtworkGrid.tsx` | Previously modified | Removes client boundary and Motion wrappers; renders server card/grid markup with CSS motion-safe enhancement and `ArtworkMediaFrame`. |
| `src/components/artwork/ArtworkImageGallery.tsx` | Modified | Removes the client boundary and event handlers from the gallery; renders SSR scroll-snap figures, stable detail frames, accessible captions, and thumbnail anchor links. |
| `src/components/artwork/ArtworkCarouselControls.tsx` | Created | Adds progressive client-only previous/next buttons that call `scrollBy` on the already-rendered gallery scroller. |
| `openspec/changes/mobile-responsive-architecture/tasks.md` | Modified | Marks Unit 3 tasks and command-validation task 4.2 complete; route-wide/manual inspection tasks remain pending. |
| `openspec/changes/mobile-responsive-architecture/apply-progress.md` | Modified | Merges Unit 1 + Unit 2 history with Unit 3 completion and validation evidence. |

## Validation Evidence

| Command / Check | Scope | Result | Evidence |
|---|---|---|---|
| `pnpm lint` | Frontend source + OpenSpec artifacts | PASS | ESLint completed with no diagnostics. |
| `pnpm exec tsc --noEmit` | TypeScript source | PASS | Type checker completed with no output/errors. |
| `pnpm validate:artworks` | Artwork image manifest/assets | PASS | `Artwork image validation passed: 9 artwork(s), 100 unique optimized image path(s).` |
| `pnpm build` | Detail route SSR/SSG and app build | PASS | Next.js 16.2.7 build compiled successfully and generated 21 static pages; `/obras/[slug]` SSG includes `/obras/kooper`. |
| `pnpm doctor:react --no-score --no-telemetry --blocking none` | React/Next debt review | PASS | Command completed in non-blocking mode and reported 9 advisory warnings; no blocking failures. |
| Generated HTML check | `/obras/kooper` SSR detail baseline | PASS | `.next/server/app/obras/kooper.html` contains `Retrato de Kooper` and generated gallery markup for the SSG detail route after build. |
| Manual responsive inspection | mobile/tablet/desktop and disabled-JS baseline | NOT RUN | Out of this apply slice by instruction; route-wide visual QA remains verify/manual evidence scope. |

## Deviations

- Thumbnail links remain server-rendered anchors to preserve a no-JS path, but the primary baseline does not depend on hash navigation: media figures are reachable by native horizontal scroll, while client previous/next controls are optional progressive enhancement.

## Remaining Tasks

- [ ] 4.1 Inspect `/`, `/series`, `/series/[slug]`, `/artista`, `/contacto`, and `/dossier` for SSR content and avoid copy/taxonomy changes.
- [ ] 4.3 Manually inspect mobile/tablet/desktop plus disabled-JS catalog/carousel baseline; record PASS/FAIL/NOT RUN evidence.

## Risks / Notes

- React Doctor advisory warnings remain non-blocking and should be triaged separately or during verify if they are in scope.
- Full browser/device evidence for mobile, tablet, desktop, and disabled-JS behavior remains required in verify/manual QA.
