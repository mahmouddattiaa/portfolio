#!/usr/bin/env python3
"""
Deterministic kit, context, and deliverable verifier for Stage 1 Role 1.1 (product-strategist).

Usage:
  python3 -B positioning_audit.py --kit
  python3 -B positioning_audit.py --context [--project-dir <dir>]
  python3 -B positioning_audit.py --verify <brief_path> <marketing_path> [--project-dir <dir>] [--config <bindings.json>]
  python3 -B positioning_audit.py --self-test
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

KIT_DIR = Path(__file__).resolve().parent.parent

EXPECTED_SKILLS: tuple[str, ...] = (
    "positioning-workshop",
    "offer-and-funnel-architecture",
    "shared-marketing-context",
)

BRIEF_REQUIRED_H2: tuple[str, ...] = (
    "1. Product Positioning Statement & Category Thesis",
    "2. Target Buyer & User Profiles (ICPs)",
    "3. Core Capabilities & Product Lines",
    "4. Commercial Offers, Tiers & Packaging",
    "5. Competitive Differentiation & Proof Points",
    "6. Proof, Feature & Portfolio Inventory Mapping",
    "7. Multi-Route Conversion Architecture & Hero Direction",
    "8. Mandatory Self-Audit Checklist",
)

MARKETING_REQUIRED_H2: tuple[str, ...] = (
    "1. Brand Identity, Voice & Attribution Rules",
    "2. Positioning & Value Proposition Summary",
    "3. Target Audience, Pain Points & Buyer Language",
    "4. Offers, Capabilities & Proof Inventory",
    "5. Route Funnel & Conversion Goals",
    "6. Terminology, Guardrails & Banned Claims",
)

EXPECTED_TEMPLATES: dict[str, tuple[str, ...]] = {
    "positioning-brief.template.md": BRIEF_REQUIRED_H2,
    "product-marketing.template.md": MARKETING_REQUIRED_H2,
}

CONTEXT_DOCS: tuple[tuple[str, str], ...] = (
    ("docs/context/project-digest.md", "Project Digest"),
    (".agents/project-brief.md", "Project Brief"),
    ("docs/stage-0-product-concept-and-prd.md", "Stage 0 Concept & PRD (optional)"),
    (".kepler/stage-1-bindings.json", "Stage 1 Bindings (optional)"),
)


def _load_shared_module(module_stem: str, module_alias: str) -> Any:
    """Locate and load a shared Stage 1 script from parent scripts/ or stage-1-shared/scripts/."""
    resolved = Path(__file__).resolve()
    candidates: list[Path] = []
    for parent in resolved.parents:
        candidates.append(parent / "scripts" / f"{module_stem}.py")
        candidates.append(parent / "stage-1-shared" / "scripts" / f"{module_stem}.py")
    for candidate in candidates:
        if candidate.is_file():
            spec = importlib.util.spec_from_file_location(module_alias, candidate)
            if spec and spec.loader:
                mod = importlib.util.module_from_spec(spec)
                spec.loader.exec_module(mod)
                return mod
    raise FileNotFoundError(
        f"Could not locate {module_stem}.py in parent scripts/ or stage-1-shared/scripts/"
    )


kit_common = _load_shared_module("kit_common", "stage1_kit_common")
prose_audit = kit_common.load_prose_audit(__file__)


def _section_text(lines: list[tuple[int, str]]) -> str:
    return "\n".join(line for _, line in lines)


def _route_present_in_section(route: str, lines: list[tuple[int, str]]) -> bool:
    return kit_common.route_present_in_section(route, lines)


def _term_present_in_section(term: str, lines: list[tuple[int, str]]) -> bool:
    target = term.strip()
    if not target:
        return True
    text = _section_text(lines)
    return re.search(re.escape(target), text, re.IGNORECASE) is not None


_ECON_SUBSECTION_HEADING_RE = re.compile(
    r"^(#{3,4})\s+.*economic\s*(?:&|and)\s*speed\s*mechanism\b",
    re.IGNORECASE,
)
_HEADING_LEVEL_RE = re.compile(r"^(#{2,6})\s+")
_OFFER_PRICING_COL_RE = re.compile(r"\b(?:pricing|price|timeline)\b", re.IGNORECASE)
_ECON_COST_RE = re.compile(
    r"\b(?:cost|costs|pricing|price|priced|affordable|competitive|overhead|account[- ]manager|"
    r"account[- ]managers|retainer|retainers|markup|margin|margins|middlemen|middleman|"
    r"layer|layers|lean|budget|fees?|rate|rates)\b",
    re.IGNORECASE,
)
_ECON_SPEED_RE = re.compile(
    r"\b(?:speed|fast|faster|rapid|quick|quicker|cycle|cycles|compressed|compress|"
    r"turnaround|timeline|timelines|sprint|sprints|week|weeks|day|days|cadence|"
    r"velocity|accelerate|accelerated|acceleration|scaffold|scaffolding)\b",
    re.IGNORECASE,
)
_ECON_QUALITY_RE = re.compile(
    r"\b(?:quality|verification|verify|verified|gate|gates|test|tests|testing|tested|"
    r"deterministic|audit|audited|audits|ci|type[- ]safe|typed|schema|contract[- ]first|"
    r"contracts?|review|reviews|handoff|handoffs|runbook|runbooks|reliability|reliable|"
    r"production[- ]grade|rigor)\b",
    re.IGNORECASE,
)
_PLACEHOLDER_CELL_RE = re.compile(
    r"^(?:[-–—.…]+|n/?a|none|null|tbd|todo|fixme|tba|fill_in|fill_here|placeholder|insert\b.*)$",
    re.IGNORECASE,
)


def _is_placeholder_cell(cell: str) -> bool:
    stripped = kit_common.strip_md(cell)
    if not stripped:
        return True
    if _PLACEHOLDER_CELL_RE.fullmatch(stripped):
        return True
    if re.search(r"<[A-Za-z][^<>\n]{1,120}>", stripped):
        without_slots = re.sub(r"<[A-Za-z][^<>\n]{1,120}>", "", stripped).strip(" -:;,.")
        if not without_slots:
            return True
    if re.search(r"\[(?:FILL|TBD|TODO|PLACEHOLDER|INSERT)[^\]]*\]", stripped, re.IGNORECASE):
        return True
    if len(re.findall(r"[^\W_]", stripped, re.UNICODE)) < 2:
        return True
    return False


def _extract_econ_subsection_lines(lines: list[tuple[int, str]]) -> list[tuple[int, str]] | None:
    collected: list[tuple[int, str]] = []
    in_code_block = False
    capturing_level: int | None = None

    for idx, raw in lines:
        s = raw.strip()
        if s.startswith("```"):
            in_code_block = not in_code_block
            if capturing_level is not None:
                collected.append((idx, raw))
            continue
        if not in_code_block:
            if capturing_level is None:
                heading_match = _ECON_SUBSECTION_HEADING_RE.match(s)
                if heading_match:
                    capturing_level = len(heading_match.group(1))
                continue
            level_match = _HEADING_LEVEL_RE.match(s)
            if level_match and len(level_match.group(1)) <= capturing_level:
                break
        if capturing_level is not None:
            collected.append((idx, raw))

    return collected if capturing_level is not None else None


def _strip_non_substantive_prose(lines: list[tuple[int, str]]) -> list[str]:
    prose_lines: list[str] = []
    in_code_block = False

    for _, raw in lines:
        s = raw.strip()
        if s.startswith("```"):
            in_code_block = not in_code_block
            continue
        if in_code_block or not s or s == "---" or s.startswith("<!--"):
            continue
        if s.startswith("|") and s.endswith("|") and "|" in s[1:-1]:
            continue
        if re.match(r"^#{1,6}\s+", s):
            continue
        cleaned = re.sub(r"^[-*+]\s+|^\d+\.\s+", "", s).strip()
        cleaned = re.sub(r"<[A-Za-z][^<>\n]{1,120}>", "", cleaned)
        cleaned = re.sub(r"\[(?:FILL|TBD|TODO|PLACEHOLDER|INSERT)[^\]]*\]", "", cleaned, flags=re.IGNORECASE)
        cleaned = cleaned.replace("**", "").replace("`", "").strip(" -:;,.")
        if not cleaned or _PLACEHOLDER_CELL_RE.fullmatch(cleaned):
            continue
        prose_lines.append(cleaned)

    return prose_lines


def _missing_econ_prongs(text: str) -> list[str]:
    missing: list[str] = []
    if not _ECON_COST_RE.search(text):
        missing.append("cost/overhead advantage")
    if not _ECON_SPEED_RE.search(text):
        missing.append("cycle speed mechanism")
    if not _ECON_QUALITY_RE.search(text):
        missing.append("quality/verification gate")
    return missing


def _check_offer_pricing_column(
    sec4_lines: list[tuple[int, str]],
    brief_name: str,
) -> list[str]:
    tables = kit_common.parse_markdown_tables(sec4_lines)
    if not tables:
        return [
            f"{brief_name} Section 4: missing Commercial Offers Markdown table with 'Pricing Anchor & Timeline' column "
            "(required by bindings.require_economic_mechanism)"
        ]

    matching_tables: list[tuple[list[tuple[int, list[str]]], list[int]]] = []
    for table in tables:
        if not table:
            continue
        headers = table[0][1]
        col_indices = [
            idx
            for idx, header in enumerate(headers)
            if _OFFER_PRICING_COL_RE.search(kit_common.strip_md(header))
        ]
        if col_indices:
            matching_tables.append((table, col_indices))

    if not matching_tables:
        return [
            f"{brief_name} Section 4: Offers table missing 'Pricing Anchor & Timeline' (pricing/timeline) column "
            "(required by bindings.require_economic_mechanism)"
        ]

    for table, col_indices in matching_tables:
        for _, cells in table[1:]:
            for col_idx in col_indices:
                if col_idx < len(cells) and not _is_placeholder_cell(cells[col_idx]):
                    return []

    return [
        f"{brief_name} Section 4: Offers table 'Pricing Anchor & Timeline' column must contain at least one "
        "non-placeholder value (required by bindings.require_economic_mechanism)"
    ]


def _check_economic_mechanism(
    brief_sections: dict[str, list[tuple[int, str]]],
    brief_name: str,
) -> list[str]:
    sec4_lines = brief_sections.get(BRIEF_REQUIRED_H2[3], [])
    sec5_lines = brief_sections.get(BRIEF_REQUIRED_H2[4], [])

    issues: list[str] = []
    issues.extend(_check_offer_pricing_column(sec4_lines, brief_name))

    explicit_failures: list[str] = []
    found_explicit = False
    mechanism_ok = False

    for sec_label, sec_lines in (("Section 4", sec4_lines), ("Section 5", sec5_lines)):
        sub_lines = _extract_econ_subsection_lines(sec_lines)
        if sub_lines is None:
            continue
        found_explicit = True
        prose = _strip_non_substantive_prose(sub_lines)
        combined = " ".join(prose)
        words = re.findall(r"\b\w+\b", combined)
        if len(words) < 12:
            explicit_failures.append(
                f"{brief_name} {sec_label}: 'Economic & Speed Mechanism' subsection is empty or lacks substantive non-placeholder explanation"
            )
            continue
        missing_prongs = _missing_econ_prongs(combined)
        if not missing_prongs:
            mechanism_ok = True
            break
        explicit_failures.append(
            f"{brief_name} {sec_label}: 'Economic & Speed Mechanism' subsection must explain {', '.join(missing_prongs)}"
        )

    if mechanism_ok:
        return issues

    if found_explicit:
        issues.extend(explicit_failures)
        return issues

    for sec_lines in (sec4_lines, sec5_lines):
        prose = _strip_non_substantive_prose(sec_lines)
        combined = " ".join(prose)
        words = re.findall(r"\b\w+\b", combined)
        if len(words) >= 20 and not _missing_econ_prongs(combined):
            return issues

    issues.append(
        f"{brief_name} Section 4/5: missing 'Economic & Speed Mechanism' subsection or substantive "
        "explanation covering cost/overhead, cycle speed, and quality/verification (required by bindings.require_economic_mechanism)"
    )
    return issues


def _check_discovery_icp(
    brief_sections: dict[str, list[tuple[int, str]]],
    brief_name: str,
) -> list[str]:
    sec2_lines = brief_sections.get(BRIEF_REQUIRED_H2[1], [])
    tables = kit_common.parse_markdown_tables(sec2_lines)
    if not tables:
        return [
            f"{brief_name} Section 2: missing ICP Markdown table with 'Buyer Vocabulary' column "
            "(required by bindings.require_discovery_icp)"
        ]

    target_table: list[tuple[int, list[str]]] | None = None
    vocab_col_idx: int | None = None
    for table in tables:
        if not table:
            continue
        headers = table[0][1]
        for idx, header in enumerate(headers):
            if "buyer vocabulary" in kit_common.strip_md(header).lower():
                target_table = table
                vocab_col_idx = idx
                break
        if target_table is not None:
            break

    if target_table is None or vocab_col_idx is None:
        return [
            f"{brief_name} Section 2: ICP table missing 'Buyer Vocabulary' column "
            "(required by bindings.require_discovery_icp)"
        ]

    valid_icps: list[str] = []
    for _, cells in target_table[1:]:
        icp_cell = cells[0] if cells else ""
        vocab_cell = cells[vocab_col_idx] if vocab_col_idx < len(cells) else ""
        if _is_placeholder_cell(icp_cell) or _is_placeholder_cell(vocab_cell):
            continue
        icp_key = re.sub(r"\s+", " ", kit_common.strip_md(icp_cell).lower())
        if icp_key not in valid_icps:
            valid_icps.append(icp_key)

    if len(valid_icps) < 2:
        return [
            f"{brief_name} Section 2: expected >= 2 distinct ICP rows with non-empty, non-placeholder "
            f"'Buyer Vocabulary' cells, found {len(valid_icps)} (required by bindings.require_discovery_icp)"
        ]
    return []


def verify_kit(kit_dir: Path = KIT_DIR) -> list[str]:
    issues = kit_common.validate_role_kit(
        kit_dir,
        expected_skills=EXPECTED_SKILLS,
        expected_templates=EXPECTED_TEMPLATES,
    )

    role_md = kit_dir / "ROLE.md"
    if role_md.is_file():
        role_text = role_md.read_text(encoding="utf-8")
        if "Project root:" not in role_text:
            issues.append("ROLE.md must include 'Project root:' declaration")

    for tpl_name, required_h2 in EXPECTED_TEMPLATES.items():
        tpl_path = kit_dir / "templates" / tpl_name
        if tpl_path.is_file():
            h2_issues, _ = kit_common.check_h2_headings(
                tpl_path.read_text(encoding="utf-8"),
                required_h2,
                f"templates/{tpl_name}",
                require_prose=False,
            )
            issues.extend(h2_issues)

    kit_md_files: list[Path] = [
        kit_dir / "ROLE.md",
        kit_dir / "START-SESSION.md",
        *(kit_dir / "skills" / s / "SKILL.md" for s in EXPECTED_SKILLS),
        *(kit_dir / "templates" / t for t in EXPECTED_TEMPLATES),
    ]
    for md_file in kit_md_files:
        if md_file.is_file():
            issues.extend(prose_audit.audit_file(md_file))

    return issues


def summarize_context(project_root: Path) -> int:
    print(f"=== Role 1.1 (product-strategist) Context Summary ===")
    print(f"Project root: {project_root.resolve()}")
    print()

    for rel_path, label in CONTEXT_DOCS:
        full_path = project_root / rel_path
        if not full_path.is_file():
            print(f"[MISSING] {label}: {rel_path}")
            continue

        raw = full_path.read_text(encoding="utf-8")
        line_count = len(raw.splitlines())
        print(f"[FOUND]   {label}: {rel_path} ({line_count} lines)")

        if rel_path.endswith(".json"):
            try:
                data = json.loads(raw)
            except json.JSONDecodeError as exc:
                print(f"          Invalid JSON: {exc}")
                continue
            if isinstance(data, dict):
                for key in (
                    "project_name",
                    "canonical_origin",
                    "entity_type",
                    "voice_mode",
                    "forbid_first_person_singular",
                    "required_routes",
                    "required_offers",
                    "required_items",
                    "forbidden_tokens",
                    "require_economic_mechanism",
                    "require_discovery_icp",
                ):
                    if key in data:
                        print(f"          - {key}: {data[key]}")
        else:
            order, _ = kit_common.split_h2_sections(raw)
            if order:
                preview = ", ".join(order[:8])
                suffix = f" (+{len(order) - 8} more)" if len(order) > 8 else ""
                print(f"          - H2 sections ({len(order)}): {preview}{suffix}")

    return 0


def verify_deliverables(
    brief_path: Path,
    marketing_path: Path,
    *,
    project_root: Path,
    explicit_config: str | Path | None = None,
) -> list[str]:
    issues: list[str] = []

    try:
        bindings = kit_common.load_project_bindings(project_root, explicit_config)
    except (OSError, ValueError) as exc:
        return [f"Bindings error: {exc}"]

    if not brief_path.is_file():
        issues.append(f"Missing positioning brief: {brief_path}")
    if not marketing_path.is_file():
        issues.append(f"Missing product marketing context: {marketing_path}")
    if issues:
        return issues

    brief_text = brief_path.read_text(encoding="utf-8")
    marketing_text = marketing_path.read_text(encoding="utf-8")

    brief_h2_issues, brief_sections = kit_common.check_h2_headings(
        brief_text, BRIEF_REQUIRED_H2, brief_path.name, require_prose=True
    )
    issues.extend(brief_h2_issues)

    mkt_h2_issues, mkt_sections = kit_common.check_h2_headings(
        marketing_text, MARKETING_REQUIRED_H2, marketing_path.name, require_prose=True
    )
    issues.extend(mkt_h2_issues)

    audit_sec = BRIEF_REQUIRED_H2[7]
    if audit_sec in brief_sections:
        issues.extend(
            kit_common.check_self_audit_table(
                brief_sections[audit_sec],
                min_rows=7,
                section_label=f"{brief_path.name} Section 8",
            )
        )

    required_routes = [str(r).strip() for r in (bindings.get("required_routes") or []) if str(r).strip()]
    if required_routes:
        brief_route_lines = brief_sections.get(BRIEF_REQUIRED_H2[6], [])
        mkt_route_lines = mkt_sections.get(MARKETING_REQUIRED_H2[4], [])
        for route in required_routes:
            if not _route_present_in_section(route, brief_route_lines):
                issues.append(
                    f"{brief_path.name} Section 7: missing required route '{route}' from bindings"
                )
            if not _route_present_in_section(route, mkt_route_lines):
                issues.append(
                    f"{marketing_path.name} Section 5: missing required route '{route}' from bindings"
                )

    required_offers = [str(o).strip() for o in (bindings.get("required_offers") or []) if str(o).strip()]
    if required_offers:
        brief_offer_lines = brief_sections.get(BRIEF_REQUIRED_H2[3], [])
        mkt_offer_lines = mkt_sections.get(MARKETING_REQUIRED_H2[3], [])
        for offer in required_offers:
            if not _term_present_in_section(offer, brief_offer_lines):
                issues.append(
                    f"{brief_path.name} Section 4: missing required offer '{offer}' from bindings"
                )
            if not _term_present_in_section(offer, mkt_offer_lines):
                issues.append(
                    f"{marketing_path.name} Section 4: missing required offer '{offer}' from bindings"
                )

    required_items = [str(i).strip() for i in (bindings.get("required_items") or []) if str(i).strip()]
    if required_items:
        brief_item_lines = brief_sections.get(BRIEF_REQUIRED_H2[5], [])
        mkt_item_lines = mkt_sections.get(MARKETING_REQUIRED_H2[3], [])
        for item in required_items:
            if not _term_present_in_section(item, brief_item_lines):
                issues.append(
                    f"{brief_path.name} Section 6: missing required item '{item}' from bindings"
                )
            if not _term_present_in_section(item, mkt_item_lines):
                issues.append(
                    f"{marketing_path.name} Section 4: missing required item '{item}' from bindings"
                )

    if bindings.get("require_economic_mechanism"):
        issues.extend(_check_economic_mechanism(brief_sections, brief_path.name))

    if bindings.get("require_discovery_icp"):
        issues.extend(_check_discovery_icp(brief_sections, brief_path.name))

    issues.extend(kit_common.find_unfilled_slots(brief_text, filename=brief_path.name))
    issues.extend(kit_common.find_unfilled_slots(marketing_text, filename=marketing_path.name))
    issues.extend(prose_audit.audit_text(brief_text, filename=brief_path.name, bindings=bindings))
    issues.extend(prose_audit.audit_text(marketing_text, filename=marketing_path.name, bindings=bindings))

    return issues


def _sample_brief(
    *,
    routes: tuple[str, ...] = ("/", "/pricing"),
    offers: tuple[str, ...] = ("Starter", "Pro"),
    items: tuple[str, ...] = ("LedgerCheck CLI",),
    extra_line: str = "",
    fail_audit_row: bool = False,
) -> str:
    offer_rows = "\n".join(
        f"| {offer} | Ops teams | Automated reconciliation | No custom ERP hosting | Start trial |"
        for offer in offers
    )
    item_rows = "\n".join(
        f"| {item} | Finance Ops | {offers[0]} | Deterministic decimal checks | {routes[0]} |"
        for item in items
    )
    route_rows = "\n".join(
        f"| `{route}` | Evaluate workflow | Start trial | Reconcile in 5 minutes | {items[0]} | `/contact` |"
        for route in routes
    )
    last_status = "FAIL" if fail_audit_row else "PASS"
    return f"""# Positioning Brief — Sample Product

