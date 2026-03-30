# Design System Specification: The Clinical Editorial

## 1. Overview & Creative North Star
**Creative North Star: "The Precise Curator"**
In the high-stakes world of Egyptian medical B2B2C logistics, trust is not built with decorative flourishes; it is built through surgical precision and unwavering clarity. This design system rejects the "standard SaaS template" in favor of a **High-End Editorial** approach. 

We break the "template" look by utilizing intentional white space, high-contrast typography scales (the interplay between the humanistic *Manrope* and the technical *Inter*), and a structural philosophy rooted in **Tonal Layering** rather than rigid borders. The result is a digital environment that feels like a premium medical journal: authoritative, clean, and highly efficient for rapid scanning.

---

## 2. Colors & Surface Philosophy
The palette is rooted in `primary` (#003FB1), but its power comes from the sophisticated use of neutrals and "Medical Blue" variants to define space.

### The "No-Line" Rule
**Explicit Instruction:** Do not use 1px solid borders to section content. Boundaries must be defined solely through background color shifts. 
*   Place a `surface-container-low` (#F3F4F6) card on a `surface` (#F8F9FB) background to create definition. 
*   If a visual break is needed, use a `4.5rem` (Scale 20) vertical spacer rather than a line.

### Surface Hierarchy & Nesting
Treat the UI as a series of stacked, physical layers.
*   **Base:** `surface` (#F8F9FB)
*   **Secondary Sections:** `surface-container-low` (#F3F4F6)
*   **Elevated Content/Cards:** `surface-container-lowest` (#FFFFFF)
*   **Active/Heavy UI Elements:** `surface-container-high` (#E7E8EA)

### The "Glass & Signature Texture" Rule
To elevate the experience from "Clinical" to "Premium," use **Glassmorphism** for floating headers and navigation bars.
*   **Token:** `surface` at 80% opacity with a `20px` backdrop-blur.
*   **Signature Gradient:** For primary CTAs and Hero sections, use a subtle linear gradient: `primary` (#003FB1) to `primary_container` (#1A56DB) at a 135-degree angle. This adds "visual soul" and depth that flat hex codes lack.

---

## 3. Typography: The Technical Authority
We use a dual-font strategy to balance professional warmth with clinical data density.

*   **Display & Headlines (Manrope):** Used for high-level editorial moments. The wider apertures of Manrope convey modern authority.
    *   *Example:* `display-lg` (3.5rem) for dashboard welcomes or empty state hero text.
*   **Title & Body (Inter):** Used for the "Workhorse" UI. Inter’s tall x-height ensures maximum legibility in dense medical lists and B2B tables.
    *   *Example:* `body-md` (0.875rem) for patient records and inventory counts.

**Editorial Contrast:** Always pair a `headline-sm` (Manrope) with a `label-md` (Inter, All-Caps, Tracking +5%) to create a clear hierarchical distinction between "Context" and "Content."

---

## 4. Elevation & Depth
Depth in this system is an atmospheric quality, not a structural one.

*   **The Layering Principle:** Achieve "lift" by stacking. An "Active" prescription card (`surface-container-lowest`) should sit atop a "Pending" list background (`surface-container-low`).
*   **Ambient Shadows:** For floating modals or dropdowns, use "The Breath Shadow":
    *   `box-shadow: 0 12px 32px -4px rgba(25, 28, 30, 0.06);`
    *   The shadow is tinted with the `on-surface` color to ensure it feels like a natural shadow cast in a brightly lit clinic, not a grey smudge.
*   **The Ghost Border Fallback:** If accessibility requires a stroke (e.g., in high-contrast modes), use `outline-variant` (#C3C5D7) at **15% opacity**. Never use 100% opaque borders.

---

## 5. Component Guidelines

### Buttons (The Anchor)
*   **Primary:** Uses the **Signature Gradient** (Primary to Primary Container). `Rounded-md` (0.75rem). Use `on_primary` (#FFFFFF) for text.
*   **Tertiary:** No background, no border. Use `primary` text. These should be used for secondary actions like "Cancel" or "View Details."

### Input Fields (Technical Precision)
*   **Style:** `surface-container-lowest` background with a `ghost border`. 
*   **State:** On focus, transition the border to `primary` (#003FB1) and add a `2px` outer glow using `primary_fixed` at 30% opacity.

### Cards & Lists (The Editorial Feed)
*   **Forbid Dividers:** Do not use lines between list items. Use a `0.6rem` (Scale 3) vertical gap and a subtle hover state shift to `surface-container-high`.
*   **Nesting:** Cards should always use `surface-container-lowest` (#FFFFFF) and a `rounded-lg` (1rem) corner to feel approachable yet contained.

### Status Badges (Clinical Urgency)
*   **Urgent Red:** Use `error_container` (#FFDAD6) for the background and `on_error_container` (#93000A) for text.
*   **Shape:** Always `rounded-full` (9999px) for a "pill" look that stands out against the angular UI.

---

## 6. Do's and Don'ts

### Do:
*   **Do** use extreme vertical rhythm. Use the Spacing Scale `12` (2.75rem) or `16` (3.5rem) to separate distinct functional blocks.
*   **Do** use `title-lg` for card headers to ensure the eye finds the start of a data point instantly.
*   **Do** embrace asymmetry. In a B2B dashboard, a wide primary data column paired with a narrow, ghost-bordered "Action" sidebar creates an editorial feel.

### Don't:
*   **Don't** use black (#000000). Always use `on_background` (#191C1E) for text to maintain the soft-clinical aesthetic.
*   **Don't** use standard `8px` rounded corners for everything. Use the **Roundedness Scale**: `lg` (1rem) for large cards and `sm` (0.25rem) for small technical tags to create visual hierarchy.
*   **Don't** use "Drop Shadows" on flat buttons. They must remain flat or use the signature gradient to imply depth.

---

## 7. Signature Medical Components
*   **The Vitality Spark:** A micro-interaction component for patient status. A small, pulsing glow using `tertiary_fixed_dim` to indicate live data syncing.
*   **The Prescription Glass:** A large, semi-transparent modal (`surface` with backdrop-blur) that overlays the entire UI for focused medical entry, isolating the clinician from background noise.