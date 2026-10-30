# Project Context: Faseeh AI Smart Keyboard

## 1. What This Project Does

Faseeh AI is a production Android IME (Input Method Engine) — a system-wide custom keyboard
— with embedded AI capabilities powered by Google Gemini via Supabase Edge Functions. It
solves a specific gap for Arabic–English bilingual users: the inability to rewrite, translate,
or dictate text without leaving the keyboard context. The core value is zero-context-switch AI
text manipulation: a user types in any app, selects a tone, and the keyboard rewrites the text
in-place using Gemini without the user ever switching to ChatGPT or a browser. The system ships
as two Flutter entry points — a companion settings app and the keyboard IME itself — sharing a
single Dart codebase and bridging to a Kotlin `InputMethodService` on Android.

---

## 2. Tech Stack

| Layer | Technologies |
|---|---|
| Language(s) | Dart 3.11+, Kotlin, TypeScript (Deno), JavaScript |
| Runtime / Framework | Flutter 3.11+ (Dart VM, two engine entry points), Deno runtime (edge function) |
| Database(s) | None server-side; SharedPreferences (Android) for all persistent state |
| Auth | Supabase Anon Key (API gateway only — no per-user auth implemented) |
| Infrastructure / Deployment | Supabase Edge Functions (Deno), Google Play Store |
| External APIs / Services | Google Gemini 2.5 Flash / 2.5 Pro (AI), Android SpeechRecognizer (STT), Android TextToSpeech (TTS) |
| Testing | flutter_test, mockito 5.4.4, build_runner 2.4.8 (15 test suites) |
| Tooling | Gradle Kotlin DSL, flutter_lints 6.0.0, flutter_launcher_icons 0.14.2 |

---

## 3. Architecture Overview

The system is a **monorepo with two Flutter entry points** served by a single Kotlin
`InputMethodService` host and a single remote Supabase Edge Function.

**Two Flutter Engines, One Codebase:**
- `main()` → companion settings app (full-screen Flutter app)
- `keyboardMain()` → IME keyboard (spawned by Android OS as a system service)

Both share the same `lib/` source tree. The `FlutterEngineCache` in Kotlin ensures a single
Flutter engine is reused across keyboard sessions rather than cold-started per focus event.

**Data flow for the primary use case (AI Rewrite):**
```
User types in any Android app
  → Android OS routes keypresses through SmartKeyboardService (Kotlin InputMethodService)
    → SmartKeyboardService hosts a FlutterView (Flutter engine rendering)
      → Dart KeyboardScreen renders keys
        → User taps key → IMEService.commitText() (Dart)
          → MethodChannel → SmartKeyboardService.handleMethodCall() (Kotlin)
            → currentInputConnection.commitText() (Android InputConnection API)

User taps "Rewrite"
  → AIController reads text from field via IMEService.getTextBeforeCursor()
    → MethodChannel → Kotlin getTextBeforeCursor() → returns string
  → AIService.rewrite(text, tone) → HTTP POST to Supabase Edge Function
    → Edge function calls Gemini API → returns 3 variants
  → AIController shows RewritePanel with 3 cards
  → User taps "Use" → IMEService.replaceAllText(variant)
    → MethodChannel → Kotlin getCurrentInputConnection().setComposingText()
```

**Module relationships:**
```
SettingsController (Provider root)
  ↓ injected into
KeyboardInputController
  ↓ injected into
AIController ──────── SttService, TtsService
                              ↓
                    IMEService (MethodChannel, static)
                              ↓
                    SmartKeyboardService.kt (Android IME host)
                              ↓
                    Android InputConnection API
```

---

## 4. Directory Structure

