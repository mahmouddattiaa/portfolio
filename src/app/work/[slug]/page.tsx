import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { publicCaseStudies } from "@/lib/content";

export const dynamicParams = false;
export function generateStaticParams() { return publicCaseStudies.map(({ slug }) => ({ slug })); }
export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { return params.then(({ slug }) => { const study = publicCaseStudies.find((item) => item.slug === slug); return study ? { title: study.publicTitle || study.title, description: study.problem } : {}; }); }
export default async function WorkDetail({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const study = publicCaseStudies.find((item) => item.slug === slug); if (!study) notFound(); return <article className="section"><div className="shell case-study"><p className="eyebrow">{study.classification} · {study.productionStatus}</p><h1>{study.publicTitle || study.title}</h1><p className="lead">{study.problem}</p><section><h2>Context</h2><p>{study.engagementContext}</p></section><section><h2>Role and team</h2><p>{study.mahmoudRole}</p><p>{study.teamContext}</p></section><section><h2>What was delivered</h2><ul>{study.scope.map((item) => <li key={item}>{item}</li>)}</ul></section><section><h2>Evidence</h2>{study.results.map((result) => <p key={result.claim}>{result.claim} <span className="evidence-label">{result.proofState === "verified-public" ? "Verified public evidence" : "Verified privately"}</span></p>)}</section></div></article>; }
