import { servicesEn } from "./en";
import type { ServicesCopy } from "./types";

export type { ServicesCopy } from "./types";

export type ServicesLocale = "en";

/**
 * Services page copy by locale. To add Arabic: create ar.ts exporting a
 * ServicesCopy (lang "ar", dir "rtl"), register it here, and render the
 * services page with it. The shape is the contract — TypeScript will not
 * let a key go missing.
 */
const copies: Record<ServicesLocale, ServicesCopy> = {
  en: servicesEn,
};

export function getServicesCopy(locale: ServicesLocale = "en"): ServicesCopy {
  return copies[locale];
}
