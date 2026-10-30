# StayEase — Hotel Discovery & Booking Platform

---

## Overview

StayEase is a full-featured hotel booking web application that connects travelers with accommodations worldwide. It provides a seamless end-to-end experience — from discovery and filtering to booking confirmation and post-stay review — while simultaneously offering property owners a dedicated host dashboard to manage their listings, availability, and earnings.

The platform is built to compete in the short-stay accommodation space by prioritizing speed, clarity, and trust. Every interface decision — from the search result layout to the booking sidebar — is designed to reduce friction and get the user from intent to confirmed reservation in as few steps as possible.

---

## Vision

Most booking platforms overwhelm users with complexity: dozens of filters, opaque pricing, misleading availability, and checkout flows that feel like tax filing. StayEase is built on the opposite philosophy — clarity first. Pricing is transparent from the first card the user sees. Availability is real-time. The booking flow is three steps maximum.

For hosts, the vision is equally focused: a property management experience that requires no training. A host should be able to list a property, set their calendar, and start receiving bookings within twenty minutes of signing up. The platform handles payment processing, guest communication prompts, and booking conflict prevention automatically.

The long-term roadmap includes AI-powered travel recommendations, dynamic pricing suggestions for hosts based on local demand, and multi-property management for boutique hotel operators.

---

## Tech Stack

### Frontend (Web Client)
- **React.js** — Component-based UI architecture. The search page, hotel detail views, booking flow, and both guest and host dashboards are built as independent React modules with shared component libraries.
- **Redux Toolkit** — Global state management for search parameters, booking flow state, and authenticated user session.
- **React Query (TanStack Query)** — Server state management and data fetching. Handles caching of search results, automatic background refetching, and loading/error states without manual useEffect boilerplate.
- **React Router v6** — Client-side routing with protected routes for authenticated guest and host sections.
- **Leaflet.js + React-Leaflet** — Interactive map rendering on the search results page. Hotel markers are clustered and update dynamically as the user pans or applies filters.
- **Tailwind CSS** — Utility-first styling for consistent design system implementation across all pages.

### Backend
- **Node.js + Express** — Core API server. Handles all business logic: search queries, booking creation, availability validation, payment orchestration, and host management operations.
- **MongoDB + Mongoose** — Primary database. Stores hotel listings, room types, bookings, user profiles, reviews, and host earnings records. MongoDB's flexible document model suits the varied structure of hotel property data — a boutique villa and a city-center hotel chain have fundamentally different attributes, and the schema accommodates both.
- **Redis** — Caching layer for search results and hotel availability data. Given that availability queries are the most frequent and performance-sensitive operations on the platform, Redis dramatically reduces database load during peak traffic.
- **Socket.io** — Real-time communication for the booking confirmation flow. When a booking is confirmed, both the guest's confirmation page and the host's dashboard update in real time without a page refresh.

### Payments
- **Stripe** — Full payment processing integration. Guest payments are captured at booking and held in escrow. Payouts to hosts are triggered automatically 24 hours after guest check-in, minus the platform's service fee. Stripe webhooks handle payment event callbacks (successful charge, failed charge, refund) and update booking status in MongoDB accordingly.
- **Stripe Connect** — Enables host onboarding with identity verification, payout bank account management, and multi-currency support for international hosts.

### Authentication & Security
- **JWT + HTTP-only cookies** — Stateless authentication with tokens stored in HTTP-only cookies to prevent XSS-based token theft.
- **bcrypt** — Password hashing.
- **Google OAuth 2.0** — Social login option for guests and hosts.
- **Rate limiting (express-rate-limit)** — Applied to authentication endpoints and booking creation to prevent abuse.

### Infrastructure
- **AWS EC2** — Application server.
- **AWS S3 + CloudFront** — Hotel photo storage and CDN delivery. All images are processed on upload (resized, compressed, WebP conversion) via a Lambda function before being stored in S3.
- **MongoDB Atlas** — Managed cloud database with geospatial indexing enabled for location-based hotel search.
- **AWS Lambda** — Serverless functions for image processing on upload and scheduled tasks (e.g., sending check-in reminder emails 24 hours before arrival).
- **SendGrid** — Transactional email: booking confirmations, cancellation notices, host payout notifications, and review request emails.
- **Vercel** — Frontend deployment with edge caching and automatic preview deployments on pull requests.

