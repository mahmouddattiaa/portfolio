#!/usr/bin/env python3
"""Stage 4 source/media audit and evidence gate. Uses only the Python standard library."""
from __future__ import annotations

import argparse
import ast
import hashlib
import json
import re
import struct
import sys
import zlib
from collections import Counter
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Iterator
from urllib.parse import unquote

ROOT = Path(__file__).resolve().parents[3]
COPY_AUDIT = ROOT / "roles/conversion-copywriter/scripts/copy_audit.py"
CANONICAL_FLAGSHIPS = {
    "glitre-loyalty-platform", "hs-vpn", "quickcharging-pos",
    "medconnect-egypt", "stayease", "classroom-sentinel",
}
CANONICAL_SHOWCASES = {
    "aksira-ai-keyboard", "fitforge", "qiraaty", "focus-ritual",
    "getlab-system", "collab-platform", "agency-os",
}
CANONICAL_SLUGS = CANONICAL_FLAGSHIPS | CANONICAL_SHOWCASES
CATEGORY_MEMBERSHIP = {
    "glitre-loyalty-platform": {"web", "mobile"},
    "hs-vpn": {"mobile"},
    "quickcharging-pos": {"mobile"},
    "medconnect-egypt": {"web"},
    "stayease": {"web"},
    "classroom-sentinel": {"ai", "rnd"},
    "aksira-ai-keyboard": {"mobile", "ai", "rnd"},
    "fitforge": {"mobile"},
    "qiraaty": {"web", "ai"},
    "focus-ritual": {"web", "ai"},
    "getlab-system": {"web", "rnd"},
    "collab-platform": {"web", "ai", "rnd"},
    "agency-os": {"web", "rnd"},
}
OFFERS = {
    "blueprint": "Product Blueprint",
    "launch-sprint": "Launch Sprint",
    "operations-platform": "Operations Platform",
    "product-care": "Product Care",
}
REQUIRED_JSON_LD = {"Organization", "ProfessionalService", "WebSite", "Service", "SoftwareApplication"}
REQUIRED_ROUTES = [
    "src/app/page.tsx", "src/app/ar/page.tsx", "src/app/work/page.tsx",
    "src/app/work/[slug]/page.tsx", "src/app/services/page.tsx",
    "src/app/studio/page.tsx", "src/app/contact/page.tsx", "src/app/privacy/page.tsx",
    "src/app/work/glitre-loyalty-platform/customer-app/page.tsx",
    "src/app/work/glitre-loyalty-platform/manager/page.tsx",
    "src/app/work/glitre-loyalty-platform/worker-app/page.tsx",
]
IMAGE_EXTENSIONS = {".png", ".jpg", ".jpeg", ".webp", ".avif"}
MAX_IMAGE_BYTES = 500 * 1024
NAMED_IMAGE_LIMIT = 200_000
NAMED_IMAGES = {
    "focus-ritual/focus-ritual-hero.webp",
    "glitre-loyalty-platform/manager/sign-in.webp",
}
LEGACY_FOCUS_IMAGE = "focus-ritual/Screenshot 2026-04-09 225636.png"
VISUAL_MAX_AGE_SECONDS = 24 * 60 * 60
VIEWPORTS = ((320, 844), (390, 844), (1440, 900))
THEMES = ("light", "dark")
ROUTES = (
    "/", "/ar", "/work", "/services", "/studio", "/contact", "/privacy",
    *[f"/work/{slug}" for slug in sorted(CANONICAL_FLAGSHIPS)],
    "/work/glitre-loyalty-platform/customer-app",
    "/work/glitre-loyalty-platform/manager",
    "/work/glitre-loyalty-platform/worker-app",
)


def load_copy_rules() -> tuple[list[str], list[tuple[str, str]], list[tuple[str, str]], str]:
    """Read the canonical banned and structural patterns without copying their word list."""
    try:
        tree = ast.parse(COPY_AUDIT.read_text(encoding="utf-8"))
        wanted = {"BANNED_WORDS", "STRUCTURAL_PATTERNS", "PERSONAL_PATTERNS", "ALLOWED_EMAIL"}
        values: dict[str, Any] = {}
        for node in tree.body:
            if isinstance(node, ast.Assign):
                for target in node.targets:
                    if isinstance(target, ast.Name) and target.id in wanted:
                        values[target.id] = ast.literal_eval(node.value)
        return (values["BANNED_WORDS"], values["STRUCTURAL_PATTERNS"],
                values["PERSONAL_PATTERNS"], values["ALLOWED_EMAIL"])
    except (OSError, SyntaxError, KeyError, ValueError) as exc:
        raise RuntimeError(f"Cannot load canonical copy-audit rules: {exc}") from exc


def mask_comments(text: str) -> str:
    """Replace JS/TS comments with spaces while preserving string contents and line offsets."""
    chars = list(text)
    i, quote, escaped = 0, None, False
    while i < len(chars):
        char = chars[i]
        if quote:
            if escaped:
                escaped = False
            elif char == "\\":
                escaped = True
            elif char == quote:
                quote = None
            i += 1
            continue
        if char in "'\"`":
            quote = char
            i += 1
            continue
        if char == "/" and i + 1 < len(chars) and chars[i + 1] in ("/", "*"):
            line_comment = chars[i + 1] == "/"
            chars[i] = chars[i + 1] = " "
            i += 2
            while i < len(chars):
                if chars[i] == "\n":
                    if line_comment:
                        break
                    i += 1
                    break
                if not line_comment and chars[i] == "*" and i + 1 < len(chars) and chars[i + 1] == "/":
                    chars[i] = chars[i + 1] = " "
                    i += 2
                    break
                chars[i] = " "
                i += 1
            continue
        i += 1
    return "".join(chars)


