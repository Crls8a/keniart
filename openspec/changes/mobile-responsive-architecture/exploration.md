## Exploration: mobile-responsive-architecture

### Current State
Keniart uses Next.js App Router with mostly server-rendered route pages and Tailwind CSS responsive classes. The shared shell (`AppShell`, `SiteHeader`, `PageContainer`, `PageSection`) already provides a CSS-first layout base, and the mobile menu is currently a native `<details>` disclosure rather than JS state.

The highest-risk area is gallery rendering. `/obras` and `/galerias` mount `GalleryExperience` as a client component because it imports Motion and `useReducedMotionSafe`; `GalleryArtworkGrid` is also client-only. Recent code sets Motion `initial={false}`, which helps keep content visible before hydration, but the catalog architecture still couples first-render content to client bundles for animation only. Detail pages use `ArtworkImageGallery` as a client component for scroll buttons, but the underlying carousel is already CSS-native horizontal scroll with snap.

Images use `ResponsiveArtworkImage`, a server-safe `<picture>` abstraction with mobile/tablet/desktop sources. It is positioned `absolute inset-0`, so every consumer must provide a stable `relative` parent with an SSR-known aspect ratio/min-height. Kooper has many mixed portrait/square/landscape detail images, making `/obras/kooper` the best stress case for carousel height, sticky detail layout, and header overlap.

### Affected Areas
- `src/components/layout/SiteHeader.tsx` — shared sticky header and desktop/mobile navigation boundary.
- `src/components/layout/MobileNavigation.tsx` — native disclosure works without hydration, but uses fixed positioning/top offset and may need route-close/progressive enhancement later.
- `src/components/layout/AppShell.tsx` — global shell contains sticky header, footer, and floating WhatsApp CTA; viewport/fixed stacking affects every page.
- `src/components/layout/PageContainer.tsx` and `src/components/layout/PageSection.tsx` — shared responsive spacing primitives across all scoped pages.
- `src/components/gallery/GalleryExperience.tsx` — `/obras` and `/galerias` first-render catalog path is currently client-owned mainly for animation/reduced-motion sorting.
- `src/components/gallery/GalleryArtworkGrid.tsx` — grid markup is client-owned only for Motion variants; this is the likely failure boundary for empty catalog before/around hydration.
- `src/components/artwork/ArtworkImageGallery.tsx` — native scroll-snap carousel plus JS buttons; needs stable SSR layout for mixed Kooper image ratios.
- `src/components/artwork/ResponsiveArtworkImage.tsx` — central responsive image primitive; safe if parent dimensions are stable, risky if used without `relative` + aspect/min-height.
- `src/components/artwork/ArtworkGrid.tsx`, `ArtworkCard.tsx`, `HeroArtwork.tsx` — reused on `/`, `/series/[slug]`, `/dossier`; establish current card/hero responsive image patterns.
- `src/components/series/SeriesGrid.tsx`, `SeriesHero.tsx`, `src/components/artist/ArtistBio.tsx`, `src/components/forms/InquiryForm.tsx` — page-specific responsive sections that should remain SSR/CSS-first, with JS only for form submit.
- `src/app/page.tsx`, `src/app/obras/page.tsx`, `src/app/obras/[slug]/page.tsx`, `src/app/series/page.tsx`, `src/app/series/[slug]/page.tsx`, `src/app/galerias/page.tsx`, `src/app/artista/page.tsx`, `src/app/contacto/page.tsx`, `src/app/dossier/page.tsx` — main pages in user-confirmed scope.

### Approaches
1. **SSR/CSS-first decomposition** — Split gallery and carousel into server-rendered structural components plus small client enhancement islands for Motion and scroll controls.
   - Pros: Guarantees content exists from first render; directly matches the architectural rule; reduces hydration blast radius; keeps native interactions as fallback.
   - Cons: Requires component boundaries to be redrawn; Motion wrappers may need to become optional/enhancement-only; slightly more files.
   - Effort: Medium

2. **Patch current client components** — Keep `GalleryExperience`, `GalleryArtworkGrid`, and `ArtworkImageGallery` as client components and harden classes/initial states.
   - Pros: Smallest diff; likely under the 400-line budget; quick mitigation for specific Samsung Chrome symptoms.
   - Cons: Does not fully satisfy SSR/CSS base rule; future animation or hydration regressions can make `/obras` appear empty again; harder to reason about first render.
   - Effort: Low

3. **Shared responsive layout primitives** — Add explicit reusable primitives for page hero, responsive media frame, and scroll-snap gallery, then migrate main pages to them.
   - Pros: Strong long-term architecture across all scoped pages; centralizes viewport/header/image rules.
   - Cons: Higher review size risk; broad page churn; should be chained if chosen as full migration.
   - Effort: High

### Recommendation
Use Approach 1 as the proposal baseline, with a narrow slice of Approach 3 only where it reduces duplication: introduce/standardize a CSS-first media frame contract and split gallery display into server markup plus client enhancement. The SSR/CSS boundary should be: route pages, page sections, card grids, hero/catalog markup, image frames, and scroll-snap carousel are server/CSS base; Motion animation, reduced-motion detection, carousel arrow buttons, and WhatsApp form submit are client progressive enhancement only.

Implementation should be sliced to stay within the 400-line review budget: first harden shared layout/header/media frame contracts, then migrate gallery listing (`/obras`, `/galerias`), then validate detail carousel (`/obras/kooper`) and remaining main pages. If the task plan includes all page migrations plus new primitives, forecast medium-to-high budget risk and recommend chained PRs.

### Risks
- Motion/client ownership of catalog markup is the main architectural mismatch with “page must adapt from first render”; leaving it intact risks recurring empty `/obras` reports.
- `ResponsiveArtworkImage` depends on each caller supplying stable parent dimensions; any missing `relative`/aspect/min-height parent can collapse or desync images.
- `MobileNavigation` uses a hard-coded `top-[65px]` under a sticky header; header height changes or mobile browser viewport chrome can misalign the overlay.
- Kooper’s mixed image ratios can reveal carousel height/layout jumps even when the first image is stable.
- No test runner exists; verification must rely on lint, typecheck, artwork validation, build, and targeted manual/mobile viewport checks.

### Ready for Proposal
Yes — propose an SSR/CSS-first responsive architecture change for all main pages, with client JavaScript limited to progressive enhancement islands. Tell the user the safest path is not another one-off Samsung Chrome patch: it is cutting the gallery/header/media boundaries so mobile layout is correct before hydration.
