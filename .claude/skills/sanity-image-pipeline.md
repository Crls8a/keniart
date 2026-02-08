# Skill: Sanity Image Pipeline

## Cuándo usarla
Cuando necesites mostrar imágenes de Sanity en Next.js con optimización.

## Entradas requeridas
- Imagen de Sanity (asset)
- Tamaño deseado
- Opcional: hotspot crop

## Pasos

### 1. Configurar builder
```typescript
// web/lib/sanity-image.ts
import imageUrlBuilder from '@sanity/image-url'
import {sanity} from './sananity'

const builder = imageUrlBuilder(sanity)

export const urlFor = (source: any) => builder.image(source)
```

### 2. Imagen básica con Next.js
```typescript
import Image from 'next/image'
import {urlFor} from '@/lib/sanity-image'

function ArtworkImage({image}: {image: any}) {
  const url = urlFor(image).url()

  return (
    <Image
      src={url}
      alt={image.alt || ''}
      width={800}
      height={600}
      className="rounded-lg"
    />
  )
}
```

### 3. Con hotspot crop
```typescript
function ArtworkImageHotspot({image}: {image: any}) {
  const url = urlFor(image)
    .width(800)
    .height(600)
    .fit('crop')
    .crop('entropy')
    .url()

  return <Image src={url} alt={image.alt} width={800} height={600} />
}
```

### 4. Responsive
```typescript
<Image
  src={urlFor(image).width(1200).url()}
  alt={image.alt}
  width={800}
  height={600}
  sizes="(max-width: 768px) 100vw, 50vw"
/>
```

## Snippets útiles
```typescript
// Galería de miniaturas
urlFor(image).width(400).height(300).url()

// Imagen full quality
urlFor(image).width(2000).quality(90).url()

// WebP
urlFor(image).format('webp').url()
```

## Output esperado
- Componentes `<Image />` optimizados
- URLs construidas con builder
- Alt text incluido

## Checklist final
- [ ] Width/height definidos o fill
- [ ] Alt text presente
- [ ] Sizes definido para responsive
- [ ] Calidad adecuada (no excesiva)
