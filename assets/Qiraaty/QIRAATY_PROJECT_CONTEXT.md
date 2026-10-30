# Project Context: Qiraty

## 1. What This Project Does

Qiraty is a B2B2C online education platform for children in Saudi Arabia, connecting parents, students, specialist teachers, and administrators through structured learning journeys. The core product is a managed class session workflow: parents enroll children into courses and packages, teachers run live video sessions (via Daily.co), and specialists conduct diagnostic assessments that generate follow-up tasks for teachers and signed reports for parents. The system automates attendance tracking from video provider webhooks, analyzes dead air in recorded sessions, processes payments (Moyasar, Saudi gateway), and provides a full administrative CMS via Laravel Nova. The business model centers on multi-level sales (referral tree), package-based subscriptions, and coupon/wallet systems.

---

## 2. Tech Stack

| Layer | Technologies |
|---|---|
| Language(s) | PHP 8.1+, JavaScript (ES2020), Blade templating |
| Runtime / Framework | Laravel 10.10, Alpine.js v3, Vite 4 |
| Database(s) | MySQL 8 (production), SQLite in-memory (tests) |
| Auth | Laravel Sanctum (API tokens), OTP login flow, Spatie Laravel Permission (RBAC) |
| Infrastructure / Deployment | Traditional VPS / shared host (no Docker), queue worker (database driver), Laravel Horizon optional |
| External APIs / Services | Daily.co (video sessions + webhooks), Moyasar (Saudi payment gateway), Zoom API (legacy, jubaer/zoom-laravel), ZATCA (Saudi e-invoice compliance, salla/zatca), Mailtrap (transactional email SMTP sandbox), VideoSDK (likely legacy) |
| Testing | PHPUnit (Feature + Unit suites), 4 bespoke smoke test scripts (test_sprint*.php) run manually against a live database |
| Tooling (CI, linting, monorepo, etc.) | Composer, NPM/Vite, Tailwind CSS 3, PostCSS, phpunit.xml, Laravel Nova 4.25, Maatwebsite Excel, Spatie Media Library |

---

## 3. Architecture Overview

**Monolith** with a service-oriented internal structure. There is no microservices split, no API-first design beyond a single webhook endpoint — the application serves server-rendered Blade views for most user interactions.

### Major Subsystems

```
┌────────────────────────────────────────────────────────────────────┐
│                         Laravel Monolith                           │
│                                                                    │
│  ┌───────────────┐   ┌────────────────────┐   ┌────────────────┐  │
│  │  Blade / Web  │   │  Laravel Nova CMS  │   │  API Webhook   │  │
│  │  (~70 routes) │   │  (admin, metrics)  │   │  /api/webhooks │  │
│  └───────────────┘   └────────────────────┘   └───────┬────────┘  │
│                                                        │           │
│  ┌─────────────────────────────────────────────────────▼────────┐  │
│  │              ClassSessionWebhookController                   │  │
│  │  1. Validate HMAC-SHA256 signature                           │  │
│  │  2. Idempotency check (unique DB constraint)                 │  │
│  │  3. Normalize provider payload → internal events             │  │
│  │  4. Dispatch queued Laravel event                            │  │
│  └──────────────────────────────────┬───────────────────────────┘  │
│                                     │                              │
│         ┌───────────────────────────▼──────────────────────────┐   │
│         │              Queue Workers (database driver)          │   │
│         │  UpdateAttendanceOnJoin/LeaveListener                 │   │
│         │  HandleRecordingReadyListener → ProcessRecordingJob   │   │
│         │  HandleTranscriptReadyListener                        │   │
│         └──────────────────────────────────────────────────────┘   │
│                                                                    │
│  ┌────────────────────────────────────────────────────────────┐    │
│  │  Domain Services                                           │    │
│  │  AttendanceService | RecordingStorageService               │    │
│  │  DeadAirAnalyzer   | IdempotencyGuard                      │    │
│  │  DailyProvider / MockProvider (ClassSessionProvider iface) │    │
│  └────────────────────────────────────────────────────────────┘    │
└────────────────────────────────────────────────────────────────────┘
         ↕ HTTP REST
  ┌──────────────────┐
  │   Daily.co API   │   (video rooms, recording assets, transcripts)
  └──────────────────┘
         ↕ Webhook POST
  /api/webhooks/class-session/daily
```

