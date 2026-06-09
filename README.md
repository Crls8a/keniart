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

## Dossier PDF

Generate the downloadable dossier from the live web page:

```bash
pnpm generate:dossier-pdf
```

By default the script reads `http://localhost:3800/dossier` and writes `public/dossier/dossier-galerias.pdf`. Override the source with `DOSSIER_URL` or pass a URL as the first argument.

## Notes

Remote reference images are served from Unsplash and allowed in `next.config.ts`. Replace them with production assets, ideally Cloudinary-backed URLs, before launch.

The contact form prepares a WhatsApp message so conversations continue directly with the studio.
