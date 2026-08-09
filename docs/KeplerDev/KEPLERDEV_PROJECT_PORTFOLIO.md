# Mahmoud Attia — Complete Project Portfolio & Engineering Context

**Developer:** Mahmoud Attia (KeplerDev)
**Role:** Mobile & Backend Developer | AI Integration Specialist
**Location:** Cairo, Egypt
**Portfolio:** https://www.keplerdev.uk
**Upwork:** https://www.upwork.com/freelancers/~014f0862c73d6acb2f
**Mostaql:** https://mostaql.com/u/kepler911
**GitHub:** https://github.com/mahmouddattiaa
**LinkedIn:** https://www.linkedin.com/in/mahmoud-attia-b372b0352
**Email:** mahmouddattia7@gmail.com

**Document version:** 1.0
**Last updated:** 8 August 2026

---

## About This Document

This is the authoritative reference for every project Mahmoud Attia has designed, built, shipped, or scoped. It exists to serve as complete background context — for AI assistants, for collaborators, for proposal writing, for CV generation, and for technical interviews.

Each project section follows a consistent structure so that any single project can be extracted in isolation without losing meaning:

1. **Summary** — what it is in one paragraph
2. **Status** — shipped, live, in progress, coursework, or specification
3. **Role** — what Mahmoud personally did
4. **Tech stack** — full layer-by-layer breakdown
5. **Architecture** — how the system is actually put together
6. **Key technical decisions** — what was chosen, over what, and why
7. **Hard problems solved** — the genuinely difficult engineering
8. **Known limitations** — honest technical debt
9. **CV bullets** — ready-to-use portfolio language

**Naming note:** The project previously referred to publicly as "Faseeh AI Keyboard" is now named **Aksira**. Use "Aksira" everywhere. The Faseeh name is retained in this document only as a historical alias so older references remain traceable.

---

## Profile Summary

Mahmoud Attia is a Computer Engineering student at Cairo University (expected graduation 2027) working simultaneously as a full-time remote engineer and an independent freelance developer. He has shipped applications to Google Play, operates self-hosted production infrastructure across a multi-node international server fleet, and has earned over $1,000 on Mostaql with a $2,000 engagement in progress.

His work sits at the intersection of three areas:

- **Mobile engineering** — Flutter and React Native, with deep native bridging into Kotlin, Java, and Swift where the platform requires it
- **Backend systems** — Node/Express, NestJS, Python (FastAPI and asyncio), with PostgreSQL, MongoDB, SQLite, and Redis
- **Applied AI integration** — Google Gemini used as a bounded component inside deterministic systems, never as the whole system

**Certifications:** CompTIA A+, Cisco CCNA

---

## Engineering Signature

Across eleven independent projects built over roughly three years, a consistent and deliberate engineering posture appears. These are not accidents of repetition — they are defaults chosen because they solve real classes of failure.

### 1. Offline-first as a default, not a feature

Nearly every mobile project assumes the network will fail and designs the primary workflow to survive it.

- **FitForge** keeps the entire active workout session in local Hive storage so a connectivity drop mid-session is invisible to the user, then reconciles on reconnect with a conflict strategy that treats the locally logged session as ground truth.
- **QuickChargingPOS** caches fuel delivery records in AsyncStorage (capped at 50) so a gas station can receive a fuel truck during an internet outage.
- **Classroom Sentinel** treats a local SQLite file as the source of truth rather than depending on live API availability.
- **HS VPN** resolves its server catalog through a three-tier fallback: Firebase Remote Config → last-known-good cached catalog → bundled bootstrap catalog.

### 2. Idempotency wherever an operation can repeat

Systems that poll, retry, or receive webhooks are designed so that repeating an operation is harmless.

- **Classroom Sentinel** checks announcement ID existence before insert, stores `alert_24h_sent` / `alert_2h_sent` flags per deadline, and gates reminder sends on both time-window conditions and prior-send state.
- **StayEase** processes Stripe webhooks against a processed-events log in Redis, keyed by the event's unique ID, so retries cannot produce duplicate bookings or duplicate payouts.
- **QuickChargingPOS** generates a client-side UUID per transaction before submitting to the backend.
- **Focus Ritual**'s midnight habit-reset cron compares `lastCompleted` dates rather than blindly zeroing state, making the job safe against restarts and double-firing.
- **Aksira** sends an `rid` idempotency key with every AI edge-function request.

### 3. Surgical LLM integration

Gemini is used precisely where free-text ambiguity actually exists, and deterministic code is used everywhere else. This is the opposite of the common pattern of routing everything through a model.

- **Classroom Sentinel** parses due dates natively from Google Classroom coursework API fields — structured data that should never be approximated by a model — and sends *only* free-text announcements to Gemini, with schema-constrained JSON output and enum constraints.
- **FitForge**'s program generation engine is explicitly **not** an LLM. It is a deterministic rule-based system encoding periodization models and volume landmarks (MEV/MAV/MRV), chosen because reproducibility and evidence-basis matter more than flexibility.
- **Focus Ritual** uses Gemini for flashcard extraction from unstructured PDF text, but implements SM-2 spaced repetition from the published specification in ordinary code.
- **Aksira** routes AI calls through a Supabase edge function with cascading model fallback, but all keyboard input handling, layout logic, and IME behavior is deterministic native/Dart code.

### 4. Native bridging when the framework runs out

Where Flutter or React Native cannot reach the platform capability, custom native modules are written rather than accepting the limitation.

- **Aksira** hosts a `FlutterEngine` inside a Kotlin `InputMethodService` — a pattern Flutter does not document or officially support.
- **QuickChargingPOS** authors `NamiPayModule.java` to construct SHA-256 HMAC-signed binary payment payloads and dispatch them via Android Intents.
- **HS VPN** implements the real tunnel lifecycle in Kotlin on Android and Swift `NEPacketTunnelProvider` on iOS, with Flutter owning only orchestration.

### 5. Financial and identity correctness

Where money or personal identity is involved, the design shows real care.

- **MedConnect** stores National IDs as AES-256 encrypted bytes for retrieval alongside a deterministic SHA-256 hash for indexing, solving the "encrypted data cannot be searched" problem without weakening encryption.
- **MedConnect** ties commission credits to geofence-verified physical check-ins to prevent referral fraud.
- **StayEase** uses TTL-based temporary reservations with MongoDB transactions so two simultaneous bookings for the same room cannot both succeed.
- **gLiter** specifies an append-only ledger where reversals create opposite entries and no completed financial-value record is ever silently edited or deleted.

---

## Master Project Index

| # | Project | Category | Status | Primary Stack | Depth |
|---|---------|----------|--------|---------------|-------|
| 1 | **HS VPN** | Mobile + Infrastructure | Live on Google Play | Flutter, Kotlin, Swift, Python/FastAPI, AmneziaWG | Very High |
| 2 | **Aksira** | Mobile (Android IME) | Production build, Android-only | Flutter, Kotlin, Supabase, Deno, Gemini 2.5 | Very High |
| 3 | **QuickChargingPOS** | Mobile (POS/Hardware) | Deployed to POS terminals | React Native, Java, Sunmi SDK, SkyBand SDK | High |
| 4 | **MedConnect Egypt** | Mobile + Backend | MVP built | NestJS, React Native/Expo, PostgreSQL, Redis | High |
| 5 | **Focus Ritual** | Web (Full-stack + AI) | Deployed | React 18, Express 5, MongoDB, Gemini 1.5 Pro, GCS | Very High |
| 6 | **Classroom Sentinel** | Automation / Bot | Self-hosted, running 24/7 | Python asyncio, aiosqlite, Telegram, Gemini | High |
| 7 | **FitForge** | Mobile (Cross-platform) | Built and deployed | Flutter, Riverpod, Hive, Node/Express, MongoDB | High |
| 8 | **StayEase** | Web (Full-stack) | Built and live | React, Redux Toolkit, Express, MongoDB, Stripe | High |
| 9 | **gLiter Loyalty Platform** | Multi-app Platform | Specification / Vision | React Native, Next.js, NestJS, PostgreSQL | Specification |
| 10 | **GetLab** | Desktop (Enterprise) | Delivered coursework | C# WinForms, SQL Server, ADO.NET | Medium |
| 11 | **AgencyOS** | Web (Dashboard) | Concept / Design build | Next.js, Tailwind | Concept |
| — | **AI Collab Platform** | Web (Real-time) | Built — undocumented | Socket.io, Gemini, React, Express | Undocumented |

---
---

# 1. HS VPN

**Play Store:** https://play.google.com/store/apps/details?id=com.hsvpn.vpn
**Android package:** `com.hsvpn.vpn`
**iOS bundle:** `com.hsvpn.hsvpn` (tunnel extension: `com.hsvpn.hsvpn.tunnel`)
**Current version:** 2.1.2+23
**Engagement type:** Contractor / maintenance-style project (client sourced via Mostaql)

## Summary

HS VPN is a Flutter-based VPN application for Android and iOS whose product goal is deliberately not generic privacy marketing. It exists to deliver **reliable connectivity inside DPI-heavy networks** — specifically Egypt and comparable censorship-heavy regions — where plain WireGuard is routinely fingerprinted and blocked at the ISP level.

This distinction drives every architectural decision in the project. The app does not simply wrap WireGuard; it runs an AmneziaWG-capable transport designed to defeat deep packet inspection, coordinated by a live remote control plane that can reconfigure server catalogs, transport preferences, and feature gates without shipping a new binary.

The system spans four separate execution environments: a Flutter application, two distinct native VPN implementations (Kotlin on Android, Swift on iOS), and a Python FastAPI peer registrar running on every node in the server fleet.

## Status

- **Android:** primary production path, live on Google Play, AmneziaWG-capable
- **iOS:** fully implemented with a real `NEPacketTunnelProvider` packet tunnel extension, but requires Mac/Xcode-side validation for release confidence; currently plain WireGuard only, no AmneziaWG support
- **Server fleet:** 9 production nodes — `de`, `us`, `sg`, `gb`, `nl`, `ca`, `in`, `au`, `jp`
- **Business model:** free, ad-supported, no hard paywall

## Role

Full ownership of the Flutter application, the Android native VPN service, the iOS tunnel extension wiring, the Python peer registrar, the Firebase Remote Config control plane design, server fleet provisioning, and the monetization layer.

## Tech Stack

### Flutter / Dart
| Package | Purpose |
|---|---|
| `get` | State management, dependency injection, routing |
| `pinenacl`, `crypto` | Curve25519 / WireGuard key generation |
| `flutter_secure_storage` | Secure private key storage |
| `firebase_core`, `firebase_remote_config`, `firebase_analytics` | Control plane and telemetry |
| `google_mobile_ads`, `gma_mediation_meta`, `unity_ads_plugin` | Monetization stack |
| `connectivity_plus` | Network state detection |
| `shared_preferences` | Local settings |
| `fl_chart` | Live connection metrics visualization |
| `cached_network_image`, `package_info_plus`, `url_launcher` | Supporting utilities |

### Android
- **Language:** Kotlin
- **compileSdk / targetSdk:** 36
- **minSdk:** 24
- **VPN path:** AmneziaWG-capable Android backend in `WireGuardVpnService.kt`

### iOS
- **Language:** Swift
- **Deployment target:** iOS 15.0
- **VPN path:** `NEPacketTunnelProvider` + `WireGuardKit`
- **App Group:** `group.84LPYPG2J8.hsvpn`

### Backend
- **Language/framework:** Python + FastAPI + `uvicorn`
- **Main file:** `backend/peer_registrar.py`
- **Database:** none — the WireGuard/AmneziaWG interface state *is* the source of truth

### Control plane & services
- Firebase Remote Config — server catalog, feature flags, version gates, ad switches, diagnostics switches
- Firebase Analytics — connection attempt and behavior telemetry
- Google AdMob with Meta mediation
- Unity Ads as an Android interstitial fallback path

## Architecture

```
Flutter app
  screens → controllers → services → models
       │ MethodChannel / EventChannel
       ▼
Native VPN layer
  Android: Kotlin + AmneziaWG-capable backend
  iOS:     Swift + NEPacketTunnelProvider + WireGuardKit
       │
       ▼
VPN node
  awg0/wg0 interface + FastAPI peer registrar
       │
       ▼
Firebase Remote Config control plane + Analytics
```

The critical separation of concerns:

- **Flutter decides** which server, profile, and transport to attempt
- **Native code owns** the real OS VPN integration and tunnel lifecycle
- **The backend owns** peer registration and IP assignment

### Connection flow

1. `VpnController` loads server data through config-sync (not the legacy `ServerRepository` path)
2. `ConfigSyncService` resolves the active catalog through a three-tier fallback: Firebase Remote Config → last-known-good cached catalog → bundled bootstrap catalog
3. `ConnectionOrchestrator` orders candidate profiles, preferring AmneziaWG where available and permitted by the control plane
4. The app registers its device public key with the selected registrar endpoint
5. Native code starts the tunnel
6. **The app waits for a real handshake signal before treating the session as protected**
7. Only after a genuinely protected session begins do side effects fire — session tracking, connect-triggered monetization

Point 6 is the most important behavioral rule in the codebase: *"connected" is never trusted until handshake confirmation exists.*

## Control Plane Configuration

Firebase Remote Config keys in active use:

| Key | Controls |
|---|---|
| `vpn_server_list` | Active server catalog |
| `vpn_api_key` | Registrar shared secret |
| `vpn_config_generation` | Catalog version |
| `minimum_required_vpn_config_generation` | Client config floor |
| `force_update_enabled` | Force-update gate |
| `minimum_supported_android_version_code` | Android version gate |
| `enforce_amnezia_only` | AWG-first / AWG-only enforcement |
| `transport_reality_enabled` | REALITY transport flag (scaffolding) |
| `transport_hysteria2_enabled` | Hysteria2 transport flag (scaffolding) |
| `transport_masque_enabled` | MASQUE transport flag (scaffolding) |
| `diagnostics_upload_enabled` | Diagnostics capture toggle |
| `ads_enabled`, `interstitial_ads_enabled`, `native_ads_enabled`, `admob_interstitial_enabled`, `unity_interstitial_enabled` | Granular ad kill switches |

