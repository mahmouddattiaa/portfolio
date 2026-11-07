# Stage 4: Next.js Code Implementation

**Purpose:** Implement the approved Stage 1–3 specifications across the Next.js 16 agency codebase (`/home/kepler/Desktop/Kepler/Projects/portfolio`), wiring all 13 projects, `/work/[slug]` deep-dive routes, the `/studio` page, updated `/ar` RTL homepage, unified Light/Dark themes, and multi-route SEO metadata.

---

## 1. Builder Role in Stage 4

### Role 1: Agency Frontend Engineer (`roles/agency-frontend-engineer/`)
- **Kit:** `roles/agency-frontend-engineer/`
- **Deliverable:** Production code in `src/` + `docs/stage-4-implementation-results.md`
- **Responsibilities:**
  1. **Typed Content & 13-Project Catalog (`src/lib/content.ts` & `src/content/`):**
     - Populate `caseStudies` and the showcase catalog with all **13 verified Kepler Dev projects** (6 Flagships with full `/work/[slug]` presentations + 7 Showcase builds).
     - Ensure `publicCaseStudies` publication gate passes cleanly for all intended public studies with `studioRole` (zero `mahmoudRole` or personal references).
  2. **Multi-Route UI Implementation (`src/app/` & `src/components/`):**
     - **`/` (`src/app/page.tsx`):** Updated Hero, Featured Flagship Work, 4-Step Delivery Process, Studio Engineering Standards (`#studio`), Ways to Work Together, FAQ, and Closing CTA.
     - **`/work` (`src/app/work/page.tsx` & `src/components/work-grid.tsx`):** Filterable 13-project showcase with interactive category filters, video/gallery previews, and links to `/work/[slug]`.
     - **`/work/[slug]` (`src/app/work/[slug]/page.tsx`):** Dynamic route supporting all 6 Flagship Case Studies with architecture diagrams, numbers strips, visual/video walkthroughs, and reduced-motion compliance.
     - **`/services` (`src/app/services/page.tsx`):** Studio delivery governance, 3 product types, 4 engagement offers, and pricing clarity.
     - **`/studio` (`src/app/studio/page.tsx`):** Standalone studio page covering Kepler Dev's engineering methodology, UK & GCC footprint, architecture standards, and quality guarantees.
     - **`/contact` (`src/app/contact/page.tsx`):** Harmonized v2 styling, offer pre-selection (`?offer=`), Formspree API integration, and fallback email.
     - **`/ar` (`src/app/ar/page.tsx`):** Updated v2 Arabic RTL experience matching the standalone studio positioning.
  3. **Multi-Route SEO, Sitemap & Structured Data:**
     - Implement route-level `Metadata`, `sitemap.ts` (including all `/work/[slug]` routes and `/studio`), `robots.ts`, `opengraph-image.tsx`, and `Organization` + `Service` + `FAQPage` JSON-LD.
  4. **Verification & Evidence:**
     - Run `npm run lint` and `npm run build` (must exit `0`).
     - Capture and inspect desktop (`1440px`) and mobile (`390px`) screenshots in both Light and Dark themes across `/`, `/work`, `/work/[slug]`, `/services`, `/studio`, `/contact`, and `/ar`.
     - Run `python3 roles/agency-frontend-engineer/scripts/implementation_audit.py --verify docs/stage-4-implementation-results.md`.
