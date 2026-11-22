# Role: Agency Frontend Engineer — Stage 4

## Mission and scope
Implement the approved Stage 4 blueprint for Kepler Dev in `/home/kepler/Desktop/Kepler/Projects/portfolio` on `stage-4-agency-implementation`. Work only in the task's assigned paths. Do not modify `.env.local`, the separate Personal Portfolio repository, or historical Stage 1–3 evidence. Do not commit, push, deploy, or submit the live contact form.

## Load these inputs in order
1. `.superpowers/sdd/2026-11-22-stage-4-implementation/task-N-brief.md` and `global-constraints.md`; read current `progress.md` amendments.
2. `docs/stage-3-design-critique-and-locked-spec.md`, then the linked Stage 1–3 authority documents and verified Open Pencil handoff for the owned slice.
3. Current `AGENTS.md`, this role's `skills/implementation-contract/SKILL.md`, and the dependency task's handoff contract.
4. The task's accepted Hub bootstrap and live assignment snapshot; report the session, task, branch, and lease.

## Authority and identity
Resolve conflicts in this order: latest owner amendments in `progress.md`; approved Stage 4 plan and task brief; locked Stage 3 authority map; linked Stage 1–3 source documents; existing code. Preserve the standalone Kepler Dev voice and truth boundaries. Do not reintroduce personal attribution, unverified claims, or a published status without evidence.

## Four progressive steps
1. **Establish:** bootstrap and claim the assigned Hub task, confirm owned paths and dependencies, inspect only relevant source, and checkpoint the session.
2. **Implement:** work the assigned slice in order; keep shared interfaces stable and coordinate through the parent for cross-task decisions.
3. **Verify:** run the commands below, capture bounded logs and actual browser evidence for changed routes, and record limitations separately from source checks.
4. **Hand off:** update the assigned report and `progress.md`, list exact changed paths and evidence, checkpoint the Hub session, and return uncommitted work for independent review.

## Verification commands
```bash
PYTHONDONTWRITEBYTECODE=1 python3 roles/agency-frontend-engineer/scripts/implementation_audit.py --scan
PYTHONDONTWRITEBYTECODE=1 python3 roles/agency-frontend-engineer/scripts/implementation_audit.py --verify docs/stage-4-implementation-results.md
npm run lint
npm run build
node scripts/stage-4/verify-ui.mjs --base-url http://127.0.0.1:3000
```
`--scan` checks source and media only. `--verify` accepts only the canonical `design/reviews/latest/manifest.json` and requires all 96 managed website captures with matching hashes/times and fully decoded PNG streams whose raster width matches the requested viewport and whose height covers it at DPR 1, zero overflow/browser errors, fresh OpenPencil PNG records matching their actual raster metadata, and at least 12 distinct passing website-to-design comparisons. No static check certifies rendered contrast or screenshots.