## Backend Registrar

The FastAPI registrar (`backend/peer_registrar.py`) has grown well beyond a simple `/register` script:

- Registers or reuses peers by public key
- Assigns `/32` client IPs
- Exposes `/register`, `/status`, `/healthz`, `/diag`, `/diag/recent`
- Supports a **server-side Android version gate**
- Performs garbage collection of inactive peers

Runtime defaults:

```
WG_INTERFACE=wg0
WG_NETWORK=10.8.0.0/16
WG_COMMAND=wg
WG_QUICK_COMMAND=wg-quick
API_KEY=HS_VPN_SECRET
REGISTRAR_PORT=5000
REGISTRAR_BIND_HOST=127.0.0.1
```

### Production topology

- Public HTTPS registration through **Caddy on TCP 443**
- Caddy reverse-proxies `/register`, `/status`, `/healthz`
- External TCP 5000 firewalled
- UDP 443 carries the VPN tunnel path

Older setup documents describing direct public HTTPS on port 5000 are stale and should be treated as historical references.

## Transport Status

**Live today:**
- Android client: AmneziaWG-capable, used in the production flow
- Server fleet: migrated to `awg0` / AmneziaWG-backed operation
- Control-plane gating for AWG-first behavior

**Not live today:**
- iOS AmneziaWG support
- REALITY client transport
- Hysteria2 client transport
- MASQUE client transport

An important nuance for anyone reading the codebase: models and ordering logic exist for future transports, but their presence in the Dart data model does not mean they are production-ready. They are scaffolding.

## Deployment Model

**Android:** Flutter/Gradle build outputs, distributed via Google Play. Release flow is entirely manual — there is no CI/CD pipeline. Release gating depends on manual validation plus coordinated Firebase Remote Config version-gate updates.

**iOS:** Requires macOS + Xcode. Distribution via TestFlight / App Store Connect. Entitlements and extension wiring are checked in, but a Windows workspace cannot validate Xcode archives.

**Backend:** Each node runs WireGuard/AmneziaWG plus the FastAPI registrar. New server rollout requires publishing matching entries to Firebase Remote Config.

**Critical operational dependency:** app rollout and server rollout are coupled. Backend API key changes must match Remote Config, server catalog changes must be published before clients can consume them, and version gates must be in place before old behavior is retired.

Common commands:
```bash
flutter pub get
flutter analyze
flutter test -r compact
flutter build apk --release
flutter build appbundle --release
```

## Monetization

- AdMob as the primary network
- Meta as an AdMob mediation adapter
- Unity wired as an Android interstitial fallback / testing path

Current policy posture is recovery-first and stability-first: keep request rates low, avoid retry storms, use provider-level kill switches from Remote Config, and only show interstitials around legitimate session moments.

Monetized moments:
- Connect interstitial **after a confirmed protected session**
- Native ads in the server list
- Disconnect sheet native slot
- Conditional post-disconnect interstitial

## Security & Privacy

- WireGuard private keys stored in secure storage, never plain preferences
- No user-account system — peers are identified purely by public key
- Backend auth is shared-secret based via `x-api-key`
- Server private keys and root passwords are never stored in repo docs

## Hard Problems Solved

**Defeating DPI fingerprinting.** Plain WireGuard has a recognizable handshake signature that Egyptian ISPs fingerprint and block. Migrating both the client and the entire server fleet to AmneziaWG-oriented operation — while keeping a fallback path and gating the transition through a remote config flag — is the core engineering value of the project.

**Trustworthy connection state.** A VPN that reports "connected" before a handshake exists is worse than one that reports failure, because the user browses believing they are protected. The connect flow explicitly waits for handshake confirmation before any protected-session side effect fires.

**Coupled client/server release management.** With 9 nodes, a remote control plane, and a manually released mobile app, a config mismatch can break production instantly. Version gates (`minimum_required_vpn_config_generation`, `minimum_supported_android_version_code`) plus a server-side Android version gate in the registrar allow old clients to be retired safely.

**Multi-tier config resilience.** Remote Config can fail, be misconfigured, or be unreachable. The three-tier resolution chain — remote → last-known-good cache → bundled bootstrap — means the app can always attempt a connection.

## Known Limitations & Technical Debt

- iOS has no AmneziaWG support and remains on plain WireGuard
- Future transports (REALITY, Hysteria2, MASQUE) are scaffolding, not features
- Android tunnel lifecycle regressions are high-risk and can create zombie/stale tunnel behavior
- Reconnect issues are frequently order-of-operations bugs between stop → register → start
- The control plane is powerful enough to break production quickly if misconfigured
- No CI/CD or automated release pipeline
- UI test coverage is limited; Swift/iOS native automated coverage is effectively minimal
- Several older docs are stale in places

## Validation Checklist Before Risky Changes

1. Run `flutter analyze`
2. Run `flutter test -r compact`
3. Test Android connect / disconnect / reconnect / server-switch behavior
4. If touching ads, verify no request loops
5. If touching iOS, validate on a Mac with Xcode

## CV / Portfolio Bullets

- Built and shipped a production Flutter VPN application to Google Play serving DPI-heavy networks, combining a Kotlin AmneziaWG-capable Android VPN service with a Swift `NEPacketTunnelProvider` iOS tunnel extension.
- Migrated both client and a 9-node international server fleet from plain WireGuard to AmneziaWG to defeat ISP-level deep packet inspection fingerprinting in censorship-heavy regions.
- Designed a Firebase Remote Config control plane governing server catalogs, transport preference, feature flags, version gates, and granular ad kill switches, enabling production behavior changes without app releases.
- Authored a Python FastAPI peer registrar deployed per node handling peer registration, `/32` IP assignment, diagnostics capture, server-side version gating, and inactive-peer garbage collection with no database dependency.
- Implemented a three-tier configuration resolution chain (Remote Config → cached catalog → bundled bootstrap) guaranteeing connection capability even under total control-plane failure.
- Engineered handshake-confirmed session semantics so that connection state, session tracking, and monetization triggers only fire on genuinely protected tunnels.

---
---

# 2. Aksira — AI Smart Keyboard

**Formerly:** "Faseeh AI Keyboard" (deprecated name — use **Aksira**)
**Android package:** `com.aksira.keyboard`
**Pubspec name:** `aksira`
**Platform:** Android only (iOS keyboard extension is a folder stub)

## Summary

Aksira is a production Android **IME (Input Method Engine)** — a system-wide custom keyboard — with embedded AI capabilities powered by Google Gemini via Supabase Edge Functions. It addresses a specific gap for Arabic–English bilingual users: the inability to rewrite, translate, or dictate text without leaving the keyboard context and switching apps.

The system ships as **two Flutter entry points sharing one Dart codebase** — a companion settings/account app and the keyboard IME itself — bridging to a Kotlin `InputMethodService` on Android. The companion app carries a full auth flow (email/password plus optional Google/Play Games sign-in), a credit and monetization system (free daily credits, IAP packs, Pro subscription), and rewarded ads, layered over Supabase Auth and a server-side credit ledger.

This is the most technically unusual project in the portfolio. Hosting a Flutter engine inside an `InputMethodService` is not a documented or officially supported Flutter pattern.

## Status

Production build with a real release keystore. Android-only. `USE_REAL_MONETIZATION` gates real IAP/AdMob adapters; dev builds run entirely against fakes with zero real network calls.

## Role

Sole architect and developer across every layer: Flutter UI, Kotlin IME host, Deno edge functions, Supabase schema and credit ledger, monetization integration, and release signing.

## Tech Stack

| Layer | Technologies |
|---|---|
| Languages | Dart 3.11+, Kotlin, TypeScript (Deno) |
| Runtime / Framework | Flutter 3.11+ (two engine entry points), Deno runtime for edge functions |
| Database / Auth | Supabase (Auth + PostgreSQL credit ledger) |
| Local state | SharedPreferences (keyboard settings), Provider (ChangeNotifier) |
| Navigation | go_router 16.x |
| Localisation | flutter_localizations + ARB/l10n (English + Arabic) |
| Infrastructure | Supabase Edge Functions (Deno), Google Play Store |
| External APIs | Google Gemini 2.5 Flash / Flash-Lite / Pro, Android SpeechRecognizer, Android TTS |
| Ads | Google Mobile Ads SDK (AdMob) — rewarded + app-open |
| IAP | `in_app_purchase` 3.x (Google Play Billing) |
| Signing | Production release keystore, env-var driven |
| Testing | flutter_test, mockito 5.4.4, build_runner 2.4.8 — **88 test files** |
| Tooling | Gradle Kotlin DSL, flutter_lints 6.0.0, flutter_launcher_icons 0.14.2 |

## Architecture

### Two Flutter engines, one codebase

- `main()` → companion app (auth, settings, account, credits)
- `keyboardMain()` → IME keyboard, spawned by the Android OS as a system service

Both share the same `lib/` source tree. `FlutterEngineCache` in Kotlin ensures the keyboard engine is reused across keyboard sessions rather than cold-started on every focus event.

### Module dependency hierarchy

```
AksiraApp (GoRouter + Provider root)
  ├── AuthController ──── AuthRepository (Supabase / Fake)
  ├── CreditsController ── CreditLedger (Supabase / Fake)
  │                    ── PurchaseService (IAP / Fake)
  │                    ── AdService (AdMob / Fake)
  ├── SettingsController
  ├── LocaleController
  └── OnboardingController

KeyboardEntryPoint (separate Flutter engine)
  └── KeyboardScreen
        ├── SettingsController (via SharedPreferences)
        ├── KeyboardInputController
        └── AIController ──── AIService (HTTP → Supabase edge fn)
                          ──── SttService / TtsService
                          ──── IMEService (MethodChannel, static)
                                 └── SmartKeyboardService.kt
                                       └── Android InputConnection API
```

### Primary data flow — AI Rewrite

```
User types in any Android app
  → Android OS routes keypresses through SmartKeyboardService (Kotlin InputMethodService)
    → SmartKeyboardService hosts a FlutterView
      → Dart KeyboardScreen renders keys
        → User taps key → IMEService.commitText() (Dart)
          → MethodChannel → SmartKeyboardService.handleMethodCall() (Kotlin)
            → currentInputConnection.commitText() (Android InputConnection API)

User taps "Rewrite"
  → AIController reads text via IMEService.getTextBeforeCursor()
    → MethodChannel → Kotlin getTextBeforeCursor() → returns string
  → AIService.rewrite(text, tone) → HTTP POST to Supabase Edge Function
    → Edge function calls Gemini → returns 3 variants
  → AIController shows RewritePanel with 3 cards
  → User taps "Use" → IMEService.replaceAllText(variant)
    → MethodChannel → Kotlin setComposingText()
```

### Credit gate

```
User triggers AI action
  → AIController checks CreditsController.canAfford(1)
    → Out of credits → navigate to paywall / get-credits screen
    → Has credits → proceed with AI call
      → On success → CreditsController.spend(1)
```

## API Surface

### MethodChannel `com.smartkeyboard/ime` — Flutter → Native

| Method | Parameters | Returns | Purpose |
|---|---|---|---|
| `commitText` | `text: String` | void | Insert text at cursor (batched 18ms) |
| `deleteBackward` | `count: int` | void | Delete N characters left of cursor |
| `sendEnter` | — | void | Send Enter/action key |
| `replaceAllText` | `text: String` | void | Replace entire field content |
| `getTextBeforeCursor` | `length: int` | String? | Read up to N chars before cursor |
| `getTextAfterCursor` | `length: int` | String? | Read up to N chars after cursor |
| `setKeyboardHeight` | `heightDp: int` | void | Resize IME window |
| `setWindowBackground` | `colorInt: int` | void | Theme sync at runtime |
| `nativeSttStart` | `locale: String` | bool | Start Android SpeechRecognizer |
| `nativeSttStop` | — | void | Stop, allowing finalization |
| `nativeSttCancel` | — | void | Abort immediately |
| `ttsSpeak` | `text, lang, pitch, rate` | bool | Speak via Android TTS |
| `ttsStop` | — | void | Stop TTS playback |
| `playKeyClick` | — | void | System key click sound |
| `getClipboardItems` | — | List\<String\> | Last 10 clipboard entries |
| `switchToNextKeyboard` | — | bool | Cycle IME picker |
| `sendEditAction` | `action: String` | void | undo/redo/cut/copy/paste/selectAll |
| `launchSettings` | — | void | Open companion app |

### MethodChannel `com.smartkeyboard/ime` — Native → Flutter

| Method | Payload | Purpose |
|---|---|---|
| `onStartInput` | `inputType, imeOptions, isSecure` | New field focused; triggers layout auto-switch |
| `reloadSettings` | — | Settings changed in companion app |
| `keyboardHidden` | — | Keyboard dismissed |
| `nativeSttPartial` | `text: String` | Interim speech result |
| `nativeSttFinal` | `text: String` | Final committed speech result |
| `nativeSttStatus` | `status: String` | done / notListening |
| `nativeSttError` | `message, code` | Recognition error |
| `ttsState` | `speaking: bool` | TTS playback state |

### MethodChannel `com.smartkeyboard/settings`

`openInputMethodSettings`, `isKeyboardEnabled`, `isKeyboardDefault`, `showKeyboardPicker`, `hasMicPermission`, `requestMicPermission`

### Supabase Edge Functions

**`POST /functions/v1/process-ai-request`**

| Action | Request fields | Response |
|---|---|---|
| `rewrite` | `a, t, tone, lang?, rid` | `{ v: [3 variants] }` |
| `translate` | `a, t, from, to, rid` | `{ v: ["translated text"] }` |
| `clean_speech` | `a, t, lang?, rid` | `{ v: ["cleaned text"] }` |

Wire format:
```json
{
  "a": "rewrite|translate|clean_speech",
  "t": "text content",
  "tone": "Professional|Friendly|Slang",
  "from": "ar|en",
  "to": "ar|en",
  "lang": "ar|en",
  "rid": "random-uuid"
}
```

