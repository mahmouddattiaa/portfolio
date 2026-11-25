#!/usr/bin/env python3
"""
Master CLI for Stage 1 (Positioning, SEO/GEO & Conversion Copy Operating Kit).

Subcommands:
  --verify-all-kits                     Run all role --kit gates and script --self-test suites.
  --install TARGET_DIR [--project-name NAME] [--force]
                                        Install Stage 1 role kits, shared scripts, pipeline doc, and bindings template into TARGET_DIR.
  --status [--project-dir DIR]          Inspect Stage 1 deliverables, run verifiers on existing docs, and report next action.
"""

from __future__ import annotations

import argparse
import json
import shutil
import subprocess
import sys
from pathlib import Path
from typing import Any

KIT_ROOT = Path(__file__).resolve().parent.parent

ROLE_ORDER: tuple[tuple[str, str], ...] = (
    ("product-strategist", "positioning_audit.py"),
    ("seo-and-market-researcher", "seo_audit.py"),
    ("conversion-copywriter", "copy_audit.py"),
    ("bilingual-localization-and-rtl-strategist", "l10n_audit.py"),
    ("ai-search-and-technical-geo-engineer", "geo_tech_audit.py"),
    ("offsite-entity-and-citation-builder", "citation_audit.py"),
)

ROLE_NAMES: tuple[str, ...] = tuple(name for name, _ in ROLE_ORDER)


def _run_cmd(cmd: list[str], cwd: Path | None = None) -> tuple[int, str]:
    proc = subprocess.run(
        cmd,
        cwd=str(cwd) if cwd else None,
        capture_output=True,
        text=True,
        check=False,
    )
    combined = "\n".join(part.strip() for part in (proc.stdout, proc.stderr) if part.strip())
    return proc.returncode, combined


def _collect_kit_checks(base_dir: Path) -> list[tuple[str, list[str]]]:
    checks: list[tuple[str, list[str]]] = []

    prose_script = base_dir / "scripts" / "prose_audit.py"
    if not prose_script.is_file():
        prose_script = base_dir / "roles" / "stage-1-shared" / "scripts" / "prose_audit.py"
    checks.append(("prose_audit --self-test", [sys.executable, "-B", str(prose_script), "--self-test"]))

    for role_name, audit_script in ROLE_ORDER:
        audit_path = base_dir / "roles" / role_name / "scripts" / audit_script
        checks.append((f"{role_name} --kit", [sys.executable, "-B", str(audit_path), "--kit"]))

    extra_self_tests = (
        (
            "positioning_audit --self-test",
            base_dir / "roles" / "product-strategist" / "scripts" / "positioning_audit.py",
        ),
        (
            "keyword_suggest --self-test",
            base_dir / "roles" / "seo-and-market-researcher" / "scripts" / "keyword_suggest.py",
        ),
        (
            "seo_audit --self-test",
            base_dir / "roles" / "seo-and-market-researcher" / "scripts" / "seo_audit.py",
        ),
        (
            "copy_audit --self-test",
            base_dir / "roles" / "conversion-copywriter" / "scripts" / "copy_audit.py",
        ),
        (
            "l10n_audit --self-test",
            base_dir / "roles" / "bilingual-localization-and-rtl-strategist" / "scripts" / "l10n_audit.py",
        ),
        (
            "geo_tech_audit --self-test",
            base_dir / "roles" / "ai-search-and-technical-geo-engineer" / "scripts" / "geo_tech_audit.py",
        ),
        (
            "indexnow_ping --self-test",
            base_dir / "roles" / "ai-search-and-technical-geo-engineer" / "scripts" / "indexnow_ping.py",
        ),
        (
            "citation_audit --self-test",
            base_dir / "roles" / "offsite-entity-and-citation-builder" / "scripts" / "citation_audit.py",
        ),
    )
    for label, script_path in extra_self_tests:
        checks.append((label, [sys.executable, "-B", str(script_path), "--self-test"]))

    return checks


