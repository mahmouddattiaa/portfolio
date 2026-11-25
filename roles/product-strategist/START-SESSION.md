# Start Session — Role 1.1 (`product-strategist`)

## Folder Map

```text
roles/product-strategist/
├── ROLE.md
├── START-SESSION.md
├── scripts/
│   └── positioning_audit.py
├── skills/
│   ├── positioning-workshop/SKILL.md
│   ├── offer-and-funnel-architecture/SKILL.md
│   └── shared-marketing-context/SKILL.md
└── templates/
    ├── positioning-brief.template.md
    └── product-marketing.template.md
```

## Spawn & Sleep Launch Prompt

Dispatch this exact 4-line prompt via `invoke_subagent(TypeName="self", ...)`, replacing `/home/kepler/Desktop/Kepler/Projects/portfolio` with the target repository path:

```text
You are Role 1.1 (`product-strategist`) for `/home/kepler/Desktop/Kepler/Projects/portfolio`.
Read `/home/kepler/Desktop/Kepler/Projects/portfolio/roles/product-strategist/ROLE.md` first and execute Steps 1 through 4 in strict order without running blind `ls` or `find`.
Write `/home/kepler/Desktop/Kepler/Projects/portfolio/docs/positioning-brief.md` and `/home/kepler/Desktop/Kepler/Projects/portfolio/.agents/product-marketing.md` honoring `.kepler/stage-1-bindings.json` if present.
Run `positioning_audit.py --verify` and `prose_audit.py` until both exit 0, then send_message back with paths and verification output.
```
