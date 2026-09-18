import type { IllustrativeFrameSample } from "./presentation";

export function CustomerPhoneFrame({
  sample,
}: {
  sample: IllustrativeFrameSample;
}) {
  return (
    <article className="cs-frame" aria-label="Customer app, illustrative">
      <p className="cs-frame-label">Customer phone</p>
      <div className="cs-phone">
        <div className="cs-phone-shell">
          <div className="cs-phone-screen">
            <div className="cs-phone-balance">
              <span className="cs-phone-balance-label">Balance</span>
              <span className="cs-phone-balance-value">
                {sample.balance}
              </span>
            </div>
            <div className="cs-phone-qr" aria-hidden="true">
              <QrGlyph />
              <span className="cs-phone-qr-pulse" aria-hidden="true" />
            </div>
            <span className="cs-phone-timer" aria-hidden="true">
              Code expires in {sample.timer}
            </span>
            <div className="cs-phone-foot">
              <span className="cs-phone-foot-label">Last earn</span>
              <span className="cs-phone-foot-value">
                {sample.pointsEarned} pts
              </span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export function StaffScannerFrame({
  sample,
}: {
  sample: IllustrativeFrameSample;
}) {
  return (
    <article className="cs-frame" aria-label="Staff device, illustrative">
      <p className="cs-frame-label">Staff device</p>
      <div className="cs-scanner">
        <div className="cs-scanner-viewport" aria-hidden="true">
          <div className="cs-scanner-grid" />
          <div className="cs-scanner-frame" />
          <div className="cs-scanner-corners">
            <i />
            <i />
          </div>
          <span className="cs-scan-line" aria-hidden="true" />
          <span className="cs-scanner-readout">Scanning</span>
        </div>
        <div className="cs-scanner-meta">
          <span className="cs-scanner-meta-label">Purchase</span>
          <span className="cs-scanner-meta-value">
            {sample.purchaseAmount} · points {sample.pointsEarned}
          </span>
        </div>
      </div>
    </article>
  );
}

export function LedgerFrame({
  sample,
}: {
  sample: IllustrativeFrameSample;
}) {
  return (
    <article
      className="cs-frame cs-ledger"
      aria-label="Head-office ledger, illustrative"
    >
      <p className="cs-frame-label">Head-office ledger</p>
      <div className="cs-ledger-header">
        <h3 className="cs-ledger-title">Points ledger</h3>
        <span className="cs-ledger-period">This period</span>
      </div>
      <ul className="cs-ledger-rows">
        {sample.ledgerRows.map((row, index) => {
          const tone =
            row.kind === "Reversal"
              ? "reversal"
              : row.kind === "Redeem"
                ? "redeem"
                : "earn";
          return (
            <li
              key={`${row.kind}-${row.detail}-${index}`}
              className="cs-ledger-row"
              data-tone={tone}
              style={{ ["--cs-row-index" as string]: index }}
            >
              <span className="cs-ledger-kind">{row.kind}</span>
              <span className="cs-ledger-detail">{row.detail}</span>
              <span className="cs-ledger-delta">{row.delta}</span>
            </li>
          );
        })}
      </ul>
      <div className="cs-ledger-foot">
        <span>Append-only</span>
        <span>Database-enforced</span>
      </div>
    </article>
  );
}

function QrGlyph() {
  const cells = [
    "1111111010010111111111",
    "1000001010100010000001",
    "1011101001110101111101",
    "1011101011000101111101",
    "1011101001110101111101",
    "1000001010100010000001",
    "1111111010101111111111",
    "0000000010110000000000",
    "1101101110100110101110",
    "0010010001110100100100",
    "1110110111000101101111",
    "0001001010100110010000",
    "1100111110001011110011",
    "0010100001111100101100",
    "1110110110110100101111",
    "0000000010111001010010",
    "1111111001100101111011",
    "1000001010111100100101",
    "1011101011000110111100",
    "1011101001101100100101",
    "1111111010100100111110",
  ];
  const size = 7;
  const out: Array<{ x: number; y: number }> = [];
  cells.forEach((row, y) => {
    row.split("").forEach((char, x) => {
      if (char === "1") out.push({ x: x * size, y: y * size });
    });
  });

  return (
    <svg viewBox="0 0 154 154" role="img" aria-label="One-time QR code">
      <rect x="0" y="0" width="154" height="154" fill="var(--atelier-ink)" />
      {out.map((dot, idx) => (
        <rect
          key={idx}
          x={dot.x}
          y={dot.y}
          width={size - 1}
          height={size - 1}
          fill="var(--atelier-pearl)"
        />
      ))}
      <rect
        x="49"
        y="49"
        width="56"
        height="56"
        fill="none"
        stroke="var(--atelier-pearl)"
        strokeWidth="2"
      />
    </svg>
  );
}