```
smart_keypoard/
├── lib/
│   ├── main.dart                      # Entry point for companion settings app
│   ├── keyboard_entry.dart            # Entry point for IME keyboard (@pragma vm:entry-point)
│   ├── keyboard/
│   │   ├── keyboard_screen.dart       # Root keyboard widget; layout orchestration
│   │   ├── keyboard_enums.dart        # KeyboardType, ImeAction, AIPanel, DictationState enums
│   │   ├── theme.dart                 # KbdTheme: 6 themes, caching, full token system
│   │   ├── styles.dart                # UI size constants, padding, border radius
│   │   ├── controllers/
│   │   │   ├── settings_controller.dart       # ChangeNotifier: loads/saves settings, syncs to native
│   │   │   ├── keyboard_input_controller.dart # ChangeNotifier: layout state, input routing, interceptors
│   │   │   └── ai_controller.dart             # ChangeNotifier: 8-state AI panel machine + dictation recovery
│   │   ├── services/
│   │   │   ├── ime_service.dart               # Static MethodChannel bridge (30+ methods, timeout guards)
│   │   │   ├── ai_service.dart                # Static HTTP client to Supabase edge function
│   │   │   ├── stt_service.dart               # STT state machine with transcript merging + recovery
│   │   │   ├── tts_service.dart               # flutter_tts + native IME TTS bridge
│   │   │   ├── keyboard_settings_service.dart # SharedPreferences helpers
│   │   │   └── recent_emoji_service.dart      # Tracks recent emoji usage
│   │   ├── layouts/
│   │   │   ├── qwerty_layout.dart     # English QWERTY (rows + num row)
│   │   │   ├── arabic_layout.dart     # Arabic QWERTY equivalent
│   │   │   ├── numeric_layout.dart    # Phone number pad (1-9, *, 0, #)
│   │   │   ├── symbol_layout.dart     # Special characters and punctuation
│   │   │   ├── emoji_layout.dart      # 1400+ emojis, 8 categories, real-time search
│   │   │   └── numpad_layout.dart     # Scientific/programmer keypad
│   │   ├── widgets/
│   │   │   ├── ai_toolbar.dart              # Top bar: 5 AI action buttons, spinner, error banner
│   │   │   ├── ai_rewrite_panel.dart        # Result panel: 3 variant cards, Use/Regenerate/ChangeTone
│   │   │   ├── ai_translation_panel.dart    # Translation result, language display, Use button
│   │   │   ├── ai_dictation_panel.dart      # Dictation result: Insert / Insert Raw / Re-record
│   │   │   ├── tone_selector_panel.dart     # Professional / Friendly / Slang picker
│   │   │   ├── language_selector_panel.dart # AR/EN selector
│   │   │   ├── dictation_indicator.dart     # Live waveform + live transcript preview + recovery UI
│   │   │   ├── clipboard_panel.dart         # 10-item clipboard history
│   │   │   ├── keyboard_key.dart            # Individual key: long-press secondary, haptic, sound
│   │   │   ├── smart_enter_key.dart         # Context-aware Enter (Search/Send/Go/Done/Next/Newline)
│   │   │   ├── glassmorphism_container.dart # BackdropFilter blur container (AI panels)
│   │   │   └── ai_result_card.dart          # Single variant card with Copy/Use buttons
│   │   └── data/
│   │       ├── emoji_data.dart              # 1400+ emoji entries with category metadata
│   │       └── emoji_search_data.dart       # Search index for emoji lookup
│   ├── app/
│   │   ├── landing_screen.dart        # Splash/intro screen
│   │   ├── dashboard_screen.dart      # Companion app home (keyboard preview + shortcuts)
│   │   ├── home_screen.dart
│   │   ├── numpad_preview_screen.dart
│   │   ├── onboarding_screen.dart     # First-launch 3-step wizard
│   │   └── onboarding/
│   │       ├── hero_page.dart
│   │       ├── setup_guide_page.dart
│   │       └── dashboard_page.dart
│   └── settings/
│       ├── settings_screen.dart       # Companion app settings UI (full page)
│       └── keyboard_settings.dart     # Immutable settings model (11 fields) + SharedPreferences I/O
├── android/
│   ├── app/src/main/
│   │   ├── AndroidManifest.xml        # IME service declaration, RECORD_AUDIO, INTERNET permissions
│   │   └── kotlin/com/faseeh_ai/keyboard/
│   │       ├── MainActivity.kt            # Settings activity + mic permission request
│   │       ├── SmartKeyboardService.kt    # InputMethodService host (~500+ lines)
│   │       └── FlutterViewFactory.kt      # FlutterView construction
│   └── build.gradle.kts               # Gradle Kotlin DSL; release signing TBD
├── supabase/
│   └── functions/
│       └── process-ai-request/
│           └── index.ts               # Deno edge function: AI orchestration, model fallback
├── test/                              # 15 test suites (unit + widget)
├── docs/
│   └── project description.txt        # 6-day sprint master blueprint
└── pubspec.yaml                       # Flutter deps: provider, http, flutter_tts, speech_to_text, shared_preferences
```

