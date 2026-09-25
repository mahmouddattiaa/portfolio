import type { RailSection } from "./contents-rail";

export const hsVpnVerifiedLabel = "Verified 25 September 2026";

export const hsVpnRailSections: RailSection[] = [
  { id: "hsvpn-problem", label: "The problem" },
  { id: "hsvpn-experience", label: "The experience" },
  { id: "hsvpn-role", label: "Mahmoud's role" },
  { id: "hsvpn-connection", label: "A connection" },
  { id: "hsvpn-decisions", label: "Key decisions" },
  { id: "hsvpn-delivery", label: "Delivery" },
];

export const hsVpnConnectionSteps = [
  {
    title: "Resolve a server catalog",
    body: "Use Remote Config, a last-known-good cache, or a bundled catalog so an unavailable remote response does not remove every option.",
  },
  {
    title: "Choose a candidate profile",
    body: "Order the supported profiles for the device and network; Android can prefer an AmneziaWG-capable option when enabled.",
  },
  {
    title: "Register the client",
    body: "Send the client's public key to the selected node's registrar for peer registration and address assignment.",
  },
  {
    title: "Start the native tunnel",
    body: "Hand the connection to Android or iOS VPN APIs rather than treating a Flutter button event as a tunnel.",
  },
  {
    title: "Confirm the handshake",
    body: "Show Protected only after handshake evidence indicates that the session is working.",
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
