export interface Skill {
  name: string;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  challenge?: string;
  solution?: string;
  impact?: string;
  longDescription: string;
  features: string[];
  tags: string[];
  link: string;
  iconName: string;
  color: string;
  category: "web" | "mobile" | "system";
  previewLayout?: "mobile" | "wide";
  image?: string;
  images?: string[];
  architectureDiagram?: string;
  githubLink?: string;
  videoUrl?: string;
}

export const skills: Skill[] = [
  { name: "Node.js" },
  { name: "NestJS" },
  { name: "TypeScript" },
  { name: "React Native" },
  { name: "Next.js" },
  { name: "Docker" },
  { name: "PostgreSQL" },
  { name: "Turborepo" },
  { name: "Monorepo" },
  { name: "System Design" },
  { name: "Generative AI" },
  { name: "Socket.io" },
  { name: "Flutter" },
  { name: "WireGuard" },
  { name: "FastAPI" },
  { name: "Prisma" },
];

export const experience: Experience[] = [
  {
    company: "QSERV",
    role: "Software Engineer — Mobile & IoT",
    period: "Feb 2026 - Present",
    description: "Built and shipped a production POS app for gas station automation using React Native on Sunmi industrial devices. Engineered a custom Java Native Module to integrate the Mada (Skyband) Payment Gateway via Android Intents. Implemented an offline-first transaction engine and centralized device management workflows.",
  },
  {
    company: "iScore",
    role: "Full Stack Developer",
    period: "Feb 2024 - Jan 2026",
    description: "Built the iScore credit score monitoring mobile app using React Native and Node.js in a high-security financial environment. Implemented secure data flows and worked directly with large-scale network infrastructure at Egypt's national credit bureau.",
  },
  {
    company: "Codveda",
    role: "Full Stack Developer",
    period: "Feb 2023 - Jan 2024",
    description: "Developed and maintained responsive web applications using React.js and Node.js. Integrated third-party RESTful APIs and optimized backend endpoints. Collaborated in an Agile/Scrum environment using Git for version control.",
  },
  {
    company: "Enactus Egypt",
    role: "Volunteer Developer",
    period: "Dec 2024 - Present",
    description: "Developed accessibility tools for individuals with disabilities. Secured 3rd place in TCCD 13th Edition Research Competition. Collaborated on mobile-first projects in cross-functional teams.",
  },
];

