# Stage 3 Role 2B — Arabic RTL & Localization Specification (`/ar`)

**Brand:** Kepler Dev (`https://www.keplerdev.uk/ar`)  
**Voice:** Standalone UK & GCC Digital Product Studio (`نحن` / `استوديو كبلر ديف` / `Kepler Dev`)  
**Target Audience:** GCC operational executives, managing directors, COOs, and technical leads across Saudi Arabia, the UAE, Qatar, Kuwait, and Egypt  
**Status:** Stage 3 RTL & Arabic Localization Specification for Stage 4 Implementation  

---

## 1. Audit of Existing `/ar` Route & Gaps

Direct inspection of `src/app/ar/page.tsx`, `src/app/global-atelier.css`, `src/app/global-atelier-home.css`, `src/app/home-v2.css`, `src/components/site-shell.tsx`, `src/app/layout.tsx`, and `src/content/home/en.ts` reveals six structural, visual, and localization gaps between the existing `/ar` preview and the locked v2 studio standard:

1. **Legacy v1 Layout vs. v2 `.hv2` Architecture Mismatch:**
   - `src/app/ar/page.tsx` (165 lines) still renders legacy v1 Atelier sections (`RouteHero`, `.atelier-capabilities`, `.atelier-approach`, `.atelier-assurance`, `.atelier-final-cta`) rather than the v2 `.hv2` homepage system in `src/app/page.tsx` and `src/content/home/en.ts`.
   - As documented in `src/content/home/README.md`, `/ar` must consume `getHomeCopy("ar")` from `src/content/home/ar.ts` (mirroring `HomeCopy` in `src/content/home/types.ts`) inside `<div className="hv2" lang={copy.lang} dir={copy.dir}>`.

2. **Remove Provisional English Preview Banner:**
   - `src/app/ar/page.tsx` (lines 35–37) outputs a legacy notice `<p className="atelier-language-notice" lang="en" dir="ltr">Arabic preview — language review in progress.</p>`, styled in `src/app/global-atelier-home.css` (lines 649–659). Remove this banner and its unused rule completely.

3. **Missing Sections & Content Parity Gaps:**
   - **No Selected Work Showcase (`#work` & `#hs-vpn`):** `src/app/ar/page.tsx` has zero case study showcases—missing `Glitre` (4 illustrative product screens + 5 metrics), `HS VPN` (Google Play `10K+` vs. iOS `TestFlight only` status rows + 2 historical captures), and `QuickChargingPOS` (Sunmi POS offline Mada card queue highlight).
   - **No Commercial Offers Accordion (`#services`):** The 4 commercial offers (`مخطط المنتج من كبلر`, `سباق الإطلاق`, `منصة العمليات`, `رعاية المنتج`) are absent from `/ar`.
   - **No GCC B2B FAQ Accordion (`#faq`):** The 4 extractable B2B FAQs (scoping/pricing, platforms, Arabic-first RTL/offline/ZATCA compliance, and 100% client source-code ownership) are missing.
   - **No Arabic GEO Identity Block:** The hero lacks the 40–60 word Arabic studio summary required for search and AI answer citability.
   - **Legacy v1 Generic Bullet Strings:** Capabilities (`الاتجاه`, `التجربة`, `البناء`, `التطوير`) and approach steps (`نستمع جيداً`, `نحدد الأولوية`, ...) lack operational mechanisms and deliverables.
   - **Remove Legacy Assurance Split:** `.atelier-studio-assurance` (`src/app/ar/page.tsx` lines 125–141) and the inline dark Founder/Studio band on the homepage are omitted from both `/` and `/ar` per user checkpoint direction; dedicated studio accountability lives on `/studio`.

4. **Shared Shell (`Header`, `Footer`, Skip Link) Incomplete Localization:**
   - In `src/components/site-shell.tsx`, `navigation` (`Work`, `Services`, `Approach`, `Studio`) and `footerCopy` (tagline, `Contact`, `Local time`, `United Kingdom`, `Cairo, Egypt`, `Privacy`, `Appearance`, `Light/Dark/System`) remain hardcoded in English even when `isArabic` is `true` (only the header/drawer primary CTA switches to `تواصل معنا` / `ابدأ الحديث معنا`).
   - `LocaleControl` renders `العربية / EN` on `/ar` instead of a crisp `EN` toggle back to `/`, and `src/app/layout.tsx` (line 82) outputs English `"Skip to main content"` on Arabic routes.

5. **Arabic Typography, `letter-spacing`, and `line-height` Defects:**
   - **Broken Ligatures via Non-Zero Tracking:** `src/app/home-v2.css` applies negative and positive `letter-spacing` across 17 selectors (e.g., `.hv2 :where(h2)` `-0.05em`, `.hv2-eyebrow` `0.08em`, `.hv2-hero h1` `-0.035em`, `.hv2-growth-intro h2` `-0.055em`, `.hv2-studio h2` `-0.045em`, `.hv2-studio-facts dt` `0.08em`, `.hv2-way-name` `-0.04em`), and `src/app/global-atelier.css` applies `0.18em` / `0.08em` / `0.04em` / `0.01em` on `.atelier-wordmark-text`, `.atelier-footer .footer-label`, `.locale-trigger`, and `.atelier-navigation a`—with **zero** `[dir="rtl"]` `letter-spacing: 0` overrides in `home-v2.css`. In Arabic script, non-zero tracking breaks cursive joins and tears glyphs apart.
   - **Font Inheritance Leak in `.hv2`:** `src/app/home-v2.css` lines 27 and 38 hardcode `font-family: var(--font-atelier-body)` on `.hv2` and `var(--font-atelier-display)` on `.hv2 :where(h1, h2, h3)`, overriding `body`'s `[dir="rtl"]` `IBM Plex Sans Arabic` rule in `src/app/global-atelier.css` (lines 56–62). Only `.hv2-phone[lang="ar"]` (line 600) currently switches to `--font-atelier-arabic`.
   - **Ascender/Diacritic Clipping:** `home-v2.css` uses tight Latin line-heights (`1.0` on `.hv2-step h3`, `.hv2-closing h2`, `.hv2-figures dd`; `1.02` on `.hv2-growth-intro h2`; `1.04` on `h2`; `1.1` on `.hv2-hero h1`) that clip Arabic ascenders (`ل`, `ك`, `ط`) and hamzas (`أ`, `إ`, `ئ`).

