# Documento 01 — Sistema de galería y animaciones

**Proyecto:** Portafolio de arte
**Objetivo:** definir la experiencia premium de galería, animaciones, componentes, tecnologías y relación con el dossier.
**Versión:** v0.1
**Fecha:** 7 de junio de 2026

## 1. Objetivo del sistema de galería

Diseñar una experiencia de galería digital para que la obra se pueda explorar, contemplar, presentar y vender por consulta, sin convertir el sitio en una tienda genérica.

La galería debe sentirse como una sala de exposición: silenciosa, elegante, visualmente rica, rápida en móvil y suficientemente impactante para abrirse frente a galeristas, coleccionistas o clientes potenciales.

La solución se divide en cuatro modos: Archivo, Curaduría, Sala y Presentación. Esto permite mostrar todos los lienzos sin perder narrativa artística.

## 2. Principio creativo

La experiencia no debe competir con los lienzos. Las animaciones deben ayudar a mirar mejor: acercar, ordenar, revelar textura, guiar la atención y hacer que cada transición se sienta intencional.

Tono visual recomendado: editorial, cálido, minimalista, con microinteracciones finas. Evitar efectos de partículas, loaders largos, 3D pesado o animaciones que hagan que la obra parezca decoración de una app.

## 3. Modos de experiencia

| Modo | Ruta / lugar | Propósito | Sensación |
| --- | --- | --- | --- |
| Archivo | /obras | Mostrar todos los lienzos con filtros y búsqueda. | Rápido, claro, navegable. |
| Curaduría | /series y bloques destacados | Agrupar obras por series, años, temas o cuerpos de trabajo. | Narrativo, editorial. |
| Sala | Dentro de obra o sección especial | Ver una pieza en pared, escala y contexto. | Galería física simulada. |
| Presentación | /galerias | Modo fullscreen para enseñar una selección curada a galeristas. | Dossier interactivo, elegante y controlado. |

La primera versión debe incluir Archivo, Curaduría básica y Presentación. El modo Sala puede hacerse primero en 2D con CSS y fotos de pared; el 3D puede quedar como fase premium.

## 4. Journey principal de usuario

- Entrada visual: home con una obra hero y statement corto.
- Exploración: catálogo masonry con filtros por serie, tamaño, año y disponibilidad.
- Contemplación: clic en una obra abre vista de detalle con transición compartida.
- Profundización: lightbox con zoom para ver textura y fotos de detalle.
- Contexto: vista en pared o mockup de escala.
- Acción: consultar disponibilidad, reservar, pedir dossier o compartir la obra.
- Galería profesional: modo /galerias con selección curada y navegación tipo presentación.

## 5. Mapa de animaciones

| Zona | Interacción | Animación | Tecnología | Esfuerzo |
| --- | --- | --- | --- | --- |
| Catálogo | Carga inicial | Stagger: tarjetas aparecen en cascada con fade, blur leve y desplazamiento vertical. | Motion | Bajo |
| Catálogo | Cambio de filtro | Reacomodo fluido de tarjetas sin saltos bruscos. | Motion layout + React Photo Album | Medio |
| Tarjeta de obra | Hover / tap | Zoom 3%, overlay con ficha mínima y cursor de exploración. | Motion + CSS | Bajo |
| Tarjeta → detalle | Abrir obra | Shared element: la imagen se expande desde la tarjeta hacia la vista de detalle. | Motion layoutId | Medio |
| Detalle | Scroll de ficha | Parallax sutil entre imagen, texto y detalles de textura. | Motion useScroll / Lenis | Medio |
| Textura | Abrir imagen | Lightbox con zoom, swipe y navegación por detalles. | PhotoSwipe | Bajo |
| Series | Scroll narrativo | Obras entran por bloques con texto que se revela suavemente. | Motion + Intersection Observer | Bajo |
| Modo presentación | Flechas, teclado, swipe | Transiciones fade/slide, contador 03/18, ficha técnica lateral. | Embla Carousel + Motion | Medio |
| Modo sala 2D | Ver en pared | Obra se coloca en una pared virtual con escala aproximada. | CSS transforms + Motion | Medio |
| Modo sala 3D | Recorrido inmersivo | Sala tridimensional navegable o rotación suave. | React Three Fiber | Alto / fase 2 |

