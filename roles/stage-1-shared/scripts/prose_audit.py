#!/usr/bin/env python3
"""
Shared cross-role deterministic Prose, Voice & Placeholder Auditor for Stage 1 Positioning & Messaging.

Enforces (outside fenced code blocks):
1. Zero banned AI buzzwords (24 English terms) and zero banned Arabic corporate-translation slop phrases.
2. Zero structural AI slogan/filler patterns (6 patterns).
3. Zero Arabic mixed-unit leaks (e.g. `$250/mo`, `/wk`, `/yr` on Arabic-script prose lines).
4. Zero unfilled placeholders (TBD, TODO, FIXME, FILL_IN, FILL_HERE, [FILL...], <FILL...>).
5. Optional project bindings via --config <stage-1-bindings.json>:
   - voice_mode: "brand_plural" (forbids unquoted I/my/myself), "solo_first_person", or "neutral"
   - forbid_first_person_singular: bool (explicit override)
   - forbidden_tokens: list[str]
   - allowed_exceptions: list[str]
"""

from __future__ import annotations

import argparse
import json
import re
import sys
import tempfile
from pathlib import Path
from typing import Any

BANNED_WORDS: tuple[str, ...] = (
    "passionate",
    "seamless",
    "seamlessly",
    "cutting-edge",
    "next-generation",
    "unleash",
    "elevate",
    "synergy",
    "revolutionize",
    "revolutionary",
    "game-changing",
    "game-changer",
    "digital experiences",
    "craftsmanship",
    "wizard",
    "ninja",
    "guru",
    "delve",
    "tapestry",
    "robust",
    "scalable solutions",
    "paradigm shift",
    "world-class",
    "holistic",
)

BANNED_ARABIC_PHRASES: tuple[str, ...] = (
    "حلول متكاملة مبتكرة",
    "حلول مبتكرة متكاملة",
    "الأفضل في فئته",
    "تحول رقمي شامل",
    "الريادة والتميز",
    "بأعلى معايير الجودة العالمية",
    "نحو مستقبل رقمي",
    "تجربة رقمية استثنائية",
    "شريكك الاستراتيجي الأمثل",
)

_ARABIC_SCRIPT_RE = re.compile(r"[\u0600-\u06FF]")
_URL_RE = re.compile(r"https?://[^\s)\]>]+", re.IGNORECASE)
_MD_LINK_TARGET_RE = re.compile(r"\]\([^)]+\)")
_ARABIC_MIXED_UNIT_RE = re.compile(
    r"/\s*(?:mo|month|wk|week|yr|year)\b",
    re.IGNORECASE,
)

STRUCTURAL_PATTERNS: tuple[tuple[str, str], ...] = (
    (r"\bIt(?:'s| is) not (?:just )?[^,.]+,\s*it(?:'s| is)\b", "Contrast-reveal slogan ('It's not X, it's Y')"),
    (r"\bNot just [^,.]+,\s*but\b", "Contrast-reveal slogan ('Not just X, but Y')"),
    (r"\bThe result\?", "Rhetorical hook ('The result?')"),
    (r"\bThe best part[:\?]", "Rhetorical hook ('The best part:')"),
    (r"\bHere(?:'s| is) the thing\b", "Conversational AI filler ('Here's the thing')"),
    (r"\bLet that sink in\b", "Dramatic AI fragment ('Let that sink in')"),
)

PLACEHOLDER_PATTERNS: tuple[tuple[str, str], ...] = (
    (r"\b(?:TBD|TODO|FIXME|FILL_IN|FILL_HERE)\b", "Unfilled placeholder token"),
    (r"\[FILL[^\]]*\]", "Unfilled bracket placeholder ([FILL...])"),
    (r"<FILL[^>]*>", "Unfilled angle placeholder (<FILL...>)"),
)


def load_bindings(config_path: str | Path | None) -> dict[str, Any]:
    if not config_path:
        return {}
    path = Path(config_path)
    if not path.is_file():
        raise FileNotFoundError(f"Bindings config not found: {config_path}")
    data = json.loads(path.read_text(encoding="utf-8"))
    if not isinstance(data, dict):
        raise ValueError(f"Bindings config must be a JSON object: {config_path}")
    return data


def _should_forbid_first_person(cfg: dict[str, Any]) -> bool:
    if "forbid_first_person_singular" in cfg:
        return bool(cfg["forbid_first_person_singular"])
    return str(cfg.get("voice_mode", "")).strip().lower() == "brand_plural"


