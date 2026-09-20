// Full-page screenshots through the Chrome DevTools protocol, so widths
// below headless Chrome's 500px window minimum are emulated correctly.
// Usage: node shoot.mjs <url> <outDir> <width,...> [reduced]
import { spawn } from "node:child_process";
import { writeFileSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const [url, outDir, widthsArg, mode] = process.argv.slice(2);
const widths = widthsArg.split(",").map(Number);
const reduced = mode === "reduced";
const chrome = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const port = 9333;
const profile = mkdtempSync(join(tmpdir(), "hv2-cdp-"));
const proc = spawn(chrome, [
  "--headless=new", "--disable-gpu", "--hide-scrollbars",
  `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, "about:blank",
]);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let target;
for (let i = 0; i < 50 && !target; i++) {
  await sleep(200);
  try {
    const list = await (await fetch(`http://127.0.0.1:${port}/json`)).json();
    target = list.find((t) => t.type === "page");
  } catch {}
}
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((r) => (ws.onopen = r));
let id = 0;
const pending = new Map();
ws.onmessage = (e) => {
  const msg = JSON.parse(e.data);
  if (msg.id && pending.has(msg.id)) { pending.get(msg.id)(msg); pending.delete(msg.id); }
};
const send = (method, params = {}) => new Promise((resolve) => {
  const mid = ++id; pending.set(mid, resolve);
  ws.send(JSON.stringify({ id: mid, method, params }));
});

await send("Page.enable");
await send("Runtime.enable");
if (reduced) {
  await send("Emulation.setEmulatedMedia", {
    features: [{ name: "prefers-reduced-motion", value: "reduce" }],
  });
}
for (const width of widths) {
  const mobile = width < 768;
  await send("Emulation.setDeviceMetricsOverride", {
    width, height: 900, deviceScaleFactor: Number(process.env.DPR || 1), mobile,
  });
  await send("Page.navigate", { url });
  await sleep(2500);
  // Scroll through so whileInView reveals and count-ups fire, then settle.
  const { result } = await send("Runtime.evaluate", {
    expression: "document.documentElement.scrollHeight", returnByValue: true,
  });
  const h = result.result.value;
  for (let y = 0; y < h; y += 400) {
    await send("Runtime.evaluate", { expression: `window.scrollTo(0, ${y})` });
    await sleep(120);
  }
  await sleep(1800);
  await send("Runtime.evaluate", { expression: "window.scrollTo(0, 0)" });
  await sleep(1200);
  const shot = await send("Page.captureScreenshot", {
    format: "png", captureBeyondViewport: true,
    clip: { x: 0, y: 0, width, height: h, scale: 1 },
  });
  const name = `home-${width}${reduced ? "-reduced" : ""}${process.env.DPR ? "@" + process.env.DPR + "x" : ""}.png`;
  writeFileSync(join(outDir, name), Buffer.from(shot.result.data, "base64"));
  console.log(name, width, "x", h);
}
ws.close();
proc.kill();
