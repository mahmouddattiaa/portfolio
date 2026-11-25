#!/usr/bin/env python3
"""
Deterministic Kit Preflight, Context Summarizer & Deliverable Verifier for
Stage 1 Role 1.2 (seo-and-market-researcher).

Python 3.11+ stdlib only. Reuses shared kit_common.py and prose_audit.py via importlib.util.
"""

from __future__ import annotations

import argparse
import importlib.util
import json
import math
import re
import subprocess
import sys
import tempfile
from collections.abc import Iterator
from pathlib import Path
from typing import Any

KIT_DIR = Path(__file__).resolve().parent.parent

EXPECTED_SKILLS: tuple[str, ...] = (
    "search-intent-and-buyer-language",
    "geo-citability-and-query-fanout",
    "onpage-seo-and-jsonld-schema",
)

SEC_1 = "1. Search Intent & Keyword Clusters"
SEC_2 = "2. Multi-Route Metadata Table (<title>, <meta description>, Canonical & hreflang)"
SEC_3 = "3. Semantic Heading Hierarchy (H1 -> H2 -> H3) Across Core Routes"
SEC_4 = "4. AI Search (GEO) Citability & Query Fan-Out (40-60 Words Each)"
SEC_5 = "5. Production @graph JSON-LD Structured Data"
SEC_6 = "6. Copywriter & Frontend Handoff Rules"
SEC_7 = "7. Mandatory Self-Audit Checklist"

REQUIRED_H2: tuple[str, ...] = (SEC_1, SEC_2, SEC_3, SEC_4, SEC_5, SEC_6, SEC_7)

TITLE_MIN = 45
TITLE_MAX = 60
DESC_MIN = 135
DESC_MAX = 160
GEO_WORDS_MIN = 40
GEO_WORDS_MAX = 60
DEFAULT_GEO_BLOCK_COUNT = 5
DEFAULT_REQUIRED_JSONLD_TYPES: tuple[str, ...] = ("WebSite", "FAQPage")

ARABIC_SCRIPT_RE = re.compile(r"[\u0600-\u06FF]")
HTTP_URL_RE = re.compile(r"^https?://[^\s/]+(?:/\S*)?$", re.IGNORECASE)


def _load_kit_common() -> Any:
    resolved = Path(__file__).resolve()
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


KIT_COMMON = _load_kit_common()
PROSE_AUDIT = KIT_COMMON.load_prose_audit(__file__)


def _is_arabic_route(route: str) -> bool:
    cleaned = route.strip()
    return cleaned == "/ar" or cleaned.startswith("/ar/")


def _requires_bilingual_arabic(bindings: dict[str, Any]) -> bool:
    if bindings.get("require_bilingual_geo"):
        return True
    locales = [str(loc).strip().lower() for loc in (bindings.get("locales") or []) if str(loc).strip()]
    required_routes = [str(r).strip() for r in (bindings.get("required_routes") or []) if str(r).strip()]
    return "ar" in locales and any(_is_arabic_route(r) for r in required_routes)


def _extract_first_json_code_block(lines: list[tuple[int, str]]) -> tuple[int | None, str | None]:
    in_json = False
    start_line: int | None = None
    buf: list[str] = []
    for line_no, raw in lines:
        s = raw.strip()
        if not in_json:
            if s.startswith("```") and any(tag in s.lower() for tag in ("json", "ld+json")):
                in_json = True
                start_line = line_no
                buf = []
        else:
            if s.startswith("```"):
                return start_line, "\n".join(buf)
            buf.append(raw)
    return None, None


def _iter_dicts(obj: Any) -> Iterator[dict[str, Any]]:
    """Yield every dict object recursively within a JSON structure."""
    if isinstance(obj, dict):
        yield obj
        for value in obj.values():
            yield from _iter_dicts(value)
    elif isinstance(obj, list):
        for item in obj:
            yield from _iter_dicts(item)


def _has_jsonld_type(node: dict[str, Any], target_type: str) -> bool:
    t = node.get("@type")
    if isinstance(t, str):
        return t.strip() == target_type
    if isinstance(t, list):
        return any(isinstance(item, str) and item.strip() == target_type for item in t)
    return False


def _find_dicts_with_type(obj: Any, target_type: str) -> list[dict[str, Any]]:
    """Recursively find all dicts anywhere in obj whose @type matches target_type."""
    return [d for d in _iter_dicts(obj) if _has_jsonld_type(d, target_type)]


def _collect_jsonld_types(graph: list[Any]) -> set[str]:
    found: set[str] = set()
    for node in graph:
        if not isinstance(node, dict):
            continue
        t = node.get("@type")
        if isinstance(t, str) and t.strip():
            found.add(t.strip())
        elif isinstance(t, list):
            for item in t:
                if isinstance(item, str) and item.strip():
                    found.add(item.strip())
    return found


def _has_valid_price_value(val: Any) -> bool:
    if isinstance(val, bool):
        return False
    if isinstance(val, (int, float)):
        return math.isfinite(val) and val >= 0
    if isinstance(val, str):
        return bool(val.strip())
    return False


def _parse_metadata_tables(lines: list[tuple[int, str]]) -> list[list[tuple[int, list[str]]]]:
    """Parse Markdown tables while preserving escaped pipes (\\|) inside cells."""
    tables: list[list[tuple[int, list[str]]]] = []
    current_table: list[tuple[int, list[str]]] = []
    in_code_block = False

    for idx, line in lines:
        s = line.strip()
        if s.startswith("```"):
            in_code_block = not in_code_block
            continue
        if in_code_block:
            continue
        if s.startswith("|") and s.endswith("|") and "|" in s[1:-1]:
            inner = s[1:-1]
            raw_cells = [c.strip().replace(r"\|", "|") for c in re.split(r"(?<!\\)\|", inner)]
            if all(re.fullmatch(r"[:\-\s]+", c) or not c for c in raw_cells):
                continue
            current_table.append((idx, raw_cells))
        else:
            if current_table:
                tables.append(current_table)
                current_table = []
    if current_table:
        tables.append(current_table)
    return tables


