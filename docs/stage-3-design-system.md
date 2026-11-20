# Stage 3 Role 2A — Kepler Dev Unified Atelier Design System

**Brand:** Kepler Dev (`https://www.keplerdev.uk`)  
**Voice:** Standalone UK & GCC Digital Product Studio (`we` / `our` / `Kepler Dev`)  
**Stage:** Stage 3, Role 2A — Atelier UI Design System Specification  
**Status:** Proposed design specification for owner direction review prior to Role 2B, Role 2C, Role 3, and Stage 4 implementation.

---

## 1. Existing Styling Audit and Source Locks

Kepler Dev's current codebase carries four competing CSS variable namespaces and a legacy root fallback layer across v1 and v2 routes:

1. **Legacy `globals.css` Dual-Theme Override:** `src/app/globals.css` still declares two consecutive `:root` / `:root[data-theme="dark"]` blocks—an earlier teal/slate theme (`#087e7a`, `#101b2c`, `#47c7bf`) overwritten at lines 56–57 by an editorial paper/ink/coral layer (`#faf8f2`, `#11110f`, `#e5432f`). Meanwhile, `src/app/opengraph-image.tsx` still hardcodes the legacy `#101b2c` / `#47c7bf` / `#f5f2ea` palette rather than the Global Atelier identity.
2. **v1 Foundation (`src/app/global-atelier.css`):** Used on `/contact`, `/ar`, and the global header/footer shell. Declares `33` hex declarations under `--atelier-*` (`#071c18` forest, `#102925` forest-raised, `#1b2d2a` mineral, `#eee7de` pearl, `#d7ccc1` stone, `#202826` ink, `#bd865e` bronze, `#985f3b` bronze-deep, `#d4a47a` bronze-300) and maps semantic tokens (`--bg`, `--surface`, `--text`, `--accent`) with a `[data-theme="dark"]` override. However, `--baseline` confirms `--atelier-bronze-deep` (`#985f3b`) on `--atelier-pearl` (`#eee7de`) measures **`4.24:1`** (`text=FAIL` below `4.5:1`), and `:focus-visible` uses `--atelier-bronze` (`#bd865e`), which fails `3.0:1` UI contrast on light pearl surfaces.
3. **v2 Homepage (`src/app/home-v2.css`):** Scoped under `.hv2` for `/`. Introduces `38` hex declarations under `--hv2-*` (`--hv2-forest: #071c18`, `--hv2-cream: #eee7de`, `--hv2-card: #faf7f1`, `--hv2-ink: #202826`, `--hv2-muted: #4b5551`, `--hv2-copper-text: #8f5327`, `--hv2-copper: #cf8649`, `--hv2-bronze-300: #d4a47a`, `--hv2-green: #1f5a45`, `--hv2-green-bg: #e3eee8`). While `--hv2-copper-text` (`#8f5327`) passes AA on `#eee7de` (`4.98:1`) and `#faf7f1` (`5.72:1`), `--hv2-copper` (`#cf8649`) on `--hv2-cream` (`#eee7de`) measures **`2.39:1`** (`text=FAIL`, `ui=FAIL`). Critically, `.hv2` contains **zero** `[data-theme="dark"]` overrides, so toggling Appearance to Dark leaves `/` in light cream.
4. **v2 Work & Services (`src/app/work-v2.css`, `src/app/services-v2.css`):** Scoped under `.wv2` (`/work`) and `.sv2` (`/services`), duplicating `--hv2-*` values under `--wv2-*` and `--sv2-*` prefixes. Both apply `outline: 2px solid var(--*-copper)` (`#cf8649`, `2.39:1` fail against `#eee7de` and `#f6f1ea`). `services-v2.css` has **zero** `[data-theme="dark"]` rules, and `work-v2.css` contains only a single `[data-theme="dark"] .wv2-lead-cta` rule at line 553.
5. **Case Study Detail (`src/app/case-study.css`):** Scoped under `.cs-page` (`/work/[slug]` and `/studio` shared primitives), explicitly pins light tokens (`--bg: #eee7de`, `--surface: #f6f1ea`, `--accent: #8f5327`, `--focus: #cf8649`) to avoid falling back to the legacy coral scheme in `globals.css`, while layering partial `[data-theme="dark"]` rules on selected child classes.

### Inherited Baseline & Source Locks
- **Existing Baseline Contrast Snapshot (`design_token_audit.py --baseline`):**
  - `atelier-ink` (`#202826`) on `atelier-pearl` (`#eee7de`): `12.29:1` (`PASS`)
  - `atelier-bronze-deep` (`#985f3b`) on `atelier-pearl` (`#eee7de`): `4.24:1` (`text=FAIL`, `ui=PASS`)
  - `hv2-copper-text` (`#8f5327`) on `hv2-cream` (`#eee7de`): `4.98:1` (`PASS`)
  - `hv2-copper-text` (`#8f5327`) on `hv2-card` (`#faf7f1`): `5.72:1` (`PASS`)
  - `hv2-copper` (`#cf8649`) on `hv2-cream` (`#eee7de`): `2.39:1` (`text=FAIL`, `ui=FAIL`)
  - `atelier-pearl` (`#eee7de`) on `atelier-forest` (`#071c18`): `14.41:1` (`PASS`)
  - `atelier-bronze-300` (`#d4a47a`) on `atelier-forest` (`#071c18`): `7.90:1` (`PASS`)
  - `hv2-muted` (`#4b5551`) on `hv2-cream` (`#eee7de`): `6.30:1` (`PASS`)
  - `global-muted` (`#56605c`) on `global-bg` (`#eee7de`): `5.31:1` (`PASS`)
- **Locked Copy, Assets & Layout:** All headings, 40–60 word GEO identity block, 6-field contact form strings, and standalone studio voice remain governed by `docs/stage-1-final-copy-and-pitch.md`. All 13 project media assets (`9` media-backed, `4` spec-backed interactive/architecture cards) remain governed by `docs/stage-2-visual-asset-manifest.md`. All route hierarchies, `<600px` / `600–899px` / `900–1199px` / `>=1200px` breakpoints, `390x844` (`660px` total) and `1440x900` (`736px` total) fold budgets, `460px` mobile `/work` card geometry, and `>=44x44px` hit targets remain locked by `docs/stage-3-ux-wireframe-and-layout.md`.

---

## 2. Three Visual Directions and Recommendation

Three coherent visual evolution options were evaluated against the same Stage 1 copy, 13-project proof inventory, and Role 1 fold budgets. All visual selections below remain **proposed** until owner direction review before Open Pencil Role 2C screen construction and Stage 4 CSS consolidation.