6. **Physical CSS Directional Properties, Contrast & Mirroring Defects:**
   - **Physical Padding/Transform in `home-v2.css`:**
     - `.hv2-tile-wide` (`padding: 2.5rem 0 0 2.25rem`, line 323; mobile `padding: 2rem 0 0 1.25rem`, line 1996) hardcodes left padding instead of `padding-inline-start`.
     - `.hv2-way-panel-inner` (`padding: 0 0 1.5rem 2.25rem`, line 1459; desktop `padding: 0 0.75rem 1.75rem 4.25rem`, line 2030) hardcodes left indentation under the accordion number instead of `padding-block-end` + `padding-inline-start` / `padding-inline-end`.
     - `.hv2-faq details p` (`padding: 0 1.5rem 1.25rem 0`, line 1529) hardcodes right padding instead of `padding-inline-end: 1.5rem`.
     - `.hv2-growth` desktop `.hv2-connector`, `.hv2-branch` mask (`linear-gradient(90deg, ...)`), `.hv2-hero-media::after` (`90deg` scrim), `.hv2-closing-media::after` (`90deg` scrim), `.hv2-thread-line` (`transform-origin: left center`), and `.hv2-button:hover svg` (`translate(2px, -2px)`) assume LTR reading flow and must mirror in `[dir="rtl"]`.
     - `.hv2-figures > div` mobile rule (line 1839) uses physical `padding: 1rem 0.75rem 1rem 0`.
   - **Low-Contrast & Misplaced Step Numerals:** In `src/app/global-atelier-home.css` (line 339), legacy `.atelier-step-number` uses `var(--atelier-bronze)` (`#bd865e`) at `0.68rem` on forest/dark surfaces, whereas `src/app/ar/page.tsx` (line 65) introduced `.arabic-capability-number` (`0.75rem`, `--atelier-ink`) for pearl surfaces. Under `.hv2`, `.hv2-step-number` and `.hv2-way-number` use `var(--hv2-copper-text)` (`#8f5327`, >= 5.5:1 on `#faf7f1` / `#e5dbd1`), while dark-surface labels use `var(--hv2-bronze-300)` (`#d4a47a`, >= 7.1:1 on `#071c18`).
   - **Icon Directionality:** `src/app/page.tsx` and `src/components/home/hs-vpn-feature.tsx` use `ArrowUpRight` (points right/forward in LTR) without flipping to `ArrowUpLeft` or `ArrowLeft` in RTL; `src/app/ar/page.tsx` uses `ArrowLeft`, which is correct for forward RTL movement.

---

## 2. Localized Navigation, Metadata & Footer Copy (`ar`)

### Route Metadata & `hreflang` Contract (`/ar`)
- `<title>`: `استوديو كبلر ديف — هندسة البرمجيات والأنظمة التشغيلية` (53 chars; matches `docs/seo-and-market-brief.md` 45–60 char rule)
- `<meta name="description">`: `كبلر ديف استوديو هندسي يطور تطبيقات الجوال ومنصات الإدارة التشغيلية المتصلة وشبكات نقاط البيع في المملكة العربية السعودية والخليج وفق معايير الحوكمة الدقيقة.` (157 chars; matches 135–160 char rule)
- **Canonical URL:** `https://www.keplerdev.uk/ar`
- **`hreflang` Alternates:** `en` → `https://www.keplerdev.uk/` · `ar` → `https://www.keplerdev.uk/ar` · `x-default` → `https://www.keplerdev.uk/`
- **OpenGraph (`ar_SA`):**
  - `og:locale`: `ar_SA` (`og:locale:alternate`: `en_GB`)
  - `og:title`: `استوديو كبلر ديف — هندسة البرمجيات والأنظمة التشغيلية`
  - `og:description`: `استوديو هندسي مستقل يطوّر تطبيقات الجوال، ومنصات الإدارة التشغيلية، وأنظمة نقاط البيع بعقد برمجي موحد لفرق الأعمال في الخليج والمملكة المتحدة.`

### Header & Utility Controls (`ar`)
- **Skip Link (`layout.tsx`):** `تخطّ إلى المحتوى الرئيسي` (`href="#main-content"`)
- **Brand Mark:** `Kepler Dev` (`aria-label="الصفحة الرئيسية لاستوديو كبلر ديف"`, `href="/ar"`)
- **Primary Navigation Links:**
  - `الأعمال` (`/work`)
  - `الخدمات` (`/services`)
  - `الاستوديو` (`/studio`)
  - `تواصل معنا` (`/contact`)
- **Locale Trigger:** `EN` (`href="/"`, `aria-label="Switch to English"`, `dir="ltr"`)
- **Header Primary CTA:** `احجز مراجعة مشروع` (`/contact`)
- **Mobile Drawer Controls:**
  - Drawer title (`sr-only`): `قائمة التنقل`
  - Open button `aria-label`: `فتح قائمة التنقل` · Close button `aria-label`: `إغلاق قائمة التنقل`
  - Drawer CTA: `ابدأ الحديث معنا` (`/contact`)
  - Theme selector (`المظهر`): `فاتح` (`light`) · `داكن` (`dark`) · `النظام` (`system`)

### Footer Copy (`ar`)
- **Tagline:** `برمجيات تشغيلية، وتطبيقات جوال، وأنظمة نقاط بيع مهندسة بعقد برمجي موحد لفرق العمل في المملكة المتحدة والخليج والأسواق الدولية.`
- **Navigation Column Label:** `التنقل السريع` (`الأعمال` · `الخدمات` · `الاستوديو` · `تواصل معنا`)
- **Contact Column Label:** `التواصل المباشر`
  - Email (wrapped in `<bdi dir="ltr">`): `<bdi dir="ltr">mahmouddattiaa7@gmail.com</bdi>`
  - Primary Action: `اطلب مراجعة مشروع` (`/contact`)
