---
name: responsive-design
description: Specify mobile-first portfolio grids, frame geometry, and responsive interaction states without implementing UI.
---

# Responsive layout specification

Local adaptation of [Seth Hobson responsive design](https://github.com/wshobson/agents/blob/main/plugins/ui-design/skills/responsive-design/SKILL.md), consulted 2026-11-01. MIT notice: `../LICENSES.md`.

Start at 390px, then define content-driven tablet and desktop breakpoints. Include 1440x900, 390x844, 320px reflow, 200% zoom, and safe-area handling. Prefer fluid widths with explicit maximums and gaps.

Specify each media wrapper's ratio, fit mode, maximum height, loading and fallback. Portrait and desktop images keep intrinsic proportions; do not stretch screenshots or replace missing assets with invented UI.

Make every mobile control at least 44x44px. Define keyboard activation, focus visibility, reduced-motion behavior and persistent controls that never cover content.

Use compact flagship and archive layouts with numeric height budgets. Progressive disclosure must preserve access to all source content and stable focus. Do not depend on hover to reveal essential proof.

For diagrams, specify a readable text equivalent plus contained zoom/pan or full-view access. Keep horizontal overflow inside the diagram viewer. No heavy hero animation, autoplay video, or eager below-fold media.

Do not choose colors, fonts, contrast ratios or visual tokens; those belong to Role 2. Numeric wireframe budgets are estimates pending browser measurement.
