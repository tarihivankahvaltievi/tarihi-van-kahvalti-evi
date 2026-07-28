import menuDataJson from "./menu-data.json";

export type MenuCategoryId = string;
export type MenuFilterId = "all" | string;
export type MenuTag = "Öne çıkan" | "Tavsiye" | "Vejetaryen" | "Yeni" | string;

export type MenuCategoryTranslation = {
  label?: string;
  shortLabel?: string;
  description?: string;
  imageAlt?: string;
};

export type MenuItemTranslation = {
  name?: string;
  description?: string;
  story?: string;
  imageAlt?: string;
  details?: string[];
};

export type MenuCategory = {
  id: MenuCategoryId;
  label: string;
  shortLabel: string;
  description: string;
  image: string;
  imageAlt: string;
  translations?: {
    en?: MenuCategoryTranslation;
  };
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
  translations?: {
    en?: MenuItemTranslation;
  };
};

export const menuCategories = menuDataJson.categories as MenuCategory[];
export const menuItems = menuDataJson.items as MenuItem[];
export const menuLastUpdated = menuDataJson.lastUpdated;
