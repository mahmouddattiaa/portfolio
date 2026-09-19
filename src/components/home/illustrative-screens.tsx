import { Check, CircleCheck } from "lucide-react";
import type { IllustrativeFrameSample } from "@/components/case-study/presentation";
import type { HomeCopy } from "@/content/home";

/*
 * Illustrative screens in Kepler Dev's own styling. Sample values come from
 * the case study presentation module and labels from the homepage copy; the
 * client's screens, branding and data are never shown.
 */

type ScreenCopy = HomeCopy["screens"];

function QrGlyph() {
  return (
    <svg
      className="hv2-qr"
      viewBox="0 0 21 21"
      shapeRendering="crispEdges"
      aria-hidden="true"
    >
      <rect width="21" height="21" fill="#fff" />
      <path fill="#10231e" d="M0 0h7v7H0zM14 0h7v7h-7zM0 14h7v7H0z" />
      <path fill="#fff" d="M1 1h5v5H1zM15 1h5v5h-5zM1 15h5v5H1z" />
      <path fill="#10231e" d="M2 2h3v3H2zM16 2h3v3h-3zM2 16h3v3H2z" />
      <path
        fill="#10231e"
        d="M8 0h1v1H8zM10 1h1v1h-1zM9 2h1v1H9zM12 2h1v1h-1zM8 4h1v1H8zM11 4h1v1h-1zM9 6h1v1H9zM12 6h1v1h-1zM0 8h1v1H0zM2 8h1v1H2zM5 9h1v1H5zM7 8h1v1H7zM9 9h1v1H9zM10 8h1v1h-1zM13 9h1v1h-1zM15 8h1v1h-1zM18 9h1v1h-1zM20 8h1v1h-1zM1 11h1v1H1zM4 11h1v1H4zM8 11h1v1H8zM11 12h1v1h-1zM14 11h1v1h-1zM17 12h1v1h-1zM19 11h1v1h-1zM9 14h1v1H9zM12 15h1v1h-1zM15 15h1v1h-1zM17 14h1v1h-1zM20 15h1v1h-1zM9 17h1v1H9zM11 18h1v1h-1zM14 18h1v1h-1zM16 17h1v1h-1zM19 18h1v1h-1zM10 20h1v1h-1zM13 20h1v1h-1zM18 20h1v1h-1zM8 19h1v1H8zM20 20h1v1h-1zM3 10h1v1H3zM6 12h1v1H6zM16 10h1v1h-1zM10 10h2v2h-2zM13 13h2v1h-2zM8 13h1v2H8zM18 16h2v1h-2z"
      />
    </svg>
  );
}

/** The customer app is Arabic-first in the real product, so it stays Arabic. */
export function CustomerAppScreen({ sample }: { sample: IllustrativeFrameSample }) {
  return (
    <div className="hv2-phone" dir="rtl" lang="ar">
      <div className="hv2-phone-row">
        <span className="hv2-strong">مرحباً</span>
        <span className="hv2-avatar" />
      </div>
      <div className="hv2-balance">
        <span>رصيد النقاط</span>
        <strong dir="ltr">{sample.balance}</strong>
      </div>
      <div className="hv2-code">
        <QrGlyph />
        <span className="hv2-timer" dir="ltr">
          {sample.timer}
        </span>
        <span className="hv2-muted">رمز لمرة واحدة</span>
      </div>
      <div className="hv2-phone-nav">
        <span className="hv2-active">الرئيسية</span>
        <span>المكافآت</span>
        <span>المحطات</span>
      </div>
    </div>
  );
}

export function StaffAppScreen({
  sample,
  copy,
}: {
  sample: IllustrativeFrameSample;
  copy: ScreenCopy["staff"];
}) {
  return (
    <div className="hv2-phone hv2-phone-staff">
      <span className="hv2-scanned">
        <CircleCheck aria-hidden="true" /> {copy.scanned}
      </span>
      <div className="hv2-amount">
        <span className="hv2-muted">{copy.purchase}</span>
        <strong>{sample.purchaseAmount}</strong>
      </div>
      <div className="hv2-points-row">
        <span>{copy.points}</span>
        <strong>{sample.pointsEarned}</strong>
      </div>
      <dl className="hv2-mini-list">
        <div>
          <dt>{copy.station}</dt>
          <dd>{copy.stationValue}</dd>
        </div>
        <div>
          <dt>{copy.code}</dt>
          <dd>{copy.codeValue}</dd>
        </div>
      </dl>
      <div className="hv2-phone-foot">
        <span className="hv2-fake-button">{copy.confirm}</span>
        <span className="hv2-muted">{copy.retryNote}</span>
      </div>
    </div>
  );
}

