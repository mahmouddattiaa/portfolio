# Stage 1 Bilingual Localization & RTL Specification

**Project:** Kepler Dev
**Canonical Origin:** `https://www.keplerdev.uk`
**Configured Locales:** `en`, `ar`
**Source Briefs:** `docs/positioning-brief.md`, `docs/seo-and-market-brief.md`, `docs/stage-1-final-copy-and-pitch.md`, `.agents/product-marketing.md`, `docs/context/project-digest.md`, `.kepler/stage-1-bindings.json`

---

## 1. Locale Architecture, hreflang Matrix & Directionality Contract

### Document Directionality & Metadata Contract
- **English Routes (`/`, `/work`, `/services`, `/studio`, `/contact`, `/privacy`):** Emit `<html lang="en" dir="ltr">`, `og:locale="en_US"`, and a self-referential `<link rel="canonical">` matching the exact route under `https://www.keplerdev.uk`.
- **Arabic Routes (`/ar` and any Stage 3 `/ar/*` mirrored routes):** Emit `<html lang="ar" dir="rtl">`, `og:locale="ar_AR"`, `og:locale:alternate="en_US"`, and a self-referential `<link rel="canonical">` (for example `https://www.keplerdev.uk/ar` — never point `/ar` or `/ar/*` canonicals back to English URLs).
- **Route Classification Rule:** Classify a route as Arabic strictly when `route == "/ar"` or `route.startswith("/ar/")` so English paths remain `dir="ltr"`.
- **Reciprocity Rule:** Emit bidirectional `<link rel="alternate" hreflang="en" href="...">`, `<link rel="alternate" hreflang="ar" href="...">`, and `<link rel="alternate" hreflang="x-default" href="https://www.keplerdev.uk/">` only between live reciprocal pairs (`/` and `/ar`). English-only secondary routes (`/work`, `/services`, `/studio`, `/contact`, `/privacy`) emit `hreflang="en"` and `hreflang="x-default"` until dedicated `/ar/*` sub-routes ship with matching reciprocal `<link>` headers.

### Reciprocal `hreflang` Matrix
| Route Pair | `hreflang="en"` | `hreflang="ar"` | `hreflang="x-default"` | Canonical & Reciprocity Rule |
|---|---|---|---|---|
| Home (`/` <-> `/ar`) | `https://www.keplerdev.uk/` | `https://www.keplerdev.uk/ar` | `https://www.keplerdev.uk/` | Self-referential canonical per locale; full bidirectional `en` / `ar` / `x-default` reciprocity |
| Work (`/work`) | `https://www.keplerdev.uk/work` | Pending `/ar/work` (links to `/ar` section today) | `https://www.keplerdev.uk/work` | Self-referential EN canonical; add reciprocal `hreflang="ar"` only when `/ar/work` ships |
| Services (`/services`) | `https://www.keplerdev.uk/services` | Pending `/ar/services` (links to `/ar` pricing section today) | `https://www.keplerdev.uk/services` | Self-referential EN canonical; add reciprocal `hreflang="ar"` only when `/ar/services` ships |
| Studio (`/studio`) | `https://www.keplerdev.uk/studio` | Pending `/ar/studio` (links to `/ar` studio block today) | `https://www.keplerdev.uk/studio` | Self-referential EN canonical; add reciprocal `hreflang="ar"` only when `/ar/studio` ships |
| Contact (`/contact`) | `https://www.keplerdev.uk/contact` | Pending `/ar/contact` (bilingual EN/AR intake on `/contact`) | `https://www.keplerdev.uk/contact` | Self-referential EN canonical; intake form supports Arabic and English copy |
| Privacy (`/privacy`) | `https://www.keplerdev.uk/privacy` | Pending `/ar/privacy` (footer legal notice localized on `/ar`) | `https://www.keplerdev.uk/privacy` | Self-referential EN canonical; states `Mahmoud Attia, trading as Kepler Dev` (Cairo, Egypt) |

