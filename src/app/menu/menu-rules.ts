import type { MenuLocale } from "./menu-localization";

// Confirmed by the business owner on 1 October 2026. Prices continue to
// come from the editable live menu; this rule must not freeze a price.
export function getMenuOrderNote(itemId: string, locale: MenuLocale): string | undefined {
  if (itemId !== "serpme-fix-menu") return undefined;
  return locale === "en" ? "Minimum 2 people." : "Minimum 2 kişi için servis edilir.";
}
