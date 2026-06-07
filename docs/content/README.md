# Flujo de carga de contenido real

Este proyecto todavia usa imagenes demo/provisorias en el catalogo. Las obras reales se preparan en esta carpeta y en `public/artworks/incoming/` antes de reemplazar los datos de la app.

## Donde dejar cada cosa

- Imagenes originales o sin revisar: `public/artworks/incoming/`
- Metadata de obras listas para cargar: `docs/content/obras-pendientes.md`
- Tareas futuras de contenido, fotografia o carga: `docs/content/tareas-pendientes.md`
- Datos que hoy alimentan la app: `src/data/artworks.ts`
- Series que hoy alimentan la app: `src/data/series.ts`
- Datos de artista/contacto que hoy alimentan la app: `src/data/artist.ts`

## Proceso recomendado

1. Dejar las imagenes reales en `public/artworks/incoming/` con nombres claros.
2. Completar una ficha por obra en `docs/content/obras-pendientes.md`.
3. Registrar pendientes o dudas en `docs/content/tareas-pendientes.md`.
4. Revisar derechos y seleccion final de imagenes.
5. Probar la optimizacion con `pnpm optimize:images -- --dry-run`.
6. Generar WebP livianos con `pnpm optimize:images` o ajustar `--max-size`, `--quality`, `--format`, `--input` y `--output` si hace falta.
7. Mover solo los assets aprobados a una ruta publica definitiva, por ejemplo `public/artworks/obras/<slug>/`.
8. Reemplazar las URLs demo en `src/data/artworks.ts` por rutas locales como `/artworks/obras/<slug>/principal.webp`.

## Regla importante

No commitear archivos pesados a ciegas. `public/artworks/incoming/` esta preparado como bandeja temporal y sus binarios quedan ignorados por Git. Cuando una imagen este aprobada y optimizada, se decide explicitamente si entra al repo o si se subira a un servicio externo en una fase posterior.

El optimizador local no reemplaza Cloudinary ni otro servicio externo. Solo prepara assets web provisionales para que el catalogo pueda usar archivos mas livianos cuando se aprueben.
