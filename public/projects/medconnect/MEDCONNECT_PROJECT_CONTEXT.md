# Project Context: MedConnect

## 1. What This Project Does
MedConnect is a digital B2B2C medical referral platform designed to transform the healthcare referral system in Egypt. It solves the critical problems of referral leakage, lost revenue for referring doctors, and fragmented patient medical histories. By providing a closed-loop digital ecosystem, primary physicians can instantly refer patients to trusted specialists, transfer medical snapshots, and automatically track and receive referral commissions, while patients receive exclusive discounts.

## 2. Tech Stack
| Layer | Technologies |
|---|---|
| Language(s) | TypeScript |
| Runtime / Framework | Node.js, NestJS (Backend), React Native / Expo (Mobile) |
| Database(s) | PostgreSQL (via TypeORM), Redis |
| Auth | JWT, Passport, bcrypt |
| Infrastructure / Deployment | Docker (Local DB/Redis), AWS/Azure (Planned) |
| External APIs / Services | AWS Textract (OCR - Planned), Payment Gateway (Stripe/Paymob - Planned), FCM (Push - Planned) |
| Testing | Jest, Supertest |
| Tooling | npm workspaces (monorepo), ESLint, Prettier |

## 3. Architecture Overview
The system is structured as a monorepo containing a monolithic NestJS backend API and a React Native Expo mobile application. 
- The **Backend API** handles authentication, doctor/patient management, referral tracking, geofencing validation, and a digital wallet/commission ledger. It uses PostgreSQL for persistent, relational data and Redis for caching/sessions.
- The **Mobile App** provides the interface for doctors to create referrals, upload prescription images, and view their wallets, as well as an interface for clinic secretaries to handle patient check-ins.
- **Data Flow:** A doctor creates a referral (optionally uploading a prescription image) -> Patient arrives at specialist -> Secretary performs a geofenced check-in -> System triggers real-time notifications, logs the visit, and credits the referring doctor's digital wallet.

## 4. Directory Structure
```
/
├── apps/
│   ├── api/          # NestJS backend API containing controllers, services, and TypeORM entities
│   │   ├── src/auth/            # JWT authentication and guards
│   │   ├── src/database/        # TypeORM configuration, migrations, and entities
│   │   ├── src/referrals/       # Referral logic and prescription uploads
│   │   └── src/wallet/          # (Planned) Wallet and transaction logic
│   └── mobile/       # React Native Expo mobile application
│       ├── src/components/      # Reusable UI components
│       ├── src/screens/         # Application screens (Login, Dashboard, CreateReferral)
│       └── src/services/        # API communication services
├── packages/
│   └── shared/       # Shared TypeScript types and schemas (placeholder for now)
├── docker-compose.yml # Docker configuration for local PostgreSQL and Redis
└── package.json      # Monorepo configuration and workspace scripts
```

## 5. Data Models / Schema
- **User:** Represents all platform actors (doctors, secretaries, admins). Has an enum for roles and a one-to-one relationship with `Wallet`.
- **Patient:** Represents patients. Sensitive data like National ID is stored as an AES-256 encrypted byte array (`nationalIdEncrypted`), with a separately hashed string (`nationalIdHash`) for indexing and fast lookups.
- **Referral:** Tracks a referral from a `referringDoctor` to a `specialist` for a `patient`. Includes status, discount codes, prescription image URLs, and check-in metadata (location, time).
- **Transaction:** A ledger entry for financial movements (commissions, withdrawals). Links to a `User` and optionally a `Referral`.
- **Wallet:** Tracks the current balance, pending commissions, and total earned/withdrawn for a `User`.

## 6. API Surface
Major API routes (all require JWT Auth unless marked Public):
- **Auth:**
  - `POST /auth/register` (Public): Register a new user.
  - `POST /auth/login` (Public): Authenticate and receive JWT.
  - `POST /auth/refresh`: Refresh JWT token.
  - `GET /auth/me`: Get current user profile.
- **Referrals:**
  - `POST /referrals`: Create a new referral.
  - `GET /referrals`: List user's sent or received referrals.
  - `GET /referrals/statistics`: Get referral metrics.
  - `PATCH /referrals/:id/status`: Update a referral's state (e.g., pending -> completed).
  - `POST /referrals/:id/prescription`: Upload a prescription image for the referral.
- **Doctors:**
  - `GET /doctors` (Public): Search/list doctors by specialty.
  - `GET /doctors/me`: Get current doctor profile.

