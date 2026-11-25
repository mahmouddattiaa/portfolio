#!/usr/bin/env python3
"""
Shared stdlib helpers for Stage 1 Role Session Kit preflight checks,
Markdown H2 section extraction, table parsing, bindings discovery, and prose auditing.
"""

from __future__ import annotations

import importlib.util
import json
import re
from pathlib import Path
from typing import Any

MAX_ROLE_LINES = 59
MAX_SKILL_LINES = 250
MIN_SKILL_DESC_LEN = 40


def load_prose_audit(script_file: str | Path) -> Any:
    """Locate and load scripts/prose_audit.py from either kit source or installed project."""
    resolved = Path(script_file).resolve()
    candidates: list[Path] = []
    for parent in resolved.parents:
        candidates.append(parent / "scripts" / "prose_audit.py")
        candidates.append(parent / "stage-1-shared" / "scripts" / "prose_audit.py")
    for candidate in candidates:
        if candidate.is_file():
            spec = importlib.util.spec_from_file_location("stage1_prose_audit", candidate)
            if spec and spec.loader:
                mod = importlib.util.module_from_spec(spec)
                spec.loader.exec_module(mod)
                return mod
    raise FileNotFoundError("Could not locate prose_audit.py in parent scripts/ or stage-1-shared/scripts/")


def resolve_input_path(raw: str | Path, project_root: Path) -> Path:
    p = Path(raw)
    if p.is_absolute():
        return p
    cwd_candidate = (Path.cwd() / p).resolve()
    if cwd_candidate.exists():
        return cwd_candidate
    root_candidate = (project_root / p).resolve()
    if root_candidate.exists():
        return root_candidate
    return cwd_candidate


def load_project_bindings(project_root: Path, explicit_config: str | Path | None = None) -> dict[str, Any]:
    """Load explicit --config JSON or auto-discover .kepler/stage-1-bindings.json."""
    if explicit_config:
        path = Path(explicit_config)
        if not path.is_file():
            raise FileNotFoundError(f"Bindings config not found: {explicit_config}")
        data = json.loads(path.read_text(encoding="utf-8"))
        if not isinstance(data, dict):
            raise ValueError(f"Bindings config must be a JSON object: {explicit_config}")
        return data
    auto = project_root / ".kepler" / "stage-1-bindings.json"
    if auto.is_file():
        data = json.loads(auto.read_text(encoding="utf-8"))
        if isinstance(data, dict):
            return data
    return {}


def split_h2_sections(text: str) -> tuple[list[str], dict[str, list[tuple[int, str]]]]:
    order: list[str] = []
    sections: dict[str, list[tuple[int, str]]] = {}
    current: str | None = None
    in_code_block = False

    for idx, line in enumerate(text.splitlines(), start=1):
        stripped = line.strip()
        if stripped.startswith("```"):
            in_code_block = not in_code_block
            if current is not None:
                sections[current].append((idx, line))
            continue
        if not in_code_block and line.startswith("## "):
            current = line[3:].strip()
            order.append(current)
            sections.setdefault(current, [])
            continue
        if current is not None:
            sections[current].append((idx, line))

    return order, sections


def section_nonempty_prose_count(lines: list[tuple[int, str]]) -> int:
    count = 0
    for _, line in lines:
        s = line.strip()
        if not s or s == "---" or s.startswith("<!--"):
            continue
        count += 1
    return count


def parse_markdown_tables(lines: list[tuple[int, str]]) -> list[list[tuple[int, list[str]]]]:
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
            raw_cells = [c.strip() for c in s.strip("|").split("|")]
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


def strip_md(value: str) -> str:
    return value.strip().strip("`* ").strip()


def route_present_in_section(route: str, lines: list[tuple[int, str]]) -> bool:
    """Check whether a route path appears explicitly in table cells, inline code, or token boundaries."""
    target = route.strip()
    if not target:
        return True

    for table in parse_markdown_tables(lines):
        for _, cells in table:
            for cell in cells:
                cleaned = strip_md(cell)
                if cleaned == target:
                    return True
                for token in re.split(r"[\s,;()]+", cleaned):
                    if strip_md(token) == target:
                        return True

    text = "\n".join(line for _, line in lines)
    if f"`{target}`" in text:
        return True
    if target == "/":
        return bool(re.search(r"(?:^|[\s|`(])/(?:$|[\s|`)\],;])", text, re.MULTILINE))
    return bool(re.search(rf"(?:^|[\s|`(\[])({re.escape(target)})(?:$|[\s|`)\],;:])", text, re.MULTILINE))


