#!/usr/bin/env python3
"""
Deterministic Kit Preflight, Context Summarizer, Report Verifier, Live Repo Surface Auditor,
and Self-Test Runner for Stage 1 Role 1.5 (ai-search-and-technical-geo-engineer).

Usage:
  python3 -B geo_tech_audit.py --kit
  python3 -B geo_tech_audit.py --context [--project-dir <dir>]
  python3 -B geo_tech_audit.py --verify <report_path> [--project-dir <dir>] [--config <bindings.json>] [--audit-repo]
  python3 -B geo_tech_audit.py --self-test
"""

from __future__ import annotations

import argparse
import importlib.util
import json
import math
import re
import sys
import tempfile
from collections.abc import Iterator
from pathlib import Path
from typing import Any
from urllib.parse import urlparse


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
    "llms-txt-and-ai-crawler-access",
    "typed-jsonld-graph-and-entity-map",
    "technical-geo-crawl-and-indexnow",
)
TEMPLATE_NAME = "stage-1-technical-geo-report.template.md"
REQUIRED_H2: tuple[str, ...] = (
    "1. Technical GEO Surface Inventory (llms.txt, robots, sitemap, JSON-LD)",
    "2. llms.txt Specification & AnswerDotAI Compliance Check",
    "3. AI Crawler Access Matrix (robots.ts / robots.txt)",
    "4. Schema.org @graph Entity Map & Typed JSON-LD Verification",
    "5. Canonical, Sitemap & Bilingual hreflang Technical Audit",
    "6. IndexNow & Optional Deep Crawl Handoff (squirrelscan / schema-dts)",
    "7. Mandatory Self-Audit Checklist",
)
SEC3_HEADING = REQUIRED_H2[2]
SEC4_HEADING = REQUIRED_H2[3]
SEC7_HEADING = REQUIRED_H2[6]

CORE_REPORT_CRAWLERS: tuple[str, ...] = (
    "OAI-SearchBot",
    "PerplexityBot",
    "ClaudeBot",
    "GPTBot",
    "Google-Extended",
)
CRITICAL_SEARCH_BOTS: tuple[str, ...] = (
    "OAI-SearchBot",
    "PerplexityBot",
    "ClaudeBot",
)

CONTEXT_FILES: tuple[str, ...] = (
    "docs/seo-and-market-brief.md",
    "docs/stage-1-final-copy-and-pitch.md",
    "docs/positioning-brief.md",
    ".agents/product-marketing.md",
    "docs/context/project-digest.md",
)
REPO_SURFACE_FILES: tuple[str, ...] = (
    "public/llms.txt",
    "public/robots.txt",
    "src/app/robots.ts",
    "public/sitemap.xml",
    "src/app/sitemap.ts",
    "src/app/layout.tsx",
)

ARABIC_SCRIPT_RE = re.compile(r"[\u0600-\u06FF]")
POLICY_WORD_RE = re.compile(r"\b(?:allow|disallow)\b", re.IGNORECASE)
LLMS_LINK_RE = re.compile(r"^\s*-\s+\[[^\]]+\]\((https?://[^)\s]+)\)", re.MULTILINE)


def _is_arabic_route(r: str) -> bool:
    cleaned = r.strip()
    return cleaned == "/ar" or cleaned.startswith("/ar/")


def _requires_bilingual_arabic(bindings: dict[str, Any]) -> bool:
    locales = [str(loc).strip().lower() for loc in (bindings.get("locales") or []) if str(loc).strip()]
    required_routes = [str(r).strip() for r in (bindings.get("required_routes") or []) if str(r).strip()]
    has_ar_route = any(_is_arabic_route(r) for r in required_routes)
    req_flag = bool(bindings.get("require_bilingual_geo"))
    return req_flag or ("ar" in locales and has_ar_route)


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


def _collect_all_jsonld_types(obj: Any) -> set[str]:
    found: set[str] = set()
    for node in _iter_dicts(obj):
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


def _context_references_schema_org(ctx: Any) -> bool:
    if isinstance(ctx, str):
        return "schema.org" in ctx.lower()
    if isinstance(ctx, list):
        return any(_context_references_schema_org(item) for item in ctx)
    if isinstance(ctx, dict):
        return any(_context_references_schema_org(v) for v in ctx.values())
    return False


def _verify_crawler_matrix(lines: list[tuple[int, str]]) -> list[str]:
    issues: list[str] = []
    tables = kit_common.parse_markdown_tables(lines)
    non_code_lines: list[str] = []
    in_code = False
    for _, raw in lines:
        s = raw.strip()
        if s.startswith("```"):
            in_code = not in_code
            continue
        if not in_code and s:
            non_code_lines.append(s)

    allow_re = re.compile(r"\ballow\b", re.IGNORECASE)
    disallow_re = re.compile(r"\bdisallow\b", re.IGNORECASE)

    for bot in CORE_REPORT_CRAWLERS:
        bot_pat = re.compile(rf"(?<![A-Za-z0-9_-]){re.escape(bot)}(?![A-Za-z0-9_-])")
        matching_entries: list[tuple[str, list[str]]] = []

        for table in tables:
            for _, cells in table:
                cleaned_cells = [kit_common.strip_md(c) for c in cells]
                row_text = " ".join(cleaned_cells)
                if bot_pat.search(row_text) and POLICY_WORD_RE.search(row_text):
                    matching_entries.append((row_text, cleaned_cells))

        for line_text in non_code_lines:
            cleaned = line_text.replace("`", "")
            if bot_pat.search(cleaned) and POLICY_WORD_RE.search(cleaned):
                matching_entries.append((cleaned, []))

        if not matching_entries:
            issues.append(
                f"Section 3: AI crawler '{bot}' missing explicit Allow/Disallow policy in matrix table or lines"
            )
            continue

        if bot in CRITICAL_SEARCH_BOTS:
            explicitly_disallowed = any(
                (disallow_re.search(entry_text) and not allow_re.search(entry_text))
                or any(re.fullmatch(r"disallow(?:\s*:\s*/)?", c, re.IGNORECASE) for c in cells)
                for entry_text, cells in matching_entries
            )
            has_allow = any(allow_re.search(entry_text) for entry_text, _ in matching_entries)
            if explicitly_disallowed or not has_allow:
                issues.append(
                    f"Section 3: critical AI search crawler '{bot}' must have explicit Allow policy (Disallow rejected)"
                )
    return issues


