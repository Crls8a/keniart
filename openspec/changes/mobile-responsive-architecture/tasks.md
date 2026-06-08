# Tasks: Mobile Responsive Architecture

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | 500-750 |
| 400-line budget risk | High |
| Chained PRs recommended | Yes |
| Suggested split | PR 1 layout/media contract → PR 2 gallery SSR → PR 3 detail carousel + validation |
| Delivery strategy | auto-forecast |
| Chain strategy | feature-branch-chain |

Decision needed before apply: No
Chained PRs recommended: Yes
Chain strategy: feature-branch-chain
400-line budget risk: High

### Suggested Work Units

| Unit | Goal | Likely PR | Notes |
|------|------|-----------|-------|
| 1 | Stable layout/media contracts | PR 1 | base = feature/tracker branch; validates header offsets and image frames |
| 2 | SSR gallery catalogs | PR 2 | base = PR 1 branch; removes Motion ownership from `/obras` and `/galerias` |
| 3 | Detail carousel baseline and evidence | PR 3 | base = PR 2 branch; final route/device verification |

## Phase 1: Layout and media foundation

- [x] 1.1 Create `src/components/artwork/ArtworkMediaFrame.tsx` with server-safe `relative`, sizing, background, overflow, and orientation padding variants.
- [x] 1.2 Update `src/components/artwork/ResponsiveArtworkImage.tsx` comments/types to state the parent sizing contract without changing SSR `<picture>` behavior.
- [x] 1.3 Update `src/components/layout/SiteHeader.tsx` to publish a shared header-height CSS variable/class contract.
- [x] 1.4 Update `src/components/layout/MobileNavigation.tsx` to use the shared offset instead of `top-[65px]`; keep native `<details>` links focusable.
- [x] 1.5 Update `src/components/artwork/ArtworkDetail.tsx` sticky offsets to use the same header contract.

## Phase 2: SSR gallery catalogs

- [ ] 2.1 Convert `src/components/gallery/GalleryExperience.tsx` to a server component: remove `use client`, Motion, hooks, and sort before render.
- [ ] 2.2 Convert `src/components/gallery/GalleryArtworkGrid.tsx` to server card markup with CSS `motion-safe:*` transitions and `ArtworkMediaFrame`.
- [ ] 2.3 Verify `src/app/obras/page.tsx` and `src/app/galerias/page.tsx` pass ordered data and render catalog links/titles/images before hydration.

## Phase 3: Detail carousel baseline

- [ ] 3.1 Convert `src/components/artwork/ArtworkImageGallery.tsx` to server-render scroll-snap figures with ids, anchor thumbnails, and stable `ArtworkMediaFrame` sizing.
- [ ] 3.2 Create `src/components/artwork/ArtworkCarouselControls.tsx` as the only client island for previous/next and smooth-scroll enhancement.
- [ ] 3.3 Verify `src/app/obras/[slug]/page.tsx`, especially `/obras/kooper`, keeps all media reachable without JS controls.

## Phase 4: Route and validation evidence

- [ ] 4.1 Inspect `/`, `/series`, `/series/[slug]`, `/artista`, `/contacto`, and `/dossier` for SSR content and avoid copy/taxonomy changes.
- [ ] 4.2 Run/report `pnpm lint`, `pnpm exec tsc --noEmit`, `pnpm validate:artworks`, `pnpm build`, and `pnpm doctor:react --no-score --no-telemetry --blocking none`.
- [ ] 4.3 Manually inspect mobile/tablet/desktop plus disabled-JS catalog/carousel baseline; record PASS/FAIL/NOT RUN evidence.
