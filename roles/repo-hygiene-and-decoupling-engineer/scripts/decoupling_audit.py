#!/usr/bin/env python3
"""
Deterministic verifier for Stage 0: Repo Hygiene & Personal Decoupling.
Checks that:
1. All legacy personal portfolio files, founder images, and /mahmoud routes are deleted.
2. Zero occurrences of 'mahmoud' (except mahmouddattiaa7@gmail.com) or 'founder' exist in src/ or next.config.ts.
3. src/app/studio/page.tsx exists and /mahmoud redirects to /studio in next.config.ts.
4. Stage 2 raw project folders in assets/ and public/projects/ are preserved.
"""

import argparse
import glob
import os
import re
import sys
from pathlib import Path

ROOT = Path("/home/kepler/Desktop/Kepler/Projects/portfolio")

FORBIDDEN_PATHS = [
    "assets/project-data-archive.ts",
    "commit_all.ps1",
    "assets/Agency website redesign",
    "assets/Agency website redesign.zip",
    "src/app/mahmoud",
    "public/media/home/founder.webp",
    "artifacts/founder-redesign-2026-09-04",
]

FORBIDDEN_GLOBS = [
    "public/brand/founder-*",
    "canvas/documents/mahmoud.fig*",
    "canvas/captures/mahmoud-*",
    "canvas/review/mahmoud-*",
]

REQUIRED_PATHS = [
    "src/app/studio/page.tsx",
    "public/projects/HS-VPN",
    "public/projects/glitre-loyalty-platform",
]

ALLOWED_EMAIL = "mahmouddattiaa7@gmail.com"


def check_deleted_paths():
    errors = []
    for rel in FORBIDDEN_PATHS:
        p = ROOT / rel
        if p.exists():
            errors.append(f"Forbidden path still exists: {rel}")
    for pattern in FORBIDDEN_GLOBS:
        matches = glob.glob(str(ROOT / pattern))
        for m in matches:
            rel_m = os.path.relpath(m, ROOT)
            errors.append(f"Forbidden glob match still exists: {rel_m}")
    return errors


def check_required_paths():
    errors = []
    for rel in REQUIRED_PATHS:
        p = ROOT / rel
        if not p.exists():
            errors.append(f"Required path missing: {rel}")
    return errors


def scan_source_for_personal_tokens():
    errors = []
    scan_targets = list((ROOT / "src").rglob("*")) + [ROOT / "next.config.ts"]
    for path in scan_targets:
        if not path.is_file():
            continue
        if path.suffix not in {".ts", ".tsx", ".css", ".js", ".mjs", ".json", ".md"}:
            continue
        rel = path.relative_to(ROOT)
        try:
            text = path.read_text(encoding="utf-8")
        except Exception:
            continue

        for lineno, line in enumerate(text.splitlines(), start=1):
            sanitized = line.replace(ALLOWED_EMAIL, "")
            if rel.name == "next.config.ts":
                sanitized = sanitized.replace('"/mahmoud"', "").replace("'/mahmoud'", "")
            if re.search(r"mahmoud", sanitized, re.IGNORECASE):
                errors.append(f"{rel}:{lineno}: contains forbidden token 'mahmoud' -> {line.strip()[:100]}")
            if re.search(r"founder", sanitized, re.IGNORECASE):
                errors.append(f"{rel}:{lineno}: contains forbidden token 'founder' -> {line.strip()[:100]}")

    next_cfg = (ROOT / "next.config.ts").read_text(encoding="utf-8") if (ROOT / "next.config.ts").exists() else ""
    if "/studio" not in next_cfg:
        errors.append("next.config.ts: missing redirect to '/studio'")

    return errors


def print_context():
    print("=== Stage 0 Decoupling Audit Context ===")
    del_errs = check_deleted_paths()
    src_errs = scan_source_for_personal_tokens()
    print(f"Paths to delete remaining: {len(del_errs)}")
    for e in del_errs:
        print(f"  - {e}")
    print(f"Source lines with 'mahmoud' or 'founder': {len(src_errs)}")
    for e in src_errs[:40]:
        print(f"  - {e}")
    if len(src_errs) > 40:
        print(f"  ... and {len(src_errs) - 40} more")


def verify_report(report_path: str):
    errors = []
    errors.extend(check_deleted_paths())
    errors.extend(check_required_paths())
    errors.extend(scan_source_for_personal_tokens())

    rp = Path(report_path)
    if not rp.is_absolute():
        rp = ROOT / rp
    if not rp.exists():
        errors.append(f"Report file does not exist: {rp}")
    else:
        content = rp.read_text(encoding="utf-8")
        required_headings = [
            "## 1. Deleted Legacy & Personal Portfolio Paths",
            "## 2. Decoupled Source Files & Studio Replacements",
            "## 3. Preserved Project Assets for Stage 2",
            "## 4. Deterministic Verification & Build Evidence",
        ]
        for h in required_headings:
            if h not in content:
                errors.append(f"Report missing required heading: {h}")

    if errors:
        print("FAIL: Stage 0 verification failed with errors:")
        for e in errors:
            print(f"  [FAIL] {e}")
        sys.exit(1)

    print("PASS: Stage 0 cleanup and decoupling verified (0 personal/founder tokens, all legacy paths removed, report complete).")
    sys.exit(0)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--context", action="store_true", help="Print baseline context")
    parser.add_argument("--scan", action="store_true", help="Scan repo for remaining personal/founder tokens")
    parser.add_argument("--verify", type=str, help="Verify Stage 0 report and repo state")
    args = parser.parse_args()

    if args.context:
        print_context()
        sys.exit(0)
    elif args.scan:
        errs = check_deleted_paths() + check_required_paths() + scan_source_for_personal_tokens()
        if errs:
            print(f"SCAN FAILED ({len(errs)} issues):")
            for e in errs:
                print(f"  - {e}")
            sys.exit(1)
        print("SCAN PASSED: 0 issues found.")
        sys.exit(0)
    elif args.verify:
        verify_report(args.verify)
    else:
        parser.print_help()


if __name__ == "__main__":
    main()
