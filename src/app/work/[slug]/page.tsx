import type { Metadata } from "next";
import { notFound } from "next/navigation";
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
import { ThemeGate } from "@/components/case-study/theme-gate";
import "../../case-study.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return publicCaseStudies.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = publicCaseStudies.find((item) => item.slug === slug);
  if (!study) return {};
  return {
    title: study.publicTitle || study.title,
    description: study.problem,
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