def _verify_jsonld_section(lines: list[tuple[int, str]], bindings: dict[str, Any]) -> list[str]:
    issues: list[str] = []
    start_line, raw_json = _extract_first_json_code_block(lines)
    if raw_json is None:
        return ["Section 4: missing ```json fenced code block for Schema.org @graph"]

    try:
        payload = json.loads(raw_json)
    except json.JSONDecodeError as exc:
        return [f"Section 4:{start_line}: invalid JSON-LD ({exc})"]

    if not isinstance(payload, dict):
        return [f"Section 4:{start_line}: JSON-LD root must be a JSON object"]

    if not _context_references_schema_org(payload.get("@context")):
        issues.append(f"Section 4:{start_line}: JSON-LD '@context' must reference schema.org")

    graph = payload.get("@graph")
    if not isinstance(graph, list) or not graph or not all(isinstance(n, dict) for n in graph):
        return issues + [f"Section 4:{start_line}: JSON-LD '@graph' must be a non-empty array of objects"]

    # Entity Map deduplication gate: detect duplicate @id values across @graph nodes
    seen_ids: set[str] = set()
    for node in graph:
        raw_id = node.get("@id")
        if isinstance(raw_id, str) and raw_id.strip():
            norm_id = raw_id.strip()
            if norm_id in seen_ids:
                issues.append(
                    f"Section 4:{start_line}: duplicate @id '{norm_id}' in @graph (Entity Map deduplication failure)"
                )
            else:
                seen_ids.add(norm_id)

    found_types = _collect_all_jsonld_types(graph)
    required_types = [str(t).strip() for t in (bindings.get("required_jsonld_types") or []) if str(t).strip()]
    forbidden_types = [str(t).strip() for t in (bindings.get("forbidden_jsonld_types") or []) if str(t).strip()]

    for req_t in required_types:
        if req_t not in found_types:
            issues.append(
                f"Section 4:{start_line}: @graph missing required @type '{req_t}' (found {sorted(found_types)})"
            )
    for forb_t in forbidden_types:
        if forb_t in found_types:
            issues.append(f"Section 4:{start_line}: @graph contains forbidden @type '{forb_t}'")

    if bindings.get("require_price_specification"):
        price_specs = [d for d in _iter_dicts(graph) if _has_jsonld_type(d, "PriceSpecification")]
        if not price_specs:
            issues.append(
                f"Section 4:{start_line}: @graph missing 'PriceSpecification' required by bindings.require_price_specification"
            )
        else:
            valid_ps = any(
                isinstance(spec.get("priceCurrency"), str)
                and bool(spec["priceCurrency"].strip())
                and (_has_valid_price_value(spec.get("minPrice")) or _has_valid_price_value(spec.get("price")))
                for spec in price_specs
            )
            if not valid_ps:
                issues.append(
                    f"Section 4:{start_line}: PriceSpecification must include non-empty 'priceCurrency' and 'minPrice' or 'price'"
                )

    if bindings.get("require_same_as"):
        same_as_urls: list[str] = []
        for node in _iter_dicts(graph):
            val = node.get("sameAs")
            if isinstance(val, str) and val.strip():
                same_as_urls.append(val.strip())
            elif isinstance(val, list):
                for item in val:
                    if isinstance(item, str) and item.strip():
                        same_as_urls.append(item.strip())

        valid_urls = [
            u for u in same_as_urls
            if urlparse(u).scheme.lower() in {"http", "https"} and bool(urlparse(u).netloc)
        ]
        if not valid_urls:
            issues.append(
                f"Section 4:{start_line}: require_same_as enabled but @graph has no valid http(s):// sameAs URLs"
            )
        else:
            canonical_origin = str(bindings.get("canonical_origin") or "").strip()
            if canonical_origin:
                canon_host = (urlparse(canonical_origin).hostname or "").lower()
                has_external = any(
                    (urlparse(u).hostname or "").lower() != canon_host
                    and bool((urlparse(u).hostname or "").strip())
                    for u in valid_urls
                )
                if not has_external:
                    issues.append(
                        f"Section 4:{start_line}: require_same_as requires at least one external sameAs URL "
                        f"whose hostname differs from '{canon_host}'"
                    )

    return issues


