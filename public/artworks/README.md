# Assets de obras

Esta carpeta queda reservada para imagenes reales de obras.

## Estructura sugerida

```txt
public/artworks/
  incoming/              # bandeja temporal, ignorada para binarios
  optimized/             # salida provisoria del optimizador local
  obras/
    slug-de-la-obra/
      principal.webp
      detalle-01.webp
      ambiente.webp
```

La app todavia usa imagenes demo externas declaradas en `src/data/artworks.ts`. Cuando una imagen real este aprobada, reemplazar la URL demo por una ruta publica local, por ejemplo:

```ts
images: {
  main: "/artworks/obras/slug-de-la-obra/principal.webp",
}
```

No subir originales pesados sin revisar. Primero dejarlos en `public/artworks/incoming/` y completar la ficha en `docs/content/obras-pendientes.md`.

## Optimizar imagenes localmente

El flujo local usa `scripts/optimize_images.py` con Pillow para convertir fotos pesadas a assets web livianos. Por defecto lee desde `public/artworks/incoming/`, genera WebP en `public/artworks/optimized/`, limita el lado mas largo a 2200 px, usa calidad 84, elimina metadata y nunca agranda imagenes chicas.

```bash
pnpm optimize:images -- --dry-run
pnpm optimize:images
pnpm optimize:images -- --input public/artworks/incoming --output public/artworks/obras/slug-de-la-obra --max-size 2200 --quality 84 --format webp
```

Formatos de entrada soportados: `.jpg`, `.jpeg`, `.png`, `.webp`, `.tif` y `.tiff`, siempre que Pillow pueda abrirlos. Usar `--overwrite` solo cuando quieras reemplazar una salida existente.

Cuando una imagen optimizada quede aprobada, moverla desde `public/artworks/optimized/` a la estructura final `public/artworks/obras/<slug>/` y recien entonces actualizar `src/data/artworks.ts`.
