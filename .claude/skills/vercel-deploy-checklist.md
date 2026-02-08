# Skill: Vercel Deploy Checklist

## Cuándo usarla
Antes de hacer deploy a Vercel (Studio o Web).

## Entradas requeridas
- Rama a deployar
- Proyecto Vercel configurado

## Pasos

### 1. Pre-deploy local
```bash
# Build verification
cd studio && npm run build
cd web && npm run build

# Type check
cd web && npx tsc --noEmit
```

### 2. Environment variables (Vercel dashboard)
```
# Para Studio
SANITY_STUDIO_API_PROJECT_ID=897c9w6j
SANITY_STUDIO_API_DATASET=production

# Para Web (cuando exista)
NEXT_PUBLIC_SANITY_PROJECT_ID=897c9w6j
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_WHATSAPP_PHONE=521234567890
```

### 3. Verificar en Vercel
- [ ] Branch conectada correcta
- [ ] Env vars configuradas
- [ ] Build command correcto
- [ ] Output directory correcto

### 4. Studio deploy
```bash
cd studio
npm run build
vercel --prod
```

### 5. Web deploy (cuando exista)
```bash
cd web
npm run build
vercel --prod
```

### 6. Post-deploy verification
- [ ] Site carga sin errores
- [ ] Images cargan desde Sanity CDN
- [ ] Links funcionan
- [ ] WhatsApp CTA abre
- [ ] Metadata visible en source
- [ ] Mobile responsive OK

## URLs
- Studio: https://keniart.vercel.app
- Web: (por definir)

## Troubleshooting
```bash
# Ver builds recientes
vercel ls

# Ver logs de deployment
vercel logs [deployment-url]

# Re-deploy último commit
vercel --prod --force
```

## Output esperado
- Deploy exitoso en Vercel
- Site funcional y accesible
- Sin errores en console

## Checklist final
- [ ] Build local exitoso
- [ ] Env vars en Vercel
- [ ] Deploy completado
- [ ] Smoke test pasado (navegación básica)
- [ ] Imágenes cargan
- [ ] CTAs funcionan
