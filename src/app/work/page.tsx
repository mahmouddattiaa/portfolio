import type { Metadata } from "next";
import Link from "next/link";
import { WorkGrid } from "@/components/work-grid";

export const metadata: Metadata = { title: "Work", description: "Publication-safe Kepler Dev case studies, each labelled with context, role, status, and evidence." };
export default function WorkPage() { return <section className="section route-hero"><div className="shell section-heading"><p className="eyebrow">Work</p><h1>Product work, shown with the context required to read it honestly.</h1><p className="lead">Client work, employer work, internal builds, owned products, university projects, and concepts are not presented as if they carry the same proof. Every published study is labelled with its classification, production status, role, team context, and evidence state.</p><div className="proof-policy"><strong>How to read this work</strong><p>Only studies with the necessary publication permissions and evidence are shown publicly. Relevant private examples can be discussed in a project review.</p></div><WorkGrid /><Link className="button button-secondary" href="/contact">Request a project review</Link></div></section>; }
