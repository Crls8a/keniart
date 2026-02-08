# Keniart - Guía para Claude Code

## Arquitectura del Repo

```
keniart/
├── studio/           # Sanity CMS v3 (deployado en Vercel)
│   ├── schemaTypes/  # artwork.ts (main schema)
│   └── sanity.config.ts
└── web/              # Next.js App Router (por crear)
    ├── app/          # Rutas, layouts, pages
    ├── components/   # UI reutilizables
    ├── lib/          # Client sanity, helpers
    └── public/       # Assets estáticos
```

## Comandos

```bash
# Studio
cd studio && npm run dev     # http://localhost:3333
cd studio && npm run build

# Frontend (cuando exista)
cd web && npm run dev        # http://localhost:3000
cd web && npm run build
```

## Reglas de Oro

1. **SEO-first**: Todo contenido debe ser indexable. No usar SELECTores dinámicos que rompan crawlers.
2. **Mobile-first**: Diseña CSS mobile-up. Tailwind breakpoints: `sm: md: lg: xl:`.
3. **Bilingüe ES/EN**: Rutas `/es/...` y `/en/...` con `app/[lang]/`.
4. **Obras únicas**: No hay inventario. Estado = available | reserved | sold.
5. **Fase 1 sin pasarela**: Solo CTA WhatsApp y copy "pago por link".
6. **TypeScript estricto**: No `any`, tipos explícitos en componentes.
7. **Next Image**: Usar `<Image />` de next/image, never `<img>`.
8. **RSC por defecto**: Server Components. Client solo cuando sea necesario (interactividad).

## Convenciones

| Concepto | Convención |
|----------|------------|
| Imágenes Sanity | `urlFor(image).url()` + builder personalizado |
| Queries Sanity | `groq` en `lib/sanity.ts` |
| Slug routes | `app/[lang]/artwork/[slug]/page.tsx` |
| Metadata | `export const metadata` o `generateMetadata` |
| Tailwind | Prefijos semánticos: `artwork-card-`, `gallery-` |

## Campos del Schema Artwork

```ts
{
  title, slug, description, images[],  // SEO
  medium, dimensions, year,            // Ficha técnica
  status: available|reserved|sold,     // Disponibilidad
  priceMxn, showPrice,                 // Precio (ocultable)
  order, publishedAt                   // Orden
}
```

## URLs Importantes

- Studio: https://keniart.vercel.app
- Dataset: `production`
- Project ID: `897c9w6j`

## Stack

- **CMS**: Sanity v3
- **Frontend**: Next.js 15+ App Router
- **Estilos**: Tailwind CSS v4
- **Hosting**: Vercel
