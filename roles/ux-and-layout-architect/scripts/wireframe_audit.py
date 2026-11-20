#!/usr/bin/env python3
"""Zero-dependency deterministic UX wireframe & multi-route layout verifier for Kepler Dev Stage 3 (Role 1)."""
import argparse
import re
import sys
from pathlib import Path
from urllib.parse import unquote

ROOT = Path("/home/kepler/Desktop/Kepler/Projects/portfolio")
KIT = ROOT / "roles/ux-and-layout-architect"
OUTPUT = ROOT / "docs/stage-3-ux-wireframe-and-layout.md"

FLAGSHIPS = (
    "Glitre Loyalty Platform",
    "HS VPN",
    "QuickChargingPOS",
    "MedConnect Egypt",
    "StayEase",
    "Classroom Sentinel",
)
SHOWCASE = (
    "Aksira",
    "FitForge",
    "Qiraaty",
    "Focus Ritual",
    "GetLab System",
    "AI Collab Platform",
    "AgencyOS",
)
PROJECTS = FLAGSHIPS + SHOWCASE

SOURCES = (
    "docs/stage-1-final-copy-and-pitch.md",
    "docs/stage-2-visual-asset-manifest.md",
    "docs/stage-2-flagship-case-studies.md",
    "docs/seo-and-market-brief.md",
    "docs/context/projects-digest.md",
    ".agents/product-marketing.md",
)

HEADINGS = (
    "Scope and Source Locks",
    "Page Hierarchy and Copy Placement",
    "Responsive Grids and Fold Budgets",
    "Core Route Section Architecture & Homepage Budgets",
    "Project Frames and Asset Mapping (All 13 Builds)",
    "Six Flagship Case Study Pages (`/work/[slug]`)",
    "Work Index Filters and 13-Project Taxonomy (`/work`)",
    "Contact Qualification Funnel (`/contact`) & Studio Routing",
    "Accessibility and Performance Handoff",
    "Mandatory Self-Audit Checklist",
)


def clean(value):
    return value.strip().strip("`* ").strip()


def table(section, first):
    rows = []
    active = False
    for number, line in section:
        if not line.lstrip().startswith("|"):
            if active and rows:
                break
            continue
        cells = [clean(v) for v in line.strip().strip("|").split("|")]
        if cells[0] == first:
            active = True
            continue
        if active and not re.fullmatch(r"[:\-\s]+", cells[0]):
            rows.append((number, cells))
    return rows


def context():
    for relative in SOURCES:
        path = ROOT / relative
        if not path.is_file():
            print(f"FAIL: {relative}:1 missing source")
            return 1
        lines = path.read_text(encoding="utf-8").splitlines()
        print(f"\n{relative} ({len(lines)} lines)")
        headings = [(n, line) for n, line in enumerate(lines, 1) if re.match(r"^## ", line)]
        for n, line in headings[:8]:
            print(f"  {n}: {line}")
        if len(headings) > 8:
            print(f"  + {len(headings) - 8} further sections")
    print("\n13 Studio Projects: " + ", ".join(PROJECTS))
    return 0


def kit_check():
    required = [
        "ROLE.md",
        "START-SESSION.md",
        "templates/wireframe-and-layout.template.md",
        "scripts/wireframe_audit.py",
        "skills/cro/SKILL.md",
        "skills/site-architecture/SKILL.md",
        "skills/responsive-design/SKILL.md",
    ]
    errors = [f"{r}:1 missing kit file" for r in required if not (KIT / r).is_file()]
    for s in SOURCES:
        if not (ROOT / s).is_file():
            errors.append(f"{s}:1 missing source")
    for e in errors:
        print("FAIL: " + e)
    if not errors:
        print("PASS: Stage 3 Role 1 UX kit and sources verified.")
    return int(bool(errors))