> **Critical:** the fields are `a` (not `action`) and `t` (not `text`). Sending full field names returns HTTP 400. `rid` provides idempotency.

Success: `{ "v": ["variant1", "variant2", "variant3"] }` — always an array, even for single results.
Error: `{ "e": "human-readable error message" }`

**`POST /functions/v1/verify-purchase`** — verifies Google Play purchase receipts and grants credits/Pro via the Supabase credit ledger, called by `EdgePurchaseReceiptVerifier` after a successful IAP flow.

## Monetization Catalog

| Product ID | Kind | Credits | Price |
|---|---|---|---|
| `aksira_pro_monthly` | Pro subscription | Unlimited | $4.99/mo |
| `credits_50` | Credit pack | 50 | $0.99 |
| `credits_200` | Credit pack | 200 | $2.99 (featured) |
| `credits_500` | Credit pack | 500 | $5.99 |

## Key Technical Decisions

**1. Two Flutter entry points in one codebase.** Chosen over separate Flutter apps or a native-only keyboard. `@pragma('vm:entry-point')` permits different `runApp()` hierarchies from one binary, so the companion app and keyboard share all Dart code with independent engine lifecycles.

**2. Static `IMEService` facade over an injected service.** MethodChannel must be initialized with the Flutter engine's binary messenger, available only after engine startup. A static class initialized once by `keyboard_entry.dart` solves this. Downside: testability — all IME calls must be mocked at the MethodChannel level.

**3. Provider three-tier hierarchy (Settings → Input → AI).** Chosen over Riverpod, BLoC, and GetX. `AIController` needs text from `InputController` and theme from `SettingsController`; `ProxyProvider2` wires this without async complexity.

**4. GoRouter 16 for the companion app.** Named routes plus `ShellRoute` for bottom nav. `AksiraApp` owns the router lifecycle — created once in `initState`, disposed in `dispose` — preventing rebuilds from leaking the auth subscription.

**5. Port/adapter pattern for auth, credits, and monetization.** Every backend integration sits behind an abstract port. Fakes inject in dev builds, real adapters in production, controlled by `USE_REAL_MONETIZATION` and `ENABLE_TESTER_PROFILE_BYPASS` dart-defines. This lets UI iteration proceed with zero real network dependency.

**6. Split dart-define credentials.** Supabase URL and anon key are split across `SB_U1`+`SB_U2` and `SB_K1`.`SB_K2`.`SB_K3`, assembled at runtime. This avoids embedding a complete, greppable credential string in the shipped binary while still resolving as `const` at compile time.

**7. Short wire field names (`a`, `t`).** Minimal payload for latency-sensitive mobile use.

**8. Native Android `SpeechRecognizer` over the `speech_to_text` plugin.** The plugin requires a foreground Activity context; an IME is an `InputMethodService` and has none. Native `SpeechRecognizer` works directly from a service, with results bridged back via MethodChannel.

**9. `FlutterEngineCache`.** Cold-starting a Flutter engine takes 400–800ms — unacceptable for a keyboard that must appear instantly. Caching reuses the Dart isolate and widget tree, reducing re-show time to **~30ms**.

**10. Text batching over an 18ms window for `commitText`.** Accumulating characters within one ~60fps frame reduces MethodChannel calls by 5–10× during fast typing.

**11. Gemini multi-model fallback.** `GEMINI_FAST_MODELS` and `GEMINI_PRO_MODELS` lists are iterated on quota or timeout failure: flash-lite → flash → pro.

**12. Production keystore committed with env-var-driven passwords.** `android/keystore/aksira-release.jks` is in the repo; `KEYSTORE_PASSWORD`, `KEY_ALIAS`, and `KEY_PASSWORD` are injected as environment variables rather than hardcoded.

## Hard Problems Solved

**Running Flutter inside an Android `InputMethodService`.** `SmartKeyboardService.kt` manually creates or retrieves a `FlutterEngine`, calls `dartExecutor.executeDartEntrypoint()` targeting `keyboardMain`, constructs a `FlutterView`, and returns it from `onCreateInputView()`. There is no Activity context, no standard lifecycle, and no documented Flutter support for this — engine lifecycle, view creation, and IME window dimensions all have to be managed by hand.

**STT dictation inside an IME service context.** Android's `SpeechRecognizer` terminates sessions frequently. A bounded recovery loop (max 3 restarts per 20-second window, 800ms cooldown) plus transcript chunk merging across restart boundaries produces a continuous dictation experience from a fundamentally discontinuous API. Extracted to `NativeSpeechRecognizerCoordinator.kt` (~600 LOC).

**Bi-directional settings sync between two isolates.** The companion app and the keyboard run in separate Dart isolates and cannot call each other directly. Settings live in SharedPreferences; `SmartKeyboardService` detects changes via `OnSharedPreferenceChangeListener` and fires a `reloadSettings` MethodChannel callback, prompting the Dart `SettingsController` to re-read and `notifyListeners()`.

**Glassmorphism blur inside an IME window.** `BackdropFilter` behaves differently in an IME window than in a normal Activity. Solved by reading the current theme in `onCreateInputView()` and setting `window.setBackgroundDrawable(ColorDrawable(color))` from the Kotlin service layer, with runtime theme switching exposed through the `setWindowBackground` MethodChannel method.

**Context-aware Enter key across every app.** `onStartInput()` extracts `imeOptions & 0xFF` and passes it to Dart; `ImeActionPolicy` maps the bitfield to an `ImeAction` enum and `SmartEnterKey` renders the correct label (Search, Send, Go, Done, Next).

**Credit gating without cross-engine coupling.** AI calls check a SharedPreferences credit snapshot, so the keyboard engine never needs to reach into the companion app's engine.

## Environment & Configuration

**Build-time dart defines** (`--dart-define-from-file=dart_defines.json`):

| Variable | Controls | Required |
|---|---|---|
| `SB_U1` / `SB_U2` | Supabase project URL halves | Yes |
| `SB_K1` / `SB_K2` / `SB_K3` | Supabase anon key segments | Yes |
| `ENABLE_TESTER_PROFILE_BYPASS` | Skip auth in dev (default `true`) | No |
| `ENABLE_SOCIAL_SIGN_IN` | Show Google/Play Games buttons (default `false`) | No |
| `USE_REAL_MONETIZATION` | Real IAP/AdMob adapters (default `false`) | No |
| `ADMOB_APP_ID_ANDROID` | AdMob app ID | No — test ID by default |
| `ADMOB_REWARDED_ANDROID` | Rewarded ad unit ID | No |
| `ADMOB_APP_OPEN_ANDROID` | App-open ad unit ID | No |

**Supabase edge function secrets:** `GEMINI_API_KEY` (required), `GEMINI_FAST_MODELS`, `GEMINI_PRO_MODELS`

## Known Limitations & Technical Debt

**Resolved:**
- ✅ `applicationId` renamed from `com.example.smart_keypoard` → `com.aksira.keyboard`
- ✅ Real production keystore with env-var passwords
- ✅ `verify-purchase` edge function added for IAP receipt verification
- ✅ `NativeSpeechRecognizerCoordinator.kt` and `NativeTtsCoordinator.kt` extracted from `SmartKeyboardService.kt`
- ✅ GoRouter navigation, auth flow, and credit system implemented

**Outstanding — critical:**
- Supabase edge functions deploy manually; no CI/CD for `supabase functions deploy`
- Google Play billing requires real product IDs in Play Console; keep `USE_REAL_MONETIZATION=false` until configured
- iOS keyboard extension is a folder stub — Android only
- OAuth requires `google-services.json` and Play Console setup not in repo; `ENABLE_SOCIAL_SIGN_IN` defaults `false`

**Protocol risks:**
1. AI calls using full field names (`action`/`text`) instead of shorthand (`a`/`t`) → HTTP 400
2. Tone values must exactly match `Professional`, `Friendly`, or `Slang`
3. `_parseVariants()` expects `v` to always be `List<dynamic>`; a string value throws at runtime

**Other debt:**
- No CI pipeline; tests run manually
- `speech_to_text` plugin likely unused in IME mode (~400KB overhead)
- Test coverage is breadth-first; STT recovery and new auth/credits flows have minimal edge-case coverage
- No error reporting or analytics — AI failures surface as transient UI banners, production debugging requires reading Supabase logs
- `lib/app/` partially overlaps `lib/features/`; migration incomplete

## CV / Portfolio Bullets

- Architected a production Android IME (system-wide keyboard) in Flutter by manually hosting a `FlutterEngine` inside a Kotlin `InputMethodService`, solving Flutter's lack of native IME support through engine caching and custom `FlutterView` lifecycle management.
- Reduced keyboard re-show latency from 400–800ms to approximately 30ms via `FlutterEngineCache`, and cut MethodChannel traffic 5–10× during fast typing through 18ms frame-aligned text batching.
- Built a real-time AI text manipulation system reading from and writing to Android `InputConnection` APIs, routing text through Deno Supabase Edge Functions to Google Gemini 2.5 for in-place rewrite, translation, and speech cleanup without leaving the keyboard.
- Engineered a continuous Arabic/English dictation engine bridging Android `SpeechRecognizer` to Flutter via MethodChannel, implementing transcript merging across recognition restarts and a bounded auto-recovery loop capped at 3 attempts per 20-second window.
- Designed a dual-entry-point Flutter binary (`main()` + `keyboardMain()`) enabling a companion app and a live IME to share a single Dart codebase across separate engine isolates with SharedPreferences-based cross-isolate state synchronization.
- Deployed Deno Supabase Edge Functions with cascading Gemini model fallback (Flash-Lite → Flash → Pro), normalizing three distinct response formats, plus a separate IAP receipt verification function for Google Play Billing.
- Implemented a full monetization layer — Supabase Auth, Google Play IAP, AdMob rewarded ads, and a server-side PostgreSQL credit ledger — behind port/adapter interfaces defaulting to fakes in development, enabling UI iteration with zero real network dependencies.

---
---

# 3. QuickChargingPOS

**Client:** QSERV (employment project)
**Market:** Saudi Arabia — fuel and EV charging stations
**Hardware target:** Sunmi Android POS terminals

## Summary

QuickChargingPOS is a premium React Native point-of-sale application for fuel and EV charging stations in the Saudi market. It gives station attendants a streamlined interface to manage fuel dispensing, accept payments, and print receipts directly from Android-based POS terminals, and gives station managers a dashboard to monitor tank levels, track sales, and log fuel deliveries.

The core engineering value lies in its high-speed hardware integrations — specifically bypassing cloud payment gateway latency entirely through App-to-App Android Intent communication — and its offline capability in an environment where connectivity is genuinely unreliable.

## Status

Deployed to physical Sunmi POS terminals in production use.

## Role

Built the React Native application, authored the custom Java native modules for payment and printing, designed the offline delivery manager, and integrated with the QuikCompany .NET backend.

## Tech Stack

| Layer | Technologies |
|---|---|
| Languages | TypeScript, Java (native Android) |
| Runtime / Framework | React Native 0.83.1, React Navigation 7 |
| Local storage | AsyncStorage (offline caching) |
| Auth | Basic Authentication (hardcoded API header — see debt) |
| Deployment | Android APK targeting POS hardware terminals |
| External APIs | QuikCompany .NET API |
| Testing | Jest, React Test Renderer |
| Tooling | Metro, ESLint, Prettier, Babel, Patch-Package |

## Architecture

A standalone mobile application with specialized native Android modules, heavily coupled to POS hardware.

- **Frontend:** React Native UI divided into two domains — Attendant Operations (fueling, payment, printing) and Station Management (dashboard, tanks, deliveries)
- **Native bridge:** direct integration with device hardware (Sunmi printer) and other installed apps (Nami POS) via custom Java modules
- **Data flow:** the app fetches station hierarchy (tanks, nozzles, prices) from the central API. On transaction, it triggers a local Android Intent to the Nami payment app. On payment success, it commands the local thermal printer and asynchronously posts the transaction record to the .NET backend.

```
QuickChargingPOS/
├── android/
│   ├── app/src/main/java/com/quickchargingpos/   # NamiPayModule.java (App-to-App intent logic)
│   └── app/libs/                                  # SkyBandSDK-release.aar
├── src/
│   ├── api/           # Axios config, quickApi.ts, TypeScript interfaces
│   ├── components/    # StatusBadge, WalletGauge
│   ├── context/       # StationDataContext
│   ├── native/        # NativeModules TS wrappers (NamiPay.ts)
│   ├── navigation/    # React Navigation stacks and tabs
│   ├── screens/       # Admin, Fueling, Payment, Station Management
│   └── utils/         # Business logic, offline delivery manager, sunmiPrinter.ts
├── patches/           # patch-package fixes (sunmi-inner-printer)
└── docs/
```

## Data Models

- **Transaction** — `stationId`, `nozzleNumber`, `paymentMethod` (mada, cash, etc.), `totalVolume`, `totalAmount`, offline-generated UUID
- **Station Hierarchy** — nested: a `Station` has `Dispensers`, which have `Nozzles`, mapped to `Tanks`
- **Tank** — `capacity`, `currentVolume`, `fuelType`, physical limits
- **FuelDeliveryRecord** — `volumeBefore`, `volumeAdded`, `totalCost`, `syncStatus`; persisted in AsyncStorage to handle offline deliveries

## API Surface

Base: `https://quikcompany-001-site1.ctempurl.com/api`

| Endpoint | Purpose |
|---|---|
| `GET /Transaction/GetstationInfo` | Fetch tanks, nozzles, dispensers, current fuel prices |
| `GET /StationHierarchy` | Legacy fallback for dispenser/nozzle mappings |
| `POST /Transaction/PrintSell` | Submit completed transaction (client UUID for idempotency) |
| `GET /Transaction/GetSellFuel` | Historical transaction list |

## Key Technical Decisions

