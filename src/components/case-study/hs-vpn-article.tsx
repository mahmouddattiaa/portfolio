import Image from "next/image";
import Link from "next/link";
import type { CaseStudy } from "@/lib/content";
import { hsVpnConnectionSteps, hsVpnDecisions } from "./hs-vpn-content";

export function HsVpnArticle({ study }: { study: CaseStudy }) {
  return (
    <div className="cs-article hsvpn-article">
      <header className="hsvpn-hero">
        <p className="cs-section-eyebrow">Client work · Mobile VPN</p>
        <h1>HS VPN: a connection that earns its Protected state.</h1>
        <p>
          Mahmoud led the product from the first idea and visual language
          through architecture, infrastructure, and store delivery.
        </p>
        <p>Android is on Google Play. The iOS implementation reached TestFlight.</p>
      </header>

      <section
        id="hsvpn-problem"
        aria-labelledby="hsvpn-problem-title"
      >
        <h2 id="hsvpn-problem-title">A started tunnel is not yet a working connection.</h2>
        <p>
          On networks that interfere with ordinary VPN traffic, the app needs
          more than a successful tap. It needs a usable server profile, native
          tunnel startup, and handshake evidence before it can show a
          protected session.
        </p>
        <p>
          The practical product problem was to make that state understandable.
          A reassuring green label would be misleading if the device had
          started a tunnel service but never exchanged traffic with the
          selected peer. The experience therefore follows what the connection
          actually does, including failure and fallback states.
        </p>
      </section>

      <section
        id="hsvpn-experience"
        aria-labelledby="hsvpn-experience-title"
      >
        <h2 id="hsvpn-experience-title">Choose, connect, understand.</h2>
        <p>
          The main path keeps location choice and the connection control
          close together. Once connected, the dashboard makes the session
          state prominent, while a separate statistics view lets someone
          inspect the session. Those simple screens sit on top of catalog
          selection, peer registration, and native tunnel work.
        </p>
        <p className="hsvpn-platform-note">
          Earlier iOS app captures; these do not depict the current Android
          release.
        </p>
        <div className="hsvpn-gallery">
          {study.media.map((media) => (
            <figure key={media.src}>
              <Image
                src={media.src}
                alt={media.alt}
                width={1284}
                height={2778}
                sizes="(max-width: 767px) 82vw, 380px"
              />
              <figcaption>
                {media.src.includes("connected")
                  ? "Connected dashboard · earlier iOS capture"
                  : "Session statistics · earlier iOS capture"}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section id="hsvpn-role" aria-labelledby="hsvpn-role-title">
        <h2 id="hsvpn-role-title">From idea to store delivery.</h2>
        <p>
          {study.mahmoudRole} Other contributors participated in the
          repository; this case study describes Mahmoud&apos;s leadership and
          decisions.
        </p>
        <p>
          His scope crossed the product and operational boundaries: defining
          the connection experience, shaping the dark visual language,
          deciding how Flutter and native VPN code would divide
          responsibilities, designing the registration and configuration
          path, running the server infrastructure, and moving the mobile
          builds through store delivery.
        </p>
        <p>
          The app is free and ad-supported. Its ad triggers follow confirmed
          connection events and can be adjusted remotely, so a placement
          does not become the signal that a user is protected or an obstacle
          to disconnecting.
        </p>
      </section>

      <section
        id="hsvpn-connection"
        aria-labelledby="hsvpn-connection-title"
      >
        <h2 id="hsvpn-connection-title">What happens after Connect.</h2>
        <ol className="hsvpn-steps">
          {hsVpnConnectionSteps.map((step) => (
            <li key={step.title}>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
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
          On Android, the current connection path can use AmneziaWG-oriented
          operation where enabled to address networks that interfere with
          ordinary WireGuard. The checked-in iOS implementation uses plain
          WireGuard through a packet-tunnel extension. The two platforms
          should therefore be described separately, even though they share
          product intent and much of the Flutter experience.
        </p>
        <p>
          When Remote Config cannot provide a usable catalog, the app can
          use a last-known-good cached catalog or bundled bootstrap data.
          Version gates help coordinate an app release with server
          configuration. These choices keep a remote configuration problem
          from automatically removing every connection option.
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
        id="hsvpn-delivery"
        aria-labelledby="hsvpn-delivery-title"
      >
        <h2 id="hsvpn-delivery-title">Where the product stands.</h2>
        <p>
          Android is publicly listed on Google Play. The listing displayed
          10K+ downloads when checked on 25 September 2026; this is a
          distribution count, not an active-user or success measure.
        </p>
        <p>
          iOS reached TestFlight. The reviewed evidence does not establish a
          public App Store release or measured connection success, speed,
          revenue, or retention outcomes.
        </p>
        <p>
          The visible interaction is one tap. The engineering work is the
          catalog, registered peer, native tunnel, and confirmed handshake
          that make the word Protected defensible. The portfolio documents
          those decisions without exposing server addresses, keys, or
          operational access details.
        </p>
        <div className="hsvpn-actions">
          <Link className="hsvpn-action" href="/work">
            All work
          </Link>
          <Link className="hsvpn-action hsvpn-action-primary" href="/contact">
            Discuss a project
          </Link>
        </div>
      </section>
    </div>
  );
}
