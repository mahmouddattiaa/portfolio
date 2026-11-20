# Stage 3 Role 2B — Arabic RTL & Localization Specification (`/ar`)

Replace every `FILL` marker. Keep all exact numbered H2 headings.

## 1. Audit of Existing `/ar` Route & Gaps
FILL: findings from `src/app/ar/page.tsx` and `src/app/global-atelier.css`, noting the removed founder references, v1 vs v2 visual mismatch, provisional English banner removal, missing offers/projects parity, and Arabic letter-spacing bugs.

## 2. Localized Navigation, Metadata & Footer Copy (`ar`)
- `<title>`: `FILL` (must match SEO Brief `45–60 chars`)
- `<meta name="description">`: `FILL` (must match SEO Brief `135–160 chars`)
- Navigation Links: `الأعمال` (`/work`) · `الخدمات` (`/services`) · `الاستوديو` (`/studio`) · `تواصل معنا` (`/contact`)
- Footer Tagline, Contact (`mahmouddattiaa7@gmail.com`), Operating Clocks (`المملكة المتحدة` · `القاهرة والخليج`), and Ownership Note: `FILL`

## 3. Complete Homepage `/ar` Studio Copy (Key-Parity with `src/content/home/en.ts`)
- **Hero (`#hv2-hero`):** Eyebrow, `H1`, Sub-headline, Primary CTA, Secondary CTA, and Arabic Studio GEO Block: `FILL`
- **Selected Work Showcase (`#work` — `Glitre`, `HS VPN`, `QuickChargingPOS`):** `FILL`
- **Illustrative Product Screen Labels (`screens`):** `FILL`
- **How We Deliver (`#approach` — 4 Steps):** `FILL`
- **The Studio (`#studio` — Replacing Legacy Founder Assurance):** `FILL`
- **Four Commercial Offers (`#services`):** `FILL`
- **Four B2B FAQ Items (`#faq`):** `FILL`
- **Closing CTA (`#closing`):** `FILL`

## 4. RTL Layout, Logical CSS & Typography Rules
FILL: exact CSS rules for `[dir="rtl"]` and `[lang="ar"]` (`IBM Plex Sans Arabic`, `letter-spacing: 0`, heading/body line-height, Kepler Fold `inline-start` positioning, `<bdi dir="ltr">` for email/URLs, arrow inversion, mobile `390x844` height parity).

## 5. Mandatory Self-Audit Checklist

| Check | Status | Evidence |
| --- | --- | --- |
| Zero personal/founder references (`محمود` / `المؤسس` / `founder`) & provisional notice removed | FILL | FILL |
| Natural GCC business Arabic across all sections & all 4 commercial offers | FILL | FILL |
| Explicit `[dir="rtl"]` CSS logical properties & `letter-spacing: 0` tracking lock | FILL | FILL |
| Deterministic Arabic RTL verifier (`arabic_rtl_audit.py --verify`) exits `0` | FILL | FILL |
| Standalone studio voice (`copy_audit.py`) exits `0` | FILL | FILL |
