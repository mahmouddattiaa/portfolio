# Project Context: Focus Ritual

## 1. What This Project Does

Focus Ritual is an AI-augmented learning management system targeting students and self-directed learners who want to consolidate studying, productivity tracking, and social accountability in one place. The core loop is: upload a PDF lecture → AI extracts flashcards and generates a study plan → review flashcards via spaced repetition → track focus sessions with a Pomodoro timer → earn XP/achievements → study with peers in a real-time collaboration room. It is not a generic note-taking app or a reskinned Anki; it integrates Google Gemini 1.5 Pro for on-demand document Q&A, flashcard generation, and personalized learning paths, and layers a full social graph (friend requests, feed, private messaging) on top of the study workflow.

---

## 2. Tech Stack

| Layer | Technologies |
|---|---|
| Language(s) | JavaScript (Node.js backend), TypeScript (React frontend + shared package) |
| Runtime / Framework | Node.js 18+, Express 5.1.0, React 18.3.1, Vite 5.4.2 |
| Database(s) | MongoDB (Atlas) via Mongoose 8.0.3 |
| Auth | Passport.js (JWT strategy + Local strategy), bcryptjs 3.0.2, refresh token cookies |
| Infrastructure / Deployment | Render (backend, free tier), Vercel (frontend), MongoDB Atlas, Google Cloud Storage |
| External APIs / Services | Google Gemini 1.5 Pro (AI), Google Cloud Storage (file storage + signed URLs), Nodemailer via Gmail SMTP (password reset) |
| Testing | None present in the codebase |
| Tooling (CI, linting, monorepo, etc.) | NPM Workspaces (monorepo), `concurrently` (dev script), `nodemon` (backend hot reload), Render YAML (IaC), UptimeRobot (keep-alive ping) |

---

## 3. Architecture Overview

The project is a **monorepo** with three packages managed via NPM workspaces:

```
FR-NEW/
├── apps/backend/    ← Express REST API + Socket.io server
├── apps/web/        ← React SPA
└── packages/shared/ ← Shared TypeScript interfaces (UserProfile, PrivacySettings)
```

**Deployment topology:**
```
Browser
  │
  ├─ HTTPS ──► Vercel (React SPA, static)
  │              │
  │              ├─ REST (axios) ──► Render (Express server, port 5001)
  │              │                     ├─ MongoDB Atlas (data)
  │              │                     ├─ Google Cloud Storage (files/PDFs/notes content)
  │              │                     └─ Gemini 1.5 Pro (AI generation)
  │              │
  └─ WebSocket ──► Same Render instance (Socket.io, polling + ws transport)
```

**Primary data flow (PDF → flashcards):**
1. Frontend uploads PDF via multipart POST to `/api/library`
2. Backend stores file in GCS, records `UploadedFile` document in MongoDB
3. Client POSTs to `/api/ai/analyze-pdf` with the file reference
4. Backend fetches PDF from GCS, extracts text via `pdf-parse`, sends to Gemini
5. Gemini returns structured flashcards + summary JSON
6. Backend persists `Flashcard` documents; content body stored in GCS (not MongoDB)
7. Frontend polls flashcard list; GCS signed URLs are returned for content retrieval

**Real-time layer:** Socket.io rooms map to in-memory `rooms{}` objects on the Express process. There is no Redis or external pub/sub — all room state is process-local.

---

## 4. Directory Structure

