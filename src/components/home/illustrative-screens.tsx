import { Check, CircleCheck } from "lucide-react";
import type { IllustrativeFrameSample } from "@/components/case-study/presentation";

/*
 * Illustrative screens in Kepler Dev's own styling. They carry only the
 * approved sample values from the case study presentation module and never
 * the client's screens, branding or data.
 */

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

export function StaffAppScreen({ sample }: { sample: IllustrativeFrameSample }) {
  return (
    <div className="hv2-phone hv2-phone-staff">
      <span className="hv2-scanned">
        <CircleCheck aria-hidden="true" /> Code scanned
      </span>
      <div className="hv2-amount">
        <span className="hv2-muted">Purchase</span>
        <strong>{sample.purchaseAmount}</strong>
      </div>
      <div className="hv2-points-row">
        <span>Points</span>
        <strong>{sample.pointsEarned}</strong>
      </div>
      <dl className="hv2-mini-list">
        <div>
          <dt>Station</dt>
          <dd>Station A</dd>
        </div>
        <div>
          <dt>Code</dt>
          <dd>Single use</dd>
        </div>
      </dl>
      <div className="hv2-phone-foot">
        <span className="hv2-fake-button">Confirm purchase</span>
        <span className="hv2-muted">Settles once, even if retried</span>
      </div>
    </div>
  );
}

export function LedgerScreen({ sample }: { sample: IllustrativeFrameSample }) {
  return (
    <div className="hv2-window">
      <div className="hv2-window-side" aria-hidden="true">
        <strong>Head office</strong>
        <span>Stations</span>
        <span>Customers</span>
        <span className="hv2-active">Transactions</span>
        <span>Complaints</span>
        <span>Offers</span>
      </div>
      <div className="hv2-window-main">
        <div className="hv2-window-head">
          <strong>Points ledger</strong>
          <span className="hv2-lang-toggle" aria-hidden="true">
            <span>EN</span>
            <span lang="ar">ع</span>
          </span>
        </div>
        <span className="hv2-chip hv2-chip-green">
          Append-only, enforced by the database
        </span>
        <table className="hv2-ledger">
          <thead>
            <tr>
              <th scope="col">Entry</th>
              <th scope="col">Points</th>
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

export function ContractDiagram() {
  return (
    <div className="hv2-contract">
      <div className="hv2-contract-row">
        <span>Customer app</span>
        <span>Staff app</span>
        <span>Dashboard</span>
      </div>
      <svg viewBox="0 0 274 60" aria-hidden="true">
        <path d="M45 0v20q0 10 25 10h134q25 0 25-10V0M137 0v60" />
      </svg>
      <div className="hv2-contract-core">
        <strong>One API contract</strong>
        <span>60 operations</span>
      </div>
      <svg viewBox="0 0 274 60" aria-hidden="true">
        <path d="M137 0v60m0-30H70q-25 0-25 10v20m92-30h67q25 0 25 10v20" />
      </svg>
      <div className="hv2-contract-row hv2-contract-outline">
        <span>Loyalty services</span>
        <span>Points ledger</span>
        <span>Message queue</span>
      </div>
    </div>
  );
}

/* Step outputs for "From idea to production". Generic, no client data. */

export function ContextBriefScreen() {
  return (
    <div className="hv2-output">
      <div className="hv2-output-head">
        <strong>Context brief</strong>
        <span className="hv2-chip">Draft</span>
      </div>
      <ul className="hv2-checks">
        <li>
          <Check aria-hidden="true" /> Who uses it
        </li>
        <li>
          <Check aria-hidden="true" /> Where work slows down
        </li>
        <li className="hv2-pending">
          <span className="hv2-ring" aria-hidden="true" /> What success looks
          like
        </li>
      </ul>
    </div>
  );
}

export function BlueprintScreen() {
  const rows: Array<[string, "Must" | "Next"]> = [
    ["Customer onboarding", "Must"],
    ["Operations dashboard", "Must"],
    ["Admin roles and access", "Next"],
  ];
  return (
    <div className="hv2-output">
      <div className="hv2-output-head">
        <strong>Product blueprint</strong>
        <span className="hv2-chip">Scope agreed</span>
      </div>
      <ul className="hv2-priorities">
        {rows.map(([label, priority]) => (
          <li key={label}>
            <span>{label}</span>
            <span className={`hv2-priority hv2-priority-${priority.toLowerCase()}`}>
              {priority}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ReleaseScreen() {
  const steps = ["Submitted", "In review", "Approved", "Onboarding"];
  return (
    <div className="hv2-output">
      <div className="hv2-output-head">
        <strong>Working release</strong>
        <span className="hv2-chip hv2-chip-green">
          <span className="hv2-live-dot" aria-hidden="true" /> Live
        </span>
      </div>
      <ol className="hv2-journey">
        {steps.map((step, index) => (
          <li key={step} data-state={index === 0 ? "done" : index === 1 ? "current" : "todo"}>
            <span className="hv2-journey-dot" aria-hidden="true" />
            <span>{step}</span>
          </li>
        ))}
      </ol>
      <div className="hv2-surfaces">
        <span>Customer app</span>
        <span>Operations</span>
        <span>Admin</span>
      </div>
    </div>
  );
}

export function ReleaseNotesScreen() {
  const notes: Array<[string, string, boolean]> = [
    ["v1.4", "Export to spreadsheet", false],
    ["v1.3", "Arabic interface", true],
    ["v1.2", "Faster search", true],
  ];
  return (
    <div className="hv2-output">
      <div className="hv2-output-head">
        <strong>Release notes</strong>
        <span className="hv2-chip">Ongoing</span>
      </div>
      <ul className="hv2-notes">
        {notes.map(([version, label, shipped]) => (
          <li key={version}>
            <span className="hv2-muted">{version}</span>
            <span>{label}</span>
            <span className={shipped ? "hv2-shipped" : "hv2-in-progress"}>
              {shipped ? "Shipped" : "In progress"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