def mask_strings(text: str) -> str:
    """Mask quoted literals while retaining offsets for source-code declaration lookup."""
    chars = list(mask_comments(text))
    i = 0
    while i < len(chars):
        if chars[i] not in "'\"`":
            i += 1
            continue
        quote = chars[i]
        chars[i] = " "
        i += 1
        escaped = False
        while i < len(chars):
            char = chars[i]
            if char == "\n":
                i += 1
                continue
            chars[i] = " "
            if escaped:
                escaped = False
            elif char == "\\":
                escaped = True
            elif char == quote:
                i += 1
                break
            i += 1
    return "".join(chars)


def string_spans(text: str) -> Iterator[tuple[int, str]]:
    """Yield (source line, literal contents), retaining original positions."""
    code = mask_comments(text)
    pattern = re.compile(r"(?P<q>['\"`])(?P<body>(?:\\.|(?!\1)[\s\S])*?)\1")
    for match in pattern.finditer(code):
        body = re.sub(r"\$\{[^{}]*\}", " ", match.group("body"))
        yield code.count("\n", 0, match.start()) + 1, body


def rendered_copy_spans(path: Path, text: str, root: Path) -> Iterator[tuple[int, str, str]]:
    """Return likely rendered literals/text, excluding diagnostics and source comments."""
    code = mask_comments(text)
    data_copy = path.is_relative_to(root / "src/content") or path == root / "src/lib/content.ts"
    diagnostic = re.compile(r"(?:console\.(?:error|warn|log)|logger\.|throw\s+new\s+Error|new\s+Error\s*\()", re.I)
    for line_number, copy in string_spans(code):
        if data_copy:
            yield line_number, copy, "content literal"
            continue
        # Only skip strings visibly attached to diagnostic code; all other app/component literals
        # remain conservative rendered candidates, including aria and alt text.
        line = code.splitlines()[line_number - 1] if line_number <= len(code.splitlines()) else ""
        context = line
        if diagnostic.search(context):
            continue
        assignment = re.match(r"\s*(?:const|let)\s+([A-Za-z_$][\w$]*)\s*=\s*['\"`]", line)
        if assignment:
            variable = re.escape(assignment.group(1))
            if not re.search(rf"\{{\s*{variable}\b", code):
                continue
        yield line_number, copy, "rendered-candidate literal"
    # Capture JSX text nodes not enclosed in a quoted attribute.
    for match in re.finditer(r">([^<>\n]+)<", code):
        value = match.group(1).strip()
        if value and not value.startswith("{"):
            yield code.count("\n", 0, match.start(1)) + 1, value, "rendered JSX text"


def visitor_question(text: str) -> bool:
    return bool(re.match(
        r"^\s*(?:will|can|could|would|should|do|does|did|have|has|what|how|why|where|when|who)\s+(?:i|my)\b.*\?\s*$",
        text,
        re.I,
    ))


def copy_findings(files: list[Path], root: Path) -> list[str]:
    banned, structural, personal, allowed_email = load_copy_rules()
    errors: list[str] = []
    seen: set[tuple[str, int, str]] = set()
    for path in files:
        try:
            source = path.read_text(encoding="utf-8")
        except (OSError, UnicodeDecodeError) as exc:
            errors.append(f"Cannot read copy source {path.relative_to(root)}: {exc}")
            continue
        for line, raw, kind in rendered_copy_spans(path, source, root):
            text = raw.replace(allowed_email, "")
            key = (str(path), line, text)
            if not text.strip() or key in seen:
                continue
            seen.add(key)
            relative = path.relative_to(root)
            for word in banned:
                if re.search(rf"\b{re.escape(word)}\b", text, re.I):
                    errors.append(f"{relative}:{line}: {kind}: banned phrase {word!r}")
            for pattern, label in structural:
                if re.search(pattern, text, re.I):
                    errors.append(f"{relative}:{line}: {kind}: {label}")
            for pattern, label in personal:
                if re.search(pattern, text, re.I):
                    errors.append(f"{relative}:{line}: {kind}: {label}")
            if not visitor_question(text):
                if re.search(r"\b(?:I|me|my|mine|myself)\b|\bI[’'](?:m|ve|ll|d)\b", text, re.I):
                    errors.append(f"{relative}:{line}: {kind}: first-person singular attribution")
    return errors


def skip_space_comments(text: str, index: int) -> int:
    while index < len(text):
        if text[index].isspace():
            index += 1
        elif text.startswith("//", index):
            end = text.find("\n", index)
            index = len(text) if end < 0 else end + 1
        elif text.startswith("/*", index):
            end = text.find("*/", index + 2)
            index = len(text) if end < 0 else end + 2
        else:
            break
    return index


def balanced_end(text: str, start: int) -> int | None:
    """Return the exclusive end of a bracketed JS literal, respecting strings/comments."""
    opening = text[start]
    closing = {"[": "]", "{": "}", "(": ")"}.get(opening)
    if closing is None:
        return None
    stack = [closing]
    quote, escaped, i = None, False, start + 1
    while i < len(text):
        char = text[i]
        if quote:
            if escaped:
                escaped = False
            elif char == "\\":
                escaped = True
            elif char == quote:
                quote = None
            i += 1
            continue
        if char in "'\"`":
            quote = char
            i += 1
            continue
        if text.startswith("//", i):
            end = text.find("\n", i)
            i = len(text) if end < 0 else end + 1
            continue
        if text.startswith("/*", i):
            end = text.find("*/", i + 2)
            i = len(text) if end < 0 else end + 2
            continue
        if char in "[{(":
            stack.append({"[": "]", "{": "}", "(": ")"}[char])
        elif char in "]})":
            if not stack or char != stack[-1]:
                return None
            stack.pop()
            if not stack:
                return i + 1
        i += 1
    return None


