import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { publicCaseStudies } from "@/lib/content";
import { getPresentation } from "@/components/case-study/presentation";
import { ContentsRail } from "@/components/case-study/contents-rail";
import { GlitreArticle } from "@/components/case-study/glitre-article";
import { GlitreShell } from "@/components/case-study/glitre-shell";
import { glitreRailSections } from "@/components/case-study/glitre-content";

export const dynamicParams = false;

export const metadata: Metadata = {
  title: "Glitre Loyalty Platform Case Study — Kepler Dev Studio",
  description:
    "How Kepler Dev engineered a GCC fuel loyalty ecosystem across 4 surfaces under 1 OpenAPI contract with an append-only points ledger and zero axe violations.",
  alternates: { canonical: "https://www.keplerdev.uk/work/glitre-loyalty-platform" },
};

export function generateStaticParams() {
  return [{ slug: "glitre-loyalty-platform" } as { slug: string }];
}

export default function GlitreParentPage() {
  const study = publicCaseStudies.find((item) => item.slug === "glitre-loyalty-platform");
  if (!study) notFound();
  const copy = getPresentation("glitre-loyalty-platform");
  if (!copy) notFound();
  return (
    <article className="cs-page glitre-page">
      <GlitreShell>
        <ContentsRail
          sections={glitreRailSections}
          verification={copy.footerLine.verificationDate}
        />
        <GlitreArticle study={study} copy={copy} />
      </GlitreShell>
    </article>
  );
}
