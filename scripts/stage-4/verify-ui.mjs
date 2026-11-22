#!/usr/bin/env node
/** Production browser matrix for the Stage 4 routes; writes a JSON evidence manifest. */
import fs from "node:fs/promises";
import crypto from "node:crypto";
import { createRequire } from "node:module";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { retainCurrentComparisons } from "./comparison-freshness.mjs";

const ROOT = path.resolve(import.meta.dirname, "../..");
const FLAGSHIPS = [
  "glitre-loyalty-platform", "hs-vpn", "quickcharging-pos", "medconnect-egypt",
  "stayease", "classroom-sentinel",
];
const ROUTES = [
  "/", "/ar", "/work", "/services", "/studio", "/contact", "/privacy",
  ...FLAGSHIPS.map((slug) => `/work/${slug}`),
  "/work/glitre-loyalty-platform/customer-app",
  "/work/glitre-loyalty-platform/manager",
  "/work/glitre-loyalty-platform/worker-app",
];
const VIEWPORTS = [
  { width: 320, height: 844, name: "320x844" },
  { width: 390, height: 844, name: "390x844" },
  { width: 1440, height: 900, name: "1440x900" },
];
const THEMES = ["light", "dark"];
const startedAt = new Date();
const option = (name, fallback) => {
  const index = process.argv.indexOf(name);
  return index >= 0 && process.argv[index + 1] ? process.argv[index + 1] : fallback;
};
const baseUrl = option("--base-url", process.env.STAGE4_BASE_URL || "http://127.0.0.1:3000").replace(/\/$/, "");
const runId = startedAt.toISOString();
const buildFingerprint = process.env.STAGE4_BUILD_FINGERPRINT || "unrecorded";
const sourceFingerprint = process.env.STAGE4_SOURCE_FINGERPRINT || "unrecorded";
const outputArg = option("--output", "design/reviews/latest/manifest.json");
const outputPath = path.resolve(ROOT, outputArg);

async function loadPlaywright() {
  const require = createRequire(import.meta.url);
  const configured = process.env.PLAYWRIGHT_MODULE_PATH;
  if (configured) {
    const loaded = await import(pathToFileURL(require.resolve(configured)).href);
    if (loaded.chromium) return loaded;
    if (loaded.default?.chromium) return loaded.default;
    if (loaded["module.exports"]?.chromium) return loaded["module.exports"];
  }
  const candidates = ["playwright", "playwright-core"];
  for (const packageName of candidates) {
    try {
      const resolved = require.resolve(packageName);
      const loaded = await import(pathToFileURL(resolved).href);
      if (loaded.chromium) return loaded;
      if (loaded.default?.chromium) return loaded.default;
      if (loaded["module.exports"]?.chromium) return loaded["module.exports"];
    } catch {}
  }
  throw new Error("Playwright is unavailable. Install it outside package.json/package-lock.json and set PLAYWRIGHT_MODULE_PATH to its package entry, or expose it through NODE_PATH.");
}

function routeFile(route) {
  if (route === "/") return "home-en";
  if (route === "/ar") return "home-ar";
  return route.replace(/^\//, "").replaceAll("/", "--").replaceAll("[", "").replaceAll("]", "");
}

function capturePath(route, theme, viewport) {
  const locale = route === "/ar" ? "ar" : "en";
  const variant = `${viewport.width}x${viewport.height}-${theme}-${locale}`;
  return path.join(ROOT, "design/reviews/latest/website", routeFile(route), `${variant}.png`);
}

function pngDimensions(buffer) {
  const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  if (buffer.length < 24 || !buffer.subarray(0, 8).equals(signature)
    || buffer.readUInt32BE(8) !== 13 || buffer.toString("ascii", 12, 16) !== "IHDR") return null;
  const width = buffer.readUInt32BE(16);
  const height = buffer.readUInt32BE(20);
  return width > 0 && height > 0 ? { width, height } : null;
}

async function atomicJsonWrite(filePath, value) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  const temporary = `${filePath}.${process.pid}.tmp`;
  await fs.writeFile(temporary, `${JSON.stringify(value, null, 2)}\n`);
  await fs.rename(temporary, filePath);
}

async function warmPage(page) {
  return page.evaluate(async () => {
    await document.fonts.ready;
    const step = Math.max(400, Math.floor(window.innerHeight * 0.8));
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 70));
    }
    const images = Array.from(document.images);
    // Force every lazy image to request before the full-page screenshot, including very tall gallery items.
    for (const image of images) image.loading = "eager";
    await Promise.all(images.map((image) => image.complete ? Promise.resolve() : new Promise((resolve) => {
      image.addEventListener("load", resolve, { once: true });
      image.addEventListener("error", resolve, { once: true });
      setTimeout(resolve, 5000);
    })));
    const imageFailures = [];
    for (const image of images) {
      try {
        if (!image.complete) await new Promise((resolve) => {
          image.addEventListener("load", resolve, { once: true });
          image.addEventListener("error", resolve, { once: true });
          setTimeout(resolve, 5000);
        });
        if (image.complete && image.naturalWidth > 0 && typeof image.decode === "function") await image.decode();
        if (!image.complete || image.naturalWidth === 0) imageFailures.push(image.currentSrc || image.src || "unknown image");
      } catch { imageFailures.push(image.currentSrc || image.src || "undecodable image"); }
    }
    window.scrollTo(0, 0);
    return imageFailures;
  });
  await page.waitForTimeout(150);
}

