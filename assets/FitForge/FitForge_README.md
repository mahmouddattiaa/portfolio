# FitForge — AI-Powered Workout Planner

---

## Overview

FitForge is a cross-platform mobile fitness application built to replace the guesswork in personal training. Instead of relying on generic workout templates or expensive personal trainers, FitForge generates fully personalized workout programs based on each user's goal, available equipment, and schedule — then guides them through every session in real time, tracking every set, rep, and rest period along the way.

The application is positioned at the intersection of structured fitness programming and intuitive mobile UX. It is designed for gym-goers of all levels who want a plan that adapts to their life, not the other way around.

---

## Vision

The fitness app market is saturated with content — but most apps give users a library of exercises and leave them to figure out the programming themselves. FitForge takes the opposite approach: the user answers a short onboarding sequence, and the app takes complete ownership of building their program. Every decision — volume, intensity, exercise selection, rest days, progressive overload — is handled automatically.

The long-term vision is a training companion that evolves with the user. As they log workouts, FitForge adjusts load recommendations week over week, detects stalling progress, and suggests deload weeks or routine variations. The goal is to replicate the experience of having a knowledgeable coach in your pocket, available every day, at no recurring cost beyond the app itself.

---

## Tech Stack

### Mobile (Client)
- **Flutter** — Single codebase targeting both iOS and Android. Chosen for its high-performance rendering engine, expressive widget system, and suitability for animated, interaction-heavy fitness UIs such as rest timers, exercise carousels, and progress charts.
- **Riverpod** — State management. Handles workout session state, user profile, and real-time set logging with a reactive, provider-based architecture.
- **flutter_local_notifications** — Rest timer alerts and session reminders.
- **fl_chart** — Native Flutter charting library used for weekly volume graphs, body weight trends, and workout frequency calendars.
- **Hive** — Lightweight local NoSQL storage for offline workout logging. Sessions are saved locally first, then synced to the backend when connectivity is available.

### Backend
- **Node.js + Express** — RESTful API server handling user authentication, workout program generation logic, and data persistence.
- **MongoDB + Mongoose** — Document-based database storing user profiles, generated programs, session logs, and exercise libraries. The flexible schema fits naturally with the varied structure of workout data.
- **Redis** — Used for caching frequently accessed exercise data and user program states, reducing database reads during active workout sessions.
- **JWT + bcrypt** — Stateless authentication with secure password hashing.

### AI / Program Generation
- **Custom Rule-Based Engine (Node.js)** — The program generation system is a deterministic engine that applies established sports science principles: periodization models, volume landmarks per muscle group (MEV/MAV/MRV), and progressive overload schemes. It is not an LLM — it is a structured algorithm that guarantees reproducible, evidence-based output.
- Future iterations plan to integrate a fine-tuned recommendation layer that adjusts suggestions based on historical session data.

### Infrastructure
- **AWS EC2** — Application server hosting.
- **AWS S3** — Storage for exercise demonstration videos and images.
- **MongoDB Atlas** — Managed cloud database with automated backups and horizontal scaling.
- **CloudFront CDN** — Delivery of static assets (exercise media) with low latency globally.
- **GitHub Actions** — CI/CD pipeline for automated testing and deployment on push to main.

---

## How the System Works

### 1. Onboarding & Program Generation
When a new user opens FitForge, they complete a 4-step onboarding flow:
- **Goal selection:** Muscle gain, fat loss, or maintenance.
- **Equipment availability:** Full gym, home with dumbbells, or bodyweight only.
- **Training frequency:** 3, 4, 5, or 6 days per week.
- **Experience level:** Beginner, intermediate, or advanced.

This data is sent to the backend where the program generation engine maps the inputs against its training templates and exercise database. The engine selects an appropriate training split (e.g., Push/Pull/Legs for 5–6 days, Upper/Lower for 4 days, Full Body for 3 days), assigns exercises per session, and sets starting volume and intensity parameters. The full program — typically structured as a 4–8 week mesocycle — is returned to the app and stored both in MongoDB and locally via Hive.

### 2. Active Workout Session
When the user starts a session, the app enters workout mode. Each exercise is presented with its target sets, rep range, and a recommended starting weight based on their experience level. The user logs each set by entering the actual weight and reps performed. A configurable rest timer starts automatically after each set. The session state is maintained entirely in local Hive storage during the workout so that a connectivity drop never interrupts a session. On session completion, the data is synced to MongoDB.

### 3. Progressive Overload Logic
After each completed session, the backend evaluates performance. If the user hit the top of the rep range on all sets of an exercise, the system flags that exercise for a weight increase in the next session. If they fell short, the weight stays the same. This logic runs server-side and updates the program stored in MongoDB, so the next time the user opens the app, the updated weights are already reflected.

### 4. Progress Tracking
The progress tab pulls aggregated session data from the backend and renders it client-side using fl_chart:
- **Weekly volume chart:** Total sets per muscle group per week.
- **Strength trend:** Best set weight over time for key exercises (bench press, squat, deadlift, etc.).
- **Streak calendar:** Visual heatmap of training consistency.
- **Body weight log:** Optional manual entry with trend line.

### 5. Offline-First Architecture
FitForge is designed to function fully without an internet connection during a session. The current program, exercise library, and session history are cached locally in Hive. Sync operations (program updates, session uploads, progress data) are queued and executed when the device reconnects. This makes the app reliable in environments with poor connectivity, such as basement gyms or travel.

---

## Key Technical Complexities

- **Offline-first sync conflict resolution:** When a session logged offline is synced to the server, the system must handle potential conflicts with any server-side program updates that occurred in the meantime. The resolution strategy prioritizes local session data (the ground truth of what actually happened) and merges server updates for future sessions only.
- **Program generation correctness:** The engine must respect hard constraints — for example, never placing two sessions that train the same muscle group on consecutive days, always distributing volume across the week according to recovery requirements, and ensuring the exercise pool matches the user's equipment availability exactly.
- **Real-time rest timer accuracy:** Flutter's timer behavior is unreliable when the app is backgrounded. The app uses a combination of `flutter_local_notifications` and timestamp-based elapsed time calculation to ensure timer accuracy regardless of app state.

---

## Status

Application fully built and deployed. Available on iOS and Android. Backend hosted on AWS. Used by active users across multiple fitness levels and training goals.
