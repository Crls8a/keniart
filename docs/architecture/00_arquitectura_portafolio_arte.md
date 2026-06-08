# Documento 00 — Arquitectura conceptual y técnica del portafolio de arte

**Proyecto:** Portafolio de arte  
**Objetivo:** crear una web tipo galería digital para mostrar lienzos, vender por consulta y presentar dossier profesional a galerías.  
**Versión:** v0.1  
**Fecha:** 7 de junio de 2026

## 1. Contexto

La página debe sentirse como una sala de exposición digital: elegante, silenciosa, rápida y centrada en la obra. El catálogo público puede mostrar todo el archivo, pero el modo galería/dossier debe mostrar una selección curada de 12–20 piezas.

Este documento define la arquitectura base. El Documento 01 (`docs/architecture/01_sistema_galeria_animaciones_portafolio_arte.md`) extiende esta base con la arquitectura especifica de galeria, animaciones, lightbox, presentacion fullscreen y sala 2D.

## 2. Rutas principales

| Pantalla | Ruta | Objetivo |
|---|---|---|
| Inicio | `/` | Impacto visual, statement y acceso rápido |
| Catálogo | `/obras` | Mostrar todos los lienzos con filtros |
| Detalle | `/obras/[slug]` | Ficha técnica y consulta/reserva |
| Series | `/series` | Agrupar obras por narrativa |
| Detalle de serie | `/series/[slug]` | Profundizar en una colección |
| Para galerías | `/galerias` | Presentación fullscreen curada |
| Dossier | `/dossier` | PDF descargable y press kit |
| Artista | `/artista` | Bio, statement, proceso, CV |
| Contacto | `/contacto` | Formulario, WhatsApp, email y redes |
| Admin futuro | `/admin` | Gestión de obras e inventario |

## 3. Stack recomendado

- **Next.js + React + TypeScript** para rutas, SEO y páginas por obra.
- **Tailwind CSS** para UI rápida y responsive.
- **Motion for React** para animaciones sutiles.
- **React Photo Album** para grid masonry.
- **PhotoSwipe** para lightbox y zoom.
- **Embla Carousel** para modo galería y slides.
- **Cloudinary + next/image** para optimizar imágenes.
- **React Hook Form + Zod** para formularios.
- **Resend** para enviar consultas por email.
- **WhatsApp click-to-chat** para contacto directo.
- **Stripe Checkout/Payment Links** para pagos confirmados en fase 2.
- **JSON/MDX en MVP; Sanity en fase 2** para contenido editable.

## 4. Componentes

```txt
AppShell
HeroArtwork
ArtworkGrid
ArtworkCard
ArtworkDetail
ArtworkLightbox
FilterBar
AvailabilityBadge
InquiryDrawer
SeriesPreview
GalleryMode
DossierDownload
ArtistBio
ShareArtwork
StructuredData
```

## 5. Estructura de carpetas

```txt
src/
  app/
    page.tsx
    obras/page.tsx
    obras/[slug]/page.tsx
    series/page.tsx
    series/[slug]/page.tsx
    galerias/page.tsx
    artista/page.tsx
    contacto/page.tsx
    api/inquiry/route.ts
  components/
    artwork/
    dossier/
    forms/
    layout/
  data/
    artworks.ts
    series.ts
    artist.ts
  lib/
    cloudinary.ts
    seo.ts
    schema.ts
    format.ts
  types/
    artwork.ts
public/
  dossier/dossier-galerias.pdf
```

## 6. Modelo de datos base

```ts
export type ArtworkStatus = "available" | "reserved" | "sold" | "not_for_sale";

export type Artwork = {
  id: string;
  slug: string;
  title: string;
  year: number;
  seriesSlug?: string;
  technique: string;
  support: string;
  dimensions: {
    heightCm: number;
    widthCm: number;
    depthCm?: number;
  };
  price?: {
    amount: number;
    currency: "MXN" | "USD" | "EUR";
    visibility: "public" | "on_request" | "private";
  };
  status: ArtworkStatus;
  images: {
    main: string;
    details?: string[];
    inRoom?: string;
    back?: string;
  };
  description: string;
  tags: string[];
  featured?: boolean;
  dossierSelected?: boolean;
  createdAt: string;
  updatedAt: string;
};
```

## 7. Animaciones clave

- Hero con zoom lento.
- Entrada de página con fade + desplazamiento leve.
- Aparición en cascada del masonry.
- Hover con zoom sutil y overlay de ficha técnica.
- Lightbox con zoom de textura.
- Modo galería fullscreen con fade, flechas, teclado y swipe.
- Scroll reveal para series.
- Soporte para `prefers-reduced-motion`.

## 8. Dossier para galerías

El dossier debe existir en dos formatos: página web interactiva y PDF descargable.

Orden recomendado del PDF:

1. Portada.
2. Artist statement.
3. Bio corta.
4. Bio extendida.
5. Selección de obra, 12–20 piezas.
6. Ficha por obra: título, año, técnica, soporte, medidas, estado.
7. Series o cuerpo de trabajo.
8. CV artístico.
9. Inventario disponible.
10. Contacto, redes y QR.

## 9. MVP obligatorio

- Home editorial.
- Catálogo de obras.
- Detalle de obra.
- Series.
- Modo galería `/galerias`.
- Sobre la artista.
- Contacto + formulario.
- WhatsApp.
- Dossier PDF.
- Estados de disponibilidad.
- Optimización de imágenes.

## 10. Fase 2

- CMS con Sanity.
- Panel de inventario.
- Stripe Checkout o Payment Links.
- Versión bilingüe.
- Analytics.
- Generador automático de dossier PDF.

## 11. Fuentes técnicas

- Next.js Image Optimization: https://nextjs.org/docs/app/getting-started/images
- Motion for React: https://motion.dev/docs/react
- React Photo Album: https://react-photo-album.com/documentation
- Cloudinary Image Optimization: https://cloudinary.com/documentation/image_optimization
- Tailwind CSS: https://tailwindcss.com/
- PhotoSwipe React Gallery: https://photoswipe.com/react-image-gallery/
- Embla Carousel React: https://www.embla-carousel.com/docs/get-started/react
- Lenis: https://lenis.dev/
- Resend with Next.js: https://resend.com/docs/send-with-nextjs
- Stripe Checkout: https://docs.stripe.com/payments/checkout
- WhatsApp click to chat: https://faq.whatsapp.com/5913398998672934
- Sanity + Next.js: https://www.sanity.io/plugins/next-sanity
- Schema.org VisualArtwork: https://schema.org/VisualArtwork
