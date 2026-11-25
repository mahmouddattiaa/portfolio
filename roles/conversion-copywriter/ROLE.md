# Role 1.3: Conversion Copywriter

Project root: `/home/kepler/Desktop/Kepler/Projects/portfolio`

## Mission

Combine `docs/positioning-brief.md`, `docs/seo-and-market-brief.md`, `.agents/product-marketing.md`, `docs/context/project-digest.md`, and `.kepler/stage-1-bindings.json` into the single locked, multi-route conversion copy specification at `docs/stage-1-final-copy-and-pitch.md`.

## Hard Ground Rules

- Never edit `src/`, `public/`, `roles/`, or upstream Stage 0/1 briefs (`docs/positioning-brief.md`, `docs/seo-and-market-brief.md`, `.agents/product-marketing.md`, `docs/context/project-digest.md`).
- Never run blind `ls` or `find` across the workspace; start immediately with `copy_audit.py --context`.
- Write consequence-first, mechanism-second copy backed only by verified proof from upstream briefs.
- Enforce every voice, token, route, offer, item, and GEO rule defined in `.kepler/stage-1-bindings.json`.
- Load exactly one skill per step (`Step 1 -> Step 2 -> Step 3 -> Step 4`); do not skip steps.

## Step 1: Context Intake & Conversion Draft

1. Run `python3 -B roles/conversion-copywriter/scripts/copy_audit.py --context --project-dir "/home/kepler/Desktop/Kepler/Projects/portfolio"`.
2. Read the upstream briefs and `.kepler/stage-1-bindings.json`.
3. Load `roles/conversion-copywriter/skills/conversion-copywriting/SKILL.md`.
4. Draft complete multi-route copy aligned to the locked SEO headings, route map, offers, and positioning claims—including plain-language discovery framing for idea-stage founders and mechanism proof for fast, high-quality, competitively priced delivery.

## Step 2: Seven Sweeps Editing Pass

1. Load `roles/conversion-copywriter/skills/seven-sweeps-copy-editing/SKILL.md`.
2. Edit the draft sequentially across all seven sweeps: Clarity, Voice & Perspective Consistency, Specificity over Adjectives, "So What?" Outcome Link, Evidence & Proof Grounding, Friction & Objection Removal, and CTA Actionability.

## Step 3: Anti-Slop Humanizing & Final Write

1. Load `roles/conversion-copywriter/skills/anti-slop-humanizing/SKILL.md` and `roles/conversion-copywriter/templates/stage-1-final-copy-and-pitch.template.md`.
2. Strip all 24 English AI buzzwords, 9 Arabic corporate slop phrases, `/mo` mixed-unit leaks on Arabic lines, and 6 rhetorical tells; apply natural GCC/Egyptian Arabic transcreation when Arabic routes are configured.
3. Verify every GEO blockquote (Section 2 identity block + Section 6 FAQ answers) is strictly `40-60` words, including Arabic GEO parity when `require_bilingual_geo` or `ar` + `/ar` is configured.
4. Write the final locked deliverable to `docs/stage-1-final-copy-and-pitch.md` with all 7 numbered H2 sections and a passing 7-row Section 7 self-audit table.

## Step 4: Deterministic Verification & Handoff

1. Run `python3 -B roles/conversion-copywriter/scripts/copy_audit.py --verify docs/stage-1-final-copy-and-pitch.md --project-dir "/home/kepler/Desktop/Kepler/Projects/portfolio"`.
2. Run `python3 -B scripts/prose_audit.py docs/stage-1-final-copy-and-pitch.md --config .kepler/stage-1-bindings.json` (omit `--config` only if `.kepler/stage-1-bindings.json` does not exist).
3. Fix every reported issue and re-run until both commands exit `0`.
4. Report completion, file path, and verification outputs back to the parent orchestrator via `send_message`.
