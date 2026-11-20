# Arabic Business Localization & RTL Layout Rules (Kepler Dev)

1. **Natural Gulf / Modern Standard Business Register:** Write as a confident Saudi/UK operational engineering consultancy addressing COOs, managing directors, and technical leads—avoid robotic literal phrasing (`"نحول أحلامك"` etc.).
2. **Domain Terminology:**
   - Software Architecture / OpenAPI Contract → `البنية التقنية` / `عقد برمجي موحد (OpenAPI)`
   - Append-Only Ledger → `سجل محاسبي غير قابل للتعديل`
   - Offline-First POS / Field Terminals → `تطبيقات تعمل دون انقطاع حتى مع ضعف الاتصال`
   - Product Blueprint → `مخطط المنتج التقني (Product Blueprint)`
   - Launch Sprint → `سباق الإطلاق (Launch Sprint)`
   - Operations Platform → `منصة العمليات المتكاملة (Operations Platform)`
   - Product Care → `باقة الرعاية والتطوير المستمر (Product Care)`
3. **Typography & Tracking:**
   - English eyebrow/uppercase labels often use `letter-spacing: 0.08em; text-transform: uppercase`. In Arabic (`[dir="rtl"]` / `[lang="ar"]`), non-zero letter-spacing breaks ligatures and tears glyphs apart. **Always enforce `letter-spacing: 0` on every Arabic element.**
   - Arabic glyphs need deeper vertical room (`line-height: 1.25–1.35` on headings, `1.65` on body copy).
4. **Bidirectional & Directional Rules:**
   - Replace `margin-left` / `padding-right` / `text-align: left` with CSS logical properties (`margin-inline-start`, `padding-inline-end`, `text-align: start`).
   - Mixed LTR tokens inside Arabic sentences (emails like `mahmouddattiaa7@gmail.com`, versions, OpenAPI identifiers) must be wrapped with `<bdi dir="ltr">` or `.bidi-ltr`.
   - Directional arrows pointing forward flip to `ArrowLeft` in RTL.
