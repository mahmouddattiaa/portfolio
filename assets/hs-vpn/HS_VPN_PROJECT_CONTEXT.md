# Project Context: HS VPN (VPN PRO)

## 1. What This Project Does

HS VPN is a production-deployed WireGuard VPN client for Android (iOS in progress) that lets end users connect to a privately operated VPN server with one tap. The app handles the full lifecycle: Curve25519 key pair generation (stored in hardware-backed secure storage), dynamic peer registration against a self-hosted FastAPI backend that calls the `wg` CLI live on the server, tunnel establishment via a foreground Android VPN service, real-time throughput monitoring, and session history. The monetisation model is ad-supported (AdMob interstitial on connect + native ads in the server list). There is no third-party VPN SDK — the entire tunnel layer is implemented directly against `wireguard-go` through the WireGuard Android library. Version 1.0.3+10 is live on Google Play; TestFlight distribution for iOS is under active development.

---

## 2. Tech Stack

| Layer | Technologies |
|---|---|
| Language(s) | Dart 3, Kotlin 1.9 (Android), Python 3.x (backend) |
| Runtime / Framework | Flutter 3.x, Android SDK 36 (min 24), FastAPI + Uvicorn |
| Database(s) | None — state is ephemeral; session history in `SharedPreferences` (JSON); assigned IPs recovered live from `wg show` |
| Auth | API key (`x-api-key` header) delivered at runtime from Firebase Remote Config; Android Keystore / iOS Keychain for client private keys |
| Infrastructure / Deployment | Self-hosted VPS (Linux); WireGuard on `wg0`; TLS via self-signed cert (`openssl req -x509`); no reverse proxy |
| External APIs / Services | Firebase Remote Config (server list + API key), Firebase Analytics, AdMob (interstitial + native), flagcdn.com (flag images) |
| Testing | `flutter_test`, `mocktail`; unit tests for controller, model, repository, ad service |
| Tooling | `flutter analyze`, ProGuard + resource shrinking for release APKs, Gradle 8, Android Keystore release signing |

---

## 3. Architecture Overview

The system is a **mobile monolith with a thin stateless backend**. There are three distinct layers:

```
┌────────────────────────────────────────────────────────┐
│  Flutter (Dart) — UI + business logic                  │
│  VpnController (GetX)  ←→  Widgets (Obx)              │
└───────────┬────────────────────────────────────────────┘
            │ MethodChannel  "com.hsvpn.vpn/tunnel"
            │ EventChannel   "com.hsvpn.vpn/tunnel_events"
            ▼
┌────────────────────────────────────────────────────────┐
│  Native (Kotlin) — VPN service                         │
│  MainActivity (bridge) → WireGuardVpnService           │
│  wireguard-go (GoBackend) — actual tunnel I/O          │
└───────────┬────────────────────────────────────────────┘
            │ HTTPS POST /register  (TLS, port 5000)
            ▼
┌────────────────────────────────────────────────────────┐
│  Backend (Python FastAPI) — peer registrar             │
│  Calls `wg set` + `wg-quick save` directly on VPS     │
└────────────────────────────────────────────────────────┘
```

**Primary data flow (connect tap → tunnel up):**
1. `VpnController.connectToVpn()` loads client keys from secure storage.
2. Resolves server hostname to IP (required on iOS before DNS is routed through tunnel).
3. POSTs `{public_key}` to `https://<server>:5000/register` with `x-api-key`.
4. Backend assigns a `/32` from `10.8.0.0/24`, runs `wg set wg0 peer <pub> allowed-ips <ip>/32`, saves config.
5. Dart builds a `configMap` and calls `MethodChannel("startTunnel", configMap)`.
6. `MainActivity` calls `VpnService.prepare()`, shows system permission dialog if needed.
7. Starts `WireGuardVpnService` as a foreground service; `GoBackend.setState(myTunnel, UP, config)` brings tunnel up.
8. Native sends state strings via `EventChannel`; `VpnController` drives UI state machine.
9. Stats timer polls `GoBackend.getStatistics()` every 2 seconds → download/upload Mbps.

