# Stage 0: Codebase Cleanup & Personal Decoupling

**Purpose:** Before running Stage 1 strategy, SEO, and copywriting roles, we must remove all leftover personal portfolio code, delete personal founder photos/routes (`/mahmoud`), and strip personal attribution (`"Mahmoud"`, `"Founder-led"`) from the active Next.js codebase so **Kepler Dev** stands as an independent digital product studio.

---

## 1. Role Needed in Stage 0

### Role 1: Repo Hygiene & Decoupling Engineer (`roles/repo-hygiene-and-decoupling-engineer/`)
- **Job:** Clean out personal portfolio remnants and decouple personal identity from `src/` and `public/` while keeping `npm run build` and `npm run lint` green.
- **Responsibilities:**
  1. **Delete Personal Portfolio Leftovers & Bloat:**
     - Remove `assets/project-data-archive.ts` (legacy personal portfolio data with QSERV/iScore CV entries and `"I wanted..."` personal descriptions).
     - Remove `commit_all.ps1`, `assets/Agency website redesign/`, and `assets/Agency website redesign.zip`.
     - Remove personal photo assets from `public/`:
       - `public/brand/founder-environmental-detail.svg`
       - `public/brand/founder-grain.svg`
       - `public/brand/founder-portrait.jpg`
       - `public/brand/founder-portrait-mobile.webp`
       - `public/brand/founder-portrait-placeholder.svg`
       - `public/brand/founder-portrait-primary.svg`
       - `public/brand/founder-portrait.webp`
       - `public/brand/founder-working-context-mobile.webp`
       - `public/brand/founder-working-context.svg`
       - `public/brand/founder-working-context.webp`
       - `public/media/home/founder.webp`
     - Remove founder-specific design/audit artifacts (`artifacts/founder-redesign-2026-09-04/`, `canvas/documents/mahmoud.fig*`, `canvas/captures/mahmoud-*`, `canvas/review/mahmoud-*`) and transient QA browser profiles (`artifacts/qa/*-profile/`, `artifacts/qa/*.log`).
  2. **Remove `/mahmoud` Route & Replace with Studio Identity (`/studio`):**
     - Delete `src/app/mahmoud/page.tsx`.
     - Create a clean, studio-focused `/studio` route (`src/app/studio/page.tsx`) or redirect `/mahmoud` → `/studio` in `next.config.ts` so old links never 404.
     - Update navigation in `src/components/site-shell.tsx` from `{ label: "Founder", href: "/mahmoud" }` to `{ label: "Studio", href: "/studio" }`.
  3. **Decouple Personal Attribution Across `src/`:**
     - In `src/lib/content.ts`: Rename `mahmoudRole` → `studioRole` across the `CaseStudy` interface and all records; replace `"Mahmoud"` / `"founder-led"` in `faqs`, `teamContext`, and `permissionRef`.
     - In `src/app/layout.tsx`: Remove the `@type: "Person", name: "Mahmoud", url: "https://www.keplerdev.uk/mahmoud"` block from JSON-LD structured data and change `"Founder-led product engineering..."` to `"Product design and engineering studio for connected operational, mobile, and web products."`
     - In `src/app/page.tsx` and `src/content/home/`: Replace the `#founder` section (`copy.founder`, `founder.webp`, `"Mahmoud Mohamed Attia"`) with a `#studio` section (`copy.studio`) highlighting Kepler Dev's engineering standards, UK & GCC presence, and end-to-end accountability.
     - In `src/content/services/en.ts`, `src/components/work-grid.tsx`, `src/components/case-study/*`, `src/app/contact/page.tsx`, and `src/app/ar/page.tsx`: Remove all `"Mahmoud"` and `"founder"` references, replacing them with studio-level accountability (`"Kepler Dev"`, `"our engineering lead"`, `"the studio"`).
     - **Allowed Exception:** Keep `mahmouddattiaa7@gmail.com` in `src/components/site-shell.tsx` and contact fallback configuration until a custom domain inbox replaces it.
  4. **Verify Build, Lint & Deterministic Decoupling Audit:**
     - Run `python3 roles/repo-hygiene-and-decoupling-engineer/scripts/decoupling_audit.py --verify docs/stage-0-cleanup-and-decoupling-report.md`.
     - Run `npm run lint` and `npm run build` and confirm both exit with code `0`.

**Output:** `docs/stage-0-cleanup-and-decoupling-report.md`

---

## 2. Stage 0 Exit Checklist (Definition of Done)

- [ ] `assets/project-data-archive.ts`, `commit_all.ps1`, `src/app/mahmoud/`, and all `founder-*` images in `public/` are deleted.
- [ ] `decoupling_audit.py` scans `src/` and `public/` and reports **0** occurrences of `"Mahmoud"` (excluding the temporary email `mahmouddattiaa7@gmail.com`), **0** occurrences of `"mahmoudRole"`, and **0** references to `/mahmoud` or `founder-portrait`.
- [ ] `/studio` route is live and linked in header/footer navigation; `/mahmoud` permanently redirects to `/studio`.
- [ ] `npm run lint` and `npm run build` pass with zero errors.