def declaration(text: str, name: str, bracket: str) -> str | None:
    code = mask_strings(text)
    match = re.search(rf"\b(?:export\s+)?(?:const|let)\s+{re.escape(name)}\b[^=]*=\s*", code)
    if not match:
        return None
    start = skip_space_comments(text, match.end())
    if start >= len(text) or text[start] != bracket:
        return None
    end = balanced_end(text, start)
    return text[start:end] if end else None


def export_array(text: str, name: str) -> list[str] | None:
    literal = declaration(text, name, "[")
    if literal is None:
        return None
    entries: list[str] = []
    i = 1
    while i < len(literal) - 1:
        i = skip_space_comments(literal, i)
        if i >= len(literal) - 1:
            break
        if literal[i] == ",":
            i += 1
            continue
        if literal[i] != "{":
            return None
        end = balanced_end(literal, i)
        if not end:
            return None
        entries.append(literal[i:end])
        i = end
    return entries


def field_string(obj: str, field: str) -> str | None:
    match = re.search(rf"(?<![\w$])(?:['\"])?{re.escape(field)}(?:['\"])?\s*:\s*(['\"])((?:\\.|(?!\1)[\s\S])*?)\1", mask_comments(obj))
    return match.group(2) if match else None


def field_string_array(obj: str, field: str) -> list[str] | None:
    obj = mask_comments(obj)
    match = re.search(rf"\b{re.escape(field)}\s*:\s*", obj)
    if not match:
        return None
    start = skip_space_comments(obj, match.end())
    if start >= len(obj) or obj[start] != "[":
        return None
    end = balanced_end(obj, start)
    if not end:
        return None
    return re.findall(r"['\"]([^'\"]+)['\"]", obj[start:end])


def catalog_findings(content: str) -> list[str]:
    errors: list[str] = []
    expected_registries = (("caseStudies", CANONICAL_FLAGSHIPS), ("showcaseBuilds", CANONICAL_SHOWCASES))
    seen: dict[str, set[str]] = {}
    all_entries: list[tuple[str, str, set[str]]] = []
    for registry, expected in expected_registries:
        if not re.search(rf"\bexport\s+const\s+{re.escape(registry)}\b", mask_strings(content)):
            errors.append(f"Canonical registry `{registry}` must be an exported literal declaration in src/lib/content.ts.")
        entries = export_array(content, registry)
        if entries is None:
            errors.append(f"Canonical registry export `{registry}` must be a literal array in src/lib/content.ts.")
            continue
        slugs = [field_string(entry, "slug") for entry in entries]
        valid_slugs = {slug for slug in slugs if slug}
        if len(slugs) != len(set(slugs)):
            errors.append(f"Canonical registry `{registry}` contains duplicate slugs.")
        if valid_slugs != expected:
            errors.append(f"Canonical registry `{registry}` slug set differs: missing={sorted(expected - valid_slugs)}, extra={sorted(valid_slugs - expected)}")
        seen[registry] = valid_slugs
        for entry in entries:
            slug = field_string(entry, "slug")
            categories = field_string_array(entry, "categories")
            if not slug:
                continue
            if categories is None:
                errors.append(f"Canonical project `{slug}` must declare a literal `categories` array.")
                continue
            all_entries.append((registry, slug, set(categories)))
    if seen.get("caseStudies", set()) == CANONICAL_FLAGSHIPS and seen.get("showcaseBuilds", set()) == CANONICAL_SHOWCASES:
        observed = {slug: categories for _, slug, categories in all_entries}
        for slug, expected in CATEGORY_MEMBERSHIP.items():
            if observed.get(slug) != expected:
                errors.append(f"Canonical project `{slug}` category membership differs: expected={sorted(expected)}, found={sorted(observed.get(slug, set()))}")
    offer_entries = export_array(content, "offers")
    if offer_entries is None:
        errors.append("Canonical offers export `offers` must be a literal array in src/lib/content.ts.")
    else:
        observed_offers = {field_string(entry, "value"): field_string(entry, "name") for entry in offer_entries}
        observed_offers = {value: name for value, name in observed_offers.items() if value and name}
        if observed_offers != OFFERS:
            errors.append(f"Canonical offers must map values to names exactly: expected={OFFERS}, found={observed_offers}")
        if not re.search(r"\bexport\s+const\s+offers\b", mask_strings(content)):
            errors.append("Canonical offers must be an exported literal declaration in src/lib/content.ts.")
    return errors


def object_keys(obj: str) -> Counter[str]:
    keys: Counter[str] = Counter()
    stack: list[tuple[int, str]] = []
    for line in mask_comments(obj).splitlines():
        match = re.match(r"^(\s+)([A-Za-z_$][\w$]*)\s*:", line)
        if not match:
            continue
        indent = len(match.group(1).expandtabs(2))
        while stack and stack[-1][0] >= indent:
            stack.pop()
        path = ".".join([item[1] for item in stack] + [match.group(2)])
        keys[path] += 1
        stack.append((indent, match.group(2)))
    return keys


