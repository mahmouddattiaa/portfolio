#!/usr/bin/env python3
"""Deterministic Critic & Stage 3 Consolidation Verifier for Kepler Dev (Stage 3, Role 3)."""
import argparse
import re
import sys
from pathlib import Path

ROOT = Path("/home/kepler/Desktop/Kepler/Projects/portfolio")
KIT = ROOT / "roles/design-and-conversion-critic"
OUTPUT = ROOT / "docs/stage-3-design-critique-and-locked-spec.md"

HEADINGS = (
    "Cross-Stage Readiness Summary & Authority Chain",
    "Six-Lens Critical Audit Findings & Dispositions",
    "Canonical Authority Map for Stage 4 Implementation (`src/` Target Architecture)",
    "Runtime Verification Checks Deferred to Stage 4 & Stage 5",
    "Mandatory Self-Audit Checklist",
)


def kit_check():
    req = [
        "ROLE.md",
        "START-SESSION.md",
        "scripts/critique_audit.py",
        "templates/stage-3-design-critique-and-locked-spec.template.md",
    ]
    errs = [r for r in req if not (KIT / r).is_file()]
    if errs:
        print("FAIL missing kit files:", errs)
        return 1
    print("PASS: Stage 3 Role 3 Critic kit verified.")
    return 0


def verify(path):
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

    if "ready_for_user_review" not in text and "blocked" not in text:
        errors.append("Missing readiness status ('ready_for_user_review' or 'blocked')")

    for term in (
        "Global Atelier Unified v2",
        "#6F4224",
        "#D4A47A",
        "letter-spacing: 0",
        "/work/[slug]",
        "/studio",
        "/ar",
        "mahmouddattiaa7@gmail.com",
        "Screenshot 2026-04-09 225636.png",
        "sign-in.webp",
        "Kepler-Dev-Current-Site-Review-Recovered-2026-10-26.fig",
        "docs/stage-3-open-pencil-design-handoff.md",
        "docs/stage-3-visual-verification-report.md",
        "PASS_FOR_CRITIC_GATE",
    ):
        if term not in text:
            errors.append(f"Missing required consolidation reference: '{term}'")

    pass_rows = [l for l in lines if l.startswith("|") and "PASS" in l]
    if len(pass_rows) < 6:
        errors.append(f"Expected >= 6 PASS rows in Section 5 checklist, found {len(pass_rows)}")

    if errors:
        print("FAIL:")
        for e in errors:
            print("  -", e)
        return 1
    print("PASS: Verified Stage 3 Critic consolidation blueprint, audit lenses, and Stage 4 file map.")
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