| Direction | Palette and typography | Layout character | Trade-off | Rank |
| --- | --- | --- | --- | ---: |
| **Global Atelier Unified v2 (Recommended)** | Light Pearl (`#EEE7DE`) & Ivory (`#FAF7F1`) paired with Deep Forest (`#071C18`), high-contrast Bronze text (`#6F4224` / `#583219`) in Light Mode and Bronze-300 (`#D4A47A`) in Dark Mode; `Manrope` display (`500`), `Inter` body (`400`/`600`), `IBM Plex Sans Arabic` RTL, `JetBrains Mono` technical metrics. | Calm architectural ledger rhythm: deep-forest Hero, Studio, and Closing bands framing warm pearl editorial sections; 1px structural borders (`#D7CCC1` decorative / `#56605C` controls) and crisp `8px`/`12px` radii; full `[data-theme="dark"]` parity across all routes. | Retains Kepler Dev's established brand memory and GCC/UK executive authority while eliminating `#CF8649` / `#985F3B` contrast failures and v2 Dark Mode gaps; requires replacing `--hv2-*`/`--wv2-*`/`--sv2-*` hex overrides with unified semantic tokens. | 1 |
| **Precision Dark Engineering** | Permanent Deep Forest (`#071C18`) and Mineral (`#102925`) canvas across all routes with Pearl (`#EEE7DE`) text, `#D4A47A` amber-bronze accents, and `#63C79A` telemetry green; `Manrope` + `JetBrains Mono` monospace-led headers. | High-density terminal-inspired infrastructure showcase with dark diagram stages and tabular monospace spec headers; removes Light/Dark mode divergence by defaulting dark everywhere. | Strong technical signal for SRE and backend buyers, yet reduces long-form daytime reading comfort on `/studio` and `/work/[slug]` and weakens the editorial warmth that differentiates Kepler Dev from generic dark dev-tool templates. | 2 |
| **Warm Technical Paper** | Uniform warm paper (`#FAF7F1` / `#EEE7DE`) canvas without deep-forest hero/studio bands, Charcoal Ink (`#202826`), Muted Slate (`#4B5551`), and muted Forest Emerald (`#1F5A45`) primary accent with `Inter` + `IBM Plex Sans Arabic` only. | Flat 1px ruled blueprint grids with minimal elevation (`shadow: none`), stripped-down monochrome cards, and high-key daytime legibility across every section. | Lowest CSS complexity and clean print-like clarity, yet drops the signature Deep Forest & Bronze brand contrast that gives the hero, footer, and `/studio` band five-second executive gravitas. | 3 |

**Recommendation (Rank 1 — Global Atelier Unified v2):** Unifies the existing Pearl (`#EEE7DE`) and Deep Forest (`#071C18`) identity across `/`, `/work`, `/work/[slug]`, `/services`, `/studio`, `/contact`, and `/ar`, resolves every bronze/copper WCAG AA failure by locking deepened bronze (`#6F4224` / `#583219`) on light surfaces and `#D4A47A` on dark surfaces, and restores true Light/Dark theme switching across every v1 and v2 route.

---

## 3. Machine-Readable Design Tokens

The JSON object below is the single proposed source of truth for Light Mode (`colors`), Dark Mode (`dark_colors`), typography, spacing, radii, motion, breakpoints, and all 84 checked contrast pairs (`42` Light Mode + `42` Dark Mode). All surface tokens are opaque 6-digit hex values so contrast remains deterministic without glass or translucent stacking assumptions.