---

## 4. Directory Structure

```
HS VPN/
├── lib/                              # All Flutter/Dart code
│   ├── main.dart                     # Firebase init, Remote Config fetch, ad service boot, routing
│   ├── controllers/
│   │   ├── vpn_controller.dart       # Core state machine (~1100 lines): keys, registration, tunnel, stats
│   │   └── compliance_controller.dart # One-time privacy acceptance + SharedPreferences gate
│   ├── models/
│   │   └── server_model.dart         # ServerModel: fromJson/toJson for Remote Config payload
│   ├── repositories/
│   │   └── server_repository.dart    # Thin wrapper: Remote Config → List<ServerModel>
│   ├── services/
│   │   └── ad_service.dart           # AdMob interstitial lifecycle + exponential-backoff retry
│   ├── screens/
│   │   ├── dashboard_screen.dart     # Connect button, status, timer, speed graph
│   │   ├── server_selection_screen.dart  # Search, category tabs, native ad tiles, shimmer
│   │   ├── compliance_screen.dart    # First-launch privacy policy gate
│   │   ├── stats_screen.dart         # Session stats aggregated from SharedPreferences
│   │   ├── session_history_screen.dart   # Per-session log (up to 50 entries)
│   │   ├── paywall_screen.dart       # Premium upsell (stub)
│   │   ├── settings_screen.dart      # App settings
│   │   ├── help_screen.dart
│   │   └── notifications_screen.dart
│   ├── theme/
│   │   └── app_theme.dart            # AppColors + AppTextStyles (Neon Teal palette, Manrope/Inter)
│   └── widgets/
│       ├── main_shell.dart           # IndexedStack bottom-nav shell; keeps all tabs alive
│       ├── speed_graph.dart          # CustomPaint + AnimatedBuilder graph (0 setState/sec)
│       └── ads/
│           └── native_ad_tile.dart   # NativeAd widget with factoryId "listTile"
│
├── android/app/src/main/
│   ├── kotlin/com/hsvpn/vpn/
│   │   ├── MainActivity.kt           # MethodChannel + EventChannel bridge, ad factory registration
│   │   ├── WireGuardVpnService.kt    # Foreground VPN service; GoBackend singleton; TunnelConfig parsing
│   │   ├── NativeAdFactoryImpl.kt    # Inflates list_tile_native_ad.xml + populates NativeAd assets
│   │   └── LargeNativeAdFactoryImpl.kt  # Inflates large_native_ad.xml
│   ├── AndroidManifest.xml           # FOREGROUND_SERVICE_SPECIAL_USE, BIND_VPN_SERVICE, AdMob app ID
│   └── res/layout/                   # XML layouts for native ad views
│
├── ios/
│   ├── Runner/                       # AppDelegate, native ad factory (Swift)
│   └── VPNTunnelExtension/           # PacketTunnelProvider.swift (iOS Network Extension)
│
├── backend/
│   ├── peer_registrar.py             # FastAPI app; wg CLI calls; IP assignment from subnet
│   └── requirements.txt             # fastapi, uvicorn only
│
├── test/                             # Unit tests (flutter_test + mocktail)
│   ├── controllers/                  # vpn_controller_test.dart, compliance_controller_test.dart
│   ├── models/, repositories/, services/
│
├── docs/                             # Developer guides (15+ markdown files)
├── pubspec.yaml                      # Flutter deps + version (1.0.3+10)
├── android/app/build.gradle          # compileSdk 36, minSdk 24, ProGuard, signing
└── analysis_options.yaml             # Dart linter (const, final, no print())
```

---

## 5. Data Models / Schema

There is no SQL database. Persistence is split across three stores:

**Firebase Remote Config (server list):**
```json
[{
  "id": "sg-sin-01",
  "country_name": "Singapore",
  "country_code": "SG",
  "city": "Singapore",
  "flag_url": "https://flagcdn.com/w320/sg.png",
  "ip": "203.0.113.45",
  "public_key": "<base64 WireGuard pubkey>",
  "latency": 42,
  "load": 0,
  "is_premium": false
}]
```

