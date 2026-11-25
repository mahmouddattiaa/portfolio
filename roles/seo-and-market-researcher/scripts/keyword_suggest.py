#!/usr/bin/env python3
"""
Zero-API Google Autocomplete keyword harvester for Stage 1 Role 1.2 (seo-and-market-researcher).

Uses only Python 3.11+ standard library modules. Supports locale-aware intent-modifier
expansion (--expand-intents with --lang en|ar), JSON or Markdown output (--format json|markdown),
and an offline deterministic --self-test mode.
"""

from __future__ import annotations

import argparse
import json
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from typing import Any

AUTOCOMPLETE_URL = "https://suggestqueries.google.com/complete/search"
LOCALE_INTENT_MODIFIERS: dict[str, tuple[str, ...]] = {
    "en": ("alternative", "pricing", "vs", "for", "how to"),
    "ar": ("سعر", "تكلفة", "أفضل شركة", "للشركات الناشئة", "كيف", "في السعودية", "في مصر"),
}
INTENT_MODIFIERS: tuple[str, ...] = LOCALE_INTENT_MODIFIERS["en"]
USER_AGENT = "Mozilla/5.0 (compatible; Stage1KeywordSuggest/1.0)"


def normalize_lang(lang: str | None) -> str:
    """Normalize a locale/language tag (e.g., 'ar-SA' -> 'ar'), defaulting unknown locales to 'en'."""
    if not lang or not isinstance(lang, str):
        return "en"
    base = lang.strip().replace("_", "-").split("-")[0].lower()
    return base if base in LOCALE_INTENT_MODIFIERS else "en"


def expand_queries(
    seeds: list[str],
    expand_intents: bool = False,
    lang: str = "en",
) -> list[tuple[str, str]]:
    """Return list of (seed, query) pairs in deterministic order using locale-specific modifiers."""
    modifiers = LOCALE_INTENT_MODIFIERS[normalize_lang(lang)]
    pairs: list[tuple[str, str]] = []
    seen: set[str] = set()
    for raw_seed in seeds:
        seed = " ".join(raw_seed.strip().split())
        if not seed:
            continue
        candidates = [seed]
        if expand_intents:
            for mod in modifiers:
                candidates.append(f"{seed} {mod}")
        for q in candidates:
            key = q.lower()
            if key not in seen:
                seen.add(key)
                pairs.append((seed, q))
    return pairs


def parse_autocomplete_payload(raw_text: str) -> list[str]:
    """Parse Google Firefox-client autocomplete JSON response: [query, [suggestions...]]."""
    data = json.loads(raw_text)
    if not isinstance(data, list) or len(data) < 2 or not isinstance(data[1], list):
        raise ValueError("Unexpected autocomplete payload shape")
    out: list[str] = []
    seen: set[str] = set()
    for item in data[1]:
        if isinstance(item, str):
            cleaned = " ".join(item.strip().split())
            key = cleaned.lower()
            if cleaned and key not in seen:
                seen.add(key)
                out.append(cleaned)
    return out


def fetch_suggestions(query: str, *, lang: str = "en", timeout: float = 8.0) -> list[str]:
    params = urllib.parse.urlencode({"client": "firefox", "hl": lang, "q": query})
    url = f"{AUTOCOMPLETE_URL}?{params}"
    req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    with urllib.request.urlopen(req, timeout=timeout) as resp:
        charset = resp.headers.get_content_charset() or "utf-8"
        body = resp.read().decode(charset, errors="replace")
    return parse_autocomplete_payload(body)


def format_markdown(results: list[dict[str, Any]]) -> str:
    lines: list[str] = [
        "# Autocomplete Keyword Harvest",
        "",
        "| Seed | Query | Count | Suggestions |",
        "| --- | --- | --- | --- |",
    ]
    for row in results:
        seed = str(row["seed"]).replace("|", "\\|")
        query = str(row["query"]).replace("|", "\\|")
        suggestions = [str(s).replace("|", "\\|") for s in row["suggestions"]]
        joined = "; ".join(suggestions) if suggestions else "(none)"
        lines.append(f"| {seed} | {query} | {len(suggestions)} | {joined} |")
    return "\n".join(lines) + "\n"


def format_json(results: list[dict[str, Any]]) -> str:
    return json.dumps({"results": results}, indent=2, ensure_ascii=False) + "\n"


