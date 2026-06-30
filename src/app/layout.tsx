import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://tarihivankahvaltievi.com"),
  title: {
    default: "Tarihi Van Kahvaltı Evi | Taksim Beyoğlu",
    template: "%s | Tarihi Van Kahvaltı Evi",
  },
  description:
    "Taksim’in tarihi Rum binasında Van kahvaltısı, Kafka Cafe kahve deneyimi ve Beyoğlu’nun sakin atmosferi.",
  openGraph: {
    title: "Tarihi Van Kahvaltı Evi",
    description:
      "Beyoğlu’nda tarihi atmosferde geleneksel Van kahvaltısı ve kahve deneyimi.",
    images: ["/images/hero-table.jpg"],
    locale: "tr_TR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
