#!/usr/bin/env python3
"""
Deterministic Kit, Context, Deliverable, RTL Source-Scan, and Self-Test Auditor
for Stage 1 Role 1.4 (bilingual-localization-and-rtl-strategist).

Usage:
  python3 -B l10n_audit.py --kit
  python3 -B l10n_audit.py --context [--project-dir <dir>]
  python3 -B l10n_audit.py --verify <path> [--project-dir <dir>] [--config <bindings.json>] [--scan-src]
  python3 -B l10n_audit.py --self-test
"""

from __future__ import annotations

import argparse
import importlib.util
import json
import re
import sys
import tempfile
from pathlib import Path
from typing import Any


def _load_kit_common(script_file: str | Path) -> Any:
    resolved = Path(script_file).resolve()
    candidates: list[Path] = []
    for parent in resolved.parents:
        candidates.append(parent / "scripts" / "kit_common.py")
        candidates.append(parent / "stage-1-shared" / "scripts" / "kit_common.py")
    for candidate in candidates:
        if candidate.is_file():
            spec = importlib.util.spec_from_file_location("stage1_kit_common", candidate)
            if spec and spec.loader:
                mod = importlib.util.module_from_spec(spec)
                spec.loader.exec_module(mod)
                return mod
    raise FileNotFoundError("Could not locate kit_common.py in parent scripts/ or stage-1-shared/scripts/")


kit_common = _load_kit_common(__file__)
prose_audit = kit_common.load_prose_audit(__file__)

KIT_DIR = Path(__file__).resolve().parent.parent
EXPECTED_SKILLS: tuple[str, ...] = (
    "arabic-transcreation-and-plural-rules",
    "rtl-css-logical-properties-and-bidi",
    "bilingual-parity-and-hreflang-qa",
)
TEMPLATE_NAME = "stage-1-bilingual-l10n-spec.template.md"
REQUIRED_H2: tuple[str, ...] = (
    "1. Locale Architecture, hreflang Matrix & Directionality Contract",
    "2. Domain Glossary & Non-Translatable Brand/Technical Terms",
    "3. EN-AR Route, Offer, Price & CTA Parity Table",
    "4. Arabic Transcreation Copy & CLDR 6-Plural Message Rules",
    "5. RTL Layout, Logical CSS/Tailwind & Bidi Isolation Spec",
    "6. Optional Tooling Handoff (i18n-keeper, i18n-check, RTL Linters)",
    "7. Mandatory Self-Audit Checklist",
)
SEC1_HEADING = REQUIRED_H2[0]
SEC3_HEADING = REQUIRED_H2[2]
SEC4_HEADING = REQUIRED_H2[3]
SEC5_HEADING = REQUIRED_H2[4]
SEC7_HEADING = REQUIRED_H2[6]

CLDR_AR_PLURAL_CATEGORIES: tuple[str, ...] = ("zero", "one", "two", "few", "many", "other")
MIN_GEO_WORDS = 40
MAX_GEO_WORDS = 60
_ARABIC_SCRIPT_RE = re.compile(r"[\u0600-\u06FF]")
_ARABIC_PRES_FORM_RE = re.compile(r"[\uFB50-\uFDFF\uFE70-\uFEFF]")
_LATIN_ALPHA_RE = re.compile(r"[A-Za-z]")

_SRC_EXTENSIONS: tuple[str, ...] = (".css", ".scss", ".tsx", ".jsx")
_TW_VAL = r"(?:\d+(?:\.\d+)?(?:/\d+)?|auto|px|full|none|sm|md|lg|xl|[23]xl|\[[^\]]+\])"
_PHYSICAL_RTL_PATTERNS: tuple[tuple[re.Pattern[str], str], ...] = (
    (
        re.compile(
            rf"(?:^|(?<=[\s\"'`({{:]))-?(?:scroll-m[lr]|border-[lr]|rounded-[lr]|ml|mr|pl|pr|left|right)-{_TW_VAL}(?=$|[\s\"'`),;:}}])"
        ),
        "physical Tailwind directional utility",
    ),
    (
        re.compile(r"(?:^|(?<=[\s\"'`({:]))text-(?:left|right)(?=$|[\s\"'`),;:}])"),
        "physical Tailwind text-align utility",
    ),
    (
        re.compile(r"\b(?:margin|padding|border)-(?:left|right)\s*:"),
        "physical CSS directional property",
    ),
    (
        re.compile(r"\btext-align\s*:\s*(?:left|right)\b"),
        "physical CSS text-align property",
    ),
)

CONTEXT_FILES: tuple[str, ...] = (
    "docs/positioning-brief.md",
    "docs/seo-and-market-brief.md",
    "docs/stage-1-final-copy-and-pitch.md",
    ".agents/product-marketing.md",
    "docs/context/project-digest.md",
)


