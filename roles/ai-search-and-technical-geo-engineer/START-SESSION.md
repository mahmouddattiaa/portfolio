# Start Session: Role 1.5 (`ai-search-and-technical-geo-engineer`)

## Folder Map

- `ROLE.md` — 4-step operating contract, permitted technical GEO files, and hard ground rules.
- `START-SESSION.md` — Folder map and Spawn & Sleep launch prompt.
- `skills/llms-txt-and-ai-crawler-access/SKILL.md` — Step 1: AnswerDotAI `llms.txt` spec, bilingual links, and AI search vs. training-bot `robots` rules.
- `skills/typed-jsonld-graph-and-entity-map/SKILL.md` — Step 2: Deduplicated Schema.org `@graph`, `@id` anchors, `PriceSpecification`, `sameAs`, and `inLanguage`.
- `skills/technical-geo-crawl-and-indexnow/SKILL.md` — Step 3: `sitemap`, canonicals, reciprocal `hreflang`, SSR crawlability, and IndexNow workflow.
- `templates/stage-1-technical-geo-report.template.md` — Locked 7-section technical GEO verification report structure.
- `scripts/geo_tech_audit.py` — Deterministic `--kit`, `--context`, `--verify`, `--audit-repo`, and `--self-test` auditor.
- `scripts/indexnow_ping.py` — Stdlib IndexNow key verifier, payload builder, and `--dry-run` / live submitter.

## Spawn & Sleep Launch Prompt

Dispatch this role via `invoke_subagent(TypeName="self", Role="AI Search & Technical GEO Engineer", ...)` using the exact 4-line prompt below (replace `/home/kepler/Desktop/Kepler/Projects/portfolio` with the absolute project path):

```text
You are Role 1.5 (`ai-search-and-technical-geo-engineer`) for `/home/kepler/Desktop/Kepler/Projects/portfolio`.
Read `/home/kepler/Desktop/Kepler/Projects/portfolio/roles/ai-search-and-technical-geo-engineer/ROLE.md` and execute Steps 1 through 4 in order, touching only permitted technical GEO files (`public/llms.txt`, `public/robots.txt`, `src/app/robots.ts`, `public/sitemap.xml`, `src/app/sitemap.ts`, and JSON-LD `@graph` in `src/app/layout.tsx`).
Produce `/home/kepler/Desktop/Kepler/Projects/portfolio/docs/stage-1-technical-geo-report.md` conforming to `.kepler/stage-1-bindings.json`, then verify with `geo_tech_audit.py --verify --audit-repo` and `prose_audit.py` until both exit `0`.
Send your completion report, modified paths, and exact verification output back to the parent agent via `send_message`.
```
