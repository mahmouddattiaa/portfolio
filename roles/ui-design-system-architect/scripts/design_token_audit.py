#!/usr/bin/env python3
"""Deterministic sRGB WCAG contrast, Light/Dark token schema & document verifier for Kepler Dev Stage 3 (Role 2A)."""
import argparse
import json
import math
import re
import sys
from pathlib import Path

ROOT = Path("/home/kepler/Desktop/Kepler/Projects/portfolio")
KIT = ROOT / "roles/ui-design-system-architect"
OUTPUT = ROOT / "docs/stage-3-design-system.md"

HEADINGS = (
    "Existing Styling Audit and Source Locks",
    "Three Visual Directions and Recommendation",
    "Machine-Readable Design Tokens",
    "Computed Contrast Evidence",
    "Typography, Spacing and Responsive Capacity",
    "Components and State Styling",
    "Tailwind v4 and CSS Consolidation Mapping",
    "OpenGraph Social Card Specification (`1200x630`)",
    "Open Pencil Role 2C Handoff",
    "Review Decisions and Verification Limits",
    "Mandatory Self-Audit Checklist",
)

COLORS = (
    "canvas", "surface", "surface_raised", "surface_hover",
    "text", "muted_text", "disabled_text",
    "accent", "accent_hover", "on_accent",
    "border_decorative", "border_control", "focus",
    "success", "warning", "danger",
)

COMPONENTS = (
    "SiteHeader", "HeroAndTrust", "PrimaryButton", "SecondaryButton",
    "FlagshipWorkStrip", "WorkCatalogCard", "FilterButton", "FaqDisclosure",
    "StudioStandardsBand", "QualificationField", "QualificationSubmit",
    "CaseStudyContentsRail", "StatusBadge", "DiagramViewer",
    "GlitreIllustrativeDeviceFrames", "ClassroomSentinelPipelineCard",
    "AksiraDualEngineCard", "ShowcaseArchitectureBadge",
)


def luminance(color):
    if not isinstance(color, str) or not re.fullmatch(r"#[0-9A-Fa-f]{6}", color):
        raise ValueError(f"expected opaque six-digit hex color, got {color!r}")
    rgb = [int(color[i:i + 2], 16) / 255 for i in (1, 3, 5)]
    linear = [c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4 for c in rgb]
    return sum(a * b for a, b in zip(linear, (0.2126, 0.7152, 0.0722)))


def contrast(fg, bg):
    first, second = sorted((luminance(fg), luminance(bg)))
    return (second + 0.05) / (first + 0.05)


def required_pairs():
    pairs = {
        (fg, bg, "text")
        for fg in ("text", "muted_text", "disabled_text", "accent", "accent_hover", "success", "warning", "danger")
        for bg in ("canvas", "surface", "surface_raised", "surface_hover")
    }
    pairs |= {("on_accent", bg, "text") for bg in ("accent", "accent_hover")}
    pairs |= {(fg, bg, "ui") for fg in ("border_control", "focus") for bg in ("canvas", "surface", "surface_raised", "surface_hover")}
    return pairs


def read_document(path):
    text = path.read_text(encoding="utf-8")
    matches = list(re.finditer(r"^```json\s*\n(.*?)\n```", text, re.M | re.S))
    if len(matches) != 1:
        raise ValueError("expected exactly one fenced JSON token object")
    data = json.loads(matches[0].group(1))
    if not isinstance(data, dict):
        raise ValueError("JSON token root must be an object")
    return text, data


def contrast_rows(data):
    light = data.get("colors", {})
    dark = data.get("dark_colors", {})
    pairs = data.get("contrast_pairs", [])
    if not isinstance(light, dict) or not isinstance(dark, dict) or not isinstance(pairs, list):
        raise ValueError("colors, dark_colors must be objects and contrast_pairs an array")
    rows = []
    for pair in pairs:
        name = pair.get("name")
        fg = pair.get("foreground")
        bg = pair.get("background")
        kind = pair.get("kind")
        mode = pair.get("mode", "light")
        palette = dark if mode == "dark" else light
        if kind not in ("text", "ui") or fg not in palette or bg not in palette:
            raise ValueError(f"{name}: unknown token '{fg}'/'{bg}' for mode '{mode}'")
        ratio = contrast(palette[fg], palette[bg])
        threshold = 4.5 if kind == "text" else 3.0
        rows.append((name, fg, bg, kind, ratio, threshold, ratio >= threshold, mode))
    return rows