**`ServerModel` (Dart):** mirrors the JSON above. `assignedAddress` is a runtime field (not in Remote Config) filled after registration.

**WireGuard peer state (live, server-side):** Not stored in a database. The single source of truth is `wg show wg0 allowed-ips`. The backend scrapes this output with a subprocess call on every `/register` request to rebuild the `pubkey → IP` map. No persistent storage for peers; `wg-quick save` writes the running state to `/etc/wireguard/wg0.conf`.

**Local session history (`SharedPreferences` key `session_history`):**
```json
[{
  "id": "1711234567890",
  "startedAt": "2026-04-22T14:30:00.000Z",
  "durationSeconds": 3600,
  "downloadedMB": 142.3,
  "uploadedMB": 18.7,
  "serverCity": "Singapore",
  "serverCountry": "Singapore"
}]
```
Capped at 50 entries. Managed entirely in `VpnController._saveSessionHistory()`.

**Client key pair (per device, persistent):**
- Stored in `flutter_secure_storage` (Android Keystore AES256_GCM / iOS Keychain).
- Keys: `_wg_private_key`, `_wg_public_key`, `key_derivation_version` (int in plain SharedPreferences for migration tracking).
- Migration path: v0 → regenerate; v1 (plain SharedPreferences) → move to secure storage; v2 = current.

**Assigned IP cache (`SharedPreferences` key `assigned_ip_<server.id>`):**
Caches the CIDR returned by `/register` so reconnects to the same server skip the HTTP call and reuse the same IP.

---

## 6. API Surface

The backend exposes a single endpoint:

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `POST` | `/register` | `x-api-key` header | Register client public key; returns assigned VPN IP |

**Request body:**
```json
{ "public_key": "<base64 Curve25519 public key>" }
```

**Success (200):**
```json
{
  "assigned_ip": "10.8.0.2/32",
  "dns": "1.1.1.1",
  "message": "Peer registered successfully"
}
```

**Errors:** `401` bad API key; `500` wg CLI failed or subnet exhausted.

The API key itself is distributed via Firebase Remote Config key `vpn_api_key`, so it can be rotated without a client release.

---

## 7. Key Technical Decisions

**1. WireGuard via wireguard-go (not a VPN SDK)**
The tunnel is implemented directly against `com.wireguard.android:tunnel:1.0.20260102`, which wraps WireGuard's official Go userspace implementation. Alternatives: OpenVPN client library, commercial VPN SDKs (Outline, Lightway). Chosen because WireGuard is the state of the art in performance and simplicity, and the library gives direct control over the `GoBackend` lifecycle — essential for avoiding zombie tunnels.

**2. GoBackend + Tunnel as class-level singletons**
This is the single most important architectural constraint. If `GoBackend` or `Tunnel` objects are instantiated inside `startTunnel()`, then `stopTunnel()` holds a reference to a *different* object than the one that owns the running kernel tunnel. The stale `tun0` interface stays up, routing all traffic (including the registration HTTPS call) through a dead VPN. The fix is initialization in `onCreate()`, with one instance for the lifetime of the service. Alternatives (killing the old service process and restarting) were rejected as slower and more disruptive.

**3. Dynamic peer registration via `wg set` CLI**
The backend does not write `wg0.conf` directly. It calls `wg set wg0 peer <pub> allowed-ips <ip>/32` at runtime, then `wg-quick save` to persist. This is the standard pattern for WireGuard peer management without bringing the interface down. Alternative: write config file and run `wg syncconf` — riskier because concurrent calls could corrupt the file.

**4. API key in Firebase Remote Config, not in the binary**
Embedding the API key in the app binary means it is extractable by anyone who decompiles the APK. Storing it in Remote Config means it can be rotated server-side and the client always fetches the current value on launch. The tradeoff is a Remote Config fetch failure blocks API access; mitigated by setting a default empty string and handling 401 errors gracefully.

