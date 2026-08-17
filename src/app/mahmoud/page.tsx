import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Code2, Compass, Workflow } from "lucide-react";
import { RouteHero } from "@/components/route-hero";

export const metadata: Metadata = {
  title: "Mahmoud",
  description:
    "Mahmoud is the accountable technical and delivery lead at Kepler Dev.",
};

const strengths = [
  [
    "Connected mobile and web products",
    "Designing the user-facing experience together with the backend, data, and operational path behind it.",
  ],
  [
    "Backends, APIs, and integrations",
    "Connecting product surfaces to business data, third-party services, authentication, notifications, and deployment environments.",
  ],
  [
    "Operational platforms",
    "Translating multi-role workflows, statuses, exceptions, administration, and management needs into a phased system.",
  ],
  [
    "Constraint-aware delivery",
    "Working through existing systems, technical unknowns, rollout dependencies, and explicit scope boundaries.",
  ],
] as const;

const principles = [
  {
    icon: Compass,
    title: "Direction before output",
    body: "Clarify the workflow, constraints, and decisions a product must support before committing to a build.",
  },
  {
    icon: Workflow,
    title: "Systems that fit the work",
    body: "Connect the parts of an operation that currently force people to bridge gaps manually.",
  },
  {
    icon: Code2,
    title: "Technical ownership",
    body: "Keep the architecture understandable, deliberate, and ready for its next useful iteration.",
  },
] as const;

export default function MahmoudPage() {
  return (
    <>
      <RouteHero
        titleId="mahmoud-hero-title"
        kicker="Founder and delivery lead"
        title={
          <>
            <span>Mahmoud is a product-focused </span>
            <span>software engineer building </span>
            <span>connected applications and </span>
            <span>operational systems.</span>
          </>
        }
        lead="His work spans user-facing products, internal workflows, integrations, and the infrastructure needed to move a scoped release into use. Through Kepler Dev, he is developing a founder-led studio model built around clear scope, direct communication, and accountable technical delivery."
        actions={
          <Link className="atelier-primary-action" href="/contact">
            Request a project review
          </Link>
        }
      />

      <section
        className="atelier-route-content atelier-founder"
        aria-labelledby="mahmoud-portrait-title"
      >
        <div className="shell atelier-founder-layout">
          <div>
            <p className="atelier-kicker">Founder and delivery lead</p>
            <h2 id="mahmoud-portrait-title">One accountable partner.</h2>
            <p>
              Mahmoud works directly with each client on discovery, technical
              direction, and delivery communication. Specialist collaborators
              are introduced transparently when they are the right fit.
            </p>
            <p>
              <Link className="atelier-secondary-action" href="/contact">
                Request a project review <span aria-hidden="true">→</span>
              </Link>
            </p>
          </div>
          <figure className="atelier-founder-portrait">
            <Image
              src="/brand/founder-portrait-placeholder.svg"
              alt="Founder portrait — pending approval"
              width={600}
              height={750}
              priority
            />
            <figcaption>Founder portrait — pending approval</figcaption>
          </figure>
        </div>
      </section>

      <section
        className="atelier-route-content atelier-route-pearl"
        aria-labelledby="mahmoud-strengths-title"
      >
        <div className="shell">
          <p className="atelier-kicker">Technical strengths</p>
          <h2 id="mahmoud-strengths-title">
            Product decisions and technical delivery, kept connected.
          </h2>
          <div className="atelier-strength-grid">
            {strengths.map(([title, body]) => (
              <article key={title}>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className="atelier-route-content"
        aria-labelledby="mahmoud-principles-title"
      >
        <div className="shell">
          <p className="atelier-kicker">How the work is approached</p>
          <h2 id="mahmoud-principles-title">Three connected principles.</h2>
          <div className="atelier-principles-grid">
            {principles.map(({ icon: Icon, title, body }) => (
              <article key={title}>
                <Icon aria-hidden="true" />
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className="atelier-route-content atelier-route-pearl"
        aria-labelledby="mahmoud-studio-title"
      >
        <div className="shell atelier-narrow">
          <p className="atelier-kicker">Kepler Dev</p>
          <h2 id="mahmoud-studio-title">Direct founder accountability.</h2>
          <p>
            Kepler Dev is the studio Mahmoud is building for focused product
            and operations work. Clients work directly with him on discovery,
            technical direction, and delivery communication.
          </p>
        </div>
      </section>
    </>
  );
}