### Brand Naming & Locale Glossary Harmonization
- **Arabic Brand Spelling Decision (`كيبلر ديف` vs `كبلر ديف`):** Live `src/content/home/ar.ts` currently uses `كبلر ديف` (and `بدءاً من $250/شهرياً` on the `Product Care` card), whereas Stage 1 SEO metadata, GEO blockquotes, JSON-LD `FAQPage`, and conversion copy (`docs/seo-and-market-brief.md` and `docs/stage-1-final-copy-and-pitch.md`) standardize on `كيبلر ديف` and `بدءاً من $250 شهرياً` (space-separated, no slash).
- **Locked Harmonization Rule:** Standardize all Stage 1–3 Arabic navigation, hero copy, GEO identity blocks, FAQ answers, and JSON-LD structured data on **`كيبلر ديف`** (matching standard Arabic phonetic transliteration and locked SEO/GEO copy). During Stage 3 code alignment, update `src/content/home/ar.ts` from `كبلر ديف` to `كيبلر ديف` and normalize `بدءاً من $250/شهرياً` to `بدءاً من $250 شهرياً`, while keeping `كبلر ديف` documented only as a legacy live variant in this glossary so search-intent parity and brand consistency stay unified.

---

## 2. Domain Glossary & Non-Translatable Brand/Technical Terms

### Non-Translatable Terms (Isolate with `<span dir="ltr">` and `unicode-bidi: isolate`)
- **Brand & Commercial Tier Names:** `Kepler Dev`, `Product Blueprint`, `Launch Sprint`, `Operations Platform`, `Product Care` (keep English tier names isolated in `<span dir="ltr">` when shown in parentheses beside their approved Arabic equivalents).
- **Verified Portfolio & System Identifiers:** `Glitre Loyalty Platform`, `HS VPN`, `QuickChargingPOS`, `MedConnect Egypt`, `StayEase`, `Classroom Sentinel`, `Aksira`, `FitForge`, `Qiraaty`, `Focus Ritual`, `GetLab System`, `AI Collab Platform`, `AgencyOS`.
- **Technical, Compliance & Protocol Terms:** `OpenAPI`, `JSON-LD`, `ICU`, `RTL`, `LTR`, `hreflang`, `WCAG 2.1 AA`, `Sunmi POS`, `SkyBand`, `Mada`, `ZATCA`, `Moyasar`, `Azure UAE North`, `HMAC-SHA256`, `AES-256`, `SHA-256`, `NEPacketTunnelProvider`, `NamiPayModule`, `FlutterEngine`, `Google Play`, `TestFlight`, `API`, `CLI`, `SaaS`, `MVP`.
- **Contact & Trading Identity:** `hello@keplerdev.uk`, `https://www.keplerdev.uk`, `Mahmoud Attia, trading as Kepler Dev`.

### Standardized B2B Arabic Glossary
| English Term | Approved Arabic Term | Literal Calque / Slop to Avoid | Usage Context |
|---|---|---|---|
| `Kepler Dev` (Brand Name) | `كيبلر ديف` (harmonizing legacy `كبلر ديف` in `src/content/home/ar.ts`) | `كيبلر للتطوير` | Header, Hero, GEO Blocks, Footer |
| `Product Blueprint` | `مخطط المنتج` | `المخطط الأزرق للمنتج` | Offer Ladder, Hero CTA, Contact Track |
| `Launch Sprint` | `سباق الإطلاق` | `عدو الإطلاق السريع` | Offer Ladder, Services, Contact Track |
| `Operations Platform` | `منصة العمليات` | `بلاتفورم التشغيل` | Offer Ladder, GCC SME Copy |
| `Product Care` | `رعاية المنتج` | `عناية المنتجات المستدامة` | Offer Ladder, Monthly Capacity |
| `Scope` | `نطاق العمل` | `السكوب` / `محيط المشروع` | Blueprint Deliverables, Boundaries |
| `Contract-First OpenAPI` | `عقد OpenAPI موحد` | `أوبن إيه بي آي أولاً حرفياً` | Engineering Mechanism, Architecture |
| `Append-Only Ledger` | `سجل محاسبي غير قابل للتعديل` | `دفتر الإلحاق فقط` | `Glitre`, Financial Integrity Proof |
| `Monthly Engineering Capacity` | `سعة هندسية شهرية` | `ساعات ريتينر خاملة` | `Product Care` Description |
| `Deployment` | `النشر التشغيلي` | `الرفع السحابي المبتكر` | `Launch Sprint`, Handover Copy |
| `100% Credited Toward Build` | `تُخصم قيمته كاملة عند التنفيذ` | `معتمدة مئة بالمئة نحو البناء` | `Product Blueprint` Risk Reversal |

---