def _verify_metadata_table(
    lines: list[tuple[int, str]],
    bindings: dict[str, Any],
) -> list[str]:
    issues: list[str] = []
    tables = _parse_metadata_tables(lines)
    if not tables:
        return ["Section 2: missing Markdown metadata table"]

    target_table = None
    for tbl in tables:
        if not tbl:
            continue
        header_lower = [KIT_COMMON.strip_md(c).lower() for c in tbl[0][1]]
        if len(header_lower) >= 6 and any("route" in h for h in header_lower) and any("title" in h for h in header_lower):
            target_table = tbl
            break
    if target_table is None:
        target_table = tables[0]

    data_rows = target_table[1:] if len(target_table) > 1 else []
    required_routes = [str(r).strip() for r in (bindings.get("required_routes") or []) if str(r).strip()]
    canonical_origin = str(bindings.get("canonical_origin") or "").strip().rstrip("/")

    if not data_rows:
        return ["Section 2: metadata table has 0 route rows"]

    seen_routes: set[str] = set()
    parsed_rows: list[tuple[str, str, str]] = []
    hreflang_texts: list[str] = []
    for line_no, cells in data_rows:
        if len(cells) < 6:
            issues.append(
                f"Section 2:{line_no}: expected at least 6 columns "
                "(Route | Title | Title Chars | Meta Description | Desc Chars | Canonical URL)"
            )
            continue
        route = KIT_COMMON.strip_md(cells[0])
        title = KIT_COMMON.strip_md(cells[1])
        reported_t_chars = KIT_COMMON.strip_md(cells[2])
        desc = KIT_COMMON.strip_md(cells[3])
        reported_d_chars = KIT_COMMON.strip_md(cells[4])
        canonical = KIT_COMMON.strip_md(cells[5])
        if len(cells) >= 7:
            hreflang_texts.append(KIT_COMMON.strip_md(cells[6]))

        if not route:
            issues.append(f"Section 2:{line_no}: empty Route cell")
        elif route in seen_routes:
            issues.append(f"Section 2:{line_no}: duplicate Route '{route}' in metadata table")
        else:
            seen_routes.add(route)
            parsed_rows.append((route, title, desc))

        t_len = len(title)
        if not (TITLE_MIN <= t_len <= TITLE_MAX):
            issues.append(
                f"Section 2:{line_no} ({route}): <title> length {t_len} outside {TITLE_MIN}-{TITLE_MAX} chars -> '{title}'"
            )
        if reported_t_chars.isdigit() and int(reported_t_chars) != t_len:
            issues.append(
                f"Section 2:{line_no} ({route}): reported Title Chars ({reported_t_chars}) != actual length ({t_len})"
            )

        d_len = len(desc)
        if not (DESC_MIN <= d_len <= DESC_MAX):
            issues.append(
                f"Section 2:{line_no} ({route}): <meta description> length {d_len} outside {DESC_MIN}-{DESC_MAX} chars"
            )
        if reported_d_chars.isdigit() and int(reported_d_chars) != d_len:
            issues.append(
                f"Section 2:{line_no} ({route}): reported Desc Chars ({reported_d_chars}) != actual length ({d_len})"
            )

        if canonical_origin:
            if not (canonical == canonical_origin or canonical.startswith(canonical_origin + "/")):
                issues.append(
                    f"Section 2:{line_no} ({route}): Canonical URL '{canonical}' does not start with canonical_origin '{canonical_origin}'"
                )

    if required_routes:
        for req in required_routes:
            if req not in seen_routes:
                issues.append(f"Section 2: missing required route '{req}' from bindings.required_routes")
    elif len(seen_routes) < 1:
        issues.append("Section 2: expected at least 1 route row")

    locales = [str(loc).strip() for loc in (bindings.get("locales") or []) if str(loc).strip()]
    if len(locales) > 1:
        joined_hreflang = " ".join(hreflang_texts) + "\n" + "\n".join(line for _, line in lines)
        for loc in locales:
            if not re.search(rf"(?<!\w){re.escape(loc)}(?!\w)", joined_hreflang, re.IGNORECASE):
                issues.append(f"Section 2: missing configured locale '{loc}' in hreflang specification")

    if _requires_bilingual_arabic(bindings):
        ar_rows = [(r, t, d) for r, t, d in parsed_rows if _is_arabic_route(r)]
        if not ar_rows:
            issues.append("Section 2: bilingual Arabic parity requires a metadata row for an '/ar' route")
        elif not any(ARABIC_SCRIPT_RE.search(t) and ARABIC_SCRIPT_RE.search(d) for _, t, d in ar_rows):
            issues.append(
                "Section 2: '/ar' route metadata row must contain Arabic script in both Title and Meta Description"
            )

    return issues


