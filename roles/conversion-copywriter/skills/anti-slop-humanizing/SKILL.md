---
name: anti-slop-humanizing
description: Use when removing AI buzzwords, rhetorical slogan tells, filler transitions, and voice-binding violations before locking final copy.
---

# Anti-Slop Humanizing & GEO Verification (Step 3)

Run this final editorial pass before writing `docs/stage-1-final-copy-and-pitch.md` so the copy reads like a sharp domain specialist wrote it and passes `prose_audit.py` and `copy_audit.py` on the first run.

## 1. Zero-Tolerance Banned AI Buzzwords (24 Terms)

Eliminate every single term below outside fenced code blocks. Replace each with a plain verb, measurable constraint, or concrete artifact:

```text
passionate | seamless | seamlessly | cutting-edge | next-generation | unleash
elevate | synergy | revolutionize | revolutionary | game-changing | game-changer
digital experiences | craftsmanship | wizard | ninja | guru | delve
tapestry | robust | scalable solutions | paradigm shift | world-class | holistic
```

### Zero-Tolerance Banned Arabic Slop Phrases (9 Phrases)

Eliminate every stiff corporate-translation Arabic phrase below outside fenced code blocks:

```text
حلول متكاملة مبتكرة | حلول مبتكرة متكاملة | الأفضل في فئته
تحول رقمي شامل | الريادة والتميز | بأعلى معايير الجودة العالمية
نحو مستقبل رقمي | تجربة رقمية استثنائية | شريكك الاستراتيجي الأمثل
```

## 2. Zero-Tolerance Structural & Rhetorical Tells (6 Patterns)

Rewrite any sentence matching these AI cadence habits:

```text
1. Contrast-reveal slogan: "It's not [just] X, it's Y" / "It is not [just] X, it is Y"
2. Contrast-reveal slogan: "Not just X, but Y"
3. Rhetorical hook: "The result?"
4. Rhetorical hook: "The best part:" / "The best part?"
5. Conversational filler: "Here's the thing" / "Here is the thing"
6. Dramatic fragment: "Let that sink in"
```

Rewrite rule: state what the product or service actually does in one direct declarative sentence.

## 3. Cut Filler Transitions & Padded Openers

Delete throat-clearing openers that add zero information:
- `In today's fast-paced landscape...`
- `When it comes to...`
- `Whether you are a startup or an enterprise...`
- `At the end of the day...`
- `Designed with your needs in mind...`

Start directly with the buyer's constraint, the outcome, or the factual claim.

## 4. Arabic Transcreation (Not Literal Translation)

When writing or localizing Arabic routes, write like a sharp GCC or Egyptian product founder speaking to a peer—never like a translated press release:
- **Natural business Arabic:** Prefer active verbs and everyday commercial clarity (`نطلق نظام الحجز في ٤ أسابيع`) over literal English calques and hollow superlatives.
- **Zero `/mo` mixed-unit leaks:** Never attach English duration suffixes (`/mo`, `/month`, `/wk`, `/week`, `/yr`, `/year`) to numbers or currency on Arabic prose lines (`$250/mo` fails `prose_audit.py`). Write `شهرياً`, `أسبوعياً`, or `سنوياً` cleanly (`بدءاً من $250 شهرياً لتطوير وصيانة التطبيقات`).
- **Concrete outcomes over abstractions:** Replace vague claims with exact deliverables, response times, or workflow steps grounded in the upstream briefs.
- **Bilingual GEO parity:** Whenever `require_bilingual_geo` is true or `"ar"` is in `locales` alongside an `/ar` route, include at least one standalone `40–60` word Arabic GEO blockquote in Section 2 or Section 6.

## 5. Enforce Project Voice & Token Bindings

Read `.kepler/stage-1-bindings.json` (when present) and audit every line:
- **`voice_mode: "brand_plural"`** (or `forbid_first_person_singular: true`): Verify zero unquoted `I`, `my`, or `myself` in prose, tables, headings, and blockquotes.
- **`voice_mode: "solo_first_person"`**: Keep natural first-person singular (`I`, `my`) consistent without slipping into impersonal third-person.
- **`voice_mode: "neutral"`**: Keep product/organization third-person consistent throughout.
- **`forbidden_tokens`:** Confirm zero appearances outside `allowed_exceptions`.
- **Placeholders:** Confirm zero unfilled placeholders (no draft markers, bracketed fill tokens, or angle-bracket fill tokens).

## 6. Verify GEO Blockquote Word Counts (`40–60` Words)

Every GEO blockquote is parsed from Markdown blockquotes (`> ...`) in:
- **Section 2 (`## 2. Primary Landing Route (/) Copy & GEO Identity Block`)**: 1 standalone identity summary blockquote.
- **Section 6 (`## 6. Frequently Asked Questions (40-60 Word GEO Answers)`)**: Standalone answer blockquotes (default 4+ answers, or enough so Section 2 + Section 6 total `>= geo_block_count`, default `5`).

Rules for each GEO blockquote:
1. Must be a single contiguous Markdown blockquote (`> ...`) with no nested headings or blank lines inside it.
2. Strictly `40 <= word_count <= 60` words (whitespace-separated tokens). Aim for `46–54` words to leave a safe margin.
3. Must be self-contained: names the entity/product, what it does, for whom, and one concrete proof or scope detail so an answer engine can extract it verbatim.
4. Keep each GEO blockquote clean of banned words, rhetorical tells, and voice violations.

## 7. Final Template Assembly

Assemble `docs/stage-1-final-copy-and-pitch.md` using `templates/stage-1-final-copy-and-pitch.template.md`:
- Keep all 7 numbered H2 headings exact and in order.
- Complete the 7-row audit table in Section 7 with concrete evidence and `PASS` status only after verifying each check.
