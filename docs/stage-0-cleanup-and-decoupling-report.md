# Stage 0: Codebase Cleanup & Personal Decoupling Report

**Date:** 2026-11-07  
**Role:** `repo-hygiene-and-decoupling-engineer`  
**Status:** `PASS`

---

## 1. Deleted Legacy & Personal Portfolio Paths

| Deleted Path | Category | Verification Status |
| :--- | :--- | :--- |
| `assets/project-data-archive.ts` | Legacy personal portfolio code | Removed |
| `commit_all.ps1` | Obsolete PowerShell script | Removed |
| `assets/Agency website redesign` & `.zip` | Legacy design dump | Removed |
| `src/app/mahmoud/` | Personal founder route | Removed (replaced by `/studio` + redirect) |
| `public/brand/founder-*` (10 files) | Personal founder portraits & SVGs | Removed |
| `public/media/home/founder.webp` | Homepage founder portrait | Removed |
| `artifacts/founder-redesign-2026-09-04/` | Personal redesign artifacts | Removed |
| `canvas/*mahmoud*` | Personal canvas captures & `.fig` files | Removed |
| `artifacts/qa/*-profile` & `*.log` | Transient QA browser profiles & logs | Removed |

---

## 2. Decoupled Source Files & Studio Replacements

| File Path | Personal/Founder Reference Removed | Studio Replacement Applied |
| :--- | :--- | :--- |
| `src/lib/content.ts` | `mahmoudRole`, personal name & founder FAQ | `studioRole`, Kepler Dev studio accountability |
| `src/components/work-grid.tsx` | `mahmoudRole` regex stripping | Direct `study.studioRole` rendering |
| `src/components/case-study/*` | `Mahmoud`, `Founder reflection`, `Founder-reported` | `Kepler Dev`, `Studio reflection`, `Studio-recorded` |
| `src/content/home/{types.ts,en.ts}` | `founder` block & `led end to end by Mahmoud` | `studio` block & `engineered end to end by Kepler Dev` |
| `src/app/page.tsx` & `src/app/home-v2.css` | `#founder` section & portrait image | `#studio` section & link to `/studio` |
| `src/app/studio/page.tsx` & `next.config.ts` | `/mahmoud` route | New `/studio` route + permanent `/mahmoud` → `/studio` redirect |
| `src/components/site-shell.tsx` | `{ label: "Founder", href: "/mahmoud" }` | `{ label: "Studio", href: "/studio" }` (retained fallback email) |
| `src/app/layout.tsx` & `opengraph-image.tsx` | JSON-LD `@type: "Person"` (`Mahmoud`) & `Founder-led` | Pure `Organization` JSON-LD & independent studio tagline |
| `src/content/services/en.ts` & `src/app/privacy/page.tsx` | Personal name & sole-trader attribution | Studio-level delivery & UK operations wording |
| `src/app/ar/page.tsx`, `src/app/contact/page.tsx`, `src/app/sitemap.ts` | `/mahmoud` links & founder wording | `/studio` links & studio wording |

---

## 3. Preserved Project Assets for Stage 2

- Confirmed all 13 project media folders in `assets/` and `public/projects/` remain intact for Stage 2 asset migration.
- Confirmed `mahmouddattiaa7@gmail.com` remains solely as the temporary fallback contact email.

---

## 4. Deterministic Verification & Build Evidence

| Check | Command | Exit Code | Result Summary |
| :--- | :--- | :--- | :--- |
| **Decoupling Scan** | `python3 roles/repo-hygiene-and-decoupling-engineer/scripts/decoupling_audit.py --scan` | `0` | 0 forbidden personal/founder tokens in `src/` and `public/` |
| **Report Verification** | `python3 roles/repo-hygiene-and-decoupling-engineer/scripts/decoupling_audit.py --verify docs/stage-0-cleanup-and-decoupling-report.md` | `0` | All required sections and checks passed |
| **ESLint** | `npm run lint` | `0` | Clean |
| **Production Build** | `npm run build` | `0` | All routes compiled cleanly including `/studio` |