def localized_shell_findings(root: Path) -> list[str]:
    errors: list[str] = []
    home_dir = root / "src/content/home"
    home_en = (home_dir / "en.ts").read_text(encoding="utf-8") if (home_dir / "en.ts").is_file() else ""
    home_ar = (home_dir / "ar.ts").read_text(encoding="utf-8") if (home_dir / "ar.ts").is_file() else ""
    if not home_en or not home_ar:
        errors.append("Homepage copy requires `src/content/home/en.ts` and `src/content/home/ar.ts`.")
    else:
        en_obj, ar_obj = declaration(home_en, "homeEn", "{"), declaration(home_ar, "homeAr", "{")
        if en_obj is None or ar_obj is None:
            errors.append("Homepage locale modules must declare literal `homeEn` and `homeAr` HomeCopy objects.")
        else:
            en_keys, ar_keys = object_keys(en_obj), object_keys(ar_obj)
            for key in sorted(set(en_keys) - set(ar_keys)):
                errors.append(f"HomeCopy Arabic object is missing key `{key}`.")
            for key in sorted(set(ar_keys) - set(en_keys)):
                errors.append(f"HomeCopy Arabic object has extra key `{key}`.")
    index_path = home_dir / "index.ts"
    index_text = index_path.read_text(encoding="utf-8") if index_path.is_file() else ""
    if not re.search(r"type\s+HomeLocale\s*=\s*['\"]en['\"]\s*\|\s*['\"]ar['\"]", index_text):
        errors.append("Homepage locale registry must include both `en` and `ar` in HomeLocale.")
    if not re.search(r"\bar\s*:\s*homeAr\b", index_text):
        errors.append("Homepage locale registry must register `ar: homeAr`.")

    shell_path = root / "src/components/site-shell.tsx"
    shell_text = shell_path.read_text(encoding="utf-8") if shell_path.is_file() else ""
    shell_obj = declaration(shell_text, "shellCopy", "{")
    if shell_obj is None:
        errors.append("Shared shell must declare locale-keyed `shellCopy` in src/components/site-shell.tsx.")
    else:
        en_obj = re.search(r"\ben\s*:\s*(\{)", shell_obj)
        ar_obj = re.search(r"\bar\s*:\s*(\{)", shell_obj)
        if not en_obj or not ar_obj:
            errors.append("Shared `shellCopy` must contain both `en` and `ar` objects.")
        else:
            en_end, ar_end = balanced_end(shell_obj, en_obj.start(1)), balanced_end(shell_obj, ar_obj.start(1))
            en_keys = object_keys(shell_obj[en_obj.start(1):en_end]) if en_end else Counter()
            ar_keys = object_keys(shell_obj[ar_obj.start(1):ar_end]) if ar_end else Counter()
            if set(en_keys) != set(ar_keys):
                errors.append(f"Shared shell locale keys differ: en-only={sorted(set(en_keys)-set(ar_keys))}, ar-only={sorted(set(ar_keys)-set(en_keys))}.")
            if not re.search(r"[\u0600-\u06ff]", shell_obj[ar_obj.start(1):ar_end] if ar_end else ""):
                errors.append("Shared shell Arabic object must contain Arabic navigation/footer copy.")
        if not re.search(r"shellCopy\s*\[", shell_text):
            errors.append("Shared shell locale data must be consumed by the rendered shell.")
    return errors


def schema_findings(layout: str) -> list[str]:
    errors: list[str] = []
    schema = declaration(layout, "structuredData", "{")
    if schema is None:
        return ["`src/app/layout.tsx` must declare the rendered `structuredData` object."]
    schema = mask_comments(schema)
    graph_key = re.search(r"['\"]@graph['\"]\s*:\s*", schema)
    if not graph_key:
        errors.append("Rendered `structuredData` must contain an `@graph` array.")
        return errors
    graph_start = skip_space_comments(schema, graph_key.end())
    graph_end = balanced_end(schema, graph_start) if graph_start < len(schema) and schema[graph_start] == "[" else None
    graph = schema[graph_start:graph_end] if graph_end else ""
    if not graph:
        errors.append("Rendered `structuredData.@graph` must be a literal array of schema entries.")
        return errors
    entries: list[str] = []
    i = 1
    while i < len(graph) - 1:
        i = skip_space_comments(graph, i)
        if i >= len(graph) - 1:
            break
        if graph[i] == ",":
            i += 1
            continue
        if graph[i] != "{":
            errors.append("Every `structuredData.@graph` entry must be a literal object.")
            break
        end = balanced_end(graph, i)
        if not end:
            errors.append("`structuredData.@graph` contains an unbalanced schema object.")
            break
        entries.append(graph[i:end])
        i = end
    types = [field_string(entry, "@type") for entry in entries]
    found = {item for item in types if item}
    if len(types) != len(set(types)):
        errors.append("Rendered JSON-LD `@graph` contains duplicate @type entries.")
    if found != REQUIRED_JSON_LD:
        errors.append(f"Rendered JSON-LD `@graph` types differ: missing={sorted(REQUIRED_JSON_LD-found)}, extra={sorted(found-REQUIRED_JSON_LD)}")
    code = mask_strings(layout)
    has_jsonld_type = re.search(r"['\"]application/ld\+json['\"]", mask_comments(layout)) is not None
    if re.search(r"JSON\.stringify\(\s*structuredData\s*\)", code) is None or not has_jsonld_type:
        errors.append("The `structuredData` object must be serialized into an application/ld+json script.")
    return errors


