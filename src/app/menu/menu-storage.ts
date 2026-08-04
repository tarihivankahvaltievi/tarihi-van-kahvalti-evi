import fs from "fs/promises";
import path from "path";

export interface MenuCategory {
  id: string;
  label: string;
  shortLabel: string;
  description: string;
  image: string;
  imageAlt: string;
  translations?: {
    en?: {
      label?: string;
      shortLabel?: string;
      description?: string;
      imageAlt?: string;
    };
  };
}

export interface MenuItem {
  id: string;
  category: string;
  name: string;
  description: string;
  story: string;
  price: string;
  priceNote?: string;
  image: string;
  imageAlt: string;
  tags: string[];
  details: string[];
  translations?: {
    en?: {
      name?: string;
      description?: string;
      story?: string;
      imageAlt?: string;
      details?: string[];
    };
  };
}

export interface MenuData {
  categories: MenuCategory[];
  items: MenuItem[];
  lastUpdated: string;
}

const getLocalFilePath = () => path.join(process.cwd(), "src/app/menu/menu-data.json");

async function readLocalMenuData(): Promise<MenuData | null> {
  try {
    const rawData = await fs.readFile(getLocalFilePath(), "utf-8");
    return JSON.parse(rawData) as MenuData;
  } catch (error) {
    console.error("Error reading local menu-data.json:", error);
    return null;
  }
}

function mergeBundledImages(data: MenuData, bundledData: MenuData): MenuData {
  const bundledItems = new Map(bundledData.items.map((item) => [item.id, item]));

  return {
    ...data,
    items: data.items.map((item) => {
      const bundledItem = bundledItems.get(item.id);
      if (item.image || !bundledItem?.image) return item;

      return {
        ...item,
        image: bundledItem.image,
        imageAlt: item.imageAlt || bundledItem.imageAlt,
        translations: {
          ...item.translations,
          en: {
            ...item.translations?.en,
            imageAlt:
              item.translations?.en?.imageAlt ||
              bundledItem.translations?.en?.imageAlt,
          },
        },
      };
    }),
  };
}

// Helper to check if Supabase is configured
export function isSupabaseConfigured() {
  return !!(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

// Fetch from Supabase Rest API
async function fetchFromSupabase(): Promise<MenuData | null> {
  const url = `${process.env.SUPABASE_URL}/rest/v1/menu_state?select=data&limit=1`;
  try {
    const res = await fetch(url, {
      headers: {
        apikey: process.env.SUPABASE_SERVICE_ROLE_KEY || "",
        Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
      },
      next: { revalidate: 0 }, // Disable caching
    });
    if (!res.ok) {
      console.error("Supabase fetch failed", res.status, await res.text());
      return null;
    }
    const list = await res.json();
    if (list && list.length > 0) {
      return list[0].data as MenuData;
    }
  } catch (error) {
    console.error("Error fetching from Supabase:", error);
  }
  return null;
}

// Save to Supabase Rest API (Upsert)
async function saveToSupabase(data: MenuData): Promise<boolean> {
  const url = `${process.env.SUPABASE_URL}/rest/v1/menu_state`;
  try {
    // We assume the row has a fixed id (e.g. 1) to upsert
    const res = await fetch(url, {
      method: "POST",
      headers: {
        apikey: process.env.SUPABASE_SERVICE_ROLE_KEY || "",
        Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
        "Content-Type": "application/json",
        Prefer: "resolution=merge-duplicates",
      },
      body: JSON.stringify({ id: 1, data }),
    });
    if (!res.ok) {
      console.error("Supabase upsert failed", res.status, await res.text());
      return false;
    }
    return true;
  } catch (error) {
    console.error("Error saving to Supabase:", error);
    return false;
  }
}

export async function getMenuData(): Promise<MenuData> {
  const bundledData = await readLocalMenuData();

  // Try Supabase first if configured
  if (isSupabaseConfigured()) {
    const data = await fetchFromSupabase();
    if (data) return bundledData ? mergeBundledImages(data, bundledData) : data;
  }

  // Fallback to local file system
  return bundledData || { categories: [], items: [], lastUpdated: "" };
}

export async function saveMenuData(data: MenuData): Promise<boolean> {
  if (isSupabaseConfigured()) {
    const supabaseSuccess = await saveToSupabase(data);
    // Try to write locally as well for backup/dev, but ignore errors on read-only systems
    try {
      const filePath = getLocalFilePath();
      const formattedJson = JSON.stringify(data, null, 2);
      await fs.writeFile(filePath, formattedJson, "utf-8");
    } catch {
      // Ignore read-only filesystem errors on Vercel/serverless
    }
    return supabaseSuccess;
  }

  // Local only flow
  try {
    const filePath = getLocalFilePath();
    const formattedJson = JSON.stringify(data, null, 2);
    await fs.writeFile(filePath, formattedJson, "utf-8");
    return true;
  } catch (error) {
    console.error("Error writing local menu-data.json:", error);
    return false;
  }
}