**5. MTU 1200 (not the WireGuard default 1420)**
Servers may themselves be behind Cloudflare WARP, which adds ~60 bytes of encapsulation. WireGuard already adds ~60 bytes. At 1420 MTU: 1420 + 60 (WG) + 60 (WARP) = 1540 > 1500 Ethernet — causes silent IP fragmentation and degraded throughput on some paths. 1200 leaves comfortable headroom. The cost is slightly reduced goodput on clean paths.

**6. IPv4-only tunnel (`allowedIPs: "0.0.0.0/0"`)**
Including `::/0` (full IPv6) would route IPv6 traffic through the tunnel, but the servers have no IPv6 NAT configured. Chrome's Happy Eyeballs algorithm preferentially tries IPv6 first, waits 300 ms, then falls back to IPv4. Result: every HTTPS connection has a 300 ms penalty on all sites. Excluding IPv6 routes eliminates this entirely. The tradeoff is IPv6-native services are slightly degraded (they hit the real IPv4 endpoint), which is acceptable for a general-purpose VPN.

**7. Hostname resolution before tunnel start (iOS-specific)**
On iOS, once the Network Extension activates, all DNS queries are routed through the tunnel (or dropped if DNS is not yet up). If the app tries to resolve the server endpoint *after* starting the tunnel, it deadlocks. The fix in `connectToVpn()` is `InternetAddress.lookup(server.ip)` before calling `startTunnel`, passing a resolved numeric IP to the native layer. This issue does not manifest on Android because `WireGuardVpnService` runs in a separate process that bypasses the tunnel routing.

**8. GetX for state management**
GetX was chosen over BLoC/Riverpod for its minimal boilerplate in a solo-developer context. The `VpnController` exposes `.obs` reactive variables; widgets use `Obx(() => ...)` for granular rebuilds. The tradeoff is GetX's magic makes testing harder (global `Get.put` registrations must be torn down between tests) and its routing is non-standard. `mocktail` is used to isolate dependencies in unit tests.

---

## 8. Hard Problems Solved

**Problem 1: Zombie tunnel leaving stale `tun0` interface**
- **Problem:** After a disconnect + reconnect, traffic continued routing through a dead tunnel. The app showed "connected" but nothing worked.
- **Why it was hard:** The Android VPN service lifecycle is opaque. `GoBackend.setState(tunnel, DOWN)` only works if it's called on the *same* `GoBackend` instance that called `.setState(tunnel, UP)`. Because `WireGuardVpnService` is started and stopped as a service with `Intent`, naive code created fresh objects on each `onStartCommand()`. The kernel tunnel (a `tun0` file descriptor) outlives any Dart or JVM object that created it.
- **Solution:** `GoBackend` and `myTunnel` are initialized exactly once in `onCreate()`. `onDestroy()` calls `stopTunnel()` before releasing them. Additionally, `connectToVpn()` in Dart always calls `stopTunnel` and waits up to 5 seconds for the `disconnected` event before attempting to start a new tunnel.

**Problem 2: Registration HTTPS call routed through the zombie tunnel**
- **Problem:** After a zombie tunnel is up, all traffic routes through it, including the HTTPS POST to `backend/peer_registrar.py`. The backend never receives the request (tunnel is dead), so registration fails and the app cannot reconnect at all.
- **Why it was hard:** The failure presents as a network timeout, not a VPN error. Nothing in the logs indicated the registration packet itself was being swallowed by the tunnel.
- **Solution:** The reconnect sequence in `connectToVpn()` unconditionally tears down any active tunnel *before* making the registration call. The order is: stop → wait → register → start.

**Problem 3: Curve25519 key derivation correctness**
- **Problem:** Early versions generated a random 32-byte private key and derived the public key without clamping, producing invalid WireGuard keys. The server would accept the peer but the handshake would never complete (no error — just silence).
- **Why it was hard:** WireGuard keys look like valid Base64 both with and without clamping. The server does not reject unclamped keys at registration time. The failure is silent at the crypto layer.
- **Solution:** Implemented proper Curve25519 scalar clamping: clear bits 0–2 of byte 0, clear bit 7 and set bit 6 of byte 31. Public key derived via `TweetNaCl.crypto_scalarmult_base` from the `pinenacl` library. A `key_derivation_version` integer in SharedPreferences triggers automatic re-generation for users who had incorrect keys.

