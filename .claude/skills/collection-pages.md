# Skill: Collection Pages

## Cuándo usarla
Cuando crees páginas de colección: galería, tienda, portfolio.

## Entradas requeridas
- Tipo de colección (tienda/galería/portfolio)
- Idioma

## Pasos

### 1. Crear ruta
```
web/app/[lang]/tienda/page.tsx
web/app/[lang]/galeria/page.tsx
```

### 2. Query según tipo
```typescript
// Tienda: solo disponibles
const tiendaQuery = `*[_type == "artwork" && status == "available"] | order(publishedAt desc) {
  _id, title, slug, status, priceMxn, showPrice,
  "coverImage": images[0]
}`

// Galería: todo el portfolio
const galeriaQuery = `*[_type == "artwork"] | order(publishedAt desc) {
  _id, title, slug, status, medium, year,
  "coverImage": images[0]
}`

// Por técnica
const porTecnicaQuery = `*[_type == "artwork" && medium == $medium] | order(publishedAt desc) {
  _id, title, slug, "coverImage": images[0]
}`
```

### 3. Paginación
```typescript
// Con paginación
const page = 1
const limit = 12

const query = `*[_type == "artwork" && status == "available"] | order(publishedAt desc)[$start...$end] {
  _id, title, slug, "coverImage": images[0]
}`

const start = (page - 1) * limit
const end = start + limit - 1

const artworks = await sanity.fetch(query, {start, end})
const total = await sanity.fetch(`count(*[_type == "artwork" && status == "available"])`)
```

### 4. Página base
```typescript
export default async function TiendaPage({params}: {params: {lang: string}}) {
  const artworks = await sanity.fetch(tiendaQuery)

  return (
    <main>
      <header>
        <h1>Tienda</h1>
        <p>Obras disponibles para compra</p>
      </header>

      <ArtworkGrid artworks={artworks} />

      {/* Paginación si aplica */}
    </main>
  )
}
```

### 5. Grid de artworks
```typescript
// web/components/ArtworkGrid.tsx
export function ArtworkGrid({artworks}: {artworks: Artwork[]}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {artworks.map(artwork => (
        <ArtworkCard key={artwork._id} artwork={artwork} />
      ))}
    </div>
  )
}
```

### 6. Filtros (opcional)
```typescript
// Por estado, técnica, año
const filterQuery = `*[_type == "artwork" && status == $status && medium == $medium] | order(publishedAt desc) {
  _id, title, slug, "coverImage": images[0]
}`
```

## Output esperado
- Página de colección funcional
- Grid de obras
- Paginación si >12 items
- Filtros aplicados correctamente

## Checklist final
- [ ] Query filtra por tipo correcto
- [ ] Orden definido
- [ ] Grid responsive (1-2-3 columnas)
- [ ] Cada card link a detalle
- [ ] Paginación funciona
- [ ] No muestra obras si query vacía