## 1. Product Positioning Statement & Category Thesis
For finance operations teams reconciling multi-currency invoices, Sample Product is an automated reconciliation engine that flags discrepancies in 5 minutes.
{extra_line}

## 2. Target Buyer & User Profiles (ICPs)
- **Finance Operations Lead:** Closes monthly books across three accounting systems.

## 3. Core Capabilities & Product Lines
- Deterministic decimal matching engine with immutable audit trails.

## 4. Commercial Offers, Tiers & Packaging
| Offer | Best Fit | Deliverables | Explicit Boundary | Next Step |
|---|---|---|---|---|
{offer_rows}

## 5. Competitive Differentiation & Proof Points
- Unlike manual spreadsheet reconciliation, Sample Product validates every line item deterministically.

## 6. Proof, Feature & Portfolio Inventory Mapping
| Item | ICP | Offer | Proof | Route |
|---|---|---|---|---|
{item_rows}

## 7. Multi-Route Conversion Architecture & Hero Direction
| Route | Visitor Intent | Primary Goal | Hero Direction | Proof | Handoff |
|---|---|---|---|---|---|
{route_rows}

## 8. Mandatory Self-Audit Checklist
| # | Gate | Evidence | Status |
|---|---|---|---|
| 1 | Grounded in digest | Verified | PASS |
| 2 | Positioning complete | Section 1 | PASS |
| 3 | ICPs complete | Section 2 | PASS |
| 4 | Offers complete | Section 4 | PASS |
| 5 | Inventory mapped | Section 6 | PASS |
| 6 | Routes mapped | Section 7 | PASS |
| 7 | Voice and prose clean | Verified | {last_status} |
"""


def _sample_marketing(
    *,
    routes: tuple[str, ...] = ("/", "/pricing"),
    offers: tuple[str, ...] = ("Starter", "Pro"),
    items: tuple[str, ...] = ("LedgerCheck CLI",),
    extra_line: str = "",
) -> str:
    offer_bullets = "\n".join(f"- **{offer}:** Scoped reconciliation tier." for offer in offers)
    item_bullets = "\n".join(f"- **{item}:** Verified deterministic ledger checker." for item in items)
    route_rows = "\n".join(
        f"| `{route}` | Evaluate product | Start trial | Start free check | {items[0]} |"
        for route in routes
    )
    return f"""# Product Marketing Context — Sample Product

