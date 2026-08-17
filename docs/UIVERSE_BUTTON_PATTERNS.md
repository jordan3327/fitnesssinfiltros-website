# Sistema de botones propuesto — Fitness Sin Filtros

> Documento de diseño. **No implementa cambios en el sitio.** Sirve como
> especificación para una futura iteración de `css/style.css`, `css/components.css`
> y de los botones en los HTML.

## Alcance y reglas

- Inspiración conceptual exclusiva de UIverse (patrones de botones): nunca copia
  de código, HTML, CSS, autores, diseños ni recursos.
- No se añaden librerías, frameworks ni dependencias. Solo CSS + HTML semántico.
- Respeta los anclajes de marca: rosa `#D23C58`, negro `#000001`, salmón `#D07A75`.
- Diseño editorial wellness premium, móvil primero, WCAG AA.
- Se respeta `prefers-reduced-motion`.
- Sin 3D, neumorfismo, glitch, gradientes intensos, brillos deslizantes,
  animaciones largas ni movimiento continuo.

## Análisis de la referencia (conceptos, no código)

De la colección de botones de UIverse se extraen únicamente estos conceptos de
microinteracción que encajan con la marca:

- **Elevación sutil en hover** (botón que "se levanta" 1–3 px) para CTAs.
- **Retroalimentación de pulsación** en `:active` (presionado).
- **Ancho/relleno generoso** para área táctil.
- **Transiciones cortas y suaves** (150–250 ms).

Se rechazan deliberadamente por incompatibles con el diseño editorial wellness:

- Gradientes neón, brillos (shine sweep), contornos animados tipo "border draw".
- 3D, metálico, neumorfismo, glassmorphism, ripple, magnetic hover, jelly.
- Movimiento continuo (flotación, pulsos) y estados de carga decorativos.

---

## 1. Botón primario — `.fs-btn--primary`

Rosa sólido, texto blanco, la acción más importante de cada pantalla.

### Propósito
Convertir: "Quiero comenzar", "Hablar por WhatsApp", "Me interesa", envío de
formulario. Es el CTA de mayor jerarquía visual.

### Cuándo usarlo
- Una única acción primaria por vista/panel (hero, panel final, tarjeta destacada).
- Acciones de conversión hacia WhatsApp.

### Cuándo no usarlo
- Para exploración/ver más (usar enlace o botón outline).
- Más de un primario en el mismo bloque visual (se diluye).
- Para cancelar (usar botón quiet o enlace de texto).

### Variables CSS necesarias
Reutiliza tokens existentes y añade:

```css
--btn-min-height: 3rem;            /* 48 px táctil */
--btn-pad-x: 1.5rem;
--btn-radius: 999px;               /* conserva el estilo pill actual */
--btn-ring: 3px solid var(--focus);
--btn-lift: -2px;
--btn-ease: cubic-bezier(0.2, 0.7, 0.3, 1);
--btn-duration: 180ms;
--btn-shadow-primary: 0 10px 24px -12px rgba(210, 60, 88, 0.5);
--btn-shadow-primary-hover: 0 16px 32px -14px rgba(210, 60, 88, 0.55);
```

### Estados
| Estado | Comportamiento |
|---|---|
| `normal` | Fondo `var(--brand-rose)`, texto `var(--color-white)` (contraste ≈ 4.6:1, AA) |
| `:hover` | Fondo `var(--color-fuchsia-dark)` `#A52640`, elevación `-2px`, sombra crece |
| `:active` | Elevación 0 (`translateY(0)`), sombra vuelve a la base (sensación de pulsación) |
| `:focus-visible` | Anillo `--btn-ring` con `outline-offset: 3px` |
| `:disabled` / no configurado | Opacidad 0.55, `cursor: not-allowed`, sin transform; se acompaña de texto explicativo |

### Accesibilidad
- Altura mínima 48 px (objetivo ≥ 44×44); `font-size` y padding legibles.
- Texto blanco sobre rosa ≥ 4.5:1 (verificado ≈ 4.64:1).
- El foco no depende del hover: siempre visible con teclado.
- `prefers-reduced-motion`: eliminar `transform` y sombra animada.

### Transición
`transform`, `background-color`, `box-shadow` en `180ms` con `--btn-ease`.
Sin animación en `prefers-reduced-motion`.