- **Operating Clocks Column Label:** `التوقيت المحلي`
  - Clock 1: `توقيت المملكة المتحدة` (`Europe/London`, formatted with `en-GB` 24-hour digits inside `<time dir="ltr">`)
  - Clock 2: `القاهرة والخليج` (`Asia/Riyadh` / `Africa/Cairo`, formatted inside `<time dir="ltr">`)
- **Legal & Ownership Row:**
  - Copyright: `© {year} استوديو كبلر ديف — Kepler Dev`
  - Ownership Note: `الملكية الكاملة للشيفرة المصدرية والبنية السحابية تعود للعميل في جميع المشاريع.`
  - Privacy Link: `سياسة الخصوصية` (`/privacy`)

---

## 3. Complete Homepage `/ar` Studio Copy (Key-Parity with `src/content/home/en.ts`)

All copy below uses natural GCC business Arabic tailored to operational executives (COOs, managing directors, and technical leads), preserves 100% key-parity with `HomeCopy` (`src/content/home/types.ts`), and integrates the 4 commercial offers, 3 flagship showcases (`Glitre`, `HS VPN`, `QuickChargingPOS`), and 4 B2B FAQs.

### 3.1 Hero (`#hv2-hero` — `copy.hero` + Arabic GEO Studio Identity Block)
- **Eyebrow:** `استوديو مستقل لتطوير المنتجات الرقمية والأنظمة التشغيلية — المملكة المتحدة والخليج`
- **`H1` (`brand` + `headline`):**
  - `hero.brand`: `استوديو كبلر ديف`
  - `hero.headline`: `يهندس برمجيات متعددة الواجهات لعمليات تشغيلية لا تقبل التوقف.`
- **Sub-headline / Lead:** `نبني تطبيقات جوال متصلة، ولوحات تحكم إدارية، ومنصات خلفية موثوقة لفرق الأعمال المتنامية في السعودية والإمارات والخليج والمملكة المتحدة.`
- **Primary CTA:** `احجز مراجعة مشروع` (`/contact`)
- **Secondary CTA (`hero.workLink`):** `استكشف أعمال الاستوديو` (`#work`)
- **Top-of-Page Arabic GEO Studio Summary (`49 words` — `40–60 words`):**
  > كبلر ديف استوديو مستقل لهندسة المنتجات الرقمية والأنظمة التشغيلية، يعمل تحت مظلة الحوكمة البريطانية مع تنفيذ ميداني نشط في المملكة العربية السعودية والإمارات العربية المتحدة والأسواق الدولية. يصمّم فريقنا الهندسي تطبيقات الجوال المتصلة، ولوحات الإدارة التشغيلية، والأنظمة الخلفية المبنية على عقد برمجي موحد للشركات التي تعتمد على دقة التشغيل.

### 3.2 Selected Work Showcase (`#work` — `Glitre`, `HS VPN`, `QuickChargingPOS`)
- **`work.eyebrow`:** `أعمال مختارة`
- **Section `H2`:** `دراسات حالة من بيئات التشغيل الفعلية`
- **Section Lead:** `ستة أنظمة إنتاجية حيّة وسبعة مشاريع بحث وتطوير تطبيقي عبر قطاعات تجزئة الوقود، والخصوصية الرقمية، وأجهزة نقاط البيع، والرعاية الصحية.`
- **`work.allWork`:** `جميع الأعمال (13)` (`/work`)
- **`work.deliveredLabel`:** `نطاق التسليم الهندسي`
- **`work.screensLabel`:** `شاشات توضيحية للنظام`
- **`work.screenPrefix`:** `شاشة توضيحية:`
- **`work.screens`:**
  - `customer`: `تطبيق العميل — واجهة عربية أولاً`
  - `ledger`: `سجل النقاط المركزي للإدارة`
  - `staff`: `تطبيق موظف المحطة الميداني`
  - `contract`: `عقد OpenAPI واحد يغذي كل الواجهات`
- **`work.swipeHint`:** `اسحب لاستعراض بقية الشاشات`
- **`work.caseStudyLink`:** `اقرأ دراسة الحالة` (`/work/glitre-loyalty-platform`)
- **`work.empty` (Fallback):**
  - `eyebrow`: `مشاريع ذات طبيعة خاصة`
  - `title`: `أعمال موثقة، تُعرض مع سياق قراراتها.`
  - `body`: `كثير من أنظمتنا يعمل في بيئات تشغيل خاصة بالعملاء. نشارك نماذج مختارة مباشرة بعد الحصول على الإذن، مع شرح القرارات الهندسية وراء كل تجربة.`

#### Flagship 1 — `Glitre` (`glitre-loyalty-platform`)
- **Tag:** `مشروع عميل · بيئة الإنتاج · Azure UAE North`
- **`H3`:** `منصة ولاء Glitre (منظومة متكاملة لمحطات الوقود عبر 4 واجهات)`
- **Summary:** `يتوقف مشغّلو المحطات عن خسارة أرصدة النقاط بين جداول الورديات اليدوية وتحديثات التطبيقات غير المتوافقة. ربطنا أربع واجهات إنتاجية — لوحة إدارة عربية أولاً بـ Next.js، وتطبيقي Flutter للعملاء وموظفي المحطات، وخادم NestJS — خلف عقد OpenAPI موحد يضم 60 عملية و30 نموذج بيانات، مع سجل محاسبي غير قابل للتعديل في PostgreSQL ورموز QR موقعة لمرة واحدة و0 مخالفات إتاحة WCAG 2.1 AA عبر 36 شاشة مدققة.`
- **CTA:** `اقرأ دراسة حالة Glitre` (`/work/glitre-loyalty-platform`)

