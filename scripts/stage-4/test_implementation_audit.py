"""Focused regression probes for the Stage 4 evidence auditor (stdlib only)."""
from __future__ import annotations

import importlib.util
import hashlib
import struct
import tempfile
import unittest
from datetime import datetime, timedelta, timezone
from functools import lru_cache
from pathlib import Path
import zlib
import sys

REPO = Path(__file__).resolve().parents[2]
sys.dont_write_bytecode = True
AUDIT_PATH = REPO / "roles/agency-frontend-engineer/scripts/implementation_audit.py"
spec = importlib.util.spec_from_file_location("implementation_audit", AUDIT_PATH)
audit = importlib.util.module_from_spec(spec)
assert spec and spec.loader
spec.loader.exec_module(audit)


@lru_cache(maxsize=None)
def png_bytes(width: int = 1, height: int = 1) -> bytes:
    """Build a tiny valid RGBA PNG with real IHDR, compressed scanlines, and CRCs."""
    def chunk(name: bytes, payload: bytes) -> bytes:
        return struct.pack(">I", len(payload)) + name + payload + struct.pack(">I", zlib.crc32(name + payload) & 0xFFFFFFFF)

    ihdr = struct.pack(">IIBBBBB", width, height, 8, 6, 0, 0, 0)
    rows = b"".join(b"\0" + b"\0" * width * 4 for _ in range(height))
    return b"\x89PNG\r\n\x1a\n" + chunk(b"IHDR", ihdr) + chunk(b"IDAT", zlib.compress(rows)) + chunk(b"IEND", b"")


def canonical_catalog() -> str:
    def objects(slugs: set[str]) -> str:
        return ",\n".join(
            "{ slug: %r, categories: [%s] }" % (
                slug,
                ", ".join(repr(item) for item in sorted(audit.CATEGORY_MEMBERSHIP[slug])),
            )
            for slug in sorted(slugs)
        )

    return (
        "export const caseStudies = [\n" + objects(audit.CANONICAL_FLAGSHIPS) + "\n];\n"
        "export const showcaseBuilds = [\n" + objects(audit.CANONICAL_SHOWCASES) + "\n];\n"
        "export const offers = [\n" + ",\n".join(
            "{ value: %r, name: %r }" % (key, value) for key, value in audit.OFFERS.items()
        ) + "\n];"
    )


def good_manifest(root: Path, generated: datetime) -> dict:
    rows, design_rows = [], []
    for route in audit.ROUTES:
        for theme in audit.THEMES:
            for width, height in audit.VIEWPORTS:
                path = audit.expected_capture(route, theme, width, height)
                artifact = root / path
                artifact.parent.mkdir(parents=True, exist_ok=True)
                artifact.write_bytes(png_bytes(width, height))
                import os
                os.utime(artifact, (generated.timestamp(), generated.timestamp()))
                rows.append({
                    "route": route, "theme": theme, "actualTheme": theme,
                    "locale": "ar" if route == "/ar" else "en",
                    "direction": "rtl" if route == "/ar" else "ltr",
                    "viewport": {"width": width, "height": height}, "status": 200,
                    "overflowPixels": 0, "browserErrors": [], "path": path,
                    "capturedAt": generated.isoformat().replace("+00:00", "Z"),
                    "sha256": hashlib.sha256(artifact.read_bytes()).hexdigest(),
                    "imagePixels": {"width": width, "height": height},
                })
    comparisons = []
    reviewed = []
    for row in rows[:12]:
        desktop = row["viewport"]["width"] >= 1000
        name = f"design/reviews/latest/openpencil/{audit.page_key(row['route'])}/{row['viewport']['width']}x{row['viewport']['height']}-{row['theme']}-{row['locale']}.png"
        design_path = root / name
        design_path.parent.mkdir(parents=True, exist_ok=True)
        design_path.write_bytes(png_bytes())
        import os
        os.utime(design_path, (generated.timestamp(), generated.timestamp()))
        design = {
            "path": name, "route": row["route"], "theme": row["theme"],
            "viewport": row["viewport"], "locale": row["locale"], "direction": row["direction"],
            "sha256": hashlib.sha256(design_path.read_bytes()).hexdigest(),
            "imagePixels": {"width": 1, "height": 1},
            "exportedAt": generated.isoformat().replace("+00:00", "Z"),
            "documentFingerprint": "fingerprint", "pageId": "page-id", "nodeId": f"node-{len(reviewed)}",
            "frameName": "Evolved Desktop" if desktop else "Evolved Mobile",
            "frameId": f"frame-{len(reviewed)}", "frameX": 3060 if desktop else 4660,
        }
        design_rows.append(design)
        reviewed.append({
            "websitePath": row["path"], "openpencilPath": name,
            "route": row["route"], "theme": row["theme"], "viewport": row["viewport"],
            "locale": row["locale"], "direction": row["direction"],
            "findings": ["Compared against fresh Evolved frame export."], "verdict": "pass",
            "reviewer": "independent reviewer", "reviewedAt": (generated + timedelta(minutes=1)).isoformat().replace("+00:00", "Z"),
        })
    return {
        "schemaVersion": 1, "sources": {"website": rows, "openpencil": design_rows},
        "comparisons": reviewed,
    }


