import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { RouteHero } from "@/components/route-hero";

export const metadata: Metadata = {
  title: "The Studio",
  description:
    "Kepler Dev is an independent digital product studio based in the United Kingdom and operating across the GCC and worldwide.",
};

export default function StudioPage() {
  return (
    <>
      <RouteHero
        titleId="studio-hero-title"
        kicker="The Studio"
        title={
          <>
            <span>Built for connected </span>
            <span>operational and digital products.</span>
          </>
        }
        lead="Kepler Dev is an independent digital product studio based in the United Kingdom and operating across the GCC and worldwide."
        actions={
          <Link className="atelier-primary-action" href="/contact">
            Start a conversation <ArrowUpRight aria-hidden="true" />
          </Link>
        }
      />

      <section
        className="atelier-route-content atelier-route-pearl"
        aria-labelledby="accountability-heading"
      >
        <div className="shell atelier-narrow">
          <p className="atelier-kicker">Studio Accountability</p>
          <h2 id="accountability-heading">
            Direct engineering ownership from discovery to production.
          </h2>
          <p>
            Kepler Dev operates as an accountable product engineering partner.
            Our senior engineering leads direct technical architecture and
            delivery on every engagement, working directly with product teams
            rather than passing context through layers of intermediaries.
          </p>
          <p>
            We work in isolated, contract-backed branches with continuous
            verification, deterministic gates, and production telemetry. When
            you work with us, you know exactly who is engineering your system
            and why each architectural decision is made.
          </p>
        </div>
      </section>

      <section
        className="atelier-route-content atelier-route-pearl"
        aria-labelledby="standards-heading"
      >
        <div className="shell">
          <p className="atelier-kicker">Engineering Standards</p>
          <h2 id="standards-heading">
            Principles engineered into every system we build.
          </h2>
          <div className="atelier-strength-grid">
            <article>
              <h3>Contract-first systems</h3>
              <p>
                Single OpenAPI specifications and server-authoritative schemas
                front all applications. Schema drift is caught in CI before
                code merges, keeping web, mobile, and backend clients strictly
                aligned.
              </p>
            </article>
            <article>
              <h3>Resilient mobile & web surfaces</h3>
              <p>
                Built for real network conditions with optimistic UI,
                append-only ledgers, offline caching, and verified handshake
                states. Every value-moving mutation requires idempotency keys
                so network retries settle safely once.
              </p>
            </article>
            <article>
              <h3>Transparent handover</h3>
              <p>
                You own the source code, infrastructure declarations,
                deployment pipelines, and architectural decisions from day one.
                Clean repository layout and documented seams ensure your
                internal engineers can take over friction-free.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section
        className="atelier-route-content atelier-route-pearl"
        aria-labelledby="footprint-heading"
      >
        <div className="shell atelier-narrow">
          <p className="atelier-kicker">Operating Footprint</p>
          <h2 id="footprint-heading">
            UK governance, regional presence across the GCC and worldwide.
          </h2>
          <p>
            Kepler Dev is based in the United Kingdom and operates under UK
            data protection frameworks. We partner with product organizations,
            scaling businesses, and enterprises across London, Cairo, Riyadh,
            Dubai, and globally.
          </p>
          <p>
            Our multilingual team communicates natively in Arabic, English,
            French, and German, supporting direct technical delivery across
            Arabic-first RTL applications and international digital platforms.
          </p>
        </div>
      </section>

      <section className="atelier-final-cta" aria-labelledby="studio-cta-heading">
        <div className="shell atelier-final-content">
          <p className="atelier-kicker">Ready to start?</p>
          <h2 id="studio-cta-heading">Tell us what you are building.</h2>
          <div>
            <Link className="atelier-primary-action" href="/contact">
              Discuss a project <ArrowUpRight aria-hidden="true" />
            </Link>
            <p>
              A project review is a direct engineering conversation, not a
              sales pitch.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
