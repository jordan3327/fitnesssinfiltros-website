# Project Brief — Fitness Sin Filtros

## Business

**Brand:** Fitness Sin Filtros  
**Domain:** `fitnesssinfiltros.com`  
**Primary website objective:** turn interested visitors into qualified WhatsApp inquiries.

The brand provides individualized guidance. The site must communicate that a plan starts after considering the person’s goals, habits, needs, and lifestyle.

## Confirmed offer and prices

| Service | Price | Follow-up |
|---|---:|---|
| Entrenamiento personal conmigo 1:1 | $50 por sesión | Session-based; exact modality pending |
| Rutina PDF sin seguimiento | $200 | No |
| Rutina PDF con seguimiento | $250 | Yes |
| Plan de alimentación + seguimiento personalizado | $250 | Yes |
| Plan de alimentación sin seguimiento | $200 | No |
| Asesoría personalizada de 1 hora | $50 | One-hour session |

Do not modify these labels or prices without direct approval.

## Approved core message

> Resultados reales, sin mitos, sin extremos y sin estrés.

Supporting ideas:

- Tu mejor versión comienza con un plan hecho para ti.
- Planes personalizados, no soluciones generales.
- La constancia y tu compromiso son clave.
- Tú eres tu mejor proyecto.

## Primary user journey

1. Visitor lands from social media, a recommendation, or direct domain.
2. They understand the personal nature of the service immediately.
3. They compare services/prices without confusion.
4. They learn the simple process.
5. They contact by WhatsApp to determine the best fit.

## Pages

- `index.html`: conversion-first home page.
- `pages/servicios.html`: all services, detail, and CTAs.
- `pages/sobre-mi.html`: only use coach biography/credentials once supplied.
- `pages/contacto.html`: accessible form that composes a WhatsApp inquiry.
- `pages/preguntas-frecuentes.html`: detailed FAQ.
- `pages/politicas.html`: draft/placeholder until legal business terms are approved.

## Mandatory editable configuration

Keep the following centrally editable, preferably in `js/config.js`:

```js
const SITE_CONFIG = {
  brandName: 'Fitness Sin Filtros',
  domain: 'fitnesssinfiltros.com',
  coachName: '[PENDIENTE_CLIENTE: nombre de la entrenadora]',
  whatsappNumber: '593XXXXXXXXX',
  email: '[PENDIENTE_CLIENTE: correo oficial]',
  instagramUrl: '[PENDIENTE_CLIENTE: URL de Instagram]',
  facebookUrl: '[PENDIENTE_CLIENTE: URL de Facebook]',
  location: '[PENDIENTE_CLIENTE: ciudad o modalidad de atención]',
  paymentMethods: [],
  deliveryTimes: {},
  services: []
};
```

The placeholder WhatsApp number must never be treated as a working number. If the site is public before replacement, hide or disable the contact action and explain that official contact details are pending.

## Health-content boundary

The website must not replace clinical advice. Use this approved general note where relevant:

> Los planes se elaboran con la información proporcionada por cada persona y no sustituyen la evaluación de un médico o nutricionista clínico. Si tienes una condición de salud, estás embarazada, tomas medicación o tienes necesidades especiales, consulta primero con un profesional de salud.

## Known pending client inputs

- Real coach name and professional bio.
- Approved coach photos and logo source files.
- Official WhatsApp number.
- Official social links.
- Location, availability, and online/in-person modality.
- Session duration and service-delivery timelines.
- Exact scope/frequency/channel of follow-up.
- Payment methods.
- Cancellation/change policy.
- Authorized testimonials and image consent.
- Final privacy and terms content.

## Future scope, not for v1

- Payments.
- Calendar booking.
- Client dashboard.
- Protected PDF delivery.
- Progress tracking.
- CRM integration.
