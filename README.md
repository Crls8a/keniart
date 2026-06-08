# Keniart

Initial MVP for an art portfolio/gallery website based on `docs/architecture/00_arquitectura_portafolio_arte.md` and the gallery/animation extension in `docs/architecture/01_sistema_galeria_animaciones_portafolio_arte.md`.

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
- `/contacto` inquiry placeholder and WhatsApp link
- `/dossier` interactive web dossier with PDF placeholder

## Getting Started

Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Notes

Remote placeholder images are served from Unsplash and allowed in `next.config.ts`. Replace them with production assets, ideally Cloudinary-backed URLs, before launch.

The contact form and dossier PDF are intentionally placeholders for the MVP. The API route at `src/app/api/inquiry/route.ts` is ready to be connected to an email provider.
