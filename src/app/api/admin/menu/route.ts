import { coffeeLocales, coffeePaths } from "@/app/coffee/coffee-localization";
import { readJsonObject, RequestError } from "@/app/api/request-security";
import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { isAdminAuthenticated } from "@/app/admin/auth-helper";
import { getMenuData, saveMenuData, type MenuData } from "@/app/menu/menu-storage";
import { publicMenuCacheTag } from "@/app/menu/public-menu-data";

const siteUrl = "https://www.tarihivankahvaltievi.com";
const indexNowKey = "4f9d1a7c8b6e3f205d72a941ce8b604a";

async function notifyMenuUpdate() {
  // Isolated integration tests must never submit fixture prices to IndexNow.
  if (process.env.INDEXNOW_DRY_RUN === "1") return;
  const response = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: new URL(siteUrl).host,
      key: indexNowKey,
      keyLocation: `${siteUrl}/${indexNowKey}.txt`,
      urlList: [...coffeeLocales.map((locale) => `${siteUrl}${coffeePaths[locale]}`), siteUrl, `${siteUrl}/en`, `${siteUrl}/menu`, `${siteUrl}/en/menu`, `${siteUrl}/van-kahvaltisi`, `${siteUrl}/rezervasyon`, `${siteUrl}/en/rezervasyon`],
    }),
    signal: AbortSignal.timeout(5000),
  });

  if (![200, 202].includes(response.status)) {
    throw new Error(`IndexNow HTTP ${response.status}`);
  }
}

export async function GET() {
  try {
    const data = await getMenuData();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Menu GET API error:", error);
    return NextResponse.json(
      { error: "Menü verileri alınamadı" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const authenticated = await isAdminAuthenticated();
    if (!authenticated) {
      return NextResponse.json(
        { error: "Yetkisiz işlem" },
        { status: 401 }
      );
    }

    const data = (await readJsonObject(request, 1024 * 1024)) as unknown as MenuData;

    // Reject corrupt records before they can break the menu, schema or GEO feed.
    const text = (value: unknown) => typeof value === "string" && value.length <= 10_000;
    if (!Array.isArray(data.categories) || !Array.isArray(data.items) ||
        !data.categories.length || data.categories.length > 100 || data.items.length > 1000 ||
        !text(data.lastUpdated) || !data.lastUpdated.trim() ||
        !data.categories.every((entry) => entry && [entry.id, entry.label, entry.shortLabel, entry.description, entry.image, entry.imageAlt].every(text)) ||
        !data.items.every((entry) => entry && [entry.id, entry.category, entry.name, entry.price, entry.description, entry.story, entry.image, entry.imageAlt].every(text) &&
          (entry.priceNote === undefined || text(entry.priceNote)) &&
          Array.isArray(entry.tags) && entry.tags.every(text) && Array.isArray(entry.details) && entry.details.every(text)) ||
        new Set(data.categories.map((entry) => entry.id)).size !== data.categories.length ||
        new Set(data.items.map((entry) => entry.id)).size !== data.items.length ||
        data.items.some((entry) => !data.categories.some((category) => category.id === entry.category))) {
      return NextResponse.json(
        { error: "Geçersiz menü verisi" },
        { status: 400 }
      );
    }

    const success = await saveMenuData(data);
    if (success) {
      revalidateTag(publicMenuCacheTag, { expire: 0 });
      for (const locale of coffeeLocales) revalidatePath(coffeePaths[locale]);
      revalidatePath("/menu");
      revalidatePath("/en/menu");
      revalidatePath("/van-kahvaltisi");
      revalidatePath("/");
      revalidatePath("/en");
      revalidatePath("/rezervasyon");
      revalidatePath("/en/rezervasyon");
      revalidatePath("/sitemap.xml");
      revalidatePath("/llms.txt");

      try {
        await notifyMenuUpdate();
      } catch (error) {
        // Menü kaydı başarılıysa arama motoru bildirimi geçici olarak başarısız
        // olsa bile yönetici işlemini geri çevirmeyin.
        console.error("IndexNow menu notification failed:", error);
      }

      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { error: "Veriler kaydedilemedi" },
      { status: 500 }
    );
  } catch (error) {
    if (error instanceof RequestError) return NextResponse.json({ error: error.message }, { status: error.status });
    console.error("Menu POST API error:", error);
    return NextResponse.json(
      { error: "Sunucu hatası" },
      { status: 500 }
    );
  }
}
