export function ArchitectureDiagram() {
  return (
    <figure className="cs-architecture-diagram" aria-label="System architecture">
      <svg
        viewBox="0 0 880 460"
        role="img"
        aria-labelledby="cs-architecture-title"
      >
        <title id="cs-architecture-title">
          Three clients connect to one API contract, which fronts the loyalty
          services, the points ledger, and the message queue, all running in an
          in-region cloud environment.
        </title>

        {/* Clients column */}
        <g>
          <rect
            className="cs-diagram-node"
            x="24"
            y="46"
            width="170"
            height="64"
            rx="6"
          />
          <text
            className="cs-diagram-node-text"
            x="44"
            y="78"
          >
            Customer app
          </text>
          <text className="cs-diagram-node-sub" x="44" y="98">
            Right-to-left · Arabic-first
          </text>

          <rect
            className="cs-diagram-node"
            x="24"
            y="200"
            width="170"
            height="64"
            rx="6"
          />
          <text className="cs-diagram-node-text" x="44" y="232">
            Staff app
          </text>
          <text className="cs-diagram-node-sub" x="44" y="252">
            Android · QR scanner
          </text>

          <rect
            className="cs-diagram-node"
            x="24"
            y="354"
            width="170"
            height="64"
            rx="6"
          />
          <text
            className="cs-diagram-node-text"
            x="44"
            y="386"
          >
            Head-office dashboard
          </text>
          <text className="cs-diagram-node-sub" x="44" y="406">
            Role-based · Arabic + English
          </text>
        </g>

        {/* Connectors from clients to API contract */}
        <path
          className="cs-diagram-line"
          pathLength={1}
          d="M194 78 C 250 78, 250 230, 306 230"
          style={{ ["--cs-line-delay" as string]: "100ms" }}
        />
        <path
          className="cs-diagram-line"
          pathLength={1}
          d="M194 232 L 306 232"
          style={{ ["--cs-line-delay" as string]: "200ms" }}
        />
        <path
          className="cs-diagram-line"
          pathLength={1}
          d="M194 386 C 250 386, 250 234, 306 234"
          style={{ ["--cs-line-delay" as string]: "300ms" }}
        />

        {/* API contract node */}
        <g className="cs-diagram-node-enter" style={{ ["--cs-node-delay" as string]: "0ms" }}>
          <rect
            className="cs-diagram-node cs-diagram-node--accent"
            x="306"
            y="180"
            width="240"
            height="100"
            rx="6"
          />
          <text
            className="cs-diagram-node-text"
            x="324"
            y="212"
          >
            One API contract
          </text>
          <text className="cs-diagram-node-sub" x="324" y="232">
            60 operations
          </text>
          <text className="cs-diagram-emphasis" x="324" y="252">
            Source of truth · CI fails when clients disagree
          </text>
          <text className="cs-diagram-node-sub" x="324" y="268">
            Clients generated from the contract
          </text>
        </g>

        {/* Connectors from API contract to services */}
        <path
          className="cs-diagram-line"
          pathLength={1}
          d="M546 200 C 610 200, 610 100, 676 100"
          style={{ ["--cs-line-delay" as string]: "400ms" }}
        />
        <path
          className="cs-diagram-line cs-diagram-line--accent"
          pathLength={1}
          d="M546 230 L 676 230"
          style={{ ["--cs-line-delay" as string]: "500ms" }}
        />
        <path
          className="cs-diagram-line"
          pathLength={1}
          d="M546 260 C 610 260, 610 360, 676 360"
          style={{ ["--cs-line-delay" as string]: "600ms" }}
        />

        {/* Loyalty services */}
        <g
          className="cs-diagram-node-enter"
          style={{ ["--cs-node-delay" as string]: "550ms" }}
        >
          <rect
            className="cs-diagram-node"
            x="676"
            y="60"
            width="180"
            height="80"
            rx="6"
          />
          <text className="cs-diagram-node-text" x="694" y="92">
            Loyalty services
          </text>
          <text className="cs-diagram-node-sub" x="694" y="112">
            Rules · offers · vouchers
          </text>
        </g>

        {/* Points ledger */}
        <g
          className="cs-diagram-node-enter"
          style={{ ["--cs-node-delay" as string]: "700ms" }}
        >
          <rect
            className="cs-diagram-node cs-diagram-node--accent"
            x="676"
            y="190"
            width="180"
            height="80"
            rx="6"
          />
          <text className="cs-diagram-node-text" x="694" y="222">
            Points ledger
          </text>
          <text className="cs-diagram-node-sub" x="694" y="242">
            Append-only
          </text>
          <text className="cs-diagram-emphasis" x="694" y="258">
            Enforced by the database
          </text>
        </g>

        {/* Message queue */}
        <g
          className="cs-diagram-node-enter"
          style={{ ["--cs-node-delay" as string]: "850ms" }}
        >
          <rect
            className="cs-diagram-node"
            x="676"
            y="320"
            width="180"
            height="80"
            rx="6"
          />
          <text className="cs-diagram-node-text" x="694" y="352">
            Message queue
          </text>
          <text className="cs-diagram-node-sub" x="694" y="372">
            Codes · notifications
          </text>
          <text className="cs-diagram-emphasis" x="694" y="388">
            Retried on failure
          </text>
        </g>

        {/* In-region environment (wraps everything) */}
        <rect
          className="cs-diagram-node-enter"
          x="0"
          y="14"
          width="880"
          height="432"
          rx="10"
          fill="none"
          stroke="#071c18"
          strokeDasharray="6 6"
          strokeWidth="1"
          style={{ ["--cs-node-delay" as string]: "950ms" }}
        />
        <text
          className="cs-diagram-node-sub cs-diagram-node-enter"
          x="14"
          y="32"
          style={{ ["--cs-node-delay" as string]: "1000ms" }}
        >
          In-region cloud environment
        </text>
      </svg>
    </figure>
  );
}
