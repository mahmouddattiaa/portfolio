# Project Context: Classroom Sentinel

## 1. What This Project Does
Classroom Sentinel is a single-process Python Telegram bot that continuously monitors selected Google Classroom courses across multiple Google identities, classifies new announcements and coursework, extracts and stores deadlines in SQLite, and pushes time-sensitive notifications (including 24-hour and 2-hour reminders) to one authorized Telegram user. Its core value is reducing missed academic tasks by converting noisy classroom feeds into structured, prioritized, actionable alerts.

## 2. Tech Stack

| Layer | Technologies |
|---|---|
| Language(s) | Python (async-heavy code style) |
| Runtime / Framework | asyncio, python-telegram-bot (Application, CommandHandler, ConversationHandler, JobQueue), python-dotenv |
| Database(s) | SQLite (via aiosqlite), local file database `sentinel.db` |
| Auth | Google OAuth2 (token files + refresh flow), Telegram chat ID allowlist guard (`authorized_only`) |
| Infrastructure / Deployment | Long-running polling bot process; designed for headless server operation (docs reference systemd-managed host) |
| External APIs / Services | Google Classroom API, Google Gemini API (google-genai), Telegram Bot API |
| Testing | N/A — no test suite or test tooling is present in the repository |
| Tooling (CI, linting, monorepo, etc.) | N/A — no CI pipeline, formatter, linter config, packaging metadata, or dependency lock file is committed |

## 3. Architecture Overview
This project is a monolithic bot service implemented in one runtime module (`sentinel.py`). It uses asynchronous orchestration around blocking SDK calls (`asyncio.to_thread`) and a local SQLite database as the source of truth for tracked courses, ingested announcements, and reminder state. The primary flow is: scheduled poll jobs fetch Google Classroom updates for all tracked courses, announcement content is optionally classified via Gemini, normalized records are persisted, and urgent items are sent to Telegram immediately; a second scheduled job scans stored deadlines and emits reminder alerts at threshold windows.

Text diagram:

```text
Google Classroom API (announcements/coursework/materials)
                    |
                    v
        Fetch + normalize in process_announcements()
                    |
      +-------------+-------------+
      |                           |
      v                           v
 Gemini classification      Native coursework parsing
 (announcements only)       (title/dueDate/dueTime)
      |                           |
      +-------------+-------------+
                    v
            SQLite (sentinel.db)
     target_courses / announcements / deadlines
                    |
      +-------------+--------------+
      |                            |
      v                            v
 Immediate urgent pushes      Scheduled reminder pushes
 (HIGH/MEDIUM urgency)        (24h and 2h windows)
                    |
                    v
              Telegram user
```

## 4. Directory Structure
Top-level structure (2-3 levels):

```text
sintenel/
├─ sentinel.py
├─ .env
├─ docs/
│  └─ Kepler Home Server & Sentinel V6.1.md
└─ __pycache__/
   └─ sentinel.cpython-313.pyc
```

Folder/file roles:
- `sentinel.py`: Entire runtime implementation (database schema creation, Google API/OAuth wrapper, Gemini classification, Telegram command handlers, scheduled jobs, and process bootstrap).
- `.env`: Runtime secrets and configuration values consumed by `python-dotenv`.
- `docs/Kepler Home Server & Sentinel V6.1.md`: Operational/project narrative documentation (host and maintenance conventions).
- `__pycache__/`: Interpreter artifacts; not source of truth.

## 5. Data Models / Schema
Core schema is created at startup in `init_db()` with three tables:

1. `target_courses`
- `course_id` (TEXT, PK)
- `course_name` (TEXT)
- `account_type` (TEXT; maps to `Personal` or `University` token source)

2. `announcements`
- `id` (TEXT, PK)
- `course_id` (TEXT)
- `tag` (TEXT classification category)
- `summary` (TEXT)
- `action` (TEXT nullable)
- `raw_text` (TEXT)
- `timestamp` (DATETIME default current timestamp)