def _is_arabic_route(r: str) -> bool:
    return r == "/ar" or r.startswith("/ar/")


def _contains_term(text: str, term: str) -> bool:
    escaped = re.escape(term)
    prefix = r"(?<!\w)" if term[0].isalnum() else ""
    suffix = r"(?!\w)" if term[-1].isalnum() else ""
    return re.search(f"{prefix}{escaped}{suffix}", text, re.IGNORECASE) is not None


def _route_in_tables(route: str, tables: list[list[tuple[int, list[str]]]]) -> bool:
    target = route.strip()
    if not target:
        return True
    for table in tables:
        for _, cells in table:
            for cell in cells:
                cleaned = kit_common.strip_md(cell)
                if cleaned == target:
                    return True
                for token in re.split(r"[\s,;()]+", cleaned):
                    if kit_common.strip_md(token) == target:
                        return True
    return False


def _is_arabic_copy_col_header(header: str) -> bool:
    cleaned = kit_common.strip_md(header)
    if not re.search(r"(?:\bar\b|arabic|عربي|عربية)", cleaned, re.IGNORECASE):
        return False
    if re.search(r"\b(?:route|routes|path|url|slug|status|parity|lang|locale)\b", cleaned, re.IGNORECASE):
        return False
    return True


def _extract_fenced_blocks(lines: list[tuple[int, str]]) -> list[str]:
    blocks: list[str] = []
    in_code = False
    buf: list[str] = []
    for _, line in lines:
        if line.strip().startswith("```"):
            if in_code:
                blocks.append("\n".join(buf))
                buf = []
                in_code = False
            else:
                in_code = True
            continue
        if in_code:
            buf.append(line)
    if buf:
        blocks.append("\n".join(buf))
    return blocks


def _check_sec4_cldr_plurals(sec4_lines: list[tuple[int, str]], filename: str) -> list[str]:
    blocks = _extract_fenced_blocks(sec4_lines)
    plural_blocks = [b for b in blocks if re.search(r",\s*plural\s*,", b)]
    for block in plural_blocks:
        if all(re.search(rf"\b{cat}\s*\{{", block) for cat in CLDR_AR_PLURAL_CATEGORIES):
            return []

    tables = kit_common.parse_markdown_tables(sec4_lines)
    for table in tables:
        table_tokens = " ".join(kit_common.strip_md(c) for _, row in table for c in row)
        if all(re.search(rf"\b{cat}\b", table_tokens, re.IGNORECASE) for cat in CLDR_AR_PLURAL_CATEGORIES):
            return []

    if plural_blocks:
        missing = [
            cat for cat in CLDR_AR_PLURAL_CATEGORIES
            if not re.search(rf"\b{cat}\s*\{{", plural_blocks[0])
        ]
        return [
            f"{filename}: Section 4 ICU plural block missing Arabic CLDR plural category '{cat}'"
            for cat in missing
        ]
    if tables:
        table_tokens = " ".join(kit_common.strip_md(c) for table in tables for _, row in table for c in row)
        missing = [
            cat for cat in CLDR_AR_PLURAL_CATEGORIES
            if not re.search(rf"\b{cat}\b", table_tokens, re.IGNORECASE)
        ]
        if len(missing) < len(CLDR_AR_PLURAL_CATEGORIES):
            return [
                f"{filename}: Section 4 CLDR plural table missing Arabic CLDR plural category '{cat}'"
                for cat in missing
            ]

    return [
        f"{filename}: Section 4 missing ICU MessageFormat 'plural,' block or CLDR plural table "
        "defining all 6 Arabic categories (zero, one, two, few, many, other)"
    ]


def _strip_comments_preserve_lines(content: str) -> str:
    no_block = re.sub(
        r"/\*[\s\S]*?\*/",
        lambda m: re.sub(r"[^\n]", " ", m.group(0)),
        content,
    )
    return re.sub(r"(?m)(?:^|(?<=\s))//.*$", "", no_block)


def scan_src_for_physical_rtl(project_dir: Path) -> list[str]:
    """Read-only scan of <project_dir>/src for physical directional CSS/Tailwind properties."""
    root = project_dir.resolve()
    src_dir = root / "src"
    if not src_dir.is_dir():
        return []

    hits: list[str] = []
    for file_path in sorted(src_dir.rglob("*")):
        if not file_path.is_file() or file_path.suffix.lower() not in _SRC_EXTENSIONS:
            continue
        try:
            raw = file_path.read_text(encoding="utf-8")
        except (OSError, UnicodeDecodeError):
            continue
        cleaned = _strip_comments_preserve_lines(raw)
        rel = file_path.relative_to(root).as_posix()
        for line_no, line in enumerate(cleaned.splitlines(), start=1):
            for pat, label in _PHYSICAL_RTL_PATTERNS:
                for match in pat.finditer(line):
                    hits.append(f"{rel}:{line_no}: {label} '{match.group(0)}' (use logical CSS/Tailwind)")
    return hits


