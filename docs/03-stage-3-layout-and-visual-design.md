# Stage 3: Multi-Page UX, Design System & Arabic RTL Architecture

**Purpose:** Turn the locked Stage 1 multi-route copy and Stage 2 13-project case studies into a unified multi-page wireframe (`/` Homepage, `/work` 13-Project Index, `/work/[slug]` Case Study Pages, `/services`, `/studio`, `/contact`, and `/ar` Arabic RTL), a single cohesive token system, and reviewed Open Pencil screens before Stage 4 coding.

---

## 1. The 5 Roles in Stage 3

### Role 1: Multi-Page UX & Funnel Architect (`roles/ux-and-layout-architect/`)
- **Job:** Map the cross-page conversion funnel and responsive wireframes (`1440px` Desktop and `390px` Mobile) for all routes.
- **Responsibilities:**
  - Design the layout for:
    1. **Homepage (`/`):** Hero → Featured Flagships Strip (`Glitre`, `HS VPN`, + teaser to all 13 projects) → 4-Step Delivery Process → Studio Engineering Standards (`#studio`, replacing `#founder`) → Ways to Work Together → FAQ → Final CTA.
    2. **Work Index (`/work`):** Category filter bar (`All Work [13]`, `Web & Dashboards`, `Mobile Apps`, `AI & Systems`, `Studio R&D`), 6 Flagship feature cards linking to `/work/[slug]`, and 7 Showcase cards with interactive media/architecture previews.
    3. **Case Study Detail (`/work/[slug]`):** Unified template supporting all 6 Flagship Case Studies (Hero + Numbers Strip + Sticky Desktop Contents Rail + Before/After Situation + Delivered Surfaces + Visual/Video Gallery + Architecture Diagram + 3 Decisions + Closing CTA).
    4. **Services (`/services`), Studio (`/studio`), and Contact (`/contact`):** Cohesive v2 editorial layouts so `/studio` and `/contact` match `/`, `/work`, and `/services`.
- **Output:** `docs/stage-3-ux-wireframe-and-layout.md`
- **Verifier:** `roles/ux-and-layout-architect/scripts/wireframe_audit.py`

---

### Role 2A: Atelier Design System Architect (`roles/ui-design-system-architect/`)
- **Job:** Harmonize the CSS token architecture across all routes (`global-atelier.css`, `home-v2.css`, `work-v2.css`, `services-v2.css`, `case-study.css`), verify WCAG AA contrast in both Light and Dark themes, and define Open Pencil variables.
- **Responsibilities:**
  - Audit all foreground/background color pairs with `scripts/design_token_audit.py` (`>= 4.5:1` for text, `>= 3:1` for UI controls).
  - Standardize typography (`Manrope` display, `Inter` body, `IBM Plex Sans Arabic` RTL), spacing, card frames, video player controls, and theme tokens so `/studio`, `/contact`, and `/ar` share the exact v2 editorial finish of `/`, `/work`, and `/services`.
- **Output:** `docs/stage-3-design-system.md`
- **Verifier:** `roles/ui-design-system-architect/scripts/design_token_audit.py`

---

### Role 2B: Arabic RTL & Localization Architect (`roles/arabic-rtl-architect/`)
- **Job:** Replace the outdated, provisional `/ar` preview page with natural, high-trust business Arabic and complete RTL layout rules for GCC buyers.
- **Responsibilities:**
  - Translate and adapt the locked studio copy into modern, natural GCC business Arabic (`src/content/home/ar.ts`, navigation, footer, and studio proof).
  - Remove the `"Arabic preview — language review in progress"` banner and all `"بقيادة المؤسس"` (founder-led) references, replacing them with standalone studio positioning.
  - Specify RTL logical property rules (`margin-inline`, `padding-inline`, directional arrow flipping, `IBM Plex Sans Arabic` line-height/tracking) and verify with `scripts/arabic_rtl_audit.py`.
- **Output:** `docs/stage-3-arabic-rtl-spec.md`
- **Verifier:** `roles/arabic-rtl-architect/scripts/arabic_rtl_audit.py`

---

### Role 2C: Open Pencil UI Screen Designer (`roles/open-pencil-ui-designer/`)
- **Job:** Build and visually inspect the new/updated multi-page screens in Open Pencil (`#studio` homepage section, `/studio` route, 13-project `/work` grid, new `/work/[slug]` case study screens, and `/ar` RTL view).
- **Output:** `docs/stage-3-open-pencil-design-handoff.md` + native canvas exports
- **Verifier:** `roles/open-pencil-ui-designer/scripts/design_handoff_audit.py`

---

### Role 3: Agency Design & Conversion Critic (`roles/design-and-conversion-critic/`)
- **Job:** Consolidate the wireframes, token system, Arabic RTL spec, and visual captures into the final locked implementation spec (`docs/stage-3-design-critique-and-locked-spec.md`) for Stage 4.
- **Output:** `docs/stage-3-design-critique-and-locked-spec.md`
- **Verifier:** `roles/design-and-conversion-critic/scripts/critique_audit.py`