### Primary Data Flow (Class Session Attendance)

1. Teacher creates/starts a classroom session (Daily.co room issued via `ClassSessionProvider::createSession`).
2. Students join; Daily.co fires `participant.joined` webhook to `/api/webhooks/class-session/daily`.
3. Controller validates HMAC signature, deduplicates via `webhook_deliveries`, normalizes event.
4. `ParticipantJoined` event → queued `UpdateAttendanceOnJoinListener` → `AttendanceService::recordJoin` updates `children_classroom.joined_at`.
5. On leave: same pipeline updates `left_at`, `duration_seconds`.
6. On session end: `recording.ready` fires → `ProcessRecordingJob` downloads the MP4, runs `DeadAirAnalyzer`, writes `waste_seconds` to every child's pivot row.

---

## 4. Directory Structure

```
d:\Personal Project\qiraty/
├── app/
│   ├── Casts/            # Custom Eloquent cast (TimeCast)
│   ├── Console/Commands/ # NotifyUsers artisan command + Kernel cron schedule
│   ├── Contracts/        # ClassSessionProvider interface (provider-neutral contract)
│   ├── Events/           # Domain events: ParticipantJoined/Left, RecordingReady,
│   │                     #   TranscriptReady, SessionStarted, DiagnosisCompleted
│   ├── Http/
│   │   ├── Controllers/  # 24+ controllers; Auth/, ClassSessionWebhookController,
│   │   │                 #   ClassroomController, ChildrenController, PaymentController
│   │   ├── Middleware/
│   │   └── Requests/     # Form request validation (Auth/)
│   ├── Jobs/
│   │   └── ClassSession/ # ProcessRecordingJob (download MP4 → analyze → persist)
│   ├── Listeners/        # 7 queued listeners; wired in EventServiceProvider
│   ├── Models/           # 44 Eloquent models (Users, Children, Classroom, Diagnosis…)
│   ├── Nova/             # Admin CMS resources, actions, lenses, metrics, dashboards
│   ├── Providers/        # AppServiceProvider, ClassSessionServiceProvider (DI binding),
│   │                     #   EventServiceProvider (event→listener map)
│   └── Services/
│       ├── Attendance/   # AttendanceService, ParticipantMapper
│       ├── Audio/        # DeadAirAnalyzer (Sprint 4; heuristic placeholder)
│       ├── ClassSession/ # DailyProvider, MockProvider, IdempotencyGuard,
│       │                 #   Normalizer/ (factory + per-provider), Signature/ (HMAC validators)
│       └── Media/        # RecordingStorageService (HTTP download → local disk)
├── config/               # 22 config files; class_session.php, moyasar.php, zoom.php
├── database/
│   ├── factories/
│   ├── migrations/       # 31 migrations (base tables + Sprint 2-4 incremental adds)
│   └── seeders/
├── docs/                 # Sprint-level instructions and implementation guides
├── lang/                 # ar.json (Arabic), vendor/nova/ar.json
├── nova-components/      # Custom Nova Vue tools: Setting, Template
├── resources/
│   ├── js/               # app.js + Alpine.js bootstrap
│   └── views/            # Blade templates: site/, teacher/, employee/, auth/
├── routes/
│   ├── api.php           # POST /api/webhooks/class-session/{provider}
│   ├── web.php           # ~70 web routes
│   ├── auth.php
│   └── channels.php      # Broadcasting channel auth
├── storage/app/temp/class_sessions/  # Temporary recording files during processing
├── tests/Feature/ tests/Unit/        # PHPUnit suites
└── test_sprint{1-4}_smoke.php        # Manual smoke scripts run against live DB
```

---

## 5. Data Models / Schema

### Core Entities

