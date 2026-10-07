// Public identifiers, not credentials. An empty environment value disables a tag.
export const analyticsId = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID ?? "G-5F3FS1NCZR";
export const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID ?? "AW-17869229892";
export const analyticsOrigin = "https://www.tarihivankahvaltievi.com";

const publicPaths = new Set([
  "/", "/en", "/ko", "/zh-cn", "/es", "/menu", "/en/menu",
  "/rezervasyon", "/en/rezervasyon", "/konum", "/hikayemiz",
  "/van-kahvaltisi", "/van-kahvaltisi-nedir", "/gizlilik", "/cerez-politikasi",
  "/en/blog/turkish-breakfast-istanbul", "/en/blog/classic-turkish-breakfast",
  "/en/blog/simit-turkish-bagel", "/ru/blog/turetskiy-zavtrak-stambul",
  "/ar/blog/turkish-breakfast-istanbul", "/ko/blog/istanbul-bal-kaymak",
  "/ko/blog/kaymak-nedir", "/ko/blog/turkish-breakfast-istanbul",
  "/ko/blog/korean-tour-guide-van-breakfast", "/ko/blog/taksim-kahvalti-rehberi",
  "/zh-cn/blog/istanbul-bal-kaymak", "/zh-cn/blog/taksim-turkish-breakfast",
  "/ja/blog/istanbul-bal-kaymak", "/es/blog/desayuno-turco-clasico",
  "/es/blog/bal-kaymak-estambul",
]);

export function safePageLocation(value: string): string | null {
  try {
    const url = new URL(value);
    if (!["www.tarihivankahvaltievi.com", "tarihivankahvaltievi.com"].includes(url.hostname)) return null;
    if (url.protocol !== "https:" || !publicPaths.has(url.pathname)) return null;
    // Neither reservation tokens nor arbitrary query strings/fragments enter GA4.
    return `${analyticsOrigin}${url.pathname}`;
  } catch { return null; }
}

export function safeReferrer(value: string): string {
  if (!value) return "";
  try {
    const url = new URL(value);
    return safePageLocation(value) ?? (/^https?:$/.test(url.protocol) ? url.origin : "");
  } catch { return ""; }
}

/** Retain only Google's ad-click identifiers, never arbitrary form/query data. */
export function measurementPageLocation(value: string): string | null {
  const page = safePageLocation(value);
  if (!page) return null;
  const source = new URL(value);
  const destination = new URL(page);
  for (const key of ["gclid", "gbraid", "wbraid", "dclid"]) {
    const id = source.searchParams.get(key);
    if (id && /^[A-Za-z0-9_-]{1,512}$/.test(id)) destination.searchParams.set(key, id);
  }
  return destination.toString();
}

export type AnalyticsValue = string | number | boolean | undefined;
export type AnalyticsParameters = Record<string, AnalyticsValue>;

const safeKeys = new Set(["locale", "service_type", "contact_method", "method", "surface", "reservation_saved"]);
export function safeInteractionParameters(parameters: AnalyticsParameters): AnalyticsParameters {
  return Object.fromEntries(Object.entries(parameters).filter(([key, value]) => {
    if (!safeKeys.has(key)) return false;
    if (typeof value === "boolean") return key === "reservation_saved";
    return typeof value === "string" && /^[a-zA-Z0-9_-]{1,64}$/.test(value);
  }));
}

export function isBookingId(value: string): boolean {
  return /^(?:van-\d{8,13}-[a-f0-9]{24}|[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})$/i.test(value);
}

export async function bookingTransactionId(reservationId: string): Promise<string | undefined> {
  // The booking identifier also grants access to its calendar. Never send it raw.
  if (!isBookingId(reservationId)) return undefined;
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(`van-booking:${reservationId}`));
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}