## 3. EN-AR Route, Offer, Price & CTA Parity Table

### Route & Conversion CTA Parity
| EN Route | AR Route / Target | EN Headline / Intent | Arabic Headline / Intent | EN CTA | Arabic CTA |
|---|---|---|---|---|---|
| `/` | `/ar` | Build Your App Idea or Replace Manual Operations in 2 to 5 Weeks | شركة برمجة تطبيقات ومنصات عمليات ولوحات تحكم عربية خلال 2 إلى 5 أسابيع | Start a $300 Blueprint | ابدأ مخطط المنتج ($300) |
| `/ar` | `/ar` | Native Arabic-First RTL Entry for GCC, Egypt & UK Buyers | ستوديو هندسي من القاهرة لتطوير التطبيقات ولوحات التحكم العربية | Switch to English | تصفح 13 مشروعاً منفذاً |
| `/work` | `/ar` (Stage 3: `/ar/work`) | 13 Shipped Mobile Apps, Sunmi POS Systems & Bilingual Platforms | 13 تطبيقاً ونظام نقاط بيع ومنصة ثنائية اللغة في بيئة الإنتاج | Inspect 13 Shipped Builds | استعرض دراسات الحالة الموثقة |
| `/services` | `/ar` (Stage 3: `/ar/services`) | Transparent Software Pricing, Fixed-Scope Sprints & Operations Platforms | باقات تطوير وتسعير واضحة بدءاً من $300 دون وسطاء | Compare Pricing & Tiers | قارن الباقات وحدود النطاق |
| `/studio` | `/ar` (Stage 3: `/ar/studio`) | Contract-First Engineering Studio Built in Cairo for GCC & UK Teams | مسؤولية هندسية مباشرة من القاهرة بتداخل كامل مع الرياض ولندن | Schedule a Technical Scoping Call | تعرّف على معايير الاستوديو |
| `/contact` | `/ar` (Stage 3: `/ar/contact`) | Start Your Credited $300 Product Blueprint or Project Scoping Call | شاركنا هدف المشروع والجدول الزمني لبدء مخطط المنتج | Request Blueprint or Scoping Call | أرسل الملخص وحدد موعد المكالمة |
| `/privacy` | `/ar` (Stage 3: `/ar/privacy`) | Privacy Policy & Legal Trading Identity for Kepler Dev | سياسة الخصوصية والهوية التجارية المعلنة لاستوديو كيبلر ديف | Email hello@keplerdev.uk | تواصل عبر hello@keplerdev.uk |

### Offer, Starting Price & Timeline Parity
| Offer | EN Starting Price & Timeline | Arabic Starting Price & Timeline | EN Deliverables Summary | Arabic Deliverables Summary |
|---|---|---|---|---|
| **Product Blueprint** | From $300 · 3–5 business days (100% credited toward build) | بدءاً من $300 · 3–5 أيام عمل (تُخصم قيمته كاملة عند التنفيذ) | Workflow scope, OpenAPI and system plan, v1 boundaries, milestone schedule, fixed build estimate owned outright by client | خريطة سير العمل التشغيلي، عقد OpenAPI وخطة النظام، حدود الإصدار الأول، جدول المعالم، وعرض سعر ثابت يملكه العميل بالكامل |
| **Launch Sprint** | From $1,800 · 2–5 weeks | بدءاً من $1,800 · خلال 2–5 أسابيع | Production v1 web or mobile app, core user journey, role permissions, backend API/database, lightweight admin console, cloud deployment | نسخة إنتاجية أولى للويب أو الجوال مع الرحلة الأساسية، صلاحيات الأدوار، الواجهة الخلفية وقاعدة البيانات، لوحة إدارة خفيفة، والنشر السحابي المباشر |
| **Operations Platform** | From $4,000 (Phase 1) · 5–10 weeks, phased | بدءاً من $4,000 للمرحلة الأولى · 5–10 أسابيع على مراحل | Connected customer app, staff or Sunmi Android POS field surface, Arabic-first RTL head-office dashboard, shared OpenAPI contract, idempotent ledger | ربط تطبيق العملاء وتطبيق الموظفين أو أجهزة Sunmi POS الميدانية ولوحة الإدارة العربية عبر عقد OpenAPI موحد وسجل محاسبي غير قابل للتعديل |
| **Product Care** | From $250 per month · Monthly capacity | بدءاً من $250 شهرياً · اشتراك شهري مرن | Agreed monthly senior engineering capacity against a client-owned backlog (feature increments, dependency updates, verification checks, stability fixes) | سعة هندسية شهرية متفق عليها لقائمة أولويات يملكها العميل وتشمل تطوير المزايا، تحديث التبعيات، فحوصات التحقق، واستقرار التشغيل |

