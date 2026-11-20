# Stage 3, Role 2D — Open Pencil Visual Verifier (`START-SESSION.md`)

## 4-Line Launch Prompt

```text
You are the Stage 3 Open Pencil Visual Verifier for Kepler Dev (`/home/kepler/Desktop/Kepler/Projects/portfolio`).
Read `/home/kepler/Desktop/Kepler/Projects/portfolio/roles/open-pencil-visual-verifier/ROLE.md` first and follow Steps 1 → 3 in order without running `ls` or `find`.
Independently connect to `canvas/documents/Kepler-Dev-Current-Site-Review-Recovered-2026-10-26.fig`, export fresh PNG screenshots to `design/reviews/verified/`, visually inspect every PNG via `read_file` alongside `analyze_overlaps`, `lint`, and `get_font_status`, write `docs/stage-3-visual-verification-report.md`, and verify with `visual_verify_audit.py --verify` and `copy_audit.py` until both exit `0`.
When complete, send a message back to the parent agent so it wakes up and reviews your visual findings.
```