def clean(value):
    return value.strip().strip("`* ").strip()


def table(section, first):
    rows, active = [], False
    for number, line in section:
        if not line.lstrip().startswith("|"):
            if active and rows:
                break
            continue
        cells = [clean(v) for v in line.strip().strip("|").split("|")]
        if cells[0] == first:
            active = True
        elif active and not re.fullmatch(r"[:\-\s]+", cells[0]):
            rows.append((number, cells))
    return rows


def baseline():
    ga = (ROOT / "src/app/global-atelier.css").read_text(encoding="utf-8")
    hv2 = (ROOT / "src/app/home-v2.css").read_text(encoding="utf-8")
    print("=== Existing Agency Token Baseline ===")
    for label, fg, bg in (
        ("atelier-ink on atelier-pearl", "#202826", "#eee7de"),
        ("atelier-bronze-deep on atelier-pearl", "#985f3b", "#eee7de"),
        ("hv2-copper-text on hv2-cream", "#8f5327", "#eee7de"),
        ("hv2-copper-text on hv2-card", "#8f5327", "#faf7f1"),
        ("hv2-copper on hv2-cream", "#cf8649", "#eee7de"),
        ("atelier-pearl on atelier-forest", "#eee7de", "#071c18"),
        ("atelier-bronze-300 on atelier-forest", "#d4a47a", "#071c18"),
        ("hv2-muted on hv2-cream", "#4b5551", "#eee7de"),
        ("global-muted on global-bg", "#56605c", "#eee7de"),
    ):
        r = contrast(fg, bg)
        print(f"  {label:38s}: {r:5.2f}:1  text={'PASS' if r >= 4.5 else 'FAIL'} ui={'PASS' if r >= 3.0 else 'FAIL'}")
    print(f"Detected hex declarations: global-atelier={len(re.findall(r'#[0-9a-fA-F]{6}', ga))}, home-v2={len(re.findall(r'#[0-9a-fA-F]{6}', hv2))}")
    return 0


def report(path):
    _, data = read_document(path)
    rows = contrast_rows(data)
    print("| Pair | Foreground | Background | Kind | Ratio | Threshold | Result |")
    print("| --- | --- | --- | --- | ---: | ---: | --- |")
    for name, fg, bg, kind, ratio, threshold, passed, _ in rows:
        print(f"| {name} | {fg} | {bg} | {kind} | {ratio:.2f} | {threshold:g} | {'PASS' if passed else 'FAIL'} |")
    return int(any(not r[6] for r in rows))