```json
{
  "direction": "Global Atelier Unified v2",
  "status": "proposed",
  "colors": {
    "canvas": "#EEE7DE",
    "surface": "#FAF7F1",
    "surface_raised": "#F6F1EA",
    "surface_hover": "#E5DBD1",
    "text": "#202826",
    "muted_text": "#4B5551",
    "disabled_text": "#47514D",
    "accent": "#6F4224",
    "accent_hover": "#583219",
    "on_accent": "#FAF7F1",
    "border_decorative": "#D7CCC1",
    "border_control": "#56605C",
    "focus": "#6F4224",
    "success": "#1F5A45",
    "warning": "#6F4224",
    "danger": "#8F2D2D"
  },
  "dark_colors": {
    "canvas": "#071C18",
    "surface": "#102925",
    "surface_raised": "#17332E",
    "surface_hover": "#1E3F39",
    "text": "#EEE7DE",
    "muted_text": "#BEC8C1",
    "disabled_text": "#B0BEB6",
    "accent": "#D4A47A",
    "accent_hover": "#E2B995",
    "on_accent": "#071C18",
    "border_decorative": "#24433D",
    "border_control": "#8FA097",
    "focus": "#D4A47A",
    "success": "#63C79A",
    "warning": "#D4A47A",
    "danger": "#F08C8C"
  },
  "fonts": {
    "sans": "Inter",
    "display": "Manrope",
    "arabic": "IBM Plex Sans Arabic",
    "mono": "JetBrains Mono"
  },
  "typography": {
    "body": {
      "font": "sans",
      "mobile_px": 16,
      "desktop_px": 16,
      "line_height_mobile_px": 24,
      "line_height_desktop_px": 24,
      "weight": 400
    },
    "small": {
      "font": "sans",
      "mobile_px": 14,
      "desktop_px": 14,
      "line_height_mobile_px": 20,
      "line_height_desktop_px": 20,
      "weight": 500
    },
    "h1": {
      "font": "display",
      "mobile_px": 32,
      "desktop_px": 56,
      "line_height_mobile_px": 36,
      "line_height_desktop_px": 60,
      "weight": 500
    },
    "h2": {
      "font": "display",
      "mobile_px": 26,
      "desktop_px": 42,
      "line_height_mobile_px": 30,
      "line_height_desktop_px": 46,
      "weight": 500
    },
    "h3": {
      "font": "sans",
      "mobile_px": 18,
      "desktop_px": 22,
      "line_height_mobile_px": 24,
      "line_height_desktop_px": 28,
      "weight": 600
    },
    "mono": {
      "font": "mono",
      "mobile_px": 14,
      "desktop_px": 14,
      "line_height_mobile_px": 20,
      "line_height_desktop_px": 20,
      "weight": 500
    }
  },
  "spacing_px": {
    "none": 0,
    "xs": 4,
    "sm": 8,
    "md": 16,
    "lg": 24,
    "xl": 32,
    "section": 64
  },
  "radii_px": {
    "control": 8,
    "card": 12,
    "dialog": 16
  },
  "motion_ms": {
    "instant": 0,
    "fast": 140,
    "standard": 240
  },
  "breakpoints_px": {
    "tablet": 600,
    "compact": 900,
    "wide": 1200
  },
  "contrast_pairs": [
    {"name": "light-text-canvas", "foreground": "text", "background": "canvas", "kind": "text"},
    {"name": "light-text-surface", "foreground": "text", "background": "surface", "kind": "text"},
    {"name": "light-text-surface-raised", "foreground": "text", "background": "surface_raised", "kind": "text"},
    {"name": "light-text-surface-hover", "foreground": "text", "background": "surface_hover", "kind": "text"},
    {"name": "light-muted-canvas", "foreground": "muted_text", "background": "canvas", "kind": "text"},
    {"name": "light-muted-surface", "foreground": "muted_text", "background": "surface", "kind": "text"},
    {"name": "light-muted-surface-raised", "foreground": "muted_text", "background": "surface_raised", "kind": "text"},
    {"name": "light-muted-surface-hover", "foreground": "muted_text", "background": "surface_hover", "kind": "text"},
    {"name": "light-disabled-canvas", "foreground": "disabled_text", "background": "canvas", "kind": "text"},
    {"name": "light-disabled-surface", "foreground": "disabled_text", "background": "surface", "kind": "text"},
    {"name": "light-disabled-surface-raised", "foreground": "disabled_text", "background": "surface_raised", "kind": "text"},
    {"name": "light-disabled-surface-hover", "foreground": "disabled_text", "background": "surface_hover", "kind": "text"},
    {"name": "light-accent-canvas", "foreground": "accent", "background": "canvas", "kind": "text"},
    {"name": "light-accent-surface", "foreground": "accent", "background": "surface", "kind": "text"},
    {"name": "light-accent-surface-raised", "foreground": "accent", "background": "surface_raised", "kind": "text"},
    {"name": "light-accent-surface-hover", "foreground": "accent", "background": "surface_hover", "kind": "text"},
    {"name": "light-accent-hover-canvas", "foreground": "accent_hover", "background": "canvas", "kind": "text"},
    {"name": "light-accent-hover-surface", "foreground": "accent_hover", "background": "surface", "kind": "text"},
    {"name": "light-accent-hover-surface-raised", "foreground": "accent_hover", "background": "surface_raised", "kind": "text"},
    {"name": "light-accent-hover-surface-hover", "foreground": "accent_hover", "background": "surface_hover", "kind": "text"},
    {"name": "light-success-canvas", "foreground": "success", "background": "canvas", "kind": "text"},
    {"name": "light-success-surface", "foreground": "success", "background": "surface", "kind": "text"},
    {"name": "light-success-surface-raised", "foreground": "success", "background": "surface_raised", "kind": "text"},
    {"name": "light-success-surface-hover", "foreground": "success", "background": "surface_hover", "kind": "text"},
    {"name": "light-warning-canvas", "foreground": "warning", "background": "canvas", "kind": "text"},
    {"name": "light-warning-surface", "foreground": "warning", "background": "surface", "kind": "text"},
    {"name": "light-warning-surface-raised", "foreground": "warning", "background": "surface_raised", "kind": "text"},
    {"name": "light-warning-surface-hover", "foreground": "warning", "background": "surface_hover", "kind": "text"},
    {"name": "light-danger-canvas", "foreground": "danger", "background": "canvas", "kind": "text"},
    {"name": "light-danger-surface", "foreground": "danger", "background": "surface", "kind": "text"},
    {"name": "light-danger-surface-raised", "foreground": "danger", "background": "surface_raised", "kind": "text"},
    {"name": "light-danger-surface-hover", "foreground": "danger", "background": "surface_hover", "kind": "text"},
    {"name": "light-on-accent-accent", "foreground": "on_accent", "background": "accent", "kind": "text"},
    {"name": "light-on-accent-accent-hover", "foreground": "on_accent", "background": "accent_hover", "kind": "text"},
    {"name": "light-border-control-canvas", "foreground": "border_control", "background": "canvas", "kind": "ui"},
    {"name": "light-border-control-surface", "foreground": "border_control", "background": "surface", "kind": "ui"},
    {"name": "light-border-control-surface-raised", "foreground": "border_control", "background": "surface_raised", "kind": "ui"},
    {"name": "light-border-control-surface-hover", "foreground": "border_control", "background": "surface_hover", "kind": "ui"},
    {"name": "light-focus-canvas", "foreground": "focus", "background": "canvas", "kind": "ui"},
    {"name": "light-focus-surface", "foreground": "focus", "background": "surface", "kind": "ui"},
    {"name": "light-focus-surface-raised", "foreground": "focus", "background": "surface_raised", "kind": "ui"},
    {"name": "light-focus-surface-hover", "foreground": "focus", "background": "surface_hover", "kind": "ui"},
    {"name": "dark-text-canvas", "foreground": "text", "background": "canvas", "kind": "text", "mode": "dark"},
    {"name": "dark-text-surface", "foreground": "text", "background": "surface", "kind": "text", "mode": "dark"},
    {"name": "dark-text-surface-raised", "foreground": "text", "background": "surface_raised", "kind": "text", "mode": "dark"},
    {"name": "dark-text-surface-hover", "foreground": "text", "background": "surface_hover", "kind": "text", "mode": "dark"},
    {"name": "dark-muted-canvas", "foreground": "muted_text", "background": "canvas", "kind": "text", "mode": "dark"},
    {"name": "dark-muted-surface", "foreground": "muted_text", "background": "surface", "kind": "text", "mode": "dark"},
    {"name": "dark-muted-surface-raised", "foreground": "muted_text", "background": "surface_raised", "kind": "text", "mode": "dark"},
    {"name": "dark-muted-surface-hover", "foreground": "muted_text", "background": "surface_hover", "kind": "text", "mode": "dark"},
    {"name": "dark-disabled-canvas", "foreground": "disabled_text", "background": "canvas", "kind": "text", "mode": "dark"},
    {"name": "dark-disabled-surface", "foreground": "disabled_text", "background": "surface", "kind": "text", "mode": "dark"},
    {"name": "dark-disabled-surface-raised", "foreground": "disabled_text", "background": "surface_raised", "kind": "text", "mode": "dark"},
    {"name": "dark-disabled-surface-hover", "foreground": "disabled_text", "background": "surface_hover", "kind": "text", "mode": "dark"},
    {"name": "dark-accent-canvas", "foreground": "accent", "background": "canvas", "kind": "text", "mode": "dark"},
    {"name": "dark-accent-surface", "foreground": "accent", "background": "surface", "kind": "text", "mode": "dark"},
    {"name": "dark-accent-surface-raised", "foreground": "accent", "background": "surface_raised", "kind": "text", "mode": "dark"},
    {"name": "dark-accent-surface-hover", "foreground": "accent", "background": "surface_hover", "kind": "text", "mode": "dark"},
    {"name": "dark-accent-hover-canvas", "foreground": "accent_hover", "background": "canvas", "kind": "text", "mode": "dark"},
    {"name": "dark-accent-hover-surface", "foreground": "accent_hover", "background": "surface", "kind": "text", "mode": "dark"},
    {"name": "dark-accent-hover-surface-raised", "foreground": "accent_hover", "background": "surface_raised", "kind": "text", "mode": "dark"},
    {"name": "dark-accent-hover-surface-hover", "foreground": "accent_hover", "background": "surface_hover", "kind": "text", "mode": "dark"},
    {"name": "dark-success-canvas", "foreground": "success", "background": "canvas", "kind": "text", "mode": "dark"},
    {"name": "dark-success-surface", "foreground": "success", "background": "surface", "kind": "text", "mode": "dark"},
    {"name": "dark-success-surface-raised", "foreground": "success", "background": "surface_raised", "kind": "text", "mode": "dark"},
    {"name": "dark-success-surface-hover", "foreground": "success", "background": "surface_hover", "kind": "text", "mode": "dark"},
    {"name": "dark-warning-canvas", "foreground": "warning", "background": "canvas", "kind": "text", "mode": "dark"},
    {"name": "dark-warning-surface", "foreground": "warning", "background": "surface", "kind": "text", "mode": "dark"},
    {"name": "dark-warning-surface-raised", "foreground": "warning", "background": "surface_raised", "kind": "text", "mode": "dark"},
    {"name": "dark-warning-surface-hover", "foreground": "warning", "background": "surface_hover", "kind": "text", "mode": "dark"},
    {"name": "dark-danger-canvas", "foreground": "danger", "background": "canvas", "kind": "text", "mode": "dark"},
    {"name": "dark-danger-surface", "foreground": "danger", "background": "surface", "kind": "text", "mode": "dark"},
    {"name": "dark-danger-surface-raised", "foreground": "danger", "background": "surface_raised", "kind": "text", "mode": "dark"},
    {"name": "dark-danger-surface-hover", "foreground": "danger", "background": "surface_hover", "kind": "text", "mode": "dark"},
    {"name": "dark-on-accent-accent", "foreground": "on_accent", "background": "accent", "kind": "text", "mode": "dark"},
    {"name": "dark-on-accent-accent-hover", "foreground": "on_accent", "background": "accent_hover", "kind": "text", "mode": "dark"},
    {"name": "dark-border-control-canvas", "foreground": "border_control", "background": "canvas", "kind": "ui", "mode": "dark"},
    {"name": "dark-border-control-surface", "foreground": "border_control", "background": "surface", "kind": "ui", "mode": "dark"},
    {"name": "dark-border-control-surface-raised", "foreground": "border_control", "background": "surface_raised", "kind": "ui", "mode": "dark"},
    {"name": "dark-border-control-surface-hover", "foreground": "border_control", "background": "surface_hover", "kind": "ui", "mode": "dark"},
    {"name": "dark-focus-canvas", "foreground": "focus", "background": "canvas", "kind": "ui", "mode": "dark"},
    {"name": "dark-focus-surface", "foreground": "focus", "background": "surface", "kind": "ui", "mode": "dark"},
    {"name": "dark-focus-surface-raised", "foreground": "focus", "background": "surface_raised", "kind": "ui", "mode": "dark"},
    {"name": "dark-focus-surface-hover", "foreground": "focus", "background": "surface_hover", "kind": "ui", "mode": "dark"}
  ]
}
```