def _verify_geo_blocks(
    lines: list[tuple[int, str]],
    bindings: dict[str, Any],
) -> list[str]:
    issues: list[str] = []
    expected_count = int(bindings.get("geo_block_count", DEFAULT_GEO_BLOCK_COUNT))
    blocks = KIT_COMMON.extract_blockquotes(lines)
    if len(blocks) < expected_count:
        issues.append(
            f"Section 4: expected at least {expected_count} GEO blockquote blocks, found {len(blocks)}"
        )
    has_valid_arabic_block = False
    for idx, (line_no, text) in enumerate(blocks, start=1):
        words = len(text.split())
        in_budget = GEO_WORDS_MIN <= words <= GEO_WORDS_MAX
        if not in_budget:
            issues.append(
                f"Section 4:{line_no} (GEO block #{idx}): word count {words} outside {GEO_WORDS_MIN}-{GEO_WORDS_MAX} words"
            )
        if in_budget and ARABIC_SCRIPT_RE.search(text):
            has_valid_arabic_block = True

    if _requires_bilingual_arabic(bindings) and not has_valid_arabic_block:
        issues.append(
            f"Section 4: bilingual Arabic parity requires at least one {GEO_WORDS_MIN}-{GEO_WORDS_MAX} word GEO blockquote with Arabic script"
        )
    return issues


def _verify_jsonld(
    lines: list[tuple[int, str]],
    bindings: dict[str, Any],
) -> list[str]:
    issues: list[str] = []
    start_line, raw_json = _extract_first_json_code_block(lines)
    if raw_json is None:
        return ["Section 5: missing ```json fenced code block for @graph JSON-LD"]

    try:
        payload = json.loads(raw_json)
    except json.JSONDecodeError as exc:
        return [f"Section 5:{start_line}: invalid JSON-LD ({exc})"]

    if not isinstance(payload, dict):
        return [f"Section 5:{start_line}: JSON-LD root must be a JSON object"]

    graph = payload.get("@graph")
    if not isinstance(graph, list):
        return [f"Section 5:{start_line}: JSON-LD missing '@graph' array"]

    if len(graph) < 3 or not all(isinstance(node, dict) for node in graph):
        issues.append(
            f"Section 5:{start_line}: '@graph' must contain >= 3 JSON objects (found {len(graph)})"
        )

    found_types = _collect_jsonld_types(graph)
    req_raw = bindings.get("required_jsonld_types")
    required_types = [str(t).strip() for t in req_raw if str(t).strip()] if req_raw else list(DEFAULT_REQUIRED_JSONLD_TYPES)
    forbidden_types = [str(t).strip() for t in (bindings.get("forbidden_jsonld_types") or []) if str(t).strip()]

    for req_t in required_types:
        if req_t not in found_types:
            issues.append(
                f"Section 5:{start_line}: JSON-LD @graph missing required @type '{req_t}' (found {sorted(found_types)})"
            )
    for forb_t in forbidden_types:
        if forb_t in found_types:
            issues.append(
                f"Section 5:{start_line}: JSON-LD @graph contains forbidden @type '{forb_t}'"
            )

    if bindings.get("require_price_specification"):
        price_specs = _find_dicts_with_type(graph, "PriceSpecification")
        if not price_specs:
            issues.append(
                f"Section 5:{start_line}: JSON-LD @graph missing 'PriceSpecification' required by bindings.require_price_specification"
            )
        else:
            valid_spec = any(
                isinstance(spec.get("priceCurrency"), str)
                and bool(spec["priceCurrency"].strip())
                and (_has_valid_price_value(spec.get("minPrice")) or _has_valid_price_value(spec.get("price")))
                for spec in price_specs
            )
            if not valid_spec:
                issues.append(
                    f"Section 5:{start_line}: PriceSpecification must include non-empty 'priceCurrency' and numeric/string 'minPrice' or 'price'"
                )

    if bindings.get("require_same_as"):
        org_nodes = _find_dicts_with_type(graph, "Organization") + _find_dicts_with_type(graph, "ProfessionalService")
        if not org_nodes:
            issues.append(
                f"Section 5:{start_line}: require_same_as enabled but @graph has no 'Organization' or 'ProfessionalService' node"
            )
        else:
            valid_same_as = any(
                isinstance(node.get("sameAs"), list)
                and len(node["sameAs"]) > 0
                and all(isinstance(u, str) and bool(HTTP_URL_RE.match(u.strip())) for u in node["sameAs"])
                for node in org_nodes
            )
            if not valid_same_as:
                issues.append(
                    f"Section 5:{start_line}: Organization/ProfessionalService node missing non-empty 'sameAs' list of valid http(s):// URLs"
                )

    return issues


def _verify_handoff_rules(
    lines: list[tuple[int, str]],
    bindings: dict[str, Any],
) -> list[str]:
    issues: list[str] = []
    if not bindings.get("require_ai_crawler_handoff"):
        return issues

    sec_text = "\n".join(line for _, line in lines)
    if "llms.txt" not in sec_text.lower():
        issues.append("Section 6: require_ai_crawler_handoff enabled but '/llms.txt' specification is missing")
    for bot in ("OAI-SearchBot", "PerplexityBot"):
        if bot not in sec_text:
            issues.append(f"Section 6: require_ai_crawler_handoff enabled but AI crawler '{bot}' is not referenced")
    return issues


def verify_deliverable_text(
    text: str,
    *,
    filename: str = "seo-and-market-brief.md",
    bindings: dict[str, Any] | None = None,
) -> list[str]:
    cfg = bindings or {}
    issues, sections = KIT_COMMON.check_h2_headings(text, REQUIRED_H2, filename, require_prose=True)

    if SEC_2 in sections:
        issues.extend(_verify_metadata_table(sections[SEC_2], cfg))
    if SEC_4 in sections:
        issues.extend(_verify_geo_blocks(sections[SEC_4], cfg))
    if SEC_5 in sections:
        issues.extend(_verify_jsonld(sections[SEC_5], cfg))
    if SEC_6 in sections:
        issues.extend(_verify_handoff_rules(sections[SEC_6], cfg))
    if SEC_7 in sections:
        issues.extend(
            KIT_COMMON.check_self_audit_table(
                sections[SEC_7],
                min_rows=7,
                section_label="Section 7 (Mandatory Self-Audit Checklist)",
            )
        )

    issues.extend(KIT_COMMON.find_unfilled_slots(text, filename=filename))
    issues.extend(PROSE_AUDIT.audit_text(text, filename=filename, bindings=cfg))
    return issues


