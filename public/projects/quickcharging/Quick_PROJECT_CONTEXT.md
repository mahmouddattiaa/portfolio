# Project Context: QuickChargingPOS

## 1. What This Project Does
QuickChargingPOS is a premium React Native point-of-sale (POS) application designed for fuel and EV charging stations in the Saudi market. It provides station attendants with a streamlined interface to manage fuel dispensing, accept payments, and print receipts directly from Android-based POS terminals (like Sunmi devices). Additionally, it serves station managers by offering a comprehensive dashboard to monitor tank levels, track sales, and log fuel deliveries. The core value lies in its high-speed, offline-capable operations and seamless hardware integrations, which bypass traditional network latency for payments.

## 2. Tech Stack

| Layer | Technologies |
|---|---|
| Language(s) | TypeScript, Java (Native Android) |
| Runtime / Framework | React Native 0.83.1, React Navigation 7 |
| Database(s) | AsyncStorage (Local offline caching) |
| Auth | Basic Authentication (Hardcoded API header) |
| Infrastructure / Deployment | Android APK (Targeted at POS hardware terminals) |
| External APIs / Services | QuikCompany .NET API |
| Testing | Jest, React Test Renderer |
| Tooling (CI, linting, monorepo, etc.) | Metro, ESLint, Prettier, Babel, Patch-Package |

## 3. Architecture Overview
The system is a standalone mobile application with specialized native Android modules, heavily coupled to POS hardware. 
- **Frontend**: A React Native UI divided into two main domains: Attendant Operations (Fueling, Payment, Printing) and Station Management (Dashboard, Tanks, Deliveries).
- **Native Bridge**: Direct integration with the device's hardware (Sunmi Printer) and other installed apps (Nami POS) via custom Java modules.
- **Data Flow**: The app fetches station hierarchy (tanks, nozzles, prices) from the central API. When a transaction occurs, it triggers a local Android Intent to the Nami payment app. Once payment succeeds, it commands the local thermal printer and asynchronously posts the transaction record to the central `.NET` backend.

## 4. Directory Structure
```text
QuickChargingPOS/
├── android/                 # Native Android configuration and custom Java modules
│   ├── app/src/main/java/com/quickchargingpos/ # Contains NamiPayModule.java (App-to-App intent logic)
│   └── app/libs/            # Contains third-party SDKs (SkyBandSDK-release.aar)
├── src/                     # React Native source code
│   ├── api/                 # Axios configuration, API endpoints (quickApi.ts), and TypeScript interfaces
│   ├── components/          # Reusable UI elements (StatusBadge, WalletGauge)
│   ├── context/             # Global React Context (StationDataContext for real-time station info)
│   ├── native/              # TypeScript wrappers for NativeModules (NamiPay.ts)
│   ├── navigation/          # React Navigation stacks and bottom tabs (StationManagementNavigator.tsx)
│   ├── screens/             # Application screens (Admin, Fueling, Payment, Station Management)
│   └── utils/               # Business logic, offline delivery manager, and hardware integrations (sunmiPrinter.ts)
├── patches/                 # Patch-package fixes for dependencies (e.g., sunmi-inner-printer)
└── docs/                    # Project documentation and analysis files
```

## 5. Data Models / Schema
- **Transaction**: The core entity recording a sale. Contains `stationId`, `nozzleNumber`, `paymentMethod` (mada, cash, etc.), `totalVolume`, `totalAmount`, and an offline-generated UUID.
- **Station Hierarchy**: A nested structure defining the physical station. A `Station` has multiple `Dispensers`, which have multiple `Nozzles`, mapped to specific `Tanks`.
- **Tank**: Represents a physical fuel tank with `capacity`, `currentVolume`, `fuelType`, and physical limits.
- **FuelDeliveryRecord**: Represents an incoming truck delivery. Contains `volumeBefore`, `volumeAdded`, `totalCost`, and a `syncStatus`. Kept in `AsyncStorage` to handle offline deliveries.

## 6. API Surface
All endpoints are routed through `https://quikcompany-001-site1.ctempurl.com/api` using an Axios client.
- **`GET /Transaction/GetstationInfo`**: Fetches the station's tanks, nozzles, dispensers, and current fuel prices.
- **`GET /StationHierarchy`**: A legacy fallback endpoint for fetching dispenser and nozzle mappings if `GetstationInfo` fails.
- **`POST /Transaction/PrintSell`**: Submits a completed transaction to the backend. Generates a local UUID to ensure idempotency.
- **`GET /Transaction/GetSellFuel`**: Retrieves the historical list of transactions for the station.

## 7. Key Technical Decisions
- **App-to-App Payment Intent over Cloud API**
  - *Alternative:* Use a cloud-based payment gateway API.
  - *Why:* Cloud APIs introduce 3-5 seconds of latency. By building `NamiPayModule.java` to send an Android Intent directly to the local Nami POS app, payments are initiated instantly, crucial for fast-paced gas stations.