**App-to-App payment Intent over cloud gateway API.** Cloud payment APIs introduce 3–5 seconds of latency. In a fuel station where attendants process a queue of vehicles, that is unacceptable. `NamiPayModule.java` sends an Android Intent directly to the locally installed Nami POS app, initiating payment instantly.

**Local storage for technician configuration.** Rather than hardcoding the API URL or forcing repeated login, `@qserv_technician_config` in AsyncStorage binds the terminal permanently to a specific physical station with a dynamic `baseUrl`, radically simplifying deployment across locations.

**Offline-first fuel deliveries.** Gas stations frequently lose internet. `deliveryManager.ts` caches deliveries locally (capped at 50 records) so managers can receive fuel trucks regardless of connectivity.

## Hard Problems Solved

**Secure App-to-App payment communication.** The Nami POS app requires a securely signed binary payload to reject fraudulent payment requests, and standard React Native cannot interface with the required `SkyBandSDK`. The solution was authoring a custom React Native Java module (`NamiPayModule.java`) that dynamically generates an `ecr-txn-event` Intent, constructs the transaction payload, calculates a **SHA-256 HMAC signature** from the terminal ID and ECR reference, packs it into a byte array using the SDK, and launches the activity.

**Thermal printing from React Native.** React Native lacks native support for ESC/POS thermal commands, and Sunmi hardware requires proprietary service bindings. Integrated `react-native-sunmi-inner-printer` with a custom patch and built a wrapper (`sunmiPrinter.ts`) handling column alignment, double-width fonts for totals, and graceful degradation to console logging on non-Sunmi emulators.

## External Integrations

- **Nami POS (SkyBand)** — separate Android app on the terminal, processes EMV/NFC card payments via `startActivityForResult`. If unavailable, card payments are entirely blocked.
- **Sunmi Inner Printer** — proprietary hardware thermal printer for customer receipts and delivery summaries.
- **QuikCompany API** — central .NET backend for transaction sync, prices, and station hierarchy.

## Known Limitations & Technical Debt

- **Hardcoded security credentials** — `quickApi.ts` uses a hardcoded Basic Auth token; `NamiPayModule.java` uses hardcoded test values (`TEST_CASH_REGISTER_NO`, `TEST_TERMINAL_ID`) for payment signature generation. Both must be made dynamic before broader production rollout.
- **Error handling** — API failures rely on `console.error` rather than propagating user-friendly error boundaries to the UI.
- **Platform coupling** — strictly Android. The iOS folder exists but lacks native printer and payment SDK implementations.

## CV / Portfolio Bullets

- Engineered a React Native point-of-sale application deployed on Sunmi Android POS terminals for Saudi fuel and EV charging stations, managing real-time transactions and hardware integrations.
- Architected a custom Java native module bridging the SkyBand SDK, eliminating 3–5 seconds of cloud gateway latency by dispatching SHA-256 HMAC-signed App-to-App Android Intents for secure EMV/mada transactions.
- Implemented offline-first fuel delivery tracking via AsyncStorage, ensuring continuous station operations during network outages.
- Integrated proprietary Sunmi thermal printing with a custom-patched native binding, generating localized, column-aligned receipts directly from the device.

---
---

# 4. MedConnect Egypt

**Domain:** Healthcare / B2B2C marketplace
**Market:** Egypt

## Summary

MedConnect is a digital B2B2C medical referral platform designed to transform the healthcare referral system in Egypt. It solves referral leakage, lost revenue for referring doctors, and fragmented patient medical histories. Through a closed-loop digital ecosystem, primary physicians instantly refer patients to trusted specialists, transfer medical snapshots, and automatically track and receive referral commissions, while patients receive exclusive discounts.

## Status

MVP built. Several modules (OCR transcription queue, laboratory integrations, live payment gateway processing) are planned or stubbed rather than fully implemented.

> **Portfolio accuracy note:** the architecture is a **monolithic NestJS API inside an npm-workspaces monorepo** — it is *not* a microservices architecture. Public descriptions should say "monorepo with a NestJS API and React Native client," not "NestJS Microservices."

## Tech Stack

| Layer | Technologies |
|---|---|
| Language | TypeScript |
| Runtime / Framework | Node.js, NestJS (backend), React Native / Expo (mobile) |
| Databases | PostgreSQL via TypeORM, Redis |
| Auth | JWT, Passport, bcrypt |
| Infrastructure | Docker (local DB/Redis), AWS/Azure (planned) |
| External APIs | AWS Textract OCR (planned), Stripe/Paymob (planned), FCM push (planned) |
| Testing | Jest, Supertest |
| Tooling | npm workspaces monorepo, ESLint, Prettier |

## Architecture

A monorepo containing a **monolithic NestJS backend API** and a React Native Expo mobile application.

- **Backend API** — authentication, doctor/patient management, referral tracking, geofencing validation, digital wallet and commission ledger. PostgreSQL for persistent relational data, Redis for caching and sessions.
- **Mobile app** — interface for doctors to create referrals, upload prescription images, and view wallets; plus an interface for clinic secretaries handling patient check-ins.

**Data flow:** doctor creates a referral (optionally uploading a prescription image) → patient arrives at specialist → secretary performs a geofenced check-in → system triggers real-time notifications, logs the visit, and credits the referring doctor's digital wallet.

```
/
├── apps/
│   ├── api/                      # NestJS backend
│   │   ├── src/auth/             # JWT authentication and guards
│   │   ├── src/database/         # TypeORM config, migrations, entities
│   │   ├── src/referrals/        # Referral logic, prescription uploads
│   │   └── src/wallet/           # (Planned) wallet and transaction logic
│   └── mobile/                   # React Native Expo app
│       ├── src/components/
│       ├── src/screens/          # Login, Dashboard, CreateReferral
│       └── src/services/
├── packages/shared/              # Shared types (currently empty)
├── docker-compose.yml
└── package.json
```

## Data Models

- **User** — all platform actors (doctors, secretaries, admins). Role enum, one-to-one with `Wallet`.
- **Patient** — National ID stored as an AES-256 encrypted byte array (`nationalIdEncrypted`) plus a separately hashed string (`nationalIdHash`) for indexing.
- **Referral** — from `referringDoctor` to `specialist` for a `patient`. Status, discount codes, prescription image URLs, check-in metadata (location, time).
- **Transaction** — ledger entry for financial movements (commissions, withdrawals). Links to a `User` and optionally a `Referral`.
- **Wallet** — current balance, pending commissions, total earned/withdrawn per `User`.

## API Surface

All routes require JWT auth unless marked Public.

**Auth:** `POST /auth/register` (Public), `POST /auth/login` (Public), `POST /auth/refresh`, `GET /auth/me`
**Referrals:** `POST /referrals`, `GET /referrals`, `GET /referrals/statistics`, `PATCH /referrals/:id/status`, `POST /referrals/:id/prescription`
**Doctors:** `GET /doctors` (Public), `GET /doctors/me`

## Key Technical Decisions

**AES-256 encryption with parallel deterministic hashing for patient IDs.** Medical data privacy requires the National ID be encrypted at rest, but encryption makes the database unsearchable — you cannot answer "does this patient already exist?" with a standard SQL equality check. The dual-column approach stores the fully encrypted ID for retrieval and a deterministic SHA-256 hash for unique indexing and fast `WHERE` lookups.

**Double-handshake and geofencing.** To prevent fraudulent referral check-ins, the system validates the physical GPS coordinates of the clinic secretary during patient check-in.

**npm workspaces monorepo.** Chosen to share TypeScript interfaces, DTOs, and validation schemas between the NestJS backend and React Native frontend, reducing duplication.

**Digital wallet ledger over per-transaction payouts.** Rather than processing a micro-transaction to a bank account for every referral, the system credits a virtual wallet. This minimizes payment gateway fees and enables weekly/monthly bulk settlements.

## Hard Problems Solved

**The "lazy doctor" data entry challenge.** Doctors rely on quick handwritten prescriptions and resist complex data entry. Rather than fighting that behavior, the system lets doctors photograph the handwritten prescription during referral creation. The image is queued for a hybrid AI OCR plus human-in-the-loop transcription process, converting it to structured digital records **without changing the doctor's physical workflow at all**.

**System bypass and referral leakage.** Once a connection is made, patients or specialists might bypass the platform to avoid the commission. Solved with a unique "Referral Code" giving the patient an exclusive discount valid *only* if checked in through the app — the patient effectively becomes the auditor enforcing platform compliance. This is an incentive-design solution to a technical enforcement problem.

**Storing PII securely while retaining searchability.** Covered above under key technical decisions; the dual-column encrypted + deterministic-hash pattern is the answer.

## Known Limitations & Technical Debt

- **Static encryption keys** — the Patient entity derives AES keys from a static hardcoded secret (`'medconnect-secret-key'`). A development placeholder that must be replaced with a proper KMS before production.
- **MVP state** — OCR transcription queue, laboratory integrations, and live payment gateway processing are planned or stubbed.
- **Shared types** — `packages/shared` is empty; DTOs and models are likely duplicated between API and mobile.

## CV / Portfolio Bullets

- Architected a closed-loop B2B2C medical referral platform using NestJS and React Native to digitize patient handoffs, prevent referral leakage, and automate commission tracking.
- Engineered a secure patient identity system using AES-256 encryption for National IDs alongside deterministic SHA-256 hashing, balancing strict medical data privacy with O(1) database lookups.
- Designed a geofenced, double-handshake check-in system validating physical clinic presence to prevent referral fraud in a multi-sided healthcare marketplace.
- Developed a real-time digital wallet and transaction ledger using PostgreSQL and TypeORM to manage commission distribution with auditable, batch-processed settlements.

---
---

# 5. Focus Ritual

**Domain:** EdTech / AI-augmented learning
**Deployment:** Vercel (frontend) + Render (backend) + MongoDB Atlas + Google Cloud Storage

## Summary

Focus Ritual is an AI-augmented learning management system for students and self-directed learners, consolidating studying, productivity tracking, and social accountability in one platform. The core loop is: upload a PDF lecture → AI extracts flashcards and generates a study plan → review flashcards via spaced repetition → track focus sessions with a Pomodoro timer → earn XP and achievements → study with peers in a real-time collaboration room.

It is not a generic note-taking app or a reskinned Anki. It integrates Google Gemini 1.5 Pro for on-demand document Q&A, flashcard generation, and personalized learning paths, and layers a full social graph — friend requests, feed, private messaging — over the study workflow.

## Tech Stack

| Layer | Technologies |
|---|---|
| Languages | JavaScript (Node backend), TypeScript (React frontend + shared package) |
| Runtime / Framework | Node.js 18+, Express 5.1.0, React 18.3.1, Vite 5.4.2 |
| Database | MongoDB Atlas via Mongoose 8.0.3 |
| Auth | Passport.js (JWT + Local strategies), bcryptjs 3.0.2, refresh token cookies |
| Infrastructure | Render (backend), Vercel (frontend), MongoDB Atlas, Google Cloud Storage |
| External APIs | Google Gemini 1.5 Pro, Google Cloud Storage (signed URLs), Nodemailer via Gmail SMTP |
| Testing | None present |
| Tooling | npm workspaces monorepo, `concurrently`, `nodemon`, Render YAML IaC, UptimeRobot keep-alive |

## Architecture

Monorepo with three packages via npm workspaces:

```
FR-NEW/
├── apps/backend/     ← Express REST API + Socket.io server
├── apps/web/         ← React SPA
└── packages/shared/  ← Shared TypeScript interfaces
```

Deployment topology:

```
Browser
  │
  ├─ HTTPS ──► Vercel (React SPA, static)
  │              │
  │              ├─ REST (axios) ──► Render (Express, port 5001)
  │              │                     ├─ MongoDB Atlas
  │              │                     ├─ Google Cloud Storage
  │              │                     └─ Gemini 1.5 Pro
  │              │
  └─ WebSocket ──► Same Render instance (Socket.io)
```

**Primary data flow — PDF to flashcards:**
1. Frontend uploads PDF via multipart POST to `/api/library`
2. Backend stores the file in GCS, records an `UploadedFile` document in MongoDB
3. Client POSTs to `/api/ai/analyze-pdf` with the file reference
4. Backend fetches the PDF from GCS, extracts text via `pdf-parse`, sends to Gemini
5. Gemini returns structured flashcards and summary JSON
6. Backend persists `Flashcard` documents; content bodies go to GCS, not MongoDB
7. Frontend polls the flashcard list; GCS signed URLs are returned for content retrieval

**Real-time layer:** Socket.io rooms map to in-memory `rooms{}` objects on the Express process. No Redis or external pub/sub — all room state is process-local.

## Data Models

- **User** — embedded `settings` (privacy) and a `friends: [ObjectId]` array. No join table; mutual friendship enforced at the application layer. `friendRequests` is a subdocument array on the receiving user only.
- **Subject → Lecture → (Note | Flashcard | QASession | LearningPath)** — hierarchical content tree with foreign keys stored on the child.
- **Stats** — a single document per user aggregating tasks, habits, XP, level, daily activity (`Map<dateString, ActivityObject>`), and unlocked achievement IDs.
- **Flashcard** — SM-2 fields inline: `easeFactor` (default 2.5), `interval` (days), `repetitions`, `nextReview`. Card `front`/`back` text lives in GCS; the document holds the GCS path plus a `contentStoredInCloud` flag.
- **Post** — self-referential via `parentId` for threaded comments, no depth limit enforced.
- **LibraryFolder** — self-referential via `parent_id`; a `path` field stores the materialized path for breadcrumbs without recursive queries.
- **Achievement** — `criteria` is `Mixed` (schema-less), allowing heterogeneous achievement types without a polymorphic hierarchy.

## API Surface

All routes prefixed `/api/`. JWT required except `/api/auth/register`, `/login`, `/forgot-password`, `/reset-password`.