def run_verify_all_kits(base_dir: Path = KIT_ROOT) -> int:
    results: list[dict[str, Any]] = []
    failed = 0
    for label, cmd in _collect_kit_checks(base_dir):
        rc, output = _run_cmd(cmd, cwd=base_dir)
        status = "PASS" if rc == 0 else "FAIL"
        if rc != 0:
            failed += 1
        print(f"[{status}] {label}")
        if output:
            for line in output.splitlines():
                print(f"  {line}")
        results.append({"check": label, "status": status, "exit_code": rc})

    summary = {
        "kit_root": str(base_dir),
        "total_checks": len(results),
        "passed": len(results) - failed,
        "failed": failed,
        "checks": results,
    }
    print(json.dumps(summary, indent=2))
    return 0 if failed == 0 else 1


def _ignore_pycache(_dir: str, names: list[str]) -> set[str]:
    return {name for name in names if name == "__pycache__" or name.endswith(".pyc")}


def _substitute_placeholders(target_root: Path, project_name: str) -> None:
    md_targets: list[Path] = []
    for role_name in ROLE_NAMES:
        role_dir = target_root / "roles" / role_name
        if role_dir.is_dir():
            md_targets.extend(role_dir.rglob("*.md"))
    pipeline_doc = target_root / "docs" / "01-stage-1-positioning-and-messaging-pipeline.md"
    if pipeline_doc.is_file():
        md_targets.append(pipeline_doc)

    resolved_str = str(target_root)
    for md_path in md_targets:
        original = md_path.read_text(encoding="utf-8")
        updated = original.replace("<PROJECT_ROOT>", resolved_str).replace("<PROJECT_NAME>", project_name)
        if updated != original:
            md_path.write_text(updated, encoding="utf-8")


def run_install(target_dir_raw: str, project_name: str | None, force: bool) -> int:
    target = Path(target_dir_raw).resolve()
    if target == KIT_ROOT.resolve():
        print(f"FAIL: Refusing to install Stage 1 kit onto its own source directory: {target}", file=sys.stderr)
        return 1

    resolved_name = (project_name or target.name).strip() or target.name

    src_prose = KIT_ROOT / "scripts" / "prose_audit.py"
    src_common = KIT_ROOT / "scripts" / "kit_common.py"
    src_stage1 = KIT_ROOT / "scripts" / "stage1_kit.py"
    src_pipeline = KIT_ROOT / "docs" / "01-stage-1-positioning-and-messaging-pipeline.md"
    src_bindings = KIT_ROOT / "templates" / "stage-1-bindings.example.json"

    file_pairs: list[tuple[Path, Path]] = [
        (src_prose, target / "scripts" / "prose_audit.py"),
        (src_common, target / "scripts" / "kit_common.py"),
        (src_stage1, target / "scripts" / "stage1_kit.py"),
        (src_prose, target / "roles" / "stage-1-shared" / "scripts" / "prose_audit.py"),
        (src_common, target / "roles" / "stage-1-shared" / "scripts" / "kit_common.py"),
        (src_pipeline, target / "docs" / "01-stage-1-positioning-and-messaging-pipeline.md"),
    ]

    conflicts: list[Path] = []
    for role_name in ROLE_NAMES:
        src_role = KIT_ROOT / "roles" / role_name
        dst_role = target / "roles" / role_name
        if not src_role.is_dir():
            print(f"FAIL: Missing source role directory: {src_role}", file=sys.stderr)
            return 1
        if dst_role.exists() and not force:
            conflicts.append(dst_role)

    for _, dst_file in file_pairs:
        if dst_file.exists() and not force:
            conflicts.append(dst_file)

    if conflicts:
        print("FAIL: Install destination already contains Stage 1 files (pass --force to overwrite):")
        for conflict in conflicts:
            print(f"  - {conflict}")
        return 1

    target.mkdir(parents=True, exist_ok=True)
    for role_name in ROLE_NAMES:
        src_role = KIT_ROOT / "roles" / role_name
        dst_role = target / "roles" / role_name
        if dst_role.exists() and force:
            shutil.rmtree(dst_role)
        shutil.copytree(src_role, dst_role, ignore=_ignore_pycache)

    for src_file, dst_file in file_pairs:
        dst_file.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(src_file, dst_file)

    dst_bindings = target / ".kepler" / "stage-1-bindings.json"
    if src_bindings.is_file() and (not dst_bindings.exists() or force):
        dst_bindings.parent.mkdir(parents=True, exist_ok=True)
        bindings_data = json.loads(src_bindings.read_text(encoding="utf-8"))
        if isinstance(bindings_data, dict):
            bindings_data["project_name"] = resolved_name
        dst_bindings.write_text(json.dumps(bindings_data, indent=2) + "\n", encoding="utf-8")

    _substitute_placeholders(target, resolved_name)

    print(f"Installed Stage 1 Positioning & Messaging Kit into: {target} (project_name={resolved_name})")
    failures = 0
    for role_name, audit_script in ROLE_ORDER:
        audit_path = target / "roles" / role_name / "scripts" / audit_script
        rc, output = _run_cmd([sys.executable, "-B", str(audit_path), "--kit"], cwd=target)
        tag = "PASS" if rc == 0 else "FAIL"
        print(f"[{tag}] installed {role_name} --kit")
        if output:
            for line in output.splitlines():
                print(f"  {line}")
        if rc != 0:
            failures += 1

    if failures:
        print(f"FAIL: {failures} installed kit check(s) failed.", file=sys.stderr)
        return 1
    print(f"PASS: All {len(ROLE_ORDER)} Stage 1 role kits installed and verified in {target}.")
    return 0