def _audit_llms_txt(llms_path: Path, bindings: dict[str, Any]) -> list[str]:
    issues: list[str] = []
    if not llms_path.is_file():
        return ["Repo surface missing: public/llms.txt"]

    text = llms_path.read_text(encoding="utf-8")
    nonempty_lines = [ln.strip() for ln in text.splitlines() if ln.strip()]
    if not nonempty_lines or not re.match(r"^#\s+\S+", nonempty_lines[0]):
        issues.append("public/llms.txt: must start with '# <Title>' H1 heading")

    if not re.search(r"^\s*>\s+\S+", text, re.MULTILINE):
        issues.append("public/llms.txt: missing '> <Summary>' blockquote")

    if not re.search(r"^\s*##\s+\S+", text, re.MULTILINE):
        issues.append("public/llms.txt: missing '## <Section>' heading")

    links = LLMS_LINK_RE.findall(text)
    if not links:
        issues.append("public/llms.txt: must contain at least one '- [Label](https://...)' link under a section")

    canonical_origin = str(bindings.get("canonical_origin") or "").strip().rstrip("/")
    if canonical_origin and links:
        if not any(u == canonical_origin or u.startswith(canonical_origin + "/") for u in links):
            issues.append(
                f"public/llms.txt: no link URL matches configured canonical_origin '{canonical_origin}'"
            )
    elif canonical_origin and canonical_origin not in text:
        issues.append(f"public/llms.txt: does not reference canonical_origin '{canonical_origin}'")

    if _requires_bilingual_arabic(bindings):
        if not ARABIC_SCRIPT_RE.search(text):
            issues.append("public/llms.txt: bilingual Arabic GEO enabled, but no Arabic script summary/routes found")
        if not any(_is_arabic_route(urlparse(u).path or "/") for u in links):
            issues.append(
                "public/llms.txt: bilingual Arabic GEO enabled, but no '- [Label](...)' link targets an '/ar' route"
            )

    return issues


def _parse_robots_txt_stanzas(text: str) -> list[tuple[list[str], list[str], list[str]]]:
    """Return list of (agents_lower, allow_paths, disallow_paths) stanzas."""
    stanzas: list[tuple[list[str], list[str], list[str]]] = []
    current_agents: list[str] = []
    current_allows: list[str] = []
    current_disallows: list[str] = []
    saw_rule = False

    def flush() -> None:
        nonlocal current_agents, current_allows, current_disallows, saw_rule
        if current_agents:
            stanzas.append((current_agents, current_allows, current_disallows))
        current_agents = []
        current_allows = []
        current_disallows = []
        saw_rule = False

    for raw in text.splitlines():
        line = raw.split("#", 1)[0].strip()
        if not line or ":" not in line:
            continue
        key, val = line.split(":", 1)
        directive = key.strip().lower()
        value = val.strip()
        if directive == "user-agent":
            if saw_rule:
                flush()
            if value:
                current_agents.append(value.lower())
        elif directive == "disallow":
            saw_rule = True
            current_disallows.append(value)
        elif directive == "allow":
            saw_rule = True
            current_allows.append(value)

    flush()
    return stanzas


def _extract_ts_string_values(expr: str) -> list[str]:
    return [m.group(2).strip() for m in re.finditer(r"(['\"`])((?:\\.|(?!\1).)*)\1", expr)]


def _strip_ts_comments(text: str) -> str:
    no_block = re.sub(r"/\*.*?\*/", "", text, flags=re.DOTALL)
    return re.sub(r"(?<!:)//[^\n]*", "", no_block)


def _extract_ts_rule_objects(text: str) -> list[tuple[list[str], list[str], list[str]]]:
    """Parse Next.js robots.ts rule objects into (agents_lower, allow_paths, disallow_paths)."""
    cleaned = _strip_ts_comments(text)
    rules: list[tuple[list[str], list[str], list[str]]] = []

    depth = 0
    start: int | None = None
    in_quote: str | None = None
    escaped = False
    blocks: list[str] = []

    for idx, ch in enumerate(cleaned):
        if in_quote:
            if escaped:
                escaped = False
            elif ch == "\\":
                escaped = True
            elif ch == in_quote:
                in_quote = None
            continue
        if ch in ("'", '"', "`"):
            in_quote = ch
            continue
        if ch == "{":
            if depth == 0:
                start = idx
            depth += 1
        elif ch == "}":
            if depth > 0:
                depth -= 1
                if depth == 0 and start is not None:
                    blocks.append(cleaned[start : idx + 1])
                    start = None
                elif depth >= 1 and start is not None:
                    # Capture inner leaf objects as well (e.g. inside `return { rules: [ { ... } ] }`)
                    pass

    # Also scan balanced inner object blocks containing `userAgent:`
    leaf_blocks: list[str] = []
    stack: list[int] = []
    in_quote = None
    escaped = False
    for idx, ch in enumerate(cleaned):
        if in_quote:
            if escaped:
                escaped = False
            elif ch == "\\":
                escaped = True
            elif ch == in_quote:
                in_quote = None
            continue
        if ch in ("'", '"', "`"):
            in_quote = ch
            continue
        if ch == "{":
            stack.append(idx)
        elif ch == "}" and stack:
            s_idx = stack.pop()
            snippet = cleaned[s_idx : idx + 1]
            if re.search(r"\buserAgent\s*:", snippet) and "{" not in snippet[1:-1]:
                leaf_blocks.append(snippet)

    for block in leaf_blocks or blocks:
        ua_m = re.search(r"\buserAgent\s*:\s*(\[[^\]]*\]|(['\"`])(?:\\.|(?!\2).)*\2)", block, re.DOTALL)
        if not ua_m:
            continue
        agents = [a.lower() for a in _extract_ts_string_values(ua_m.group(1)) if a]
        dis_m = re.search(r"\bdisallow\s*:\s*(\[[^\]]*\]|(['\"`])(?:\\.|(?!\2).)*\2)", block, re.DOTALL)
        allow_m = re.search(r"\ballow\s*:\s*(\[[^\]]*\]|(['\"`])(?:\\.|(?!\2).)*\2)", block, re.DOTALL)
        disallows = _extract_ts_string_values(dis_m.group(1)) if dis_m else []
        allows = _extract_ts_string_values(allow_m.group(1)) if allow_m else []
        if agents:
            rules.append((agents, allows, disallows))

    return rules


