---
name: bilingual-parity-and-hreflang-qa
description: Use when verifying EN-to-AR route, offer, price, CTA, and GEO parity, reciprocal hreflang pairs, Unicode hygiene, and l10n QA gates.
---

# Bilingual Parity, `hreflang` & Deterministic QA (Step 1)

Use this skill during Step 1 to lock the bilingual architecture and parity contract before Arabic copy transcreation and RTL styling rules are written, and again as the final verification checklist in Step 4.

## 1. Locale Architecture & Reciprocal `hreflang` Matrix

Every localized site requires an explicit URL strategy and reciprocal `<link rel="alternate" hreflang="...">` contract:

1. **Route Prefix Rule:**
   - Default locale (`en`): `/` and English routes (`/features`, `/pricing`, `/contact`).
   - Arabic locale (`ar`): `/ar` and mirrored sub-routes (`/ar/features`, `/ar/pricing`, `/ar/contact`), or explicitly mapped slugs documented in Section 3.
   - Route matching must strictly check `r == "/ar" or r.startswith("/ar/")` so English paths like `/articles` or `/architecture` are never misclassified as Arabic routes.
2. **Reciprocal `hreflang` Pairs (`en`, `ar`, `x-default`):**
   Every page in the parity table must declare:
   - Self-referential `<link rel="alternate" hreflang="en" href="...">` and `<link rel="alternate" hreflang="ar" href="...">` on **both** the English and Arabic page (reciprocity: if `A` points to `B`, `B` must point back to `A`).
   - `<link rel="alternate" hreflang="x-default" href="...">` pointing to the default canonical route (typically the English root or locale-neutral landing URL).
   - Self-referential `<link rel="canonical" href="...">` per locale (never point `/ar/pricing` canonical to `/pricing`, which de-indexes Arabic pages).
3. **Directionality & Language Attributes:**
   - Arabic routes require `<html lang="ar" dir="rtl">`.
   - English routes require `<html lang="en" dir="ltr">`.
   - `og:locale` (`en_US` / `ar_AR` or `ar_AE` / `ar_EG`) and `og:locale:alternate` match the active pair.

## 2. EN <-> AR Content, Offer, Price & CTA Parity

Audit `docs/positioning-brief.md`, `docs/seo-and-market-brief.md`, and `docs/stage-1-final-copy-and-pitch.md` against `.kepler/stage-1-bindings.json`:

1. **Route Coverage:** Every route in `required_routes` must appear in the Section 3 Markdown parity table with its paired locale route, H1 intent, primary CTA, and parity status.
2. **Offer, Price & Timeline Parity:** Every offer in `required_offers` must keep identical starting price, billing period, deliverables count, and delivery timeline across English and Arabic—only the language and currency/cadence phrasing change (never stale discounts or omitted tiers on `/ar`). In bilingual parity table rows where English and Arabic appear on the same line, write `$250 per month` (not bare `/mo`) in the English cell so line-level Arabic mixed-unit checks stay clean.
3. **Untranslated Cell Prevention:** When `"ar"` is in `locales` (or `require_bilingual_geo` is `true`), Arabic copy columns in Section 3 must contain actual Arabic script—never copy-pasted English placeholders or untranslated English CTA labels.
4. **Bilingual `40-60` Word GEO Parity:** Verify that identity and FAQ summaries mapped for `/ar` stay within `40-60` whitespace-separated words and preserve the exact same factual proof points as the English GEO blocks.

## 3. Domain Glossary & Non-Translatable Terms

In Section 2, split terms cleanly into:
- **Keep in English / Latin (isolated with `<span dir="ltr">` or `bdi` + `unicode-bidi: isolate`):** brand names, CLI commands, API endpoints, protocol acronyms (`JSON-LD`, `ICU`, `RTL`, `CSS`, `API`), and programming language names.
- **Standardized Arabic Equivalents:** locked B2B glossary terms (e.g., `Scope` -> `نطاق العمل`, `Deployment` -> `النشر التشغيلي`, `Monthly Retainer` -> `اشتراك صيانة شهري`) so every page uses identical terminology.

## 4. Unicode Presentation Forms Hygiene

Legacy PDF extractors and broken font encoders emit Arabic Presentation Forms-A (`U+FB50-U+FDFF`) and Presentation Forms-B (`U+FE70-U+FEFF`), such as isolated or contextual glyphs (`\uFB50`, `\uFE8D`, `\uFEFB`) instead of standard logical Arabic letters (`U+0600-U+06FF`).

- Presentation Forms break full-text search, browser find-in-page, HarfBuzz/CoreText glyph shaping, and Arabic screen readers.
- Standardize all Arabic text to `U+0600-U+06FF` (NFC normalized). `l10n_audit.py` automatically rejects any character in `[\uFB50-\uFDFF\uFE70-\uFEFF]` outside fenced code blocks.

## 5. Deterministic Verification Gate

Before marking Stage 1 Role 1.4 complete:
1. Run `python3 -B roles/bilingual-localization-and-rtl-strategist/scripts/l10n_audit.py --verify docs/stage-1-bilingual-l10n-spec.md --project-dir "/home/kepler/Desktop/Kepler/Projects/portfolio"` (add `--scan-src` when `src/` exists).
2. Run `python3 -B scripts/prose_audit.py docs/stage-1-bilingual-l10n-spec.md --config .kepler/stage-1-bindings.json`.
3. Resolve every reported failure and confirm both commands exit `0`.
