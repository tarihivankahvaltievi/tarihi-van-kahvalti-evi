import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Tarihi Van Kahvaltı Evi",
    short_name: "Tarihi Van",
    description:
      "Beyoğlu Taksim'deki tarihi Rum binasında geleneksel serpme Van kahvaltısı ve Kafka Cafe deneyimi.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#8f171a",
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
  };
}
