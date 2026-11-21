# Role 2C — Open Pencil UI Screen Designer (Kepler Dev)

## Mission
Evolve the pre-existing design directly inside `/home/kepler/Desktop/Kepler/Projects/portfolio/canvas/documents/Kepler-Dev-Current-Site-Review-Recovered-2026-10-26.fig` (`tab-1`), placing evolved side-by-side `1440px` & `390px` frames beside the untouched baseline (`x=0..2820`), adding all missing projects (`13` total on `/work`) and the `4` missing flagship case study pages (`QuickChargingPOS`, `MedConnect Egypt`, `StayEase`, `Classroom Sentinel`) **without scrapping or replacing the existing visual identity, photography, floating glass pill navbar, hairline timelines, or editorial proportions**.
Export inspected review PNGs to `design/reviews/` and write `/home/kepler/Desktop/Kepler/Projects/portfolio/docs/stage-3-open-pencil-design-handoff.md`.
Repository root: `/home/kepler/Desktop/Kepler/Projects/portfolio`. Never edit `src/`, `public/`, locked Stage 1–2 docs, or other `roles/`.

## Core Preservation Mandate (Clone-First, Zero Synthetic AI Redesign)
- **Study the real baseline visually first:** Inspect `/home/kepler/Desktop/Kepler/Projects/portfolio/design/baseline-inspect/*.png` via `read_file` before making ANY canvas edits.
- **Clone & evolve pre-existing frames (`clone_node`) instead of building synthetic layouts from zero:** Preserve the floating dark glass pill navbar, full-bleed atmospheric tree/sculpture photography (`public/media/home/hero-tree.webp`, `branch.webp`, `public/media/kepler-fold/*.png`), signature `Manrope` `450` tight-tracked display headlines (`Kepler Dev` bronze highlight), `#EEE7DE` cream / `#F6F1EA` card / `#071C18` forest alternation, vertical copper `01`–`04` timeline with embedded mini artifact cards, `#F6F1EA` bordered `Work` cards with right-hand `OUR ROLE / CONTEXT / EVIDENCE / SURFACES` hairline columns, `/services` copper top-accent cards, and `/work/[slug]` `ON THIS PAGE` sticky rails + `Before/After` cream-vs-forest cards + hairline KPI strip + dashed-group diagrams.
- **What you change & improve (surgical + additive):**
  1. Remove all personal/founder decoupling leaks (`Founder` -> `Studio`, `/mahmoud` -> `/studio`, founder portrait/bio -> atmospheric studio photo & studio collective voice `"we / our / Kepler Dev"`, personal quote attribution -> architectural studio principle).
  2. Improve real baseline proportion bugs (e.g., fix `Home · Mobile 390` sticky pill button overlapping Glitre capture; expand `/services` cleanly from 3 to 4 offers in a balanced 2x2 grid so cards never squeeze; refine Arabic RTL parity & spacing).
  3. Add **all 13 projects** to `02 · Work` (expand `All work` + `Client work` to the `5` category pills `All work (13)`, `Web & Dashboards (8)`, `Mobile & POS Apps (5)`, `AI & Automation (5)`, `Studio R&D (5)`; `6` full Flagship cards + concise Studio Showcase grid matching `#F6F1EA` border/tag grammar).
  4. Add the **3rd featured work** (`QuickChargingPOS`) onto `01 · Home` cleanly in the exact existing `Selected Work` rhythm.
  5. Rebuild `07 · Arabic home` by cloning & RTL-mirroring the evolved `01 · Home` design (preserving floating RTL glass pill nav, photography, timeline, Studio forest band, Services `01–04`, FAQ, footer — zero provisional English banner, Unicode `\u2066...\u2069` BiDi isolation on LTR USD/numeric ranges).
  6. Add **dedicated pages for the 4 missing Flagship Case Studies** (`15 · QuickChargingPOS`, `16 · MedConnect Egypt`, `17 · StayEase`, `18 · Classroom Sentinel`) **cloned from `08 · HS VPN` / `09 · Glitre`** so all 6 case studies share the exact same editorial layout, `ON THIS PAGE` rail, Before/After cards, authentic screenshots (or StayEase portrait scroll frames / Classroom Sentinel 3-stage pipeline), and 3 decisions (`HOW` boxes).

