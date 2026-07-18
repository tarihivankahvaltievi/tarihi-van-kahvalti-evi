import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/app/admin/auth-helper";
import { getMenuData, saveMenuData, type MenuData } from "@/app/menu/menu-storage";

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