**Auth:** `POST /register`, `POST /login`, `GET /me`, `POST /refresh`, `POST /logout`, `POST /forgot-password`, `PUT /reset-password`
**Library:** `POST /upload`, `GET /files`, `GET /files/:id/url`, `POST /folders`, `GET /folders`, `PUT /folders/:id`, `DELETE /folders/:id`
**AI:** `POST /analyze-pdf`, `POST /document-qa`, `POST /generate-flashcards`, `POST /learning-path`, `POST /analyze-notes`
**Stats:** task CRUD, habit CRUD, focus session recording, XP updates, achievements, leaderboard
**Social:** `/api/friends`, `/api/messages`, `/api/feed`
**Content:** `/api/subjects`, `/api/notes`, `/api/flashcards` (including `POST /:id/review` applying SM-2), `/api/qa-sessions`, `/api/learning-paths`

## Key Technical Decisions

**1. Note and flashcard content in GCS, not MongoDB.** AI-generated flashcard sets from large PDFs can exceed MongoDB's 16 MB document limit. Each Mongoose document stores only a `cloudPath` string and a `contentStoredInCloud` boolean. Tradeoff: every content read requires a GCS signed-URL round trip.

**2. In-memory Socket.io room state.** `rooms{}`, `socketToRoom{}`, `activeChats`, and `connectedUsers` are plain JS objects and Maps on the Express process, avoiding Redis complexity on Render's free tier. Explicit tradeoff: an instance restart wipes all room state.

**3. Stats as one aggregated document per user.** All productivity data is one `findOne({userId})` away. Cost: unbounded subdocument array growth and no DB-layer pagination.

**4. EventEmitter-based achievement engine.** `achievement.service.js` extends `EventEmitter`. Controllers emit domain events (`focus:session:completed`, `task:completed`) rather than calling achievement logic directly, decoupling gamification from business logic. Tradeoff: events are not persisted — a handler throw loses the achievement silently.

**5. Express 5.x rather than 4.x.** Built-in async error propagation removes the need for `next(err)` in async routes, though Express 4-era middleware may behave differently.

**6. npm workspaces over Turborepo/Nx.** Symlink-based resolution without a build tool layer; no incremental caching or task graph.

**7. Render free tier plus UptimeRobot keep-alive.** A `/ping` endpoint with an external monitor every 5 minutes prevents spin-down, at the cost of consuming free-tier compute continuously.

## Hard Problems Solved

**AI-generated content exceeding MongoDB document limits.** Gemini 1.5 Pro, given a dense 80-page PDF, can return 200+ flashcards with detailed explanations. The naive approach (plain strings in MongoDB) fails at scale; chunking into many small documents creates N+1 query problems on list views. The hybrid solution — metadata plus SM-2 fields in MongoDB, content bodies in GCS, lazy per-card fetch via signed URL, with a `contentStoredInCloud` flag enabling inline fallback for small cards — resolves both.

**SM-2 spaced repetition implemented from specification.** The algorithm has exact formulae for ease factor adjustment (`EF' = EF + (0.1 - (5-q)(0.08 + (5-q)*0.02))`), a minimum EF floor of 1.3, interval resets on failure, and graduated interval growth. Off-by-one errors in day calculations surface cards too early or too late and degrade the learning curve. Implemented directly in `flashcard.controller.js` with quality score 0–5 mapping to ease factor delta.

**Real-time presence across disconnects and multi-tab sessions.** A naive `user → socket` map marks a user offline the moment any socket disconnects, even with other tabs still open. Solved with `connectedUsers: Map<userId, Set<socketIds>>` — the user is only marked offline when the set empties.

**Midnight habit reset without double-processing.** A `0 0 * * *` cron in a process that can restart at any moment risks re-zeroing already-reset habits. `scheduler.js` compares `lastCompleted` dates rather than blindly resetting, making the job idempotent for the same UTC day. Streak penalties apply the same guard.

**PDF text extraction for Gemini prompts.** `pdf-parse` strips formatting; dense academic PDFs with equations, tables, and multi-column layouts lose structure. Rather than trying to reconstruct document structure, the extracted text goes to Gemini with a structured prompt instructing the model to infer topic boundaries and generate Q&A pairs regardless of formatting artifacts — **the prompt engineering absorbs the formatting loss.**

## Known Limitations & Technical Debt

- **In-memory Socket.io state** — any restart wipes active rooms and presence; horizontal scaling impossible without Redis pub/sub
- **Stats document growth** — `tasks` and `habits` subdocument arrays have no pruning; three years of daily tasks would produce thousands of subdocuments
- **No test suite** — zero unit, integration, or E2E tests; every change validated manually
- **Hardcoded Gemini API key fallback** in `gemini.service.js` — a production security risk if the repo is public
- **No database indexes beyond unique constraints** — high-traffic queries (flashcards by lectureId+userId, messages by sender/recipient, posts by userId sorted by date) are likely collection scans
- **Render free tier cold starts** — 15-minute spin-down mitigated by continuous pinging, which consumes the monthly allotment
- **No input validation middleware** — no Joi/Zod/express-validator schema layer; validation is ad hoc in controllers
- **Email is a single point of failure** for password reset — no backup provider or retry queue

## CV / Portfolio Bullets

- Architected a full-stack AI-powered learning management system using React 18, Express 5, MongoDB, and Google Gemini 1.5 Pro, handling the complete pipeline from PDF upload through AI-generated flashcard extraction to spaced repetition review.
- Implemented the SM-2 spaced repetition algorithm from specification, storing per-card ease factor, interval, and repetition count and computing next-review dates on each interaction.
- Designed a hybrid content storage architecture offloading note and flashcard bodies to Google Cloud Storage with V4 signed URLs, solving MongoDB's 16 MB document size limit for AI-generated content sets.
- Built a real-time collaboration system with Socket.io supporting study rooms, private messaging, typing indicators, and multi-tab presence tracking via a `Map<userId, Set<socketIds>>` structure preventing false offline events.
- Engineered a decoupled gamification engine using Node.js EventEmitter awarding XP, unlocking achievements across 7 categories, and delivering real-time notifications without coupling achievement logic to business controllers.

---
---

# 6. Classroom Sentinel

**Type:** Self-hosted automation service
**Runtime:** Long-running Python polling bot on a personal home server

## Summary

Classroom Sentinel is a single-process Python Telegram bot that continuously monitors selected Google Classroom courses across **multiple Google identities**, classifies new announcements and coursework, extracts and stores deadlines in SQLite, and pushes time-sensitive notifications — including 24-hour and 2-hour reminders — to one authorized Telegram user. Its core value is reducing missed academic tasks by converting noisy classroom feeds into structured, prioritized, actionable alerts.

## Tech Stack

| Layer | Technologies |
|---|---|
| Language | Python (async-heavy) |
| Runtime / Framework | asyncio, python-telegram-bot (Application, CommandHandler, ConversationHandler, JobQueue), python-dotenv |
| Database | SQLite via aiosqlite (`sentinel.db`) |
| Auth | Google OAuth2 (token files + refresh flow), Telegram chat ID allowlist (`authorized_only`) |
| Infrastructure | Long-running polling process, headless server operation, systemd-managed host |
| External APIs | Google Classroom API, Google Gemini API (google-genai), Telegram Bot API |
| Testing | None |
| Tooling | None — no CI, formatter, linter config, packaging metadata, or lock file |

## Architecture

Monolithic bot service implemented in one runtime module (`sentinel.py`). Asynchronous orchestration wraps blocking SDK calls via `asyncio.to_thread`, with local SQLite as the source of truth for tracked courses, ingested announcements, and reminder state.

```
Google Classroom API (announcements/coursework/materials)
                    │
                    ▼
        Fetch + normalize in process_announcements()
                    │
      ┌─────────────┴─────────────┐
      ▼                           ▼
 Gemini classification      Native coursework parsing
 (announcements only)       (title/dueDate/dueTime)
      │                           │
      └─────────────┬─────────────┘
                    ▼
            SQLite (sentinel.db)
     target_courses / announcements / deadlines
                    │
      ┌─────────────┴──────────────┐
      ▼                            ▼
 Immediate urgent pushes      Scheduled reminder pushes
 (HIGH/MEDIUM urgency)        (24h and 2h windows)
                    │
                    ▼
              Telegram user
```

**Scheduling:** sync every 1800s, reminders every 1800s, morning briefing daily at 08:00 UTC.

## Data Models

**`target_courses`** — `course_id` (TEXT PK), `course_name`, `account_type` (`Personal` or `University` token source)

**`announcements`** — `id` (TEXT PK), `course_id`, `tag` (classification category), `summary`, `action` (nullable), `raw_text`, `timestamp`

**`deadlines`** — `id` (INTEGER PK AUTOINCREMENT), `announcement_id`, `course_id`, `task`, `due_date`, `alert_24h_sent`, `alert_2h_sent`, `completed`

Non-obvious constraints: `deadlines` and `announcements` use soft links only — no enforced foreign keys, so orphan rows are possible under manual editing. Deduplication depends on checking `announcements.id`, which is the idempotency guard for polling loops. Reminder idempotency depends on both boolean flags and threshold logic rather than a separate event log table.

## Command Interface

No HTTP REST API. The primary surface is a Telegram command interface plus callback query actions, all gated by `authorized_only`.

| Group | Command | Purpose |
|---|---|---|
| Lifecycle | `/start` | Confirm bot readiness |
| Lifecycle | `/health` | Report CPU, RAM, DB size |
| Courses | `/track` | Conversation to fuzzy-match and add a course |
| Courses | `/untrack <n>` | Confirm and remove one tracked course |
| Courses | `/courses` | List tracked courses |
| Courses | `/clearcourses` | Confirm and clear all |
| Sync | `/sync` | Manual 1-day sync run |
| Sync | `/catchup [days]` | Historical backfill |
| Feed | `/stream` | Interactive 7-day stream for one course |
| Feed | `/digest [days]` | Cross-course digest |
| Deadlines | `/due` | Upcoming deadlines (next 10 days) with inline actions |
| Deadlines | `/reminders` | Show armed reminders |
| Search | `/links` | Last session-link summaries |
| Search | `/search <keyword>` | Search summary/raw_text |
| Search | `/dashboard` | Counts of courses, active deadlines, 24h announcements |

**Callback actions:** `untrack_<course_id>`, `clear_all`, `done_<deadline_id>`, `info_<deadline_id>`

## Key Technical Decisions

- **SQLite over a hosted database** — keeps deployment lightweight and colocates scheduling logic with bot command state
- **DB-backed reminder state flags** (`alert_24h_sent`, `alert_2h_sent`, `completed`) over stateless recomputation or a separate notification ledger — flags provide simple idempotency and suppress duplicate alerts across polling cycles
- **Single-recipient security model** using a `TELEGRAM_CHAT_ID` allowlist rather than multi-user RBAC — the deployment serves one owner and prioritizes strict rejection of all others

## Hard Problems Solved

**Keeping OAuth-authenticated Google API access alive in a headless long-running process.** Standard OAuth flows assume an interactive browser; blindly invoking one during token expiry can deadlock or crash unattended jobs. `get_classroom_service_sync()` distinguishes interactive from background contexts and, on refresh failure in non-interactive mode, raises `AuthRequiredError` so the runtime notifies the operator instead of freezing.

**Extracting reliable deadlines from mixed Classroom content types.** Free-text announcements are ambiguous and inconsistent, while coursework payloads contain structured due-date fields that should never be approximated by an LLM. The pipeline parses coursework and material items natively from API fields and sends *only* announcement text to Gemini, with strict JSON schema output and enum constraints. This is the clearest expression of the surgical-LLM principle in the portfolio.

**Preventing alert spam and duplicate processing across repeated polling cycles.** Scheduled loops revisit overlapping time windows and repeatedly encounter the same posts. The code checks announcement ID existence before insert, stores alert state flags per deadline, and gates reminder sends on both time-window conditions and prior-send flags.

**Managing data from multiple Google accounts under one unified workflow.** Courses are fetched per account and per token, but tracking and commands need a single coherent list. `target_courses` stores `account_type` with each tracked course; all fetch flows route through account-specific token files while the command UX stays unified.

## External Integrations

| Service | Use | Non-obvious quirk | Failure impact |
|---|---|---|---|
| Google Classroom API | Course listing, announcements, coursework, materials, profile lookup | Dual account token files mapped by logical labels (`Personal`, `University`) | Content ingestion, stream/digest, author resolution stop |
| Google OAuth2 | Obtain/refresh credentials, persist token JSON | `OAUTHLIB_RELAX_TOKEN_SCOPE=1` set to reduce failures as scopes evolve | Classroom integration fails; bot runs but cannot sync |
| Google Gemini | Classify announcement urgency/tags, extract deadlines from free text | Schema-constrained JSON output, model fallback on `429` | Classification quality drops; non-coursework deadline extraction skipped |
| Telegram Bot API | Command interface, callbacks, scheduled delivery | Security enforced at handler level via `authorized_only` | No control plane or notification channel |
| `psutil` | `/health` telemetry only | DB size read directly from filesystem | Health diagnostics degrade only |

## Environment & Configuration

| Variable | Controls | Required |
|---|---|---|
| `TELEGRAM_TOKEN` | Bot initialization | Yes |
| `TELEGRAM_CHAT_ID` | Authorization gate and notification target | Yes |
| `GEMINI_API_KEY` | Gemini classification | Optional — classification skipped if absent |
| `GOOGLE_APP_CLIENT_ID` | Present in `.env` but not read in code | No |

Non-env config: `credentials.json` (OAuth client secrets), `token_personal.json` / `token_uni.json`, `sentinel.db`, 7 Classroom read-only OAuth scopes.

## Known Limitations & Technical Debt

1. **Secrets hygiene risk** — `.env` is committed in-repo with live-looking credentials. Major operational and security debt; requires key rotation and git history purging if the repo is public.
2. **Monolithic maintainability** — auth, DB, API clients, handlers, and jobs all live in one file, making testing and change isolation difficult
3. **Missing engineering scaffolding** — no tests, CI, linting/format config, or dependency lock/manifest
4. **Weak relational integrity** — no enforced foreign keys or indexes on join-heavy paths
5. **Broad exception handling** — several `except Exception` blocks swallow root causes and can hide data-quality issues
6. **Operational coupling** — polling, scheduling, and Telegram lifecycle are tightly coupled; no graceful shutdown beyond process exit
7. **Inconsistent versioning** — docs reference V6.1/V6.3 while the runtime startup message says V6.2