def audit_text(text: str, filename: str = "document.md", bindings: dict[str, Any] | None = None) -> list[str]:
    cfg = bindings or {}
    allowed_exceptions = [str(item) for item in (cfg.get("allowed_exceptions") or []) if str(item)]
    forbidden_tokens = [str(item) for item in (cfg.get("forbidden_tokens") or []) if str(item)]
    forbid_first_person = _should_forbid_first_person(cfg)

    errors: list[str] = []
    in_code_block = False

    for idx, raw_line in enumerate(text.splitlines(), start=1):
        stripped = raw_line.strip()
        if stripped.startswith("```"):
            in_code_block = not in_code_block
            continue
        if in_code_block:
            continue

        line_clean = raw_line
        for exc in allowed_exceptions:
            line_clean = line_clean.replace(exc, "")

        for pat, desc in PLACEHOLDER_PATTERNS:
            if re.search(pat, line_clean):
                errors.append(f"{filename}:{idx}: {desc} -> {stripped[:100]}")

        lowered = line_clean.lower()
        if any(marker in lowered for marker in ("prose_audit.py", "copy_audit.py", "self-audit", "banned word", "forbidden")):
            continue

        prose_only = re.sub(r"`[^`]*`", "", line_clean)

        for bw in BANNED_WORDS:
            if re.search(rf"\b{re.escape(bw)}\b", prose_only, re.IGNORECASE):
                errors.append(f"{filename}:{idx}: Banned word '{bw}' -> {stripped[:100]}")

        for ar_phrase in BANNED_ARABIC_PHRASES:
            phrase_pat = (
                r"(?<![\w\u0600-\u06FF])"
                + r"\s+".join(re.escape(part) for part in ar_phrase.split())
                + r"(?![\w\u0600-\u06FF])"
            )
            if re.search(phrase_pat, prose_only):
                errors.append(f"{filename}:{idx}: Banned Arabic slop phrase '{ar_phrase}' -> {stripped[:100]}")

        if _ARABIC_SCRIPT_RE.search(prose_only):
            prose_no_links = _URL_RE.sub("", _MD_LINK_TARGET_RE.sub("]", prose_only))
            unit_match = _ARABIC_MIXED_UNIT_RE.search(prose_no_links)
            if unit_match:
                errors.append(
                    f"{filename}:{idx}: Arabic mixed-unit leak '{unit_match.group(0).strip()}' -> {stripped[:100]}"
                )

        for pat, desc in STRUCTURAL_PATTERNS:
            if re.search(pat, prose_only, re.IGNORECASE):
                errors.append(f"{filename}:{idx}: {desc} -> {stripped[:100]}")

        for token in forbidden_tokens:
            if re.search(rf"\b{re.escape(token)}\b", prose_only, re.IGNORECASE):
                errors.append(f"{filename}:{idx}: Forbidden project token '{token}' -> {stripped[:100]}")

        if forbid_first_person:
            unquoted = re.sub(r'"[^"]*"|“[^”]*”', "", prose_only)
            if re.search(r"\b(?:I|my|myself)\b", unquoted):
                errors.append(
                    f"{filename}:{idx}: Solo first-person pronoun ('I'/'my'/'myself') disallowed by config -> {stripped[:100]}"
                )

    return errors


def audit_file(filepath: str | Path, bindings: dict[str, Any] | None = None) -> list[str]:
    p = Path(filepath)
    if not p.is_file():
        return [f"{p.name}:1: File not found: {filepath}"]
    try:
        content = p.read_text(encoding="utf-8")
    except (OSError, UnicodeDecodeError) as exc:
        return [f"{p.name}:1: Cannot read UTF-8 file ({exc})"]
    return audit_text(content, filename=p.name, bindings=bindings)


