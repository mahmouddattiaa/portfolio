#!/usr/bin/env python3
"""
Deterministic Kit, Context, Deliverable, and Self-Test Auditor for Stage 1 Role 1.6
(offsite-entity-and-citation-builder).

Usage:
  python3 -B citation_audit.py --kit
  python3 -B citation_audit.py --context [--project-dir <dir>]
  python3 -B citation_audit.py --verify <path> [--project-dir <dir>] [--config <bindings.json>]
  python3 -B citation_audit.py --self-test
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
    "directory-and-entity-consistency",
    "founder-discovery-syndication-and-reviews",
    "ai-visibility-benchmarking-and-mcp-ops",
)
TEMPLATE_NAME = "stage-1-offsite-citation-pack.template.md"

SEC_1 = "1. Canonical Entity Record (NAP, Legal Framing, Pricing & Timelines)"
SEC_2 = "2. Priority Directory & Search Engine Submission Matrix"
SEC_3 = "3. Verified sameAs URL Registry (JSON-LD Parity)"
SEC_4 = "4. Bilingual Directory Profiles & Review Request Scripts (EN & AR)"
SEC_5 = "5. Syndication Articles & Canonical Frontmatter Pack"
SEC_6 = "6. AI Visibility Prompt Benchmark Suite & Optional MCP Setup"
SEC_7 = "7. Mandatory Self-Audit Checklist"

REQUIRED_H2: tuple[str, ...] = (
    SEC_1,
    SEC_2,
    SEC_3,
    SEC_4,
    SEC_5,
    SEC_6,
    SEC_7,
)

CONTEXT_FILES: tuple[str, ...] = (
    "docs/positioning-brief.md",
    "docs/seo-and-market-brief.md",
    "docs/stage-1-final-copy-and-pitch.md",
    ".agents/product-marketing.md",
    "docs/context/project-digest.md",
)

EXTERNAL_DIRECTORY_PATTERNS: tuple[tuple[str, str], ...] = (
    ("LinkedIn", r"\blinkedin\b"),
    ("GitHub", r"\bgithub\b"),
    ("Clutch", r"\bclutch(?:\.co)?\b"),
    ("GoodFirms", r"\bgoodfirms\b"),
    ("Crunchbase", r"\bcrunchbase\b"),
    ("Product Hunt", r"\bproduct\s+hunt\b"),
    ("G2", r"\bg2\b"),
    ("Capterra", r"\bcapterra\b"),
)

ARABIC_SCRIPT_RE = re.compile(r"[\u0600-\u06FF]")
URL_RE = re.compile(r"https?://[^\s`\"'<>)\]|,;]+", re.IGNORECASE)
CANONICAL_URL_RE = re.compile(r"^\s*canonical_url\s*:\s*(.+)$", re.IGNORECASE)


def _is_arabic_route(route: str) -> bool:
    cleaned = route.strip()
    return cleaned == "/ar" or cleaned.startswith("/ar/")


def _requires_bilingual_arabic(bindings: dict[str, Any]) -> bool:
    if bindings.get("require_bilingual_geo"):
        return True
    locales = [str(loc).strip().lower() for loc in (bindings.get("locales") or []) if str(loc).strip()]
    required_routes = [str(r).strip() for r in (bindings.get("required_routes") or []) if str(r).strip()]
    if "ar" not in locales:
        return False
    if not required_routes:
        return True
    return any(_is_arabic_route(r) for r in required_routes)


def _contains_term(text: str, term: str) -> bool:
    escaped = re.escape(term)
    prefix = r"(?<!\w)" if term[0].isalnum() else ""
    suffix = r"(?!\w)" if term[-1].isalnum() else ""
    return re.search(f"{prefix}{escaped}{suffix}", text, re.IGNORECASE) is not None


def _extract_urls(text: str) -> list[str]:
    urls: list[str] = []
    for raw in URL_RE.findall(text):
        cleaned = raw.rstrip(".,:;")
        if cleaned:
            urls.append(cleaned)
    return urls


def _extract_fenced_code_blocks(lines: list[tuple[int, str]]) -> list[tuple[int, str]]:
    blocks: list[tuple[int, str]] = []
    in_block = False
    start_line = 0
    buf: list[str] = []
    for line_no, raw in lines:
        stripped = raw.strip()
        if stripped.startswith("```"):
            if not in_block:
                in_block = True
                start_line = line_no
                buf = []
            else:
                blocks.append((start_line, "\n".join(buf)))
                in_block = False
                buf = []
        elif in_block:
            buf.append(raw)
    return blocks


def _strip_code_blocks(lines: list[tuple[int, str]]) -> str:
    kept: list[str] = []
    in_block = False
    for _, raw in lines:
        if raw.strip().startswith("```"):
            in_block = not in_block
            continue
        if not in_block:
            kept.append(raw)
    return "\n".join(kept)


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
    print(f"=== Offsite Entity & Citation Builder Context Summary ({root}) ===")

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
            "canonical_origin": bindings.get("canonical_origin"),
            "locales": bindings.get("locales", []),
            "require_bilingual_geo": bindings.get("require_bilingual_geo", False),
            "expected_same_as": bindings.get("expected_same_as", []),
            "required_routes": bindings.get("required_routes", []),
            "required_offers": bindings.get("required_offers", []),
            "voice_mode": bindings.get("voice_mode"),
            "forbidden_tokens": bindings.get("forbidden_tokens", []),
            "allowed_exceptions": bindings.get("allowed_exceptions", []),
        }
        print(f"- .kepler/stage-1-bindings.json: PRESENT -> {json.dumps(summary)}")

    return 0


def _check_section_1(
    sec1_lines: list[tuple[int, str]],
    *,
    filename: str,
    project_name: str,
    canonical_origin: str,
) -> list[str]:
    issues: list[str] = []
    sec1_text = "\n".join(line for _, line in sec1_lines)
    if project_name and not _contains_term(sec1_text, project_name):
        issues.append(f"{filename}: Section 1 missing configured project_name '{project_name}'")
    if canonical_origin:
        origin_clean = canonical_origin.rstrip("/")
        pattern = rf"{re.escape(origin_clean)}/?(?=$|[\s`\"'<>),;|])"
        if not re.search(pattern, sec1_text, re.IGNORECASE):
            issues.append(f"{filename}: Section 1 missing configured canonical_origin '{canonical_origin}'")
    return issues


def _find_col_index(header_cells: list[str], keywords: tuple[str, ...], *, default: int = 0) -> int:
    for idx, cell in enumerate(header_cells):
        lowered = kit_common.strip_md(cell).lower()
        if any(kw in lowered for kw in keywords):
            return idx
    return default


def _check_section_2(sec2_lines: list[tuple[int, str]], *, filename: str) -> list[str]:
    issues: list[str] = []
    tables = kit_common.parse_markdown_tables(sec2_lines)
    if not tables:
        return [f"{filename}: Section 2 missing Markdown directory & search engine submission table"]

    gsc_rows: set[tuple[int, int]] = set()
    bing_rows: set[tuple[int, int]] = set()
    dir_rows_by_platform: dict[str, set[tuple[int, int]]] = {}
    total_data_rows = 0

    for t_idx, table in enumerate(tables):
        if len(table) <= 1:
            continue
        header_cells = table[0][1]
        default_col = 1 if header_cells and kit_common.strip_md(header_cells[0]) in ("#", "No", "No.") else 0
        platform_col = _find_col_index(
            header_cells,
            ("platform", "directory", "channel", "property", "engine"),
            default=default_col,
        )

        for r_idx, (_, cells) in enumerate(table[1:]):
            total_data_rows += 1
            nonempty_cells = sum(1 for c in cells if kit_common.strip_md(c))
            if nonempty_cells < 2 or platform_col >= len(cells):
                continue
            platform_cell = kit_common.strip_md(cells[platform_col])
            if not platform_cell:
                continue

            row_key = (t_idx, r_idx)
            matched_labels: list[str] = []
            if re.search(r"\bgoogle\s+search\s+console\b", platform_cell, re.IGNORECASE):
                gsc_rows.add(row_key)
                matched_labels.append("GSC")
            if re.search(r"\bbing\s+webmaster\s+tools\b", platform_cell, re.IGNORECASE):
                bing_rows.add(row_key)
                matched_labels.append("Bing")
            for name, pat in EXTERNAL_DIRECTORY_PATTERNS:
                if re.search(pat, platform_cell, re.IGNORECASE):
                    dir_rows_by_platform.setdefault(name, set()).add(row_key)
                    matched_labels.append(name)

            if len(matched_labels) > 1:
                issues.append(
                    f"{filename}: Section 2 row combines multiple platforms ({', '.join(matched_labels)}); "
                    "each platform must occupy its own dedicated row"
                )

    if total_data_rows == 0:
        return [f"{filename}: Section 2 table has no data rows"]

    if not gsc_rows:
        issues.append(f"{filename}: Section 2 matrix missing dedicated 'Google Search Console' row")
    if not bing_rows:
        issues.append(f"{filename}: Section 2 matrix missing dedicated 'Bing Webmaster Tools' row")

    used_search_rows: set[tuple[int, int]] = set()
    if gsc_rows:
        used_search_rows.add(next(iter(sorted(gsc_rows))))
    distinct_bing = sorted(bing_rows - used_search_rows)
    if bing_rows and not distinct_bing:
        issues.append(f"{filename}: Section 2 'Bing Webmaster Tools' must be on a separate row from Google Search Console")
    elif distinct_bing:
        used_search_rows.add(distinct_bing[0])

    distinct_dir_platforms: list[str] = []
    used_dir_rows: set[tuple[int, int]] = set()
    for name, rows in dir_rows_by_platform.items():
        available = sorted(rows - used_search_rows - used_dir_rows)
        if available:
            distinct_dir_platforms.append(name)
            used_dir_rows.add(available[0])

    if len(distinct_dir_platforms) < 2:
        issues.append(
            f"{filename}: Section 2 matrix expected >= 2 external directory/authority platforms on distinct rows "
            f"(e.g. LinkedIn, GitHub, Clutch, GoodFirms, Crunchbase), found {len(distinct_dir_platforms)} "
            f"({distinct_dir_platforms})"
        )

    distinct_total = len(used_search_rows | used_dir_rows)
    if distinct_total < 4:
        issues.append(
            f"{filename}: Section 2 matrix expected >= 4 distinct matched platform rows "
            f"(GSC, Bing Webmaster Tools, and >= 2 directories), found {distinct_total}"
        )
    return issues


def _check_section_3(
    sec3_lines: list[tuple[int, str]],
    *,
    filename: str,
    origin_host: str,
    canonical_origin: str,
    expected_same_as: list[str],
) -> list[str]:
    issues: list[str] = []
    sec3_text = "\n".join(line for _, line in sec3_lines)
    extracted = _extract_urls(sec3_text)

    valid_external_https: list[str] = []
    seen_external: set[str] = set()
    seen_self_refs: set[str] = set()
    extracted_norm: set[str] = set()

    for url in extracted:
        parsed = urlparse(url)
        host = (parsed.hostname or "").lower()
        scheme = parsed.scheme.lower()
        norm = url.rstrip("/").lower()
        extracted_norm.add(norm)

        if origin_host and host == origin_host:
            if norm not in seen_self_refs:
                seen_self_refs.add(norm)
                issues.append(
                    f"{filename}: Section 3 contains self-referencing sameAs URL '{url}' "
                    f"matching canonical_origin '{canonical_origin}'"
                )
            continue

        if scheme == "https" and host:
            if norm not in seen_external:
                seen_external.add(norm)
                valid_external_https.append(url)

    if len(valid_external_https) < 2:
        issues.append(
            f"{filename}: Section 3 expected >= 2 distinct valid external https:// sameAs URLs, "
            f"found {len(valid_external_https)}"
        )

    for expected_url in expected_same_as:
        norm_expected = expected_url.rstrip("/").lower()
        if norm_expected not in extracted_norm:
            issues.append(f"{filename}: Section 3 missing expected sameAs URL '{expected_url}' from bindings")

    return issues


def _check_section_5(
    sec5_lines: list[tuple[int, str]],
    *,
    filename: str,
    origin_host: str,
    canonical_origin: str,
) -> list[str]:
    issues: list[str] = []
    blocks = _extract_fenced_code_blocks(sec5_lines)
    if not blocks:
        return [f"{filename}: Section 5 missing fenced frontmatter code block with 'canonical_url:'"]

    found_canonical_urls: list[tuple[int, str]] = []
    for block_start, body in blocks:
        for offset, line in enumerate(body.splitlines(), start=1):
            m = CANONICAL_URL_RE.match(line)
            if not m:
                continue
            raw_val = m.group(1).strip()
            if not raw_val:
                issues.append(f"{filename}:{block_start + offset}: empty canonical_url value in Section 5")
                continue
            token = raw_val.split()[0].strip().strip("'\"")
            found_canonical_urls.append((block_start + offset, token))

    if not found_canonical_urls:
        return [f"{filename}: Section 5 fenced code block(s) missing 'canonical_url:' field"]

    for line_no, url in found_canonical_urls:
        parsed = urlparse(url)
        host = (parsed.hostname or "").lower()
        if parsed.scheme.lower() != "https" or not host:
            issues.append(
                f"{filename}:{line_no}: Section 5 canonical_url '{url}' must be a valid https:// URL"
            )
            continue
        if origin_host and host != origin_host:
            issues.append(
                f"{filename}:{line_no}: Section 5 canonical_url '{url}' host '{host}' "
                f"does not match canonical_origin '{canonical_origin}'"
            )

    return issues


def _check_section_6(
    sec6_lines: list[tuple[int, str]],
    *,
    filename: str,
    bilingual_ar: bool,
) -> list[str]:
    issues: list[str] = []
    tables = kit_common.parse_markdown_tables(sec6_lines)
    if not tables:
        return [f"{filename}: Section 6 missing Markdown discovery prompt benchmark table"]

    prompt_table = tables[0]
    for candidate in tables:
        header_text = " ".join(candidate[0][1]).lower()
        if "prompt" in header_text or "query" in header_text:
            prompt_table = candidate
            break

    header_cells = prompt_table[0][1]
    default_col = 1 if header_cells and kit_common.strip_md(header_cells[0]) in ("#", "No", "No.") else 0
    prompt_col = _find_col_index(
        header_cells,
        ("prompt", "query", "question"),
        default=default_col,
    )

    data_rows = prompt_table[1:] if len(prompt_table) > 1 else []
    valid_prompts: list[str] = []
    seen_prompts: set[str] = set()
    valid_ar_prompts: set[str] = set()

    for line_no, cells in data_rows:
        prompt_text = kit_common.strip_md(cells[prompt_col]) if prompt_col < len(cells) else ""
        cleaned = re.sub(r"\.\.\.|…", "", prompt_text).strip()
        cleaned = re.sub(r"\s+", " ", cleaned)
        if not cleaned or len(cleaned) < 15 or re.search(r"<[^>]+>|\[[^\]]+\]", prompt_text):
            issues.append(
                f"{filename}:{line_no}: Section 6 prompt cell must be non-empty natural prompt text (>= 15 chars)"
            )
            continue
        norm_prompt = cleaned.lower()
        if norm_prompt not in seen_prompts:
            seen_prompts.add(norm_prompt)
            valid_prompts.append(prompt_text)
        if ARABIC_SCRIPT_RE.search(prompt_text):
            valid_ar_prompts.add(norm_prompt)

    if len(valid_prompts) < 5:
        issues.append(
            f"{filename}: Section 6 expected >= 5 valid unbranded discovery prompt rows (>= 15 chars each), "
            f"found {len(valid_prompts)}"
        )

    if bilingual_ar and len(valid_ar_prompts) < 2:
        issues.append(
            f"{filename}: Section 6 expected >= 2 Arabic discovery prompt rows in the prompt column "
            f"for bilingual config, found {len(valid_ar_prompts)}"
        )

    return issues


def verify_citation_text(
    text: str,
    *,
    filename: str = "stage-1-offsite-citation-pack.md",
    bindings: dict[str, Any] | None = None,
) -> list[str]:
    cfg = bindings or {}
    issues, sections = kit_common.check_h2_headings(text, REQUIRED_H2, filename, require_prose=True)

    project_name = str(cfg.get("project_name") or "").strip()
    canonical_origin = str(cfg.get("canonical_origin") or "").strip()
    origin_host = (urlparse(canonical_origin).hostname or "").lower() if canonical_origin else ""
    expected_same_as = [str(u).strip() for u in (cfg.get("expected_same_as") or []) if str(u).strip()]
    bilingual_ar = _requires_bilingual_arabic(cfg)

    if SEC_1 in sections:
        issues.extend(
            _check_section_1(
                sections[SEC_1],
                filename=filename,
                project_name=project_name,
                canonical_origin=canonical_origin,
            )
        )

    if SEC_2 in sections:
        issues.extend(_check_section_2(sections[SEC_2], filename=filename))

    if SEC_3 in sections:
        issues.extend(
            _check_section_3(
                sections[SEC_3],
                filename=filename,
                origin_host=origin_host,
                canonical_origin=canonical_origin,
                expected_same_as=expected_same_as,
            )
        )

    if SEC_4 in sections and bilingual_ar:
        sec4_prose = _strip_code_blocks(sections[SEC_4])
        if not ARABIC_SCRIPT_RE.search(sec4_prose):
            issues.append(
                f"{filename}: Section 4 bilingual Arabic profile/review copy required when Arabic locale is configured"
            )

    if SEC_5 in sections:
        issues.extend(
            _check_section_5(
                sections[SEC_5],
                filename=filename,
                origin_host=origin_host,
                canonical_origin=canonical_origin,
            )
        )

    if SEC_6 in sections:
        issues.extend(_check_section_6(sections[SEC_6], filename=filename, bilingual_ar=bilingual_ar))

    if SEC_7 in sections:
        issues.extend(
            kit_common.check_self_audit_table(
                sections[SEC_7],
                min_rows=7,
                section_label=f"{filename} Section 7 (Mandatory Self-Audit Checklist)",
            )
        )

    issues.extend(kit_common.find_unfilled_slots(text, filename=filename))
    issues.extend(prose_audit.audit_text(text, filename=filename, bindings=cfg))
    return issues


def verify_citation_file(
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
    return verify_citation_text(text, filename=target.name, bindings=bindings)


def _build_sample_doc(
    *,
    project_name: str = "Acme Cloud",
    canonical_origin: str = "https://acme.example",
    include_bing: bool = True,
    sec2_override: str | None = None,
    same_as_urls: tuple[str, ...] = (
        "https://www.linkedin.com/company/acme-cloud",
        "https://github.com/acme-cloud",
        "https://clutch.co/profile/acme-cloud",
    ),
    include_arabic_section4: bool = False,
    syndication_canonical_url: str = "https://acme.example/articles/deterministic-releases",
    prompt_count: int = 6,
    arabic_prompt_count: int = 0,
    prompts_override: str | None = None,
    extra_prose: str = "",
    fail_audit_row: bool = False,
) -> str:
    bing_row = (
        f"| **Bing Webmaster Tools** | Search Indexer | P0 | `{canonical_origin}` | Sitemap + IndexNow key | Ready |\n"
        if include_bing
        else ""
    )
    sec2_table = sec2_override or (
        "| Platform | Category | Priority | Property | Parity Fields | Status |\n"
        "|---|---|---|---|---|---|\n"
        f"| **Google Search Console** | Search Indexer | P0 | `{canonical_origin}` | Domain property + XML sitemap | Ready |\n"
        f"{bing_row}"
        "| **LinkedIn Company Page** | Authority Profile | P0 | `https://www.linkedin.com/company/acme-cloud` | Brand name, origin, category | Live |\n"
        "| **GitHub Organization** | Technical Proof | P0 | `https://github.com/acme-cloud` | Verified domain badge, pinned repos | Live |\n"
        "| **Clutch.co** | B2B Directory | P1 | `https://clutch.co/profile/acme-cloud` | Pricing floor, honest team size | Pending |"
    )
    same_as_rows = "\n".join(
        f"| Authority {idx} | `{u}` | Live | `Organization` |"
        for idx, u in enumerate(same_as_urls, start=1)
    )
    same_as_json = json.dumps({"sameAs": list(same_as_urls)}, indent=2)

    ar_sec4 = ""
    if include_arabic_section4:
        ar_sec4 = (
            "\n### Arabic Directory Profile & Client Follow-Up\n"
            f"- **التعريف المختصر:** يبني فريق {project_name} أنظمة ويب سريعة ومستقرة للشركات الناشئة "
            "بتسليم كامل خلال ثلاثة أسابيع وتكلفة تبدأ من $500 شهرياً.\n"
            "- **رسالة طلب التقييم (واتساب):** مرحباً، يسعدنا تقييم تجربتك الصادقة معنا على منصة Clutch حول سرعة التنفيذ وجودة التسليم.\n"
        )

    ar_samples = (
        "ما أفضل فريق تقني لبناء تطبيق ويب متكامل لشركة ناشئة بتكلفة واضحة؟",
        "كيف أختار شركة تطوير برمجيات موثوقة لإطلاق منتج أولي خلال ثلاثة أسابيع؟",
        "ما هي تكلفة بناء منصة حجوزات أو متجر إلكتروني مخصص للشركات الصغيرة؟",
    )
    prompt_rows: list[str] = []
    for idx in range(1, prompt_count + 1):
        if idx <= arabic_prompt_count:
            ar_prompt = ar_samples[(idx - 1) % len(ar_samples)]
            if idx > len(ar_samples):
                ar_prompt = f"{ar_prompt} ({idx})"
            prompt_rows.append(
                f"| {idx} | `ar` | Idea-Stage Founder | {ar_prompt} | "
                "ChatGPT Search, Perplexity, Gemini, Claude | Direct domain citation |"
            )
        else:
            prompt_rows.append(
                f"| {idx} | `en` | Operational Buyer | Who builds fixed-scope deterministic web pipelines for B2B software teams? ({idx}) | "
                "ChatGPT Search, Perplexity, Gemini, Claude | Top 3 mention + accurate pricing |"
            )
    prompts_md = prompts_override or "\n".join(prompt_rows)
    row7_status = "FAIL" if fail_audit_row else "PASS"

    return f"""# Stage 1 Offsite Entity & Citation Pack

