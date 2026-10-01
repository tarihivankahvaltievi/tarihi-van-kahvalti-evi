import { Noto_Sans_KR } from "next/font/google";
import { RootDocument } from "../root-document";
export { metadata, viewport } from "../root-document";

const localeFont = Noto_Sans_KR({
  weight: "variable", display: "swap", preload: false, variable: "--font-noto-sans-ko",
});

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <RootDocument locale="ko" fontClass={localeFont.variable}>{children}</RootDocument>;
}
