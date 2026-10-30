# Design System Specification: Industrial Electric

## 1. Overview & Creative North Star
**The Creative North Star: "The Kinetic Monolith"**

This design system rejects the "app-as-a-website" philosophy. It is built as a high-performance industrial tool—a digital extension of physical hardware. Inspired by aerospace telemetry and premium EV interfaces (Tesla, Rivian), the aesthetic prioritizes extreme legibility under harsh lighting and "no-fail" tactile targets for POS environments.

The system breaks the standard "flat" digital mold through **Intentional Asymmetry** and **Chromatic Vibration**. By placing high-frequency neon accents against infinite-depth blacks, we create a UI that doesn't just sit on a screen; it feels like it’s being projected through glass. We move away from generic grids to a "Heads-Up Display" (HUD) logic, where information is tiered by critical importance rather than standard document flow.

---

## 2. Colors & Surface Logic
The palette is engineered for maximum contrast ratios, ensuring usability for technicians and customers in outdoor or high-glare environments.

### The "No-Line" Rule
Traditional 1px borders are strictly prohibited for structural sectioning. Boundaries must be defined by shifts in the `surface-container` tiers. A section is never "outlined"—it is "layered." 

### Surface Hierarchy & Nesting
To create a sense of mechanical assembly, use the following nesting logic:
*   **Base Layer:** `surface` (#080f16) for the global background.
*   **Primary Sectioning:** `surface-container-low` (#0d141c) for main content areas.
*   **Interactive Components:** `surface-container-high` (#18202a) or `highest` (#1e2731) to draw the eye to touchable elements.

### The "Glass & Gradient" Rule
To prevent the UI from feeling static, use **Kinetic Gradients**. Hero actions should utilize a linear gradient from `primary` (#3fff8b) to `primary-container` (#13ea79) at a 135-degree angle. This mimics the way light hits a machined metallic edge.

### Signature Textures
Floating status modules should utilize **Glassmorphism**:
*   **Fill:** `surface-container-high` at 60% opacity.
*   **Backdrop Blur:** 12px to 20px.
*   **Effect:** This creates a "frosted lens" look that maintains the industrial theme while adding premium depth.

---

## 3. Typography
We utilize **Inter** for its mathematical precision and high x-height, essential for POS readability.

*   **Display (lg/md):** Reserved for mission-critical data (e.g., % Charged, Total Price). Use `Font-Weight: 800` to create an authoritative "stamped" look.
*   **Headline & Title:** Used for navigation and section headers. Always in `on-surface` (#ebf1fb).
*   **Label (md/sm):** Used for technical metadata. These should often be `Uppercase` with `Letter-spacing: 0.05rem` to mimic industrial serial numbers or equipment labels.

**Editorial Hierarchy:** Use size contrast—not just color—to dictate flow. A `display-lg` metric paired with a `label-sm` technical readout creates a high-end, functional tension.

---

## 4. Elevation & Depth
In a high-contrast industrial environment, traditional drop shadows feel muddy. We use **Tonal Layering** and **Luminescent Glows**.

### The Layering Principle
Depth is achieved by "stacking" the surface-container tiers. Place a `surface-container-lowest` card on a `surface-container-low` section to create a recessed, "milled" effect into the dashboard.

### Ambient Shadows & Glows
*   **Interactive Glow:** Instead of a dark shadow, "Active" states use a soft outer glow of the `primary` color (#3fff8b) at 12% opacity with a 24px blur. This simulates the light emission of an LED status indicator.
*   **The "Ghost Border" Fallback:** If a container requires a boundary (e.g., an input field), use the `outline-variant` (#424851) at 20% opacity. Never use 100% opaque lines.

---

## 5. Components

### Buttons (Tactile Triggers)
*   **Primary:** High-vis `primary` (#3fff8b) background. `Roundedness: 0.25rem` (Industrial square-round). Large padding (`spacing-6` height).
*   **Secondary:** `surface-container-highest` background with a 2px `Ghost Border` of `secondary` (#00e3fd).
*   **Tertiary:** Ghost style, `on-surface` text, no background.

### Cards & Lists
*   **Forbid Dividers:** Do not use lines to separate list items. Use `spacing-4` vertical gaps or alternating `surface-container` subtle shifts.
*   **Tap Targets:** Every list item must have a minimum height of `4rem` (spacing-12) to accommodate industrial gloves or rapid touch.

### Input Fields
*   **Style:** Recessed appearance using `surface-container-lowest` (#000000). 
*   **Active State:** The border transitions to `secondary` (#00e3fd) with a subtle `secondary-container` inner glow.

### Charging Progress (Signature Component)
*   Use a thick (`8px`) linear track. 
*   **Track:** `surface-container-highest`.
*   **Indicator:** `primary` (#3fff8b) with a trailing `secondary` (#00e3fd) gradient to show "energy flow."

---

## 6. Do's and Don'ts

### Do:
*   **Do** use extreme scale. Make primary actions unmistakably large.
*   **Do** embrace "True Black." On OLED POS screens, `surface-container-lowest` (#000000) saves power and increases perceived contrast.
*   **Do** use asymmetrical layouts. Align technical data to the right and primary controls to the left to mirror modern cockpit ergonomics.

### Don't:
*   **Don't** use standard Material Design blue. Stick strictly to the "Electric" palette (`primary` green / `secondary` cyan).
*   **Don't** use soft, "bubbly" corners. Stick to the `0.25rem` (sm) to `0.375rem` (md) range for a rugged, machined feel.
*   **Don't** use 1px dividers. They create visual noise. Use negative space and tonal shifts to define structure.