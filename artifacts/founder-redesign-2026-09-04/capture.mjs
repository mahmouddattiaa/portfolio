import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const OUT = "artifacts/founder-redesign-2026-09-04";
await mkdir(OUT, { recursive: true });

const viewports = [
  { name: "320", w: 320, h: 700 },
  { name: "360", w: 360, h: 780 },
  { name: "390", w: 390, h: 844 },
  { name: "414", w: 414, h: 896 },
  { name: "1280", w: 1280, h: 900 },
  { name: "1440", w: 1440, h: 900 },
];

const browser = await chromium.launch();
for (const vp of viewports) {
  const ctx = await browser.newContext({ viewport: { width: vp.w, height: vp.h } });
  const page = await ctx.newPage();
  await page.goto("http://localhost:3050/mahmoud", { waitUntil: "networkidle", timeout: 30000 });
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${OUT}/mahmoud-${vp.name}.png`, fullPage: true });
  await ctx.close();
  console.log(`captured ${vp.name} (${vp.w}x${vp.h})`);
}
await browser.close();
console.log("done");
