# Skill: Next.js App Router Structure

## Cuándo usarla
Cuando necesites crear nuevas rutas, layouts o páginas en Next.js App Router.

## Entradas requeridas
- Ruta deseada (ej: `/es/galeria`, `/en/artwork/[slug]`)
- Tipo: página, layout, o route handler

## Pasos

### 1. Crear estructura de carpetas
```bash
# Ruta bilingüe
web/app/[lang]/nombre-ruta/page.tsx

# Ruta dinámica
web/app/[lang]/artwork/[slug]/page.tsx

# Layout anidado
web/app/[lang]/galeria/layout.tsx
```

### 2. Página básica (RSC)
```typescript
// web/app/[lang]/page.tsx
import {sanity} from '@/lib/sanity'

export default async function HomePage({params}: {params: {lang: string}}) {
  const artworks = await sanity.fetch('*[_type == "artwork"]')

  return (
    <main>
      <h1> Obras</h1>
      {/* ... */}
    </main>
  )
}
```

### 3. Metadata SEO
```typescript
export const metadata = {
  title: 'Keniart - Galería de Arte',
  description: 'Obras únicas de Kenia Martínez',
}
```

### 4. Layout (opcional)
```typescript
export default function GalleryLayout({children}: {children: React.ReactNode}) {
  return <section className="min-h-screen">{children}</section>
}
```

## Output esperado
- Archivos `.tsx` creados en `web/app/`
- Server Components por defecto
- Metadata exportada

## Checklist final
- [ ] Ruta crea archivos correctos
- [ ] Componente es async si hace fetch
- [ ] Metadata incluida
- [ ] Lang params pasado correctamente
