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
        src: "/images/brand-icon-small.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    categories: ["food", "restaurant", "travel"],
    lang: "tr-TR",
  };
}