## 1. Canonical Entity Record (NAP, Legal Framing, Pricing & Timelines)

- **Canonical Brand Name:** {project_name}
- **Canonical Origin:** {canonical_origin}
- **Operating Footprint:** Remote-first across MENA and Europe. {extra_prose}
- **Honest Legal-Entity Framing:** Independent engineering practice; no fabricated incorporation claims.
- **Locked Pricing Anchors:** Fixed-scope sprint starting at $2,500; maintenance retainer at $500 per month.
- **Locked Delivery Timelines:** Three weeks from signed scope to verified production handoff.

## 2. Priority Directory & Search Engine Submission Matrix

{sec2_table}

## 3. Verified sameAs URL Registry (JSON-LD Parity)

| Platform | Canonical `sameAs` URL | Status | JSON-LD Node |
|---|---|---|---|
{same_as_rows}

```json
{same_as_json}
```

## 4. Bilingual Directory Profiles & Review Request Scripts (EN & AR)

### English Profile Copy
- **Short Bio:** {project_name} builds deterministic web applications and verification pipelines for software teams on tight release schedules, delivering full source handoff in three weeks starting at $2,500.

### Ethical Past-Client Review Scripts
- **Email:** Hi there, thanks for shipping with us last quarter. If you have two minutes, an honest review on Clutch describing what problem we solved helps founders evaluate our work.
{ar_sec4}
## 5. Syndication Articles & Canonical Frontmatter Pack

