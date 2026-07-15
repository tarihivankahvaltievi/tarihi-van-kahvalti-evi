import type { MetadataRoute } from "next";
import { siteName, siteUrl } from "./seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteName,
    short_name: "Tarihi Van",
    description:
      "Beyoğlu Taksim'deki tarihi Rum binasında geleneksel serpme Van kahvaltısı, sınırsız çay ve Kafka Cafe deneyimi.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait-primary",
    background_color: "#ffffff",
    theme_color: "#8f171a",
    id: siteUrl,
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
    categories: ["food", "restaurant", "travel"],
    lang: "tr-TR",
    shortcuts: [
      {
        name: "Menü ve Fiyatlar",
        short_name: "Menü",
        description: "Serpme Van kahvaltısı, sıcaklar ve Kafka Cafe menüsü.",
        url: "/#menu",
        icons: [{ src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" }],
      },
      {
        name: "Yol Tarifi",
        short_name: "Konum",
        description: "Zambak Sokak Beyoğlu adresi ve Taksim metrodan yol tarifi.",
        url: "/#contact",
        icons: [{ src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" }],
      },
      {
        name: "Rezervasyon",
        short_name: "Rezervasyon",
        description: "Telefon ve WhatsApp ile kahvaltı rezervasyon bilgisi.",
        url: "/#contact",
        icons: [{ src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" }],
      },
    ],
  };
}
