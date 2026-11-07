# Stage 5: Release, Form Verification & Post-Launch Security Audit

**Purpose:** Verify that the agency website (`https://www.keplerdev.uk/`) has zero accidental private/personal file leaks in `public/`, optimized `<25 MiB` fast-start videos, verified `/contact` delivery, passing `axe-core` accessibility, and a complete security & AI-code verification audit.

---

## 1. The 2 Roles in Stage 5

### Role 1: Agency Release Engineer (`roles/agency-release-engineer/`)
- **Mission:** Audit all deployable assets, media performance, SEO routes, and contact form readiness, producing `docs/stage-5-launch-results.md`.
- **Gates Verified:**
  1. **Gate 1 — Safe Public Assets & Zero Personal Leaks:**
     - Verify every file in `public/` against an explicit allowlist. Confirm zero personal portraits, raw context markdown, or unredacted credentials exist in `public/`.
     - Re-run `decoupling_audit.py` to guarantee zero `"Mahmoud"` references exist anywhere in rendered HTML, JSON-LD, sitemap, or OpenGraph images (except the temporary contact email).
  2. **Gate 2 — Video & Image Optimization:**
     - Verify all project videos in `public/projects/` have `moov` before `mdat` (`faststart`), H.264/AAC compatibility, and clean streaming.
  3. **Gate 3 — Multi-Route Build, Sitemap & Enquiry Verification:**
     - Verify `npm run build` and `npm run lint`, inspect generated `sitemap.xml` and `robots.txt` for `https://www.keplerdev.uk`, and verify `/contact` validation, error recovery, and fallback behavior without sending unsolicited test spam.
- **Verifier:** `roles/agency-release-engineer/scripts/launch_audit.py`

---

### Role 2: Security & Code Verification Auditor (`roles/security-and-code-verification-auditor/`)
- **Mission:** Review the codebase and live/production build for security vulnerabilities, browser trust boundary issues, accessibility regressions (`axe-core`), and AI-generated code defects, producing `docs/stage-5-security-findings.md`.
- **Coverage:**
  - Secret & environment variable handling (`.env.local` isolation, `/api/contact` input validation, SSRF/injection prevention on `CONTACT_PROVIDER_ENDPOINT`).
  - Dependency advisories (`npm audit`), CSP/security headers, external link `rel="noopener noreferrer"`, and JSON-LD injection safety.
  - "Vibe coding" defect scan: dead components, unused CSS files, swallowed errors, broken filter states, keyboard focus traps, and reduced-motion compliance.
- **Verifier:** `roles/security-and-code-verification-auditor/scripts/verification_audit.py`
