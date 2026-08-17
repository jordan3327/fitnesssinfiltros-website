# Design System — Fitness Sin Filtros

## Brand intent

Fitness Sin Filtros should feel premium, personal, contemporary, reassuring, and energetic. It is not an aggressive bodybuilding site. It should make a visitor feel: “this service understands my real life and will guide me with clarity.”

## Design references distilled

Modern high-performing fitness sites generally prioritize mobile usability, a clear first-screen CTA, transparent services/pricing, authentic trust signals, and short paths to booking or contact. Modern visual patterns include bold type, strong but controlled contrast, spacious layouts, and restrained micro-interactions. The implementation must remain accessible and fast.

## Core palette

These client-provided colors are mandatory brand anchors:

```css
:root {
  --brand-rose: #D23C58;
  --brand-black: #000001;
  --brand-salmon: #D07A75;
}
```

### Extended semantic palette

```css
:root {
  --ink: #171318;
  --ink-muted: #635C63;
  --ink-subtle: #817780;

  --paper: #FFFDFB;
  --cream: #FAF4F1;
  --blush-50: #FFF5F5;
  --blush-100: #FCE7E8;
  --blush-200: #F5CFD1;

  --rose-700: #A52640;
  --rose-800: #7D1D32;
  --salmon-700: #9D514E;

  --border: #E8D8D8;
  --border-strong: #D5B9BC;
  --surface: #FFFFFF;
  --surface-dark: #151013;
  --surface-dark-soft: #21191D;

  --success: #256A50;
  --warning: #8A5A00;
  --focus: #1C63D5;

  --shadow-sm: 0 4px 16px rgba(29, 18, 23, .06);
  --shadow-md: 0 16px 40px rgba(29, 18, 23, .10);
  --shadow-lg: 0 24px 64px rgba(88, 23, 40, .16);
}
```

### Accessibility rules for color

- Use `--ink` or `--brand-black` on light surfaces for body text.
- Use white text on `--brand-rose`, `--rose-700`, or dark surfaces only after checking contrast.
- `--brand-salmon` is a surface/accent color; do not use it as small text on light backgrounds.
- WCAG AA target: 4.5:1 for normal text, 3:1 for large text and UI boundaries.
- Focus rings use `--focus` with an offset so they remain visible on rose and cream surfaces.

## Typography

Use a two-family system only if the website loads fonts efficiently:

- Display: `DM Serif Display`, `Playfair Display`, or equivalent refined serif for a limited number of editorial headlines.
- Body/UI: `Manrope`, `Inter`, or a reliable system stack.

Fallback system stack:

```css
--font-sans: Inter, Manrope, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
--font-display: "DM Serif Display", Georgia, serif;
```

Rules:

- Serif is for emotional hierarchy, not paragraphs, prices, forms, navigation, or FAQ answers.
- Do not use cursive/script fonts for core content.
- Body line-height: 1.6 to 1.75.
- Use `clamp()` for major headings.

```css
--step--1: clamp(.82rem, .78rem + .15vw, .9rem);
--step-0: clamp(1rem, .95rem + .25vw, 1.125rem);
--step-1: clamp(1.25rem, 1.15rem + .55vw, 1.6rem);
--step-2: clamp(1.6rem, 1.35rem + 1.2vw, 2.45rem);
--step-3: clamp(2.15rem, 1.7rem + 2.4vw, 4rem);
--step-4: clamp(2.7rem, 2.1rem + 4vw, 5.9rem);
```

## Spacing, shape, and layout

```css
:root {
  --space-1: .25rem;
  --space-2: .5rem;
  --space-3: .75rem;
  --space-4: 1rem;
  --space-5: 1.5rem;
  --space-6: 2rem;
  --space-7: 3rem;
  --space-8: 4.5rem;
  --space-9: 6.5rem;
  --space-10: 9rem;

  --radius-sm: .75rem;
  --radius-md: 1.125rem;
  --radius-lg: 1.5rem;
  --radius-xl: 2rem;
  --radius-pill: 999px;

  --content-max: 75rem;
  --content-narrow: 48rem;
}
```

- Container: `width: min(calc(100% - 2rem), var(--content-max)); margin-inline: auto;`.
- Mobile page gutters: at least 1rem; desktop gutters: 2rem or more.
- Section spacing: use `clamp(4.5rem, 8vw, 8rem)` rather than fixed large values.
- Keep line length around 45–75 characters for body copy.

## Components

### Header

- Sticky but restrained, with a subtle border/blur only if readable.
- Logo left; simple navigation and CTA right on desktop.
- Accessible menu button on mobile.
- CTA label: “Hablar por WhatsApp” or “Comenzar”, never vague “Enviar”.

### Hero

- One clear `h1`.
- Eyebrow may read “Fitness personalizado · Sin extremos”.
- Headline should be 6–14 words, followed by concise supporting copy.
- Two actions: primary WhatsApp/conversion and secondary services anchor.
- Visual: supplied coach or fitness imagery; avoid overly sexualized stock photography.
- Use a cream/light layout with a strong photo frame or dark editorial block—not a busy collage.

### Service cards

- Title, plain-language purpose, price, follow-up status, CTA.
- Use a `<ul>` only for confirmed inclusions.
- Visually highlight the two follow-up options with a “Más acompañado” label—not pressure language.
- Prices should have tabular numbers if possible.
- Do not force every card to equal height if content becomes awkward.

### Process

- Four numbered steps, visually simple and scannable.
- Avoid complex timeline behavior that fails on mobile.

### Trust / testimonials

- Only authorized testimonials appear as real testimonials.
- Development placeholders must visibly say “Testimonio pendiente de autorización”.
- Avoid fabricated outcome numbers, before/after claims, and medical implications.

### FAQ

- Use button controls; large touch areas; clear plus/minus or chevron that is not the only state indicator.

### CTA panel

- Use dark surface or brand rose with enough contrast.
- One focused ask; reinforce that the first conversation helps choose the right service.

## Motion

- Keep motion subtle: opacity/transform entries ≤ 450ms.
- No important content hidden until JavaScript runs.
- Never animate layout shifts or use scroll-jacking.
- Disable/reduce via `@media (prefers-reduced-motion: reduce)`.

## Responsive intent

- 320–390px: single column; no clipped image, menu, or buttons.
- 768px: service grid can become two columns.
- 1024px+: hero and major two-column layouts allowed.
- 1440px+: preserve whitespace; do not let cards span uncomfortably wide.

## Avoid

- Generic “beast mode” gym language.
- Neon black/red gym aesthetic.
- More than two decorative motifs per section.
- Constant pink backgrounds.
- Aggressive popups or countdowns.
- Sliders/carousels for critical content.
- Unverified transformation claims.
