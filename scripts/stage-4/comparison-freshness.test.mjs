import assert from "node:assert/strict";
import test from "node:test";
import { retainCurrentComparisons } from "./comparison-freshness.mjs";

const oldHome = {
  path: "website/home.png",
  route: "/",
  locale: "en",
  theme: "dark",
  viewport: { width: 1440, height: 900 },
  sha256: "old-home-hash",
};
const homeComparison = { websitePath: oldHome.path, verdict: "PASS" };
const oldService = {
  ...oldHome,
  path: "website/services.png",
  route: "/services",
  sha256: "service-hash",
};
const serviceComparison = { websitePath: oldService.path, verdict: "PASS" };

test("keeps a comparison when its refreshed screenshot path and hash are unchanged", () => {
  const result = retainCurrentComparisons({
    previousWebsite: [oldHome],
    refreshedWebsite: [{ ...oldHome }],
    comparisons: [homeComparison],
  });
  assert.deepEqual(result, [homeComparison]);
});

test("invalidates a comparison when its refreshed screenshot hash changes", () => {
  const result = retainCurrentComparisons({
    previousWebsite: [oldHome],
    refreshedWebsite: [{ ...oldHome, sha256: "new-home-hash" }],
    comparisons: [homeComparison],
  });
  assert.deepEqual(result, []);
});

test("invalidates a comparison when the logical screenshot keeps its dimensions but moves to a new path", () => {
  const result = retainCurrentComparisons({
    previousWebsite: [oldHome],
    refreshedWebsite: [{ ...oldHome, path: "website/home-v2.png" }],
    comparisons: [homeComparison],
  });
  assert.deepEqual(result, []);
});

test("preserves comparisons for website screenshots outside the refreshed identity set", () => {
  const result = retainCurrentComparisons({
    previousWebsite: [oldHome, oldService],
    refreshedWebsite: [{ ...oldHome, sha256: "new-home-hash" }],
    comparisons: [homeComparison, serviceComparison],
  });
  assert.deepEqual(result, [serviceComparison]);
});
