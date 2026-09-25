import sharp from "sharp";
import { stat } from "node:fs/promises";

const SRC = "public/brand/founder-working-context-source.png";

const meta = await sharp(SRC).metadata();
console.log(`source: ${meta.width} x ${meta.height} · ${meta.format} · ratio ${(meta.width/meta.height).toFixed(3)}`);

// Desktop hero interlude: 10-col span, ~1600 wide.
const W_DESKTOP = 1600;
await sharp(SRC)
  .resize(W_DESKTOP, null, { withoutEnlargement: true })
  .webp({ quality: 82, effort: 6 })
  .toFile("public/brand/founder-working-context.webp");
const dStat = await stat("public/brand/founder-working-context.webp");
console.log(`webp desktop: ${W_DESKTOP}w max · ${(dStat.size / 1024).toFixed(1)} KB`);

// Mobile: actually smaller for bandwidth, same 3:2 crop (no aggressive portrait crop).
await sharp(SRC)
  .resize(1200, 800, { fit: "cover", position: "attention" })
  .webp({ quality: 80, effort: 6 })
  .toFile("public/brand/founder-working-context-mobile.webp");
const mStat = await stat("public/brand/founder-working-context-mobile.webp");
console.log(`webp mobile: 1200x800 · ${(mStat.size / 1024).toFixed(1)} KB`);

console.log("done");
