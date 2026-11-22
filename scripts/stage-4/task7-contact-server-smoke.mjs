import assert from "node:assert/strict";
import { createServer } from "node:http";
import { spawn } from "node:child_process";
import { setTimeout as delay } from "node:timers/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const nextBin = path.join(root, "node_modules/next/dist/bin/next");
let providerMode = "success";
let providerRequests = 0;
let lastProviderPayload;
let nextProcess;
let nextOutput = "";

function listen(server) {
  return new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => resolve(server.address().port));
  });
}

function stop(child) {
  if (!child || child.exitCode !== null) return Promise.resolve();
  return new Promise((resolve) => {
    const timer = setTimeout(() => {
      child.kill("SIGKILL");
      resolve();
    }, 8000);
    child.once("close", () => {
      clearTimeout(timer);
      resolve();
    });
    child.kill("SIGTERM");
  });
}

const mock = createServer(async (request, response) => {
  if (request.method === "POST" && request.url === "/control") {
    let raw = "";
    for await (const chunk of request) raw += chunk;
    try {
      const { mode } = JSON.parse(raw);
      providerMode = String(mode);
      response.writeHead(200, { "Content-Type": "application/json" }).end(JSON.stringify({ ok: true }));
    } catch {
      response.writeHead(400).end();
    }
    return;
  }

  if (request.method !== "POST" || request.url !== "/provider") {
    response.writeHead(404).end();
    return;
  }

  providerRequests += 1;
  let raw = "";
  for await (const chunk of request) raw += chunk;
  try { lastProviderPayload = JSON.parse(raw); } catch { lastProviderPayload = undefined; }

  if (providerMode === "network") {
    request.socket.destroy();
    return;
  }
  if (providerMode === "429") {
    response.writeHead(429, { "Content-Type": "application/json" })
      .end(JSON.stringify({ error: "mock provider secret detail" }));
    return;
  }
  if (providerMode === "5xx-html") {
    response.writeHead(502, { "Content-Type": "text/html" })
      .end("<html>mock provider secret detail</html>");
    return;
  }
  response.writeHead(200, { "Content-Type": "application/json" }).end(JSON.stringify({ ok: true }));
});

const mockPort = await listen(mock);
const mockControlUrl = "http://127.0.0.1:" + mockPort + "/control";
const providerUrl = "http://127.0.0.1:" + mockPort + "/provider";

async function freePort() {
  const server = createServer();
  const port = await listen(server);
  await new Promise((resolve) => server.close(resolve));
  return port;
}

async function startNext({ enabled }) {
  const port = await freePort();
  const env = {
    ...process.env,
    CONTACT_PROVIDER: enabled ? "formspree" : "",
    FORMSPREE_FORM_ID: enabled ? "stage4-local-mock" : "",
    CONTACT_PROVIDER_ENDPOINT: enabled ? providerUrl : "",
    CONTACT_FALLBACK_EMAIL: "mahmouddattiaa7@gmail.com",
    NEXT_PUBLIC_CONTACT_FALLBACK_EMAIL: "",
    NEXT_TELEMETRY_DISABLED: "1",
  };
  nextOutput = "";
  nextProcess = spawn(process.execPath, [nextBin, "dev", "--hostname", "127.0.0.1", "--port", String(port)], {
    cwd: root,
    env,
    stdio: ["ignore", "pipe", "pipe"],
  });
  nextProcess.stdout.on("data", (chunk) => { nextOutput = (nextOutput + chunk.toString()).slice(-5000); });
  nextProcess.stderr.on("data", (chunk) => { nextOutput = (nextOutput + chunk.toString()).slice(-5000); });

  const baseUrl = "http://localhost:" + port;
  for (let attempt = 0; attempt < 100; attempt += 1) {
    if (nextProcess.exitCode !== null) throw new Error("Next dev exited early: " + nextOutput.slice(-1800));
    try {
      const response = await fetch(baseUrl + "/contact", { signal: AbortSignal.timeout(12000) });
      if (response.status === 200) return { baseUrl, port };
    } catch {}
    await delay(300);
  }
  throw new Error("Next dev did not become ready: " + nextOutput.slice(-1800));
}

async function post(baseUrl, payload, ip) {
  const response = await fetch(baseUrl + "/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-forwarded-for": ip,
    },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(12000),
  });
  let body;
  try { body = await response.json(); } catch { body = undefined; }
  return { response, body };
}

const complete = {
  name: "  Samira Haddad  ",
  company: "  Northstar Operations  ",
  email: "  samira@example.com  ",
  offer: "operations-platform",
  timing: "this-quarter",
  problem: "Dispatchers coordinate deliveries across separate spreadsheets.",
};

