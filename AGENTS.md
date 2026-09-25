# Kepler Project Bootstrap

Project identity: `.kepler/project.json`

Before work:

1. Resolve the Kepler project and session.
2. Call `kepler_bootstrap` or `kepler_resume`.
3. Do not invent or self-assign work when an assignment exists.
4. Claim a task before modifying task-owned files.
5. Load the returned role and only the required skills.
6. Respect owned paths, forbidden changes, dependencies, acceptance criteria, and evidence requirements.
7. Checkpoint meaningful progress and before compaction or provider handover.
8. Record material messages, blockers, decisions, handoffs, and reviews in the Hub.
9. Re-bootstrap on stale context.
10. Do not approve your own material implementation.

Add project-specific architecture, commands, tests, and conventions below. Keep live status out of this file.

## This project

Kepler project id: `portfolio`. Mahmoud's personal portfolio site.

Stack: Next.js 16 (App Router, `src/`), React 19, TypeScript 5, Tailwind CSS 4, Framer Motion,
Formspree for the contact form, Vercel Analytics.

Commands:

```bash
npm run dev     # local dev server
npm run build   # production build; must pass before a task completes
npm run lint    # eslint; must pass before a task completes
```

There is no test script yet. Until one exists, `npm run build` and `npm run lint` are the
required evidence for code changes, plus a screenshot of any changed page.

## Reaching the Kepler Hub from this repository

The `kepler` command is not on PATH here. Run every Hub command as:

```bash
PYTHONPATH=/d/Kepler/AgentOS/src python -m kepler_os.cli <command> ...
```

The MCP configs in `.mcp.json`, `.codex/config.toml` and `opencode.json` already point
`PYTHONPATH` at the AgentOS source. `KEPLER_DB` comes from the environment.

An orchestrator session for this project reads, before acting:
`D:/Kepler/AgentOS/kernel/roles/orchestrator/ROLE.md` and
`D:/Kepler/AgentOS/kernel/roles/orchestrator/PLAYBOOK.md`.

Never push to `origin` unless Mahmoud says so. Never commit `.env.local`.

