# AGENTS.md — Fitness Sin Filtros

## Mission

Build and improve a premium, conversion-focused static website for **Fitness Sin Filtros**. It offers individualized fitness coaching, workout PDFs, meal plans, and one-hour consultations. The primary conversion is a qualified WhatsApp conversation—not a fake checkout or invented scheduling flow.

Read these files before planning or editing:

1. `DESIGN_SYSTEM.md`
2. `docs/PROJECT_BRIEF.md`
3. `docs/CONTENT_SOURCE.md`
4. `docs/ACCEPTANCE_CRITERIA.md`
5. `docs/QA_PROTOCOL.md`

## Non-negotiables

- Inspect first; plan second; edit third; verify last.
- Do not rebuild a working project from scratch.
- Make the smallest safe change that solves the assigned task.
- Do not invent the coach name, WhatsApp number, location, credentials, testimonials, policy terms, payment methods, photos, or social URLs.
- Keep client placeholders explicit: `[PENDIENTE_CLIENTE: descripción]`.
- Do not change confirmed service names or prices without explicit instruction.
- Do not claim health outcomes, guaranteed transformations, rapid weight loss, or medical expertise.
- Do not add a framework, package, CDN, tracker, or dependency unless the task explicitly requires it.
- Keep this project runnable through VS Code Live Server.

## Mandatory workflow

### A. Discovery

Before coding:

- Read the project documents listed above.
- Inspect the relevant HTML, CSS, JavaScript, assets, and existing configuration.
- Identify the exact files to change and any risks.
- State a compact implementation plan.

### B. Implementation

- Use semantic HTML, CSS custom properties, Grid/Flexbox, and vanilla JavaScript.
- Preserve existing conventions unless they are objectively broken.
- Centralize editable business data in `js/config.js` or the project’s current equivalent.
- Use relative paths that work from every page under `pages/`.
- Keep HTML, CSS, and JavaScript separated. Do not use inline event handlers.

### C. Verification

After every task:

- Check referenced asset, CSS, JS, and page paths.
- Check likely JavaScript null errors and duplicate event listeners.
- Validate each changed interactive control by reasoning through click and keyboard flow.
- Check 360, 390, 768, 1024, and 1440 px layouts.
- Check no horizontal scrolling is introduced.
- Check focus visibility, labels, alt text, heading hierarchy, and contrast intent.
- Compare service prices against `docs/CONTENT_SOURCE.md`.
- Report what was verified, what was not executable, and remaining placeholders.

## Technical standards

### HTML

- `lang="es"`; one `h1` per page; logical heading order.
- Use `button` for UI actions and `a` for navigation.
- Use visible `<label>` elements for form fields.
- Every image has useful `alt`; decorative images use empty `alt` and/or `aria-hidden="true"`.
- Mobile menu and FAQ accordions must expose their state with `aria-expanded`.
- Use descriptive link names—never “click aquí”.

### CSS

- Mobile-first.
- Use design tokens from `DESIGN_SYSTEM.md`; no random hex colors.
- Respect `prefers-reduced-motion`.
- Keep touch targets at least roughly 44 × 44 CSS pixels.
- Do not use pale rose as normal-size body text on white or cream.
- Do not rely on color alone to convey status.

### JavaScript

- Use `const`/`let`, not `var`.
- Guard DOM queries before binding listeners.
- Avoid globals; use a single configuration object.
- Never place secrets in frontend code.
- No backend simulation. A form may validate and compose a WhatsApp message only.
- Encode WhatsApp messages with `encodeURIComponent`.

## Information architecture

The homepage must prioritize this sequence:

1. Clear personal-coaching value proposition and primary CTA.
2. Trust/personalization explanation.
3. Service cards and transparent prices.
4. Simple process.
5. Benefits and appropriate social proof placeholders.
6. FAQ that removes buying friction.
7. WhatsApp CTA and footer.

## Visual quality bar

The visual direction is elevated editorial wellness—not a generic gym template.

- Use warm off-white surfaces, charcoal text, controlled rose accents, large whitespace, refined type, soft rounded geometry, and restrained motion.
- Use real supplied photography where available. If absent, use clearly labelled temporary placeholders only.
- No neon gradients, excessive glassmorphism, noisy blobs, emoji-as-icons, carousels, or autoplay video.
- The primary accent `#D23C58` is powerful: use it deliberately for actions and emphasis, not as the background of every section.

## Response format after each task

Return:

1. **Cambios realizados**
2. **Archivos modificados**
3. **Verificaciones realizadas**
4. **Pendientes / placeholders**
5. **Siguiente paso recomendado**

Never say “everything works” without identifying what was actually checked.
