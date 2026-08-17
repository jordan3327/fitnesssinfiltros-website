# Auditoría de diseño post-beta — Fitness Sin Filtros

> Estado: documento de **Etapa 1 (auditoría)**. No modifica ningún archivo del sitio.
> Objetivo: hoja de ruta para evolucionar la web de **beta funcional** a una
> **demo visual premium**, coherente, moderna, cálida, femenina, editorial y
> orientada a conversión, usando solo HTML/CSS/JS vanilla, sin librerías,
> sin backend y sin reescritura total.
> Restricciones firmes: no cambiar precios, servicios, datos confirmados,
> arquitectura, rutas, funcionamiento de WhatsApp, FAQ, modal ni validación
> del formulario.

---

## 1. Diagnóstico de madurez actual

### 1.1 Lo que ya se siente profesional

- **Sistema de tokens sólido**: paleta de marca (rosa `#D23C58`, negro `#000001`,
  salmón `#D07A75`), superficies, texto, bordes, radios, sombras, tipografías
  (Fraunces + DM Sans) y motion centralizados en `css/variables.css`.
- **Sistema de botones implementado** según `docs/UIVERSE_BUTTON_PATTERNS.md`
  (patrones 1, 2, 4 y 5): primario rosa, outline, WhatsApp verde con texto
  oscuro, enlace de texto con subrayado siempre visible; estados hover/active/
  focus-visible/disabled; `prefers-reduced-motion` respetado.
- **Motion gobernado**: tokens `--motion-hover:0.2s`, `--motion-reveal:0.4s`,
  `--motion-ease-out`; reveal con stagger en rejillas; entrada escalonada del
  hero en CSS puro; FAQ con fade+rise; modal con escala sutil; todo desactivado
  bajo `prefers-reduced-motion`.
- **Accesibilidad base sólida**: `lang="es"`, un solo `h1`, jerarquía lógica,
  `aria-expanded` en menú móvil y FAQ, `aria-disabled` en WhatsApp no
  configurado, foco visible con anillo, saltar al contenido, etiquetas visibles,
  textos de error asociados (`aria-describedby`), modal con foco contenido y
  restauración de foco.
- **Integridad de negocio**: precios exactos centralizados en `js/config.js`,
  guarda del número de WhatsApp (nunca abre `wa.me` con placeholder), mensajes
  codificados con `encodeURIComponent`, testimonios marcados como
  `Testimonio pendiente de autorización`, nota médica presente.
- **Responsive**: grid mobile-first con cortes en 640/1024/1280; sin horizontal
  scroll en los cortes verificados estáticamente; botón "volver arriba" y
  encabezado con estado `is-scrolled`.

### 1.2 Lo que todavía se siente beta, genérico, vacío, pesado o inconsistente

- **Hero con exceso decorativo**: 2 blobs radiales + 2 corazones flotantes +
  marco punteado alrededor de la foto = 5 motivos decorativos en una sola
  sección (viola la regla "máximo 2 motivos por sección" de `DESIGN_SYSTEM.md`).
  Se percibe plantilla genérica, no editorial.
- **CTA final con gradiente fuerte**: `linear-gradient(135deg, fuchsia-deep,
  fuchsia)` + patrón punteado; encaja en la lista de "gradients fuertes" que la
  identidad quiere evitar y compite con el botón verde de WhatsApp.
- **Sub-heros interiores planos**: las 5 páginas bajo `pages/` tienen
  eyebrow + h1 + p sin personalidad ni ritmo editorial, y sin entrada de motion
  (el hero de inicio sí tiene `hero-rise`).
- **Presentación del precio** correcta pero de peso medio: el precio usa serif
  tabular 1.7rem, pero no protagoniza la tarjeta; la fila precio/nota se ve
  apretada respecto al botón.
- **Imágenes placeholder con marco punteado**: refuerza el aire de borrador;
  la fotografía real de la entrenadora aún no existe.
- **Testimonios placeholder** correctos y honestos (con `demo-badge` y
  monogramas C1/C2/C3), pero visualmente idénticos entre sí y sin evolución.
- **Secciones de fondo sutil con gradiente lineal** (`process` y `faq` usan
  `linear-gradient(180deg, ...)`): preferible superficies planas para un ritmo
  de fondo determinista.
- **Footer** correcto pero mínimo; sin acento de cierre ni claim destacado.

### 1.3 Lo que depende de contenido real del cliente

