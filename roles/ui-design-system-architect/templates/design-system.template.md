# Stage 3 Role 2A — Kepler Dev Unified Atelier Design System

Replace every `FILL` marker. Keep all eleven exact numbered H2 headings. Write a proposed specification for owner review, using one JSON code block only; CSS examples use `css` fences.

## 1. Existing Styling Audit and Source Locks
FILL: audit of `src/app/global-atelier.css`, `src/app/home-v2.css`, `src/app/work-v2.css`, `src/app/services-v2.css`, and `src/app/case-study.css`; `--baseline` computed contrast issues (e.g., copper `#8F5327` / bronze `#985F3B` vs light Pearl `#EEE7DE` / `#FAF7F1`); token fragmentation across v1/v2 routes (`/studio`, `/contact`, `/ar` vs `/`, `/work`, `/services`); Dark Mode parity gaps on `.hv2`, `.wv2`, `.sv2`; and Role 1 layout locks.

## 2. Three Visual Directions and Recommendation
FILL: compare three concrete studio visual directions and rank them `1`, `2`, `3` (putting the unified *Global Atelier v2* direction first at Rank `1`). State clearly that visual selections remain proposed until owner review before Open Pencil / Stage 4 coding.

| Direction | Palette and typography | Layout character | Trade-off | Rank |
| --- | --- | --- | --- | ---: |
| FILL | FILL | FILL | FILL | 1 |
| FILL | FILL | FILL | FILL | 2 |
| FILL | FILL | FILL | FILL | 3 |

## 3. Machine-Readable Design Tokens
One complete JSON object declaring opaque 6-digit hex tokens for **Light Mode** (`colors`) AND **Dark Mode** (`dark_colors`), native fonts (`Manrope`, `Inter`, `IBM Plex Sans Arabic`), typography scale, spacing, radii, motion, breakpoints, and `contrast_pairs` (minimum 42 Light pairs + explicit Dark Mode `dark_*` contrast pairs).

```json
{
  "direction": "FILL",
  "status": "proposed",
  "colors": {
    "canvas": "#EEE7DE", "surface": "#FAF7F1", "surface_raised": "#F6F1EA", "surface_hover": "#E5DBD1",
    "text": "#202826", "muted_text": "#4B5551", "disabled_text": "#56605C",
    "accent": "#6F4224", "accent_hover": "#583219", "on_accent": "#FAF7F1",
    "border_decorative": "#D7CCC1", "border_control": "#56605C", "focus": "#6F4224",
    "success": "#1F5A45", "warning": "#7A4624", "danger": "#8F2D2D"
  },
  "dark_colors": {
    "canvas": "#071C18", "surface": "#102925", "surface_raised": "#17332E", "surface_hover": "#1E3F39",
    "text": "#EEE7DE", "muted_text": "#BEC8C1", "disabled_text": "#9AA8A0",
    "accent": "#D4A47A", "accent_hover": "#E2B995", "on_accent": "#071C18",
    "border_decorative": "#24433D", "border_control": "#8FA097", "focus": "#D4A47A",
    "success": "#63C79A", "warning": "#D4A47A", "danger": "#F08C8C"
  },
  "fonts": {"sans": "Inter", "display": "Manrope", "arabic": "IBM Plex Sans Arabic", "mono": "JetBrains Mono"},
  "typography": {
    "body": {"font": "sans", "mobile_px": 16, "desktop_px": 16, "line_height_mobile_px": 24, "line_height_desktop_px": 24, "weight": 400},
    "small": {"font": "sans", "mobile_px": 14, "desktop_px": 14, "line_height_mobile_px": 20, "line_height_desktop_px": 20, "weight": 400},
    "h1": {"font": "display", "mobile_px": 32, "desktop_px": 60, "line_height_mobile_px": 36, "line_height_desktop_px": 64, "weight": 500},
    "h2": {"font": "display", "mobile_px": 26, "desktop_px": 44, "line_height_mobile_px": 30, "line_height_desktop_px": 48, "weight": 500},
    "h3": {"font": "sans", "mobile_px": 18, "desktop_px": 22, "line_height_mobile_px": 24, "line_height_desktop_px": 28, "weight": 600},
    "mono": {"font": "mono", "mobile_px": 14, "desktop_px": 14, "line_height_mobile_px": 20, "line_height_desktop_px": 20, "weight": 400}
  },
  "spacing_px": {"none": 0, "xs": 4, "sm": 8, "md": 16, "lg": 24, "xl": 32, "section": 64},
  "radii_px": {"control": 8, "card": 12, "dialog": 16},
  "motion_ms": {"instant": 0, "fast": 140, "standard": 240},
  "breakpoints_px": {"tablet": 600, "compact": 900, "wide": 1200},
  "contrast_pairs": [
    {"name": "light-body-canvas", "foreground": "text", "background": "canvas", "kind": "text"}
  ]
}
```

