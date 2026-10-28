import { request as httpRequest } from "node:http";
import { request as httpsRequest } from "node:https";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const baseUrl = process.env.SEO_TEST_BASE_URL ?? "http://127.0.0.1:3100";
const canonicalSiteUrl = "https://www.tarihivankahvaltievi.com";
const menuPageUrl = `${canonicalSiteUrl}/menu`;
const englishPageUrl = `${canonicalSiteUrl}/en`;
const koreanPageUrl = `${canonicalSiteUrl}/ko`;
const englishMenuPageUrl = `${englishPageUrl}/menu`;
const reservationPageUrl = `${canonicalSiteUrl}/rezervasyon`;
const englishReservationPageUrl = `${englishPageUrl}/rezervasyon`;
const guidePageUrl = `${canonicalSiteUrl}/van-kahvaltisi`;
const culturePageUrl = `${canonicalSiteUrl}/van-kahvaltisi-nedir`;
const englishBreakfastBlogUrl = `${canonicalSiteUrl}/en/blog/turkish-breakfast-istanbul`;
const russianBreakfastBlogUrl = `${canonicalSiteUrl}/ru/blog/turetskiy-zavtrak-stambul`;
const arabicBreakfastBlogUrl = `${canonicalSiteUrl}/ar/blog/turkish-breakfast-istanbul`;
const koreanHoneyKaymakBlogUrl = `${canonicalSiteUrl}/ko/blog/istanbul-bal-kaymak`;
const koreanKaymakExplainerUrl = `${canonicalSiteUrl}/ko/blog/kaymak-nedir`;
const koreanTurkishBreakfastBlogUrl = `${canonicalSiteUrl}/ko/blog/turkish-breakfast-istanbul`;
const japaneseHoneyKaymakBlogUrl = `${canonicalSiteUrl}/ja/blog/istanbul-bal-kaymak`;
const chineseHomeUrl = `${canonicalSiteUrl}/zh-cn`;
const chineseHoneyKaymakBlogUrl = `${canonicalSiteUrl}/zh-cn/blog/istanbul-bal-kaymak`;
const chineseTaksimBreakfastBlogUrl = `${canonicalSiteUrl}/zh-cn/blog/taksim-turkish-breakfast`;
const koreanTourGuideBreakfastBlogUrl = `${canonicalSiteUrl}/ko/blog/korean-tour-guide-van-breakfast`;
const koreanTaksimBreakfastBlogUrl = `${canonicalSiteUrl}/ko/blog/taksim-kahvalti-rehberi`;
const spanishHomeUrl = `${canonicalSiteUrl}/es`;
const englishClassicBreakfastBlogUrl = `${canonicalSiteUrl}/en/blog/classic-turkish-breakfast`;
const englishSimitBlogUrl = `${canonicalSiteUrl}/en/blog/simit-turkish-bagel`;
const spanishClassicBreakfastBlogUrl = `${canonicalSiteUrl}/es/blog/desayuno-turco-clasico`;
const spanishHoneyKaymakBlogUrl = `${canonicalSiteUrl}/es/blog/bal-kaymak-estambul`;
const storyPageUrl = `${canonicalSiteUrl}/hikayemiz`;
const privacyPageUrl = `${canonicalSiteUrl}/gizlilik`;
const cookiePolicyPageUrl = `${canonicalSiteUrl}/cerez-politikasi`;
const expectedGoogleVerification = process.env.SEO_EXPECT_GOOGLE_SITE_VERIFICATION?.trim();
const expectedYandexVerification = process.env.SEO_EXPECT_YANDEX_SITE_VERIFICATION?.trim();
const expectedBingVerification = process.env.SEO_EXPECT_BING_SITE_VERIFICATION?.trim();

const homeHreflang = {
  tr: canonicalSiteUrl,
  en: englishPageUrl,
  "x-default": canonicalSiteUrl,
};

const menuHreflang = {
  tr: menuPageUrl,
  en: englishMenuPageUrl,
  "x-default": menuPageUrl,
};

const reservationHreflang = {
  tr: reservationPageUrl,
  en: englishReservationPageUrl,
  "x-default": reservationPageUrl,
};

const internationalGuideHreflang = {
  en: englishBreakfastBlogUrl,
  ru: russianBreakfastBlogUrl,
  ar: arabicBreakfastBlogUrl,
  ko: koreanTurkishBreakfastBlogUrl,
  "x-default": englishBreakfastBlogUrl,
};

const honeyKaymakHreflang = {
  ko: koreanHoneyKaymakBlogUrl,
  ja: japaneseHoneyKaymakBlogUrl,
  "zh-CN": chineseHoneyKaymakBlogUrl,
  es: spanishHoneyKaymakBlogUrl,
};

const taksimHreflang = { ko: koreanTaksimBreakfastBlogUrl, "zh-CN": chineseTaksimBreakfastBlogUrl };
const classicBreakfastHreflang = { en: englishClassicBreakfastBlogUrl, es: spanishClassicBreakfastBlogUrl };
const newRoutes = [
  { path: "/zh-cn", canonical: chineseHomeUrl, language: "zh-CN", signals: ["塔克西姆", "蜂蜜奶皮", "Van 早餐"], links: ["/zh-cn/blog/istanbul-bal-kaymak", "/zh-cn/blog/taksim-turkish-breakfast"] },
  { path: "/zh-cn/blog/istanbul-bal-kaymak", canonical: chineseHoneyKaymakBlogUrl, language: "zh-CN", signals: ["Bal Kaymak", "奶皮", "塔克西姆"], hreflang: honeyKaymakHreflang, citations: 2 },
  { path: "/zh-cn/blog/taksim-turkish-breakfast", canonical: chineseTaksimBreakfastBlogUrl, language: "zh-CN", signals: ["serpme kahvaltı", "Van 早餐", "蜂蜜奶皮"], hreflang: taksimHreflang, citations: 4 },
  { path: "/ko/blog/korean-tour-guide-van-breakfast", canonical: koreanTourGuideBreakfastBlogUrl, language: "ko", signals: ["투어 가이드", "허브 치즈", "메네멘"], links: ["/en/menu", "/ko/blog/turkish-breakfast-istanbul"] },
  { path: "/ko/blog/taksim-kahvalti-rehberi", canonical: koreanTaksimBreakfastBlogUrl, language: "ko", languageTag: "ko-KR", signals: ["탁심", "발 카이막", "반식"], hreflang: taksimHreflang, citations: 3 },
  { path: "/es", canonical: spanishHomeUrl, language: "es", signals: ["desayuno turco", "Taksim", "kaymak"], links: ["/es/blog/desayuno-turco-clasico", "/es/blog/bal-kaymak-estambul"] },
  { path: "/en/blog/classic-turkish-breakfast", canonical: englishClassicBreakfastBlogUrl, language: "en", languageTag: "en-GB", signals: ["full English", "menemen", "simit", "Van breakfast"], hreflang: classicBreakfastHreflang, citations: 3 },
  { path: "/en/blog/simit-turkish-bagel", canonical: englishSimitBlogUrl, language: "en", languageTag: "en-GB", signals: ["simit", "bagel", "sesame", "do not list it as a guaranteed menu item"], citations: 2 },
  { path: "/es/blog/desayuno-turco-clasico", canonical: spanishClassicBreakfastBlogUrl, language: "es", signals: ["desayuno turco", "menemen", "simit", "kaymak"], hreflang: classicBreakfastHreflang, citations: 3 },
  { path: "/es/blog/bal-kaymak-estambul", canonical: spanishHoneyKaymakBlogUrl, language: "es", signals: ["bal kaymak", "Taksim", "leche de vaca"], hreflang: honeyKaymakHreflang, citations: 2 },
];

const coffeeLanguages = {
  tr: `${canonicalSiteUrl}/taksim-kafe`,
  en: `${canonicalSiteUrl}/en/coffee-taksim`,
  ru: `${canonicalSiteUrl}/ru/coffee-taksim`,
  ar: `${canonicalSiteUrl}/ar/coffee-taksim`,
  ko: `${canonicalSiteUrl}/ko/coffee-taksim`,
  "zh-CN": `${canonicalSiteUrl}/zh-cn/coffee-taksim`,
  "x-default": `${canonicalSiteUrl}/taksim-kafe`,
};
const coffeeRoutes = [
  { path: "/taksim-kafe", language: "tr", visibleSignals: ["kahve", "beyoğlu", "taksim", "zambak"] },
  { path: "/en/coffee-taksim", language: "en", visibleSignals: ["coffee", "taksim", "english menu", "zambak"] },
  { path: "/ru/coffee-taksim", language: "ru", visibleSignals: ["кофе", "таксим", "английском", "zambak"] },
  { path: "/ar/coffee-taksim", language: "ar", direction: "rtl", visibleSignals: ["قهوة", "تقسيم", "الإنجليزية", "zambak"] },
  { path: "/ko/coffee-taksim", language: "ko", visibleSignals: ["커피", "탁심", "영문 메뉴", "zambak"] },
  { path: "/zh-cn/coffee-taksim", language: "zh-CN", visibleSignals: ["咖啡", "塔克西姆", "英文菜单", "zambak"] },
].map((route) => ({ ...route, canonical: `${canonicalSiteUrl}${route.path}`, faqCount: 0,
  types: ["Restaurant", "WebPage", "BreadcrumbList", "ItemList"], restaurantMenu: `${menuPageUrl}#menu`, hreflang: coffeeLanguages,
}));