### HTML semántico
```html
<!-- Navegación / conversión externa: <a> -->
<a class="fs-btn fs-btn--primary" data-whatsapp href="#">Quiero comenzar</a>

<!-- Acción dentro de formulario: <button> con type -->
<button class="fs-btn fs-btn--primary" type="submit">Me interesa</button>
```

### CSS original
```css
.fs-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.55rem;
  min-height: var(--btn-min-height);
  padding: 0.85rem var(--btn-pad-x);
  border: 2px solid transparent;
  border-radius: var(--btn-radius);
  font-weight: 700;
  font-size: var(--fs-small);
  line-height: 1.2;
  text-decoration: none;
  cursor: pointer;
  transition:
    background-color var(--btn-duration) var(--btn-ease),
    box-shadow var(--btn-duration) var(--btn-ease),
    transform var(--btn-duration) var(--btn-ease);
}

.fs-btn--primary {
  background: var(--brand-rose);
  color: var(--color-white);
  box-shadow: var(--btn-shadow-primary);
}

.fs-btn--primary:hover {
  background: var(--color-fuchsia-dark);
  transform: translateY(var(--btn-lift));
  box-shadow: var(--btn-shadow-primary-hover);
}

.fs-btn--primary:active {
  transform: translateY(0);
  box-shadow: var(--btn-shadow-primary);
}

.fs-btn--primary:focus-visible {
  outline: var(--btn-ring);
  outline-offset: 3px;
}

.fs-btn:disabled,
.fs-btn[aria-disabled="true"] {
  opacity: 0.55;
  cursor: not-allowed;
  transform: none;
}

@media (prefers-reduced-motion: reduce) {
  .fs-btn {
    transition: none;
  }
  .fs-btn:hover {
    transform: none;
  }
}
```

### Riesgo a evitar
- Usar rosa como fondo dominante en toda la página; limitar el rosa a las
  acciones.
- Elevación exagerada o sombra que "flota"; la elevación debe ser sutil.
- Hacer clicable el botón con número WhatsApp placeholder (debe quedar disabled).

---

## 2. Botón secundario — `.fs-btn--outline`

Fondo transparente, borde rosa, para exploración y acciones de segundo nivel.

### Propósito
"Ver servicios", anclas de exploración y CTAs de tarjetas no destacadas.

### Cuándo usarlo
- Acciones secundarias junto a un primario.
- Tarjetas de servicio sin seguimiento (no destacadas).
- Cuando se necesita una acción clara pero de menor peso visual.

### Cuándo no usarlo
- Para la acción principal de conversión.
- Sobre superficies rosa o salmón (el borde rosa pierde contraste; usar oscuro).
- Para acciones de cancelación en formularios (usar enlace de texto).

### Variables CSS necesarias
```css
--btn-outline-border: var(--brand-rose);        /* #D23C58, borde UI ≥ 3:1 */
--btn-outline-text: var(--color-fuchsia-dark);  /* #A52640, texto ≥ 4.5:1 */
--btn-outline-hover-bg: #FCE7E8;                /* rosa muy claro (blush-100) */
```

### Estados
| Estado | Comportamiento |
|---|---|
| `normal` | Transparente, borde 2px rosa, texto `--btn-outline-text` (≈ 7.1:1 sobre blanco) |
| `:hover` | Fondo `--btn-outline-hover-bg`, mantiene borde, elevación sutil `-2px` |
| `:active` | `translateY(0)`, fondo algo más profundo (`#F5CFD1` blush-200) |
| `:focus-visible` | Anillo `--btn-ring` con offset 3px |
| `:disabled` | Opacidad 0.55, `cursor: not-allowed`, sin transform |

### Accesibilidad
- El borde rosa sobre blanco cumple 3:1 para límites de componente interactivo.
- El texto rosa oscuro cumple 4.5:1 para texto normal (≈ 7.1:1).
- El estado no se comunica solo con color: el cursor, el borde y el fondo
  cambian juntos.

### Transición
`background-color`, `border-color`, `transform` en `180ms` `--btn-ease`.
Sin animación en `prefers-reduced-motion`.

### HTML semántico
```html
<a class="fs-btn fs-btn--outline" href="#servicios">Ver servicios</a>
```

