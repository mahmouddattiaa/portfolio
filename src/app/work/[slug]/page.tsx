import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { publicCaseStudies } from "@/lib/content";
import { getPresentation } from "@/components/case-study/presentation";
import { CaseStudyArticle } from "@/components/case-study/case-study-article";
import { HsVpnArticle } from "@/components/case-study/hs-vpn-article";
import {
  hsVpnRailSections,
  hsVpnVerifiedLabel,
} from "@/components/case-study/hs-vpn-content";
import { CaseStudyGrain } from "@/components/case-study/grain";
import { ContentsRail } from "@/components/case-study/contents-rail";
import { FlagshipCaseArticle } from "@/components/case-study/flagship-case-article";
import { flagshipPresentations } from "@/components/case-study/flagship-presentations";
import { ThemeGate } from "@/components/case-study/theme-gate";
import "../../case-study.css";

export const dynamicParams = false;

// Option B (selected): the legacy "loyalty-operations-platform" slug is not
// a content record. It is included in generateStaticParams because
// dynamicParams = false requires explicit registration for the dynamic page
// to issue the HTTP 308 redirect to /work/glitre-loyalty-platform.
export function generateStaticParams() {
  return [
    ...publicCaseStudies.map(({ slug }) => ({ slug })),
    { slug: "loyalty-operations-platform" },
  ];
}

const detailMetadata: Record<string, { title: string; description: string }> = {
  "glitre-loyalty-platform": { title: "Glitre Loyalty Platform Case Study — Kepler Dev Studio", description: "How Kepler Dev engineered a GCC fuel loyalty ecosystem across 4 surfaces under 1 OpenAPI contract with an append-only points ledger and zero axe violations." },
  "hs-vpn": { title: "HS VPN Engineering Retrospective & Case Study — Kepler Dev", description: "How Kepler Dev built HS VPN for restricted networks, reaching 10,000+ Google Play downloads with native Kotlin, Swift tunnel extensions, and WireGuard fallback." },
  "quickcharging-pos": { title: "QuickChargingPOS Hardware Case Study — Kepler Dev Studio", description: "Engineering an offline-first fuel POS on Sunmi Android hardware with Java NamiPayModule, Mada HMAC-SHA256 signatures, and thermal receipt print automation." },
  "medconnect-egypt": { title: "MedConnect Egypt Clinical MVP Case Study — Kepler Dev", description: "How Kepler Dev engineered a 38-screen clinical coordination platform with AES-256 encrypted National IDs, SHA-256 blind indexing, and GPS geofenced check-ins." },
  stayease: { title: "StayEase Property Booking Architecture — Kepler Dev", description: "Architecting a high-concurrency booking engine with MongoDB transactional TTL inventory locks and idempotent Redis Stripe webhook settlement over 40+ screens." },
  "classroom-sentinel": { title: "Classroom Sentinel Autonomous Daemon — Kepler Dev Studio", description: "Building a 24/7 autonomous academic operations daemon using Python asyncio, schema-constrained Gemini extraction, and idempotent Telegram alerts in production." },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = publicCaseStudies.find((item) => item.slug === slug);
  if (!study) return {};
  return {
    ...(detailMetadata[slug] ?? { title: study.publicTitle || study.title, description: study.problem }),
    alternates: { canonical: `https://www.keplerdev.uk/work/${study.slug}` },
  };
}

const RAIL_SECTIONS = [
  { id: "section-numbers", label: "Numbers" },
  { id: "section-situation", label: "The situation" },
  { id: "section-delivery", label: "What we delivered" },
  { id: "section-moment", label: "The moment it happens" },
  { id: "section-architecture", label: "How it fits together" },
  { id: "section-decisions", label: "Decisions that matter later" },
];

export default async function WorkDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Owner-selected Option B (2026-10-02): permanently redirect the legacy
  // /work/loyalty-operations-platform URL to /work/glitre-loyalty-platform
  // before any case-study content lookup. The legacy slug is not a content
  // record; generateStaticParams only registers it so this redirect can run.
  if (slug === "loyalty-operations-platform") {
    permanentRedirect("/work/glitre-loyalty-platform");
  }

  const study = publicCaseStudies.find((item) => item.slug === slug);
  if (!study) notFound();

  const isHsVpn = slug === "hs-vpn";

  if (isHsVpn) {
    return (
      <article className="cs-page">
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var p=new URLSearchParams(window.location.search);var t=p.get('theme');if(t==='light'||t==='dark'){document.documentElement.dataset.theme=t;document.documentElement.style.colorScheme=t;try{window.localStorage.setItem('kepler-theme',t)}catch(e){}}}catch(e){}})();`,
          }}
        />
        <ThemeGate />
        <CaseStudyGrain />
        <div className="cs-shell">
          <div className="cs-layout">
            <ContentsRail
              sections={hsVpnRailSections}
              verification={hsVpnVerifiedLabel}
            />
            <HsVpnArticle study={study} />
          </div>
        </div>
      </article>
    );
  }

  const flagshipCopy = flagshipPresentations[slug];
  if (flagshipCopy) {
    const sections = [
      { id: "section-numbers", label: "Evidence" },
      { id: "section-situation", label: "Before and after" },
      { id: "section-delivery", label: "Executive snapshot" },
      { id: "section-architecture", label: "Architecture" },
      { id: "section-decisions", label: "Engineering decisions" },
      { id: "section-gallery", label: "Project media" },
    ];
    return (
      <article className="cs-page">
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var p=new URLSearchParams(window.location.search);var t=p.get('theme');if(t==='light'||t==='dark'){document.documentElement.dataset.theme=t;document.documentElement.style.colorScheme=t;try{window.localStorage.setItem('kepler-theme',t)}catch(e){}}}catch(e){}})();` }} />
        <ThemeGate />
        <CaseStudyGrain />
        <div className="cs-shell"><div className="cs-layout"><ContentsRail sections={sections} verification={`Verified ${study.lastVerified}`} /><FlagshipCaseArticle study={study} copy={flagshipCopy} /></div></div>
      </article>
    );
  }

  const copy = getPresentation(slug);
  if (!copy) notFound();

  return (
    <article className="cs-page">
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(){try{var p=new URLSearchParams(window.location.search);var t=p.get('theme');if(t==='light'||t==='dark'){document.documentElement.dataset.theme=t;document.documentElement.style.colorScheme=t;try{window.localStorage.setItem('kepler-theme',t)}catch(e){}}}catch(e){}})();`,
        }}
      />
      <ThemeGate />
      <CaseStudyGrain />
      <div className="cs-shell">
        <div className="cs-layout">
          <ContentsRail
            sections={RAIL_SECTIONS}
            verification={copy.footerLine.verificationDate}
          />
          <CaseStudyArticle study={study} copy={copy} />
        </div>
      </div>
    </article>
  );
}