---

## 4. Computed Contrast Evidence

Computed with `python3 roles/ui-design-system-architect/scripts/design_token_audit.py --report docs/stage-3-design-system.md`.

| Pair | Foreground | Background | Kind | Ratio | Threshold | Result |
| --- | --- | --- | --- | ---: | ---: | --- |
| light-text-canvas | text | canvas | text | 12.29 | 4.5 | PASS |
| light-text-surface | text | surface | text | 14.10 | 4.5 | PASS |
| light-text-surface-raised | text | surface_raised | text | 13.42 | 4.5 | PASS |
| light-text-surface-hover | text | surface_hover | text | 11.05 | 4.5 | PASS |
| light-muted-canvas | muted_text | canvas | text | 6.30 | 4.5 | PASS |
| light-muted-surface | muted_text | surface | text | 7.23 | 4.5 | PASS |
| light-muted-surface-raised | muted_text | surface_raised | text | 6.88 | 4.5 | PASS |
| light-muted-surface-hover | muted_text | surface_hover | text | 5.66 | 4.5 | PASS |
| light-disabled-canvas | disabled_text | canvas | text | 6.71 | 4.5 | PASS |
| light-disabled-surface | disabled_text | surface | text | 7.70 | 4.5 | PASS |
| light-disabled-surface-raised | disabled_text | surface_raised | text | 7.32 | 4.5 | PASS |
| light-disabled-surface-hover | disabled_text | surface_hover | text | 6.03 | 4.5 | PASS |
| light-accent-canvas | accent | canvas | text | 6.90 | 4.5 | PASS |
| light-accent-surface | accent | surface | text | 7.92 | 4.5 | PASS |
| light-accent-surface-raised | accent | surface_raised | text | 7.53 | 4.5 | PASS |
| light-accent-surface-hover | accent | surface_hover | text | 6.20 | 4.5 | PASS |
| light-accent-hover-canvas | accent_hover | canvas | text | 9.08 | 4.5 | PASS |
| light-accent-hover-surface | accent_hover | surface | text | 10.42 | 4.5 | PASS |
| light-accent-hover-surface-raised | accent_hover | surface_raised | text | 9.91 | 4.5 | PASS |
| light-accent-hover-surface-hover | accent_hover | surface_hover | text | 8.16 | 4.5 | PASS |
| light-success-canvas | success | canvas | text | 6.57 | 4.5 | PASS |
| light-success-surface | success | surface | text | 7.53 | 4.5 | PASS |
| light-success-surface-raised | success | surface_raised | text | 7.17 | 4.5 | PASS |
| light-success-surface-hover | success | surface_hover | text | 5.90 | 4.5 | PASS |
| light-warning-canvas | warning | canvas | text | 6.90 | 4.5 | PASS |
| light-warning-surface | warning | surface | text | 7.92 | 4.5 | PASS |
| light-warning-surface-raised | warning | surface_raised | text | 7.53 | 4.5 | PASS |
| light-warning-surface-hover | warning | surface_hover | text | 6.20 | 4.5 | PASS |
| light-danger-canvas | danger | canvas | text | 6.63 | 4.5 | PASS |
| light-danger-surface | danger | surface | text | 7.61 | 4.5 | PASS |
| light-danger-surface-raised | danger | surface_raised | text | 7.24 | 4.5 | PASS |
| light-danger-surface-hover | danger | surface_hover | text | 5.96 | 4.5 | PASS |
| light-on-accent-accent | on_accent | accent | text | 7.92 | 4.5 | PASS |
| light-on-accent-accent-hover | on_accent | accent_hover | text | 10.42 | 4.5 | PASS |
| light-border-control-canvas | border_control | canvas | ui | 5.31 | 3 | PASS |
| light-border-control-surface | border_control | surface | ui | 6.09 | 3 | PASS |
| light-border-control-surface-raised | border_control | surface_raised | ui | 5.80 | 3 | PASS |
| light-border-control-surface-hover | border_control | surface_hover | ui | 4.77 | 3 | PASS |
| light-focus-canvas | focus | canvas | ui | 6.90 | 3 | PASS |
| light-focus-surface | focus | surface | ui | 7.92 | 3 | PASS |
| light-focus-surface-raised | focus | surface_raised | ui | 7.53 | 3 | PASS |
| light-focus-surface-hover | focus | surface_hover | ui | 6.20 | 3 | PASS |
| dark-text-canvas | text | canvas | text | 14.41 | 4.5 | PASS |
| dark-text-surface | text | surface | text | 12.53 | 4.5 | PASS |
| dark-text-surface-raised | text | surface_raised | text | 11.05 | 4.5 | PASS |
| dark-text-surface-hover | text | surface_hover | text | 9.38 | 4.5 | PASS |
| dark-muted-canvas | muted_text | canvas | text | 10.28 | 4.5 | PASS |
| dark-muted-surface | muted_text | surface | text | 8.95 | 4.5 | PASS |
| dark-muted-surface-raised | muted_text | surface_raised | text | 7.89 | 4.5 | PASS |
| dark-muted-surface-hover | muted_text | surface_hover | text | 6.70 | 4.5 | PASS |
| dark-disabled-canvas | disabled_text | canvas | text | 9.16 | 4.5 | PASS |
| dark-disabled-surface | disabled_text | surface | text | 7.97 | 4.5 | PASS |
| dark-disabled-surface-raised | disabled_text | surface_raised | text | 7.03 | 4.5 | PASS |
| dark-disabled-surface-hover | disabled_text | surface_hover | text | 5.96 | 4.5 | PASS |
| dark-accent-canvas | accent | canvas | text | 7.90 | 4.5 | PASS |
| dark-accent-surface | accent | surface | text | 6.87 | 4.5 | PASS |
| dark-accent-surface-raised | accent | surface_raised | text | 6.06 | 4.5 | PASS |
| dark-accent-surface-hover | accent | surface_hover | text | 5.14 | 4.5 | PASS |
| dark-accent-hover-canvas | accent_hover | canvas | text | 9.77 | 4.5 | PASS |
| dark-accent-hover-surface | accent_hover | surface | text | 8.50 | 4.5 | PASS |
| dark-accent-hover-surface-raised | accent_hover | surface_raised | text | 7.49 | 4.5 | PASS |
| dark-accent-hover-surface-hover | accent_hover | surface_hover | text | 6.36 | 4.5 | PASS |
| dark-success-canvas | success | canvas | text | 8.56 | 4.5 | PASS |
| dark-success-surface | success | surface | text | 7.44 | 4.5 | PASS |
| dark-success-surface-raised | success | surface_raised | text | 6.56 | 4.5 | PASS |
| dark-success-surface-hover | success | surface_hover | text | 5.57 | 4.5 | PASS |
| dark-warning-canvas | warning | canvas | text | 7.90 | 4.5 | PASS |
| dark-warning-surface | warning | surface | text | 6.87 | 4.5 | PASS |
| dark-warning-surface-raised | warning | surface_raised | text | 6.06 | 4.5 | PASS |
| dark-warning-surface-hover | warning | surface_hover | text | 5.14 | 4.5 | PASS |
| dark-danger-canvas | danger | canvas | text | 7.43 | 4.5 | PASS |
| dark-danger-surface | danger | surface | text | 6.47 | 4.5 | PASS |
| dark-danger-surface-raised | danger | surface_raised | text | 5.70 | 4.5 | PASS |
| dark-danger-surface-hover | danger | surface_hover | text | 4.84 | 4.5 | PASS |
| dark-on-accent-accent | on_accent | accent | text | 7.90 | 4.5 | PASS |
| dark-on-accent-accent-hover | on_accent | accent_hover | text | 9.77 | 4.5 | PASS |
| dark-border-control-canvas | border_control | canvas | ui | 6.43 | 3 | PASS |
| dark-border-control-surface | border_control | surface | ui | 5.60 | 3 | PASS |
| dark-border-control-surface-raised | border_control | surface_raised | ui | 4.93 | 3 | PASS |
| dark-border-control-surface-hover | border_control | surface_hover | ui | 4.19 | 3 | PASS |
| dark-focus-canvas | focus | canvas | ui | 7.90 | 3 | PASS |
| dark-focus-surface | focus | surface | ui | 6.87 | 3 | PASS |
| dark-focus-surface-raised | focus | surface_raised | ui | 6.06 | 3 | PASS |
| dark-focus-surface-hover | focus | surface_hover | ui | 5.14 | 3 | PASS |

