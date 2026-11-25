#!/usr/bin/env python3
"""
Deterministic Kit, Context, Deliverable, and Self-Test Auditor for Stage 1 Role 1.3 (conversion-copywriter).

Usage:
  python3 -B copy_audit.py --kit
  python3 -B copy_audit.py --context [--project-dir <dir>]
  python3 -B copy_audit.py --verify <path> [--project-dir <dir>] [--config <bindings.json>]
  python3 -B copy_audit.py --self-test
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
    "conversion-copywriting",
    "seven-sweeps-copy-editing",
    "anti-slop-humanizing",
)
TEMPLATE_NAME = "stage-1-final-copy-and-pitch.template.md"
REQUIRED_H2: tuple[str, ...] = (
    "1. Global Navigation, Footer & Voice Contract",
    "2. Primary Landing Route (/) Copy & GEO Identity Block",
    "3. Core Product, Features & Offers Copy",
    "4. Proof, Case Studies & Credibility Copy",
    "5. Secondary Routes & Conversion Funnel Copy",
    "6. Frequently Asked Questions (40-60 Word GEO Answers)",
    "7. Mandatory Self-Audit Checklist",
)
SEC2_HEADING = REQUIRED_H2[1]
SEC6_HEADING = REQUIRED_H2[5]
SEC7_HEADING = REQUIRED_H2[6]
DEFAULT_GEO_BLOCK_COUNT = 5
MIN_GEO_WORDS = 40
MAX_GEO_WORDS = 60

CONTEXT_FILES: tuple[str, ...] = (
    "docs/positioning-brief.md",
    "docs/seo-and-market-brief.md",
    ".agents/product-marketing.md",
    "docs/context/project-digest.md",
)


def _count_words(text: str) -> int:
    return len(text.split())


def _contains_term(text: str, term: str) -> bool:
    escaped = re.escape(term)
    prefix = r"(?<!\w)" if term[0].isalnum() else ""
    suffix = r"(?!\w)" if term[-1].isalnum() else ""
    return re.search(f"{prefix}{escaped}{suffix}", text, re.IGNORECASE) is not None


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
    print(f"=== Conversion Copywriter Context Summary ({root}) ===")

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
            "voice_mode": bindings.get("voice_mode"),
            "forbid_first_person_singular": bindings.get("forbid_first_person_singular"),
            "forbidden_tokens": bindings.get("forbidden_tokens", []),
            "allowed_exceptions": bindings.get("allowed_exceptions", []),
            "required_routes": bindings.get("required_routes", []),
            "required_offers": bindings.get("required_offers", []),
            "required_items": bindings.get("required_items", []),
            "locales": bindings.get("locales", []),
            "require_bilingual_geo": bindings.get("require_bilingual_geo", False),
            "geo_block_count": bindings.get("geo_block_count", DEFAULT_GEO_BLOCK_COUNT),
        }
        print(f"- .kepler/stage-1-bindings.json: PRESENT -> {json.dumps(summary)}")

    return 0


def verify_copy_text(
    text: str,
    *,
    filename: str = "stage-1-final-copy-and-pitch.md",
    bindings: dict[str, Any] | None = None,
) -> list[str]:
    cfg = bindings or {}
    issues, sections = kit_common.check_h2_headings(text, REQUIRED_H2, filename, require_prose=True)

    raw_geo_count = cfg.get("geo_block_count", DEFAULT_GEO_BLOCK_COUNT)
    try:
        geo_required = int(raw_geo_count)
    except (TypeError, ValueError):
        geo_required = DEFAULT_GEO_BLOCK_COUNT
    if geo_required < 0:
        geo_required = 0

    sec2_blocks = kit_common.extract_blockquotes(sections.get(SEC2_HEADING, []))
    sec6_blocks = kit_common.extract_blockquotes(sections.get(SEC6_HEADING, []))
    if geo_required >= 1 and not sec2_blocks:
        issues.append(f"{filename}: Section 2 missing GEO Identity Block blockquote (> ...)")
    min_faq_blocks = max(0, geo_required - 1)
    if min_faq_blocks >= 1 and len(sec6_blocks) < min_faq_blocks:
        issues.append(
            f"{filename}: Section 6 expected >= {min_faq_blocks} GEO FAQ blockquotes, found {len(sec6_blocks)}"
        )

    all_geo_blocks = sec2_blocks + sec6_blocks
    if len(all_geo_blocks) < geo_required:
        issues.append(
            f"{filename}: expected >= {geo_required} GEO blockquotes across Section 2 and Section 6, "
            f"found {len(all_geo_blocks)}"
        )

    for idx, (line_no, block_text) in enumerate(all_geo_blocks, start=1):
        wc = _count_words(block_text)
        if wc < MIN_GEO_WORDS or wc > MAX_GEO_WORDS:
            issues.append(
                f"{filename}:{line_no}: GEO block #{idx} has {wc} words (must be {MIN_GEO_WORDS}-{MAX_GEO_WORDS})"
            )

    locales = [str(loc).strip().lower() for loc in (cfg.get("locales") or []) if str(loc).strip()]
    required_routes = [str(r).strip() for r in (cfg.get("required_routes") or []) if str(r).strip()]
    require_bilingual_geo = bool(cfg.get("require_bilingual_geo")) or (
        "ar" in locales and any(r == "/ar" or r.startswith("/ar/") for r in required_routes)
    )
    if require_bilingual_geo:
        has_arabic_geo = any(
            MIN_GEO_WORDS <= _count_words(block_text) <= MAX_GEO_WORDS
            and re.search(r"[\u0600-\u06FF]", block_text)
            for _, block_text in all_geo_blocks
        )
        if not has_arabic_geo:
            issues.append(
                f"{filename}: bilingual Arabic GEO parity required, but no {MIN_GEO_WORDS}-{MAX_GEO_WORDS} word "
                "GEO blockquote in Section 2 or Section 6 contains Arabic script"
            )

    route_lines = (
        sections.get(REQUIRED_H2[0], [])
        + sections.get(REQUIRED_H2[1], [])
        + sections.get(REQUIRED_H2[4], [])
    )
    for route in cfg.get("required_routes") or []:
        route_str = str(route).strip()
        if not route_str:
            continue
        if not kit_common.route_present_in_section(route_str, route_lines):
            issues.append(f"{filename}: missing required route '{route_str}' in Sections 1, 2, or 5")

    for offer in cfg.get("required_offers") or []:
        offer_str = str(offer).strip()
        if not offer_str:
            continue
        if not _contains_term(text, offer_str):
            issues.append(f"{filename}: missing required offer '{offer_str}' from bindings")

    for item in cfg.get("required_items") or []:
        item_str = str(item).strip()
        if not item_str:
            continue
        if not _contains_term(text, item_str):
            issues.append(f"{filename}: missing required item '{item_str}' from bindings")

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
    return issues


def verify_copy_file(
    raw_path: str | Path,
    *,
    project_dir: Path,
    explicit_config: str | Path | None = None,
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
    return verify_copy_text(text, filename=target.name, bindings=bindings)


def _make_geo_block(prefix: str, word_target: int = 48) -> str:
    base_words = (
        f"{prefix} builds deterministic verification pipelines for engineering teams that ship production "
        "web software on tight schedules. Every release combines automated structural checks, plain-language "
        "documentation, and reproducible build scripts so maintainers spot regressions before deployment "
        "without relying on manual checklists or guesswork across multi-route marketing sites and technical hubs."
    ).split()
    while len(base_words) < word_target:
        base_words.append("verified")
    return " ".join(base_words[:word_target])


def _make_ar_geo_block(prefix: str = "أكمي كلاود", word_target: int = 48) -> str:
    base_words = (
        f"{prefix} يبني أنظمة ويب عملية وتطبيقات أعمال مخصصة للفرق والشركات التي تحتاج إطلاقاً "
        "منتظماً دون تعقيد تشغيلي أو إعادة بناء متكررة. يجمع كل مشروع بين توثيق العقود البرمجية "
        "مسبقاً وفحوصات الجودة الآلية وتسليم الشيفرة الكاملة خلال أسابيع قليلة بتكلفة واضحة "
        "ونطاق عمل محدد للعملاء في الشرق الأوسط وفرق المنتجات السريعة."
    ).split()
    while len(base_words) < word_target:
        base_words.append("معتمد")
    return " ".join(base_words[:word_target])


def _build_sample_doc(
    *,
    geo_words: tuple[int, ...] = (48, 46, 50, 47, 49),
    include_routes: tuple[str, ...] = ("/", "/features", "/pricing", "/contact"),
    include_offers: tuple[str, ...] = ("Starter", "Pro", "Team"),
    include_items: tuple[str, ...] = ("LedgerSync", "AuditCLI"),
    extra_prose: str = "",
    fail_audit_row: bool = False,
    include_arabic_geo: bool = False,
) -> str:
    routes_md = "\n".join(f"- Route `{r}`: Dedicated headline, proof block, and conversion CTA." for r in include_routes)
    offers_md = "\n".join(f"- **{o}:** Clear scope, deliverables, and direct onboarding path." for o in include_offers)
    items_md = "\n".join(f"| {it} | Production constraint | Concrete architecture | Verified outcome |" for it in include_items)
    identity_geo = _make_geo_block("Acme Cloud", geo_words[0]) if geo_words else ""
    faq_blocks = []
    for idx, wc in enumerate(geo_words[1:], start=1):
        if include_arabic_geo and idx == 1:
            faq_blocks.append(f"### Q{idx}: كيف تتم عملية التنفيذ والتسليم؟\n\n> {_make_ar_geo_block('أكمي كلاود', wc)}")
        else:
            faq_blocks.append(f"### Q{idx}: How does delivery work for question {idx}?\n\n> {_make_geo_block(f'Answer {idx}', wc)}")
    faq_md = "\n\n".join(faq_blocks)
    row7_status = "FAIL" if fail_audit_row else "PASS"

    return f"""# Stage 1 Final Conversion Copy & Pitch Specification