const routes = [
  ...coffeeRoutes,
  {
    path: "/",
    canonical: canonicalSiteUrl,
    language: "tr",
    types: ["WebSite", "Restaurant", "WebPage", "FAQPage"],
    restaurantMenu: `${menuPageUrl}#menu`,
    faqCount: 13,
    sharedHomeDesign: true,
    visibleSignals: ["van kahvaltı evi", "beyoğlu", "taksim", "serpme kahvaltı"],
    hreflang: homeHreflang,
  },
  {
    path: "/menu",
    canonical: menuPageUrl,
    language: "tr",
    types: ["Restaurant", "WebPage", "BreadcrumbList", "FAQPage", "Menu"],
    restaurantMenu: `${menuPageUrl}#menu`,
    faqCount: 7,
    menuSectionCount: 18,
    sharedMenuDesign: true,
    visibleSignals: ["menü", "serpme fix menü", "murtuğa", "türk kahvesi"],
    hreflang: menuHreflang,
  },
  {
    path: "/rezervasyon",
    canonical: reservationPageUrl,
    language: "tr",
    types: ["Restaurant", "WebPage", "BreadcrumbList", "FAQPage"],
    restaurantMenu: `${menuPageUrl}#menu`,
    faqCount: 10,
    visibleSignals: ["masa rezervasyonu", "beyoğlu", "zambak sokak", "taksim meydanı"],
    hreflang: reservationHreflang,
    reservationPage: true,
  },
  {
    path: "/en/rezervasyon",
    canonical: englishReservationPageUrl,
    language: "en",
    languageTag: "en-US",
    types: ["Restaurant", "WebPage", "BreadcrumbList", "FAQPage"],
    restaurantMenu: `${menuPageUrl}#menu`,
    faqCount: 10,
    visibleSignals: ["table reservation", "beyoğlu", "zambak street", "taksim square"],
    hreflang: reservationHreflang,
    reservationPage: true,
  },
  {
    path: "/van-kahvaltisi",
    canonical: guidePageUrl,
    language: "tr",
    types: ["Restaurant", "WebPage", "BreadcrumbList", "FAQPage"],
    restaurantMenu: `${menuPageUrl}#menu`,
    faqCount: 6,
    visibleSignals: ["van kahvaltısı", "otlu peynir", "murtuğa", "kavut", "taksim"],
  },
  {
    path: "/van-kahvaltisi-nedir",
    canonical: culturePageUrl,
    language: "tr",
    types: ["Restaurant", "WebPage", "BreadcrumbList", "FAQPage"],
    restaurantMenu: `${menuPageUrl}#menu`,
    faqCount: 6,
    visibleSignals: ["van kahvaltısı nedir", "1947", "coğrafi işaret", "otlu peyniri", "murtuğa", "van kavut"],
  },
  {
    path: "/hikayemiz",
    canonical: storyPageUrl,
    language: "tr",
    types: ["Restaurant", "AboutPage", "BreadcrumbList"],
    restaurantMenu: `${menuPageUrl}#menu`,
    faqCount: 0,
    visibleSignals: ["1978", "aile sofrası", "zambak sokak", "beyoğlu"],
  },
  {
    path: "/konum",
    canonical: `${canonicalSiteUrl}/konum`,
    language: "tr",
    types: ["Restaurant", "WebPage", "BreadcrumbList", "FAQPage"],
    restaurantMenu: `${menuPageUrl}#menu`,
    faqCount: 5,
    visibleSignals: ["zambak sokak", "taksim", "beyoğlu", "yol tarifi"],
  },
  {
    path: "/en",
    canonical: englishPageUrl,
    language: "en",
    types: ["Restaurant", "WebPage", "BreadcrumbList", "FAQPage"],
    restaurantMenu: `${menuPageUrl}#menu`,
    faqCount: 9,
    sharedHomeDesign: true,
    visibleSignals: ["traditional turkish breakfast", "taksim", "van breakfast", "view menu"],
    hreflang: homeHreflang,
  },
  {
    path: "/en/menu",
    canonical: englishMenuPageUrl,
    language: "en",
    types: ["Restaurant", "WebPage", "BreadcrumbList", "FAQPage", "Menu"],
    restaurantMenu: `${menuPageUrl}#menu`,
    faqCount: 7,
    menuSectionCount: 18,
    sharedMenuDesign: true,
    visibleSignals: ["serpme fix menu", "prices", "murtuğa", "taksim"],
    hreflang: menuHreflang,
  },
  {
    path: "/ko",
    canonical: koreanPageUrl,
    language: "ko",
    languageTag: "ko-KR",
    types: ["Restaurant", ["WebPage", "CollectionPage"], "BreadcrumbList", "FAQPage"],
    restaurantMenu: `${menuPageUrl}#menu`,
    faqCount: 5,
    visibleSignals: ["발 카이막", "카이막", "터키식 아침 식사", "탁심", "1978"],
  },
  {
    path: "/en/blog/turkish-breakfast-istanbul",
    canonical: englishBreakfastBlogUrl,
    language: "en",
    types: ["Restaurant", "BlogPosting", "WebPage", "BreadcrumbList", "FAQPage"],
    restaurantMenu: `${menuPageUrl}#menu`,
    faqCount: 6,
    sharedGuideDesign: true,
    visibleSignals: ["turkish breakfast", "van breakfast", "taksim", "murtuğa", "since 1978"],
    hreflang: internationalGuideHreflang,
    sourcedGuide: true,
    citationCount: 4,
  },
  {
    path: "/ru/blog/turetskiy-zavtrak-stambul",
    canonical: russianBreakfastBlogUrl,
    language: "ru",
    types: ["Restaurant", "BlogPosting", "WebPage", "BreadcrumbList", "FAQPage"],
    restaurantMenu: `${menuPageUrl}#menu`,
    faqCount: 6,
    sharedGuideDesign: true,
    visibleSignals: ["турецкий завтрак", "ванский завтрак", "таксим", "муртуга", "1978"],
    hreflang: internationalGuideHreflang,
    sourcedGuide: true,
    citationCount: 4,
  },
  {
    path: "/ar/blog/turkish-breakfast-istanbul",
    canonical: arabicBreakfastBlogUrl,
    language: "ar",
    direction: "rtl",
    types: ["Restaurant", "BlogPosting", "WebPage", "BreadcrumbList", "FAQPage"],
    restaurantMenu: `${menuPageUrl}#menu`,
    faqCount: 6,
    sharedGuideDesign: true,
    visibleSignals: ["الفطور التركي", "فطور فان", "تقسيم", "المورتوغا", "1978"],
    hreflang: internationalGuideHreflang,
    sourcedGuide: true,
    citationCount: 4,
  },
  {
    path: "/ko/blog/istanbul-bal-kaymak",
    canonical: koreanHoneyKaymakBlogUrl,
    language: "ko",
    languageTag: "ko-KR",
    types: ["Restaurant", "BlogPosting", "WebPage", "BreadcrumbList", "FAQPage"],
    restaurantMenu: `${menuPageUrl}#menu`,
    faqCount: 6,
    sharedGuideDesign: true,
    visibleSignals: ["이스탄불 발 카이막", "터키식 아침 식사", "탁심", "1978", "꿀과 카이막", "bal kaymak var mı?"],
    hreflang: honeyKaymakHreflang,
    sourcedGuide: true,
    citationCount: 4,
    honeyKaymakGuide: true,
  },
  {
    path: "/ko/blog/kaymak-nedir",
    canonical: koreanKaymakExplainerUrl,
    language: "ko",
    languageTag: "ko-KR",
    types: ["Restaurant", "BlogPosting", "WebPage", "BreadcrumbList", "FAQPage"],
    restaurantMenu: `${menuPageUrl}#menu`,
    faqCount: 8,
    sharedGuideDesign: true,
    visibleSignals: ["카이막", "물소유", "발 카이막", "버터", "생크림", "bal kaymak var mı?"],
    hreflang: { ko: koreanKaymakExplainerUrl },
    sourcedGuide: true,
    citationCount: 4,
    honeyKaymakGuide: true,
  },
  {
    path: "/ko/blog/turkish-breakfast-istanbul",
    canonical: koreanTurkishBreakfastBlogUrl,
    language: "ko",
    languageTag: "ko-KR",
    types: ["Restaurant", "BlogPosting", "WebPage", "BreadcrumbList", "FAQPage"],
    restaurantMenu: `${menuPageUrl}#menu`,
    faqCount: 8,
    sharedGuideDesign: true,
    visibleSignals: ["터키식 아침 식사", "카흐발트", "반 아침 식사", "탁심", "무르투아", "카부트"],
    hreflang: internationalGuideHreflang,
    sourcedGuide: true,
    citationCount: 5,
  },
  {
    path: "/ja/blog/istanbul-bal-kaymak",
    canonical: japaneseHoneyKaymakBlogUrl,
    language: "ja",
    languageTag: "ja-JP",
    types: ["Restaurant", "BlogPosting", "WebPage", "BreadcrumbList", "FAQPage"],
    restaurantMenu: `${menuPageUrl}#menu`,
    faqCount: 9,
    sharedGuideDesign: true,
    visibleSignals: ["イスタンブールで味わう", "バル・カイマク", "タクシム", "1978", "蜂蜜とカイマク", "bal kaymak var mı?"],
    hreflang: honeyKaymakHreflang,
    sourcedGuide: true,
    citationCount: 4,
    honeyKaymakGuide: true,
  },
];