- **Local Storage for Technician Configuration**
  - *Alternative:* Hardcode the API URL or require login every time.
  - *Why:* Storing `@qserv_technician_config` in `AsyncStorage` allows the terminal to be permanently bound to a specific physical station and dynamic `baseUrl` without hardcoding it into the binary, simplifying deployment across different locations.
- **Offline-First Fuel Deliveries**
  - *Alternative:* Direct API POST for deliveries.
  - *Why:* Gas stations frequently experience internet outages. `deliveryManager.ts` caches deliveries in `AsyncStorage` (capped at 50 records) to ensure station managers can receive fuel trucks even when offline.

## 8. Hard Problems Solved
- **Problem: Secure App-to-App Payment Communication**
  - **Why it was hard:** The Nami POS app requires a securely signed binary payload to prevent fraudulent payment requests. Standard React Native cannot interface with the required `SkyBandSDK`.
  - **Solution:** Authored a custom React Native Java module (`NamiPayModule.java`). It dynamically generates an `ecr-txn-event` Intent, constructs the transaction payload, calculates a SHA-256 HMAC signature using the terminal ID and ECR reference, and packs it into a byte array using the SDK before launching the activity.
- **Problem: Thermal Printing from React Native**
  - **Why it was hard:** React Native lacks native support for standard thermal ESC/POS commands, and the specific Sunmi hardware requires proprietary service bindings.
  - **Solution:** Integrated `react-native-sunmi-inner-printer` (with a custom patch) and built a robust wrapper (`sunmiPrinter.ts`). It handles column alignment, double-width fonts for totals, and gracefully degrades to console logging if the app is run on a non-Sunmi emulator.

## 9. External Integrations
- **Nami POS (SkyBand)**: A separate Android app running on the terminal. Used for processing EMV/NFC card payments. The integration relies on an Android `startActivityForResult` Intent. If it fails or isn't installed, card payments are completely blocked.
- **Sunmi Inner Printer**: Proprietary hardware thermal printer. Used to print physical receipts for customers and delivery summaries for managers.
- **QuikCompany API**: The central `.NET` backend. Required for syncing transactions, fetching prices, and getting the station hierarchy. 

## 10. Environment & Configuration
*N/A — The project does not use traditional `.env` files. Configuration is dynamically set at runtime.*
- **Technician Setup**: On first launch, the app routes to `TechnicianSetupScreen` where the user inputs the `baseUrl` and `stationId`. This is persisted in `AsyncStorage` and used to configure the Axios client dynamically (`updateApiConfig`).

## 11. How to Run Locally
1. Clone the repository and install Node dependencies:
   ```bash
   npm install
   ```
2. Ensure you have the Android SDK and NDK installed (as configured in `gradle.properties`).
3. Start the Metro bundler:
   ```bash
   npm run start
   ```
4. Build and run the Android app (A physical Sunmi POS device or standard Android emulator is required):
   ```bash
   npm run android
   ```
   *(Note: The iOS build is present but non-functional for production, as the core payment and printing modules are Android-exclusive).*

## 12. Known Limitations & Technical Debt
- **Hardcoded Security Credentials**: The API client (`quickApi.ts`) uses a hardcoded Basic Auth token (`Basic YWRtaW46MTIzNDU=`). Furthermore, `NamiPayModule.java` currently uses hardcoded test values (`TEST_CASH_REGISTER_NO`, `TEST_TERMINAL_ID`) for generating the payment signature. These must be made dynamic before a production rollout.
- **Error Handling**: API failures in the QuickApi service heavily rely on `console.error` rather than propagating user-friendly error boundaries to the UI.
- **Platform Coupling**: The app is strictly bound to Android. The iOS folder exists but lacks the native implementations for the printer and payment SDKs.

## 13. What Makes This Project Unique or Complex
Unlike a standard CRUD application, QuickChargingPOS operates at the edge of hardware and software. It demonstrates significant engineering depth in:
- **Native Android Bridging**: Passing serialized binary data and SHA-256 signatures through Android Intents to communicate with third-party software.
- **Hardware Peripherals**: Direct interaction with proprietary thermal printers, requiring precise string formatting and ESC/POS-style commands.
- **Resilient Operations**: Handling physical real-world constraints, such as maintaining functional parity for fuel deliveries when a gas station loses internet connectivity.

## 14. Suggested CV / Portfolio Description
- Engineered a React Native point-of-sale application deployed on Android POS terminals for EV and fuel stations, managing real-time transactions and hardware integrations.
- Architected a custom Java native module bridging the SkyBand SDK, reducing payment processing latency by utilizing App-to-App Android Intents for secure EMV transactions.
- Implemented offline-first fuel delivery tracking using AsyncStorage, ensuring continuous station operations during network outages.
- Integrated proprietary thermal printing capabilities via Sunmi hardware APIs to generate localized, formatted receipts directly from the device.