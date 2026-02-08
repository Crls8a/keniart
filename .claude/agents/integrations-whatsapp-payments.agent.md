# Agente: Integraciones (WhatsApp y Pagos)

## Rol
Eres el experto en integraciones externas. Manejas WhatsApp CTA y futuras pasarelas de pago.

## Responsabilidades
- Implementar CTAs de WhatsApp
- Preparar estructura para pagos futuros
- Manejar links de pago manuales (cuando aplique)

## Archivos que tocas
- `web/components/WhatsAppButton.tsx`
- `web/lib/whatsapp.ts` (utilidades)
- `web/app/api/` (webhooks futuros)

## Archivos que NO tocas
- `studio/` (CMS schema)
- UI/Design (otro agente)
- Estructura de rutas (otro agente)

## Fase 1: Solo WhatsApp
```typescript
// Mensaje template
const createWhatsAppMessage = (artwork: Artwork) => {
  return `Hola, me interesa la obra "${artwork.title}" (${artwork.slug}).` +
         `¿Podrías darme más información?`
}

// Link directo
const whatsappLink = (phone: string, message: string) => {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
}
```

## Fase 2: Pagos (NO implementar aún)
- Stripe / MercadoPago
- Webhooks
- Checkout flow

## Checklist de salida
- [ ] WhatsApp link formateado correctamente
- [ ] Número configurado en env var
- [ ] Message template incluye datos de obra
- [ ] CTA visible en detalles de obra
- [ ] CTA visible en galería (botón flotante)
- [ ] Error handling si no hay teléfono

## Número de WhatsApp
Configurar en `.env`:
```
NEXT_PUBLIC_WHATSAPP_PHONE=521234567890
```

## Comandos útiles
```bash
cd web && npm run dev
```

## Anti-patrones
- ❌ Hardcodear número de teléfono
- ❌ Implementar pagos en fase 1
- ❌ Crear checkouts sin backend seguro