### CSS original
```css
.fs-btn--outline {
  background: transparent;
  color: var(--btn-outline-text);
  border-color: var(--btn-outline-border);
}

.fs-btn--outline:hover {
  background: var(--btn-outline-hover-bg);
  transform: translateY(var(--btn-lift));
}

.fs-btn--outline:active {
  background: #F5CFD1;
  transform: translateY(0);
}

.fs-btn--outline:focus-visible {
  outline: var(--btn-ring);
  outline-offset: 3px;
}
```

### Riesgo a evitar
- Mantener el borde claro actual (`--color-border-strong`, ~1.5:1), que no
  cumple 3:1 como límite de control; usar borde rosa.
- Texto rosa `#D23C58` pequeño sobre blanco (≈ 4.6:1, sí cumple, pero rosa
  oscuro `#A52640` es más seguro); nunca texto rosa sobre rosa.
- Cambiar el borde en hover sin mantener contraste del texto.

---

## 3. Botón oscuro — `.fs-btn--dark`

Negro `#000001`, texto blanco. CTA final sobre superficies claras o salmón.

### Propósito
Cierre de conversión ("Quiero comenzar", "Hablar por WhatsApp") cuando la
sección es clara o salmón y un botón rosa más competiría con el fondo.

### Cuándo usarlo
- Panel CTA final sobre fondo claro o salmón.
- Cuando el primario rosa y la superficie de fondo compiten visualmente.

### Cuándo no usarlo
- Sobre superficies rosa/oscura (usar primario o WhatsApp).
- Para acciones de exploración.

### Variables CSS necesarias
```css
--btn-dark: var(--brand-black);       /* #000001 */
--btn-dark-hover: #24181E;            /* negro con tinte rosa, sutil */
--btn-shadow-dark: 0 12px 26px -14px rgba(0, 0, 0, 0.5);
```

### Estados
| Estado | Comportamiento |
|---|---|
| `normal` | Fondo `#000001`, texto blanco (≈ 21:1) |
| `:hover` | Fondo `--btn-dark-hover`, elevación `-2px`; sin zoom |
| `:active` | `translateY(0)` |
| `:focus-visible` | Anillo `--btn-ring` (sobre oscuro se prefiere anillo blanco/rosa claro) |
| `:disabled` | Opacidad 0.55, `cursor: not-allowed` |

### Accesibilidad
- Sobre salmón, el botón negro tiene contraste de borde ≈ 6.7:1 con la
  superficie; el texto blanco sobre negro ≈ 21:1.
- **Nunca** texto blanco directo sobre salmón (≈ 3.1:1, falla AA en texto
  normal): el botón debe ser una superficie propia.
- Foco visible claro al estar sobre fondos oscuros o claros.

### Transición
`background-color`, `transform` en `180ms` `--btn-ease`; hover sin zoom.

### HTML semántico
```html
<a class="fs-btn fs-btn--dark" data-whatsapp href="#">Hablar por WhatsApp</a>
```

### CSS original
```css
.fs-btn--dark {
  background: var(--btn-dark);
  color: var(--color-white);
  box-shadow: var(--btn-shadow-dark);
}

.fs-btn--dark:hover {
  background: var(--btn-dark-hover);
  transform: translateY(var(--btn-lift));
}

.fs-btn--dark:active {
  transform: translateY(0);
}

.fs-btn--dark:focus-visible {
  outline: 3px solid #FFFFFF;
  outline-offset: 3px;
}
```

### Riesgo a evitar
- Zoom o escala en hover (prohibido el "zoom exagerado").
- Usar negro cuando la sección ya es muy oscura.
- Confundirlo con el botón de WhatsApp por cercanía visual.

---

## 4. Botón de WhatsApp — `.fs-btn--whatsapp`

Verde WhatsApp accesible, texto oscuro `#000001`, con icono.

### Propósito
Iniciar conversación por WhatsApp con mensaje precompuesto; es el CTA
estratégico del sitio.

### Cuándo usarlo
- Hero (acción primaria), panel CTA final, confirmación de formulario.
- Cualquier conversión que requiera mensaje específico del servicio.

### Cuándo no usarlo
- Si el número oficial no está configurado (debe verse deshabilitado con
  explicación, nunca un enlace muerto).
