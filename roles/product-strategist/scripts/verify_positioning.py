#!/usr/bin/env python3
"""
Deterministic verifier for Stage 1, Role 1 (Agency Product Strategist).
Verifies that docs/positioning-brief.md and .agents/product-marketing.md:
1. Exist and are non-empty.
2. Include all 13 studio project slugs/names.
3. Include all 4 commercial offers (Blueprint, Launch Sprint, Operations Platform, Product Care).
4. Cover all core routes (/, /work, /services, /studio, /contact, /ar).
5. Have 0 FAIL rows in the Self-Audit Checklist.
"""

import sys
from pathlib import Path

REQUIRED_PROJECTS = [
    "glitre-loyalty-platform",
    "hs-vpn",
    "quickcharging-pos",
    "medconnect-egypt",
    "stayease",
    "classroom-sentinel",
    "aksira-ai-keyboard",
    "fitforge",
    "qiraaty",
    "focus-ritual",
    "getlab-system",
    "collab-platform",
    "agency-os",
]

REQUIRED_OFFERS = [
    "Product Blueprint",
    "Launch Sprint",
    "Operations Platform",
    "Product Care",
]

REQUIRED_ROUTES = [
    "/work",
    "/services",
    "/studio",
    "/contact",
    "/ar",
]


def verify(brief_path: str, marketing_path: str):
    errors = []
    bp = Path(brief_path)
    mp = Path(marketing_path)

    if not bp.exists():
        errors.append(f"Missing positioning brief: {brief_path}")
    if not mp.exists():
        errors.append(f"Missing shared marketing context: {marketing_path}")
    if errors:
        for e in errors:
            print(f"[FAIL] {e}")
        sys.exit(1)

    b_text = bp.read_text(encoding="utf-8")
    m_text = mp.read_text(encoding="utf-8")

    for slug in REQUIRED_PROJECTS:
        if slug not in b_text:
            errors.append(f"{bp.name}: missing required project slug '{slug}'")
        if slug not in m_text:
            errors.append(f"{mp.name}: missing required project slug '{slug}'")

    for offer in REQUIRED_OFFERS:
        if offer not in b_text:
            errors.append(f"{bp.name}: missing required offer '{offer}'")
        if offer not in m_text:
            errors.append(f"{mp.name}: missing required offer '{offer}'")

    for route in REQUIRED_ROUTES:
        if route not in b_text:
            errors.append(f"{bp.name}: missing required route '{route}'")

    if "| `FAIL`" in b_text or "| FAIL |" in b_text:
        errors.append(f"{bp.name}: contains a FAIL row in the self-audit table")

    if errors:
        print(f"FAIL: verify_positioning.py found {len(errors)} error(s):")
        for e in errors:
            print(f"  [FAIL] {e}")
        sys.exit(1)

    print("PASS: Positioning brief and .agents/product-marketing.md verified (all 13 projects, 4 offers, and routes present).")
    sys.exit(0)


if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: verify_positioning.py <docs/positioning-brief.md> <.agents/product-marketing.md>")
        sys.exit(2)
    verify(sys.argv[1], sys.argv[2])