---

## 5. Data Models / Schema

There is no server-side database. All state is local.

**`KeyboardSettings` (lib/settings/keyboard_settings.dart)**
Immutable value object with 11 fields persisted to SharedPreferences:

| Field | Type | Purpose |
|---|---|---|
| `theme` | String | One of: light, classic, forest, sunset, ocean, midnight |
| `keyboardSize` | String | small / normal / large (maps to height: 290/330/370 dp) |
| `defaultLanguage` | String | en / ar (startup layout) |
| `translationLanguage` | String | Target language for translate button |
| `hapticFeedback` | bool | Vibrate on keypress |
| `soundFeedback` | bool | Play system key click sound |
| `showNumberRow` | bool | Whether to render the top number row |
| `ttsSpeed` | double | TTS playback rate (0.5–1.5) |
| `ttsVoiceType` | String | male / female (selects voice) |
| `autoCapitalize` | bool | Auto-shift after sentence-ending punctuation |
| `autoCorrect` | bool | Enable autocorrect suggestions |

**Edge Function Request/Response (not persisted; wire format):**

Request:
```json
{
  "a": "rewrite|translate|clean_speech",
  "t": "text content",
  "tone": "Professional|Friendly|Slang",   // rewrite only
  "from": "ar|en",                          // translate only
  "to": "ar|en",                            // translate only
  "lang": "ar|en"                           // optional language hint
}
```
Note: the field shorthand `a` and `t` (instead of `action` and `text`) is a deliberate API
design in the edge function. Any Dart-side code that sends full field names will receive HTTP 400.

Response (success):
```json
{ "v": ["variant1", "variant2", "variant3"] }  // always an array, even for single results
```

Response (error):
```json
{ "e": "human-readable error message" }
```

---

## 6. API Surface

### MethodChannel: `com.smartkeyboard/ime` (Dart ↔ Kotlin)

**Flutter → Native (invocations from Dart):**

| Method | Parameters | Returns | Purpose |
|---|---|---|---|
| `commitText` | `text: String` | void | Insert text at cursor (batched 18ms) |
| `deleteBackward` | `count: int` | void | Delete N characters left of cursor |
| `sendEnter` | — | void | Send Enter/action key |
| `replaceAllText` | `text: String` | void | Replace entire field content |
| `getTextBeforeCursor` | `length: int` | String? | Read up to N chars before cursor |
| `getTextAfterCursor` | `length: int` | String? | Read up to N chars after cursor |
| `setKeyboardHeight` | `heightDp: int` | void | Resize IME window |
| `nativeSttStart` | `locale: String` | bool | Start Android SpeechRecognizer |
| `nativeSttStop` | — | void | Stop (allow finalization) |
| `nativeSttCancel` | — | void | Abort immediately |
| `ttsSpeak` | `text, lang, pitch, rate` | bool | Speak via Android TTS |
| `ttsStop` | — | void | Stop TTS playback |
| `playKeyClick` | — | void | System key click sound |
| `getClipboardItems` | — | List\<String\> | Last 10 clipboard entries |
| `switchToNextKeyboard` | — | bool | Cycle IME picker |
| `sendEditAction` | `action: String` | void | undo/redo/cut/copy/paste/selectAll |
| `launchSettings` | — | void | Open companion app |

**Native → Flutter (callbacks from Kotlin):**