**Problem 4: Speed graph causing full-subtree repaints at 60 FPS**
- **Problem:** The original `SpeedGraph` widget used `AnimationController.addListener` → `setState()` to trigger repaints. Since the graph widget was embedded in `DashboardScreen`, the entire screen subtree (status indicator, connect button, server info card) was rebuilt 60 times per second, causing frame drops and battery drain.
- **Why it was hard:** Flutter's widget rebuild cost is usually invisible in profiling unless the subtree is large. The issue only became apparent at 60 FPS with a full dashboard.
- **Solution:** Replaced `setState` with `AnimatedBuilder` + `CustomPaint`. `AnimatedBuilder` schedules repaints on the render object directly; only the `CustomPaint` canvas is re-rasterized. The rest of the dashboard is not touched. Zero `setState()` calls at steady state.

**Problem 5: Private key migration from SharedPreferences to Secure Storage**
- **Problem:** An earlier version stored WireGuard private keys in plain `SharedPreferences`, which is readable on rooted devices and backed up in unencrypted Android backups.
- **Why it was hard:** Users already had keys in SharedPreferences. Deleting and regenerating would invalidate their registered peers on the server (different public key = needs re-registration, new IP assignment). The migration had to transfer the existing key pair atomically.
- **Solution:** `key_derivation_version` integer drives a migration path. Version 1 detects old keys in SharedPreferences, copies them to `flutter_secure_storage`, then deletes the plaintext copies and bumps the version to 2. The migration runs on first launch after the update; the user's server registration is preserved.

---

## 9. External Integrations

**Firebase Remote Config**
- Used for: Server list (`vpn_server_list` JSON array) and API key (`vpn_api_key` string).
- Auth: Google Services JSON embedded in APK (`google-services.json`).
- Config: `minimumFetchInterval: Duration.zero` in debug, `Duration(hours: 1)` in production.
- Default values (`"[]"` and `""`) prevent crash when offline.
- Failure mode: App loads with empty server list; user sees no servers to connect to.

**AdMob (Google Mobile Ads SDK)**
- Used for: Interstitial ad shown on successful VPN connection; native ads embedded in server list.
- Auth: AdMob App ID in `AndroidManifest.xml` meta-data; Ad Unit IDs hardcoded per platform/mode.
- Non-obvious: `MobileAds.instance.initialize()` is NOT awaited — it blocks the UI thread for ~2 seconds (ChromiumWebView startup). Called fire-and-forget in `main()`.
- Non-obvious: Native ad factories must be registered in `MainActivity.configureFlutterEngine()` with string IDs (`"listTile"`, `"largeNativeAd"`) that must exactly match the `factoryId` passed to `NativeAd()` in Dart.
- Failure mode: Ads silently fail to load; no impact on VPN functionality.

**flagcdn.com**
- Used for: Country flag images in server selection screen.
- No auth required. URL pattern: `https://flagcdn.com/w320/<iso2>.png`.
- Cached via `cached_network_image`.
- Failure mode: Broken image placeholder; no functional impact.

**wireguard-go / WireGuard Android Library**
- Used for: The actual WireGuard tunnel implementation (userspace, Go-based).
- Dependency: `com.wireguard.android:tunnel:1.0.20260102` (Maven).
- Non-obvious: `GoBackend` must be initialized with a `Context` in `onCreate()`. It spawns Go goroutines that own the TUN file descriptor. These goroutines are not accessible from JVM — you can only interact through the `Tunnel` interface.
- Failure mode: Entire VPN fails; no fallback.

---

## 10. Environment & Configuration

**Backend (`backend/peer_registrar.py`):**

| Variable | Purpose | Required |
|----------|---------|----------|
| `WG_INTERFACE` | WireGuard interface name | Optional (default: `wg0`) |
| `WG_NETWORK` | VPN subnet in CIDR | Optional (default: `10.8.0.0/24`) |
| `API_KEY` | Shared secret for `/register` auth | Required in production |

