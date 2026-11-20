#!/usr/bin/env python3
"""
Deterministic verifier for Stage 1, Role 2 (B2B SEO & Market Researcher).
Checks:
1. All 12 required routes are present in the Metadata Table with <title> (45-60 chars) and <meta description> (135-160 chars).
2. JSON-LD code block parses as valid JSON, contains @graph with Organization, WebSite, Service, FAQPage, and ZERO Person entities.
3. All 5 GEO blocks (1 Identity block + 4 FAQ blocks) are 40-60 words.
4. Self-audit table has 0 FAIL rows.
"""

import json
import re
import sys
from pathlib import Path

REQUIRED_ROUTES = [
    "/",
    "/work",
    "/services",
    "/studio",
    "/contact",
    "/ar",
    "/work/glitre-loyalty-platform",
    "/work/hs-vpn",
    "/work/quickcharging-pos",
    "/work/medconnect-egypt",
    "/work/stayease",
    "/work/classroom-sentinel",
]


def verify(filepath: str):
    p = Path(filepath)
    if not p.exists():
        print(f"[FAIL] File not found: {filepath}")
        sys.exit(1)

    text = p.read_text(encoding="utf-8")
    errors = []

    # 1. Check metadata table rows
    route_found = {r: False for r in REQUIRED_ROUTES}
    for line in text.splitlines():
        if not line.strip().startswith("|"):
            continue
        cells = [c.strip() for c in line.strip().strip("|").split("|")]
        if len(cells) < 6:
            continue
        route_cell = cells[0].strip("` ")
        if route_cell in route_found:
            route_found[route_cell] = True
            title_str = cells[1].strip("` ")
            desc_str = cells[3].strip("` ")
            t_len = len(title_str)
            d_len = len(desc_str)
            if not (45 <= t_len <= 60):
                errors.append(f"Route {route_cell}: <title> length is {t_len} chars (must be 45-60): '{title_str}'")
            if not (135 <= d_len <= 160):
                errors.append(f"Route {route_cell}: <meta description> length is {d_len} chars (must be 135-160): '{desc_str}'")

    for r, found in route_found.items():
        if not found:
            errors.append(f"Metadata table missing row for route: {r}")

    # 2. Check GEO block word counts (blockquotes starting with >)
    sec4_match = re.search(r"## 4\. AI Search \(GEO\).*?(?=## 5\.)", text, re.DOTALL)
    if not sec4_match:
        errors.append("Missing '## 4. AI Search (GEO)' section")
    else:
        sec4 = sec4_match.group(0)
        quotes = re.findall(r"(?:^>\s*.+(?:\n>\s*.+)*)", sec4, re.MULTILINE)
        if len(quotes) < 5:
            errors.append(f"Section 4 must have at least 5 blockquote answer blocks (1 Identity + 4 FAQs), found {len(quotes)}")
        for idx, q in enumerate(quotes[:5], start=1):
            clean_q = re.sub(r"^>\s*", "", q, flags=re.MULTILINE).strip()
            words = clean_q.split()
            w_count = len(words)
            if not (40 <= w_count <= 60):
                errors.append(f"GEO Block #{idx} word count is {w_count} words (must be 40-60 words): '{clean_q[:80]}...'")

    # 3. Check JSON-LD block
    json_blocks = re.findall(r"```json\s*(.*?)\s*```", text, re.DOTALL)
    if not json_blocks:
        errors.append("Missing ```json ... ``` structured data block in Section 5")
    else:
        try:
            data = json.loads(json_blocks[0])
            graph = data.get("@graph", [])
            if not isinstance(graph, list) or len(graph) < 4:
                errors.append("JSON-LD @graph must be a list with at least 4 entities")
            types_found = set()
            for item in graph:
                t = item.get("@type")
                if isinstance(t, list):
                    types_found.update(t)
                elif isinstance(t, str):
                    types_found.add(t)
            if "Person" in types_found:
                errors.append("JSON-LD contains forbidden '@type': 'Person' (studio schema must be 100% decoupled)")
            for req_t in ["Organization", "WebSite", "Service", "FAQPage"]:
                if req_t not in types_found:
                    errors.append(f"JSON-LD @graph missing required @type '{req_t}'")
        except Exception as e:
            errors.append(f"Invalid JSON in JSON-LD block: {e}")

    if "| `FAIL`" in text or "| FAIL |" in text:
        errors.append("Self-audit checklist contains a FAIL row")

    if errors:
        print(f"FAIL: seo_audit.py found {len(errors)} issue(s):")
        for e in errors:
            print(f"  [FAIL] {e}")
        sys.exit(1)

    print("PASS: seo-and-market-brief.md verified (12 route metadata rows, 5 GEO blocks 40-60 words, valid Organization JSON-LD).")
    sys.exit(0)


if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: seo_audit.py <docs/seo-and-market-brief.md>")
        sys.exit(2)
    verify(sys.argv[1])
