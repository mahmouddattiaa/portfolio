#!/usr/bin/env python3
"""
Deterministic Visual Asset Scanner & Manifest Verifier for Kepler Dev Stage 2 (Role 1: Visual Asset Curator).
"""
import argparse
import re
import sys
from pathlib import Path
from urllib.parse import unquote

from PIL import Image

REPO_ROOT = Path("/home/kepler/Desktop/Kepler/Projects/portfolio")
PUBLIC_DIR = REPO_ROOT / "public"
PROJECTS_DIR = PUBLIC_DIR / "projects"

IMAGE_EXTS = {".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg"}
VIDEO_EXTS = {".mp4", ".webm", ".mov"}

ALL_13_PROJECTS = [
    "Glitre Loyalty Platform",
    "HS VPN",
    "QuickChargingPOS",
    "MedConnect Egypt",
    "StayEase",
    "Classroom Sentinel",
    "Aksira",
    "FitForge",
    "Qiraaty",
    "Focus Ritual",
    "GetLab System",
    "AI Collab Platform",
    "AgencyOS",
]


def classify_orientation(w: int, h: int) -> str:
    if h == 0 or w == 0:
        return "unknown"
    ratio = w / h
    if ratio < 0.85:
        return "portrait-mobile"
    elif ratio > 1.18:
        return "landscape-desktop"
    return "square-icon"


def size_status(kb: float, is_video: bool = False) -> str:
    if is_video:
        if kb > 25 * 1024:
            return "CRITICAL (>25MiB -> Must compress video)"
        return "VIDEO_ASSET (<25MiB)"
    if kb <= 100:
        return "OPTIMAL (<100KB)"
    elif kb <= 200:
        return "GOOD (<200KB)"
    elif kb <= 500:
        return "WARN (200-500KB -> Next/Image WebP)"
    return "CRITICAL (>500KB -> Must compress/WebP in Stage 4)"


def scan_assets() -> int:
    if not PROJECTS_DIR.exists():
        print(f"ERROR: Directory not found: {PROJECTS_DIR}")
        return 1

    print("# Deterministic Inventory of `/public/projects/`\n")
    total_images = 0
    total_videos = 0

    for folder in sorted(PROJECTS_DIR.iterdir()):
        if not folder.is_dir():
            continue
        files = sorted([f for f in folder.rglob("*") if f.is_file() and f.name != ".gitkeep"])
        print(f"## Folder: `/projects/{folder.name}/` ({len(files)} files)")
        if not files:
            print("- *(Empty folder — no visual assets on disk)*\n")
            continue

        print("| Web Path | Type | Dimensions | Orientation | Size (KB) | SEO Size Status |")
        print("| :--- | :--- | :--- | :--- | :--- | :--- |")
        for f in files:
            rel_web = "/" + str(f.relative_to(PUBLIC_DIR)).replace("\\", "/")
            ext = f.suffix.lower()
            kb = f.stat().st_size / 1024.0

            if ext in IMAGE_EXTS and ext != ".svg":
                total_images += 1
                try:
                    with Image.open(f) as img:
                        w, h = img.size
                    orient = classify_orientation(w, h)
                    dim_str = f"`{w}x{h}`"
                except Exception as exc:
                    orient = "error"
                    dim_str = f"ERR ({exc})"
                status = size_status(kb)
                print(f"| `{rel_web}` | IMAGE (`{ext}`) | {dim_str} | `{orient}` | `{kb:.1f} KB` | {status} |")
            elif ext in VIDEO_EXTS:
                total_videos += 1
                print(f"| `{rel_web}` | VIDEO (`{ext}`) | `video` | `video-preview` | `{kb:.1f} KB` | {size_status(kb, True)} |")
            else:
                print(f"| `{rel_web}` | DOC (`{ext}`) | `n/a` | `doc` | `{kb:.1f} KB` | Context doc |")
        print()

    print(f"**Summary:** Scanned `{total_images}` images and `{total_videos}` video files across `{PROJECTS_DIR}`.")
    return 0


def verify_manifest(manifest_path: str) -> int:
    path = Path(manifest_path)
    if not path.is_absolute():
        path = REPO_ROOT / path
    if not path.exists():
        print(f"ERROR: Manifest file not found: {manifest_path}")
        return 1

    content = path.read_text(encoding="utf-8")
    issues: list[str] = []

    for proj in ALL_13_PROJECTS:
        if proj not in content:
            issues.append(f"Missing project in manifest: `{proj}`")

    raw_paths = re.findall(r"`(/projects/[^`\n]+)`", content)
    file_paths = [p for p in raw_paths if not p.endswith("/") and "..." not in p]

    if len(file_paths) < 30:
        issues.append(f"Too few `/projects/...` asset paths in manifest (found {len(file_paths)}, expected >= 30).")

    for web_path in file_paths:
        decoded = unquote(web_path.lstrip("/"))
        disk_path = PUBLIC_DIR / decoded
        if not disk_path.exists() or not disk_path.is_file():
            issues.append(f"Broken/non-existent asset path on disk: `{web_path}` -> checked `{disk_path}`")

    alt_matches = re.findall(r"\*\*Alt Text:\*\*\s*`([^`]+)`", content)
    table_alts = re.findall(r'alt="([^"]+)"', content)
    all_alts = alt_matches + table_alts

    if len(all_alts) < 25:
        issues.append(
            f"Found only {len(all_alts)} explicit `**Alt Text:** \\`...\\`` or `alt=\"...\"` entries (expected >= 25 across all selected images)."
        )

    for alt in all_alts:
        length = len(alt.strip())
        if length < 10 or length > 125:
            issues.append(f"Alt text length {length} chars outside 10-125 range: `{alt}`")

    if "| `FAIL`" in content or "| FAIL |" in content:
        issues.append("Self-audit checklist contains a FAIL row.")

    if issues:
        print(f"FAIL: Found {len(issues)} issue(s) in {manifest_path}:")
        for issue in issues:
            print("  -", issue)
        return 1

    print(
        f"PASS: Verified {len(file_paths)} on-disk asset paths, {len(all_alts)} SEO alt texts (10-125 chars), and all 13 studio projects in {manifest_path}!"
    )
    return 0


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--scan", action="store_true", help="Scan public/projects and output markdown table")
    parser.add_argument("--verify", type=str, help="Verify a generated visual-asset-manifest.md file")
    args = parser.parse_args()

    if args.verify:
        sys.exit(verify_manifest(args.verify))
    else:
        sys.exit(scan_assets())