def homepage_faq_findings(source: str) -> list[str]:
    """Require the localized, visible homepage FAQ schema at its sole owner."""
    errors: list[str] = []
    schema = declaration(source, "homepageFaqSchema", "{")
    if schema is None:
        return ["The shared homepage renderer must declare `homepageFaqSchema`."]
    schema = mask_comments(schema)
    if field_string(schema, "@type") != "FAQPage":
        errors.append("`homepageFaqSchema` must declare the `FAQPage` type.")
    if not re.search(r"copy\s*\.\s*faq\s*\.\s*items\s*\.\s*map\s*\(", mask_strings(source)):
        errors.append("`homepageFaqSchema` must be built from the same localized `copy.faq.items` rendered by the homepage.")
    code = mask_strings(source)
    has_jsonld_type = re.search(r"['\"]application/ld\+json['\"]", mask_comments(source)) is not None
    if re.search(r"JSON\.stringify\(\s*homepageFaqSchema\s*\)", code) is None or not has_jsonld_type:
        errors.append("`homepageFaqSchema` must be serialized into an application/ld+json script on the shared homepage renderer.")
    return errors


def source_files(root: Path) -> list[Path]:
    found: set[Path] = set()
    for directory in (root / "src/content", root / "src/app", root / "src/components"):
        if directory.exists():
            found.update(p for p in directory.rglob("*") if p.is_file() and p.suffix in {".ts", ".tsx", ".js", ".jsx", ".mjs"})
    content = root / "src/lib/content.ts"
    if content.is_file():
        found.add(content)
    return sorted(found)


def project_media_references(files: list[Path]) -> set[str]:
    references: set[str] = set()
    pattern = re.compile(r"(?:/projects/|public/projects/)([^\s'\"`)>]+)", re.I)
    for file in files:
        try:
            text = mask_comments(file.read_text(encoding="utf-8"))
        except (OSError, UnicodeDecodeError):
            continue
        for _, literal in string_spans(text):
            for match in pattern.finditer(literal):
                candidate = unquote(re.split(r"[?#]", match.group(1), maxsplit=1)[0])
                if "${" not in candidate and Path(candidate).suffix.lower() in IMAGE_EXTENSIONS | {".mp4"}:
                    references.add(candidate.lstrip("/"))
    return references


def media_findings(root: Path, files: list[Path]) -> list[str]:
    errors: list[str] = []
    references = project_media_references(files)
    for item in sorted(references):
        relative = item.removeprefix("public/projects/")
        asset = root / "public/projects" / relative
        if not asset.is_file():
            matches = [p for p in (root / "public/projects").rglob("*") if p.is_file() and p.name.casefold() == Path(relative).name.casefold()] if (root / "public/projects").exists() else []
            detail = " (case mismatch possible)" if matches else ""
            errors.append(f"Referenced media does not exist at exact-case path `/projects/{relative}`{detail}.")
        elif asset.suffix.lower() in IMAGE_EXTENSIONS and asset.stat().st_size > MAX_IMAGE_BYTES:
            errors.append(f"Referenced image exceeds 500 KiB: `public/projects/{relative}` ({asset.stat().st_size} bytes).")
    for relative in sorted(NAMED_IMAGES):
        asset = root / "public/projects" / relative
        if not asset.is_file():
            errors.append(f"Required optimized image is missing: `public/projects/{relative}`.")
        elif asset.stat().st_size >= NAMED_IMAGE_LIMIT:
            errors.append(f"Required optimized image must be <200000 bytes: `public/projects/{relative}` ({asset.stat().st_size} bytes).")
        if relative not in references:
            errors.append(f"Required optimized image is not referenced by rendered source: `/projects/{relative}`.")
    old_asset = root / "public/projects" / LEGACY_FOCUS_IMAGE
    if old_asset.exists():
        errors.append(f"Legacy oversized Focus Ritual PNG must be removed: `public/projects/{LEGACY_FOCUS_IMAGE}`.")
    if LEGACY_FOCUS_IMAGE in references:
        errors.append(f"Rendered source still references the legacy Focus Ritual PNG: `/projects/{LEGACY_FOCUS_IMAGE}`.")
    if any(Path(item).suffix.lower() == ".mp4" for item in references):
        source = "\n".join(p.read_text(encoding="utf-8", errors="replace") for p in files)
        if not re.search(r"<video\b[^>]*\bpreload\s*=\s*['\"]metadata['\"]", source, re.I):
            errors.append('Referenced video is missing `preload="metadata"`.')
    return errors


def source_audit(root: Path = ROOT) -> list[str]:
    errors: list[str] = []
    files = source_files(root)
    if not files:
        return ["No application source files found under the audited source paths."]
    errors.extend(copy_findings(files, root))
    content_path = root / "src/lib/content.ts"
    content = content_path.read_text(encoding="utf-8") if content_path.is_file() else ""
    errors.extend(catalog_findings(content))
    errors.extend(localized_shell_findings(root))
    layout_path = root / "src/app/layout.tsx"
    layout = layout_path.read_text(encoding="utf-8") if layout_path.is_file() else ""
    errors.extend(schema_findings(layout))
    homepage_path = root / "src/components/home/home-page.tsx"
    homepage = homepage_path.read_text(encoding="utf-8") if homepage_path.is_file() else ""
    errors.extend(homepage_faq_findings(homepage))
    for route in REQUIRED_ROUTES:
        if not (root / route).is_file():
            errors.append(f"Required route file is missing: `{route}`.")
    config = root / "next.config.ts"
    if config.is_file():
        text = config.read_text(encoding="utf-8")
        if not re.search(r"source\s*:\s*['\"]/?mahmoud['\"]", text) or not re.search(r"destination\s*:\s*['\"]/studio['\"]", text):
            errors.append("Legacy `/mahmoud` permanent redirect to `/studio` is missing from next.config.ts.")
    errors.extend(media_findings(root, files))
    return errors


