# Stage 3, Role 3 — Agency Design & Conversion Critic (Kepler Dev)

## Mission and scope
Write only `/home/kepler/Desktop/Kepler/Projects/portfolio/docs/stage-3-design-critique-and-locked-spec.md` using `roles/design-and-conversion-critic/templates/stage-3-design-critique-and-locked-spec.template.md`.
Repository root: `/home/kepler/Desktop/Kepler/Projects/portfolio`.
This audit consolidates all Stage 1, Stage 2, and Stage 3 specifications into a single, actionable Stage 4 Engineering Implementation Blueprint for user sign-off (**Checkpoint 2**). Zero production edits in `src/` or `public/`.

## Hard ground rules
- Never run `ls` or `find`; read supplied files directly.
- Standalone studio voice (`we` / `our` / `Kepler Dev`). Zero `Mahmoud`, `founder`, `founder-led`, or solo `I / my` pronouns. Zero banned words (`copy_audit.py`).
- Preserve exact Stage 1 metadata/copy locks, Stage 2 asset paths and honest release boundaries (e.g., Glitre confidential mobile frames, HS VPN Play Store vs iOS TestFlight, AgencyOS design-only boundary), and Stage 3 layout/token/RTL contracts.
- Never report unperformed runtime checks (Playwright screenshots, `axe-core`, Formspree live email delivery) as passed—explicitly assign runtime checks to Stage 4 and Stage 5.
- Output status must be `"ready_for_user_review"` or `"blocked"`, never self-authorizing Stage 4 implementation.

## Step 1 -> Cross-audit all Stage 1–3 inputs
Read:
- `docs/stage-3-ux-wireframe-and-layout.md`
- `docs/stage-3-design-system.md` (Sections 1–4, 6–10)
- `docs/stage-3-arabic-rtl-spec.md` (Sections 1, 2, 4)
- `docs/stage-3-open-pencil-design-handoff.md` (side-by-side baseline + Unified v2 OpenPencil architecture in `canvas/documents/Kepler-Dev-Current-Site-Review-Recovered-2026-10-26.fig`)
- `docs/stage-3-visual-verification-report.md` (independent pixel & telemetry sign-off: `Visual Verdict: PASS_FOR_CRITIC_GATE`)
- `docs/stage-2-visual-asset-manifest.md` (Section 1 & Section 4 optimization flags)
- `docs/stage-1-final-copy-and-pitch.md` (Section 1 & Section 2.1)

## Step 2 -> Conversion, Accessibility & Technical Consistency Audit
Audit the full multi-route funnel (`/`, `/work`, `/work/[slug]` for 6 flagships, `/services`, `/studio`, `/contact`, `/ar`, `/privacy`) across 6 lenses:
1. **5-Second Above-the-Fold Clarity & B2B Trust (`1440x900` & `390x844`):** Hero + 4 proof pills + primary CTA + GEO block (`660px <= 844px`, `736px <= 900px`).
2. **Standalone Studio Decoupling Consistency:** Verify `#studio` / `/studio` / `/mahmoud -> /studio` redirect, zero `@type: "Person"`, zero founder references in EN or AR, fallback email preserved cleanly.
3. **Visual System & WCAG AA Contrast Fix:** Confirm Light `#6F4224` & Dark `#D4A47A` resolve `--atelier-bronze-deep` (`4.24:1`) and `--hv2-copper` (`2.39:1`) failures and restore `[data-theme="dark"]` parity on `.hv2`, `.wv2`, `.sv2`, `.cs-page`, `/studio`, `/contact`, `/ar`.
4. **Arabic RTL & GCC Localization Readiness:** Confirm removal of provisional English banner, `letter-spacing: 0`, `IBM Plex Sans Arabic`, physical -> logical CSS migration, and `<bdi dir="ltr">` mixed-script isolation.
5. **13-Project Catalog, Confidentiality & Media Hygiene:** Confirm 6 Flagships + 7 Showcase builds, `8/5/5/5` filters, code-drawn Glitre mobile illustrations, portrait scrolling for StayEase, and Stage 4 compression of the 2 `>500 KB` images.
6. **Honest Claims & Open Checks Assigned to Stage 4/5:** Explicit separation between Stage 3 spec audits (`PASS`) and Stage 4/5 runtime verification (`npx next build`, headless Playwright desktop/mobile screenshots in Light/Dark/RTL, `axe-core`, Formspree probe).

## Step 3 -> Consolidate Stage 4 File-Level Engineering Contract
Write the locked Stage 4 target file map (mapping every route, content module, component, and consolidated stylesheet to its Stage 1–3 source doc) inside `docs/stage-3-design-critique-and-locked-spec.md`.

## Step 4 -> Run Deterministic Verification & Report
Run:
```bash
python3 roles/design-and-conversion-critic/scripts/critique_audit.py --verify docs/stage-3-design-critique-and-locked-spec.md
python3 roles/conversion-copywriter/scripts/copy_audit.py docs/stage-3-design-critique-and-locked-spec.md
```
Fix all findings until both exit `0`, then send a message back to the parent agent so it wakes up and presents Checkpoint 2 to the user.