def verify_kit(kit_dir: Path = KIT_DIR) -> list[str]:
    issues = kit_common.validate_role_kit(
        kit_dir,
        expected_skills=EXPECTED_SKILLS,
        expected_templates={TEMPLATE_NAME: REQUIRED_H2},
    )

    md_files: list[Path] = [
        kit_dir / "ROLE.md",
        kit_dir / "START-SESSION.md",
        kit_dir / "templates" / TEMPLATE_NAME,
    ]
    for skill_name in EXPECTED_SKILLS:
        md_files.append(kit_dir / "skills" / skill_name / "SKILL.md")

    for md_path in md_files:
        if md_path.is_file():
            issues.extend(prose_audit.audit_file(md_path))

    return issues


def run_context(project_dir: Path) -> int:
    root = project_dir.resolve()
    print(f"=== Bilingual Localization & RTL Strategist Context Summary ({root}) ===")

    for rel in CONTEXT_FILES:
        path = root / rel
        if not path.is_file():
            print(f"- {rel}: MISSING")
            continue
        text = path.read_text(encoding="utf-8")
        line_count = len(text.splitlines())
        h2_order, _ = kit_common.split_h2_sections(text)
        preview = ", ".join(h2_order[:6]) if h2_order else "(no H2 headings)"
        if len(h2_order) > 6:
            preview += f", ... (+{len(h2_order) - 6} more)"
        print(f"- {rel}: PRESENT ({line_count} lines) | H2: {preview}")

    bindings_path = root / ".kepler" / "stage-1-bindings.json"
    if not bindings_path.is_file():
        print("- .kepler/stage-1-bindings.json: MISSING (universal defaults will apply)")
    else:
        try:
            bindings = kit_common.load_project_bindings(root)
        except (OSError, ValueError) as exc:
            print(f"- .kepler/stage-1-bindings.json: INVALID ({exc})")
            return 1
        summary = {
            "project_name": bindings.get("project_name"),
            "locales": bindings.get("locales", []),
            "required_routes": bindings.get("required_routes", []),
            "required_offers": bindings.get("required_offers", []),
            "required_items": bindings.get("required_items", []),
            "require_bilingual_geo": bindings.get("require_bilingual_geo", False),
            "require_cldr_plurals": bindings.get("require_cldr_plurals", False),
            "scan_src_rtl": bindings.get("scan_src_rtl", False),
        }
        print(f"- .kepler/stage-1-bindings.json: PRESENT -> {json.dumps(summary)}")

    src_dir = root / "src"
    print(f"- src/: {'PRESENT (eligible for --scan-src)' if src_dir.is_dir() else 'ABSENT'}")
    return 0