## CV / Portfolio Bullets

- Architected an asynchronous Python Telegram bot ingesting Google Classroom announcements and coursework every 30 minutes and persisting normalized state in SQLite for reminder automation.
- Implemented a hybrid intelligence pipeline combining native Classroom due-date parsing with Gemini schema-constrained JSON classification for noisy free-text announcements.
- Designed and shipped an idempotent reminder engine with DB-backed 24-hour and 2-hour threshold alerts plus inline completion actions suppressing duplicate notifications.
- Engineered a headless-safe OAuth workflow with explicit interactive/background modes and operator-facing recovery alerts, preventing unattended service lockups.
- Built a unified multi-account course tracking flow with fuzzy course matching and conversational Telegram UX for track/untrack, digest, stream, and deadline management.

---
---

# 7. FitForge

**Type:** Cross-platform mobile fitness application
**Platforms:** iOS and Android

## Summary

FitForge is a cross-platform mobile fitness application built to remove guesswork from personal training. Instead of offering generic workout templates or requiring an expensive personal trainer, FitForge generates fully personalized workout programs based on each user's goal, available equipment, and schedule, then guides them through every session in real time, tracking every set, rep, and rest period.

The positioning is deliberate: most fitness apps hand users an exercise library and leave programming to them. FitForge inverts this — the user answers a short onboarding sequence and the app takes complete ownership of building the program. Volume, intensity, exercise selection, rest days, and progressive overload are all handled automatically.

## Status

Fully built and deployed. Available on iOS and Android with the backend hosted on AWS.

## Tech Stack

### Mobile client
- **Flutter** — single codebase for iOS and Android, chosen for its rendering engine and suitability for animated, interaction-heavy fitness UIs (rest timers, exercise carousels, progress charts)
- **Riverpod** — state management for workout session state, user profile, and real-time set logging
- **flutter_local_notifications** — rest timer alerts and session reminders
- **fl_chart** — weekly volume graphs, body weight trends, workout frequency calendars
- **Hive** — lightweight local NoSQL storage for offline workout logging; sessions save locally first, then sync

### Backend
- **Node.js + Express** — REST API for authentication, program generation, and persistence
- **MongoDB + Mongoose** — user profiles, generated programs, session logs, exercise libraries; the flexible schema suits varied workout data structure
- **Redis** — caching frequently accessed exercise data and program states, reducing DB reads during active sessions
- **JWT + bcrypt** — stateless auth with secure password hashing

### Program generation
- **Custom rule-based engine (Node.js)** — a deterministic engine applying established sports science: periodization models, volume landmarks per muscle group (MEV/MAV/MRV), and progressive overload schemes. **Explicitly not an LLM** — a structured algorithm guaranteeing reproducible, evidence-based output.

### Infrastructure
AWS EC2 (application server), AWS S3 (exercise demonstration media), MongoDB Atlas (managed DB with automated backups), CloudFront CDN (global static asset delivery), GitHub Actions (CI/CD on push to main)

## How the System Works

### 1. Onboarding and program generation

A 4-step onboarding flow captures:
- **Goal:** muscle gain, fat loss, or maintenance
- **Equipment:** full gym, home with dumbbells, or bodyweight only
- **Frequency:** 3, 4, 5, or 6 days per week
- **Experience:** beginner, intermediate, or advanced

The backend maps these inputs against training templates and the exercise database, selects an appropriate split (Push/Pull/Legs for 5–6 days, Upper/Lower for 4, Full Body for 3), assigns exercises per session, and sets starting volume and intensity. The full program — typically a 4–8 week mesocycle — returns to the app and is stored in both MongoDB and locally via Hive.

### 2. Active workout session

Each exercise presents target sets, rep range, and a recommended starting weight. The user logs actual weight and reps per set. A configurable rest timer starts automatically. **Session state is maintained entirely in local Hive storage during the workout**, so a connectivity drop never interrupts a session. Data syncs to MongoDB on completion.

### 3. Progressive overload logic

After each completed session, the backend evaluates performance: if the user hit the top of the rep range on all sets of an exercise, that exercise is flagged for a weight increase next session; if they fell short, weight holds. This runs server-side and updates the stored program, so updated weights are already reflected the next time the app opens.

### 4. Progress tracking

The progress tab pulls aggregated session data and renders client-side with fl_chart:
- Weekly volume chart — total sets per muscle group per week
- Strength trend — best set weight over time for key lifts
- Streak calendar — visual heatmap of training consistency
- Body weight log — optional manual entry with trend line

### 5. Offline-first architecture

The current program, exercise library, and session history cache locally in Hive. Sync operations queue and execute on reconnect. This makes the app reliable in basement gyms, in transit, and anywhere connectivity is poor — precisely where fitness apps are actually used.

## Hard Problems Solved

**Offline-first sync conflict resolution.** When a session logged offline syncs to the server, it may conflict with server-side program updates that occurred in the meantime. The resolution strategy prioritizes local session data — **the ground truth of what actually happened in the gym** — and merges server updates for future sessions only. This is the correct semantic choice, not just a technical one.

**Program generation correctness.** The engine must respect hard constraints: never placing two sessions training the same muscle group on consecutive days, distributing volume across the week according to recovery requirements, and matching the exercise pool exactly to the user's equipment availability.

**Real-time rest timer accuracy.** Flutter's timer behavior is unreliable when the app is backgrounded. The app combines `flutter_local_notifications` with timestamp-based elapsed time calculation to guarantee timer accuracy regardless of app state.

## CV / Portfolio Bullets

- Built and deployed a cross-platform Flutter fitness application to iOS and Android generating fully personalized training programs from a 4-step onboarding flow.
- Engineered a deterministic rule-based program generation engine in Node.js encoding periodization models and MEV/MAV/MRV volume landmarks, guaranteeing reproducible evidence-based output without LLM dependency.
- Implemented an offline-first architecture using Hive local storage where full workout sessions execute without connectivity, with a conflict resolution strategy prioritizing locally logged sessions as ground truth.
- Designed server-side progressive overload logic evaluating per-set performance against rep-range targets and automatically adjusting prescribed load for subsequent sessions.
- Solved background timer drift in Flutter by combining local notifications with timestamp-based elapsed time calculation for accurate rest periods regardless of app state.

---
---

# 8. StayEase

**Type:** Full-stack hotel discovery and booking web platform

## Summary

StayEase is a full-featured hotel booking **web application** connecting travelers with accommodations worldwide. It provides an end-to-end experience — discovery, filtering, booking confirmation, post-stay review — while offering property owners a dedicated host dashboard for listings, availability, and earnings.

The product philosophy is clarity-first, positioned deliberately against platforms that overwhelm users with dozens of filters, opaque pricing, misleading availability, and checkout flows that feel like tax filing. Pricing is transparent from the first card, availability is real-time, and the booking flow is three steps maximum.

> **Portfolio accuracy note:** StayEase is a **web** application (React SPA), not a mobile app. It is currently miscategorized as "mobile" on the portfolio site.

## Tech Stack

### Frontend
- **React.js** — search page, hotel detail views, booking flow, and both guest and host dashboards as independent modules with shared component libraries
- **Redux Toolkit** — global state for search parameters, booking flow, authenticated session
- **React Query (TanStack Query)** — server state, caching of search results, background refetching, loading/error states without useEffect boilerplate
- **React Router v6** — client-side routing with protected routes
- **Leaflet.js + React-Leaflet** — interactive map on search results; markers clustered and updated dynamically as the user pans or filters
- **Tailwind CSS** — utility-first design system

### Backend
- **Node.js + Express** — search queries, booking creation, availability validation, payment orchestration, host management
- **MongoDB + Mongoose** — hotel listings, room types, bookings, user profiles, reviews, host earnings. The document model suits varied property data: a boutique villa and a city-center chain have fundamentally different attributes.
- **Redis** — caching for search results and availability data, the most frequent and performance-sensitive operations
- **Socket.io** — real-time booking confirmation, updating both the guest's confirmation page and the host dashboard without refresh

### Payments
- **Stripe** — guest payments captured at booking and held in escrow; host payouts triggered automatically 24 hours after check-in, minus platform fee. Webhooks handle charge success, failure, and refund events.
- **Stripe Connect** — host onboarding with identity verification, payout bank account management, multi-currency support

### Auth & security
JWT + HTTP-only cookies (preventing XSS token theft), bcrypt, Google OAuth 2.0, express-rate-limit on auth endpoints and booking creation

### Infrastructure
AWS EC2, AWS S3 + CloudFront (photo storage and CDN), MongoDB Atlas with geospatial indexing, AWS Lambda (image processing on upload, scheduled check-in reminders), SendGrid (transactional email), Vercel (frontend with edge caching and PR preview deployments)

## How the System Works

### 1. Hotel search

The user enters destination city, check-in/check-out dates, and guest count. The Express search API executes a geospatial query against MongoDB Atlas using `$near` on stored coordinates, filtering by availability (cross-referenced against the bookings collection), minimum guest capacity, and applied filters (price range, star rating, amenities).

Results cache in Redis with a 5-minute TTL keyed by search parameters; repeat searches bypass MongoDB entirely. Results render simultaneously as a card list and map pins, with Leaflet marker clustering keeping dense city results navigable. Dragging the map updates search parameters and fires a new query bounded to the visible map area.

### 2. Hotel detail page

Fetches full property data: photos, room types with individual pricing and availability, amenities, host profile, and paginated reviews with aggregate rating. **Room availability is queried in real time, deliberately not cached**, to prevent showing availability booked seconds earlier by another user.

The booking summary sidebar is live — selecting a room type or changing dates recalculates total price (nightly rate × nights + cleaning fee + platform service fee) client-side instantly, with final server-side validation at submission.

### 3. Booking flow and availability locking

**Phase 1 — Availability lock.** Before payment, the backend creates a temporary booking reservation in MongoDB with a 10-minute TTL, locking the selected dates for that room type and preventing double-bookings while the user pays. Abandoned flows are cleaned up by a scheduled job that restores availability.

**Phase 2 — Payment and confirmation.** The frontend collects payment via Stripe Elements (card data never touches the application server). The backend creates a PaymentIntent, confirms the charge, and on success upgrades the temporary reservation to a confirmed booking. A Socket.io event updates the host dashboard in real time; SendGrid dispatches confirmation emails to both parties.

### 4. Host dashboard

- **Listings management** — create, edit, deactivate. Multi-step creation form with direct-to-S3 photo upload via pre-signed URLs, room type configuration, pricing rules, amenity tagging.
- **Availability calendar** — visual calendar of confirmed bookings, blocked dates, and open windows. Manual blocks immediately update guest-facing availability.
- **Earnings overview** — monthly gross earnings, platform fees, net payout, linked to Stripe Connect.
- **Booking inbox** — upcoming and past bookings with guest details, special requests, dates.

### 5. Reviews

After checkout, SendGrid triggers a review request. Reviews store in MongoDB linked to both the booking and hotel document; on submission the hotel's aggregate rating recalculates and updates in the hotel document for fast reads. Hosts can respond publicly. Reviews become immutable 72 hours after submission.

## Hard Problems Solved

**Double-booking prevention.** TTL-based temporary reservations combined with MongoDB transactions ensure two simultaneous bookings for the same room on the same dates cannot both succeed, even under concurrent load.

**Geospatial search performance.** MongoDB Atlas geospatial indexes plus Redis caching for repeated queries keep search response under 200ms for typical city searches across thousands of listings.

**Stripe webhook reliability.** Payment events process idempotently — each webhook's unique event ID is checked against a processed-events log in Redis before acting, preventing duplicate booking confirmations or duplicate payouts on webhook retries.

**Image pipeline.** All hotel photos pass through a Lambda processing pipeline on upload generating multiple resolution variants (thumbnail, medium, full) stored separately in S3, so search results load compressed thumbnails while detail pages serve full resolution — with no manual intervention from the host.

## CV / Portfolio Bullets

- Built a full-stack hotel booking platform with React, Redux Toolkit, Express, and MongoDB supporting guest booking, host listing management, and end-to-end Stripe payment processing.
- Engineered a two-phase booking flow with TTL-based availability locking and MongoDB transactions, guaranteeing double-booking prevention under concurrent load.
- Implemented idempotent Stripe webhook processing using a Redis processed-events log keyed by event ID, eliminating duplicate confirmations and duplicate host payouts on retries.
- Achieved sub-200ms search response across thousands of listings by combining MongoDB Atlas geospatial `$near` indexing with a 5-minute Redis result cache keyed on search parameters.
- Integrated Stripe Connect for host onboarding, identity verification, multi-currency payouts, and automated post-check-in settlement minus platform fees.
- Designed a serverless AWS Lambda image pipeline generating multi-resolution variants on upload, serving compressed thumbnails to search and full resolution to detail views automatically.

---
---

# 9. gLiter Customer Loyalty Platform

**Client:** gLiter (Saudi fuel and transport-services company)
**Market:** Kingdom of Saudi Arabia
**Document date:** 11 July 2026
**Type:** Product vision and platform specification

## Summary

gLiter is an integrated customer loyalty platform for a Saudi fuel-station network, rewarding fuel and non-fuel purchases with points redeemable for fuel discounts, café products, car-wash services, convenience-store products, and other station services.

Crucially, **this is not a single mobile application.** It is a connected platform comprising a customer app (Android + iOS), a worker/cashier app (Android), a browser-based administration and CRM dashboard, a shared backend with loyalty engine and audit system, and future integrations with station POS, pump controllers, electronic invoicing, notifications, and payment services.

The central product promise: *a customer can identify themselves at a gLiter station, earn a trustworthy reward in seconds, and return to use it across gLiter's fuel and service ecosystem.*

## Why This Project Matters in the Portfolio