async function main() {
  const { chromium } = await loadPlaywright();
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  const browser = await chromium.launch({
    headless: true,
    ...(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH
      ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH }
      : {}),
  });
  const matrix = [];
  try {
    for (const route of ROUTES) {
      for (const theme of THEMES) {
        for (const viewport of VIEWPORTS) {
          const browserErrors = [];
          const context = await browser.newContext({
            viewport: { width: viewport.width, height: viewport.height },
            colorScheme: theme,
            reducedMotion: "reduce",
          });
          await context.addInitScript((preference) => {
            try { localStorage.setItem("kepler-theme", preference); } catch {}
          }, theme);
          const page = await context.newPage();
          page.on("pageerror", (error) => browserErrors.push(`pageerror: ${error.message}`));
          page.on("response", (response) => {
            if (response.status() >= 400 && response.url().startsWith(baseUrl)) browserErrors.push(`HTTP ${response.status()}: ${response.url()}`);
          });
          page.on("console", (message) => {
            if (message.type() === "error") browserErrors.push(`console: ${message.text()}`);
          });
          let status = 0;
          let overflowPixels = -1;
          let actualTheme = "";
          let actualDirection = "";
          try {
            const response = await page.goto(`${baseUrl}${route}`, { waitUntil: "domcontentloaded", timeout: 30000 });
            status = response?.status() ?? 0;
            await page.locator("body").waitFor({ state: "visible", timeout: 15000 });
            await page.waitForFunction((expected) => document.documentElement.dataset.theme === expected, theme, { timeout: 10000 });
            const imageFailures = await warmPage(page);
            for (const image of imageFailures) browserErrors.push(`image failed to decode: ${image}`);
            const metrics = await page.evaluate(() => ({
              overflowPixels: Math.max(0, document.documentElement.scrollWidth - window.innerWidth),
              theme: document.documentElement.dataset.theme || "",
              direction: document.documentElement.dir || "",
            }));
            overflowPixels = metrics.overflowPixels;
            actualTheme = metrics.theme;
            actualDirection = metrics.direction;
            if (route === "/ar" && actualDirection !== "rtl") browserErrors.push(`RTL route reported dir=${actualDirection || "unset"}`);
          } catch (error) {
            browserErrors.push(`navigation/assertion: ${error.message}`);
          }
          const screenshot = capturePath(route, theme, viewport);
          await fs.mkdir(path.dirname(screenshot), { recursive: true });
          const temporaryScreenshot = `${screenshot}.${process.pid}.tmp.png`;
          const capturedAt = new Date();
          try {
            await page.screenshot({ path: temporaryScreenshot, fullPage: true, animations: "disabled" });
            await fs.rename(temporaryScreenshot, screenshot);
          } catch (error) {
            browserErrors.push(`screenshot: ${error.message}`);
            await fs.rm(temporaryScreenshot, { force: true });
          }
          let sha256 = "";
          let imagePixels = null;
          try {
            const png = await fs.readFile(screenshot);
            sha256 = crypto.createHash("sha256").update(png).digest("hex");
            imagePixels = pngDimensions(png);
            if (!imagePixels) browserErrors.push("screenshot: invalid PNG signature/IHDR");
          } catch {}
          matrix.push({
            route,
            theme,
            locale: route === "/ar" ? "ar" : "en",
            direction: route === "/ar" ? "rtl" : "ltr",
            actualTheme,
            viewport: { width: viewport.width, height: viewport.height },
            status,
            overflowPixels,
            browserErrors,
            path: path.relative(ROOT, screenshot),
            sha256,
            buildFingerprint,
            sourceFingerprint,
            imagePixels,
            capturedAt: capturedAt.toISOString(),
          });
          await context.close();
        }
      }
    }
  } finally {
    await browser.close();
  }
  let manifest = { schemaVersion: 1, sources: { openpencil: [], website: [] }, comparisons: [] };
  try { manifest = JSON.parse(await fs.readFile(outputPath, "utf8")); } catch (error) {
    if (error.code !== "ENOENT") throw new Error(`Cannot read shared evidence manifest: ${error.message}`);
  }
  if (!manifest.sources || typeof manifest.sources !== "object") manifest.sources = {};
  const openpencil = Array.isArray(manifest.sources.openpencil) ? manifest.sources.openpencil : [];
  const previousWebsite = Array.isArray(manifest.sources.website) ? manifest.sources.website : [];
  const previousComparisons = Array.isArray(manifest.comparisons) ? manifest.comparisons : [];
  manifest.schemaVersion = 1;
  manifest.sources = { ...manifest.sources, openpencil, website: matrix };
  manifest.runs = { ...(manifest.runs || {}), website: { runId, baseUrl, routeCount: ROUTES.length, themeCount: THEMES.length, viewportCount: VIEWPORTS.length, buildFingerprint, sourceFingerprint } };
  manifest.comparisons = retainCurrentComparisons({
    previousWebsite,
    refreshedWebsite: matrix,
    comparisons: previousComparisons,
  });
  await atomicJsonWrite(outputPath, manifest);
  const failed = matrix.filter((row) => row.status !== 200 || row.overflowPixels !== 0 || row.browserErrors.length);
  console.log(JSON.stringify({
    manifest: path.relative(ROOT, outputPath),
    captures: matrix.length,
    failedRows: failed.length,
    overflowRows: matrix.filter((row) => row.overflowPixels > 0).length,
    browserErrorRows: matrix.filter((row) => row.browserErrors.length).length,
    preservedOpenPencilRecords: openpencil.length,
    visualComparisons: manifest.comparisons.length,
  }));
  return failed.length ? 1 : 0;
}

main().then((code) => { process.exitCode = code; }).catch((error) => {
  console.error(error.message);
  process.exitCode = 2;
});