export function LedgerScreen({
  sample,
  copy,
}: {
  sample: IllustrativeFrameSample;
  copy: ScreenCopy["ledger"];
}) {
  return (
    <div className="hv2-window">
      <div className="hv2-window-side" aria-hidden="true">
        <strong>{copy.office}</strong>
        {copy.nav.map((item, index) => (
          <span
            key={item}
            className={index === copy.activeNavIndex ? "hv2-active" : undefined}
          >
            {item}
          </span>
        ))}
      </div>
      <div className="hv2-window-main">
        <div className="hv2-window-head">
          <strong>{copy.title}</strong>
          <span className="hv2-lang-toggle" aria-hidden="true">
            <span>EN</span>
            <span lang="ar">ع</span>
          </span>
        </div>
        <span className="hv2-chip hv2-chip-green">{copy.appendOnly}</span>
        <table className="hv2-ledger">
          <thead>
            <tr>
              <th scope="col">{copy.entry}</th>
              <th scope="col">{copy.points}</th>
            </tr>
          </thead>
          <tbody>
            {sample.ledgerRows.map((row) => (
              <tr
                key={`${row.kind}-${row.detail}`}
                data-kind={row.kind.toLowerCase()}
              >
                <td>
                  {row.kind} · {row.detail}
                </td>
                <td>{row.delta}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function ContractDiagram({ copy }: { copy: ScreenCopy["contract"] }) {
  return (
    <div className="hv2-contract">
      <div className="hv2-contract-row">
        {copy.clients.map((client) => (
          <span key={client}>{client}</span>
        ))}
      </div>
      <svg viewBox="0 0 274 60" aria-hidden="true">
        <path d="M45 0v20q0 10 25 10h134q25 0 25-10V0M137 0v60" />
      </svg>
      <div className="hv2-contract-core">
        <strong>{copy.core}</strong>
        <span>{copy.coreDetail}</span>
      </div>
      <svg viewBox="0 0 274 60" aria-hidden="true">
        <path d="M137 0v60m0-30H70q-25 0-25 10v20m92-30h67q25 0 25 10v20" />
      </svg>
      <div className="hv2-contract-row hv2-contract-outline">
        {copy.services.map((service) => (
          <span key={service}>{service}</span>
        ))}
      </div>
    </div>
  );
}

/* Step outputs for "From idea to production". Generic, no client data. */

export function ContextBriefScreen({ copy }: { copy: ScreenCopy["contextBrief"] }) {
  return (
    <div className="hv2-output">
      <div className="hv2-output-head">
        <strong>{copy.title}</strong>
        <span className="hv2-chip">{copy.chip}</span>
      </div>
      <ul className="hv2-checks">
        {copy.done.map((item) => (
          <li key={item}>
            <Check aria-hidden="true" /> {item}
          </li>
        ))}
        <li className="hv2-pending">
          <span className="hv2-ring" aria-hidden="true" /> {copy.pending}
        </li>
      </ul>
    </div>
  );
}

export function BlueprintScreen({ copy }: { copy: ScreenCopy["blueprint"] }) {
  return (
    <div className="hv2-output">
      <div className="hv2-output-head">
        <strong>{copy.title}</strong>
        <span className="hv2-chip">{copy.chip}</span>
      </div>
      <ul className="hv2-priorities">
        {copy.rows.map((row) => (
          <li key={row.label}>
            <span>{row.label}</span>
            <span className={`hv2-priority hv2-priority-${row.priority}`}>
              {row.priorityLabel}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ReleaseScreen({ copy }: { copy: ScreenCopy["release"] }) {
  return (
    <div className="hv2-output">
      <div className="hv2-output-head">
        <strong>{copy.title}</strong>
        <span className="hv2-chip hv2-chip-green">
          <span className="hv2-live-dot" aria-hidden="true" /> {copy.chip}
        </span>
      </div>
      <ol className="hv2-journey">
        {copy.journey.map((step, index) => (
          <li
            key={step}
            data-state={index === 0 ? "done" : index === 1 ? "current" : "todo"}
          >
            <span className="hv2-journey-dot" aria-hidden="true" />
            <span>{step}</span>
          </li>
        ))}
      </ol>
      <div className="hv2-surfaces">
        {copy.surfaces.map((surface) => (
          <span key={surface}>{surface}</span>
        ))}
      </div>
    </div>
  );
}

export function ReleaseNotesScreen({ copy }: { copy: ScreenCopy["notes"] }) {
  return (
    <div className="hv2-output">
      <div className="hv2-output-head">
        <strong>{copy.title}</strong>
        <span className="hv2-chip">{copy.chip}</span>
      </div>
      <ul className="hv2-notes">
        {copy.rows.map((row) => (
          <li key={row.version}>
            <span className="hv2-muted">{row.version}</span>
            <span>{row.label}</span>
            <span className={row.shipped ? "hv2-shipped" : "hv2-in-progress"}>
              {row.shipped ? copy.shipped : copy.inProgress}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