This is the only artifact demonstrating **pre-implementation platform scoping under regulatory constraint**. It includes regulatory context (Saudi Ministry of Energy qualification criteria, ZATCA e-invoicing boundaries, SAMA electronic-wallet rules), explicit non-goals, fraud modeling, a staged release roadmap, KPI definitions, risk register with mitigations, client-provided dependencies, and a list of open decisions requiring business resolution.

It also demonstrates professional honesty in client-facing documents: it states plainly that no software developer can guarantee government qualification or app-store acceptance, both being third-party decisions.

## Stakeholders and Roles

**External:** Customer (registers, identifies account, earns points, redeems rewards, locates stations, submits support requests), Prospective customer (browses stations, services, prices, offers, loyalty rules without registering)

**Station:** Worker/cashier (scans customer and reward QR codes, records eligible transactions when POS integration is unavailable, sees only minimum required customer information), Station supervisor (reviews worker activity, approves exceptional transactions and reversals)

**Management:** Branch manager, Loyalty manager (program rules, rewards, campaigns, point economics, segments), Customer-service representative, Finance/auditor (reviews points issued, redeemed, expired, reversed, adjusted, and resulting liability **without modifying operational records**), System administrator

## Platform Components

**Customer application** — cross-platform mobile via App Store and Google Play. Registration and auth, loyalty identity and QR presentation, balance and transaction history, reward discovery and redemption, station discovery and navigation, products/services/prices/hours, offers and notifications, customer support and privacy requests.

**Worker application** — separate Android package for workers, cashiers, or gLiter-provided station devices. Worker and device authentication, station and shift association, customer QR scanning, manual purchase capture, reward voucher validation and consumption, recent transaction review, reversal request submission.

**Administration and CRM dashboard** — responsive browser application. Station/worker/role/device management, customer and loyalty-account management, point-rule and reward management, transaction search and reversal, audit, offer and campaign management, complaint workflows, reporting, fraud monitoring, exports.

**Backend platform** — centralized API and database. Identity and access control, loyalty-ledger calculation, transaction validation, reward and voucher lifecycle, station and product information, complaints and CRM records, notifications, reporting and audit, external-system integration.

## Core Customer Journeys

### Registration
Install → choose Arabic or English → register with Saudi mobile number → OTP verification (production) → accept privacy notice and loyalty terms → backend creates customer profile, loyalty account, and membership identifier → home screen with loyalty QR.

### Earning through manual station entry
Customer completes purchase → displays a **short-lived signed QR** → worker scans → worker enters amount, category, payment method, and invoice reference where available → backend validates worker, device, station, customer, transaction limits, duplication, and QR validity → backend applies the **active versioned point rule** → creates the purchase transaction and corresponding **immutable ledger entry** → customer sees updated balance and digital loyalty receipt.

### Earning through future POS integration
Station POS or forecourt system records the sale → customer loyalty identity associated → integration sends the verified sale to the loyalty backend → backend validates the unique transaction reference → points awarded without manual worker entry. **This is the preferred long-term flow because it reduces both error and employee fraud.**

### Reward redemption
Customer chooses reward → app shows points cost, terms, branches, expiration → customer confirms → backend **reserves** points and creates a time-limited voucher → worker scans → backend checks voucher status, branch eligibility, customer status, reward conditions → voucher consumed **atomically** and points permanently debited → both parties confirmed.

### Reversal
Worker or customer reports an incorrect transaction → administrator reviews the original record and reason → approves or rejects → **backend retains the original transaction and creates an opposite ledger entry** → audit log records the responsible administrator, time, and reason.

> No completed financial-value record should ever be silently edited or deleted.

## Loyalty Economics (proposal, requiring client approval)

- Every 10 SAR of eligible spending earns 1 point
- Every 10 points represents 1 SAR of reward value
- Effective base reward rate approximately 1%
- Promotions may temporarily multiply earning
- Higher-margin categories may earn at a higher rate later

**Expiration proposal:** no expiration during the controlled pilot; later, points expire 12 months after earning with warnings at ~30 days and ~7 days, applied prospectively and clearly disclosed.

**Wallet boundary:** the initial product uses points, discounts, and closed-loop reward vouchers only. It must not accept deposits, allow cash withdrawal, transfer money between customers, or describe itself as a financial wallet. Any future stored-value or payment wallet requires specialized Saudi legal advice and potentially a licensed SAMA payment-service or electronic-money partner.

## Technical Architecture

**Recommended style:** a **modular monolith** for the early and medium stages, providing clear module boundaries without the infrastructure and operational cost of microservices. Microservices should only be considered when real scale, team ownership, availability boundaries, or integration load justify them.

**Suggested stack:**

| Component | Technology |
|---|---|
| Customer application | React Native |
| Worker application | Separate React Native Android package |
| Administration dashboard | Next.js |
| Backend | NestJS |
| Primary database | PostgreSQL |
| QR, cache, job coordination | Redis |
| Background jobs | BullMQ or equivalent managed queue |
| Push notifications | Firebase Cloud Messaging + APNs |
| Object storage | S3-compatible |
| Monitoring | Sentry, structured server logs, uptime and infrastructure metrics |
| API documentation | OpenAPI/Swagger |

## Delivery Roadmap

**Release A — Qualification MVP.** Publish genuine customer (Android/iOS) and worker (Android) applications, demonstrate a real basic loyalty loop, display stations/products/prices/services/hours, provide customer complaints and a lightweight CRM dashboard, supply test accounts and evidence for qualification review.

**Release B — Production hardening.** Production OTP provider, stronger fraud controls, improved worker and device management, complete rewards and voucher rules, push notifications, improved CRM workflow, monitoring, backups, security review, load testing, controlled pilot at selected stations.

**Release C — Operational integration.** POS and/or forecourt integration, verified cash and card transaction references, automated points awarding, refund and reversal synchronization, reward inventory by station, finance and accounting exports.

**Release D — Growth and personalization.** Segmentation, campaign scheduling and measurement, tiers, referrals, personalized offers, bonus-point rules, partner rewards, expiring-points automation.

**Release E — Extended mobility ecosystem.** Subject to separate business and legal study: fleet accounts, vehicle budgets and reports, EV charging, pay-at-pump, licensed payment or stored-value partnership, partner marketplace, vehicle service booking.

## Risk Register

| Risk | Mitigation |
|---|---|
| Unknown qualification expectations | Obtain the exact authority, certificate type, checklist, deadline, and written evidence expectations before promising approval |
| Unknown station systems | Use controlled manual entry initially; complete formal integration discovery before estimating automated integration |
| Employee fraud | Limits, audit, dynamic QR, station/device binding, supervisor approval, later direct POS verification |
| Personal worker phones | Minimal exposed data, device registration, remote revocation, session expiration, later migration to managed devices |
| Weak connectivity | Clear retry behavior first; later a validated pending-operation design. **Never allow unverified offline points to become immediately spendable.** |
| Store or government delays | Submit early with complete metadata and test accounts; separate development completion from third-party approval dates |
| Scope confusion | Separate contracts, deliverables, acceptance criteria, exclusions, prices, and change control for Release A and later releases |

## Product Success Definition

The platform succeeds when customers understand the program and complete earning and redemption without confusion; station workers operate it quickly without exposing customer data; gLiter can prove the origin and history of every point; management can measure whether the program increases repeat visits and cross-selling; complaints are recorded, assigned, tracked, and resolved; the system can integrate with station sales rather than depend indefinitely on manual entry; and each release creates a stable foundation for the next rather than being discarded after inspection.

## Final Product Principle

> The gLiter platform should not become a collection of disconnected promotional screens. Its long-term value comes from connecting four things reliably: **a real customer, a real station transaction, a controlled loyalty value, and a measurable reason to return.**

## CV / Portfolio Bullets

- Authored a complete product vision and technical specification for a multi-application customer loyalty platform serving a Saudi fuel-station network, covering customer app, worker app, CRM dashboard, and shared loyalty backend.
- Designed an append-only loyalty ledger architecture where reversals create opposite entries and no completed financial-value record is ever edited or deleted, providing full auditability of point origin and history.
- Specified a fraud-resistant earning flow using short-lived signed QR codes, device and station binding, versioned point rules, transaction limits, duplication checks, and supervisor approval workflows.
- Mapped platform scope against Saudi regulatory context including Ministry of Energy station qualification criteria, ZATCA tax-invoice boundaries, and SAMA electronic-wallet licensing constraints.
- Structured a five-stage delivery roadmap from qualification MVP through POS integration to extended mobility services, with separate acceptance criteria and change control per release.

---
---

# 10. GetLab — Lab Equipment Management System

**Institution:** Cairo University
**Course:** CMPS202 — Database Systems (Final Project)
**Type:** Windows desktop application
**Collaborators:** Mahmoud Attia, Mariam Raafat
**Repository:** https://github.com/mahmouddattiaa/GetLab

## Summary

GetLab is a comprehensive **Windows Forms desktop application** managing laboratory equipment reservations and operations for Cairo University. It provides role-based access for Students, Professors, and Lab Assistants, handling equipment checkouts, lab reservations, maintenance tracking, and administrative operations.

> **Portfolio accuracy note:** GetLab is a **desktop** application, not web. It is currently miscategorized as "web" on the portfolio site.

## Tech Stack

**Frontend:** C# Windows Forms (.NET Framework 4.8), `System.Windows.Forms.DataVisualization` for charts, custom form inheritance via `BaseForm`

**Backend:** SQL Server 2019+, ADO.NET for data access, **stored procedures for all database operations**

**Security:** SHA-256 password hashing, parameterized queries, role-based access control

## Architecture

Strict 3-tier architecture:

1. **Presentation Layer** (`Forms/`) — Windows Forms UI
2. **Business Logic Layer** (`Controller/`) — application logic, 30+ methods
3. **Data Access Layer** (`Data/`) — database operations

Key components:
- **`DBManager.cs`** — centralized database connection and command execution: `ExecuteReader()` returning DataTable for SELECTs, `ExecuteNonQuery()` for INSERT/UPDATE/DELETE, `ExecuteScalar()` for single values
- **`SecurityHelper.cs`** — SHA-256 password hashing
- **`Controller.cs`** — business logic bridging UI and data
- **`BaseForm.cs`** — shared form functionality for consistent UI

Design patterns applied: Repository (DBManager abstracts DB operations), Controller (separates business logic from UI), Form Inheritance (BaseForm), Stored Procedure Architecture (all DB access via SPs).

## Database Schema

**9 tables, 30+ stored procedures**, created by `DatabaseScripts/00_Master_Setup.sql` (~30 second execution).

| Table | Purpose |
|---|---|
| `Users` | Accounts with role-based access (Students, Professors, Admins) |
| `Equipment` | Inventory with status: Available, Borrowed, Reserved, Maintenance, Lost |
| `EquipmentReservations` | Checkout records with reservation dates, due dates, returns |
| `RoomReservations` | Lab room bookings (professor feature) |
| `Locations` | Physical labs and storage rooms |
| `Suppliers` | Equipment vendor information |
| `Courses` | Academic courses taught by professors |
| `MaintenanceReports` | Equipment issue tracking |
| `EquipmentRequests` | Professor requests for new equipment |

Key stored procedures: `sp_UserLogin`, `sp_RegisterUser`, `sp_GetAvailableEquipment`, `sp_ReserveEquipment`, `sp_ReturnEquipment`, `sp_GetMostReservedEquipment`, `sp_GetEquipmentStatusCount`, `sp_RequestEquipment`, `sp_ApproveRequest`, `sp_DenyRequest`

## Features by Role

**Students** — browse and search equipment with real-time status, reserve for specific hourly time slots or take-home, view reservation history, submit maintenance reports for damaged equipment, cancel or extend reservations

**Professors** — request new equipment with justification, reserve entire lab rooms for classes or research, view lab availability schedules, track personal equipment requests, submit maintenance reports

**Lab Assistants / Admin** — process equipment returns with condition assessment, manage inventory (add/edit/delete) with supplier and serial number tracking, approve or deny equipment requests, update equipment status, manage locations, generate usage statistics and analytics, view most-reserved equipment and status distribution

## Reservation System

- **Hourly slots** — students reserve equipment for specific time windows
- **Daily reservations** — take-home equipment for extended periods
- **Lab room booking** — professors reserve entire labs
- **Conflict prevention** for overlapping reservations

## Notes

This is coursework rather than commercial work, and should be presented as such — it demonstrates relational database design, stored procedure architecture, and layered application structure rather than production system ownership. The README publishes test credentials (all accounts use password `1234`), which is appropriate for an educational repository but should not be replicated in commercial work.

## CV / Portfolio Bullets

- Built a 3-tier C# Windows Forms lab equipment management system for Cairo University with role-based access for students, professors, and lab assistants.
- Designed a 9-table SQL Server schema with 30+ stored procedures handling equipment inventory, hourly and daily reservations, room booking, maintenance reporting, and approval workflows.
- Implemented reservation conflict detection preventing overlapping equipment and lab room bookings across three distinct reservation modes.
- Applied SHA-256 password hashing, parameterized queries, and stored-procedure-only data access for SQL injection prevention and role validation.

---
---

# 11. AgencyOS

**Type:** Real-time operating system for growth, marketing, and creative agencies
**Status:** Concept / design build — the documented stack is *anticipated*, not implemented

> **Portfolio accuracy note:** AgencyOS should be labeled as a concept or design build. Presenting it as a shipped product alongside HS VPN and Aksira creates an accuracy risk in technical conversations.

## Summary

AgencyOS is a unified command center intended to replace fragmented agency tool stacks — separate tools for task management, client communication, and financial tracking. By bringing strategy, campaign execution, client collaboration, and financial control into one platform, it aims to eliminate recurring status meetings and reduce handoff friction, letting teams move from campaign planning to delivery boards while leadership gains immediate visibility into pipeline velocity, account health, and profitability.

## Core Modules

