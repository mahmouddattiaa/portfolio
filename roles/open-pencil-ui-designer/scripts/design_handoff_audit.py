#!/usr/bin/env python3
"""Deterministic Open Pencil handoff, .fig artifact, token & PNG export verifier for Kepler Dev Stage 3 (Role 2C)."""
import argparse
import json
import re
import sys
from pathlib import Path

ROOT = Path("/home/kepler/Desktop/Kepler/Projects/portfolio")
KIT = ROOT / "roles/open-pencil-ui-designer"
OUTPUT = ROOT / "docs/stage-3-open-pencil-design-handoff.md"
DESIGN_SYS = ROOT / "docs/stage-3-design-system.md"

HEADINGS = (
    "Design Summary and Saved Artifact",
    "Machine-Readable Inventory",
    "Copy, Assets and Component Coverage",
    "Font and Variable Checks",
    "Measured Layout and State Review",
    "Image Review and Canvas Checks",
    "Remaining Decisions and Implementation Notes",
    "Mandatory Self-Audit Checklist",
)

REQUIRED_KINDS = {
    "home-desktop",
    "home-mobile",
    "fold-desktop",
    "fold-mobile",
    "reflow-mobile",
    "ar-desktop",
    "ar-mobile",
    "work-desktop",
    "work-mobile",
    "services-desktop",
    "studio-desktop",
    "contact-desktop",
    "detail-desktop",
    "social-card",
    "component-library",
}

COMPONENTS = (
    "SiteHeader", "HeroAndTrust", "PrimaryButton", "SecondaryButton",
    "FlagshipWorkStrip", "WorkCatalogCard", "FilterButton", "FaqDisclosure",
    "StudioStandardsBand", "QualificationField", "QualificationSubmit",
    "CaseStudyContentsRail", "StatusBadge", "DiagramViewer",
    "GlitreIllustrativeDeviceFrames", "ClassroomSentinelPipelineCard",
    "AksiraDualEngineCard", "ShowcaseArchitectureBadge",
)


def kit_check():
    req = [
        "ROLE.md",
        "START-SESSION.md",
        "VISUAL-INSPECTION.md",
        "scripts/op_mcp.mjs",
        "scripts/design_handoff_audit.py",
        "templates/open-pencil-handoff.template.md",
        "skills/open-pencil-authoring/SKILL.md",
        "skills/component-design/SKILL.md",
        "skills/responsive-review/SKILL.md",
    ]
    errs = [r for r in req if not (KIT / r).is_file()]
    if errs:
        print("FAIL missing Open Pencil kit files:", errs)
        return 1
    print("PASS: Stage 3 Role 2C Open Pencil kit verified.")
    return 0


def expected_colors():
    ds_text = DESIGN_SYS.read_text(encoding="utf-8")
    m = re.search(r"^```json\s*\n(.*?)\n```", ds_text, re.M | re.S)
    return json.loads(m.group(1))["colors"]


def verify(path: Path):
    if not path.is_file():
        print(f"FAIL: {path} missing")
        return 1
    text = path.read_text(encoding="utf-8")
    lines = text.splitlines()
    errors = []

    for idx, title in enumerate(HEADINGS, 1):
        expected = f"## {idx}. {title}"
        if sum(1 for l in lines if l.strip() == expected) != 1:
            errors.append(f"Expected single heading '{expected}'")

    for n, l in enumerate(lines, 1):
        if re.search(r"\b(FILL|TODO|TBD|PLACEHOLDER)\b", l, re.I):
            errors.append(f"Line {n}: unresolved template marker")

    blocks = re.findall(r"^```json\s*\n(.*?)\n```", text, re.M | re.S)
    if len(blocks) != 1:
        errors.append("Expected exactly one fenced JSON inventory block")
        data = {}
    else:
        try:
            data = json.loads(blocks[0])
        except Exception as e:
            errors.append(f"Invalid JSON block: {e}")
            data = {}

    if data:
        fig_path = Path(str(data.get("file_path", "")))
        if not fig_path.is_absolute() or fig_path.suffix != ".fig" or not fig_path.is_file() or fig_path.stat().st_size < 1024:
            errors.append(f"Native .fig artifact invalid or missing: '{fig_path}'")

        if not str(data.get("document_id", "")).strip():
            errors.append("Missing Open Pencil document_id")

        frames = data.get("frames", [])
        kinds_seen = set()
        node_ids = []
        reviewed_count = 0
        for fr in frames:
            kinds_seen.add(fr.get("kind"))
            nid = str(fr.get("node_id", "")).strip()
            if not nid:
                errors.append(f"Frame '{fr.get('name')}' missing node_id")
            else:
                node_ids.append(nid)
            exp = Path(str(fr.get("export_path", "")))
            if not exp.is_absolute() or not exp.is_file() or exp.stat().st_size < 512:
                errors.append(f"Frame '{fr.get('name')}' missing exported PNG on disk: '{exp}'")
            if fr.get("reviewed") is True:
                reviewed_count += 1

        missing_kinds = sorted(REQUIRED_KINDS - kinds_seen)
        if missing_kinds:
            errors.append(f"Missing required frame kinds: {missing_kinds}")
        if reviewed_count < len(REQUIRED_KINDS):
            errors.append(f"Expected >= {len(REQUIRED_KINDS)} visually reviewed frames ('reviewed': true), got {reviewed_count}")

        comp_names = {c.get("name") for c in data.get("components", []) if c.get("node_id")}
        missing_comps = [c for c in COMPONENTS if c not in comp_names]
        if missing_comps:
            errors.append(f"Missing component IDs in JSON: {missing_comps}")

        exp_cols = expected_colors()
        cols = data.get("colors", {})
        for cname, chex in exp_cols.items():
            entry = cols.get(cname, {})
            if entry.get("value", "").upper() != chex.upper() or not str(entry.get("variable_id", "")).strip():
                errors.append(f"Color token '{cname}' missing variable_id or mismatches {chex}")

    review_rows = [l for l in lines if l.startswith("|") and ".png" in l]
    if len(review_rows) < 6:
        errors.append(f"Section 6 visual inspection log needs >= 6 screenshot review rows, found {len(review_rows)}")

    pass_rows = [l for l in lines if l.startswith("|") and "PASS" in l]
    if len(pass_rows) < 6:
        errors.append(f"Section 8 needs 6 PASS rows, found {len(pass_rows)}")

    if errors:
        print("FAIL:")
        for e in errors:
            print("  -", e)
        return 1

    print(f"PASS: Verified native .fig ({fig_path.name}), {len(frames)} frames ({reviewed_count} reviewed), 18 components, 16 bound color tokens, and inspected PNGs.")
    return 0


def main():
    p = argparse.ArgumentParser()
    g = p.add_mutually_exclusive_group(required=True)
    g.add_argument("--kit", action="store_true")
    g.add_argument("--verify", nargs="?", const=str(OUTPUT))
    args = p.parse_args()
    if args.kit:
        return kit_check()
    t = Path(args.verify)
    return verify(t if t.is_absolute() else ROOT / t)


if __name__ == "__main__":
    sys.exit(main())