---

## 5. Typography, Spacing and Responsive Capacity

### Font Pairing and Language Rules
- **Existing `next/font/google` Baseline (`src/app/layout.tsx`):** Preserve `Manrope` (`--font-atelier-display`, weights `450`/`500`), `Inter` (`--font-atelier-body`, weights `400`/`500`/`600`), and `IBM Plex Sans Arabic` (`--font-atelier-arabic`, weights `400`/`500`/`600`/`700`), adding `JetBrains Mono` (`--font-atelier-mono`, weight `500`, fallback `ui-monospace, SFMono-Regular, monospace`) for latency metrics, OpenAPI counts, and ledger identifiers.
- **Arabic RTL Tracking Lock:** All Latin kickers and uppercase eyebrows (`14px` small or `12px` uppercase badges where enlarged to `14px` minimum for body/small parity) use `+0.06em` tracking; `[lang="ar"]` and `[dir="rtl"]` strictly enforce `letter-spacing: 0` and `text-transform: none` with `IBM Plex Sans Arabic` so Arabic glyph ligatures never break.
- **Floor Sizes & Line Measures:** Body text remains `16px / 24px` (`1.5`), small/metadata text remains `>= 14px / 20px`, and prose columns cap at `62ch`–`66ch` (`<= 880px` on `/work/[slug]` reading columns).
- **Accent Proportion Discipline (`<12%` Rule):** Bronze/copper (`accent` `#6F4224` light / `#D4A47A` dark) stays below `12%` of any viewport area—reserved strictly for primary CTAs, active filter states, eyebrow kickers, focus outlines, and metric highlights rather than full-bleed backgrounds.

### Alignment with Role 1 Breakpoints & Fold Budgets
- **Breakpoints (`600px` tablet, `900px` compact desktop, `1200px` wide desktop):** Directly match Role 1's grid transitions (`1` col `<600px`, `2` cols `600–899px`, full horizontal nav at `900px`, `1240px` container `>=1200px`).
- **Above-the-Fold Headroom (`390x844` & `1440x900`):** Using `h1` `32px/36px` mobile (`56px/60px` desktop) and `body` `16px/24px` aligns with Role 1's calculated `660px` mobile hero total (`<= 844px`) and `736px` desktop hero total (`<= 900px`). Note: line-wrap counts remain calculated layout predictions until Stage 4 headless Chromium verification.
- **Collapsed `/work` Card Capacity (`460px` mobile):** `200px` capped aspect-preserved media viewport + `212px` text/action stack (`14px` tag, `18px` H3, `14px` 3-line summary, `14px` stack chips, `44px` action link) + `48px` padding/gaps (`16px` card padding + `16px` stack gap).

---

## 6. Components and State Styling

All 18 multi-route studio components and custom showcase cards reference semantic tokens from Section 3 (`light` + `dark`), enforce `>= 44x44px` interactive tap targets, pair color with visible labels/icons for state, and honor `prefers-reduced-motion: reduce` (`instant: 0ms` transitions, static status indicators).