```
FR-NEW/
├── apps/
│   ├── backend/
│   │   ├── src/
│   │   │   ├── server.js              # Entry point; Express + Socket.io init; global room state
│   │   │   ├── config/
│   │   │   │   ├── passport.js        # JWT + Local strategies
│   │   │   │   └── gcs.js             # GCS client init, signed URL helper, mock fallback
│   │   │   ├── controllers/
│   │   │   │   ├── auth.controller.js
│   │   │   │   ├── flashcard.controller.js  # SM-2 review logic
│   │   │   │   ├── stats.controller.js      # XP, level, habits, daily reset
│   │   │   │   ├── ai.controller.js         # PDF analysis, Gemini calls
│   │   │   │   ├── library.controller.js    # File/folder CRUD
│   │   │   │   ├── friends.controller.js
│   │   │   │   ├── feed.controller.js
│   │   │   │   ├── messages.controller.js
│   │   │   │   ├── notes.controller.js
│   │   │   │   ├── qa-session.controller.js
│   │   │   │   ├── learning-path.controller.js
│   │   │   │   └── scheduler.js             # node-cron midnight job
│   │   │   ├── models/
│   │   │   │   ├── user.model.js
│   │   │   │   ├── flashcard.model.js       # SM-2 fields
│   │   │   │   ├── stats.model.js           # Tasks, habits, XP, achievements inline
│   │   │   │   ├── achievement.model.js
│   │   │   │   ├── note.model.js
│   │   │   │   ├── lecture.model.js
│   │   │   │   ├── subject.model.js
│   │   │   │   ├── qa-session.model.js
│   │   │   │   ├── learning-path.model.js
│   │   │   │   ├── post.model.js            # Feed posts + comments (parentId self-ref)
│   │   │   │   ├── messages.model.js
│   │   │   │   ├── notification.model.js
│   │   │   │   ├── subscription.model.js
│   │   │   │   └── models.js                # UploadedFile, LibraryFolder, LibraryFile
│   │   │   ├── routes/                      # One file per resource
│   │   │   ├── services/
│   │   │   │   ├── gemini.service.js        # Gemini SDK wrapper
│   │   │   │   └── achievement.service.js   # EventEmitter-based achievement engine
│   │   │   └── middleware/
│   │   │       ├── upload.js                # Multer (disk → later moved to GCS)
│   │   │       ├── profileUpload.js         # Profile pics to GCS
│   │   │       ├── rateLimiter.js           # express-rate-limit
│   │   │       └── errorHandler.js
│   │   ├── render.yaml                      # Render IaC config
│   │   └── package.json
│   └── web/
│       ├── src/
│       │   ├── App.tsx                      # Router, protected route wrapper
│       │   ├── contexts/                    # Auth, App, Audio, FloatingTimer
│       │   ├── pages/                       # 20+ page components
│       │   ├── components/
│       │   │   ├── common/                  # Button, Input, Card, Modal, Timer
│       │   │   ├── dashboard/               # StatsGrid, charts, habit widgets
│       │   │   ├── layout/                  # Header, Sidebar, FriendChatManager
│       │   │   ├── social/                  # FriendList, ChatWindow, PrivateMessage
│       │   │   ├── workspace/               # CollaborationRoom UI
│       │   │   └── ui/                      # Radix UI wrappers
│       │   ├── hooks/                       # Custom React hooks
│       │   ├── services/                    # Axios API call wrappers
│       │   └── types/                       # Frontend TS types
│       ├── vite.config.ts
│       └── tailwind.config.js
└── packages/
    └── shared/
        └── src/types.ts                     # UserProfile, PrivacySettings interfaces
```

---

## 5. Data Models / Schema

**Core entities and their relationships:**

**User** — Central entity. Contains embedded `settings` (privacy) and a `friends: [ObjectId]` array. No separate join table; mutual friendship is enforced at the application layer (both users must have each other in their array). `friendRequests` is a subdocument array on the receiving user only.

**Subject → Lecture → (Note | Flashcard | QASession | LearningPath)** — Hierarchical content tree. A Subject groups Lectures; each Lecture owns notes, flashcards, Q&A sessions, and a learning path. Foreign keys are stored on the child (e.g., `lectureId` on Flashcard), not as embedded arrays on Lecture (except `lectures: [ObjectId]` on Subject for ordered listing).

**Stats** — A single document per user that aggregates everything: tasks (as a subdocument array), habits (subdocument array), XP, level, daily activity (as a `Map<dateString, ActivityObject>`), and unlocked achievement IDs. This denormalized design means all productivity data is one `findOne({userId})` away, but it creates unbounded document growth as task/habit arrays accumulate.