- Para acciones sin relación con WhatsApp.

### Variables CSS necesarias
```css
--color-whatsapp: #25D366;        /* existente */
--color-whatsapp-dark: #1FBB5A;   /* existente */
--color-whatsapp-text: #000001;   /* existente */
--btn-shadow-whatsapp: 0 12px 24px -12px rgba(37, 211, 102, 0.45);
```

### Estados
| Estado | Comportamiento |
|---|---|
| `normal` | Fondo `--color-whatsapp`, texto `#000001` (≈ 10.6:1) |
| `:hover` | Fondo `--color-whatsapp-dark`, elevación `-2px` |
| `:active` | `translateY(0)` |
| `:focus-visible` | Anillo de contraste sobre el verde (outline oscuro o blanco) |
| `disabled` / número no válido | Opacidad 0.55, `aria-disabled="true"`, `tabindex` gestionado, sin href activo; texto auxiliar "Contacto en configuración" |

### Accesibilidad
- Icono `aria-hidden="true"`; el texto es el nombre accesible.
- El color no es la única señal: si el número es placeholder, el botón se
  deshabilita y se explica.
- JS valida el número antes de componer el enlace; **no abre WhatsApp con un
  número inválido**.

### Transición
`background-color`, `transform` en `180ms` `--btn-ease`.

### HTML semántico
```html
<a
  class="fs-btn fs-btn--whatsapp"
  data-whatsapp
  href="#"
  target="_blank"
  rel="noopener noreferrer"
>
  <svg class="icon" aria-hidden="true"><use href="#icon-whatsapp" /></svg>
  Hablar por WhatsApp
</a>
```

### CSS original
```css
.fs-btn--whatsapp {
  background: var(--color-whatsapp);
  color: var(--color-whatsapp-text);
  box-shadow: var(--btn-shadow-whatsapp);
}

.fs-btn--whatsapp:hover {
  background: var(--color-whatsapp-dark);
  transform: translateY(var(--btn-lift));
}

.fs-btn--whatsapp:active {
  transform: translateY(0);
}

.fs-btn--whatsapp:focus-visible {
  outline: 3px solid var(--color-whatsapp-text);
  outline-offset: 3px;
}
```

### Riesgo a evitar
- Mostrar un botón de WhatsApp clicable cuando `whatsappNumber` sigue en
  `593XXXXXXXXX` (viola `docs/PROJECT_BRIEF.md`).
- Icono sin `aria-hidden` (lector duplicaría el nombre).
- Verde con texto blanco (contraste insuficiente: ≈ 2.2:1); el texto debe ser
  oscuro.

---

## 5. Enlace de texto — `.fs-text-link`

Subrayado rosa animado que funciona sin hover y con teclado.

### Propósito
"Ver servicios", "Ver detalles", enlaces dentro de párrafos, política/footer.
Exploración sin peso de botón.

### Cuándo usarlo
- Acciones de descubrimiento de menor jerarquía.
- Enlaces inline dentro de texto.
- "Ver más" que no requiere botón.

### Cuándo no usarlo
- Para la conversión principal.
- Para acciones que parecen botones (si parece botón, debe ser botón).

### Variables CSS necesarias
```css
--text-link-color: var(--color-fuchsia-dark);  /* #A52640 */
--text-link-underline: var(--brand-rose);      /* #D23C58 */
--text-link-thickness: 2px;
```

### Estados
| Estado | Comportamiento |
|---|---|
| `normal` | Texto rosa oscuro, subrayado rosa visible (no solo en hover) |
| `:hover` | Subrayado se anima de izquierda a derecha (crece) |
| `:active` | El subrayado permanece; color se oscurece a `--color-fuchsia-deep` |
| `:focus-visible` | Anillo `--btn-ring` con offset; no ocultar el subrayado |
| `:disabled` | No aplica (los enlaces no se deshabilitan; usar botón si se necesita estado) |

### Accesibilidad
- El subrayado **es visible por defecto**: el enlace se entiende sin hover
  (crítico en móvil).
- Texto rosa oscuro ≥ 4.5:1.
- En `prefers-reduced-motion`, el subrayado es estático (siempre visible).
- El nombre del enlace es descriptivo ("Ver servicios", nunca "aquí").