## 6. Arquitectura de componentes

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
      GalleryCommandPalette.tsx
    artwork/
      ArtworkTechnicalSheet.tsx
      AvailabilityBadge.tsx
      ArtworkActions.tsx
    motion/
      transitions.ts
      variants.ts
      useReducedMotionSafe.ts
  store/
    gallery-store.ts
  data/
    artworks.ts
    curations.ts
```

La carpeta gallery concentra la experiencia visual. La carpeta artwork concentra piezas reutilizables de ficha técnica, disponibilidad y acciones de venta. La carpeta motion guarda variantes de animación para mantener consistencia.

## 7. Stack técnico compatible

| Necesidad | Tecnología | Uso propuesto | Prioridad |
| --- | --- | --- | --- |
| Rutas, SEO, páginas por obra | Next.js + React + TypeScript | Sitio principal, rutas dinámicas, metadata y carga optimizada. | Obligatoria |
| Grid visual tipo galería | React Photo Album | Masonry para obras con proporciones distintas. | Obligatoria |
| Animaciones UI | Motion for React | Stagger, hover, layout animations, shared transitions y scroll reveal. | Obligatoria |
| Lightbox y zoom | PhotoSwipe | Ver obra en grande, detalles de textura, swipe móvil y zoom. | Obligatoria |
| Presentación fullscreen | Embla Carousel | Slides controlados con flechas, teclado y swipe. | Obligatoria |
| Scroll suave | Lenis | Sensación premium en páginas narrativas y series. | Recomendada |
| Paneles, drawers, dialogs | shadcn/ui + Radix | Ficha lateral, formularios, filtros y componentes accesibles. | Recomendada |
| Estado de galería | Zustand | Modo activo, obra seleccionada, filtros y lightbox. | Recomendada |
| Optimización de imágenes | next/image + Cloudinary | Tamaños responsivos, formatos modernos, blur placeholders. | Obligatoria |
| Animación avanzada | GSAP | Solo si se requiere una escena de scroll muy coreografiada. | Opcional |
| Sala 3D | React Three Fiber | Experiencia inmersiva opcional cargada bajo demanda. | Fase 2 |
| Transiciones nativas | View Transitions API | Mejora progresiva para cambios de vista cuando el navegador lo soporte. | Opcional |

## 8. Diseño de la pantalla /obras

La pantalla de obras debe abrir con una cabecera corta: título, frase curatorial y controles. Después aparece el masonry. En desktop, los filtros pueden estar arriba; en móvil, dentro de un drawer.

- Header editorial: 'Obras' + frase de 1 línea.
- Barra de filtros: Disponibles, Serie, Año, Tamaño, Técnica.
- Toggle de vista: Archivo / Curado / Sala.
- Masonry de tarjetas con carga progresiva.
- CTA fijo discreto: 'Solicitar dossier' o 'Consultar obra'.
- Panel lateral al seleccionar obra: ficha breve + acciones.

Interacción recomendada: el primer clic no necesariamente debe sacar al usuario de /obras. Primero puede abrir un panel lateral elegante. Desde ahí se puede ir al detalle completo si se necesita más información.

## 9. Diseño de tarjeta de obra

Cada tarjeta debe ser limpia y casi silenciosa. La información aparece cuando el usuario muestra intención: hover, focus o tap.

| Estado | Visual | Acción |
| --- | --- | --- |
| Disponible | Badge pequeño color neutro o punto verde muy discreto. | Consultar / reservar. |
| Reservada | Badge ámbar o texto 'Reservada'. | Pedir aviso o consultar obra similar. |
| Vendida | Imagen normal, overlay 'Vendida'. | Consultar comisión o pieza similar. |
| No en venta | Sin precio, texto 'Colección privada' o 'No disponible'. | Solicitar información. |

La tarjeta no debe mostrar precio de forma agresiva. Para arte, conviene que la venta se sienta por conversación, especialmente en etapa de galería.

## 10. Vista de detalle de obra

El detalle debe sentirse como acercarse a la pieza en una sala. Debe abrir con la imagen grande, una ficha técnica clara y acciones de consulta.

- Imagen principal grande con transición desde la tarjeta.
- Ficha técnica: título, año, técnica, soporte, medidas, serie y estado.
- Texto curatorial corto: máximo 80–140 palabras.
- Carrusel de detalles: textura, borde, firma, obra en pared.
- Acciones: consultar disponibilidad, compartir, descargar ficha, ver en pared.
- Obras relacionadas por serie o color.

Animación clave: usar una transición compartida para que la imagen no 'cambie de pantalla', sino que parezca moverse físicamente de la galería al detalle.

## 11. Modo presentación para galerías

La ruta /galerias debe funcionar como un dossier interactivo. Tiene que verse bien en laptop, iPad y proyector. Debe poder operarse con mouse, teclado y swipe.

| Slide | Contenido | Notas |
| --- | --- | --- |
| 01 | Portada: nombre artístico + obra hero + statement corto. | Debe verse fuerte incluso sin explicar nada. |
| 02 | Bio breve y foto de estudio. | Humaniza a la artista. |
| 03–18 | Selección curada de obras. | Cada obra con ficha técnica limpia. |
| 19 | Series o cuerpo de trabajo. | Explica narrativa y evolución. |
| 20 | Obras disponibles e inventario. | Útil para venta y exposición. |
| 21 | Contacto, QR y descarga de PDF. | Cierre accionable. |

No debe mezclar demasiadas obras. La selección para galerías debe ser más fuerte que extensa. El archivo completo queda como respaldo en /obras.

## 12. Modo sala 2D

El modo sala puede crear mucho impacto sin usar 3D. La versión rápida consiste en colocar la obra sobre una pared virtual con escala aproximada, sombra suave y una referencia de mobiliario o figura mínima.

- Fondo: pared marfil o gris cálido.
- Obra centrada con proporción calculada a partir de medidas reales.
- Sombra muy sutil para dar volumen.
- Selector de pared: clara, oscura, galería, sala de casa.
- Texto: 'Escala aproximada: 80 × 100 cm'.
- Botón: 'Consultar esta obra'.

Esta experiencia es suficientemente llamativa para vender y mucho más rápida que construir un entorno 3D completo.

## 13. Modelo de estado de la galería

```ts
export type GalleryMode = "archive" | "curated" | "wall" | "presentation";

