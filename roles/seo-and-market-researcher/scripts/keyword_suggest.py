#!/usr/bin/env python3
"""
Zero-API-Key Google Autocomplete Keyword Harvester (inspired by HasData/python-for-seo).
Queries Google's public suggest endpoint for one or more seed phrases and outputs JSON/Markdown.

Usage:
  python3 roles/seo-and-market-researcher/scripts/keyword_suggest.py "hire flutter developer" "nextjs freelance developer"
"""
import json
import sys
import urllib.parse
import urllib.request


def fetch_suggestions(query: str) -> list[str]:
    url = (
        "https://suggestqueries.google.com/complete/search?client=firefox&hl=en&q="
        + urllib.parse.quote(query)
    )
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    try:
        with urllib.request.urlopen(req, timeout=5) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            return data[1] if len(data) > 1 and isinstance(data[1], list) else []
    except Exception as exc:
        return [f"Error fetching '{query}': {exc}"]


def main() -> None:
    seeds = sys.argv[1:] or [
        "hire senior flutter developer",
        "freelance react native kotlin developer",
        "hire full stack nextjs engineer",
        "freelance python ai automation developer",
    ]
    results = {}
    for seed in seeds:
        results[seed] = fetch_suggestions(seed)
    print(json.dumps(results, indent=2))


if __name__ == "__main__":
    main()
