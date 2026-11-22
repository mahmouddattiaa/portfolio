import { headers } from "next/headers";
import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Kepler Dev — Independent Digital Product and Software Engineering Studio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

function imageData(bytes: Uint8Array, contentType: "image/jpeg" | "image/png") {
  let binary = "";
  for (let offset = 0; offset < bytes.length; offset += 0x8000) {
    binary += String.fromCharCode(...bytes.subarray(offset, offset + 0x8000));
  }
  return `data:${contentType};base64,${btoa(binary)}`;
}

async function localAsset(path: string, contentType: "image/jpeg" | "image/png") {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "";
  const isLocal = /^(localhost|127\.0\.0\.1|\[::1\])(?::\d+)?$/.test(host);
  const isKeplerHost = /^(www\.)?keplerdev\.uk(?::\d+)?$/.test(host);
  const isPreviewHost = /^[a-z0-9-]+\.vercel\.app(?::\d+)?$/i.test(host);
  const origin =
    isLocal || isKeplerHost || isPreviewHost
      ? `${isLocal ? "http" : "https"}://${host}`
      : "https://www.keplerdev.uk";
  const response = await fetch(`${origin}${path}`);
  if (!response.ok) throw new Error(`Could not load ${path} for the social card.`);
  return imageData(new Uint8Array(await response.arrayBuffer()), contentType);
}

export default async function Image() {
  const [courtyard, territoriesAr] = await Promise.all([
    localAsset("/media/home/hero-tree-og.jpg", "image/jpeg"),
    localAsset("/media/home/og-territories-ar.png", "image/png"),
  ]);
  return new ImageResponse(
    <div
      style={{
        position: "relative",
        display: "flex",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        backgroundColor: "#071C18",
        color: "#EEE7DE",
        fontFamily: "Arial, Helvetica, sans-serif",
      }}
    >
      <img
        src={courtyard}
        alt=""
        width="1200"
        height="630"
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "1200px",
          height: "630px",
          objectFit: "cover",
          objectPosition: "center",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "1200px",
          height: "630px",
          backgroundImage:
            "linear-gradient(90deg, rgba(7,28,24,.99) 0%, rgba(7,28,24,.96) 33%, rgba(7,28,24,.78) 59%, rgba(7,28,24,.48) 100%), linear-gradient(0deg, rgba(7,28,24,.58) 0%, rgba(7,28,24,0) 34%, rgba(7,28,24,.13) 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 64,
          top: 64,
          display: "flex",
          flexDirection: "column",
          width: 1072,
          height: 502,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: 210,
            height: 36,
            padding: "0 18px",
            border: "1px solid rgba(238,231,222,.19)",
            borderRadius: 20,
            backgroundColor: "rgba(15,48,41,.68)",
            color: "#EEE7DE",
            fontSize: 13,
            fontWeight: 500,
            letterSpacing: 1.5,
          }}
        >
          KEPLER DEV
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 54,
            color: "#D4A47A",
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: 2,
          }}
        >
          PRODUCT &amp; SYSTEMS ENGINEERING STUDIO · UK &amp; GCC
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: 20,
            maxWidth: 1000,
            fontSize: 56,
            fontWeight: 400,
            letterSpacing: -2.8,
            lineHeight: 1.08,
          }}
        >
          <span>Multi-surface web, mobile, and</span>
          <span>operations platforms built to ship.</span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "auto",
            maxWidth: 880,
            color: "#C6D0CB",
            fontSize: 19,
            lineHeight: 1.42,
          }}
        >
          <span>Contract-first OpenAPI backends, Sunmi Android POS bridges, and Arabic-first RTL</span>
          <span>dashboards — 100% client source ownership.</span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 26,
            paddingTop: 22,
            borderTop: "1px solid rgba(238,231,222,.24)",
            color: "#D4A47A",
            fontSize: 13,
            fontWeight: 600,
          }}
        >
          <span>keplerdev.uk · 6 Flagships · 13 Studio Builds</span>
          <img
            src={territoriesAr}
            alt=""
            width="255"
            height="17"
            style={{ width: "255px", height: "17px" }}
          />
        </div>
      </div>
    </div>,
    size,
  );
}