def cmd_kit() -> int:
    issues = KIT_COMMON.validate_role_kit(
        KIT_DIR,
        expected_skills=EXPECTED_SKILLS,
        expected_templates={"seo-and-market-brief.template.md": REQUIRED_H2},
    )

    kw_script = KIT_DIR / "scripts" / "keyword_suggest.py"
    if not kw_script.is_file():
        issues.append(f"Missing script: {kw_script}")

    audit_files = [
        KIT_DIR / "ROLE.md",
        KIT_DIR / "START-SESSION.md",
        KIT_DIR / "templates" / "seo-and-market-brief.template.md",
        *[KIT_DIR / "skills" / s / "SKILL.md" for s in EXPECTED_SKILLS],
    ]
    for path in audit_files:
        if path.is_file():
            issues.extend(PROSE_AUDIT.audit_file(path))

    if kw_script.is_file():
        proc = subprocess.run(
            [sys.executable, str(kw_script), "--self-test"],
            capture_output=True,
            text=True,
            check=False,
        )
        if proc.returncode != 0:
            issues.append(f"keyword_suggest.py --self-test failed: {(proc.stderr or proc.stdout).strip()}")

    if issues:
        print(f"FAIL: seo_audit.py --kit found {len(issues)} issue(s):")
        for item in issues:
            print(f"FAIL: {item}")
        return 1

    print(
        "PASS: seo_audit.py --kit verified ROLE.md (<60L), START-SESSION.md, 3 SKILL.md files, "
        "7-section template, prose cleanliness, and keyword_suggest.py --self-test."
    )
    return 0


def cmd_context(project_dir: Path, config_path: str | None) -> int:
    print(f"# Stage 1 Role 1.2 Context Summary — {project_dir}")
    print("")
    inputs = [
        project_dir / "docs" / "positioning-brief.md",
        project_dir / ".agents" / "product-marketing.md",
        project_dir / "docs" / "context" / "project-digest.md",
    ]
    for path in inputs:
        rel = path.relative_to(project_dir)
        if not path.is_file():
            print(f"- `{rel}`: MISSING")
            continue
        text = path.read_text(encoding="utf-8", errors="replace")
        line_count = len(text.splitlines())
        h2_order, _ = KIT_COMMON.split_h2_sections(text)
        preview = ", ".join(h2_order[:6]) if h2_order else "(no H2 headings)"
        print(f"- `{rel}`: PRESENT ({line_count} lines) | H2s: {preview}")

    try:
        bindings = KIT_COMMON.load_project_bindings(project_dir, config_path)
    except (OSError, ValueError) as exc:
        print(f"FAIL: Cannot load bindings: {exc}", file=sys.stderr)
        return 1

    print("")
    if bindings:
        print("## Active Project Bindings")
        keys = (
            "project_name",
            "canonical_origin",
            "entity_type",
            "voice_mode",
            "forbid_first_person_singular",
            "required_routes",
            "required_jsonld_types",
            "forbidden_jsonld_types",
            "geo_block_count",
            "locales",
            "forbidden_tokens",
            "require_bilingual_geo",
            "require_price_specification",
            "require_same_as",
            "require_ai_crawler_handoff",
        )
        for k in keys:
            if k in bindings:
                print(f"- `{k}`: `{json.dumps(bindings[k], ensure_ascii=False)}`")
    else:
        print("## Active Project Bindings")
        print(
            "- None found (`.kepler/stage-1-bindings.json` absent). Using universal defaults: "
            f"geo_block_count={DEFAULT_GEO_BLOCK_COUNT}, required_jsonld_types={list(DEFAULT_REQUIRED_JSONLD_TYPES)}, "
            "required_routes>=1."
        )
    return 0


def cmd_verify(target_raw: str, project_dir: Path, config_path: str | None) -> int:
    target = KIT_COMMON.resolve_input_path(target_raw, project_dir)
    if not target.is_file():
        print(f"FAIL: Deliverable not found: {target}", file=sys.stderr)
        return 1
    try:
        bindings = KIT_COMMON.load_project_bindings(project_dir, config_path)
    except (OSError, ValueError) as exc:
        print(f"FAIL: {exc}", file=sys.stderr)
        return 1

    text = target.read_text(encoding="utf-8")
    issues = verify_deliverable_text(text, filename=target.name, bindings=bindings)
    if issues:
        print(f"FAIL: seo_audit.py --verify found {len(issues)} issue(s) in {target.name}:")
        for item in issues:
            print(f"FAIL: {item}")
        return 1

    print(f"PASS: seo_audit.py --verify passed all structural, metadata, GEO, JSON-LD, self-audit, and prose checks for {target.name}.")
    return 0


