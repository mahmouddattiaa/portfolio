export interface Skill {
  name: string;
  icon: string;
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
}

export const skills: Skill[] = [
  { name: "Node.js", icon: "🟢" },
  { name: "NestJS", icon: "🦁" },
  { name: "TypeScript", icon: "📘" },
  { name: "React Native", icon: "📱" },
  { name: "Next.js 14", icon: "▲" },
  { name: "Docker", icon: "🐳" },
  { name: "Postgres", icon: "🐘" },
  { name: "Turborepo", icon: "⚡" },
  { name: "Monorepo", icon: "🏗️" },
  { name: "System Design", icon: "📐" },
  { name: "Generative AI", icon: "✨" },
  { name: "Socket.io", icon: "🔌" },
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
  },
];
