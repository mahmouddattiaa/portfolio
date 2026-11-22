import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";
import { pathToFileURL } from "node:url";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../..");
const baseUrl = (process.env.STAGE4_BASE_URL || "http://localhost:3127").replace(/\/$/, "");
const buildOutputDir = path.resolve(process.env.TASK7_BUILD_OUTPUT_DIR || path.join(ROOT, ".next"));
const captureSources = [
  "src/app/contact/page.tsx",
  "src/app/studio/page.tsx",
  "src/app/studio/studio.module.css",
  "src/components/contact-form.module.css",
  "src/lib/contact.ts",
];
const buildId = (await fs.readFile(path.join(buildOutputDir, "BUILD_ID"), "utf8")).trim();
const sourceFingerprint = crypto.createHash("sha256");
for (const source of captureSources) {
  sourceFingerprint.update(source + "\n");
  sourceFingerprint.update(await fs.readFile(path.join(ROOT, source)));
}
const sourceFingerprintHex = sourceFingerprint.digest("hex");
assert.ok(buildId, "fresh production build ID is missing");
if (process.env.TASK7_EXPECTED_BUILD_ID) {
  assert.equal(buildId, process.env.TASK7_EXPECTED_BUILD_ID, "capture server build ID differs from the fresh build");
}
if (process.env.TASK7_EXPECTED_SOURCE_FINGERPRINT) {
  assert.equal(sourceFingerprintHex, process.env.TASK7_EXPECTED_SOURCE_FINGERPRINT,
    "capture source fingerprint differs from the reviewed source");
}
const managedRoutes = ["/studio", "/contact", "/privacy"];
const routes = process.env.TASK7_CAPTURE_ROUTES
  ? process.env.TASK7_CAPTURE_ROUTES.split(",").map((route) => route.trim()).filter(Boolean)
  : managedRoutes;
assert.ok(routes.length > 0 && routes.every((route) => managedRoutes.includes(route)),
  "TASK7_CAPTURE_ROUTES must select one or more managed Task 7 routes");
const viewports = [{ width: 320, height: 844 }, { width: 390, height: 844 }, { width: 1440, height: 900 }];
const themes = ["light", "dark"];
const routeFile = (route) => route.replace(/^\//, "").replaceAll("/", "--");
const screenshotPath = (route, viewport, theme) => path.join(
  ROOT,
  "design/reviews/latest/website",
  routeFile(route),
  viewport.width + "x" + viewport.height + "-" + theme + "-en.png",
);

async function loadPlaywright() {
  const require = createRequire(import.meta.url);
  const loaded = await import(pathToFileURL(require.resolve(process.env.PLAYWRIGHT_MODULE_PATH || "playwright")).href);
  return loaded.chromium ? loaded : loaded.default;
}

function pngDimensions(buffer) {
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  assert.ok(buffer.length >= 24 && buffer.subarray(0, 8).equals(signature), "capture is not a PNG");
  return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
}

async function warmPage(page) {
  await page.evaluate(async () => {
    await document.fonts.ready;
    const step = Math.max(400, Math.floor(window.innerHeight * 0.8));
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 70));
    }
    await Promise.all(Array.from(document.images).map((image) => image.decode().catch(() => undefined)));
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(150);
}

const { chromium } = await loadPlaywright();
const browser = await chromium.launch({
  headless: true,
  ...(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH } : {}),
});
const manifestPath = path.join(ROOT, "design/reviews/latest/manifest.json");
const manifest = JSON.parse(await fs.readFile(manifestPath, "utf8"));
manifest.sources ??= {};
manifest.sources.website ??= [];
manifest.comparisons ??= [];
const replacements = new Map();
const updatedPaths = new Set();
const run = new Date().toISOString();