Declare every required Light Mode pair (42 pairs minimum) PLUS the matching Dark Mode pairs (using `mode: "dark"` on Dark Mode entries in `contrast_pairs`). Never estimate contrast ratios manually.

## 4. Computed Contrast Evidence
Run `python3 roles/ui-design-system-architect/scripts/design_token_audit.py --report docs/stage-3-design-system.md` and paste the computed table here.

| Pair | Foreground | Background | Kind | Ratio | Threshold | Result |
| --- | --- | --- | --- | ---: | ---: | --- |
| FILL | FILL | FILL | FILL | FILL | FILL | FILL |

## 5. Typography, Spacing and Responsive Capacity
FILL: `Manrope`, `Inter`, and `IBM Plex Sans Arabic` scale & tracking policy (`letter-spacing: 0` for `[lang="ar"]` / `[dir="rtl"]`), measure limits, bronze `<12%` viewport rule, and mapping to Role 1's `390x844` and `1440x900` hero fold budgets.

## 6. Components and State Styling
Cover all 18 multi-route studio components and showcase cards (`default`, `hover`, `focus`, `selected`, `disabled`, `pending`, `error`, `success`, `44x44px` minimum tap targets, reduced motion):

| Component | Token usage | States | Geometry and content rule |
| --- | --- | --- | --- |
| SiteHeader | FILL | FILL | FILL |
| HeroAndTrust | FILL | FILL | FILL |
| PrimaryButton | FILL | FILL | FILL |
| SecondaryButton | FILL | FILL | FILL |
| FlagshipWorkStrip | FILL | FILL | FILL |
| WorkCatalogCard | FILL | FILL | FILL |
| FilterButton | FILL | FILL | FILL |
| FaqDisclosure | FILL | FILL | FILL |
| StudioStandardsBand | FILL | FILL | FILL |
| QualificationField | FILL | FILL | FILL |
| QualificationSubmit | FILL | FILL | FILL |
| CaseStudyContentsRail | FILL | FILL | FILL |
| StatusBadge | FILL | FILL | FILL |
| DiagramViewer | FILL | FILL | FILL |
| GlitreIllustrativeDeviceFrames | FILL | FILL | FILL |
| ClassroomSentinelPipelineCard | FILL | FILL | FILL |
| AksiraDualEngineCard | FILL | FILL | FILL |
| ShowcaseArchitectureBadge | FILL | FILL | FILL |

## 7. Tailwind v4 and CSS Consolidation Mapping
FILL: how Stage 4 consolidates `--atelier-*`, `--hv2-*`, `--wv2-*`, and `--sv2-*` into one semantic token layer supporting `[data-theme="light"]` and `[data-theme="dark"]` across `/`, `/work`, `/work/[slug]`, `/services`, `/studio`, `/contact`, `/privacy`, and `/ar`, including an `@theme` snippet.

## 8. OpenGraph Social Card Specification (`1200x630`)
FILL: `1200x630` social preview layout preserving `64px` safe margins (`x=64..1136`, `y=64..566`), Kepler Dev studio identity (zero founder phrasing), and exact dimensions table.

| Element | X | Y | Width | Height | Copy source and tokens |
| --- | ---: | ---: | ---: | ---: | --- |
| FILL | FILL | FILL | FILL | FILL | FILL |

## 9. Open Pencil Role 2C Handoff
FILL: token variable collections (Light + Dark modes), component names, multi-route screen frames (`/` desktop/mobile, `/work` 13-project index, `/work/[slug]` case study template, `/studio`, `/contact`, `/ar` RTL), and existing `.fig` convention under `canvas/documents/`.

## 10. Review Decisions and Verification Limits
FILL: owner direction review gate, bronze contrast refinement note, font & Arabic glyph rendering verification reserved for Stage 4 browser screenshots, and Stage 3 -> Stage 4 boundaries.

## 11. Mandatory Self-Audit Checklist

| Check | Status | Evidence |
| --- | --- | --- |
| Existing v1/v2 styling audit and 3 ranked directions | FILL | FILL |
| Light + Dark token schema & Tailwind v4 consolidation map | FILL | FILL |
| All declared Light & Dark contrast pairs pass (`>=4.5:1` / `>=3.0:1`) | FILL | FILL |
| All 18 studio components and interaction states specified | FILL | FILL |
| OpenGraph `1200x630` safe-margin geometry valid | FILL | FILL |
| Multi-route Open Pencil handoff boundaries documented | FILL | FILL |
| Deterministic token verifier (`design_token_audit.py --verify`) exits `0` | FILL | FILL |
| Standalone studio voice (`copy_audit.py`) exits `0` | FILL | FILL |
