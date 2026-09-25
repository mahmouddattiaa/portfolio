import sharp from "sharp";
import { stat } from "node:fs/promises";

const SRC = "public/brand/founder-portrait-source.png";
const BASELINE = "public/brand/founder-portrait.jpg";
const WEBP = "public/brand/founder-portrait.webp";

const meta = await sharp(SRC).metadata();
console.log(`source: ${meta.width} x ${meta.height} · ${meta.format}`);

// Desktop hero crop: 4:5 portrait at 1024 wide.
const W_DESKTOP = 1024;
const H_DESKTOP = 1280;

// JPEG fallback, quality 82.
await sharp(SRC)
  .resize(W_DESKTOP, H_DESKTOP, { fit: "cover", position: "attention" })
  .jpeg({ quality: 82, mozjpeg: true, progressive: true })
  .toFile(BASELINE);
const jpgStat = await stat(BASELINE);
console.log(`jpeg: ${W_DESKTOP}x${H_DESKTOP} · ${(jpgStat.size / 1024).toFixed(1)} KB`);

// WebP, quality 82.
await sharp(SRC)
  .resize(W_DESKTOP, H_DESKTOP, { fit: "cover", position: "attention" })
  .webp({ quality: 82, effort: 6 })
  .toFile(WEBP);
const webpStat = await stat(WEBP);
console.log(`webp: ${W_DESKTOP}x${H_DESKTOP} · ${(webpStat.size / 1024).toFixed(1)} KB`);

// Mobile crop: 4:5 at 720 wide (smaller download on phones).
const W_MOBILE = 720;
const H_MOBILE = 900;
await sharp(SRC)
  .resize(W_MOBILE, H_MOBILE, { fit: "cover", position: "attention" })
  .webp({ quality: 80, effort: 6 })
  .toFile("public/brand/founder-portrait-mobile.webp");
const mobStat = await stat("public/brand/founder-portrait-mobile.webp");
console.log(`mobile webp: ${W_MOBILE}x${H_MOBILE} · ${(mobStat.size / 1024).toFixed(1)} KB`);

console.log("done");