TLS is enabled automatically if `key.pem` and `cert.pem` exist in the working directory. Without them, the server falls back to plain HTTP (Android requires HTTPS — the app will fail to connect in this mode).

**Android release signing (`android/key.properties`, not committed):**

| Field | Purpose |
|-------|---------|
| `storePassword` | Keystore password |
| `keyPassword` | Key entry password |
| `keyAlias` | Key alias (typically `upload`) |
| `storeFile` | Path to `.jks` file |

**Firebase (`android/app/google-services.json`, not committed):**
Provides Firebase project config. Must be present for any build — even debug builds without Remote Config will crash without it.

**Flutter build modes:**
- `kDebugMode`: Remote Config `minimumFetchInterval = Duration.zero`; AdMob test ad unit IDs used automatically.
- Release: 1-hour Remote Config interval; production ad unit IDs.

---

## 11. How to Run Locally

### Prerequisites
- Flutter 3.x SDK
- Android SDK (API 36) + NDK
- A connected Android device or emulator (API 24+)
- A Linux VPS with WireGuard installed (`apt install wireguard`)
- Python 3.9+ on the VPS

### Flutter App

```bash
# 1. Clone and install deps
cd "d:/Personal Project/HS VPN"
flutter pub get

# 2. Add google-services.json
# Download from Firebase Console → Project Settings → Android → your app
# Place at: android/app/google-services.json

# 3. Run (debug mode uses test ad IDs and zero Remote Config cache)
flutter run

# 4. To build a release APK, also create android/key.properties
# and android/keystore/upload-keystore.jks (generate with keytool)
flutter build apk --release
```

### Backend (VPS)

```bash
# 1. Ensure WireGuard interface is up
sudo wg show wg0  # Must show a running interface

# 2. Generate TLS certificate (self-signed, valid 10 years)
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem \
  -days 3650 -nodes -subj '/CN=your-server-ip'

# 3. Install and start
cd backend
pip install -r requirements.txt
export WG_INTERFACE=wg0
export WG_NETWORK=10.8.0.0/24
export API_KEY=your-secret-key-here
uvicorn peer_registrar:app --host 0.0.0.0 --port 5000 \
  --ssl-keyfile key.pem --ssl-certfile cert.pem

# 4. Open firewall ports
iptables -A INPUT -p tcp --dport 5000 -j ACCEPT   # Registration API
iptables -A INPUT -p udp --dport 443 -j ACCEPT    # WireGuard tunnel
iptables -A INPUT -p udp --dport 51820 -j ACCEPT  # WireGuard alternate
```

### Firebase Remote Config Setup

Set these keys in the Firebase Console:
- `vpn_server_list` — JSON array of server objects (see schema in §5)
- `vpn_api_key` — matches `API_KEY` env var on the VPS

---

## 12. Known Limitations & Technical Debt

**No server-side peer cleanup.** Every new device that connects gets an IP from `10.8.0.0/24` (254 usable hosts). Once 253 clients have connected (server at `.1`), `/register` returns 500. Old peers are never removed. At scale, this requires a cron job to prune stale peers (e.g., `wg show wg0 latest-handshakes` and remove peers with no handshake in N days).

**Self-signed TLS certificate.** The Android app uses `network_security_config.xml` to allow the self-signed cert from the VPS. This is not suitable for a strict enterprise environment and means certificate pinning is not implemented. A proper deployment should use Let's Encrypt with a domain.

**In-memory client key cache.** `_clientPrivateKey` and `_clientPublicKey` are stored as plain `String?` fields in `VpnController`. While the authoritative copy is in secure storage, the in-memory copy is not cleared between sessions. On a compromised process (e.g., via a Dart VM exploit), the keys are accessible.

**IP cache never expires.** `assigned_ip_<server.id>` in SharedPreferences is never invalidated. If the VPS is rebuilt or the WireGuard config is reset, the cached IP is wrong but the client reuses it, causing a silent tunnel failure (handshake succeeds, but no routing — the server has no matching peer for that IP).

