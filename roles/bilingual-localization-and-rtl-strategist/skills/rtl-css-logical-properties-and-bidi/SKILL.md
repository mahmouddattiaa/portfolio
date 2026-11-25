---
name: rtl-css-logical-properties-and-bidi
description: Use when specifying RTL logical CSS properties, Tailwind v4 directional utilities, bidi isolation rules, and physical-CSS lint gates.
---

# RTL Logical CSS, Tailwind v4 & Bidi Isolation (Step 3)

Lock the layout and bidirectional text specification in Section 5 of `docs/stage-1-bilingual-l10n-spec.md` so Stage 3 engineers never write physical `left`/`right` styles or ship scrambled mixed-script prices, URLs, or CLI snippets.

## 1. Logical CSS Properties (Zero Physical Left/Right)

Always specify CSS flow-relative logical properties rather than physical left/right offsets:

| Forbidden Physical CSS | Required Logical CSS Equivalent | Notes |
|---|---|---|
| `margin-left` / `margin-right` | `margin-inline-start` / `margin-inline-end` | Flips automatically under `dir="rtl"` |
| `padding-left` / `padding-right` | `padding-inline-start` / `padding-inline-end` | Prefer `padding-inline` when symmetric |
| `left` / `right` | `inset-inline-start` / `inset-inline-end` | For positioned badges, drawers, tooltips |
| `border-left` / `border-right` | `border-inline-start` / `border-inline-end` | Accent borders on callouts and blockquotes |
| `border-top-left-radius` | `border-start-start-radius` | Match with `border-start-end-radius`, `border-end-*` |
| `text-align: left` / `right` | `text-align: start` / `text-align: end` | Aligns to active writing direction |

Exceptions (document explicitly if used): full-bleed viewport media or intentionally asymmetric geometric illustrations that must stay fixed regardless of reading direction.

## 2. Tailwind v4 Logical Utilities

Specify Tailwind v4 logical utility classes across all React/Next.js components:

| Forbidden Physical Utility | Required Logical Utility | Usage |
|---|---|---|
| `ml-*` / `mr-*` | `ms-*` / `me-*` | Inline start/end margin |
| `pl-*` / `pr-*` | `ps-*` / `pe-*` | Inline start/end padding |
| `left-*` / `right-*` | `start-*` / `end-*` | Inset positioning |
| `text-left` / `text-right` | `text-start` / `text-end` | Text alignment |
| `border-l-*` / `border-r-*` | `border-s-*` / `border-e-*` | Directional borders |
| `rounded-l-*` / `rounded-r-*` | `rounded-s-*` / `rounded-e-*` | Directional corner rounding |
| `scroll-ml-*` / `scroll-mr-*` | `scroll-ms-*` / `scroll-me-*` | Scroll snap margins |

Example component contract:

```tsx
<aside
  dir="rtl"
  className="border-s-4 ps-4 pe-6 ms-auto text-start rounded-e-lg"
>
  <p>بدءاً من <bdi dir="ltr">$250</bdi> شهرياً</p>
</aside>
```

## 3. Bidirectional (Bidi) Isolation Rules

Mixed Arabic (RTL) and English/numeric (LTR) runs reorder punctuation and operators unless isolated:

1. **Root Directionality:**
   - Arabic routes (`/ar`, `/ar/*`): `<html lang="ar" dir="rtl">`
   - English routes (`/`, non-`/ar` routes): `<html lang="en" dir="ltr">`
2. **Inline Bidi Isolation (`dir="ltr"` + `unicode-bidi: isolate`):**
   Wrap every LTR span embedded inside Arabic sentences with `<span dir="ltr">` (or HTML `bdi` with `dir="ltr"`) styled with `unicode-bidi: isolate`:
   - Currency amounts and symbols: `بدءاً من <span dir="ltr">$250</span> شهرياً`, `<span dir="ltr">4,500 SAR</span>`
   - URLs, routes, and emails: `<span dir="ltr">https://example.com/ar</span>`, `<span dir="ltr">hello@example.com</span>`
   - Code identifiers, CLI commands, and version tags: `<code dir="ltr">npm run build</code>`, `<span dir="ltr">v2.4.0</span>`
   - Latin brand/product names and phone numbers: `<span dir="ltr">+971 50 000 0000</span>`
3. **CSS Helper Rule:**
   ```css
   [dir="rtl"] bdi,
   .bidi-ltr {
     direction: ltr;
     unicode-bidi: isolate;
   }
   ```
4. **Input Fields & Tables:**
   - Email, URL, and numeric code `<input>` fields on Arabic pages keep `dir="ltr"` with `text-align: end` or `text-align: start` per UX pattern, while placeholders stay localized.

## 4. Directional Iconography Mirroring

- **Mirror in RTL (`rtl:scale-x-[-1]` or `rtl:rotate-180`):** directional arrows (`->`), chevrons, breadcrumbs, back/next buttons, sidebar collapse icons, external-link diagonal arrows.
- **Never mirror in RTL:** checkmarks, clocks, calendars, search magnifying glasses, brand logos, play/pause media controls, charts with time axes unless localized intentionally.

## 5. Optional OSS RTL Linters & Source Scan Gate

Document these optional MIT-licensed static analysis tools in Section 6 for Stage 3 CI:
- **`yuschick/stylelint-plugin-logical-css`** (MIT): flags physical CSS properties (`margin-left`, `padding-right`, `left`, `text-align: left`) in `.css`/`.scss`.
- **`AhmedBaset/eslint-plugin-rtl-friendly`** (MIT): flags physical Tailwind/JSX directional utilities (`ml-4`, `mr-2`, `text-left`) in `.tsx`/`.jsx`.

When `src/` already exists (or `scan_src_rtl: true` in bindings), run `l10n_audit.py --verify ... --scan-src` to detect physical CSS properties and physical Tailwind classes across `.css`, `.scss`, `.tsx`, and `.jsx` files read-only.
