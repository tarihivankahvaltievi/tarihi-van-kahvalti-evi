import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Cormorant_Garamond, Libre_Caslon_Display, Literata, Playfair_Display } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-playfair-gf",
});
const cormorant = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700"],
  display: "swap",
  variable: "--font-cormorant-gf",
});
const bodoni = Bodoni_Moda({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
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
const libreCaslonDisplay = Libre_Caslon_Display({
  subsets: ["latin", "latin-ext"],
  weight: "400",
  display: "swap",
  variable: "--font-libre-caslon-display-gf",
});
import {
  address,
  coordinates,
  defaultOgImage,
  displayPhone,
  email,
  homeLanguageAlternates,
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
      "Tarihi Van Kahvaltı Evi | Taksim Beyoğlu Serpme Van Kahvaltısı",
    template: `%s | ${siteName}`,
  },
  description:
    "Beyoğlu Taksim'deki tarihi Rum binasında 1978'den beri geleneksel serpme Van kahvaltısı, otlu peynir, murtuğa, kavut, sınırsız çay ve Kafka Cafe. Zambak Sk. No:8, Şehit Muhtar, Beyoğlu 34435.",
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
  alternates: {
    canonical: siteUrl,
    languages: homeLanguageAlternates,
  },
  openGraph: {
    title: "Tarihi Van Kahvaltı Evi | Beyoğlu Taksim",
    description:
      "1978'den beri tarihi Rum binasında geleneksel Van kahvaltısı, otlu peynir, murtuğa, kavut, sınırsız çay ve Kafka Cafe.",
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
    title: "Tarihi Van Kahvaltı Evi | Beyoğlu Taksim",
    description:
      "1978'den beri tarihi Rum binasında Van kahvaltısı. Otlu peynir, murtuğa, kavut ve sınırsız çay.",
    images: [defaultOgImage],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/images/brand-icon-small.png", type: "image/png" },
    ],
    apple: [
      { url: "/images/brand-icon-small.png" },
    ],
    other: [
      {
        rel: "apple-touch-icon-precomposed",
        url: "/images/brand-icon-small.png",
      },
    ],
  },
  other: {
    "content-language": "tr, en, ru, ar",
    "geo.country": address.country,
    "geo.region": "TR-34",
    "geo.placename": "Beyoğlu, İstanbul",
    "geo.position": `${coordinates.latitude};${coordinates.longitude}`,
    ICBM: `${coordinates.latitude}, ${coordinates.longitude}`,
    placename: "Taksim, Beyoğlu, İstanbul",
    "place:location:latitude": String(coordinates.latitude),
    "place:location:longitude": String(coordinates.longitude),
    "business:contact_data:street_address": address.streetAddress,
    "business:contact_data:locality": address.locality,
    "business:contact_data:region": address.region,
    "business:contact_data:postal_code": address.postalCode,
    "business:contact_data:country_name": address.countryName,
    "business:contact_data:phone_number": displayPhone,
    "business:contact_data:email": email,
    "business:contact_data:website": siteUrl,
    "og:phone_number": displayPhone,
    "og:street-address": address.streetAddress,
    "og:locality": address.locality,
    "og:region": address.region,
    "og:postal-code": address.postalCode,
    "og:country-name": address.countryName,
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
  return (
    <html lang="tr" className={`h-full antialiased ${playfair.variable} ${cormorant.variable} ${bodoni.variable} ${literata.variable} ${libreCaslonDisplay.variable}`}>
      <head>
        <link rel="dns-prefetch" href="https://www.google.com" />
        <link rel="dns-prefetch" href="https://wa.me" />
        <link rel="dns-prefetch" href="https://maps.googleapis.com" />
        <link rel="alternate" type="text/plain" href="/llms.txt" title="AI kısa işletme özeti" />
        <link rel="alternate" type="text/plain" href="/llms-full.txt" title="AI detaylı işletme özeti" />
        <link rel="alternate" type="application/json" href="/business-profile.json" title="Makine okunur işletme profili" />
        <link rel="me" href={sameAsUrls[0]} />
      </head>
      <body className="min-h-full flex flex-col">
        <WebVitals />
        {children}
      </body>
    </html>
  );
}
