import assert from "node:assert/strict";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE_PATH || "playwright");
const base = process.env.STAGE4_BASE_URL || "http://127.0.0.1:3018";
const routes = ["/work", "/work/hs-vpn", "/work/quickcharging-pos", "/work/medconnect-egypt", "/work/stayease", "/work/classroom-sentinel"];
const browser = await chromium.launch({ headless: true, ...(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH } : {}) });
let checked = 0;
try {
  for (const width of [390, 1440]) {
    for (const theme of ["light", "dark"]) {
      const page = await browser.newPage({ viewport: { width, height: 900 } });
      for (const route of routes) {
        await page.goto(`${base}${route}`, { waitUntil: "networkidle" });
        await page.evaluate((value) => document.documentElement.setAttribute("data-theme", value), theme);
        const players = page.locator("details.wv2-project-video, details.cs-video-card");
        for (let i = 0; i < await players.count(); i += 1) {
          const player = players.nth(i);
          const summary = player.locator("summary");
          const video = player.locator("video");
          await summary.click();
          await video.scrollIntoViewIfNeeded();
          await video.evaluate(async (element) => { element.muted = true; await element.play(); });
          const view = await player.evaluate((element) => {
            const video = element.querySelector("video");
            const summary = element.querySelector("summary");
            const bounds = video.getBoundingClientRect();
            const label = summary.getBoundingClientRect();
            const overlaps = Math.max(0, Math.min(bounds.right, label.right) - Math.max(bounds.left, label.left))
              * Math.max(0, Math.min(bounds.bottom, label.bottom) - Math.max(bounds.top, label.top));
            const center = document.elementFromPoint(bounds.x + bounds.width / 2, bounds.y + bounds.height / 2);
            return { overlapFraction: overlaps / (bounds.width * bounds.height), centerIsVideo: center === video, playing: !video.paused };
          });
          assert.ok(view.playing && view.centerIsVideo && view.overlapFraction < 0.25,
            `${route} player ${i}, ${width}px ${theme}: playback obscured ${JSON.stringify(view)}`);
          await summary.click();
          await page.waitForFunction((element) => element.paused, await video.elementHandle());
          checked += 1;
        }
      }
      await page.close();
    }
  }
  assert.equal(checked, 48, "all seven Work players and five detail placements must be checked in both sizes/themes");
  console.log(`PASS: ${checked} inline players remain visible during playback and pause on close.`);
} finally {
  await browser.close();
}
