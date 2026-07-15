import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import "./mobile-header-hero.css";

const bodoni = Bodoni_Moda({
  subsets: ["latin", "latin-ext"],
  weight: "variable",
  style: "normal",
  axes: ["opsz"],
  display: "swap",
  preload: false,
  variable: "--font-bodoni-gf",
});
const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ["latin", "latin-ext"],
  weight: "variable",
  axes: ["opsz"],
  display: "swap",
  preload: false,
  variable: "--font-bricolage-grotesque-gf",
});
import {
  defaultOgImage,
  sameAsUrls,
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
    default:
      "Van Kahvaltıcısı | Tarihi Van Kahvaltı Evi, Beyoğlu",
    template: `%s | ${siteName}`,
  },
  description:
    "Beyoğlu Taksim'de Van kahvaltısı: otlu peynir, murtuğa, kavut, sıcak sahanlar ve sınırsız çay. Menü, adres, yol tarifi ve rezervasyon.",
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
    title: "Van Kahvaltıcısı | Tarihi Van Kahvaltı Evi, Beyoğlu",
    description:
      "Beyoğlu Taksim'de geleneksel Van kahvaltısı; menü, adres, yol tarifi ve rezervasyon bilgileri.",
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
    title: "Van Kahvaltıcısı | Tarihi Van Kahvaltı Evi",
    description:
      "Beyoğlu Taksim'de Van kahvaltısı; otlu peynir, murtuğa, kavut ve sınırsız çay.",
    images: [defaultOgImage],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
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
    <html lang="tr" className={`h-full antialiased ${bodoni.variable} ${bricolageGrotesque.variable}`}>
      <head>
        <link rel="me" href={sameAsUrls[0]} />
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
