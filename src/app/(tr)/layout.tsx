import { RootDocument } from "../root-document";
export { metadata, viewport } from "../root-document";

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <RootDocument locale="tr">{children}</RootDocument>;
}
