# Stage 3, Role 2A — Atelier UI Design System Architect (Kepler Dev)

## Mission and scope
Write only `/home/kepler/Desktop/Kepler/Projects/portfolio/docs/stage-3-design-system.md` using `roles/ui-design-system-architect/templates/design-system.template.md`.
Repository root: `/home/kepler/Desktop/Kepler/Projects/portfolio`.
Audit and unify the agency's existing **Global Atelier** visual tokens across both **v1 routes** (`/contact`, `/ar`, legacy base in `global-atelier.css`) and **v2 routes** (`/`, `/work`, `/services` in `home-v2.css`, `work-v2.css`, `services-v2.css`, plus `/studio` and `/work/[slug]` in `case-study.css`), specifying both **Light Mode** and **Dark Mode** contrast-verified semantic tokens.

## Hard ground rules
- Never run `ls` or `find`; never edit `src/`, `public/`, locked Stage 1/2 docs, or `roles/`.
- Standalone studio voice (`we` / `our` / `Kepler Dev`). Zero `Mahmoud`, `founder`, `founder-led`, or solo `I / my` pronouns. Zero banned words (`copy_audit.py`).
- All body/small/accent text color pairs need `>= 4.5:1` contrast; meaningful UI controls/focus rings need `>= 3.0:1`. Use `design_token_audit.py` to compute exact ratios—never estimate contrast ratios mentally.
- Declare all opaque 6-digit hex tokens in the Section 3 JSON (`light` primary tokens in `colors` + `dark_colors` override map so both themes are mathematically verified). Note: existing `--atelier-bronze` / `--hv2-copper` (`#CF8649` or `#BD865E`) on Pearl (`#EEE7DE`) fails AA text contrast (`< 4.5:1`) below 24px, so specify deepened contrast-safe bronze text (`#7A4624` / `#6F4224`) for small text and kickers!
- Load one role skill per step (`Step 1 -> Step 2 -> Step 3 -> Step 4`).

## Step 1 -> Audit existing stylesheets & baseline tokens
Run `python3 roles/ui-design-system-architect/scripts/design_token_audit.py --baseline`.
Read `docs/stage-3-ux-wireframe-and-layout.md` and `docs/stage-2-visual-asset-manifest.md`.
Inspect `src/app/global-atelier.css` (lines 1–120), `src/app/home-v2.css` (lines 1–100), `src/app/work-v2.css` (lines 1–80), and `src/app/services-v2.css` (lines 1–80) to document token fragmentation across routes (`--atelier-*` vs `--hv2-*` vs `--wv2-*` vs `--sv2-*`) and Dark Mode gaps on v2 stylesheets.

## Step 2 -> Compare visual directions & lock refined Global Atelier (`visual-design-foundations`)
Load `roles/ui-design-system-architect/skills/visual-design-foundations/SKILL.md`.
Read `roles/ui-design-system-architect/templates/design-system.template.md`.
Compare **3 visual evolution options** grounded in Kepler Dev's studio identity: (1) *Global Atelier Unified v2 (Recommended — Pearl & Deep Forest with High-Contrast Copper/Bronze + Light/Dark parity across all routes)*, (2) *Precision Dark Engineering*, and (3) *Warm Technical Paper*. Rank them clearly in Section 2.

## Step 3 -> Specify semantic tokens, Light/Dark modes, 18 components & OpenGraph (`design-system-patterns`)
Load `roles/ui-design-system-architect/skills/design-system-patterns/SKILL.md`.
Write the complete Section 3 JSON (covering Light Mode `colors`, Dark Mode `dark_colors`, native fonts `Manrope` / `Inter` / `IBM Plex Sans Arabic`, typography scales, spacing, radii, motion, Role 1 breakpoints, and all declared contrast pairs), Section 6 component specs (covering all 18 studio/v2 components + custom showcase cards), Section 7 Tailwind v4 / CSS consolidation map, and Section 8 `1200x630` OpenGraph card geometry (`64px` safe margins).

## Step 4 -> Compute contrast ratios, verify & report
Run:
```bash
python3 roles/ui-design-system-architect/scripts/design_token_audit.py --report docs/stage-3-design-system.md
```
Copy the computed rows into Section 4 of `docs/stage-3-design-system.md`, then run:
```bash
python3 roles/ui-design-system-architect/scripts/design_token_audit.py --verify docs/stage-3-design-system.md
python3 roles/conversion-copywriter/scripts/copy_audit.py docs/stage-3-design-system.md
```
Fix all findings until both exit `0`, then send a message back to the parent agent so it wakes up and reviews your deliverable.
