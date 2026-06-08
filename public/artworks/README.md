# Assets de obras

Esta carpeta guarda los assets publicos optimizados que consume el portafolio.
La fuente de verdad de la galeria es `src/data/artworks.ts`: cada obra declara sus
imagenes, variantes responsive, dimensiones de pixel, aspect ratio y orientacion.

## Estructura actual

```txt
public/artworks/
  incoming/                  # bandeja temporal de originales; binarios ignorados
  optimized/
    lomitos/                 # carpeta interna de assets para Pinto tu mascota
      desktop/
        Nombre/
          imagen.webp
      tablet/
        Nombre/
          imagen.webp
      mobile/
        Nombre/
          imagen.webp
      thumb/
        Nombre/
          imagen.webp
```

La URL publica de la serie es `/series/pinto-tu-mascota`. La carpeta `lomitos`
queda como detalle interno de implementacion para no renombrar assets ya optimizados.

Una imagen aprobada debe declararse desde `src/data/artworks.ts`, por ejemplo:

```ts
images: {
  main: "/artworks/optimized/lomitos/desktop/Kooper/retrato.webp",
  variants: {
    main: "/artworks/optimized/lomitos/desktop/Kooper/retrato.webp",
    desktop: "/artworks/optimized/lomitos/desktop/Kooper/retrato.webp",
    tablet: "/artworks/optimized/lomitos/tablet/Kooper/retrato.webp",
    mobile: "/artworks/optimized/lomitos/mobile/Kooper/retrato.webp",
    thumb: "/artworks/optimized/lomitos/thumb/Kooper/retrato.webp",
  },
}
```

No subir originales pesados sin revisar. Primero dejarlos en `public/artworks/incoming/`,
optimizar las salidas responsive y declarar solo las rutas publicas necesarias.

## Optimizar imagenes localmente

El flujo local usa `scripts/optimize_images.py` con Pillow para convertir fotos pesadas a assets web livianos. Por defecto lee desde `public/artworks/incoming/`, genera WebP en `public/artworks/optimized/`, limita el lado mas largo a 2200 px, usa calidad 84, elimina metadata y nunca agranda imagenes chicas.

```bash
pnpm optimize:images -- --dry-run
pnpm optimize:images
pnpm optimize:images -- --input public/artworks/incoming/pinto-tu-mascota --output public/artworks/optimized/lomitos/desktop --max-size 1800 --quality 84 --format webp
pnpm optimize:images -- --input public/artworks/incoming/pinto-tu-mascota --output public/artworks/optimized/lomitos/tablet --max-size 1200 --quality 84 --format webp
pnpm optimize:images -- --input public/artworks/incoming/pinto-tu-mascota --output public/artworks/optimized/lomitos/mobile --max-size 800 --quality 84 --format webp
pnpm optimize:images -- --input public/artworks/incoming/pinto-tu-mascota --output public/artworks/optimized/lomitos/thumb --max-size 420 --quality 84 --format webp
```

Formatos de entrada soportados: `.jpg`, `.jpeg`, `.png`, `.webp`, `.tif` y `.tiff`, siempre que Pillow pueda abrirlos. Usar `--overwrite` solo cuando quieras reemplazar una salida existente.

## Validar referencias

Antes de commitear cambios de imagenes o datos, ejecutar:

```bash
pnpm validate:artworks
```

La validacion carga `src/data/artworks.ts` como manifiesto y revisa:

- existencia de `main`, `desktop`, `tablet`, `mobile` y `thumb`;
- rutas bajo `public/artworks/optimized/{serie}/{desktop,tablet,mobile,thumb}/{carpeta}/{archivo}`;
- archivos `.webp` reales;
- dimensiones, aspect ratio y orientacion;
- coherencia entre `gallery`, `details` y `detailVariants`.