def parse_time(value: Any) -> datetime | None:
    if not isinstance(value, str):
        return None
    try:
        parsed = datetime.fromisoformat(value.replace("Z", "+00:00"))
        return parsed if parsed.tzinfo else parsed.replace(tzinfo=timezone.utc)
    except ValueError:
        return None


def png_ihdr_dimensions(path: Path) -> tuple[int, int] | None:
    """Validate a PNG stream, its CRCs, IDAT deflate data, scanlines, and IHDR dimensions."""
    try:
        content = path.read_bytes()
    except OSError:
        return None
    if len(content) < 8 or content[:8] != b"\x89PNG\r\n\x1a\n":
        return None
    offset = 8
    width = height = bit_depth = color_type = interlace = None
    idat = bytearray()
    idat_started = idat_closed = False
    saw_iend = False
    channels_by_type = {0: 1, 2: 3, 3: 1, 4: 2, 6: 4}
    allowed_depths = {0: {1, 2, 4, 8, 16}, 2: {8, 16}, 3: {1, 2, 4, 8}, 4: {8, 16}, 6: {8, 16}}
    known_critical = {b"IHDR", b"PLTE", b"IDAT", b"IEND"}
    try:
        while offset < len(content):
            if offset + 12 > len(content):
                return None
            length = struct.unpack(">I", content[offset:offset + 4])[0]
            kind = content[offset + 4:offset + 8]
            end = offset + 12 + length
            if end > len(content):
                return None
            payload = content[offset + 8:offset + 8 + length]
            crc = struct.unpack(">I", content[offset + 8 + length:end])[0]
            if zlib.crc32(kind + payload) & 0xFFFFFFFF != crc:
                return None
            if width is None and (kind != b"IHDR" or length != 13):
                return None
            if kind == b"IHDR":
                if width is not None or offset != 8 or length != 13:
                    return None
                width, height, bit_depth, color_type, compression, filtering, interlace = struct.unpack(">IIBBBBB", payload)
                if width <= 0 or height <= 0 or color_type not in channels_by_type or bit_depth not in allowed_depths[color_type]:
                    return None
                if compression != 0 or filtering != 0 or interlace not in (0, 1):
                    return None
            elif kind == b"IDAT":
                if idat_closed:
                    return None
                idat_started = True
                idat.extend(payload)
            elif kind == b"IEND":
                if length != 0 or not idat_started or end != len(content):
                    return None
                saw_iend = True
                offset = end
                break
            else:
                if idat_started:
                    idat_closed = True
                if kind and 65 <= kind[0] <= 90 and kind not in known_critical:
                    return None
            if idat_started and kind not in (b"IDAT", b"IEND"):
                idat_closed = True
            offset = end
    except (struct.error, OverflowError):
        return None
    if not saw_iend or width is None or not idat:
        return None
    channels = channels_by_type[color_type]
    bits_per_pixel = channels * bit_depth
    passes = [(0, 0, 1, 1)] if interlace == 0 else [
        (0, 0, 8, 8), (4, 0, 8, 8), (0, 4, 4, 8),
        (2, 0, 4, 4), (0, 2, 2, 4), (1, 0, 2, 2), (0, 1, 1, 2),
    ]
    row_lengths: list[int] = []
    for x0, y0, dx, dy in passes:
        pass_width = 0 if width <= x0 else (width - x0 + dx - 1) // dx
        pass_height = 0 if height <= y0 else (height - y0 + dy - 1) // dy
        if pass_width and pass_height:
            row_bytes = (pass_width * bits_per_pixel + 7) // 8
            row_lengths.extend([row_bytes] * pass_height)
    try:
        decoder = zlib.decompressobj()
        decoded = decoder.decompress(bytes(idat)) + decoder.flush()
    except zlib.error:
        return None
    if not decoder.eof or decoder.unused_data or decoder.unconsumed_tail:
        return None
    offset = 0
    for row_bytes in row_lengths:
        stride = row_bytes + 1
        if offset + stride > len(decoded) or decoded[offset] > 4:
            return None
        offset += stride
    if offset != len(decoded):
        return None
    return (width, height)


def check_png_record(path: Path, record: dict[str, Any], source: str, viewport: dict[str, Any] | None = None) -> list[str]:
    errors: list[str] = []
    if Path(str(record.get("path", ""))).suffix.lower() != ".png":
        errors.append(f"{source} artifact path must use the `.png` extension: `{record.get('path')}`.")
    dimensions = png_ihdr_dimensions(path)
    if dimensions is None:
        return [f"{source} artifact is not a complete valid PNG stream (signature, CRC, IDAT, scanlines, IEND): `{record.get('path')}`."]
    recorded = record.get("imagePixels")
    expected = (recorded.get("width"), recorded.get("height")) if isinstance(recorded, dict) else None
    if expected != dimensions:
        errors.append(f"{source} PNG IHDR dimensions {dimensions} do not match recorded imagePixels {expected}: `{record.get('path')}`.")
    if viewport is not None:
        if dimensions[0] != viewport.get("width"):
            errors.append(f"Website PNG width {dimensions[0]} does not match requested viewport width {viewport.get('width')}: `{record.get('path')}`.")
        if dimensions[1] < viewport.get("height", 0):
            errors.append(f"Website PNG height {dimensions[1]} is shorter than requested viewport height {viewport.get('height')}: `{record.get('path')}`.")
    return errors


