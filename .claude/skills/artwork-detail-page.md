# Skill: Artwork Detail Page

## Cuándo usarla
Cuando crees la página de detalle de una obra individual.

## Entradas requeridas
- Slug de la obra
- Idioma (es/en)

## Pasos

### 1. Crear ruta
```
web/app/[lang]/artwork/[slug]/page.tsx
```

### 2. Page con generateMetadata
```typescript
import {sanity} from '@/lib/sanity'
import {notFound} from 'next/navigation'

interface Props {
  params: {lang: string; slug: string}
}

// Query
const artworkQuery = `*[_type == "artwork" && slug.current == $slug][0]{
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

// Metadata dinámica
export async function generateMetadata({params}: Props) {
  const artwork = await sanity.fetch(artworkQuery, {slug: params.slug})

  if (!artwork) return {title: 'Obra no encontrada'}

  return {
    title: `${artwork.title} | Keniart`,
    description: artwork.description,
    openGraph: {
      images: [artwork.images[0]],
      title: artwork.title,
    },
  }
}

// Page component
export default async function ArtworkPage({params}: Props) {
  const artwork = await sanity.fetch(artworkQuery, {slug: params.slug})

  if (!artwork) notFound()

  return (
    <article>
      {/* Galería de imágenes */}
      {/* Ficha técnica */}
      {/* CTA WhatsApp */}
      {/* Obras relacionadas */}
    </article>
  )
}
```

### 3. Secciones clave
```typescript
<section className="grid md:grid-cols-2 gap-8">
  {/* Imágenes */}
  <div className="space-y-4">
    {artwork.images.map((img, i) => (
      <Image key={i} src={urlFor(img)} alt={img.alt} {...} />
    ))}
  </div>

  {/* Ficha técnica */}
  <div>
    <h1>{artwork.title}</h1>
    {artwork.description && <p>{artwork.description}</p>}

    <dl>
      <dt>Técnica</dt>
      <dd>{artwork.medium}</dd>

      <dt>Dimensiones</dt>
      <dd>{artwork.dimensions}</dd>

      <dt>Año</dt>
      <dd>{artwork.year}</dd>

      {artwork.showPrice && artwork.priceMxn && (
        <>
          <dt>Precio</dt>
          <dd>${artwork.priceMxn}</dd>
        </>
      )}

      <dt>Estado</dt>
      <dd>{artwork.status === 'available' ? 'Disponible' : 'Vendida'}</dd>
    </dl>

    {artwork.status === 'available' && (
      <WhatsAppButton artwork={artwork} />
    )}
  </div>
</section>
```

### 4. JSON-LD para SEO
```typescript
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'VisualArtwork',
  name: artwork.title,
  image: artwork.images.map(img => urlFor(img).url()),
  artMedium: artwork.medium,
  height: artwork.dimensions,
  dateCreated: artwork.year,
}
```

## Output esperado
- Página `/es/artwork/[slug]` funcional
- Metadata dinámica
- JSON-LD incluido
- CTA WhatsApp si disponible

## Checklist final
- [ ] Query por slug funciona
- [ ] Not found si slug no existe
- [ ] Imágenes todas renderizadas
- [ ] Ficha técnica completa
- [ ] Estado mostrado correctamente
- [ ] Precio oculto si showPrice=false
- [ ] WhatsApp solo si status=available
