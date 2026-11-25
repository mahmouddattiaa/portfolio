#!/usr/bin/env python3
"""
Stdlib IndexNow key verifier, payload builder, and URL ping utility for
Stage 1 Role 1.5 (ai-search-and-technical-geo-engineer).

Usage:
  python3 -B indexnow_ping.py --verify-key public/<key>.txt
  python3 -B indexnow_ping.py --build-payload --host example.com --key <key> --urls https://example.com/ [--key-location https://example.com/<key>.txt]
  python3 -B indexnow_ping.py --submit --host example.com --key <key> --urls https://example.com/ [--key-location <url>] [--dry-run]
  python3 -B indexnow_ping.py --self-test
"""

from __future__ import annotations

import argparse
import contextlib
import io
import json
import re
import sys
import tempfile
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path
from typing import Any

INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow"
KEY_PATTERN = re.compile(r"^[A-Za-z0-9-]{8,128}$")


def validate_key_format(key: str) -> list[str]:
    cleaned = key.strip()
    if not KEY_PATTERN.fullmatch(cleaned):
        return [
            f"Invalid IndexNow key '{key}': must match ^[A-Za-z0-9-]{{8,128}}$"
        ]
    return []


def verify_key_file(key_path: str | Path) -> list[str]:
    p = Path(key_path)
    if not p.is_file():
        return [f"IndexNow key file not found: {key_path}"]
    if p.suffix.lower() != ".txt":
        return [f"IndexNow key file '{p.name}' must use a .txt extension (<key>.txt)"]

    expected_key = p.stem
    issues = validate_key_format(expected_key)
    try:
        content = p.read_text(encoding="utf-8").strip()
    except (OSError, UnicodeDecodeError) as exc:
        return [f"Cannot read IndexNow key file '{p}': {exc}"]

    if content != expected_key:
        issues.append(
            f"IndexNow key file content ('{content[:40]}') does not match filename stem '{expected_key}'"
        )
    return issues


def _normalize_host(raw_host: str) -> str:
    host = raw_host.strip()
    if not host or "://" in host or "/" in host or any(ch.isspace() for ch in host):
        raise ValueError(
            f"Invalid --host '{raw_host}': pass a bare hostname such as 'example.com' without scheme or path"
        )
    return host


def _validate_url_for_host(raw_url: str, host: str, label: str) -> str:
    url = raw_url.strip()
    parsed = urllib.parse.urlparse(url)
    if parsed.scheme.lower() not in {"http", "https"} or not parsed.netloc:
        raise ValueError(f"Invalid {label} URL '{raw_url}': must include http:// or https:// and host")
    if parsed.netloc.lower() != host.lower():
        raise ValueError(
            f"{label} URL '{raw_url}' belongs to host '{parsed.netloc}', expected '{host}'"
        )
    return url


def build_payload(
    *,
    host: str,
    key: str,
    urls: list[str],
    key_location: str | None = None,
) -> dict[str, Any]:
    clean_host = _normalize_host(host)
    key_issues = validate_key_format(key)
    if key_issues:
        raise ValueError(key_issues[0])
    clean_key = key.strip()

    if not urls:
        raise ValueError("At least one URL is required in --urls")

    validated_urls = [_validate_url_for_host(u, clean_host, "target") for u in urls]
    payload: dict[str, Any] = {
        "host": clean_host,
        "key": clean_key,
        "urlList": validated_urls,
    }
    if key_location:
        payload["keyLocation"] = _validate_url_for_host(key_location, clean_host, "key-location")
    return payload


def submit_payload(payload: dict[str, Any], *, dry_run: bool = False, timeout: int = 15) -> tuple[int, str]:
    body = json.dumps(payload, indent=2)
    if dry_run:
        return 0, f"DRY-RUN endpoint: {INDEXNOW_ENDPOINT}\n{body}"

    data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(
        INDEXNOW_ENDPOINT,
        data=data,
        method="POST",
        headers={"Content-Type": "application/json; charset=utf-8"},
    )
    try:
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            status = getattr(resp, "status", resp.getcode())
            resp_text = resp.read().decode("utf-8", errors="replace").strip()
            if status in (200, 202):
                return 0, f"PASS: IndexNow accepted submission (HTTP {status}) -> {resp_text or 'OK'}"
            return 1, f"FAIL: Unexpected IndexNow HTTP status {status}: {resp_text}"
    except urllib.error.HTTPError as exc:
        err_body = exc.read().decode("utf-8", errors="replace").strip()
        return 1, f"FAIL: IndexNow HTTP {exc.code}: {err_body or exc.reason}"
    except urllib.error.URLError as exc:
        return 1, f"FAIL: IndexNow network error: {exc.reason}"