**iOS iOS not production-ready.** The `VPNTunnelExtension/PacketTunnelProvider.swift` exists but the iOS WireGuard integration is still in progress. The TestFlight build exists but tunnel stability is not verified.

**Stats polling uses JSON string parsing from Kotlin.** `WireGuardVpnService.getStatistics()` returns a raw JSON string (`"{\"rxBytes\":...,\"txBytes\":...}"`) rather than a typed map. The Dart side parses this with `jsonDecode`. This works but is fragile — a format change breaks silently.

**No retry on registration failure.** If the `/register` call times out (e.g., VPS is unreachable), the error is shown and the user must tap connect again. No automatic retry or exponential backoff is implemented for the registration step.

**Paywall is a stub.** `paywall_screen.dart` exists (premium server filtering is implemented) but the actual payment flow is not connected to any billing SDK.

---

## 13. What Makes This Project Unique or Complex

Compared to a standard CRUD Flutter app, this project demonstrates several layers of genuine engineering depth:

- **WireGuard protocol integration at the native layer.** The app directly manages a `GoBackend` (WireGuard's Go userspace implementation compiled for Android) through the `Tunnel` interface. This is not a third-party VPN SDK call — the tunnel configuration, key material, and lifecycle are all managed by application code.
- **Bidirectional Flutter–native bridge.** The `MethodChannel` (Dart → Kotlin, synchronous call-response) and `EventChannel` (Kotlin → Dart, continuous state stream) are both implemented and must remain synchronized. Incorrect ordering (e.g., Flutter consuming events before the service starts) causes missed state transitions.
- **Cryptographic key management.** Curve25519 scalar generation with correct clamping, X25519 public key derivation via `TweetNaCl`, and storage in hardware-backed Android Keystore with an explicit migration path across three key storage versions.
- **Android foreground service lifecycle.** `WireGuardVpnService` must call `startForeground()` within 5 seconds of `onStartCommand()`, handle `onRevoke()` (system kills VPN permission), and survive process death and restart via `START_STICKY`.
- **Live peer management via `wg` CLI.** The backend has no database. It reconstructs peer state by parsing `wg show` output on every request and mutates WireGuard's running config via subprocess, relying on `wg-quick save` for persistence.
- **Real-time throughput graphing without UI jank.** The speed graph decouples data updates (2-second polling) from rendering (60 FPS) using `AnimatedBuilder` + `CustomPaint`, avoiding `setState` entirely at steady state.
- **State machine correctness across async boundaries.** The VPN state machine (`disconnected → connecting → connected → disconnecting → disconnected`) must remain consistent across MethodChannel calls (async, can fail), EventChannel events (arrive from a background thread), and timer callbacks (2-second polling). Race conditions here cause the zombie tunnel bug.

---

## 14. Suggested CV / Portfolio Description

- Architected a production WireGuard VPN client for Android using Flutter and Kotlin, implementing the full tunnel lifecycle — from Curve25519 key generation with Keystore-backed storage to `GoBackend` foreground service management — without any third-party VPN SDK.
- Designed and deployed a stateless FastAPI peer registrar that dynamically assigns VPN IPs by parsing live `wg show` output and mutating a running WireGuard interface via subprocess, supporting multi-client registration without bringing the tunnel down.
- Diagnosed and fixed a silent zombie-tunnel bug caused by `GoBackend` instance fragmentation across Android service restarts, resolving a reconnect failure that left `tun0` routing live traffic through a dead tunnel.
- Implemented a two-channel Flutter–native bridge (`MethodChannel` + `EventChannel`) synchronising a six-state VPN state machine across async Kotlin foreground service callbacks and Dart reactive observables with GetX.
- Optimised a real-time throughput graph from 60 full-subtree repaints per second to zero `setState` calls at steady state by replacing `AnimationController` listeners with `AnimatedBuilder` + `CustomPaint`, eliminating frame drops on the main dashboard.
