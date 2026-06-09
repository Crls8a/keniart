# Documento 01 - Sistema de galeria y animaciones

**Proyecto:** Portafolio de arte
**Objetivo:** extender la arquitectura base con la experiencia premium de galeria, animaciones, presentacion y sala 2D.
**Estado:** referencia arquitectonica para implementacion
**Fuente archivada:** `docs/archive/01_sistema_galeria_animaciones_portafolio_arte.raw.md`
**Fecha:** 7 de junio de 2026

## 1. Decision arquitectonica

Construir primero una galeria premium 2D con `next/image`, Motion for React, React Photo Album, PhotoSwipe y Embla Carousel. Esta combinacion cubre catalogo, detalle contemplativo, zoom de textura, presentacion curada y modo sala 2D con complejidad controlada.

React Three Fiber y GSAP quedan fuera del alcance inicial. Solo deben entrar como capa opcional cuando haya una necesidad concreta de sala 3D o narrativa de scroll altamente coreografiada.

## 2. Principios de experiencia

La experiencia no debe competir con los lienzos. Las animaciones deben ayudar a mirar mejor: acercar, ordenar, revelar textura, guiar la atencion y hacer que cada transicion se sienta intencional.

| Principio | Regla de implementacion |
| --- | --- |
| Obra primero | Evitar particulas, loaders largos, 3D pesado o efectos que conviertan la obra en decoracion de app. |
| Movimiento silencioso | Usar fade, desplazamiento leve, zoom sutil y transiciones compartidas. |
| Venta por conversacion | Mostrar disponibilidad y CTAs de consulta sin convertir el catalogo en una tienda generica. |
| Performance visible | Lazy-load de lightbox, presentacion y experiencias no iniciales. |
| Accesibilidad de movimiento | Respetar `prefers-reduced-motion` y reducir parallax en movil. |

## 3. Modos de experiencia

| Modo | Ruta / lugar | Proposito | Alcance inicial |
| --- | --- | --- | --- |
| Archivo | `/obras` | Mostrar todos los lienzos con filtros, busqueda y preview. | Obligatorio |
| Curaduria | `/series` y bloques destacados | Agrupar obras por serie, anio, tema o cuerpo de trabajo. | Basico |
| Sala | Detalle de obra o seccion especial | Ver una pieza en pared, escala y contexto. | 2D primero |
| Presentacion | `/galerias` | Dossier interactivo fullscreen para galeristas. | Obligatorio |

La primera versión debe priorizar Archivo, Curaduria basica y Presentacion. Sala empieza como 2D con CSS, medidas reales y fondos de pared; la sala 3D queda como fase premium.

## 4. Journey principal

1. Entrada visual: home con obra hero y statement corto.
2. Exploracion: catalogo masonry con filtros por serie, tamanio, anio y disponibilidad.
3. Contemplacion: seleccionar una obra abre preview lateral o detalle con transicion compartida.
4. Profundizacion: lightbox con zoom para textura, bordes, firma y fotos de detalle.
5. Contexto: vista en pared o mockup de escala.
6. Accion: consultar disponibilidad, reservar, pedir dossier o compartir la obra.
7. Galeria profesional: `/galerias` presenta una seleccion curada con navegacion tipo presentacion.

## 5. Arquitectura de rutas y componentes

La arquitectura base del Documento 00 se mantiene. Esta extension agrega componentes especializados para la experiencia de galeria.

```txt
src/
  app/
    obras/page.tsx
    obras/[slug]/page.tsx
    galerias/page.tsx
  components/
    gallery/
      GalleryExperience.tsx
      GalleryToolbar.tsx
      AnimatedArtworkGrid.tsx
      ArtworkCardMotion.tsx
      ArtworkPreviewSheet.tsx
      ArtworkLightbox.tsx
      GalleryModeSwitch.tsx
      WallPreview2D.tsx
      CuratedTrail.tsx
      GalleryPresentation.tsx
    artwork/
      ArtworkTechnicalSheet.tsx
      AvailabilityBadge.tsx
      ArtworkActions.tsx
    motion/
      transitions.ts
      variants.ts
      useReducedMotionSafe.ts
  data/
    artworks.ts
    curations.ts
  types/
    artwork.ts
```

`components/gallery` concentra la experiencia visual. `components/artwork` conserva piezas reutilizables de ficha tecnica, disponibilidad y acciones. `components/motion` centraliza variantes para evitar animaciones inconsistentes.

## 6. Mapa de animaciones