def run_identifier(generated: datetime) -> str:
    stamp = generated.astimezone(timezone.utc)
    return stamp.strftime("%Y-%m-%dT%H-%M-%S-") + f"{stamp.microsecond // 1000:03d}Z"


def route_filename(route: str) -> str:
    return "home" if route == "/" else route.lstrip("/").replace("/", "--").replace("[", "").replace("]", "")


def page_key(route: str) -> str:
    if route == "/":
        return "home-en"
    if route == "/ar":
        return "home-ar"
    return route.strip("/").replace("/", "--").replace("[", "").replace("]", "")


def expected_capture(route: str, theme: str, width: int, height: int) -> str:
    locale = "ar" if route == "/ar" else "en"
    variant = f"{width}x{height}-{theme}-{locale}"
    return f"design/reviews/latest/website/{page_key(route)}/{variant}.png"


def visual_capture_findings(manifest: dict[str, Any], root: Path, now: datetime | None = None) -> list[str]:
    errors: list[str] = []
    now = now or datetime.now(timezone.utc)
    sources = manifest.get("sources")
    if not isinstance(sources, dict):
        return ["Shared latest manifest must contain `sources.openpencil` and `sources.website` sections."]
    rows = sources.get("website")
    if not isinstance(rows, list) or len(rows) != 96:
        errors.append(f"Shared latest manifest website section must contain exactly 96 captures; found {len(rows) if isinstance(rows, list) else 0}.")
        rows = rows if isinstance(rows, list) else []
    design_rows = sources.get("openpencil")
    if not isinstance(design_rows, list):
        errors.append("Shared latest manifest must preserve an OpenPencil source section.")
        design_rows = []
    expected = {(r, t, w, h) for r in ROUTES for t in THEMES for w, h in VIEWPORTS}
    observed: set[tuple[str, str, int, int]] = set()
    capture_paths: list[str] = []
    for index, row in enumerate(rows):
        if not isinstance(row, dict) or not isinstance(row.get("viewport"), dict):
            errors.append(f"Website capture row {index + 1} is malformed.")
            continue
        viewport = row["viewport"]
        key = (row.get("route"), row.get("theme"), viewport.get("width"), viewport.get("height"))
        if key in observed:
            errors.append(f"Browser matrix contains duplicate combination: {key}.")
        observed.add(key)
        route, theme, width, height = key
        if key not in expected:
            errors.append(f"Unplanned website capture: {key}.")
        locale = "ar" if route == "/ar" else "en"
        direction = "rtl" if locale == "ar" else "ltr"
        if row.get("locale") != locale or row.get("direction") != direction:
            errors.append(f"Website capture {key} has incorrect locale or direction metadata.")
        if row.get("status") != 200:
            errors.append(f"Website capture {key} did not return HTTP 200.")
        if row.get("overflowPixels") != 0:
            errors.append(f"Website capture {key} has horizontal overflow ({row.get('overflowPixels')}px).")
        if row.get("browserErrors"):
            errors.append(f"Website capture {key} recorded browser errors.")
        expected_path = expected_capture(route, theme, width, height) if isinstance(route, str) and isinstance(theme, str) and isinstance(width, int) and isinstance(height, int) else ""
        image = row.get("path")
        if image != expected_path:
            errors.append(f"Website capture {key} must use its unique managed path `{expected_path}`; found `{image}`.")
        if isinstance(image, str):
            capture_paths.append(image)
            artifact = Path(image)
            if not artifact.is_absolute():
                artifact = root / artifact
            if not artifact.is_file():
                errors.append(f"Website screenshot artifact is missing: `{image}`.")
            else:
                errors.extend(check_png_record(artifact, row, "Website screenshot", viewport))
                captured = parse_time(row.get("capturedAt"))
                digest = hashlib.sha256(artifact.read_bytes()).hexdigest()
                if captured is None or (now - captured).total_seconds() > VISUAL_MAX_AGE_SECONDS or captured > now:
                    errors.append(f"Website screenshot capture time is invalid or stale: `{image}`.")
                elif abs(artifact.stat().st_mtime - captured.timestamp()) > 5:
                    errors.append(f"Website screenshot modification time does not match capturedAt: `{image}`.")
                if digest != row.get("sha256"):
                    errors.append(f"Website screenshot hash differs from manifest: `{image}`.")
        if row.get("actualTheme") != theme:
            errors.append(f"Website capture {key} did not confirm the requested rendered theme.")
    if len(set(capture_paths)) != len(capture_paths):
        errors.append("Every website matrix entry must have a distinct screenshot path.")
    for key in sorted(expected - observed):
        errors.append(f"Website captures are missing planned combination: {key}.")

    design_by_path = {row.get("path"): row for row in design_rows if isinstance(row, dict)}
    for index, design in enumerate(design_rows):
        if not isinstance(design, dict):
            errors.append(f"OpenPencil source row {index + 1} is malformed.")
            continue
        design_value = design.get("path")
        if not isinstance(design_value, str) or not design_value.startswith("design/reviews/latest/openpencil/"):
            errors.append(f"OpenPencil source row {index + 1} must use its canonical managed path.")
            continue
        design_file = root / design_value
        if not design_file.is_file():
            errors.append(f"OpenPencil export is missing: `{design_value}`.")
            continue
        errors.extend(check_png_record(design_file, design, "OpenPencil"))
        digest = hashlib.sha256(design_file.read_bytes()).hexdigest()
        if digest != design.get("sha256"):
            errors.append(f"OpenPencil export hash differs from manifest: `{design_value}`.")
        exported = parse_time(design.get("exportedAt"))
        if exported is None or (now - exported).total_seconds() > VISUAL_MAX_AGE_SECONDS or exported > now:
            errors.append(f"OpenPencil export is missing a valid fresh exportedAt timestamp: `{design_value}`.")
        elif abs(design_file.stat().st_mtime - exported.timestamp()) > 5:
            errors.append(f"OpenPencil export time does not match file timestamp: `{design_value}`.")
    comparisons = manifest.get("comparisons")
    if not isinstance(comparisons, list) or len(comparisons) < 12:
        errors.append("Shared manifest must contain at least 12 explicit browser-to-OpenPencil comparison records.")
        comparisons = comparisons if isinstance(comparisons, list) else []
    reviewed_captures: list[str] = []
    website_by_path = {row.get("path"): row for row in rows if isinstance(row, dict)}
    for index, pair in enumerate(comparisons):
        if not isinstance(pair, dict):
            errors.append(f"Visual comparison {index + 1} must be an object.")
            continue
        website_path, design_path = pair.get("websitePath"), pair.get("openpencilPath")
        website = website_by_path.get(website_path)
        design = design_by_path.get(design_path)
        if website is None or design is None:
            errors.append(f"Visual comparison {index + 1} must reference members of the website and OpenPencil manifest sections.")
            continue
        reviewed_captures.append(website_path)
        for field in ("route", "theme", "viewport", "locale", "direction"):
            if pair.get(field) != website.get(field) or pair.get(field) != design.get(field):
                errors.append(f"Visual comparison {index + 1} metadata field `{field}` does not match both capture records.")
        if pair.get("verdict") != "pass" or not isinstance(pair.get("findings"), list) or not pair["findings"]:
            errors.append(f"Visual comparison {index + 1} requires a passing verdict and recorded findings.")
        if not pair.get("reviewer") or parse_time(pair.get("reviewedAt")) is None:
            errors.append(f"Visual comparison {index + 1} requires reviewer and review time.")
        if not design.get("documentFingerprint") or not design.get("pageId") or not design.get("nodeId"):
            errors.append(f"Visual comparison {index + 1} OpenPencil source lacks verified document/page/node identity.")
        if not str(design_path).startswith("design/reviews/latest/openpencil/"):
            errors.append(f"Visual comparison {index + 1} must use the managed OpenPencil export path.")
        expected_frame = "Evolved Desktop" if website["viewport"]["width"] >= 1000 else "Evolved Mobile"
        expected_x = 3060 if expected_frame == "Evolved Desktop" else 4660
        actual_frame = str(design.get("frameName", "")).casefold()
        expected_orientation = "desktop" if expected_x == 3060 else "mobile"
        if "evolved" not in actual_frame or expected_orientation not in actual_frame or design.get("frameX") != expected_x or not design.get("frameId"):
            errors.append(f"Visual comparison {index + 1} must identify verified {expected_frame} at x={expected_x}.")
    if len(set(reviewed_captures)) != len(reviewed_captures):
        errors.append("Visual comparison browser captures must be distinct website manifest members.")
    return errors


