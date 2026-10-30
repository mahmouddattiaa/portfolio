# Design System Document: Kinetic Brutalism

## 1. Overview & Creative North Star
**The Creative North Star: "Kinetic Brutalism"**
This design system moves away from the polite, sterile layouts of traditional fitness apps. Instead, it embraces the raw energy of a high-intensity gym. "Kinetic Brutalism" is defined by high-contrast typography, aggressive neon accents, and a structural depth that feels like architectural layers rather than a flat digital screen. We break the "template" look by using intentional asymmetry—letting headlines bleed off-grid and using overlapping elements to create a sense of forward motion.

## 2. Colors
Our palette is engineered for high-visibility in low-light environments (the gym floor). It balances the "void" of dark charcoal with the "spark" of electric orange and neon green.

*   **Primary (Electric Orange - `#ffb5a0` / `#ff5625`):** Used for primary conversion points and critical motivational feedback.
*   **Secondary (Neon Green - `#d7ffc5` / `#2ff801`):** Reserved for "Go" states, progress completion, and active tracking indicators.
*   **Surface Hierarchy:** We utilize a "Subtractive Dark" approach. The `background` (`#131313`) is the bedrock.
    *   **Surface-Container-Low:** For secondary background groupings.
    *   **Surface-Container-High:** For interactive cards and elevated modules.

**The "No-Line" Rule**
Prohibit 1px solid borders for sectioning. Boundaries must be defined solely through background color shifts. For example, a workout summary card (`surface-container-high`) should sit on a training session background (`surface-container-low`). If a container feels lost, increase the contrast of the background tier, do not add a line.

**The "Glass & Gradient" Rule**
To avoid a "flat" feel, use Glassmorphism for floating navigation and persistent "Current Exercise" widgets. Use `surface-container-highest` with a 60% opacity and a `20px` backdrop-blur. 
*   **Signature Texture:** Apply a linear gradient (45°) from `primary` to `primary_container` on large CTAs to give them a "forged" metallic sheen.

## 3. Typography
We use a dual-font strategy to balance aggressive branding with high-performance utility.

*   **Display & Headlines (Space Grotesk):** This is our "Impact" face. Its wide stance and technical terminals feel engineered and modern. 
    *   *Usage:* Use `display-lg` for PR (Personal Record) numbers and `headline-md` for workout titles.
*   **Body & Labels (Manrope):** A clean, geometric sans-serif that remains legible even when the user’s phone is vibrating on a treadmill. 
    *   *Usage:* Use `body-md` for exercise instructions and `label-sm` for technical data (weight, reps, sets).

**The Typography Hierarchy**
Headlines should utilize "Optical Weighting"—tight letter spacing (-2%) and heavy weights to create a "blocky" editorial feel that commands attention.

## 4. Elevation & Depth
In this system, depth is a functional tool, not a stylistic flourish.

*   **The Layering Principle:** Stacking surface-container tiers creates a "physical" interface. 
    *   *Base:* `surface`
    *   *Section:* `surface-container-low`
    *   *Card:* `surface-container-highest`
*   **Ambient Shadows:** Floating elements (like a "Start Workout" FAB) must use a diffused shadow: `0px 20px 40px rgba(0, 0, 0, 0.4)`. The shadow should be tinted with the `surface_container_lowest` color to keep the blacks feeling deep and "inky."
*   **The "Ghost Border" Fallback:** If accessibility requires a border, use `outline-variant` at **15% opacity**. High-contrast white or grey borders are strictly forbidden.
*   **Glassmorphism:** Use semi-transparent `surface_variant` for overlays to allow the vibrant neon accents of the background to bleed through, maintaining the high-energy vibe.

## 5. Components

### Buttons
*   **Primary:** Solid `primary` (Electric Orange) with `on-primary` text. Use `rounded-md` (0.375rem) for a sharp, technical look.
*   **Secondary:** Ghost style with a `primary` "Ghost Border" (20% opacity) and `primary` text. 
*   **Tertiary:** `surface-container-highest` background with `on-surface` text; no border.

### Progress Bars
*   **Track:** `surface-container-highest`.
*   **Indicator:** A gradient from `secondary` (Neon Green) to `tertiary`. 
*   **Animation:** Use a "pulse" glow effect on the leading edge of the progress bar using the `secondary_fixed` token.

### Cards & Lists
*   **Rule:** Forbid divider lines. Separate list items using `8px` of vertical white space (Spacing Scale `4`) or alternating between `surface-container-low` and `surface-container-lowest`.
*   **Interactive Cards:** Should utilize `rounded-xl` (0.75rem) and a subtle gradient hover state.

### Input Fields
*   **Default:** `surface-container-highest` background with a `2px` bottom-only accent using `outline-variant`. 
*   **Focus:** The bottom-only accent transitions to `primary` (Orange).

### Additional: "The Forge" Performance Gauge
*   A custom circular component for heart rate or intensity. It uses a thick `12px` stroke with a `secondary_container` glow and `display-sm` typography in the center.

## 6. Do's and Don'ts

### Do
*   **Do** use asymmetrical margins. If the left margin is `24px`, try a `32px` right margin for editorial headlines to create "tension."
*   **Do** use the `secondary` (Neon Green) sparingly. It should be a reward for effort, not a general UI color.
*   **Do** prioritize "Manrope" for all numerical data to ensure zero ambiguity during a heavy lift.

### Don't
*   **Don't** use pure white `#FFFFFF`. Always use `on-surface` (`#e5e2e1`) to prevent eye strain in dark environments.
*   **Don't** use standard "Drop Shadows" on cards. Use tonal layering (shifting from `surface-low` to `surface-high`) instead.
*   **Don't** use icons with thin strokes. Use "Heavy" or "Filled" icon weights to match the "Brutalist" typography.