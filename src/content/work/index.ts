import { workEn } from "./en";
import type { WorkCopy } from "./types";

export type { WorkCopy } from "./types";

export type WorkLocale = "en";

/**
 * Work page copy by locale. To add Arabic: create ar.ts exporting a
 * WorkCopy (lang "ar", dir "rtl"), register it here, and render the work
 * page with it. The shape is the contract — TypeScript will not let a key
 * go missing.
 */
const copies: Record<WorkLocale, WorkCopy> = {
  en: workEn,
};

export function getWorkCopy(locale: WorkLocale = "en"): WorkCopy {
  return copies[locale];
}
