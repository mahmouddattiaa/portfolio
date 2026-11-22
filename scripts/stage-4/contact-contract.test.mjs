import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import { Module } from "node:module";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sourcePath = path.resolve(__dirname, "../../src/lib/contact.ts");
const source = readFileSync(sourcePath, "utf8");
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
}).outputText;
const moduleRecord = new Module(sourcePath);
moduleRecord.filename = sourcePath;
moduleRecord.paths = Module._nodeModulePaths(path.dirname(sourcePath));
moduleRecord._compile(compiled, sourcePath);
const { validateEnquiry, normalizeOfferParam, toProviderPayload } = moduleRecord.exports;

const completeEnquiry = {
  name: "Samira Haddad",
  company: "Northstar Operations",
  email: "samira@example.com",
  offer: "operations-platform",
  timing: "this-quarter",
  problem: "Dispatchers coordinate deliveries across separate spreadsheets.",
};

test("requires the six locked fields and uses exact validation copy", () => {
  assert.deepEqual(validateEnquiry({}), {
    name: "Please enter your name so we know who to address.",
    company: "Please enter your company or project name.",
    email: "Please enter a valid email address so we can reply.",
    offer: "Select the engagement tier closest to your current stage.",
    problem: "Add a short description of your workflow or goals (at least 20 characters).",
  });
});

test("accepts supported engagement values including Not sure yet", () => {
  for (const offer of ["blueprint", "launch-sprint", "operations-platform", "product-care", "not-sure"]) {
    assert.deepEqual(validateEnquiry({ ...completeEnquiry, offer }), {});
  }
});

test("requires a 20-character trimmed brief and validates optional timing", () => {
  assert.equal(validateEnquiry({ ...completeEnquiry, problem: "   short brief         " }).problem,
    "Add a short description of your workflow or goals (at least 20 characters).");
  assert.equal(validateEnquiry({ ...completeEnquiry, timing: "tomorrow" }).timing,
    "Select a supported target launch or discovery window.");
  assert.deepEqual(validateEnquiry({ ...completeEnquiry, timing: "" }), {});
  assert.equal(validateEnquiry({ ...completeEnquiry, timing: 42 }).timing,
    "Select a supported target launch or discovery window.");
});

test("rejects malformed email addresses while accepting conventional addresses", () => {
  for (const email of ["samira@example.com", "first.last+tag@sub.example.co.uk"]) {
    assert.deepEqual(validateEnquiry({ ...completeEnquiry, email }), {});
  }
  for (const email of ["a@@b.com", "a@b..com", ".a@b.com", "a..b@b.com", "a@-b.com", "a@b.c", "a b@b.com"]) {
    assert.equal(validateEnquiry({ ...completeEnquiry, email }).email,
      "Please enter a valid email address so we can reply.", email + " should be rejected");
  }
});


test("normalizes only a single canonical offer query value", () => {
  assert.equal(normalizeOfferParam("blueprint"), "blueprint");
  assert.equal(normalizeOfferParam("not-sure"), "");
  assert.equal(normalizeOfferParam(["blueprint", "product-care"]), "");
  assert.equal(normalizeOfferParam("unknown"), "");
  assert.equal(normalizeOfferParam(undefined), "");
});

test("provider mapping contains only the six visible fields", () => {
  const payload = toProviderPayload({
    ...completeEnquiry,
    timing: "",
    website: "spam",
    outcome: "removed",
    consent: true,
    unknown: "ignored",
  });
  assert.deepEqual(payload, {
    name: "Samira Haddad",
    company: "Northstar Operations",
    email: "samira@example.com",
    offer: "operations-platform",
    timing: "",
    problem: "Dispatchers coordinate deliveries across separate spreadsheets.",
  });
});
