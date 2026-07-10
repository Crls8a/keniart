# Keniart

Art portfolio/gallery website based on `docs/architecture/00_arquitectura_portafolio_arte.md` and the gallery/animation extension in `docs/architecture/01_sistema_galeria_animaciones_portafolio_arte.md`.

## Stack

- Next.js App Router
- React + TypeScript
- Tailwind CSS
- Local JSON-style sample data under `src/data`

## Routes

- `/` editorial home
- `/obras` artwork catalog
- `/obras/[slug]` artwork detail
- `/series` series index
- `/series/[slug]` series detail
- `/galerias` fullscreen gallery mode
- `/artista` artist bio and statement
- `/contacto` WhatsApp-only inquiry flow and Instagram reference link
- `/dossier` interactive web dossier with downloadable PDF

## Getting Started

Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3800](http://localhost:3800) with your browser to see the result.

## Production URL

Set `NEXT_PUBLIC_SITE_URL` to the canonical HTTPS origin before every production build:

```bash
NEXT_PUBLIC_SITE_URL=https://your-production-domain.example pnpm build
```

`VERCEL_PROJECT_PRODUCTION_URL` is used only when `NEXT_PUBLIC_SITE_URL` is absent. Preview/deployment URLs from `VERCEL_URL` are never canonical fallbacks. Localhost is development-only; a production build fails when neither approved variable is available. Canonicals, Open Graph URLs, structured data, `robots.txt`, and `sitemap.xml` all use this origin.

## Conversion events

The site records these neutral first-party events in the browser's in-memory `window.dataLayer`:

- `lead_whatsapp_click` for `wa.me` links
- `instagram_click` for Instagram links
- `dossier_download` for the dossier PDF

Each event contains only `page_path`, `link_host`, `link_path`, and a safe context label. URL query strings, WhatsApp message text or phone numbers, form values, and other personal data are not included. The tracker does not load a vendor script, create cookies or local storage, or transmit events by itself.

Before connecting GA4, GTM, or another vendor, configure a CMP, the required Consent Mode behavior, and real production property/container IDs. Do not add placeholder or unrelated IDs.

## Dossier PDF

Generate the downloadable dossier from the live web page:

```bash
pnpm generate:dossier-pdf
```

By default the script reads `http://localhost:3800/dossier` and writes `public/dossier/dossier-galerias.pdf`. Override the source with `DOSSIER_URL` or pass a URL as the first argument. When the source is local, set `NEXT_PUBLIC_SITE_URL` or `DOSSIER_LINK_ORIGIN` to the public origin so every internal PDF link targets production. Generation fails if any image is missing or the final link origin is local.

## Notes

Remote reference images are served from Unsplash and allowed in `next.config.ts`. Replace them with production assets, ideally Cloudinary-backed URLs, before launch.

The contact form prepares a WhatsApp message so conversations continue directly with the studio.
