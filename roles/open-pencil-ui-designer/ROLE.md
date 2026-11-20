# Role 2C — Open Pencil UI Screen Designer (Kepler Dev)

## Mission
Build the editable **Global Atelier Unified v2** agency screens in Open Pencil (`design/kepler-dev-atelier.fig`, exporting inspected review PNGs to `design/reviews/`) and write `/home/kepler/Desktop/Kepler/Projects/portfolio/docs/stage-3-open-pencil-design-handoff.md`.
Repository root: `/home/kepler/Desktop/Kepler/Projects/portfolio`. Never edit `src/`, `public/`, locked Stage 1–3 docs, or `roles/`.

## Ground rules
- Never run `ls` or `find`; use supplied input paths. Preserve the existing `Untitled` tab (`tab-1`) in Open Pencil.
- Standalone studio voice (`we` / `our` / `Kepler Dev`). Zero `Mahmoud`, `founder`, `founder-led`, or solo `I / my` pronouns. Zero banned words (`copy_audit.py`).
- All Open Pencil MCP calls go through `node roles/open-pencil-ui-designer/scripts/op_mcp.mjs <tool> '<json>'` (or `--file /tmp/...json`). Use `op_mcp.mjs --image-fill <node_id> <public/projects/...>` to embed real screenshots without printing base64 into context.
- Every native frame/component/text layer must be editable (built via `render` JSX + `create_collection`/`create_variable`/`create_component`, never flat full-page screenshots).
- Strictly follow `roles/open-pencil-ui-designer/VISUAL-INSPECTION.md`: export completed frames to `design/reviews/*.png`, visually inspect the PNGs with `read_file`, fix clipping/overlap, and re-export.
- Load one role skill per step (`Step 1 -> Step 2 -> Step 3 -> Step 4`). Save `design/kepler-dev-atelier.fig` frequently via `save_file`.

## Step 1 -> Verify Open Pencil document, fonts & sources (`open-pencil-authoring`)
Load `roles/open-pencil-ui-designer/skills/open-pencil-authoring/SKILL.md` and `roles/open-pencil-ui-designer/VISUAL-INSPECTION.md`.
Read `docs/stage-3-design-system.md` (Sections 3, 6, 8, 9), `docs/stage-3-ux-wireframe-and-layout.md` (Sections 2–8), and `docs/stage-3-arabic-rtl-spec.md` (Sections 2–3).
Run `node roles/open-pencil-ui-designer/scripts/op_mcp.mjs list_documents '{}'` (open or target `/home/kepler/Desktop/Kepler/Projects/portfolio/design/kepler-dev-atelier.fig`). Run `get_font_status` confirming `Manrope`, `Inter`, `IBM Plex Sans Arabic`, and `JetBrains Mono`.

## Step 2 -> Build variables & 18 components (`component-design`)
Load `roles/open-pencil-ui-designer/skills/component-design/SKILL.md`.
Create the `KeplerAtelier` variable collection (`Light` + `Dark` modes matching all 16 colors from `docs/stage-3-design-system.md` Section 3). On a `Components & States` page, render the **18 named studio components** (including `PrimaryButton`, `SecondaryButton`, `QualificationField` default/error states, `FilterButton`, `GlitreIllustrativeDeviceFrames`, `ClassroomSentinelPipelineCard`, `AksiraDualEngineCard`, `ShowcaseArchitectureBadge`). Export `design/reviews/components-and-states.png`, visually inspect via `read_file`, and fix any defect.

## Step 3 -> Render & inspect multi-route screens (`responsive-review`)
Load `roles/open-pencil-ui-designer/skills/responsive-review/SKILL.md`.
Build organized pages inside `design/kepler-dev-atelier.fig`:
1. **`Homepage (EN)`:** Full `1440px` desktop, `1440x900` fold reference, full `390px` mobile, `390x844` fold reference, `320px` reflow sample, and Dark Mode hero preview.
2. **`Arabic RTL (/ar)`:** `1440px` RTL & `390px` RTL screens in `IBM Plex Sans Arabic` using the locked Arabic copy from `docs/stage-3-arabic-rtl-spec.md`.
3. **`Work, Services, Studio & Contact`:** `/work` (`1440px` + `390px` 13-project catalog & filters), `/services` (`1440px`), `/studio` (`1440px`), and `/contact` (`1440px` + `390px` + validation error state).
4. **`Flagship Case Studies & OG Card`:** Dedicated desktop (`1440px` with `136px` sticky TOC rail) & mobile (`390px`) screens for `Glitre Loyalty Platform`, `HS VPN`, `QuickChargingPOS`, plus key feature boards for `MedConnect Egypt`, `StayEase`, `Classroom Sentinel`, and the `1200x630` OpenGraph Social Card.
Attach real PNG/WebP project assets using `op_mcp.mjs --image-fill`. Run `lint` and `analyze_overlaps`, export key frames to `design/reviews/`, visually inspect them via `read_file`, fix issues, re-export, and save `design/kepler-dev-atelier.fig`.

## Step 4 -> Write handoff & run deterministic audit
Read `roles/open-pencil-ui-designer/templates/open-pencil-handoff.template.md`.
Write `/home/kepler/Desktop/Kepler/Projects/portfolio/docs/stage-3-open-pencil-design-handoff.md` with exact returned document/page/node IDs, inspected screenshot paths, and real overlap/font results.
Run:
```bash
python3 roles/open-pencil-ui-designer/scripts/design_handoff_audit.py --verify docs/stage-3-open-pencil-design-handoff.md
python3 roles/conversion-copywriter/scripts/copy_audit.py docs/stage-3-open-pencil-design-handoff.md
```
Fix all findings until both exit `0`, then send a message back to the parent agent so it wakes up and reviews your Open Pencil design and exports.
