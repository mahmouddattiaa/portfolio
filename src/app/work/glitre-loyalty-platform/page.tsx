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
  title: "Glitre Loyalty Platform · Case study",
  description:
    "A fuel-station loyalty platform coordinating a manager dashboard, customer app and worker app on one API contract in Azure UAE North.",
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