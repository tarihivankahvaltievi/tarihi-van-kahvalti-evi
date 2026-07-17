import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Bricolage_Grotesque, Literata } from "next/font/google";
import "./globals.css";
import "./mobile-header-hero.css";

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
  variable: "--font-literata-gf",
});
const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ["latin", "latin-ext"],
  weight: "variable",
  axes: ["opsz", "wdth"],
  display: "swap",
  preload: false,
  variable: "--font-bricolage-grotesque-gf",
});
import {
  defaultOgImage,
  homeDescription,
  homeOgDescription,
  homeTitle,
  instagramUrl,
  siteName,
  siteUrl,
} from "./seo";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#8f171a",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const webVitalsEndpoint = process.env.NEXT_PUBLIC_WEB_VITALS_ENDPOINT;

  return (
    <html lang="tr" className={`h-full antialiased ${bodoni.variable} ${literata.variable} ${bricolageGrotesque.variable}`}>
      <head>
        <link rel="me" href={instagramUrl} />
      </head>
      <body className="min-h-full flex flex-col">
        {webVitalsEndpoint?.startsWith("/") && !webVitalsEndpoint.startsWith("//") ? (
          <WebVitals endpoint={webVitalsEndpoint} />
        ) : null}
        <a className="skip-link" href="#main-content">Ana içeriğe geç</a>
        {children}
      </body>
    </html>
  );
}