## 1. Global Navigation, Footer & Voice Contract

We write direct, mechanism-backed copy for engineering buyers. {extra_prose}
Navigation covers primary routes and links directly to onboarding.

## 2. Primary Landing Route (/) Copy & GEO Identity Block

> {identity_geo}

- **Eyebrow:** Automated Release Verification
- **H1:** Catch Broken Releases Before Customers Open Tickets
- **Lead:** We run deterministic checks on every pull request so teams ship updates without manual QA bottlenecks.
- **Primary CTA:** Book a Scope Review

## 3. Core Product, Features & Offers Copy

{offers_md}

## 4. Proof, Case Studies & Credibility Copy

| Item | Context | Action | Verified Outcome |
|---|---|---|---|
{items_md}

## 5. Secondary Routes & Conversion Funnel Copy

{routes_md}

- **Form Micro-Copy:** Expect a technical reply within one business day with a clear scope estimate.

## 6. Frequently Asked Questions (40-60 Word GEO Answers)

{faq_md}

## 7. Mandatory Self-Audit Checklist

| # | Gate | Evidence | Status |
|---|---|---|---|
| 1 | Seven H2 sections | Verified | PASS |
| 2 | Consequence-first | Verified | PASS |
| 3 | Seven Sweeps | Verified | PASS |
| 4 | GEO word counts | Verified | PASS |
| 5 | Required routes and offers | Verified | PASS |
| 6 | Voice bindings | Verified | PASS |
| 7 | Clean prose audit | Verified | {row7_status} |
"""


def run_self_test() -> int:
    with tempfile.TemporaryDirectory() as tmp:
        tmp_dir = Path(tmp)
        docs_dir = tmp_dir / "docs"
        docs_dir.mkdir(parents=True, exist_ok=True)

        # 1. Zero-config mode (no .kepler/stage-1-bindings.json)
        clean_path = docs_dir / "stage-1-final-copy-and-pitch.md"
        clean_path.write_text(_build_sample_doc(), encoding="utf-8")
        zero_cfg_issues = verify_copy_file(clean_path, project_dir=tmp_dir)
        assert zero_cfg_issues == [], f"Zero-config mode failed unexpectedly: {zero_cfg_issues}"

        # 2. Strict bindings mode
        kepler_dir = tmp_dir / ".kepler"
        kepler_dir.mkdir(parents=True, exist_ok=True)
        bindings_data = {
            "project_name": "Acme Cloud",
            "voice_mode": "brand_plural",
            "forbid_first_person_singular": True,
            "forbidden_tokens": ["FounderAlias"],
            "allowed_exceptions": ["hello@founderalias.example"],
            "required_routes": ["/", "/features", "/pricing", "/contact"],
            "required_offers": ["Starter", "Pro", "Team"],
            "required_items": ["LedgerSync", "AuditCLI"],
            "geo_block_count": 5,
        }
        (kepler_dir / "stage-1-bindings.json").write_text(json.dumps(bindings_data), encoding="utf-8")

        strict_ok = _build_sample_doc(extra_prose="Contact hello@founderalias.example for enterprise reviews.")
        clean_path.write_text(strict_ok, encoding="utf-8")
        strict_issues = verify_copy_file(clean_path, project_dir=tmp_dir)
        assert strict_issues == [], f"Strict bindings mode failed unexpectedly: {strict_issues}"

        # 3. Negative: bad GEO word count (too short and too long)
        bad_geo = _build_sample_doc(geo_words=(20, 48, 72, 48, 48))
        bad_geo_issues = verify_copy_text(bad_geo, bindings=bindings_data)
        assert any("GEO block #1" in e for e in bad_geo_issues), f"Expected short GEO error, got {bad_geo_issues}"
        assert any("GEO block #3" in e for e in bad_geo_issues), f"Expected long GEO error, got {bad_geo_issues}"

        # 4. Negative: missing required route, offer, and item
        missing_bindings_doc = _build_sample_doc(
            include_routes=("/", "/features"),
            include_offers=("Starter", "Pro"),
            include_items=("LedgerSync",),
        )
        missing_issues = verify_copy_text(missing_bindings_doc, bindings=bindings_data)
        assert any("missing required route '/pricing'" in e for e in missing_issues), missing_issues
        assert any("missing required offer 'Team'" in e for e in missing_issues), missing_issues
        assert any("missing required item 'AuditCLI'" in e for e in missing_issues), missing_issues

        # 5. Negative: banned AI buzzword
        banned_doc = _build_sample_doc(extra_prose="Our cutting-edge workflow runs daily.")
        banned_issues = verify_copy_text(banned_doc, bindings=bindings_data)
        assert any("cutting-edge" in e for e in banned_issues), banned_issues

        # 6. Negative: voice violation + forbidden token
        voice_doc = _build_sample_doc(extra_prose="I designed this myself with FounderAlias.")
        voice_issues = verify_copy_text(voice_doc, bindings=bindings_data)
        assert any("Solo first-person pronoun" in e for e in voice_issues), voice_issues
        assert any("FounderAlias" in e for e in voice_issues), voice_issues

        # 7. Negative: FAIL row in Section 7 self-audit table
        fail_table_doc = _build_sample_doc(fail_audit_row=True)
        fail_table_issues = verify_copy_text(fail_table_doc, bindings=bindings_data)
        assert any("contains FAIL row" in e for e in fail_table_issues), fail_table_issues

        # 8. Negative: Arabic AI slop rejection (via prose_audit)
        ar_slop_doc = _build_sample_doc(extra_prose="نقدم حلول متكاملة مبتكرة للفرق الهندسية.")
        ar_slop_issues = verify_copy_text(ar_slop_doc, bindings=bindings_data)
        assert any("Banned Arabic slop phrase" in e for e in ar_slop_issues), ar_slop_issues

        # 9. Negative: Arabic /mo mixed-unit leak rejection
        ar_unit_doc = _build_sample_doc(extra_prose="اشتراك شهري يبدأ من $250/mo لصيانة التطبيق.")
        ar_unit_issues = verify_copy_text(ar_unit_doc, bindings=bindings_data)
        assert any("Arabic mixed-unit leak" in e for e in ar_unit_issues), ar_unit_issues

        # 10. Positive & Negative: Bilingual Arabic GEO parity (explicit flag and /ar + ar locale)
        bilingual_flag_bindings = {**bindings_data, "require_bilingual_geo": True}
        ar_locale_bindings = {
            **bindings_data,
            "locales": ["en", "ar"],
            "required_routes": ["/", "/features", "/pricing", "/contact", "/ar"],
        }
        ar_subroute_bindings = {
            **bindings_data,
            "locales": ["en", "ar"],
            "required_routes": ["/", "/features", "/pricing", "/contact", "/ar/services"],
        }
        articles_bindings = {
            **bindings_data,
            "locales": ["en", "ar"],
            "required_routes": ["/", "/features", "/pricing", "/contact", "/articles"],
        }

        en_only_articles = _build_sample_doc(include_routes=("/", "/features", "/pricing", "/contact", "/articles"))
        articles_issues = verify_copy_text(en_only_articles, bindings=articles_bindings)
        assert articles_issues == [], f"/articles must not trigger Arabic GEO parity: {articles_issues}"

        en_only_for_ar = _build_sample_doc(include_routes=("/", "/features", "/pricing", "/contact", "/ar"))
        flag_fail_issues = verify_copy_text(en_only_for_ar, bindings=bilingual_flag_bindings)
        assert any("bilingual Arabic GEO parity required" in e for e in flag_fail_issues), flag_fail_issues

        locale_fail_issues = verify_copy_text(en_only_for_ar, bindings=ar_locale_bindings)
        assert any("bilingual Arabic GEO parity required" in e for e in locale_fail_issues), locale_fail_issues

        en_only_ar_subroute = _build_sample_doc(include_routes=("/", "/features", "/pricing", "/contact", "/ar/services"))
        subroute_fail_issues = verify_copy_text(en_only_ar_subroute, bindings=ar_subroute_bindings)
        assert any("bilingual Arabic GEO parity required" in e for e in subroute_fail_issues), subroute_fail_issues

        bilingual_ok_doc = _build_sample_doc(
            include_routes=("/", "/features", "/pricing", "/contact", "/ar", "/ar/services"),
            include_arabic_geo=True,
        )
        flag_ok_issues = verify_copy_text(bilingual_ok_doc, bindings=bilingual_flag_bindings)
        assert flag_ok_issues == [], flag_ok_issues
        locale_ok_issues = verify_copy_text(bilingual_ok_doc, bindings=ar_locale_bindings)
        assert locale_ok_issues == [], locale_ok_issues
        subroute_ok_issues = verify_copy_text(bilingual_ok_doc, bindings=ar_subroute_bindings)
        assert subroute_ok_issues == [], subroute_ok_issues

        # 11. Context check runs cleanly
        assert run_context(tmp_dir) == 0

    print(
        "PASS: copy_audit.py --self-test passed "
        "(zero-config, strict bindings, GEO word counts, bilingual Arabic GEO parity, "
        "missing routes/offers/items, English/Arabic slop, Arabic mixed-unit, voice/token, self-audit table, and context checks)."
    )
    return 0


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(
        description="Audit Stage 1 Role 1.3 (conversion-copywriter) kit, context, and locked copy deliverable."
    )
    parser.add_argument("--kit", action="store_true", help="Validate the conversion-copywriter role kit files.")
    parser.add_argument("--context", action="store_true", help="Summarize Stage 1 upstream briefs and bindings.")
    parser.add_argument("--verify", metavar="PATH", help="Verify a Stage 1 final copy Markdown deliverable.")
    parser.add_argument("--project-dir", default=".", help="Project root directory (default: current directory).")
    parser.add_argument("--config", help="Optional explicit path to stage-1-bindings.json.")
    parser.add_argument("--self-test", action="store_true", help="Run built-in offline self-tests.")
    args = parser.parse_args(argv)

    if args.self_test:
        return run_self_test()

    if args.kit:
        issues = verify_kit(KIT_DIR)
        if issues:
            print(f"FAIL: copy_audit.py --kit found {len(issues)} issue(s):")
            for issue in issues:
                print(f"FAIL: {issue}")
            return 1
        print("PASS: copy_audit.py --kit verified ROLE.md, START-SESSION.md, 3 SKILL.md files, template, and prose audit.")
        return 0

    if args.context:
        return run_context(Path(args.project_dir))

    if args.verify:
        issues = verify_copy_file(args.verify, project_dir=Path(args.project_dir), explicit_config=args.config)
        if issues:
            print(f"FAIL: copy_audit.py --verify found {len(issues)} issue(s):")
            for issue in issues:
                print(f"FAIL: {issue}")
            return 1
        print(f"PASS: copy_audit.py --verify passed for {args.verify}.")
        return 0

    parser.print_help()
    return 2


if __name__ == "__main__":
    raise SystemExit(main())