### Bilingual `40-60` Word GEO Parity Block (Arabic Entity Identity & FAQs)

> كيبلر ديف (Kepler Dev) ستوديو هندسي لتطوير التطبيقات والمنصات التشغيلية من القاهرة يخدم رواد الأعمال والشركات في السعودية والخليج ومصر وبريطانيا. نبدأ بمخطط المنتج بدءاً من $300 خلال 3-5 أيام عمل، ونطلق النسخة الأولى بدءاً من $1,800 خلال 2-5 أسابيع، مع سجل موثق يضم أكثر من 10 آلاف تحميل لتطبيق HS VPN على جوجل بلاي.

> رواد الأعمال الباحثون عن تنفيذ فكرة تطبيق أو منصة SaaS يبدأون مع كيبلر ديف بمخطط المنتج بدءاً من $300 خلال 3-5 أيام عمل، وتُخصم قيمته كاملة عند التنفيذ. يشمل المخطط نطاق العمل، وخطة OpenAPI، وجدول التسليم، وتكلفة ثابتة واضحة قبل إطلاق النسخة الأولى في السعودية ومصر والخليج خلال 2-5 أسابيع.

> تعتمد كيبلر ديف أربع باقات واضحة: مخطط المنتج بدءاً من $300، وسباق الإطلاق بدءاً من $1,800 خلال 2-5 أسابيع، ومنصة العمليات بدءاً من $4,000 للمرحلة الأولى خلال 5-10 أسابيع، ورعاية المنتج بدءاً من $250 شهرياً. التنفيذ المباشر من فريق القاهرة يلغي رسوم الوسطاء، وعقد OpenAPI الموحد يمنع إعادة العمل.

> تتفوق كيبلر ديف على الوكالات التقليدية بطيئة التنفيذ والمستقلين غير الموثقين عبر هندسة مباشرة من القاهرة بتداخل ساعات العمل مع الرياض ولندن، وعقود OpenAPI موحدة، وبوابات تحقق مستقلة لكل إصدار. في منصة جليتر للولاء، وحّد عقد واحد أربع واجهات عربية RTL و60 عملية برمجية دون أي مخالفات إتاحة WCAG 2.1 AA.

> تثبت كيبلر ديف جاهزيتها الإنتاجية عبر أنظمة فعلية تعمل في الخليج ومصر، منها نظام QuickChargingPOS على أجهزة Sunmi POS لمدفوعات مدى عبر SkyBand، ومنصة جليتر على Azure UAE North بسجل نقاط غير قابل للتعديل، ومنصة قراءتي المتوافقة مع الفوترة الإلكترونية ZATCA ومدفوعات ميسر، إضافة إلى أكثر من 38 شاشة في MedConnect Egypt.

---

## 4. Arabic Transcreation Copy & CLDR 6-Plural Message Rules

### Transcreation Guardrails
- **Voice & Register (`brand_plural`):** Natural Egyptian-to-GCC B2B founder and COO Arabic in active studio plural voice (`نبني`، `نسلّم`، `نربط`، `نفحص`، `نطلق`) — never passive calques, never first-person singular, and zero Arabic corporate clichés.
- **Unit & Numeral Discipline:** Standardize on Western digits (`0-9`) across prices, timelines, and metrics (`$300`, `$1,800`, `$4,000`, `$250`, `2–5 أسابيع`, `60 عملية`) for consistent B2B SaaS/technical scannability. Never write `/mo`, `/wk`, `/yr`, or `/شهرياً` on Arabic prose lines; write `شهرياً`, `أسبوعياً`, or `سنوياً` cleanly (`بدءاً من $250 شهرياً`).
- **Unicode Hygiene:** Normalize all Arabic copy to NFC within the standard Unicode Arabic block (`U+0600-U+06FF`). Zero Arabic Presentation Forms (`U+FB50-U+FDFF`, `U+FE70-U+FEFF`).
- **Legal Notice Transcreation (`/privacy` & Footer):** `محمود عطية، يزاول النشاط تحت اسم Kepler Dev · القاهرة، مصر · البريد الرسمي للتواصل: hello@keplerdev.uk`.

