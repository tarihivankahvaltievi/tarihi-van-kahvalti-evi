import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { getMenuData } from "./menu-storage";

export const publicMenuCacheTag = "public-menu";

// Include real menu HTML in the prerendered shell, rather than a loading
// placeholder that needs a streaming script to become readable. Admin saves
// immediately expire this tag; the time limit also covers out-of-band edits.
export async function getPublicMenuData() {
  "use cache";
  cacheTag(publicMenuCacheTag);
  // Next 16.3 excludes stale < 30 seconds from prerenders, even when expire
  // is longer. Keep the minimum eligible lifetime so JS is not required.
  cacheLife({ stale: 30, revalidate: 60, expire: 300 });
  return getMenuData();
}