_ALLOWED_HTML_TAG_RE = re.compile(
    r"^</?(?:title|meta|link|script|style|head|body|html|h[1-6]|p|a|div|span|ul|ol|li|strong|em|code|pre|br|hr|img|nav|main|footer|header|section|article)\b[^>]*>$",
    re.IGNORECASE,
)
_ANGLE_SLOT_RE = re.compile(r"<([A-Za-z][^<>\n]{1,120})>")


def find_unfilled_slots(text: str, filename: str = "<input>") -> list[str]:
    """Flag unfilled <Template Slot> angle-bracket placeholders outside fenced code blocks."""
    issues: list[str] = []
    in_code_block = False
    for line_no, raw_line in enumerate(text.splitlines(), start=1):
        stripped = raw_line.strip()
        if stripped.startswith("```"):
            in_code_block = not in_code_block
            continue
        if in_code_block:
            continue
        for match in _ANGLE_SLOT_RE.finditer(raw_line):
            full = match.group(0)
            inner = match.group(1).strip()
            if inner.lower().startswith(("http://", "https://", "mailto:")):
                if " or " not in inner.lower() and " " not in inner:
                    continue
            if _ALLOWED_HTML_TAG_RE.match(full):
                continue
            issues.append(f"{filename}:{line_no}: unfilled template slot '{full}'")
        if "replace this blockquote with" in raw_line.lower():
            issues.append(f"{filename}:{line_no}: unfilled template instruction 'Replace this blockquote with...'")
    return issues


def extract_blockquotes(lines: list[tuple[int, str]]) -> list[tuple[int, str]]:
    """Extract contiguous Markdown blockquote blocks (> ...) outside fenced code blocks."""
    blocks: list[tuple[int, str]] = []
    current_start: int | None = None
    current_parts: list[str] = []
    in_code_block = False

    for idx, raw in lines:
        s = raw.strip()
        if s.startswith("```"):
            in_code_block = not in_code_block
            if current_parts and current_start is not None:
                blocks.append((current_start, " ".join(current_parts).strip()))
                current_start = None
                current_parts = []
            continue
        if in_code_block:
            continue
        m = re.match(r"^\s*>\s?(.*)$", raw)
        if m:
            if current_start is None:
                current_start = idx
            part = m.group(1).strip()
            if part:
                current_parts.append(part)
        else:
            if current_parts and current_start is not None:
                blocks.append((current_start, " ".join(current_parts).strip()))
                current_start = None
                current_parts = []

    if current_parts and current_start is not None:
        blocks.append((current_start, " ".join(current_parts).strip()))
    return blocks


def check_self_audit_table(
    lines: list[tuple[int, str]],
    *,
    min_rows: int = 7,
    section_label: str = "Self-Audit Checklist",
) -> list[str]:
    issues: list[str] = []
    tables = parse_markdown_tables(lines)
    if not tables:
        return [f"{section_label}: missing Markdown audit table"]
    rows = tables[-1]
    data_rows = rows[1:] if len(rows) > 1 else []
    if len(data_rows) < min_rows:
        issues.append(f"{section_label}: expected >= {min_rows} audit rows, found {len(data_rows)}")
    for line_no, cells in data_rows:
        joined_status = " ".join(strip_md(c).upper() for c in cells)
        if any(strip_md(c).upper() == "FAIL" for c in cells):
            issues.append(f"{section_label}:{line_no}: contains FAIL row in self-audit table")
        elif "PASS" not in joined_status:
            issues.append(f"{section_label}:{line_no}: row does not record PASS status")
    return issues


