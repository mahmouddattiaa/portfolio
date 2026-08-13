import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Layers3, Route, ShieldCheck } from "lucide-react";
import { faqs, offers } from "@/lib/content";
import { WorkGrid } from "@/components/work-grid";

const problems = [
  [
    "Customer experience",
    "Customers wait for updates, repeat information, or depend on a staff member being available.",
  ],
  [
    "Staff workflow",
    "Teams copy data between tools, follow inconsistent steps, and carry important context in personal messages.",
  ],
  [
    "Management visibility",
    "Owners see the operation late, through manually prepared summaries rather than reliable live information.",
  ],
];
const platformLayers = [
  [
    "Customer or field experience",
    "A focused mobile or web experience for the people requesting, buying, booking, reporting, or completing the work.",
  ],
  [
    "Operational workflow",
    "Clear states, responsibilities, approvals, and exceptions for the staff moving each case forward.",
  ],
  [
    "Management view",
    "The information owners and managers need to monitor work, spot delays, and make decisions.",
  ],
  [
    "Integrations and infrastructure",
    "APIs, payments, notifications, external services, cloud deployment, and data flows connected where the scope requires them.",
  ],
];
const process = [
  [
    "Understand",
    "Map the business goal, users, current workflow, constraints, and evidence of the problem.",
  ],
  [
    "Define",
    "Agree the first release, explicit exclusions, architecture, risks, milestones, and acceptance checkpoints.",
  ],
  [
    "Build in stages",
    "Deliver reviewable increments, test the important paths, and make scope changes visible before they affect cost or timing.",
  ],
  [
    "Launch deliberately",
    "Prepare the production environment, deployment, handover, and any app-store or operational steps included in the agreement.",
  ],
  [
    "Support what is live",
    "Resolve launch issues, observe real use, and agree whether maintenance or a measured next phase is justified.",
  ],
];

