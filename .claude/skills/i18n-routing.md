# Skill: i18n Routing

## Cuándo usarla
Cuando necesites implementar rutas bilingües ES/EN.

## Entradas requeridas
- Ruta base
- Idiomas soportados: `es`, `en`

## Pasos

### 1. Estructura de carpetas
```
web/app/
├── [lang]/
│   ├── page.tsx          # Home
│   ├── galeria/
│   │   └── page.tsx      # Galería
│   ├── artwork/
│   │   └── [slug]/
│   │       └── page.tsx  # Detalle obra
│   └── layout.tsx        # Layout raíz
```

### 2. Middleware para detección de idioma
```typescript
// web/middleware.ts
import {NextResponse} from 'next/server'
import type {NextRequest} from 'next/server'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Skip if already has lang
  if (/^\/(es|en)\//.test(pathname)) {
    return
  }

  // Detect from header or default to 'es'
  const acceptLang = request.headers.get('accept-language') || ''
  const lang = acceptLang.includes('en') ? 'en' : 'es'

  // Redirect to lang prefix
  return NextResponse.redirect(new URL(`/${lang}${pathname}`, request.url))
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}
```

### 3. Params en componentes
```typescript
export default function Page({params}: {params: {lang: 'es' | 'en'}}) {
  const t = translations[params.lang]

  return <h1>{t.home.title}</h1>
}
```

### 4. Traducciones (simple)
```typescript
// web/lib/translations.ts
export const translations = {
  es: {
    nav: {home: 'Inicio', gallery: 'Galería', contact: 'Contacto'},
    artwork: {available: 'Disponible', sold: 'Vendida'},
  },
  en: {
    nav: {home: 'Home', gallery: 'Gallery', contact: 'Contact'},
    artwork: {available: 'Available', sold: 'Sold'},
  },
}
```

### 5. Links entre idiomas
```typescript
<Link href="/en/galeria">English</Link>
<Link href="/es/galeria">Español</Link>
```

## Output esperado
- Rutas `/es/...` y `/en/...`
- Middleware de detección
- Componentes con lang param

## Checklist final
- [ ] Middleware redirige sin lang a lang detectado
- [ ] Todas las rutas usan `[lang]`
- [ ] Links incluyen lang prefix
- [ ] Traducciones accesibles
