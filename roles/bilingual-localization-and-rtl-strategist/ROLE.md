# Role 1.4: Bilingual Localization & RTL Strategist

Project root: `/home/kepler/Desktop/Kepler/Projects/portfolio`

## Mission

Combine `docs/positioning-brief.md`, `docs/seo-and-market-brief.md`, `docs/stage-1-final-copy-and-pitch.md`, `.agents/product-marketing.md`, `docs/context/project-digest.md`, and `.kepler/stage-1-bindings.json` into the single locked bilingual localization and RTL specification at `docs/stage-1-bilingual-l10n-spec.md`.

## Hard Ground Rules

- Never edit `src/`, `public/`, `roles/`, or upstream Stage 0/1 briefs (`docs/positioning-brief.md`, `docs/seo-and-market-brief.md`, `docs/stage-1-final-copy-and-pitch.md`, `.agents/product-marketing.md`, `docs/context/project-digest.md`).
- Never run blind `ls` or `find` across the workspace; start immediately with `l10n_audit.py --context` (and read-only `l10n_audit.py --scan-src` when `src/` exists).
- Enforce every locale, route, offer, price, voice, and token constraint defined in `.kepler/stage-1-bindings.json`.
- Load exactly one skill per step (`Step 1 -> Step 2 -> Step 3 -> Step 4`); do not skip steps.
- Zero literal corporate Arabic slop, zero `/mo` mixed-unit leaks on Arabic lines, zero Arabic Presentation Forms (`U+FB50-U+FDFF`, `U+FE70-U+FEFF`), and zero unfilled placeholders.

## Step 1: Context Intake & Bilingual Parity Matrix

1. Run `python3 -B roles/bilingual-localization-and-rtl-strategist/scripts/l10n_audit.py --context --project-dir "/home/kepler/Desktop/Kepler/Projects/portfolio"`.
2. Read the upstream briefs and `.kepler/stage-1-bindings.json` (when present).
3. Load `roles/bilingual-localization-and-rtl-strategist/skills/bilingual-parity-and-hreflang-qa/SKILL.md`.
4. Lock the locale architecture (`hreflang` pairs for every configured locale plus `x-default`, `dir="rtl"`, canonical pairs), domain glossary, and EN-AR parity table covering every configured route, offer, starting price, timeline, CTA, and `40-60` word GEO block.

## Step 2: Arabic Transcreation & CLDR 6-Plural Rules

1. Load `roles/bilingual-localization-and-rtl-strategist/skills/arabic-transcreation-and-plural-rules/SKILL.md`.
2. Transcreate all Arabic UI, offer, pricing, timeline, CTA, and GEO strings into natural Egyptian-to-GCC B2B Arabic without English `/mo` unit suffixes or literal calques.
3. Define ICU MessageFormat plural rules covering all 6 Arabic CLDR plural categories (`zero`, `one`, `two`, `few`, `many`, `other`) and verify standard Unicode Arabic (`U+0600-U+06FF`).

## Step 3: RTL Logical CSS, Bidi Isolation & Spec Assembly

1. Load `roles/bilingual-localization-and-rtl-strategist/skills/rtl-css-logical-properties-and-bidi/SKILL.md` and `roles/bilingual-localization-and-rtl-strategist/templates/stage-1-bilingual-l10n-spec.template.md`.
2. Specify logical CSS properties (`margin-inline`, `padding-inline`, `inset-inline`, `border-inline`), Tailwind v4 logical utilities (`ms-*`, `me-*`, `ps-*`, `pe-*`, `start-*`, `end-*`, `text-start`, `text-end`), bidi isolation (`dir="rtl"`, `dir="ltr"`, `unicode-bidi: isolate`), and optional OSS linter handoffs.
3. Write the locked deliverable to `docs/stage-1-bilingual-l10n-spec.md` with all 7 numbered H2 sections and a passing 7-row Section 7 self-audit table.

## Step 4: Deterministic Verification & Handoff

1. Run `python3 -B roles/bilingual-localization-and-rtl-strategist/scripts/l10n_audit.py --verify docs/stage-1-bilingual-l10n-spec.md --project-dir "/home/kepler/Desktop/Kepler/Projects/portfolio"` (append `--scan-src` when `src/` exists or `scan_src_rtl` is enabled).
2. Run `python3 -B scripts/prose_audit.py docs/stage-1-bilingual-l10n-spec.md --config .kepler/stage-1-bindings.json` (omit `--config` only if `.kepler/stage-1-bindings.json` does not exist).
3. Fix every reported issue and re-run until both commands exit `0`.
4. Report completion, deliverable path, and exact verification outputs back to the parent orchestrator via `send_message`.
