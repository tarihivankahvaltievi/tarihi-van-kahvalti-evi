import { Noto_Sans_KR } from "next/font/google";

const notoSansKr = Noto_Sans_KR({
  weight: "variable",
  display: "swap",
  preload: false,
  variable: "--font-noto-sans-kr",
});

export default function KoreanLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className={notoSansKr.variable}>{children}</div>;
}