## 7. Key Technical Decisions
- **AES-256 Encryption for Patient IDs:** To comply with medical data privacy while allowing the system to identify returning patients, the National ID is encrypted before storage, but a one-way hashed version is also saved to allow for database indexing and `WHERE` lookups.
- **Double-Handshake & Geofencing:** To prevent fraudulent referral check-ins, the system validates the physical GPS coordinates of the clinic secretary during the patient check-in process.
- **NPM Workspaces Monorepo:** Chosen to easily share TypeScript interfaces, DTOs, and validation schemas between the NestJS backend and the React Native frontend in the future, reducing duplication.
- **Digital Wallet Ledger:** Instead of processing micro-transactions to bank accounts for every referral, the system credits a virtual wallet. This minimizes payment gateway fees and allows for weekly/monthly bulk settlements.

## 8. Hard Problems Solved
- **Problem: The "Lazy Doctor" Data Entry Challenge.** Doctors often rely on quick, handwritten prescriptions and resist complex data entry.
  - **Solution:** Allowed doctors to simply snap a photo of the handwritten prescription during referral creation. This image is queued for a hybrid AI (OCR) and human-in-the-loop transcription process, converting it to structured digital medical records without changing the doctor's physical workflow.
- **Problem: System Bypass & Referral Leakage.** Patients or specialists might bypass the platform to avoid paying the platform commission once a connection is made.
  - **Solution:** Implemented a unique "Referral Code" system that gives the patient an exclusive discount only valid if checked-in through the app. The patient effectively acts as an auditor, enforcing platform compliance.
- **Problem: Storing PII Securely.** Medical records and National IDs are highly sensitive.
  - **Why it was hard:** Encrypting the National ID means you can't easily search the database for "Does this patient already exist?" using standard SQL equality checks.
  - **Solution:** Implemented a dual-column approach: one column stores the fully encrypted ID (for retrieval), and another stores a deterministic SHA-256 hash of the ID (for unique indexing and rapid `WHERE` lookups).

## 9. External Integrations
- **AWS Textract (Planned):** Will be used to perform initial OCR on handwritten prescription uploads to pre-fill data for human transcribers.
- **Stripe/Paymob (Planned):** Will be integrated to handle the actual withdrawal of funds from the virtual `Wallet` to the doctor's real-world bank account.

## 10. Environment & Configuration
- `DATABASE_URL` (Required): PostgreSQL connection string (e.g., `postgresql://user:pass@localhost:5432/db`).
- `REDIS_URL` (Required): Redis connection string (e.g., `redis://localhost:6379`).
- `PORT` (Optional): The port for the NestJS API to listen on (defaults to 3000).

## 11. How to Run Locally
1. Ensure Node.js (LTS) and Docker Desktop are installed.
2. Clone the repository and run `npm install` from the root to install workspaces.
3. Start the local database and Redis containers:
   ```bash
   docker compose up -d
   ```
4. Start the NestJS backend API:
   ```bash
   npm run dev:api
   ```
5. Start the Expo React Native mobile app:
   ```bash
   npm run dev:mobile
   ```

## 12. Known Limitations & Technical Debt
- **Static Encryption Keys:** The Patient entity currently derives AES keys using a static, hardcoded secret (`'medconnect-secret-key'`). This is a placeholder for development and must be replaced with a secure Key Management Service (KMS) before production.
- **MVP State:** Several complex modules mentioned in the architecture (OCR transcription queue, real laboratory integrations, live payment gateway processing) are currently planned or stubbed out but not fully implemented in the current codebase snapshot.
- **Shared Types:** The `packages/shared` directory is empty, meaning DTOs and models are likely currently duplicated between the API and Mobile apps instead of being properly shared.

## 13. What Makes This Project Unique or Complex
- **Multi-sided Marketplace with Complex Incentives:** The system dynamically balances incentives across Referring Doctors, Specialists, Clinic Secretaries, and Patients, using virtual wallets and gamified discount loops to enforce behavior.
- **Geofenced Financial Triggers:** Commissions and financial ledgers are directly tied to physical, geolocation-verified check-ins, requiring robust fraud-prevention and bypass-protection mechanics.
- **Hybrid Data Processing Pipeline:** Integrates a workflow where image uploads trigger asynchronous processing queues designed for a mix of automated OCR and human transcription.

## 14. Suggested CV / Portfolio Description
- Architected a closed-loop B2B2C medical referral platform using NestJS and React Native to digitize patient handoffs, prevent referral leakage, and automate commission tracking.
- Engineered a secure patient identity system utilizing AES-256 encryption for National IDs alongside deterministic hashing to balance strict data privacy with scalable O(1) database lookups.
- Designed a geofenced, double-handshake check-in system that validates physical clinic presence to prevent referral fraud in a multi-sided healthcare marketplace.
- Developed a real-time digital wallet and transaction ledger using PostgreSQL and TypeORM to manage commission distribution, enabling auditable, batch-processed financial settlements.