export const projects: Project[] = [
  {
    id: "hs-vpn",
    title: "HS VPN",
    description: "Self-hosted WireGuard VPN infrastructure running across 10+ Linux servers. Live on Google Play with one-tap tunnel connect, live metrics, and dynamic peer provisioning from a custom backend. If you need distributed VPN infrastructure with full control, this is how I build it.",
    challenge: "I wanted a fully controlled VPN stack without relying on third-party VPN SDK providers or managed cloud gateways.",
    solution: "Built a custom Flutter + Kotlin + FastAPI architecture with WireGuard tunnel orchestration, secure key handling, peer registration, and multi-server routing.",
    impact: "Deployed to production on Google Play with a stable self-hosted backend and operational VPN nodes handling real user sessions.",
    longDescription: "A production-grade WireGuard VPN app for Android and iOS, built with Flutter. It implements modern, fast, and cryptographically sound VPN tunneling via wireguard-go. Features include a clean dashboard with one-tap connect, global server selection with real-time latency, live connection metrics, auto-reconnect, and a privacy-first approach. The architecture is a three-layer system utilizing Flutter for the UI, Kotlin for native Android VPN services, and a Python (FastAPI) backend for peer registration.",
    features: [
      "One-tap WireGuard connection via wireguard-go",
      "Global server selection with real-time latency",
      "Live connection metrics and speed graph",
      "Auto-reconnect on network loss",
      "Curve25519 secure key management"
    ],
    tags: ["Flutter", "WireGuard", "Kotlin", "FastAPI"],
    link: "https://play.google.com/store/apps/details?id=com.hsvpn.vpn",
    iconName: "ShieldCheck",
    color: "bg-blue-500/10 text-blue-500",
    category: "mobile",
    previewLayout: "mobile",
    videoUrl: "/projects/hs-vpn/preview.mp4",
    image: "/projects/hs-vpn/hero.png",
    images: [
      "/projects/hs-vpn/hero.png",
      "/projects/hs-vpn/server_selection.png",
      "/projects/hs-vpn/statistics_page.png",
      "/projects/hs-vpn/settings.png",
      "/projects/hs-vpn/settings_support.png",
      "/projects/hs-vpn/premium_infrastructure.png",
      "/projects/hs-vpn/notifications.png",
      "/projects/hs-vpn/privacy_setup.png",
      "/projects/hs-vpn/support_faqs.png"
    ],
  },
  {
    id: "faseeh-ai",
    title: "Faseeh AI Keyboard",
    description: "System-wide Android keyboard that adds rewrite, translation, and speech cleanup directly inside any app without context switching. Shipped with a Kotlin InputMethodService hosting a Flutter engine and reduced keyboard cold start from around 700ms to around 30ms via engine caching. If you need AI features embedded into a custom mobile keyboard, this is how I build it.",
    challenge: "Android does not natively support Flutter as an IME, so building an AI keyboard required bridging Flutter UI into native keyboard service lifecycle constraints.",
    solution: "Implemented a dual-entry Flutter architecture with a cached engine inside Kotlin InputMethodService, then connected Gemini-powered rewriting and translation through Supabase Edge Functions.",
    impact: "Delivered a production AI keyboard architecture that supports bilingual Arabic-English workflows and real-time text enhancement directly from the keyboard.",
    longDescription: "Faseeh AI is a production Android IME with embedded AI capabilities for rewrite, translation, and dictation cleanup. It ships as two Flutter entry points (companion app + keyboard) and uses a Kotlin InputMethodService host with FlutterEngineCache to avoid cold starts. AI requests are routed through Supabase Edge Functions to Gemini models, while keyboard state and preferences persist locally for fast resume.",
    features: [
      "Kotlin InputMethodService hosting Flutter keyboard",
      "Gemini-powered rewrite and translation workflows",
      "Engine caching for near-instant keyboard startup",
      "Bilingual Arabic-English keyboard experience",
      "Companion settings app with synchronized IME state"
    ],
    tags: ["Flutter", "Kotlin", "Android IME", "Gemini AI"],
    link: "https://play.google.com/store/apps/details?id=com.faseeh_ai.keyboard",
    iconName: "Brain",
    color: "bg-violet-500/10 text-violet-400",
    category: "mobile",
    previewLayout: "mobile",
  },
  {
    id: "sintenel",
    title: "Classroom Sentinel",
    description: "A 24/7 Telegram bot that turns noisy Google Classroom feeds into one prioritized task stream with automated deadline alerts. Built as a self-hosted async Python service with hybrid rule-based and AI-assisted classification for announcements and coursework. If you need reliable education or workflow automation bots, this is how I build them.",
    challenge: "Students frequently miss academic tasks due to noisy and disorganized classroom feeds across multiple Google accounts.",
    solution: "Architected a single-process Python bot using asyncio, SQLite, and Google OAuth to fetch, normalize, and classify announcements and coursework. It features a hybrid intelligence pipeline using Gemini for free-text classification.",
    impact: "Reduced missed academic tasks by providing a unified, prioritized feed with automated 24-hour and 2-hour deadline reminders directly in Telegram.",
    longDescription: "Classroom Sentinel is an asynchronous Python Telegram bot that continuously monitors selected Google Classroom courses across multiple Google identities. It classifies new announcements and coursework, extracts and stores deadlines in SQLite, and pushes time-sensitive notifications to an authorized user. The bot features a hybrid intelligence pipeline that combines native Classroom due-date parsing with Gemini schema-constrained JSON classification for noisy free-text announcements. It also includes an idempotent reminder engine with DB-backed threshold alerts and a headless-safe OAuth workflow.",
    features: [
      "Asynchronous Google Classroom data ingestion and normalization",
      "Hybrid intelligence pipeline with Gemini schema-constrained JSON",
      "Idempotent reminder engine (24h/2h threshold alerts)",
      "Headless-safe OAuth workflow for unattended service",
      "Unified multi-account course tracking via conversational UX"
    ],
    tags: ["Python", "Telegram API", "Google Classroom API", "Gemini AI"],
    link: "#",
    githubLink: "#",
    iconName: "ShieldCheck",
    color: "bg-blue-500/10 text-blue-500",
    category: "system",
    image: "/projects/Sintenel/logo.png",
    images: ["/projects/Sintenel/logo.png"],
    videoUrl: "/projects/Sintenel/preview.mp4",
  },
  {
    id: "focus-ritual",
    title: "Focus Ritual",
    description: "AI-powered learning platform for focus sessions, spaced repetition, and collaborative study workflows.",
    longDescription: "Focus Ritual integrates generative AI, real-time collaboration, and spaced repetition algorithms to transform passive study into active mastery. Built as a Monorepo using NPM Workspaces, it leverages Google Gemini Pro for analyzing documents and generating flashcards. The platform ensures sub-100ms latency for collaborative sessions using Socket.io and utilizes MongoDB aggregation pipelines for deep performance analytics.",
    features: [
      "Real-time State Synchronization (Socket.io)",
      "Generative AI Engine (Gemini Pro)",
      "Spaced Repetition Algorithm (SM-2)",
      "Monorepo Architecture (NPM Workspaces)",
      "Role-based dashboards and productivity analytics"
    ],
    tags: ["React", "Socket.io", "Gemini AI", "MongoDB", "Monorepo"],
    link: "https://focus-ritual-app-web.vercel.app",
    iconName: "Brain",
    color: "bg-emerald-500/10 text-emerald-500",
    category: "web",
    image: "/projects/focus-ritual/Screenshot%202026-04-09%20225636.png",
    images: [
      "/projects/focus-ritual/Screenshot%202026-04-09%20225636.png",
      "/projects/focus-ritual/Screenshot%202026-04-09%20225649.png",
      "/projects/focus-ritual/Screenshot%202026-04-09%20225656.png",
      "/projects/focus-ritual/Screenshot%202026-04-09%20225702.png",
      "/projects/focus-ritual/Screenshot%202026-04-09%20225706.png",
      "/projects/focus-ritual/Screenshot%202026-04-09%20225711.png",
      "/projects/focus-ritual/Screenshot%202026-04-09%20225716.png",
      "/projects/focus-ritual/Screenshot%202026-04-09%20225722.png"
    ],
  },
  {
    id: "quickcharging",
    title: "QuickChargingPOS",
    description: "EV Charging payment solution bridged with SkyBand POS terminals. Features Android Native Modules for secure App-to-App payment intent communication.",
    longDescription: "A specialized Fintech solution for EV Charging Stations, enabling seamless payments via SkyBand POS terminals. The core innovation lies in the custom Android Native Module (Java) that bridges React Native with the POS hardware intents, ensuring secure, encrypted transaction handshakes. It includes a custom build system for managing varied APK configurations for different terminal models.",
    features: [
      "Custom Android Native Modules (Java)",
      "Secure SHA-256 App-to-App Handshake",
      "Seamless SkyBand POS Integration",
      "Real-time Transaction Result Parsing",
      "Automated APK Versioning System"
    ],
    tags: ["React Native", "Native Modules", "Android", "Java", "Fintech"],
    link: "#",
    iconName: "Zap",
    color: "bg-yellow-500/10 text-yellow-500",
    category: "mobile",
    image: "/projects/quickcharging/logo.png",
    images: [
      "/projects/quickcharging/home_station_ready/screen.png",
      "/projects/quickcharging/charging_configuration/screen.png",
      "/projects/quickcharging/payment_processing/screen.png",
      "/projects/quickcharging/payment_success/screen.png",
      "/projects/quickcharging/payment_failed/screen.png",
      "/projects/quickcharging/transaction_history/screen.png",
    ],
  },
  {
    id: "medconnect",
    title: "MedConnect Egypt",
    description: "A B2B2C medical referral platform connecting doctors and patients. Built as a high-scale Monorepo with NestJS Microservices and React Native.",
    longDescription: "MedConnect is a comprehensive B2B2C solution designed to bridge the gap between healthcare providers and patients in Egypt. Built using a robust Monorepo architecture with Turborepo, it features a scalable NestJS backend using Microservices architecture (Prisma + PostgreSQL) and a high-performance React Native mobile app. The system handles complex user roles, secure medical data transmission, and real-time appointment scheduling.",
    features: [
      "Microservices Architecture for scalability",
      "Turborepo Monorepo for shared type safety",
      "Secure Authentication with JWT and Bcrypt",
      "Real-time consultation status updates",
      "Dockerized development environment"
    ],
    tags: ["NestJS", "Microservices", "Monorepo", "Docker", "Postgres"],
    link: "#",
    iconName: "ShieldCheck",
    color: "bg-blue-500/10 text-blue-500",
    category: "web",
    image: "/projects/medconnect/logo.png",
    images: [
      "/projects/medconnect/logo.png",
      "/projects/medconnect/login_role_selection/screen.png",
      "/projects/medconnect/doctor_dashboard/screen.png",
      "/projects/medconnect/patient_portal_home/screen.png",
      "/projects/medconnect/create_referral_form/screen.png",
      "/projects/medconnect/specialist_dashboard/screen.png",
      "/projects/medconnect/specialists_directory/screen.png",
      "/projects/medconnect/messaging_center/screen.png",
      "/projects/medconnect/patient_medical_record/screen.png",
      "/projects/medconnect/analytics_reports/screen.png",
      "/projects/medconnect/admin_dashboard/screen.png"
    ],
  },
  {
    id: "stayease",
    title: "StayEase",
    description: "Full-stack hotel booking platform with real-time availability, Stripe payments, host dashboard, and geospatial search. Built to compete with Airbnb-style short-stay markets.",
    longDescription: "StayEase is an end-to-end hotel booking platform covering guest discovery, real-time availability locking, Stripe payment processing, and a full host dashboard. The search engine runs geospatial MongoDB Atlas queries filtered by availability, capacity, and amenities — results cached in Redis under 200ms. A two-phase booking flow locks availability for 10 minutes via TTL reservations while the guest completes payment through Stripe Elements. Socket.io pushes real-time confirmation to both guest and host. Hosts manage listings, calendars, and earnings via Stripe Connect. Images are processed through an AWS Lambda pipeline on upload (resize, compress, WebP) before S3/CloudFront delivery.",
    features: [
      "Geospatial hotel search with Redis caching under 200ms",
      "Two-phase availability locking to prevent double-bookings",
      "Stripe plus Stripe Connect for guest payments and host payouts",
      "Real-time booking confirmation via Socket.io",
      "AWS Lambda image pipeline: resize, compress, WebP on upload"
    ],
    tags: ["React", "Node.js", "MongoDB", "Redis", "Stripe"],
    link: "#",
    iconName: "Hotel",
    color: "bg-cyan-500/10 text-cyan-500",
    category: "mobile",
    image: "/projects/StayEase/logo.png",
    images: [
      "/projects/StayEase/stayease_landing_page/screen.png",
      "/projects/StayEase/stayease_search_results/screen.png",
      "/projects/StayEase/stayease_hotel_detail/screen.png",
      "/projects/StayEase/stayease_confirmation/screen.png",
      "/projects/StayEase/stayease_host_dashboard/screen.png",
      "/projects/StayEase/stayease_inbox/screen.png",
      "/projects/StayEase/stayease_preferences/screen.png",
      "/projects/StayEase/stayease_welcome/screen.png",
      "/projects/StayEase/stayease_settings/screen.png"
    ],
  },
  {
    id: "fitforge",
    title: "FitForge",
    description: "AI-powered cross-platform fitness app that generates fully personalized workout programs. Built with Flutter and a custom sports-science periodization engine.",
    longDescription: "FitForge replaces generic workout templates with a deterministic program generation engine rooted in sports science — periodization models, MEV/MAV/MRV volume landmarks, and automatic progressive overload. Users complete a 4-step onboarding (goal, equipment, frequency, experience level) and receive a full 4–8 week mesocycle instantly. The app is offline-first: sessions are logged to local Hive storage and synced to MongoDB when connectivity returns. Built with Flutter for iOS and Android from a single codebase, with a Node.js + Redis backend handling program logic and caching.",
    features: [
      "Custom sports-science periodization engine (MEV/MAV/MRV)",
      "Offline-first architecture with Hive plus conflict-resolving sync",
      "Automatic progressive overload detection per exercise",
      "Background-safe rest timer via flutter_local_notifications",
      "Weekly volume, strength trends, and streak analytics"
    ],
    tags: ["Flutter", "Riverpod", "Node.js", "MongoDB", "Redis"],
    link: "#",
    iconName: "Dumbbell",
    color: "bg-orange-500/10 text-orange-500",
    category: "mobile",
    videoUrl: "/projects/FitForge/preview.mp4",
    image: "/projects/FitForge/logo.png",
    images: [
      "/projects/FitForge/home_screen/screen.png",
      "/projects/FitForge/active_workout/screen.png",
      "/projects/FitForge/onboarding_goal_selection_refined/screen.png",
      "/projects/FitForge/progress_dashboard/screen.png",
      "/projects/FitForge/settings/screen.png",
      "/projects/FitForge/privacy_policy/screen.png"
    ],
  },
  {
    id: "getlab",
    title: "GetLab System",
    description: "Comprehensive lab equipment management system for Cairo University with role-based access, inventory tracking, and reservation conflict handling.",
    longDescription: "A desktop application built for Cairo University to manage laboratory inventory. It implements role-based access control for professors, students, and lab assistants. The system handles booking conflicts, maintenance reporting, and extensive reporting using Crystal Reports and SQL Server stored procedures.",
    features: [
      "Role-based access control",
      "Reservation conflict handling",
      "Automated maintenance tracking",
      "SQL Server stored procedures",
      "Windows Forms custom UI"
    ],
    tags: ["C#", ".NET", "SQL Server", "Windows Forms"],
    link: "#",
    iconName: "Database",
    color: "bg-red-500/10 text-red-500",
    category: "web",
  },
  {
    id: "collab-platform",
    title: "AI Collab Platform",
    description: "Real-time collaboration workspace with Google Gemini AI integration. Features live code editing, chat, and file sharing via WebSockets.",
    longDescription: "An AI-powered workspace redefining how teams code together. It integrates Google's Gemini AI to provide context-aware code suggestions directly within the editor. The platform relies on Socket.io for sub-millisecond synchronization of code changes, chat messages, and cursor positions across multiple users.",
    features: [
      "Live Collaborative Code Editor (Monaco)",
      "Google Gemini AI Integration",
      "Real-time Cursor Tracking via WebSockets",
      "Secure Room-based Authentication",
      "Integrated File Sharing System"
    ],
    tags: ["Socket.io", "Gemini AI", "React", "Express", "GCP"],
    link: "#",
    iconName: "Share2",
    color: "bg-purple-500/10 text-purple-500",
    category: "web",
  },
  {
    id: "agency-os",
    title: "AgencyOS",
    description: "The command center for modern agencies: plan campaigns, orchestrate execution, automate operations, and prove ROI from one real-time operating layer.",
    longDescription: "AgencyOS is a real-time operating system for growth and creative agencies. It unifies strategy, execution, client collaboration, and financial control into one command layer, replacing fragmented tools and recurring status meetings. Teams move from campaign planning to delivery boards to automated updates with shared context, while leadership gets immediate visibility into pipeline velocity, account health, and profitability.",
    features: [
      "One operating layer for planning, delivery, reporting, and agency ops",
      "Executive dashboard for pipeline velocity, account health, and ROI",
      "Integrated kanban plus plan builder workflows to reduce handoff friction",
      "Client workspace with transparent progress and approval loops",
      "Automation center for reminders, escalations, and status broadcasts",
      "Financial tracking for spend, margins, and operational clarity"
    ],
    tags: ["Next.js", "Dashboard UX", "Workflow Automation", "Client Collaboration"],
    link: "#",
    iconName: "Share2",
    color: "bg-indigo-500/10 text-indigo-500",
    category: "web",
    image: "/projects/AgencyOS/stitch_agency_operating_system/marketing_slide_1_the_hero_reveal/screen.png",
    images: [
      "/projects/AgencyOS/stitch_agency_operating_system/marketing_slide_1_the_hero_reveal/screen.png",
      "/projects/AgencyOS/stitch_agency_operating_system/marketing_slide_2_everything_connected/screen.png",
      "/projects/AgencyOS/stitch_agency_operating_system/marketing_slide_3_real_time_automation/screen.png",
      "/projects/AgencyOS/stitch_agency_operating_system/marketing_slide_4_financial_clarity/screen.png",
      "/projects/AgencyOS/stitch_agency_operating_system/marketing_slide_5_call_to_action/screen.png",
      "/projects/AgencyOS/stitch_agency_operating_system/executive_performance_dashboard/screen.png",
      "/projects/AgencyOS/stitch_agency_operating_system/agency_kanban_board/screen.png",
      "/projects/AgencyOS/stitch_agency_operating_system/client_workspace_brandx/screen.png",
      "/projects/AgencyOS/stitch_agency_operating_system/plan_builder/screen.png",
      "/projects/AgencyOS/stitch_agency_operating_system/financials_expense_tracking/screen.png",
      "/projects/AgencyOS/stitch_agency_operating_system/notification_automation_center/screen.png"
    ],
    videoUrl: "/projects/AgencyOS/preview.mp4",
  },
];
