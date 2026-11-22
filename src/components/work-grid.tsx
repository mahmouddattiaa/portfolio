import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  projectCatalog,
  type ProjectCatalogRecord,
  type ProjectCategory,
  type ProjectMedia,
} from "@/lib/content";
import { getWorkCopy } from "@/content/work";
import { WorkFilterBar } from "./work-filter-bar";
import { WorkGridVideo } from "./work-grid-video";

export const categoryLabels: Record<ProjectCategory, string> = {
  web: "Web & Dashboards",
  mobile: "Mobile & POS Apps",
  ai: "AI & Automation",
  rnd: "Studio R&D",
};
export const categoryOrder: ProjectCategory[] = ["web", "mobile", "ai", "rnd"];
export type WorkFilterValue = "all" | ProjectCategory;

export function resolveWorkFilter(value: string | string[] | undefined): WorkFilterValue {
  if (Array.isArray(value)) return "all";
  return value === "web" || value === "mobile" || value === "ai" || value === "rnd" ? value : "all";
}

const classificationLabels: Record<ProjectCatalogRecord["classification"], string> = {
  client: "Client work",
  employer: "Employer work",
  internal: "Internal build",
  "owned-product": "Owned product",
  university: "University project",
  concept: "Concept",
};
const statusLabels: Record<ProjectCatalogRecord["productionStatus"], string> = {
  production: "In production",
  pilot: "Pilot",
  prototype: "Prototype",
  "in-development": "In development",
  concept: "Concept / Design Build",
};

function recordContext(record: ProjectCatalogRecord): string {
  return "engagementContext" in record ? record.engagementContext : record.context;
}

function firstImage(media: ProjectMedia[]) {
  return media.find((item) => item.kind === "image");
}

export function WorkGrid({ filter }: { filter: WorkFilterValue }) {
  const copy = getWorkCopy("en");
  const counts: Record<WorkFilterValue, number> = { all: projectCatalog.length, web: 0, mobile: 0, ai: 0, rnd: 0 };
  for (const project of projectCatalog) for (const category of project.categories) counts[category] += 1;
  const visible = filter === "all" ? projectCatalog : projectCatalog.filter((project) => project.categories.includes(filter));

  return (
    <div className="wv2-studies">
      <div className="wv2-studies-head">
        <WorkFilterBar filter={filter} counts={counts} />
        <p className="wv2-count" aria-live="polite" aria-atomic="true">Showing {visible.length} of {projectCatalog.length} studio builds in {filter === "all" ? "all work" : categoryLabels[filter]}.</p>
      </div>
      <div id="work-results" role="tabpanel" aria-labelledby={`work-filter-${filter}`} tabIndex={0} aria-label={copy.studies.gridLabel}>
        <ul className="wv2-grid">
          {visible.map((project) => <li key={project.slug}><ProjectCard project={project} copy={copy} /></li>)}
        </ul>
      </div>
      {visible.length === 0 ? <div className="wv2-empty"><h2>No published builds in this category.</h2><Link href="/work?category=all">Reset to All Work (13)</Link></div> : null}
    </div>
  );
}

function ProjectCard({ project, copy }: { project: ProjectCatalogRecord; copy: ReturnType<typeof getWorkCopy> }) {
  const cover = firstImage(project.media);
  const walkthroughs = project.media.filter((item): item is Extract<ProjectMedia, { kind: "video" }> => item.kind === "video");
  const isFlagship = project.kind === "flagship";
  const href = isFlagship ? `/work/${project.slug}` : "/contact?offer=blueprint";
  const action = isFlagship ? copy.studies.card.read : "Discuss a similar build";
  return (
    <article className={`wv2-project${project.slug === "stayease" ? " wv2-project--stayease" : ""}`} aria-labelledby={`work-${project.slug}`}>
      <div className="wv2-project-overview">
        <div className={`wv2-project-visual${project.slug === "stayease" ? " wv2-project-visual--portrait" : ""}`}>
          {cover ? <Image src={cover.src} alt={cover.alt} width={cover.width} height={cover.height} sizes="(max-width: 767px) 100vw, 220px" /> : <ProjectSchematic project={project} />}
          {walkthroughs.map((video) => <ProjectVideo key={video.src} media={video} poster={cover?.src} />)}
        </div>
        <div className="wv2-project-main">
          <div className="wv2-chips">
            <span className="wv2-chip wv2-chip-classification">{classificationLabels[project.classification]}</span>
            <span className="wv2-chip wv2-chip-status">{project.slug === "agency-os" ? "Concept / Design Build" : statusLabels[project.productionStatus]}</span>
          </div>
          <h3 id={`work-${project.slug}`} className="wv2-project-title">{project.title}</h3>
          <p className="wv2-project-problem">{project.problem}</p>
          <ul className="wv2-tags" aria-label={copy.meta.builtWith}>{project.technologies.slice(0, 5).map((tech) => <li key={tech}>{tech}</li>)}</ul>
          <Link className="wv2-read wv2-read-copper" href={href}>{action} <ArrowUpRight aria-hidden="true" /></Link>
        </div>
      </div>
      <dl className="wv2-project-facts">
        <div><dt>Our role</dt><dd>{project.studioRole}</dd></div>
        <div><dt>Context</dt><dd>{recordContext(project)}</dd></div>
        <div><dt>Evidence</dt><dd>{project.evidence.slice(0, 2).join(" ")}</dd></div>
        <div><dt>Surfaces</dt><dd>{project.surfaces.join(" · ")}</dd></div>
      </dl>
    </article>
  );
}

function ProjectVideo({ media, poster }: { media: Extract<ProjectMedia, { kind: "video" }>; poster?: string }) {
  return <WorkGridVideo media={media} poster={poster} />;
}

function ProjectSchematic({ project }: { project: ProjectCatalogRecord }) {
  const nodes: Record<string, string[]> = {
    "aksira-ai-keyboard": ["Android keyboard", "Native service · 30ms", "Bilingual AI cascade"],
    qiraaty: ["Video consultation", "Signed webhook", "Moyasar · ZATCA"],
    "getlab-system": ["WinForms RBAC", "Conflict guard", "SQL Server ledger"],
    "collab-platform": ["Client A + B", "Socket.io room", "Shared Gemini context"],
  };
  return <div className="wv2-schematic" aria-label={`${project.title} spec-backed architecture schematic`}><span className="wv2-schematic-label">Spec-backed schematic · no product screenshot</span><ol>{(nodes[project.slug] ?? project.scope.slice(0, 3)).map((node, index) => <li key={node}><span>{String(index + 1).padStart(2, "0")}</span>{node}</li>)}</ol></div>;
}