### Arabic CLDR 6-Plural ICU MessageFormat Rules
Every countable Arabic UI string (delivery timelines, active projects, client seats, deliverables, and case study counts) must route through `IntlMessageFormat` / `next-intl` using all 6 Arabic CLDR plural categories (`zero`, `one`, `two`, `few`, `many`, `other`) rather than string concatenation (`${count} ${label}`):

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

```icu
{projects, plural,
  zero {لا توجد مشاريع منشورة مطابقة للتصفية}
  one {مشروع موثق واحد}
  two {مشروعان موثقان}
  few {# مشاريع موثقة}
  many {# مشروعاً موثقاً}
  other {# مشروع موثق}
}
```

```icu
{screens, plural,
  zero {لا توجد شاشات مضافة في هذا المسار}
  one {شاشة واحدة}
  two {شاشتان}
  few {# شاشات}
  many {# شاشةً}
  other {# شاشة}
}
```

| Key | `zero` (`n = 0`) | `one` (`n = 1`) | `two` (`n = 2`) | `few` (`n % 100 in 3..10`) | `many` (`n % 100 in 11..99`) | `other` (`100+` / decimals) |
|---|---|---|---|---|---|---|
| `deliveryDays` | `التسليم فوري بدون أيام انتظار` | `يوم عمل واحد` | `يومان` | `# أيام عمل` | `# يوماً` | `# يوم عمل` |
| `shippedBuilds` | `لا توجد مشاريع مطابقة` | `مشروع واحد` | `مشروعان` | `# مشاريع` | `# مشروعاً` | `# مشروع` |
| `surfaceCount` | `بدون واجهات مرتبطة` | `واجهة واحدة` | `واجهتان` | `# واجهات` | `# واجهةً` | `# واجهة` |
| `deliverablesCount` | `لا توجد مخرجات محددة` | `مخرج واحد` | `مخرجان` | `# مخرجات` | `# مخرجاً` | `# مخرج` |

---

## 5. RTL Layout, Logical CSS/Tailwind & Bidi Isolation Spec

### Logical CSS & Tailwind v4 Contract
- **Forbidden Physical CSS & Utilities:** Never author `margin-left`, `margin-right`, `padding-left`, `padding-right`, `border-left`, `border-right`, `border-top-left-radius`, `text-align: left`, `text-align: right`, `ml-*`, `mr-*`, `pl-*`, `pr-*`, `left-*`, `right-*`, `text-left`, `text-right`, `border-l-*`, `border-r-*`, `rounded-l-*`, `rounded-r-*`, `scroll-ml-*`, or `scroll-mr-*` in component styles or layouts.
- **Required Logical CSS Properties:** Use `margin-inline-start`, `margin-inline-end`, `padding-inline-start`, `padding-inline-end`, `inset-inline-start`, `inset-inline-end`, `border-inline-start`, `border-inline-end`, `border-start-start-radius`, `border-start-end-radius`, and `text-align: start` / `text-align: end`.
- **Required Tailwind v4 Logical Utilities:** Use `ms-*`, `me-*`, `ps-*`, `pe-*`, `start-*`, `end-*`, `text-start`, `text-end`, `border-s-*`, `border-e-*`, `rounded-s-*`, `rounded-e-*`, `scroll-ms-*`, and `scroll-me-*`.
- **Documented Exceptions Only:** Full-bleed viewport backdrops or intentionally fixed-orientation device telemetry graphs may declare physical viewport offsets only when wrapped in an explicit comment explaining why directional mirroring is disabled.