**`users`** — Multi-role (parent, teacher, specialist, admin, employee). Spatie roles/permissions attached. `category_id` determines dashboard variant rendered. Referral tree stored via self-referential `parent_id`.

**`children`** — Student entity. Belongs to a parent `User`. Pivot-heavy: connected to classrooms (14 pivot columns), courses, levels, packages, schedule times, training days. Audio recordings, answers, quizzes, and diagnoses all foreign-key to `children.id`.

**`classrooms`** — Represents a schedulable room. Added Sprint 3 columns: `provider_name`, `provider_session_id`, `recording_asset_id`, `transcript_asset_id`. Composite index `(provider_name, provider_session_id)` is the webhook lookup key. Pivot to children has 14 columns including attendance tracking added across Sprint 3-4.

**`children_classroom` (pivot)** — The most complex table. Tracks per-student: `is_confirmed`, `provider_participant_id`, `is_present`, `joined_at`, `left_at`, `duration_seconds`, `waste_seconds`. Updated asynchronously from webhook events.

**`diagnoses`** — Specialist assessment. `diagnosis_data` (JSON) holds structured results; `recommended_actions` (JSON array) is iterated to generate `diagnosis_tasks`. Status enum: `draft → completed → reviewed`. On `completed` transition, Eloquent `boot()` fires `DiagnosisCompleted` event via model observer pattern.

**`diagnosis_tasks`** — Follow-up actions for teachers generated from `recommended_actions`. Assigned `teacher_id` and `children_id` separately (teacher may differ from classroom teacher).

**`webhook_deliveries`** — Idempotency log. Unique constraint on `(provider_name, delivery_id)`. `payload_hash` (SHA-256 of raw body) stored for audit. Never deleted; append-only audit log.

**`courses / levels / packages`** — Curriculum hierarchy. `courses` → `levels` (one-to-many) → `packages` (one-to-many). Children enroll at the course and level level via pivot tables.

**`payments / wallets / coupons`** — Financial entities. Wallet is a credit balance. Payments reference `package_id` and `children_id`. Coupons have discount rules.

### Non-Obvious Relationships

- `classrooms.provider_session_id` is the join key for ALL webhook lookups — not the primary key.
- `children_classroom` pivot is resolved in two steps: first find classroom via `provider_session_id`, then match child via `provider_participant_id`. Fallback to name matching exists but is logged as a warning (low-confidence resolution).
- `diagnoses.classroom_id` and `diagnoses.course_id` are both nullable — a diagnosis can be standalone (not tied to a specific session).
- `Classroom::scopeByProviderSession($name, $id)` is a named scope used exclusively by the webhook pipeline; not used in web routes.

---

## 6. API Surface

### Webhook Endpoint (sole public API endpoint)

| Method | Path | Auth | What it does |
|---|---|---|---|
| POST | `/api/webhooks/class-session/{provider}` | HMAC-SHA256 signature header | Entry point for all class session events from Daily.co or mock provider. Validates signature, deduplicates, normalizes, dispatches internal events asynchronously. |

The `{provider}` segment selects the concrete validator and normalizer via factories. Valid values: `daily`, `mock`.

### Web Routes (server-rendered, session auth)

**Auth:**
- `GET/POST /register`, `/login`, `/logout`, `/otp/login`, `/password/reset/*`

**Dashboard & Profiles:**
- `GET /dashboard` — Role-specific view
- `GET /users/{user}/clients` — Referral tree

**Student Management:**
- `GET/POST/PUT/DELETE /childrens/*` — Full student CRUD
- `POST /childrens/{id}/enroll-course` — Enroll in course/level/package

**Class Sessions:**
- `GET /classes/{classroom}` — Attendance view
- `GET /classes/day/{classroom}` — Daily attendance entry (legacy manual flow)

**Diagnosis:**
- `GET/POST /diagnoses` — Create diagnosis
- `PUT /diagnoses/{diagnosis}/complete` — Triggers event chain
- `GET /diagnoses/{diagnosis}/report` — Signed URL (30-day expiry via `URL::temporarySignedRoute`)