## Ground rules
- Never run `ls` or `find`; use supplied input paths. Work inside `Kepler-Dev-Current-Site-Review-Recovered-2026-10-26.fig`.
- Standalone studio voice (`we` / `our` / `Kepler Dev`). Zero `Mahmoud`, `founder`, `founder-led`, or solo `I / my` pronouns inside redesigned slides or handoff docs (only `mahmouddattiaa7@gmail.com` contact fallback email remains). Zero banned words (`copy_audit.py`).
- All Open Pencil MCP calls go through `node roles/open-pencil-ui-designer/scripts/op_mcp.mjs <tool> '<json>'` (or `--file /tmp/...json` or clean exiting Node scripts calling `/home/kepler/.local/bin/openpencil-mcp` with `process.exit(0)`). Use `op_mcp.mjs --image-fill <node_id> <asset_path>` (or `set_image_fill`) for real screenshots/photos. Always `switch_page` before `export_image`.
- Preserve all untouched baseline frames at `x=0..2820`; place evolved frames side-by-side at `x=3060` (Desktop) and `x=4660` (Mobile).
- Bind variable tokens (`KeplerAtelier` collection, respecting `#6F4224`/`#8F5327` Light & `#D4A47A` Dark AA readability alongside exact baseline `#EEE7DE` / `#071C18` / `#F6F1EA` surfaces) and maintain the 18 named studio component definitions cleanly linked to your preserved design system.
- Strictly follow `roles/open-pencil-ui-designer/VISUAL-INSPECTION.md`: export completed frames to `design/reviews/*.png`, visually inspect every PNG alongside `/home/kepler/Desktop/Kepler/Projects/portfolio/design/baseline-inspect/*.png` using `read_file`, verify proportions & visual fidelity, fix defects, re-export, and `save_file` frequently.

## Step 1 -> Study Baseline Pixels, Fonts & Assets (`open-pencil-authoring`)
Load `roles/open-pencil-ui-designer/skills/open-pencil-authoring/SKILL.md` and `roles/open-pencil-ui-designer/VISUAL-INSPECTION.md`.
Read the baseline PNGs under `design/baseline-inspect/` via `read_file`, plus `docs/stage-1-final-copy-and-pitch.md`, `docs/stage-2-visual-asset-manifest.md`, `docs/stage-2-flagship-case-studies.md`, `docs/stage-3-design-system.md` (§3), and `docs/stage-3-arabic-rtl-spec.md` (§3).
Verify `list_documents` and `get_font_status` (`Manrope`, `Inter`, `IBM Plex Sans Arabic`, `JetBrains Mono`).

## Step 2 -> Establish `KeplerAtelier` Tokens & Extract Real Reusable Components (`component-design`)
Load `roles/open-pencil-ui-designer/skills/component-design/SKILL.md`.
Create the `KeplerAtelier` collection (`Light` + `Dark` modes matching `docs/stage-3-design-system.md` Section 3 JSON schema) and derive/register the **18 named studio components** on `Components & States (Preserved Atelier)` directly from the pre-existing `.fig` buttons, pill nav, filter chips, `Work` cards, accordion rows, diagrams, and case-study rails (including `GlitreIllustrativeDeviceFrames`, `ClassroomSentinelPipelineCard`, `AksiraDualEngineCard`, `ShowcaseArchitectureBadge`). Export `design/reviews/components-and-states.png`, visually inspect via `read_file`.

## Step 3 -> Clone, Improve & Expand Multi-Route Screens (`responsive-review`)
Load `roles/open-pencil-ui-designer/skills/responsive-review/SKILL.md`.
Across pre-existing pages `0:3`–`0:11` (placed side-by-side at `x=3060` / `x=4660`) and new pages (`Components & States`, `New · /studio`, `15 · QuickChargingPOS`, `16 · MedConnect Egypt`, `17 · StayEase`, `18 · Classroom Sentinel`, plus `Fold & Dark Mode / OG 1200x630`):
1. Clone baseline frames (`clone_node`) and execute all structural upgrades, mobile bug fixes, studio decoupling, 13-project expansion (`02 · Work`), 4th offer (`03 · Services`), full Arabic RTL mirror (`07 · Arabic home`), and all 4 missing Flagship case studies (`15`–`18`).
2. Attach all real PNG/WebP project assets & studio photography via `set_image_fill`.
3. Run `lint` and `analyze_overlaps`, export every evolved frame + zoomed crops + side-by-side views to `design/reviews/*.png`, visually inspect every PNG against `design/baseline-inspect/*.png` via `read_file`, refine proportions, re-export, and `save_file`.

## Step 4 -> Write Handoff & Run Deterministic Audit
Read `roles/open-pencil-ui-designer/templates/open-pencil-handoff.template.md`.
Write `/home/kepler/Desktop/Kepler/Projects/portfolio/docs/stage-3-open-pencil-design-handoff.md` with exact returned document/page/node IDs, inspected screenshot paths, and real overlap/font results.
Run:
```bash
python3 roles/open-pencil-ui-designer/scripts/design_handoff_audit.py --verify docs/stage-3-open-pencil-design-handoff.md
python3 roles/conversion-copywriter/scripts/copy_audit.py docs/stage-3-open-pencil-design-handoff.md
```
Fix all findings until both exit `0`, then send a message back to the parent agent.
