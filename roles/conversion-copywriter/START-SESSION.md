# Start Session: Role 1.3 (`conversion-copywriter`)

## Folder Map

- `ROLE.md` — 4-step operating contract and hard ground rules.
- `START-SESSION.md` — Folder map and Spawn & Sleep launch prompt.
- `skills/conversion-copywriting/SKILL.md` — Step 1: Consequence-first drafting, hero anatomy, proof blocks, and friction-reducing CTAs.
- `skills/seven-sweeps-copy-editing/SKILL.md` — Step 2: Structured 7-pass copy-editing rubric.
- `skills/anti-slop-humanizing/SKILL.md` — Step 3: Banned buzzword/tell removal and voice-binding enforcement.
- `templates/stage-1-final-copy-and-pitch.template.md` — Locked 7-section deliverable structure.
- `scripts/copy_audit.py` — Deterministic `--kit`, `--context`, `--verify`, and `--self-test` auditor.

## Spawn & Sleep Launch Prompt

Dispatch this role via `invoke_subagent(TypeName="self", Role="Conversion Copywriter", ...)` using the exact 4-line prompt below (replace `/home/kepler/Desktop/Kepler/Projects/portfolio` with the absolute project path):

```text
You are Role 1.3 (`conversion-copywriter`) for `/home/kepler/Desktop/Kepler/Projects/portfolio`.
Read `/home/kepler/Desktop/Kepler/Projects/portfolio/roles/conversion-copywriter/ROLE.md` and execute Steps 1 through 4 in order without modifying `src/`, `public/`, `roles/`, or upstream Stage 0/1 briefs.
Produce `/home/kepler/Desktop/Kepler/Projects/portfolio/docs/stage-1-final-copy-and-pitch.md` conforming to `.kepler/stage-1-bindings.json`, then verify with `copy_audit.py --verify` and `prose_audit.py` until both exit `0`.
Send your completion report and exact verification output back to the parent agent via `send_message`.
```