- Fotografía profesional, nombre y biografía de la entrenadora, WhatsApp
  oficial, redes sociales, testimonios autorizados, modalidad, horarios,
  métodos de pago, política de pagos/cambios, imagen social (Open Graph) y
  texto legal. Todo queda como `[PENDIENTE_CLIENTE: …]` y **bloquea** varias
  mejoras visuales (ver sección 7).

---

## 2. Diseño de referencia reinterpretado

Síntesis de los patrones leídos realmente en las URLs (sin copiar código,
composición ni recursos) y cómo se reinterpretan para esta marca.

| Bloque | Referencia que aporta | Reinterpretación editorial wellness para Fitness Sin Filtros |
|---|---|---|
| **Hero editorial** | Mezo (visual limpio, hero premium), Squarespace (composición humana editorial), TMPL ("warm and calm beats loud") | Una sola imagen fuerte en marco fino y sobrio (sin blobs/corazones/marco punteado), titular serif con acento en itálica, 2 acciones claras y micro-confianza. Menos ruido, más respiro. |
| **Navegación** | Mezo, Flexova (navegación responsive simple) | Mantener header sticky con blur y estado `is-scrolled`; subrayado de enlace actual; CTA "Comenzar" visible en desktop. Ya implementado; solo pulir consistencia de espaciado. |
| **Botones** | UIVERSE (objetivo: estados/microinteracciones; referencia 403, se usa el doc local aprobado) | Sistema actual es el correcto: elevación sutil `-2px`, feedback `:active`, foco con anillo, WhatsApp con texto oscuro, enlace con subrayado persistente. Sin cambios estructurales; solo garantizar un único primario por vista. |
| **Tarjetas de servicios** | IronCoach (estructura de servicios claros), Flexova (tarjetas y jerarquía) | Tarjeta blanca, icono en chip rosa suave, título, descripción corta, precio protagonista y CTA alineado al pie; destacar solo las 2 opciones "con seguimiento". Ya existe; elevar jerarquía del precio. |
| **Presentación de precios** | IronCoach (pricing claro), TMPL ("un programa por oferta y su precio") | Precio en serif tabular más grande y en su propia línea, nota ("por sesión"/"pago único") en secundario; sin confundir con botón. El sitio ya usa tabular-nums; subir peso visual del precio. |
| **Proceso de trabajo** | IronCoach (program steps), refs.gallery (ritmo) | Mantener 4 pasos numerados con número salmón; añadir solo en desktop un conector sutil entre tarjetas. Sin timelines complejos que fallen en móvil. |
| **Bloque de confianza** | IronCoach, Outrank (credibilidad), TMPL (prueba = testimonios con nombres y caras) | Mantener la sección `#marca` (personalización) y `hero-trust`; evolucionar los placeholders de testimonios para que la demo se vea intencional. Nada de cifras inventadas. |
| **FAQ** | IronCoach (FAQ final), TMPL (quitar fricción) | Ya implementada con `aria-expanded`, chevron y fade+rise. Reinterpretación: mantener max-width 46rem y nota de cierre "¿Sigue con dudas?" hacia WhatsApp. |
| **CTA final** | Outrank, Flexova (bloques oscuros de conversión) | Superficie oscura (`--color-ink`) con texto blanco y rosa como acento de detalle; botón WhatsApp verde como única acción. Cierre premium y calmado. |
| **Footer** | TMPL (contacto y cierre limpio), Flexova (footer completo) | Footer oscuro existente; añadir acento superior fino, claim de marca mejor destacado y enlaces de servicios reales. |
| **Formulario** | Flexova, Squarespace (forms de contacto claros) | Mantener validación actual y labels visibles; pulir selects, feedback de éxito y espaciado de campos. Sin backend, solo composición de WhatsApp. |

---

## 3. Tabla de máximo 12 mejoras

