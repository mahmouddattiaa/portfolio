import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Compass, Workflow, Code2 } from "lucide-react";
import { KeplerFold } from "@/components/kepler-fold";

export const metadata: Metadata = {
  title: "Mahmoud — Founder & Product Engineer",
  description:
    "Mahmoud Mohamed Attia is the founder of Kepler Dev, a product engineer working with teams across the GCC and beyond on connected mobile, web, and operational products.",
};

const glanceFacts = [
  { label: "Based in", value: "Cairo, Egypt" },
  { label: "Working with", value: "Teams across the GCC and worldwide" },
  { label: "Focus", value: "Connected mobile, web, and operational products" },
  { label: "Involvement", value: "Discovery through delivery" },
] as const;

const founderNoteLead =
  "I started Kepler Dev because too much product work ships without anyone really understanding the operation it has to serve.";

const founderNoteBody =
  "I have spent the last several years inside connected products — loyalty platforms, payment workflows, operational dashboards, internal tools — and the same pattern keeps appearing. The product is built; the workflow is not. People end up bridging the gaps between systems that were never designed to work together. Kepler Dev exists to address that directly: bring product thinking and engineering to the same conversation, and stay accountable from discovery through delivery. The work is small by design. Each engagement is one product, one founder-led team, and a clear scope that holds.";

const experienceCapsules = [
  {
    number: "01",
    classification: "Private client platform · GCC",
    title: "Connected loyalty and operations platform",
    description:
      "A connected loyalty and operations platform spanning customer, worker, and administrative experiences.",
    role: "Product and engineering lead",
    scope:
      "Customer application, worker application, administrative dashboard, backend services, integrations, and deployment coordination.",
  },
  {
    number: "02",
    classification: "Private client engagement",
    title: "Project details to be added — permission pending",
    description:
      "A connected product and operational system. Public details are withheld until the client’s publication permission is confirmed.",
    role: "Product and engineering lead",
    scope:
      "Discovery, technical direction, delivery, and integration with existing operational systems.",
  },
  {
    number: "03",
    classification: "Private client engagement",
    title: "Project details to be added — permission pending",
    description:
      "A workflow-led product engagement. Public details are withheld until the client’s publication permission is confirmed.",
    role: "Product and engineering lead",
    scope:
      "Discovery, product direction, build, and operational handover.",
  },
] as const;

const responsibilityStages = [
  {
    title: "Discovery",
    body: "Map the current workflow, the people involved, the systems already in place, and the outcomes that would actually change the work.",
  },
  {
    title: "Product direction",
    body: "Translate the workflow into a clear product scope, a defensible architecture, and a delivery sequence a team can act on.",
  },
  {
    title: "Technical delivery",
    body: "Build the connected surfaces, services, and integrations with direct technical ownership through each release.",
  },
  {
    title: "Accountability",
    body: "Remain the single point of contact and the person accountable for the decisions, the build, and what happens after launch.",
  },
] as const;