```yaml
---
title: "Deterministic Release Verification for Small Engineering Teams"
published: true
description: "Practical checklist for catching schema and copy regressions before launch."
tags: engineering, webdev, productivity
canonical_url: {syndication_canonical_url}
---
```

Publish on {canonical_origin} first, then cross-post to Dev.to and Hashnode with `canonical_url` preserved.

## 6. AI Visibility Prompt Benchmark Suite & Optional MCP Setup

| # | Locale | Buyer Stage | Unbranded Discovery Prompt | Target Engines | Success Criteria |
|---|---|---|---|---|---|
{prompts_md}

### Optional Open-Source & MCP Tools
- `limelit-co/open` (Apache-2.0) and `AminForou/mcp-gsc` (MIT) support ongoing local tracking; inspect `ncosentino/bing-webmaster-mcp` locally before running.

## 7. Mandatory Self-Audit Checklist

| # | Audit Gate | Evidence | Status |
|---|---|---|---|
| 1 | Seven H2 sections in exact order | Verified | PASS |
| 2 | Section 1 entity record and honest legal framing | Verified | PASS |
| 3 | Section 2 GSC + Bing Webmaster Tools + directories | Verified | PASS |
| 4 | Section 3 external HTTPS sameAs without self-refs | Verified | PASS |
| 5 | Section 4 bilingual profiles and ethical review scripts | Verified | PASS |
| 6 | Section 5 syndication canonical_url parity | Verified | PASS |
| 7 | Section 6 prompts and clean prose audit | Verified | {row7_status} |
"""


def run_self_test() -> int:
    with tempfile.TemporaryDirectory() as tmp:
        tmp_dir = Path(tmp)
        docs_dir = tmp_dir / "docs"
        docs_dir.mkdir(parents=True, exist_ok=True)
        pack_path = docs_dir / "stage-1-offsite-citation-pack.md"

        # 1. Positive: Zero-config mode
        pack_path.write_text(_build_sample_doc(), encoding="utf-8")
        assert verify_citation_file(pack_path, project_dir=tmp_dir) == []

        # 2. Positive: Strict bindings mode (with expected_same_as + bilingual EN/AR)
        bindings_data = {
            "project_name": "Acme Cloud",
            "canonical_origin": "https://acme.example",
            "locales": ["en", "ar"],
            "required_routes": ["/", "/ar"],
            "expected_same_as": [
                "https://www.linkedin.com/company/acme-cloud",
                "https://github.com/acme-cloud",
            ],
            "voice_mode": "brand_plural",
            "forbidden_tokens": ["FounderAlias"],
            "allowed_exceptions": ["legal@founderalias.example"],
        }
        kepler_dir = tmp_dir / ".kepler"
        kepler_dir.mkdir(parents=True, exist_ok=True)
        (kepler_dir / "stage-1-bindings.json").write_text(json.dumps(bindings_data), encoding="utf-8")

        bilingual_ok = _build_sample_doc(
            include_arabic_section4=True,
            arabic_prompt_count=2,
            extra_prose="Contact legal@founderalias.example for compliance inquiries.",
        )
        pack_path.write_text(bilingual_ok, encoding="utf-8")
        strict_issues = verify_citation_file(pack_path, project_dir=tmp_dir)
        assert strict_issues == [], f"Strict bilingual mode failed unexpectedly: {strict_issues}"

        # 3. Positive: /articles must not falsely trigger Arabic requirement
        articles_bindings = {
            **bindings_data,
            "required_routes": ["/", "/articles"],
        }
        en_only_doc = _build_sample_doc(include_arabic_section4=False, arabic_prompt_count=0)
        assert verify_citation_text(en_only_doc, bindings=articles_bindings) == []

        # 4. Negative: missing Bing Webmaster Tools
        no_bing = _build_sample_doc(include_bing=False, include_arabic_section4=True, arabic_prompt_count=2)
        no_bing_issues = verify_citation_text(no_bing, bindings=bindings_data)
        assert any("Bing Webmaster Tools" in e for e in no_bing_issues), no_bing_issues

        # 4b. Negative: Section 2 single stuffed row spoof fails
        stuffed_sec2 = _build_sample_doc(
            sec2_override=(
                "| Platform | Category | Priority | Property | Parity Fields | Status |\n"
                "|---|---|---|---|---|---|\n"
                "| Google Search Console Bing Webmaster Tools LinkedIn GitHub | All | P0 | `https://acme.example` | All | Ready |"
            ),
            include_arabic_section4=True,
            arabic_prompt_count=2,
        )
        stuffed_sec2_issues = verify_citation_text(stuffed_sec2, bindings=bindings_data)
        assert any("combines multiple platforms" in e for e in stuffed_sec2_issues), stuffed_sec2_issues
        assert any("expected >= 4 distinct matched platform rows" in e for e in stuffed_sec2_issues), stuffed_sec2_issues

        # 5. Negative: self-referencing sameAs URL matching canonical_origin (and :443 port evasion)
        self_ref_doc = _build_sample_doc(
            same_as_urls=(
                "https://acme.example/",
                "https://www.linkedin.com/company/acme-cloud",
                "https://github.com/acme-cloud",
            ),
            include_arabic_section4=True,
            arabic_prompt_count=2,
        )
        self_ref_issues = verify_citation_text(self_ref_doc, bindings=bindings_data)
        assert any("self-referencing sameAs URL" in e for e in self_ref_issues), self_ref_issues

        port_evasion_doc = _build_sample_doc(
            same_as_urls=(
                "https://acme.example:443/",
                "https://www.linkedin.com/company/acme-cloud",
                "https://github.com/acme-cloud",
            ),
            include_arabic_section4=True,
            arabic_prompt_count=2,
        )
        port_evasion_issues = verify_citation_text(port_evasion_doc, bindings=bindings_data)
        assert any("self-referencing sameAs URL 'https://acme.example:443/'" in e for e in port_evasion_issues), (
            port_evasion_issues
        )

        # 6. Negative: wrong canonical_url origin in Section 5
        wrong_canon_doc = _build_sample_doc(
            syndication_canonical_url="https://dev.to/acme-cloud/post",
            include_arabic_section4=True,
            arabic_prompt_count=2,
        )
        wrong_canon_issues = verify_citation_text(wrong_canon_doc, bindings=bindings_data)
        assert any("does not match canonical_origin" in e for e in wrong_canon_issues), wrong_canon_issues

        # 7. Negative: < 5 discovery prompts in Section 6 & empty/stub <15-char prompts
        few_prompts_doc = _build_sample_doc(
            prompt_count=4,
            include_arabic_section4=True,
            arabic_prompt_count=2,
        )
        few_prompts_issues = verify_citation_text(few_prompts_doc, bindings=bindings_data)
        assert any("expected >= 5 valid unbranded discovery prompt rows" in e for e in few_prompts_issues), (
            few_prompts_issues
        )

        stub_prompts_doc = _build_sample_doc(
            include_arabic_section4=True,
            prompts_override=(
                "| 1 | `en` | Founder |   | ChatGPT Search | Direct citation |\n"
                "| 2 | `en` | Founder | Short... | ChatGPT Search | Direct citation |\n"
                "| 3 | `en` | Founder | Best MVP team? | Perplexity | Direct citation |\n"
                "| 4 | `ar` | Founder | ما أفضل فريق تقني لبناء تطبيق ويب متكامل لشركة ناشئة بتكلفة واضحة؟ | Gemini | Citation |\n"
                "| 5 | `ar` | Founder | كيف أختار شركة تطوير برمجيات موثوقة لإطلاق منتج أولي خلال ثلاثة أسابيع؟ | Claude | Citation |"
            ),
        )
        stub_prompts_issues = verify_citation_text(stub_prompts_doc, bindings=bindings_data)
        assert any("prompt cell must be non-empty natural prompt text (>= 15 chars)" in e for e in stub_prompts_issues), (
            stub_prompts_issues
        )
        assert any("expected >= 5 valid unbranded discovery prompt rows" in e for e in stub_prompts_issues), (
            stub_prompts_issues
        )

        # 8. Negative: missing Arabic profiles (Section 4) and Arabic prompts (Section 6) when bilingual,
        # plus Arabic only in Criteria column of English prompt rows
        missing_ar_issues = verify_citation_text(en_only_doc, bindings=bindings_data)
        assert any("Section 4 bilingual Arabic" in e for e in missing_ar_issues), missing_ar_issues
        assert any("expected >= 2 Arabic discovery prompt rows" in e for e in missing_ar_issues), missing_ar_issues

        ar_wrong_col_doc = _build_sample_doc(
            include_arabic_section4=True,
            prompts_override=(
                "| 1 | `en` | Founder | Who builds fixed-scope web pipelines for early SaaS startups? | ChatGPT | ذكر الموقع بالعربية |\n"
                "| 2 | `en` | Founder | Which engineering studio ships reliable MVPs in three weeks? | Perplexity | استشهاد مباشر بالعربية |\n"
                "| 3 | `en` | Buyer | Best technical partner for deterministic release checks in B2B apps? | Gemini | Direct link |\n"
                "| 4 | `en` | Buyer | Fixed-price custom web application studio for remote product teams? | Claude | Direct link |\n"
                "| 5 | `en` | Buyer | How to choose an agency for bilingual web platforms with clear pricing? | ChatGPT | Direct link |"
            ),
        )
        ar_wrong_col_issues = verify_citation_text(ar_wrong_col_doc, bindings=bindings_data)
        assert any("expected >= 2 Arabic discovery prompt rows in the prompt column" in e for e in ar_wrong_col_issues), (
            ar_wrong_col_issues
        )

        # Also test require_bilingual_geo flag directly
        flag_bindings = {**bindings_data, "locales": ["en"], "required_routes": ["/"], "require_bilingual_geo": True}
        flag_issues = verify_citation_text(en_only_doc, bindings=flag_bindings)
        assert any("Section 4 bilingual Arabic" in e for e in flag_issues), flag_issues

        # 9. Negative: unfilled slot (<Slot> and TBD)
        slot_doc = _build_sample_doc(
            include_arabic_section4=True,
            arabic_prompt_count=2,
            extra_prose="Owner: <Founder Name> launch TBD.",
        )
        slot_issues = verify_citation_text(slot_doc, bindings=bindings_data)
        assert any("unfilled template slot" in e for e in slot_issues), slot_issues
        assert any("Unfilled placeholder token" in e for e in slot_issues), slot_issues

        # 10. Negative: Arabic corporate slop and Arabic /mo unit leak
        ar_bad_doc = _build_sample_doc(
            include_arabic_section4=True,
            arabic_prompt_count=2,
            extra_prose="نقدم حلول متكاملة مبتكرة بسعر يبدأ من $250/mo للشركات.",
        )
        ar_bad_issues = verify_citation_text(ar_bad_doc, bindings=bindings_data)
        assert any("Banned Arabic slop phrase" in e for e in ar_bad_issues), ar_bad_issues
        assert any("Arabic mixed-unit leak" in e for e in ar_bad_issues), ar_bad_issues

        # 11. Negative: missing expected_same_as, FAIL audit row
        missing_expected = _build_sample_doc(
            same_as_urls=("https://www.linkedin.com/company/acme-cloud", "https://clutch.co/profile/acme-cloud"),
            include_arabic_section4=True,
            arabic_prompt_count=2,
            fail_audit_row=True,
        )
        missing_expected_issues = verify_citation_text(missing_expected, bindings=bindings_data)
        assert any("missing expected sameAs URL 'https://github.com/acme-cloud'" in e for e in missing_expected_issues)
        assert any("contains FAIL row" in e for e in missing_expected_issues)

        # 12. Context check runs cleanly
        assert run_context(tmp_dir) == 0

    print(
        "PASS: citation_audit.py --self-test passed "
        "(zero-config, strict bindings, missing Bing, stuffed Sec 2 row, self-ref + :443 port evasion, "
        "wrong canonical_url, <5/stub prompts, bilingual Arabic profiles & prompt-column checks, "
        "unfilled slots, Arabic slop/unit leak, and context checks)."
    )
    return 0


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(
        description="Audit Stage 1 Role 1.6 (offsite-entity-and-citation-builder) kit, context, and deliverable."
    )
    parser.add_argument("--kit", action="store_true", help="Validate the offsite-entity-and-citation-builder role kit.")
    parser.add_argument("--context", action="store_true", help="Summarize Stage 1 upstream briefs and bindings.")
    parser.add_argument("--verify", metavar="PATH", help="Verify a Stage 1 offsite citation pack Markdown file.")
    parser.add_argument("--project-dir", default=".", help="Project root directory (default: current directory).")
    parser.add_argument("--config", help="Optional explicit path to stage-1-bindings.json.")
    parser.add_argument("--self-test", action="store_true", help="Run built-in offline self-tests.")
    args = parser.parse_args(argv)

    if args.self_test:
        return run_self_test()

    if args.kit:
        issues = verify_kit(KIT_DIR)
        if issues:
            print(f"FAIL: citation_audit.py --kit found {len(issues)} issue(s):")
            for issue in issues:
                print(f"FAIL: {issue}")
            return 1
        print(
            "PASS: citation_audit.py --kit verified ROLE.md, START-SESSION.md, 3 SKILL.md files, "
            "template, and prose audit."
        )
        return 0

    if args.context:
        return run_context(Path(args.project_dir))

    if args.verify:
        issues = verify_citation_file(args.verify, project_dir=Path(args.project_dir), explicit_config=args.config)
        if issues:
            print(f"FAIL: citation_audit.py --verify found {len(issues)} issue(s):")
            for issue in issues:
                print(f"FAIL: {issue}")
            return 1
        print(f"PASS: citation_audit.py --verify passed for {args.verify}.")
        return 0

    parser.print_help()
    return 2


if __name__ == "__main__":
    raise SystemExit(main())