def _locate_audit_script(project_root: Path, role_name: str, script_name: str) -> Path:
    installed = project_root / "roles" / role_name / "scripts" / script_name
    if installed.is_file():
        return installed
    return KIT_ROOT / "roles" / role_name / "scripts" / script_name


def _verify_extension_deliverable(
    *,
    root: Path,
    deliverable: Path,
    role_name: str,
    script_name: str,
    flag_name: str,
    bindings: dict[str, Any],
    extra_args: list[str] | None = None,
) -> str:
    active = bool(bindings.get(flag_name)) or deliverable.is_file()
    rel = deliverable.relative_to(root)
    if not active:
        print(f"[SKIPPED] {rel} (enable via {flag_name} in bindings)")
        return "SKIPPED"
    if not deliverable.is_file():
        print(f"[MISSING] {rel}")
        return "MISSING"

    script = _locate_audit_script(root, role_name, script_name)
    cmd = [sys.executable, "-B", str(script), "--verify", str(deliverable), "--project-dir", str(root)]
    if extra_args:
        cmd.extend(extra_args)
    rc, output = _run_cmd(cmd, cwd=root)
    status = "PASS" if rc == 0 else "FAIL"
    print(f"[{status}] {rel}")
    if output:
        print(f"  {output.splitlines()[0]}")
    return status