**Flashcard** — Implements SM-2 spaced repetition fields inline: `easeFactor` (float, default 2.5), `interval` (days), `repetitions` (count), `nextReview` (Date). The card `front`/`back` text is stored in GCS; the Mongoose document holds only the GCS path + a `contentStoredInCloud: Boolean` flag. This prevents MongoDB document size limits on large AI-generated card sets.

**Post** — Self-referential via `parentId: ObjectId (ref: Post)` for threaded comments. Top-level posts have no `parentId`; replies point to their parent. There is no depth limit enforced.

**LibraryFolder** — Self-referential via `parent_id` for nested folder trees. `path` field stores the materialized path (e.g., `/Math/Algebra`) as a denormalized string for breadcrumb rendering without recursive queries.

**Achievement** — Standalone collection seeded at startup. The `criteria` field is `Mixed` (schema-less), allowing different achievement types to store different condition objects without a polymorphic type hierarchy.

---

## 6. API Surface

All routes are prefixed `/api/`. JWT (`Authorization: Bearer <token>`) is required on all routes except `/api/auth/register`, `/api/auth/login`, `/api/auth/forgot-password`, and `/api/auth/reset-password`.

**Auth** (`/api/auth`)
| Method | Path | Description |
|--------|------|-------------|
| POST | `/register` | Create account |
| POST | `/login` | Passport local auth; sets refresh token cookie if rememberMe |
| GET | `/me` | Fetch current user profile |
| POST | `/refresh` | Rotate JWT from refresh token |
| POST | `/logout` | Clear session |
| POST | `/forgot-password` | Rate-limited; sends reset email via Nodemailer |
| PUT | `/reset-password` | Validate token, update password |

**Library** (`/api/library`)
| Method | Path | Description |
|--------|------|-------------|
| POST | `/upload` | Multipart PDF upload → GCS |
| GET | `/files` | List user files |
| GET | `/files/:id/url` | Get signed GCS URL |
| POST | `/folders` | Create folder |
| GET | `/folders` | List folder tree |
| PUT | `/folders/:id` | Rename/move folder |
| DELETE | `/folders/:id` | Delete folder |

**AI** (`/api/ai`)
| Method | Path | Description |
|--------|------|-------------|
| POST | `/analyze-pdf` | Extract text, generate flashcards via Gemini |
| POST | `/document-qa` | Q&A against document content |
| POST | `/generate-flashcards` | Generate flashcards from raw text |
| POST | `/learning-path` | Generate study plan for a lecture |
| POST | `/analyze-notes` | Summarize/expand notes |

**Stats / Productivity** (`/api/stats`)
Covers task CRUD, habit CRUD, focus session recording, XP updates, achievement listing, and leaderboard.

**Social** (`/api/friends`, `/api/messages`, `/api/feed`)
Covers friend requests, friend list, unfriend, private message history, feed post CRUD, likes, and comments.

**Content** (`/api/subjects`, `/api/notes`, `/api/flashcards`, `/api/qa-sessions`, `/api/learning-paths`)
Standard CRUD for each content type, plus `POST /api/flashcards/:id/review` which applies the SM-2 algorithm update.

---

## 7. Key Technical Decisions

**1. Storing note and flashcard body content in GCS, not MongoDB**
Chosen because AI-generated flashcard sets can exceed 16 MB (MongoDB document limit) for large PDFs. Each Mongoose document stores only a `cloudPath` string + `contentStoredInCloud: Boolean`. The tradeoff: every content read requires a GCS signed-URL round-trip instead of a single DB query.

**2. In-memory room state for Socket.io collaboration**
`rooms{}`, `socketToRoom{}`, `activeChats`, and `connectedUsers` are plain JavaScript objects/Maps on the Express process. This avoids Redis setup complexity and works on the free Render tier. The explicit tradeoff documented nowhere in the code: if the Render instance restarts (which it does after 15 minutes of inactivity on the free tier), all room state is lost and users are disconnected silently.