def run_self_test() -> int:
    # 1. Deterministic English query expansion
    plain = expand_queries(["invoice reconciliation"], expand_intents=False)
    assert plain == [("invoice reconciliation", "invoice reconciliation")], f"Unexpected plain expansion: {plain}"

    expanded = expand_queries(["invoice reconciliation"], expand_intents=True, lang="en")
    expected_queries = [
        "invoice reconciliation",
        "invoice reconciliation alternative",
        "invoice reconciliation pricing",
        "invoice reconciliation vs",
        "invoice reconciliation for",
        "invoice reconciliation how to",
    ]
    assert [q for _, q in expanded] == expected_queries, f"Unexpected expanded queries: {expanded}"

    # 2. Deterministic Arabic query expansion (zero English modifiers)
    ar_seed = "تنفيذ فكرة تطبيق"
    ar_expanded = expand_queries([ar_seed], expand_intents=True, lang="ar")
    expected_ar_queries = [
        ar_seed,
        f"{ar_seed} سعر",
        f"{ar_seed} تكلفة",
        f"{ar_seed} أفضل شركة",
        f"{ar_seed} للشركات الناشئة",
        f"{ar_seed} كيف",
        f"{ar_seed} في السعودية",
        f"{ar_seed} في مصر",
    ]
    assert [q for _, q in ar_expanded] == expected_ar_queries, f"Unexpected Arabic expanded queries: {ar_expanded}"
    for _, q in ar_expanded:
        for en_mod in LOCALE_INTENT_MODIFIERS["en"]:
            assert en_mod not in q, f"English modifier '{en_mod}' leaked into Arabic query: {q}"

    # Locale tag normalization (ar-SA -> ar, unknown -> en)
    assert expand_queries([ar_seed], expand_intents=True, lang="ar-SA") == ar_expanded
    assert expand_queries(["app mvp"], expand_intents=True, lang="fr")[1] == ("app mvp", "app mvp alternative")

    # 3. Payload parsing and deduplication (English & UTF-8 Arabic)
    sample_payload = json.dumps(
        [
            "invoice reconciliation pricing",
            [
                "invoice reconciliation pricing",
                "invoice reconciliation software pricing",
                "Invoice Reconciliation Pricing",
                "automated invoice reconciliation pricing",
            ],
        ]
    )
    parsed = parse_autocomplete_payload(sample_payload)
    assert parsed == [
        "invoice reconciliation pricing",
        "invoice reconciliation software pricing",
        "automated invoice reconciliation pricing",
    ], f"Unexpected parsed suggestions: {parsed}"

    ar_payload = json.dumps(
        [
            "تكلفة تنفيذ فكرة تطبيق MVP",
            [
                "تكلفة تنفيذ فكرة تطبيق MVP",
                "  تكلفة تنفيذ   فكرة تطبيق mvp ",
                "أفضل شركة برمجة تطبيقات في السعودية",
                "تنفيذ فكرة تطبيق للشركات الناشئة",
            ],
        ],
        ensure_ascii=False,
    )
    parsed_ar = parse_autocomplete_payload(ar_payload)
    assert parsed_ar == [
        "تكلفة تنفيذ فكرة تطبيق MVP",
        "أفضل شركة برمجة تطبيقات في السعودية",
        "تنفيذ فكرة تطبيق للشركات الناشئة",
    ], f"Unexpected Arabic parsed suggestions: {parsed_ar}"

    # 4. Formatting in both json and markdown (including UTF-8 Arabic with ensure_ascii=False)
    sample_results = [
        {
            "seed": "invoice reconciliation",
            "query": "invoice reconciliation pricing",
            "suggestions": parsed,
        },
        {
            "seed": ar_seed,
            "query": f"{ar_seed} تكلفة",
            "suggestions": parsed_ar,
        },
    ]
    md = format_markdown(sample_results)
    assert "| Seed | Query | Count | Suggestions |" in md
    assert "invoice reconciliation software pricing" in md
    assert "أفضل شركة برمجة تطبيقات في السعودية" in md

    js = format_json(sample_results)
    assert "أفضل شركة برمجة تطبيقات في السعودية" in js, "format_json must preserve UTF-8 Arabic (ensure_ascii=False)"
    loaded = json.loads(js)
    assert loaded["results"][0]["query"] == "invoice reconciliation pricing"
    assert len(loaded["results"][0]["suggestions"]) == 3
    assert loaded["results"][1]["query"] == f"{ar_seed} تكلفة"
    assert loaded["results"][1]["suggestions"] == parsed_ar

    print(
        "PASS: keyword_suggest.py --self-test passed (en/ar intent expansion, locale normalization, "
        "UTF-8 payload parsing, deduplication, json/markdown output)."
    )
    return 0


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(
        description="Harvest live Google Autocomplete suggestions with optional locale-aware intent expansion."
    )
    parser.add_argument("seeds", nargs="*", help="One or more seed keyword phrases.")
    parser.add_argument(
        "--expand-intents",
        action="store_true",
        help="Append locale-specific buyer intent modifiers (en or ar) to each seed.",
    )
    parser.add_argument(
        "--format",
        choices=("markdown", "json"),
        default="markdown",
        help="Output format (default: markdown).",
    )
    parser.add_argument("--lang", default="en", help="Language code for hl parameter and intent modifiers (default: en).")
    parser.add_argument("--limit", type=int, default=10, help="Max suggestions per query (default: 10).")
    parser.add_argument("--timeout", type=float, default=8.0, help="HTTP timeout in seconds (default: 8.0).")
    parser.add_argument("--delay", type=float, default=0.15, help="Delay between requests in seconds (default: 0.15).")
    parser.add_argument("--self-test", action="store_true", help="Run offline deterministic self-tests and exit.")
    args = parser.parse_args(argv)

    if args.self_test:
        return run_self_test()

    if not args.seeds:
        parser.print_help()
        return 2

    pairs = expand_queries(args.seeds, expand_intents=args.expand_intents, lang=args.lang)
    results: list[dict[str, Any]] = []
    for idx, (seed, query) in enumerate(pairs):
        if idx > 0 and args.delay > 0:
            time.sleep(args.delay)
        try:
            suggestions = fetch_suggestions(query, lang=args.lang, timeout=args.timeout)
            if args.limit > 0:
                suggestions = suggestions[: args.limit]
            results.append({"seed": seed, "query": query, "suggestions": suggestions})
        except (urllib.error.URLError, TimeoutError, ValueError, OSError) as exc:
            print(f"WARN: autocomplete failed for '{query}': {exc}", file=sys.stderr)
            results.append({"seed": seed, "query": query, "suggestions": [], "error": str(exc)})

    if args.format == "json":
        sys.stdout.write(format_json(results))
    else:
        sys.stdout.write(format_markdown(results))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