async function exerciseConfiguredApi(baseUrl) {
  const validation = await post(baseUrl, {}, "192.0.2.10");
  assert.equal(validation.response.status, 422);
  assert.deepEqual(Object.keys(validation.body.errors).sort(), ["company", "email", "name", "offer", "problem"]);

  const invalidTiming = await post(baseUrl, { ...complete, timing: 42 }, "192.0.2.11");
  assert.equal(invalidTiming.response.status, 422);
  assert.equal(invalidTiming.body.errors.timing, "Select a supported target launch or discovery window.");

  const malformed = await fetch(baseUrl + "/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-forwarded-for": "192.0.2.12" },
    body: "{",
  });
  assert.equal(malformed.status, 400);

  const beforeHoneypot = providerRequests;
  const honeypot = await post(baseUrl, { ...complete, website: "bot-filled" }, "192.0.2.13");
  assert.equal(honeypot.response.status, 200);
  assert.equal(honeypot.body.ok, true);
  assert.equal(providerRequests, beforeHoneypot, "honeypot reached the local provider");

  const success = await post(baseUrl, {
    ...complete,
    website: "",
    outcome: "removed old field",
    consent: true,
    country: "removed old field",
    unknown: "must not be forwarded",
  }, "192.0.2.14");
  assert.equal(success.response.status, 200);
  assert.equal(success.body.ok, true);
  assert.deepEqual(Object.keys(lastProviderPayload).sort(), ["company", "email", "name", "offer", "problem", "timing"]);
  assert.equal(lastProviderPayload.name, "Samira Haddad");
  assert.equal(lastProviderPayload.company, "Northstar Operations");
  assert.equal(lastProviderPayload.email, "samira@example.com");

  for (const mode of ["429", "5xx-html", "network"]) {
    const control = await fetch(mockControlUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mode }),
    });
    assert.equal(control.status, 200);
    const failed = await post(baseUrl, complete, "192.0.2." + (20 + ["429", "5xx-html", "network"].indexOf(mode)));
    assert.equal(failed.response.status, mode === "network" ? 503 : 502, mode + " was not safely mapped");
    assert.ok(!JSON.stringify(failed.body).includes("mock provider secret"), mode + " leaked provider details");
  }

  for (let index = 0; index < 5; index += 1) {
    const response = await post(baseUrl, {}, "203.0.113.80");
    assert.equal(response.response.status, 422, "request " + (index + 1) + " was rejected before the rate limit");
  }
  const limited = await post(baseUrl, {}, "203.0.113.80");
  assert.equal(limited.response.status, 429);
}

async function exerciseUnavailablePage(baseUrl) {
  const response = await fetch(baseUrl + "/contact");
  const html = await response.text();
  assert.equal(response.status, 200);
  assert.ok(html.includes("Online form delivery is not configured at the moment."), "unavailable delivery status is missing");
  assert.ok(html.includes('id="name"') && html.includes('id="company"') && html.includes('id="email"'), "contact form disappeared while delivery was unavailable");
  assert.ok(html.includes("mahmouddattiaa7@gmail.com"), "verified fallback email is missing in unavailable state");
}

async function runBrowser(baseUrl, options = {}) {
  const browserCommand = spawn(process.execPath, [path.join(root, "scripts/stage-4/task7-contact-browser-smoke.mjs")], {
    cwd: root,
    env: {
      ...process.env,
      STAGE4_CONTACT_BASE_URL: baseUrl,
      ...(options.mockControlUrl ? { STAGE4_CONTACT_MOCK_CONTROL_URL: options.mockControlUrl } : { STAGE4_CONTACT_MOCK_CONTROL_URL: "" }),
      ...(options.unavailable ? { STAGE4_CONTACT_EXPECT_DELIVERY_UNAVAILABLE: "1" } : { STAGE4_CONTACT_EXPECT_DELIVERY_UNAVAILABLE: "" }),
    },
    stdio: ["ignore", "pipe", "pipe"],
  });
  let output = "";
  browserCommand.stdout.on("data", (chunk) => { output += chunk.toString(); });
  browserCommand.stderr.on("data", (chunk) => { output += chunk.toString(); });
  const code = await new Promise((resolve) => browserCommand.once("close", resolve));
  if (code !== 0) throw new Error("Contact browser smoke failed: " + output.slice(-2200));
  process.stdout.write(output.trim() + "\n");
}

try {
  const configured = await startNext({ enabled: true });
  await exerciseConfiguredApi(configured.baseUrl);
  await runBrowser(configured.baseUrl, { mockControlUrl });
  await stop(nextProcess);
  nextProcess = undefined;

  const unavailable = await startNext({ enabled: false });
  await exerciseUnavailablePage(unavailable.baseUrl);
  await runBrowser(unavailable.baseUrl, { unavailable: true });

  console.log(JSON.stringify({
    status: "pass",
    serverScenarios: ["six-field server validation", "invalid optional timing", "malformed JSON", "honeypot short-circuit", "allowlisted provider payload", "provider 429", "provider 5xx non-JSON", "provider network failure", "rate limit", "form remains available without delivery configuration"],
    browserScenarios: ["prefill", "field errors/focus", "pending lock", "success/reset", "provider failure preservation/retry"],
    providerRequests,
  }));
} finally {
  await stop(nextProcess);
  await new Promise((resolve) => mock.close(resolve));
}
