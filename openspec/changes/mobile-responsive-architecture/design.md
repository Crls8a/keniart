# Design: Mobile Responsive Architecture

## Technical Approach

Move responsive behavior to server-rendered markup and Tailwind/CSS contracts. Route pages continue to compose `PageSection`, `PageContainer`, content constants, and static `src/data` collections. The risky gallery path is split so `/obras` and `/galerias` render hero/list/card HTML on the server; JavaScript may only enhance already-visible content. Detail galleries keep native scroll-snap as the baseline and move arrow/thumbnail behavior into a small client island.

No Next.js routing/API changes are planned, so local Next docs are not required by `openspec/config.yaml` for this design.

## Architecture Decisions

| Decision | Choice | Alternatives considered | Rationale |
|---|---|---|---|
| Gallery ownership | Convert `GalleryExperience` and `GalleryArtworkGrid` to server components; sort data before render. | Keep current client Motion tree. | Catalog content must exist before hydration; Motion is not allowed to own first paint. |
| Animation boundary | Prefer CSS `motion-safe:*` transitions for gallery cards; if needed, add a tiny client enhancement that toggles data attributes, not markup ownership. | Wrap cards in `motion.article`. | React Motion wrappers would keep the catalog in a client component. CSS keeps SSR contract simple. |
| Image frames | Create/standardize `ArtworkMediaFrame` around `ResponsiveArtworkImage`. | Keep ad hoc `relative aspect-*` parents. | The image component is `absolute inset-0`; every caller needs SSR-known dimensions. |
| Detail carousel | Server-render scroll-snap figures and anchor thumbnails; client controls only call scroll APIs. | Keep full `ArtworkImageGallery` as client. | Native horizontal scroll works without JS; buttons are progressive enhancement. |
| Header/nav offsets | Use a shared site-header height CSS contract for mobile menu and sticky detail aside. | Keep `top-[65px]` and `lg:top-28`. | One layout token prevents drift across mobile viewport/header changes. |

## Data Flow

```text
src/app pages -> src/data + src/content -> server components -> SSR HTML/CSS
                                      -> optional client islands: form submit, carousel controls
```

Gallery flow: `ObrasPage/GaleriasPage` pass ordered artworks to server `GalleryExperience`; it renders hero + `GalleryArtworkGrid`; each card uses `ArtworkMediaFrame` + `ResponsiveArtworkImage`.

Detail flow: `ArtworkDetail` renders server `ArtworkImageGallery`; native snap/anchor navigation works first; `ArtworkCarouselControls` enhances previous/next and smooth thumbnail jumps after hydration.

## File Changes

| File | Action | Description |
|---|---|---|
| `src/components/artwork/ArtworkMediaFrame.tsx` | Create | Server-safe frame enforcing `relative`, aspect/min-height, background, overflow, and orientation padding. |
| `src/components/artwork/ResponsiveArtworkImage.tsx` | Modify | Document/encode parent contract via props/types if needed; keep `<picture>` server-safe. |
| `src/components/gallery/GalleryExperience.tsx` | Modify | Remove `use client`, Motion imports, hooks; render SSR hero/list structure. |
| `src/components/gallery/GalleryArtworkGrid.tsx` | Modify | Remove `use client` and Motion wrappers; use server card markup plus CSS motion-safe transitions. |
| `src/components/artwork/ArtworkImageGallery.tsx` | Modify | Remove `use client`; render scroll-snap carousel, figure ids, and anchor thumbnails. |
| `src/components/artwork/ArtworkCarouselControls.tsx` | Create | Client-only previous/next and smooth-scroll enhancement for already-rendered carousel. |
| `src/components/layout/SiteHeader.tsx` | Modify | Publish shared header-height contract. |
| `src/components/layout/MobileNavigation.tsx` | Modify | Replace hard-coded `top-[65px]` with shared CSS contract; keep native `<details>`. |
| `src/components/artwork/ArtworkDetail.tsx` | Modify | Use shared sticky offset and server carousel boundary. |
| `src/app/{page,obras,galerias,series,artista,contacto,dossier}/**` | Verify/modify minimally | Ensure main pages compose SSR/CSS primitives without copy or taxonomy changes. |

## Interfaces / Contracts

`ArtworkMediaFrame` contract: every responsive image parent MUST be `relative`, MUST define SSR-known sizing (`aspect-*`, `min-h-*`, or fixed height), SHOULD set dark neutral background, and MAY choose padding by image orientation. Client components MUST NOT be required to reveal catalog/detail imagery.

## Testing Strategy

| Layer | What to Test | Approach |
|---|---|---|
| Static quality | Type/lint regressions | `pnpm lint`, `pnpm exec tsc --noEmit` |
| Data/assets | Responsive image references | `pnpm validate:artworks` |
| Runtime render | Server/client boundary and build | `pnpm build`; inspect emitted behavior manually |
| React/Next debt | Hydration/client ownership concerns | `pnpm doctor:react --no-score --no-telemetry --blocking none` |
| Manual | `/`, `/obras`, `/obras/kooper`, `/series`, `/series/[slug]`, `/galerias`, `/artista`, `/contacto`, `/dossier` at mobile/tablet/desktop | Browser viewport checks; disable JS for catalog/carousel baseline where feasible |

## Migration / Rollout

No data migration required. Use chained slices if tasks forecast over 400 changed lines: (1) layout/media frame contract, (2) gallery SSR split, (3) detail carousel and scoped page validation.

## Open Questions

- [ ] None blocking.
