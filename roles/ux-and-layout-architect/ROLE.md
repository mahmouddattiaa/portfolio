# Stage 3, Role 1 — Multi-Page UX & Funnel Architect (Kepler Dev)

## Single mission
Write only `/home/kepler/Desktop/Kepler/Projects/portfolio/docs/stage-3-ux-wireframe-and-layout.md` using `roles/ux-and-layout-architect/templates/wireframe-and-layout.template.md`.
Repository root: `/home/kepler/Desktop/Kepler/Projects/portfolio`.

## Hard ground rules
- Never edit `src/`, `public/`, locked Stage 1/2 docs, or `roles/`.
- Never run `ls` or `find` to discover context; all input paths exist.
- Use standalone studio voice (`we` / `our` / `Kepler Dev`). **Zero** `Mahmoud`, `founder`, `founder-led`, `Upwork`, `Mostaql`, or solo `I / my` pronouns. Keep `mahmouddattiaa7@gmail.com` only as the contact fallback email.
- Preserve all 13 studio projects: **6 Flagships** (`Glitre Loyalty Platform`, `HS VPN`, `QuickChargingPOS`, `MedConnect Egypt`, `StayEase`, `Classroom Sentinel`) linking to `/work/[slug]`, and **7 Showcase/R&D Builds** (`Aksira`, `FitForge`, `Qiraaty`, `Focus Ritual`, `GetLab System`, `AI Collab Platform`, `AgencyOS`) on `/work`.
- Preserve exact cover paths and frame types from `docs/stage-2-visual-asset-manifest.md` (wrapping paths with spaces in backticks). Do not invent PNGs for spec-backed builds.
- Use ASCII component trees and tables only; no new Mermaid or JSON in this layout blueprint.
- Load one role skill per step (`Step 1 -> Step 2 -> Step 3 -> Step 4`). Role 2 owns color/font tokens; Role 3 owns final approval readiness.

## Step 1 -> Inventory & multi-route conversion funnel (`cro`)
Run `python3 roles/ux-and-layout-architect/scripts/wireframe_audit.py --context`.
Read `docs/stage-1-final-copy-and-pitch.md`, `docs/context/projects-digest.md`, and `.agents/product-marketing.md`.
Load `roles/ux-and-layout-architect/skills/cro/SKILL.md`.
Map every copy block across `/`, `/work`, `/work/[slug]`, `/services`, `/studio`, `/contact`, and `/ar` (replacing `#founder` / `/mahmoud` with `#studio` / `/studio`).

## Step 2 -> Information architecture & deep dives (`site-architecture`)
Read `docs/stage-2-flagship-case-studies.md` and `docs/seo-and-market-brief.md` in focused sections.
Load `roles/ux-and-layout-architect/skills/site-architecture/SKILL.md`.
Map heading hierarchy (`H1 -> H2 -> H3`), `/work` 13-project filter matrix (`Web & Dashboards`, `Mobile & POS Apps`, `AI & Automation`, `Studio R&D`), and the 6 dedicated `/work/[slug]` deep dives (Executive Snapshot, Before/After Situation, Architecture Diagram, 3 Decisions, 5-Step Walkthrough, CTA).

## Step 3 -> Responsive grids, frames & fold budgets (`responsive-design`)
Read `docs/stage-2-visual-asset-manifest.md` and `roles/ux-and-layout-architect/templates/wireframe-and-layout.template.md`.
Load `roles/ux-and-layout-architect/skills/responsive-design/SKILL.md`.
Complete all 10 numbered H2 sections cleanly: `1440x900` and `390x844` above-the-fold height budgets, `320px` reflow & `200%` zoom, compact mobile section budgets, collapsed card geometry, all 13 frame mappings + named states for all 6 custom components, `/contact` 6-field qualification form, and `>=44x44px` accessibility targets.

## Step 4 -> Deterministic verification & wakeup
Run:
```bash
python3 roles/ux-and-layout-architect/scripts/wireframe_audit.py --verify docs/stage-3-ux-wireframe-and-layout.md
python3 roles/conversion-copywriter/scripts/copy_audit.py docs/stage-3-ux-wireframe-and-layout.md
```
Fix all findings until both exit `0`, populate Section 10 with real command evidence, then send a message back to the parent agent so it wakes up and reviews your deliverable.
