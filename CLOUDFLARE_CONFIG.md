# Cloudflare Configuration Guide (2026)

## Overview
Esta web está optimizada para Cloudflare Pages + Workers con configuración 2026 de seguridad y performance.

## Architecture

### Cloudflare Pages (Recomendado para 2026)
- **Conecta directamente con GitHub**: Sincronización en tiempo real
- **Auto-deploy**: Cada push a `main` se deploya automáticamente  
- **Almacenamiento**: Cero configuración, sirve todo desde el repo
- **Performance**: Edge caching global automático

### Workers (Alternativa)
- Usado actualmente para lógica personalizada
- Serverless a nivel global
- Ejecución en 300+ data centers

## Setup en Cloudflare Dashboard

### Paso 1: Crear Proyecto en Pages
1. Ir a `https://dash.cloudflare.com/` → Pages
2. Click "Create a project" → Connect to Git
3. Seleccionar repositorio: `jordan3327/fitnesssinfiltros-website`
4. Configurar:
   - **Project name**: `fitnesssinfiltros-website`
   - **Production branch**: `main`
   - **Framework preset**: `None` (sitio estático)
   - **Build command**: (dejar vacío)
   - **Build output directory**: (dejar vacío)
5. Click "Save and Deploy"

### Paso 2: Configurar Custom Domain
1. En Project Settings → Custom domain
2. Agregar: `fitnesssinfiltros.com`
3. Seguir instrucciones para actualizar DNS (si es necesario)
4. Agregar alias: `www.fitnesssinfiltros.com`

### Paso 3: Verificar DNS
El DNS debe apuntar a Cloudflare:
```
Nameservers:
- decker.ns.cloudflare.com
- jamie.ns.cloudflare.com
```

### Paso 4: SSL/TLS
- Cloudflare ofrece SSL/TLS automático "Flexible" (mínimo)
- Para máxima seguridad, cambiar a "Full" en SSL/TLS settings
- Certificado: Universal SSL válido hasta 2026-11-27

## Files Configuration (2026 Standard)

### `_headers`
- **CSP**: Content Security Policy restrictiva
- **HSTS**: Strict-Transport-Security de 1 año
- **Caching**: 
  - HTML: `max-age=0` (siempre fresco)
  - CSS/JS: `max-age=31536000` (1 año)
  - Assets: `max-age=2592000` (30 días)
- **Security Headers**: X-Frame-Options, X-Content-Type-Options, etc.

### `_redirects`
- www → non-www (www.fitnesssinfiltros.com → fitnesssinfiltros.com)
- HTTP → HTTPS
- SPA routing: /contacto → /pages/contacto.html
- 404 fallback a index.html

### `wrangler.jsonc`
- Configuración para Cloudflare Workers + Pages
- Compatibility date: 2026-08-28 (última versión)
- Assets: servir desde root directory

## Performance Optimization (2026)

### Caching Strategy
```
├─ HTML (index.html): No cache - siempre fresco
├─ CSS/JS: Versioned + 1 año cache
│  └─ Cambiar nombres cuando se modifique
├─ Assets (images/fonts): 30 días cache
└─ Pages secundarias: No cache
```

### Compression
Cloudflare comprime automáticamente:
- Gzip para text/css, application/js
- Brotli para navegadores modernos
- WebP para imágenes (automático)

### Image Optimization
Si es necesario activar en Cloudflare Dashboard:
1. Speed → Image Optimization
2. Polish: "Intelligent"
3. WebP: "On"

### Analytics
- Cloudflare Analytics Engine (gratuito)
- Real User Monitoring (RUM) habilitado
- Dashboards en `/pages/dashboard` (si existe)

## Deployment Workflow

### Opción 1: Cloudflare Pages (Automático - Recomendado)
```bash
git add .
git commit -m "Update"
git push origin main
# ✅ Automáticamente se deploya en Cloudflare Pages
```

### Opción 2: Manual Wrangler (Si es necesario)
```bash
npx wrangler@latest deploy
# Verifica en: https://fitnesssinfiltros-website.anax10xx.workers.dev
```

## Security Checklist (2026)

✅ **HTTPS**: Forzado automáticamente  
✅ **CSP**: Configurada restrictivamente  
✅ **HSTS**: 1 año con includeSubDomains  
✅ **DNS**: Puntos a Cloudflare nameservers  
✅ **WAF**: Activar en Cloudflare Security  
✅ **DDoS**: Protección automática de Cloudflare  
✅ **X-Frame-Options**: DENY (anti-clickjacking)  
✅ **X-Content-Type-Options**: nosniff  
✅ **Referrer-Policy**: no-referrer-when-downgrade  

## Verificación

### Verificar SSL
```bash
curl -I https://fitnesssinfiltros.com
# Debe mostrar: HTTP/2 200
# Y headers de seguridad
```

### Verificar Caching
```bash
curl -I https://fitnesssinfiltros.com/css/style.css
# Debe mostrar: CF-Cache-Status: HIT o MISS
# Cache-Control: public, max-age=31536000, immutable
```

### Verificar Headers
```bash
curl -I https://fitnesssinfiltros.com
# Debe mostrar:
# - Strict-Transport-Security
# - X-Content-Type-Options: nosniff
# - X-Frame-Options: DENY
# - Content-Security-Policy
```

## Troubleshooting

### Cambios no se ven en vivo
1. Esperar 30-60 segundos (deploy en Pages)
2. Borrar cache del navegador: Ctrl+Shift+Delete
3. Verificar en navegador privado (incógnito)

### Errores de CSP
1. Revisar Console en DevTools (F12)
2. Actualizar CSP en `_headers`
3. Hacer push a GitHub
4. Esperar deploy automático

### Certificado SSL
1. Debe renovarse automáticamente
2. Si falla, ir a Cloudflare Dashboard → SSL/TLS
3. Crear certificado manual si es necesario

## Next Steps

1. **Activar Cloudflare Pages** en dashboard
2. **Conectar repo de GitHub**
3. **Verificar deployment automático**
4. **Activar Advanced Security** en Cloudflare:
   - WAF Rules
   - Bot Management
   - Page Rules

---
**Última actualización**: 2026-08-30  
**Versión**: 1.0 (Producción)
