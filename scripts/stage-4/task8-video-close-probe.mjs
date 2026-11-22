import fs from "node:fs/promises";
import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";

const ROOT = process.cwd();
const BASE_URL = process.env.STAGE4_BASE_URL || "http://127.0.0.1:3023";
const TARGETS = [
  { route: "/work", selector: "details.wv2-project-video" },
  { route: "/work/hs-vpn", selector: "details.cs-video-card" },
  { route: "/work/quickcharging-pos", selector: "details.cs-video-card" },
  { route: "/work/medconnect-egypt", selector: "details.cs-video-card" },
  { route: "/work/stayease", selector: "details.cs-video-card" },
  { route: "/work/classroom-sentinel", selector: "details.cs-video-card" },
];

async function loadPlaywright() {
  const require = createRequire(import.meta.url);
  const packagePath = process.env.PLAYWRIGHT_MODULE_PATH || "playwright";
  const loaded = await import(pathToFileURL(require.resolve(packagePath)).href);
  return loaded.chromium ? loaded : loaded.default;
}

const { chromium } = await loadPlaywright();
const browser = await chromium.launch({
  headless: true,
  ...(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH
    ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH }
    : {}),
});
const results = [];

try {
  for (const { route, selector } of TARGETS) {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    const response = await page.goto(`${BASE_URL}${route}`, { waitUntil: "domcontentloaded" });
    if (response?.status() !== 200) throw new Error(`${route} returned HTTP ${response?.status() ?? 0}`);

    const details = page.locator(selector);
    for (let index = 0; index < await details.count(); index += 1) {
      const card = details.nth(index);
      const video = card.locator("video");
      const metadata = await video.evaluate((element) => ({
        controls: element.controls,
        poster: element.poster,
        preload: element.preload,
      }));
      await card.locator("summary").click();
      await video.evaluate(async (element) => {
        element.muted = true;
        await element.play();
      });
      await page.waitForFunction((element) => element.currentTime > 0.1, await video.elementHandle());
      const timeBeforeClose = await video.evaluate((element) => element.currentTime);
      await card.locator("summary").click();
      await page.waitForTimeout(300);
      const afterClose = await video.evaluate((element) => ({
        paused: element.paused,
        currentTime: element.currentTime,
      }));
      results.push({ route, index, metadata, timeBeforeClose, afterClose });
    }

    await page.close();
  }
} finally {
  await browser.close();
}

const gridPlayers = results.filter((result) => result.route === "/work").length;
const report = {
  testedAt: new Date().toISOString(),
  baseUrl: BASE_URL,
  expectedPlayers: 7,
  workGridPlayers: gridPlayers,
  actualPlayers: results.length,
  results,
};
const output = `${ROOT}/.superpowers/sdd/2026-11-22-stage-4-implementation/task-8-report/checks/video-collapse-task8.json`;
await fs.writeFile(output, `${JSON.stringify(report, null, 2)}\n`);
const failures = results.filter((result) => !result.metadata.controls || !result.metadata.poster
  || result.metadata.preload !== "metadata" || !result.afterClose.paused);
console.log(JSON.stringify({ output, actualPlayers: results.length, failures }, null, 2));
if (gridPlayers !== 7 || failures.length) process.exitCode = 1;