### Transición
`background-size` o `border` en `180ms` `--btn-ease`; solo decora el
subrayado, nunca mueve el texto.

### HTML semántico
```html
<a class="fs-text-link" href="pages/servicios.html">Ver todos los servicios</a>
```

### CSS original
```css
.fs-text-link {
  color: var(--text-link-color);
  text-decoration: none;
  font-weight: 600;
  padding-bottom: 0.1em;
  background-image: linear-gradient(var(--text-link-underline), var(--text-link-underline));
  background-size: 100% 2px;
  background-repeat: no-repeat;
  background-position: 0 100%;
  transition: background-size var(--btn-duration) var(--btn-ease);
}

.fs-text-link:hover {
  background-size: 100% var(--text-link-thickness);
}

.fs-text-link:active {
  color: var(--color-fuchsia-deep);
}

.fs-text-link:focus-visible {
  outline: var(--btn-ring);
  outline-offset: 3px;
}

@media (prefers-reduced-motion: reduce) {
  .fs-text-link {
    transition: none;
    background-size: 100% var(--text-link-thickness);
  }
}
```

### Riesgo a evitar
- Subrayado que solo aparece en hover (en móvil no hay hover).
- Eliminar el subrayado del enlace en favor del color únicamente.
- Subrayado animado desplazando el texto (layout shift).

---

## Tabla de mapeo: botones actuales → patrones propuestos

| Componente actual | Dónde se usa hoy | Patrón propuesto | Nota de mejora |
|---|---|---|---|
| `.btn-primary` (rosa/blanco) | Nav CTA "Comenzar ahora", tarjetas destacadas (Rutina con seguimiento, Plan alim. con seguimiento), hero "Ver servicios" | `.fs-btn--primary` | En el hero, "Ver servicios" debería ser `.fs-btn--outline` (acción secundaria). Nav CTA y tarjetas destacadas permanecen primarios. |
| `.btn-secondary` (blanco/borde claro) | Tarjetas sin seguimiento (Rutina PDF sin seguimiento, Plan alim. sin seguimiento, Asesoría) | `.fs-btn--outline` | Cambiar el borde claro `--color-border-strong` (≈1.5:1) por borde rosa (≥3:1) y hover con rosa muy claro. |
| `.btn-whatsapp` (verde) | Hero acción principal, panel CTA final, modal confirmar | `.fs-btn--whatsapp` | Añadir estado disabled/`aria-disabled` cuando `whatsappNumber` es placeholder; icono con `aria-hidden`; validar número antes de abrir. |
| `.btn-ghost` (transparente) | Modal "Cancelar" | Fuera del alcance de las 5 propuestas; conservar como variante quiet | Opcional: sustituir por `.fs-text-link` para acciones de cancelación. |
| `.btn-block` / `.btn-lg` | Modificadores de ancho y tamaño | Mantener como modificadores del sistema (`.fs-btn--block`, `.fs-btn--lg`) | Sin cambios de comportamiento. |
| Enlaces de texto (`.nav-link`, footer, "Ver detalle") | Navegación y exploración | `.fs-text-link` para enlaces inline; `.nav-link` se conserva | Aplicar subrayado visible en enlaces inline; no en la navegación principal. |

## Verificaciones realizadas (solo estáticas)
- Referencia UIverse devolvió HTTP 403; el análisis usa solo la clasificación
  pública del catálogo (gradientes, neón, 3D, brillos, neumorfismo,
  glassmorphism, ripple, magnetic). No se copió código ni diseño.
- Contrastes calculados sobre `#FFFDFB`/superficies de marca:
  blanco/rosa `#D23C58` ≈ 4.64:1 · rosa oscuro `#A52640` ≈ 7.1:1 ·
  negro/verde WhatsApp `#25D366` ≈ 10.6:1 · negro/salmón `#D07A75` ≈ 6.7:1 ·
  blanco/salmón ≈ 3.1:1 (no usar para texto normal).
- No se modificó ningún archivo del sitio.

## Pendientes para implementar (fuera de este documento)
- Acordar nombres finales de clases (`fs-*` vs mantener `btn-*`) con el dueño.
- Prueba en navegador (360, 390, 768, 1024, 1440 px) y teclado.
- Confirmar número oficial de WhatsApp para habilitar el botón de conversión.