| Zona | Interaccion | Animacion | Tecnologia | Prioridad |
| --- | --- | --- | --- | --- |
| Catalogo | Carga inicial | Stagger con fade, blur leve y desplazamiento vertical. | Motion | Inicial |
| Catalogo | Cambio de filtro | Reacomodo fluido sin saltos bruscos. | Motion layout + React Photo Album | Inicial |
| Tarjeta | Hover / tap | Zoom 3%, overlay minimo y foco claro. | Motion + CSS | Inicial |
| Tarjeta a detalle | Abrir obra | Shared element desde tarjeta hacia detalle. | Motion `layoutId` | Inicial |
| Detalle | Scroll de ficha | Parallax sutil entre imagen, texto y textura. | Motion `useScroll` / Lenis | Recomendado |
| Textura | Abrir imagen | Lightbox con zoom, swipe y navegacion. | PhotoSwipe | Inicial |
| Series | Scroll narrativo | Bloques con reveal suave. | Motion + Intersection Observer | Recomendado |
| Presentacion | Flechas, teclado, swipe | Fade/slide, contador y ficha lateral. | Embla + Motion | Inicial |
| Sala 2D | Ver en pared | Obra en pared virtual con escala aproximada. | CSS transforms + Motion | Fase 2 cercana |
| Sala 3D | Recorrido inmersivo | Sala tridimensional bajo demanda. | React Three Fiber | Fase premium |

## 7. Datos y metadata de obra

El modelo `Artwork` del Documento 00 debe extenderse con metadata de experiencia para no depender solo de una imagen principal.

```ts
export type ArtworkExperience = {
  heroCrop?: "portrait" | "landscape" | "square";
  dominantColor?: string;
  textureImages?: string[];
  wallPreviewImage?: string;
  roomScale?: {
    wallWidthCm: number;
    artworkHeightCm: number;
    artworkWidthCm: number;
  };
  animationPriority?: "hero" | "featured" | "normal";
  galleryNotes?: string;
  dossierOrder?: number;
};
```

Estos campos definen que obras merecen tratamiento hero, cuales tienen textura, cuales aparecen en dossier, como se ordenan y como se escalan en sala 2D.

## 8. Estado de galeria

El estado puede vivir en un store dedicado cuando la experiencia necesite sincronizar filtros, seleccion, panel lateral, lightbox y modo activo. Si una pantalla simple no necesita estado compartido, mantener estado local es preferible.

```ts
export type GalleryMode = "archive" | "curated" | "wall" | "presentation";

export type GalleryState = {
  mode: GalleryMode;
  selectedArtworkId?: string;
  activeSeries?: string;
  filters: {
    status?: "available" | "reserved" | "sold" | "not_for_sale";
    year?: number;
    technique?: string;
    size?: "small" | "medium" | "large";
  };
  sort: "featured" | "newest" | "oldest" | "size";
  lightboxOpen: boolean;
};
```

## 9. Pantalla `/obras`

La pantalla debe abrir con cabecera editorial corta, controles claros y un masonry que preserve proporciones. En desktop los filtros pueden estar arriba; en movil deben entrar en drawer o panel compacto.

| Area | Decision |
| --- | --- |
| Header | Titulo `Obras` y frase curatorial de una linea. |
| Filtros | Disponibilidad, serie, anio, tamanio y tecnica. |
| Vista | Toggle Archivo / Curado / Sala si el alcance lo justifica. |
| Grid | Masonry con carga progresiva y dimensiones conocidas. |
| Preview | Primer clic puede abrir panel lateral antes de navegar al detalle. |
| CTA | `Solicitar dossier` o `Consultar obra`, discreto y persistente. |

## 10. Tarjeta y detalle de obra

Cada tarjeta debe ser limpia y casi silenciosa. La informacion aparece cuando el usuario muestra intencion: hover, focus o tap.

| Estado | Visual | Accion |
| --- | --- | --- |
| Disponible | Badge pequeno o punto neutro. | Consultar / reservar. |
| Reservada | Badge ambar o texto `Reservada`. | Pedir aviso o consultar obra similar. |
| Vendida | Imagen normal con overlay `Vendida`. | Consultar comision o pieza similar. |
| No en venta | Sin precio visible. | Solicitar informacion. |

El detalle debe sentirse como acercarse a la pieza: imagen grande, ficha tecnica, texto curatorial breve, carrusel de detalles, acciones de consulta y obras relacionadas por serie o color.

## 11. Modo presentacion `/galerias`

`/galerias` funciona como dossier interactivo. Debe verse bien en laptop, iPad y proyector, y debe operarse con mouse, teclado y swipe.

| Slide | Contenido |
| --- | --- |
| 01 | Portada con nombre artistico, obra hero y statement corto. |
| 02 | Bio breve y foto de estudio. |
| 03-18 | Seleccion curada de obras con ficha tecnica limpia. |
| 19 | Series o cuerpo de trabajo. |
| 20 | Obras disponibles e inventario. |
| 21 | Contacto, QR y descarga de PDF. |

La seleccion para galerias debe ser mas fuerte que extensa. El archivo completo queda como respaldo en `/obras`.