3. `deadlines`
- `id` (INTEGER, PK AUTOINCREMENT)
- `announcement_id` (TEXT reference to `announcements.id`, not enforced as foreign key)
- `course_id` (TEXT)
- `task` (TEXT)
- `due_date` (DATETIME-like string; often ISO-8601)
- `alert_24h_sent` (BOOLEAN default 0)
- `alert_2h_sent` (BOOLEAN default 0)
- `completed` (BOOLEAN default 0; added by runtime migration attempt)

Non-obvious constraints/relationships:
- `deadlines` and `announcements` use soft links only (no enforced FK constraints), so orphan rows are possible if data is manually edited.
- Deduplication for ingested content depends on checking `announcements.id`; this is the idempotency guard for polling loops.
- Reminder idempotency depends on both boolean flags and threshold logic, not on a separate event log table.

## 6. API Surface (if applicable)
There is no HTTP REST API. The primary API surface is a Telegram command interface plus callback query actions.

Command groups:

| Group | Command | What it does | Auth requirement |
|---|---|---|---|
| Lifecycle | `/start` | Confirms bot readiness | Authorized chat only (`authorized_only`) |
| Lifecycle | `/health` | Reports CPU, RAM, DB size | Authorized chat only |
| Course management | `/track` | Starts conversation to fuzzy-match and add a course | Authorized chat only |
| Course management | `/untrack <name>` | Confirms and removes one tracked course | Authorized chat only |
| Course management | `/courses` | Lists tracked courses | Authorized chat only |
| Course management | `/clearcourses` | Confirms and clears all tracked courses | Authorized chat only |
| Sync/ingest | `/sync` | Manual 1-day sync run | Authorized chat only |
| Sync/ingest | `/catchup [days]` | Historical backfill from Classroom | Authorized chat only |
| Feed view | `/stream` | Interactive 7-day stream for one tracked course | Authorized chat only |
| Feed view | `/digest [days]` | Cross-course digest stream | Authorized chat only |
| Deadlines | `/due` | Upcoming deadline list (next 10 days) with inline actions | Authorized chat only |
| Deadlines | `/reminders` | Shows armed reminders | Authorized chat only |
| Search/summary | `/links` | Last session-link summaries | Authorized chat only |
| Search/summary | `/search <keyword>` | Searches summary/raw_text in DB | Authorized chat only |
| Search/summary | `/dashboard` | Counts courses, active deadlines, 24h announcements | Authorized chat only |

Callback actions (inline keyboard `callback_data`):
- `untrack_<course_id>`: Deletes a single tracked course.
- `clear_all`: Wipes tracked course list.
- `done_<deadline_id>`: Marks deadline complete and suppresses future reminders.
- `info_<deadline_id>`: Retrieves summary + original text snippet for a deadline.
- `cancel`: No-op cancellation response.

## 7. Key Technical Decisions
1. Chosen: Single-file asynchronous monolith (`sentinel.py`).  
Alternatives: Modular package split by domain (db, google clients, bot handlers, jobs).  
Why: Fast iteration for one-operator deployment and minimal moving parts on a small always-on host.

2. Chosen: Hybrid ingestion (native coursework parsing + Gemini only for free-text announcements).  
Alternatives: AI-only classification for all posts or rule-only regex parsing.  
Why: Structured coursework fields (`dueDate`, `dueTime`, `workType`) are more reliable than LLM extraction, while announcements still need semantic classification.

3. Chosen: Headless-safe OAuth behavior with `interactive` flag and `AuthRequiredError`.  
Alternatives: Always invoke browser flow when token refresh fails.  
Why: Background server loops must not block trying to open local browser consent screens.

4. Chosen: In-process scheduler using Telegram JobQueue (poll/sync/reminder/briefing jobs).  
Alternatives: External scheduler (cron/Celery/APScheduler sidecar).  
Why: Keeps deployment lightweight and colocates scheduling logic with bot command state.