## 1. Brand Identity, Voice & Attribution Rules
- Canonical brand: Sample Product. Voice mode: brand plural (`we` / `our`).
{extra_line}

## 2. Positioning & Value Proposition Summary
Sample Product replaces manual invoice spreadsheets with deterministic decimal verification.

## 3. Target Audience, Pain Points & Buyer Language
- Finance operations leads frustrated by month-end spreadsheet drift.

## 4. Offers, Capabilities & Proof Inventory
{offer_bullets}
{item_bullets}

## 5. Route Funnel & Conversion Goals
| Route | Visitor Intent | Primary Goal | CTA | Proof |
|---|---|---|---|---|
{route_rows}

## 6. Terminology, Guardrails & Banned Claims
- Use deterministic verification terminology; avoid unverified superlatives.
"""


def run_self_test() -> int:
    with tempfile.TemporaryDirectory() as tmp:
        root = Path(tmp)
        docs_dir = root / "docs"
        agents_dir = root / ".agents"
        kepler_dir = root / ".kepler"
        docs_dir.mkdir(parents=True)
        agents_dir.mkdir(parents=True)
        kepler_dir.mkdir(parents=True)

        brief = docs_dir / "positioning-brief.md"
        marketing = agents_dir / "product-marketing.md"

        # 1. Zero-config pass case
        brief.write_text(_sample_brief(), encoding="utf-8")
        marketing.write_text(_sample_marketing(), encoding="utf-8")
        issues = verify_deliverables(brief, marketing, project_root=root)
        assert issues == [], f"Zero-config pass case failed: {issues}"

        # 2. Zero-config fail case (FAIL audit row + banned buzzword)
        brief.write_text(
            _sample_brief(extra_line="Our cutting-edge tool is great.", fail_audit_row=True),
            encoding="utf-8",
        )
        issues = verify_deliverables(brief, marketing, project_root=root)
        assert any("FAIL row" in i for i in issues), f"Expected FAIL row issue, got {issues}"
        assert any("cutting-edge" in i for i in issues), f"Expected banned word issue, got {issues}"

        # 3. Custom bindings pass case
        bindings_path = kepler_dir / "stage-1-bindings.json"
        bindings_path.write_text(
            json.dumps(
                {
                    "project_name": "Sample Product",
                    "voice_mode": "brand_plural",
                    "forbidden_tokens": ["LegacyAlias"],
                    "required_routes": ["/", "/features", "/pricing"],
                    "required_offers": ["Starter", "Pro", "Enterprise"],
                    "required_items": ["LedgerCheck CLI", "ERP Connector"],
                }
            ),
            encoding="utf-8",
        )
        brief.write_text(
            _sample_brief(
                routes=("/", "/features", "/pricing"),
                offers=("Starter", "Pro", "Enterprise"),
                items=("LedgerCheck CLI", "ERP Connector"),
            ),
            encoding="utf-8",
        )
        marketing.write_text(
            _sample_marketing(
                routes=("/", "/features", "/pricing"),
                offers=("Starter", "Pro", "Enterprise"),
                items=("LedgerCheck CLI", "ERP Connector"),
            ),
            encoding="utf-8",
        )
        issues = verify_deliverables(brief, marketing, project_root=root)
        assert issues == [], f"Custom bindings pass case failed: {issues}"

        # 4. Custom bindings fail case (missing route, offer, item, pronoun, forbidden token)
        brief.write_text(
            _sample_brief(
                routes=("/", "/pricing"),
                offers=("Starter", "Pro"),
                items=("LedgerCheck CLI",),
                extra_line="I built this after LegacyAlias.",
            ),
            encoding="utf-8",
        )
        marketing.write_text(
            _sample_marketing(
                routes=("/", "/pricing"),
                offers=("Starter", "Pro"),
                items=("LedgerCheck CLI",),
            ),
            encoding="utf-8",
        )
        issues = verify_deliverables(brief, marketing, project_root=root)
        assert any("/features" in i for i in issues), f"Expected missing route issue, got {issues}"
        assert any("Enterprise" in i for i in issues), f"Expected missing offer issue, got {issues}"
        assert any("ERP Connector" in i for i in issues), f"Expected missing item issue, got {issues}"
        assert any("LegacyAlias" in i for i in issues), f"Expected forbidden token issue, got {issues}"
        assert any("first-person" in i for i in issues), f"Expected brand_plural pronoun issue, got {issues}"

        # 5. Bindings-gated require_economic_mechanism & require_discovery_icp PASS (Section 4 mechanism + dual ICP table)
        gated_bindings = {
            "project_name": "Sample Product",
            "voice_mode": "brand_plural",
            "required_routes": ["/", "/pricing"],
            "required_offers": ["Starter", "Pro"],
            "required_items": ["LedgerCheck CLI"],
            "require_economic_mechanism": True,
            "require_discovery_icp": True,
        }
        bindings_path.write_text(json.dumps(gated_bindings), encoding="utf-8")

        dual_icp_table = (
            "| ICP Segment | Economic Buyer vs. End User | Trigger Event | Underserved JTBD Need | Primary Objection | Buyer Vocabulary |\n"
            "|---|---|---|---|---|---|\n"
            "| Idea-Stage Founder | Founder / Solo Operator | First MVP scope needed | Ship reliable v1 fast | Hidden agency costs | \"I have an app idea, who can build an MVP?\" |\n"
            "| Ops Lead | COO / Finance Lead | Monthly spreadsheet drift | Automated line-item checks | Migration risk | \"automated multi-currency invoice reconciliation\" |"
        )
        offers_table_with_pricing = (
            "| Offer | Best Fit | Deliverables | Pricing Anchor & Timeline | Explicit Boundary | Next Step |\n"
            "|---|---|---|---|---|---|\n"
            "| Starter | Ops teams | Automated reconciliation | From $1,500; 5 days, credited toward Pro | No custom ERP hosting | Start trial |\n"
            "| Pro | Ops teams | Multi-ERP reconciliation | From $4,500; 2 weeks | No on-prem hardware | Start trial |"
        )
        old_offers_table = (
            "| Offer | Best Fit | Deliverables | Explicit Boundary | Next Step |\n"
            "|---|---|---|---|---|\n"
            "| Starter | Ops teams | Automated reconciliation | No custom ERP hosting | Start trial |\n"
            "| Pro | Ops teams | Automated reconciliation | No custom ERP hosting | Start trial |"
        )
        econ_sec4 = (
            "### Economic & Speed Mechanism\n"
            "- **Cost & Overhead:** Direct principal-engineer execution removes agency account-manager markup.\n"
            "- **Cycle Speed:** Contract-first specs and typed scaffolding compress delivery into 2-week sprints.\n"
            "- **Quality Gate:** Independent verification gates and automated CI test suites validate every release."
        )
        econ_sec4_h4 = (
            "### Economic & Speed Mechanism\n"
            "#### Cost Advantage\n"
            "Direct principal-engineer execution eliminates agency account-manager overhead.\n"
            "#### Cycle Speed\n"
            "Contract-first specs and typed scaffolding compress delivery into 2-week sprints.\n"
            "#### Quality Gate\n"
            "Independent verification gates and automated CI test suites validate every release."
        )
        base_gated = (
            _sample_brief()
            .replace(
                "- **Finance Operations Lead:** Closes monthly books across three accounting systems.",
                dual_icp_table,
            )
            .replace(old_offers_table, offers_table_with_pricing)
        )
        sec4_gated = base_gated.replace(
            "| Pro | Ops teams | Multi-ERP reconciliation | From $4,500; 2 weeks | No on-prem hardware | Start trial |",
            "| Pro | Ops teams | Multi-ERP reconciliation | From $4,500; 2 weeks | No on-prem hardware | Start trial |\n\n"
            + econ_sec4,
        )
        brief.write_text(sec4_gated, encoding="utf-8")
        marketing.write_text(_sample_marketing(), encoding="utf-8")
        issues = verify_deliverables(brief, marketing, project_root=root)
        assert issues == [], f"Gated bindings Section 4 pass case failed: {issues}"

        # 5b. Pass when Economic & Speed Mechanism uses nested #### subheadings
        sec4_h4_gated = base_gated.replace(
            "| Pro | Ops teams | Multi-ERP reconciliation | From $4,500; 2 weeks | No on-prem hardware | Start trial |",
            "| Pro | Ops teams | Multi-ERP reconciliation | From $4,500; 2 weeks | No on-prem hardware | Start trial |\n\n"
            + econ_sec4_h4,
        )
        brief.write_text(sec4_h4_gated, encoding="utf-8")
        issues = verify_deliverables(brief, marketing, project_root=root)
        assert issues == [], f"Gated bindings nested #### mechanism pass case failed: {issues}"

        # 5c. Pass when substantive Economic & Speed Mechanism is in Section 5 instead of Section 4
        sec5_gated = base_gated.replace(
            "- Unlike manual spreadsheet reconciliation, Sample Product validates every line item deterministically.",
            "- Unlike slow high-overhead agencies, we remove account-manager layers.\n\n" + econ_sec4,
        )
        brief.write_text(sec5_gated, encoding="utf-8")
        issues = verify_deliverables(brief, marketing, project_root=root)
        assert issues == [], f"Gated bindings Section 5 pass case failed: {issues}"

        # 6. Negative failures for require_economic_mechanism
        # 6a. Missing mechanism AND missing Pricing Anchor & Timeline column (default _sample_brief)
        brief.write_text(_sample_brief(), encoding="utf-8")
        issues = verify_deliverables(brief, marketing, project_root=root)
        assert any("Economic & Speed Mechanism" in i for i in issues), f"Expected missing mechanism issue, got {issues}"
        assert any("Pricing Anchor & Timeline" in i for i in issues), f"Expected missing pricing column issue, got {issues}"
        assert any("Buyer Vocabulary" in i for i in issues), f"Expected missing ICP table issue, got {issues}"

        # 6b. Old 5-column Offers table (missing Pricing Anchor & Timeline) even with valid mechanism prose
        old_table_with_mech = sec4_gated.replace(offers_table_with_pricing, old_offers_table)
        brief.write_text(old_table_with_mech, encoding="utf-8")
        issues = verify_deliverables(brief, marketing, project_root=root)
        assert any("missing 'Pricing Anchor & Timeline'" in i for i in issues), f"Expected missing pricing col failure, got {issues}"

        # 6c. Pricing Anchor & Timeline column present, but all cells are placeholders
        placeholder_pricing = (
            sec4_gated.replace("From $1,500; 5 days, credited toward Pro", "N/A")
            .replace("From $4,500; 2 weeks", "-")
        )
        brief.write_text(placeholder_pricing, encoding="utf-8")
        issues = verify_deliverables(brief, marketing, project_root=root)
        assert any("must contain at least one non-placeholder value" in i for i in issues), (
            f"Expected placeholder pricing col failure, got {issues}"
        )

        # 6d. Empty Economic & Speed Mechanism heading
        empty_econ = base_gated.replace(
            "| Pro | Ops teams | Multi-ERP reconciliation | From $4,500; 2 weeks | No on-prem hardware | Start trial |",
            "| Pro | Ops teams | Multi-ERP reconciliation | From $4,500; 2 weeks | No on-prem hardware | Start trial |\n\n### Economic & Speed Mechanism\n",
        )
        brief.write_text(empty_econ, encoding="utf-8")
        issues = verify_deliverables(brief, marketing, project_root=root)
        assert any("empty or lacks substantive" in i for i in issues), f"Expected empty heading failure, got {issues}"

        # 6e. Shallow / missing quality prong under Economic & Speed Mechanism
        shallow_econ = base_gated.replace(
            "| Pro | Ops teams | Multi-ERP reconciliation | From $4,500; 2 weeks | No on-prem hardware | Start trial |",
            "| Pro | Ops teams | Multi-ERP reconciliation | From $4,500; 2 weeks | No on-prem hardware | Start trial |\n\n"
            "### Economic & Speed Mechanism\n"
            "We cut account-manager overhead and compress delivery cycles to two weeks with low pricing for founders.",
        )
        brief.write_text(shallow_econ, encoding="utf-8")
        issues = verify_deliverables(brief, marketing, project_root=root)
        assert any("quality/verification gate" in i for i in issues), f"Expected missing quality prong failure, got {issues}"

        # 7. Negative failures for require_discovery_icp
        # 7a. Only 1 ICP row
        one_row_icp = sec4_gated.replace(
            "| Ops Lead | COO / Finance Lead | Monthly spreadsheet drift | Automated line-item checks | Migration risk | \"automated multi-currency invoice reconciliation\" |\n",
            "",
        )
        brief.write_text(one_row_icp, encoding="utf-8")
        issues = verify_deliverables(brief, marketing, project_root=root)
        assert any("expected >= 2 distinct ICP rows" in i for i in issues), f"Expected 1-row ICP failure, got {issues}"

        # 7b. Empty / placeholder Buyer Vocabulary cell in row 2
        empty_vocab_icp = sec4_gated.replace(
            "\"automated multi-currency invoice reconciliation\"",
            "N/A",
        )
        brief.write_text(empty_vocab_icp, encoding="utf-8")
        issues = verify_deliverables(brief, marketing, project_root=root)
        assert any("expected >= 2 distinct ICP rows" in i for i in issues), f"Expected placeholder Buyer Vocabulary failure, got {issues}"

        # 7c. Duplicate ICP names in both rows
        dup_icp = sec4_gated.replace("| Ops Lead |", "| Idea-Stage Founder |")
        brief.write_text(dup_icp, encoding="utf-8")
        issues = verify_deliverables(brief, marketing, project_root=root)
        assert any("expected >= 2 distinct ICP rows" in i for i in issues), f"Expected duplicate ICP failure, got {issues}"

        # 7d. Table missing Buyer Vocabulary column
        no_vocab_col = sec4_gated.replace(
            "| ICP Segment | Economic Buyer vs. End User | Trigger Event | Underserved JTBD Need | Primary Objection | Buyer Vocabulary |",
            "| ICP Segment | Economic Buyer vs. End User | Trigger Event | Underserved JTBD Need | Primary Objection | Notes |",
        )
        brief.write_text(no_vocab_col, encoding="utf-8")
        issues = verify_deliverables(brief, marketing, project_root=root)
        assert any("missing 'Buyer Vocabulary' column" in i for i in issues), f"Expected missing Buyer Vocabulary col failure, got {issues}"

    print(
        "PASS: positioning_audit.py --self-test passed "
        "(zero-config pass/fail, custom bindings, require_economic_mechanism, and require_discovery_icp checks)."
    )
    return 0


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(
        description="Kit, context, and deliverable auditor for Stage 1 Role 1.1 (product-strategist)."
    )
    parser.add_argument("--kit", action="store_true", help="Validate Role 1.1 kit files and templates.")
    parser.add_argument("--context", action="store_true", help="Summarize project context inputs.")
    parser.add_argument(
        "--verify",
        nargs=2,
        metavar=("BRIEF_PATH", "MARKETING_PATH"),
        help="Verify positioning-brief.md and .agents/product-marketing.md.",
    )
    parser.add_argument("--project-dir", default=".", help="Project root directory (default: current directory).")
    parser.add_argument("--config", help="Optional explicit path to stage-1-bindings.json.")
    parser.add_argument("--self-test", action="store_true", help="Run built-in offline self-tests.")
    args = parser.parse_args(argv)

    if args.self_test:
        return run_self_test()

    if args.kit:
        issues = verify_kit(KIT_DIR)
        if issues:
            print(f"FAIL: positioning_audit.py --kit found {len(issues)} issue(s):")
            for issue in issues:
                print(f"FAIL: {issue}")
            return 1
        print("PASS: positioning_audit.py --kit verified ROLE.md, START-SESSION.md, 3 skills, 2 templates, and prose rules.")
        return 0

    project_root = Path(args.project_dir).resolve()

    if args.context:
        return summarize_context(project_root)

    if args.verify:
        brief_path = kit_common.resolve_input_path(args.verify[0], project_root)
        marketing_path = kit_common.resolve_input_path(args.verify[1], project_root)
        issues = verify_deliverables(
            brief_path,
            marketing_path,
            project_root=project_root,
            explicit_config=args.config,
        )
        if issues:
            print(f"FAIL: positioning_audit.py --verify found {len(issues)} issue(s):")
            for issue in issues:
                print(f"FAIL: {issue}")
            return 1
        print(
            f"PASS: positioning_audit.py --verify passed for {brief_path.name} and {marketing_path.name} "
            "(8+6 H2 sections, >=7 PASS self-audit rows, bindings, and prose rules)."
        )
        return 0

    parser.print_help()
    return 2


if __name__ == "__main__":
    raise SystemExit(main())
