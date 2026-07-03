import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#8f171a",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://tarihivankahvaltievi.com"),
  title: {
    default:
      "Tarihi Van Kahvaltı Evi | Taksim Beyoğlu – Serpme Van Kahvaltısı & Kafka Cafe",
    template: "%s | Tarihi Van Kahvaltı Evi",
  },
  description:
    "Beyoğlu Taksim'deki tarihi Rum binasında 1978'den beri süregelen geleneksel serpme Van kahvaltısı, otlu peynir, murtuğa, kavut ve Kafka Cafe kahve deneyimi. Zambak Sk. No:8 Beyoğlu, İstanbul.",
  keywords: [
    "Van kahvaltısı",
    "Tarihi Van Kahvaltı Evi",
    "Beyoğlu kahvaltı",
    "Taksim kahvaltı",
    "İstanbul kahvaltı",
    "serpme kahvaltı",
    "Van kahvaltı Beyoğlu",
    "Kafka Cafe",
    "otlu peynir",
    "murtuğa",
    "kavut",
    "tarihi Rum binası kahvaltı",
    "Zambak Sokak Beyoğlu",
    "geleneksel Türk kahvaltısı",
    "Turkish breakfast Istanbul",
    "Van breakfast Taksim",
  ],
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
    canonical: "https://tarihivankahvaltievi.com",
    languages: {
      "tr-TR": "https://tarihivankahvaltievi.com",
    },
  },
  openGraph: {
    title: "Tarihi Van Kahvaltı Evi | Beyoğlu Taksim",
    description:
      "1978'den beri tarihi Rum binasında geleneksel Van kahvaltısı ve Kafka Cafe kahve deneyimi. Beyoğlu'nun kalbinde serpme kahvaltı, otlu peynir, murtuğa ve kavut.",
    url: "https://tarihivankahvaltievi.com",
    siteName: "Tarihi Van Kahvaltı Evi",
    images: [
      {
        url: "/images/hero-table.jpg",
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
    images: ["/images/hero-table.jpg"],
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
  category: "restaurant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="h-full antialiased">
      <head>
        {/* DNS Prefetch & Preconnect — mobilde bağlantı gecikmesini ~100-300ms azaltır */}
        <link rel="dns-prefetch" href="https://www.google.com" />
        <link rel="dns-prefetch" href="https://wa.me" />
        <link rel="dns-prefetch" href="https://maps.googleapis.com" />
        <link rel="preconnect" href="https://www.google.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://wa.me" crossOrigin="anonymous" />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
