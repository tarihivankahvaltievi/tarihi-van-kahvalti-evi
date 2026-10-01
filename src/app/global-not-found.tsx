import type { Metadata } from "next";
import { headers } from "next/headers";
import { LocalizedNotFound } from "./components/localized-not-found";
import { siteLanguages, type SiteLanguage } from "./site-languages";

export const instant = false;

export const metadata: Metadata = {
  title: "404 | Tarihi Van Kahvaltı Evi",
  robots: { index: false, follow: false },
};

// Only the unmatched-route document reads the request. Public root layouts
// remain static. Proxy overwrites this internal header from the URL prefix.
export default async function GlobalNotFound() {
  const requestHeaders = await headers();
  const candidate = requestHeaders.get("x-site-language") ?? "tr";
  const locale: SiteLanguage = Object.hasOwn(siteLanguages, candidate) ? candidate as SiteLanguage : "tr";
  return (
    <html lang={siteLanguages[locale].lang} dir={siteLanguages[locale].dir}>
      <body style={{ margin: 0, background: "#faf6f0", color: "#402021", fontFamily: "system-ui, sans-serif" }}>
        <LocalizedNotFound locale={locale} />
      </body>
    </html>
  );
}
