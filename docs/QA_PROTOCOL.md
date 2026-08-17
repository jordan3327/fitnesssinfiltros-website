# QA Protocol — Fitness Sin Filtros

## Purpose

Use this checklist before accepting an AI change and before deploying. Mark observations honestly. If a check cannot be performed, record it as unverified rather than passed.

## 1. Static review

- Confirm HTML references correct CSS and JS files.
- Confirm paths work from `index.html` and every page under `pages/`.
- Search for placeholder values: `593XXXXXXXXX`, `[PENDIENTE_CLIENTE`, `TODO`, `FIXME`.
- Search for `href="#"`, inline handlers, duplicate IDs, and `javascript:` URLs.
- Compare all prices with `docs/PROJECT_BRIEF.md`.
- Confirm no secret keys or access tokens appear in code.

## 2. Browser manual smoke test

Test in a current Chromium browser and, if possible, a second browser.

| Scenario | Expected result | Status | Notes |
|---|---|---|---|
| Home at 360px | No horizontal scroll; hero CTA reachable | Pending | |
| Mobile menu | Opens, closes, keyboard accessible | Pending | |
| Service CTA | Correct service included in WhatsApp message | Pending | |
| FAQ | Mouse and keyboard toggle correctly | Pending | |
| Form invalid | Clear error messages | Pending | |
| Form valid | Explains WhatsApp action before opening | Pending | |
| 768px layout | Grid remains readable | Pending | |
| 1024px layout | Header and cards aligned | Pending | |
| 1440px layout | Content width controlled | Pending | |
| Browser console | No new errors | Pending | |

## 3. Keyboard pass

- Tab from browser chrome through first interactive item.
- Verify skip link if implemented.
- Verify visible focus on every control.
- Open/close mobile menu and FAQ with keyboard.
- Submit form with keyboard.
- Confirm no focus trap and no invisible focus target.

## 4. Content and trust pass

- Confirm all testimonials are authorized or visibly placeholders.
- Confirm no fake social profiles, numbers, addresses, or qualifications.
- Confirm nutrition language does not become clinical advice.
- Confirm price text, currency symbol, and “por sesión” labels are correct.
- Confirm empty/pending business information does not look like completed data.

## 5. Launch pass

- Replace placeholders.
- Add production favicon, social image, canonical URL, and verified domain URLs.
- Configure actual WhatsApp number.
- Check HTTPS after hosting/DNS connection.
- Test both apex and `www` domain behavior.
- Run one final mobile device test.
- Create a Git commit/tag before deployment.