def verify_l10n_text(
    text: str,
    *,
    filename: str = "stage-1-bilingual-l10n-spec.md",
    bindings: dict[str, Any] | None = None,
    project_dir: Path | None = None,
    scan_src: bool = False,
) -> list[str]:
    cfg = bindings or {}
    issues, sections = kit_common.check_h2_headings(text, REQUIRED_H2, filename, require_prose=True)

    locales = [str(loc).strip().lower() for loc in (cfg.get("locales") or []) if str(loc).strip()]
    required_routes = [str(r).strip() for r in (cfg.get("required_routes") or []) if str(r).strip()]
    required_offers = [str(o).strip() for o in (cfg.get("required_offers") or []) if str(o).strip()]

    has_arabic = (
        "ar" in locales
        or bool(cfg.get("require_bilingual_geo"))
        or any(_is_arabic_route(r) for r in required_routes)
    )
    require_cldr_plurals = has_arabic or bool(cfg.get("require_cldr_plurals"))

    # Section 1: reciprocal hreflang + x-default + dir="rtl" when Arabic configured
    if SEC1_HEADING in sections:
        sec1_text = "\n".join(line for _, line in sections[SEC1_HEADING])
        if "hreflang" not in sec1_text.lower():
            issues.append(f"{filename}: Section 1 missing reciprocal hreflang specification")
        if not re.search(r"\bx-default\b", sec1_text, re.IGNORECASE):
            issues.append(f"{filename}: Section 1 missing hreflang 'x-default' entry")
        for loc in locales:
            if not re.search(rf"(?<![A-Za-z0-9]){re.escape(loc)}(?![A-Za-z0-9])", sec1_text, re.IGNORECASE):
                issues.append(f"{filename}: Section 1 missing hreflang locale entry for '{loc}'")
        if has_arabic and not re.search(r'dir\s*=\s*["\']rtl["\']', sec1_text, re.IGNORECASE):
            issues.append(f"{filename}: Section 1 missing dir=\"rtl\" contract for Arabic locale")

    # Section 3: parity table covering required_routes, required_offers, and Arabic script parity
    if SEC3_HEADING in sections:
        sec3_lines = sections[SEC3_HEADING]
        sec3_tables = kit_common.parse_markdown_tables(sec3_lines)
        if not sec3_tables:
            issues.append(f"{filename}: Section 3 missing EN-AR Markdown parity table")
        else:
            for route in required_routes:
                if not _route_in_tables(route, sec3_tables):
                    issues.append(f"{filename}: Section 3 parity table missing required route '{route}'")

            table_text = "\n".join(
                " ".join(cells)
                for table in sec3_tables
                for _, cells in table
            )
            for offer in required_offers:
                if not _contains_term(table_text, offer):
                    issues.append(f"{filename}: Section 3 parity table missing required offer '{offer}'")

            if has_arabic:
                if not _ARABIC_SCRIPT_RE.search(table_text):
                    issues.append(
                        f"{filename}: Section 3 parity table must include Arabic script translations when Arabic locale is active"
                    )
                for table in sec3_tables:
                    if len(table) < 2:
                        continue
                    _, headers = table[0]
                    ar_col_indices = [idx for idx, h in enumerate(headers) if _is_arabic_copy_col_header(h)]
                    if not ar_col_indices:
                        continue
                    for line_no, cells in table[1:]:
                        for col_idx in ar_col_indices:
                            if col_idx >= len(cells):
                                continue
                            val = kit_common.strip_md(cells[col_idx])
                            if not val or val in {"-", "--", "N/A"}:
                                issues.append(
                                    f"{filename}:{line_no}: Section 3 Arabic column '{kit_common.strip_md(headers[col_idx])}' is empty"
                                )
                            elif _LATIN_ALPHA_RE.search(val) and not _ARABIC_SCRIPT_RE.search(val):
                                issues.append(
                                    f"{filename}:{line_no}: Section 3 Arabic column '{kit_common.strip_md(headers[col_idx])}' contains untranslated English-only text '{val}'"
                                )

            if has_arabic and bool(cfg.get("require_bilingual_geo")):
                sec3_blocks = kit_common.extract_blockquotes(sec3_lines)
                ar_geo_blocks = [
                    (line_no, bt)
                    for line_no, bt in sec3_blocks
                    if _ARABIC_SCRIPT_RE.search(bt)
                ]
                if not ar_geo_blocks:
                    issues.append(
                        f"{filename}: Section 3 missing {MIN_GEO_WORDS}-{MAX_GEO_WORDS} word Arabic GEO blockquote "
                        "(> ...) required by require_bilingual_geo"
                    )
                else:
                    for line_no, bt in ar_geo_blocks:
                        wc = len(bt.split())
                        if wc < MIN_GEO_WORDS or wc > MAX_GEO_WORDS:
                            issues.append(
                                f"{filename}:{line_no}: Section 3 Arabic GEO blockquote has {wc} words "
                                f"(must be {MIN_GEO_WORDS}-{MAX_GEO_WORDS})"
                            )

    # Section 4: 6 Arabic CLDR plural categories + global Presentation Forms check outside code fences
    if require_cldr_plurals and SEC4_HEADING in sections:
        issues.extend(_check_sec4_cldr_plurals(sections[SEC4_HEADING], filename))

    in_code_block = False
    for line_no, raw_line in enumerate(text.splitlines(), start=1):
        if raw_line.strip().startswith("```"):
            in_code_block = not in_code_block
            continue
        if in_code_block:
            continue
        pres_match = _ARABIC_PRES_FORM_RE.search(raw_line)
        if pres_match:
            ch = pres_match.group(0)
            issues.append(
                f"{filename}:{line_no}: Arabic Presentation Form character '{ch}' (U+{ord(ch):04X}); "
                "use standard Arabic U+0600-U+06FF"
            )

    # Section 5: logical CSS/Tailwind + bidi isolation
    if SEC5_HEADING in sections:
        sec5_text = "\n".join(line for _, line in sections[SEC5_HEADING])
        has_logical = re.search(
            r"(?:margin-inline|padding-inline|inset-inline|border-inline|\b(?:ms|me|ps|pe|start|end)-[0-9a-zA-Z]+|\btext-(?:start|end)\b)",
            sec5_text,
        )
        if not has_logical:
            issues.append(
                f"{filename}: Section 5 missing logical CSS or Tailwind utilities (margin-inline, padding-inline, ms-*, ps-*, text-start)"
            )
        if not re.search(r"(?:dir\s*=|unicode-bidi)", sec5_text, re.IGNORECASE):
            issues.append(f"{filename}: Section 5 missing bidi isolation guidance (dir= or unicode-bidi)")

    # Section 7: self-audit table
    if SEC7_HEADING in sections:
        issues.extend(
            kit_common.check_self_audit_table(
                sections[SEC7_HEADING],
                min_rows=7,
                section_label=f"{filename} Section 7 (Mandatory Self-Audit Checklist)",
            )
        )

    issues.extend(kit_common.find_unfilled_slots(text, filename=filename))
    issues.extend(prose_audit.audit_text(text, filename=filename, bindings=cfg))

    if project_dir is not None and (scan_src or bool(cfg.get("scan_src_rtl"))):
        issues.extend(scan_src_for_physical_rtl(project_dir))

    return issues