| # | Prioridad | Sección | Archivo y selector probable | Patrón de referencia | Problema actual | Corrección original propuesta | Beneficio para la usuaria | Riesgo técnico | Requisito de accesibilidad | Criterio de aprobación |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Crítica | Hero | `index.html` (blobs/hearts); `css/style.css` `.hero-blob`, `.hero-heart`, `.hero-media::after` | "hero editorial" | 5 motivos decorativos (blobs, corazones, marco punteado); aire de plantilla | Eliminar blobs y corazones; sustituir marco punteado por un marco fino salmón/crema sobrio (una sola línea editorial) | Primer pantallazo premium, cálido y enfocado en foto + titular | Bajo (solo CSS/HTML decorativo) | Los elementos eliminados ya eran `aria-hidden`; la foto conserva alt | Sin blobs/corazones; foto + titular dominan el pliegue en 360 y 1440 px |
| 2 | Alta | CTA final | `css/style.css` `.cta-final` (fondo y `::before`) | "CTA oscuro" | Gradiente rosa fuerte + punteado; compite con botón verde | Superficie `--color-ink` con texto blanco; rosa solo como acento (icono o trazo); quitar punteado | Cierre conversión premium, coherente con el negro de marca | Bajo | Contraste blanco sobre `--color-ink` (>12:1); botón WhatsApp intacto | Panel oscuro sin gradiente; contraste AA; sin regresión en botones |
| 3 | Alta | Sub-heros interiores | `pages/*.html` `.sub-hero`; `css/style.css` `.sub-hero h1/p` | "hero editorial" (variante interior) | Páginas interiores planas y sin ritmo editorial | Añadir acento editorial al eyebrow (color salmón suave) y una entrada suave (`hero-rise`) compartida | Coherencia visual entre inicio e interiores | Bajo | Mantener 1 `h1` por página y orden de títulos | Las 5 páginas comparten el mismo tratamiento; sin animación en reduced-motion |
| 4 | Media | Tarjetas de servicios | `css/style.css` `.price-row`, `.price`, `.price-note`; `index.html` `.service-card` | "tarjeta de precio" | Precio correcto pero de peso medio; fila apretada | Subir el precio a ~2rem serif, ponerlo en línea propia y la nota debajo en `--fs-tiny`; alinear CTA al pie con `margin-top:auto` | Comparar precios de un vistazo sin leer todo | Bajo | Precio conserva contraste (`--color-ink`); tabular-nums se mantiene | Precio destaca en la tarjeta a 360 y 1024 px; sin cambios en etiquetas ni precios |
| 5 | Media | Proceso | `css/responsive.css` `.process-grid` (≥1024); `css/style.css` `.process-card` | "reveal suave" + conector de pasos | 4 tarjetas sin relación visual entre sí en desktop | Línea conectora sutil entre tarjetas (pseudo-elemento) solo en ≥1024 px; sin JS | El proceso se lee como secuencia | Bajo-medio | Decoración `aria-hidden`/`pointer-events:none`; no altera foco ni DOM | Conector visible en 1024/1440; invisible y sin desbordes en 768 y menor |
| 6 | Media | Testimonios | `index.html` `#testimonios`; `css/style.css` `.testimonial-card`, `.demo-badge` | "bloque de confianza" | Placeholders idénticos; demo parece vacía | Variar sutilmente el tratamiento (cita más larga/corta, monogramas) manteniendo `demo-badge` y textos honestos; reservar el lugar visual | La demo se ve diseñada y honesta a la vez | Bajo | El texto "Testimonio pendiente de autorización" permanece legible (AA) | Placeholders intencionales y diferenciados; sin nombres ni resultados inventados |
| 7 | Media | Sección de marca | `css/style.css` `.brand-about`, `.about-media`, `#marca .eyebrow` | "bloque de confianza" | Imagen placeholder sin marco; sección correcta pero fría | Marco editorial fino en la imagen de `#marca` acorde al hero; mantener salmón en eyebrow | Personalización percibida desde la sección de marca | Bajo | La imagen conserva alt; `aria-hidden` en decoración | Marco coherente con el hero; alt intactos |
| 8 | Baja | Fondos de sección | `css/style.css` `.process`, `.faq` (gradientes) | "sistema visual refinado" | Gradientes lineales sutiles (process/faq) | Sustituir por superficies planas alternadas (`--color-blush` / `--color-cream` / `--color-white`) con ritmo determinista | Fondo estable, menos "plantilla" | Bajo | Sin cambio de contraste de texto (fondos claros equivalentes) | Fondos planos y consistentes en las 3 secciones alternas |
| 9 | Baja | Footer | `css/style.css` `.site-footer`, `.footer-claim` | "footer premium" | Footer correcto pero sin acento ni claim destacado | Añadir borde superior fino (salmón) y dar más peso tipográfico al claim de marca | Cierre de marca memorable | Bajo | Mantener contraste de `--color-footer-*` (ya AA) | Acento visible; claim destacado; enlaces intactos |
| 10 | Baja | Formulario | `css/style.css` `.form-group`, `.form-control`; `pages/contacto.html` | "formulario premium" | Campos correctos; selects y feedback funcionales pero sin refinamiento | Alinear radios/labels, pulir el feedback de éxito y el estado de campos; sin tocar validación ni WhatsApp | Formulario más ordenado y confiable | Bajo | Labels visibles, `aria-describedby` y estados de error intactos | Misma validación; mejor ritmo vertical; sin cambios de comportamiento |
| 11 | Baja | FAQ | `index.html` `#preguntas`; `css/style.css` `.faq-note` | "FAQ que quita fricción" | FAQ completa; falta micro-CTA de cierre | Convertir `faq-note` en un micro-CTA de texto hacia WhatsApp ("¿Sigue con dudas? Escríbeme") | Cerrar dudas con un siguiente paso claro | Bajo | El enlace conserva subrayado visible y nombre descriptivo | Micro-CTA visible y funcional; sin tocar acordeón |
| 12 | Baja | QA transversal | Todos los archivos CSS/HTML editados en esta iteración | "reveal suave" + criterios de aceptación | Sin verificación en navegador aún | Pasar el QA estático del proyecto: contrastes, foco, `reduced-motion`, 360/390/768/1024/1440, sin horizontal scroll, placeholders intactos | Iteración sin regresiones | Medio | Aplicar `docs/QA_PROTOCOL.md` y `docs/ACCEPTANCE_CRITERIA.md` | Checklist completado y documentado en la respuesta de implementación |