5. Chosen: DB-backed reminder state flags (`alert_24h_sent`, `alert_2h_sent`, `completed`).  
Alternatives: Stateless recomputation each run or separate notification ledger table.  
Why: Flags provide simple idempotency and suppress duplicate alerts across polling cycles.

6. Chosen: Single-recipient security model using `TELEGRAM_CHAT_ID` allowlist.  
Alternatives: Multi-user RBAC, Telegram group-scoped permissions.  
Why: This deployment is designed for one owner and prioritizes strict command rejection for all others.

## 8. Hard Problems Solved
1. **Problem:** Keeping OAuth-authenticated Google API access alive in a headless long-running process.  
**Why it was hard:** Standard OAuth flows assume an interactive browser; blindly invoking that during token expiry can deadlock or crash unattended jobs.  
**Solution:** `get_classroom_service_sync()` distinguishes interactive vs background contexts; on refresh failure in non-interactive mode it raises `AuthRequiredError` so runtime can notify the operator without freezing.

2. **Problem:** Extracting reliable deadlines from mixed Classroom content types.  
**Why it was hard:** Free-text announcements are ambiguous and inconsistent, while coursework payloads contain structured due-date fields that should not be approximated by an LLM.  
**Solution:** Coursework/material items are parsed natively from API fields; only announcement text is sent to Gemini with strict JSON schema output and enum constraints.

3. **Problem:** Preventing alert spam and duplicate processing across repeated polling cycles.  
**Why it was hard:** Scheduled loops revisit overlapping time windows and can repeatedly encounter the same posts/deadlines.  
**Solution:** The code checks announcement id existence before insert, stores alert state flags on each deadline, and gates reminder sends by both time-window conditions and prior-send flags.

4. **Problem:** Managing data from multiple Google accounts while keeping one unified user workflow.  
**Why it was hard:** Courses are fetched per account/token, but tracking and commands need a single coherent list.  
**Solution:** `target_courses` stores `account_type` with each tracked course; all fetch flows route through account-specific token files while command UX stays unified.

## 9. External Integrations
1. Google Classroom API  
- Used for course listing, announcements, coursework, materials, and user profile lookup.  
- Non-obvious quirk: Dual account token files are mapped by logical account labels (`Personal`, `University`).  
- Failure impact: New content ingestion, stream/digest views, and author name resolution stop working.

2. Google OAuth2 (`google-auth`, `google-auth-oauthlib`)  
- Used to obtain/refresh credentials and persist token JSON files.  
- Non-obvious quirk: `OAUTHLIB_RELAX_TOKEN_SCOPE=1` is set to reduce failures when scope sets evolve.  
- Failure impact: Classroom integration fails; bot can still run but cannot sync new academic data.

3. Google Gemini API (`google-genai`)  
- Used to classify announcement urgency/tags and extract deadlines from free text.  
- Non-obvious quirk: Uses schema-constrained JSON output and has model fallback behavior when rate-limited (`429`).  
- Failure impact: Announcement classification quality drops and non-coursework deadline extraction may be skipped.

4. Telegram Bot API (`python-telegram-bot`)  
- Used for command interface, callback handling, and scheduled notification delivery.  
- Non-obvious quirk: Security is enforced at handler level via `authorized_only`, not by separate auth service.  
- Failure impact: No user-facing control plane or notification channel.

5. Host runtime metrics (`psutil`)  
- Used only for `/health` command telemetry.  
- Non-obvious quirk: DB size is reported from filesystem directly.  
- Failure impact: Core bot behavior remains intact; health diagnostics degrade.

## 10. Environment & Configuration
Environment variables found in `.env`:

| Name | Controls | Required? | Notes |
|---|---|---|---|
| `TELEGRAM_TOKEN` | Bot token used to initialize Telegram Application | Required | Bot cannot start without it |
| `TELEGRAM_CHAT_ID` | Single authorized user/chat gate and notification target | Required | Used by `authorized_only` and outbound messages |
| `GEMINI_API_KEY` | Gemini client initialization for announcement classification | Optional | If missing, Gemini path returns `None` and classification is skipped |
| `GOOGLE_APP_CLIENT_ID` | N/A in current code path | Optional | Present in `.env` but not read in `sentinel.py` |