const legalRoutes = [
  { path: "/gizlilik", canonical: privacyPageUrl },
  { path: "/cerez-politikasi", canonical: cookiePolicyPageUrl },
];
const canonicalUrls = new Set([
  ...routes.map((route) => route.canonical),
  ...newRoutes.map((route) => route.canonical),
  ...legalRoutes.map((route) => route.canonical),
]);
const internalPaths = new Set();
const internalLinkSources = new Map();
const redirectRules = [
  ["/breakfast/taksim", "/en"],
  ["/van-kahvaltisi/taksim", "/van-kahvaltisi"],
  ["/istanbul-van-kahvaltisi", "/van-kahvaltisi"],
  ["/beyoglu-kahvalti", "/"],
  ["/taksim-kahvalti", "/"],
  ["/serpme-van-kahvaltisi", "/van-kahvaltisi"],
  ["/serpme-kahvalti-beyoglu", "/"],
  ["/istiklal-caddesi-kahvalti", "/"],
  ["/cihangir-kahvalti", "/"],
  ["/galata-kahvalti", "/"],
  ["/aile-kahvaltisi-beyoglu", "/"],
  ["/grup-kahvaltisi", "/"],
  ["/hafta-sonu-kahvalti", "/"],
  ["/kahvalti-rezervasyon", "/rezervasyon"],
  ["/reservation", "/rezervasyon"],
  ["/booking", "/rezervasyon"],
  ["/masa-ayirt", "/rezervasyon"],
  ["/en/reservation", "/en/rezervasyon"],
  ["/en/booking", "/en/rezervasyon"],
  ["/kahvalti-yol-tarifi", "/konum"],
  ["/zambak-sokak-kahvalti", "/konum"],
  ["/siraselviler-kahvalti", "/konum"],
  ["/kahvalti-fiyatlari", "/menu"],
  ["/van-otlu-peynir", "/van-kahvaltisi-nedir"],
  ["/murtuga-kavut", "/van-kahvaltisi-nedir"],
  ["/tarihi-mekanda-kahvalti", "/hikayemiz"],
  ["/kahvalti-sonrasi-kahve", "/menu"],
  ["/vejetaryen-kahvalti-beyoglu", "/menu"],
  ["/beyoglu-kahvalti-mekanlari", "/"],
  ["/taksim-brunch-kahvalti", "/"],
  ["/iletisim", "/konum"],
  ["/sss", "/#faq"],
  ["/kafka-cafe", "/menu#turk-kahvesi"],
  ["/turkish-breakfast-istanbul", "/en/blog/turkish-breakfast-istanbul"],
  ["/breakfast-near-taksim", "/en"],
  ["/zavtrak-taksim-stambul", "/ru/blog/turetskiy-zavtrak-stambul"],
  ["/arabic-breakfast-taksim", "/ar/blog/turkish-breakfast-istanbul"],
  ["/korean-bal-kaymak-istanbul", "/ko/blog/istanbul-bal-kaymak"],
  ["/japanese-bal-kaymak-istanbul", "/ja/blog/istanbul-bal-kaymak"],
  ["/anasayfa", "/"],
  ["/tarihi-van-kahvaltisi-evi-menu", "/menu"],
  ["/van-kahvalti", "/van-kahvaltisi"],
  ["/gercek-van-kahvaltisinda-neler-olur", "/van-kahvaltisi-nedir"],
  ["/tarihi-van-kahvalti-evi-hikayemiz", "/hikayemiz"],
  ["/galeri-van-kahvalti-evi-taksim", "/"],
  ["/urun/van-serpme-kahvalti", "/menu#serpme-fix-menu"],
  ["/urun/cift-kisilik-serpme-kahvalti", "/menu#van-golu-tabagi"],
  ["/urun/turk-kahvesi", "/menu#turk-kahvesi"],
];

const fail = (message) => {
  throw new Error(message);
};

const assert = (condition, message) => {
  if (!condition) fail(message);
};