**3. Stats as a single aggregated document per user**
All tasks, habits, XP, level, daily activity, and achievement refs are on one MongoDB document. Pros: single query for all dashboard data, simple aggregation. Cons: the `tasks` and `habits` subdocument arrays grow without bounds; no pagination is possible on the DB layer; large task histories will degrade update performance.

**4. EventEmitter-based achievement engine**
`achievement.service.js` extends `EventEmitter`. Controllers emit domain events (`focus:session:completed`, `task:completed`, etc.) rather than calling achievement logic directly. This decouples the achievement system from business logic and allows adding new achievement triggers without modifying controllers. The tradeoff: events are not persisted — if the achievement handler throws or the process crashes mid-emit, the achievement is silently lost.

**5. Express 5.x (not 4.x)**
Express 5.1.0 is used, which has async error propagation built-in (no need for `next(err)` in async routes). This is a non-obvious choice since Express 5 was in beta/RC for years; it means `try/catch` is not always required in route handlers, but any middleware written for Express 4 patterns may behave differently.

**6. Monorepo with NPM workspaces (not Turborepo/Nx)**
The shared TypeScript package (`packages/shared`) is imported by both apps. NPM workspaces provide symlink-based resolution without a build tool layer. The tradeoff: no incremental build caching, no task graph — `npm run build` in the root builds everything serially via `concurrently`.

**7. Render free tier + UptimeRobot keep-alive**
The backend sleeps after 15 minutes of inactivity on Render's free tier. A `/ping` health check endpoint plus an external UptimeRobot monitor pinging every 5 minutes prevents spin-down. This is a known pattern but means the backend is never truly idle, consuming free-tier hours continuously.

---

## 8. Hard Problems Solved

**Problem 1: AI-generated flashcard content exceeding MongoDB document limits**
- **Problem:** Gemini 1.5 Pro, given a dense 80-page PDF, can return 200+ flashcards with detailed explanations. Storing all card content in a single Mongoose document (or even per-card documents with large text) risks hitting MongoDB's 16 MB document size limit and inflates collection storage costs.
- **Why it was hard:** The naive approach (store `front`/`back` as plain strings in MongoDB) fails at scale. Chunking flashcards into many small documents solves the size limit but creates N+1 query problems on list views.
- **Solution:** Each `Flashcard` document stores only metadata (SM-2 fields, tags, difficulty, lecture ref) plus a `cloudPath` string pointing to GCS. The content body lives in GCS. A `contentStoredInCloud: Boolean` flag allows the system to fall back to inline storage for small cards. List views return metadata + signed URLs; the frontend fetches content lazily per card.

**Problem 2: SM-2 spaced repetition algorithm implementation**
- **Problem:** Standard flashcard review requires a mathematically correct implementation of the SM-2 algorithm to compute next review dates, ease factors, and repetition intervals without drifting.
- **Why it was hard:** SM-2 has specific formulae for ease factor adjustment (`EF' = EF + (0.1 - (5-q)(0.08 + (5-q)*0.02))`), minimum EF floor (1.3), interval resets on failure, and graduated interval growth. Off-by-one errors in day calculations cause cards to surface too early or too late, degrading the learning curve.
- **Solution:** `flashcard.controller.js` implements SM-2 directly: quality score (0–5) maps to ease factor delta, interval doubles on success, resets to 1 on failure, `nextReview = now + interval days`. Fields stored on each Flashcard document: `easeFactor`, `interval`, `repetitions`, `lastReviewed`, `nextReview`.

**Problem 3: Real-time presence across disconnects and multi-tab sessions**
- **Problem:** A user may open multiple browser tabs. If one tab closes, the backend should not mark the user as offline if another tab is still connected.
- **Why it was hard:** Socket.io gives one socket per connection. A naive `user → socket` map marks the user offline the moment any socket disconnects, even if other sockets remain active.
- **Solution:** `connectedUsers: Map<userId, Set<socketIds>>` tracks all active socket IDs per user. On `disconnect`, the socket ID is removed from the set; the user is only marked offline when the set becomes empty. On reconnect, the socket ID is added back without resetting presence.

