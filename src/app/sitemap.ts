import type { MetadataRoute } from "next";
import { connection } from "next/server";
import { getMenuData } from "./menu/menu-storage";
import {
  absoluteUrl,
  arabicBreakfastBlogUrl,
  breakfastCultureUrl,
  breakfastGuideUrl,
  cookiePolicyUrl,
  defaultOgImagePath,
  englishBreakfastBlogUrl,
  englishMenuUrl,
  englishUrl,
  koreanHoneyKaymakBlogUrl,
  locationUrl,
  menuUrl,
  privacyUrl,
  russianBreakfastBlogUrl,
  siteUrl,
  storyUrl,
} from "./seo";

// lastmod yalnız görünür ana içerik gerçekten değiştiğinde güncellenir.
// Her derlemede "şimdi" üretmek arama motorlarına yanıltıcı bir sinyal verir.
const pageLastModified = "2026-07-21T15:00:00+03:00";

const homeLanguageAlternates = {
  languages: {
    tr: siteUrl,
    en: englishUrl,
    "x-default": siteUrl,
  },
};

const menuLanguageAlternates = {
  languages: {
    tr: menuUrl,
    en: englishMenuUrl,
    "x-default": menuUrl,
  },
};

const internationalGuideAlternates = {
  languages: {
    en: englishBreakfastBlogUrl,
    ru: russianBreakfastBlogUrl,
    ar: arabicBreakfastBlogUrl,
    ko: koreanHoneyKaymakBlogUrl,
    "x-default": englishBreakfastBlogUrl,
  },
};

const internationalGuideImages = uniqueImages([
  "/images/og/van-kahvaltisi.jpg",
  "/images/hero-parallax/overhead-feast.webp",
  "/images/hands-table.webp",
  "/images/breakfast-spread.webp",
]);

const koreanHoneyKaymakImages = uniqueImages([
  "/images/og/istanbul-bal-kaymak.jpg",
  "/images/blog/istanbul-bal-kaymak.webp",
  "/images/blog/bal-kaymak-close-up.webp",
  "/images/hero-parallax/overhead-feast.webp",
  "/images/hands-table.webp",
]);

function uniqueImages(images: string[]) {
  return [...new Set(images.map((image) => absoluteUrl(image)))];
}

function menuLastModified(value: string) {
  const monthNumbers: Record<string, string> = {
    Ocak: "01", Şubat: "02", Mart: "03", Nisan: "04", Mayıs: "05", Haziran: "06",
    Temmuz: "07", Ağustos: "08", Eylül: "09", Ekim: "10", Kasım: "11", Aralık: "12",
  };
  const match = value.trim().match(/^(\d{1,2})\s+([^\s]+)\s+(\d{4})$/);
  const month = match ? monthNumbers[match[2]] : undefined;
  if (!match || !month) return pageLastModified;

  const parsed = `${match[3]}-${month}-${match[1].padStart(2, "0")}T12:00:00+03:00`;
  return Date.parse(parsed) > Date.parse(pageLastModified) ? parsed : pageLastModified;
}

const homeImages = uniqueImages([
  defaultOgImagePath,
  "/images/hero-table.jpg",
  "/images/breakfast-spread.webp",
  "/images/balcony-breakfast.webp",
  "/images/hands-table.webp",
  "/images/interior-chair.webp",
  "/images/tea-service.webp",
  "/images/historic-mirror.webp",
  "/images/terrace-tea.webp",
  "/images/coffee-moment.webp",
  "/images/street-table.webp",
  "/images/sucuk-egg.webp",
  "/images/hero-parallax/sucuk-egg-action.webp",
  "/images/hero-parallax/balcony-full.webp",
  "/images/hero-parallax/spread-close.webp",
  "/images/hero-parallax/table-pisi.webp",
  "/images/hero-parallax/historic-corner.webp",
  "/images/hero-parallax/overhead-feast.webp",
  "/images/hero-parallax/tea-tray.webp",
  "/images/hero-parallax/kavurma-pan.webp",
  "/images/hero-parallax/terrace-table.webp",
  "/images/hero-parallax/overhead-classic.webp",
  "/images/hero-float/sucuk-egg-pan.webp",
  "/images/hero-float/tea-glass.webp",
  "/images/hero-float/simit-board.webp",
  "/images/hero-float/omelette-plate.webp",
  "/images/hero-float/cheese-platter.webp",
  "/images/hero-float/greens-platter.webp",
  "/images/hero-float/black-olive-bowl.webp",
  "/images/hero-float/apricot-jam-bowl.webp",
]);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  await connection();
  const { categories, items, lastUpdated } = await getMenuData();
  const liveMenuLastModified = menuLastModified(lastUpdated);
  const menuImages = uniqueImages([
    "/images/og/menu.jpg",
    ...categories.map((category) => category.image),
    ...items.map((item) => item.image),
  ]);

  return [
    {
      url: siteUrl,
      lastModified: pageLastModified,
      images: homeImages,
      alternates: homeLanguageAlternates,
    },
    {
      url: menuUrl,
      lastModified: liveMenuLastModified,
      images: menuImages,
      alternates: menuLanguageAlternates,
    },
    {
      url: breakfastGuideUrl,
      lastModified: pageLastModified,
      images: uniqueImages([
        "/images/og/van-kahvaltisi.jpg",
        "/images/breakfast-spread.webp",
        "/images/hands-table.webp",
        "/images/hero-parallax/overhead-classic.webp",
      ]),
    },
    {
      url: breakfastCultureUrl,
      lastModified: pageLastModified,
      images: uniqueImages([
        "/images/og/van-kahvaltisi.jpg",
        "/images/hero-parallax/overhead-feast.webp",
        "/images/hero-parallax/spread-close.webp",
        "/images/kete-detail.jpg",
        "/images/hands-table.webp",
      ]),
    },
    {
      url: storyUrl,
      lastModified: pageLastModified,
      images: uniqueImages([
        "/images/historic-mirror.webp",
        "/images/interior-chair.webp",
        "/images/street-table.webp",
        "/images/hands-table.webp",
      ]),
    },
    {
      url: locationUrl,
      lastModified: pageLastModified,
      images: uniqueImages([
        "/images/street-table.webp",
        "/images/interior-chair.webp",
        "/images/historic-mirror.webp",
      ]),
    },
    {
      url: englishUrl,
      lastModified: pageLastModified,
      images: homeImages,
      alternates: homeLanguageAlternates,
    },
    {
      url: englishMenuUrl,
      lastModified: liveMenuLastModified,
      images: menuImages,
      alternates: menuLanguageAlternates,
    },
    {
      url: englishBreakfastBlogUrl,
      lastModified: pageLastModified,
      images: internationalGuideImages,
      alternates: internationalGuideAlternates,
    },
    {
      url: russianBreakfastBlogUrl,
      lastModified: pageLastModified,
      images: internationalGuideImages,
      alternates: internationalGuideAlternates,
    },
    {
      url: arabicBreakfastBlogUrl,
      lastModified: pageLastModified,
      images: internationalGuideImages,
      alternates: internationalGuideAlternates,
    },
    {
      url: koreanHoneyKaymakBlogUrl,
      lastModified: pageLastModified,
      images: koreanHoneyKaymakImages,
      alternates: internationalGuideAlternates,
    },
    {
      url: privacyUrl,
      lastModified: pageLastModified,
    },
    {
      url: cookiePolicyUrl,
      lastModified: pageLastModified,
    },
  ];
}