def _build_sample_brief(
    *,
    origin: str = "https://acmeops.example",
    routes: list[tuple[str, str, str]] | None = None,
    geo_words: int = 48,
    extra_graph_type: str = "Organization",
    include_ar_geo: bool = False,
    ar_geo_words: int = 46,
    include_price_spec: bool = False,
    price_currency: str | None = "USD",
    min_price: Any = 4500,
    include_same_as: bool = False,
    same_as_urls: list[str] | None = None,
    include_ai_handoff: bool = False,
) -> str:
    if routes is None:
        routes = [
            (
                "/",
                "Automated Invoice Reconciliation Software | AcmeOps",
                "AcmeOps automates month-end invoice reconciliation for finance teams, cutting close time from 4 hours to 5 minutes with decimal checks.",
            ),
            (
                "/pricing",
                "Transparent Invoice Automation Pricing Plans | AcmeOps",
                "Compare AcmeOps Starter, Pro, and Team plans for automated invoice reconciliation with fixed monthly pricing and 14-day guided onboarding.",
            ),
        ]

    def _make_geo_block(idx: int, word_count: int) -> str:
        base = (
            f"AcmeOps block {idx} explains how finance teams reconcile multi-currency invoices in five minutes "
            "using deterministic decimal checks, automated ledger matching, and audit-ready CSV exports."
        ).split()
        filler = [f"metric{i}" for i in range(1, 80)]
        words = (base + filler)[:word_count]
        return " ".join(words)

    def _make_ar_geo_block(word_count: int) -> str:
        base = (
            "تقدم منصة أكمي أوبس حلول مطابقة الفواتير المالية متعددة العملات للفرق المالية والشركات الناشئة في السعودية ومصر "
            "خلال خمس دقائق فقط بأسعار تبدأ من أربعة آلاف وخمسمائة دولار شهريا مع تقارير تدقيق فورية ودقة حسابية موثقة بالكامل."
        ).split()
        filler = [f"بند{i}" for i in range(1, 80)]
        words = (base + filler)[:word_count]
        return " ".join(words)

    route_rows = []
    for route, title, desc in routes:
        canon = f"{origin}/" if route == "/" else f"{origin}{route}"
        safe_title = title.replace("|", r"\|")
        safe_desc = desc.replace("|", r"\|")
        hreflang = "ar" if _is_arabic_route(route) else "en, ar"
        route_rows.append(
            f"| `{route}` | {safe_title} | {len(title)} | {safe_desc} | {len(desc)} | {canon} | `{hreflang}` |"
        )

    geo_sections = []
    for i in range(1, 6):
        geo_sections.append(f"### Block {i}\n\n> {_make_geo_block(i, geo_words)}\n")
    if include_ar_geo:
        geo_sections.append(f"### Block 6 (AR)\n\n> {_make_ar_geo_block(ar_geo_words)}\n")

    org_node: dict[str, Any] = {
        "@type": extra_graph_type,
        "@id": f"{origin}/#entity",
        "name": "AcmeOps",
        "url": f"{origin}/",
    }
    if include_same_as:
        org_node["sameAs"] = (
            same_as_urls
            if same_as_urls is not None
            else [
                "https://github.com/acmeops",
                "https://www.linkedin.com/company/acmeops",
            ]
        )

    graph_nodes: list[dict[str, Any]] = [
        org_node,
        {
            "@type": "WebSite",
            "@id": f"{origin}/#website",
            "name": "AcmeOps",
            "url": f"{origin}/",
            "publisher": {"@id": f"{origin}/#entity"},
        },
        {
            "@type": "FAQPage",
            "@id": f"{origin}/#faq",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": "How fast does AcmeOps reconcile monthly invoices?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "AcmeOps completes standard monthly ledger reconciliation in under five minutes.",
                    },
                }
            ],
        },
    ]

    if include_price_spec:
        price_spec_obj: dict[str, Any] = {
            "@type": "PriceSpecification",
            "minPrice": min_price,
        }
        if price_currency:
            price_spec_obj["priceCurrency"] = price_currency
        graph_nodes.append(
            {
                "@type": "Service",
                "@id": f"{origin}/#service",
                "name": "AcmeOps Automation Sprint",
                "provider": {"@id": f"{origin}/#entity"},
                "offers": {
                    "@type": "Offer",
                    "priceCurrency": price_currency or "USD",
                    "priceSpecification": price_spec_obj,
                },
            }
        )

    graph_json = json.dumps(
        {
            "@context": "https://schema.org",
            "@graph": graph_nodes,
        },
        indent=2,
        ensure_ascii=False,
    )

    sec_6_body = "- Preserve exact metadata character budgets and verbatim GEO answer blocks during copywriting.\n"
    if include_ai_handoff:
        sec_6_body += (
            f"- Publish bilingual `/llms.txt` at `{origin}/llms.txt` and configure `robots.txt` directives for "
            "`OAI-SearchBot`, `GPTBot`, `PerplexityBot`, `ClaudeBot`, and `Google-Extended`.\n"
        )

    return (
        "# SEO & Market Research Brief\n\n"
        f"## {SEC_1}\n\n"
        "Seed queries harvested with `keyword_suggest.py` mapped commercial and comparison intent to core routes.\n\n"
        f"## {SEC_2}\n\n"
        "| Route | Title | Title Chars | Meta Description | Desc Chars | Canonical URL | hreflang |\n"
        "| --- | --- | --- | --- | --- | --- | --- |\n"
        + "\n".join(route_rows)
        + "\n\n"
        f"## {SEC_3}\n\n"
        "- **H1:** Automated Invoice Reconciliation for Finance Teams\n"
        "  - **H2:** Deterministic Decimal Matching\n"
        "    - **H3:** Audit-Ready Ledger Exports\n\n"
        f"## {SEC_4}\n\n"
        + "\n".join(geo_sections)
        + "\n"
        f"## {SEC_5}\n\n"
        "```json\n"
        f"{graph_json}\n"
        "```\n\n"
        f"## {SEC_6}\n\n"
        + sec_6_body
        + "\n"
        f"## {SEC_7}\n\n"
        "| Check | Requirement | Evidence | Status |\n"
        "| --- | --- | --- | --- |\n"
        "| 1 | All 7 H2 sections present | Checked | PASS |\n"
        "| 2 | Keyword research grounded | Checked | PASS |\n"
        "| 3 | Title and meta budgets met | Checked | PASS |\n"
        "| 4 | Canonical and routes verified | Checked | PASS |\n"
        "| 5 | GEO blocks 40-60 words | Checked | PASS |\n"
        "| 6 | JSON-LD @graph valid | Checked | PASS |\n"
        "| 7 | Prose audit clean | Checked | PASS |\n"
    )


