import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Kepler Dev — Connected product engineering";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(<div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "84px", background: "#101b2c", color: "#f5f2ea", fontFamily: "sans-serif" }}><div style={{ display: "flex", color: "#47c7bf", fontSize: 36, fontWeight: 700, letterSpacing: -1 }}>Kepler Dev</div><div style={{ display: "flex", marginTop: 44, maxWidth: 900, fontSize: 78, fontWeight: 700, letterSpacing: -4, lineHeight: 1.06 }}>Replace fragmented operations with one connected product.</div><div style={{ display: "flex", marginTop: 34, color: "#c4c9d2", fontSize: 28 }}>Founder-led product engineering</div></div>, size);
}