#### Flagship 2 — `HS VPN` (`hs-vpn` — `copy.hsVpnFeature`)
- **`eyebrow`:** `منتج مملوك للعميل · تنفيذ هندسي متكامل من كبلر ديف`
- **`title` (`H3`):** `HS VPN — موثوقية الاتصال وأنفاق الشبكة الأصلية`
- **`body`:** `تطبيق خصوصية واتصال بنقرة واحدة، مصمّم للعمل المستقر في الشبكات المقيدة وتحت الفحص العميق للحزم.`
- **`proof`:** `أثبت كفاءته في إيران وتركمانستان عبر أنفاق Kotlin وSwift أصلية على بروتوكولي WireGuard وAmneziaWG مع خطط احتياطية ثلاثية لقائمة الخوادم (~1,500 مستخدم مسجّل في تركمانستان عبر Firebase).`
- **`androidLabel`:** `Android` · **`androidStatus`:** `متاح على Google Play` · **`androidDetail`:** `تجاوز 10,000+ عملية تنزيل على Google Play بتاريخ 25 سبتمبر 2026.`
- **`iosLabel`:** `iOS` · **`iosStatus`:** `عبر TestFlight فقط` · **`iosDetail`:** `نسخة تجريبية موثقة عبر TestFlight دون طرح عام في App Store.`
- **`figureCaptionLabel`:** `لقطة تاريخية لنسخة iOS`
- **`figures`:**
  1. `caption`: `لوحة الاتصال النشط` · `sourceNote`: `مستودع المشروع`
  2. `caption`: `إحصائيات الجلسة والبيانات` · `sourceNote`: `مستودع المشروع`
- **`platformNote`:** `تتضمن نسخة Android الحالية واجهات محدثة ومختلفة عن لقطات TestFlight التاريخية.`
- **`caseStudyLink`:** `استعرض دراسة حالة HS VPN` (`/work/hs-vpn`)

#### Flagship 3 — `QuickChargingPOS` (`quickcharging-pos`)
- **Tag:** `مشروع عميل · بيئة الإنتاج · أجهزة Sunmi POS`
- **`H3`:** `QuickChargingPOS — نقاط بيع صناعية ومدفوعات دون انقطاع`
- **Summary:** `يواصل أمناء الصندوق في ساحات الوقود إتمام مدفوعات البطاقات وطباعة الإيصالات الفورية حتى عند انقطاع تغطية الإنترنت. يعمل التطبيق على أجهزة Sunmi Android الصناعية عبر جسر React Native متصل بوحدة Java مخصصة (NamiPayModule) لتوقيع معاملات مدى (SkyBand) بخوارزمية HMAC-SHA256، وتخزين عمليات التزود بالوقود محلياً مع الطباعة الحرارية المباشرة.`
- **CTA:** `اقرأ دراسة حالة QuickChargingPOS` (`/work/quickcharging-pos`)

### 3.3 Illustrative Product Screen Labels (`copy.screens` — Exact TypeScript Parity)
All tokens inside the illustrative product cards (`CustomerAppScreen`, `StaffAppScreen`, `LedgerScreen`, `ContractDiagram`, and the 4 step screens) preserve strict `HomeCopy["screens"]` key parity, with numbers and version codes wrapped in `<bdi dir="ltr">` inside JSX:
- **`screens.staff`:**
  - `scanned`: `"تم مسح الرمز"`
  - `purchase`: `"قيمة الشراء"`
  - `points`: `"النقاط المكتسبة"`
  - `station`: `"المحطة"`
  - `stationValue`: `"محطة أ — الرياض"`
  - `code`: `"الرمز"`
  - `codeValue`: `"استخدام لمرة واحدة"`
  - `confirm`: `"تأكيد العملية"`
  - `retryNote`: `"يُقيد مرة واحدة حتى عند إعادة المحاولة"`
- **`screens.ledger`:**
  - `office`: `"الإدارة العامة"`
  - `nav`: `["المحطات", "العملاء", "المعاملات", "الشكاوى", "العروض"]`
  - `activeNavIndex`: `2`
  - `title`: `"سجل النقاط"`
  - `appendOnly`: `"سجل غير قابل للتعديل مفروض من قاعدة البيانات"`
  - `entry`: `"القيد"`
  - `points`: `"النقاط"`
- **`screens.contract`:**
  - `clients`: `["تطبيق العميل", "تطبيق الموظف", "لوحة الإدارة"]`
  - `core`: `"عقد API موحد"`
  - `coreDetail`: `"60 عملية OpenAPI"`
  - `services`: `["خدمات الولاء", "سجل النقاط", "طابور الرسائل"]`
- **`screens.contextBrief`:**
  - `title`: `"موجز السياق التشغيلي"`
  - `chip`: `"مسودة"`
  - `done`: `["الأدوار والمستخدمون", "نقاط الاختناق الحالية"]`
  - `pending`: `"معيار نجاح الإطلاق"`
- **`screens.blueprint`:**
  - `title`: `"مخطط المنتج التقني"`
  - `chip`: `"نطاق معتمد"`
  - `rows`:
    1. `{ label: "تسجيل وتفعيل العملاء", priority: "must", priorityLabel: "أساسي" }`
    2. `{ label: "لوحة العمليات المركزية", priority: "must", priorityLabel: "أساسي" }`
    3. `{ label: "صلاحيات الإدارة والفروع", priority: "next", priorityLabel: "التالي" }`
- **`screens.release`:**
  - `title`: `"إصدار إنتاجي فعلي"`
  - `chip`: `"متاح الآن"`
  - `journey`: `["مُرسل", "قيد المراجعة", "معتمد", "قيد التفعيل"]`
  - `surfaces`: `["تطبيق العميل", "العمليات", "الإدارة"]`
- **`screens.notes`:**
  - `title`: `"سجل الإصدارات"`
  - `chip`: `"تطوير مستمر"`
  - `rows`:
    1. `{ version: "v1.4", label: "تصدير التقارير المحاسبية", shipped: false }`
    2. `{ version: "v1.3", label: "واجهة عربية متكاملة", shipped: true }`
    3. `{ version: "v1.2", label: "بحث فوري في المعاملات", shipped: true }`
  - `shipped`: `"تم الإطلاق"`
  - `inProgress`: `"قيد التنفيذ"`