---

## 4. Sistema visual refinado

- **Regla de espaciado**: ritmo vertical con los tokens existentes
  (`--space-1` a `--space-7`); secciones en `clamp(4rem, 8vw, 6rem)` móvil-first;
  nunca bloquear altura de tarjeta si el contenido fluctúa.
- **Regla de máximo ancho**: contenedor `--container: 74rem` (74 rem ≈ 1184 px)
  con gutters `min(100% - 2.5rem, …)` en móvil y `min(100% - 4rem, …)` en
  desktop; texto de sección limitado a `--container-narrow: 52rem`.
- **Regla de fotografía**: una imagen por bloque editorial, recorte 4/5 o 1/1,
  `object-fit: cover`, radio `--radius-lg`, sombra `--shadow-card`, marco fino
  sobrio; decoración decorativa con `aria-hidden`. Nunca collages ni mosaicos.
- **Regla de uso de rosa**: `#D23C58` es para acciones y acentos puntuales
  (botones primarios, foco, iconos clave, chip "con seguimiento"); nunca como
  fondo dominante de sección ni en texto pequeño; el salmón `#D07A75` solo como
  acento de superficie (números de proceso, marcos, fondos `--color-salmon-soft`).
- **Regla de contraste**: texto normal ≥ 4.5:1, texto grande y bordes UI ≥ 3:1
  (objetivo WCAG AA); blanco sobre rosa solo en botones grandes; nunca texto
  blanco directo sobre salmón; `--color-ink` como texto base sobre claros.
- **Regla de tarjetas**: superficie blanca, borde `--color-border`, radio
  `--radius-md`, sombra suave `--shadow-sm`, hover con elevación `-3/-4px` y
  `--shadow-card`; una sola tarjeta destacada por concepto con borde rosa.
- **Regla de botones**: sistema vigente (`docs/UIVERSE_BUTTON_PATTERNS.md`);
  un primario por vista; altura mínima 48 px; hover `-2px` + sombra; `:active`
  vuelve a base; foco con anillo; `disabled` con opacidad y explicación.
- **Regla de iconos**: sprite SVG único con `aria-hidden`; iconos en chips
  rosas suaves (32–48 px), trazo consistente 1.5; nunca emojis como iconos.
- **Regla de fondos oscuros**: el negro `#000001` se reserva para el footer y
  el nuevo CTA final; en oscuro, el texto usa `--color-footer-*` (AA) y el rosa
  aparece solo como acento; nunca texto oscuro sobre oscuro.
- **Regla de sombras y bordes**: sombras discretas (`--shadow-sm` a
  `--shadow-card`); bordes suaves `--color-border`; evitar neón, neumorphism,
  glassmorphism y gradientes fuertes (eliminar los 2 gradientes restantes).

---

## 5. Plan de motion

- **Reveal de secciones**: `opacity` + `translateY(18px)` a `none`, 400 ms con
  `--motion-ease-out`, disparado por IntersectionObserver solo con JS; respaldo
  `html:not(.js)` siempre visible.
- **Stagger de tarjetas**: retardo incremental 0.05/0.10/0.15 s en rejillas
  (servicios, proceso, beneficios, testimonios); ya implementado.
- **Hover de botones**: elevación `-2px`, fondo, borde y sombra en 180–200 ms
  con `--btn-ease`; `:active` vuelve a 0; icono de flecha avanza 3 px en
  secundario.