try {
  const preflightContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    colorScheme: "light",
    reducedMotion: "reduce",
    deviceScaleFactor: 1,
  });
  await preflightContext.addInitScript(() => {
    try { localStorage.setItem("kepler-theme", "light"); } catch {}
  });
  const preflightPage = await preflightContext.newPage();
  const studioResponse = await preflightPage.goto(baseUrl + "/studio", { waitUntil: "domcontentloaded", timeout: 30000 });
  assert.equal(studioResponse?.status(), 200, "fresh production server did not serve Studio");
  await preflightPage.locator("#studio-cta-heading").waitFor({ state: "visible", timeout: 15000 });
  await warmPage(preflightPage);
  const ctaPreflight = await preflightPage.evaluate(() => {
    const section = document.querySelector('section[aria-labelledby="studio-cta-heading"]');
    const heading = document.querySelector("#studio-cta-heading");
    const content = section?.querySelector(".shell");
    const links = section?.querySelector(".atelier-primary-action")?.parentElement;
    const center = (node) => {
      const box = node?.getBoundingClientRect();
      return box ? box.left + box.width / 2 : null;
    };
    return {
      text: heading?.textContent?.replace(/\s+/g, " ").trim() ?? "",
      contentCenter: center(content),
      linksCenter: center(links),
    };
  });
  assert.equal(ctaPreflight.text, "Put Your System Requirements in Front of Senior Engineers",
    "fresh Studio build did not render the reviewed CTA text");
  assert.ok(Math.abs(ctaPreflight.contentCenter - 720) <= 2, "fresh Studio CTA content is not horizontally centered");
  assert.ok(Math.abs(ctaPreflight.linksCenter - 720) <= 2, "fresh Studio CTA links are not horizontally centered");

  const contactResponse = await preflightPage.goto(baseUrl + "/contact", { waitUntil: "domcontentloaded", timeout: 30000 });
  assert.equal(contactResponse?.status(), 200, "fresh production server did not serve Contact");
  const desktopFunnel = await preflightPage.evaluate(() => {
    const qualification = document.querySelector("#qualification-heading")?.closest("section")?.getBoundingClientRect();
    const intake = document.querySelector("#contact-form-heading")?.closest("section")?.getBoundingClientRect();
    return qualification && intake ? {
      qualificationTop: qualification.top,
      intakeTop: intake.top,
      qualificationWidth: qualification.width,
      intakeWidth: intake.width,
    } : null;
  });
  assert.ok(desktopFunnel && Math.abs(desktopFunnel.qualificationTop - desktopFunnel.intakeTop) <= 2,
    "fresh Contact build is missing aligned desktop columns");
  const desktopRatio = desktopFunnel.qualificationWidth / desktopFunnel.intakeWidth;
  assert.ok(desktopRatio >= 0.65 && desktopRatio <= 0.78, "fresh Contact build does not use a 5/7 column ratio");
  await preflightPage.setViewportSize({ width: 390, height: 844 });
  const mobileFunnel = await preflightPage.evaluate(() => {
    const qualification = document.querySelector("#qualification-heading")?.closest("section")?.getBoundingClientRect();
    const intake = document.querySelector("#contact-form-heading")?.closest("section")?.getBoundingClientRect();
    return qualification && intake ? { qualificationTop: qualification.top, intakeTop: intake.top } : null;
  });
  assert.ok(mobileFunnel && mobileFunnel.intakeTop < mobileFunnel.qualificationTop,
    "fresh Contact build does not place the form before qualification copy on mobile");
  await preflightContext.close();
  console.log(JSON.stringify({
    status: "preflight-pass",
    buildId,
    sourceFingerprint: sourceFingerprintHex,
    studioCta: ctaPreflight.text,
    studioCtaCentered: true,
    contactDesktopRatio: Number(desktopRatio.toFixed(3)),
    contactMobileFormFirst: true,
    baseUrl,
  }));

  for (const route of routes) {
    for (const theme of themes) {
      for (const viewport of viewports) {
        const context = await browser.newContext({
          viewport,
          colorScheme: theme,
          reducedMotion: "reduce",
          deviceScaleFactor: 1,
        });
        await context.addInitScript((preference) => {
          try { localStorage.setItem("kepler-theme", preference); } catch {}
        }, theme);
        const page = await context.newPage();
        const browserErrors = [];
        page.on("pageerror", (error) => browserErrors.push("pageerror: " + error.message));
        page.on("response", (item) => { if (item.status() >= 400) browserErrors.push("http " + item.status() + ": " + item.url()); });
        page.on("console", (message) => {
          if (message.type() === "error") browserErrors.push("console: " + message.text());
        });
        const response = await page.goto(baseUrl + route, { waitUntil: "domcontentloaded", timeout: 30000 });
        assert.equal(response?.status(), 200, route + " returned a non-200 status");
        await page.locator("h1").first().waitFor({ state: "visible", timeout: 15000 });
        await page.waitForFunction((expected) => document.documentElement.dataset.theme === expected, theme, { timeout: 10000 });
        await warmPage(page);

        if (route === "/studio" && viewport.width === 1440 && theme === "light") {
          const cta = await page.evaluate(() => {
            const section = document.querySelector('section[aria-labelledby="studio-cta-heading"]');
            const heading = document.querySelector("#studio-cta-heading");
            const content = section?.querySelector(".shell");
            const links = section?.querySelector(".atelier-primary-action")?.parentElement;
            const rect = (node) => {
              const box = node?.getBoundingClientRect();
              return box ? { left: box.left, width: box.width } : null;
            };
            return { text: heading?.textContent?.replace(/\s+/g, " ").trim() ?? "", content: rect(content), links: rect(links) };
          });
          assert.equal(cta.text, "Put Your System Requirements in Front of Senior Engineers",
            "Studio capture is stale: reviewed centered CTA text was not rendered");
          for (const [name, box] of [["content", cta.content], ["links", cta.links]]) {
            assert.ok(box, "Studio CTA " + name + " geometry is missing");
            assert.ok(Math.abs(box.left + box.width / 2 - viewport.width / 2) <= 2,
              "Studio CTA " + name + " geometry is not centered");
          }
        }

        if (route === "/contact") {
          const funnel = await page.evaluate(() => {
            const qualification = document.querySelector("#qualification-heading")?.closest("section")?.getBoundingClientRect();
            const intake = document.querySelector("#contact-form-heading")?.closest("section")?.getBoundingClientRect();
            return qualification && intake ? {
              qualificationTop: qualification.top,
              intakeTop: intake.top,
              qualificationWidth: qualification.width,
              intakeWidth: intake.width,
            } : null;
          });
          assert.ok(funnel, "Contact qualification/intake geometry is missing");
          if (viewport.width >= 768) {
            assert.ok(Math.abs(funnel.qualificationTop - funnel.intakeTop) <= 2,
              "Contact desktop columns are not aligned");
            const ratio = funnel.qualificationWidth / funnel.intakeWidth;
            assert.ok(ratio >= 0.65 && ratio <= 0.78, "Contact desktop columns are not 5/7: " + ratio);
          } else {
            assert.ok(funnel.intakeTop < funnel.qualificationTop,
              "Contact mobile does not place the form before qualification copy");
          }
        }

        const metrics = await page.evaluate(() => ({
          overflowPixels: Math.max(0, document.documentElement.scrollWidth - window.innerWidth),
          actualTheme: document.documentElement.dataset.theme || "",
          direction: document.documentElement.dir || "ltr",
        }));
        assert.equal(metrics.actualTheme, theme, route + " theme did not settle");
        assert.equal(metrics.overflowPixels, 0, route + " overflowed at " + viewport.width);
        const knownInsights404 = browserErrors.filter((error) => error.includes("/_vercel/insights/script.js"));
        const associatedConsole404 = browserErrors.filter((error) => error.startsWith("console:") && error.includes("404"));
        const unclassifiedErrors = browserErrors.filter((error) => !knownInsights404.includes(error) && !associatedConsole404.includes(error));
        assert.equal(knownInsights404.length, 1, route + " no longer matches the known optional Insights 404; reclassify the capture");
        assert.equal(associatedConsole404.length, 1, route + " emitted an unexpected console error alongside Insights");
        assert.deepEqual(unclassifiedErrors, [], route + " emitted unclassified browser errors: " + unclassifiedErrors.join("; "));

        const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
        assert.equal(canonical, "https://www.keplerdev.uk" + route, route + " canonical was not route-specific");

        const output = screenshotPath(route, viewport, theme);
        await fs.mkdir(path.dirname(output), { recursive: true });
        const temporary = output + "." + process.pid + ".tmp.png";
        await page.screenshot({ path: temporary, fullPage: true, animations: "disabled" });
        await fs.rename(temporary, output);
        const buffer = await fs.readFile(output);
        const pixelSize = pngDimensions(buffer);
        const record = {
          pageKey: routeFile(route),
          route,
          locale: "en",
          direction: metrics.direction,
          viewport,
          theme,
          buildId,
          sourceFingerprint: sourceFingerprintHex,
          path: path.relative(ROOT, output).split(path.sep).join("/"),
          sha256: crypto.createHash("sha256").update(buffer).digest("hex"),
          capturedAt: new Date().toISOString(),
          status: response.status(),
          actualTheme: metrics.actualTheme,
          overflowPixels: metrics.overflowPixels,
          browserErrors,
          pixelSize,
          scale: 1,
        };
        const key = [route, viewport.width, viewport.height, theme, "en"].join("|");
        replacements.set(key, record);
        updatedPaths.add(record.path);
        await context.close();
      }
    }
  }

  const ids = new Set(replacements.keys());
  const oldComparisonCount = manifest.comparisons.length;
  manifest.sources.website = manifest.sources.website.filter((record) => !ids.has([
    record.route,
    record.viewport?.width,
    record.viewport?.height,
    record.theme,
    record.locale,
  ].join("|")));
  manifest.sources.website.push(...replacements.values());
  manifest.comparisons = manifest.comparisons.filter((comparison) => !updatedPaths.has(comparison.websitePath));
  manifest.generatedAt = run;
  const temporaryManifest = manifestPath + "." + process.pid + ".tmp";
  await fs.writeFile(temporaryManifest, JSON.stringify(manifest, null, 2) + "\n");
  await fs.rename(temporaryManifest, manifestPath);

  console.log(JSON.stringify({
    status: "pass",
    routes,
    captures: replacements.size,
    websiteRecords: manifest.sources.website.length,
    preservedOpenPencilRecords: manifest.sources.openpencil?.length ?? 0,
    removedAffectedComparisons: oldComparisonCount - manifest.comparisons.length,
    knownBrowserError: "The optional /_vercel/insights/script.js request returns 404 in local production; every affected record retains this error and Task 8 must resolve it.",
    manifest: path.relative(ROOT, manifestPath),
  }));
} finally {
  await browser.close();
}