### 3.4 How We Deliver (`#approach` — `copy.growth`, 4 Steps)
- **`growth.eyebrow`:** `من الفكرة إلى بيئة الإنتاج`
- **`growth.title` (`H2`):** `هندسة مباشرة تتجاوز فوضى الجداول والرسائل المتفرقة.`
- **`growth.lead`:** `تخسر الفرق التشغيلية ما بين 15 و30 ساعة أسبوعياً في مطابقة محادثات واتساب والملفات الورقية. في استوديو كبلر ديف يقود مهندسو الأنظمة المعمارية تنفيذ منتجك مباشرة عبر أربع مراحل ثابتة حتى الإطلاق المستقر.`
- **`growth.steps`:**
  1. **Step `01` — `توثيق سير العمل الفعلي والعقد البرمجي`:**
     `نجلس مع قيادات التشغيل والتقنية لحصر كل مسار عمل، ومتطلبات العمل دون اتصال، وحدود الصلاحيات. قبل كتابة أي سطر برمجي نعتمد عقد OpenAPI، ونموذج السجل المحاسبي، وقائمة الاستثناءات الواضحة للإصدار الأول.`
  2. **Step `02` — `بناء جميع الواجهات على مخطط بيانات موحد`:**
     `تتطور الخدمات الخلفية، ولوحات الإدارة العربية أولاً، وتطبيقات الجوال معاً ضد عقد برمجي واحد. وتتحقق اختبارات التكامل المستمر تلقائياً من عدم وجود أي تعارض قبل وصول أي تعديل إلى بيئة الاختبار.`
  3. **Step `03` — `التحصين ضد ضعف الشبكة والأجهزة وتزامن الطلبات`:**
     `نختبر بوابات الدفع لمنع التكرار عند إعادة الإرسال، ونبني طوابير تخزين محلية لأجهزة نقاط البيع عند انقطاع الاتصال، ونبرمج جسور Kotlin وSwift وJava الأصلية أينما تتوقف أطر العمل المشتركة عند حدود نظام التشغيل.`
  4. **Step `04` — `النشر في بنيتك السحابية وتسليم المفاتيح بالكامل`:**
     `نطلق الأنظمة مباشرة على خوادمك في Microsoft Azure أو AWS أو Linux مع وثائق تقنية كاملة، وبوابات تحقق آلية، ونقل كامل وغير مشروط للملكية الفكرية والشيفرة المصدرية.`

### 3.5 Dedicated Studio Governance (`/studio` Link Only — Inline Homepage Band Omitted)
- Per Checkpoint 2 direction, the inline dark `#founder`/`#studio` block is omitted from both `/` and `/ar` (moving cleanly from `01–04` `#approach` straight into `#services` Ways to Work Together), while navigation and footer `الاستوديو` links route cleanly to the dedicated `/studio` page (`04 · Studio`).
- **`studio.eyebrow` (Dedicated `/studio`):** `الاستوديو`
- **`studio.title` (Dedicated `/studio` `H1`/`H2`):** `مسؤولية هندسية مباشرة تحت حوكمة المملكة المتحدة`
- **`studio.quote` (Dedicated `/studio`):** `كل نظام نطلقه يصممه ويراجعه وينشره نفس المهندسين الكبار الذين خططوا معك نطاقه من اليوم الأول. تحصل على إجابات تقنية حاسمة، ومعالم تسليم واضحة، وملكية كاملة للشيفرة دون وسطاء.`
- **`studio.facts` (Dedicated `/studio`):**
  1. `label`: `المقر والحوكمة` · `value`: `حوكمة تجارية في المملكة المتحدة (Europe/London) وتنفيذ هندسي نشط في القاهرة والخليج (Asia/Riyadh)`
  2. `label`: `الأسواق المخدومة` · `value`: `السعودية، الإمارات، قطر، الكويت، مصر، المملكة المتحدة، وأوروبا`
  3. `label`: `اللغات والواجهات` · `value`: `تنفيذ برمجي عربي أولاً (RTL) وإنجليزي مع تواصل بالفرنسية والألمانية`
  4. `label`: `نموذج التسليم` · `value`: `هندسة قائمة على العقد البرمجي الموحد ونشر مباشر على حسابات العميل السحابية`
- **`studio.link`:** `تعرّف على معايير الاستوديو` (`/studio`)

### 3.6 Four Commercial Offers (`#services` — `copy.services`, Key-Parity + 4 Commercial Tiers)
- **`services.eyebrow`:** `مسارات العمل المشترك`
- **`services.title` (`H2`):** `أربعة نماذج تعاقد واضحة من التخطيط حتى التشغيل المستمر.`
- **`services.notSure`:** `غير متأكد من المسار الأنسب؟ ابدأ بمراجعة تقنية` (`/contact`)
- **`services.whatYouGet`:** `مخرجات المسار`
- **`services.discuss`:** `ناقش هذا المسار`
- **4 Offers (`services.offers`):**
  1. **`مخطط المنتج من كبلر` (`Product Blueprint · 5–10 أيام عمل · $350–$1,200`)**
     - `bestFit`: `للمشاريع التشغيلية الحساسة التي تحتاج وضوحاً هندسياً وتكلفة ثابتة قبل الالتزام بميزانية البناء.`
     - `outcome`: `خريطة سير العمل التشغيلي، ومعمارية قاعدة البيانات وعقد OpenAPI، وحدود الإصدار الأول، وجدول معالم وعرض سعر ثابت تملكه بالكامل.`
     - `boundary`: `مرحلة تصميم معماري ومواصفات فقط؛ لا يشمل كتابة شيفرة إنتاجية.`
     - `next`: `تملك المخطط بالكامل لتنفيذه مع أي فريق، أو تنتقل معنا إلى سباق الإطلاق أو منصة العمليات.`
  2. **`سباق الإطلاق` (`Launch Sprint · 6–10 أسابيع · $3,000–$8,000`)**
     - `bestFit`: `للفرق التي حسمت متطلبات منتجها وتحتاج إطلاق واجهة ويب أو جوال متكاملة في بيئة الإنتاج.`
     - `outcome`: `واجهة منتج رئيسية متكاملة مع رحلة المستخدم الأساسية، وصلاحيات الأدوار، وخادم خلفي وقاعدة بيانات، ولوحة إدارة خفيفة، ونشر فعلي على سحابتك.`
     - `boundary`: `يلتزم بنطاق الإصدار الأول المتفق عليه؛ وتُجدول التطبيقات الإضافية أو وحدات الأجهزة في مرحلة تالية.`
     - `next`: `تسليم كامل للشيفرة والوثائق أو الانتقال إلى باقة رعاية المنتج.`
  3. **`منصة العمليات` (`Operations Platform · 8–16+ أسبوعاً على مراحل · $6,000–$15,000+ للمرحلة الأولى`)**
     - `bestFit`: `للشركات المتنامية في الخليج والمنطقة التي تستبدل الملفات المتفرقة والرسائل بمنظومة تشغيلية موحدة.`
     - `outcome`: `ربط تطبيق العملاء، وتطبيق الموظفين أو أجهزة Sunmi POS الميدانية، ولوحة الإدارة العربية في المقر الرئيسي عبر عقد API موحد وسجل محاسبي غير قابل للتعديل.`
     - `boundary`: `تسليم مرحلي ببوابات اعتماد واضحة؛ وأي تكاملات خارجية مستجدة تخضع لمذكرة نطاق مكتوبة.`
     - `next`: `توسيع التشغيل عبر الفروع والمحطات ثم الانتقال إلى المرحلة الثانية أو رعاية المنتج.`
  4. **`رعاية المنتج` (`Product Care · اشتراك شهري · $400–$1,500+/شهرياً`)**
     - `bestFit`: `للمنتجات القائمة في الإنتاج التي تحتاج قدرة هندسية شهرية منتظمة لتحسين الأداء وإضافة المزايا بأمان.`
     - `outcome`: `ساعات هندسية شهرية مخصصة لقائمة أولوياتك: ترقيات التبعيات، التحديثات الأمنية، تطوير المزايا الجديدة، وفحوصات ثبات الإصدارات.`
     - `boundary`: `سعة هندسية مجدولة لتطوير المنتج، وليست مكتب دعم فني طارئ على مدار الساعة.`
     - `next`: `تجديد شهري مرن يتناسب مع وتيرة خارطة طريق منتجك.`