## 12. Modo sala 2D

La sala 2D debe generar impacto sin introducir 3D. La obra se coloca sobre una pared virtual con escala aproximada, sombra suave y una referencia minima de espacio.

| Elemento | Regla |
| --- | --- |
| Fondo | Pared marfil, gris calido, galeria o sala de casa. |
| Escala | Calcular proporcion con medidas reales de la obra. |
| Volumen | Sombra muy sutil, sin dramatizar. |
| Texto | Mostrar escala aproximada, por ejemplo `80 x 100 cm`. |
| Accion | CTA directo para consultar esa obra. |

## 13. Performance y accesibilidad

| Riesgo | Regla |
| --- | --- |
| Imagenes pesadas | Usar `next/image`, Cloudinary, tamanios responsivos y blur placeholders. |
| JavaScript inicial alto | Cargar PhotoSwipe, presentacion y sala solo cuando se usen. |
| Animaciones mareantes | Respetar `prefers-reduced-motion`; reducir parallax en movil. |
| Saltos de layout | Guardar `width`, `height` y `aspectRatio` de cada obra. |
| Masonry pesado | Paginar o cargar por bloques si hay muchas obras. |
| 3D en dispositivos debiles | Mantener 3D como fase premium con lazy loading. |

La experiencia premium no depende de cargar mas cosas; depende de elegir bien cuando animar y cuando dejar respirar la imagen.

## 14. Integracion con dossier

La galeria y el dossier deben alimentarse de la misma data. Cada obra puede usar `dossierSelected` y `dossierOrder` para controlar si aparece en la presentacion web y en el PDF.

| Superficie | Uso |
| --- | --- |
| `/obras` | Archivo completo. |
| `/galerias` | Seleccion curada. |
| `/dossier` | PDF profesional y press kit. |
| Datos de obra | Ficha tecnica, imagen principal, textura y estado de disponibilidad. |

Esto evita mantener dos inventarios separados y reduce errores cuando una pieza cambia de disponibilidad.

## 15. Fases de implementacion

| Fase | Resultado | Incluye |
| --- | --- | --- |
| 1 | Galeria premium inicial | Masonry, filtros, hover, panel de obra, lightbox y consulta. |
| 2 | Presentacion para galerias | Slides fullscreen, teclado, seleccion curada, QR y PDF. |
| 3 | Modo sala 2D | Obra en pared, escala, ambientes y CTA. |
| 4 | Microinteracciones avanzadas | Command palette, transiciones nativas y scroll narrativo. |
| 5 | Experiencia 3D opcional | React Three Fiber, sala virtual y lazy loading. |

## 16. Tracking de implementacion

| Issue | Alcance |
| --- | --- |
| ACE-105 | Base de experiencia de galeria: rutas, estructura y comportamiento editorial. |
| ACE-106 | Modelo de obra y metadata de galeria/dossier. |
| ACE-107 | Modo presentacion fullscreen para `/galerias`. |
| ACE-108 | Lightbox PhotoSwipe para zoom, swipe y textura. |
| ACE-109 | Sistema compartido de Motion y `prefers-reduced-motion`. |
| ACE-110 | Preview 2D en pared con escala aproximada. |
| ACE-111 | Archivo masonry, filtros y panel de preview. |

## 17. Checklist de aceptacion

- [ ] El catalogo carga rapido en movil.
- [ ] Las obras se ven grandes y nitidas sin romper layout.
- [ ] Los filtros no generan saltos bruscos.
- [ ] Cada obra disponible tiene CTA claro de consulta.
- [ ] Las obras vendidas siguen generando interes: obra similar o comision.
- [ ] El lightbox permite ver textura y detalle.
- [ ] `/galerias` funciona con teclado y pantalla completa.
- [ ] El sitio respeta `prefers-reduced-motion`.
- [ ] Las imagenes tienen alt text util.
- [ ] La experiencia no depende de 3D para sentirse premium.

## 18. Fuentes tecnicas

- Next.js Image Optimization: https://nextjs.org/docs/app/getting-started/images
- Motion for React: https://motion.dev/docs/react
- Motion layout animations: https://motion.dev/docs/react-layout-animations
- React Photo Album Masonry: https://react-photo-album.com/examples/masonry
- PhotoSwipe React Gallery: https://photoswipe.com/react-image-gallery/
- PhotoSwipe Getting Started: https://photoswipe.com/getting-started/
- Lenis: https://lenis.dev/
- shadcn/ui Drawer/Dialog: https://ui.shadcn.com/docs/components/radix/drawer
- Zustand: https://zustand.docs.pmnd.rs/
- React Three Fiber: https://r3f.docs.pmnd.rs/
- View Transition API: https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API
- Next.js Lazy Loading: https://nextjs.org/docs/app/guides/lazy-loading