def evidence_audit(report: Path, root: Path = ROOT) -> list[str]:
    if not report.is_file():
        return [f"Implementation report not found: `{report}`."]
    text = report.read_text(encoding="utf-8")
    match = re.search(r"^\*\*Browser evidence manifest:\*\*\s*`?([^`\n]+)`?\s*$", text, re.M)
    if not match:
        return ["Report must name a Browser evidence manifest path; Markdown PASS text is not evidence."]
    manifest_path = Path(match.group(1).strip())
    if not manifest_path.is_absolute():
        manifest_path = root / manifest_path
    canonical_path = root / "design/reviews/latest/manifest.json"
    if manifest_path.resolve() != canonical_path.resolve():
        return [f"Browser evidence manifest must be the canonical path `design/reviews/latest/manifest.json`, not `{match.group(1).strip()}`."]
    if not manifest_path.is_file():
        return [f"Browser evidence manifest does not exist: `{manifest_path}`."]
    try:
        manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as exc:
        return [f"Browser evidence manifest is invalid JSON: {exc}."]
    return visual_capture_findings(manifest, root)


def source_and_evidence(report: str | None = None) -> list[str]:
    errors = source_audit(ROOT)
    if report:
        errors.extend(evidence_audit(Path(report).resolve(), ROOT))
    return errors


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    mode = parser.add_mutually_exclusive_group(required=True)
    mode.add_argument("--scan", action="store_true", help="scan source/media only; not runtime or visual evidence")
    mode.add_argument("--verify", metavar="REPORT", help="source plus browser evidence gate")
    args = parser.parse_args()
    try:
        errors = source_and_evidence(args.verify)
    except RuntimeError as exc:
        print(f"FAIL: {exc}")
        return 2
    if errors:
        print(f"FAIL: {len(errors)} issue(s) found")
        for error in errors[:80]:
            print(f"  [FAIL] {error}")
        if len(errors) > 80:
            print(f"  ... {len(errors) - 80} additional issue(s) omitted")
        return 1
    if args.scan:
        print("SOURCE PASS: source/media only; no browser, visual, rendered-contrast, accessibility, or runtime claim.")
    else:
        print("PASS: source checks and per-run browser/visual-inspection evidence are present and current.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