export default function HomePage() {
  return (
    <>
      <section className="hero hero-redesign">
        <Image
          src="/media/kepler-dev-hero-operations-v1.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="hero-poster"
        />
        <div className="hero-scrim" />
        <div className="shell hero-content">
          <p className="eyebrow hero-reveal hero-reveal-eyebrow">
            Product engineering for connected operations
          </p>
          <h1 className="hero-title hero-reveal hero-reveal-title">
            Replace fragmented operations with one connected product.
          </h1>
          <p className="lead hero-reveal hero-reveal-lead">
            Kepler Dev scopes and builds mobile apps, web platforms, backends,
            dashboards, and integrations around the way your business actually
            works—so customers, staff, and management can move through one
            clearer system.
          </p>
          <div className="hero-actions">
            <Link
              className="button button-hero"
              href="/contact"
              aria-describedby="hero-expectation"
            >
              Request a project review <ArrowRight aria-hidden="true" />
            </Link>
            <Link className="text-link hero-link" href="/work">
              View selected work <ArrowRight aria-hidden="true" />
            </Link>
          </div>
          <p className="hero-expectation" id="hero-expectation">
            Share the workflow, product idea, or system that needs attention. We
            will review the context before recommending a next step.
          </p>
        </div>
      </section>
      <section
        className="section friction-section"
        id="services"
        aria-labelledby="problem-heading"
      >
        <div className="shell">
          <div className="friction-intro">
            <p className="eyebrow">
              <span aria-hidden="true">01 — </span>When the workflow stops
              scaling
            </p>
            <h2 id="problem-heading">
              The problem is rarely one missing app. It is everything between
              the handoffs.
            </h2>
            <p>
              A customer message becomes a spreadsheet row. A staff update lives
              in a private chat. Management asks for a report that someone must
              assemble by hand. Each tool may work on its own, but the operation
              between them stays fragile.
            </p>
          </div>
          <ol className="friction-list">
            {problems.map(([title, body], index) => (
              <li key={title}>
                <span aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="friction-closing">
            Kepler Dev starts by identifying the workflow worth fixing, the
            people it must serve, and the smallest connected release that can
            improve it.
          </p>
        </div>
      </section>
      <section
        className="section section-ink platform-section"
        aria-labelledby="platform-heading"
      >
        <div className="shell">
          <div className="platform-intro">
            <div>
              <p className="eyebrow">
                <span aria-hidden="true">02 — </span>One system, designed around
                the operation
              </p>
              <h2 id="platform-heading">
                Connect the experience people use with the infrastructure the
                business depends on.
              </h2>
            </div>
            <p className="lead">
              The right solution may be a mobile app, a web portal, an internal
              dashboard, a backend, or a phased combination. The product shape
              follows the workflow—not the other way around.
            </p>
          </div>
          <ol className="platform-layers">
            {platformLayers.map(([title, body], index) => (
              <li key={title}>
                <span aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{title}</h3>
                <p>{body}</p>
              </li>
            ))}
          </ol>
          <p className="platform-closing">
            Start with one valuable workflow. Prove it, launch it, and expand
            only when the next phase is justified.
          </p>
        </div>
      </section>
      <section className="section numbered-section" id="work">
        <div className="shell section-heading">
          <p className="eyebrow">03 — Selected work</p>
          <h2>Relevant proof, with the context left intact.</h2>
          <p>
            Each study states what kind of work it was, whether it reached
            production, Mahmoud&apos;s exact role, the team context, and what
            evidence is available.
          </p>
          <WorkGrid />
        </div>
      </section>
      <section className="section section-tint">
        <div className="shell">
          <div className="section-intro">
            <p className="eyebrow">Ways to work together</p>
            <h2>Start at the point that makes the next decision easier.</h2>
          </div>
          <div className="offer-grid editorial-offers">
            {offers.map((offer, index) => (
              <article key={offer.name} className="offer">
                <span className="offer-number">0{index + 1}</span>
                <h3>{offer.name}</h3>
                <dl>
                  <div>
                    <dt>Best fit</dt>
                    <dd>{offer.bestFit}</dd>
                  </div>
                  <div>
                    <dt>Outcome</dt>
                    <dd>{offer.outcome}</dd>
                  </div>
                  <div>
                    <dt>Boundary</dt>
                    <dd>{offer.boundary}</dd>
                  </div>
                </dl>
                <p className="next-step">{offer.next}</p>
                <Link href={`/contact?offer=${encodeURIComponent(offer.name)}`}>
                  Discuss {offer.name} <span aria-hidden="true">→</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section numbered-section" id="process">
        <div className="shell">
          <div className="section-intro">
            <p className="eyebrow">04 — How delivery works</p>
            <h2>
              Clear decisions before code. Visible progress throughout the
              build.
            </h2>
          </div>
          <ol className="process-list editorial-process">
            {process.map(([title, description], index) => (
              <li key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="process-note">
            The exact plan depends on scope, integrations, technical unknowns,
            and the client&apos;s review availability. Timing is confirmed only
            after those factors are understood.
          </p>
        </div>
      </section>
      <section className="section section-ink">
        <div className="shell three-up">
          <article>
            <Layers3 aria-hidden="true" />
            <h3>Product-led</h3>
            <p>
              Build around the operation and the decisions it needs to
              support—not a list of disconnected features.
            </p>
          </article>
          <article>
            <Route aria-hidden="true" />
            <h3>Clear delivery</h3>
            <p>
              Keep ownership, scope, and the next decision visible throughout
              the engagement.
            </p>
          </article>
          <article>
            <ShieldCheck aria-hidden="true" />
            <h3>Founder accountable</h3>
            <p>
              Mahmoud leads technical direction and delivery, introducing
              specialist collaborators transparently when required.
            </p>
          </article>
        </div>
      </section>
      <section className="section">
        <div className="shell faq-layout">
          <div>
            <p className="eyebrow">Questions, answered</p>
            <h2>Enough clarity to start the right conversation.</h2>
          </div>
          <div>
            {faqs.map(([question, answer]) => (
              <details key={question}>
                <summary>{question}</summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <section className="final-cta">
        <div className="shell">
          <p className="eyebrow">Start with the operation</p>
          <h2>Bring the workflow that needs to work better.</h2>
          <p>
            We&apos;ll use a project review to understand the current friction
            and decide whether there is a useful next step.
          </p>
          <Link className="button button-inverse" href="/contact">
            Request a project review <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