def _bot_blocked_by_rules(
    bot_name: str,
    rules: list[tuple[list[str], list[str], list[str]]],
) -> bool:
    target = bot_name.lower()
    specific = [(allows, disallows) for agents, allows, disallows in rules if target in agents]
    active = specific if specific else [(allows, disallows) for agents, allows, disallows in rules if "*" in agents]
    for allows, disallows in active:
        if "/" in disallows and "/" not in allows:
            return True
    return False


def _audit_robots(project_root: Path, bindings: dict[str, Any]) -> list[str]:
    robots_txt = project_root / "public" / "robots.txt"
    robots_ts = project_root / "src" / "app" / "robots.ts"
    if not robots_txt.is_file() and not robots_ts.is_file():
        return ["Repo surface missing: neither public/robots.txt nor src/app/robots.ts exists"]

    issues: list[str] = []
    canonical_origin = str(bindings.get("canonical_origin") or "").strip().rstrip("/")

    if robots_txt.is_file():
        txt = robots_txt.read_text(encoding="utf-8")
        sitemaps = re.findall(r"(?im)^\s*Sitemap:\s*(\S+)", txt)
        if not sitemaps:
            issues.append("public/robots.txt: missing 'Sitemap:' declaration")
        elif canonical_origin and not any(
            s.startswith(canonical_origin + "/") or s == canonical_origin for s in sitemaps
        ):
            issues.append(
                f"public/robots.txt: Sitemap URL does not match canonical_origin '{canonical_origin}'"
            )

        stanzas = _parse_robots_txt_stanzas(txt)
        if not stanzas:
            issues.append("public/robots.txt: no User-agent stanzas found")
        else:
            for bot in CRITICAL_SEARCH_BOTS:
                if _bot_blocked_by_rules(bot, stanzas):
                    issues.append(f"public/robots.txt: critical AI search crawler '{bot}' is blocked by Disallow: /")

    if robots_ts.is_file():
        ts_text = robots_ts.read_text(encoding="utf-8")
        cleaned_ts = _strip_ts_comments(ts_text)
        if not re.search(r"\bsitemap\s*:", cleaned_ts):
            issues.append("src/app/robots.ts: missing 'sitemap' declaration")
        elif canonical_origin:
            literal_sitemaps = re.findall(r"\bsitemap\s*:\s*(['\"`])(https?://[^'\"`]+)\1", cleaned_ts)
            if literal_sitemaps and not any(
                url.startswith(canonical_origin + "/") or url == canonical_origin for _, url in literal_sitemaps
            ):
                issues.append(
                    f"src/app/robots.ts: sitemap URL does not match canonical_origin '{canonical_origin}'"
                )

        ts_rules = _extract_ts_rule_objects(ts_text)
        if not ts_rules:
            issues.append("src/app/robots.ts: no MetadataRoute.Robots rule objects with userAgent found")
        else:
            for bot in CRITICAL_SEARCH_BOTS:
                if _bot_blocked_by_rules(bot, ts_rules):
                    issues.append(f"src/app/robots.ts: critical AI search crawler '{bot}' is blocked by disallow: '/'")

    return issues


def _audit_sitemap(project_root: Path, bindings: dict[str, Any]) -> list[str]:
    sitemap_xml = project_root / "public" / "sitemap.xml"
    sitemap_ts = project_root / "src" / "app" / "sitemap.ts"
    if not sitemap_xml.is_file() and not sitemap_ts.is_file():
        return ["Repo surface missing: neither public/sitemap.xml nor src/app/sitemap.ts exists"]

    issues: list[str] = []
    canonical_origin = str(bindings.get("canonical_origin") or "").strip().rstrip("/")
    required_routes = [str(r).strip() for r in (bindings.get("required_routes") or []) if str(r).strip()]

    if sitemap_xml.is_file():
        xml = sitemap_xml.read_text(encoding="utf-8")
        locs = [m.strip() for m in re.findall(r"<loc>\s*([^<\s]+)\s*</loc>", xml, re.IGNORECASE) if m.strip()]
        if not locs:
            issues.append("public/sitemap.xml: missing <loc> entries")
        else:
            if canonical_origin and not any(
                loc == canonical_origin or loc.startswith(canonical_origin + "/") for loc in locs
            ):
                issues.append(f"public/sitemap.xml: does not reference canonical_origin '{canonical_origin}'")
            if required_routes:
                loc_paths = {urlparse(loc).path or "/" for loc in locs}
                for route in required_routes:
                    if route not in loc_paths:
                        issues.append(f"public/sitemap.xml: missing required route '{route}' in <loc> entries")

    if sitemap_ts.is_file():
        ts = sitemap_ts.read_text(encoding="utf-8")
        if not re.search(r"\burl\s*:", ts):
            issues.append("src/app/sitemap.ts: missing 'url' entries")
        if canonical_origin and canonical_origin not in ts:
            issues.append(f"src/app/sitemap.ts: does not reference canonical_origin '{canonical_origin}'")
        if required_routes:
            for route in required_routes:
                if route == "/":
                    if "/" not in ts:
                        issues.append("src/app/sitemap.ts: missing required route '/'")
                elif not re.search(rf"(?<![A-Za-z0-9_-]){re.escape(route)}(?![A-Za-z0-9_/-])", ts):
                    issues.append(f"src/app/sitemap.ts: missing required route '{route}'")

    return issues


