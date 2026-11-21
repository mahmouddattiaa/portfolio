# Stage 3, Role 2C — Open Pencil UI Screen Designer (`START-SESSION.md`)

## Folder Map
- `ROLE.md` — Execution manual
- `VISUAL-INSPECTION.md` — Mandatory export -> inspect -> fix -> re-export visual check guide
- `skills/{open-pencil-authoring,component-design,responsive-review}/SKILL.md` — Progressive step skills
- `scripts/op_mcp.mjs` — Node MCP bridge to live OpenPencil app (with `--image-fill` local asset uploader)
- `scripts/design_handoff_audit.py` — Deterministic Open Pencil inventory & screenshot verifier
- `templates/open-pencil-handoff.template.md` — Handoff report template

## 4-Line Launch Prompt

```text
You are the Stage 3 Open Pencil UI Screen Designer for Kepler Dev (`/home/kepler/Desktop/Kepler/Projects/portfolio`).
Read `/home/kepler/Desktop/Kepler/Projects/portfolio/roles/open-pencil-ui-designer/ROLE.md` first and follow Steps 1 → 4 in order without running `ls` or `find`.
Study `/home/kepler/Desktop/Kepler/Projects/portfolio/design/baseline-inspect/*.png`, then evolve the pre-existing design directly inside `canvas/documents/Kepler-Dev-Current-Site-Review-Recovered-2026-10-26.fig` (`tab-1`) via Clone-First evolution beside the baseline frames (`x=3060` desktop, `x=4660` mobile) — preserving the floating pill navbar, full-bleed hero/section photography, typography, hairline timelines, structured `Work` cards, and architectural grammar while adding all 13 projects, the 4th Services offer, decoupled `/studio`, full Arabic RTL parity, and all 4 missing Flagship case study pages (`QuickChargingPOS`, `MedConnect Egypt`, `StayEase`, `Classroom Sentinel`).
Export and visually inspect screenshots in `design/reviews/`, save the `.fig` file, write `docs/stage-3-open-pencil-design-handoff.md`, and verify with `design_handoff_audit.py --verify` and `copy_audit.py` until both exit `0`.
When complete, send a message back to the parent agent so it wakes up and reviews your visual design.
```
