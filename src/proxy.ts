import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
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
  const { pathname, search } = request.nextUrl;
  const host = request.headers.get("host") || "";

  // 1. Apex domain -> www canonical redirect (HTTP 308)
  if (host === "tarihivankahvaltievi.com") {
    const destination = new URL(`${pathname}${search}`, siteUrl);
    return NextResponse.redirect(destination, 308);
  }

  // 2. Direct single-hop resolution for all legacy/redirected paths (eliminates redirect chains)
  const legacyTarget = redirectMap.get(pathname);
  if (legacyTarget) {
    const destination = new URL(`${legacyTarget}${search}`, request.url);
    return NextResponse.redirect(destination, 308);
  }

  // 3. Trailing slash normalization for standard pages:
  // Redirect /foo/ -> /foo directly in 1 hop (HTTP 308)
  if (pathname.length > 1 && pathname.endsWith("/")) {
    const cleanPath = pathname.slice(0, -1);
    const destination = new URL(`${cleanPath}${search}`, request.url);
    return NextResponse.redirect(destination, 308);
  }

  return NextResponse.next();
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