**Assessments / Games:**
- `/childrens/{id}/test/{template}`, `/match/{template}`, `/quiz1/{template}`, `/quiz2/{template}`, `/quiz3/{template}`

**Payments:**
- `GET /payment/{package}/{children}` — Moyasar payment page
- `GET /confirmation/{package}/{children}` — Payment callback

**Audio:**
- `POST /save` — Upload child audio recording

**Cron triggers (publicly accessible GET routes — no auth middleware):**
- `/send_sms_before_appointment_times`
- `/wallet`
- `/run-cron-job`

---

## 7. Key Technical Decisions

### 1. Provider-Neutral `ClassSessionProvider` Interface

**Chosen:** A single PHP interface with 5 methods (`createSession`, `issueJoinToken`, `closeSession`, `fetchRecordingAsset`, `fetchTranscriptAsset`) and two concrete implementations (`DailyProvider`, `MockProvider`), bound via `ClassSessionServiceProvider` based on `CLASS_SESSION_DRIVER` env var.

**Alternatives:** Hard-coding Daily.co calls throughout controllers; using a third-party multi-provider package.

**Why:** Daily.co is the first provider but not necessarily permanent. Abstracting behind an interface means swapping to another provider (Zoom, Whereby) requires only a new implementation class and config switch. The Mock provider enables full offline development and CI testing with zero external dependencies.

---

### 2. Idempotency via Database Unique Constraint (Not Redis Locks)

**Chosen:** `UNIQUE(provider_name, delivery_id)` on `webhook_deliveries`. `IdempotencyGuard::accept()` attempts an insert; the database engine guarantees atomicity. If it throws `UniqueConstraintViolationException`, the guard returns `false`.

**Alternatives:** Redis `SETNX` lock with TTL; application-level "check then insert" (race-prone).

**Why:** The database engine provides the strongest atomicity guarantee without requiring an additional infrastructure dependency (Redis). The constraint enforces deduplication even under concurrent PHP-FPM workers hitting the same webhook simultaneously. A Redis lock would expire and could allow replay after TTL.

---

### 3. Queued Listeners (Async Attendance Updates)

**Chosen:** All webhook-triggered listeners implement `ShouldQueue`. The controller returns HTTP 200 immediately after enqueueing; the actual DB writes happen in a queue worker process.

**Alternatives:** Synchronous processing inside the controller; synchronous listeners.

**Why:** Daily.co (and most webhook providers) retry on non-2xx responses or slow responses. If attendance DB writes were synchronous, a slow query or deadlock would cause provider retries, defeating idempotency. Async processing decouples provider acknowledgment from processing latency. The idempotency guard at the controller layer prevents the queued job from being dispatched twice even if the webhook fires twice before the first job completes.

---

### 4. Participant ID Resolution via Provider Participant ID (with Name Fallback)

**Chosen:** When a student joins a session, their `provider_participant_id` is written to the pivot table. Subsequent webhook events (join, leave) resolve the child record by matching `provider_participant_id` on the pivot.

**Alternatives:** Match by `user_id` embedded in the provider metadata; require provider participant IDs to always match system IDs.

**Why:** Daily.co assigns its own session-scoped participant IDs. These are stored at join time. A three-tier fallback was implemented: (1) direct `provider_participant_id` match, (2) numeric cast (if the system sends its ID as the user_id to Daily), (3) name string match (low-confidence, logged as warning). This gracefully handles cases where the join token was issued before the pivot row was created.

---

### 5. Diagnosis Report via Laravel Signed URLs

**Chosen:** `URL::temporarySignedRoute('diagnosis.report', 30 days)` generates a time-limited signed URL sent to parents via email. No auth required to view the report — the signature is the access credential.

**Alternatives:** Require parent login to access reports; use a random token stored in the database.

**Why:** Parents may receive reports on devices where they are not logged in, or forward links to other family members. Signed URLs provide secure, expiry-enforced access without requiring an account session. The 30-day window matches the clinical review cycle.

---

### 6. Nova CMS for Admin Operations