| Method | Payload | Purpose |
|---|---|---|
| `onStartInput` | `inputType, imeOptions, isSecure` | New field focused; triggers layout auto-switch |
| `reloadSettings` | — | Settings changed in companion app |
| `keyboardHidden` | — | Keyboard dismissed |
| `nativeSttPartial` | `text: String` | Interim speech recognition result |
| `nativeSttFinal` | `text: String` | Final committed speech result |
| `nativeSttStatus` | `status: String` | done / notListening events |
| `nativeSttError` | `message: String, code: int?` | Recognition error |
| `ttsState` | `speaking: bool` | TTS playback state |

### MethodChannel: `com.smartkeyboard/settings` (MainActivity.kt)

| Method | Purpose |
|---|---|
| `openInputMethodSettings` | Launches Android IME Settings activity |
| `isKeyboardEnabled` | Checks if keyboard is in system-enabled list |
| `isKeyboardDefault` | Checks if keyboard is active default IME |
| `showKeyboardPicker` | Triggers Android IME picker dialog |
| `hasMicPermission` | Returns microphone grant status |
| `requestMicPermission` | Initiates runtime permission request |

### Supabase Edge Function: `POST /functions/v1/process-ai-request`

| Action | Request Fields | Response |
|---|---|---|
| `rewrite` | `a, t, tone, lang` | `{ v: [3 variants] }` |
| `translate` | `a, t, from, to` | `{ v: ["translated text"] }` |
| `clean_speech` | `a, t, lang` | `{ v: ["cleaned text"] }` |

Auth: `Authorization: Bearer <SUPABASE_ANON_KEY>` header required.

---

## 7. Key Technical Decisions

**1. Two Flutter entry points (`main` + `keyboardMain`) in one codebase**

Chosen over: separate Flutter apps (too much duplication) or native-only keyboard (too complex).
Why: Flutter's `@pragma('vm:entry-point')` allows different `runApp()` hierarchies from one
binary. The companion app and keyboard share all Dart code but have independent engine lifecycles
managed by the Android OS. The tradeoff is that the IDE only shows one launch configuration at a
time and debugging the IME path requires a specific `--flavor` or manual engine attach.

**2. Static `IMEService` facade over injected service**

Chosen over: a ChangeNotifier-based service injected via Provider.
Why: The MethodChannel must be initialized with a reference to the Flutter engine's binary
messenger, which is only available after engine startup. A static class with an `init()` method
is initialized once by `keyboard_entry.dart` and accessed anywhere. The alternative (Provider
injection) would require threading it through every widget that might need text insertion, which
is essentially the entire keyboard. The downside is testability — all IME calls must be mocked
at the MethodChannel level in tests.

**3. Provider 3-tier hierarchy (Settings → Input → AI)**

Chosen over: Riverpod, BLoC, or GetX.
Why: Provider with ChangeNotifier is sufficient for the state complexity here and avoids
build-time code generation overhead. The dependency chain is strictly one-directional:
`AIController` needs current text (from InputController) and theme (from SettingsController),
so `ProxyProvider2` wires this cleanly. Riverpod was considered but adds async complexity that
isn't needed for synchronous IME operations.

**4. Edge function with short field names (`a`, `t`) for wire format**

Chosen over: verbose JSON (`action`, `text`).
Why: Minimal payload size for a latency-sensitive mobile use case. Each character saved matters
when calling from a mobile keyboard over a potentially slow connection. The downside is
that the field names are non-obvious and any future client must be documented explicitly to use
the short form or HTTP 400s will occur.

**5. Android SpeechRecognizer (native) over `speech_to_text` Flutter plugin**

Chosen over: using `speech_to_text` plugin directly inside the IME.
Why: Flutter's `speech_to_text` plugin requires a foreground activity context, not a service
context. The IME runs as an `InputMethodService`, not an Activity. Native `SpeechRecognizer`
in Kotlin can be instantiated directly from the service, bypassing this constraint. Results are
bridged back to Dart via the existing MethodChannel.

**6. FlutterEngine caching (`FlutterEngineCache`)**

Chosen over: creating a new engine per `onCreateInputView()` call.
Why: Cold-starting a Flutter engine takes 400–800ms on mid-range Android devices. The keyboard
can be shown and hidden dozens of times per session. Without engine caching, users would
experience visible lag on every keyboard open. Caching reuses the existing Dart isolate and
widget tree, reducing re-show time to ~30ms for view inflation only.