def run_status(project_dir_raw: str | None) -> int:
    root = Path(project_dir_raw).resolve() if project_dir_raw else Path.cwd().resolve()
    if not root.is_dir():
        print(f"FAIL: --project-dir is not a directory: {root}", file=sys.stderr)
        return 1

    digest_path = root / "docs" / "context" / "project-digest.md"
    bindings_path = root / ".kepler" / "stage-1-bindings.json"
    pos_brief = root / "docs" / "positioning-brief.md"
    mkt_ctx = root / ".agents" / "product-marketing.md"
    seo_brief = root / "docs" / "seo-and-market-brief.md"
    copy_spec = root / "docs" / "stage-1-final-copy-and-pitch.md"
    l10n_spec = root / "docs" / "stage-1-bilingual-l10n-spec.md"
    geo_report = root / "docs" / "stage-1-technical-geo-report.md"
    citation_pack = root / "docs" / "stage-1-offsite-citation-pack.md"

    statuses: dict[str, str] = {}
    bindings: dict[str, Any] = {}

    print(f"# Stage 1 Status Report — Project Root: {root}")
    digest_state = "PRESENT" if digest_path.is_file() else "MISSING"
    statuses["project_digest"] = digest_state
    print(f"[{digest_state}] {digest_path.relative_to(root)}")

    if not bindings_path.is_file():
        statuses["bindings"] = "MISSING"
        print(f"[MISSING] {bindings_path.relative_to(root)}")
    else:
        try:
            loaded_bindings = json.loads(bindings_path.read_text(encoding="utf-8"))
        except (OSError, UnicodeDecodeError, json.JSONDecodeError) as exc:
            print(f"[INVALID] {bindings_path.relative_to(root)} ({exc})")
            return 1
        if not isinstance(loaded_bindings, dict):
            print(f"[INVALID] {bindings_path.relative_to(root)} (bindings JSON must be an object)")
            return 1
        bindings = loaded_bindings
        statuses["bindings"] = "PRESENT"
        print(f"[PRESENT] {bindings_path.relative_to(root)}")

    # Role 1.1: Positioning Brief + Product Marketing Context
    if not pos_brief.is_file() or not mkt_ctx.is_file():
        statuses["positioning"] = "MISSING"
        if not pos_brief.is_file():
            print(f"[MISSING] {pos_brief.relative_to(root)}")
        if not mkt_ctx.is_file():
            print(f"[MISSING] {mkt_ctx.relative_to(root)}")
    else:
        script = _locate_audit_script(root, "product-strategist", "positioning_audit.py")
        cmd = [
            sys.executable,
            "-B",
            str(script),
            "--verify",
            str(pos_brief),
            str(mkt_ctx),
            "--project-dir",
            str(root),
        ]
        rc, output = _run_cmd(cmd, cwd=root)
        statuses["positioning"] = "PASS" if rc == 0 else "FAIL"
        print(f"[{statuses['positioning']}] {pos_brief.relative_to(root)} + {mkt_ctx.relative_to(root)}")
        if output:
            print(f"  {output.splitlines()[0]}")

    # Role 1.2: SEO & Market Research Brief
    if not seo_brief.is_file():
        statuses["seo"] = "MISSING"
        print(f"[MISSING] {seo_brief.relative_to(root)}")
    else:
        script = _locate_audit_script(root, "seo-and-market-researcher", "seo_audit.py")
        cmd = [sys.executable, "-B", str(script), "--verify", str(seo_brief), "--project-dir", str(root)]
        rc, output = _run_cmd(cmd, cwd=root)
        statuses["seo"] = "PASS" if rc == 0 else "FAIL"
        print(f"[{statuses['seo']}] {seo_brief.relative_to(root)}")
        if output:
            print(f"  {output.splitlines()[0]}")

    # Role 1.3: Final Conversion Copy & Pitch
    if not copy_spec.is_file():
        statuses["copy"] = "MISSING"
        print(f"[MISSING] {copy_spec.relative_to(root)}")
    else:
        script = _locate_audit_script(root, "conversion-copywriter", "copy_audit.py")
        cmd = [sys.executable, "-B", str(script), "--verify", str(copy_spec), "--project-dir", str(root)]
        rc, output = _run_cmd(cmd, cwd=root)
        statuses["copy"] = "PASS" if rc == 0 else "FAIL"
        print(f"[{statuses['copy']}] {copy_spec.relative_to(root)}")
        if output:
            print(f"  {output.splitlines()[0]}")

    # Role 1.4: Bilingual Localization & RTL Spec (optional extension)
    statuses["l10n"] = _verify_extension_deliverable(
        root=root,
        deliverable=l10n_spec,
        role_name="bilingual-localization-and-rtl-strategist",
        script_name="l10n_audit.py",
        flag_name="enable_bilingual_l10n_role",
        bindings=bindings,
    )

    # Role 1.5: AI Search & Technical GEO Report (optional extension)
    geo_extra_args = ["--audit-repo"] if bindings.get("audit_live_geo_surfaces") else None
    statuses["technical_geo"] = _verify_extension_deliverable(
        root=root,
        deliverable=geo_report,
        role_name="ai-search-and-technical-geo-engineer",
        script_name="geo_tech_audit.py",
        flag_name="enable_technical_geo_role",
        bindings=bindings,
        extra_args=geo_extra_args,
    )

    # Role 1.6: Offsite Entity & Citation Pack (optional extension)
    statuses["offsite_citation"] = _verify_extension_deliverable(
        root=root,
        deliverable=citation_pack,
        role_name="offsite-entity-and-citation-builder",
        script_name="citation_audit.py",
        flag_name="enable_offsite_citation_role",
        bindings=bindings,
    )

    if statuses["positioning"] != "PASS":
        phase = "Phase 1.1 (Product Strategist — Positioning & Offer Architecture)"
        next_action = (
            "Run Role 1.1 (`product-strategist`) using `roles/product-strategist/START-SESSION.md` "
            "to lock and verify `docs/positioning-brief.md` and `.agents/product-marketing.md`."
        )
    elif statuses["seo"] != "PASS":
        phase = "Phase 1.2 (SEO & Market Researcher — Intent, GEO & JSON-LD)"
        next_action = (
            "Run Role 1.2 (`seo-and-market-researcher`) using `roles/seo-and-market-researcher/START-SESSION.md` "
            "to produce and verify `docs/seo-and-market-brief.md`."
        )
    elif statuses["copy"] != "PASS":
        phase = "Phase 1.3 (Conversion Copywriter — Final Copy & Anti-Slop Polish)"
        next_action = (
            "Run Role 1.3 (`conversion-copywriter`) using `roles/conversion-copywriter/START-SESSION.md` "
            "to produce and verify `docs/stage-1-final-copy-and-pitch.md`."
        )
    elif statuses["l10n"] not in ("PASS", "SKIPPED"):
        phase = "Phase 1.4 (Bilingual Localization & RTL Strategist — EN-AR Parity & CLDR)"
        next_action = (
            "Run Role 1.4 (`bilingual-localization-and-rtl-strategist`) using "
            "`roles/bilingual-localization-and-rtl-strategist/START-SESSION.md` "
            "to produce and verify `docs/stage-1-bilingual-l10n-spec.md`."
        )
    elif statuses["technical_geo"] not in ("PASS", "SKIPPED"):
        phase = "Phase 1.5 (AI Search & Technical GEO Engineer — llms.txt, Crawlers & @graph)"
        next_action = (
            "Run Role 1.5 (`ai-search-and-technical-geo-engineer`) using "
            "`roles/ai-search-and-technical-geo-engineer/START-SESSION.md` "
            "to produce and verify `docs/stage-1-technical-geo-report.md`."
        )
    elif statuses["offsite_citation"] not in ("PASS", "SKIPPED"):
        phase = "Phase 1.6 (Offsite Entity & Citation Builder — sameAs, Directories & Prompts)"
        next_action = (
            "Run Role 1.6 (`offsite-entity-and-citation-builder`) using "
            "`roles/offsite-entity-and-citation-builder/START-SESSION.md` "
            "to produce and verify `docs/stage-1-offsite-citation-pack.md`."
        )
    else:
        phase = "Check 1 Complete — Ready to Unlock Stage 2"
        next_action = (
            "Review all locked Stage 1 deliverables at Check 1 and unlock Stage 2 (UX/UI & Design System)."
        )

    print(f"\n- Current Stage 1 Phase: {phase}")
    print(f"- Next Action: {next_action}")
    return 0


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="Stage 1 Positioning & Messaging Kit master CLI.")
    mode = parser.add_mutually_exclusive_group(required=True)
    mode.add_argument("--verify-all-kits", action="store_true", help="Run all role --kit and script --self-test checks.")
    mode.add_argument("--install", metavar="TARGET_DIR", help="Install Stage 1 role kits and scripts into TARGET_DIR.")
    mode.add_argument("--status", action="store_true", help="Report Stage 1 deliverable status and next action.")
    parser.add_argument("--project-name", help="Project name used when installing into TARGET_DIR.")
    parser.add_argument("--force", action="store_true", help="Overwrite existing Stage 1 files during --install.")
    parser.add_argument("--project-dir", help="Target project directory for --status (default: cwd).")
    return parser


def main(argv: list[str] | None = None) -> int:
    parser = build_parser()
    args = parser.parse_args(argv)
    if args.verify_all_kits:
        return run_verify_all_kits()
    if args.install:
        return run_install(args.install, args.project_name, args.force)
    if args.status:
        return run_status(args.project_dir)
    return 2


if __name__ == "__main__":
    raise SystemExit(main())
