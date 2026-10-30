```markdown
# Design System Document: The Editorial Escape

## 1. Overview & Creative North Star
**Creative North Star: "The Modern Maître d’"**
This design system moves away from the sterile, transactional nature of typical booking engines. Instead, it adopts the persona of a high-end travel editorial—think *Condé Nast Traveler* meets a boutique Mediterranean villa. We break the "template" look by utilizing intentional asymmetry, overlapping high-resolution imagery with elegant serif typography, and embracing a "breathe-first" layout philosophy. 

The goal is to make the user feel like they have already arrived at their destination. We achieve this through tonal depth, organic shapes, and a rejection of the "boxed-in" grid in favor of fluid, layered storytelling.

---

## 2. Colors & Surface Architecture
The palette is rooted in the tactile warmth of the earth: sun-baked terracotta, muted olive groves, and the soft glow of a white sand beach.

### The "No-Line" Rule
**Strict Mandate:** Designers are prohibited from using 1px solid borders for sectioning. Definition must be achieved through:
- **Tonal Shifts:** Moving from `surface` (#faf9f6) to `surface_container_low` (#f4f3f1).
- **Spatial Silences:** Using larger increments from the Spacing Scale (e.g., `8` or `12`) to imply boundaries.

### Surface Hierarchy & Nesting
Treat the UI as a physical desk of fine stationery. 
- **The Base:** Use `surface` for the primary canvas.
- **The Inset:** Use `surface_container` (#efeeeb) for secondary utility areas (e.g., filter sidebars).
- **The Lift:** Use `surface_container_lowest` (#ffffff) for the most prominent interactive cards to create a natural, "sun-bleached" highlight.

### The "Glass & Gradient" Rule
To elevate CTAs, use subtle gradients transitioning from `primary` (#994127) to `primary_container` (#b8583d) at a 135-degree angle. For floating navigation or "Quick Look" modals, apply **Glassmorphism**: 
- **Fill:** `surface_container_lowest` at 70% opacity.
- **Effect:** 20px - 32px Backdrop Blur. This ensures the earthy background tones bleed through, keeping the experience grounded.

---

## 3. Typography: The Editorial Voice
We pair the authority of a classic serif with the modern legibility of a geometric sans-serif.

*   **Display & Headlines (Noto Serif):** Used for storytelling. `display-lg` (3.5rem) should be used sparingly for hero titles, often overlapping image boundaries to break the grid.
*   **Titles & Body (Plus Jakarta Sans):** Our workhorse. `title-md` (1.125rem) provides a clean, sophisticated look for property names, while `body-md` (0.875rem) ensures effortless readability for long-form descriptions.
*   **Labeling:** `label-md` (0.75rem) should always be in `on_surface_variant` (#56423d) with a slight letter-spacing increase (0.05rem) to maintain a premium, typeset feel.

---

## 4. Elevation & Depth
Hierarchy is whispered, not shouted. We avoid the "floating card" cliché of the early 2010s.

*   **Tonal Layering:** Place a `surface_container_lowest` card atop a `surface_container_low` background. This provides enough contrast for the eye without the "heaviness" of a shadow.
*   **Ambient Shadows:** If a shadow is required for a floating Action Button or Top Nav:
    *   **Color:** Use `on_surface` (#1a1c1a) at 5% opacity.
    *   **Blur:** Minimum 40px.
    *   **Spread:** -4px (to keep the shadow "tucked" under the element).
*   **The "Ghost Border" Fallback:** If accessibility requires a stroke (e.g., in a high-glare environment), use `outline_variant` (#dcc1ba) at **15% opacity**. Never 100%.

---

## 5. Components & Primitive Logic

### Buttons (The "Soft-Touch" Interaction)
*   **Primary:** Gradient fill (`primary` to `primary_container`), `full` roundedness, and `title-sm` typography. 
*   **Secondary:** `surface_container_highest` fill with `on_secondary_container` text. No border.
*   **Tertiary:** Text-only in `primary` color, featuring a 2px underline in `primary_fixed` (#ffdbd1) for a subtle "editorial link" look.

### Cards & Property Lists
*   **Radius:** Always `lg` (2rem) or `xl` (3rem). 
*   **Structure:** No divider lines between the image and the content. Use a `1.5` (0.5rem) spacing gap or a simple vertical color block of `secondary_container` (#e0e5cc) to denote specific property tags (e.g., "Eco-Friendly").
*   **The "Curated" Chip:** Use `secondary_fixed` (#e0e5cc) backgrounds with `on_secondary_fixed_variant` (#444937) text. These should feel like organic labels found in a boutique shop.

### Input Fields & Search
*   **Search Bar:** Instead of a box, use a `surface_container_lowest` pill with a `full` radius and a soft ambient shadow. 
*   **States:** On focus, do not use a blue glow. Instead, shift the background to `surface_bright` and increase the shadow opacity slightly.

---

## 6. Do’s and Don’ts

### Do:
*   **Do** use asymmetrical image crops (e.g., one rounded corner at `xl` and others at `md`) to create a custom, high-end feel.
*   **Do** lean into white space. If you think there is enough room, add another `3` (1rem) of spacing.
*   **Do** use the `tertiary` (#7b542b) tone for "organic" details like star ratings or price callouts to keep them distinct from the action-oriented `primary` terracotta.

### Don’t:
*   **Don’t** use black (#000000). Always use `on_surface` (#1a1c1a) for text to maintain the "warm" aesthetic.
*   **Don’t** use 90-degree corners. Even "sharp" elements should have a minimum `sm` (0.5rem) radius to stay within the soft-travel brand identity.
*   **Don’t** use standard "line-art" icons. Prefer custom, slightly thicker-stroke icons that feel artisanal and hand-drawn.

---

## 7. Spacing & Rhythm
This system uses a **0.35rem (approx 5.6px) base unit** to create a non-standard, sophisticated rhythm.
- Use `spacing-6` (2rem) for standard gutter widths.
- Use `spacing-16` (5.5rem) to separate major sections, allowing the imagery to "breathe" like a coffee-table book.