### Bidi Isolation & Icon Mirroring Rules
- **Root Directionality:** `<html lang="ar" dir="rtl">` on `/ar` and `/ar/*`; `<html lang="en" dir="ltr">` on `/` and all English routes.
- **Inline Isolation (`dir="ltr"` + `unicode-bidi: isolate`):** Wrap embedded prices (`<span dir="ltr">$300</span>`), URLs (`<span dir="ltr">https://www.keplerdev.uk/ar</span>`), email addresses (`<span dir="ltr">hello@keplerdev.uk</span>`), protocol acronyms (`OpenAPI`, `WCAG 2.1 AA`), and technical identifiers (`<code dir="ltr">NamiPayModule</code>`) inside `<span dir="ltr">` or a `bdi` element with `dir="ltr"` styled with `unicode-bidi: isolate` so mixed RTL/LTR punctuation never reorders.
- **Form Inputs (`/contact`):** Keep email and URL `input` elements `dir="ltr"` with logical `text-start` (or `text-end` when right-aligned in Arabic cards) while keeping labels, placeholders, helper copy, and validation errors in localized Arabic.
- **Icon Mirroring:** Mirror directional arrows (`->`), chevrons, pagination controls, breadcrumbs, and external-link indicators under `[dir="rtl"]` (`rtl:scale-x-[-1]` or `rtl:rotate-180`). Never mirror checkmarks, clocks, calendars, search magnifying glasses, brand marks, or time-axis charts.

```css
/* Global RTL bidi isolation helper */
[dir="rtl"] bdi,
.bidi-ltr {
  direction: ltr;
  unicode-bidi: isolate;
}
```

```tsx
/* Logical Tailwind v4 + bidi isolation component pattern */
<aside
  dir="rtl"
  className="border-s-4 ps-4 pe-6 ms-auto text-start rounded-e-lg"
>
  <p>
    باقة رعاية المنتج تبدأ من <bdi dir="ltr">$250</bdi> شهرياً
  </p>
</aside>
```

---

## 6. Optional Tooling Handoff (i18n-keeper, i18n-check, RTL Linters)

| Tool (License) | Target Stage | Purpose | Recommended Command / Rule |
|---|---|---|---|
| `katerynaKhar/i18n-keeper` (MIT) | Stage 3 / CI | Validate Arabic CLDR 6-plural completeness (`zero`, `one`, `two`, `few`, `many`, `other`) & ICU syntax | Run CLI/ESLint check on `messages/ar.json` |
| `lingualdev/i18n-check` (MIT) | Stage 3 / CI | Detect unused, orphaned, or missing `next-intl` / ICU keys across `src/` | `npx i18n-check --unused` |
| `yuschick/stylelint-plugin-logical-css` (MIT) | Stage 3 / CI | Block physical `left`/`right` properties in `.css`/`.scss` stylesheets | Enable `plugin/use-logical-properties-and-values` |
| `AhmedBaset/eslint-plugin-rtl-friendly` (MIT) | Stage 3 / CI | Block physical `ml-*`/`mr-*`/`text-left` classes in JSX/TSX components | Enable plugin error rule on `src/` |

---

## 7. Mandatory Self-Audit Checklist

| # | Audit Gate | Verification Evidence | Status |
|---|---|---|---|
| 1 | All 7 required H2 sections present in exact order with non-empty content | Sections 1–7 match `stage-1-bilingual-l10n-spec.template.md` headings verbatim | PASS |
| 2 | Reciprocal `hreflang` (`en`, `ar`, `x-default`) and `dir="rtl"` contract locked | Verified in Section 1 matrix covering `/`, `/ar`, `/work`, `/services`, `/studio`, `/contact`, `/privacy` plus brand spelling harmonization (`كيبلر ديف` vs legacy `كبلر ديف`) | PASS |
| 3 | All configured `required_routes` and `required_offers` paired with Arabic parity | Verified in Section 3 parity tables plus 5 standalone `49–55` word Arabic GEO blockquotes | PASS |
| 4 | All 6 Arabic CLDR plural categories (`zero`, `one`, `two`, `few`, `many`, `other`) defined | Verified in Section 4 ICU MessageFormat patterns and CLDR plural mapping table | PASS |
| 5 | Zero Arabic Presentation Forms (`U+FB50-U+FDFF`, `U+FE70-U+FEFF`) and zero `/mo` leaks | Verified via `l10n_audit.py --verify` and `prose_audit.py` across all Arabic copy and parity rows | PASS |
| 6 | Logical CSS/Tailwind rules and bidi isolation (`dir=`, `unicode-bidi`) specified | Verified in Section 5 (`margin-inline-*`, `padding-inline-*`, `ms-*`, `ps-*`, `text-start`, `unicode-bidi: isolate`) | PASS |
| 7 | Zero banned English/Arabic slop, zero structural tells, zero unfilled placeholders | Verified via `l10n_audit.py --verify` and `prose_audit.py --config .kepler/stage-1-bindings.json` exiting `0` | PASS |
