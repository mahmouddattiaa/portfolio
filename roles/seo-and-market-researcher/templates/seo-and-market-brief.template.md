# Kepler Dev — B2B SEO, GEO & Multi-Route Metadata Specification (Stage 1)

**Brand:** Kepler Dev (`https://www.keplerdev.uk`)  
**Identity:** Standalone UK & GCC Digital Product and Software Engineering Studio  
**Status:** Locked Stage 1 SEO & Structured Data Brief

---

## 1. B2B Search Intent & Keyword Clusters

| Cluster | Target Route | Primary Commercial Keyword | Secondary / Long-Tail Keywords | Buyer Intent |
| :--- | :--- | :--- | :--- | :--- |
| **1. Studio & Operational Software** | `/` & `/studio` | ... | ... | ... |
| **2. Engagements & Product Lines** | `/services` | ... | ... | ... |
| **3. Case Studies & Proof** | `/work` & `/work/[slug]` | ... | ... | ... |
| **4. GCC Arabic RTL Market** | `/ar` | ... | ... | ... |

---

## 2. Multi-Route Metadata Table (`<title>`, `<meta description>`, Canonical & `hreflang`)

*Rule: Every `<title>` must be `45–60 characters` and every `<meta description>` must be `135–160 characters`.*

| Route | Exact `<title>` (`45–60 chars`) | Char Count | Exact `<meta name="description">` (`135–160 chars`) | Char Count | Canonical URL |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `/` | ... | ... | ... | ... | `https://www.keplerdev.uk/` |
| `/work` | ... | ... | ... | ... | `https://www.keplerdev.uk/work` |
| `/services` | ... | ... | ... | ... | `https://www.keplerdev.uk/services` |
| `/studio` | ... | ... | ... | ... | `https://www.keplerdev.uk/studio` |
| `/contact` | ... | ... | ... | ... | `https://www.keplerdev.uk/contact` |
| `/ar` | ... | ... | ... | ... | `https://www.keplerdev.uk/ar` |
| `/work/glitre-loyalty-platform` | ... | ... | ... | ... | `https://www.keplerdev.uk/work/glitre-loyalty-platform` |
| `/work/hs-vpn` | ... | ... | ... | ... | `https://www.keplerdev.uk/work/hs-vpn` |
| `/work/quickcharging-pos` | ... | ... | ... | ... | `https://www.keplerdev.uk/work/quickcharging-pos` |
| `/work/medconnect-egypt` | ... | ... | ... | ... | `https://www.keplerdev.uk/work/medconnect-egypt` |
| `/work/stayease` | ... | ... | ... | ... | `https://www.keplerdev.uk/work/stayease` |
| `/work/classroom-sentinel` | ... | ... | ... | ... | `https://www.keplerdev.uk/work/classroom-sentinel` |

### `hreflang` & OpenGraph Contract
- `alternates.languages`: `en` → `https://www.keplerdev.uk/`, `ar` → `https://www.keplerdev.uk/ar`, `x-default` → `https://www.keplerdev.uk/`
- OpenGraph `1200x630` card copy: ...

---

## 3. Semantic Heading Hierarchy (`H1` → `H2` → `H3`) Across Core Routes

### A. Homepage (`/`)
- `H1`: ...
- `H2` sections: ...

### B. Work Index (`/work`)
- `H1`: ...
- `H2` sections: ...

### C. Services (`/services`)
- `H1`: ...
- `H2` sections: ...

### D. Studio (`/studio`)
- `H1`: ...
- `H2` sections: ...

### E. Contact (`/contact`)
- `H1`: ...
- `H2` sections: ...

---

## 4. AI Search (GEO) Citability & Query Fan-Out (`40–60 Words` Each)

### A. Top-of-Page GEO Studio Identity Block (`40–60 words`)
> ...

### B. 4 Self-Contained B2B FAQ Answer Blocks (`40–60 words` each)
1. **Q1: How does Kepler Dev scope and price custom software engagements?**
   > ...
2. **Q2: What kinds of operational, web, and mobile platforms does Kepler Dev build?**
   > ...
3. **Q3: How does Kepler Dev handle Arabic-first RTL, offline networks, and regional compliance?**
   > ...
4. **Q4: Who owns the source code, API contracts, and infrastructure after launch?**
   > ...

---

## 5. Production `@graph` `JSON-LD` Structured Data (Zero `Person` Entities)

```json
{
  "@context": "https://schema.org",
  "@graph": []
}
```

---

## 6. Copywriter & Frontend Engineer Handoff Rules

1. Preserve exact `<title>` and `<meta name="description">` strings per route.
2. Keep the Top-of-Page GEO Studio Identity Block and 4 FAQ answers within `40–60 words`.
3. Never add `@type: "Person"` or personal/founder attributions to JSON-LD or page copy.

---

## 7. Mandatory 7-Rule Self-Audit Checklist

| # | Check | Status (`PASS`/`FAIL`) | Concrete Evidence |
| :--- | :--- | :--- | :--- |
| **1** | **All 12 Route Metadata Rows Valid:** Every `<title>` is `45–60 chars` and `<meta description>` is `135–160 chars`. | `PASS` | Verified by `seo_audit.py` |
| **2** | **Canonical URLs Use `https://www.keplerdev.uk`:** All routes & `hreflang` alternates specified. | `PASS` | Section 2 |
| **3** | **GEO Blocks Are `40–60 Words`:** Identity block + 4 FAQ answers strictly within `40–60 words`. | `PASS` | Verified by `seo_audit.py` |
| **4** | **Valid `@graph` JSON-LD with Zero `Person` Entities:** Parses cleanly as JSON and contains `Organization`, `WebSite`, `Service`, and `FAQPage`. | `PASS` | Verified by `seo_audit.py` |
| **5** | **All 6 Flagship Case Study Routes Included:** `glitre-loyalty-platform`, `hs-vpn`, `quickcharging-pos`, `medconnect-egypt`, `stayease`, `classroom-sentinel`. | `PASS` | Section 2 & JSON-LD |
| **6** | **Standalone Studio Voice:** Zero `Mahmoud` or `founder` references. | `PASS` | Verified by `copy_audit.py` |
| **7** | **Zero Banned Words & Structural Slogans:** `copy_audit.py` exits `0`. | `PASS` | Exit code `0` |