def run_self_test() -> int:
    ar_title = "منصة أكمي أوبس لمطابقة الفواتير المالية للفرق | AcmeOps"  # 56 chars
    ar_desc = (
        "منصة أكمي أوبس تساعد الفرق المالية في السعودية ومصر على مطابقة الفواتير متعددة العملات خلال خمس دقائق بدقة حسابية وتقارير تدقيق فورية جاهزة."
    )  # 144 chars
    assert TITLE_MIN <= len(ar_title) <= TITLE_MAX, f"Test fixture ar_title len={len(ar_title)}"
    assert DESC_MIN <= len(ar_desc) <= DESC_MAX, f"Test fixture ar_desc len={len(ar_desc)}"

    en_routes = [
        (
            "/",
            "Automated Invoice Reconciliation Software | AcmeOps",
            "AcmeOps automates month-end invoice reconciliation for finance teams, cutting close time from 4 hours to 5 minutes with decimal checks.",
        ),
        (
            "/pricing",
            "Transparent Invoice Automation Pricing Plans | AcmeOps",
            "Compare AcmeOps Starter, Pro, and Team plans for automated invoice reconciliation with fixed monthly pricing and 14-day guided onboarding.",
        ),
    ]
    bilingual_routes = en_routes + [("/ar", ar_title, ar_desc)]

    with tempfile.TemporaryDirectory() as tmp:
        root = Path(tmp)
        brief_path = root / "docs" / "seo-and-market-brief.md"
        brief_path.parent.mkdir(parents=True, exist_ok=True)

        # 1. Default mode (no bindings) passes
        valid_default = _build_sample_brief()
        brief_path.write_text(valid_default, encoding="utf-8")
        errs = verify_deliverable_text(valid_default, filename=brief_path.name, bindings={})
        assert errs == [], f"Expected default valid brief to pass, got: {errs}"

        # 2. Strict SaaS / studio bindings pass
        strict_bindings = {
            "project_name": "AcmeOps",
            "canonical_origin": "https://acmeops.example",
            "voice_mode": "brand_plural",
            "forbidden_tokens": ["FounderSoloName"],
            "required_routes": ["/", "/pricing"],
            "required_jsonld_types": ["Organization", "WebSite", "FAQPage"],
            "forbidden_jsonld_types": ["Person"],
            "geo_block_count": 5,
        }
        kepler_dir = root / ".kepler"
        kepler_dir.mkdir(parents=True, exist_ok=True)
        (kepler_dir / "stage-1-bindings.json").write_text(json.dumps(strict_bindings), encoding="utf-8")
        loaded = KIT_COMMON.load_project_bindings(root)
        errs_strict = verify_deliverable_text(valid_default, filename=brief_path.name, bindings=loaded)
        assert errs_strict == [], f"Expected strict valid brief to pass, got: {errs_strict}"

        # 3. Full upgraded bilingual + PriceSpecification + sameAs + AI crawler handoff pass
        full_bindings = {
            **strict_bindings,
            "locales": ["en", "ar"],
            "required_routes": ["/", "/pricing", "/ar"],
            "require_bilingual_geo": True,
            "require_price_specification": True,
            "require_same_as": True,
            "require_ai_crawler_handoff": True,
        }
        valid_full = _build_sample_brief(
            routes=bilingual_routes,
            include_ar_geo=True,
            include_price_spec=True,
            include_same_as=True,
            include_ai_handoff=True,
        )
        errs_full = verify_deliverable_text(valid_full, filename=brief_path.name, bindings=full_bindings)
        assert errs_full == [], f"Expected full bilingual/schema/handoff brief to pass, got: {errs_full}"

        # Also verify locale+route auto-trigger (without explicit require_bilingual_geo flag)
        auto_ar_bindings = {
            "canonical_origin": "https://acmeops.example",
            "locales": ["en", "ar"],
            "required_routes": ["/", "/ar"],
        }
        errs_auto_ar = verify_deliverable_text(valid_full, bindings=auto_ar_bindings)
        assert errs_auto_ar == [], f"Expected auto bilingual trigger brief to pass, got: {errs_auto_ar}"

        # 3b. False-positive guard: /articles with locales=["en", "ar"] must NOT trigger Arabic parity
        articles_routes = en_routes[:1] + [
            (
                "/articles",
                "Invoice Automation Engineering Articles & Guides | AcmeOps",
                "Read practical engineering guides from AcmeOps on decimal reconciliation, ERP ledger syncing, and month-end close automation workflows.",
            )
        ]
        articles_brief = _build_sample_brief(routes=articles_routes, include_ar_geo=False)
        errs_articles = verify_deliverable_text(
            articles_brief,
            bindings={
                "canonical_origin": "https://acmeops.example",
                "locales": ["en", "ar"],
                "required_routes": ["/", "/articles"],
            },
        )
        assert errs_articles == [], f"Expected /articles NOT to trigger Arabic parity failure, got: {errs_articles}"

        # 3c. Sub-route /ar/services MUST trigger and pass when Arabic metadata + GEO block are present
        ar_services_routes = en_routes[:1] + [("/ar/services", ar_title, ar_desc)]
        ar_services_brief = _build_sample_brief(routes=ar_services_routes, include_ar_geo=True)
        errs_ar_services = verify_deliverable_text(
            ar_services_brief,
            bindings={
                "canonical_origin": "https://acmeops.example",
                "locales": ["en", "ar"],
                "required_routes": ["/", "/ar/services"],
            },
        )
        assert errs_ar_services == [], f"Expected /ar/services bilingual brief to pass, got: {errs_ar_services}"

        # 3d. PriceSpecification edge cases: minPrice=0 and minPrice="$300" pass; minPrice=-1 fails
        for ok_price in (0, "$300"):
            price_ok_brief = _build_sample_brief(
                routes=bilingual_routes,
                include_ar_geo=True,
                include_price_spec=True,
                min_price=ok_price,
                include_same_as=True,
                include_ai_handoff=True,
            )
            errs_price_ok = verify_deliverable_text(price_ok_brief, bindings=full_bindings)
            assert errs_price_ok == [], f"Expected minPrice={ok_price!r} to pass, got: {errs_price_ok}"

        neg_price_brief = _build_sample_brief(
            routes=bilingual_routes,
            include_ar_geo=True,
            include_price_spec=True,
            min_price=-1,
            include_same_as=True,
            include_ai_handoff=True,
        )
        errs_neg_price = verify_deliverable_text(neg_price_brief, bindings=full_bindings)
        assert any("PriceSpecification must include non-empty 'priceCurrency'" in e for e in errs_neg_price), (
            f"Expected minPrice=-1 to fail PriceSpecification validation, got: {errs_neg_price}"
        )

        # 4. Negative: bad title length (< 45 chars)
        bad_title = _build_sample_brief(
            routes=[
                (
                    "/",
                    "Short Title",
                    "AcmeOps automates month-end invoice reconciliation for finance teams, cutting close time from 4 hours to 5 minutes with decimal checks.",
                )
            ]
        )
        errs_t = verify_deliverable_text(bad_title, bindings={})
        assert any("<title> length" in e for e in errs_t), f"Expected title length error, got: {errs_t}"

        # 5. Negative: bad meta description length (< 135 chars)
        bad_desc = _build_sample_brief(
            routes=[
                (
                    "/",
                    "Automated Invoice Reconciliation Software | AcmeOps",
                    "Too short description.",
                )
            ]
        )
        errs_d = verify_deliverable_text(bad_desc, bindings={})
        assert any("<meta description> length" in e for e in errs_d), f"Expected desc length error, got: {errs_d}"

        # 6. Negative: bad GEO word count (25 words)
        bad_geo = _build_sample_brief(geo_words=25)
        errs_g = verify_deliverable_text(bad_geo, bindings={})
        assert any("word count 25 outside 40-60" in e for e in errs_g), f"Expected GEO word count error, got: {errs_g}"

        # 7. Negative: forbidden JSON-LD type (Person)
        bad_jsonld = _build_sample_brief(extra_graph_type="Person")
        errs_j = verify_deliverable_text(bad_jsonld, bindings=strict_bindings)
        assert any("forbidden @type 'Person'" in e for e in errs_j), f"Expected forbidden JSON-LD error, got: {errs_j}"

        # 8. Negative: missing required route
        missing_route = _build_sample_brief(routes=en_routes[:1])
        errs_r = verify_deliverable_text(missing_route, bindings=strict_bindings)
        assert any("missing required route '/pricing'" in e for e in errs_r), f"Expected missing route error, got: {errs_r}"

        # 9. Negative: wrong canonical origin
        wrong_origin = _build_sample_brief(origin="https://wrongdomain.example")
        errs_o = verify_deliverable_text(wrong_origin, bindings=strict_bindings)
        assert any("does not start with canonical_origin" in e for e in errs_o), f"Expected canonical origin error, got: {errs_o}"

        # 10. Negative: bilingual Arabic /ar route has English-only metadata
        en_only_ar_route = en_routes + [
            (
                "/ar",
                "Automated Invoice Reconciliation Software | AcmeOps",
                "AcmeOps automates month-end invoice reconciliation for finance teams, cutting close time from 4 hours to 5 minutes with decimal checks.",
            )
        ]
        bad_ar_meta = _build_sample_brief(
            routes=en_only_ar_route,
            include_ar_geo=True,
            include_price_spec=True,
            include_same_as=True,
            include_ai_handoff=True,
        )
        errs_ar_meta = verify_deliverable_text(bad_ar_meta, bindings=full_bindings)
        assert any("Arabic script in both Title and Meta Description" in e for e in errs_ar_meta), (
            f"Expected Arabic metadata error, got: {errs_ar_meta}"
        )

        # 11. Negative: bilingual Arabic /ar route missing completely when require_bilingual_geo=True
        missing_ar_route = _build_sample_brief(
            routes=en_routes,
            include_ar_geo=True,
            include_price_spec=True,
            include_same_as=True,
            include_ai_handoff=True,
        )
        errs_no_ar_row = verify_deliverable_text(
            missing_ar_route,
            bindings={**strict_bindings, "require_bilingual_geo": True},
        )
        assert any("requires a metadata row for an '/ar' route" in e for e in errs_no_ar_row), (
            f"Expected missing /ar route row error, got: {errs_no_ar_row}"
        )

        # 12. Negative: missing Arabic GEO blockquote & wrong word count on Arabic GEO blockquote
        missing_ar_geo = _build_sample_brief(
            routes=bilingual_routes,
            include_ar_geo=False,
            include_price_spec=True,
            include_same_as=True,
            include_ai_handoff=True,
        )
        errs_no_ar_geo = verify_deliverable_text(missing_ar_geo, bindings=full_bindings)
        assert any("bilingual Arabic parity requires at least one 40-60 word GEO blockquote" in e for e in errs_no_ar_geo), (
            f"Expected missing Arabic GEO block error, got: {errs_no_ar_geo}"
        )

        short_ar_geo = _build_sample_brief(
            routes=bilingual_routes,
            include_ar_geo=True,
            ar_geo_words=22,
            include_price_spec=True,
            include_same_as=True,
            include_ai_handoff=True,
        )
        errs_short_ar_geo = verify_deliverable_text(short_ar_geo, bindings=full_bindings)
        assert any("word count 22 outside 40-60" in e for e in errs_short_ar_geo), (
            f"Expected short Arabic GEO word count error, got: {errs_short_ar_geo}"
        )
        assert any("bilingual Arabic parity requires at least one 40-60 word GEO blockquote" in e for e in errs_short_ar_geo), (
            f"Expected Arabic parity error when Arabic block is 22 words, got: {errs_short_ar_geo}"
        )

        # 13. Negative: PriceSpecification missing & PriceSpecification missing priceCurrency
        no_price_spec = _build_sample_brief(
            routes=bilingual_routes,
            include_ar_geo=True,
            include_price_spec=False,
            include_same_as=True,
            include_ai_handoff=True,
        )
        errs_no_ps = verify_deliverable_text(no_price_spec, bindings=full_bindings)
        assert any("missing 'PriceSpecification'" in e for e in errs_no_ps), (
            f"Expected missing PriceSpecification error, got: {errs_no_ps}"
        )

        no_currency = _build_sample_brief(
            routes=bilingual_routes,
            include_ar_geo=True,
            include_price_spec=True,
            price_currency=None,
            include_same_as=True,
            include_ai_handoff=True,
        )
        errs_no_curr = verify_deliverable_text(no_currency, bindings=full_bindings)
        assert any("PriceSpecification must include non-empty 'priceCurrency'" in e for e in errs_no_curr), (
            f"Expected missing priceCurrency error, got: {errs_no_curr}"
        )

        # 14. Negative: sameAs missing & invalid sameAs URL
        no_same_as = _build_sample_brief(
            routes=bilingual_routes,
            include_ar_geo=True,
            include_price_spec=True,
            include_same_as=False,
            include_ai_handoff=True,
        )
        errs_no_sa = verify_deliverable_text(no_same_as, bindings=full_bindings)
        assert any("missing non-empty 'sameAs' list" in e for e in errs_no_sa), (
            f"Expected missing sameAs error, got: {errs_no_sa}"
        )

        bad_same_as = _build_sample_brief(
            routes=bilingual_routes,
            include_ar_geo=True,
            include_price_spec=True,
            include_same_as=True,
            same_as_urls=["not-a-valid-url"],
            include_ai_handoff=True,
        )
        errs_bad_sa = verify_deliverable_text(bad_same_as, bindings=full_bindings)
        assert any("missing non-empty 'sameAs' list" in e for e in errs_bad_sa), (
            f"Expected invalid sameAs URL error, got: {errs_bad_sa}"
        )

        # 15. Negative: AI crawler & /llms.txt handoff missing in Section 6
        no_ai_handoff = _build_sample_brief(
            routes=bilingual_routes,
            include_ar_geo=True,
            include_price_spec=True,
            include_same_as=True,
            include_ai_handoff=False,
        )
        errs_no_ai = verify_deliverable_text(no_ai_handoff, bindings=full_bindings)
        assert any("'/llms.txt' specification is missing" in e for e in errs_no_ai), (
            f"Expected missing llms.txt error, got: {errs_no_ai}"
        )
        assert any("OAI-SearchBot" in e for e in errs_no_ai), f"Expected missing OAI-SearchBot error, got: {errs_no_ai}"
        assert any("PerplexityBot" in e for e in errs_no_ai), f"Expected missing PerplexityBot error, got: {errs_no_ai}"

    print(
        "PASS: seo_audit.py --self-test passed (default mode, strict bindings, full bilingual/schema/AI-handoff, "
        "and negative checks for title, description, GEO words, forbidden JSON-LD, missing route, canonical origin, "
        "Arabic parity, PriceSpecification, sameAs, and /llms.txt crawler handoff)."
    )
    return 0


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(
        description="Preflight, context summary, and verification tool for Stage 1 Role 1.2 (seo-and-market-researcher)."
    )
    mode = parser.add_mutually_exclusive_group(required=True)
    mode.add_argument("--kit", action="store_true", help="Validate this role kit's files, frontmatter, template, and scripts.")
    mode.add_argument("--context", action="store_true", help="Summarize upstream docs and active project bindings.")
    mode.add_argument("--verify", metavar="PATH", help="Verify a generated seo-and-market-brief.md deliverable.")
    mode.add_argument("--self-test", action="store_true", help="Run offline deterministic self-tests.")

    parser.add_argument("--project-dir", default=".", help="Target project root directory (default: current directory).")
    parser.add_argument("--config", help="Optional explicit path to stage-1-bindings.json.")
    args = parser.parse_args(argv)

    project_dir = Path(args.project_dir).resolve()

    if args.kit:
        return cmd_kit()
    if args.context:
        return cmd_context(project_dir, args.config)
    if args.verify:
        return cmd_verify(args.verify, project_dir, args.config)
    if args.self_test:
        return run_self_test()
    return 2


if __name__ == "__main__":
    raise SystemExit(main())
