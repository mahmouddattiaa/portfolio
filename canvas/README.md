# Kepler Dev — current-site canvases

Captured from the local portfolio checkout on 4 October 2026. Awaiting Mahmoud’s personal review.

Open `documents/Kepler-Dev-Current-Site-Review.fig` in OpenPencil. This is the refreshed review copy of `Kepler-Dev-Current-Site.fig`, opened under a new name to avoid the editor’s cached older document. Its page list contains every public page, followed by additional navigation and FAQ states. Every canvas page places the 1440 px desktop board on the left and the 390 px mobile board on the right, with review notes beside them. Use the page list to switch pages; use Ctrl+scroll to zoom and Space+drag to pan.

Each route also has a separate `.fig` file in `documents/`. These are native editable design documents that other agents can inspect and modify through OpenPencil’s MCP tools. Text, form labels, dividers and layout groups are editable. Photos, screenshots, SVG icons and complex CSS decorations are embedded image assets. The navigation labels and controls remain separate from its captured glass background.

| Page | Route | Separate file |
| --- | --- | --- |
| Home | `/` | `home.fig` |
| Work | `/work` | `work.fig` |
| Services | `/services` | `services.fig` |
| Founder | `/mahmoud` | `mahmoud.fig` |
| Contact | `/contact` | `contact.fig` |
| Privacy | `/privacy` | `privacy.fig` |
| Arabic home | `/ar` | `ar.fig` |
| HS VPN | `/work/hs-vpn` | `work--hs-vpn.fig` |
| Glitre | `/work/glitre-loyalty-platform` | `work--glitre-loyalty-platform.fig` |
| Customer app | `/work/glitre-loyalty-platform/customer-app` | `work--glitre-loyalty-platform--customer-app.fig` |
| Worker app | `/work/glitre-loyalty-platform/worker-app` | `work--glitre-loyalty-platform--worker-app.fig` |
| Manager dashboard | `/work/glitre-loyalty-platform/manager` | `work--glitre-loyalty-platform--manager.fig` |

`/work/loyalty-operations-platform` redirects to the Glitre case study. `/api/contact` is an API endpoint, so neither needs an additional UI canvas.

## Visual review

- Website: http://127.0.0.1:3100
- Comparison viewer: http://127.0.0.1:3101
- `captures/`: full-page browser references, native canvas renders and source geometry for each viewport.
- `review/qa-report.json`: text-content verification and image-difference measurements.
- `review/editor-verification.json`: exports and font checks from the running OpenPencil editor.
- `review/*-y*.png`: live reference on the left, canvas export on the right, at the top and the sections with the largest differences.

These are static snapshots. Scroll reveals are settled, clocks are frozen, and interactive controls are represented in their captured state. OpenPencil and browsers may differ slightly in font shaping, antialiasing and compositing. The comparison viewer makes those differences visible; it does not represent design approval.

The Arabic mobile reference is cropped to its 390 px viewport. The website’s full-page screenshot extends to 416 px because of horizontal overflow; the uncut capture is retained as `captures/ar-390/reference-overflow.png`. The existing website was not changed.

OpenPencil 0.15.1 rejected MCP raster exports targeting another page in the master document. The editor verification therefore opens each standalone page document and exports both boards from it. Use those standalone files for agent-generated visual previews.

The complete fonts are installed locally and also included in `fonts/full/`, together with their licenses. Noto Sans Arabic is included because Chrome uses it as a fallback for some headings and navigation labels. If opening the documents on another machine, install these fonts first. Manrope’s family metadata was normalized to `Manrope` for consistent desktop lookup.

## Reproduce

This snapshot is archived in the portfolio repository under `canvas/`. Website source files were not changed. Installed Node and Python dependencies are excluded from Git; run `npm ci` in `canvas/tools/` to install the Node dependencies.

The original capture scripts retain their machine-specific paths, including `/home/kepler/Desktop/portfolio-canvas-2026-10-04` as the output root. Adjust those paths before regenerating the archive elsewhere. The editable documents and captured evidence can be opened directly from this directory.

```bash
# Run the existing website in the portfolio repository
npm run dev -- --hostname 127.0.0.1 --port 3100

# Run these from this directory; they use the included tooling dependencies
node tools/capture.mjs
node tools/capture.mjs / navigation
node tools/capture.mjs / faq
node tools/normalize-references.mjs
node tools/build.mjs
cp documents/Kepler-Dev-Current-Site.fig documents/Kepler-Dev-Current-Site-Review.fig
node tools/qa.mjs
node tools/mcp-review.mjs
node tools/check-deliverables.mjs
node tools/review-server.mjs
```

The MCP check requires OpenPencil to be running, with this directory configured as its MCP root. The scripts use the local authenticated discovery file without storing a bearer token in the deliverables.
