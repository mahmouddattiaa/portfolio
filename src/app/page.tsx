import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Layers3, Route, ShieldCheck } from "lucide-react";
import { faqs, offers } from "@/lib/content";
import { WorkGrid } from "@/components/work-grid";

const problems = [["Information is scattered", "The work exists across documents, messages, spreadsheets, and tools that do not share context."], ["Decisions lose momentum", "Important handoffs become manual follow-ups, and the real state of work is difficult to see."], ["Existing tools stop fitting", "A growing operation outlives the workaround that once kept it moving."]];
const process = [["Understand", "Map the business goal, users, current workflow, constraints, and evidence of the problem."], ["Define", "Agree the first release, explicit exclusions, architecture, risks, milestones, and acceptance checkpoints."], ["Build in stages", "Deliver reviewable increments, test the important paths, and make scope changes visible before they affect cost or timing."], ["Launch deliberately", "Prepare the production environment, deployment, handover, and any app-store or operational steps included in the agreement."], ["Support what is live", "Resolve launch issues, observe real use, and agree whether maintenance or a measured next phase is justified."]];

export default function HomePage() {
  return <>
    <section className="hero hero-redesign">
      <Image src="/media/kepler-dev-hero-poster-v2.webp" alt="" fill priority sizes="100vw" className="hero-poster" />
      <div className="hero-scrim" />
      <div className="shell hero-content">
        <p className="eyebrow">Product engineering for connected operations</p>
        <h1>Replace fragmented operations with one connected product.</h1>
        <p className="lead">Kepler Dev helps teams turn disconnected workflows into focused digital products that make the work clearer, more reliable, and easier to improve.</p>
        <div className="hero-actions">
          <Link className="button button-hero" href="/contact">Request a project review <ArrowRight aria-hidden="true" /></Link>
          <Link className="text-link hero-link" href="/work">View selected work <ArrowRight aria-hidden="true" /></Link>
        </div>
      </div>
    </section>
    <section className="section numbered-section" id="services"><div className="shell"><div className="section-intro"><p className="eyebrow">01 — The problem</p><h2>When the operation is fragmented, the product should bring it back into view.</h2></div><div className="feature-grid editorial-grid">{problems.map(([title, body], index) => <article key={title} className="feature"><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{body}</p></article>)}</div></div></section>
    <section className="section section-ink connected-section"><div className="shell split"><div><p className="eyebrow">02 — A connected platform</p><h2>One useful source of truth, designed around the work itself.</h2></div><div><p className="lead">A connected product does not simply place a new interface on top of an old process. It gives the people doing the work a clearer path from input to decision to action.</p><ol className="connection-flow"><li><span>01</span><p>Work moves through a visible, intentional flow.</p></li><li><span>02</span><p>The right information is available at the right decision point.</p></li><li><span>03</span><p>The product can evolve as the operation learns.</p></li></ol></div></div></section>
    <section className="section numbered-section" id="work"><div className="shell section-heading"><p className="eyebrow">03 — Selected work</p><h2>Relevant proof, with the context left intact.</h2><p>Each study states what kind of work it was, whether it reached production, Mahmoud&apos;s exact role, the team context, and what evidence is available.</p><WorkGrid /></div></section>
    <section className="section section-tint"><div className="shell"><div className="section-intro"><p className="eyebrow">Ways to work together</p><h2>Start at the point that makes the next decision easier.</h2></div><div className="offer-grid editorial-offers">{offers.map((offer, index) => <article key={offer.name} className="offer"><span className="offer-number">0{index + 1}</span><h3>{offer.name}</h3><dl><div><dt>Best fit</dt><dd>{offer.bestFit}</dd></div><div><dt>Outcome</dt><dd>{offer.outcome}</dd></div><div><dt>Boundary</dt><dd>{offer.boundary}</dd></div></dl><p className="next-step">{offer.next}</p><Link href={`/contact?offer=${encodeURIComponent(offer.name)}`}>Discuss {offer.name} <span aria-hidden="true">→</span></Link></article>)}</div></div></section>
    <section className="section numbered-section" id="process"><div className="shell"><div className="section-intro"><p className="eyebrow">04 — How delivery works</p><h2>Clear decisions before code. Visible progress throughout the build.</h2></div><ol className="process-list editorial-process">{process.map(([title, description], index) => <li key={title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{title}</h3><p>{description}</p></div></li>)}</ol><p className="process-note">The exact plan depends on scope, integrations, technical unknowns, and the client&apos;s review availability. Timing is confirmed only after those factors are understood.</p></div></section>
    <section className="section section-ink"><div className="shell three-up"><article><Layers3 aria-hidden="true" /><h3>Product-led</h3><p>Build around the operation and the decisions it needs to support—not a list of disconnected features.</p></article><article><Route aria-hidden="true" /><h3>Clear delivery</h3><p>Keep ownership, scope, and the next decision visible throughout the engagement.</p></article><article><ShieldCheck aria-hidden="true" /><h3>Founder accountable</h3><p>Mahmoud leads technical direction and delivery, introducing specialist collaborators transparently when required.</p></article></div></section>
    <section className="section"><div className="shell faq-layout"><div><p className="eyebrow">Questions, answered</p><h2>Enough clarity to start the right conversation.</h2></div><div>{faqs.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></div></section>
    <section className="final-cta"><div className="shell"><p className="eyebrow">Start with the operation</p><h2>Bring the workflow that needs to work better.</h2><p>We&apos;ll use a project review to understand the current friction and decide whether there is a useful next step.</p><Link className="button button-inverse" href="/contact">Request a project review <ArrowRight aria-hidden="true" /></Link></div></section>
  </>;
}