**Problem 4: Midnight habit reset without double-processing**
- **Problem:** Daily habits must reset at midnight. Users in different timezones, app restarts mid-night, and repeated cron firings could cause habits to be reset multiple times or miss a reset cycle.
- **Why it was hard:** Idempotency is hard with a `0 0 * * *` cron when the process can restart at any time. A naive reset-all-habits query would re-zero habits that had already been reset if the job ran twice.
- **Solution:** `scheduler.js` uses `lastCompleted` date comparison: habits are only reset if their `lastCompleted` date is not today. Points deduction for missed streaks similarly checks `lastCompleted` before penalizing. This makes the job idempotent for the same UTC day.

**Problem 5: PDF text extraction pipeline for Gemini prompts**
- **Problem:** Gemini 1.5 Pro accepts text, not raw binary PDFs directly in this integration. PDFs must be extracted to plain text before being passed to the model, and the extraction must preserve enough structure (headings, bullet points) for Gemini to generate meaningful flashcards.
- **Why it was hard:** `pdf-parse` extracts text but strips formatting. Dense academic PDFs with equations, tables, and multi-column layouts lose structure on extraction, producing incoherent prompt input.
- **Solution:** The extracted text is passed to Gemini with a structured prompt that instructs the model to infer topic boundaries and generate question-answer pairs regardless of formatting artifacts. The prompt engineering absorbs the formatting loss rather than trying to reconstruct document structure.

---

## 9. External Integrations

**Google Gemini 1.5 Pro (`@google/generative-ai`)**
- Used for: flashcard generation from PDF text, document Q&A, note summarization, learning path generation, AI coaching chat
- Auth: API key in `GEMINI_API_KEY` env var. **A hardcoded fallback key exists in `gemini.service.js`** — this is a production security risk.
- Non-obvious: The service exposes two modes — `generateResponse(prompt)` for single-turn and `generateChatResponse(history, prompt)` for multi-turn with conversation history passed as the Gemini `history` array format. Q&A sessions reconstruct this history from the `QASession` MongoDB document on each request.
- What breaks if it fails: AI flashcard generation, learning paths, document Q&A, and the AI Coach page all stop working. The rest of the app (flashcard review, tasks, habits, social) continues.

**Google Cloud Storage (`@google-cloud/storage`)**
- Used for: PDF file storage, flashcard/note content bodies, profile pictures
- Auth: Service account key file at `GCS_KEY_FILE` path, or JSON credentials. Falls back to a mock storage object if unconfigured (for local dev without GCS access).
- Non-obvious: The `gcs.js` config auto-creates the bucket if it does not exist (`createIfNotExists` pattern). Signed URLs use V4 signing with configurable expiry. The mock fallback silently drops writes — useful for development but dangerous if accidentally used in production.
- What breaks if it fails: File uploads fail entirely. Existing content becomes inaccessible (signed URLs cannot be generated). Notes and flashcard content stored in GCS are unreadable.

**Nodemailer + Gmail SMTP**
- Used for: password reset emails only
- Auth: `EMAIL_USER` (Gmail address) + `EMAIL_PASS` (Gmail App Password, not the account password)
- Non-obvious: Requires a Gmail App Password (2FA must be enabled on the Gmail account). Standard Gmail passwords are rejected by Google's SMTP since 2022.
- What breaks if it fails: Password reset flow is broken. Login and registration are unaffected.

**MongoDB Atlas**
- Used for: all persistent application data
- Auth: Connection string in `MONGO_URI` with username/password embedded
- Non-obvious: No explicit index definitions visible in the model files beyond the `unique` flag on `User.email` and `indexed: true` on `Stats.userId` and `Post.userId`. High-cardinality queries (e.g., flashcards by lectureId, messages by sender/recipient) may be doing collection scans.
- What breaks if it fails: Entire application is non-functional.

