# Skill: Sanity Read Queries

## Cuándo usarla
Cuando necesites obtener datos de Sanity en el frontend.

## Entradas requeridas
- Tipo de documento (ej: `artwork`)
- Filtros opcionales (status, slug, etc.)
- Proyección de campos

## Pasos

### 1. Setup del cliente
```typescript
// web/lib/sanity.ts
import {createClient} from 'next-sanity'

export const sanity = createClient({
  projectId: '897c9w6j',
  dataset: 'production',
  apiVersion: '2025-01-01',
  useCdn: true,
})
```

### 2. Query básica
```typescript
// Todas las obras disponibles
const query = `*[_type == "artwork" && status == "available"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  status,
  priceMxn,
  showPrice,
  "coverImage": images[0]
}`
```

### 3. Query por slug
```typescript
// Una obra específica
const query = `*[_type == "artwork" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  description,
  images[],
  medium,
  dimensions,
  year,
  status,
  priceMxn,
  showPrice,
  publishedAt
}`
```

### 4. Ejecutar query
```typescript
const artwork = await sanity.fetch(query, {slug: 'mi-obra'})
```

## Snippets útiles
```typescript
// Solo imágenes con alt
"imagesWithAlt": images[img => defined(img.alt)]

// Primer imagen
"cover": images[0]

// Conteo
"imageCount": count(images)
```

## Output esperado
- Queries GROQ optimizadas
- Resultados tipados (TypeScript)

## Checklist final
- [ ] Query usa proyección (no `**` para todo)
- [ ] Filtros aplicados antes de proyección
- [ ] Orden definido si importa
- [ ] CDN habilitado para reads
