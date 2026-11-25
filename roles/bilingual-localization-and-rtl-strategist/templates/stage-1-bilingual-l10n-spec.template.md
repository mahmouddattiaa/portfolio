# Stage 1 Bilingual Localization & RTL Specification

**Project:** `<Project Name>`
**Canonical Origin:** `<https://example.com>`
**Configured Locales:** `<en, ar>`
**Source Briefs:** `docs/positioning-brief.md`, `docs/seo-and-market-brief.md`, `docs/stage-1-final-copy-and-pitch.md`, `.agents/product-marketing.md`, `docs/context/project-digest.md`

---

## 1. Locale Architecture, hreflang Matrix & Directionality Contract

### Document Directionality & Metadata Contract
- **English Routes (`/`, non-`/ar`):** `<html lang="en" dir="ltr">`, `og:locale="en_US"`, self-referential canonical URL.
- **Arabic Routes (`/ar`, `/ar/*`):** `<html lang="ar" dir="rtl">`, `og:locale="ar_AR"`, self-referential canonical URL (never canonicalize `/ar/*` back to English).
- **Route Classification Rule:** Treat a route as Arabic strictly when `route == "/ar"` or `route.startswith("/ar/")` so English paths such as `/articles` stay LTR.

### Reciprocal `hreflang` Matrix
| Route Pair | `hreflang="en"` | `hreflang="ar"` | `hreflang="x-default"` | Canonical Rule |
|---|---|---|---|---|
| Home | `<https://example.com/>` | `<https://example.com/ar>` | `<https://example.com/>` | Self-referential per locale |
| `<Route Group>` | `<https://example.com/route>` | `<https://example.com/ar/route>` | `<https://example.com/route>` | Bidirectional reciprocal links |

---

## 2. Domain Glossary & Non-Translatable Brand/Technical Terms

### Non-Translatable Terms (Isolate with `dir="ltr"` and `unicode-bidi: isolate`)
- **Brand & Product Names:** `<Project Name and product identifiers>`
- **Technical & Protocol Terms:** `API`, `CLI`, `JSON-LD`, `ICU`, `RTL`, `LTR`, `hreflang`

### Standardized B2B Arabic Glossary
| English Term | Approved Arabic Term | Forbidden Literal Calque | Usage Context |
|---|---|---|---|
| `<Term 1>` | `<Approved Arabic Term>` | `<Stiff literal phrase to avoid>` | Hero / Offers |
| `<Term 2>` | `<Approved Arabic Term>` | `<Stiff literal phrase to avoid>` | Pricing / FAQ |

---

## 3. EN-AR Route, Offer, Price & CTA Parity Table

### Route & Conversion CTA Parity
| EN Route | AR Route | EN Headline / Intent | Arabic Headline / Intent | EN CTA | Arabic CTA |
|---|---|---|---|---|---|
| `/` | `/ar` | `<EN H1>` | `<Arabic transcreated H1>` | `<EN Primary CTA>` | `<Arabic Primary CTA>` |
| `<Route>` | `<AR Route>` | `<EN Headline>` | `<Arabic Headline>` | `<EN CTA>` | `<Arabic CTA>` |

### Offer, Starting Price & Timeline Parity
| Offer | EN Starting Price & Timeline | Arabic Starting Price & Timeline | EN Deliverables Summary | Arabic Deliverables Summary |
|---|---|---|---|---|
| `<Offer 1>` | `<$X / N weeks>` | `<بدءاً من $X خلال N أسابيع>` | `<EN scope>` | `<نطاق العمل بالعربية>` |
| `<Offer 2>` | `<$Y per month>` | `<بدءاً من $Y شهرياً>` | `<EN scope>` | `<نطاق العمل بالعربية>` |

### Bilingual `40-60` Word GEO Parity Block (When Arabic GEO Required)

> `<Replace with a standalone 40 to 60 word Arabic GEO identity or FAQ answer grounded in verified project facts, using natural Egyptian-to-GCC B2B phrasing and standard Unicode U+0600-U+06FF.>`

---

## 4. Arabic Transcreation Copy & CLDR 6-Plural Message Rules

### Transcreation Guardrails
- **Voice & Register:** `<Natural Egyptian-to-GCC B2B founder Arabic aligned to voice_mode>`
- **Unit & Numeral Discipline:** Never use English `/mo`, `/wk`, or `/yr` suffixes on Arabic lines; write `شهرياً`, `أسبوعياً`, or `سنوياً` explicitly.
- **Unicode Hygiene:** Standard Arabic block (`U+0600-U+06FF`) only; zero Presentation Forms (`U+FB50-U+FDFF`, `U+FE70-U+FEFF`).

