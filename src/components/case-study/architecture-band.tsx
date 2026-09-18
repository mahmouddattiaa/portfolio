import { ArchitectureDiagram } from "./architecture-diagram";

export function ArchitectureBand({
  heading,
  line,
}: {
  heading: string;
  line: string;
}) {
  return (
    <section
      id="section-architecture"
      className="cs-architecture"
      aria-labelledby="cs-architecture-title"
    >
      <div className="cs-architecture-shell">
        <div className="cs-architecture-header">
          <p className="cs-architecture-eyebrow">How it fits together</p>
          <h2 id="cs-architecture-title" className="cs-architecture-heading">
            {heading}
          </h2>
          <p className="cs-architecture-line">{line}</p>
        </div>
        <ArchitectureDiagram />
      </div>
    </section>
  );
}