def run_self_test() -> int:
    clean_doc = (
        "# Sample Positioning Brief\n\n"
        "We cut invoice reconciliation from 4 hours to 5 minutes using deterministic decimal checks.\n\n"
        "```markdown\n"
        "Code blocks may mention TBD or seamless as examples.\n"
        "```\n"
    )
    assert audit_text(clean_doc, "clean.md") == [], "Expected clean sample to pass"

    dirty_doc = (
        "# Bad Copy\n\n"
        "Our cutting-edge engine will revolutionize finance.\n"
        "It's not just software, it's clarity.\n"
        "Launch date: TBD.\n"
        "Headline: [FILL headline].\n"
    )
    dirty_errors = audit_text(dirty_doc, "dirty.md")
    assert len(dirty_errors) >= 4, f"Expected >= 4 errors, got {dirty_errors}"

    with tempfile.TemporaryDirectory() as tmp:
        brand_cfg = Path(tmp) / "brand.json"
        brand_cfg.write_text(
            json.dumps(
                {
                    "voice_mode": "brand_plural",
                    "forbidden_tokens": ["FounderName"],
                    "allowed_exceptions": ["contact@foundername.example"],
                }
            ),
            encoding="utf-8",
        )
        bindings = load_bindings(brand_cfg)
        assert audit_text("Reach contact@foundername.example for reviews.\n", "ok.md", bindings) == []
        bad_errors = audit_text("I built this with FounderName.\n", "bad.md", bindings)
        assert len(bad_errors) == 2, f"Expected 2 errors, got {bad_errors}"

        solo_bindings = {"voice_mode": "solo_first_person"}
        assert audit_text("I build reliable web applications for my clients.\n", "solo.md", solo_bindings) == []

    # Arabic clean business copy, URLs/routes, banned Arabic slop, and mixed-unit leak checks
    clean_arabic = "بدءاً من $250 شهرياً لتطوير وصيانة التطبيقات.\n"
    assert audit_text(clean_arabic, "ar_clean.md") == [], "Expected clean Arabic copy to pass"

    clean_arabic_with_url = (
        "تصفح الأعمال على https://keplerdev.uk/mo/info أو المسار /ar أو [الخطة](/monthly) للحصول على التفاصيل.\n"
    )
    assert audit_text(clean_arabic_with_url, "ar_url.md") == [], (
        "Expected Arabic copy with URL, /ar route, and Markdown link target to pass"
    )

    ar_slop = "نقدم حلول متكاملة مبتكرة لتحقيق الريادة والتميز وبناء تجربة رقمية استثنائية.\n"
    ar_slop_errors = audit_text(ar_slop, "ar_slop.md")
    assert len(ar_slop_errors) == 3, f"Expected 3 Arabic slop errors, got {ar_slop_errors}"

    for bad_unit_line in (
        "اشتراك شهري يبدأ من $250/mo لصيانة التطبيق.\n",
        "اشتراك يبدأ من 250 دولار/mo لصيانة التطبيق.\n",
        "اشتراك يبدأ من 500 USD/mo لصيانة التطبيق.\n",
        "باقة بسعر 100 ريال/month للشركات.\n",
    ):
        ar_unit_errors = audit_text(bad_unit_line, "ar_unit.md")
        assert len(ar_unit_errors) == 1 and "mixed-unit" in ar_unit_errors[0], (
            f"Expected mixed-unit error for {bad_unit_line!r}, got {ar_unit_errors}"
        )

    assert audit_text("Monthly plan starts at $250/mo.\n", "en_unit.md") == [], (
        "Expected English line with $250/mo to pass"
    )

    print(
        "PASS: prose_audit.py --self-test passed "
        "(clean, buzzword, Arabic slop, Arabic mixed-unit, slogan, placeholder, brand_plural, and solo voice checks)."
    )
    return 0


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description="Audit Stage 1 Markdown deliverables for AI slop, slogans, placeholders, and voice rules.")
    parser.add_argument("files", nargs="*", help="Markdown file paths to audit.")
    parser.add_argument("--config", help="Optional stage-1-bindings.json config file.")
    parser.add_argument("--self-test", action="store_true", help="Run built-in self-tests and exit.")
    args = parser.parse_args(argv)

    if args.self_test:
        return run_self_test()

    if not args.files:
        parser.print_help()
        return 2

    try:
        bindings = load_bindings(args.config)
    except (OSError, ValueError) as exc:
        print(f"FAIL: {exc}", file=sys.stderr)
        return 1

    all_errors: list[str] = []
    for raw in args.files:
        all_errors.extend(audit_file(raw, bindings=bindings))

    if all_errors:
        print(f"FAIL: prose_audit.py found {len(all_errors)} issue(s):")
        for err in all_errors:
            print(f"FAIL: {err}")
        return 1

    print(
        f"PASS: prose_audit.py verified {len(args.files)} file(s) "
        "(0 banned words, 0 structural AI tells, 0 unfilled placeholders)."
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
