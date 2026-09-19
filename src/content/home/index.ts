import { homeEn } from "./en";
import type { HomeCopy } from "./types";

export type { HomeCopy } from "./types";

export type HomeLocale = "en";

/**
 * Homepage copy by locale. To add Arabic: create ar.ts exporting a HomeCopy
 * (lang "ar", dir "rtl"), register it here, and render the homepage with it
 * from the /ar route. See README.md in this folder.
 */
const copies: Record<HomeLocale, HomeCopy> = {
  en: homeEn,
};

export function getHomeCopy(locale: HomeLocale = "en"): HomeCopy {
  return copies[locale];
}
