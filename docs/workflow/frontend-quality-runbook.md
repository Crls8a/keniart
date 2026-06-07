# Runbook de calidad frontend

Este runbook define cómo revisar deuda técnica de React/Next en Keniart sin romper el flujo de trabajo por tareas.

## Herramientas base

```bash
node --version
pnpm --version
pnpm lint
pnpm build
pnpm run doctor --no-score --no-telemetry --blocking none
pnpm doctor:react --no-score --no-telemetry --blocking none
```

Versiones validadas en este entorno:

- Node `v22.22.0`.
- pnpm `10.12.1`.
- `react-doctor@0.4.2` mediante `pnpm dlx`.
- `react-doctor@0.4.2` requiere Node `^20.19.0 || >=22.12.0`, así que el Node actual es compatible.

## Por qué usamos `pnpm doctor:react` y no `npx`

El proyecto usa pnpm. Para mantener coherencia y reproducibilidad, `react-doctor@0.4.2` queda pineado como dev dependency y los scripts `doctor` / `doctor:react` ejecutan esa versión local.

Ojo: pnpm ya tiene un comando propio `pnpm doctor`. Por eso, si querés usar el script corto, ejecutalo como `pnpm run doctor`; el comando sin ambigüedad para agentes es `pnpm doctor:react`.

Si alguien necesita probar manualmente con npm, el equivalente conceptual sería `npx react-doctor@0.4.2`, pero el flujo oficial del repo es pnpm.

## Cuándo correr React Doctor

Correrlo cuando una tarea toque:

- componentes React,
- formularios,
- navegación/interacciones,
- imágenes/renderizado,
- metadata/SEO,
- cambios de dependencias frontend,
- limpieza de deuda técnica.

Comando recomendado:

```bash
pnpm doctor:react --no-score --no-telemetry --blocking none
```

Alias equivalente:

```bash
pnpm run doctor --no-score --no-telemetry --blocking none
```


Usamos `--blocking none` para que sea una revisión consultiva. Si el equipo decide endurecer el gate, se puede cambiar a `--blocking warning` o `--blocking error`.

## Checklist React/Next

- Mantener Server Components por defecto.
- Usar `"use client"` solo en hojas interactivas.
- No mover exports de `metadata` a Client Components.
- Verificar `alt`, `sizes`, `priority` e imagen LCP.
- Evitar UI que dependa solo de hover.
- Validar navegación con teclado y touch.
- Revisar labels, errores y estados de formularios.
- Evitar librerías si el MVP puede resolverlo con React/Next simple.
- Leer la guía local de Next en `node_modules/next/dist/docs/` antes de tocar APIs de Next.

## Evidencia mínima al cerrar una tarea

Cada tarea frontend debe reportar:

- `pnpm lint`: PASS / FAIL / NOT RUN.
- `pnpm build`: PASS / FAIL / NOT RUN.
- `pnpm doctor:react`: PASS / observaciones / NOT RUN.
- Riesgos restantes.
- Rollback sugerido.
