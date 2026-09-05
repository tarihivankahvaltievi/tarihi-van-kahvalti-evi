import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Bodoni_Moda, Commissioner, Literata } from "next/font/google";
import "./globals.css";
import "./mobile-header-hero.css";
import "./desktop-refinement.css";
import "./hero-navbar-refinement.css";

const bodoni = Bodoni_Moda({
  subsets: ["latin", "latin-ext"],
  weight: "variable",
  style: ["normal", "italic"],
  axes: ["opsz"],
  display: "swap",
  preload: false,
  variable: "--font-bodoni-gf",
});
const literata = Literata({
  subsets: ["latin", "latin-ext"],
  weight: "variable",
  style: "normal",
  axes: ["opsz"],
  display: "swap",
  preload: false,
  variable: "--font-literata-gf",
});
const commissioner = Commissioner({
  subsets: ["latin", "latin-ext"],
  weight: "variable",
  axes: ["FLAR", "VOLM"],
  display: "swap",
  preload: false,
  variable: "--font-commissioner-gf",
});
import {
  defaultOgImage,
  homeDescription,
  homeOgDescription,
  homeTitle,
  coordinates,
  instagramUrl,
  address,
  siteName,
  siteUrl,
} from "./seo";

const googleSiteVerification =
  process.env.GOOGLE_SITE_VERIFICATION?.trim() ||
  "bse69yztCBveC7uXxZ7ZxdsC4RjIJjWpxb9tlcfkF7A";
const yandexSiteVerification = process.env.YANDEX_SITE_VERIFICATION?.trim();
const bingSiteVerification = process.env.BING_SITE_VERIFICATION?.trim();

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  colorScheme: "light",
  themeColor: "#7a1b22",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  title: {
    default: homeTitle,
    template: `%s | ${siteName}`,
  },
  description: homeDescription,
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  publisher: siteName,
  category: "restaurant",
  other: {
    "geo.region": "TR-34",
    "geo.placename": `${address.locality}, ${address.region}`,
    "geo.position": `${coordinates.latitude};${coordinates.longitude}`,
    ICBM: `${coordinates.latitude}, ${coordinates.longitude}`,
  },
  referrer: "strict-origin-when-cross-origin",
  formatDetection: {
    telephone: true,
    address: true,
    email: true,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // Webmaster araçlarının verdiği tam etiketi değil, yalnız content değerini
  // ilgili ortam değişkenine girin. Doğrulama etiketleri kalıcı tutulmalıdır.
  verification: {
    google: googleSiteVerification,
    yandex: yandexSiteVerification,
    other: bingSiteVerification
      ? { "msvalidate.01": bingSiteVerification }
      : undefined,
  },
  openGraph: {
    title: homeTitle,
    description: homeOgDescription,
    url: siteUrl,
    siteName,
    images: [
      {
        url: defaultOgImage,
        width: 1200,
        height: 630,
        alt: "Tarihi Van Kahvaltı Evi — Beyoğlu'nda geleneksel serpme Van kahvaltısı sofrası",
      },
    ],
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: homeTitle,
    description: homeOgDescription,
    images: [defaultOgImage],
  },
  icons: {
    icon: [
      { url: "/icons/favicon-brand.png", type: "image/png", sizes: "64x64" },
      { url: "/favicon.ico", type: "image/x-icon" },
      { url: "/icons/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icons/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [
      { url: "/icons/apple-touch-icon.png", type: "image/png", sizes: "180x180" },
    ],
    other: [
      {
        rel: "apple-touch-icon-precomposed",
        url: "/icons/apple-touch-icon.png",
      },
    ],
  },
  appleWebApp: {
    capable: true,
    title: siteName,
    statusBarStyle: "default",
  },
};

import { WebVitals } from "./components/web-vitals";
import { AnalyticsAutoTracker } from "./analytics";

const googleAdsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID ?? "AW-17869229892";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const webVitalsEndpoint = process.env.NEXT_PUBLIC_WEB_VITALS_ENDPOINT;

  return (
    <html lang="tr" className={`h-full antialiased ${bodoni.variable} ${literata.variable} ${commissioner.variable}`}>
      <head>
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${googleAdsId}`}
        />
        <Script
          id="google-ads-gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${googleAdsId}', {
                allow_enhanced_conversions: true
              });
            `,
          }}
        />
        <link rel="me" href={instagramUrl} />
      </head>
      <body className="min-h-full flex flex-col">
        <AnalyticsAutoTracker />
        {webVitalsEndpoint?.startsWith("/") && !webVitalsEndpoint.startsWith("//") ? (
          <WebVitals endpoint={webVitalsEndpoint} />
        ) : null}
        <a className="skip-link" href="#main-content">Ana içeriğe geç / Skip to content / 본문으로 건너뛰기</a>
        {children}
      </body>
    </html>
  );
}
