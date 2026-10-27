import { LocalizedCoffeePage, coffeeMetadata } from "../../coffee/coffee-page";

// Shared URL-aware navigation is rendered as one complete static page.
export const instant = false;
export const metadata = coffeeMetadata("zh-cn");

export default function Page() {
  return <LocalizedCoffeePage locale="zh-cn" />;
}
