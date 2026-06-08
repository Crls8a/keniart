# Responsive First Render Specification

## Purpose

Defines SSR/CSS-first responsive behavior for Keniart main pages. Client JavaScript MAY enhance motion, controls, and form submission, but MUST NOT be required for primary content, navigation, catalog discovery, or stable media layout.

## Requirements

### Requirement: First-render main page content

The routes `/`, `/obras`, `/obras/[slug]`, `/series`, `/series/[slug]`, `/galerias`, `/artista`, `/contacto`, and `/dossier` MUST render their primary headings, section content, catalog/detail items, and calls to action in the server-rendered document.

#### Scenario: Main content is present before hydration

- GIVEN a target route is requested with JavaScript disabled
- WHEN the first document is rendered
- THEN primary content for that route is visible and readable
- AND the page does not require client hydration to discover core links

### Requirement: No-JS progressive fallback

Interactive enhancements MUST preserve an accessible non-JavaScript baseline. Motion, scroll buttons, carousels, and contact submission MAY enhance the experience, but disabling JavaScript MUST NOT hide catalog content, route links, or readable form information.

#### Scenario: Enhancement unavailable

- GIVEN client JavaScript fails or is disabled
- WHEN the visitor browses a main page
- THEN content, internal navigation, and form contact information remain usable
- AND enhanced controls do not block baseline behavior

### Requirement: Responsive catalog markup

Gallery and artwork catalog pages MUST expose catalog cards, artwork links, titles, and relevant images from SSR markup. Client animation MUST NOT own whether `/obras` or `/galerias` catalog items exist.

#### Scenario: Catalog renders without Motion

- GIVEN Motion code is not hydrated
- WHEN `/obras` or `/galerias` is rendered
- THEN catalog items and links are present in the document
- AND responsive CSS determines layout across mobile, tablet, and desktop widths

### Requirement: Stable responsive images

Artwork image containers MUST provide SSR-known sizing constraints so responsive images do not collapse, overflow, or cause avoidable layout jumps across mixed aspect ratios.

#### Scenario: Mixed artwork ratios remain stable

- GIVEN an artwork detail includes mixed portrait, landscape, or square images
- WHEN the page renders at mobile, tablet, and desktop widths
- THEN each image frame preserves a stable visible area
- AND the `/obras/kooper` detail case does not collapse or crop unpredictably

### Requirement: Mobile navigation stability

The shared shell and header MUST keep mobile navigation reachable, readable, and aligned with sticky-header offsets without relying on viewport-specific hard-coded drift.

#### Scenario: Mobile menu opens from the first render

- GIVEN the viewport is mobile width
- WHEN the visitor opens navigation
- THEN route links are visible, focusable, and not hidden behind the sticky header
- AND closing or resizing the menu does not leave layout overlap

### Requirement: Carousel and detail baseline stability

Artwork detail pages and carousel-like regions MUST expose a scrollable or sequential SSR/CSS baseline. Client controls MAY improve navigation but MUST NOT be the only way to view detail media.

#### Scenario: Detail media remains browsable without controls

- GIVEN client carousel controls are unavailable
- WHEN an artwork detail page renders
- THEN media items remain reachable through the baseline layout
- AND hydration does not reorder content or change the selected item unexpectedly

### Requirement: Validation and evidence

The change MUST report explicit PASS, FAIL, or NOT RUN evidence for linting, type checking, artwork validation, build, React/Next debt review, and manual responsive inspection of target pages.

#### Scenario: Verification evidence is complete

- GIVEN implementation is ready for verification
- WHEN validation is reported
- THEN evidence includes `pnpm lint`, `pnpm exec tsc --noEmit`, `pnpm validate:artworks`, `pnpm build`, and `pnpm doctor:react --no-score --no-telemetry --blocking none`
- AND manual inspection covers mobile, tablet, desktop, and `/obras/kooper`
