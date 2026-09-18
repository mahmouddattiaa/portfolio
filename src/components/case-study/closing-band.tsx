import Link from "next/link";

export function ClosingBand({
  heading,
  lead,
  buttonLabel,
  buttonHref,
}: {
  heading: string;
  lead: string;
  buttonLabel: string;
  buttonHref: string;
}) {
  return (
    <section
      id="section-closing"
      className="cs-closing"
      aria-labelledby="cs-closing-title"
    >
      <div className="cs-closing-shell">
        <p className="cs-closing-eyebrow">Project review</p>
        <h2 id="cs-closing-title" className="cs-closing-heading">
          {heading}
        </h2>
        <div className="cs-closing-actions">
          <p className="cs-closing-lead">{lead}</p>
          <Link className="atelier-primary-action" href={buttonHref}>
            {buttonLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
