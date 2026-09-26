export function HsVpnArchitectureDiagram() {
  return (
    <figure className="hsvpn-diagram" aria-label="HS VPN architecture">
      <svg
        viewBox="0 0 880 460"
        role="img"
        aria-labelledby="hsvpn-architecture-title"
      >
        <title id="hsvpn-architecture-title">
          The Flutter app owns the user state and orchestrator. A native tunnel
          service runs on Android and iOS and talks WireGuard or AmneziaWG to a
          per-node registrar. Firebase Remote Config supplies the server
          catalog with cached and bundled fallbacks.
        </title>

        {/* App / client column */}
        <g>
          <rect
            className="hsvpn-diagram-node"
            x="24"
            y="44"
            width="200"
            height="70"
            rx="6"
          />
          <text className="hsvpn-diagram-node-text" x="44" y="76">
            Flutter app
          </text>
          <text className="hsvpn-diagram-node-sub" x="44" y="94">
            Screens · controllers · catalog
          </text>
          <text className="hsvpn-diagram-emphasis" x="44" y="108">
            Orchestrator + state machine
          </text>

          <rect
            className="hsvpn-diagram-node hsvpn-diagram-node--accent"
            x="24"
            y="196"
            width="200"
            height="70"
            rx="6"
          />
          <text className="hsvpn-diagram-node-text" x="44" y="228">
            Native tunnel
          </text>
          <text className="hsvpn-diagram-node-sub" x="44" y="246">
            Android · Kotlin · AmneziaWG
          </text>
          <text className="hsvpn-diagram-emphasis" x="44" y="260">
            iOS · Swift · WireGuardKit
          </text>

          <rect
            className="hsvpn-diagram-node"
            x="24"
            y="346"
            width="200"
            height="70"
            rx="6"
          />
          <text className="hsvpn-diagram-node-text" x="44" y="378">
            Secure key storage
          </text>
          <text className="hsvpn-diagram-node-sub" x="44" y="396">
            Curve25519 keypair · OS keystore
          </text>
        </g>

        {/* Connectors from Flutter to native tunnel and remote config */}
        <path
          className="hsvpn-diagram-line hsvpn-diagram-line--accent"
          d="M224 80 L 296 230"
        />
        <path
          className="hsvpn-diagram-line"
          d="M224 230 L 296 380"
        />

        {/* Config plane column */}
        <g>
          <rect
            className="hsvpn-diagram-node hsvpn-diagram-node--accent"
            x="296"
            y="44"
            width="248"
            height="120"
            rx="6"
          />
          <text className="hsvpn-diagram-node-text" x="316" y="76">
            Server catalog control plane
          </text>
          <text className="hsvpn-diagram-node-sub" x="316" y="96">
            Firebase Remote Config · version gates
          </text>
          <text className="hsvpn-diagram-emphasis" x="316" y="112">
            Three-layer fallback
          </text>
          <text className="hsvpn-diagram-node-sub" x="316" y="128">
            Remote → last-known-good → bundled
          </text>
          <text className="hsvpn-diagram-emphasis" x="316" y="144">
            A remote outage does not remove every location
          </text>

          <rect
            className="hsvpn-diagram-node"
            x="296"
            y="196"
            width="248"
            height="120"
            rx="6"
          />
          <text className="hsvpn-diagram-node-text" x="316" y="228">
            Connection orchestrator
          </text>
          <text className="hsvpn-diagram-node-sub" x="316" y="248">
            Order profiles · register peer · start tunnel
          </text>
          <text className="hsvpn-diagram-emphasis" x="316" y="264">
            Wait for handshake before showing Protected
          </text>
          <text className="hsvpn-diagram-node-sub" x="316" y="280">
            AmneziaWG preferred on Android when enabled
          </text>
          <text className="hsvpn-diagram-node-sub" x="316" y="296">
            WireGuard plain tunnel on iOS TestFlight
          </text>

          <rect
            className="hsvpn-diagram-node"
            x="296"
            y="346"
            width="248"
            height="70"
            rx="6"
          />
          <text className="hsvpn-diagram-node-text" x="316" y="378">
            Connection-aware ad placement
          </text>
          <text className="hsvpn-diagram-node-sub" x="316" y="396">
            AdMob + Meta · gated on protected state
          </text>
        </g>

        {/* Connectors from orchestrator to server */}
        <path
          className="hsvpn-diagram-line hsvpn-diagram-line--accent"
          d="M544 256 L 632 256"
        />
        <path
          className="hsvpn-diagram-line"
          d="M224 230 C 260 230, 280 256, 296 256"
        />

        {/* Server node column */}
        <g>
          <rect
            className="hsvpn-diagram-node"
            x="632"
            y="44"
            width="224"
            height="80"
            rx="6"
          />
          <text className="hsvpn-diagram-node-text" x="652" y="76">
            VPN server node
          </text>
          <text className="hsvpn-diagram-node-sub" x="652" y="96">
            Per-region · WireGuard or AmneziaWG
          </text>
          <text className="hsvpn-diagram-emphasis" x="652" y="110">
            wg0 / awg0 interface
          </text>

          <rect
            className="hsvpn-diagram-node hsvpn-diagram-node--accent"
            x="632"
            y="156"
            width="224"
            height="200"
            rx="6"
          />
          <text className="hsvpn-diagram-node-text" x="652" y="188">
            FastAPI peer registrar
          </text>
          <text className="hsvpn-diagram-node-sub" x="652" y="208">
            POST /register · assigns client IP
          </text>
          <text className="hsvpn-diagram-emphasis" x="652" y="224">
            Peer record added to live wg interface
          </text>
          <text className="hsvpn-diagram-node-sub" x="652" y="240">
            Behind Caddy on TCP 443
          </text>
          <text className="hsvpn-diagram-node-sub" x="652" y="258">
            /status · /healthz · /diag
          </text>
          <text className="hsvpn-diagram-emphasis" x="652" y="274">
            No persistent user database
          </text>
          <text className="hsvpn-diagram-node-sub" x="652" y="292">
            The interface itself is the source of truth
          </text>
          <text className="hsvpn-diagram-node-sub" x="652" y="310">
            Cleanup keeps stale peers from lingering
          </text>
          <text className="hsvpn-diagram-emphasis" x="652" y="328">
            Env-var switch between WireGuard and AWG
          </text>
          <text className="hsvpn-diagram-node-sub" x="652" y="344">
            No redeploy to change transport
          </text>
        </g>

        {/* Connector from catalog to server */}
        <path
          className="hsvpn-diagram-line"
          d="M544 100 C 600 100, 600 84, 632 84"
        />

        {/* Connector from native tunnel to server */}
        <path
          className="hsvpn-diagram-line hsvpn-diagram-line--accent"
          d="M224 230 C 380 230, 380 84, 632 84"
          style={{ strokeDasharray: "6 6" }}
        />
        <text className="hsvpn-diagram-emphasis" x="380" y="160">
          WireGuard / AmneziaWG UDP
        </text>

        {/* Outer boundary */}
        <rect
          x="0"
          y="14"
          width="880"
          height="432"
          rx="10"
          fill="none"
          stroke="#202826"
          strokeDasharray="6 6"
          strokeWidth="1"
          opacity="0.45"
        />
        <text
          className="hsvpn-diagram-node-sub"
          x="14"
          y="32"
          opacity="0.7"
        >
          Source-backed architecture
        </text>
      </svg>
    </figure>
  );
}
