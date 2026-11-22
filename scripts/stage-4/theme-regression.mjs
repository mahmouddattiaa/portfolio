#!/usr/bin/env node
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";

const require = createRequire(import.meta.url);
const configured = process.env.PLAYWRIGHT_MODULE_PATH;
const resolved = configured
  ? require.resolve(configured)
  : require.resolve("/home/kepler/.npm/_npx/e41f203b7505f1fb/node_modules/playwright");
const playwrightModule = await import(pathToFileURL(resolved).href);
const { chromium } = playwrightModule.default ?? playwrightModule;
const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH
    || "/home/kepler/.cache/ms-playwright/chromium-1243/chrome-linux64/chrome",
});
const baseUrl = process.env.STAGE4_BASE_URL || "http://127.0.0.1:3018";
const context = await browser.newContext({ colorScheme: "dark", reducedMotion: "reduce", viewport: { width: 1440, height: 900 } });
const page = await context.newPage();
const failures = [];

async function check(name, callback) {
  try {
    await callback();
    console.log(`PASS ${name}`);
  } catch (error) {
    failures.push(name);
    console.log(`FAIL ${name}: ${error.message}`);
  }
}

try {
  await page.goto(baseUrl, { waitUntil: "domcontentloaded" });

  await check("first paint stays light when operating system prefers dark", async () => {
    assert.equal(await page.locator("html").getAttribute("data-theme"), "light");
  });
  await page.waitForLoadState("networkidle");

  await check("desktop theme button is visible, labeled and at least 44px", async () => {
    const button = page.locator("button[data-theme-toggle]");
    assert.equal(await button.count(), 1);
    assert.equal(await button.isVisible(), true);
    assert.ok((await button.getAttribute("aria-label"))?.length >= 8);
    const box = await button.boundingBox();
    assert.ok(box && box.width >= 44 && box.height >= 44);
    assert.equal(await button.evaluate((node) => getComputedStyle(node).borderRadius), "999px");
  });

  await check("manual choice persists across route navigation and reload", async () => {
    const button = page.locator("button[data-theme-toggle]");
    await button.focus();
    assert.equal(await button.evaluate((node) => getComputedStyle(node).outlineStyle), "solid");
    await page.keyboard.press("Enter");
    assert.equal(await page.locator("html").getAttribute("data-theme"), "dark");
    assert.equal(await page.evaluate(() => localStorage.getItem("kepler-theme")), "dark");
    await page.goto(`${baseUrl}/work`, { waitUntil: "networkidle" });
    assert.equal(await page.locator("html").getAttribute("data-theme"), "dark");
    await page.reload({ waitUntil: "networkidle" });
    assert.equal(await page.locator("html").getAttribute("data-theme"), "dark");
    await page.locator("button[data-theme-toggle]").click();
    assert.equal(await page.evaluate(() => localStorage.getItem("kepler-theme")), "light");
  });

  await check("Arabic mobile shell keeps the localized theme control accessible at 390px and 320px", async () => {
    for (const width of [390, 320]) {
      await page.setViewportSize({ width, height: 844 });
      await page.goto(`${baseUrl}/ar`, { waitUntil: "networkidle" });
      const button = page.locator("button[data-theme-toggle]");
      assert.equal(await button.count(), 1);
      assert.equal(await button.isVisible(), true);
      assert.match(await button.getAttribute("aria-label"), /الوضع/);
      const box = await button.boundingBox();
      assert.ok(box && box.width >= 44 && box.height >= 44);
      assert.ok(Number.parseFloat(await button.evaluate((node) => getComputedStyle(node).fontSize)) >= 14);
    }
  });

  await check("homepage footer uses its four-column desktop layout", async () => {
    const measurements = [];
    for (const viewport of [{ width: 320, height: 844 }, { width: 390, height: 844 }, { width: 1440, height: 900 }, { width: 1800, height: 1000 }]) {
      for (const route of ["/", "/services", "/ar"]) {
        await page.setViewportSize(viewport);
        await page.goto(`${baseUrl}${route}`, { waitUntil: "domcontentloaded" });
        measurements.push(await page.evaluate(() => {
          const grid = document.querySelector(".atelier-footer .footer-grid-v2");
          const legal = document.querySelector(".atelier-footer .footer-legal");
          const a = grid.getBoundingClientRect();
          const b = legal.getBoundingClientRect();
          return { route: location.pathname, width: innerWidth, columns: getComputedStyle(grid).gridTemplateColumns.split(" ").length, gridLeft: Math.round(a.left), gridWidth: Math.round(a.width), legalLeft: Math.round(b.left), legalWidth: Math.round(b.width), overflow: document.documentElement.scrollWidth - innerWidth };
        }));
      }
    }
    for (const viewportWidth of [320, 390, 1440, 1800]) {
      const rows = measurements.filter((row) => row.width === viewportWidth);
      const baseline = rows.find((row) => row.route === "/services");
      for (const row of rows) {
        assert.equal(row.overflow, 0, `${row.route} ${viewportWidth}px horizontal overflow`);
        assert.equal(row.gridLeft, row.legalLeft, `${row.route} ${viewportWidth}px grid/legal left edge`);
        assert.equal(row.gridWidth, row.legalWidth, `${row.route} ${viewportWidth}px grid/legal width`);
        assert.equal(row.gridLeft, baseline.gridLeft, `${row.route} ${viewportWidth}px footer differs from shared shell`);
        assert.equal(row.gridWidth, baseline.gridWidth, `${row.route} ${viewportWidth}px footer width differs from shared shell`);
        assert.equal(row.columns, viewportWidth < 768 ? 1 : viewportWidth < 1024 ? 2 : 4);
      }
    }
  });

  await check("Glitre home dashboard mock fits cleanly in English and Arabic cards", async () => {
    for (const route of ["/", "/ar"]) {
      for (const width of [390, 1427, 1440]) {
        await page.setViewportSize({ width, height: 900 });
        await page.goto(`${baseUrl}${route}`, { waitUntil: "domcontentloaded" });
        const result = await page.locator(".hv2-home-project").filter({ hasText: "Glitre" }).locator(".hv2-window").evaluate((node) => {
          const frame = node.closest(".hv2-home-illustrative-frame").getBoundingClientRect();
          const box = node.getBoundingClientRect();
          const main = node.querySelector(".hv2-window-main").getBoundingClientRect();
          return { sidebar: getComputedStyle(node.querySelector(".hv2-window-side")).display, frame: { left: frame.left, right: frame.right }, window: { left: box.left, right: box.right }, main: { left: main.left, right: main.right } };
        });
        assert.ok(result.window.left >= result.frame.left - 1 && result.window.right <= result.frame.right + 1, `${route} ${width}px mock exceeds its frame`);
        assert.ok(result.main.left >= result.window.left - 1 && result.main.right <= result.window.right + 1, `${route} ${width}px dashboard content exceeds its frame`);
        if (width <= 1440) assert.equal(result.sidebar, "none", `${route} ${width}px dashboard sidebar should collapse cleanly`);
      }
    }
  });

  await check("English and Arabic hero hierarchy stays compact without clipping at target widths", async () => {
    for (const route of ["/", "/ar"]) {
      for (const viewport of [{ width: 320, height: 844 }, { width: 390, height: 844 }, { width: 1114, height: 900 }, { width: 1427, height: 900 }, { width: 1440, height: 900 }, { width: 1800, height: 1000 }]) {
        await page.setViewportSize(viewport);
        await page.goto(`${baseUrl}${route}`, { waitUntil: "domcontentloaded" });
        const metrics = await page.locator("#hv2-home-title").evaluate((node) => {
          const style = getComputedStyle(node);
          const box = node.getBoundingClientRect();
          const cta = node.parentElement.querySelector(".hv2-home-hero-actions .hv2-button").getBoundingClientRect();
          return { lines: Math.round(box.height / Number.parseFloat(style.lineHeight)), width: box.width, scrollWidth: node.scrollWidth, ctaBottom: cta.bottom, phraseFragments: node.querySelector(".hv2-home-no-break")?.getClientRects().length ?? 0 };
        });
        assert.ok(metrics.lines <= (viewport.width < 768 ? 7 : 4), `${route} ${viewport.width}px hero has ${metrics.lines} lines`);
        assert.ok(metrics.scrollWidth <= metrics.width + 1, `${route} ${viewport.width}px hero text clips horizontally`);
        assert.ok(metrics.ctaBottom <= viewport.height + 1, `${route} ${viewport.width}px primary action falls below the fold`);
        if (route === "/") assert.equal(metrics.phraseFragments, 1, `${viewport.width}px Multi-Surface breaks at the hyphen`);
      }
    }
  });

  await check("dark English and Arabic delivery panels use dark surfaces with readable statuses", async () => {
    const axePath = "/tmp/kepler-stage4-browser/node_modules/axe-core/axe.min.js";
    for (const route of ["/", "/ar"]) {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.evaluate(() => localStorage.setItem("kepler-theme", "dark"));
      await page.goto(`${baseUrl}${route}`, { waitUntil: "domcontentloaded" });
      await page.locator(".hv2-home-growth").scrollIntoViewIfNeeded();
      await page.waitForTimeout(600);
      const panels = await page.locator(".hv2-home-growth .hv2-home-step-screen > .hv2-output").evaluateAll((nodes) => nodes.map((node) => ({ background: getComputedStyle(node).backgroundColor, text: getComputedStyle(node).color, border: getComputedStyle(node).borderTopColor })));
      assert.equal(panels.length, 4, `${route} expected all four delivery panels`);
      assert.ok(panels.every((panel) => panel.background === "rgb(16, 41, 37)" && panel.text === "rgb(238, 231, 222)"), `${route} incorrect dark panel surface/text: ${JSON.stringify(panels)}`);
      await page.addScriptTag({ path: axePath });
      const violations = await page.locator(".hv2-home-growth").evaluate(async (node) => (await window.axe.run(node, { runOnly: { type: "rule", values: ["color-contrast"] } })).violations);
      assert.equal(violations.length, 0, `${route} dark panel contrast: ${JSON.stringify(violations.flatMap((item) => item.nodes.map((node) => node.target)))}`);
    }
  });

  await check("Glitre dashboard media decodes and stays within its frame on desktop and mobile", async () => {
    const route = `${baseUrl}/work/glitre-loyalty-platform/manager`;
    for (const viewport of [{ width: 1440, height: 900 }, { width: 390, height: 844 }]) {
      const managerContext = await browser.newContext({ viewport, colorScheme: "dark" });
      const managerPage = await managerContext.newPage();
      await managerPage.goto(route, { waitUntil: "domcontentloaded" });
      await managerPage.evaluate(async () => {
        await document.fonts.ready;
        for (let y = 0; y < document.documentElement.scrollHeight; y += Math.max(500, Math.floor(window.innerHeight * 0.75))) {
          window.scrollTo(0, y);
          await new Promise((resolve) => setTimeout(resolve, 300));
        }
        window.scrollTo(0, 0);
      });
      await managerPage.waitForFunction(() => [...document.querySelectorAll(".manager-image-link img")].length === 4 && [...document.querySelectorAll(".manager-image-link img")].every((img) => img.complete && img.naturalWidth > 0), null, { timeout: 25000 });
      await managerPage.evaluate(() => Promise.all([...document.querySelectorAll(".manager-image-link img")].map((img) => img.decode().catch(() => undefined))));
      const media = await managerPage.locator(".manager-image-link img").evaluateAll((images) => images.map((img) => {
        const box = img.getBoundingClientRect();
        const frame = img.parentElement.getBoundingClientRect();
        return { src: img.currentSrc, naturalWidth: img.naturalWidth, naturalHeight: img.naturalHeight, x: box.x, right: box.right, frameRight: frame.right };
      }));
      assert.ok(media.length >= 4, `expected all dashboard screenshots, found ${media.length}`);
      assert.ok(media.every((img) => img.naturalWidth > 0 && img.naturalHeight > 0), `undecoded dashboard media: ${JSON.stringify(media.filter((img) => img.naturalWidth === 0))}`);
      assert.ok(media.every((img) => img.x >= -1 && img.right <= viewport.width + 1 && img.right <= img.frameRight + 1), `dashboard media exceeds its viewport/frame: ${JSON.stringify(media.filter((img) => img.x < -1 || img.right > viewport.width + 1 || img.right > img.frameRight + 1))}`);
      await managerContext.close();
    }
  });

  await check("illustrative product screens retain readable contrast in both themes", async () => {
    const axePath = "/tmp/kepler-stage4-browser/node_modules/axe-core/axe.min.js";
    await page.evaluate(() => localStorage.setItem("kepler-theme", "dark"));
    await page.goto(`${baseUrl}/work/glitre-loyalty-platform/customer-app`, { waitUntil: "networkidle" });
    await page.addScriptTag({ path: axePath });
    let violations = await page.evaluate(async () => (await window.axe.run(document, { runOnly: { type: "rule", values: ["color-contrast"] } })).violations);
    assert.equal(violations.length, 0, `customer app dark contrast: ${JSON.stringify(violations.map((item) => item.nodes.map((node) => node.target)))}`);

    await page.evaluate(() => localStorage.setItem("kepler-theme", "light"));
    await page.goto(`${baseUrl}/work/glitre-loyalty-platform/worker-app`, { waitUntil: "networkidle" });
    await page.addScriptTag({ path: axePath });
    violations = await page.evaluate(async () => (await window.axe.run(document, { runOnly: { type: "rule", values: ["color-contrast"] } })).violations);
    assert.equal(violations.length, 0, `worker app light contrast: ${JSON.stringify(violations.map((item) => item.nodes.map((node) => node.target)))}`);
  });

  await check("theme-sensitive shell and route surfaces keep readable contrast", async () => {
    const axePath = "/tmp/kepler-stage4-browser/node_modules/axe-core/axe.min.js";
    const cases = [
      ["/", "dark"], ["/ar", "dark"], ["/services", "light"], ["/services", "dark"],
      ["/studio", "dark"], ["/contact", "dark"], ["/privacy", "light"],
      ["/work/quickcharging-pos", "light"], ["/work/quickcharging-pos", "dark"],
    ];
    for (const [route, theme] of cases) {
      await page.evaluate((value) => localStorage.setItem("kepler-theme", value), theme);
      await page.goto(`${baseUrl}${route}`, { waitUntil: "networkidle" });
      if (route === "/" || route === "/ar") {
        await page.evaluate(async () => {
          for (let y = 0; y < document.body.scrollHeight; y += window.innerHeight) {
            window.scrollTo(0, y);
            await new Promise((resolve) => setTimeout(resolve, 150));
          }
          window.scrollTo(0, 0);
        });
      }
      await page.addScriptTag({ path: axePath });
      const violations = await page.evaluate(async () => (await window.axe.run(document, { runOnly: { type: "rule", values: ["color-contrast"] } })).violations);
      assert.equal(violations.length, 0, `${route} ${theme}: ${JSON.stringify(violations.flatMap((item) => item.nodes.map((node) => node.target)))}`);
    }
  });

  await check("unavailable local storage does not prevent light rendering", async () => {
    const blocked = await browser.newContext({
      colorScheme: "dark",
      viewport: { width: 390, height: 844 },
    });
    await blocked.addInitScript(() => {
      Object.defineProperty(window, "localStorage", {
        get() {
          return {
            getItem() { throw new Error("storage read disabled"); },
            setItem() { throw new Error("storage write disabled"); },
          };
        },
      });
    });
    const blockedPage = await blocked.newPage();
    await blockedPage.goto(baseUrl, { waitUntil: "networkidle" });
    assert.equal(await blockedPage.locator("html").getAttribute("data-theme"), "light");
    const button = blockedPage.locator("button[data-theme-toggle]");
    await button.click();
    assert.equal(await blockedPage.locator("html").getAttribute("data-theme"), "dark");
    assert.equal(await button.getAttribute("aria-pressed"), "true");
    assert.equal(await button.getAttribute("aria-label"), "Switch to light theme");
    assert.match(await button.innerText(), /Light/);
    await button.click();
    assert.equal(await blockedPage.locator("html").getAttribute("data-theme"), "light");
    assert.equal(await button.getAttribute("aria-pressed"), "false");
    assert.equal(await button.getAttribute("aria-label"), "Switch to dark theme");
    assert.match(await button.innerText(), /Dark/);
    await button.click();
    assert.equal(await blockedPage.locator("html").getAttribute("data-theme"), "dark");
    assert.equal(await button.getAttribute("aria-pressed"), "true");
    const arabicBlocked = await browser.newContext({ colorScheme: "dark", viewport: { width: 390, height: 844 } });
    await arabicBlocked.addInitScript(() => {
      Object.defineProperty(window, "localStorage", {
        get() {
          return {
            getItem() { throw new Error("storage read disabled"); },
            setItem() { throw new Error("storage write disabled"); },
          };
        },
      });
    });
    const arabicPage = await arabicBlocked.newPage();
    await arabicPage.goto(`${baseUrl}/ar`, { waitUntil: "networkidle" });
    assert.equal(await arabicPage.locator("html").getAttribute("data-theme"), "light");
    const arabicButton = arabicPage.locator("button[data-theme-toggle]");
    assert.equal(await arabicButton.getAttribute("aria-label"), "التبديل إلى الوضع الداكن", "Arabic light state should announce the next dark theme");
    assert.match(await arabicButton.innerText(), /داكن/);
    await arabicButton.click();
    assert.equal(await arabicPage.locator("html").getAttribute("data-theme"), "dark");
    assert.equal(await arabicButton.getAttribute("aria-pressed"), "true");
    assert.equal(await arabicButton.getAttribute("aria-label"), "التبديل إلى الوضع الفاتح", "Arabic dark state should announce the next light theme");
    assert.match(await arabicButton.innerText(), /فاتح/);
    await arabicButton.click();
    assert.equal(await arabicPage.locator("html").getAttribute("data-theme"), "light");
    assert.equal(await arabicButton.getAttribute("aria-pressed"), "false");
    assert.equal(await arabicButton.getAttribute("aria-label"), "التبديل إلى الوضع الداكن");
    assert.match(await arabicButton.innerText(), /داكن/);
    await arabicButton.click();
    assert.equal(await arabicPage.locator("html").getAttribute("data-theme"), "dark");
    assert.equal(await arabicButton.getAttribute("aria-pressed"), "true");
    await arabicBlocked.close();
    await blocked.close();
  });
} finally {
  await context.close();
  await browser.close();
}

if (failures.length) process.exitCode = 1;
