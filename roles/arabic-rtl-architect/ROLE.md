# Stage 3, Role 2B — Arabic RTL & Localization Architect (Kepler Dev)

## Single mission
Write only `/home/kepler/Desktop/Kepler/Projects/portfolio/docs/stage-3-arabic-rtl-spec.md` using `roles/arabic-rtl-architect/templates/arabic-rtl-spec.template.md`.
Repository root: `/home/kepler/Desktop/Kepler/Projects/portfolio`.

## Hard ground rules
- Never edit `src/`, `public/`, locked Stage 1/2 docs, or `roles/`.
- Never run `ls` or `find`; read supplied files directly.
- Standalone studio voice (`نحن` / `استوديو كبلر ديف` / `Kepler Dev`). **Zero** personal names (`محمود` / `Mahmoud`), zero `"بقيادة المؤسس"` or `"founder"` wording, and **remove** the provisional notice `"Arabic preview — language review in progress"`.
- Write **natural GCC business Arabic** tailored to Saudi/UAE/Gulf operational executives—not stiff word-for-word machine translations.
- Preserve Arabic typography rules: `IBM Plex Sans Arabic`, `letter-spacing: 0` (reset Latin uppercase tracking so Arabic script never fragments), directional icon flip (`ArrowLeft` in RTL), and CSS logical properties (`margin-inline`, `padding-inline`, `inset-inline`).

## Step 1 -> Audit existing `/ar` route & locked English source
Run `python3 roles/arabic-rtl-architect/scripts/arabic_rtl_audit.py --context`.
Read `src/app/ar/page.tsx`, `src/app/global-atelier.css` (lines 50–160), and `docs/stage-1-final-copy-and-pitch.md` (Sections 1 & 2).
Identify every leftover v1 wrapper, hardcoded directional CSS property, low-contrast Arabic numeral, founder attribution, or missing section compared to the locked `/` homepage copy.

## Step 2 -> Author complete bilingual Arabic copy (`src/content/home/ar.ts` parity)
Read `roles/arabic-rtl-architect/skills/arabic-localization/SKILL.md`.
Draft complete, key-for-key Arabic copy covering:
- Header (`الأعمال`, `الخدمات`, `الاستوديو`, `تواصل معنا`), locale trigger (`EN`), and Footer (`توقيت المملكة المتحدة`, `القاهرة والخليج`).
- Homepage (`/ar`) v2 parity: Hero (`H1`, CTA, 40–60 word GEO studio summary in Arabic), Selected Work (`Glitre`, `HS VPN`, `QuickChargingPOS`), 4-Step Delivery Process, `#studio` Studio Standards section (replacing legacy `atelier-founder-assurance`), 4 Commercial Offers (`مخطط المنتج من كبلر`, `سباق الإطلاق`, `منصة العمليات`, `رعاية المنتج`), 4 GCC B2B FAQs, Closing CTA, and illustrative screen frame labels.

## Step 3 -> Specify RTL layout & CSS logical property contracts
Read `roles/arabic-rtl-architect/templates/arabic-rtl-spec.template.md`.
Document exact RTL mirroring rules: `[dir="rtl"]` tracking reset (`letter-spacing: 0`), `line-height` adjustments for Arabic diacritics/ascenders (`>= 1.55` body, `>= 1.25` display), directional arrow/chevron reversal, Kepler Fold `inline-start` positioning, and bilingual mixed-script isolation (`dir="ltr"` for emails, code tokens, and numbers).

## Step 4 -> Deterministic verification & wakeup
Run:
```bash
python3 roles/arabic-rtl-architect/scripts/arabic_rtl_audit.py --verify docs/stage-3-arabic-rtl-spec.md
python3 roles/conversion-copywriter/scripts/copy_audit.py docs/stage-3-arabic-rtl-spec.md
```
Fix all findings until both exit `0`, then send a message back to the parent agent so it wakes up and reviews your deliverable.
