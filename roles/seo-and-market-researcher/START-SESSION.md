# Start Session — SEO & Market Researcher (Role 1.2)

Use this kit to spawn a dedicated Stage 1 Role 1.2 session that transforms upstream positioning docs into a verified `docs/seo-and-market-brief.md`.

## Folder Map

```text
roles/seo-and-market-researcher/
├── ROLE.md
├── START-SESSION.md
├── scripts/
│   ├── keyword_suggest.py
│   └── seo_audit.py
├── skills/
│   ├── search-intent-and-buyer-language/
│   │   └── SKILL.md
│   ├── geo-citability-and-query-fanout/
│   │   └── SKILL.md
│   └── onpage-seo-and-jsonld-schema/
│       └── SKILL.md
└── templates/
    └── seo-and-market-brief.template.md
```

## Preflight Check (Optional)

Before spawning the worker, verify the kit integrity:

```bash
python3 roles/seo-and-market-researcher/scripts/seo_audit.py --kit
```

## Spawn & Sleep Launch Prompt

Copy these exact 4 lines (replacing `/home/kepler/Desktop/Kepler/Projects/portfolio` with the target repository path):

```text
Read /home/kepler/Desktop/Kepler/Projects/portfolio/roles/seo-and-market-researcher/ROLE.md and execute Steps 1 through 4 in order.
Honor every constraint in /home/kepler/Desktop/Kepler/Projects/portfolio/.kepler/stage-1-bindings.json (or universal defaults if absent) and write only /home/kepler/Desktop/Kepler/Projects/portfolio/docs/seo-and-market-brief.md.
Run seo_audit.py --verify and prose_audit.py until both exit 0 before finishing.
When verified, report the file path, route count, GEO block word counts, JSON-LD @graph types, and audit pass lines.
```
