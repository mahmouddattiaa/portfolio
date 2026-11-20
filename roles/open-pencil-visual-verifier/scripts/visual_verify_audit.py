#!/usr/bin/env python3
"""Deterministic Open Pencil Visual Verification Report checker for Kepler Dev Stage 3 (Role 2D)."""
import argparse
import re
import sys
from pathlib import Path

ROOT = Path("/home/kepler/Desktop/Kepler/Projects/portfolio")
KIT = ROOT / "roles/open-pencil-visual-verifier"
OUTPUT = ROOT / "docs/stage-3-visual-verification-report.md"

HEADINGS = (
    "Live Canvas Telemetry (`list_pages`, `get_font_status`, `lint`, `analyze_overlaps`)",
    "Visual Pixel Inspection Matrix (All Exported PNGs Under `design/reviews/verified/`)",
    "Defects Found (Categorized `P0` Blocker / `P1` Major / `P2` Minor)",
    "Eight-Lens Visual Audit Summary",
    "Mandatory Self-Audit Checklist",
)


def kit_check():
    req = [
        "ROLE.md",
        "START-SESSION.md",
        "scripts/visual_verify_audit.py",
        "templates/stage-3-visual-verification-report.template.md",
    ]
    errs = [r for r in req if not (KIT / r).is_file()]
    if errs:
        print("FAIL missing visual verifier files:", errs)
        return 1
    print("PASS: Stage 3 Role 2D Open Pencil Visual Verifier kit verified.")
    return 0


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

    if "PASS_FOR_CRITIC_GATE" not in text and "FIXES_REQUIRED" not in text:
        errors.append("Missing Visual Verdict ('PASS_FOR_CRITIC_GATE' or 'FIXES_REQUIRED')")

    # Check exported PNG paths exist inside design/reviews/verified/
    pngs = re.findall(r"`(/home/kepler/Desktop/Kepler/Projects/portfolio/design/reviews/verified/[^`\n]+\.png)`", text)
    unique_pngs = sorted(set(pngs))
    if len(unique_pngs) < 6:
        errors.append(f"Expected >= 6 inspected PNG paths in design/reviews/verified/, found {len(unique_pngs)}")
    for p_str in unique_pngs:
        p = Path(p_str)
        if not p.is_file() or p.stat().st_size < 512:
            errors.append(f"Missing or empty verified screenshot PNG: {p_str}")

    lens_pass_fail = [l for l in lines if l.startswith("|") and re.search(r"\b(PASS|FAIL)\b", l)]
    if len(lens_pass_fail) < 8:
        errors.append(f"Expected >= 8 PASS/FAIL table rows across Section 4 & 5, found {len(lens_pass_fail)}")

    if errors:
        print("FAIL:")
        for e in errors:
            print("  -", e)
        return 1

    print(f"PASS: Visual verification report validated with {len(unique_pngs)} real exported PNG screenshots.")
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