const timelineEntries = [
  {
    year: "Present",
    milestone: "Founder of Kepler Dev",
    body: "Founder-led studio for connected mobile, web, and operational products. Discovery through delivery, single accountable lead.",
  },
  {
    year: "In progress",
    milestone: "B.Sc. candidate, Computer Engineering — Cairo University",
    body: "Undergraduate study at Cairo University. Degree not yet completed.",
  },
  {
    year: "Prior",
    milestone: "Selected product and engineering work",
    body: "Connected loyalty, payment-adjacent, and operational platforms. Public case studies are pending client permission; details can be discussed in a project review.",
  },
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
      {/* 1 — Founder hero ----------------------------------------------- */}
      <section
        className="atelier-hero atelier-founder-hero"
        aria-labelledby="mahmoud-hero-title"
      >
        <KeplerFold className="hero-fold" priority />
        <div className="shell atelier-founder-hero-grid">
          <div className="atelier-founder-hero-copy">
            <p className="atelier-kicker hero-kicker">
              MAHMOUD MOHAMED ATTIA · FOUNDER &amp; PRODUCT ENGINEER
            </p>
            <h1 id="mahmoud-hero-title">
              <span>I build digital products </span>
              <span>that make complicated </span>
              <span>operations feel clear.</span>
            </h1>
            <p className="atelier-hero-lead">
              I&rsquo;m the founder of Kepler Dev, based in Cairo and working with
              teams across the GCC and beyond. I bring product thinking and
              engineering together&mdash;from understanding the workflow to
              designing, building, and delivering the system behind it.
            </p>
            <div className="atelier-hero-actions">
              <Link className="atelier-primary-action" href="/contact">
                Discuss a project
              </Link>
              <Link className="atelier-secondary-action" href="/work">
                View selected work <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
          <figure className="atelier-founder-hero-portrait">
            <Image
              src="/brand/founder-portrait.jpg"
              alt="Mahmoud, founder of Kepler Dev"
              width={1024}
              height={1280}
              sizes="(max-width: 767px) 100vw, (max-width: 1023px) 60vw, 28rem"
              priority
            />
          </figure>
        </div>
      </section>

      {/* 2 — At a glance ------------------------------------------------- */}
      <section
        className="atelier-route-content atelier-route-pearl atelier-founder-glance"
        aria-label="At a glance"
      >
        <div className="shell">
          <dl className="atelier-glance-strip">
            {glanceFacts.map((fact) => (
              <div key={fact.label} className="atelier-glance-cell">
                <dt className="atelier-glance-label">{fact.label}</dt>
                <dd className="atelier-glance-value">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* 3 — Founder note ----------------------------------------------- */}
      <section
        className="atelier-route-content atelier-founder-note"
        aria-labelledby="mahmoud-note-title"
      >
        <div className="shell atelier-narrow">
          <p className="atelier-founder-note-rule" aria-hidden="true" />
          <p className="atelier-kicker">Founder note</p>
          <h2 id="mahmoud-note-title" className="atelier-founder-note-lead">
            {founderNoteLead}
          </h2>
          <p className="atelier-founder-note-body">{founderNoteBody}</p>
        </div>
      </section>

      {/* 4 — Selected experience ---------------------------------------- */}
      <section
        className="atelier-route-content"
        aria-labelledby="mahmoud-experience-title"
      >
        <div className="shell">
          <p className="atelier-kicker">Selected experience</p>
          <h2 id="mahmoud-experience-title">
            Work I have led end to end, with one confirmed public reference.
          </h2>
          <ol className="atelier-experience-list">
            {experienceCapsules.map((capsule) => (
              <li key={capsule.number} className="atelier-experience-capsule">
                <span className="atelier-experience-number" aria-hidden="true">
                  {capsule.number}
                </span>
                <div className="atelier-experience-body">
                  <p className="atelier-experience-classification">
                    {capsule.classification}
                  </p>
                  <h3 className="atelier-experience-title">
                    {capsule.title}
                  </h3>
                  <p className="atelier-experience-description">
                    {capsule.description}
                  </p>
                  <dl className="atelier-experience-meta">
                    <div>
                      <dt>Role</dt>
                      <dd>{capsule.role}</dd>
                    </div>
                    <div>
                      <dt>Scope</dt>
                      <dd>{capsule.scope}</dd>
                    </div>
                  </dl>
                </div>
              </li>
            ))}
          </ol>
          <p className="atelier-experience-footnote">
            Additional private engagements are not listed publicly. Selected
            work can be discussed in a project review.
          </p>
        </div>
      </section>

      {/* 4b — Working context (editorial interlude) --------------------- */}
      <aside
        className="atelier-founder-working-context"
        aria-label="Working context"
      >
        <div className="shell atelier-founder-working-context-grid">
          <figure className="atelier-founder-working-context-figure">
            <Image
              src="/brand/founder-working-context.webp"
              alt="Mahmoud working on a laptop in the Kepler Dev studio."
              width={1536}
              height={1024}
              sizes="(max-width: 767px) 100vw, (max-width: 1023px) 70vw, 60vw"
              loading="lazy"
              className="atelier-founder-working-context-img"
            />
          </figure>
        </div>
      </aside>

      {/* 5 — What clients work with me on ------------------------------- */}
      <section
        className="atelier-route-content atelier-route-pearl atelier-responsibilities"
        aria-labelledby="mahmoud-responsibilities-title"
      >
        <div className="shell">
          <p className="atelier-kicker">What clients work with me on</p>
          <h2 id="mahmoud-responsibilities-title">
            Four stages, one accountable lead.
          </h2>
          <ol className="atelier-responsibility-strip">
            {responsibilityStages.map((stage, index) => (
              <li key={stage.title} className="atelier-responsibility-cell">
                <span className="atelier-responsibility-step" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{stage.title}</h3>
                <p>{stage.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 6 — Background timeline ---------------------------------------- */}
      <section
        className="atelier-route-content atelier-founder-timeline"
        aria-labelledby="mahmoud-timeline-title"
      >
        <div className="shell">
          <p className="atelier-kicker">Background</p>
          <h2 id="mahmoud-timeline-title">
            A short record, with no invented dates.
          </h2>
          <ol className="atelier-timeline">
            {timelineEntries.map((entry) => (
              <li key={`${entry.year}-${entry.milestone}`} className="atelier-timeline-row">
                <span className="atelier-timeline-year">{entry.year}</span>
                <div className="atelier-timeline-body">
                  <h3>{entry.milestone}</h3>
                  <p>{entry.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="atelier-timeline-footnote">
            Earlier roles and engagements are summarised only when the
            facts are verifiable. Anything pending confirmation is marked
            as such.
          </p>
        </div>
      </section>

      {/* 7 — Principles ------------------------------------------------- */}
      <section
        className="atelier-route-content atelier-route-pearl"
        aria-labelledby="mahmoud-principles-title"
      >
        <div className="shell">
          <p className="atelier-kicker">Principles</p>
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

      {/* 8 — Closing CTA ------------------------------------------------ */}
      <section
        className="atelier-final-cta"
        aria-labelledby="mahmoud-closing-title"
      >
        <KeplerFold
          className="final-fold-fragment"
          src="/media/kepler-fold/final-cta-fragment.png"
        />
        <div className="shell atelier-final-content">
          <p className="atelier-kicker">Project review</p>
          <h2 id="mahmoud-closing-title">
            Have a workflow that should work better?
          </h2>
          <div>
            <p>
              Share the current situation and the outcome you need. Mahmoud
              will review the context personally before the first conversation.
            </p>
            <Link className="atelier-primary-action" href="/contact">
              Request a project review
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