def verify(path):
    text, data = read_document(path)
    lines, errors = text.splitlines(), []

    def fail(msg, line=1):
        errors.append(f"{path}:{line}: {msg}")

    sections, starts = {}, []
    for idx, title in enumerate(HEADINGS, 1):
        expected = f"## {idx}. {title}"
        matches = [i for i, l in enumerate(lines, 1) if l.strip() == expected]
        if len(matches) != 1:
            fail(f"expected single heading {expected}")
        else:
            starts.append((idx, matches[0]))
    for pos, (idx, start) in enumerate(starts):
        end = starts[pos + 1][1] - 1 if pos + 1 < len(starts) else len(lines)
        sections[idx] = list(enumerate(lines[start:end], start + 1))

    for n, l in enumerate(lines, 1):
        if re.search(r"\b(FILL|TODO|TBD|PLACEHOLDER)\b", l, re.I):
            fail("unresolved marker", n)

    if data.get("status") != "proposed" or not str(data.get("direction", "")).strip():
        fail("JSON requires direction string and status='proposed'")

    for key in ("colors", "dark_colors"):
        pal = data.get(key, {})
        for c in COLORS:
            if c not in pal:
                fail(f"{key} missing token '{c}'")
            else:
                try:
                    luminance(pal[c])
                except ValueError as e:
                    fail(f"{key}.{c}: {e}")

    fonts = data.get("fonts", {})
    for f in ("sans", "display", "arabic", "mono"):
        if not isinstance(fonts.get(f), str) or not fonts[f].strip():
            fail(f"fonts missing '{f}'")

    pairs = contrast_rows(data)
    declared_light = {(fg, bg, kind) for _, fg, bg, kind, _, _, _, m in pairs if m == "light"}
    declared_dark = {(fg, bg, kind) for _, fg, bg, kind, _, _, _, m in pairs if m == "dark"}
    for missing in sorted(required_pairs() - declared_light):
        fail(f"missing Light contrast pair {missing}")
    if len(declared_dark) < 20:
        fail(f"expected >=20 Dark Mode contrast pairs with mode='dark', got {len(declared_dark)}")

    ev = {c[0]: (n, c) for n, c in table(sections.get(4, []), "Pair")}
    for name, fg, bg, kind, ratio, threshold, passed, _ in pairs:
        if not passed:
            fail(f"{name}: contrast {ratio:.2f} < {threshold}")
        if name not in ev:
            fail(f"Section 4 table missing row '{name}'")
        else:
            n, c = ev[name]
            try:
                rep = float(c[4].removesuffix(":1"))
                if abs(rep - ratio) > 0.02 or c[6] != "PASS":
                    fail(f"Section 4 ratio mismatch for '{name}'", n)
            except Exception:
                fail(f"Section 4 non-numeric ratio for '{name}'", n)

    dirs = table(sections.get(2, []), "Direction")
    if len(dirs) != 3 or {c[-1] for _, c in dirs} != {"1", "2", "3"}:
        fail("Section 2 requires 3 ranked directions")

    comps = [c[0] for _, c in table(sections.get(6, []), "Component")]
    for comp in COMPONENTS:
        if comps.count(comp) != 1:
            fail(f"Section 6 missing component '{comp}'")

    og_rows = table(sections.get(8, []), "Element")
    if len(og_rows) < 4:
        fail("Section 8 needs >=4 social-card elements")
    for n, c in og_rows:
        try:
            x, y, w, h = (int(v) for v in c[1:5])
            if x < 64 or y < 64 or x + w > 1136 or y + h > 566:
                fail("OG box violates 64px safe margin on 1200x630 canvas", n)
        except Exception:
            fail("OG box geometry must be integer pixels", n)

    audit_rows = table(sections.get(11, []), "Check")
    if len(audit_rows) < 8 or any(len(c) != 3 or c[1] != "PASS" for _, c in audit_rows):
        fail("Section 11 requires 8 PASS rows")

    for e in errors:
        print("FAIL: " + e)
    if not errors:
        print(f"PASS: Verified Light+Dark token schema, {len(pairs)} contrast pairs, 18 components, OG geometry, and CSS consolidation.")
    return int(bool(errors))


def kit_check():
    req = ["ROLE.md", "START-SESSION.md", "scripts/design_token_audit.py", "templates/design-system.template.md",
           "skills/visual-design-foundations/SKILL.md", "skills/design-system-patterns/SKILL.md"]
    errs = [r for r in req if not (KIT / r).is_file()]
    if errs:
        print("FAIL missing kit files:", errs)
        return 1
    print("PASS: Stage 3 Role 2A Design System kit verified.")
    return 0


def main():
    p = argparse.ArgumentParser()
    g = p.add_mutually_exclusive_group(required=True)
    g.add_argument("--baseline", action="store_true")
    g.add_argument("--kit", action="store_true")
    g.add_argument("--report")
    g.add_argument("--verify", nargs="?", const=str(OUTPUT))
    args = p.parse_args()
    if args.baseline:
        return baseline()
    if args.kit:
        return kit_check()
    t = Path(args.report or args.verify)
    if not t.is_absolute():
        t = ROOT / t
    return report(t) if args.report else verify(t)


if __name__ == "__main__":
    sys.exit(main())
