---
name: design-system-patterns
description: Specify semantic portfolio tokens, component states and matching Tailwind/Open Pencil mappings for Role 2A handoff.
---

# A single token source for design and implementation

Condensed adaptation of [Seth Hobson design system patterns](https://github.com/wshobson/agents/blob/main/plugins/ui-design/skills/design-system-patterns/SKILL.md), consulted 2026-11-01. MIT notice: `../LICENSES.md`.

Store exact opaque color values, typography, spacing, radii, motion and contrast pairs in one JSON block in the deliverable. Use semantic names; component tables reference those names rather than creating unrelated local hex values.

Document Tailwind v4 mappings: `--color-*` produces color utilities; font tokens map into existing `next/font` variables; ordinary custom properties can hold values that need no generated utility. Define aliases and namespaces explicitly; do not install a token package or edit CSS.

Map the same values into planned Open Pencil variable collections and reusable components/variants. Preserve a one-to-one identity across JSON, CSS names and canvas variable names; native font/line-height properties may require separate entries. These are planned mappings, not existing document/node IDs.

For each component name, specify the applicable default, hover, focus, selected/active, disabled, pending, error and success states. Mark irrelevant states as such. Declare every foreground/background pair used by those states. Meaningful borders and focus rings need a checked contrast pair against adjacent surfaces; decorative borders cannot serve as the only boundary.

Use the fixed viewport breakpoints from Role 1. Include custom architecture cards, form feedback, diagram containers and social-card geometry. Keep demonstrations labelled as illustrative. Role 2B constructs screens, verifies font availability/text fit and records actual frame IDs; Role 3 reviews the combined result.