const decodeHtml = (value) =>
  value
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([\da-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;|&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ");

const visibleHtml = (html) =>
  html
    .replace(/<script\b[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[\s\S]*?<\/style>/gi, " ");

const checkedStylesheets = new Map();
const checkedAlternates = new Map();
const readAlternates = (html) => Object.fromEntries(
  [...html.matchAll(/<link\b[^>]*rel="alternate"[^>]*>/gi)].map(([tag]) => [
    tag.match(/hrefLang="([^"]+)"/i)?.[1], tag.match(/href="([^"]+)"/i)?.[1],
  ]).filter(([language]) => language),
);
function assertDocumentLanguage(html, response, language, routePath) {
  const htmlTags = html.match(/<html\b[^>]*>/gi) ?? [];
  assert(htmlTags.length === 1, `${routePath}: tek html kökü olmalı`);
  assert(htmlTags[0].includes(`lang="${language}"`), `${routePath}: ilk HTML yanıtının kök dili yanlış`);
  assert(htmlTags[0].includes(`dir="${language === "ar" ? "rtl" : "ltr"}"`), `${routePath}: ilk HTML yanıtının kök yönü yanlış`);
  assert(response.headers.get("content-language") === language, `${routePath}: Content-Language yanlış`);
}
async function assertLanguageStylesheets(html, route) {
  if (!["/", "/en", "/menu", "/en/menu", "/rezervasyon", "/en/rezervasyon", "/ko", "/ja/blog/istanbul-bal-kaymak"].includes(route.path)) return;
  const stylesheets = [...html.matchAll(/<link\b[^>]*rel="stylesheet"[^>]*href="([^"]+)"/gi)].map((match) => decodeHtml(match[1]));
  assert(stylesheets.length > 0, `${route.path}: stylesheet eksik`);
  for (const href of stylesheets) {
    assert(href.startsWith("/_next/static/"), `${route.path}: stylesheet kendi alan adından gelmeli`);
    if (!checkedStylesheets.has(href)) {
      const response = await fetchWithRetry(href);
      assert(response.ok, `${route.path}: stylesheet yüklenemiyor (${href})`);
      checkedStylesheets.set(href, await response.text());
    }
  }
  const css = stylesheets.map((href) => checkedStylesheets.get(href)).join("\n");
  if (["tr", "en"].includes(route.language)) assert(!/Noto Sans (JP|KR)/.test(css), `${route.path}: başka dilin CJK font CSS'i başlangıç yükünü artırmamalı`);
  if (route.language === "ko") assert(css.includes("Noto Sans KR") && css.includes("--font-noto-sans-kr"), `${route.path}: Korece font korunmalı`);
  if (route.language === "ja") assert(css.includes("Noto Sans JP") && css.includes("--font-noto-sans-jp"), `${route.path}: Japonca font korunmalı`);
}

function assertAlternates(html, route) {
  const actual = readAlternates(html);
  const expected = route.hreflang ?? {};
  assert(JSON.stringify(Object.entries(actual).sort()) === JSON.stringify(Object.entries(expected).sort()), `${route.path}: hreflang kümesi eşdeğer içeriklerle tam eşleşmeli`);
  checkedAlternates.set(route.canonical, actual);
}

function assertShareMetadata(html, route) {
  const meta = Object.fromEntries([...html.matchAll(/<meta\b[^>]*>/gi)].map(([tag]) => [
    tag.match(/(?:name|property)="([^"]+)"/i)?.[1],
    decodeHtml(tag.match(/content="([^"]*)"/i)?.[1] ?? ""),
  ]));
  assert(meta["og:url"] === route.canonical, `${route.path}: Open Graph URL'si sayfanın canonical adresiyle aynı olmalı`);
  for (const field of ["og:title", "og:description", "og:image", "twitter:title", "twitter:description", "twitter:image"]) {
    assert(meta[field]?.length > 0, `${route.path}: ${field} eksik`);
  }
  if (legalRoutes.some(({ path }) => path === route.path)) {
    const title = decodeHtml(html.match(/<title>([^<]*)<\/title>/i)?.[1] ?? "");
    assert(meta["og:title"] === title && meta["twitter:title"] === title, `${route.path}: paylaşım başlığı ana sayfadan miras kalmamalı`);
    assert(meta["og:description"] === meta.description && meta["twitter:description"] === meta.description, `${route.path}: paylaşım açıklaması bu sayfaya ait olmalı`);
  }
}

const visibleText = (html) =>
  decodeHtml(visibleHtml(html).replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();

async function fetchWithRetry(path, attempts = 30, options = {}) {
  let lastError;
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    try {
      return await fetch(`${baseUrl}${path}`, options);
    } catch (error) {
      lastError = error;
      await new Promise((resolve) => setTimeout(resolve, 250));
    }
  }
  throw lastError;
}

function requestWithHost(path, host) {
  const target = new URL(baseUrl);
  return new Promise((resolve, reject) => {
    const requestMethod = target.protocol === "https:" ? httpsRequest : httpRequest;
    const request = requestMethod(
      {
        hostname: target.hostname,
        port: target.port || undefined,
        path,
        method: "GET",
        headers: { host },
      },
      (response) => {
        response.resume();
        resolve({ status: response.statusCode, location: response.headers.location });
      },
    );
    request.on("error", reject);
    request.end();
  });
}

for (const route of routes) {
  const response = await fetchWithRetry(route.path);
  const html = await response.text();
  const text = visibleText(html);
  const lowerText = text.toLocaleLowerCase(
    route.language === "tr" ? "tr-TR" : route.language === "ru" ? "ru-RU" : route.language === "ar" ? "ar-SA" : route.language === "ko" ? "ko-KR" : route.language === "ja" ? "ja-JP" : "en-US",
  );
  // Serialized JavaScript is not evidence of a readable product or anchor.
  const searchableText = lowerText;
  const routeLabel = route.path;

  assert(response.status === 200, `${routeLabel}: HTTP ${response.status}`);
  assertDocumentLanguage(html, response, route.language, route.path);
  assertAlternates(html, route);
  await assertLanguageStylesheets(html, route);

  if (route.language !== "tr") {
    assert(response.headers.get("content-language") === route.language, `${routeLabel}: Content-Language başlığı eksik`);
    assert(new RegExp(`<main\\b[^>]*\\blang="${route.languageTag ?? route.language}"`, "i").test(html), `${routeLabel}: ana içerik lang işareti eksik`);
  }

  if (route.direction) {
    assert(new RegExp(`<main\\b[^>]*\\bdir="${route.direction}"`, "i").test(html), `${routeLabel}: metin yönü eksik`);
  }

  const canonicalMatches = [...html.matchAll(/<link\s+rel="canonical"\s+href="([^"]+)"/gi)];
  assert(canonicalMatches.length === 1, `${routeLabel}: tek canonical bulunmalı`);
  assert(canonicalMatches[0][1] === route.canonical, `${routeLabel}: canonical yanlış`);

  const title = decodeHtml(html.match(/<title>([^<]*)<\/title>/i)?.[1] ?? "");
  const description = decodeHtml(
    html.match(/<meta\s+name="description"\s+content="([^"]*)"/i)?.[1] ?? "",
  );
  assert(title.length >= (["ko", "ja"].includes(route.language) ? 25 : 35) && title.length <= 70, `${routeLabel}: title uzunluğu ${title.length}`);
  assert(
    description.length >= (["ko", "ja"].includes(route.language) ? 60 : 100) && description.length <= 170,
    `${routeLabel}: description uzunluğu ${description.length}`,
  );
  assert((visibleHtml(html).match(/<h1\b/gi) ?? []).length === 1, `${routeLabel}: tam bir H1 bulunmalı`);
  assert(!/<meta\s+name="robots"\s+content="[^"]*noindex/i.test(html), `${routeLabel}: noindex olmamalı`);
  if (expectedGoogleVerification) {
    const escapedVerification = expectedGoogleVerification.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    assert(
      new RegExp(
        `<meta\\s+name="google-site-verification"\\s+content="${escapedVerification}"`,
        "i",
      ).test(html),
      `${routeLabel}: Google Search Console doğrulama etiketi eksik`,
    );
  }
  if (expectedYandexVerification) {
    const escapedVerification = expectedYandexVerification.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    assert(
      new RegExp(`<meta\\s+name="yandex-verification"\\s+content="${escapedVerification}"`, "i").test(html),
      `${routeLabel}: Yandex Webmaster doğrulama etiketi eksik`,
    );
  }
  if (expectedBingVerification) {
    const escapedVerification = expectedBingVerification.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    assert(
      new RegExp(`<meta\\s+name="msvalidate\\.01"\\s+content="${escapedVerification}"`, "i").test(html),
      `${routeLabel}: Bing Webmaster doğrulama etiketi eksik`,
    );
  }
  assert(route.visibleSignals.every((signal) => searchableText.includes(signal)), `${routeLabel}: hedef görünür metin eksik`);
  if (["/ko/blog/istanbul-bal-kaymak", "/ko/blog/kaymak-nedir", "/ja/blog/istanbul-bal-kaymak"].includes(route.path)) {
    assert(!["체에 거른 꿀, 버팔로 카이막", "濾した蜂蜜、水牛のカイマク"].some((claim) => html.includes(claim)), `${routeLabel}: teyitsiz ürün iddiası görünür metin veya şemada kaldı`);
  }

  if (route.sharedHomeDesign) {
    const sharedHomeClasses = [
      "site-shell theme-breakfast",
      "hero-section hero-cinematic",
      'id="gallery"',
      'id="faq"',
      'id="faq-heading"',
      "hamour-footer",
    ];
    assert(
      sharedHomeClasses.every((className) => html.includes(className)),
      `${routeLabel}: ortak ana sayfa tasarım bileşenleri eksik`,
    );
  }

  if (route.sharedMenuDesign) {
    const sharedMenuClasses = [
      "_banner",
      "_navPills",
      "_menuListArticle",
      "_menuItem",
      "_section4",
    ];
    assert(
      sharedMenuClasses.every((className) => html.includes(className)),
      `${routeLabel}: ortak menü tasarım bileşenleri eksik`,
    );
    const productAnchors = ["serpme-fix-menu", "van-golu-tabagi", "turk-kahvesi"];
    assert(
      productAnchors.every((itemId) =>
        visibleHtml(html).includes(`id="${itemId}"`),
      ),
      `${routeLabel}: ürün derin bağlantı hedefleri eksik`,
    );
    const counterpart = route.language === "en" ? "/menu" : "/en/menu";
    assert(
      new RegExp(`<a[^>]+href="${counterpart}"[^>]*>`, "i").test(html),
      `${routeLabel}: menü dil geçişi eşdeğer sayfaya gitmiyor`,
    );
  }

  if (route.sharedGuideDesign) {
    const sharedGuideClasses = ["_hero", "_articleNav", "_menuList", "_reasons", "_practical", "_faq"];
    assert(
      sharedGuideClasses.every((className) => html.includes(className)),
      `${routeLabel}: ortak uluslararası rehber tasarımı eksik`,
    );
  }

  if (coffeeRoutes.some((coffee) => coffee.path === route.path)) {
    const coffeeRestaurant = JSON.parse(html.match(/<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/i)[1])["@graph"].find((node) => node["@type"] === "Restaurant");
    const workSignal = ({ tr: "Wi‑Fi", en: "Wi-Fi", ru: "Wi-Fi", ar: "واي فاي", ko: "와이파이", "zh-CN": "Wi-Fi" })[route.language];
    assert(text.includes(workSignal), `${routeLabel}: teyit edilmiş çalışma bilgisi görünür olmalı`);
    assert(coffeeRestaurant.amenityFeature?.length === 3 && coffeeRestaurant.amenityFeature.every((feature) => feature.value === true), `${routeLabel}: teyit edilmiş çalışma olanakları eksik`);
    const menuList = JSON.parse(html.match(/<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/i)[1])["@graph"].find((node) => node["@type"] === "ItemList");
    assert(menuList?.itemListElement?.length === 6, `${routeLabel}: görünür kahve fiyat envanteri eksik`);
    for (const entry of menuList.itemListElement) {
      const item = entry.item;
      const id = new URL(item.url).hash.slice(1);
      const row = visibleHtml(html).match(new RegExp(`<li[^>]+data-coffee-item="${id}"[^>]*>([\\s\\S]*?)</li>`))?.[1] ?? "";
      assert(visibleText(row).includes(item.name), `${routeLabel}: kahve adı görünür HTML ile eşleşmeli (${id})`);
      assert(item.offers?.priceCurrency === "TRY" && visibleText(row).includes(`₺${item.offers.price}`), `${routeLabel}: kahve fiyatı şemayla eşleşmeli (${id})`);
    }
    assert(visibleHtml(html).includes('id="coffee-visit-title"'), `${routeLabel}: taranabilir ziyaret bilgisi eksik`);
    assert((visibleHtml(html).match(/<dt>/g) ?? []).length === 5, `${routeLabel}: beş ziyaret sorusu HTML'de bulunmalı`);
    assert(text.includes("07:00") && text.includes("22:00") && text.includes("34421"), `${routeLabel}: saat ve tam adres eksik`);

    for (const [language, href] of Object.entries(coffeeLanguages).filter(([language]) => language !== "x-default")) {
      const localPath = new URL(href).pathname;
      assert(new RegExp(`<a(?=[^>]*href="${localPath}")(?=[^>]*hrefLang="${language}")[^>]*>`, "i").test(html), `${routeLabel}: eşdeğer ${language} kahve sayfası bağlantısı eksik`);
    }
    if (!["tr", "en"].includes(route.language)) {
      assert(html.includes('href="/en/menu#sicak-kahveler"'), `${routeLabel}: yabancı menü İngilizce karşılığa gitmeli`);
      assert(!text.includes("Bir kahve, biraz sohbet."), `${routeLabel}: çevrilmemiş Türkçe pazarlama metni kaldı`);
    }
  } else if (!route.sharedGuideDesign && route.language !== "ko") {
    for (const [language, href] of Object.entries({
      en: "/en/blog/turkish-breakfast-istanbul",
      ru: "/ru/blog/turetskiy-zavtrak-stambul",
      ar: "/ar/blog/turkish-breakfast-istanbul",
      ko: "/ko",
      ja: "/ja/blog/istanbul-bal-kaymak",
    })) {
      assert(
        new RegExp(`<a(?=[^>]*href="${href}")(?=[^>]*hrefLang="${language}")[^>]*>`, "i").test(html),
        `${routeLabel}: navbar ${language} rehber bağlantısı eksik`,
      );
    }
  }

  if (route.path === "/") {
    assert(
      /<a[^>]+class="nav-language"(?=[^>]*hrefLang="en")(?=[^>]*href="\/en")[^>]*>/i.test(html),
      `${routeLabel}: görünür EN dil anahtarı eksik`,
    );
  }

  if (route.path === "/en") {
    assert(
      /<a[^>]+class="nav-language"(?=[^>]*hrefLang="tr")(?=[^>]*href="\/")[^>]*>/i.test(html),
      `${routeLabel}: görünür TR dil anahtarı eksik`,
    );
  }

  if (route.path === "/" || route.path === "/en") {
    const actualHtml = visibleHtml(html);
    assert(actualHtml.includes('id="location"'), `${routeLabel}: gerçek konum fragment hedefi eksik`);
    const hero = actualHtml.match(/<section[^>]*class="hero-section[^>]*>[\s\S]*?<\/section>/)?.[0];
    assert(hero?.includes(`href="${route.path === "/en" ? "/en/menu" : "/menu"}"`), `${routeLabel}: hero güncel menü ve fiyatlara bağlanmalı`);
    assert(hero?.includes(`href="${route.path === "/en" ? "/en/rezervasyon" : "/rezervasyon"}"`), `${routeLabel}: hero masa talebine bağlanmalı`);
    assert(actualHtml.includes('class="hero-review-source"'), `${routeLabel}: kaynaklı yorum özeti eksik`);
    assert(actualHtml.includes('data-analytics-purpose="review_source"'), `${routeLabel}: yorum kaynağı yol tarifi dönüşümü sayılmamalı`);
    assert(actualHtml.includes('href="https://www.google.com/maps?cid=10380797280962926014"'), `${routeLabel}: doğru Maps kaydı eksik`);
    assert(actualHtml.includes('id="main-content" tabindex="-1"'), `${routeLabel}: odaklanabilir ana içerik eksik`);
  }
  if (route.language === "en" && ["/en", "/en/menu", "/en/rezervasyon"].includes(route.path)) {
    assert(visibleHtml(html).includes('href="/en#location"'), `${routeLabel}: İngilizce konum bağlantısı eksik`);
  }

  if (route.hreflang) {
    for (const [language, url] of Object.entries(route.hreflang)) {
      assert(
        new RegExp(`hrefLang="${language}"\\s+href="${url}"`, "i").test(html) ||
          new RegExp(`href="${url}"\\s+hrefLang="${language}"`, "i").test(html),
        `${routeLabel}: ${language} hreflang eksik`,
      );
    }
  }

  for (const match of html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/gi)) {
    const href = decodeHtml(match[1]);
    if (!href.startsWith("/")) continue;
    const internalPath = new URL(href, baseUrl).pathname;
    internalPaths.add(internalPath);
    if (!internalLinkSources.has(internalPath)) internalLinkSources.set(internalPath, new Set());
    if (internalPath !== route.path) internalLinkSources.get(internalPath).add(route.path);
  }

  const jsonScripts = [...html.matchAll(/<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/gi)];
  assert(jsonScripts.length === 1, `${routeLabel}: tek JSON-LD script bulunmalı`);
  const graphDocument = JSON.parse(jsonScripts[0][1]);
  assert(graphDocument["@context"] === "https://schema.org", `${routeLabel}: Schema.org context eksik`);
  assert(Array.isArray(graphDocument["@graph"]), `${routeLabel}: @graph eksik`);
  assert(graphDocument["@graph"].every((node) => !("@context" in node)), `${routeLabel}: iç içe @context var`);

  const actualTypes = graphDocument["@graph"].map((node) => node["@type"]);
  assert(
    JSON.stringify(actualTypes) === JSON.stringify(route.types),
    `${routeLabel}: şema tipleri ${actualTypes.join(", ")}`,
  );

  const restaurant = graphDocument["@graph"].find((node) => node["@type"] === "Restaurant");
  if (route.path === "/") {
    const website = graphDocument["@graph"].find((node) => node["@type"] === "WebSite");
    assert(JSON.stringify(website.inLanguage) === JSON.stringify(["tr", "en", "ko", "zh-CN", "es", "ar", "ru", "ja"]), "WebSite: mevcut tüm içerik dilleri tanımlanmalı");
  }
  assert(restaurant?.["@id"] === `${canonicalSiteUrl}/#restaurant`, `${routeLabel}: restoran kimliği yanlış`);
  assert(restaurant?.alternateName === "Tarihi Van Kahvaltı Evi 1978", `${routeLabel}: işletme aliası yanlış`);
  assert(!restaurant?.paymentAccepted && !restaurant?.currenciesAccepted && !restaurant?.foundingDate, `${routeLabel}: doğrulanmamış ödeme veya hukuki kuruluş bilgisi yayımlanmamalı`);
  assert(restaurant?.logo === `${canonicalSiteUrl}/icons/icon-512.png`, `${routeLabel}: logo yanlış`);
  assert(restaurant?.email === "info@tarihivankahvaltievi.com", `${routeLabel}: e-posta yanlış`);
  assert(restaurant?.hasMap === "https://www.google.com/maps?cid=10380797280962926014", `${routeLabel}: Maps CID yanlış`);
  assert(restaurant?.geo?.latitude === 41.0367655, `${routeLabel}: enlem yanlış`);
  assert(restaurant?.geo?.longitude === 28.9829478, `${routeLabel}: boylam yanlış`);
  assert(
    restaurant?.potentialAction?.["@type"] === "ReserveAction" &&
      restaurant?.potentialAction?.target?.urlTemplate === reservationPageUrl,
    `${routeLabel}: merkezi rezervasyon eylemi eksik`,
  );
  assert(restaurant?.sameAs?.includes(restaurant.hasMap), `${routeLabel}: Maps sameAs eksik`);
  assert(
    restaurant?.sameAs?.includes("https://yandex.com.tr/maps/org/tarihi_van_kahvalti_evi/237523878781/"),
    `${routeLabel}: Yandex Business sameAs eksik`,
  );
  assert(restaurant?.sameAs?.some((url) => url.includes("d34166952-")), `${routeLabel}: doğru Tripadvisor işletme kimliği eksik`);
  assert(!restaurant?.sameAs?.some((url) => url.includes("d2279958-")), `${routeLabel}: Cihangir işletmesi sameAs içine karışmış`);
  assert(restaurant?.menu === route.restaurantMenu, `${routeLabel}: restoran menü URL'si yanlış`);

  const menu = graphDocument["@graph"].find((node) => node["@type"] === "Menu");
  if (route.types.includes("Menu")) {
    assert(menu?.["@id"] === `${route.canonical}#menu`, `${routeLabel}: menü kimliği yanlış`);
    assert(menu?.url === route.canonical, `${routeLabel}: menü URL'si yanlış`);
    assert(menu?.provider?.["@id"] === restaurant["@id"], `${routeLabel}: menü işletmeye bağlanmalı`);
    assert(menu?.hasMenuSection?.length === route.menuSectionCount, `${routeLabel}: menü bölümleri eksik`);
    const schemaItems = menu.hasMenuSection.flatMap((section) => section.hasMenuItem);
    const renderedArticles = [...visibleHtml(html).matchAll(/<article\b[^>]*data-menu-item="true"[^>]*>[\s\S]*?<\/article>/gi)].map((match) => match[0]);
    assert(schemaItems.length === renderedArticles.length, `${routeLabel}: görünür ürün/şema sayıları farklı`);
    const productIds = renderedArticles.map((article) => article.match(/\bid="([^"]+)"/)?.[1]);
    assert(new Set(productIds).size === productIds.length, `${routeLabel}: ürün id değerleri benzersiz olmalı`);
    for (const item of schemaItems) {
      const id = new URL(item.url).hash.slice(1);
      const article = renderedArticles.find((entry) => entry.includes(`id="${id}"`));
      assert(article, `${routeLabel}: ${id} yalnız şemada var`);
      assert(visibleText(article).includes(item.description), `${routeLabel}: ${id} görünür açıklaması şemayla eşleşmiyor`);
      assert(visibleText(article).includes(item.name), `${routeLabel}: ${id} görünür adı şemayla eşleşmiyor`);
      if (item.offers) {
        assert(visibleText(article).includes(`₺${item.offers.price}`), `${routeLabel}: ${id} görünür fiyatı şemayla eşleşmiyor`);
        assert(item.offers.seller?.["@id"] === restaurant["@id"], `${routeLabel}: ${id} fiyatı aynı işletmeye bağlanmalı`);
      }
    }
    assert(visibleHtml(html).includes('id="main-content" tabindex="-1"'), `${routeLabel}: menü skip link hedefi odaklanabilir olmalı`);
    assert(text.includes(route.language === "en" ? "Minimum 2 people." : "Minimum 2 kişi için servis edilir."), `${routeLabel}: doğrulanmış minimum sipariş koşulu eksik`);
  } else {
    assert(!menu, `${routeLabel}: görünür olmayan menü için şema bulunmamalı`);
  }

  const faq = graphDocument["@graph"].find((node) => node["@type"] === "FAQPage");
  const questions = faq?.mainEntity?.map((item) => item.name) ?? [];
  const summaries = [...visibleHtml(html).matchAll(/<summary[^>]*>([\s\S]*?)<\/summary>/gi)]
    .map((match) => decodeHtml(match[1].replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim().replace(/^\d{2}\s+/, ""));
  assert(questions.length === route.faqCount, `${routeLabel}: şema SSS sayısı yanlış`);
  assert(new Set(questions).size === questions.length, `${routeLabel}: şema soruları benzersiz değil`);
  assert(summaries.length === route.faqCount, `${routeLabel}: görünür SSS sayısı yanlış`);
  assert(questions.every((question) => summaries.includes(question)), `${routeLabel}: görünür SSS ve şema eşleşmiyor`);
  const faqDetails = [...visibleHtml(html).matchAll(/<details\b[^>]*>[\s\S]*?<\/details>/gi)].map((match) => match[0]);
  for (const question of faq?.mainEntity ?? []) {
    const detail = faqDetails.find((entry) => visibleText(entry).includes(question.name));
    assert(detail && visibleText(detail).includes(question.acceptedAnswer.text.replace(/\s+/g, " ").trim()), `${routeLabel}: ${question.name} görünür cevabı şemayla eşleşmiyor`);
  }

  assert(/<meta\s+name="geo\.region"\s+content="TR-34"/i.test(html), `${routeLabel}: geo.region eksik`);
  assert(/<meta\s+name="geo\.position"\s+content="41\.0367655;28\.9829478"/i.test(html), `${routeLabel}: geo.position eksik`);
  assert(/<meta\s+name="ICBM"\s+content="41\.0367655, 28\.9829478"/i.test(html), `${routeLabel}: ICBM koordinatı eksik`);

  if (route.reservationPage) {
    const main = visibleHtml(html).match(/<main\b[^>]*>[\s\S]*?<\/main>/i)?.[0] ?? "";
    assert(main.includes('id="form-heading"') && main.includes('historic-corner.webp') && main.includes('<form'), `${routeLabel}: rezervasyon formu ve LCP görseli ilk HTML main içinde bulunmalı`);
    assert(!/<template\b[^>]*id="B:/.test(main), `${routeLabel}: rezervasyon içeriği JS ile açılan gizli streaming bloğuna ertelenmemeli`);
    const webPage = graphDocument["@graph"].find((node) => node["@type"] === "WebPage");
    assert(webPage?.potentialAction?.["@type"] === "ReserveAction", `${routeLabel}: sayfa rezervasyon eylemi eksik`);
    assert(
      webPage?.potentialAction?.target?.urlTemplate === route.canonical,
      `${routeLabel}: rezervasyon eylemi kanonik hedefe gitmeli`,
    );
  }

  if (route.sourcedGuide) {
    const article = graphDocument["@graph"].find((node) => node["@type"] === "BlogPosting");
    assert(article?.citation?.length === route.citationCount, `${routeLabel}: beklenen birincil kaynak citation sayısı yanlış`);
    assert(article?.mentions?.length >= 3, `${routeLabel}: yöresel ürün entity bağları eksik`);
    assert(
      article.citation.every((url) => html.includes(`href="${url}"`)),
      `${routeLabel}: JSON-LD kaynakları görünür bağlantılarla eşleşmeli`,
    );
  }

  if (route.honeyKaymakGuide) {
    assert(html.includes('/images/blog/bal-kaymak-close-up.webp'), `${routeLabel}: gerçek bal-kaymak görseli eksik`);
    assert(html.includes('/en/menu#bal-kaymak'), `${routeLabel}: doğrudan bal-kaymak menü bağlantısı eksik`);
    const article = graphDocument["@graph"].find((node) => node["@type"] === "BlogPosting");
    assert(article?.mentions?.some((item) => item["@type"] === "MenuItem"), `${routeLabel}: bal-kaymak MenuItem entity bağı eksik`);
  }

  if (route.language === "ja") {
    assert(/<nav[^>]+aria-label="パンくずリスト"/i.test(html), `${routeLabel}: görünür Japonca breadcrumb eksik`);
    assert(html.includes('href="/en#story"'), `${routeLabel}: görünür editör/işletme geçmişi bağlantısı eksik`);
    const article = graphDocument["@graph"].find((node) => node["@type"] === "BlogPosting");
    assert(article?.about?.filter((item) => item.sameAs).length === 4, `${routeLabel}: resmî kaynaklı entity bağları eksik`);
  }
}

for (const route of newRoutes) {
  const response = await fetchWithRetry(route.path);
  const html = await response.text();
  const pageText = visibleText(html);
  assert(response.status === 200, `${route.path}: HTTP ${response.status}`);
  assertDocumentLanguage(html, response, route.language ?? "tr", route.path);
  assertAlternates(html, route);
  await assertLanguageStylesheets(html, route);
  assert(response.headers.get("content-language") === route.language, `${route.path}: Content-Language yanlış`);
  assert(new RegExp(`<main\\b[^>]*\\blang="${route.languageTag ?? route.language}"`, "i").test(html), `${route.path}: ana içerik lang eksik`);
  assert(html.includes(`<link rel="canonical" href="${route.canonical}"`), `${route.path}: canonical yanlış`);
  assert((visibleHtml(html).match(/<h1\b/gi) ?? []).length === 1, `${route.path}: tek H1 bulunmalı`);
  assert(route.signals.every((signal) => pageText.toLocaleLowerCase().includes(signal.toLocaleLowerCase())), `${route.path}: görünür içerik eksik`);
  assert(!/<meta\s+name="robots"\s+content="[^"]*noindex/i.test(html), `${route.path}: noindex olmamalı`);
  for (const [language, url] of Object.entries(route.hreflang ?? {})) {
    assert(html.includes(`hrefLang="${language}" href="${url}"`) || html.includes(`href="${url}" hrefLang="${language}"`), `${route.path}: ${language} hreflang eksik`);
  }
  for (const target of route.links ?? []) assert(html.includes(`href="${target}"`), `${route.path}: dahili bağlantı eksik (${target})`);
  const scripts = [...html.matchAll(/<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/gi)];
  assert(scripts.length === 1, `${route.path}: tek JSON-LD script bulunmalı`);
  const document = JSON.parse(scripts[0][1]);
  assert(document["@context"] === "https://schema.org", `${route.path}: JSON-LD context yanlış`);
  if (route.citations) {
    const article = document["@graph"]?.find((node) => node["@type"] === "BlogPosting");
    assert(article?.citation?.length === route.citations, `${route.path}: kaynak sayısı yanlış`);
    assert(article.citation.every((url) => html.includes(`href="${url}"`)), `${route.path}: kaynaklar görünür olmalı`);
  }
  for (const match of html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/gi)) {
    const href = decodeHtml(match[1]);
    if (!href.startsWith("/")) continue;
    const internalPath = new URL(href, baseUrl).pathname;
    internalPaths.add(internalPath);
    if (!internalLinkSources.has(internalPath)) internalLinkSources.set(internalPath, new Set());
    if (internalPath !== route.path) internalLinkSources.get(internalPath).add(route.path);
  }
}

