# Design System Direction and Responsive Wireframes

This is an implementation foundation, not a final art direction. It translates the approved “premium, technically serious product studio” direction into reusable constraints while leaving final page copy and imagery subject to proof approval.

## Experience principles

- Business outcome before implementation detail.
- Evidence before decoration.
- Calm, high-contrast hierarchy; no hacker-terminal agency identity.
- Product/workflow imagery rather than generic stock imagery.
- Founder accountability is visible without turning the agency home into a résumé.
- Light, dark, and system themes are first-class and equally usable.
- Motion explains sequence or relationship; it never delays access.

## Token foundation

Suggested semantic tokens:

```css
:root,
[data-theme="light"] {
  color-scheme: light;
  --canvas: #f4f3ee;
  --surface: #fbfaf6;
  --surface-raised: #ffffff;
  --text: #101a2b;
  --text-muted: #526071;
  --border: #d7d9d4;
  --brand: #145f7a;
  --brand-strong: #0d465d;
  --accent: #a9782c;
  --focus: #087ea4;
  --success: #18794e;
  --danger: #b42318;
}

[data-theme="dark"] {
  color-scheme: dark;
  --canvas: #08111f;
  --surface: #0d1929;
  --surface-raised: #132238;
  --text: #eef2f6;
  --text-muted: #a5b2c1;
  --border: #26384f;
  --brand: #52b8d4;
  --brand-strong: #87d4e7;
  --accent: #d1a459;
  --focus: #73d0e7;
  --success: #5bc394;
  --danger: #ff8a80;
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    color-scheme: dark;
    /* map to the same dark values */
  }
}
```

Values must pass WCAG 2.2 AA contrast in their actual pairings; the palette above is a starting contract, not a substitute for automated and visual contrast validation.

### Scale

- Spacing: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128px.
- Radius: 8px controls, 12px compact cards, 20px primary cards, 999px badges only.
- Borders: 1px default; avoid low-opacity borders that disappear in light mode.
- Shadow: one subtle elevation level; use borders and spacing before glow.
- Content measure: 65–72 characters for prose.
- Touch target: minimum 44×44px.

## Typography

Reuse the installed fonts from `src/app/layout.tsx`:

- Syne: brand wordmark and selected display headlines.
- Geist: navigation, body, UI, and long-form case studies.
- JetBrains Mono: small evidence labels, system annotations, and code only.

Responsive type targets:

| Role | Mobile | Desktop | Line height |
|---|---:|---:|---:|
| Display | 40px | 72px | 1.0–1.08 |
| H1 interior | 36px | 56px | 1.08–1.15 |
| H2 | 30px | 44px | 1.15 |
| H3 | 22px | 28px | 1.25 |
| Lead | 18px | 21px | 1.55 |
| Body | 16px | 18px | 1.65 |
| Small/metadata | 13px | 14px | 1.45 |

Use `clamp()` for fluid display sizes. Do not encode hierarchy only through color or uppercase mono labels.

## Layout framework

- Mobile baseline: 320px+, 16px inline padding.
- Small: 640px+, 24px padding.
- Tablet: 768px+, selective two-column layouts.
- Desktop: 1024px+, 32px padding.
- Wide: 1280px content container; prose remains narrower.
- Section rhythm: 64px mobile, 96–128px desktop.

Primary grid: 12 columns on desktop, 6 on tablet, 4 on mobile. Use CSS Grid for page composition and repeated cards; Flexbox for one-dimensional control groups and alignment.

## Core components

### Site header

- Stable wordmark, route links, theme selector, and one CTA.
- Transparent only when contrast is guaranteed; otherwise use an opaque/stable surface.
- Mobile panel follows dialog-like focus behavior.

### Theme selector

- Three explicit choices: Light, Dark, System.
- Use a labelled group or menu with accurate selected state.
- Persist explicit choice in local storage; System removes the override and follows `prefers-color-scheme` changes.
- Apply the theme before first paint to avoid a flash.
- Never rely on sun/moon icons without text or accessible names.

### Buttons and links

