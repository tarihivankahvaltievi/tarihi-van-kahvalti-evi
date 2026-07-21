import type { Metadata } from "next";

// The administration interface is a utility surface, not public content.
// Keep this at the segment level so every future /admin route inherits it.
export const metadata: Metadata = {
  title: "Menü Yönetimi",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
