import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { CaseStudy } from "@/lib/content";
import {
  hsVpnAndroidPackage,
  hsVpnArchitecturePoints,
  hsVpnConnectionSteps,
  hsVpnCoverageNote,
  hsVpnCoverageRows,
  hsVpnDecisions,
  hsVpnExcludedRegionsNote,
  hsVpnExperiencePoints,
  hsVpnFacts,
  hsVpnGooglePlayDeveloper,
  hsVpnGooglePlayUrl,
  hsVpnHeroLead,
  hsVpnProtocolNote,
  hsVpnRolePoints,
} from "./hs-vpn-content";
import { HsVpnArchitectureDiagram } from "./hs-vpn-architecture-diagram";

const galleryOrder = [
  "connected-ios",
  "statistics-ios",
  "servers-ios",
] as const;

const galleryCaptions: Record<string, string> = {
  "connected-ios":
    "Connected dashboard with protected state, primary connection control, and selected server.",
  "statistics-ios":
    "Session statistics: current session, live speed, and active server status.",
  "servers-ios":
    "Server selection with location list and live latency readouts.",
};

function captionFor(src: string): string {
  const match = /\/([^/]+)\.jpg$/.exec(src);
  const key = match ? match[1] : "";
  return galleryCaptions[key] ?? "Earlier iOS TestFlight capture.";
}

