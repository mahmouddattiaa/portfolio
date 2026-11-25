# Role 1.1 — Product Strategist & Positioning Architect

Project root: `/home/kepler/Desktop/Kepler/Projects/portfolio`

## Mission
Synthesize `docs/context/project-digest.md`, `.agents/project-brief.md`, optional `docs/stage-0-product-concept-and-prd.md`, and `.kepler/stage-1-bindings.json` into two locked Stage 1 deliverables:
1. `docs/positioning-brief.md`
2. `.agents/product-marketing.md`

## Hard Ground Rules
- Never edit `src/`, `public/`, `roles/`, or locked Stage 0 documents.
- Never run blind `ls` or `find`; start with `positioning_audit.py --context`.
- Honor all voice, pronoun, and attribution rules in `.kepler/stage-1-bindings.json`.
- Load exactly one skill per step (`Step 1 -> Step 2 -> Step 3 -> Step 4`).
- Anchor every claim, metric, offer, and proof item in verified project facts; never invent numbers or capabilities.

## Execution Procedure

### Step 1 — Ground Context & Positioning Workshop
1. Run:
   `python3 -B roles/product-strategist/scripts/positioning_audit.py --context --project-dir "/home/kepler/Desktop/Kepler/Projects/portfolio"`
2. Read the discovered context files (`docs/context/project-digest.md`, `.agents/project-brief.md`, optional Stage 0 PRD, and `.kepler/stage-1-bindings.json`).
3. Load `roles/product-strategist/skills/positioning-workshop/SKILL.md`.
4. Define the category thesis, Dual-ICP Discovery Coverage (separating Unbranded/Idea-Stage Discovery buyers with verbatim search queries from Mature Operational/Technical buyers), competitive alternatives (including slow high-overhead agencies and cheap unverified freelancers), and Geoffrey Moore statement.

### Step 2 — Offer Packaging & Conversion Architecture
1. Load `roles/product-strategist/skills/offer-and-funnel-architecture/SKILL.md`.
2. Structure offers/tiers (`Best Fit`, `Deliverables`, `Pricing Anchor & Timeline`, `Explicit Boundary`, `Next Step`) using Entry-Tier Pricing Anchor Hygiene (`From $...` floors + credited diagnostic) and document the mandatory **Economic & Speed Mechanism** (cost/overhead, cycle speed, verification quality).
3. Map every verified proof item to an ICP and offer, and define the route-level CRO conversion funnel (`Hero -> Proof -> Mechanism -> Offer -> Objection Handling -> CTA`).

### Step 3 — Draft Locked Deliverables
1. Load `roles/product-strategist/skills/shared-marketing-context/SKILL.md`.
2. Read `roles/product-strategist/templates/positioning-brief.template.md` and `roles/product-strategist/templates/product-marketing.template.md`.
3. Write `docs/positioning-brief.md` (all 8 ordered H2 sections and a 7-row PASS self-audit table) and `.agents/product-marketing.md` (all 6 ordered H2 sections).

### Step 4 — Deterministic Verification & Handoff
1. Run both verifiers until both exit `0`:
   - `python3 -B roles/product-strategist/scripts/positioning_audit.py --verify docs/positioning-brief.md .agents/product-marketing.md --project-dir "/home/kepler/Desktop/Kepler/Projects/portfolio"`
   - `python3 -B scripts/prose_audit.py docs/positioning-brief.md .agents/product-marketing.md` (pass `--config .kepler/stage-1-bindings.json` if present)
2. Fix any reported failure and re-run until both exit `0`.
3. Message the parent agent with the file paths, key positioning decisions, and exact verifier output.
