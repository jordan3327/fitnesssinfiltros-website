# Fitness Sin Filtros — AI Design & Build Blueprint

This package is a high-context guide for OpenCode + DeepSeek while building or improving the Fitness Sin Filtros website. It is designed to make an existing static project more consistent, professional, accessible, and conversion-focused.

## Contents

```text
fitness-sin-filtros-ai-blueprint/
├── AGENTS.md
├── DESIGN_SYSTEM.md
├── README.md
├── docs/
│   ├── PROJECT_BRIEF.md
│   ├── CONTENT_SOURCE.md
│   ├── ACCEPTANCE_CRITERIA.md
│   └── QA_PROTOCOL.md
└── .opencode/
    ├── agents/
    │   ├── frontend-review.md
    │   ├── visual-qa.md
    │   └── accessibility-review.md
    ├── commands/
    │   ├── audit.md
    │   ├── build-section.md
    │   └── final-qa.md
    └── skills/
        └── fitness-web/
            └── SKILL.md
```

## Installation

Copy the contents of this package into the root of the existing Fitness Sin Filtros project.

Recommended target structure:

```text
fitnesssinfiltros.com/
├── AGENTS.md
├── DESIGN_SYSTEM.md
├── docs/
├── .opencode/
├── assets/
├── css/
├── js/
├── pages/
└── index.html
```

If files with the same names already exist, compare them before overwriting. Preserve client-specific facts and existing working configuration.

## Recommended OpenCode sequence

1. Open the **project root**, not a subfolder.
2. Run the audit prompt below.
3. Review the output before allowing changes.
4. Implement in small sections, not as one massive rewrite.
5. Run final QA before deployment.

### Audit prompt

```text
Read AGENTS.md, DESIGN_SYSTEM.md, and every file inside docs/.

This is an existing Fitness Sin Filtros website. Do not rebuild it and do not modify files yet.

Inspect all HTML, CSS, JavaScript, assets, configuration, and nested pages. Create a prioritized audit of structure, routes, interaction behavior, design consistency, responsive risks, accessibility, SEO, performance, confirmed prices, and client-data placeholders.

For each issue, provide severity, file, approximate location, user impact, and smallest safe fix. Then give a phased correction plan.

Do not invent client data. Do not claim browser testing unless you actually ran it.
```

### Implementation prompt

```text
Implement only this approved task: [DESCRIBE ONE SECTION OR ONE FIX].

Before editing, read AGENTS.md, DESIGN_SYSTEM.md, and relevant docs. Inspect existing code and identify the minimum files to modify.

Keep all confirmed Fitness Sin Filtros prices unchanged. Do not invent client data. Follow the response format in AGENTS.md and verify the applicable acceptance criteria after the change.
```

### Final QA prompt

```text
Perform release-readiness QA without editing first. Read all guidance files and inspect the entire website.

Return PASS, FAIL, or UNVERIFIED for navigation, pricing, WhatsApp configuration, forms, keyboard use, responsive behavior, contrast intent, alt text, metadata, placeholders, and launch risks. List exact fixes required before deployment.
```

## Client inputs still needed before launch

- Official WhatsApp number.
- Trainer identity, photo, biography, and verified credentials.
- Social profiles.
- Delivery timeline and follow-up scope.
- Payment and cancellation policies.
- Testimonials with authorization.
- Actual location/modality and availability.
- Legal/privacy wording.

## Research basis

The blueprint reflects recurring modern fitness-site guidance: mobile-first navigation and large tap targets; clear pricing/services and short contact/booking paths; authentic trust evidence; performance-focused imagery; and accessible contrast. WCAG targets normal text at 4.5:1 and large text/UI components at 3:1.