- **Comparison Link:** `قارن المخرجات والحدود التفصيلية في صفحة الخدمات` (`/services`)

### 3.7 Four GCC B2B FAQ Items (`#faq` — `copy.faq`)
- **`faq.eyebrow`:** `إجابات واضحة`
- **`faq.title` (`H2`):** `أسئلة شائعة قبل بدء المشروع.`
- **4 Items (`faq.items` — Each `40–60 words` for GEO extractability):**
  1. **Q1:** `كيف يحدد استوديو كبلر ديف نطاق العمل والتكلفة للمشاريع البرمجية المخصصة؟`
     > نعمل وفق أربعة مسارات تجارية واضحة: مخطط المنتج من كبلر (<bdi dir="ltr">$350–$1,200</bdi>) لتحديد البنية التقنية ونطاق الإطلاق، وسباق الإطلاق (<bdi dir="ltr">$3,000–$8,000</bdi>) لإصدار منتج أولي متكامل، ومنصة العمليات (<bdi dir="ltr">$6,000–$15,000+</bdi>) للأنظمة متعددة الواجهات، ورعاية المنتج (<bdi dir="ltr">$400–$1,500+/mo</bdi>) للتطوير المستمر. يبدأ كل مسار بحدود نطاق دقيقة ومعايير تسليم قابلة للتحقق.
  2. **Q2:** `ما نوع المنصات التشغيلية وتطبيقات الجوال التي يطورها الاستوديو؟`
     > يطوّر استوديو كبلر ديف أنظمة مترابطة تجمع تطبيقات الجوال، والأجهزة الميدانية، ولوحات التحكم الإدارية. تشمل أعمالنا الإنتاجية منصة ولاء الوقود Glitre التي توحد أربع واجهات تحت عقد برمجي واحد، وتطبيق HS VPN بأنفاق اتصال أصلية، ونظام QuickChargingPOS على أجهزة Sunmi لنقاط البيع، ومنصة MedConnect Egypt الطبية بحماية تشفيرية لبيانات المرضى.
  3. **Q3:** `كيف يتعامل الاستوديو مع واجهات العربية أولاً وضعف الشبكة والامتثال الخليجي؟`
     > نصمّم واجهات عربية أصلية من اليمين إلى اليسار بالتوازي مع الإنجليزية لمتطلبات التشغيل في الخليج. في QuickChargingPOS برمجنا وحدة Java مخصصة لأجهزة Sunmi لتوقيع معاملات مدى عبر HMAC-SHA256 والعمل دون انقطاع، بينما يعتمد Glitre وQiraaty سجلاً محاسبياً غير قابل للتعديل مع الفوترة الإلكترونية المتوافقة مع هيئة الزكاة والضريبة والجمارك.
  4. **Q4:** `لمن تعود ملكية الشيفرة المصدرية وعقود الواجهات البرمجية والبنية السحابية بعد الإطلاق؟`
     > يحتفظ العميل بملكية كاملة وغير مشروطة بنسبة 100% للشيفرة المصدرية، وقواعد البيانات، ومواصفات OpenAPI، والبنية التحتية السحابية فور إتمام مراحل التسليم. ننشر الأنظمة مباشرة على حسابات العميل في Microsoft Azure UAE North أو AWS، مع تسليم الوثائق التقنية الكاملة وفحوصات منع انحراف العقد البرمجي دون أي احتكار تقني.

### 3.8 Closing CTA (`#closing` — `copy.closing` & `copy.mobileCta`)
- **`closing.eyebrow`:** `مراجعة هندسية مباشرة`
- **`closing.title` (`H2`):** `مراجعة مشروعك وتأهيله تقنياً.`
- **`closing.button`:** `احجز مراجعة مشروع` (`/contact`)
- **`closing.note`:** `نرد عليك مباشرة خلال يوم عمل واحد، أو راسلنا عبر ` `<bdi dir="ltr">mahmouddattiaa7@gmail.com</bdi>`.
- **`mobileCta`:** `احجز مراجعة مشروع`

---

## 4. RTL Layout, Logical CSS & Typography Rules

