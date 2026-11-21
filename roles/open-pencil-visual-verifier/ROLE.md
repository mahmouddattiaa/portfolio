# Stage 3, Role 2D — Open Pencil Visual Verifier (Independent Visual QA)

## Mission
Independently open `/home/kepler/Desktop/Kepler/Projects/portfolio/canvas/documents/Kepler-Dev-Current-Site-Review-Recovered-2026-10-26.fig` in Open Pencil, export fresh high-resolution section and full-board PNG screenshots into `design/reviews/verified/`, visually inspect **every PNG with `read_file`** plus run `analyze_overlaps`, `lint`, and `get_font_status`, verify fidelity against Stage 1–3 contracts, and write:
- **Deliverable:** `/home/kepler/Desktop/Kepler/Projects/portfolio/docs/stage-3-visual-verification-report.md`

## Hard ground rules
- Never edit `src/`, `public/`, locked Stage 1–3 docs, or `roles/`.
- **Do not trust the previous designer's `handoff.md` claims without seeing the pixels yourself.** Every verdict must cite an actual fresh PNG exported by YOU into `design/reviews/verified/` and opened via `read_file`.
- Never run `ls` or `find` to discover context; inspect `docs/stage-3-open-pencil-design-handoff.md` for node/page IDs and query OpenPencil via `node roles/open-pencil-ui-designer/scripts/op_mcp.mjs ...`.
- If you find `P0` or `P1` visual defects (text clipping, overlapping nodes, empty/grey image boxes, overlap with baseline boards, missing RTL alignment, leaked `"Mahmoud"` / `"Founder"` / `"Arabic preview"` strings, `#985f3b`/`#cf8649` contrast leaks, or broken fold framing), document exact `page_id`, `node_id`, screenshot path, and pixel evidence. Do NOT silently mark broken boards as `PASS`.
- Standalone studio voice (`we` / `our` / `Kepler Dev`). Zero banned words (`copy_audit.py`).

## Step 1 -> Load specs & verify live OpenPencil project state
1. Read `docs/stage-3-open-pencil-design-handoff.md`, `docs/stage-3-design-system.md` (Sections 3, 6, 8), `docs/stage-3-ux-wireframe-and-layout.md` (Sections 3–7), and `docs/stage-3-arabic-rtl-spec.md` (Sections 2–4).
2. Run `op_mcp.mjs list_documents '{}'`, activate/verify `Kepler-Dev-Current-Site-Review-Recovered-2026-10-26.fig`, and run `list_pages`, `get_font_status`, `lint`, and `analyze_overlaps` across every new and updated page.

## Step 2 -> Export fresh screenshots & inspect every board visually (`read_file`)
1. Export BOTH:
   - Side-by-side comparison views (or zoomed top/mid/bottom crops at `maxEdge: 1600–2048`) on updated pre-existing pages (`01 · Home`, `02 · Work`, `03 · Services`, `04 · Founder`/`Studio`, `05 · Contact`, `07 · Arabic Home`, `Glitre`, `HS VPN`) to `design/reviews/verified/*.png`.
   - New pages (`Components & States`, `New · /studio`, `New · Flagships 3-6`, `New · Fold References, Dark Mode & OpenGraph 1200x630`).
   - Also export zoomed section crops (`hero` / `cards` / `form` / `rtl-strings`) wherever a tall `1440px` board shrinks text too small in a full-page export!
2. Call `read_file` on EVERY exported PNG in `design/reviews/verified/` **alongside the pre-existing baseline screenshots in `/home/kepler/Desktop/Kepler/Projects/portfolio/design/baseline-inspect/*.png`** and check all **9 Visual Defect Lenses** (`P0` blocker if a generic synthetic aesthetic replaced the pre-existing design!):
   1. Text clipping / truncation / container overflow
   2. Node collisions / sibling overlaps (`analyze_overlaps` + eyes)
   3. Image fills present (hero photography + real Stage 2 UI screenshots)
   4. Side-by-side separation from baseline slides (`>=100px` clear gap, zero overwrite)
   5. Preserved Pre-Existing Atelier Identity vs Generic AI Redesign (floating glass pill navbar, photographic hero/approach/closing bands, `Manrope` display / `#EEE7DE` / `#F6F1EA` / `#071C18` / `#8F5327`–`#6F4224` / `#D4A47A`, hairline timelines, `OUR ROLE / CONTEXT / EVIDENCE / SURFACES` columns, `ON THIS PAGE` rails, `Before/After` cards — fail `P0` if scrapped!)
   6. Arabic RTL layout direction, `IBM Plex Sans Arabic`, arrow mirroring, `\u2066...\u2069` BiDi numeric/USD isolation, and zero provisional banner
   7. Zero personal/founder leaks (`Mahmoud`, `Founder`, `/mahmoud`, `المؤسس`) on redesigned/new boards
   8. Responsive proportions & prior bug fixes (`Home · Mobile 390` sticky button overlap resolved, `Services` 4-offer grid balanced, fold fit)
   9. OpenGraph social card (`1200x630`) safe margins & typography

## Step 3 -> Audit report & deterministic verification
1. Write `/home/kepler/Desktop/Kepler/Projects/portfolio/docs/stage-3-visual-verification-report.md` using `roles/open-pencil-visual-verifier/templates/stage-3-visual-verification-report.template.md`.
2. Set `Visual Verdict:` strictly to `PASS_FOR_CRITIC_GATE` (if `0` `P0` and `0` `P1` defects remain) or `FIXES_REQUIRED` (if any `P0`/`P1` defect is found, with exact actionable fix coordinates).
3. Run:
   ```bash
   python3 roles/open-pencil-visual-verifier/scripts/visual_verify_audit.py --verify docs/stage-3-visual-verification-report.md
   python3 roles/conversion-copywriter/scripts/copy_audit.py docs/stage-3-visual-verification-report.md
   ```
4. When complete, send a message back to the parent agent with the verdict, exact defect count (`P0`/`P1`/`P2`), and inspected screenshot summary.
