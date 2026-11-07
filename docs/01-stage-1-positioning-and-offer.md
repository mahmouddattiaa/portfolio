# Stage 1: Studio Positioning, Offer Architecture, SEO & Multi-Route Copy

**Purpose:** Lock down **Kepler Dev's standalone studio positioning**, its **4 commercial offers**, **multi-route B2B SEO/GEO strategy**, and **conversion copy across every English page** (`/`, `/work`, `/services`, `/studio`, `/contact`) before Stage 2 expands the portfolio to 13 projects.

---

## 1. The 3 Roles Needed in Stage 1

### Role 1: Agency Product Strategist (`roles/product-strategist/`)
- **Job:** Consolidate Kepler Dev's commercial strategy (`docs/KeplerDev/`) and 13-project capabilities into a unified studio positioning brief and `.agents/product-marketing.md`.
- **Responsibilities:**
  - Define **Kepler Dev** as an independent digital product and software engineering studio serving GCC/MENA operational businesses and international founders.
  - Lock the **3 Core Product Lines**:
    1. *Connected Operational Platforms & Web Dashboards* (`Next.js`, `NestJS`, `PostgreSQL`, RBAC, real-time ledgers)
    2. *Native & Cross-Platform Mobile Applications* (`Flutter`, `Kotlin`, `Swift`, offline-first POS, hardware/IME/VPN bridges)
    3. *AI Systems, Computer Vision & Workflow Integrations* (Edge AI/YOLOv8, LLM pipelines, payment/ERP/queue integrations)
  - Lock the **4 Commercial Engagement Models**:
    1. **Kepler Product Blueprint** (5–10 business days — architecture, scope, and build plan)
    2. **Kepler Launch Sprint** (6–10 weeks — focused, production-ready v1 release)
    3. **Kepler Operations Platform** (8–16+ weeks phased — multi-surface customer + staff + admin platform)
    4. **Kepler Product Care** (Monthly — prioritized roadmap improvements and reliability)
  - Map the **13 Studio Projects** into **6 Flagship Case Studies** (`/work/[slug]`) and **7 Studio Showcase & R&D Builds** (`/work` filterable grid).
- **Outputs:** `.agents/product-marketing.md` and `docs/positioning-brief.md`
- **Verifier:** `roles/product-strategist/scripts/verify_positioning.py`

---

### Role 2: B2B SEO & Market Researcher (`roles/seo-and-market-researcher/`)
- **Job:** Define the search keywords, multi-page metadata (`title`, `description`, `canonical`, `hreflang`), heading hierarchy, GEO citable blocks, and JSON-LD structured data for `https://www.keplerdev.uk`.
- **Responsibilities:**
  - Map primary and secondary B2B commercial keywords across all routes (`/`, `/services`, `/work`, `/studio`, `/contact`, and `/work/[slug]`).
  - Write exact `<title>` (`45–60 chars`) and `<meta description>` (`135–160 chars`) tags for each route.
  - Design the multi-entity `@graph` JSON-LD (`Organization` / `ProfessionalService`, `WebSite`, `Service` offers, `SoftwareApplication` / `CreativeWork` case studies, and `FAQPage`) with **zero `@type: "Person"` references**.
  - Specify `hreflang` alternates (`en`, `ar`, `x-default`) and canonical URLs rooted at `https://www.keplerdev.uk`.
- **Output:** `docs/seo-and-market-brief.md`
- **Verifier:** `roles/seo-and-market-researcher/scripts/seo_audit.py`

---

### Role 3: B2B Conversion Copywriter (`roles/conversion-copywriter/`)
- **Job:** Write the locked, zero-fluff English copy for `/`, `/services`, `/work`, `/studio`, and `/contact` in Kepler Dev's institutional `"we / our"` studio voice.
- **Responsibilities:**
  - Write the complete page copy for:
    - **Homepage (`/`):** Hero, Selected Work (featuring Flagship Case Studies), 4-Step Delivery Process, Studio Engineering Standards (`#studio`), Ways to Work Together (Offers), B2B FAQ, and Closing CTA.
    - **Services (`/services`):** What We Build (3 product types), How We Work (4 engagements), Delivery Governance & Quality Standards, Pricing Transparency, and CTA.
    - **Work Index (`/work`):** Hero, How to Read Our Work, 13-Project Filterable Grid intros & card summaries (6 Flagships + 7 Showcase builds), and Project Review CTA.
    - **Studio (`/studio`):** Who Kepler Dev Is, How Our Engineering Teams Work (Contract-first architecture, automated QA, security-first delivery), UK & GCC Operating Footprint, and Core Principles.
    - **Contact (`/contact`):** Qualification form copy, scope prompts, privacy reassurance, and response SLA.
  - Enforce **Zero Personal Pronouns (`I / my / Mahmoud`)** and **Zero Banned AI Words** via `copy_audit.py`.
- **Output:** `docs/stage-1-final-copy-and-pitch.md`
- **Verifier:** `roles/conversion-copywriter/scripts/copy_audit.py`

---

## 2. Stage 1 Exit Checklist (Definition of Done)

- [ ] `.agents/product-marketing.md` and `docs/positioning-brief.md` pass `verify_positioning.py` with exit code `0`.
- [ ] `docs/seo-and-market-brief.md` passes `seo_audit.py` with valid JSON-LD (`Organization` + `Service` + `FAQPage`, zero `Person` schema) and exact metadata character counts.
- [ ] `docs/stage-1-final-copy-and-pitch.md` passes `copy_audit.py` with `0` banned AI words, `0` structural slogans, and `0` solo `"I / Mahmoud"` references.
- [ ] Approved by the owner before starting Stage 2.