- Primary button: one per decision area.
- Secondary button: visible border; not muted below contrast requirements.
- Text link: underline on hover and focus; external links identify new-window behavior accessibly when used.
- Every interactive state includes hover, focus-visible, active, disabled, loading, success, and error as applicable.

### Case-study card

- Semantic linked article, not a generic clickable `div`.
- Classification/status label, outcome-oriented title, short problem/result line, relevant visual, and text CTA.
- Never show a nonfunctional `#` destination.
- Internal/concept work is visually labelled, not merely filtered.

### Evidence strip

- Two or three verified facts, each linked to its source case study.
- Omit the entire strip when proof is pending; do not substitute vague counters.

### Offer card

- Best-fit buyer, promised outcome, typical duration, scope boundary, and CTA.
- One featured path at most. Pricing is conditional on the commercial decision.

### Form controls

- Visible labels, optional/required markers, descriptions, inline errors, error summary, status announcement, and preserved values after errors.
- Use native inputs/selects/textareas unless a custom control has a clear benefit and complete keyboard support.

## Responsive wireframes

### Agency home — mobile

```text
┌────────────────────────────┐
│ Kepler Dev  Theme  Menu    │
├────────────────────────────┤
│ Buyer/outcome eyebrow      │
│ Outcome-led H1             │
│ Short qualification copy   │
│ [Request review]           │
│ [See selected work]        │
├────────────────────────────┤
│ Verified proof (stacked)   │
├────────────────────────────┤
│ Problem recognition        │
├────────────────────────────┤
│ Connected system diagram   │
│ Solution explanation       │
├────────────────────────────┤
│ Selected work cards        │
├────────────────────────────┤
│ Offer cards                │
├────────────────────────────┤
│ Process steps              │
├────────────────────────────┤
│ Why Kepler / founder       │
├────────────────────────────┤
│ FAQ accordion              │
├────────────────────────────┤
│ Final CTA                  │
└────────────────────────────┘
```

### Agency home — desktop

```text
┌──────────────────────────────────────────────────────────┐
│ Wordmark   Work Services Process About Founder   CTA    │
├──────────────────────────────────────────────────────────┤
│ Outcome-led H1 (7 cols) │ system/product visual (5 cols)│
│ lead + two CTAs          │ evidence-led, not decorative  │
├──────────────────────────────────────────────────────────┤
│ proof 1              proof 2              proof 3        │
├──────────────────────────────────────────────────────────┤
│ problem narrative (5)   │ connected system map (7)       │
├──────────────────────────────────────────────────────────┤
│ selected case study feature + two supporting cards       │
├──────────────────────────────────────────────────────────┤
│ four offer cards / progressive engagement path           │
├──────────────────────────────────────────────────────────┤
│ process timeline        │ why Kepler / scope control      │
├──────────────────────────────────────────────────────────┤
│ founder model (image + disclosure) │ FAQ                 │
├──────────────────────────────────────────────────────────┤
│ final CTA + expectation setting                           │
└──────────────────────────────────────────────────────────┘
```

### Case study — desktop

```text
classification/status
H1 + outcome summary
[role] [team] [platform] [status]
────────────────────────────────
problem (5 cols) | system visual (7 cols)
solution narrative + challenge modules
results/evidence panel
media gallery
related offer + CTA
```

## Motion and feedback

- No mandatory preloader.
- Entrance motion: opacity plus maximum 12px translation, 160–300ms.
- Navigation/menu: 150–220ms.
- System diagram may animate connections once when visible, but remains understandable when static.
- `prefers-reduced-motion: reduce` removes parallax, cursor effects, scroll-driven transforms, and nonessential transitions.
- Loading indicators reflect real asynchronous work; do not simulate delay.

## Image and performance rules

- Use approved, real product UI and founder photography.
- Record subject, ownership, permission, crop, alt text, and focal point for each image.
- Generate responsive sizes and modern formats through Next Image where possible.
- Avoid loading galleries before interaction/viewport need.
- Establish initial budgets during implementation: no layout shift from media, no full-screen blocking loader, and no agency-root custom cursor.

