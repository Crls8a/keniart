# Assets de obras

Esta carpeta guarda los assets públicos optimizados que consume el portafolio.
La fuente de verdad de la galería es `src/data/artworks.ts`: cada obra declara sus
imágenes, variantes responsive, dimensiones de pixel, aspect ratio y orientación.

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
    cartografias-del-alma/   # assets de la serie Cartografías del alma
      desktop|tablet|mobile|thumb/
        slug-de-obra/
          image-01.webp
```

La URL pública de la serie es `/series/pinto-tu-mascota`. La carpeta `lomitos`
queda como detalle interno de implementación para no renombrar assets ya optimizados.

La URL pública de la serie `Cartografías del alma` es
`/series/cartografias-del-alma`. Sus assets viven en
`public/artworks/optimized/cartografias-del-alma/{desktop,tablet,mobile,thumb}/`.
La curaduría vigente de la serie usa carpetas fuente numeradas solo para ordenar
la carga; ese número no debe aparecer en títulos, slugs, textos alternativos ni
rutas públicas. Las imágenes internas de cada carpeta se ordenan por nombre
numérico (`1`, `2`, `3`, etc.) y se publican como `image-01.webp`,
`image-02.webp`, etc. La carpeta fuente `Sobre mi` contiene imágenes de
artista/about y no forma parte del manifiesto de obras ni de esta serie.

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
optimizar las salidas responsive y declarar solo las rutas públicas necesarias.

## Optimizar imágenes localmente

El flujo local usa `scripts/optimize_images.py` con Pillow para convertir fotos pesadas a assets web livianos. Por defecto lee desde `public/artworks/incoming/`, genera WebP en `public/artworks/optimized/`, limita el lado más largo a 2200 px, usa calidad 84, elimina metadata y nunca agranda imágenes chicas.

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

Antes de commitear cambios de imágenes o datos, ejecutar:

```bash
pnpm validate:artworks
```

La validación carga `src/data/artworks.ts` como manifiesto y revisa:

- existencia de `main`, `desktop`, `tablet`, `mobile` y `thumb`;
- rutas bajo `public/artworks/optimized/{serie}/{desktop,tablet,mobile,thumb}/{carpeta}/{archivo}`;
- archivos `.webp` reales;
- dimensiones, aspect ratio y orientación;
- coherencia entre `gallery`, `details` y `detailVariants`.
