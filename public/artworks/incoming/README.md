# Bandeja temporal de imagenes

Dejar aca imagenes reales recibidas, sin asumir que ya estan listas para publicar.

Los binarios en esta carpeta estan ignorados por Git para evitar commits pesados accidentales. Para que una imagen pase a produccion:

1. Confirmar que corresponde a una obra cargada en `docs/content/obras-pendientes.md`.
2. Probar la optimizacion con `pnpm optimize:images -- --dry-run`.
3. Optimizar peso, dimensiones y formato con `pnpm optimize:images`.
4. Moverla a una ruta definitiva como `public/artworks/obras/<slug>/`.
5. Actualizar `src/data/artworks.ts` con la ruta local final.
