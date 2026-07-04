import type { Metadata } from "next";
import DynamicSeoPage, { generateMetadata as generateSeoMetadata } from "../[slug]/page";

const params = Promise.resolve({ slug: "zavtrak-taksim-stambul" });

export function generateMetadata(): Promise<Metadata> {
  return generateSeoMetadata({ params });
}

export default function RussianTouristBreakfastPage() {
  return <DynamicSeoPage params={params} />;
}
