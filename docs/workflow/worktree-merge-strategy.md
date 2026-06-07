# Estrategia de worktrees y merge para Keniart

Este proyecto usa `main` como base estable local. Cada tarea de Linear debe trabajarse en una rama aislada y, cuando convenga avanzar en paralelo, en un worktree separado.

## Carpeta de worktrees

Usar una carpeta hermana del repo principal:

```bash
C:\Users\SPARTAN_PC\Documents\greedy\desarollo\keniart-worktrees\
```

Ejemplo para una tarea:

```bash
git worktree add -b ace-101/seo-metadata ../keniart-worktrees/ace-101-seo-metadata main
```

## pnpm en worktrees

Cada worktree necesita ejecutar `pnpm install` al menos una vez para crear su propio `node_modules` local. Eso no significa duplicar todo el peso de dependencias: pnpm comparte el store global y reutiliza paquetes mediante enlaces, pero cada checkout aislado necesita sus enlaces locales para que comandos como `pnpm lint`, `pnpm build` y `pnpm doctor:react` funcionen.

Comando recomendado después de crear un worktree:

```bash
pnpm install
```

## Convención de ramas

- `ace-<número>/<tema-corto>` para tareas de Linear.
- `techdebt/<tema>` para auditorías internas sin issue todavía.
- `integration/<fecha-o-scope>` solo si hay que probar varias ramas juntas antes de volver a `main`.

Ejemplos:

```txt
ace-94/real-artwork-inventory
ace-91/production-artwork-images
ace-92/inquiry-form-email
techdebt/react-doctor-a11y
```

## Qué puede ir en paralelo

Estas líneas de trabajo pueden avanzar en paralelo si no editan los mismos archivos:

- SEO/metadatos: `src/app/layout.tsx`, `src/lib/seo.ts`, `src/lib/schema.ts`.
- Accesibilidad visual: componentes en `src/components/artwork/` y `src/components/forms/`.
- Formulario de consulta: `src/components/forms/InquiryForm.tsx`, `src/app/api/inquiry/route.ts`.
- Documentación/deploy: `README.md`, `docs/**`.

## Qué debe ser secuencial

No mezclar en paralelo sin coordinación:

- Inventario real e imágenes: `src/data/artworks.ts`, `src/data/series.ts`, `public/artworks/**`.
- Cambios de dependencias: `package.json`, `pnpm-lock.yaml`.
- Configuración global: `next.config.ts`, `opencode.json`, `.opencode/**`.

## Gate de integración

Antes de integrar una rama:

```bash
pnpm lint
pnpm build
pnpm run doctor --no-score --no-telemetry --blocking none
pnpm doctor:react --no-score --no-telemetry --blocking none
git diff --stat main...HEAD
```

Desde `main`, revisar el merge antes de hacerlo:

```bash
git merge-tree main <rama>
```

Si el resultado es razonable, integrar una rama por vez:

```bash
git merge --no-ff <rama>
pnpm lint
pnpm build
pnpm run doctor --no-score --no-telemetry --blocking none
pnpm doctor:react --no-score --no-telemetry --blocking none
```

## Regla de deuda técnica

Cada rama debe cerrar con evidencia mínima:

- Qué cambió.
- Qué validación pasó.
- Qué riesgo queda.
- Cómo revertir si algo falla.

Si una rama supera unas 400 líneas cambiadas, dividirla antes de mezclarla. La meta es que cada revisión tenga una intención clara, no un paquete gigante imposible de auditar.

## React Doctor

El proyecto expone React Doctor con:

```bash
pnpm run doctor --no-score --no-telemetry --blocking none
pnpm doctor:react --no-score --no-telemetry --blocking none
```

Versión validada:

- `react-doctor@0.4.2`
- Node requerido por la herramienta: `^20.19.0 || >=22.12.0`
- Node detectado en este entorno: `v22.22.0`

Usarlo en tareas de frontend para revisar deuda de React/Next, accesibilidad, performance, arquitectura y código muerto. No reemplaza la revisión humana: si React Doctor marca algo, primero confirmar el hallazgo contra el código antes de cambiar.
