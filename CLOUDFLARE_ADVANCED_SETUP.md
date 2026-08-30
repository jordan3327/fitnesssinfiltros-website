# CLOUDFLARE 2026 - CONFIGURACIÓN AVANZADA
## Guía Paso a Paso para Dashboard

---

## 1. HABILITAR WAF (Web Application Firewall)

### En Cloudflare Dashboard:
1. Ir a: **https://dash.cloudflare.com/** 
2. Seleccionar zona: **fitnesssinfiltros.com**
3. Navegar a: **Security** (panel izquierdo)
4. Seleccionar: **WAF** → **Firewall Rules**
5. Click: **"Create Firewall Rule"**

### Crear Rules Recomendadas:

#### Rule 1: Bloquear User-Agents Sospechosos
```
Expression: (cf.bot_management.score < 30) or (http.user_agent contains "bot" and cf.bot_management.verified_bot_category != "Search Engine")
Action: Block
```

#### Rule 2: Bloquear SQL Injection Attempts
```
Expression: (http.request.uri.query contains "union" and http.request.uri.query contains "select") or (http.request.uri.path contains "admin")
Action: Block
```

#### Rule 3: Rate Limiting (DDoS Protection)
```
Expression: (cf.threat_score > 50)
Action: Challenge (mostrar CAPTCHA)
```

#### Rule 4: Bloquear Geolocalizaciones de Riesgo (Opcional)
```
Expression: (ip.geoip.country in {"KP" "IR" "SY" "CU"})
Action: Block
```

---

## 2. ACTIVAR BOT MANAGEMENT

### En Cloudflare Dashboard:
1. **Security** → **Bot Management**
2. Click: **"Enable Bot Management"** (si no está activo)
3. Configurar:

#### Settings:
- **Verified Bots**: Allow (Google, Bing, Facebook crawlers)
- **Super Bot Fight Mode**: Enable
  - Definitely Automated: Block
  - Likely Automated: Challenge (CAPTCHA)
  - Likely Human: Allow

#### Sensitivity Level:
- **Recommended**: High (para sitios con contenido valioso)

#### JavaScript Detections:
- Enable (requiere JavaScript en navegador)

#### Configuration:
```
Sensitivity: High
JavaScript Challenge: Enabled
Super Bot Fight Mode: Enabled
Definitely Automated: Block
Likely Automated: Challenge
Likely Human: Allow
Verified Bots (Google, Bing, etc.): Allow
```

**Nota**: Some plans require upgrade to "Bot Management" addon.

---

## 3. CONFIGURAR ANALYTICS DASHBOARD

### En Cloudflare Dashboard:
1. **Analytics & Logs** (panel izquierdo)
2. Seleccionar: **Web Analytics**
3. Ver métricas:
   - **Requests by Country**
   - **Cache Hit Ratio**
   - **Bandwidth Usage**
   - **Threats Blocked**

### Habilitar Advanced Analytics:
1. **Analytics & Logs** → **Logpush**
2. Click: **"Connect a Provider"**
3. Seleccionar: **Cloudflare Logpush API**
4. Datasets a loguear:
   - HTTP Requests
   - Firewall Events
   - Bot Management Events
   - Cache Analytics

### Real User Monitoring (RUM):
1. **Analytics & Logs** → **Web Analytics**
2. Habilitar: **Web Vitals**
   - LCP (Largest Contentful Paint)
   - FID (First Input Delay)  
   - CLS (Cumulative Layout Shift)

---

## 4. CONFIGURAR CLOUDFLARE PAGES (Git-Connected Deployment)

### Opción A: Conectar GitHub Repository

#### En Cloudflare Dashboard:
1. Ir a: **https://dash.cloudflare.com/pages**
2. Click: **"Create a project"** → **"Connect to Git"**
3. Autorizarse con GitHub (si no está autorizado)
4. Seleccionar:
   - **Account**: Tu cuenta de GitHub
   - **Repository**: `jordan3327/fitnesssinfiltros-website`
   - **Branch**: `main`

#### Configurar Build Settings:
```
Project Name:                fitnesssinfiltros-website
Production branch:           main
Framework preset:            None (Static site)
Build command:               (dejar vacío)
Build output directory:      (dejar vacío)
Root directory:              / (raíz del repo)
```

#### Environment Variables (Opcional):
- Dejar vacío (no necesarios para sitio estático)

#### Click: "Save and Deploy"

#### Resultado:
- Proyecto creado en: `fitnesssinfiltros-website.pages.dev`
- Deployment automático en cada push a `main`
- URL custom domain setup

#### Agregar Custom Domain:
1. En project settings → **Custom domain**
2. Click: **"Add domain"**
3. Entrar: `fitnesssinfiltros.com`
4. Seleccionar: **Route through Cloudflare nameservers**
5. Click: **"Activate domain"**

#### Resultado Final:
```
Production URL:    https://fitnesssinfiltros-website.pages.dev
Custom Domain:     https://fitnesssinfiltros.com (auto-redirect)
Deployments:       Automático en cada git push
Build Time:        < 30 segundos
```

### Opción B: Mantener Workers (Actual)
Si prefieres mantener Workers:
- Ya está configurado ✓
- Deploy via `npx wrangler@latest deploy` o `git push`
- No requiere cambios

---

## 5. CONFIGURAR REGLAS AVANZADAS (WAF Rules)

### En Cloudflare Dashboard:
1. **Security** → **Firewall Rules**
2. Crear esta regla para proteger API:

```
Rule Name: "Protect Contact Form"
Expression: 
  (http.request.method == "POST" and 
   http.request.uri.path == "/contact") or
  (http.request.uri.query contains "msg" and 
   http.request.uri.query contains "phone")
Action: "Challenge" (mostrar CAPTCHA antes de procesar)
```

