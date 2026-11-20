---
name: component-design
description: Apply the reviewed Global Atelier Unified v2 variables and reusable component states as native Open Pencil layers.
---

# Components from the Reviewed Global Atelier System

Read the single JSON token block in `docs/stage-3-design-system.md`. Create a native `KeplerAtelier` variable collection (`Light` and `Dark` modes matching the 16 `colors` and 16 `dark_colors` hex values) plus numeric spacing/radius variables (`FLOAT`) and font names (`STRING`).

Build all 18 named components from `docs/stage-3-design-system.md` Section 6 with appropriate variants and instantiate or inspect them cleanly:
- Keep active primary buttons using `on_accent` (`#FAF7F1`) on Light `accent` (`#6F4224`) and `#071C18` on Dark `accent` (`#D4A47A`). Disabled buttons use `surface_hover` + `disabled_text`, never `disabled_text` on `accent`. Focus rings are `3px` solid `focus` with `3px` offset. Feedback uses clear labels and icons, never color alone.
- Build native vector/frame cards for `GlitreIllustrativeDeviceFrames`, `ClassroomSentinelPipelineCard`, `AksiraDualEngineCard`, and `ShowcaseArchitectureBadge` (`QiraatyComplianceBadge`, `GetLabDatabaseBadge`, `AICollabRealtimeBadge`).
- Follow `../../VISUAL-INSPECTION.md`: export each completed board under `design/reviews/`, open the exported PNG via `read_file`, fix any text truncation, contrast defect, or overlap, and inspect the fresh export before saving `design/kepler-dev-atelier.fig`.
