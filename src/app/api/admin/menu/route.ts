import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAdminAuthenticated } from "@/app/admin/auth-helper";
import { getMenuData, saveMenuData, type MenuData } from "@/app/menu/menu-storage";

const siteUrl = "https://www.tarihivankahvaltievi.com";
const indexNowKey = "4f9d1a7c8b6e3f205d72a941ce8b604a";

async function notifyMenuUpdate() {
  const response = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: new URL(siteUrl).host,
      key: indexNowKey,
      keyLocation: `${siteUrl}/${indexNowKey}.txt`,
      urlList: [`${siteUrl}/menu`, `${siteUrl}/en/menu`],
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

    const data = (await request.json()) as MenuData;

    // Basic validation
    if (!data.categories || !data.items || !data.lastUpdated) {
      return NextResponse.json(
        { error: "Geçersiz menü verisi" },
        { status: 400 }
      );
    }

    const success = await saveMenuData(data);
    if (success) {
      revalidatePath("/menu");
      revalidatePath("/en/menu");
      revalidatePath("/sitemap.xml");

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
    console.error("Menu POST API error:", error);
    return NextResponse.json(
      { error: "Sunucu hatası" },
      { status: 500 }
    );
  }
}
