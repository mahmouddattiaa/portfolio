import type { RailSection } from "./contents-rail";

export const hsVpnVerifiedLabel = "Verified 25 September 2026";
export const hsVpnGooglePlayUrl =
  "https://play.google.com/store/apps/details?id=com.hsvpn.vpn";
export const hsVpnAndroidPackage = "com.hsvpn.vpn";
export const hsVpnGooglePlayDeveloper = "Hossam Technology Company LLC";

export const hsVpnRailSections: RailSection[] = [
  { id: "hsvpn-problem", label: "The problem" },
  { id: "hsvpn-experience", label: "The experience" },
  { id: "hsvpn-architecture", label: "Architecture" },
  { id: "hsvpn-connection", label: "A connection" },
  { id: "hsvpn-decisions", label: "Key decisions" },
  { id: "hsvpn-coverage", label: "Where it ran" },
  { id: "hsvpn-delivery", label: "Delivery" },
];

export const hsVpnHeroLead =
  "Mahmoud led the product end to end: the problem definition in Egypt-style DPI-heavy networks, the visual language, the Flutter-and-native split, the per-node registrar, the catalog control plane, and store delivery.";

export const hsVpnCoverageNote =
  "Founder-reported Firebase observations, owner-confirmed September 2026.";

export const hsVpnCoverageRows = [
  {
    label: "Egypt",
    detail:
      "Designed-for-environment. Daily use across home, mobile, and café networks where ordinary WireGuard is fingerprinted or blocked.",
  },
  {
    label: "Iran",
    detail:
      "Active throughout the month per Firebase, with daily use from a base of users who reach the app through the production Android build.",
  },
  {
    label: "Turkmenistan",
    detail:
      "About 1,500 users with daily use per Firebase. The figure is reported as observed by the founder, not as a measured active-user count.",
  },
] as const;

export const hsVpnProtocolNote =
  "Android uses an AmneziaWG-oriented path on networks where plain WireGuard is blocked; the iOS TestFlight build uses the WireGuardKit packet-tunnel extension. OpenVPN is not part of the shipped product.";

export const hsVpnExcludedRegionsNote =
  "Russia is not represented in the published product or release figures. The case study does not claim any Russian users, downloads, or operational presence.";

export const hsVpnRolePoints = [
  "Crossed the product and operational boundaries: defining the connection experience, shaping the dark visual language, deciding how Flutter and native VPN code would divide responsibilities.",
  "Designed the registration and configuration path, ran the per-region server infrastructure, and moved the Android and iOS builds through store delivery.",
];

export const hsVpnExperiencePoints = [
  "The main path keeps location choice and the connection control close together. Once protected, the dashboard makes the session state prominent; a separate statistics view lets someone inspect the session in detail.",
  "Those simple screens sit on top of catalog selection, peer registration, native tunnel work, and a confirmed handshake. The visible interaction is a single tap. The engineering work is everything that has to be true before that tap can honestly become “Protected”.",
];

export const hsVpnArchitecturePoints = [
  "Flutter owns the screens, the connection orchestrator, and the catalog choices. Native code on Android and iOS owns the actual tunnel lifecycle and the OS-level VPN integration.",
  "A per-node FastAPI registrar handles peer registration and IP assignment. Firebase Remote Config supplies the live server catalog with cached and bundled fallbacks, so a remote outage does not remove every location.",
];

export const hsVpnConnectionSteps = [
  {
    title: "Resolve a server catalog",
    body: "Remote Config, then a last-known-good cache, then a bundled bootstrap. An unavailable remote response does not remove every option.",
  },
  {
    title: "Order the candidate profiles",
    body: "The orchestrator orders supported profiles for the device and network; Android prefers an AmneziaWG-capable option when enabled.",
  },
  {
    title: "Register the client",
    body: "The client public key goes to the selected node's FastAPI registrar for peer registration and address assignment.",
  },
  {
    title: "Start the native tunnel",
    body: "Hand the connection to Android or iOS VPN APIs rather than treating a Flutter button event as a tunnel.",
  },
  {
    title: "Confirm the handshake",
    body: "Show Protected only after native handshake evidence indicates that the session is working.",
  },
] as const;

export const hsVpnDecisions = [
  {
    title: "Make the status honest",
    consequence: "A user sees Protected only after a real handshake, not merely after a service starts.",
    mechanism: "Connection state waits for native handshake evidence.",
  },
  {
    title: "Recover the catalog",
    consequence: "A remote configuration outage need not remove every location.",
    mechanism: "Remote Config, cached, and bundled catalog layers.",
  },
  {
    title: "Keep native responsibility clear",
    consequence: "Product flow can change without bypassing OS tunnel rules.",
    mechanism: "Flutter orchestrates; Kotlin and Swift own native VPN lifecycle.",
  },
  {
    title: "Place ads after connection truth",
    consequence: "Monetization does not define protected status or block a disconnect action.",
    mechanism: "Connection-aware placement and remote switches.",
  },
] as const;

export const hsVpnFacts = [
  {
    label: "Android · primary platform",
    value: "Live on Google Play",
    detail: "AmneziaWG path is in production; plain WireGuard is also available.",
    platform: "android" as const,
  },
  {
    label: "iOS · secondary platform",
    value: "TestFlight build only",
    detail:
      "Plain WireGuard packet-tunnel extension. No public App Store release confirmed.",
    platform: "ios" as const,
  },
  {
    label: "Visible interaction",
    value: "One tap",
    detail: "A confirmed handshake is the point at which the session is protected.",
  },
  {
    label: "Catalog fallback",
    value: "Three layers",
    detail: "Remote Config, last-known-good cache, bundled bootstrap catalog.",
  },
] as const;
