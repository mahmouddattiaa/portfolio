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
  longDescription?: string;
  features: string[];
  tags: string[];
  link: string;
  iconName: string;
  color: string;
  category: "web" | "mobile" | "system";
  image?: string;
  images?: string[];
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
    description: "Architected a mission-critical POS application for gas station automation using React Native on Sunmi industrial devices. Engineered a custom Java Native Module to integrate the Mada (Skyband) Payment Gateway via Android Intents. Designed a multi-tenant SaaS architecture for centralized hardware management and implemented an offline-first transaction engine with zero data loss during outages.",
  },
  {
    company: "iScore",
    role: "Full Stack Developer",
    period: "Feb 2024 - Jan 2026",
    description: "Built the iScore credit score monitoring mobile app using React Native and Node.js in a high-security financial environment. Implemented secure data flows and gained hands-on exposure to enterprise-grade network infrastructure at Egypt's national credit bureau.",
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
    description: "Production-grade WireGuard VPN app for Android and iOS. Scaled to handle concurrent global connections with sub-second handshakes.",
    challenge: "Users needed a reliable, cryptographically sound VPN that wouldn't drop connections during network switches while traveling, avoiding the latency issues of traditional protocols.",
    solution: "Architected a three-layer system: Flutter for UI, Kotlin for native Android VPN services (wireguard-go), and a Python (FastAPI) backend for secure peer registration.",
    impact: "Delivered a production-ready application with auto-reconnect capabilities, secure Curve25519 key management, and real-time global server routing under 100ms latency.",
    features: [
      "One-tap WireGuard connection via wireguard-go",
      "Global server routing with sub-100ms latency",
      "Live connection metrics & speed graph",
      "Auto-reconnect on network loss",
      "Curve25519 secure key management"
    ],
    tags: ["Flutter", "Dart", "WireGuard", "Kotlin", "Python", "FastAPI"],
    link: "https://play.google.com/store/apps/details?id=com.hsvpn.vpn",
    iconName: "ShieldCheck",
    color: "bg-blue-500/10 text-blue-500",
    category: "mobile",
    image: "/projects/hs-vpn/hero.png",
    images: [
      "/projects/hs-vpn/hero.png",
      "/projects/hs-vpn/server_selection.png",
      "/projects/hs-vpn/statistics_page.png",
      "/projects/hs-vpn/settings.png",
      "/projects/hs-vpn/premium_infrastructure.png",
      "/projects/hs-vpn/notifications.png",
      "/projects/hs-vpn/privacy_setup.png"
    ],
  },
  {
    id: "focus-ritual",
    title: "Focus Ritual",
    description: "Enterprise-grade LMS integrating generative AI and real-time collaboration. Ensured sub-100ms sync latency across concurrent sessions.",
    challenge: "Passive study methods lead to high drop-off rates. Traditional LMS platforms lack real-time engagement and active recall mechanisms required for deep mastery.",
    solution: "Built a Monorepo using NPM Workspaces, leveraging Google Gemini Pro for instant document analysis, and Socket.io for real-time state synchronization.",
    impact: "Transformed passive study into active mastery, maintaining sub-100ms latency for collaborative sessions and utilizing MongoDB aggregation pipelines for deep performance analytics.",
    features: [
      "Real-time State Synchronization (Socket.io) under 100ms",
      "Generative AI Engine (Gemini Pro) for instant flashcards",
      "Spaced Repetition Algorithm (SM-2)",
      "Monorepo Architecture (NPM Workspaces)",
      "Enterprise-Grade Security & RBAC"
    ],
    tags: ["React", "Socket.io", "Gemini AI", "MongoDB", "Monorepo"],
    link: "https://focus-ritual-app-web.vercel.app",
    iconName: "Brain",
    color: "bg-emerald-500/10 text-emerald-500",
    category: "web",
    image: "/projects/focus-ritual/Screenshot 2026-04-09 225636.png",
    images: [
      "/projects/focus-ritual/Screenshot 2026-04-09 225636.png",
      "/projects/focus-ritual/Screenshot 2026-04-09 225649.png",
      "/projects/focus-ritual/Screenshot 2026-04-09 225656.png",
      "/projects/focus-ritual/Screenshot 2026-04-09 225702.png",
      "/projects/focus-ritual/Screenshot 2026-04-09 225706.png",
      "/projects/focus-ritual/Screenshot 2026-04-09 225711.png",
      "/projects/focus-ritual/Screenshot 2026-04-09 225716.png",
      "/projects/focus-ritual/Screenshot 2026-04-09 225722.png",
    ],
  },
  {
    id: "medconnect",
    title: "MedConnect Egypt",
    description: "A B2B2C medical referral platform connecting doctors and patients. Scaled via NestJS Microservices to handle complex, high-volume healthcare data securely.",
    challenge: "Healthcare providers and patients in Egypt needed a secure, reliable way to transmit medical data and schedule appointments in real-time.",
    solution: "Architected a robust Monorepo with Turborepo, featuring a scalable NestJS backend using Microservices (Prisma + PostgreSQL) and a high-performance React Native app.",
    impact: "Bridged the gap between doctors and patients, handling complex user roles and secure medical data transmission with real-time consultation status updates.",
    features: [
      "Microservices Architecture for high scalability",
      "Turborepo Monorepo for shared type safety",
      "Secure Authentication with JWT & Bcrypt",
      "Real-time Consultation status updates",
      "Dockerized deployment for enterprise reliability"
    ],
    tags: ["NestJS", "Microservices", "Monorepo", "Docker", "Postgres"],
    link: "#",
    iconName: "ShieldCheck",
    color: "bg-blue-500/10 text-blue-500",
    category: "mobile",
    image: "/projects/medconnect/login_role_selection/screen.png",
    images: [
      "/projects/medconnect/login_role_selection/screen.png",
      "/projects/medconnect/doctor_dashboard/screen.png",
      "/projects/medconnect/patient_portal_home/screen.png",
      "/projects/medconnect/create_referral_form/screen.png",
      "/projects/medconnect/specialist_dashboard/screen.png",
      "/projects/medconnect/specialists_directory/screen.png",
      "/projects/medconnect/messaging_center/screen.png",
      "/projects/medconnect/patient_medical_record/screen.png",
      "/projects/medconnect/analytics_reports/screen.png",
      "/projects/medconnect/admin_dashboard/screen.png",
    ],
  },
  {
    id: "quickcharging",
    title: "QuickChargingPOS",
    description: "Fintech EV Charging payment solution bridged with SkyBand POS terminals. Engineered secure Android Native Modules for zero-loss transactions.",
    challenge: "EV charging stations required a seamless, encrypted payment handshake directly with SkyBand POS hardware without relying on flaky web-based payment gateways.",
    solution: "Engineered a custom Android Native Module (Java) to bridge React Native with POS hardware intents, implementing a secure SHA-256 app-to-app handshake.",
    impact: "Enabled secure, offline-first transaction processing with zero data loss, accelerating deployment through an automated APK versioning system for varied terminal models.",
    features: [
      "Custom Android Native Modules (Java)",
      "Secure SHA-256 App-to-App Handshake",
      "Seamless SkyBand POS Hardware Integration",
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
    id: "collab-platform",
    title: "AI Collab Platform",
    description: "Real-time collaboration workspace with Google Gemini AI integration. Features sub-millisecond sync for live code editing and chat.",
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
    id: "stayease",
    title: "StayEase",
    description: "Full-stack hotel booking platform featuring geospatial search and real-time locking. Achieved sub-200ms query times using Redis caching.",
    challenge: "Short-stay markets face significant double-booking issues and slow geospatial search times when querying large datasets of properties.",
    solution: "Implemented geospatial MongoDB Atlas queries cached in Redis, alongside a two-phase booking flow utilizing TTL reservations and Socket.io for live confirmations.",
    impact: "Delivered sub-200ms search results and completely eliminated double-bookings through strict 10-minute availability locks, driving increased booking conversions.",
    features: [
      "Geospatial hotel search with Redis caching under 200ms",
      "Two-phase availability locking preventing double-bookings",
      "Stripe + Stripe Connect for automated payouts",
      "Real-time booking confirmation via Socket.io",
      "AWS Lambda image pipeline: resize, compress, WebP"
    ],
    tags: ["React", "Node.js", "MongoDB", "Redis", "Stripe", "Socket.io", "AWS"],
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
      "/projects/StayEase/stayease_settings/screen.png",
    ],
  },
  {
    id: "fitforge",
    title: "FitForge",
    description: "AI-powered fitness engine generating personalized periodization programs. Implemented an offline-first sync architecture eliminating connectivity drop-offs.",
    challenge: "Generic workout templates lead to user plateaus and churn. Users needed deterministic, sports-science-backed programs that work seamlessly even in gyms with no internet.",
    solution: "Replaced static templates with a custom periodization engine (MEV/MAV/MRV). Built an offline-first architecture using Hive storage with background conflict-resolving sync to MongoDB.",
    impact: "Reduced user onboarding drop-off by generating full 4–8 week mesocycles instantly and ensured 100% workout data retention regardless of network connectivity.",
    features: [
      "Custom sports-science periodization engine (MEV/MAV/MRV)",
      "Offline-first architecture with Hive + background sync",
      "Automatic progressive overload detection",
      "Background-safe rest timer via native notifications",
      "Weekly volume & strength trends analytics"
    ],
    tags: ["Flutter", "Riverpod", "Node.js", "MongoDB", "Redis", "AWS"],
    link: "#",
    iconName: "Dumbbell",
    color: "bg-orange-500/10 text-orange-500",
    category: "mobile",
    image: "/projects/FitForge/logo.png",
    images: [
      "/projects/FitForge/home_screen/screen.png",
      "/projects/FitForge/active_workout/screen.png",
      "/projects/FitForge/onboarding_goal_selection_refined/screen.png",
      "/projects/FitForge/progress_dashboard/screen.png",
      "/projects/FitForge/settings/screen.png",
      "/projects/FitForge/privacy_policy/screen.png",
    ],
  },
  {
    id: "getlab",
    title: "GetLab System",
    description: "Comprehensive Lab Equipment Management System for Cairo University. Handles role-based access, inventory tracking, and reservation conflicts.",
    longDescription: "A massive Desktop Application built for Cairo University to manage laboratory inventory. It implements a complex role-based access control (RBAC) system for Professors, Students, and Lab Assistants. The system handles booking conflicts, maintenance reporting, and extensive reporting using Crystal Reports and SQL Server stored procedures.",
    features: [
      "Role-Based Access Control (RBAC)",
      "Complex Reservation Conflict Algorithms",
      "Automated Maintenance Tracking",
      "SQL Server Stored Procedures for Logic",
      "Windows Forms with Custom UI Controls"
    ],
    tags: ["C#", ".NET", "SQL Server", "Windows Forms", "System Design"],
    link: "#",
    iconName: "Database",
    color: "bg-red-500/10 text-red-500",
    category: "system",
  },
];
