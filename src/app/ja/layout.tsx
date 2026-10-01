import { Noto_Sans_JP } from "next/font/google";
import { RootDocument } from "../root-document";
export { metadata, viewport } from "../root-document";

const localeFont = Noto_Sans_JP({
  subsets: ["latin"],
  weight: "variable", display: "swap", preload: false, variable: "--font-noto-sans-jp",
});

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <RootDocument locale="ja" fontClass={localeFont.variable}>{children}</RootDocument>;
}