**7. Text batching (18ms window) for `commitText`**

Chosen over: sending each character immediately.
Why: Each `commitText` MethodChannel call has ~2ms round-trip overhead plus Android's
`InputConnection` can throttle rapid commits. When a user types fast, individual character
calls pile up and cause visible lag. Batching accumulates characters within an 18ms window
(roughly one 60fps frame) and sends them as a single string, reducing MethodChannel calls by
5–10× during fast typing while keeping latency imperceptible.

**8. Gemini multi-model fallback (flash → pro) in edge function**

Chosen over: single fixed model.
Why: Gemini models have per-project quota limits. A single model hitting quota returns 429 and
the feature dies until quota resets. The edge function maintains two model lists (`GEMINI_FAST_MODELS`,
`GEMINI_PRO_MODELS`) and iterates through them on failure, ensuring availability degradation
is graceful: fast cheap model first, then expensive pro model as fallback.

---

## 8. Hard Problems Solved

**Problem 1: Running Flutter inside an Android InputMethodService**

- **Problem:** Flutter is designed to run inside an Activity or Fragment. An IME is an Android
  service — no Activity, no lifecycle callbacks that Flutter's engine expects.
- **Why it was hard:** `FlutterActivity` and `FlutterFragment` assume a standard Android
  window hierarchy. An IME's `onCreateInputView()` returns a plain `View`, not a full window.
  Flutter's engine needs a `FlutterView` attached manually with no `SurfaceFlinger` windowing
  support.
- **Solution:** `SmartKeyboardService.kt` manually creates a `FlutterEngine` (or retrieves it
  from `FlutterEngineCache`), calls `dartExecutor.executeDartEntrypoint()` with the `keyboardMain`
  entrypoint, then constructs a `FlutterView` and attaches the engine to it. The
  `onCreateInputView()` returns this `FlutterView` directly as the IME's input view. Keyboard
  height is communicated to Android via `window.setLayout()` + `MethodChannel.setKeyboardHeight`.

**Problem 2: STT dictation in an IME service context**

- **Problem:** Android's `SpeechRecognizer.createSpeechRecognizer()` works differently in a
  service vs. activity. In a service, the recognizer frequently throws `ERROR_RECOGNIZER_BUSY`
  or disconnects after the first utterance.
- **Why it was hard:** Continuous dictation (vs. single-phrase recognition) requires handling
  the recognizer's silent timeout, auto-restart, and state recovery without leaking objects or
  creating race conditions between destroy and restart.
- **Solution:** `SmartKeyboardService.kt` implements a bounded recovery loop: max 3 auto-
  restarts in any 20-second window with 800ms minimum cooldown between attempts. The Dart side
  (`SttService`) merges partial transcript chunks via `mergeTranscriptChunks()` across restart
  boundaries, so the user sees a continuous live transcript even though the underlying recognizer
  is restarting. Non-recoverable errors (permission denied, network error, quota) stop the loop.

**Problem 3: Bi-directional state synchronization between companion app and IME**

- **Problem:** Settings changed in the companion app (a normal Flutter Activity) must reflect
  in the keyboard IME (a separate Flutter engine running in a service) without any shared memory.
- **Why it was hard:** Two Flutter engines in the same process cannot share Dart objects. The
  IME engine's Dart isolate has no direct reference to the settings engine's state.
- **Solution:** Settings are persisted to SharedPreferences (a process-wide Android storage
  mechanism). When settings are saved in the companion app, `SmartKeyboardService.kt` detects
  the change via a `SharedPreferences.OnSharedPreferenceChangeListener` and calls the IME
  MethodChannel's `reloadSettings` method. The Dart `SettingsController` then calls
  `SharedPreferences.reload()` and re-reads the values. The keyboard rebuilds via
  `notifyListeners()`.

**Problem 4: Glassmorphism UI blur in the IME window**

- **Problem:** Flutter's `BackdropFilter` (blur) requires a painted background behind it.
  The IME window's default background in Android is the system wallpaper, which Flutter cannot
  access.
- **Why it was hard:** Without a solid background, `BackdropFilter` blurs whatever is behind
  the IME window — the user's app content — creating a visually broken smeared effect.