export type GalleryState = {
  mode: GalleryMode;
  selectedArtworkId?: string;
  activeSeries?: string;
  filters: {
    status?: "available" | "reserved" | "sold";
    year?: number;
    technique?: string;
    size?: "small" | "medium" | "large";
  };
  sort: "featured" | "newest" | "oldest" | "size";
  lightboxOpen: boolean;
};
```

El estado se puede manejar con Zustand para evitar prop drilling y mantener sincronizados filtros, obra seleccionada, panel lateral, lightbox y modo activo.

## 14. Extensión del modelo Artwork

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

Estos campos ayudan a que la galería no dependa solo de una imagen principal. Permiten saber qué obras merecen animación hero, cuáles tienen textura, cuáles aparecen en dossier y cuáles deben salir primero.

## 15. Reglas de performance

| Riesgo | Regla |
| --- | --- |
| Galería lenta por imágenes pesadas | Usar next/image, Cloudinary, tamaños responsivos y blur placeholder. |
| JavaScript inicial demasiado grande | Cargar PhotoSwipe, presentación y sala 3D solo cuando se usen. |
| Animaciones mareantes | Respetar prefers-reduced-motion y reducir parallax en móvil. |
| Saltos de layout | Guardar width, height y aspectRatio de cada obra en datos. |
| Masonry pesado | Paginar o cargar por bloques si hay muchas obras. |
| 3D en dispositivos débiles | Mantener 3D como fase 2 y con lazy loading. |

La experiencia premium no depende de cargar más cosas; depende de elegir bien cuándo animar y cuándo dejar respirar la imagen.

## 16. Snippets base de animación

Variantes de entrada para tarjetas:

```ts
export const gridContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.055, delayChildren: 0.08 }
  }
};

export const artworkCard = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] }
  }
};
```

Transición compartida tarjeta → detalle:

```tsx
<motion.div layoutId={`artwork-card-${artwork.id}`}>
  <Image src={artwork.images.main} alt={artwork.title} fill />
