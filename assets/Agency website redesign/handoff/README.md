# Kepler Dev redesign — handoff

Design reference for the agency site rebuild. Six screens in one file: home, work, services, process, about, contact (top nav switches between them).

## Contents

```
Kepler Dev - Redesign.dc.html   the design (open directly in a browser)
support.js                      runtime the design file loads
assets/brand/                   logo lockups, symbols, favicon, app icon, tokens
assets/media/                   hero poster frame
```

Keep the folder structure — the design references `assets/brand/…` and `assets/media/…` relative to itself.

## Brand tokens applied

| Token | Hex | Used for |
|---|---|---|
| Kepler Ink | `#11110F` | Text, dark sections, buttons |
| Paper White | `#FAF8F2` | Page background |
| Orbital Cream | `#F1EDE3` | Cards, contact panel |
| Signal Red | `#E5432F` | Hero CTA, large numerals, hover states, logo terminals |
| Graphite | `#67645D` | Mono labels and metadata |

Type: Newsreader (headings and body) + Geist Mono (labels), both from Google Fonts. These stand in for Editorial New and Söhne Mono, which need licensed web files.

## Contrast note

Signal Red on cream measures 3.9:1, below AA for text under 18.66px. Red is therefore restricted to large numerals, the logo, hover states, and the hero CTA on dark. Small labels use Graphite. Keep this rule when adding new copy.

## Notes for the rebuild

- Prices are floors ("From $300") and payment terms are 40/30/30, per the agency plan.
- Aksira and PetSpot are labelled "Kepler-owned product · In development". No client work is shown publicly.
- Image placeholders mark where real screenshots and the founder portrait belong.
- Reduced-motion preference disables the scroll-reveal animations.
