---
name: open-pencil-authoring
description: Build and save native editable Open Pencil designs through the connected MCP without touching unrelated documents.
---

# Native Open Pencil authoring

Original role instructions grounded in the official [MCP guide](https://openpencil.dev/programmable/mcp-server.md) and [JSX renderer guide](https://openpencil.dev/programmable/jsx-renderer.md), consulted 2026-11-01. Read the renderer guide through context-mode when syntax is uncertain; its Frame/Text design nodes are not HTML.

Discover schemas by exact names: `new_document`, `render`, `get_jsx`, `save_file`, `export_image`, `list_available_fonts`, `get_font_status`, `set_image_fill`, `create_variable`, `bind_variable`, `create_component`, `create_instance`, `combine_as_variants`, `lint` and `analyze_overlaps`. Never output the entire tool catalog.

List documents, preserve the current Untitled tab, and create a separate portfolio document. Save early, preferably to the repo's `design/stage-3-portfolio.fig`; paths must be inside the configured MCP root. An allowed relative filename is a fallback only if the intended absolute path is rejected; record the actual returned path. Do not change root settings.

Check requested families with `list_available_fonts(family=...)` before choosing text styles; use `get_font_status` afterward. A CSS font stack is not a native family name. Document missing faces and use a justified available fallback only with a clear handoff note; verify Arabic text separately.

Use `render` batches for native layer trees, not a flat imported bitmap. Use the returned node IDs, inspect bounded subtrees, and correct text metrics. Reusable authoring JSX under `design/` is allowed; it is not product implementation. Create true components/instances using native tools; exported JSX may represent instances as plain frames.

Images come from verified local Stage 2 assets. Use supported image fills and intrinsic fit; pass binary/base64 between tools without printing it into model context. Never use stock photos or fabricated screenshots.

Use the shapes/motion research file for original native dot grids, rules, geometric accents and connector studies. Show animation intent with editable frame sequences and annotations; do not claim native playback where the tool only renders static states. Keep the calm baseline and label optional background motion for review. Do not vendor uncertain-license examples or install animation packages.

Read `../../VISUAL-INSPECTION.md`. Export with `export_image(path=..., ids=[...])` after each completed section/page, open the saved image, correct visible problems, and inspect a fresh export before moving on. Use readable section exports or close-ups instead of relying on tiny whole-page images. Save the corrected native document and record actual screenshot paths. If exporting or viewing is blocked, preserve the document and label the visual check unverified.