All Stage 4 CSS changes must apply cleanly under `[dir="rtl"]` and `[lang="ar"]` across both `src/app/global-atelier.css` and `src/app/home-v2.css` without breaking the English `/` layout.

### 4.1 Font Family, Tracking Reset (`letter-spacing: 0`) & Arabic Line-Height
```css
/* 1. Arabic Font Stack & Global Tracking Lock */
[lang="ar"],
[dir="rtl"],
[dir="rtl"] body,
[dir="rtl"] .hv2,
[dir="rtl"] .hv2 :where(h1, h2, h3, p, a, button, dt, dd, summary, li, span, strong),
[dir="rtl"] .atelier-navigation a,
[dir="rtl"] .mobile-navigation a,
[dir="rtl"] .atelier-footer a,
[dir="rtl"] .atelier-footer .footer-label,
[dir="rtl"] .atelier-primary-action,
[dir="rtl"] .atelier-secondary-action,
[dir="rtl"] .atelier-kicker,
[dir="rtl"] .hv2-eyebrow,
[dir="rtl"] .hv2-hero h1,
[dir="rtl"] .hv2-work-title h2,
[dir="rtl"] .hv2-figures dd,
[dir="rtl"] .hv2-hs-vpn-intro h2,
[dir="rtl"] .hv2-hs-vpn-status-row dt,
[dir="rtl"] .hv2-hs-vpn-pill,
[dir="rtl"] .hv2-hs-vpn-figcaption-label,
[dir="rtl"] .hv2-hs-vpn-figcaption-title,
[dir="rtl"] .hv2-growth-intro h2,
[dir="rtl"] .hv2-step h3,
[dir="rtl"] .hv2-studio h2,
[dir="rtl"] .hv2-studio-facts dt,
[dir="rtl"] .hv2-way-name,
[dir="rtl"] .hv2-way-outcome,
[dir="rtl"] .hv2-closing h2 {
  font-family: var(--font-atelier-arabic), Arial, sans-serif;
  letter-spacing: 0;
  text-transform: none;
}

/* Keep brand wordmark and LTR technical pills clean without uppercase Arabic damage */
[dir="rtl"] .atelier-wordmark-text,
[dir="rtl"] [dir="ltr"] {
  font-family: var(--font-atelier-body), Arial, sans-serif;
}

/* 2. Arabic Vertical Rhythm (Prevents ascender & diacritic clipping) */
[dir="rtl"] .hv2 :where(h1, h2, h3),
[dir="rtl"] .hv2-hero h1,
[dir="rtl"] .hv2-growth-intro h2,
[dir="rtl"] .hv2-studio h2,
[dir="rtl"] .hv2-closing h2 {
  line-height: 1.25;
}

[dir="rtl"] .hv2-step h3,
[dir="rtl"] .hv2-work-title h2,
[dir="rtl"] .hv2-hs-vpn-intro h2,
[dir="rtl"] .hv2-way-name {
  line-height: 1.32;
}

[dir="rtl"] .hv2 :where(p, li, dd, summary),
[dir="rtl"] .hv2-faq details p,
[dir="rtl"] .hv2-studio blockquote p,
[dir="rtl"] .atelier-footer p {
  line-height: 1.65;
}

[dir="rtl"] .hv2-figures dd {
  font-family: var(--font-atelier-display), var(--font-atelier-arabic), sans-serif;
  font-variant-numeric: tabular-nums;
  line-height: 1.15;
}
```

### 4.2 CSS Logical Properties & RTL Layout Mirroring
Convert physical `left`/`right` properties in `src/app/home-v2.css` and `src/app/global-atelier.css` to CSS logical properties and add RTL scrim/animation mirroring:

```css
/* 3. Replace Physical Padding with Logical Properties in home-v2.css */
.hv2-tile-wide {
  padding-block: 2.5rem 0;
  padding-inline: 2.25rem 0;
}
@media (max-width: 1279px) {
  .hv2-tile-wide {
    padding-block: 2rem 0;
    padding-inline: 1.25rem 0;
  }
}

.hv2-way-panel-inner {
  padding-block: 0 1.5rem;
  padding-inline: 2.25rem 0;
}
@media (min-width: 1024px) {
  .hv2-way-panel-inner {
    padding-block: 0 1.75rem;
    padding-inline: 4.25rem 0.75rem;
  }
}

.hv2-faq details p {
  padding-block: 0 1.25rem;
  padding-inline: 0 1.5rem;
}

@media (max-width: 767px) {
  .hv2-figures > div {
    padding-block: 1rem;
    padding-inline: 0 0.75rem;
  }
}

/* 4. Hero & Closing Media Scrims + Kepler Fold inline-start Placement in RTL */
[dir="rtl"] .hv2-hero-photo {
  object-position: 30% 50%;
  transform-origin: 28% 45%;
}

[dir="rtl"] .hv2-hero-media::after {
  background:
    linear-gradient(270deg, rgba(7, 28, 24, 0.92) 0%, rgba(7, 28, 24, 0.72) 30%, rgba(7, 28, 24, 0) 58%),
    linear-gradient(180deg, rgba(7, 28, 24, 0) 72%, rgba(7, 28, 24, 0.45) 100%);
}

@media (min-width: 768px) {
  [dir="rtl"] .hv2-closing-media::after {
    background: linear-gradient(270deg, var(--hv2-forest) 0%, rgba(7, 28, 24, 0.8) 30%, rgba(7, 28, 24, 0) 75%);
  }
  [dir="rtl"] .hv2-closing-media img {
    object-position: 20% 45%;
  }
}

/* Legacy/shared Kepler Fold inline-start positioning (already in global-atelier-home.css, preserved for sub-routes) */
[dir="rtl"] .hero-fold {
  inset-inline-end: auto;
  inset-inline-start: 0;
}

/* 5. Growth Branch & Connector Mirroring in RTL */
[dir="rtl"] .hv2-branch {
  transform: scaleX(-1);
  -webkit-mask-image:
    linear-gradient(270deg, #000 55%, transparent 90%),
    linear-gradient(180deg, transparent 0%, #000 12%, #000 72%, transparent 100%);
  mask-image:
    linear-gradient(270deg, #000 55%, transparent 90%),
    linear-gradient(180deg, transparent 0%, #000 12%, #000 72%, transparent 100%);
}

[dir="rtl"] .hv2-connector {
  -webkit-mask-image: linear-gradient(90deg, transparent 0, #000 36px);
  mask-image: linear-gradient(90deg, transparent 0, #000 36px);
}

@media (min-width: 1280px) {
  [dir="rtl"] .hv2-connector {
    -webkit-mask-image: linear-gradient(270deg, transparent 0, #000 40px);
    mask-image: linear-gradient(270deg, transparent 0, #000 40px);
  }
}

[dir="rtl"] .hv2-thread-line {
  transform-origin: right center;
}

/* 6. Directional Icon Flip & Hover Translation */
[dir="rtl"] .hv2-button:hover svg,
[dir="rtl"] .hv2-link:hover svg {
  transform: translate(-2px, -2px);
}

/* 7. Mobile Drawer Enter Keyframe Logical Direction */
@keyframes atelier-drawer-enter-rtl {
  from {
    opacity: 0;
    transform: translateX(-1.25rem);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

[dir="rtl"] .mobile-drawer {
  animation-name: atelier-drawer-enter-rtl;
}
```