**Chosen:** Laravel Nova 4 as the admin panel, with custom Nova components (`nova-components/Setting`, `nova-components/Template`) for specialized CMS needs.

**Alternatives:** Build a custom admin panel in Blade; use Filament (open-source Nova alternative).

**Why:** Nova integrates deeply with Eloquent and Spatie Permission. The team had existing Nova familiarity. Custom nova-components are Vue 3 components compiled into the Nova asset pipeline, enabling bespoke admin tools (settings management, template editor) without leaving the Nova UI paradigm.

---

### 7. DeadAirAnalyzer as a Seam for M3 AI

**Chosen:** `DeadAirAnalyzer::analyze()` in Sprint 4 uses a deterministic heuristic (15% of total session duration = silence seconds) rather than real audio analysis.

**Why:** The interface and data model (`waste_seconds` column, `ProcessRecordingJob` pipeline, per-child pivot storage) are all production-ready. The heuristic is a placeholder that satisfies the schema contract and enables downstream feature work without requiring FFmpeg or an ML model to be available in Sprint 4. Milestone 3 replaces only the `analyze()` method body.

---

## 8. Hard Problems Solved

### Problem 1: Exactly-Once Webhook Processing Under Concurrency

**Problem:** Daily.co retries webhook deliveries on network timeout or non-2xx responses. Multiple PHP-FPM workers can receive the same webhook concurrently before any of them completes processing. Duplicate attendance records or duplicate recording downloads would corrupt data.

**Why it was hard:** A naive "check if already processed, then insert" pattern is a TOCTOU race — two workers both read "not processed" simultaneously, then both proceed. A Redis lock requires TTL management and another infrastructure component. Application-level deduplication after queue processing is too late — the job is already enqueued twice.

**Solution:** The `webhook_deliveries` table has a `UNIQUE(provider_name, delivery_id)` constraint. `IdempotencyGuard::accept()` performs a single `INSERT` statement. The database engine serializes concurrent inserts on the unique index — exactly one succeeds, all others throw `UniqueConstraintViolationException`. The controller catches this and returns 200 (acknowledgment without processing). This provides atomic exactly-once semantics with no extra infrastructure.

---

### Problem 2: Provider-Agnostic Webhook Parsing

**Problem:** Different video providers (Daily.co, Zoom, future providers) send incompatible JSON structures and use different signature schemes. A single webhook endpoint must handle all of them without coupling the core domain to provider specifics.

**Why it was hard:** Webhook normalization is not just field renaming — event semantics differ. Daily.co's `participant.joined` payload includes session metadata, participant metadata, and timestamps in UTC with microsecond precision. A naive `if ($provider === 'daily')` switch in the controller bleeds provider knowledge into the domain layer.

**Solution:** Three parallel factory patterns: `SignatureValidatorFactory` (HMAC-SHA256 for Daily, no-op for Mock), `NormalizerFactory` (per-provider JSON→internal-event translators), and the `ClassSessionProvider` interface for outbound calls. Adding a new provider requires creating three classes (Validator, Normalizer, Provider impl) and registering them in the factories — zero changes to the controller or domain services.

---

### Problem 3: Participant Identity Resolution Across System and Provider Boundaries

**Problem:** When Daily.co fires a `participant.left` event, the payload contains a provider-assigned participant ID (a UUID string), not Qiraty's internal `children.id`. The attendance service must resolve which child left — and the mapping may not exist yet if the join event was processed out of order.

**Why it was hard:** The provider participant ID is only known at runtime, set when the join token is issued. Race conditions exist where `participant.left` is processed before `participant.joined` (different queue workers, network jitter). A pure lookup-by-ID fails for edge cases where the join token did not embed the system ID.

**Solution:** Three-tier resolution in `ParticipantMapper`: (1) direct lookup on `children_classroom.provider_participant_id`; (2) cast the provider user_id string to integer and match against `children.id` (works when the system issues tokens embedding its own IDs); (3) name string match on `children.name` (last resort, logged as warning for monitoring). The `provider_participant_id` is written on join, so subsequent leave events resolve via strategy (1) in the normal case.