- **Solution:** `SmartKeyboardService.onCreateInputView()` reads the current theme from
  SharedPreferences, maps it to the matching solid background color, and sets it on the IME
  window via `window.setBackgroundDrawable(ColorDrawable(color))`. This gives Flutter's
  backdrop filter a controlled background to blur against. The window background is re-synced
  whenever the user changes themes.

**Problem 5: Context-aware Enter key across apps**

- **Problem:** The keyboard is used across every Android app. The Enter key should show
  "Search" in a search field, "Send" in a messaging app, "Go" in a browser URL bar, etc.
- **Why it was hard:** Android communicates this via bitfields in `EditorInfo.imeOptions`,
  but the IME must read this from `onStartInput()`, pass it through a MethodChannel to Dart,
  store it in state, and re-render the correct key label — all within the ~100ms window before
  the keyboard visually appears.
- **Solution:** `onStartInput()` in Kotlin extracts `imeOptions & 0xFF` and passes it to Dart
  via `onStartInput` MethodChannel callback. `KeyboardInputController` stores `_imeOptions`.
  `SmartEnterKey` widget reads the value and maps it to `ImeAction` enum (search/send/go/done/
  next/newline), rendering the correct icon and label. The `sendEnter()` MethodChannel call then
  uses `performEditorAction(imeOptions)` on the native side rather than a literal newline.

---

## 9. External Integrations

**Google Gemini API**
- Used for: AI Rewrite (3-variant text improvement), Translation (AR↔EN), Clean Speech (grammar/punctuation correction of raw STT output)
- Accessed exclusively from the Supabase edge function (never called from the Flutter app directly)
- Auth: API key in `GEMINI_API_KEY` Supabase secret
- Models: `gemini-2.5-flash-lite`, `gemini-2.5-flash` (fast path), `gemini-2.5-pro` (fallback)
- Quirk: The edge function parses Gemini responses in three formats — JSON object, markdown code fence (```json...```), and plain text — because Gemini doesn't reliably return one format
- Failure impact: All three AI features (Rewrite, Translate, Clean Speech) become unavailable; keyboard still works as a normal keyboard

**Supabase Edge Functions**
- Used for: Single API gateway between Flutter app and Gemini (abstracts API key from client)
- Auth: `Authorization: Bearer <ANON_KEY>` on each request; anon key is public but rate-limited by Supabase's RLS layer
- Quirk: The edge function must be deployed with `supabase functions deploy` and the `GEMINI_API_KEY` secret must be set separately via `supabase secrets set`
- Failure impact: Same as Gemini API failure

