---
name: arabic-transcreation-and-plural-rules
description: Use when transcreating B2B copy into natural Egyptian-to-GCC Arabic, defining CLDR 6-plural ICU rules, and preventing slop or unit leaks.
---

# Arabic Transcreation & CLDR 6-Plural Rules (Step 2)

Produce commercial Arabic that sounds like a sharp Cairo, Riyadh, or Dubai technical founder talking to a buyer—not a machine-translated brochure—and enforce exact ICU plural grammar for every countable UI string.

## 1. Egyptian-to-GCC B2B Transcreation Principles

Write Modern Standard Arabic (MSA) tuned for Gulf and Egyptian B2B decision-makers: clear, concise, active-voice, and grounded in concrete scope, prices, and timelines.

1. **Transcreate outcomes, never word-for-word English syntax:**
   - Avoid passive calques like `تم تصميمه لتعزيز كفاءة عملك`.
   - Use direct active verbs: `نبني`, `نسلّم`, `نفحص`, `نطلق`, `نربط`.
2. **Keep commercial numbers, durations, and currencies pure Arabic-context:**
   - State starting prices and billing cadence cleanly in Arabic (`بدءاً من $250 شهرياً`, `خلال ٤ أسابيع`, `تسليم الكود بالكامل`).
   - Pick one numeral script per deliverable (Western `0-9` for technical/SaaS B2B or Eastern Arabic `٠-٩` when brand style specifies) and keep it consistent across prices, timelines, and tables.
3. **Strip all 9 banned Arabic corporate slop phrases:**
   Never allow any phrase below outside fenced code blocks:

```text
حلول متكاملة مبتكرة | حلول مبتكرة متكاملة | الأفضل في فئته
تحول رقمي شامل | الريادة والتميز | بأعلى معايير الجودة العالمية
نحو مستقبل رقمي | تجربة رقمية استثنائية | شريكك الاستراتيجي الأمثل
```

4. **Eliminate `/mo` and English unit suffix leaks on Arabic lines:**
   `prose_audit.py` rejects `/mo`, `/month`, `/wk`, `/week`, `/yr`, and `/year` whenever Arabic script appears on the same line. Replace English slashes with Arabic cadence words:

```text
FAIL: اشتراك شهري يبدأ من $250/mo لصيانة التطبيق.
PASS: اشتراك شهري يبدأ من $250 شهرياً لصيانة التطبيق.

FAIL: باقة الفريق بسعر 1,200 ريال/yr.
PASS: باقة الفريق بسعر 1,200 ريال سنوياً.
```

5. **Preserve bilingual GEO citability (`40-60` words):**
   When Arabic routes or `require_bilingual_geo` are active, ensure Arabic GEO identity and FAQ summaries remain self-contained, factual, and strictly `40-60` whitespace-separated words.

## 2. Arabic CLDR 6-Plural Categories & ICU MessageFormat

English has only 2 plural forms (`one`, `other`), so naive bilingual templates break Arabic grammar on `0`, `2`, `3-10`, and `11-99`. Arabic requires all **6 CLDR plural categories** in every countable ICU message:

| CLDR Category | Exact Numeric Condition | Arabic Grammar Rule | Example (`يوم` / days) |
|---|---|---|---|
| `zero` | `n = 0` | Explicit zero state (never show raw `0 أيام`) | `لا توجد أيام متبقية` |
| `one` | `n = 1` | Singular noun without numeric prefix | `يوم واحد` |
| `two` | `n = 2` | Dual noun (`المثنى`) without `2` | `يومان` |
| `few` | `n % 100 in 3..10` | Plural noun (`جمع قلة`) after number | `# أيام` (`٣ أيام` .. `١٠ أيام`) |
| `many` | `n % 100 in 11..99` | Singular accusative (`تمييز منصوب`) | `# يوماً` (`١١ يوماً` .. `٩٩ يوماً`) |
| `other` | `n >= 100` (`n % 100 in 0..2`) or decimals | Singular genitive (`تمييز مجرور`) | `# يوم` (`١٠٠ يوم`, `١٠٢ يوم`) |

### Reference ICU MessageFormat Patterns

```icu
{days, plural,
  =0 {التسليم فوري بدون أيام انتظار}
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
  zero {لا توجد مشاريع نشطة حالياً}
  one {مشروع نشط واحد}
  two {مشروعان نشطان}
  few {# مشاريع نشطة}
  many {# مشروعاً نشطاً}
  other {# مشروع نشط}
}
```

Rules for Section 4 of `docs/stage-1-bilingual-l10n-spec.md`:
- Every countable key (`deliveryDays`, `activeProjects`, `teamSeats`, `deliverablesCount`) must define all 6 keywords (`zero`, `one`, `two`, `few`, `many`, `other`) explicitly.
- Never concatenate `${count} ${label}` in TypeScript or JSX; always route through the ICU formatter (`next-intl` / `IntlMessageFormat`).
- Never mix `=0` alone without `zero` when auditors check all 6 CLDR category tokens—include `zero` explicitly (and optionally `=0` if the target runtime treats `=0` as exact override).

## 3. Optional OSS Tooling Handoff

Document these optional MIT-licensed tools in Section 6 for Stage 3 engineering teams (never require them to run inside Stage 1 offline verification):

1. **`katerynaKhar/i18n-keeper`** (MIT — CLI, MCP server, ESLint plugin):
   - Audits ICU message catalogs for missing Arabic CLDR plural forms (`zero`, `one`, `two`, `few`, `many`, `other`), malformed placeholders, and locale key drift across `en.json` and `ar.json`.
   - Useful during Stage 3 when wiring `messages/ar.json` in Next.js or React apps.
2. **`lingualdev/i18n-check`** (MIT — `next-intl` / ICU scanner):
   - Runs `i18n-check --unused` and key-parity checks across `src/` components and `messages/*.json` to catch orphaned keys, untranslated fallbacks, and broken ICU syntax in CI.
