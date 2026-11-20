#!/usr/bin/env python3
"""Deterministic Arabic RTL & Studio Localization Verifier for Kepler Dev Stage 3 (Role 2B)."""
import argparse
import re
import sys
from pathlib import Path

ROOT = Path("/home/kepler/Desktop/Kepler/Projects/portfolio")
KIT = ROOT / "roles/arabic-rtl-architect"
OUTPUT = ROOT / "docs/stage-3-arabic-rtl-spec.md"

HEADINGS = (
    "Audit of Existing `/ar` Route & Gaps",
    "Localized Navigation, Metadata & Footer Copy (`ar`)",
    "Complete Homepage `/ar` Studio Copy (Key-Parity with `src/content/home/en.ts`)",
    "RTL Layout, Logical CSS & Typography Rules",
    "Mandatory Self-Audit Checklist",
)

FORBIDDEN_ARABIC = (
    "المؤسس",
    "بقيادة المؤسس",
    "محمود",
    "Arabic preview",
    "language review in progress",
)


def context():
    ar = ROOT / "src/app/ar/page.tsx"
    if not ar.is_file():
        print("FAIL: missing src/app/ar/page.tsx")
        return 1
    lines = ar.read_text(encoding="utf-8").splitlines()
    print(f"Existing src/app/ar/page.tsx: {len(lines)} lines")
    print("Check for RTL CSS rules in src/app/global-atelier.css & docs/stage-1-final-copy-and-pitch.md.")
    return 0


def kit_check():
    req = ["ROLE.md", "START-SESSION.md", "scripts/arabic_rtl_audit.py",
           "templates/arabic-rtl-spec.template.md", "skills/arabic-localization/SKILL.md"]
    errs = [r for r in req if not (KIT / r).is_file()]
    if errs:
        print("FAIL missing kit files:", errs)
        return 1
    print("PASS: Stage 3 Role 2B Arabic RTL kit verified.")
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
            errors.append(f"Line {n}: unresolved marker")
        if "## 5." not in l and "audit" not in l.lower() and "remove" not in l.lower() and "legacy" not in l.lower():
            for fb in FORBIDDEN_ARABIC:
                if fb in l:
                    errors.append(f"Line {n}: forbidden legacy/personal Arabic token '{fb}'")

    # Ensure actual Arabic script is substantial (>= 40 Arabic characters in Sections 2 and 3)
    ar_chars = re.findall(r"[\u0600-\u06FF]", text)
    if len(ar_chars) < 200:
        errors.append(f"Too little Arabic localized copy ({len(ar_chars)} Arabic chars; expected >= 200)")

    for req_term in ("letter-spacing", "IBM Plex Sans Arabic", "rtl", "inline", "Glitre", "HS VPN", "QuickChargingPOS"):
        if req_term.lower() not in text.lower():
            errors.append(f"Missing required RTL/localization term: '{req_term}'")

    # Verify checklist rows
    checklist_rows = [l for l in lines if l.startswith("|") and "PASS" in l]
    if len(checklist_rows) < 5:
        errors.append(f"Expected 5 PASS rows in Section 5 checklist, found {len(checklist_rows)}")

    if errors:
        print("FAIL:")
        for e in errors:
            print("  -", e)
        return 1
    print(f"PASS: Verified Arabic RTL spec ({len(ar_chars)} Arabic chars, all 5 headings, RTL CSS contracts, 0 founder/provisional leaks).")
    return 0


def main():
    p = argparse.ArgumentParser()
    g = p.add_mutually_exclusive_group(required=True)
    g.add_argument("--context", action="store_true")
    g.add_argument("--kit", action="store_true")
    g.add_argument("--verify", nargs="?", const=str(OUTPUT))
    args = p.parse_args()
    if args.context:
        return context()
    if args.kit:
        return kit_check()
    t = Path(args.verify)
    return verify(t if t.is_absolute() else ROOT / t)


if __name__ == "__main__":
    sys.exit(main())
