#!/usr/bin/env python3
"""
Deterministic Flagship Context Extractor & B2B Case Study Verifier for Kepler Dev Stage 2 (Role 2).
"""
import argparse
import re
import sys
from pathlib import Path
from urllib.parse import unquote

REPO_ROOT = Path("/home/kepler/Desktop/Kepler/Projects/portfolio")
PUBLIC_DIR = REPO_ROOT / "public"
PORTFOLIO_DOC = REPO_ROOT / "assets" / "KEPLERDEV_PROJECT_PORTFOLIO.md"
GLITRE_CONTENT = REPO_ROOT / "src" / "lib" / "content.ts"
GLITRE_SPEC = REPO_ROOT / "docs" / "agency-rebuild" / "12-case-study-page-design-2026-09-18.md"
QIRAATY_DOC = REPO_ROOT / "assets" / "Qiraaty" / "QIRAATY_PROJECT_CONTEXT.md"
FASEEH_DOC = REPO_ROOT / "assets" / "Faseeh-Ai" / "SMART_KEYBOARD_PROJECT_CONTEXT.md"

SECTION_HEADERS = [
    "# 9. gLiter Customer Loyalty Platform",
    "# 1. HS VPN",
    "# 3. QuickChargingPOS",
    "# 4. MedConnect Egypt",
    "# 8. StayEase",
    "# 6. Classroom Sentinel",
    "# 2. Aksira — AI Smart Keyboard",
    "# 5. Focus Ritual",
    "# 7. FitForge",
    "# 10. GetLab — Lab Equipment Management System",
    "# 11. AgencyOS",
    "# 12. AI Collab Platform",
]

REQUIRED_FLAGSHIPS = [
    "Glitre Loyalty Platform",
    "HS VPN",
    "QuickChargingPOS",
    "MedConnect Egypt",
    "StayEase",
    "Classroom Sentinel",
]

REQUIRED_SHOWCASE = [
    "Aksira",
    "FitForge",
    "Qiraaty",
    "Focus Ritual",
    "GetLab System",
    "AI Collab Platform",
    "AgencyOS",
]


def extract_flagships() -> int:
    extracted = []
    if PORTFOLIO_DOC.exists():
        text = PORTFOLIO_DOC.read_text(encoding="utf-8")
        sections = re.split(r"(?m)^(?=# )", text)
        for sec in sections:
            first_line = sec.strip().splitlines()[0] if sec.strip() else ""
            if any(first_line.startswith(h) for h in SECTION_HEADERS):
                # Strip personal name lines before handing to studio architect
                cleaned_lines = [
                    ln for ln in sec.strip().splitlines()
                    if not re.search(r"mahmoud", ln, re.IGNORECASE)
                ]
                extracted.append("\n".join(cleaned_lines))

    if QIRAATY_DOC.exists():
        q_lines = [
            ln for ln in QIRAATY_DOC.read_text(encoding="utf-8").splitlines()
            if not re.search(r"mahmoud", ln, re.IGNORECASE)
        ]
        extracted.append("# Extra Context: Qiraaty\n" + "\n".join(q_lines[:180]))

    if GLITRE_SPEC.exists():
        extracted.append("# Extra Context: Glitre Production Design & Appendix A\n" + GLITRE_SPEC.read_text(encoding="utf-8"))

    out_path = Path("/tmp/agency-flagship-6-deep-context.md")
    combined = "\n\n---\n\n".join(extracted)
    out_path.write_text(combined, encoding="utf-8")
    print(f"Extracted {len(extracted)} sanitized sections ({len(combined.splitlines())} lines) to {out_path}")
    return 0


def verify_case_studies(filepath: str) -> int:
    path = Path(filepath)
    if not path.is_absolute():
        path = REPO_ROOT / path
    if not path.exists():
        print(f"ERROR: File not found: {filepath}")
        return 1

    content = path.read_text(encoding="utf-8")
    lines = content.splitlines()
    issues: list[str] = []

    for name in REQUIRED_FLAGSHIPS:
        if name not in content:
            issues.append(f"Missing Flagship Case Study: `{name}`")

    for name in REQUIRED_SHOWCASE:
        if name not in content:
            issues.append(f"Missing Showcase Build Entry: `{name}`")

    mermaid_blocks = re.findall(r"```mermaid\s*\n(.*?)```", content, flags=re.DOTALL)
    if len(mermaid_blocks) < 6:
        issues.append(f"Found only {len(mermaid_blocks)} `mermaid` diagrams (expected >= 6, one per flagship).")

    valid_headers = ("flowchart TD", "flowchart LR", "graph TD", "graph LR", "sequenceDiagram", "stateDiagram")
    for idx, block in enumerate(mermaid_blocks, start=1):
        first_line = block.strip().splitlines()[0].strip() if block.strip() else ""
        if not first_line.startswith(valid_headers):
            issues.append(f"Mermaid diagram #{idx} has unsupported header `{first_line}` (use flowchart TD/LR).")
        for m_line in block.splitlines():
            unquoted_paren = re.search(r'[A-Za-z0-9_]+\[(?!")[^\]]*[()][^\]]*\]', m_line)
            if unquoted_paren:
                issues.append(
                    f"Mermaid diagram #{idx} has unquoted parentheses inside `[...]` label: `{m_line.strip()}`"
                )

    raw_paths = re.findall(r"`(/projects/[^`\n]+)`", content)
    file_paths = [p for p in raw_paths if not p.endswith("/") and "..." not in p]
    if len(file_paths) < 25:
        issues.append(f"Found only {len(file_paths)} `/projects/...` asset paths in walkthroughs (expected >= 25).")

    for web_path in file_paths:
        decoded = unquote(web_path.lstrip("/"))
        disk_path = PUBLIC_DIR / decoded
        if not disk_path.exists() or not disk_path.is_file():
            issues.append(f"Broken/non-existent asset path on disk: `{web_path}`")

    # Verify 18 engineering decisions (Decision 1..3 per flagship)
    decision_headings = re.findall(r"^####\s+Decision\s+\d+", content, flags=re.MULTILINE)
    if len(decision_headings) < 18:
        issues.append(f"Found only {len(decision_headings)} `#### Decision N` blocks (expected >= 18 across 6 flagships).")

    if "| `FAIL`" in content or "| FAIL |" in content:
        issues.append("Self-audit checklist contains a FAIL row.")

    if issues:
        print(f"FAIL: Found {len(issues)} issue(s) in {filepath}:")
        for issue in issues:
            print("  -", issue)
        return 1

    print(
        f"PASS: Verified 6 Flagship Case Studies, 7 Showcase entries, {len(mermaid_blocks)} valid Mermaid diagrams, {len(decision_headings)} engineering decisions, and {len(file_paths)} on-disk asset paths in {filepath}!"
    )
    return 0


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--extract-flagships", action="store_true", help="Extract sanitized deep project specs to /tmp/agency-flagship-6-deep-context.md")
    parser.add_argument("--verify", type=str, help="Verify a generated stage-2-flagship-case-studies.md file")
    args = parser.parse_args()

    if args.extract_flagships:
        sys.exit(extract_flagships())
    elif args.verify:
        sys.exit(verify_case_studies(args.verify))
    else:
        parser.print_help()
        sys.exit(1)
