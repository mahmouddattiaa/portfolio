# Design canvases

Each folder mirrors one published design canvas. **The artifact is the live copy** —
it is where the design is reviewed and changed. What is committed here is a snapshot,
so the design survives outside the artifact service and can be read in a diff.

| Folder | Page | Live canvas |
| --- | --- | --- |
| `homepage/` | `/` | [Kepler Dev — Homepage Blueprint](https://claude.ai/artifact/4HhU34B42dpuhRLRxNzRVh) |
| `work-page/` | `/work` | [Kepler Dev — Work Page Blueprint](https://claude.ai/artifact/JCmvRmSKqN7zJV5DySyVHM) |
| `services-page/` | `/services` | [Kepler Dev — Services Page Blueprint](https://claude.ai/artifact/An9iUUq7JTeg37QSzhacCM) |

The canvases are private. Only the owner and anyone the owner has shared them with can
open these links.

## What is in a folder

- `canvas.json` — the index: one entry per artboard with its frame on the canvas
  (`x`, `y`, `w`, `h`), the back-to-front `order`, the canvas title, and the `notes`
  that carry the guide and the design decisions. The notes are worth reading first:
  they say what was decided and why.
- `<Name>.dc.html` — one artboard. `Main.dc.html` is the full desktop page and imports
  the section boards; `Mobile.dc.html` is the phone board. Each file is self-contained
  HTML and opens in a browser on its own, though the canvas is where it is meant to be read.

## Keeping a snapshot current

These files are copies, not a sync. After a design changes on a canvas, re-export that
folder from the canvas's own files so the snapshot matches what was approved. A snapshot
that has drifted is worse than none, because it looks authoritative.

## Images

Photographs used by the artboards live as uploaded assets on each canvas and are
referenced as `/_blob/<id>`, which resolves only on that canvas. They are not committed
here. The production copies of the same imagery are in `public/media/`.

## Related

- `docs/design/work-page-v2.md` — the written spec for the work page, section by section.
