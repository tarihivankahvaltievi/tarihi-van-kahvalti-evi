import { Noto_Naskh_Arabic } from "next/font/google";
import { RootDocument } from "../root-document";
export { metadata, viewport } from "../root-document";

const arabicFont = Noto_Naskh_Arabic({ subsets: ["arabic"], weight: "variable", display: "swap", preload: false, variable: "--font-coffee-arabic" });

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <RootDocument locale="ar" fontClass={arabicFont.variable}>{children}</RootDocument>;
}