class AuditRegressionTests(unittest.TestCase):
    def test_homepage_ar_and_shell_do_not_require_undesigned_ar_data_modules(self):
        with tempfile.TemporaryDirectory() as temp:
            root = Path(temp)
            home = root / "src/content/home"
            home.mkdir(parents=True)
            (home / "en.ts").write_text("export const homeEn = { hero: { title: 'Services' } };", encoding="utf-8")
            (home / "ar.ts").write_text("export const homeAr = { hero: { title: 'خدمات' } };", encoding="utf-8")
            (home / "index.ts").write_text("type HomeLocale = 'en' | 'ar'; const copy = { ar: homeAr };", encoding="utf-8")
            shell = root / "src/components"
            shell.mkdir(parents=True)
            (shell / "site-shell.tsx").write_text(
                "const shellCopy = { en: { home: 'Home' }, ar: { home: 'الرئيسية' } }; shellCopy[locale];",
                encoding="utf-8",
            )
            errors = audit.localized_shell_findings(root)
            self.assertEqual([], errors)
            self.assertFalse((root / "src/content/services/ar.ts").exists())
            self.assertFalse((root / "src/content/work/ar.ts").exists())

    def test_designated_catalog_checks_exact_membership_and_ignores_incidental_mentions(self):
        valid = canonical_catalog()
        self.assertEqual([], audit.catalog_findings(valid))
        incidental = "// " + valid.replace("\n", " ")
        self.assertTrue(any("must be a literal array" in e for e in audit.catalog_findings(incidental)))
        quoted = "const note = %r;" % valid
        self.assertTrue(any("must be a literal array" in e for e in audit.catalog_findings(quoted)))
        wrong = valid.replace("'hs-vpn', categories: ['mobile']", "'hs-vpn', categories: ['web']")
        self.assertTrue(any("category membership differs" in e for e in audit.catalog_findings(wrong)))

    def test_jsonld_checks_serialized_designated_graph_not_mentions(self):
        types = sorted(audit.REQUIRED_JSON_LD)
        entries = ", ".join("{ '@type': %r }" % item for item in types)
        valid = "const structuredData = { '@graph': [" + entries + "] }; <script type=\"application/ld+json\">{JSON.stringify(structuredData)}</script>"
        self.assertEqual([], audit.schema_findings(valid))
        incidental = "// const structuredData = { '@graph': [" + entries + "] }; JSON.stringify(structuredData)"
        self.assertTrue(audit.schema_findings(incidental))
        quoted = "const note = %r;" % valid
        self.assertTrue(audit.schema_findings(quoted))
        unrendered = valid.replace("JSON.stringify(structuredData)", "JSON.stringify(otherData)")
        self.assertTrue(any("must be serialized" in e for e in audit.schema_findings(unrendered)))
        misplaced = "const structuredData = { '@graph': [{ '@type': 'Organization' }], note: [" + entries + "] }; <script type=\"application/ld+json\">{JSON.stringify(structuredData)}</script>"
        self.assertTrue(any("@graph` types differ" in e for e in audit.schema_findings(misplaced)))

    def test_faq_schema_is_scoped_to_the_shared_home_renderer_and_uses_visible_copy(self):
        valid = '''const homepageFaqSchema = {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: copy.faq.items.map(([question, answer]) => ({
            "@type": "Question", name: question,
            acceptedAnswer: { "@type": "Answer", text: answer },
          })),
        };
        const faqJson = JSON.stringify(homepageFaqSchema);
        return <script type="application/ld+json">{faqJson}</script>;'''
        self.assertEqual([], audit.homepage_faq_findings(valid))
        wrong_locale = valid.replace("copy.faq.items.map", "homeEn.faq.items.map")
        self.assertTrue(any("same localized `copy.faq.items`" in error for error in audit.homepage_faq_findings(wrong_locale)))
        unrendered = valid.replace("JSON.stringify(homepageFaqSchema)", "JSON.stringify(otherSchema)")
        self.assertTrue(any("must be serialized" in error for error in audit.homepage_faq_findings(unrendered)))
        absent = valid.replace("\"@type\": \"FAQPage\"", "\"@type\": \"WebPage\"")
        self.assertTrue(any("FAQPage" in error for error in audit.homepage_faq_findings(absent)))

    def test_named_media_limit_and_legacy_asset_removal(self):
        with tempfile.TemporaryDirectory() as temp:
            root = Path(temp)
            source = root / "src/app/page.tsx"
            source.parent.mkdir(parents=True)
            source.write_text(
                "const a='/projects/focus-ritual/focus-ritual-hero.webp'; const b='/projects/glitre-loyalty-platform/manager/sign-in.webp';",
                encoding="utf-8",
            )
            for asset in audit.NAMED_IMAGES:
                path = root / "public/projects" / asset
                path.parent.mkdir(parents=True, exist_ok=True)
                path.write_bytes(b"x" * 210_000)
            old = root / "public/projects" / audit.LEGACY_FOCUS_IMAGE
            old.parent.mkdir(parents=True, exist_ok=True)
            old.write_bytes(b"old")
            errors = audit.media_findings(root, [source])
            self.assertEqual(2, sum("<200000 bytes" in e for e in errors))
            self.assertTrue(any("Legacy oversized Focus Ritual PNG must be removed" in e for e in errors))
            for asset in audit.NAMED_IMAGES:
                (root / "public/projects" / asset).write_bytes(b"x" * 199_999)
            old.unlink()
            self.assertEqual([], audit.media_findings(root, [source]))

    def test_rendered_copy_detects_broad_first_person_and_keeps_source_lines(self):
        with tempfile.TemporaryDirectory() as temp:
            root = Path(temp)
            source = root / "src/components/copy.tsx"
            source.parent.mkdir(parents=True)
            source.write_text(
                "const unused = 'I created Kepler Dev';\n"
                "const diagnostic = 'my process failed';\n"
                "console.error(diagnostic);\n"
                "const rendered = 'I created Kepler Dev';\n"
                "const renderedAttribution = 'This is my process';\n"
                "const renderedContraction = 'I’m building products';\n"
                "return <><p>{rendered}</p><p>{renderedAttribution}</p><p>{renderedContraction}</p></>;\n"
                "<p>Will I own the product?</p>;\n",
                encoding="utf-8",
            )
            findings = audit.copy_findings([source], root)
            personal = [item for item in findings if "first-person singular attribution" in item]
            self.assertEqual(3, len(personal))
            for line in (4, 5, 6):
                self.assertTrue(any(item.startswith(f"src/components/copy.tsx:{line}:") for item in personal), personal)
            self.assertFalse(any(":1:" in item or ":2:" in item or ":8:" in item for item in findings))

    def test_evidence_rejects_reused_capture_and_unrelated_visual_artifact(self):
        with tempfile.TemporaryDirectory() as temp:
            root = Path(temp)
            generated = datetime.now(timezone.utc) - timedelta(minutes=2)
            manifest = good_manifest(root, generated)
            self.assertEqual([], audit.visual_capture_findings(manifest, root, now=datetime.now(timezone.utc)))
            manifest["sources"]["website"][1]["path"] = manifest["sources"]["website"][0]["path"]
            manifest["comparisons"][0]["websitePath"] = "unrelated.png"
            errors = audit.visual_capture_findings(manifest, root, now=datetime.now(timezone.utc))
            self.assertTrue(any("distinct screenshot path" in e for e in errors))
            self.assertTrue(any("must reference members" in e for e in errors))
            manifest = good_manifest(root, generated)
            manifest["comparisons"][1]["websitePath"] = manifest["comparisons"][0]["websitePath"]
            errors = audit.visual_capture_findings(manifest, root, now=datetime.now(timezone.utc))
            self.assertTrue(any("visual comparison browser captures must be distinct" in e.lower() for e in errors))
            manifest = good_manifest(root, generated)
            capture = root / manifest["sources"]["website"][0]["path"]
            import os
            os.utime(capture, ((generated - timedelta(minutes=1)).timestamp(),) * 2)
            errors = audit.visual_capture_findings(manifest, root, now=datetime.now(timezone.utc))
            self.assertTrue(any("modification time does not match capturedAt" in e for e in errors))

    def test_evidence_rejects_non_png_and_recorded_dimension_mismatch(self):
        with tempfile.TemporaryDirectory() as temp:
            root = Path(temp)
            generated = datetime.now(timezone.utc) - timedelta(minutes=2)
            manifest = good_manifest(root, generated)
            website = manifest["sources"]["website"][0]
            path = root / website["path"]
            website["imagePixels"] = {"width": 2, "height": 1}
            errors = audit.visual_capture_findings(manifest, root, now=datetime.now(timezone.utc))
            self.assertTrue(any("PNG IHDR dimensions" in e for e in errors))
            manifest = good_manifest(root, generated)
            website = manifest["sources"]["website"][0]
            path = root / website["path"]
            path.write_bytes(b"plain text masquerading as a PNG")
            errors = audit.visual_capture_findings(manifest, root, now=datetime.now(timezone.utc))
            self.assertTrue(any("not a complete valid PNG stream" in e for e in errors))
            manifest = good_manifest(root, generated)
            website = manifest["sources"]["website"][0]
            path = root / website["path"]
            path.write_bytes(png_bytes()[:24])
            errors = audit.visual_capture_findings(manifest, root, now=datetime.now(timezone.utc))
            self.assertTrue(any("not a complete valid PNG stream" in e for e in errors))
            manifest = good_manifest(root, generated)
            website = manifest["sources"]["website"][0]
            path = root / website["path"]
            corrupt = bytearray(path.read_bytes())
            corrupt[29] ^= 1
            path.write_bytes(corrupt)
            errors = audit.visual_capture_findings(manifest, root, now=datetime.now(timezone.utc))
            self.assertTrue(any("not a complete valid PNG stream" in e for e in errors))
            manifest = good_manifest(root, generated)
            website = manifest["sources"]["website"][0]
            path = root / website["path"]
            path.write_bytes(png_bytes())
            website["imagePixels"] = {"width": 1, "height": 1}
            errors = audit.visual_capture_findings(manifest, root, now=datetime.now(timezone.utc))
            self.assertTrue(any("Website PNG width 1 does not match requested viewport width" in e for e in errors))
            self.assertTrue(any("Website PNG height 1 is shorter than requested viewport height" in e for e in errors))
            manifest = good_manifest(root, generated)
            website = manifest["sources"]["website"][0]
            path = root / website["path"]
            path.write_bytes(png_bytes(website["viewport"]["width"] + 1, website["viewport"]["height"]))
            website["imagePixels"] = {"width": website["viewport"]["width"] + 1, "height": website["viewport"]["height"]}
            errors = audit.visual_capture_findings(manifest, root, now=datetime.now(timezone.utc))
            self.assertTrue(any("does not match requested viewport width" in e for e in errors))
            manifest = good_manifest(root, generated)
            design = manifest["sources"]["openpencil"][0]
            (root / design["path"]).write_bytes(b"text file masquerading as a design PNG")
            errors = audit.visual_capture_findings(manifest, root, now=datetime.now(timezone.utc))
            self.assertTrue(any("OpenPencil artifact is not a complete valid PNG stream" in e for e in errors))
            manifest = good_manifest(root, generated)
            design = manifest["sources"]["openpencil"][0]
            design["imagePixels"] = {"width": 1, "height": 2}
            errors = audit.visual_capture_findings(manifest, root, now=datetime.now(timezone.utc))
            self.assertTrue(any("OpenPencil PNG IHDR dimensions" in e for e in errors))

    def test_verify_rejects_noncanonical_manifest_path(self):
        with tempfile.TemporaryDirectory() as temp:
            root = Path(temp)
            report = root / "results.md"
            report.write_text("**Browser evidence manifest:** `side-manifest.json`\n", encoding="utf-8")
            errors = audit.evidence_audit(report, root)
            self.assertTrue(any("must be the canonical path" in e for e in errors))


if __name__ == "__main__":
    unittest.main(verbosity=2)