---

## 10. Environment & Configuration

**Backend** (`apps/backend/.env`):

| Variable | What it controls | Required |
|----------|-----------------|----------|
| `PORT` | HTTP server port (default: 5001) | Optional |
| `MONGO_URI` | MongoDB Atlas connection string | Required |
| `JWT_SECRET` | JWT signing secret | Required |
| `JWT_EXPIRES_IN` | JWT TTL (e.g., `1d`) | Required |
| `FRONTEND_URL` | Allowed CORS origin for production | Required |
| `GCS_PROJECT_ID` | Google Cloud project ID | Required (production) |
| `GCS_BUCKET_NAME` | GCS bucket name (default: `focus-ritual-files`) | Optional |
| `GCS_KEY_FILE` | Path to GCS service account JSON key | Required (production) |
| `EMAIL_USER` | Gmail address for Nodemailer | Required (for password reset) |
| `EMAIL_PASS` | Gmail App Password | Required (for password reset) |
| `GEMINI_API_KEY` | Google Gemini API key | Required (production; has hardcoded fallback) |

**Frontend** (`apps/web/.env`):

| Variable | What it controls | Required |
|----------|-----------------|----------|
| `VITE_API_URL` | Backend base URL (e.g., `https://api.render.com`) | Required |

---

## 11. How to Run Locally

**Prerequisites:** Node.js 18+, npm 9+, a running MongoDB instance (Atlas free tier or local `mongod`), optionally a GCS service account.

```bash
# 1. Clone and install all workspace dependencies from root
git clone <repo>
cd FR-NEW
npm install

# 2. Backend environment
cp apps/backend/.env.example apps/backend/.env
# Edit apps/backend/.env — set MONGO_URI, JWT_SECRET, GEMINI_API_KEY at minimum
# GCS is optional locally; the mock fallback will be used if GCS vars are absent

# 3. Frontend environment
echo "VITE_API_URL=http://localhost:5001" > apps/web/.env

# 4. Seed achievements (if a seed script exists — check src/scripts/)
# If not present, achievements can be created manually via the API or MongoDB shell

# 5. Start both apps concurrently from root
npm run dev
# Backend: http://localhost:5001
# Frontend: http://localhost:5173 (Vite default)
```

**No migration commands** — Mongoose creates collections on first write. No seed script was found in the explored codebase; the achievements collection must be populated manually or the achievement system returns empty results.

**GCS without credentials:** The mock fallback in `gcs.js` allows the app to start, but file uploads will appear to succeed while silently discarding data.

---

## 12. Known Limitations & Technical Debt