def audit_repo_surfaces(project_root: Path, bindings: dict[str, Any] | None = None) -> list[str]:
    cfg = bindings or {}
    root = project_root.resolve()
    issues: list[str] = []
    issues.extend(_audit_llms_txt(root / "public" / "llms.txt", cfg))
    issues.extend(_audit_robots(root, cfg))
    issues.extend(_audit_sitemap(root, cfg))
    return issues


def verify_geo_report_text(
    text: str,
    *,
    filename: str = "stage-1-technical-geo-report.md",
    bindings: dict[str, Any] | None = None,
) -> list[str]:
    cfg = bindings or {}
    issues, sections = kit_common.check_h2_headings(text, REQUIRED_H2, filename, require_prose=True)

    if SEC3_HEADING in sections:
        issues.extend(_verify_crawler_matrix(sections[SEC3_HEADING]))

    if SEC4_HEADING in sections:
        issues.extend(_verify_jsonld_section(sections[SEC4_HEADING], cfg))

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


def verify_geo_report_file(
    raw_path: str | Path,
    *,
    project_dir: Path,
    explicit_config: str | Path | None = None,
    audit_repo: bool = False,
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

    issues = verify_geo_report_text(text, filename=target.name, bindings=bindings)
    if audit_repo or bool(bindings.get("audit_live_geo_surfaces")):
        issues.extend(audit_repo_surfaces(root, bindings))
    return issues


def verify_kit(kit_dir: Path = KIT_DIR) -> list[str]:
    issues = kit_common.validate_role_kit(
        kit_dir,
        expected_skills=EXPECTED_SKILLS,
        expected_templates={TEMPLATE_NAME: REQUIRED_H2},
    )
    if not (kit_dir / "scripts" / "indexnow_ping.py").is_file():
        issues.append(f"Missing {kit_dir.name}/scripts/indexnow_ping.py")

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
    print(f"=== AI Search & Technical GEO Engineer Context Summary ({root}) ===")

    for rel in CONTEXT_FILES:
        path = root / rel
        if not path.is_file():
            print(f"- {rel}: MISSING")
            continue
        text = path.read_text(encoding="utf-8")
        h2_order, _ = kit_common.split_h2_sections(text)
        preview = ", ".join(h2_order[:5]) if h2_order else "(no H2 headings)"
        print(f"- {rel}: PRESENT ({len(text.splitlines())} lines) | H2: {preview}")

    print("--- Live Technical GEO Repo Surfaces ---")
    for rel in REPO_SURFACE_FILES:
        path = root / rel
        status = f"PRESENT ({len(path.read_text(encoding='utf-8').splitlines())} lines)" if path.is_file() else "MISSING"
        print(f"- {rel}: {status}")

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
            "canonical_origin": bindings.get("canonical_origin"),
            "locales": bindings.get("locales", []),
            "required_routes": bindings.get("required_routes", []),
            "required_jsonld_types": bindings.get("required_jsonld_types", []),
            "forbidden_jsonld_types": bindings.get("forbidden_jsonld_types", []),
            "require_price_specification": bindings.get("require_price_specification", False),
            "require_same_as": bindings.get("require_same_as", False),
            "require_bilingual_geo": bindings.get("require_bilingual_geo", False),
            "audit_live_geo_surfaces": bindings.get("audit_live_geo_surfaces", False),
        }
        print(f"- .kepler/stage-1-bindings.json: PRESENT -> {json.dumps(summary)}")

    return 0


