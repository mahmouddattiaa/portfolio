# Stage 0 — Repo Hygiene & Decoupling Engineer

## Single mission
Delete all personal portfolio leftovers and founder/personal references from `/home/kepler/Desktop/Kepler/Projects/portfolio`, replace `/mahmoud` with `/studio`, verify `npm run lint` and `npm run build`, and write `/home/kepler/Desktop/Kepler/Projects/portfolio/docs/stage-0-cleanup-and-decoupling-report.md`.

## Hard ground rules
- Never run `ls` or `find` to discover context; all exact target paths are listed below.
- Never delete `node_modules/`, `.env.local`, `public/projects/`, `public/media/kepler-fold/`, `public/media/home/{hero-tree.webp,branch.webp}`, or `assets/{AgencyOS,Faseeh-Ai,FitForge,HS-VPN,Qiraaty,Sintenel,StayEase,collab-platform,focus-ritual,getlab,glitre,hs-vpn,medconnect,quickcharging,KEPLERDEV_PROJECT_PORTFOLIO.md}` (Stage 2 uses those raw project assets).
- Keep `mahmouddattiaa7@gmail.com` in `src/components/site-shell.tsx` as the temporary contact email. Every other occurrence of `mahmoud` or `founder` (case-insensitive) in `src/` and `next.config.ts` must be removed.
- Use institutional studio language (`Kepler Dev`, `we`, `our`, `the studio`, `studioRole`). Never use solo pronouns (`I`, `my`) or personal attribution.
- Do not push to `origin` or modify `.env.local`.

## Step 1 → Run baseline audit & delete personal/legacy files
1. Run `python3 roles/repo-hygiene-and-decoupling-engineer/scripts/decoupling_audit.py --context`.
2. Delete the legacy personal portfolio code, founder photos, and mahmoud canvas/artifact files:
   ```bash
   rm -rf assets/project-data-archive.ts commit_all.ps1 "assets/Agency website redesign" "assets/Agency website redesign.zip" \
     src/app/mahmoud public/brand/founder-* public/media/home/founder.webp \
     artifacts/founder-redesign-2026-09-04 canvas/documents/mahmoud.fig* canvas/captures/mahmoud-* canvas/review/mahmoud-* \
     artifacts/qa/chrome-cdp-profile artifacts/qa/chrome-temp-profile artifacts/qa/edge-temp-profile artifacts/qa/*.log
   ```

## Step 2 → Decouple `src/` data contracts, components & styles
1. **`src/lib/content.ts`:** Rename `mahmoudRole` → `studioRole` in `CaseStudy` and all entries. Replace `"Mahmoud"`, `"Mahmoud confirmation"`, `"Mahmoud approval"`, and `"founder-led studio. Mahmoud Attia is accountable..."` with `"Kepler Dev"`, `"studio verification"`, `"studio approval"`, and `"Kepler Dev is an independent product engineering studio. Our senior engineering leads are accountable for technical direction and delivery on every engagement..."`.
2. **`src/components/work-grid.tsx`:** Replace `study.mahmoudRole` with `study.studioRole` and remove the `roleWithNameRemoved` regex helper.
3. **`src/components/case-study/{hs-vpn-content.ts,hs-vpn-article.tsx,presentation.ts,case-study-article.tsx}`:**
   - Replace `study.mahmoudRole` with `study.studioRole`.
   - Replace `"Mahmoud led..."`, `"Mahmoud's leadership..."`, `"Founder-reported"`, `"reported by the founder"`, `"Mahmoud Attia, founder, Kepler Dev"`, and `"Founder reflection"` with `"Kepler Dev led..."`, `"Our studio's engineering decisions..."`, `"Studio-recorded"`, `"recorded in production telemetry"`, `"Kepler Dev Engineering"`, and `"Studio reflection"`.
4. **`src/content/home/{types.ts,en.ts}`, `src/app/page.tsx` & `src/app/home-v2.css`:**
   - In `src/content/home/en.ts`: Change `hsVpnFeature.eyebrow` to `"Customer-owned product · engineered end to end by Kepler Dev"`.
   - Rename `founder` → `studio` in `src/content/home/types.ts` and `src/content/home/en.ts` (remove `name`, `role`, `photoAlt`; set `eyebrow: "The Studio"`, `title: "One accountable engineering partner from first conversation to launch."`, `quote: "We built Kepler Dev because too much software ships without the engineering team truly understanding the operation it has to serve."`, `link: "About the studio"`).
   - In `src/app/page.tsx`: Update section `#founder` → `#studio`, remove the `<Image src="/media/home/founder.webp" ... />` block, render `copy.studio`, and link to `/studio`.
   - In `src/app/home-v2.css`, `src/app/globals.css`, `src/app/global-atelier-home.css`, and `next.config.ts`: Remove/rename any `founder` or `/mahmoud` comments and selectors.

## Step 3 → Update routes (`/studio`, `/services`, `/privacy`, `/ar`, `/contact`, `layout.tsx`, `sitemap.ts`, `opengraph-image.tsx`)
1. Create `src/app/studio/page.tsx`: A clean studio overview page using `RouteHero` (Eyebrow: `"The Studio"`, Title: `"Built for connected operational and digital products."`, Lead: `"Kepler Dev is an independent digital product studio based in the United Kingdom and operating across the GCC and worldwide."`) + sections covering Studio Accountability, Engineering Standards (Contract-first systems, resilient mobile & web surfaces, transparent handover), Operating Footprint, and Closing CTA to `/contact`.
2. Add permanent redirect `/mahmoud` → `/studio` in `next.config.ts`.
3. Update `src/components/site-shell.tsx` (`{ label: "Studio", href: "/studio" }`), `src/app/sitemap.ts` (`"/studio"`), `src/app/contact/page.tsx` (`href="/studio"`), and `src/app/ar/page.tsx` (`href="/studio"` and studio wording instead of founder wording).
4. Update `src/content/services/en.ts` (`team.body`), `src/app/privacy/page.tsx` (remove personal name, state `"Kepler Dev operates in the United Kingdom"`), `src/app/layout.tsx` (remove `@type: "Person"` from JSON-LD and change `"Founder-led"` to `"Independent digital product studio"`), and `src/app/opengraph-image.tsx` (change `"Founder-led product engineering"` to `"Digital product & software engineering studio"`).

## Step 4 → Verify and write report
1. Run `python3 roles/repo-hygiene-and-decoupling-engineer/scripts/decoupling_audit.py --scan`. Fix any remaining hits.
2. Run `npm run lint` and `npm run build` and confirm both exit `0`.
3. Write `docs/stage-0-cleanup-and-decoupling-report.md` using `roles/repo-hygiene-and-decoupling-engineer/templates/stage-0-cleanup-and-decoupling-report.template.md`.
4. Run `python3 roles/repo-hygiene-and-decoupling-engineer/scripts/decoupling_audit.py --verify docs/stage-0-cleanup-and-decoupling-report.md`.
5. When complete, send a message back to the parent agent so it wakes up and reviews your deliverable.