**In-memory Socket.io state:** Room state (`rooms{}`, `connectedUsers`, `activeChats`) lives in the Node.js process heap. Any restart (Render's free tier sleeps and restarts; deploys; crashes) wipes all active rooms and presence data. Multi-instance horizontal scaling is impossible without Redis pub/sub.

**Stats document growth:** The `Stats` model embeds `tasks` and `habits` as subdocument arrays with no pruning. A user with 3 years of daily tasks would have a document with thousands of subdocuments, causing slow updates and potentially large document sizes.

**No test suite:** There are no unit tests, integration tests, or E2E tests anywhere in the codebase. The `test` script in `package.json` likely runs nothing. Every change is validated manually.

**Hardcoded Gemini API key:** `gemini.service.js` contains a hardcoded fallback API key. If committed to a public repository, this key is exposed and may be scraped and abused.

**No database indexes defined beyond unique constraints:** High-traffic queries (flashcards by lectureId + userId, messages by sender/recipient pairs, posts by userId sorted by date) are likely collection scans. At small scale this is fine; at a few thousand users it will degrade.

**Render free tier cold starts:** The backend spins down after 15 minutes of inactivity. UptimeRobot pings `/ping` every 5 minutes to prevent this, but this consumes free-tier compute hours 24/7 and will exhaust the monthly allotment.

**No input validation middleware:** No Joi/Zod/express-validator schema validation layer was found on routes. Controller code likely does ad-hoc checks but there is no systematic boundary validation.

**Email is single-point-of-failure for password reset:** There is no backup email provider or retry queue. If Gmail SMTP rejects the send (rate limit, credential rotation), the user cannot reset their password.

---

## 13. What Makes This Project Unique or Complex

- **SM-2 spaced repetition** implemented from scratch with all algorithm fields (ease factor, interval, repetitions, next review date) stored per-card and updated on each review event.
- **Hybrid content storage architecture:** MongoDB holds metadata + references; actual note/flashcard content bodies are stored in GCS. A `contentStoredInCloud` flag enables graceful fallback. This is a non-trivial pattern that solves real document size constraints.
- **EventEmitter-based achievement engine** that decouples gamification from business logic. Controllers emit domain events; the achievement service listens and handles unlocking, XP awarding, and Socket.io notification delivery independently.
- **Multi-presence WebSocket tracking** using `Map<userId, Set<socketIds>>` to correctly handle multi-tab sessions without premature offline status.
- **Full AI document pipeline:** PDF binary → text extraction → structured Gemini prompt → parsed flashcard JSON → MongoDB + GCS storage → signed URL delivery. Each step has a failure mode that must be handled.
- **Real-time collaboration rooms** with per-room message history, typing indicators, message reactions, and participant presence — all coordinated through Socket.io with no external message broker.
- **Gamification system with 20 XP levels, threshold-based level-up events, multiple achievement categories (Focus, Streak, Task, Level, Community, Special), and a leaderboard** — all driven from a single Stats document per user.
- **Midnight cron job** with idempotent habit reset logic that prevents double-processing on restart by checking `lastCompleted` dates rather than blindly resetting all habits.

---

## 14. Suggested CV / Portfolio Description

- Architected a full-stack AI-powered learning management system using React 18, Express 5, MongoDB, and Google Gemini 1.5 Pro, handling the complete pipeline from PDF upload through AI-generated flashcard extraction to spaced repetition review.
- Implemented the SM-2 spaced repetition algorithm from specification, storing per-card ease factor, interval, and repetition count in MongoDB and computing next-review dates on each user interaction.
- Designed a hybrid content storage architecture where note and flashcard bodies are offloaded to Google Cloud Storage with V4 signed URLs, solving MongoDB 16 MB document size limits for AI-generated content sets.
- Built a real-time collaboration system with Socket.io supporting study rooms, private messaging, typing indicators, and multi-tab presence tracking using a `Map<userId, Set<socketIds>>` structure to prevent false offline events.
- Engineered a decoupled gamification engine using Node.js EventEmitter that awards XP, unlocks achievements across 7 categories, and delivers real-time notifications via Socket.io without coupling achievement logic to business controllers.

---

## Notes on Missing Information / Assumptions

**Sections where information was incomplete:**

- **Testing (Section 2):** No test files were found. Marked as "None present."
- **Seed scripts (Section 11):** No achievement seed script was located. Local setup instructions note this gap.
- **Input validation middleware (Section 12):** A `validator.js` middleware file was referenced in the directory but its contents were not fully explored. Assumed ad-hoc rather than systematic based on the absence of Joi/Zod dependencies in `package.json`.
- **Exact Gemini prompt templates:** The specific prompt strings sent to Gemini for flashcard generation and learning path creation were not read in detail. Section 8 describes the architectural approach without quoting prompts.

**Assumptions made:**

- The `GEMINI_API_KEY` hardcoded fallback in `gemini.service.js` is a development convenience that was never removed before deployment — not an intentional design choice.
- The absence of database index definitions (beyond `unique` and `indexed: true`) means no compound indexes exist; this is an assumption based on not finding an index-setup script or Mongoose `index()` calls in the explored model files.
- The `packages/shared` TypeScript package is not transpiled during the Render build (no `tsc` call in `render.yaml`); the backend likely does not import from it directly, using it only as a frontend type source.
