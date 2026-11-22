import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";

async function loadPlaywright() {
  const require = createRequire(import.meta.url);
  const loadedPath = process.env.PLAYWRIGHT_MODULE_PATH || "playwright";
  const loaded = await import(pathToFileURL(require.resolve(loadedPath)).href);
  return loaded.chromium ? loaded : loaded.default;
}

const baseUrl = (process.env.STAGE4_CONTACT_BASE_URL || "http://localhost:3117").replace(/\/$/, "");
const { chromium } = await loadPlaywright();
const browser = await chromium.launch({
  headless: true,
  ...(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH
    ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH }
    : {}),
});

function check(condition, message) {
  assert.ok(condition, message);
}

async function fillBrief(page) {
  await page.locator("#name").fill("Samira Haddad");
  await page.locator("#company").fill("Northstar Operations");
  await page.locator("#email").fill("samira@example.com");
  await page.locator("#offer").selectOption("operations-platform");
  await page.locator("#timing").selectOption("this-quarter");
  await page.locator("#problem").fill("Dispatchers coordinate deliveries across separate spreadsheets.");
}

try {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(baseUrl + "/contact");
  const desktopFunnel = await page.evaluate(() => {
    const qualification = document.querySelector("#qualification-heading")?.closest("section")?.getBoundingClientRect();
    const intake = document.querySelector("#contact-form-heading")?.closest("section")?.getBoundingClientRect();
    return qualification && intake ? {
      qualificationTop: qualification.top,
      intakeTop: intake.top,
      qualificationWidth: qualification.width,
      intakeWidth: intake.width,
    } : null;
  });
  check(Boolean(desktopFunnel), "desktop qualification and intake sections were not found");
  check(Math.abs(desktopFunnel.qualificationTop - desktopFunnel.intakeTop) <= 2,
    "desktop qualification and intake do not share a row");
  check(desktopFunnel.qualificationWidth / desktopFunnel.intakeWidth >= 0.65
    && desktopFunnel.qualificationWidth / desktopFunnel.intakeWidth <= 0.78,
  "desktop qualification and intake do not follow the 5/7 column ratio");

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(baseUrl + "/contact");
  const mobileFunnel = await page.evaluate(() => {
    const qualification = document.querySelector("#qualification-heading")?.closest("section")?.getBoundingClientRect();
    const intake = document.querySelector("#contact-form-heading")?.closest("section")?.getBoundingClientRect();
    return qualification && intake ? { qualificationTop: qualification.top, intakeTop: intake.top } : null;
  });
  check(Boolean(mobileFunnel), "mobile qualification and intake sections were not found");
  check(mobileFunnel.intakeTop < mobileFunnel.qualificationTop,
    "mobile intake does not appear before the full qualification narrative");

  await page.goto(baseUrl + "/contact?offer=launch-sprint");
  check(await page.locator("#offer").inputValue() === "launch-sprint", "canonical offer prefill was not selected");
  if (process.env.STAGE4_CONTACT_EXPECT_DELIVERY_UNAVAILABLE === "1") {
    check((await page.getByRole("status").innerText()).includes("Online form delivery is not configured"), "unavailable delivery state is missing");
  }
  check(await page.locator("form label").count() === 7, "expected six visible form labels plus the hidden honeypot label");
  check(await page.locator("#outcome").count() === 0, "removed outcome field is still rendered");
  check(await page.locator("#consent-checkbox").count() === 0, "removed consent checkbox is still rendered");
  check(await page.locator("#website").evaluate((node) => node.parentElement?.getAttribute("aria-hidden")) === "true", "honeypot wrapper is not hidden from assistive technology");
  check(await page.locator("#website").getAttribute("tabindex") === "-1", "honeypot can receive keyboard focus");

  await page.goto(baseUrl + "/contact?offer=unknown");
  check(await page.locator("#offer").inputValue() === "", "unknown offer query did not normalize to empty");
  await page.goto(baseUrl + "/contact?offer=blueprint&offer=product-care");
  await page.waitForLoadState("networkidle");
  check(await page.locator("#offer").inputValue() === "", "repeated offer query did not normalize to empty");

  await page.getByRole("button", { name: /send project review request/i }).click();
  const activeAfterInvalid = await page.evaluate(() => document.activeElement?.id || "");
  check(activeAfterInvalid === "name", "invalid submit did not focus the first field (active: " + activeAfterInvalid + ")");
  check(await page.locator("#name").getAttribute("aria-invalid") === "true", "name error is not exposed to assistive technology");
  check(await page.locator("#company-error").innerText() === "Please enter your company or project name.", "company error copy differs from the locked contract");
  check(await page.locator("#problem").getAttribute("aria-describedby") === "problem-error", "problem error is not connected");
  await page.locator("#name").fill("Samira Haddad");
  check(await page.locator("#name").getAttribute("aria-invalid") !== "true", "field error did not clear on input");

  await fillBrief(page);
  let releasePending;
  const pending = new Promise((resolve) => { releasePending = resolve; });
  await page.route("**/api/contact", async (route) => {
    await pending;
    await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ ok: true }) });
  });
  const submit = page.locator('form button[type="submit"]');
  await submit.click();
  check(await submit.isDisabled(), "submit remained enabled while a request was pending");
  check(await page.locator("form").getAttribute("aria-busy") === "true", "form pending state is not marked busy");
  check(await submit.innerText() === "Sending project brief...", "pending status copy differs from the locked contract");
  releasePending();
  await page.getByRole("status").waitFor();
  check((await page.getByRole("status").innerText()).includes("Project review request received."), "success status did not match the locked copy");
  await page.unroute("**/api/contact");
  await page.getByRole("button", { name: /send another project review/i }).click();
  check(await page.locator("#name").inputValue() === "", "success reset did not clear the prior name");
  check(await page.locator("#offer").inputValue() === "", "success reset did not clear the prior offer");

  for (const failure of [
    { name: "HTTP 429", mode: "429", handler: (route) => route.fulfill({ status: 429, contentType: "application/json", body: JSON.stringify({ error: "upstream detail must not be shown" }) }) },
    { name: "HTTP 5xx non-JSON", mode: "5xx-html", handler: (route) => route.fulfill({ status: 502, contentType: "text/html", body: "<html>provider secret</html>" }) },
    { name: "network", mode: "network", handler: (route) => route.abort() },
  ]) {
    await fillBrief(page);
    if (process.env.STAGE4_CONTACT_MOCK_CONTROL_URL) {
      await fetch(process.env.STAGE4_CONTACT_MOCK_CONTROL_URL, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ mode: failure.mode }) });
    } else {
      await page.route("**/api/contact", failure.handler, { times: 1 });
    }
    await page.getByRole("button", { name: /send project review request/i }).click();
    await page.locator('[role="alert"]').filter({ hasText: "Your enquiry has not been sent." }).waitFor();
    const alertText = await page.locator('[role="alert"]').filter({ hasText: "Your enquiry has not been sent." }).innerText();
    check(alertText.includes("Your submission could not be delivered through the form right now."), failure.name + " failure did not show the locked fallback copy");
    check(!alertText.includes("provider secret"), failure.name + " exposed a provider error");
    check(await page.locator("#name").inputValue() === "Samira Haddad", failure.name + " discarded the name");
    check(await page.locator("#company").inputValue() === "Northstar Operations", failure.name + " discarded the company");
    check(await page.locator("#email").inputValue() === "samira@example.com", failure.name + " discarded the email");
    check(await page.locator("#offer").inputValue() === "operations-platform", failure.name + " discarded the offer");
    check(await page.locator("#timing").inputValue() === "this-quarter", failure.name + " discarded the timing");
    check(await page.locator("#problem").inputValue() === "Dispatchers coordinate deliveries across separate spreadsheets.", failure.name + " discarded the problem brief");
    check(await page.getByRole("button", { name: "Retry submission" }).isVisible(), failure.name + " did not provide a retry action");
    if (!process.env.STAGE4_CONTACT_MOCK_CONTROL_URL) await page.unroute("**/api/contact");
  }

  if (process.env.STAGE4_CONTACT_MOCK_CONTROL_URL) {
    await fetch(process.env.STAGE4_CONTACT_MOCK_CONTROL_URL, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ mode: "success" }) });
  } else {
    await page.route("**/api/contact", (route) => route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ ok: true }) }), { times: 1 });
  }
  await page.getByRole("button", { name: "Retry submission" }).click();
  await page.getByRole("status").waitFor();
  check((await page.getByRole("status").innerText()).includes("Project review request received."), "retry did not submit the preserved draft");

  console.log(JSON.stringify({ status: "pass", scenarios: ["six-field visibility", "canonical and invalid prefill", "validation focus and inline errors", "pending lock", "success status/reset", "429 preservation", "5xx non-JSON preservation", "network preservation", "retry preserves and sends draft"] }));
} finally {
  await browser.close();
}
