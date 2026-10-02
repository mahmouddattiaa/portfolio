# Glitre Loyalty Platform — manager dashboard screenshots

This folder holds the on-disk screenshots used by `/work/glitre-loyalty-platform/manager`.

## Image gate: open

**No manager-dashboard capture is approved for publication today.** The owner approved the design document, but did not specifically authorize publication of any manager-dashboard screenshot. The 36 captures referenced by `audit-2026-08-16/REPORT.md` were generated against the live Azure URL during the audit, but the audit's `.gitignore` excludes them and they are not on disk today (`audit §6.1`). The audit's `findings.json` (8,834 lines) records per-capture DOM, axe result, console / network log — useful machine-readable evidence, not images.

## Open gate

Before any dashboard capture lands in this folder, one of the following must resolve:

1. Recover the 36 audit PNGs from the audit operator's local machine.
2. Re-run `audit-2026-08-16/audit.mjs` against the live URL with a controlled admin credential and commit the captures.
3. Owner-approved redacted mockups, captioned as design intent rather than live capture.

Until one of these lands, the manager study and the parent study show **no dashboard screenshots**. The page above uses the nine-page inventory as labelled text, and the parent study's "What we delivered" card for the dashboard reads "Live and private; the page below shows redacted screenshots only" without any images attached.

## Excluded from this folder

- The live manager dashboard URL (forbidden).
- The `[private API host omitted]` API URL (forbidden in copy).
- Any customer / worker / OTP / voucher / complaint / ledger / audit-event content.
- `BRAND-SCRAPE.md` provenance assets — brand assets, not product captures.
