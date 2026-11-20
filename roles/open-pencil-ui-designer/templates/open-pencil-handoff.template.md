# Stage 3 Role 2C — Open Pencil Design Handoff (Kepler Dev)

Replace every `FILL` marker. Keep all eight numbered H2 headings and one JSON inventory block. Record actual document, page, node IDs, and inspected `design/reviews/*.png` export paths.

## 1. Design Summary and Saved Artifact
FILL: direction (`Global Atelier Unified v2`), native `.fig` save path (`/home/kepler/Desktop/Kepler/Projects/portfolio/design/kepler-dev-atelier.fig`), preserved unrelated tab (`tab-1` `Untitled`), summary of editable pages built, components created, and real project media embedded.

## 2. Machine-Readable Inventory
Replace placeholder entries with actual IDs, heights, colors, components, and inspected `export_path`s (expand `frames` to cover every required screen kind). Do not set `reviewed: true` unless the PNG was actually opened via `read_file`.

```json
{
  "direction": "Global Atelier Unified v2",
  "document_id": "FILL",
  "file_path": "/home/kepler/Desktop/Kepler/Projects/portfolio/design/kepler-dev-atelier.fig",
  "frames": [
    {"name": "Homepage Desktop (1440)", "kind": "home-desktop", "project": "", "page_id": "FILL", "node_id": "FILL", "width": 1440, "height": 900, "export_path": "/home/kepler/Desktop/Kepler/Projects/portfolio/design/reviews/FILL.png", "reviewed": false}
  ],
  "components": [
    {"name": "SiteHeader", "node_id": "FILL", "variants": ["Desktop", "Mobile"]}
  ],
  "colors": {
    "canvas": {"variable_id": "FILL", "value": "#EEE7DE"},
    "surface": {"variable_id": "FILL", "value": "#FAF7F1"},
    "surface_raised": {"variable_id": "FILL", "value": "#F6F1EA"},
    "surface_hover": {"variable_id": "FILL", "value": "#E5DBD1"},
    "text": {"variable_id": "FILL", "value": "#202826"},
    "muted_text": {"variable_id": "FILL", "value": "#4B5551"},
    "disabled_text": {"variable_id": "FILL", "value": "#47514D"},
    "accent": {"variable_id": "FILL", "value": "#6F4224"},
    "accent_hover": {"variable_id": "FILL", "value": "#583219"},
    "on_accent": {"variable_id": "FILL", "value": "#FAF7F1"},
    "border_decorative": {"variable_id": "FILL", "value": "#D7CCC1"},
    "border_control": {"variable_id": "FILL", "value": "#56605C"},
    "focus": {"variable_id": "FILL", "value": "#6F4224"},
    "success": {"variable_id": "FILL", "value": "#1F5A45"},
    "warning": {"variable_id": "FILL", "value": "#6F4224"},
    "danger": {"variable_id": "FILL", "value": "#8F2D2D"}
  }
}
```

Required `frames` kinds: `home-desktop`, `home-mobile`, `fold-desktop` (`1440x900`), `fold-mobile` (`390x844`), `reflow-mobile` (`320`), `home-dark-preview`, `ar-desktop`, `ar-mobile`, `work-desktop`, `work-mobile`, `services-desktop`, `studio-desktop`, `contact-desktop`, `contact-mobile`, `detail-desktop` & `detail-mobile` (covering `Glitre Loyalty Platform`, `HS VPN`, `QuickChargingPOS`, `MedConnect Egypt`, `StayEase`, `Classroom Sentinel`), `social-card` (`1200x630`), and `component-library`.

## 3. Copy, Assets and Component Coverage
FILL: verify exact locked English (`stage-1-final-copy-and-pitch.md`) and Arabic RTL (`stage-3-arabic-rtl-spec.md`) copy, real image fills embedded across `/work` & flagship boards, interactive/illustrative custom components (`GlitreIllustrativeDeviceFrames`, `ClassroomSentinelPipelineCard`, `AksiraDualEngineCard`, `ShowcaseArchitectureBadge`), and 18 named components.

## 4. Font and Variable Checks
FILL: `list_available_fonts` / `get_font_status` checks confirming `Manrope`, `Inter`, `IBM Plex Sans Arabic`, and `JetBrains Mono` in Open Pencil, Arabic glyph verification, and `KeplerAtelier` (`Light` & `Dark`) variable collection IDs.

## 5. Measured Layout and State Review
FILL: actual first-view fold check at `1440x900` and `390x844`, `320px` reflow verification, `/work` 13-card & `460px` card measurements, `/ar` RTL visual balance, `44px` tap targets, and `contact` form validation/error states.

## 6. Image Review and Canvas Checks

Record every visual inspection run and screenshot fix below, plus `lint` and `analyze_overlaps` results:

| Section or page / viewport | Node ID | Inspected screenshot path | Visible issue and correction | Recheck image / result |
| --- | --- | --- | --- | --- |
| FILL | FILL | FILL | FILL | FILL |

## 7. Remaining Decisions and Implementation Notes
FILL: summary of any layout tweaks measured on canvas, Stage 4 responsive CSS/browser checks deferred to Next.js/Playwright (`prefers-reduced-motion`, live form API, video playback), and Role 3 Critic refresh readiness.

## 8. Mandatory Self-Audit Checklist

| Check | Status | Evidence |
| --- | --- | --- |
| Native editable `.fig` document saved (`design/kepler-dev-atelier.fig`) | FILL | FILL |
| All `16` Light/Dark token variables and `18` named studio components created | FILL | FILL |
| Multi-route EN (`/` `1440/390/320`, `/work`, `/services`, `/studio`, `/contact`, 6 flagships) & `/ar` RTL screens built | FILL | FILL |
| `1200x630` OpenGraph card built with `64px` safe margins | FILL | FILL |
| Real exported PNGs visually inspected via `read_file` with defects fixed | FILL | FILL |
| `design_handoff_audit.py --verify` & `copy_audit.py` both exit `0` | FILL | FILL |
