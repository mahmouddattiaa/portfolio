import { homeEn } from "./en";
import { homeAr } from "./ar";
import type { HomeCopy } from "./types";

export type { HomeCopy } from "./types";

export type HomeLocale = "en" | "ar";

/**
 * Homepage copy by locale. Both routes use the same renderer and the same
 * structural contract; only the copy object changes.
 */
const copies: Record<HomeLocale, HomeCopy> = {
  en: homeEn,
  ar: homeAr,
};

export function getHomeCopy(locale: HomeLocale = "en"): HomeCopy {
  return copies[locale];
}