| Component | Token usage | States | Geometry and content rule |
| --- | --- | --- | --- |
| SiteHeader | Dark band (`#071C18` canvas, `#EEE7DE` text, `#D4A47A` focus/active) in Light & Dark modes; `border_decorative` bottom hairline | `default`: inline links + locale + appearance select; `hover`: text shifts to `#D4A47A`; `focus`: `3px` solid `#D4A47A` outline (`offset 3px`); `selected`: bottom `2px` underline on active route; `disabled`/`pending`/`error`/`success`: N/A | Sticky bar (`72px` desktop / `56px` mobile, `1240px` max-w); `<900px` collapses primary nav into `44x44px` drawer button; `scroll-margin-top` `88px`/`72px`. |
| HeroAndTrust | Dark Forest band (`#071C18` canvas, `#102925` GEO card surface, `#EEE7DE` text, `#BEC8C1` muted, `#D4A47A` eyebrow) | `default`: headline + 4 proof pills + GEO block visible above fold; `hover`: pill border shifts to `#8FA097`; `focus`: `3px` `#D4A47A` ring on CTA links; `selected`/`disabled`/`pending`/`error`/`success`: N/A | Asymmetric 8/4 desktop grid (`1240px` max-w), single-column mobile (`660px` <= `844px`); `2x2` proof pills on mobile with `min-width: 0` wrapping. |
| PrimaryButton | `accent` background, `on_accent` text, `accent_hover` on pointer hover, `focus` outline (`3px`, `offset 3px`) | `default`: solid `accent` pill/button; `hover`: `accent_hover` background; `focus`: `3px` `focus` ring; `selected`: N/A (press scales `0px` under reduced motion); `disabled`: `surface_hover` bg + `disabled_text` + `border_control`; `pending`/`error`/`success`: handled by `QualificationSubmit` | `min-height: 48px` (`44px` compact), `8px` radius (`control`), `16px` horizontal padding, `14px`/`16px` weight `600`, `140ms` color transition. |
| SecondaryButton | Transparent or `surface` background, `text` label, `1px solid border_control`, `focus` outline | `default`: outlined button (`border_control`); `hover`: `surface_hover` background; `focus`: `3px` `focus` ring; `selected`: `surface_raised` background + `2px` `accent` border; `disabled`: `disabled_text` + `border_decorative`; `pending`/`error`/`success`: N/A | `min-height: 44px` (`48px` in hero), `8px` radius (`control`), pairs directional arrow icon with clear text label. |
| FlagshipWorkStrip | `surface` card on `canvas`, `1px solid border_decorative`, `text` headings, `muted_text` copy, `accent` kicker/CTA | `default`: 3 flagship cards on `/` (`Glitre`, `HS VPN`, `QuickChargingPOS`); `hover`: subtle border shift to `border_control` (no layout shift); `focus`: `3px` `focus` ring around card CTA; `selected`/`disabled`/`pending`/`error`/`success`: N/A | 3-column desktop / 1-column mobile grid (`24px` gutter); image wrapper uses `surface_raised` with `object-contain` and explicit intrinsic ratio. |
| WorkCatalogCard | `surface` card, `surface_raised` media well, `1px solid border_decorative`, `text` title, `muted_text` summary, `accent` tag | `default`: media frame + tag + H3 + 3-line summary + stack chips + CTA; `hover`: border shifts to `border_control`; `focus`: `3px` `focus` ring on link; `selected`/`disabled`/`pending`/`error`/`success`: N/A | `12px` card radius; mobile `/work` target `460px` (`200px` media cap + `212px` text/action + `48px` padding/gaps); `min-width: 0` prevents chip overflow. |
| FilterButton | `surface` resting background, `1px solid border_control`, `text` label; selected uses `accent` background + `on_accent` text | `default`: unselected category pill; `hover`: `surface_hover` background; `focus`: `3px` `focus` ring (`offset 3px`); `selected`: `accent` background + `on_accent` label + `aria-pressed`/`aria-selected`; `disabled`: `disabled_text` when count `0`; `pending`/`error`/`success`: N/A | `min-height: 44px`, `8px` radius (`control`), `8px` wrap gap, includes numeric count `(13)`/`(8)`/`(5)` inside label and updates `aria-live="polite"`. |
| FaqDisclosure | `canvas` / `surface` rows separated by `1px solid border_decorative`, `text` question, `muted_text` answer, `accent` toggle icon | `default`: collapsed on mobile, first expanded on desktop; `hover`: `surface_hover` summary row tint; `focus`: `3px` `focus` ring on `<summary>`/`<button>`; `selected` (expanded): `+` rotates to `−` (`instant` under reduced motion) + `2px` `accent` top rule; `disabled`/`pending`/`error`/`success`: N/A | `<summary>`/`<button>` height `>= 44px`, full-width click target, `16px` vertical padding, `40–60` word bounded answer. |
| StudioStandardsBand | Dark Forest band (`#071C18` canvas, `#102925` fact cards, `#EEE7DE` quote, `#D4A47A` eyebrow/numerals, `#24433D` borders) | `default`: pull quote + 2x2 studio facts + `/studio` CTA; `hover`: link underline thickens to `2px`; `focus`: `3px` `#D4A47A` outline on `/studio` link; `selected`/`disabled`/`pending`/`error`/`success`: N/A | `12px` card radius, `64px` section padding (`32px` mobile), pairs `Manrope` quote with `JetBrains Mono` key-value fact labels. |
| QualificationField | `surface` input background, `1px solid border_control`, `text` input value, `muted_text` hint/helper, `danger` error border & text | `default`: labeled input/select/textarea (`>= 44px` height, `120px` textarea); `hover`: `border_control` darkened or `surface_raised`; `focus`: `2px` `focus` border + `3px` `focus` ring; `selected`: option highlight in `surface_hover`; `disabled`: `surface_hover` + `disabled_text`; `pending`: `readonly` during submit; `error`: `2px` `danger` border + `aria-invalid="true"` + inline `danger` message; `success`: clears error state | `8px` radius (`control`), visible `<label>` above field (never hint-only), `16px` input font prevents iOS Safari zoom. |
| QualificationSubmit | `accent` background, `on_accent` label; error banner uses `surface` + `3px` `danger` border; success banner uses `surface` + `3px` `success` border | `default`: `Send project review request`; `hover`: `accent_hover`; `focus`: `3px` `focus` ring; `selected`: N/A; `disabled`: `surface_hover` + `disabled_text`; `pending`: `aria-busy="true"` + `Sending project brief...`; `error`: `role="alert"` banner + `Retry submission` (`44px`) + `mailto:` fallback; `success`: `role="status"` confirmation card | `min-height: 48px`, full width on `<600px`, preserves all 6 field values on network/HTTP failure. |
| CaseStudyContentsRail | `canvas` background, `muted_text` resting links, `accent` active indicator (`2px` inline-start border + `font-weight: 600`), `border_decorative` divider | `default`: sticky `136px` left rail (`>=1024px`) or horizontal pill strip (`<1024px`); `hover`: `text` color + `surface_hover` pill tint; `focus`: `3px` `focus` ring; `selected`: `accent` text + `2px` `accent` bar (`aria-current="location"`); `disabled`/`pending`/`error`/`success`: N/A | `136px` fixed desktop column with `88px` sticky top clearance; mobile pills `>= 44px` tall with `scroll-margin-top: 72px`. |
| StatusBadge | Semantic pill pairs (`surface_raised` + `success` for Production, `surface_raised` + `warning` for Hardware/Spec, `surface_raised` + `accent` for R&D, `1px solid border_control`) | `default`: static badge with text label + geometric icon/dot (zero looping pulse animations); `hover`/`focus`: non-interactive unless filterable; `selected`/`disabled`/`pending`/`error`/`success`: state conveyed via explicit text (`Production`, `Spec-Backed`, `Concept Build`) plus color | `14px` (`small`) label, `8px` radius (`control`), `4px 10px` padding, never relies on color alone. |
| DiagramViewer | `surface` frame, `1px solid border_decorative`, `surface_raised` control bar with `SecondaryButton` zoom controls (`+`, `−`, `Reset`, `Full`) | `default`: contained `overflow-x: auto` architecture diagram + visible `<details>` text summary; `hover`: `surface_hover` on control buttons; `focus`: `3px` `focus` ring on zoom buttons & summary; `selected`: active zoom scale readout + `<dialog>` full-screen modal; `disabled`: `+`/`−` at min/max bounds (`disabled_text`); `pending`/`error`/`success`: N/A | All zoom/modal buttons `>= 44x44px`; `12px` card radius (`16px` dialog); `Esc` closes modal and returns focus to trigger. |
| GlitreIllustrativeDeviceFrames | `surface` outer shell, `surface_raised` dual phone bezels (`1px solid border_control`), `accent` QR countdown (`00:58`) & `+ 100` settlement badge | `default`: side-by-side Customer QR & Worker Settlement illustrative frames with explicit confidential-surface caption; `hover`: `border_control` emphasis on active surface button; `focus`: `3px` `focus` ring on `Customer App` / `Worker App` tabs; `selected`: `accent` background + `on_accent` label + `aria-pressed="true"` revealing step ledger; `disabled`/`pending`/`error`/`success`: N/A | `12px` card radius, `>= 44px` surface toggle buttons, labeled *"Illustrative Customer & Station Worker Flows (Confidential Client Mobile Surfaces)"*. |
| ClassroomSentinelPipelineCard | `surface` / Dark Forest compatible 3-stage node row (`surface_raised` stage cards, `1px solid border_control`, `accent` stage index `01`–`03`) | `default`: 3 connected stages (`Async Poller` -> `Gemini JSON Schema` -> `Telegram Dispatcher`) + `/projects/Sintenel/preview.mp4` play trigger; `hover`: `surface_hover` stage tint; `focus`: `3px` `focus` ring on stage pills & video button; `selected`: `2px` `accent` border + `aria-selected="true"` showing schema preview; `disabled`/`pending`/`error`/`success`: N/A | `12px` card radius, `>= 44px` stage selector pills, `preload="metadata"` video modal/inline player with explicit play button. |
| AksiraDualEngineCard | `surface` card, `surface_raised` latency track, `success` / `accent` `700ms -> 30ms` metric pill, `1px solid border_control` | `default`: 3-stage IME latency pipeline + bilingual AR/EN rewrite toolbar; `hover`: `surface_hover` stage highlight; `focus`: `3px` `focus` ring on `Arabic RTL` / `English LTR` switch; `selected`: `accent` background on active locale button switching rewrite preview without network request; `disabled`/`pending`/`error`/`success`: N/A | `>= 240px` desktop (`200px` mobile) height, `>= 44px` language toggle buttons, pure HTML/CSS/SVG with zero raster PNG dependency. |
| ShowcaseArchitectureBadge | `surface` card, `surface_raised` 3-rail schematic (`QiraatyComplianceBadge`, `GetLabDatabaseBadge`, `AICollabRealtimeBadge`), `1px solid border_control`, `accent` rail arrows | `default`: static 3-rail compliance/relational/WebSocket diagram + tech stack tags; `hover`: `surface_hover` rail connector tint; `focus`: `3px` `focus` ring on rail inspection toggle; `selected`: `aria-expanded="true"` inline technical ledger note; `disabled`/`pending`/`error`/`success`: N/A | `12px` card radius, `>= 44px` inspect trigger, zero pulsing animations under `prefers-reduced-motion`, zero `/projects/` raster asset dependency. |