for (const route of legalRoutes) {
  const response = await fetchWithRetry(route.path);
  const html = await response.text();
  const canonicalMatches = [...html.matchAll(/<link\s+rel="canonical"\s+href="([^"]+)"/gi)];

  assert(response.status === 200, `${route.path}: HTTP ${response.status}`);
  assertDocumentLanguage(html, response, route.language ?? "tr", route.path);
  assertAlternates(html, route);
  await assertLanguageStylesheets(html, route);
  assert(canonicalMatches.length === 1, `${route.path}: tek canonical bulunmalı`);
  assert(canonicalMatches[0][1] === route.canonical, `${route.path}: canonical yanlış`);
  assert(!/<meta\s+name="robots"\s+content="[^"]*noindex/i.test(html), `${route.path}: noindex olmamalı`);
  assert((visibleHtml(html).match(/<h1\b/gi) ?? []).length === 1, `${route.path}: tam bir H1 bulunmalı`);
}

for (const [canonical, alternates] of checkedAlternates) {
  for (const target of Object.values(alternates)) {
    assert(checkedAlternates.has(target), `hreflang: ${canonical} için hedef kanonik değil (${target})`);
    assert(Object.values(checkedAlternates.get(target)).includes(canonical), `hreflang: ${canonical} için geri bağlantı yok (${target})`);
  }
}

