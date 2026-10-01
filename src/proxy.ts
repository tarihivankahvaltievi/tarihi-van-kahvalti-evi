import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { siteLanguages } from "./app/site-languages";
import { allLegacyRedirects, siteUrl } from "./app/seo";

// Pre-computed map for instant O(1) single-hop lookups.
// Maps both "/path" and "/path/" directly to the destination URL.
const redirectMap = new Map<string, string>();
for (const rule of allLegacyRedirects) {
  const clean = rule.source.replace(/\/+$/, "");
  redirectMap.set(clean, rule.destination);
  redirectMap.set(`${clean}/`, rule.destination);
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const host = request.headers.get("host") || "";
  const cleanPath = pathname.replace(/\/+$/, "") || "/";
  const legacyTarget = redirectMap.get(cleanPath);
  const canonicalHost = host === "tarihivankahvaltievi.com";
  const obsoleteQuery = request.nextUrl.searchParams.has("wc-ajax");

  // Compute the final path, host and query together. Separate redirect rules
  // run before Proxy and would reintroduce intermediate legacy/slash URLs.
  if (canonicalHost || legacyTarget || cleanPath !== pathname || obsoleteQuery) {
    const destination = new URL(legacyTarget ?? cleanPath, canonicalHost ? siteUrl : request.url);
    const searchParams = new URLSearchParams(request.nextUrl.searchParams);
    searchParams.delete("wc-ajax");
    destination.search = searchParams.toString();
    return NextResponse.redirect(destination, 308);
  }

  const requestHeaders = new Headers(request.headers);
  const prefix = pathname.split("/")[1];
  requestHeaders.set("x-site-language", Object.hasOwn(siteLanguages, prefix) ? prefix : "tr");
  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - static assets with extensions (.svg, .png, .jpg, .jpeg, .gif, .webp, .avif, .ico, .txt, .xml, .json, .webmanifest)
     */
    "/((?!_next/static|_next/image|images/|icons/|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico|txt|xml|json|webmanifest)).*)",
  ],
};