def _build_sample_report(
    *,
    duplicate_id: bool = False,
    include_price_spec: bool = True,
    same_as_override: list[str] | None = None,
    external_same_as: bool = True,
    omit_perplexity_policy: bool = False,
    disallow_oai_search: bool = False,
    include_forbidden_person: bool = False,
) -> str:
    second_id = "https://acmeops.example/#organization" if duplicate_id else "https://acmeops.example/#website"
    oai_row = (
        "| `OAI-SearchBot` | AI Search | `Disallow` | `/` | Blocked |\n"
        if disallow_oai_search
        else "| `OAI-SearchBot` | AI Search | `Allow` | `/` | ChatGPT search citation retrieval |\n"
    )
    perplexity_row = (
        "| `PerplexityBot` | AI Search | Pending review | `/` | Pending |\n"
        if omit_perplexity_policy
        else "| `PerplexityBot` | AI Search | `Allow` | `/` | Perplexity search citations |\n"
    )
    if same_as_override is not None:
        same_as_list = same_as_override
    else:
        same_as_list = (
            ["https://github.com/acmeops", "https://www.linkedin.com/company/acmeops"]
            if external_same_as
            else ["https://acmeops.example/about"]
        )
    service_offers: dict[str, Any] = {"@type": "Offer", "url": "https://acmeops.example/pricing"}
    if include_price_spec:
        service_offers["priceSpecification"] = {
            "@type": "PriceSpecification",
            "priceCurrency": "USD",
            "minPrice": 1500,
        }

    graph_nodes: list[dict[str, Any]] = [
        {
            "@type": "Organization",
            "@id": "https://acmeops.example/#organization",
            "name": "Acme Ops",
            "url": "https://acmeops.example/",
            "areaServed": ["US", "SA"],
            "knowsAbout": ["Deterministic Release Pipelines", "API Contracts"],
            "sameAs": same_as_list,
        },
        {
            "@type": "WebSite",
            "@id": second_id,
            "url": "https://acmeops.example/",
            "name": "Acme Ops",
            "inLanguage": ["en", "ar"],
            "publisher": {"@id": "https://acmeops.example/#organization"},
        },
        {
            "@type": "Service",
            "@id": "https://acmeops.example/#service",
            "name": "Scoped Platform Delivery",
            "provider": {"@id": "https://acmeops.example/#organization"},
            "offers": service_offers,
        },
        {
            "@type": "FAQPage",
            "@id": "https://acmeops.example/#faq",
            "inLanguage": "en",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": "How does Acme Ops verify releases?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Every pull request runs deterministic schema and build checks before deployment.",
                    },
                }
            ],
        },
    ]
    if include_forbidden_person:
        graph_nodes.append({"@type": "Person", "@id": "https://acmeops.example/#founder", "name": "Alex Doe"})

    jsonld_str = json.dumps({"@context": "https://schema.org", "@graph": graph_nodes}, indent=2)

    return f"""# Stage 1 Technical GEO & AI Search Verification Report

**Project:** Acme Ops
**Canonical Origin:** `https://acmeops.example`

## 1. Technical GEO Surface Inventory (llms.txt, robots, sitemap, JSON-LD)

| Surface | Path | Status | Notes |
|---|---|---|---|
| `llms.txt` | `public/llms.txt` | PRESENT | AnswerDotAI spec with EN and AR sections |
| Robots | `src/app/robots.ts` | PRESENT | Search bots allowed, API disallowed |
| Sitemap | `src/app/sitemap.ts` | PRESENT | Covers `/` and `/ar` |
| JSON-LD | `src/app/layout.tsx` | PRESENT | Deduplicated `@graph` |

## 2. llms.txt Specification & AnswerDotAI Compliance Check

`public/llms.txt` opens with `# Acme Ops`, provides a concise blockquote summary, and links canonical EN and AR routes.

## 3. AI Crawler Access Matrix (robots.ts / robots.txt)

| User-Agent | Category | Policy | Scope | Rationale |
|---|---|---|---|---|
{oai_row}| `ChatGPT-User` | Live Fetch | `Allow` | `/` | Live user link fetch |
{perplexity_row}| `ClaudeBot` | AI Search | `Allow` | `/` | Anthropic web retrieval |
| `GPTBot` | Training | `Disallow` | `/` | Owner training opt-out |
| `Google-Extended` | Training | `Disallow` | `/` | Owner Gemini training opt-out |

## 4. Schema.org @graph Entity Map & Typed JSON-LD Verification

All entity `@id` URIs are unique across `@graph`, with `PriceSpecification` and external `sameAs` links verified.

```json
{jsonld_str}
```

## 5. Canonical, Sitemap & Bilingual hreflang Technical Audit

| Route | Canonical | Sitemap | Reciprocal `hreflang` | SSR HTML |
|---|---|---|---|---|
| `/` | `https://acmeops.example/` | Yes | `en`, `ar`, `x-default` | Verified |
| `/ar` | `https://acmeops.example/ar` | Yes | `ar`, `en`, `x-default` | Verified |

## 6. IndexNow & Optional Deep Crawl Handoff (squirrelscan / schema-dts)

Verified IndexNow dry-run payload for `acmeops.example`; staging crawl handoff documented for `squirrelscan --format llm`.

## 7. Mandatory Self-Audit Checklist

| # | Gate | Evidence | Status |
|---|---|---|---|
| 1 | Seven H2 sections | Verified | PASS |
| 2 | `llms.txt` AnswerDotAI spec | Verified | PASS |
| 3 | AI crawler matrix | Verified | PASS |
| 4 | Deduplicated `@graph` | Verified | PASS |
| 5 | PriceSpecification & sameAs | Verified | PASS |
| 6 | Sitemap & hreflang | Verified | PASS |
| 7 | Clean prose audit | Verified | PASS |
"""


def _write_clean_repo_fixture(root: Path) -> None:
    (root / "public").mkdir(parents=True, exist_ok=True)
    (root / "src" / "app").mkdir(parents=True, exist_ok=True)
    (root / "public" / "llms.txt").write_text(
        "# Acme Ops\n\n"
        "> Acme Ops builds deterministic release verification tooling starting at $1,500.\n"
        "> تبني منصة Acme Ops أنظمة تحقق آلي للإصدارات البرمجية للفرق الهندسية.\n\n"
        "## Core Pages\n\n"
        "- [Home](https://acmeops.example/): Product overview and documentation.\n"
        "- [Arabic Overview](https://acmeops.example/ar): الملخص العربي للخدمات والأسعار.\n",
        encoding="utf-8",
    )
    (root / "src" / "app" / "robots.ts").write_text(
        'import type { MetadataRoute } from "next";\n\n'
        "export default function robots(): MetadataRoute.Robots {\n"
        "  return {\n"
        "    rules: [\n"
        '      { userAgent: "*", allow: "/", disallow: "/api" },\n'
        '      { userAgent: ["OAI-SearchBot", "PerplexityBot", "ClaudeBot"], allow: "/" },\n'
        '      { userAgent: ["GPTBot", "Google-Extended"], disallow: "/" },\n'
        "    ],\n"
        '    sitemap: "https://acmeops.example/sitemap.xml",\n'
        "  };\n"
        "}\n",
        encoding="utf-8",
    )
    (root / "src" / "app" / "sitemap.ts").write_text(
        'import type { MetadataRoute } from "next";\n\n'
        "export default function sitemap(): MetadataRoute.Sitemap {\n"
        '  const origin = "https://acmeops.example";\n'
        "  return [\n"
        '    { url: `${origin}/`, lastModified: new Date("2026-01-10") },\n'
        '    { url: `${origin}/ar`, lastModified: new Date("2026-01-10") },\n'
        "  ];\n"
        "}\n",
        encoding="utf-8",
    )