const sitemap = await (await fetchWithRetry("/sitemap.xml")).text();
for (const block of sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
  const canonical = block[1].match(/<loc>([^<]+)<\/loc>/)?.[1];
  const actual = Object.fromEntries([...block[1].matchAll(/hreflang="([^"]+)" href="([^"]+)"/g)].map((match) => [match[1], decodeHtml(match[2])]));
  assert(JSON.stringify(Object.entries(actual).sort()) === JSON.stringify(Object.entries(checkedAlternates.get(canonical) ?? {}).sort()), `Sitemap: ${canonical} alternatifleri HTML ile aynı olmalı`);
}
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
const crawledPages = new Map();
// Fetch the same public HTML a Google crawler receives, without executing JS.
// A regular-browser success alone cannot detect bot-specific blocks or shells.
for (const url of sitemapUrls) {
  const route = new URL(url).pathname;
  const response = await fetchWithRetry(route, 3, {
    redirect: "manual",
    headers: { "User-Agent": "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)" },
  });
  const html = await response.text();
  assert(response.status === 200, `Googlebot: ${route} doğrudan 200 dönmeli`);
  assertShareMetadata(html, { path: route, canonical: url });
  assert(!response.headers.get("x-robots-tag")?.includes("noindex"), `Googlebot: ${route} HTTP noindex olmamalı`);
  assert(!/<meta\s+name="(?:robots|googlebot)"\s+content="[^"]*noindex/i.test(html), `Googlebot: ${route} meta noindex olmamalı`);
  assert(/<h1(?:\s|>)/i.test(visibleHtml(html)), `Googlebot: ${route} ilk HTML'de h1 içermeli`);
  assert(visibleText(html).length > 200, `Googlebot: ${route} JS olmadan okunabilir içerik içermeli`);
  const rendered = visibleHtml(html);
  assert(/<main\b[^>]*\bid="main-content"/.test(rendered), `Erişilebilirlik: ${route} ana içeriğe geç hedefi eksik`);
  crawledPages.set(route, rendered);
  assert(html.includes(`rel="canonical" href="${url}"`), `Googlebot: ${route} kanonik URL yanlış`);
  if (["/", "/konum", "/van-kahvaltisi", "/ko/blog/taksim-kahvalti-rehberi"].includes(route)) {
    assert(!html.includes("Sıraselviler"), `${route}: teyitsiz sokak veya metro çıkışı tarifi yayımlanmamalı`);
  }
  if (route === "/ko/blog/taksim-kahvalti-rehberi") {
    const graph = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1])["@graph"];
    const article = graph.find((node) => node["@type"] === "BlogPosting");
    assert(article.datePublished === "2026-09-28T12:00:00+03:00", "Korece rehber: ilk yayın tarihi korunmalı");
    assert(article.dateModified === "2026-10-28" && /<time\b[^>]*datetime="2026-10-28"/i.test(html), "Korece rehber: görünür ve yapısal güncelleme tarihleri eşleşmeli");
  }
}

// Validate fragments too: HTTP 200 alone hides broken section and skip links.
let fragmentCount = 0;
// Coffee discovery must have a native content entry point, not only cross-language links.
for (const [language, source] of [['tr', '/'], ['en', '/en/blog/turkish-breakfast-istanbul'], ['ru', '/ru/blog/turetskiy-zavtrak-stambul'], ['ar', '/ar/blog/turkish-breakfast-istanbul'], ['ko', '/ko'], ['zh-CN', '/zh-cn']]) {
  const target = new URL(coffeeLanguages[language]).pathname;
  assert(internalLinkSources.get(target)?.has(source), `Kahve iç bağlantısı: ${source} → ${target} eksik`);
}
// These requests test user-agent response parity, not verified crawler access through a production CDN.
for (const agent of ['Bingbot', 'OAI-SearchBot', 'PerplexityBot', 'AdsBot-Google']) {
  for (const route of coffeeRoutes) {
    const response = await fetchWithRetry(route.path, 3, { headers: { 'User-Agent': agent }, redirect: 'manual' });
    const html = visibleHtml(await response.text());
    assert(response.status === 200, `${agent}: ${route.path} erişilemiyor`);
    assert((html.match(/data-coffee-item=/g) ?? []).length === 6, `${agent}: ${route.path} fiyatlar JS gerektiriyor`);
    assert(html.includes(`href="${route.canonical}"`), `${agent}: ${route.path} canonical yanlış`);
  }
}
for (const [source, html] of crawledPages) {
  for (const match of html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/gi)) {
    const target = new URL(decodeHtml(match[1]), `${canonicalSiteUrl}${source}`);
    if (target.origin !== canonicalSiteUrl || !target.hash || !crawledPages.has(target.pathname)) continue;
    const id = decodeURIComponent(target.hash.slice(1));
    const ids = [...crawledPages.get(target.pathname).matchAll(/\bid="([^"]+)"/g)].map((entry) => decodeHtml(entry[1]));
    assert(ids.includes(id), `Dahili bölüm bağlantısı: ${source} → ${target.pathname}${target.hash} hedefi eksik`);
    fragmentCount++;
  }
}
console.log(`Dahili bağlantılar: ${fragmentCount} bölüm bağlantısı ve tüm ana içeriğe geç hedefleri doğrulandı.`);

