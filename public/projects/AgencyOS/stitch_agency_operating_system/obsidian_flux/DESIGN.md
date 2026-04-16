# Design System Specification: The Kinetic Command

## 1. Overview & Creative North Star
**Creative North Star: "The Neon Architect"**
This design system is engineered to move away from the "static dashboard" and toward a "living instrument." We are not building a simple CRM; we are crafting an immersive, high-velocity environment for elite marketing teams. 

The aesthetic identity rejects the traditional flat-grid layout in favor of **Atmospheric Depth**. By utilizing deep charcoal foundations and neon-tinted glass layers, the UI feels like a sophisticated piece of hardware. We achieve a premium, custom feel through **Intentional Asymmetry**—where data density is balanced by expansive negative space—and **Chromatic Luminance**, using our neon accents not just as colors, but as light sources that define the spatial hierarchy.

---

## 2. Colors & Atmospheric Depth
Our palette is rooted in the `surface-dim` (#111318), but the soul of the system lies in the interaction between darkness and light.

### The "No-Line" Rule
**Prohibit 1px solid borders for sectioning.** To define high-end digital spaces, we use "Volume over Lines." 
- **Method:** Separate the sidebar from the main canvas using a shift from `surface-container-lowest` to `surface`. 
- **The Transition:** Boundaries are defined by a 24px or 32px gutter of negative space, or a subtle tonal shift. 100% opaque borders are relics of legacy software; we use light and shadow to imply structure.

### Surface Hierarchy & Nesting
Treat the UI as a series of nested physical layers:
1.  **Level 0 (Foundation):** `surface-dim` (#111318) - The base canvas.
2.  **Level 1 (Sectioning):** `surface-container-low` - Large structural areas (e.g., Content Feed).
3.  **Level 2 (Interaction):** `surface-container` - Primary cards and workspace elements.
4.  **Level 3 (Focus):** `surface-container-highest` - Modals, popovers, and active states.

### The "Glass & Gradient" Rule
Floating elements (Modals, Hover Cards, Tooltips) must use **Glassmorphism**:
- **Background:** `surface-variant` at 60% opacity.
- **Backdrop Blur:** 12px to 20px.
- **Inner Glow:** A 1px top-stroke using `primary` at 15% opacity to simulate light catching the edge of a glass pane.

---

## 3. Typography: The Editorial Engine
We use **Inter** as a functional workhorse, but we treat it with the precision of a high-end magazine.

*   **Display (The Statement):** `display-lg` (3.5rem) should be used sparingly for high-level agency metrics or hero welcomes. Set with `-0.04em` letter-spacing to create a "tight" professional look.
*   **Headlines (The Authority):** `headline-md` (1.75rem) serves as the anchor for workspace modules. Always use `on-surface` for maximum contrast.
*   **Data Labels (The Functional):** `label-md` (0.75rem) in `primary-fixed-dim` (Cyan). Using the neon accent for labels provides a "Heads-Up Display" (HUD) feel, making technical data feel actionable.
*   **Body:** `body-md` (0.875rem) in `on-surface-variant`. Lowering the contrast of body text slightly focuses the eye on primary actions and headlines.

---

## 4. Elevation & Depth
In this system, elevation is an optical illusion created by light, not structure.

### The Layering Principle
Instead of shadows, we stack. A `surface-container-highest` button sitting on a `surface-container-low` card creates an immediate, clean hierarchy.

### Ambient Shadows
Where floating depth is required (e.g., a command palette):
- **Blur:** 40px to 60px.
- **Color:** A 6% opacity version of `primary` (#00F5FF). This creates a "Neon Underglow" rather than a dirty grey shadow, making the component appear to be powered by light.

### The "Ghost Border" Fallback
When accessibility requires a container boundary:
- **Token:** `outline-variant`.
- **Constraint:** Maximum 15% opacity. It should be "felt, not seen."

---

## 5. Components

### Glowing Buttons
*   **Primary:** Background `primary-container` (#00F5FF), Text `on-primary` (#003739).
*   **The Signature Glow:** Apply a `drop-shadow` using the `primary` color at 30% opacity with a 15px spread. On hover, increase the brightness and scale the button by 2% (1.02).
*   **Secondary:** Ghost style. No background. `outline-variant` 10% opacity border. Text `on-surface`.

### Glass Cards (The Agency Standard)
*   **Structure:** No dividers. Use `title-sm` for the header and `body-sm` for content.
*   **Separation:** Use vertical whitespace (32px) to separate card sections.
*   **Accent:** A 2px vertical "Intent Indicator" on the left edge using `secondary` (Purple) to denote "Active" or "In-Progress" status.

### High-End Data Viz
*   **Line Charts:** Use `primary` (Cyan) for the data line with a gradient area fill (Primary to Transparent).
*   **Grid Lines:** Use `outline-variant` at 5% opacity. They should barely be visible, allowing the neon data line to "float" in the dark space.

### Input Fields (The Command Line)
*   **Style:** Minimalist. No background on default state; only a bottom-border `outline-variant`.
*   **Focus State:** The field transitions to `surface-container-high` with a subtle glow on the left border.

---

## 6. Do’s and Don’ts

### Do:
*   **Embrace Asymmetry:** Align a large metric to the left and leave the right 40% of the container empty to create "Breathing Luxury."
*   **Use Neon Sparingly:** Neon is for "Signal." If everything glows, nothing is important. 
*   **Layer Surface Tones:** Use the difference between `surface-container-lowest` and `surface-container-highest` to guide the user's eye.

### Don't:
*   **Don't Use Dividers:** Never use a horizontal rule `<hr>` to separate list items. Use 12px of padding and a hover state background change instead.
*   **Don't Use Pure Black:** Avoid #000000. It kills the depth of the glassmorphism. Always use `surface-dim` (#111318).
*   **Don't Default to White Text:** Use `on-surface-variant` for secondary information to maintain the moody, high-end atmosphere. Reserve `primary` and `on-surface` for the "Mission Critical."