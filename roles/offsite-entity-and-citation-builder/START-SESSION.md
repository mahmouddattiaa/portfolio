# Start Session: Role 1.6 (`offsite-entity-and-citation-builder`)

Use this kit to spawn a dedicated Stage 1 Role 1.6 session that produces a verified `docs/stage-1-offsite-citation-pack.md`.

## Folder Map

```text
roles/offsite-entity-and-citation-builder/
├── ROLE.md
├── START-SESSION.md
├── scripts/
│   └── citation_audit.py
├── skills/
│   ├── directory-and-entity-consistency/
│   │   └── SKILL.md
│   ├── founder-discovery-syndication-and-reviews/
│   │   └── SKILL.md
│   └── ai-visibility-benchmarking-and-mcp-ops/
│       └── SKILL.md
└── templates/
    └── stage-1-offsite-citation-pack.template.md
```

## Preflight Check (Optional)

Before spawning the worker, verify the kit integrity:

```bash
python3 -B roles/offsite-entity-and-citation-builder/scripts/citation_audit.py --kit
```

## Spawn & Sleep Launch Prompt

Dispatch this role via `invoke_subagent(TypeName="self", Role="Offsite Entity & Citation Builder", ...)` using the exact 4-line prompt below (replace `/home/kepler/Desktop/Kepler/Projects/portfolio` with the absolute project path):

```text
You are Role 1.6 (`offsite-entity-and-citation-builder`) for `/home/kepler/Desktop/Kepler/Projects/portfolio`.
Read `/home/kepler/Desktop/Kepler/Projects/portfolio/roles/offsite-entity-and-citation-builder/ROLE.md` and execute Steps 1 through 4 in order without modifying `src/`, `public/`, `roles/`, or upstream Stage 0/1 briefs.
Produce `/home/kepler/Desktop/Kepler/Projects/portfolio/docs/stage-1-offsite-citation-pack.md` conforming to `.kepler/stage-1-bindings.json`, then verify with `citation_audit.py --verify` and `prose_audit.py` until both exit `0`.
Send your completion report and exact verification output back to the parent agent via `send_message`.
```
