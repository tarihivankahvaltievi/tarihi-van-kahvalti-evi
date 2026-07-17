import menuDataJson from "./menu-data.json";

export type MenuCategoryId = string;
export type MenuFilterId = "all" | string;
export type MenuTag = "Öne çıkan" | "Tavsiye" | "Vejetaryen" | "Yeni" | string;

export type MenuCategory = {
  id: MenuCategoryId;
  label: string;
  shortLabel: string;
  description: string;
  image: string;
  imageAlt: string;
};

export type MenuItem = {
  id: string;
  category: MenuCategoryId;
  name: string;
  description: string;
  story: string;
  price: string;
  priceNote?: string;
  image: string;
  imageAlt: string;
  tags: MenuTag[];
  details: string[];
};

export const menuCategories = menuDataJson.categories as MenuCategory[];
export const menuItems = menuDataJson.items as MenuItem[];
export const menuLastUpdated = menuDataJson.lastUpdated;