</motion.div>

// En el detalle:
<motion.div layoutId={`artwork-card-${artwork.id}`}>
  <Image src={artwork.images.main} alt={artwork.title} fill priority />
</motion.div>
```

Render custom de tarjeta dentro de MasonryPhotoAlbum:

```tsx
<MasonryPhotoAlbum
  photos={photos}
  columns={(containerWidth) => containerWidth < 640 ? 1 : 3}
  render={{
    photo: ({ photo }) => (
      <ArtworkCardMotion artwork={photo.artwork} />
    )
  }}
/>
```

## 17. Fases de implementación

| Fase | Resultado | Incluye |
| --- | --- | --- |
| Fase 1 | Galería premium inicial | Masonry, filtros, hover, panel de obra, lightbox, consulta. |
| Fase 2 | Presentación para galerías | Slides fullscreen, teclado, selección curada, QR, PDF. |
| Fase 3 | Modo sala 2D | Obra en pared, escala, ambientes, CTA. |
| Fase 4 | Microinteracciones avanzadas | Command palette, transiciones nativas, scroll narrativo. |
| Fase 5 | Experiencia 3D opcional | React Three Fiber, sala virtual, lazy loading. |

Para avanzar rápido, la Fase 1 y Fase 2 son las más importantes. Con eso ya se puede mostrar el trabajo a galerías de manera profesional.

## 18. Integración con dossier

El dossier debe alimentarse de la misma data que la galería. Cada obra puede tener un campo dossierSelected y dossierOrder para controlar si aparece en la presentación y en el PDF.

- En /obras se muestra el archivo completo.
- En /galerias se muestra solo la selección curada.
- En /dossier se descarga el PDF profesional.
- Cada obra tiene ficha técnica, imagen principal y estado de disponibilidad.
- El PDF y la web deben compartir el mismo orden curatorial.

Esto evita mantener dos inventarios separados y reduce errores cuando una pieza se venda, se reserve o cambie de disponibilidad.

## 19. Checklist de aceptación

- [ ] El catálogo carga rápido en móvil.
- [ ] Las obras se ven grandes y nítidas sin romper layout.
- [ ] Los filtros no generan saltos bruscos.
- [ ] Cada obra disponible tiene CTA claro de consulta.
- [ ] Las obras vendidas siguen generando interés: obra similar o comisión.
- [ ] El lightbox permite ver textura y detalle.
- [ ] El modo /galerias funciona con teclado y pantalla completa.
- [ ] El sitio respeta prefers-reduced-motion.
- [ ] Las imágenes tienen alt text útil.
- [ ] La experiencia no depende de 3D para sentirse premium.

## 20. Decisión recomendada

Construir primero una galería premium 2D con Motion, React Photo Album, PhotoSwipe, Embla y next/image. Esto da una experiencia fuerte, rápida y elegante con complejidad controlada.

Dejar React Three Fiber y GSAP como capa opcional. No son necesarios para la primera versión; pueden usarse después si se quiere una sala 3D o una narrativa de scroll muy coreografiada.

La experiencia ganadora para este proyecto es: catálogo vivo + detalle contemplativo + lightbox de textura + presentación curada para galerías + modo sala 2D.

## 21. Fuentes técnicas consultadas

- Next.js Image Optimization — https://nextjs.org/docs/app/getting-started/images
- Motion for React — https://motion.dev/docs/react
- Motion layout animations — https://motion.dev/docs/react-layout-animations
- React Photo Album Masonry — https://react-photo-album.com/examples/masonry
- PhotoSwipe React Gallery — https://photoswipe.com/react-image-gallery/
- PhotoSwipe Getting Started — https://photoswipe.com/getting-started/
- Lenis — https://lenis.dev/
- shadcn/ui Drawer/Dialog — https://ui.shadcn.com/docs/components/radix/drawer
- Zustand — https://zustand.docs.pmnd.rs/
- GSAP — https://gsap.com/
- React Three Fiber — https://r3f.docs.pmnd.rs/
- View Transition API — https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API
- Next.js Lazy Loading — https://nextjs.org/docs/app/guides/lazy-loading