### Arabic CLDR 6-Plural ICU MessageFormat Rules
Every countable UI string defines all 6 Arabic CLDR plural categories (`zero`, `one`, `two`, `few`, `many`, `other`):

```icu
{days, plural,
  zero {التسليم فوري بدون أيام انتظار}
  one {يستغرق التنفيذ يوماً واحداً}
  two {يستغرق التنفيذ يومين}
  few {يستغرق التنفيذ # أيام}
  many {يستغرق التنفيذ # يوماً}
  other {يستغرق التنفيذ # يوم}
}
```

| Key | `zero` | `one` | `two` | `few` (`3-10`) | `many` (`11-99`) | `other` (`100+`) |
|---|---|---|---|---|---|---|
| `<deliveryDays>` | `<0 text>` | `<1 text>` | `<2 text>` | `<# أيام>` | `<# يوماً>` | `<# يوم>` |

---

## 5. RTL Layout, Logical CSS/Tailwind & Bidi Isolation Spec

### Logical CSS & Tailwind v4 Contract
- **Forbidden Physical Properties/Utilities:** `margin-left`, `margin-right`, `padding-left`, `padding-right`, `left-*`, `right-*`, `ml-*`, `mr-*`, `pl-*`, `pr-*`, `text-left`, `text-right`.
- **Required Logical CSS:** `margin-inline-start`, `margin-inline-end`, `padding-inline-start`, `padding-inline-end`, `inset-inline-start`, `inset-inline-end`, `border-inline-start`, `text-align: start`.
- **Required Tailwind v4 Utilities:** `ms-*`, `me-*`, `ps-*`, `pe-*`, `start-*`, `end-*`, `text-start`, `text-end`, `border-s-*`, `border-e-*`, `rounded-s-*`, `rounded-e-*`.

### Bidi Isolation & Icon Mirroring Rules
- **Inline Isolation:** Wrap embedded prices, URLs, emails, phone numbers, CLI commands, and Latin product names inside `<span dir="ltr">` (or HTML `bdi` with `dir="ltr"`) styled with `unicode-bidi: isolate`.
- **Icon Mirroring:** Mirror directional arrows, chevrons, and navigation back/next icons in RTL; keep checkmarks, clocks, search icons, and brand logos unmirrored.

---

## 6. Optional Tooling Handoff (i18n-keeper, i18n-check, RTL Linters)

| Tool (License) | Target Stage | Purpose | Recommended Command / Rule |
|---|---|---|---|
| `katerynaKhar/i18n-keeper` (MIT) | Stage 3 / CI | Validate Arabic CLDR 6-plural completeness & ICU syntax | Run CLI/ESLint check on `messages/ar.json` |
| `lingualdev/i18n-check` (MIT) | Stage 3 / CI | Detect unused or missing `next-intl` / ICU keys | `npx i18n-check --unused` |
| `yuschick/stylelint-plugin-logical-css` (MIT) | Stage 3 / CI | Block physical `left`/`right` properties in `.css`/`.scss` | Enable `plugin/use-logical-properties-and-values` |
| `AhmedBaset/eslint-plugin-rtl-friendly` (MIT) | Stage 3 / CI | Block physical `ml-*`/`mr-*`/`text-left` classes in JSX/TSX | Enable plugin error rule on `src/` |

---

## 7. Mandatory Self-Audit Checklist

| # | Audit Gate | Verification Evidence | Status |
|---|---|---|---|
| 1 | All 7 required H2 sections present in exact order with non-empty content | Verified against template headings | PASS |
| 2 | Reciprocal `hreflang` (`en`, `ar`, `x-default`) and `dir="rtl"` contract locked | Verified in Section 1 matrix | PASS |
| 3 | All configured `required_routes` and `required_offers` paired with Arabic parity | Verified in Section 3 parity tables | PASS |
| 4 | All 6 Arabic CLDR plural categories (`zero`, `one`, `two`, `few`, `many`, `other`) defined | Verified in Section 4 ICU spec | PASS |
| 5 | Zero Arabic Presentation Forms (`U+FB50-U+FDFF`, `U+FE70-U+FEFF`) and zero `/mo` leaks | Verified via `l10n_audit.py` and `prose_audit.py` | PASS |
| 6 | Logical CSS/Tailwind rules and bidi isolation (`dir=`, `unicode-bidi`) specified | Verified in Section 5 and optional `--scan-src` | PASS |
| 7 | Zero banned English/Arabic slop, zero structural tells, zero unfilled placeholders | Verified via `prose_audit.py` and `l10n_audit.py` | PASS |