const sitemapLastModified = [...sitemap.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)].map((match) => match[1]);
const sitemapChangeFrequencies = [...sitemap.matchAll(/<changefreq>([^<]+)<\/changefreq>/g)].map(
  (match) => match[1],
);
const sitemapPriorities = [...sitemap.matchAll(/<priority>([^<]+)<\/priority>/g)].map(
  (match) => Number(match[1]),
);
const sitemapImages = [...sitemap.matchAll(/<image:loc>([^<]+)<\/image:loc>/g)].map((match) => match[1]);
assert(sitemapUrls.length === canonicalUrls.size, "Sitemap: tüm indekslenebilir kanonik URL'ler bulunmalı");
assert(sitemapUrls.every((url) => canonicalUrls.has(url)), "Sitemap: kanonik olmayan URL var");
assert(canonicalUrls.size === new Set(sitemapUrls).size, "Sitemap: kanonik URL eksik veya yinelenmiş");
assert(!sitemapUrls.some((url) => new URL(url).pathname.startsWith("/admin")), "Sitemap: admin URL'si olmamalı");
assert(!sitemapUrls.some((url) => new URL(url).pathname.startsWith("/api/")), "Sitemap: API URL'si olmamalı");
assert(sitemapLastModified.length === canonicalUrls.size, "Sitemap: lastmod sayısı yanlış");
assert(
  sitemapLastModified.every((value) => Number.isFinite(Date.parse(value)) && Date.parse(value) <= Date.now()),
  "Sitemap: lastmod geçerli ve gelecekte olmayan bir tarih olmalı",
);
assert(
  sitemapChangeFrequencies.length === canonicalUrls.size &&
    sitemapChangeFrequencies.every((value) => ["weekly", "monthly", "yearly"].includes(value)),
  "Sitemap: her URL için geçerli changefreq bulunmalı",
);
assert(
  sitemapPriorities.length === canonicalUrls.size &&
    sitemapPriorities.every((value) => Number.isFinite(value) && value >= 0 && value <= 1),
  "Sitemap: her URL için 0-1 aralığında priority bulunmalı",
);
assert(
  sitemap.includes(`<loc>${canonicalSiteUrl}</loc>`) && sitemap.includes("<priority>1</priority>"),
  "Sitemap: ana sayfa en yüksek önceliğe sahip olmalı",
);
assert(sitemapImages.length >= 50, "Sitemap: kapsamlı görsel keşif listesi eksik");
assert(
  sitemapImages.every((url) => url.startsWith(`${canonicalSiteUrl}/images/`)),
  "Sitemap: görsel URL'si kanonik alan adında olmalı",
);
// Broken image sitemap entries waste crawler requests and hide image results.
const imagePaths = [...new Set(sitemapImages.map((url) => new URL(url).pathname))];
for (let start = 0; start < imagePaths.length; start += 6) {
  await Promise.all(imagePaths.slice(start, start + 6).map(async (imagePath) => {
    const response = await fetchWithRetry(imagePath, 3, { method: "HEAD", redirect: "manual" });
    assert(response.status === 200, `Sitemap görseli: ${imagePath} HTTP ${response.status}`);
    assert(response.headers.get("content-type")?.startsWith("image/"), `Sitemap görseli: ${imagePath} gerçek görsel dönmeli`);
    assert(!response.headers.get("x-robots-tag")?.includes("noindex"), `Sitemap görseli: ${imagePath} indekslenebilir olmalı`);
  }));
}
for (const fontPath of ["/fonts/causten/Causten-Regular.woff2", "/fonts/noctado/NOCTADO.woff2"]) {
  const response = await fetchWithRetry(fontPath, 3, { method: "HEAD" });
  assert(response.status === 200, `Font: ${fontPath} erişilebilir olmalı`);
  assert(response.headers.get("cache-control")?.includes("max-age=604800"), `Font: ${fontPath} haftalık önbellek eksik`);
}
console.log(`Googlebot: ${sitemapUrls.length} sayfada JS gerektirmeyen HTML; ${imagePaths.length} benzersiz sitemap görselinde HTTP 200 doğrulandı.`);

assert(sitemap.includes('hreflang="en"'), "Sitemap: İngilizce hreflang eksik");
assert(sitemap.includes('hreflang="ru"'), "Sitemap: Rusça hreflang eksik");
assert(sitemap.includes('hreflang="ar"'), "Sitemap: Arapça hreflang eksik");
assert(sitemap.includes('hreflang="ko"'), "Sitemap: Korece hreflang eksik");
assert(sitemap.includes('hreflang="ja"'), "Sitemap: Japonca hreflang eksik");
assert(sitemap.includes('hreflang="zh-CN"'), "Sitemap: Çince hreflang eksik");
assert(sitemap.includes('hreflang="x-default"'), "Sitemap: x-default hreflang eksik");

for (const guideUrl of [englishBreakfastBlogUrl, russianBreakfastBlogUrl, arabicBreakfastBlogUrl, koreanTurkishBreakfastBlogUrl]) {
  const guideBlock = sitemap.match(
    new RegExp(`<url>\\s*<loc>${guideUrl}</loc>([\\s\\S]*?)</url>`),
  )?.[1];
  assert(guideBlock, `Sitemap: rehber URL bloğu eksik (${guideUrl})`);
  for (const [language, alternateUrl] of Object.entries(internationalGuideHreflang)) {
    assert(
      guideBlock.includes(`hreflang="${language}" href="${alternateUrl}"`),
      `Sitemap: ${guideUrl} için ${language} karşılıklı hreflang eksik`,
    );
  }
  assert(
    (guideBlock.match(/<image:loc>/g) ?? []).length === 4,
    `Sitemap: ${guideUrl} için beklenen keşfedilebilir görseller bulunmalı`,
  );
}

for (const guideUrl of [koreanHoneyKaymakBlogUrl, japaneseHoneyKaymakBlogUrl, chineseHoneyKaymakBlogUrl, spanishHoneyKaymakBlogUrl]) {
  const guideBlock = sitemap.match(
    new RegExp(`<url>\\s*<loc>${guideUrl}</loc>([\\s\\S]*?)</url>`),
  )?.[1];
  assert(guideBlock, `Sitemap: bal-kaymak rehber URL bloğu eksik (${guideUrl})`);
  for (const [language, alternateUrl] of Object.entries(honeyKaymakHreflang)) {
    assert(
      guideBlock.includes(`hreflang="${language}" href="${alternateUrl}"`),
      `Sitemap: ${guideUrl} için ${language} bal-kaymak hreflang eksik`,
    );
  }
  assert(
    (guideBlock.match(/<image:loc>/g) ?? []).length === 5,
    `Sitemap: ${guideUrl} için beş keşfedilebilir görsel bulunmalı`,
  );
}

for (const guideUrl of [englishClassicBreakfastBlogUrl, spanishClassicBreakfastBlogUrl]) {
  const guideBlock = sitemap.match(new RegExp(`<url>\\s*<loc>${guideUrl}</loc>([\\s\\S]*?)</url>`))?.[1];
  assert(guideBlock, `Sitemap: klasik kahvaltı rehber URL bloğu eksik (${guideUrl})`);
  for (const [language, alternateUrl] of Object.entries(classicBreakfastHreflang)) {
    assert(guideBlock.includes(`hreflang="${language}" href="${alternateUrl}"`), `Sitemap: ${guideUrl} için ${language} hreflang eksik`);
  }
}

for (const guideUrl of [koreanTaksimBreakfastBlogUrl, chineseTaksimBreakfastBlogUrl]) {
  const guideBlock = sitemap.match(new RegExp(`<url>\\s*<loc>${guideUrl}</loc>([\\s\\S]*?)</url>`))?.[1];
  assert(guideBlock, `Sitemap: Taksim rehber URL bloğu eksik (${guideUrl})`);
  for (const [language, alternateUrl] of Object.entries(taksimHreflang)) {
    assert(guideBlock.includes(`hreflang="${language}" href="${alternateUrl}"`), `Sitemap: ${guideUrl} için ${language} hreflang eksik`);
  }
}

const appDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../src/app");
const appFiles = await readdir(appDirectory, { recursive: true });
const publicPagePaths = appFiles
  .filter((file) => file === "page.tsx" || file.endsWith("/page.tsx"))
  .map((file) => {
    const routePath = `/${file.replace(/(?:^|\/)\([^/]+\)\//g, "/").replace(/^\//, "").replace(/(?:^|\/)page\.tsx$/, "")}`;
    return routePath || "/";
  })
  .filter((routePath) => routePath !== "/admin" && !routePath.includes("["))
  .sort();
const sitemapPaths = sitemapUrls.map((url) => new URL(url).pathname).sort();
assert(
  JSON.stringify(sitemapPaths) === JSON.stringify(publicPagePaths),
  `Sitemap: uygulamadaki herkese açık sayfalarla eşleşmiyor (${publicPagePaths.join(", ")})`,
);
for (const sitemapPath of sitemapPaths) {
  assert(
    (internalLinkSources.get(sitemapPath)?.size ?? 0) > 0,
    `Dahili bağlantı ağı: ${sitemapPath} başka bir indekslenebilir sayfadan bağlanmalı`,
  );
}

const robots = await (await fetchWithRetry("/robots.txt")).text();
assert(robots.includes("User-Agent: *"), "robots.txt: genel bot kuralı eksik");
for (const userAgent of ["Googlebot", "Bingbot", "YandexBot", "Applebot", "Yeti", "OAI-SearchBot", "PerplexityBot"]) {
  assert(robots.includes(`User-Agent: ${userAgent}`), `robots.txt: ${userAgent} keşif kuralı eksik`);
}
assert(robots.includes(`${canonicalSiteUrl}/sitemap.xml`), "robots.txt: sitemap eksik");
assert(!/^Disallow:\s*\/admin\s*$/im.test(robots), "robots.txt: admin noindex talimatının okunmasını engellememeli");
assert(/^Disallow:\s*\/api\/\s*$/im.test(robots), "robots.txt: kişisel ve yönetim API'leri taramaya kapalı olmalı");

const llmsResponse = await fetchWithRetry("/llms.txt");
const llms = await llmsResponse.text();
assert(llmsResponse.ok, "llms.txt: 200 dönmeli");
assert(llmsResponse.headers.get("content-type")?.startsWith("text/plain"), "llms.txt: düz metin dönmeli");
assert(llmsResponse.headers.get("x-robots-tag")?.includes("noindex"), "llms.txt: arama motoru indekslemesine kapalı (noindex) olmalı");
assert(llms.includes("# Tarihi Van Kahvaltı Evi"), "llms.txt: işletme adı eksik");
assert(llms.includes(menuPageUrl), "llms.txt: canlı menü kaynağı eksik");
assert(llms.includes(reservationPageUrl), "llms.txt: rezervasyon kaynağı eksik");
for (const url of Object.values(coffeeLanguages)) assert(llms.includes(url), `llms.txt: kahve kaynağı eksik (${url})`);
assert(llms.includes("Citation guidance"), "llms.txt: alıntı yönlendirmesi eksik");
for (const url of [russianBreakfastBlogUrl, arabicBreakfastBlogUrl, japaneseHoneyKaymakBlogUrl, koreanKaymakExplainerUrl, koreanTurkishBreakfastBlogUrl, koreanTourGuideBreakfastBlogUrl]) {
  assert(llms.includes(url), `llms.txt: dil rehberi eksik (${url})`);
}
assert(llms.includes("not a confirmed booking"), "llms.txt: talep ile onaylanmış rezervasyon ayrımı eksik");