---

## How the System Works

### 1. Hotel Search
The search experience starts on the landing page where the user enters a destination city, check-in and check-out dates, and the number of guests. On submission, the frontend sends a query to the Express search API. The backend executes a geospatial query against MongoDB Atlas using a `$near` operator on the hotel's stored coordinates, filtering by availability (cross-referenced against the bookings collection to exclude fully booked properties), minimum guest capacity, and any additional filters the user applies (price range, star rating, amenities).

Search results are cached in Redis with a TTL of 5 minutes keyed by the search parameters. Repeated searches with the same parameters return from cache, bypassing MongoDB entirely.

Results are returned to the frontend and rendered as both a card list and map pins simultaneously. The map uses Leaflet.js with marker clustering so that dense city results remain navigable. As the user drags the map, the search parameters update and a new query fires automatically, filtering results to the visible map boundary.

### 2. Hotel Detail Page
The hotel detail page fetches full property data: all photos, room types with individual pricing and availability, amenities list, host profile, and paginated reviews with aggregate rating. Room availability is queried in real time (not cached) to prevent showing availability that may have been booked seconds ago by another user.

The booking summary sidebar is a live component — selecting a room type or changing dates recalculates the total price (nightly rate × nights + cleaning fee + platform service fee) client-side instantly, with a final server-side validation at booking submission.

### 3. Booking Flow & Availability Locking
When the user clicks "Reserve," the system enters a two-phase booking flow:

**Phase 1 — Availability Lock:** Before the payment step, the backend creates a temporary booking reservation in MongoDB with a 10-minute TTL. This locks the selected dates for that room type, preventing double-bookings while the user completes payment. If the user abandons the flow, a scheduled cleanup job removes expired locks and restores availability.

**Phase 2 — Payment & Confirmation:** The frontend collects payment details via Stripe Elements (card data never touches the application server). On submission, the backend creates a Stripe PaymentIntent, confirms the charge, and on success upgrades the temporary reservation to a confirmed booking in MongoDB. A Socket.io event fires to update the host dashboard in real time. SendGrid dispatches confirmation emails to both guest and host simultaneously.

### 4. Host Dashboard
Hosts access a separate authenticated section of the application. The dashboard provides:
- **Listings management:** Create, edit, and deactivate property listings. Multi-step listing creation form with photo upload (direct-to-S3 via pre-signed URLs), room type configuration, pricing rules, and amenity tagging.
- **Availability calendar:** A visual calendar showing confirmed bookings, blocked dates, and available windows. Hosts can manually block dates (e.g., for personal use) which immediately updates the availability visible to searching guests.
- **Earnings overview:** Monthly breakdown of gross earnings, platform fees deducted, and net payout amounts. Linked to Stripe Connect for direct bank payout management.
- **Booking inbox:** All upcoming and past bookings with guest details, special requests, and check-in/out dates.

### 5. Reviews System
After check-out (determined by the booking's end date passing), the system triggers a review request email to the guest via SendGrid. Reviews are stored in MongoDB, linked to both the booking and the hotel document. On submission, the hotel's aggregate rating is recalculated and updated in the hotel document for fast read access. Hosts can respond to reviews publicly. Reviews are immutable 72 hours after submission.

---

## Key Technical Complexities

- **Double-booking prevention:** The availability locking system using TTL-based temporary reservations with MongoDB transactions ensures that two simultaneous bookings for the same room on the same dates cannot both succeed, even under concurrent load.
- **Geospatial search performance:** MongoDB Atlas geospatial indexes with Redis caching for repeated queries keeps search response times under 200ms for typical city searches even with thousands of listings in the database.
- **Stripe webhook reliability:** Payment events from Stripe are processed idempotently — each webhook event includes a unique ID that is checked against a processed-events log in Redis before acting, preventing duplicate booking confirmations or duplicate payouts in the event of webhook retries.
- **Image pipeline:** All hotel photos go through a Lambda-based processing pipeline on upload that generates multiple resolution variants (thumbnail, medium, full) stored separately in S3, ensuring the search results page loads compressed thumbnails while the detail page serves full-resolution images — without any manual intervention from the host.

---

## Status

Platform fully built and live. Supports guest bookings, host listings, and end-to-end payment processing. Deployed on AWS with Vercel-hosted frontend.