Non-env runtime configuration (hardcoded/file-based):
- OAuth client secrets file: `credentials.json` (required for first-time auth flow).
- Token files: `token_personal.json`, `token_uni.json` (generated/required for unattended sync).
- DB file: `sentinel.db` (auto-created).
- OAuth scopes: 7 Classroom read-only scopes in `SCOPES` constant.
- Polling/scheduling intervals: sync every 1800s, reminders every 1800s, morning briefing daily at 08:00 UTC.

## 11. How to Run Locally
Assumes only Python is installed.

1. Create and activate a virtual environment.
```bash
python -m venv .venv
# Windows PowerShell
.\.venv\Scripts\Activate.ps1
```

2. Install required packages (no requirements file is provided).
```bash
pip install python-telegram-bot aiosqlite psutil fuzzywuzzy python-dotenv google-auth google-auth-oauthlib google-api-python-client google-genai
```

3. Create `.env` with required variables (`TELEGRAM_TOKEN`, `TELEGRAM_CHAT_ID`; optionally `GEMINI_API_KEY`).

4. Place Google OAuth desktop credentials at project root as `credentials.json`.

5. Run initial auth bootstrap to generate token files.
```bash
python sentinel.py --auth
```

6. Start the bot.
```bash
python sentinel.py
```

7. In Telegram, run `/start`, then `/track` to add at least one course before expecting scheduled ingestion output.

Non-obvious setup notes:
- The app expects long-running execution (polling + scheduled jobs), not one-shot CLI use.
- If tokens expire and background refresh fails, re-run step 5.
- Database schema is initialized automatically on startup.

## 12. Known Limitations & Technical Debt
1. Secrets hygiene risk: `.env` is committed in-repo and contains live-looking credentials; this is a major operational/security debt.
2. Monolithic maintainability: nearly all concerns (auth, DB, API clients, handlers, jobs) live in one file, making testing and change isolation difficult.
3. Missing engineering scaffolding: no tests, no CI, no linting/format config, and no dependency lock/manifest.
4. Weak relational integrity: no enforced foreign keys or indexes for join-heavy query paths.
5. Broad exception handling: several `except Exception` blocks swallow root causes and can hide data-quality issues.
6. Operational coupling: polling loops, scheduling, and Telegram process lifecycle are tightly coupled; no graceful shutdown orchestration beyond process exit.
7. Inconsistent documentation/versioning: docs and runtime strings reference different versions (for example V6.1/V6.3 doc narrative vs V6.2 startup message).

## 13. What Makes This Project Unique or Complex
1. It combines deterministic API parsing with schema-constrained LLM classification in one ingestion pipeline, using each method where it is strongest.
2. It implements real-time and scheduled notification semantics simultaneously (immediate urgency push + 24h/2h reminder windows + morning digest).
3. It handles dual Google account contexts while exposing a single coherent command interface to the user.
4. It solves headless OAuth constraints explicitly, which is a common failure mode in unattended bots.
5. It uses asynchronous orchestration around blocking third-party SDKs to keep bot responsiveness while doing network-heavy work.

## 14. Suggested CV / Portfolio Description
- Architected an asynchronous Python Telegram bot that ingests Google Classroom announcements and coursework every 30 minutes and persists normalized state in SQLite for reminder automation.
- Implemented a hybrid intelligence pipeline that combines native Classroom due-date parsing with Gemini schema-constrained JSON classification for noisy free-text announcements.
- Designed and shipped an idempotent reminder engine with DB-backed 24-hour and 2-hour threshold alerts plus inline completion actions to suppress duplicate notifications.
- Engineered a headless-safe OAuth workflow with explicit interactive/background modes and operator-facing recovery alerts to prevent unattended service lockups.
- Built a unified multi-account course tracking flow with fuzzy course matching and conversational Telegram UX for track/untrack, digest, stream, and deadline management.