def verify_l10n_file(
    raw_path: str | Path,
    *,
    project_dir: Path,
    explicit_config: str | Path | None = None,
    scan_src: bool = False,
) -> list[str]:
    root = project_dir.resolve()
    target = kit_common.resolve_input_path(raw_path, root)
    if not target.is_file():
        return [f"{target.name}:1: File not found: {raw_path}"]
    try:
        bindings = kit_common.load_project_bindings(root, explicit_config=explicit_config)
        text = target.read_text(encoding="utf-8")
    except (OSError, UnicodeDecodeError, ValueError) as exc:
        return [f"{target.name}:1: Cannot load deliverable or bindings ({exc})"]
    return verify_l10n_text(
        text,
        filename=target.name,
        bindings=bindings,
        project_dir=root,
        scan_src=scan_src,
    )


def _make_ar_geo_block(word_target: int = 48) -> str:
    base_words = (
        "أكمي كلاود يبني أنظمة ويب عملية وتطبيقات أعمال مخصصة للفرق والشركات التي تحتاج إطلاقاً "
        "منتظماً دون تعقيد تشغيلي أو إعادة بناء متكررة. يجمع كل مشروع بين توثيق العقود البرمجية "
        "مسبقاً وفحوصات الجودة الآلية وتسليم الشيفرة الكاملة خلال أسابيع قليلة بتكلفة واضحة "
        "ونطاق عمل محدد للعملاء في الشرق الأوسط وفرق المنتجات السريعة."
    ).split()
    while len(base_words) < word_target:
        base_words.append("معتمد")
    return " ".join(base_words[:word_target])