- **Hover de tarjetas**: elevación `-3/-4px` + `--shadow-card` en 200 ms; sin
  escala ni zoom.
- **Navegación móvil**: apertura/cierre con `aria-expanded`, sin animación
  invasiva; opcional fade suave del panel.
- **FAQ**: `max-height` + `opacity` + `translateY(-6px)` en 200–320 ms con
  `--motion-ease-out`; chevron rota 180°; ya implementado.
- **Modal**: `translateY(12px) scale(0.98)` → `(0, 1)` en 320 ms; foco y
  `aria-hidden` gestionados por JS; ya implementado.
- **Duración**: hover 150–250 ms; reveals 300–500 ms; transiciones de estado
  180–320 ms.
- **Easing**: `--motion-ease-out: cubic-bezier(0.16, 1, 0.3, 1)` para entradas;
  `--btn-ease: cubic-bezier(0.2, 0.7, 0.3, 1)` para controles.
- **Fallback `prefers-reduced-motion`**: duraciones a ~0 ms, reveals visibles,
  hero sin `hero-rise`, botones sin transform; ya implementado de forma global.
- **Animaciones prohibidas**: scroll-jacking, parallax fuerte, autoplay de
  video, preloaders, partículas, glitch, 3D, neón, pulso continuo,
  carousels, marquee y cualquier animación de layout shift.

---

## 6. Lista de "No copiar"

- **Código**: no copiar HTML/CSS/JS de las URLs de referencia (webflow,
  squarespace, tmpl, 60fps, refs.gallery, uiverse).
- **Texto**: no reutilizar copy en inglés ni eslóganes de plantillas; usar
  únicamente el copy aprobado de `docs/CONTENT_SOURCE.md`.
- **Imágenes**: no usar fotografías ni assets de las plantillas de referencia.
- **Logos**: no usar marcas ni iconos de terceros.
- **Fotos**: seguir usando placeholders claros hasta la fotografía real de la
  entrenadora.
- **Composición idéntica**: no replicar el layout exacto de ninguna plantilla;
  reinterpretar patrones, nunca clonar.
- **Fuentes privadas**: no cargar tipografías propietarias ni de pago; seguir
  con Google Fonts (Fraunces + DM Sans) ya declaradas.
- **Identidad de marca**: no mezclar la paleta rosa/negro/salmón con estilos
  ajenos (gimnasio agresivo, masculino extremo, neón, neumorphism).
- **Animaciones complejas**: no portar microinteracciones tipo GSAP/Framer;
  todo se hace con CSS/JS vanilla y solo `opacity`/`transform`.
- **Experiencia de scroll invasiva**: no adoptar scroll-driven storytelling,
  secciones bloqueadas ni transiciones de página cinemáticas.

---

## 7. Mejoras bloqueadas por datos pendientes

- **Foto profesional**: marco hero e imagen de `#marca` con la foto real de la
  entrenadora (hoy placeholders de Unsplash etiquetados).
- **Nombre de entrenadora**: titular de marca, sub-hero de `sobre-mi.html`,
  footer y microcopy (hoy `[PENDIENTE_CLIENTE]`).
- **WhatsApp**: habilitar todos los CTAs de conversión al configurar el número
  real; hoy se muestran `aria-disabled` con explicación.
- **Redes**: enlaces de Instagram/Facebook y su presentación en footer y
  contacto (hoy ocultos por `js/config.js`).
- **Testimonios autorizados**: reemplazar los 3 placeholders por testimonios
  reales con consentimiento.
- **Modalidad**: sección de modalidad (online/presencial/híbrida) que hoy se
  oculta automáticamente.
- **Horarios**: datos de disponibilidad/agenda (hoy ocultos).
- **Política de pagos**: métodos de pago y condiciones (FAQ "¿Cómo se realiza
  el pago?" y `paymentMethods`).
- **Imagen social**: Open Graph con imagen y URLs reales del dominio.
- **Texto legal**: `pages/politicas.html` y términos/privacidad definitivos.

---

## 8. Criterio de éxito de esta hoja de ruta

La beta → demo premium será viable cuando: (1) se apliquen las mejoras 1–3
(hero editorial, CTA oscuro, sub-heros), (2) se refinen las 4–11 sin tocar
comportamiento, y (3) se cierre con el QA transversal (12). Todo con
HTML/CSS/JS vanilla, accesible, rápido y compatible con el sistema actual.
No se propone reescritura total, React, Tailwind, GSAP, Framer Motion,
Webflow, dependencias ni backend.