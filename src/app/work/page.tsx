import type { Metadata } from "next";
import { WorkGrid } from "@/components/work-grid";
import { RouteHero } from "@/components/route-hero";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Publication-safe Kepler Dev case studies, each labelled with context, role, status, and evidence.",
};

export default function WorkPage() {
  return (
    <>
      <RouteHero
        titleId="work-hero-title"
        kicker="Work"
        title={
          <>
            <span>Product work, shown with </span>
            <span>the context required </span>
            <span>to read it honestly.</span>
          </>
        }
        lead="Client work, employer work, internal builds, owned products, university projects, and concepts are not presented as if they carry the same proof. Every published study is labelled with its classification, production status, role, team context, and evidence state."
      />

      <section className="atelier-route-content" aria-labelledby="work-policy-title">
        <div className="shell">
          <article className="atelier-proof-policy">
            <p className="atelier-kicker">How to read this work</p>
            <h2 id="work-policy-title">
              Only studies with the necessary publication permissions and
              evidence are shown publicly.
            </h2>
            <p>
              Relevant private examples can be discussed in a project review.
            </p>
          </article>
          <WorkGrid />
        </div>
      </section>
    </>
  );
}
