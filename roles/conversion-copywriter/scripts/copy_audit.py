#!/usr/bin/env python3
"""
Deterministic Copy & Studio Voice Auditor for Kepler Dev (Agency Portfolio).
Enforces:
1. Zero banned AI buzzwords.
2. Zero structural AI tells (contrast slogans, rhetorical Q&A hooks).
3. Zero solo/personal identity leaks ('Mahmoud', 'founder', 'founder-led', or unquoted first-person singular 'I' / 'my').
   (Allows mahmouddattiaa7@gmail.com as the temporary contact email.)
"""

import re
import sys
from pathlib import Path

BANNED_WORDS = [
    "passionate",
    "seamless",
    "seamlessly",
    "cutting-edge",
    "next-generation",
    "unleash",
    "elevate",
    "synergy",
    "revolutionize",
    "digital experiences",
    "craftsmanship",
    "wizard",
    "ninja",
    "guru",
    "delve",
    "tapestry",
    "robust",
    "scalable solutions",
]

STRUCTURAL_PATTERNS = [
    (r"\bIt(?:'s| is) not (?:just )?[^,.]+,\s*it(?:'s| is)\b", "Contrast-reveal slogan ('It's not X, it's Y')"),
    (r"\bNot just [^,.]+,\s*but\b", "Contrast-reveal slogan ('Not just X, but Y')"),
    (r"\bThe result\?", "Rhetorical hook ('The result?')"),
    (r"\bThe best part[:\?]", "Rhetorical hook ('The best part:')"),
    (r"\bHere(?:'s| is) the thing\b", "Conversational AI filler ('Here's the thing')"),
    (r"\bLet that sink in\b", "Dramatic AI fragment ('Let that sink in')"),
]

PERSONAL_PATTERNS = [
    (r"\bmahmoud\b", "Personal name 'Mahmoud' (forbidden in standalone studio copy)"),
    (r"\bfounder-led\b|\b(?:our|the|studio)\s+founder\b|\bfounder\s+(?:of\s+kepler|note|reflection|portrait)\b|\bmeet\s+the\s+founder\b", "Personal 'founder / founder-led' studio framing (forbidden in standalone studio copy)"),
]

ALLOWED_EMAIL = "mahmouddattiaa7@gmail.com"


def audit_file(filepath: str) -> list[str]:
    p = Path(filepath)
    if not p.exists():
        return [f"File not found: {filepath}"]

    lines = p.read_text(encoding="utf-8").splitlines()
    errors = []
    in_code_block = False

    for idx, raw_line in enumerate(lines, start=1):
        stripped = raw_line.strip()
        if stripped.startswith("```"):
            in_code_block = not in_code_block
            continue

        # Remove allowed email and inline code spans specifying banned words in audit tables
        line_clean = raw_line.replace(ALLOWED_EMAIL, "")
        if "banned" in line_clean.lower() or "self-audit" in line_clean.lower() or "forbidden" in line_clean.lower() or "copy_audit.py" in line_clean:
            continue

        # Remove inline backticked code when checking prose pronouns
        prose_only = re.sub(r"`[^`]*`", "", line_clean)

        if not in_code_block:
            for bw in BANNED_WORDS:
                if re.search(rf"\b{re.escape(bw)}\b", prose_only, re.IGNORECASE):
                    errors.append(f"{p.name}:{idx}: Banned word '{bw}' -> {stripped[:100]}")

            for pat, desc in STRUCTURAL_PATTERNS:
                if re.search(pat, prose_only, re.IGNORECASE):
                    errors.append(f"{p.name}:{idx}: {desc} -> {stripped[:100]}")

            for pat, desc in PERSONAL_PATTERNS:
                if re.search(pat, prose_only, re.IGNORECASE):
                    errors.append(f"{p.name}:{idx}: {desc} -> {stripped[:100]}")

            # Check for unquoted solo 'I' or 'my' outside quotes
            unquoted = re.sub(r'"[^"]*"|“[^”]*”', "", prose_only)
            if re.search(r"\b(?:I|my|myself)\b", unquoted):
                errors.append(f"{p.name}:{idx}: Solo first-person pronoun ('I'/'my') in studio copy -> {stripped[:100]}")

    return errors


def main():
    if len(sys.argv) < 2:
        print("Usage: copy_audit.py <markdown-file> [...]")
        sys.exit(2)

    all_errors = []
    for arg in sys.argv[1:]:
        all_errors.extend(audit_file(arg))

    if all_errors:
        print(f"FAIL: copy_audit.py found {len(all_errors)} issue(s):")
        for e in all_errors:
            print(f"  [FAIL] {e}")
        sys.exit(1)

    print("PASS: 0 banned words, 0 structural AI tells, 0 personal/founder leaks, and 0 solo 'I/my' pronouns.")
    sys.exit(0)


if __name__ == "__main__":
    main()