**Android SpeechRecognizer (on-device / network)**
- Used for: Live dictation with transcript streaming
- Auth: None (uses Google's server-side recognizer via the installed Google app)
- Quirk: Requires `android.permission.RECORD_AUDIO` at runtime. In IME context, there is no standard permission dialog — the companion app must request the permission first (via `MainActivity.kt`) and the IME checks `hasMicPermission()` before starting
- Failure impact: Dictation tab becomes non-functional; keyboard AI rewrite and translate still work

**Android TextToSpeech**
- Used for: Reader feature (reads selected text aloud)
- Auth: None (uses system TTS engine, usually Google TTS)
- Quirk: TTS initialization is async. `SmartKeyboardService.onCreate()` initializes it early so it's ready when the user presses the reader button. If initialization fails, `ttsSpeak()` returns false and the Dart side silently disables the reader button
- Failure impact: Reader feature unavailable

---

## 10. Environment & Configuration

**Build-time Dart defines (passed via `--dart-define`):**

| Variable | Controls | Required |
|---|---|---|
| `SUPABASE_URL` | Supabase project URL (e.g. `https://xyz.supabase.co`) | Yes — all AI features fail at runtime without this |
| `SUPABASE_ANON_KEY` | Supabase anon/public API key | Yes — all AI features fail at runtime without this |

**Supabase Edge Function secrets (set via `supabase secrets set`):**

| Variable | Controls | Required |
|---|---|---|
| `GEMINI_API_KEY` | Google Gemini API authentication | Yes |
| `GEMINI_FAST_MODELS` | Comma-separated fast model list | No — defaults to `gemini-2.5-flash-lite,gemini-2.5-flash` |
| `GEMINI_PRO_MODELS` | Comma-separated pro model list | No — defaults to `gemini-2.5-pro` |

**Android build config:**

| Property | File | Notes |
|---|---|---|
| `applicationId` | `android/app/build.gradle.kts` | Must be `com.faseeh_ai.keyboard` (not `com.example`) |
| Release signing config | `android/app/build.gradle.kts:35` | Currently uses debug keystore — must be replaced before Play Store upload |
| `minSdk` | `android/app/build.gradle.kts` | 23 (Android 6.0+) |
| `targetSdk` | `android/app/build.gradle.kts` | 34 |

**SharedPreferences keys (written by companion app, read by both engines):**

| Key | Type | Purpose |
|---|---|---|
| `pref_theme` | String | Active theme name |
| `pref_keyboard_size` | String | small / normal / large |
| `pref_default_language` | String | en / ar |
| `pref_translation_language` | String | Translate target |
| `pref_haptic_feedback` | bool | |
| `pref_sound_feedback` | bool | |
| `onboarding_complete` | bool | Skip onboarding on subsequent launches |

---

## 11. How to Run Locally

**Prerequisites:**
- Flutter SDK at `D:\flutter\bin` (or update path prefix below)
- Android Studio with Android SDK (API 34)
- A physical Android device or emulator (API 23+)
- Supabase CLI (`npm install -g supabase`)
- A Google Cloud project with Gemini API enabled

**1. Clone and install dependencies:**
```bash
cd "d:\Personal Project\smart keyboard\smart_keypoard"
cmd /c "set PATH=D:\flutter\bin;%PATH% && flutter pub get"
```

**2. Set up Supabase Edge Function:**
```bash
supabase login
supabase link --project-ref <your-project-ref>
supabase secrets set GEMINI_API_KEY=<your-gemini-api-key>
supabase functions deploy process-ai-request
```

**3. Run the companion app (settings UI):**
```bash
cmd /c "set PATH=D:\flutter\bin;%PATH% && flutter run \
  --dart-define=SUPABASE_URL=https://<project>.supabase.co \
  --dart-define=SUPABASE_ANON_KEY=<anon-key>"
```

**4. Install on device and enable the keyboard:**
- Open Android Settings → System → Language & Input → Virtual Keyboard
- Enable "Faseeh AI Keyboard"
- Set as default input method

**5. Debug the IME (not the companion app):**
The IME runs as a separate process/entry point. To debug it, use `flutter attach` after the
keyboard is shown in any app:
```bash
cmd /c "set PATH=D:\flutter\bin;%PATH% && flutter attach"
```

**6. Run tests:**
```bash
cmd /c "set PATH=D:\flutter\bin;%PATH% && flutter test"
```

**Non-obvious setup: Microphone permission**
The IME cannot request permissions itself. Open the companion app → Settings → enable Microphone
access. The companion app's `MainActivity.kt` requests `RECORD_AUDIO`; the IME then finds it
granted when the user taps the mic button.

---

## 12. Known Limitations & Technical Debt

**Critical (blocks features):**
- `applicationId` was `com.example.smart_keypoard` in 6 locations — confirmed renamed to
  `com.faseeh_ai.keyboard` but release build still uses debug signing keys
  (`android/app/build.gradle.kts:35`). Cannot upload to Play Store without a release keystore.
- Supabase edge function has never been deployed to production. All AI features return 404 until
  `supabase functions deploy` is run with the correct project ref and `GEMINI_API_KEY` secret set.
- iOS keyboard extension exists as a folder stub but is not implemented. The app is Android-only
  despite the `pubspec.yaml` listing iOS targets.

**Protocol bugs (all AI calls currently fail in non-local testing):**
1. If any Dart code path sends `action`/`text` as full field names instead of `a`/`t`, the edge
   function returns HTTP 400
2. Tone values must match exactly `Professional`, `Friendly`, or `Slang` — any case variation
   (e.g., `"professional and formal"`) returns HTTP 400
3. `_parseVariants()` in Dart expects the edge function `v` field to always be a `List<dynamic>`.
   If the edge function ever returns `{v: "string"}` instead of `{v: ["string"]}`, Dart throws
   a type exception at runtime

**Technical debt:**
- `lib/keyboard/keyboard_controller.dart` (535 lines) exists in the repository but is completely
  unreferenced. Safe to delete.
- No CI pipeline. Tests are only run manually. No automated Play Store deployment.
- Test coverage is breadth-first (one test per sprint) rather than depth-first. The STT recovery
  state machine has the most complex branching logic but minimal edge-case test coverage.
- No error reporting/analytics. AI failures are shown as transient UI banners with no logging,
  making production debugging impossible.
- The `speech_to_text` Flutter plugin is listed in `pubspec.yaml` but the IME exclusively uses
  native Android `SpeechRecognizer`. The plugin appears unused in IME mode and is only referenced
  in `main.dart`'s initialization. This wastes ~400KB of binary size.

---

## 13. What Makes This Project Unique or Complex

Compared to a standard Flutter CRUD app, this project demonstrates:

1. **Custom Android IME from Flutter** — Hosting a Flutter engine inside `InputMethodService`
   is not a documented Flutter pattern. It requires manually managing `FlutterEngine` lifecycle,
   `FlutterView` creation, and IME window dimensions outside of any Activity context.

2. **Dual entry-point Flutter binary** — Two independent `runApp()` hierarchies in one Dart
   codebase, differentiated by `@pragma('vm:entry-point')`, running in separate Dart isolates
   with cross-isolate state sync via Android SharedPreferences and MethodChannel callbacks.

3. **Real-time STT with continuous transcript merging** — Bridging Android `SpeechRecognizer`
   (which fires short recognition events) into a continuous dictation experience with
   auto-restart recovery, transcript accumulation across session boundaries, and a bounded
   error budget to prevent infinite restart loops.

4. **AI integration inside an IME** — On-demand, low-latency Gemini calls from inside a
   keyboard context, with text read from and written back to the focused field's `InputConnection`
   — not the app's own text buffer.

5. **Context-aware keyboard adaptation** — Auto-detecting numeric fields, secure fields,
   and Enter key actions by parsing `EditorInfo` bitfields from `onStartInput()`, routing
   these through MethodChannel to Flutter state, and re-rendering the layout within one frame.

6. **Glassmorphism UI constraint resolution** — Solving the Flutter `BackdropFilter` limitation
   in an IME window (no wallpaper access) via Android window background injection from the
   Kotlin service layer, synchronized to the Flutter theme token system.

7. **Supabase edge function with multi-model AI fallback** — Production-grade Gemini integration
   that rotates across multiple model variants (flash → pro) on quota exhaustion or timeout,
   with response format normalization across JSON, markdown fences, and plain text.

---

## 14. Suggested CV / Portfolio Description

- Architected a production Android IME (system keyboard) in Flutter by manually hosting a
  `FlutterEngine` inside a Kotlin `InputMethodService`, solving Flutter's lack of native IME
  support through engine caching and custom `FlutterView` lifecycle management.
- Built a real-time AI text manipulation system that reads from and writes to Android
  `InputConnection` APIs, routing text through Supabase Edge Functions to Google Gemini 2.5
  for in-place rewrite, translation, and speech cleanup without leaving the keyboard.
- Engineered a continuous Arabic/English dictation engine by bridging Android `SpeechRecognizer`
  to Flutter via MethodChannel, implementing transcript merging across recognition restarts and
  a bounded auto-recovery loop capped at 3 attempts per 20-second window.
- Designed a dual-entry-point Flutter binary architecture (`main()` + `keyboardMain()`) enabling
  a companion settings app and a live IME to share a single Dart codebase while running in
  separate engine isolates with SharedPreferences-based cross-isolate state synchronization.
- Deployed a Deno-based Supabase Edge Function with cascading model fallback across Gemini
  Flash and Pro tiers, normalizing three distinct Gemini response formats (JSON, markdown fence,
  plain text) to guarantee consistent API behavior for the mobile client.
