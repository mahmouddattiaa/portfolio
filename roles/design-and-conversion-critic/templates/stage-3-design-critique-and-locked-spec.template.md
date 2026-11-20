# Stage 3 — Consolidated Design Critique & Locked Implementation Blueprint (Kepler Dev)

**Readiness Status:** `ready_for_user_review` *(Replace only after auditing all Stage 1–3 inputs; never mark approved on behalf of the user)*  
**Brand:** Kepler Dev (`https://www.keplerdev.uk`)  
**Visual Direction:** `Global Atelier Unified v2` (`#EEE7DE` Pearl / `#071C18` Deep Forest / `#6F4224` Light Accent / `#D4A47A` Dark Accent)

---

## 1. Cross-Stage Readiness Summary & Authority Chain
- State the authoritative source precedence (`stage-1-final-copy-and-pitch.md`, `seo-and-market-brief.md`, `stage-2-visual-asset-manifest.md`, `stage-2-flagship-case-studies.md`, `stage-3-ux-wireframe-and-layout.md`, `stage-3-design-system.md`, `stage-3-arabic-rtl-spec.md`).
- Summarize Open Pencil status (canvas specification ready under Role 2C handoff vs. immediate code readiness against existing live v2 Next.js layout).

## 2. Six-Lens Critical Audit Findings & Dispositions

| Audit Lens | Issues Identified Across Current Site / Prior Specs | Locked Stage 4 Resolution | Severity |
| :--- | :--- | :--- | :--- |
| **1. Above-the-Fold Clarity & Funnel** | FILL | FILL | FILL |
| **2. Standalone Studio Decoupling** | FILL | FILL | FILL |
| **3. Contrast & Dual-Theme Parity** | FILL | FILL | FILL |
| **4. Arabic RTL & GCC Typography** | FILL | FILL | FILL |
| **5. 13-Project Catalog & Media Hygiene** | FILL | FILL | FILL |
| **6. Scope Honesty & Form Safety** | FILL | FILL | FILL |

## 3. Canonical Authority Map for Stage 4 Implementation (`src/` Target Architecture)

Map every route, content file, component, and asset group Stage 4 must build or update:

| Target File / Route | What Changes in Stage 4 | Authoritative Source Document |
| :--- | :--- | :--- |
| `src/styles/` & `src/app/global-atelier.css`, `home-v2.css`, `work-v2.css`, `services-v2.css`, `case-study.css` | Consolidate semantic tokens, `#6F4224` Light / `#D4A47A` Dark parity, `[dir="rtl"]` `letter-spacing: 0` & logical properties | `stage-3-design-system.md` §7 + `stage-3-arabic-rtl-spec.md` §4 |
| `src/app/layout.tsx` & `src/app/opengraph-image.tsx` | Multi-route metadata defaults, `Organization` JSON-LD (zero `Person`), Global Atelier `1200x630` OG card, localized skip link | `seo-and-market-brief.md` §5 + `stage-3-design-system.md` §8 |
| `src/lib/content.ts` & `src/content/` | All 13 studio builds (6 Flagships + 7 Showcase builds), `8/5/5/5` filter taxonomy, `studioRole`, EN + AR full `HomeCopy` | `stage-2-flagship-case-studies.md` §1–7 + `stage-3-arabic-rtl-spec.md` §3 |
| `src/app/page.tsx` & `src/app/ar/page.tsx` | Unified v2 homepage in EN and full-parity RTL `/ar` (zero provisional banner, `#studio` band) | `stage-1-final-copy-and-pitch.md` §2 + `stage-3-arabic-rtl-spec.md` §2–3 |
| `src/app/work/page.tsx` & `src/app/work/[slug]/page.tsx` | Filterable 13-project grid (`?category=`) + 6 dedicated Flagship case study pages with sticky `136px` TOC rail & lightbox | `stage-3-ux-wireframe-and-layout.md` §5–7 |
| `src/app/services/page.tsx` & `src/app/studio/page.tsx` | 3 Product Lines, 4 Commercial Offers with `?offer=` links, and v2 editorial `/studio` page | `stage-1-final-copy-and-pitch.md` §4–5 |
| `src/app/contact/page.tsx` & `src/components/contact-form.tsx` | Unified v2 6-field qualification form, `?offer=` prefill, error focus recovery, `mahmouddattiaa7@gmail.com` fallback | `stage-3-ux-wireframe-and-layout.md` §8 |
| `public/projects/` | Compress `Screenshot 2026-04-09 225636.png` (`594.2 KB`) & `sign-in.webp` (`502.4 KB`) `<200 KB` WebP | `stage-2-visual-asset-manifest.md` §4 |

## 4. Runtime Verification Checks Deferred to Stage 4 & Stage 5
- Explicitly state what Stage 3 documents prove mathematically vs. what Stage 4/5 must verify in a live headless browser (`npm run build`, `npm run lint`, Playwright `320/390/1440` screenshots in Light/Dark & EN/AR, `axe-core`, keyboard focus traps, `prefers-reduced-motion: reduce`, video metadata loading, and Formspree smoke test).

## 5. Mandatory Self-Audit Checklist

| Check | Status | Evidence |
| --- | --- | --- |
| Readiness status explicitly `ready_for_user_review` or `blocked` | FILL | FILL |
| All 6 Audit Lenses evaluated against Stage 1–3 inputs | FILL | FILL |
| Stage 4 File-Level Authority Map covers all 7 routes & 13 projects | FILL | FILL |
| Deferred runtime browser/contrast/a11y checks clearly separated | FILL | FILL |
| Deterministic critic verifier (`critique_audit.py --verify`) exits `0` | FILL | FILL |
| Standalone studio voice (`copy_audit.py`) exits `0` | FILL | FILL |