def run_self_test() -> int:
    with tempfile.TemporaryDirectory() as tmp:
        tmp_dir = Path(tmp)
        valid_key = "a1b2c3d4-e5f6-7890-abcd"
        good_file = tmp_dir / f"{valid_key}.txt"
        good_file.write_text(f"{valid_key}\n", encoding="utf-8")
        assert verify_key_file(good_file) == [], f"Expected valid key file to pass, got {verify_key_file(good_file)}"

        # Negative key file tests
        mismatch_file = tmp_dir / f"{valid_key}-other.txt"
        mismatch_file.write_text(valid_key, encoding="utf-8")
        mismatch_issues = verify_key_file(mismatch_file)
        assert any("does not match filename stem" in i for i in mismatch_issues), mismatch_issues

        short_file = tmp_dir / "short1.txt"
        short_file.write_text("short1", encoding="utf-8")
        short_issues = verify_key_file(short_file)
        assert any("Invalid IndexNow key" in i for i in short_issues), short_issues

        bad_char_file = tmp_dir / "bad_key_name.txt"
        bad_char_file.write_text("bad_key_name", encoding="utf-8")
        bad_char_issues = verify_key_file(bad_char_file)
        assert any("Invalid IndexNow key" in i for i in bad_char_issues), bad_char_issues

        missing_issues = verify_key_file(tmp_dir / "missing1234.txt")
        assert any("not found" in i for i in missing_issues), missing_issues

        # Host mismatch rejections
        try:
            build_payload(
                host="acme.example",
                key=valid_key,
                urls=["https://acme.example/", "https://other.example/pricing"],
            )
            raise AssertionError("Expected host mismatch error for target URL")
        except ValueError as exc:
            assert "other.example" in str(exc), exc

        try:
            build_payload(
                host="acme.example",
                key=valid_key,
                urls=["https://acme.example/"],
                key_location=f"https://cdn.other.example/{valid_key}.txt",
            )
            raise AssertionError("Expected host mismatch error for key_location")
        except ValueError as exc:
            assert "cdn.other.example" in str(exc), exc

        # Valid payload schema
        payload = build_payload(
            host="acme.example",
            key=valid_key,
            urls=["https://acme.example/", "https://acme.example/ar"],
            key_location=f"https://acme.example/{valid_key}.txt",
        )
        assert payload["host"] == "acme.example"
        assert payload["key"] == valid_key
        assert payload["keyLocation"] == f"https://acme.example/{valid_key}.txt"
        assert payload["urlList"] == ["https://acme.example/", "https://acme.example/ar"]

        # CLI --dry-run offline test
        buf = io.StringIO()
        with contextlib.redirect_stdout(buf):
            rc = main(
                [
                    "--submit",
                    "--host",
                    "acme.example",
                    "--key",
                    valid_key,
                    "--urls",
                    "https://acme.example/",
                    "https://acme.example/ar",
                    "--dry-run",
                ]
            )
        assert rc == 0, f"Expected --dry-run exit 0, got {rc}"
        out = buf.getvalue()
        assert INDEXNOW_ENDPOINT in out, out
        assert '"urlList"' in out and "https://acme.example/ar" in out, out

    print(
        "PASS: indexnow_ping.py --self-test passed "
        "(valid/invalid key files, host mismatch rejection, payload schema, and --dry-run exit 0)."
    )
    return 0


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(
        description="Verify IndexNow key files, build validated payloads, and submit URL pings."
    )
    parser.add_argument("--verify-key", metavar="PATH", help="Verify an IndexNow <key>.txt file.")
    parser.add_argument("--build-payload", action="store_true", help="Print validated IndexNow JSON payload.")
    parser.add_argument("--submit", action="store_true", help="Submit IndexNow JSON payload (use --dry-run offline).")
    parser.add_argument("--host", help="Canonical host name (e.g. example.com).")
    parser.add_argument("--key", help="IndexNow key matching ^[A-Za-z0-9-]{8,128}$.")
    parser.add_argument("--urls", nargs="+", help="One or more full http(s) URLs belonging to --host.")
    parser.add_argument("--key-location", help="Optional full URL to the hosted <key>.txt file.")
    parser.add_argument("--dry-run", action="store_true", help="Print endpoint and JSON without network requests.")
    parser.add_argument("--self-test", action="store_true", help="Run built-in offline self-tests.")
    args = parser.parse_args(argv)

    if args.self_test:
        return run_self_test()

    if args.verify_key:
        issues = verify_key_file(args.verify_key)
        if issues:
            for issue in issues:
                print(f"FAIL: {issue}")
            return 1
        print(f"PASS: indexnow_ping.py verified key file {args.verify_key}.")
        return 0

    if args.build_payload or args.submit:
        if not args.host or not args.key or not args.urls:
            print("FAIL: --host, --key, and --urls are required with --build-payload or --submit", file=sys.stderr)
            return 2
        try:
            payload = build_payload(
                host=args.host,
                key=args.key,
                urls=args.urls,
                key_location=args.key_location,
            )
        except ValueError as exc:
            print(f"FAIL: {exc}", file=sys.stderr)
            return 1

        if args.build_payload:
            print(json.dumps(payload, indent=2))
            return 0

        rc, message = submit_payload(payload, dry_run=args.dry_run)
        print(message)
        return rc

    parser.print_help()
    return 2


if __name__ == "__main__":
    raise SystemExit(main())