1. **Executive Performance Dashboard** — high-level view of pipeline velocity, account health, and ROI metrics for agency leadership
2. **Plan Builder & Strategy** — workspace for outlining campaigns, milestones, and strategic deliverables before execution
3. **Agency Kanban Board** — real-time delivery board for internal task tracking and workload management
4. **Client Workspace** — dedicated transparent portal where clients track campaign progress, participate in approval loops, and communicate without scattered email threads
5. **Notification & Automation Center** — workflow engine handling reminders, issue escalations, and status broadcasts
6. **Financials & Expense Tracking** — ledger for campaign spend, agency margins, and profitability clarity

## Anticipated Tech Stack

### Frontend
- **Next.js (App Router)** — hybrid SSR and client-side logic for fast loads and SEO
- **Tailwind CSS** with a modern component library (Shadcn UI or Aceternity UI) for a premium dashboard aesthetic
- **Zustand** for local client state (Kanban drag operations) and **TanStack Query** for asynchronous state synchronization
- **`@hello-pangea/dnd`** or **`dnd-kit`** for interactive Kanban boards and Plan Builders

### Backend & Database
- **Next.js Server Actions and Route Handlers** for frontend-backend communication
- **PostgreSQL** as the primary relational database — the domain model (Agencies, Clients, Users, Projects, Tasks, Transactions) is highly relational
- **Prisma or Drizzle ORM** for type-safe queries
- **NextAuth.js (Auth.js) or Clerk** for complex RBAC separating "Agency Admin", "Agency Employee", and "Client" roles

### Real-time & automation
- **Pusher, Supabase Realtime, or Socket.io** so a Kanban move instantly updates on the client's screen
- **Inngest, Trigger.dev, or BullMQ + Redis** for the Notification & Automation Center — scheduling weekly status broadcasts, triggering deadline escalations

## Key Engineering Challenges (identified, not yet solved)

- **Complex multi-tenant architecture** — absolute data isolation between agencies while handling sub-tenancy (an agency inviting its own clients)
- **Real-time state synchronization** — keeping Kanban board, Plan Builder, and Client Workspace in sync across many active browser sessions without overwhelming the database
- **Granular RBAC** — a client sees only approved tasks in their workspace while agency staff see internal notes, drafts, and financial margins on the *same underlying project entity*

---
---

# 12. AI Collab Platform

**Status:** Built, but currently undocumented in this repository

## Summary

Real-time collaboration workspace with Google Gemini integration, featuring live code editing, chat, and file sharing over WebSockets.

**Known stack:** Socket.io, Gemini AI, React, Express

**Action item:** this project needs a full context document matching the structure of the others. Given the overlap with Focus Ritual's Socket.io collaboration rooms and Gemini integration, it should be documented in a way that clearly differentiates it — otherwise it reads as a subset of Focus Ritual rather than an independent project.

---
---

# Cross-Project Technology Matrix

## Languages

| Language | Projects |
|---|---|
| **Dart** | HS VPN, Aksira, FitForge |
| **TypeScript** | MedConnect, QuickChargingPOS, Focus Ritual (frontend), Aksira (edge functions), gLiter (spec) |
| **JavaScript** | Focus Ritual (backend), StayEase, FitForge (backend), AI Collab Platform |
| **Python** | Classroom Sentinel, HS VPN (registrar) |
| **Kotlin** | Aksira, HS VPN |
| **Java** | QuickChargingPOS |
| **Swift** | HS VPN |
| **C#** | GetLab |
| **SQL** | GetLab (T-SQL, stored procedures), MedConnect, gLiter |

## Mobile Frameworks

| Framework | Projects |
|---|---|
| **Flutter** | HS VPN, Aksira, FitForge |
| **React Native** | MedConnect (Expo), QuickChargingPOS, gLiter (spec), iScore (employment) |
| **Native Android** | Aksira (`InputMethodService`), QuickChargingPOS (Java modules), HS VPN (`VpnService`) |
| **Native iOS** | HS VPN (`NEPacketTunnelProvider`) |

## Backend Frameworks

| Framework | Projects |
|---|---|
| **Express** | Focus Ritual, StayEase, FitForge, AI Collab Platform |
| **NestJS** | MedConnect, gLiter (spec) |
| **FastAPI** | HS VPN |
| **Deno (Supabase Edge Functions)** | Aksira |
| **asyncio (bare)** | Classroom Sentinel |
| **ADO.NET / SQL Server** | GetLab |

## Databases

| Database | Projects |
|---|---|
| **MongoDB** | Focus Ritual, StayEase, FitForge |
| **PostgreSQL** | MedConnect, Aksira (via Supabase), gLiter (spec), AgencyOS (anticipated) |
| **SQLite** | Classroom Sentinel |
| **SQL Server** | GetLab |
| **Redis** | MedConnect, StayEase, FitForge, gLiter (spec) |
| **Local NoSQL / KV** | FitForge (Hive), QuickChargingPOS (AsyncStorage), Aksira + HS VPN (SharedPreferences) |
| **No database (interface state)** | HS VPN registrar |

## AI Integration

| Model / Approach | Projects |
|---|---|
| **Gemini 2.5 (Flash-Lite / Flash / Pro with cascading fallback)** | Aksira |
| **Gemini 1.5 Pro** | Focus Ritual |
| **Gemini (schema-constrained JSON, model fallback on 429)** | Classroom Sentinel |
| **Deliberately no LLM (deterministic rule engine)** | FitForge |

## Infrastructure & Cloud

| Platform | Projects |
|---|---|
| **AWS** (EC2, S3, Lambda, CloudFront) | StayEase, FitForge |
| **Google Cloud Storage** | Focus Ritual |
| **Supabase** (Auth, Postgres, Edge Functions) | Aksira |
| **Firebase** (Remote Config, Analytics, FCM) | HS VPN, gLiter (spec) |
| **Render / Vercel** | Focus Ritual, StayEase |
| **Self-hosted Linux (systemd, WireGuard, Caddy)** | HS VPN (9 nodes), Classroom Sentinel |
| **Docker** | MedConnect |

## Payments & Monetization

| Integration | Projects |
|---|---|
| **Stripe + Stripe Connect** | StayEase |
| **Google Play Billing (IAP)** | Aksira |
| **AdMob + Meta mediation + Unity Ads** | HS VPN, Aksira |
| **Mada / SkyBand EMV via Android Intent** | QuickChargingPOS |
| **Virtual wallet ledger** | MedConnect |
| **Closed-loop points ledger** | gLiter (spec) |
| **Stripe/Paymob (planned)** | MedConnect |

---

# Domain Expertise Map

| Domain | Projects | Depth |
|---|---|---|
| **Network security / VPN / censorship circumvention** | HS VPN | Deep — AmneziaWG, DPI evasion, WireGuard key management, multi-node fleet ops |
| **Android platform internals** | Aksira, QuickChargingPOS, HS VPN | Deep — IME services, Intents, native modules, VpnService, InputConnection |
| **Point-of-sale / hardware integration** | QuickChargingPOS, gLiter | Deep — thermal printing, EMV payment intents, HMAC signing, POS terminals |
| **Healthcare / PII handling** | MedConnect | Deep — AES-256 encryption with searchable deterministic hashing, geofenced verification |
| **EdTech / learning science** | Focus Ritual, Classroom Sentinel | Deep — SM-2 spaced repetition from spec, AI document pipelines |
| **Fitness / sports science** | FitForge | Deep — periodization, MEV/MAV/MRV volume landmarks, progressive overload |
| **Marketplace / booking systems** | StayEase | Deep — availability locking, geospatial search, escrow payouts |
| **Loyalty / financial ledgers** | gLiter, MedConnect | Deep — immutable ledgers, reversal semantics, fraud modeling |
| **Regulatory / compliance scoping** | gLiter | Moderate — Saudi MoE qualification, ZATCA, SAMA wallet rules |
| **Relational database design** | GetLab, MedConnect, gLiter | Solid — normalized schemas, stored procedures, TypeORM entities |
| **Real-time systems** | Focus Ritual, StayEase, AI Collab Platform, AgencyOS | Deep — Socket.io rooms, presence tracking, live dashboard sync |

---

# Professional Experience

## QSERV — Software Engineer, Mobile & IoT
**Feb 2026 – Present** | Remote

Built and shipped a production POS application for gas station automation using React Native on Sunmi industrial devices. Engineered a custom Java Native Module integrating the Mada (SkyBand) payment gateway via Android Intents. Implemented an offline-first transaction engine and centralized device management workflows.

**Associated project:** QuickChargingPOS
**Keywords:** zero transaction loss, offline sync, Java native bridging, Android Intent architecture

## iScore — Full Stack Developer
**Feb 2024 – Jan 2026**

Built the iScore credit score monitoring mobile application using React Native and Node.js in a high-security financial environment. Implemented secure data flows and worked directly with large-scale network infrastructure at Egypt's national credit bureau.

**Keywords:** financial data security, React Native, Node.js, national-scale infrastructure

## Codveda — Full Stack Developer
**Feb 2023 – Jan 2024**

Developed and maintained responsive web applications using React.js and Node.js. Integrated third-party RESTful APIs and optimized backend endpoints. Collaborated in an Agile/Scrum environment using Git.

## Enactus Egypt — Volunteer Developer
**Dec 2024 – Present**

Developed accessibility tools for individuals with disabilities. Secured 3rd place in the TCCD 13th Edition Research Competition. Collaborated on mobile-first projects in cross-functional teams.

---

# Client Testimonials

> "Mahmoud is a dream to work with. Whatever I send him, he turns it into his own project and delivers it with excellence. Seriously — he is the direction you want."
> — **Riyad**, Mostaql client

> "One of the most competent and efficient developers I have worked with. The implementation was done with total professionalism and quality that exceeded expectations."
> — **Husam Y.**, HS VPN client (Mostaql)

---

# Working Process

**One-week sprints** with a working demo by day 3 and full delivery by day 7, plus daily updates via Telegram or Slack.

- **Day 1 — Scope and milestones.** One clear outcome, fixed scope, delivery checkpoints agreed.
- **Day 3 — Working demo.** A real build or bot demo early, so feedback arrives before final delivery.
- **Day 7 — Final delivery.** Production-ready handoff with deployment support and source code access.

**Client guarantees:** clear milestones with fixed prices upfront, daily progress updates with screenshots, code hosted on GitHub with full access, deployment handled end to end (Google Play, VPS, cloud).

---

# Portfolio Accuracy Backlog

Items to correct on https://www.keplerdev.uk:

| # | Issue | Correction |
|---|---|---|
| 1 | "Faseeh AI Keyboard" | Rename to **Aksira** (`com.aksira.keyboard`) everywhere |
| 2 | HS VPN described as "WireGuard across 10+ Linux servers" | It is **AmneziaWG across 9 nodes**. The DPI-evasion capability is the actual differentiator and is currently unstated |
| 3 | HS VPN has no store link | Add https://play.google.com/store/apps/details?id=com.hsvpn.vpn |
| 4 | MedConnect described as "NestJS Microservices" | It is a **monolithic NestJS API in an npm-workspaces monorepo** |
| 5 | AgencyOS presented as a shipped product | Label as **concept / design build** |
| 6 | StayEase tagged "mobile" | It is a **web** application |
| 7 | GetLab tagged "web" | It is a **Windows desktop** application |
| 8 | Aksira card omits the monetization layer | Add Supabase Auth, PostgreSQL credit ledger, Play Billing with receipt verification, AdMob rewarded |
| 9 | Letter placeholders instead of hero images | Aksira, GetLab, AI Collab Platform need real screenshots |
| 10 | No per-project GitHub or demo links | Site copy promises code access; add at least one verifiable link per project |
| 11 | "Production Tools I Ship With" omits Flutter, React Native, Kotlin, Python | These are the actual differentiators and contradict the "Mobile & Backend Developer" headline by their absence |
| 12 | gLiter not represented at all | Add it — it is the only artifact demonstrating platform scoping under regulatory constraint |
| 13 | Pricing anchored at $300–$1,500 | Low relative to demonstrated complexity (payment gateway native modules, geofenced financial ledgers, multi-node VPN infrastructure) |

---

# Security Remediation Backlog

Ordered by exposure risk:

| Priority | Project | Issue | Action |
|---|---|---|---|
| **1** | QuickChargingPOS | Hardcoded Basic Auth token in `quickApi.ts` (trivially base64-decodable); hardcoded `TEST_CASH_REGISTER_NO` and `TEST_TERMINAL_ID` in `NamiPayModule.java` payment signature path | Rotate credentials, move to dynamic runtime configuration. This is a live client-facing app on real POS hardware handling payments. |
| **2** | Classroom Sentinel | `.env` committed in-repo with live-looking credentials (`TELEGRAM_TOKEN`, `GEMINI_API_KEY`) | Rotate both keys, purge from git history (not just the working tree), add `.env` to `.gitignore` |
| **3** | Focus Ritual | Hardcoded Gemini API key fallback in `gemini.service.js` | Rotate the key, remove the fallback, purge from git history |
| **4** | MedConnect | Static hardcoded AES secret (`'medconnect-secret-key'`) deriving encryption keys for National IDs | Replace with a proper KMS before any production use — this protects medical PII |
| **5** | Aksira | Production release keystore `aksira-release.jks` committed to the repository | Passwords are env-var driven so the immediate risk is limited, but a committed release keystore is a bad default if the repo is ever public |
| **6** | HS VPN | Registrar default `API_KEY=HS_VPN_SECRET` | Ensure production nodes never run the default; verify Remote Config `vpn_api_key` matches deployed values |
| **7** | GetLab | Test credentials published in README (all accounts, password `1234`) | Acceptable for educational coursework; do not replicate the pattern in commercial repositories |

---

# Documentation Gaps

| Project | Missing |
|---|---|
| **AI Collab Platform** | Full context document — currently only a portfolio card exists |
| **AgencyOS** | Clarification of what was actually built versus specified |
| **iScore work** | No project documentation (likely NDA-constrained; keep at the summary level) |
| **Enactus accessibility tools** | No project documentation; the TCCD 3rd-place research competition result suggests there is a real artifact worth documenting |

---

*End of document. Version 1.0 — 8 August 2026.*
