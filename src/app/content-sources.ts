// Birincil kamu kaynakları tek yerde tutulur; görünür kaynak bağlantıları ve
// JSON-LD entity/citation ilişkileri aynı URL'leri kullanmalıdır.
export const vanBreakfastSources = {
  vanBreakfast:
    "https://ci.turkpatent.gov.tr/Files/GeographicalSigns/26210cd7-fc2e-44fa-869e-889ee83c71f2.pdf",
  herbCheese: "https://www.kulturportali.gov.tr/turkiye/van/nealinir/van-otlu-peyniri",
  murtuga: "https://kulturportali.gov.tr/turkiye/van/neyenir/murtuga",
  murtugaRegistration: "https://ci.turkpatent.gov.tr/cografi-isaretler/detay/38298",
  kavut: "https://www.kulturportali.gov.tr/turkiye/van/neyenir/gavut",
  kavutRegistration:
    "https://ci.turkpatent.gov.tr/Files/GeographicalSigns/026861b9-c7d0-4a7a-9910-3ac03a16bcd7.pdf",
} as const;

export const coreVanBreakfastCitations = [
  vanBreakfastSources.vanBreakfast,
  vanBreakfastSources.herbCheese,
  vanBreakfastSources.murtuga,
  vanBreakfastSources.kavutRegistration,
] as const;

export const kaymakSources = {
  afyonKaymakRegistration: "https://ci.turkpatent.gov.tr/cografi-isaretler/detay/37936",
  afyonKaymakCulturePortal:
    "https://kulturportali.gov.tr/turkiye/afyonkarahisar/nealinir/afyon-kaymagi",
  turkishBreakfastGoTurkiye: "https://gastronomy.goturkiye.com/turkish-breakfast",
  istanbulBreakfastGoTurkiye: "https://goturkiye.com/istanbul/the-banquet-breakfast",
} as const;
