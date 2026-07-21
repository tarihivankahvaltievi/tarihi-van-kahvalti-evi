import { Noto_Sans_JP } from "next/font/google";

const notoSansJp = Noto_Sans_JP({
  subsets: ["latin"],
  weight: "variable",
  display: "swap",
  variable: "--font-noto-sans-jp",
});

export default function JapaneseLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className={notoSansJp.variable}>{children}</div>;
}