---

## 7. Tailwind v4 and CSS Consolidation Mapping

Stage 4 replaces the four fragmented prefix sets (`--atelier-*`, `--hv2-*`, `--wv2-*`, `--sv2-*`) and legacy `globals.css` coral/teal overrides with one `@theme` + `:root` / `[data-theme="dark"]` semantic layer imported once in `src/app/layout.tsx`.

| Legacy CSS variable(s) | Consolidated semantic CSS token | Light value | Dark value | Tailwind v4 utility / role |
| --- | --- | --- | --- | --- |
| `--atelier-pearl`, `--hv2-cream`, `--wv2-cream`, `--sv2-cream`, `--bg` | `--color-canvas` | `#EEE7DE` | `#071C18` | `bg-canvas` / page ground |
| `--hv2-card`, `--wv2-card`, `--sv2-card`, `--surface` | `--color-surface` | `#FAF7F1` | `#102925` | `bg-surface` / primary cards & inputs |
| `--hv2-paper`, `--cs-page --surface` | `--color-surface-raised` | `#F6F1EA` | `#17332E` | `bg-surface-raised` / media wells & badges |
| `--atelier-stone`, `--hv2-sand`, `--wv2-sand`, `--sv2-sand`, `--surface-alt` | `--color-surface-hover` | `#E5DBD1` | `#1E3F39` | `bg-surface-hover` / hover & secondary fills |
| `--atelier-ink`, `--hv2-ink`, `--wv2-ink`, `--sv2-ink`, `--text` | `--color-text` | `#202826` | `#EEE7DE` | `text-text` / primary headings & body |
| `--hv2-muted`, `--wv2-muted`, `--sv2-muted`, `--muted` | `--color-muted-text` | `#4B5551` | `#BEC8C1` | `text-muted-text` / secondary metadata |
| `--atelier-bronze-deep`, `--hv2-copper-text`, `--wv2-copper-text`, `--sv2-copper-text`, `--accent` | `--color-accent` | `#6F4224` | `#D4A47A` | `bg-accent` / `text-accent` / CTAs & kickers |
| `--accent-hover`, `--hv2-copper`, `--wv2-copper`, `--sv2-copper` | `--color-accent-hover` | `#583219` | `#E2B995` | `hover:bg-accent-hover` (replaces `#CF8649` text/focus use) |
| `--on-accent` | `--color-on-accent` | `#FAF7F1` | `#071C18` | `text-on-accent` / labels on accent fills |
| `--atelier-line-dark`, `--hv2-line-dark` | `--color-border-decorative` | `#D7CCC1` | `#24433D` | `border-border-decorative` / hairlines |
| `--line`, `--hv2-clay` | `--color-border-control` | `#56605C` | `#8FA097` | `border-border-control` / inputs & buttons |
| `--focus`, `:focus-visible` bronze | `--color-focus` | `#6F4224` | `#D4A47A` | `outline-focus` / `3px` keyboard ring |
| `--hv2-green`, `--wv2-status` | `--color-success` | `#1F5A45` | `#63C79A` | `text-success` / production & form success |

### Tailwind v4 `@theme` and Compatibility Alias Snippet

```css
@import "tailwindcss";

@theme {
  --color-canvas: var(--kd-canvas);
  --color-surface: var(--kd-surface);
  --color-surface-raised: var(--kd-surface-raised);
  --color-surface-hover: var(--kd-surface-hover);
  --color-text: var(--kd-text);
  --color-muted-text: var(--kd-muted-text);
  --color-disabled-text: var(--kd-disabled-text);
  --color-accent: var(--kd-accent);
  --color-accent-hover: var(--kd-accent-hover);
  --color-on-accent: var(--kd-on-accent);
  --color-border-decorative: var(--kd-border-decorative);
  --color-border-control: var(--kd-border-control);
  --color-focus: var(--kd-focus);
  --color-success: var(--kd-success);
  --color-warning: var(--kd-warning);
  --color-danger: var(--kd-danger);

  --font-sans: var(--font-atelier-body), Arial, sans-serif;
  --font-display: var(--font-atelier-display), Arial, sans-serif;
  --font-arabic: var(--font-atelier-arabic), Arial, sans-serif;
  --font-mono: var(--font-atelier-mono), ui-monospace, monospace;
}

:root,
:root[data-theme="light"] {
  --kd-canvas: #eee7de;
  --kd-surface: #faf7f1;
  --kd-surface-raised: #f6f1ea;
  --kd-surface-hover: #e5dbd1;
  --kd-text: #202826;
  --kd-muted-text: #4b5551;
  --kd-disabled-text: #47514d;
  --kd-accent: #6f4224;
  --kd-accent-hover: #583219;
  --kd-on-accent: #faf7f1;
  --kd-border-decorative: #d7ccc1;
  --kd-border-control: #56605c;
  --kd-focus: #6f4224;
  --kd-success: #1f5a45;
  --kd-warning: #6f4224;
  --kd-danger: #8f2d2d;
  color-scheme: light;
}

:root[data-theme="dark"] {
  --kd-canvas: #071c18;
  --kd-surface: #102925;
  --kd-surface-raised: #17332e;
  --kd-surface-hover: #1e3f39;
  --kd-text: #eee7de;
  --kd-muted-text: #bec8c1;
  --kd-disabled-text: #b0beb6;
  --kd-accent: #d4a47a;
  --kd-accent-hover: #e2b995;
  --kd-on-accent: #071c18;
  --kd-border-decorative: #24433d;
  --kd-border-control: #8fa097;
  --kd-focus: #d4a47a;
  --kd-success: #63c79a;
  --kd-warning: #d4a47a;
  --kd-danger: #f08c8c;
  color-scheme: dark;
}
```

Legacy `.hv2`, `.wv2`, `.sv2`, and `.cs-page` stylesheets retain temporary backward aliases (`--hv2-cream: var(--kd-canvas)`, `--hv2-copper-text: var(--kd-accent)`) during Stage 4 rollout and remove hardcoded hex overrides so `[data-theme="dark"]` applies uniformly across `/`, `/work`, `/work/[slug]`, `/services`, `/studio`, `/contact`, `/privacy`, and `/ar`.