### Regla Anti-Scraping:
```
Rule Name: "Block Scrapers"
Expression:
  (http.user_agent contains "curl" or 
   http.user_agent contains "wget" or 
   http.user_agent contains "python" or
   http.request.headers["Accept-Encoding"] == "") and
  (cf.bot_management.score < 50)
Action: "Block"
```

---

## 6. RATE LIMITING CONFIGURACIÓN

### En Cloudflare Dashboard:
1. **Security** → **Rate Limiting**
2. Click: **"Create a Rate Limit Rule"**

#### Rule: Limit requests por IP
```
Request Characteristics:
  - URI: Matches regex: ^/.*$
  - Request count threshold: 100
  - Time period: 10 seconds
  - Mitigation action: Block
  
Counting expression:
  cf.ip
```

#### Rule: Limit Form Submissions
```
Request Characteristics:
  - Method: Equals POST
  - URI: Contains /contact
  - Request count threshold: 5
  - Time period: 60 seconds
  - Mitigation action: Challenge
```

---

## 7. CONFIGURAR CACHE PURGE & RULES

### En Cloudflare Dashboard:
1. **Caching** → **Cache Rules**
2. Click: **"Create Rule"**

#### Rule: Cache HTML Files
```
Condition: http.request.uri.path ends with ".html"
Cache ttl: 3600 seconds (1 hour)
```

#### Rule: Cache Images Forever
```
Condition: 
  (http.request.uri.path ends with ".jpg") or
  (http.request.uri.path ends with ".png") or
  (http.request.uri.path ends with ".webp")
Cache ttl: 31536000 seconds (1 year)
```

### Purge Cache Manualmente:
1. **Caching** → **Purge Cache**
2. Opción A: **Purge Everything**
3. Opción B: **Custom Purge** (URLs específicas)

---

## 8. MONITORING & ALERTS

### En Cloudflare Dashboard:
1. **Notifications** (campana en header)
2. Click: **"Create Notification"**

#### Alert 1: Security Events
```
Notification Type: "Security Events"
Trigger: "High threat score detected"
Recipients: tu email
```

#### Alert 2: Down Time
```
Notification Type: "Zone down"
Trigger: "Origin unreachable"
Recipients: tu email
```

#### Alert 3: DDoS Attack
```
Notification Type: "DDoS Attack"
Trigger: "Any DDoS detected"
Recipients: tu email
```

---

## 9. PERFORMANCE MONITORING

### Cloudflare Observability:
1. **Analytics & Logs** → **Web Analytics**
2. Dashboard muestra:
   - Requests por segundo
   - Bandwidth total
   - Cache hit ratio
   - Países con tráfico
   - Threats bloqueados

### Métricas Clave a Monitorear:
- **Cache Hit Ratio**: Idealmente > 80%
- **Response Time**: < 200ms
- **Bandwidth Saved**: % de datos comprimidos por Cloudflare
- **Threats Blocked**: Monitor diariamente

---

## 10. BACKUP & DISASTER RECOVERY

### Configurar Backups Automáticos:
1. **YNG™ Cloud Dropbox** está sincronizado ✓
2. Considerar: GitHub Pages como backup
3. Exportar DNS records regularmente

### Procedimiento de Recuperación:
```
Si Cloudflare cae:
1. Cambiar nameservers a backup (p.ej., Route 53)
2. Apuntar a fitnesssinfiltros-website.anax10xx.workers.dev
3. O redireccionar a GitHub Pages (si está disponible)
```

---

## 11. CHECKLIST DE SEGURIDAD FINAL

- [ ] WAF habilitado
- [ ] Bot Management activo
- [ ] Rate Limiting configurado (5 requests/min en forms)
- [ ] Analytics dashboard monitoreando
- [ ] Alertas de seguridad configuradas
- [ ] Cache purge funcionando
- [ ] SSL/TLS certificado válido
- [ ] HSTS header presente
- [ ] CSP header correcta
- [ ] Cloudflare Pages en standby (opcional)

---

## 12. TESTING & VALIDATION

### Verificar WAF está funcionando:
```bash
# Intentar SQL injection (debe ser bloqueado)
curl "https://fitnesssinfiltros.com/?id=1' UNION SELECT NULL--"

# Debe retornar: 403 Forbidden (WAF bloqueó)
```

### Verificar Bot Management:
```bash
# Usar curl (debe ser challenged/bloqueado)
curl "https://fitnesssinfiltros.com/"

# Debe retornar: 403 o challenge page
```

### Verificar Rate Limiting:
```bash
# Hacer 6 requests en < 10 segundos
for i in {1..6}; do curl -s "https://fitnesssinfiltros.com/" | head -c 100; done

# Después del 5to request: Challenge page
```

---

## 13. PRÓXIMOS PASOS (30 DAYS)

1. **Semana 1**: Enabler WAF + Bot Management
2. **Semana 2**: Monitor analytics + alertas
3. **Semana 3**: Fine-tune rules según datos reales
4. **Semana 4**: Documentar playbook de respuesta ante ataques

---

## SOPORTE & RECURSOS

- **Cloudflare Docs**: https://developers.cloudflare.com/
- **WAF Documentation**: https://developers.cloudflare.com/waf/
- **Bot Management**: https://developers.cloudflare.com/bot-management/
- **Cloudflare Status**: https://www.cloudflarestatus.com/

---

**Status**: Ready for advanced configuration  
**Last Updated**: 2026-08-30  
**Complexity Level**: ⭐⭐⭐ (Intermediate)