export function HsVpnArticle({ study }: { study: CaseStudy }) {
  return (
    <div className="cs-article hsvpn-article">
      <header className="hsvpn-hero" aria-labelledby="hsvpn-hero-title">
        <div>
          <p className="cs-hero-eyebrow">Client work · Mobile VPN</p>
          <h1 id="hsvpn-hero-title" className="cs-hero-headline">
            HS VPN: a connection that earns its Protected state.
          </h1>
          <p className="hsvpn-hero-lead">{hsVpnHeroLead}</p>
        </div>
        <dl className="hsvpn-hero-platforms" aria-label="Platform status">
          <div className="hsvpn-platform">
            <span className="hsvpn-platform-label">Android · primary</span>
            <span className="hsvpn-platform-value">
              Live on Google Play as a free, ad-supported app.
            </span>
            <span className="hsvpn-platform-pill hsvpn-platform-pill--android">
              In production
            </span>
            <span className="hsvpn-platform-note">
              Package {hsVpnAndroidPackage} · published by{" "}
              {hsVpnGooglePlayDeveloper}.
            </span>
          </div>
          <div className="hsvpn-platform">
            <span className="hsvpn-platform-label">iOS · secondary</span>
            <span className="hsvpn-platform-value">
              WireGuardKit packet-tunnel extension reached TestFlight.
            </span>
            <span className="hsvpn-platform-pill hsvpn-platform-pill--ios">
              TestFlight build
            </span>
            <span className="hsvpn-platform-note">
              Plain WireGuard on iOS. No public App Store release confirmed in
              the reviewed evidence.
            </span>
          </div>
        </dl>
      </header>

      <section
        id="hsvpn-problem"
        aria-labelledby="hsvpn-problem-title"
      >
        <h2 id="hsvpn-problem-title">
          A started tunnel is not yet a working connection.
        </h2>
        <p>
          On networks that interfere with ordinary VPN traffic, the app needs
          more than a successful tap. It needs a usable server profile, a
          native tunnel start, and handshake evidence before it can show a
          protected session.
        </p>
        <p>
          The product problem was to make that state understandable. A
          reassuring green label would be misleading if the device had started
          a tunnel service but never exchanged traffic with the selected peer.
          The experience therefore follows what the connection actually does,
          including failure and fallback states.
        </p>
      </section>

      <section
        id="hsvpn-experience"
        aria-labelledby="hsvpn-experience-title"
      >
        <h2 id="hsvpn-experience-title">Choose, connect, understand.</h2>
        {hsVpnExperiencePoints.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
        <p className="hsvpn-platform-flag">
          <strong>Platform note.</strong> The captures below are older iOS
          TestFlight builds. The Android build on Google Play is the live
          production path; these screens are presented as evidence of the
          earlier product experience, not as current Android UI.
        </p>
        <ul className="hsvpn-gallery" aria-label="Earlier iOS TestFlight captures">
          {study.media
            .filter((media) => {
              const match = /\/([^/]+)\.jpg$/.exec(media.src);
              const key = match ? match[1] : "";
              return (galleryOrder as readonly string[]).includes(key);
            })
            .map((media) => (
              <li key={media.src}>
                <figure>
                  <span className="hsvpn-gallery-tag">iOS · TestFlight capture</span>
                  <Image
                    src={media.src}
                    alt={media.alt}
                    width={1284}
                    height={2778}
                    sizes="(max-width: 767px) 72vw, 360px"
                  />
                  <figcaption>{captionFor(media.src)}</figcaption>
                </figure>
              </li>
            ))}
        </ul>
      </section>

      <section
        id="hsvpn-role"
        aria-labelledby="hsvpn-role-title"
      >
        <h2 id="hsvpn-role-title">End-to-end product and engineering lead.</h2>
        <p>{study.mahmoudRole}</p>
        {hsVpnRolePoints.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
        <p>
          The repository records other contributors. This case study describes
          Mahmoud&apos;s leadership and decisions across the product and
          engineering boundaries.
        </p>
      </section>

      <section
        id="hsvpn-architecture"
        aria-labelledby="hsvpn-architecture-title"
      >
        <div className="hsvpn-architecture">
          <div className="hsvpn-architecture-intro">
            <p className="hsvpn-architecture-eyebrow">How it fits together</p>
            <h2 id="hsvpn-architecture-title" className="cs-section-heading">
              Flutter, native tunnel, registrar, and a catalog control plane.
            </h2>
            {hsVpnArchitecturePoints.map((paragraph, index) => (
              <p key={index} className="hsvpn-architecture-quote">
                {paragraph}
              </p>
            ))}
          </div>
          <HsVpnArchitectureDiagram />
        </div>
      </section>

      <ul className="hsvpn-facts" aria-label="Architecture at a glance">
        {hsVpnFacts.map((fact) => (
          <li key={fact.label} className="hsvpn-fact">
            <span className="hsvpn-fact-label">{fact.label}</span>
            <span className="hsvpn-fact-value">{fact.value}</span>
            <span className="hsvpn-fact-detail">{fact.detail}</span>
          </li>
        ))}
      </ul>

      <section
        id="hsvpn-connection"
        aria-labelledby="hsvpn-connection-title"
      >
        <h2 id="hsvpn-connection-title">What happens after Connect.</h2>
        <ol className="hsvpn-steps">
          {hsVpnConnectionSteps.map((step) => (
            <li key={step.title}>
              <div className="hsvpn-step-body">
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section
        id="hsvpn-decisions"
        aria-labelledby="hsvpn-decisions-title"
      >
        <h2 id="hsvpn-decisions-title">Decisions behind a trustworthy state.</h2>
        <p>
          Flutter owns product flow and catalog choice. Native Kotlin and
          Swift code own tunnel lifecycle. A per-node FastAPI registrar
          handles peer registration; Remote Config, cache, and bundled data
          keep the catalog recoverable.
        </p>
        <p>
          On Android, the connection path can use AmneziaWG-oriented
          operation where enabled to address networks that interfere with
          ordinary WireGuard. The checked-in iOS TestFlight build uses plain
          WireGuard through a packet-tunnel extension. The two platforms
          should therefore be described separately, even though they share
          product intent and much of the Flutter experience.
        </p>
        <div className="hsvpn-decisions">
          {hsVpnDecisions.map((decision) => (
            <article key={decision.title}>
              <h3>{decision.title}</h3>
              <p>{decision.consequence}</p>
              <p className="hsvpn-decision-mechanism">{decision.mechanism}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        id="hsvpn-coverage"
        aria-labelledby="hsvpn-coverage-title"
      >
        <p className="hsvpn-section-eyebrow">Where it ran</p>
        <h2 id="hsvpn-coverage-title">Designed for restrictive networks, used in three.</h2>
        <p>{hsVpnProtocolNote}</p>
        <p>{hsVpnExcludedRegionsNote}</p>
        <p className="hsvpn-coverage-foot">{hsVpnCoverageNote}</p>
        <ul className="hsvpn-coverage" aria-label="Founder-reported Firebase observations">
          {hsVpnCoverageRows.map((row) => (
            <li key={row.label}>
              <span className="hsvpn-coverage-label">{row.label}</span>
              <p className="hsvpn-coverage-detail">{row.detail}</p>
            </li>
          ))}
        </ul>
      </section>

      <section
        id="hsvpn-delivery"
        aria-labelledby="hsvpn-delivery-title"
      >
        <h2 id="hsvpn-delivery-title">Where the product stands.</h2>
        <p>
          Android is publicly listed on Google Play. The listing displayed
          10K+ downloads when checked on 25 September 2026; this is a dated
          distribution count, not an active-user or success measure.
        </p>
        <p>
          iOS reached TestFlight. The reviewed evidence does not establish a
          public App Store release or measured connection success, speed,
          revenue, or retention outcomes.
        </p>
        <p>
          The visible interaction is one tap. The engineering work is the
          catalog, the registered peer, the native tunnel, and the confirmed
          handshake that make the word Protected defensible. The portfolio
          documents those decisions without exposing server addresses, keys,
          or operational access details.
        </p>
        <div className="hsvpn-actions">
          <Link
            className="hsvpn-action hsvpn-action-primary"
            href={hsVpnGooglePlayUrl}
            target="_blank"
            rel="noreferrer noopener"
          >
            Get HS VPN on Google Play
            <ArrowUpRight aria-hidden="true" />
          </Link>
          <Link className="hsvpn-action" href="/work">
            All work
          </Link>
          <Link className="hsvpn-action" href="/contact">
            Discuss a project
          </Link>
        </div>
      </section>
    </div>
  );
}