def verify(path):
    if not path.is_file():
        print(f"FAIL: {path}:1 missing deliverable")
        return 1
    text = path.read_text(encoding="utf-8")
    lines = text.splitlines()
    errors = []

    def fail(number, message):
        errors.append(f"{path}:{number}: {message}")

    sections = {}
    starts = []
    for i, title in enumerate(HEADINGS, 1):
        expected = f"## {i}. {title}"
        matches = [n for n, line in enumerate(lines, 1) if line.strip() == expected]
        if len(matches) != 1:
            fail(1, f"expected exactly one heading: {expected}")
        else:
            starts.append((i, matches[0]))
    if [n for _, n in starts] != sorted(n for _, n in starts):
        fail(1, "numbered sections must be in order")
    for pos, (index, start) in enumerate(starts):
        end = starts[pos + 1][1] - 1 if pos + 1 < len(starts) else len(lines)
        sections[index] = list(enumerate(lines[start:end], start + 1))
        body = "\n".join(line for _, line in sections[index])
        if len(body.strip()) < 100:
            fail(start, "section needs substantive specification")

    for number, line in enumerate(lines, 1):
        if re.search(r"\b(FILL|TODO|TBD|PLACEHOLDER)\b", line, re.I):
            fail(number, "unresolved template marker")
        if line.startswith("```mermaid") or line.startswith("```json"):
            fail(number, "use ASCII/table specification; no new Mermaid/JSON")
        for asset in re.findall(r"`(/projects/[^`\n]+)`", line):
            disk = ROOT / "public" / unquote(asset.lstrip("/"))
            if not disk.is_file():
                fail(number, f"asset missing on disk: {asset}")

    # Verify all 13 projects in Section 5 & 7, and 6 flagships in Section 6
    for index, first, expected in ((5, "Project", PROJECTS), (6, "Flagship", FLAGSHIPS), (7, "Project", PROJECTS)):
        rows = table(sections.get(index, []), first)
        names = [cells[0] for _, cells in rows]
        for name in expected:
            if names.count(name) != 1:
                fail(1, f"section {index}: exactly one table row required for '{name}'")
        if len(rows) != len(expected):
            fail(1, f"section {index}: expected {len(expected)} rows, got {len(rows)}")

    # Verify Filter Totals in Section 7: Web(8) / Mobile(5) / AI(5) / R&D(5) or check each project has >=1 Yes
    filter_rows = table(sections.get(7, []), "Project")
    for number, cells in filter_rows:
        if len(cells) != 5 or any(v.lower() not in ("yes", "no") for v in cells[1:]):
            fail(number, "section 7 filter row needs Project and 4 Yes/No columns")
        elif not any(v.lower() == "yes" for v in cells[1:]):
            fail(number, f"project '{cells[0]}' must belong to at least one category")

    # Verify 6 Flagship detail rows in Section 6 have /work/... route & 5 semicolon steps
    detail_rows = table(sections.get(6, []), "Flagship")
    routes = []
    for number, cells in detail_rows:
        if len(cells) != 6 or any(not v for v in cells):
            fail(number, "section 6 row requires 6 non-empty cells")
        else:
            routes.append(cells[1])
            if not cells[1].startswith("/work/"):
                fail(number, f"flagship canonical route must start with /work/: '{cells[1]}'")
            if len([v for v in cells[5].split(";") if v.strip()]) != 5:
                fail(number, f"walkthrough cell for '{cells[0]}' needs 5 semicolon-separated steps")
    if len(routes) != len(set(routes)):
        fail(1, "canonical flagship routes must be unique")

    # Verify custom showcase component tokens and frame tokens in Section 5
    frame_text = "\n".join(line for _, line in sections.get(5, []))
    for token in (
        "mobile-portrait-frame",
        "desktop-browser-frame",
        "multi-app-ecosystem-frame",
        "interactive-architecture-card",
        "video-and-terminal-architecture-frame",
        "minimal-archive-badge-card",
        "GlitreIllustrativeDeviceFrames",
        "ClassroomSentinelPipelineCard",
        "AksiraDualEngineCard",
        "QiraatyComplianceBadge",
        "GetLabDatabaseBadge",
        "AICollabRealtimeBadge",
    ):
        if token not in frame_text:
            fail(1, f"section 5 missing frame/component token '{token}'")

    # Verify collapsed card math in Section 4
    geometry = table(sections.get(4, []), "Collapsed card")
    if len(geometry) != 1:
        fail(1, "section 4 requires one Collapsed card geometry row")
    else:
        number, cells = geometry[0]
        if len(cells) != 5 or any(not re.fullmatch(r"\d+", v) for v in cells[1:]):
            fail(number, "collapsed card geometry requires integer px values")
        elif int(cells[1]) != sum(int(v) for v in cells[2:]):
            fail(number, "collapsed card total height must equal media + text + spacing")

    # Verify Hero Fold budgets in Section 3
    budgets = []
    active = False
    for number, line in sections.get(3, []):
        if re.match(r"\|\s*Viewport\s*\|\s*Element\s*\|", line):
            active = True
            continue
        if active and line.startswith("|"):
            cells = [clean(v) for v in line.strip().strip("|").split("|")]
            if cells and not re.fullmatch(r"[:\-\s]+", cells[0]):
                budgets.append((number, cells))
        elif active and budgets:
            break
    for viewport, limit in (("390x844", 844), ("1440x900", 900)):
        values = []
        labels = []
        for number, cells in budgets:
            if cells[0] == viewport:
                if len(cells) != 3 or not re.fullmatch(r"\d+", cells[-1]):
                    fail(number, "height budget must be an integer")
                else:
                    values.append(int(cells[-1]))
                    labels.append(cells[1].lower())
        if len(values) < 6 or sum(values) > limit or any(v <= 0 for v in values):
            fail(1, f"{viewport} needs >=6 positive budget rows totaling <= {limit}px; got {sum(values)}px")

    # Verify 6 Homepage sections in Section 4
    sec_rows = table(sections.get(4, []), "Section")
    if len(sec_rows) != 6:
        fail(1, "section 4 requires 6 homepage section rows")

    # Required multi-route agency terms
    for term in ("/work", "/services", "/studio", "/contact", "/ar", "1440x900", "390x844", "320", "200%", "44", "reduced", "mahmouddattiaa7@gmail.com"):
        if term.lower() not in text.lower():
            fail(1, f"missing required agency layout specification term: '{term}'")

    audit_rows = table(sections.get(10, []), "Check")
    if len(audit_rows) < 7 or any(len(c) != 3 or c[1] != "PASS" for _, c in audit_rows):
        fail(1, "section 10 requires 7 passing self-audit rows")

    for e in errors:
        print("FAIL: " + e)
    if not errors:
        print("PASS: Verified all 13 projects, 6 flagship routes, multi-route IA, fold budgets, asset paths, and audit checklist.")
    return int(bool(errors))


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    g = parser.add_mutually_exclusive_group(required=True)
    g.add_argument("--context", action="store_true")
    g.add_argument("--kit", action="store_true")
    g.add_argument("--verify", nargs="?", const=str(OUTPUT))
    args = parser.parse_args()
    if args.context:
        return context()
    if args.kit:
        return kit_check()
    t = Path(args.verify)
    return verify(t if t.is_absolute() else ROOT / t)


if __name__ == "__main__":
    sys.exit(main())