---

## 8. OpenGraph Social Card Specification (`1200x630`)

Replaces the legacy `#101b2c` / `#47c7bf` card in `src/app/opengraph-image.tsx` with the unified **Global Atelier** Deep Forest (`#071C18`) canvas, `#102925` proof strip, `#D4A47A` Bronze-300 kicker, and `#EEE7DE` Pearl typography. All content elements sit strictly inside the `64px` safe margin (`x = 64..1136`, `y = 64..566`).

| Element | X | Y | Width | Height | Copy source and tokens |
| --- | ---: | ---: | ---: | ---: | --- |
| BrandKicker | 64 | 64 | 1072 | 32 | `KEPLER DEV · UK & GCC SOFTWARE STUDIO` (`18px` `Inter` 600, `#D4A47A` on `#071C18`) |
| MainHeadline | 64 | 124 | 1020 | 184 | `We Engineer Multi-Surface Software for Operations That Cannot Fail` (`52px` `Manrope` 500, `#EEE7DE` on `#071C18`) |
| SubheadLead | 64 | 328 | 960 | 76 | `Connected mobile apps, RTL dashboards, and resilient backends under one OpenAPI contract.` (`24px` `Inter` 400, `#BEC8C1` on `#071C18`) |
| ProofStrip | 64 | 454 | 1072 | 112 | `10K+ Downloads · 60 API Ops / 1 Contract · 0 WCAG AA Errors · UK & GCC` (`#102925` surface, `1px` `#24433D`, `#EEE7DE` values, `#D4A47A` labels) |

---

## 9. Open Pencil Role 2C Handoff

Role 2C creates the studio's unified Open Pencil `.fig` canvas under `canvas/documents/kepler-dev-atelier.fig` (preserving the `canvas/documents/` directory convention after Stage 0 removed personal files).

- **Variable Collections (2 Modes):** Create a `KeplerAtelier` variable collection with `Light` and `Dark` modes matching Section 3's 16 exact color names (`canvas`, `surface`, `surface_raised`, `surface_hover`, `text`, `muted_text`, `disabled_text`, `accent`, `accent_hover`, `on_accent`, `border_decorative`, `border_control`, `focus`, `success`, `warning`, `danger`), plus a `Metrics` collection for `spacing_px`, `radii_px`, and `typography` properties (separate native font-size and line-height tokens where Open Pencil requires discrete scalars).
- **Reusable Component Definitions (18 Symbols):** Build variant-backed components for all 18 entries in Section 6 (`SiteHeader`, `HeroAndTrust`, `PrimaryButton`, `SecondaryButton`, `FlagshipWorkStrip`, `WorkCatalogCard`, `FilterButton`, `FaqDisclosure`, `StudioStandardsBand`, `QualificationField`, `QualificationSubmit`, `CaseStudyContentsRail`, `StatusBadge`, `DiagramViewer`, `GlitreIllustrativeDeviceFrames`, `ClassroomSentinelPipelineCard`, `AksiraDualEngineCard`, `ShowcaseArchitectureBadge`) with explicit `default`, `hover`, `focus`, `selected`, `disabled`, `pending`, `error`, and `success` variants.
- **Required Screen Frames (Light + Dark Variants):**
  - `/` Homepage (`1440x900` desktop Light & Dark + `390x844` mobile)
  - `/work` 13-Project Catalog (`1440` desktop + `390` mobile with `460px` collapsed card height)
  - `/work/[slug]` Case Study Template (`1440` desktop with `136px` left TOC rail + `390` mobile)
  - `/services` Commercial Offer Ladder (`1440` desktop + `390` mobile)
  - `/studio` Governance & UK/GCC Footprint (`1440` desktop + `390` mobile)
  - `/contact` 6-Field Qualification Funnel (`1440` desktop + `390` mobile, including `error` & `success` states)
  - `/ar` Arabic RTL Mirror (`1440` + `390`, `IBM Plex Sans Arabic`, `letter-spacing: 0`, coordinated with Role 2B)
  - `OpenGraph-1200x630` Social Preview Frame (matching Section 8 coordinates)

---

## 10. Review Decisions and Verification Limits

- **Owner Direction Gate:** The Rank 1 **Global Atelier Unified v2** token set and Dark Mode polarity across `.hv2`, `.wv2`, `.sv2`, and `.cs-page` remain `proposed` until owner review before Open Pencil construction and Stage 4 CSS edits.
- **Bronze Contrast Refinement Decision:** Legacy `--hv2-copper` (`#CF8649`, `2.39:1` on Pearl) and `--atelier-bronze-deep` (`#985F3B`, `4.24:1` on Pearl) are retired from all text, kicker, and focus-ring roles in Light Mode, replaced by `#6F4224` (`accent`, `focus`) and `#583219` (`accent_hover`). Decorative bronze accents remain reserved strictly for non-essential graphic rules or dark `#071C18` / `#102925` surfaces (`#D4A47A`).
- **Verification Limits in Stage 3:** Contrast ratios in Section 4 are exact sRGB mathematical proofs on opaque hex tokens via `design_token_audit.py`. Actual browser font rendering (`Manrope`, `Inter`, `IBM Plex Sans Arabic`, `JetBrains Mono`), Arabic glyph shaping, line-wrap heights inside `390x844` / `1440x900` folds, and `200%` text-zoom reflow require Stage 4/5 headless browser screenshots and `axe-core` checks.
- **Stage 3 -> Stage 4 Scope Boundary:** This specification modifies zero files in `src/`, `public/`, or `roles/`. Stage 4 executes the CSS token consolidation, `opengraph-image.tsx` update, and `<Image>` compression backlog from Stage 2.

---

## 11. Mandatory Self-Audit Checklist

| Check | Status | Evidence |
| --- | --- | --- |
| Existing v1/v2 styling audit and 3 ranked directions | PASS | Sections 1 and 2 audit `global-atelier.css`, `home-v2.css`, `work-v2.css`, `services-v2.css`, `case-study.css`, `globals.css`, and `opengraph-image.tsx`, and rank 3 directions (`1`–`3`). |
| Light + Dark token schema & Tailwind v4 consolidation map | PASS | Section 3 JSON declares all 16 `colors` + 16 `dark_colors` opaque hex tokens; Section 7 maps all legacy prefixes into `@theme` + `[data-theme="dark"]`. |
| All declared Light & Dark contrast pairs pass (`>=4.5:1` / `>=3.0:1`) | PASS | Section 4 lists all 84 computed pairs (`42` Light + `42` Dark) generated via `design_token_audit.py --report` with zero failures. |
| All 18 studio components and interaction states specified | PASS | Section 6 specifies all 18 named components, states, `>=44x44px` hit targets, and `prefers-reduced-motion` rules. |
| OpenGraph `1200x630` safe-margin geometry valid | PASS | Section 8 places all 4 elements inside `x=64..1136` and `y=64..566` using Deep Forest & Pearl tokens. |
| Multi-route Open Pencil handoff boundaries documented | PASS | Section 9 maps `KeplerAtelier` Light/Dark collections, 18 symbols, all 7 route frames + OG frame under `canvas/documents/`. |
| Deterministic token verifier (`design_token_audit.py --verify`) exits `0` | PASS | Executed after final edit to `docs/stage-3-design-system.md` with exit code `0`. |
| Standalone studio voice (`copy_audit.py`) exits `0` | PASS | Executed on `docs/stage-3-design-system.md` with zero personal leaks, banned words, or solo pronouns (exit `0`). |
