import type { Metadata } from "next";
import DynamicSeoPage, { generateMetadata as generateSeoMetadata } from "../[slug]/page";

const params = Promise.resolve({ slug: "arabic-breakfast-taksim" });

export function generateMetadata(): Promise<Metadata> {
  return generateSeoMetadata({ params });
}

export default function ArabicTouristBreakfastPage() {
  return <DynamicSeoPage params={params} />;
}
