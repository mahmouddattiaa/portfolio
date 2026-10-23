import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { publicCaseStudies } from "@/lib/content";
import { ContentsRail } from "@/components/case-study/contents-rail";
import { GlitreShell } from "@/components/case-study/glitre-shell";
import "./manager.css";

const screenshots = [
  {
    key: "overview",
    label: "01 / Operations overview",
    railLabel: "Operations overview",
    title: "Start with the whole network.",
    description: "Review stations, staff and activity, with every work area close at hand.",
    caption: "Overview · Work areas and operational summaries.",
    alt: "Glitre operations overview with work-area navigation, admin role information and summaries for stations, workers, transactions, complaints, offers and audit events.",
    width: 1842,
    height: 965,
  },
  {
    key: "sign-in",
    label: "02 / Secure access",
    railLabel: "Secure access",
    title: "A clear entry point for the team.",
    description: "Dedicated admin sign-in with Arabic and English language options.",
    caption: "Sign-in · Access to the operations console.",
    alt: "Glitre operations console sign-in screen with Arabic and English language options and empty email and password fields.",
    width: 1309,
    height: 773,
  },
  {
    key: "stations",
    label: "03 / Station management",
    railLabel: "Station management",
    title: "Keep station information current.",
    description: "Manage operating status, available services and station details from one directory.",
    caption: "Stations · Profiles, services and operating status.",
    alt: "Glitre station directory showing operating modes, available services and station records with cover images and status badges.",
    width: 1566,
    height: 963,
  },
  {
    key: "complaints",
    label: "04 / Customer support",
    railLabel: "Customer support",
    title: "Review the queue. Focus on the case.",
    description: "Filter incoming complaints and inspect the selected case alongside the queue.",
    caption: "Complaints · Queue filters and selected case detail.",
    alt: "Glitre complaint queue with status and date filters, complaint records and the selected case's detail panel alongside the queue.",
    width: 1574,
    height: 966,
  },
] as const;

const managerRailSections = [
  { id: "section-hero", label: "Overview" },
  ...screenshots.map((shot) => ({ id: `manager-${shot.key}`, label: shot.railLabel })),
  { id: "manager-related", label: "Explore the platform" },
];

export const metadata: Metadata = {
  title: "Manager dashboard · Glitre Loyalty Platform",
  description:
    "One workspace for station operations. Explore the Glitre manager dashboard through real screenshots of the overview, sign-in, station directory and complaint queue.",
};

export default function GlitreManagerPage() {
  const study = publicCaseStudies.find((item) => item.slug === "glitre-loyalty-platform");
  if (!study) notFound();

  return (
    <article className="cs-page glitre-page glitre-manager-page">
      <GlitreShell>
        <ContentsRail
          sections={managerRailSections}
          verification="Captures supplied 23 October 2026"
        />
        <div className="manager-study">
          <nav className="glitre-breadcrumb" aria-label="Breadcrumb">
            <Link href="/work">Work</Link>
            <span aria-hidden="true">›</span>
            <Link href="/work/glitre-loyalty-platform">Glitre Loyalty Platform</Link>
            <span aria-hidden="true">›</span>
            <span aria-current="page">Manager dashboard</span>
          </nav>

          <header id="section-hero" className="manager-hero">
            <p className="manager-eyebrow">Glitre Loyalty Platform · Manager dashboard</p>
            <h1>One workspace.<br />Every station in view.</h1>
            <p className="manager-intro">
              Built for head-office teams managing stations, staff and customer support across the loyalty network.
            </p>
            <p className="manager-capture-context">Four dashboard views · English interface</p>
          </header>

          {screenshots.map((shot, index) => {
            const src = `/projects/glitre-loyalty-platform/manager/${shot.key}.webp`;
            return (
              <section key={shot.key} id={`manager-${shot.key}`} className="manager-screen" aria-labelledby={`manager-${shot.key}-title`}>
                <p className="manager-eyebrow">{shot.label}</p>
                <h2 id={`manager-${shot.key}-title`}>{shot.title}</h2>
                <p className="manager-screen-description">{shot.description}</p>
                <figure>
                  <a className="manager-image-link" href={src} target="_blank" rel="noreferrer" aria-label={`Open ${shot.railLabel.toLowerCase()} screenshot at full size (new tab)`}>
                    <Image
                      src={src}
                      alt={shot.alt}
                      width={shot.width}
                      height={shot.height}
                      sizes="(min-width: 1280px) 1072px, (min-width: 1024px) calc(100vw - 216px), calc(100vw - 36px)"
                      priority={index === 0}
                    />
                  </a>
                  <figcaption>{shot.caption}</figcaption>
                </figure>
                <a className="manager-full-size" href={src} target="_blank" rel="noreferrer" aria-label={`Open ${shot.railLabel.toLowerCase()} screenshot at full size (new tab)`}>
                  Open full-size screenshot <span aria-hidden="true">↗</span>
                </a>
              </section>
            );
          })}

          <footer id="manager-related" className="manager-related">
            <p className="manager-eyebrow">More of the platform</p>
            <nav className="manager-related-links" aria-label="Related Glitre studies">
              <Link href="/work/glitre-loyalty-platform/customer-app">Customer app <span aria-hidden="true">↗</span></Link>
              <Link href="/work/glitre-loyalty-platform/worker-app">Worker app <span aria-hidden="true">↗</span></Link>
            </nav>
            <Link className="manager-back" href="/work/glitre-loyalty-platform"><span aria-hidden="true">←</span> Back to the platform overview</Link>
            <p className="manager-provenance">Dashboard screenshots · <time dateTime="2026-10-23">23 October 2026</time></p>
          </footer>
        </div>
      </GlitreShell>
    </article>
  );
}