### 4.3 Directional Icons, Mixed-Script `<bdi dir="ltr">` Isolation & Mobile (`390x844`) Parity
1. **Directional Icon Reversal (`ArrowLeft` / `ArrowUpLeft`):**
   - In RTL (`/ar`), replace forward-pointing `ArrowUpRight` inside `src/app/ar/page.tsx` and `src/components/home/hs-vpn-feature.tsx` (when `dir === "rtl"`) with `ArrowLeft` (or `ArrowUpLeft` for external/diagonal card links) from `lucide-react`. Keep `ArrowDown` unchanged for vertical scroll anchors (`#work`).
2. **Mixed-Script Bidirectional Isolation (`<bdi dir="ltr">`):**
   - Wrap every embedded Latin/numeric/version token inside Arabic sentences in `<bdi dir="ltr">` so RTL punctuation and parentheses never reorder characters:
     - Email: `<bdi dir="ltr">mahmouddattiaa7@gmail.com</bdi>`
     - Phone/URLs: `<bdi dir="ltr">https://www.keplerdev.uk/ar</bdi>`
     - USD Pricing Ranges: `<bdi dir="ltr">$350–$1,200</bdi>`, `<bdi dir="ltr">$3,000–$8,000</bdi>`, `<bdi dir="ltr">$6,000–$15,000+</bdi>`, `<bdi dir="ltr">$400–$1,500+/mo</bdi>`
     - Version tags & sample values: `<bdi dir="ltr">v1.4</bdi>`, `<bdi dir="ltr">{sample.balance}</bdi>`, `<bdi dir="ltr">{sample.timer}</bdi>`, `<bdi dir="ltr">{sample.purchaseAmount}</bdi>`, `<bdi dir="ltr">HMAC-SHA256</bdi>`, `<bdi dir="ltr">OpenAPI</bdi>`
     - Footer clocks (`Europe/London`, `Asia/Riyadh`): `<time dir="ltr" aria-live="off" suppressHydrationWarning>`
3. **Mobile (`390x844`) Vertical Height & Overflow Parity:**
   - Ensure `[dir="rtl"] .hv2-hero h1` does not wrap to more than 3 lines at `390px` viewport width (`max-inline-size: none` below `767px`, `font-size: clamp(1.95rem, 6.8vw, 3.1rem)`).
   - Keep `.hv2-strip` horizontal snap-scroll working in RTL (`scroll-snap-type: x mandatory`, `scroll-snap-align: start`) so tile 1 (`CustomerAppScreen`) starts on the inline-start (right) edge without horizontal body overflow (`overflow-x: clip` on `.hv2` root if needed).
   - Keep `Services` accordion items collapsed by default on mobile (`390x844`) and FAQ item 0 open by default (`open={index === 0}`), matching `/` vertical height parity.
   - Maintain `min-block-size: 2.75rem` (`44px`) tap targets on all RTL header pills, locale switcher (`EN`), drawer links, accordion triggers, and footer links.

---

## 5. Mandatory Self-Audit Checklist

| Check | Status | Evidence |
| --- | --- | --- |
| Zero personal/founder references (`محمود` / `المؤسس` / `founder`) & provisional notice removed | PASS | Audited all copy in Sections 2 and 3: standalone studio voice (`نحن` / `استوديو كبلر ديف`) used throughout; zero personal names; legacy English preview banner flagged for removal in Section 1 and omitted from Section 3. |
| Natural GCC business Arabic across all sections & all 4 commercial offers | PASS | Section 3 provides natural Gulf executive Arabic across Hero + 49-word GEO block, Selected Work (`Glitre`, `HS VPN`, `QuickChargingPOS`), 4 delivery steps, `#studio`, all 4 commercial offers (`مخطط المنتج من كبلر`, `سباق الإطلاق`, `منصة العمليات`, `رعاية المنتج`), 4 GCC B2B FAQs, Closing CTA, and all `screens` labels. |
| Explicit `[dir="rtl"]` CSS logical properties & `letter-spacing: 0` tracking lock | PASS | Section 4 locks `IBM Plex Sans Arabic`, `letter-spacing: 0`, `line-height >= 1.25` headings / `>= 1.65` body, CSS logical properties (`padding-inline`, `inset-inline`, `transform-origin`), `<bdi dir="ltr">` isolation, and RTL `ArrowLeft`/`ArrowUpLeft` directionality. |
| Deterministic Arabic RTL verifier (`arabic_rtl_audit.py --verify`) exits `0` | PASS | Verified by running `python3 roles/arabic-rtl-architect/scripts/arabic_rtl_audit.py --verify docs/stage-3-arabic-rtl-spec.md` with exit code `0`. |
| Standalone studio voice (`copy_audit.py`) exits `0` | PASS | Verified by running `python3 roles/conversion-copywriter/scripts/copy_audit.py docs/stage-3-arabic-rtl-spec.md` with exit code `0`. |