def run_self_test() -> int:
    # Sanity-check _is_arabic_route helper
    assert _is_arabic_route("/ar") and _is_arabic_route("/ar/pricing")
    assert not _is_arabic_route("/articles") and not _is_arabic_route("/")

    bindings = {
        "project_name": "Acme Ops",
        "canonical_origin": "https://acmeops.example",
        "locales": ["en", "ar"],
        "required_routes": ["/", "/ar"],
        "required_jsonld_types": ["Organization", "WebSite", "Service", "FAQPage"],
        "forbidden_jsonld_types": ["Person"],
        "require_price_specification": True,
        "require_same_as": True,
        "require_bilingual_geo": True,
    }

    with tempfile.TemporaryDirectory() as tmp:
        root = Path(tmp)
        docs_dir = root / "docs"
        docs_dir.mkdir(parents=True, exist_ok=True)
        kepler_dir = root / ".kepler"
        kepler_dir.mkdir(parents=True, exist_ok=True)
        (kepler_dir / "stage-1-bindings.json").write_text(json.dumps(bindings), encoding="utf-8")

        _write_clean_repo_fixture(root)
        report_path = docs_dir / "stage-1-technical-geo-report.md"
        report_path.write_text(_build_sample_report(), encoding="utf-8")

        # 1. Clean report + clean repo fixture (--audit-repo)
        clean_issues = verify_geo_report_file(report_path, project_dir=root, audit_repo=True)
        assert clean_issues == [], f"Clean report + clean repo failed unexpectedly: {clean_issues}"

        # 2. Report negative: duplicate @id
        dup_issues = verify_geo_report_text(_build_sample_report(duplicate_id=True), bindings=bindings)
        assert any("duplicate @id" in i for i in dup_issues), dup_issues

        # 3. Report negative: missing PriceSpecification
        no_ps_issues = verify_geo_report_text(_build_sample_report(include_price_spec=False), bindings=bindings)
        assert any("PriceSpecification" in i for i in no_ps_issues), no_ps_issues

        # 4. Report negative: non-external sameAs URL & host-port evasion
        same_as_issues = verify_geo_report_text(_build_sample_report(external_same_as=False), bindings=bindings)
        assert any("external sameAs" in i for i in same_as_issues), same_as_issues

        port_evasion_issues = verify_geo_report_text(
            _build_sample_report(same_as_override=["https://acmeops.example:443/about"]),
            bindings=bindings,
        )
        assert any("external sameAs" in i for i in port_evasion_issues), port_evasion_issues

        # 5. Report negative: missing Allow/Disallow policy for PerplexityBot & Disallow for OAI-SearchBot
        crawler_issues = verify_geo_report_text(_build_sample_report(omit_perplexity_policy=True), bindings=bindings)
        assert any("PerplexityBot" in i for i in crawler_issues), crawler_issues

        oai_disallow_issues = verify_geo_report_text(_build_sample_report(disallow_oai_search=True), bindings=bindings)
        assert any("OAI-SearchBot" in i and "Allow" in i for i in oai_disallow_issues), oai_disallow_issues

        # 6. Report negative: forbidden @type Person
        forb_issues = verify_geo_report_text(_build_sample_report(include_forbidden_person=True), bindings=bindings)
        assert any("forbidden @type 'Person'" in i for i in forb_issues), forb_issues

        # 7. Repo negative: bad llms.txt (missing blockquote, links, Arabic script)
        (root / "public" / "llms.txt").write_text("Not an H1\n", encoding="utf-8")
        bad_llms_issues = audit_repo_surfaces(root, bindings)
        assert any("must start with '# <Title>'" in i for i in bad_llms_issues), bad_llms_issues
        assert any("blockquote" in i for i in bad_llms_issues), bad_llms_issues
        assert any("bilingual Arabic GEO" in i for i in bad_llms_issues), bad_llms_issues

        # 7b. Repo negative: llms.txt has Arabic text but no /ar route link
        (root / "public" / "llms.txt").write_text(
            "# Acme Ops\n\n"
            "> Acme Ops builds release verification.\n"
            "> تبني منصة Acme Ops أنظمة تحقق آلي.\n\n"
            "## Core Pages\n\n"
            "- [Home](https://acmeops.example/): Product overview.\n",
            encoding="utf-8",
        )
        no_ar_link_issues = audit_repo_surfaces(root, bindings)
        assert any("'/ar' route" in i for i in no_ar_link_issues), no_ar_link_issues

        # Restore clean repo fixture
        _write_clean_repo_fixture(root)

        # 7c. Repo negative: sitemap.xml matches canonical_origin but misses required /ar route
        (root / "src" / "app" / "sitemap.ts").unlink()
        (root / "public" / "sitemap.xml").write_text(
            '<?xml version="1.0" encoding="UTF-8"?>\n'
            '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
            "  <url><loc>https://acmeops.example/</loc></url>\n"
            "</urlset>\n",
            encoding="utf-8",
        )
        sitemap_missing_ar = audit_repo_surfaces(root, bindings)
        assert any("missing required route '/ar'" in i for i in sitemap_missing_ar), sitemap_missing_ar

        (root / "public" / "sitemap.xml").unlink()
        _write_clean_repo_fixture(root)

        # 8. Repo negative & backtick check: blocked OAI-SearchBot in robots.ts
        (root / "src" / "app" / "robots.ts").write_text(
            "export default function robots() {\n"
            "  return {\n"
            "    rules: [\n"
            "      { userAgent: `*`, allow: `/`, disallow: `/api` },\n"
            "      { userAgent: `OAI-SearchBot`, allow: `/` },\n"
            "    ],\n"
            "    sitemap: `https://acmeops.example/sitemap.xml`,\n"
            "  };\n"
            "}\n",
            encoding="utf-8",
        )
        assert audit_repo_surfaces(root, bindings) == [], "Expected backtick literals in robots.ts to pass"

        (root / "src" / "app" / "robots.ts").write_text(
            "export default function robots() {\n"
            "  return {\n"
            "    rules: [\n"
            '      { userAgent: "*", allow: "/", disallow: "/api" },\n'
            "      { userAgent: `OAI-SearchBot`, disallow: `/` },\n"
            "    ],\n"
            '    sitemap: "https://acmeops.example/sitemap.xml",\n'
            "  };\n"
            "}\n",
            encoding="utf-8",
        )
        blocked_ts_issues = audit_repo_surfaces(root, bindings)
        assert any("OAI-SearchBot" in i and "blocked" in i for i in blocked_ts_issues), blocked_ts_issues

        # 9. Repo positive/negative with public/robots.txt (remove robots.ts first)
        (root / "src" / "app" / "robots.ts").unlink()
        (root / "public" / "robots.txt").write_text(
            "User-agent: *\n"
            "Disallow: /api\n\n"
            "User-agent: OAI-SearchBot\n"
            "Allow: /\n\n"
            "Sitemap: https://acmeops.example/sitemap.xml\n",
            encoding="utf-8",
        )
        assert audit_repo_surfaces(root, bindings) == [], "Expected robots.txt with Disallow: /api on * to pass"

        (root / "public" / "robots.txt").write_text(
            "User-agent: *\n"
            "Disallow: /api\n\n"
            "User-agent: OAI-SearchBot\n"
            "Disallow: /\n\n"
            "Sitemap: https://acmeops.example/sitemap.xml\n",
            encoding="utf-8",
        )
        blocked_txt_issues = audit_repo_surfaces(root, bindings)
        assert any("OAI-SearchBot" in i and "blocked" in i for i in blocked_txt_issues), blocked_txt_issues

        # 10. Context check runs cleanly
        assert run_context(root) == 0

    print(
        "PASS: geo_tech_audit.py --self-test passed "
        "(clean report + repo fixture, duplicate @id, PriceSpecification, sameAs, "
        "crawler matrix, bad llms.txt, robots.ts/robots.txt OAI-SearchBot block vs /api allow)."
    )
    return 0


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(
        description="Audit Stage 1 Role 1.5 (ai-search-and-technical-geo-engineer) kit, context, report, and live GEO surfaces."
    )
    parser.add_argument("--kit", action="store_true", help="Validate the role kit files.")
    parser.add_argument("--context", action="store_true", help="Summarize Stage 1 briefs, bindings, and live GEO surfaces.")
    parser.add_argument("--verify", metavar="PATH", help="Verify docs/stage-1-technical-geo-report.md.")
    parser.add_argument("--project-dir", default=".", help="Project root directory (default: current directory).")
    parser.add_argument("--config", help="Optional explicit path to stage-1-bindings.json.")
    parser.add_argument("--audit-repo", action="store_true", help="Also audit public/llms.txt, robots, and sitemap in --project-dir.")
    parser.add_argument("--self-test", action="store_true", help="Run built-in offline self-tests.")
    args = parser.parse_args(argv)

    if args.self_test:
        return run_self_test()

    if args.kit:
        issues = verify_kit(KIT_DIR)
        if issues:
            print(f"FAIL: geo_tech_audit.py --kit found {len(issues)} issue(s):")
            for issue in issues:
                print(f"FAIL: {issue}")
            return 1
        print(
            "PASS: geo_tech_audit.py --kit verified ROLE.md, START-SESSION.md, "
            "3 SKILL.md files, template, indexnow_ping.py, and prose audit."
        )
        return 0

    if args.context:
        return run_context(Path(args.project_dir))

    if args.verify:
        issues = verify_geo_report_file(
            args.verify,
            project_dir=Path(args.project_dir),
            explicit_config=args.config,
            audit_repo=args.audit_repo,
        )
        if issues:
            print(f"FAIL: geo_tech_audit.py --verify found {len(issues)} issue(s):")
            for issue in issues:
                print(f"FAIL: {issue}")
            return 1
        print(f"PASS: geo_tech_audit.py --verify passed for {args.verify}.")
        return 0

    parser.print_help()
    return 2


if __name__ == "__main__":
    raise SystemExit(main())