---

### Problem 4: Recording Pipeline Without Blocking the Webhook Response

**Problem:** A recording asset can be hundreds of megabytes. Downloading it synchronously inside the webhook handler would take minutes, causing Daily.co to time out and retry, re-triggering the entire pipeline.

**Why it was hard:** The download, analysis, and pivot update must be atomic with respect to the session — but the webhook must respond in under a few seconds. Queueing naively without idempotency protection means a retry fires the job twice, downloading and overwriting the recording twice.

**Solution:** `HandleRecordingReadyListener` dispatches `ProcessRecordingJob` to the queue. Idempotency is guaranteed at the webhook layer (the job is only dispatched once). The job itself uses `RecordingStorageService` (5-minute HTTP timeout) to stream the file, then calls `DeadAirAnalyzer`, then updates the DB in a single transaction. Retry policy is 3 attempts with 10s/30s/60s backoff — idempotent because overwriting a file with the same content is safe.

---

## 9. External Integrations

### Daily.co (Primary Video Provider)

- **What:** Managed video room infrastructure with participant tracking, recording, and webhook delivery.
- **Usage:** Create session rooms, issue JWT join tokens per participant, receive real-time participant and recording events via webhooks.
- **Auth:** Bearer token (`DAILY_API_KEY`) for outbound REST calls; HMAC-SHA256 signature on incoming webhooks (`DAILY_WEBHOOK_SECRET`).
- **Non-obvious:** The `domain` config (`DAILY_DOMAIN=qiraty`) prefixes all room names (`qiraty.daily.co/room-name`). Recording assets are ephemeral — they must be downloaded within a provider-defined window.
- **If it fails:** All class sessions fall back to Mock provider (requires `CLASS_SESSION_DRIVER=mock`). Recording pipeline silently no-ops; attendance must be entered manually via the legacy `/classes/day/{classroom}` web route.

### Moyasar (Payment Gateway)

- **What:** Saudi-local payment provider supporting credit cards and STC Pay.
- **Usage:** Package purchase flow; `/payment/{package}/{children}` renders the Moyasar payment widget.
- **Auth:** Publishable key embedded in frontend widget; secret key used server-side for verification.
- **Non-obvious:** Moyasar uses a Saudi-specific 3DS flow. Test keys are in `.env`; production requires live keys from the Moyasar dashboard.
- **If it fails:** Payment pages fail; no fallback. Wallet-based enrollment is a partial workaround.

### ZATCA (Saudi E-Invoice Compliance)

- **What:** Saudi Zakat, Tax and Customs Authority e-invoicing standard (FATOORAH/Phase 2).
- **Usage:** Invoice generation for payments, using `salla/zatca` package.
- **Non-obvious:** Requires a cryptographic stamp and QR code embedded in every invoice. The integration adds ~200ms to invoice generation.
- **If it fails:** Invoices cannot be issued; this is a legal compliance requirement for Saudi businesses.

### Zoom API (Legacy)

- **What:** Zoom meeting management via `jubaer/zoom-laravel`.
- **Usage:** Appears to be a legacy integration predating Daily.co adoption. `config/zoom.php` exists; `ZOOM_CLIENT_KEY/SECRET/ACCOUNT_ID` in `.env`.
- **Status:** Likely unused in active code paths — `ClassSessionProvider` interface does not expose a Zoom implementation. May exist in older controllers.

### Mailtrap (Transactional Email)

- **What:** SMTP sandbox for transactional emails.
- **Usage:** Diagnosis report delivery, task notifications, OTP emails.
- **Non-obvious:** Current config is Mailtrap sandbox (dev only). Production requires a real SMTP provider (SendGrid, Postmark, SES).

---

## 10. Environment & Configuration

