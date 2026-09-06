import type { NextConfig } from "next";
import { allLegacyRedirects, siteUrl } from "./src/app/seo";

const isDev = process.env.NODE_ENV !== "production";

const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  `script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.googleadservices.com https://googleads.g.doubleclick.net${isDev ? " 'unsafe-eval'" : ""}`,
  "script-src-attr 'none'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://*.supabase.co https://*.google-analytics.com https://*.googletagmanager.com https://www.googleadservices.com https://googleads.g.doubleclick.net https://*.google.com https://*.google.com.tr",
  "font-src 'self' data:",
  "connect-src 'self' https://*.supabase.co https://*.cartocdn.com https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://www.googleadservices.com https://googleads.g.doubleclick.net https://*.google.com https://*.google.com.tr",
  "frame-src 'none' https://bid.g.doubleclick.net",
  "manifest-src 'self'",
  "worker-src 'self' blob:",
  "upgrade-insecure-requests",
].join("; ");

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1"],
  devIndicators: false,
  cacheComponents: true,
  compress: true,
  poweredByHeader: false,
  skipTrailingSlashRedirect: true,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [65, 70, 74, 75, 78, 80, 82, 84],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host" as const, value: "tarihivankahvaltievi.com" }],
        destination: `${siteUrl}/:path*`,
        permanent: true,
      },
      ...allLegacyRedirects.flatMap((redirect) => {
        const clean = redirect.source.replace(/\/+$/, "");
        return [
          {
            source: clean,
            destination: redirect.destination,
            permanent: true,
          },
          {
            source: `${clean}/`,
            destination: redirect.destination,
            permanent: true,
          },
        ];
      }),
    ];
  },
  async rewrites() {
    return [
      {
        source: "/breakfast/taksim",
        destination: "/en",
      },
      {
        source: "/van-kahvaltisi/taksim",
        destination: "/van-kahvaltisi",
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=604800, stale-while-revalidate=2592000",
          },
        ],
      },
      {
        source: "/sitemap.xml",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=1800, s-maxage=3600, stale-while-revalidate=86400",
          },
          {
            key: "X-Robots-Tag",
            value: "all",
          },
        ],
      },
      {
        source: "/robots.txt",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
          },
          {
            key: "X-Robots-Tag",
            value: "all",
          },
        ],
      },
      {
        source: "/admin/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow, noarchive, noimageindex",
          },
          {
            key: "Cache-Control",
            value: "private, no-store, max-age=0",
          },
        ],
      },
      {
        source: "/api/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow, noarchive",
          },
          {
            key: "Cache-Control",
            value: "private, no-store, max-age=0",
          },
        ],
      },
      {
        source: "/manifest.webmanifest",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
          },
        ],
      },
      {
        source: "/en/:path*",
        headers: [
          {
            key: "Content-Language",
            value: "en",
          },
        ],
      },
      {
        source: "/ru/:path*",
        headers: [
          {
            key: "Content-Language",
            value: "ru",
          },
        ],
      },
      {
        source: "/ar/:path*",
        headers: [
          {
            key: "Content-Language",
            value: "ar",
          },
        ],
      },
      {
        source: "/ko/:path*",
        headers: [
          {
            key: "Content-Language",
            value: "ko",
          },
        ],
      },
      {
        source: "/ja/:path*",
        headers: [
          {
            key: "Content-Language",
            value: "ja",
          },
        ],
      },
      {
        source: "/llms.txt",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex",
          },
          {
            key: "Cache-Control",
            value: "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
          },
        ],
      },
      {
        source: "/:path*.(svg|ico)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
          {
            key: "X-Robots-Tag",
            value: "noindex",
          },
        ],
      },
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value:
              "accelerometer=(), autoplay=(), browsing-topics=(), camera=(), clipboard-read=(), clipboard-write=(), display-capture=(), encrypted-media=(), fullscreen=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), picture-in-picture=(), publickey-credentials-get=(), screen-wake-lock=(), usb=(), web-share=(), xr-spatial-tracking=()",
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
          {
            key: "Cross-Origin-Resource-Policy",
            value: "same-origin",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000",
          },
          {
            key: "X-Permitted-Cross-Domain-Policies",
            value: "none",
          },
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Content-Security-Policy",
            value: contentSecurityPolicy,
          },
        ],
      },
    ];
  },
};

export default nextConfig;
