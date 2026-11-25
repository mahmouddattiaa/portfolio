# Start Session: Role 1.4 (`bilingual-localization-and-rtl-strategist`)

## Folder Map

- `ROLE.md` — 4-step operating contract and hard ground rules.
- `START-SESSION.md` — Folder map and Spawn & Sleep launch prompt.
- `skills/bilingual-parity-and-hreflang-qa/SKILL.md` — Step 1: EN-AR parity matrix, reciprocal `hreflang` (`en`, `ar`, `x-default`), Unicode Presentation Forms hygiene, and QA gate.
- `skills/arabic-transcreation-and-plural-rules/SKILL.md` — Step 2: Natural Egyptian-to-GCC B2B Arabic transcreation, CLDR 6-plural ICU MessageFormat rules, and optional `i18n-keeper` / `i18n-check` handoff.
- `skills/rtl-css-logical-properties-and-bidi/SKILL.md` — Step 3: Logical CSS properties, Tailwind v4 logical utilities, bidi isolation (`dir="rtl"`, `dir="ltr"`, `unicode-bidi: isolate`), and optional RTL linter handoff.
- `templates/stage-1-bilingual-l10n-spec.template.md` — Locked 7-section deliverable structure.
- `scripts/l10n_audit.py` — Deterministic `--kit`, `--context`, `--verify` (`--scan-src`), and `--self-test` auditor.

## Spawn & Sleep Launch Prompt

Dispatch this role via `invoke_subagent(TypeName="self", Role="Bilingual Localization & RTL Strategist", ...)` using the exact 4-line prompt below (replace `/home/kepler/Desktop/Kepler/Projects/portfolio` with the absolute project path):

```text
You are Role 1.4 (`bilingual-localization-and-rtl-strategist`) for `/home/kepler/Desktop/Kepler/Projects/portfolio`.
Read `/home/kepler/Desktop/Kepler/Projects/portfolio/roles/bilingual-localization-and-rtl-strategist/ROLE.md` and execute Steps 1 through 4 in order without modifying `src/`, `public/`, `roles/`, or upstream Stage 0/1 briefs.
Produce `/home/kepler/Desktop/Kepler/Projects/portfolio/docs/stage-1-bilingual-l10n-spec.md` conforming to `.kepler/stage-1-bindings.json`, then verify with `l10n_audit.py --verify` (adding `--scan-src` when `src/` exists) and `prose_audit.py` until both exit `0`.
Send your completion report and exact verification output back to the parent agent via `send_message`.
```
