# Acceptance Criteria — Fitness Sin Filtros

## Functional requirements

### Navigation

- [ ] Home logo returns to the home page.
- [ ] Navigation links resolve correctly from both root and `pages/` paths.
- [ ] Mobile navigation is a real button with `aria-expanded`.
- [ ] Closing the menu restores a sensible focus state.
- [ ] Clicking a mobile navigation link closes the menu.
- [ ] No critical navigation relies on JavaScript only.

### Services and conversion

- [ ] All six confirmed services appear with exact labels and prices.
- [ ] Every service indicates follow-up accurately.
- [ ] Each conversion control creates a service-specific WhatsApp message.
- [ ] Messages are URL encoded.
- [ ] WhatsApp configuration is centralized.
- [ ] An unfinished placeholder number is not publicly presented as a valid contact number.

### FAQ and forms

- [ ] FAQ buttons work with mouse, Enter, and Space.
- [ ] State is exposed through `aria-expanded`.
- [ ] Contact fields have visible labels.
- [ ] Required fields have understandable inline validation messages.
- [ ] Valid form submission clearly explains that WhatsApp will open.
- [ ] The site never claims to have stored or sent a form to a backend when none exists.

## Visual requirements

- [ ] The first screen communicates individualized fitness guidance and a next action.
- [ ] The design respects the rose/black/salmon palette without oversaturating the page.
- [ ] A visitor can see services/prices without excessive scrolling or guessing.
- [ ] There is no horizontal scroll at 320, 360, 390, 768, 1024, or 1440 px.
- [ ] Tap targets are usable on touch screens.
- [ ] Text remains readable over every image and accent surface.
- [ ] Cards, spacing, and headings remain visually consistent.
- [ ] Motion is nonessential and reduced for `prefers-reduced-motion`.

## Accessibility requirements

- [ ] Pages declare `lang="es"`.
- [ ] Only one `h1` exists per page.
- [ ] Heading order is logical.
- [ ] All focusable elements visibly show focus.
- [ ] Keyboard navigation is possible without traps.
- [ ] Images have appropriate alt behavior.
- [ ] Normal text color combinations target 4.5:1 contrast.
- [ ] Large text and UI boundaries target 3:1 contrast.
- [ ] Color alone does not convey selected/required/error status.

## SEO and performance requirements

- [ ] Each page has a unique title and useful meta description.
- [ ] Viewport meta tag exists.
- [ ] Open Graph metadata uses placeholders until real social image/URLs are supplied.
- [ ] No fake structured data about a named person, location, rating, or review.
- [ ] Noncritical images are lazy loaded.
- [ ] Intrinsic dimensions are set where possible to reduce layout shifts.
- [ ] No unused heavy libraries or unnecessary third-party scripts.

## Content integrity requirements

- [ ] No false testimonials or fake names.
- [ ] No unapproved coach identity or credential.
- [ ] No guarantee, extreme dieting claim, or medical claim.
- [ ] Medical/nutrition boundary notice appears where appropriate.
- [ ] All visible placeholders are tracked for replacement before launch.

## Done definition

A task is done only when the changed requirement is implemented, checked against this document, and documented in the agent response. A production launch is not approved while contact details, legal content, key imagery, or essential placeholders remain unresolved.