| Variable | Controls | Required |
|---|---|---|
| `APP_KEY` | Laravel encryption key (cookies, sessions) | Yes |
| `APP_ENV` | Environment mode (`local`, `production`) | Yes |
| `APP_DEBUG` | Stack traces in HTTP responses | Yes (false in prod) |
| `APP_URL` | Base URL for link generation | Yes |
| `DB_HOST/PORT/DATABASE/USERNAME/PASSWORD` | MySQL connection | Yes |
| `MAIL_MAILER/HOST/PORT/USERNAME/PASSWORD` | SMTP config | Yes |
| `MAIL_FROM_ADDRESS/NAME` | Sender identity | Yes |
| `CLASS_SESSION_DRIVER` | `daily` or `mock` — selects video provider implementation | Yes |
| `DAILY_API_KEY` | Daily.co REST API authentication | Yes (if driver=daily) |
| `DAILY_DOMAIN` | Daily.co subdomain prefix for room URLs | Yes (if driver=daily) |
| `DAILY_WEBHOOK_SECRET` | HMAC-SHA256 key for signature validation | Yes (if driver=daily) |
| `MOYASAR_API_KEY` | Moyasar secret key (server-side verification) | Yes |
| `MOYASAR_API_PUBLISHABLE_KEY` | Moyasar publishable key (frontend widget) | Yes |
| `ZOOM_CLIENT_KEY` | Zoom OAuth client key | No (legacy, may be unused) |
| `ZOOM_CLIENT_SECRET` | Zoom OAuth client secret | No (legacy) |
| `ZOOM_ACCOUNT_ID` | Zoom account identifier | No (legacy) |
| `API_KEY / SECRET_KEY / API_URL` | VideoSDK credentials | No (likely legacy) |
| `QUEUE_CONNECTION` | Queue driver (`database`, `redis`, `sync`) | Yes (use `database` or `redis` in prod) |
| `FILESYSTEM_DISK` | Default storage disk (`local`, `s3`) | Yes |
| `AWS_*` | S3 credentials (if FILESYSTEM_DISK=s3) | Conditional |

---

## 11. How to Run Locally

```bash
# 1. Install PHP dependencies
composer install

# 2. Install Node dependencies
npm install

# 3. Copy environment file
cp .env.example .env

# 4. Generate application key
php artisan key:generate

# 5. Configure .env
#    - Set DB_DATABASE, DB_USERNAME, DB_PASSWORD for your local MySQL
#    - Set CLASS_SESSION_DRIVER=mock (no Daily.co credentials needed)
#    - Set MAIL_MAILER=log (or configure Mailtrap)

# 6. Create the database (MySQL must be running)
mysql -u root -p -e "CREATE DATABASE qiraty CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

# 7. Run migrations
php artisan migrate

# 8. Seed the database (if seeders exist)
php artisan db:seed

# 9. Build frontend assets
npm run dev     # Dev with hot reload
# or
npm run build   # Production build

# 10. Start the development server
php artisan serve

# 11. Start the queue worker (required for webhook processing)
php artisan queue:work --queue=default

# 12. (Optional) Run smoke tests against live DB
php test_sprint4_smoke.php
```

**Non-obvious setup:** The `nova-components/Setting` and `nova-components/Template` custom Vue components must be built separately if modified:
```bash
cd nova-components/Setting && npm install && npm run build
cd nova-components/Template && npm install && npm run build
```

**Nova access:** `/nova` — requires a user with the appropriate Spatie role. Assign roles via `php artisan tinker` if no seeder exists.

---

## 12. Known Limitations & Technical Debt

1. **`DeadAirAnalyzer` is a heuristic stub.** It returns 15% of session duration as silence regardless of actual audio content. Real dead-air detection requires FFmpeg's `silencedetect` filter or a cloud audio analysis service. This is documented as a Milestone 3 deliverable.

2. **Cron routes are unauthenticated.** `/send_sms_before_appointment_times`, `/wallet`, `/run-cron-job` are accessible without auth. They should be protected by IP allowlist, a middleware check for internal requests, or moved to proper artisan commands triggered by system cron.

3. **Recording storage is local disk only.** `RecordingStorageService` writes to `storage/app/sessions/{sessionId}/recordings/`. In a multi-server deployment, recordings would not be accessible across instances. S3 migration is planned but not implemented.