def _build_sample_doc(
    *,
    locales: tuple[str, ...] = ("en", "ar"),
    include_routes: tuple[str, ...] = ("/", "/pricing", "/ar", "/ar/pricing"),
    include_offers: tuple[str, ...] = ("Starter", "Pro"),
    include_rtl_dir: bool = True,
    include_x_default: bool = True,
    arabic_in_parity: bool = True,
    untranslated_ar_cta: bool = False,
    ar_geo_words: int | None = 48,
    cldr_categories: tuple[str, ...] = CLDR_AR_PLURAL_CATEGORIES,
    include_icu_block: bool = True,
    include_logical_css: bool = True,
    include_bidi: bool = True,
    extra_sec4_line: str = "",
    unfilled_slot: str = "",
    fail_audit_row: bool = False,
) -> str:
    dir_contract = '<html lang="ar" dir="rtl">' if include_rtl_dir else '<html lang="ar">'
    x_def = '`x-default`' if include_x_default else 'default-locale'
    loc_list = ", ".join(f'`hreflang="{loc}"`' for loc in locales)

    parity_rows = []
    for r in include_routes:
        if _is_arabic_route(r):
            continue
        ar_r = "/ar" if r == "/" else f"/ar{r}"
        if arabic_in_parity:
            ar_title = "بناء أنظمة ويب عملية" if not untranslated_ar_cta else "Build Practical Web Apps"
            ar_cta = "احجز مراجعة النطاق" if not untranslated_ar_cta else "Book Scope Review"
        else:
            ar_title = "English Only Headline"
            ar_cta = "Book Scope Review"
        parity_rows.append(f"| `{r}` | `{ar_r}` | Practical Web Systems | {ar_title} | Book Scope Review | {ar_cta} |")

    offer_rows = []
    for offer in include_offers:
        if arabic_in_parity:
            offer_rows.append(
                f"| {offer} | $250 per month | بدءاً من $250 شهرياً | Full source delivery | تسليم الكود الكامل |"
            )
        else:
            offer_rows.append(
                f"| {offer} | $250 per month | Starting at $250 per month | Full source delivery | Full source delivery |"
            )

    icu_lines = [f"  {cat} {{قيمة {cat}}}" for cat in cldr_categories]
    icu_block = "\n".join(icu_lines)
    sec4_icu_md = (
        f"```icu\n{{days, plural,\n{icu_block}\n}}\n```"
        if include_icu_block
        else ""
    )
    sec3_geo_md = (
        f"### Bilingual 40-60 Word GEO Parity Block\n\n> {_make_ar_geo_block(ar_geo_words)}\n"
        if arabic_in_parity and ar_geo_words is not None and ar_geo_words > 0
        else ""
    )

    logical_line = (
        "- Use `margin-inline-start`, `padding-inline-end`, `ms-4`, `ps-3`, and `text-start` across components."
        if include_logical_css
        else "- Use clean layout spacing rules across components."
    )
    bidi_line = (
        '- Isolate embedded prices and URLs with `<span dir="ltr">` and `unicode-bidi: isolate`.'
        if include_bidi
        else "- Keep mixed inline runs readable."
    )
    row7_status = "FAIL" if fail_audit_row else "PASS"

    return f"""# Stage 1 Bilingual Localization & RTL Specification

## 1. Locale Architecture, hreflang Matrix & Directionality Contract

- Root contract: {dir_contract} for Arabic routes and `<html lang="en" dir="ltr">` for English routes.
- Reciprocal pairs emit {loc_list} and {x_def} pointing to the canonical default route.

## 2. Domain Glossary & Non-Translatable Brand/Technical Terms

- Keep `JSON-LD`, `ICU`, `API`, and `CLI` in Latin inside `<span dir="ltr">` with `unicode-bidi: isolate`.
- Standardize `Scope` as `نطاق العمل` and `Monthly Retainer` as `اشتراك شهري`.

## 3. EN-AR Route, Offer, Price & CTA Parity Table

| EN Route | AR Route | EN Headline | Arabic Headline | EN CTA | Arabic CTA |
|---|---|---|---|---|---|
{chr(10).join(parity_rows)}

| Offer | EN Price | Arabic Price | EN Scope | Arabic Scope |
|---|---|---|---|---|
{chr(10).join(offer_rows)}

{sec3_geo_md}
{unfilled_slot}

## 4. Arabic Transcreation Copy & CLDR 6-Plural Message Rules

Arabic UI strings avoid literal corporate phrasing and keep monthly cadences as `شهرياً`.
{extra_sec4_line}

{sec4_icu_md}

## 5. RTL Layout, Logical CSS/Tailwind & Bidi Isolation Spec

{logical_line}
{bidi_line}

## 6. Optional Tooling Handoff (i18n-keeper, i18n-check, RTL Linters)

- Optional CI checks: `katerynaKhar/i18n-keeper`, `lingualdev/i18n-check`, `yuschick/stylelint-plugin-logical-css`, and `AhmedBaset/eslint-plugin-rtl-friendly`.

## 7. Mandatory Self-Audit Checklist

| # | Audit Gate | Verification Evidence | Status |
|---|---|---|---|
| 1 | Seven H2 sections in order | Verified | PASS |
| 2 | Reciprocal hreflang and dir=rtl | Verified | PASS |
| 3 | Route and offer parity | Verified | PASS |
| 4 | CLDR 6 plural categories | Verified | PASS |
| 5 | Unicode U+0600-U+06FF hygiene | Verified | PASS |
| 6 | Logical CSS and bidi isolation | Verified | PASS |
| 7 | Clean prose audit | Verified | {row7_status} |
"""