def validate_skill_md(skill_path: Path) -> list[str]:
    issues: list[str] = []
    if not skill_path.is_file():
        return [f"Missing skill file: {skill_path}"]
    text = skill_path.read_text(encoding="utf-8")
    lines = text.splitlines()
    if len(lines) > MAX_SKILL_LINES:
        issues.append(f"{skill_path.parent.name}/SKILL.md exceeds {MAX_SKILL_LINES} lines ({len(lines)} lines)")

    match = re.match(r"^---\n(.*?)\n---\n", text, re.DOTALL)
    if not match:
        issues.append(f"{skill_path.parent.name}/SKILL.md missing YAML frontmatter")
        return issues

    fields: dict[str, str] = {}
    for line in match.group(1).splitlines():
        if ":" not in line:
            issues.append(f"{skill_path.parent.name}/SKILL.md invalid frontmatter line: {line}")
            continue
        k, v = line.split(":", 1)
        fields[k.strip()] = v.strip().strip('"').strip("'")

    if set(fields) != {"name", "description"}:
        issues.append(
            f"{skill_path.parent.name}/SKILL.md frontmatter must contain exact keys {{name, description}}, got {sorted(fields)}"
        )
    if fields.get("name") != skill_path.parent.name:
        issues.append(
            f"{skill_path.parent.name}/SKILL.md name '{fields.get('name')}' != directory '{skill_path.parent.name}'"
        )
    desc = fields.get("description", "")
    if len(desc) < MIN_SKILL_DESC_LEN:
        issues.append(f"{skill_path.parent.name}/SKILL.md description < {MIN_SKILL_DESC_LEN} chars")
    if not desc.startswith("Use when"):
        issues.append(f"{skill_path.parent.name}/SKILL.md description must start with 'Use when'")
    return issues


def validate_role_kit(
    kit_dir: Path,
    *,
    expected_skills: tuple[str, ...],
    expected_templates: dict[str, tuple[str, ...]],
) -> list[str]:
    issues: list[str] = []
    role_md = kit_dir / "ROLE.md"
    start_md = kit_dir / "START-SESSION.md"

    if not role_md.is_file():
        issues.append(f"Missing {kit_dir.name}/ROLE.md")
    else:
        role_text = role_md.read_text(encoding="utf-8")
        role_lines = role_text.splitlines()
        if len(role_lines) > MAX_ROLE_LINES:
            issues.append(f"{kit_dir.name}/ROLE.md has {len(role_lines)} lines (must be < 60)")
        if not re.search(r"(?m)^\*{0,2}Project root:\*{0,2}\s+\S+", role_text):
            issues.append(f"{kit_dir.name}/ROLE.md must declare 'Project root: <path>'")

    if not start_md.is_file():
        issues.append(f"Missing {kit_dir.name}/START-SESSION.md")
    elif not start_md.read_text(encoding="utf-8").strip():
        issues.append(f"Empty {kit_dir.name}/START-SESSION.md")

    for skill_name in expected_skills:
        issues.extend(validate_skill_md(kit_dir / "skills" / skill_name / "SKILL.md"))

    for tpl_name, required_h2 in expected_templates.items():
        tpl_path = kit_dir / "templates" / tpl_name
        if not tpl_path.is_file():
            issues.append(f"Missing template: {kit_dir.name}/templates/{tpl_name}")
            continue
        order, _ = split_h2_sections(tpl_path.read_text(encoding="utf-8"))
        for heading in required_h2:
            if heading not in order:
                issues.append(f"Template {tpl_name} missing required H2 heading: '## {heading}'")

    return issues


def check_h2_headings(
    text: str,
    required_h2: tuple[str, ...],
    label: str,
    *,
    require_prose: bool = True,
) -> tuple[list[str], dict[str, list[tuple[int, str]]]]:
    order, sections = split_h2_sections(text)
    issues: list[str] = []
    last_pos = -1
    for heading in required_h2:
        if heading not in order:
            issues.append(f"{label}: missing required section '## {heading}'")
            continue
        pos = order.index(heading)
        if pos < last_pos:
            issues.append(f"{label}: section '## {heading}' is out of order")
        last_pos = pos
        if require_prose and section_nonempty_prose_count(sections[heading]) < 1:
            issues.append(f"{label}: section '## {heading}' is empty")
    return issues, sections
