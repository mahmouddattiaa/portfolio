# Stage 2: 13-Project Agency Portfolio & Visual Assets

**Purpose:** Bring all **13 projects** into the Kepler Dev agency portfolio with verified, fast-loading visual assets in `public/projects/` and complete B2B studio case studies in `docs/stage-2-flagship-case-studies.md`.

---

## 1. How the 13 Projects Are Structured in Kepler Dev

All 13 projects are presented under **Kepler Dev's studio identity** (`"we built"`, `"our engineering team"`):

### A. 6 Flagship Studio Case Studies (Full `/work/[slug]` Deep-Dive Pages)
1. **`glitre-loyalty-platform` — Glitre Loyalty & Operations Platform** (GCC Fuel Retail — Customer RTL App, Android Station POS App, 9-Page Manager Dashboard, NestJS/PostgreSQL Append-Only Ledger)
2. **`hs-vpn` — HS VPN** (Consumer Security & Network Infrastructure — Flutter + Kotlin/Swift Native Tunnels + WireGuard/AmneziaWG + FastAPI Registrar, 10K+ Google Play downloads)
3. **`quickcharging-pos` — QuickChargingPOS** (Industrial Android POS & EV/Service Terminal — Sunmi Hardware + Custom Java `NamiPayModule` Mada Payment Bridge + Offline-First Sync)
4. **`medconnect-egypt` — MedConnect** (Healthcare Telemedicine & Clinic Operations Platform — Full-Stack Web + Patient/Doctor Portals + Encrypted Consultations)
5. **`stayease` — StayEase** (Hospitality & Property Booking Platform — Next.js/Node.js + Redis Webhook Deduplication + Atomic Reservation Locks)
6. **`classroom-sentinel` — Classroom Sentinel** (Edge Computer Vision & Automated Safety Monitoring — YOLOv8 Inference Pipeline + FastAPI + Real-Time React Telemetry Dashboard)

### B. 7 Studio Showcase & R&D Builds (Featured in the Filterable `/work` Catalog)
7. **`aksira-ai-keyboard` (`Faseeh AI`)** — System-Wide Android AI Keyboard (`InputMethodService` + Cached Flutter Engine reducing cold start from 700ms to 30ms)
8. **`fitforge`** — Fitness Coaching & Workout Telemetry Mobile App
9. **`qiraaty`** — Arabic EdTech & Audio Recitation Platform
10. **`collab-platform`** — Real-Time Distributed Team Collaboration Workspace
11. **`focus-ritual`** — Deep-Work & Productivity Session Engine
12. **`getlab-system`** — Laboratory Equipment & Reservation Management Desktop System (framed as a *Kepler Dev Internal R&D System Build*)
13. **`agency-os`** — Studio Operations & Delivery Governance Architecture

---

## 2. The 2 Roles Needed in Stage 2

### Role 1: Agency Visual Asset Curator (`roles/visual-asset-curator/`)
- **Job:** Migrate and verify the cleaned, web-optimized project screenshots and fast-start MP4 videos from `/home/kepler/Desktop/Kepler/Projects/Personal Portfilio/public/projects/` and local `assets/` into `/home/kepler/Desktop/Kepler/Projects/portfolio/public/projects/`.
- **Responsibilities:**
  - Ensure all 13 projects have clean, non-personal, high-resolution WebP/PNG/JPG covers and gallery screenshots (plus the 7 optimized `<25 MiB` fast-start MP4 videos where applicable) inside `public/projects/`.
  - Run `scripts/asset_inventory.py` to verify on-disk existence, pixel dimensions, aspect ratios, and file sizes.
  - Specify the exact **Frame Type** (`mobile-portrait-frame`, `desktop-browser-frame`, `multi-app-ecosystem-frame`, or `interactive-architecture-card`) and keyword-aligned `alt` text (`10–125 chars`) for every asset.
- **Output:** `docs/stage-2-visual-asset-manifest.md`
- **Verifier:** `roles/visual-asset-curator/scripts/asset_inventory.py`

---

### Role 2: B2B Case Study Architect (`roles/case-study-architect/`)
- **Job:** Write the 6 full `/work/[slug]` B2B case studies and the 7 structured showcase cards in `docs/stage-2-flagship-case-studies.md`.
- **Responsibilities:**
  - Follow the **Consequence First, Mechanism Second** B2B pattern:
    1. **Executive Snapshot:** Classification (`Client Work`, `Owned Product`, or `Studio R&D`), Production Status, Surfaces Delivered, Tech Stack, and Key Numbers Strip.
    2. **Operational Situation (Before vs. After):** Plain-English business problem and operational transformation for non-technical buyers.
    3. **System Architecture Diagram (`Mermaid`):** Validated diagram showing how mobile apps, web dashboards, API contracts, and databases connect.
    4. **3 Key Engineering Decisions:** Dual-layer breakdown (Business Consequence on the left + Technical Mechanism on the right for CTOs/engineers).
    5. **Visual & Video Walkthrough:** Mapped to exact verified paths from `docs/stage-2-visual-asset-manifest.md`.
  - Ensure **zero personal attribution** (`"we architected"`, `"Kepler Dev delivered"`) and pass both `case_study_audit.py` and `copy_audit.py`.
- **Output:** `docs/stage-2-flagship-case-studies.md`
- **Verifier:** `roles/case-study-architect/scripts/case_study_audit.py`

---

## 3. Stage 2 Exit Checklist (Definition of Done)

- [ ] All 13 projects have verified media in `public/projects/` and pass `asset_inventory.py --verify docs/stage-2-visual-asset-manifest.md`.
- [ ] All 6 Flagship Case Studies and 7 Showcase Cards are documented in `docs/stage-2-flagship-case-studies.md` and pass `case_study_audit.py` + `copy_audit.py`.
- [ ] Zero references to `"Mahmoud"`, university coursework, or first-person `"I"` exist in any case study or caption.