def run_self_test() -> int:
    with tempfile.TemporaryDirectory() as tmp:
        tmp_dir = Path(tmp)
        docs_dir = tmp_dir / "docs"
        docs_dir.mkdir(parents=True, exist_ok=True)
        src_dir = tmp_dir / "src" / "components"
        src_dir.mkdir(parents=True, exist_ok=True)

        # Clean src/ fixture using logical Tailwind + logical CSS + commented physical example
        (src_dir / "Card.tsx").write_text(
            "// Avoid ml-4, ml-auto, border-l-2, or mr-2\n"
            "/* Legacy: padding-left: 8px; text-align: left; */\n"
            'export function Card() { return <div className="ms-4 ms-auto ps-3 border-s-2 rounded-e-lg text-start" />; }\n',
            encoding="utf-8",
        )
        (src_dir / "layout.css").write_text(
            "/* margin-left: 12px; text-align: left; */\n"
            ".panel { margin-inline-start: 1rem; padding-inline-end: 0.5rem; border-inline-start: 2px solid; text-align: start; }\n",
            encoding="utf-8",
        )

        # 1. Positive bilingual fixture + clean --scan-src
        bindings_bilingual = {
            "project_name": "Acme Cloud",
            "locales": ["en", "ar"],
            "required_routes": ["/", "/pricing", "/ar", "/ar/pricing"],
            "required_offers": ["Starter", "Pro"],
            "require_bilingual_geo": True,
        }
        kepler_dir = tmp_dir / ".kepler"
        kepler_dir.mkdir(parents=True, exist_ok=True)
        (kepler_dir / "stage-1-bindings.json").write_text(json.dumps(bindings_bilingual), encoding="utf-8")

        doc_path = docs_dir / "stage-1-bilingual-l10n-spec.md"
        doc_path.write_text(_build_sample_doc(), encoding="utf-8")
        ok_issues = verify_l10n_file(doc_path, project_dir=tmp_dir, scan_src=True)
        assert ok_issues == [], f"Expected clean bilingual doc + logical src to pass, got: {ok_issues}"

        # 2. Negative: missing CLDR plural category ('many') + prose-bypass loophole without ICU/table
        missing_plural = _build_sample_doc(cldr_categories=("zero", "one", "two", "few", "other"))
        plural_issues = verify_l10n_text(missing_plural, bindings=bindings_bilingual)
        assert any("CLDR plural category 'many'" in e for e in plural_issues), plural_issues

        prose_bypass_doc = _build_sample_doc(
            include_icu_block=False,
            extra_sec4_line="Zero slop across one or two pages with a few of many other rules.",
        )
        bypass_issues = verify_l10n_text(prose_bypass_doc, bindings=bindings_bilingual)
        assert any("missing ICU MessageFormat 'plural,' block or CLDR plural table" in e for e in bypass_issues), bypass_issues

        # 2b. Negative: missing or out-of-range Arabic GEO blockquote under require_bilingual_geo
        no_geo_doc = _build_sample_doc(ar_geo_words=None)
        no_geo_issues = verify_l10n_text(no_geo_doc, bindings=bindings_bilingual)
        assert any("Section 3 missing 40-60 word Arabic GEO blockquote" in e for e in no_geo_issues), no_geo_issues

        short_geo_doc = _build_sample_doc(ar_geo_words=18)
        short_geo_issues = verify_l10n_text(short_geo_doc, bindings=bindings_bilingual)
        assert any("Arabic GEO blockquote has 18 words" in e for e in short_geo_issues), short_geo_issues

        long_geo_doc = _build_sample_doc(ar_geo_words=72)
        long_geo_issues = verify_l10n_text(long_geo_doc, bindings=bindings_bilingual)
        assert any("Arabic GEO blockquote has 72 words" in e for e in long_geo_issues), long_geo_issues

        # 3. Negative: Arabic Presentation Form character (\uFB50) outside code block
        pres_doc = _build_sample_doc(extra_sec4_line="نص يحتوي على حرف غير قياسي \uFB50 في النسخة.")
        pres_issues = verify_l10n_text(pres_doc, bindings=bindings_bilingual)
        assert any("Arabic Presentation Form" in e and "U+FB50" in e for e in pres_issues), pres_issues

        # 4. Negative: /mo leak on Arabic line (caught by prose_audit)
        mo_leak_doc = _build_sample_doc(extra_sec4_line="خطة الاشتراك تبدأ من $250/mo للفرق الهندسية.")
        mo_issues = verify_l10n_text(mo_leak_doc, bindings=bindings_bilingual)
        assert any("mixed-unit" in e for e in mo_issues), mo_issues

        # 5. Negative: missing required route and offer
        missing_ro_doc = _build_sample_doc(include_routes=("/", "/ar"), include_offers=("Starter",))
        ro_issues = verify_l10n_text(missing_ro_doc, bindings=bindings_bilingual)
        assert any("missing required route '/pricing'" in e for e in ro_issues), ro_issues
        assert any("missing required offer 'Pro'" in e for e in ro_issues), ro_issues

        # 6. Negative: unfilled slot
        slot_doc = _build_sample_doc(unfilled_slot="Notes: <Unfilled Slot>")
        slot_issues = verify_l10n_text(slot_doc, bindings=bindings_bilingual)
        assert any("unfilled template slot" in e for e in slot_issues), slot_issues

        # 7. Negative: untranslated English-only Arabic column row
        untranslated_doc = _build_sample_doc(untranslated_ar_cta=True)
        untranslated_issues = verify_l10n_text(untranslated_doc, bindings=bindings_bilingual)
        assert any("untranslated English-only text" in e for e in untranslated_issues), untranslated_issues

        # 8. Positive: /articles non-false-positive on English-only bindings
        articles_bindings = {
            "project_name": "Acme Cloud",
            "locales": ["en"],
            "required_routes": ["/", "/articles"],
            "required_offers": ["Starter"],
        }
        articles_doc = _build_sample_doc(
            locales=("en",),
            include_routes=("/", "/articles"),
            include_offers=("Starter",),
            include_rtl_dir=False,
            arabic_in_parity=False,
            cldr_categories=(),
        )
        articles_issues = verify_l10n_text(articles_doc, bindings=articles_bindings)
        assert articles_issues == [], f"/articles must not trigger Arabic/RTL/CLDR checks: {articles_issues}"

        # 9. Negative: --scan-src catches ml-4, ml-auto, border-l-2, rounded-r-lg, pl-[12px], left-1/2, margin-left:, text-align: left;
        #    while ignoring comments and passing ms-4, ms-auto, border-s-2, text-align: start, and margin-inline-start:
        (src_dir / "BadWidget.tsx").write_text(
            "// ml-8 in comment is ignored\n"
            'export const BadWidget = () => <span className="ms-4 ml-4 ml-auto mr-px scroll-ml-4 border-l-2 rounded-r-lg pl-[12px] left-1/2 text-left">Hi</span>;\n',
            encoding="utf-8",
        )
        (src_dir / "bad.css").write_text(
            "/* padding-right: 4px; */\n"
            ".legacy { margin-inline-start: 4px; margin-left: 16px; border-left: 1px solid; text-align: left; }\n",
            encoding="utf-8",
        )
        scan_issues = verify_l10n_file(doc_path, project_dir=tmp_dir, scan_src=True)
        for expected_hit in ("ml-4", "ml-auto", "mr-px", "scroll-ml-4", "border-l-2", "rounded-r-lg", "pl-[12px]", "left-1/2", "text-left"):
            assert any("BadWidget.tsx:2" in e and expected_hit in e for e in scan_issues), (expected_hit, scan_issues)
        for expected_css in ("margin-left:", "border-left:", "text-align: left"):
            assert any("bad.css:2" in e and expected_css in e for e in scan_issues), (expected_css, scan_issues)
        assert not any("Card.tsx" in e or "layout.css" in e for e in scan_issues), scan_issues
        assert not any("ml-8" in e or "padding-right:" in e for e in scan_issues), scan_issues

        # 10. Context summary runs cleanly
        assert run_context(tmp_dir) == 0

    print(
        "PASS: l10n_audit.py --self-test passed "
        "(bilingual positive, CLDR 6-plural, U+FB50 presentation form, Arabic /mo leak, "
        "missing route/offer, unfilled slot, untranslated AR column, /articles non-false-positive, "
        "and --scan-src logical-vs-physical checks)."
    )
    return 0


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(
        description="Audit Stage 1 Role 1.4 (bilingual-localization-and-rtl-strategist) kit, context, deliverable, and optional src/ RTL rules."
    )
    parser.add_argument("--kit", action="store_true", help="Validate the bilingual-localization-and-rtl-strategist role kit files.")
    parser.add_argument("--context", action="store_true", help="Summarize Stage 1 upstream briefs, bindings, and src/ presence.")
    parser.add_argument("--verify", metavar="PATH", help="Verify a Stage 1 bilingual localization & RTL spec deliverable.")
    parser.add_argument("--project-dir", default=".", help="Project root directory (default: current directory).")
    parser.add_argument("--config", help="Optional explicit path to stage-1-bindings.json.")
    parser.add_argument("--scan-src", action="store_true", help="Scan <project-dir>/src for physical RTL-unsafe CSS/Tailwind properties.")
    parser.add_argument("--self-test", action="store_true", help="Run built-in offline self-tests.")
    args = parser.parse_args(argv)

    if args.self_test:
        return run_self_test()

    if args.kit:
        issues = verify_kit(KIT_DIR)
        if issues:
            print(f"FAIL: l10n_audit.py --kit found {len(issues)} issue(s):")
            for issue in issues:
                print(f"FAIL: {issue}")
            return 1
        print("PASS: l10n_audit.py --kit verified ROLE.md, START-SESSION.md, 3 SKILL.md files, template, and prose audit.")
        return 0

    if args.context:
        return run_context(Path(args.project_dir))

    if args.verify:
        issues = verify_l10n_file(
            args.verify,
            project_dir=Path(args.project_dir),
            explicit_config=args.config,
            scan_src=args.scan_src,
        )
        if issues:
            print(f"FAIL: l10n_audit.py --verify found {len(issues)} issue(s):")
            for issue in issues:
                print(f"FAIL: {issue}")
            return 1
        print(f"PASS: l10n_audit.py --verify passed for {args.verify}.")
        return 0

    parser.print_help()
    return 2


if __name__ == "__main__":
    raise SystemExit(main())
