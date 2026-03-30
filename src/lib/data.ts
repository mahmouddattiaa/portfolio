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
  longDescription: string;
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
    company: "iScore",
    role: "Full-Stack Developer Intern",
    period: "Jul 2025 - Aug 2025",
    description: "Built a credit score monitoring app using React Native, Expo, and Node.js. Implemented secure email automation, AI-driven insights, and Egyptian Pound payments integration. Gained hands-on exposure to enterprise-grade network infrastructure.",
  },
  {
    company: "Codveda",
    role: "Full Stack Developer Intern",
    period: "Aug 2025 - Oct 2025",
    description: "Developed and maintained responsive web applications using React.js and Node.js. Integrated third-party RESTful APIs and optimized backend endpoints. Collaborated in an Agile/Scrum environment using Git for version control.",
  },
  {
    company: "Enactus Egypt",
    role: "Volunteer Developer",
    period: "Dec 2024 - Present",
    description: "Developed accessibility tools for individuals with disabilities. Secured 3rd place in TCCD 13th Edition Research Competition. Collaborated on mobile-first projects in cross-functional teams.",
  },
  {
    company: "Smart Electronics",
    role: "Technical Support Specialist",
    period: "Jun 2021 - May 2025",
    description: "Resolved 50+ weekly hardware/network issues, boosting customer satisfaction. Configured routers and switches for client system compatibility.",
  }
];

export const projects: Project[] = [
  {
    id: "hs-vpn",
    title: "HS VPN",
    description: "Production-grade WireGuard VPN app for Android and iOS, built with Flutter. Features global server selection and one-tap connect.",
    longDescription: "A production-grade WireGuard VPN app for Android and iOS, built with Flutter. It implements modern, fast, and cryptographically sound VPN tunneling via wireguard-go. Features include a clean dashboard with one-tap connect, global server selection with real-time latency, live connection metrics, auto-reconnect, and a privacy-first approach. The architecture is a three-layer system utilizing Flutter for the UI, Kotlin for native Android VPN services, and a Python (FastAPI) backend for peer registration.",
    features: [
      "One-tap WireGuard connection via wireguard-go",
      "Global server selection with real-time latency",
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
    description: "Enterprise-grade LMS with AI-powered study tools and real-time collaboration. Features sub-100ms sync and spaced repetition algorithms.",
    longDescription: "Focus Ritual integrates generative AI, real-time collaboration, and spaced repetition algorithms to transform passive study into active mastery. Built as a Monorepo using NPM Workspaces, it leverages Google Gemini Pro for analyzing documents and generating flashcards. The platform ensures sub-100ms latency for collaborative sessions using Socket.io and utilizes MongoDB aggregation pipelines for deep performance analytics.",
    features: [
      "Real-time State Synchronization (Socket.io)",
      "Generative AI Engine (Gemini Pro)",
      "Spaced Repetition Algorithm (SM-2)",
      "Monorepo Architecture (NPM Workspaces)",
      "Enterprise-Grade Security & RBAC"
    ],
    tags: ["React", "Socket.io", "Gemini AI", "MongoDB", "Monorepo"],
    link: "https://focus-ritual-app-web.vercel.app",
    iconName: "Brain",
    color: "bg-emerald-500/10 text-emerald-500",
    category: "web",
    images: ["/projects/focus-ritual/hero.png"],
  },
  {
    id: "medconnect",
    title: "MedConnect Egypt",
    description: "A B2B2C medical referral platform connecting doctors and patients. Built as a high-scale Monorepo with NestJS Microservices and React Native.",
    longDescription: "MedConnect is a comprehensive B2B2C solution designed to bridge the gap between healthcare providers and patients in Egypt. Built using a robust Monorepo architecture with Turborepo, it features a scalable NestJS backend using Microservices architecture (Prisma + PostgreSQL) and a high-performance React Native mobile app. The system handles complex user roles, secure medical data transmission, and real-time appointment scheduling.",
    features: [
      "Microservices Architecture for scalability",
      "Turborepo Monorepo for shared type safety",
      "Secure Authentication with JWT & Bcrypt",
      "Real-time Consultation status updates",
      "Dockerized development environment"
    ],
    tags: ["NestJS", "Microservices", "Monorepo", "Docker", "Postgres"],
    link: "#",
    iconName: "ShieldCheck",
    color: "bg-blue-500/10 text-blue-500",
    category: "mobile",
    images: ["/projects/medconnect/hero.png"],
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
    images: ["/projects/quickcharging/hero.png"],
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
    images: ["/projects/collab-platform/hero.png"],
  },
  {
    id: "stayease",
    title: "StayEase",
    description: "Full-stack hotel booking platform with real-time availability, Stripe payments, host dashboard, and geospatial search. Built to compete with Airbnb-style short-stay markets.",
    longDescription: "StayEase is an end-to-end hotel booking platform covering guest discovery, real-time availability locking, Stripe payment processing, and a full host dashboard. The search engine runs geospatial MongoDB Atlas queries filtered by availability, capacity, and amenities — results cached in Redis under 200ms. A two-phase booking flow locks availability for 10 minutes via TTL reservations while the guest completes payment through Stripe Elements. Socket.io pushes real-time confirmation to both guest and host. Hosts manage listings, calendars, and earnings via Stripe Connect. Images are processed through an AWS Lambda pipeline on upload (resize, compress, WebP) before S3/CloudFront delivery.",
    features: [
      "Geospatial hotel search with Redis caching under 200ms",
      "Two-phase availability locking to prevent double-bookings",
      "Stripe + Stripe Connect for guest payments and host payouts",
      "Real-time booking confirmation via Socket.io",
      "AWS Lambda image pipeline: resize, compress, WebP on upload"
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
    description: "AI-powered cross-platform fitness app that generates fully personalized workout programs. Built with Flutter and a custom sports-science periodization engine.",
    longDescription: "FitForge replaces generic workout templates with a deterministic program generation engine rooted in sports science — periodization models, MEV/MAV/MRV volume landmarks, and automatic progressive overload. Users complete a 4-step onboarding (goal, equipment, frequency, experience level) and receive a full 4–8 week mesocycle instantly. The app is offline-first: sessions are logged to local Hive storage and synced to MongoDB when connectivity returns. Built with Flutter for iOS and Android from a single codebase, with a Node.js + Redis backend handling program logic and caching.",
    features: [
      "Custom sports-science periodization engine (MEV/MAV/MRV)",
      "Offline-first architecture with Hive + conflict-resolving sync",
      "Automatic progressive overload detection per exercise",
      "Background-safe rest timer via flutter_local_notifications",
      "Weekly volume, strength trends & streak analytics (fl_chart)"
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
    images: ["/projects/getlab/hero.png"],
  },
];