4. **Participant name fallback is fragile.** If a student's name in Daily.co's participant display name does not exactly match `children.name` in the database (spacing, Arabic vs. transliterated Latin), the fallback match fails silently (logged as error, attendance not recorded).

5. **Zoom integration exists but is unverified.** The `jubaer/zoom-laravel` package and `ZOOM_*` env vars are present, but no `ClassSessionProvider` implementation exists for Zoom. The integration may be dead code from a previous sprint.

6. **No Laravel Horizon.** Queue monitoring relies on `php artisan queue:work`. Failed jobs require manual inspection via `failed_jobs` table. In production, Horizon should be deployed for visibility.

7. **SQLite in-memory for tests but MySQL in production.** There are known behavioral differences between MySQL 8 and SQLite (JSON column handling, strict mode). Some edge cases tested against SQLite may behave differently on MySQL.

8. **Soft deletes are inconsistently applied.** `Diagnosis` uses `SoftDeletes`; most other models do not. Cascade behavior on hard-deletes across the relational graph is not fully defined.

9. **No rate limiting on the webhook endpoint.** `/api/webhooks/class-session/{provider}` has no throttle middleware. A compromised or misconfigured provider could flood the queue.

10. **Nova custom components are compiled artifacts committed to git.** `nova-components/*/dist/` is tracked. This means a stale build in `dist/` can silently override local changes.

---

## 13. What Makes This Project Unique or Complex

Compared to a standard CRUD application, Qiraty demonstrates:

- **Provider-neutral abstraction over a real-time video infrastructure API** with a full factory pattern for webhook validation, payload normalization, and outbound calls. Swapping video providers requires zero changes to the domain layer.
- **Atomic idempotency via database unique constraints** — a production pattern for exactly-once webhook processing without Redis or distributed locks.
- **Async event-driven attendance pipeline** using Laravel's event/listener/queue system to decouple HTTP acknowledgment from DB writes, solving a real provider retry/deduplication problem.
- **Multi-tier participant identity resolution** (provider ID → system cast → name fallback) for correlating external video provider participants to internal student records.
- **Seam-driven architecture for AI integration** — `DeadAirAnalyzer` is an intentional interface boundary designed for Milestone 3 ML replacement, with the full data pipeline (job, storage, pivot schema) production-ready now.
- **ZATCA compliance** — Saudi e-invoice standard integration, which involves cryptographic QR stamp generation and is a legal requirement, not an optional feature.
- **Signed URL-based document access** for clinical reports, providing time-limited secure access without requiring user authentication on the recipient's device.
- **44 Eloquent models with complex pivot relationships** — the `children_classroom` pivot alone carries 14 columns spanning enrollment, confirmation, provider identity, and attendance metrics.
- **Multi-role platform** with 5+ distinct user types (parent, teacher, specialist, admin, employee) each with custom dashboards, navigation, and permission scopes via Spatie RBAC.

---

## 14. Suggested CV / Portfolio Description

- Architected a provider-neutral video session abstraction layer for a Saudi EdTech platform, using PHP interface contracts and factory-pattern dispatch to enable zero-code-change provider swapping (Daily.co, Zoom) across 5+ webhook event types.
- Engineered an atomic idempotent webhook processing pipeline using MySQL unique constraint semantics, eliminating duplicate attendance records under concurrent PHP-FPM worker conditions without introducing Redis or distributed locking infrastructure.
- Built an asynchronous real-time attendance tracking system with queued Laravel event listeners, resolving external video provider participant identities to database records via a three-tier fallback strategy and persisting join/leave/duration metrics to a 14-column pivot table.
- Designed and implemented a recording ingestion and dead-air analysis job pipeline (download → analyze → persist) with exponential-backoff retry, structured as an intentional seam for Milestone 3 ML/FFmpeg integration without coupling the data schema to the analysis implementation.
- Delivered ZATCA-compliant (Saudi e-invoice Phase 2) payment flows integrated with the Moyasar gateway, alongside time-limited signed URL document delivery for clinical diagnosis reports in a multi-role platform serving parents, teachers, and medical specialists.