const adminResponse = await fetchWithRetry("/admin");
const adminHtml = await adminResponse.text();
assert(adminResponse.status === 200, "Admin: giriş yüzeyi erişilebilir olmalı");
assert(
  /<meta\s+name="robots"\s+content="[^"]*noindex[^"]*nofollow/i.test(adminHtml),
  "Admin: HTML noindex, nofollow etiketi eksik",
);
assert(
  adminResponse.headers.get("x-robots-tag")?.includes("noindex"),
  "Admin: X-Robots-Tag noindex başlığı eksik",
);
assert(
  adminResponse.headers.get("cache-control")?.includes("no-store"),
  "Admin: özel içerik önbelleğe alınmamalı",
);

const adminApiResponse = await fetchWithRetry("/api/admin/menu", 30, { redirect: "manual" });
assert(
  adminApiResponse.headers.get("x-robots-tag")?.includes("noindex"),
  "Admin API: X-Robots-Tag noindex başlığı eksik",
);

const privateReservationResponse = await fetchWithRetry("/api/reservations/non-existent", 30, {
  redirect: "manual",
});
assert(privateReservationResponse.status === 401, "Rezervasyon API: anonim kişisel veri erişimi engellenmeli");
assert(
  privateReservationResponse.headers.get("x-robots-tag")?.includes("noindex"),
  "Rezervasyon API: X-Robots-Tag noindex başlığı eksik",
);
assert(
  privateReservationResponse.headers.get("cache-control")?.includes("no-store"),
  "Rezervasyon API: kişisel yanıtlar önbelleğe alınmamalı",
);

for (const [payload, label] of [
  [{ customerName: "A", customerPhone: "123", date: "2099-10-10", time: "10:00" }, "alan doğrulama"],
  [{ customerName: "Test User", customerPhone: "+905551112233", date: "2099-02-31", time: "10:00" }, "takvim tarihi"],
  [{ customerName: "Test User", customerPhone: "+905551112233", date: "2000-01-01", time: "10:00" }, "geçmiş tarih"],
  [{ customerName: "Test User", customerPhone: "+905551112233", date: "2099-10-10", time: "22:30" }, "çalışma saati"],
]) {
  const response = await fetchWithRetry("/api/reservations", 30, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  assert(response.status === 400, `Rezervasyon API: ${label} reddedilmeli`);
}

const indexNowKey = "4f9d1a7c8b6e3f205d72a941ce8b604a";
const indexNowResponse = await fetchWithRetry(`/${indexNowKey}.txt`);
assert(indexNowResponse.status === 200, "IndexNow: anahtar dosyası yayınlanmalı");
assert((await indexNowResponse.text()).trim() === indexNowKey, "IndexNow: anahtar içeriği yanlış");
const indexNowScript = await readFile(
  path.resolve(path.dirname(fileURLToPath(import.meta.url)), "submit-indexnow.mjs"),
  "utf8",
);
for (const guidePath of [
  "/en/blog/turkish-breakfast-istanbul",
  "/en/blog/classic-turkish-breakfast",
  "/en/blog/simit-turkish-bagel",
  "/es",
  "/es/blog/desayuno-turco-clasico",
  "/es/blog/bal-kaymak-estambul",
  "/ru/blog/turetskiy-zavtrak-stambul",
  "/ar/blog/turkish-breakfast-istanbul",
  "/ko",
  "/ko/blog/istanbul-bal-kaymak",
  "/ko/blog/kaymak-nedir",
  "/ko/blog/turkish-breakfast-istanbul",
  "/ko/blog/taksim-kahvalti-rehberi",
  "/ko/blog/korean-tour-guide-van-breakfast",
  "/ja/blog/istanbul-bal-kaymak",
  "/zh-cn",
  "/zh-cn/blog/istanbul-bal-kaymak",
  "/zh-cn/blog/taksim-turkish-breakfast",
  "/rezervasyon",
  "/en/rezervasyon",
  "/gizlilik",
  "/cerez-politikasi",
]) {
  assert(indexNowScript.includes(guidePath), `IndexNow: yeni rehber varsayılan bildirim listesinde eksik (${guidePath})`);
}

const googleVerificationFile = "google2920058c70b54fb8.html";
const googleVerificationResponse = await fetchWithRetry(`/${googleVerificationFile}`);
assert(googleVerificationResponse.status === 200, "Search Console: HTML doğrulama dosyası yayınlanmalı");
assert(
  (await googleVerificationResponse.text()).trim() ===
    `google-site-verification: ${googleVerificationFile}`,
  "Search Console: HTML doğrulama dosyası içeriği yanlış",
);

for (const [path, destination] of redirectRules) {
  const response = await fetchWithRetry(path, 30, { redirect: "manual" });
  assert(response.status === 308, `Eski URL kalıcı 308 dönmeli: ${path}`);
  assert(new URL(response.headers.get("location"), baseUrl).href === new URL(destination, baseUrl).href, `Eski URL hedefi yanlış: ${path}`);

  const slashPath = `${path.replace(/\/+$/, "")}/`;
  const slashResponse = await fetchWithRetry(slashPath, 30, { redirect: "manual" });
  assert(slashResponse.status === 308, `Eski URL slash'li hali tek adımda 308 dönmeli: ${slashPath}`);
  assert(new URL(slashResponse.headers.get("location"), baseUrl).href === new URL(destination, baseUrl).href, `Eski URL slash'li hali tek adımda hedefe gitmeli: ${slashPath}`);
}

const normalSlashResponse = await fetchWithRetry("/menu/", 30, { redirect: "manual" });
assert(normalSlashResponse.status === 308, "Normal sayfa slash'li hali tek adımda 308 dönmeli: /menu/");
assert(new URL(normalSlashResponse.headers.get("location"), baseUrl).href === new URL("/menu", baseUrl).href, "Normal sayfa slash'li hali /menu'ye gitmeli");

const wcAjaxResponse = await fetchWithRetry("/?wc-ajax=%%endpoint%%", 30, { redirect: "manual" });
assert(wcAjaxResponse.status === 308, "wc-ajax sorgusu temiz kanonik URL'ye yönlenmeli");
assert(new URL(wcAjaxResponse.headers.get("location"), baseUrl).href === new URL("/", baseUrl).href, "wc-ajax sorgusu ana sayfaya yönlenmeli");

for (const path of internalPaths) {
  const response = await fetchWithRetry(path, 30, { redirect: "manual" });
  assert(response.status === 200, `Dahili bağlantı doğrudan 200 dönmeli: ${path} (HTTP ${response.status})`);
}

const apexResponse = await requestWithHost("/host-normalization-test", "tarihivankahvaltievi.com");
assert(apexResponse.status === 308, "Apex alan adı kalıcı yönlenmeli");
assert(
  apexResponse.location === `${canonicalSiteUrl}/host-normalization-test`,
  "Apex alan adı www kanoniğine yönlenmeli",
);

for (const metadataPath of ["/robots.txt", "/sitemap.xml", "/llms.txt"]) {
  const response = await requestWithHost(metadataPath, "tarihivankahvaltievi.com");
  assert(response.status === 308 && response.location === `${canonicalSiteUrl}${metadataPath}`, `${metadataPath}: apex metadata kanonik www adresine gitmeli`);
}

const missing = await fetchWithRetry("/seo-contract-missing-page");
const missingHtml = await missing.text();
assert(missing.status === 404, "Bilinmeyen rota gerçek 404 dönmeli");
assert(/<meta\s+name="robots"\s+content="[^"]*noindex/i.test(missingHtml), "404 sayfası noindex olmalı");

for (const [prefix, language] of [["", "tr"], ["/en", "en"], ["/ko", "ko"], ["/zh-cn", "zh-CN"], ["/es", "es"], ["/ar", "ar"], ["/ru", "ru"], ["/ja", "ja"]]) {
  const missingPath = `${prefix}/seo-contract-missing-page`;
  const response = await fetchWithRetry(missingPath);
  const html = await response.text();
  assert(response.status === 404, `${missingPath}: gerçek 404 dönmeli`);
  assertDocumentLanguage(html, response, language, missingPath);
  assert(/<meta\s+name="robots"\s+content="[^"]*noindex/i.test(html), `${missingPath}: noindex eksik`);
}
for (const [source, destination] of [["/iletisim/?wc-ajax=1&utm_source=seo_audit", "/konum?utm_source=seo_audit"], ["/en/?wc-ajax=1&utm_source=seo_audit", "/en?utm_source=seo_audit"], ["/kafka-cafe/?wc-ajax=1&utm_source=seo_audit", "/menu?utm_source=seo_audit#turk-kahvesi"]]) {
  const response = await fetchWithRetry(source, 30, { redirect: "manual" });
  assert(response.status === 308, `${source}: kalıcı yönlendirme eksik`);
  assert(new URL(response.headers.get("location"), baseUrl).href === new URL(destination, baseUrl).href, `${source}: birleştirilmiş hedef yanlış`);
}
if (new URL(baseUrl).hostname === "127.0.0.1") {
  const combined = await requestWithHost("/iletisim/?wc-ajax=1&utm_source=seo_audit", "tarihivankahvaltievi.com");
  assert(combined.status === 308 && combined.location === `${canonicalSiteUrl}/konum?utm_source=seo_audit`, "Apex/eski rota/slash/sorgu tek hedefte birleştirilmeli");
}

console.log(
  `SEO sözleşmesi geçti: ${canonicalUrls.size} kanonik sayfa indekslenebilir; ${redirectRules.length} bilinen eski URL doğru hedefe gider; hreflang, öncelik ve güncellenme sıklığı içeren kapsamlı görsel sitemap, IndexNow, robots, Restaurant/Menu/FAQ şeması ve 404 doğru.`,
);
