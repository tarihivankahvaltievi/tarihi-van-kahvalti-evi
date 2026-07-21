import { request as httpRequest } from "node:http";
import { request as httpsRequest } from "node:https";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const baseUrl = process.env.SEO_TEST_BASE_URL ?? "http://127.0.0.1:3100";
const canonicalSiteUrl = "https://www.tarihivankahvaltievi.com";
const menuPageUrl = `${canonicalSiteUrl}/menu`;
const englishPageUrl = `${canonicalSiteUrl}/en`;
const englishMenuPageUrl = `${englishPageUrl}/menu`;
const guidePageUrl = `${canonicalSiteUrl}/van-kahvaltisi`;
const culturePageUrl = `${canonicalSiteUrl}/van-kahvaltisi-nedir`;
const englishBreakfastBlogUrl = `${canonicalSiteUrl}/en/blog/turkish-breakfast-istanbul`;
const russianBreakfastBlogUrl = `${canonicalSiteUrl}/ru/blog/turetskiy-zavtrak-stambul`;
const arabicBreakfastBlogUrl = `${canonicalSiteUrl}/ar/blog/turkish-breakfast-istanbul`;
const koreanHoneyKaymakBlogUrl = `${canonicalSiteUrl}/ko/blog/istanbul-bal-kaymak`;
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

const internationalGuideHreflang = {
  en: englishBreakfastBlogUrl,
  ru: russianBreakfastBlogUrl,
  ar: arabicBreakfastBlogUrl,
  ko: koreanHoneyKaymakBlogUrl,
  "x-default": englishBreakfastBlogUrl,
};

const routes = [
  {
    path: "/",
    canonical: canonicalSiteUrl,
    language: "tr",
    types: ["WebSite", "Restaurant", "WebPage", "FAQPage"],
    restaurantMenu: `${menuPageUrl}#menu`,
    faqCount: 10,
    sharedHomeDesign: true,
    visibleSignals: ["van kahvaltı evi", "beyoğlu", "taksim", "serpme kahvaltı"],
    hreflang: homeHreflang,
  },
  {
    path: "/menu",
    canonical: menuPageUrl,
    language: "tr",
    types: ["Restaurant", "WebPage", "BreadcrumbList", "Menu"],
    restaurantMenu: `${menuPageUrl}#menu`,
    faqCount: 0,
    menuSectionCount: 4,
    sharedMenuDesign: true,
    visibleSignals: ["menü", "van kahvaltısı", "murtuğa", "türk kahvesi"],
    hreflang: menuHreflang,
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
    faqCount: 4,
    visibleSignals: ["zambak sokak", "taksim", "beyoğlu", "yol tarifi"],
  },
  {
    path: "/en",
    canonical: englishPageUrl,
    language: "en",
    htmlLanguage: "tr",
    types: ["Restaurant", "WebPage", "BreadcrumbList", "FAQPage"],
    restaurantMenu: `${menuPageUrl}#menu`,
    faqCount: 6,
    sharedHomeDesign: true,
    visibleSignals: ["traditional turkish breakfast", "taksim", "van breakfast", "live menu"],
    hreflang: homeHreflang,
  },
  {
    path: "/en/menu",
    canonical: englishMenuPageUrl,
    language: "en",
    htmlLanguage: "tr",
    types: ["Restaurant", "WebPage", "BreadcrumbList", "Menu"],
    restaurantMenu: `${menuPageUrl}#menu`,
    faqCount: 0,
    menuSectionCount: 4,
    sharedMenuDesign: true,
    visibleSignals: ["traditional van breakfast", "prices", "murtuğa", "taksim"],
    hreflang: menuHreflang,
  },
  {
    path: "/en/blog/turkish-breakfast-istanbul",
    canonical: englishBreakfastBlogUrl,
    language: "en",
    htmlLanguage: "tr",
    types: ["Restaurant", "BlogPosting", "WebPage", "BreadcrumbList", "FAQPage"],
    restaurantMenu: `${menuPageUrl}#menu`,
    faqCount: 6,
    sharedGuideDesign: true,
    visibleSignals: ["turkish breakfast", "van breakfast", "taksim", "murtuğa", "since 1978"],
    hreflang: internationalGuideHreflang,
    sourcedGuide: true,
  },
  {
    path: "/ru/blog/turetskiy-zavtrak-stambul",
    canonical: russianBreakfastBlogUrl,
    language: "ru",
    htmlLanguage: "tr",
    types: ["Restaurant", "BlogPosting", "WebPage", "BreadcrumbList", "FAQPage"],
    restaurantMenu: `${menuPageUrl}#menu`,
    faqCount: 6,
    sharedGuideDesign: true,
    visibleSignals: ["турецкий завтрак", "ванский завтрак", "таксим", "муртуга", "1978"],
    hreflang: internationalGuideHreflang,
    sourcedGuide: true,
  },
  {
    path: "/ar/blog/turkish-breakfast-istanbul",
    canonical: arabicBreakfastBlogUrl,
    language: "ar",
    htmlLanguage: "tr",
    direction: "rtl",
    types: ["Restaurant", "BlogPosting", "WebPage", "BreadcrumbList", "FAQPage"],
    restaurantMenu: `${menuPageUrl}#menu`,
    faqCount: 6,
    sharedGuideDesign: true,
    visibleSignals: ["الفطور التركي", "فطور فان", "تقسيم", "المورتوغا", "1978"],
    hreflang: internationalGuideHreflang,
    sourcedGuide: true,
  },
  {
    path: "/ko/blog/istanbul-bal-kaymak",
    canonical: koreanHoneyKaymakBlogUrl,
    language: "ko",
    languageTag: "ko-KR",
    htmlLanguage: "tr",
    types: ["Restaurant", "BlogPosting", "WebPage", "BreadcrumbList", "FAQPage"],
    restaurantMenu: `${menuPageUrl}#menu`,
    faqCount: 6,
    sharedGuideDesign: true,
    visibleSignals: ["이스탄불 발 카이막", "터키식 아침 식사", "탁심", "1978", "꿀"],
    hreflang: internationalGuideHreflang,
    sourcedGuide: true,
  },
];

const legalRoutes = [
  { path: "/gizlilik", canonical: privacyPageUrl },
  { path: "/cerez-politikasi", canonical: cookiePolicyPageUrl },
];
const canonicalUrls = new Set([
  ...routes.map((route) => route.canonical),
  ...legalRoutes.map((route) => route.canonical),
]);
const internalPaths = new Set();
const internalLinkSources = new Map();
const redirectRules = [
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
  ["/kahvalti-rezervasyon", "/"],
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
  ["/anasayfa", "/"],
  ["/tarihi-van-kahvaltisi-evi-menu", "/menu"],
  ["/van-kahvalti", "/van-kahvaltisi"],
  ["/gercek-van-kahvaltisinda-neler-olur", "/van-kahvaltisi-nedir"],
  ["/tarihi-van-kahvalti-evi-hikayemiz", "/hikayemiz"],
  ["/galeri-van-kahvalti-evi-taksim", "/"],
  ["/urun/van-serpme-kahvalti", "/menu#geleneksel-van-kahvaltisi"],
  ["/urun/cift-kisilik-serpme-kahvalti", "/menu#iki-kisilik-van-sofrasi"],
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
    route.language === "tr" ? "tr-TR" : route.language === "ru" ? "ru-RU" : route.language === "ar" ? "ar-SA" : route.language === "ko" ? "ko-KR" : "en-US",
  );
  const routeLabel = route.path;

  assert(response.status === 200, `${routeLabel}: HTTP ${response.status}`);

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
  assert(title.length >= 35 && title.length <= 70, `${routeLabel}: title uzunluğu ${title.length}`);
  assert(
    description.length >= (route.language === "ko" ? 60 : 100) && description.length <= 170,
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
  assert(route.visibleSignals.every((signal) => lowerText.includes(signal)), `${routeLabel}: hedef görünür metin eksik`);

  if (route.sharedHomeDesign) {
    const sharedHomeClasses = [
      "site-shell theme-breakfast",
      "hero hero-parallax-dining",
      "gallery-section",
      "faq-section",
      "footer-reimagined",
    ];
    assert(
      sharedHomeClasses.every((className) => html.includes(className)),
      `${routeLabel}: ortak ana sayfa tasarım bileşenleri eksik`,
    );
  }

  if (route.sharedMenuDesign) {
    const sharedMenuClasses = [
      "__menuHero",
      "__discoveryBar",
      "__categoryNav",
      "__menuGrid",
      "__menuCard",
    ];
    assert(
      sharedMenuClasses.every((className) => html.includes(className)),
      `${routeLabel}: ortak menü tasarım bileşenleri eksik`,
    );
    const counterpart = route.language === "en" ? "/menu" : "/en/menu";
    assert(
      new RegExp(`<a[^>]+href="${counterpart}"[^>]*>`, "i").test(html),
      `${routeLabel}: menü dil geçişi eşdeğer sayfaya gitmiyor`,
    );
  }

  if (route.sharedGuideDesign) {
    const sharedGuideClasses = ["__hero", "__articleNav", "__menuList", "__reasons", "__practical", "__faq"];
    assert(
      sharedGuideClasses.every((className) => html.includes(className)),
      `${routeLabel}: ortak uluslararası rehber tasarımı eksik`,
    );
  }

  if (!route.sharedGuideDesign) {
    for (const [language, href] of Object.entries({
      en: "/en/blog/turkish-breakfast-istanbul",
      ru: "/ru/blog/turetskiy-zavtrak-stambul",
      ar: "/ar/blog/turkish-breakfast-istanbul",
      ko: "/ko/blog/istanbul-bal-kaymak",
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
  assert(restaurant?.["@id"] === `${canonicalSiteUrl}/#restaurant`, `${routeLabel}: restoran kimliği yanlış`);
  assert(restaurant?.alternateName === "Tarihi Van Kahvaltı Evi 1978", `${routeLabel}: işletme aliası yanlış`);
  assert(restaurant?.logo === `${canonicalSiteUrl}/icons/icon-512.png`, `${routeLabel}: logo yanlış`);
  assert(restaurant?.email === "info@tarihivankahvaltievi.com", `${routeLabel}: e-posta yanlış`);
  assert(restaurant?.hasMap === "https://www.google.com/maps?cid=10380797280962926014", `${routeLabel}: Maps CID yanlış`);
  assert(restaurant?.geo?.latitude === 41.0367655, `${routeLabel}: enlem yanlış`);
  assert(restaurant?.geo?.longitude === 28.9829478, `${routeLabel}: boylam yanlış`);
  assert(restaurant?.sameAs?.includes(restaurant.hasMap), `${routeLabel}: Maps sameAs eksik`);
  assert(
    restaurant?.sameAs?.includes("https://yandex.com/maps/org/tarihi_van_kahvalt_ve_arap_evi/237523878781/"),
    `${routeLabel}: Yandex Business sameAs eksik`,
  );
  assert(restaurant?.menu === route.restaurantMenu, `${routeLabel}: restoran menü URL'si yanlış`);

  const menu = graphDocument["@graph"].find((node) => node["@type"] === "Menu");
  if (route.types.includes("Menu")) {
    assert(menu?.["@id"] === `${route.canonical}#menu`, `${routeLabel}: menü kimliği yanlış`);
    assert(menu?.url === route.canonical, `${routeLabel}: menü URL'si yanlış`);
    assert(menu?.hasMenuSection?.length === route.menuSectionCount, `${routeLabel}: menü bölümleri eksik`);
  } else {
    assert(!menu, `${routeLabel}: görünür olmayan menü için şema bulunmamalı`);
  }

  const faq = graphDocument["@graph"].find((node) => node["@type"] === "FAQPage");
  const questions = faq?.mainEntity?.map((item) => item.name) ?? [];
  const summaries = [...visibleHtml(html).matchAll(/<summary[^>]*>([\s\S]*?)<\/summary>/gi)]
    .map((match) => decodeHtml(match[1].replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim());
  assert(questions.length === route.faqCount, `${routeLabel}: şema SSS sayısı yanlış`);
  assert(new Set(questions).size === questions.length, `${routeLabel}: şema soruları benzersiz değil`);
  assert(summaries.length === route.faqCount, `${routeLabel}: görünür SSS sayısı yanlış`);
  assert(questions.every((question) => summaries.includes(question)), `${routeLabel}: görünür SSS ve şema eşleşmiyor`);

  if (route.sourcedGuide) {
    const article = graphDocument["@graph"].find((node) => node["@type"] === "BlogPosting");
    assert(article?.citation?.length === 4, `${routeLabel}: dört birincil kaynak citation olarak bağlanmalı`);
    assert(article?.mentions?.length >= 3, `${routeLabel}: yöresel ürün entity bağları eksik`);
    assert(
      article.citation.every((url) => html.includes(`href="${url}"`)),
      `${routeLabel}: JSON-LD kaynakları görünür bağlantılarla eşleşmeli`,
    );
  }
}

for (const route of legalRoutes) {
  const response = await fetchWithRetry(route.path);
  const html = await response.text();
  const canonicalMatches = [...html.matchAll(/<link\s+rel="canonical"\s+href="([^"]+)"/gi)];

  assert(response.status === 200, `${route.path}: HTTP ${response.status}`);
  assert(canonicalMatches.length === 1, `${route.path}: tek canonical bulunmalı`);
  assert(canonicalMatches[0][1] === route.canonical, `${route.path}: canonical yanlış`);
  assert(!/<meta\s+name="robots"\s+content="[^"]*noindex/i.test(html), `${route.path}: noindex olmamalı`);
  assert((visibleHtml(html).match(/<h1\b/gi) ?? []).length === 1, `${route.path}: tam bir H1 bulunmalı`);
}

const sitemap = await (await fetchWithRetry("/sitemap.xml")).text();
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
const sitemapLastModified = [...sitemap.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)].map((match) => match[1]);
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
assert(sitemapImages.length >= 50, "Sitemap: kapsamlı görsel keşif listesi eksik");
assert(
  sitemapImages.every((url) => url.startsWith(`${canonicalSiteUrl}/images/`)),
  "Sitemap: görsel URL'si kanonik alan adında olmalı",
);
assert(sitemap.includes('hreflang="en"'), "Sitemap: İngilizce hreflang eksik");
assert(sitemap.includes('hreflang="ru"'), "Sitemap: Rusça hreflang eksik");
assert(sitemap.includes('hreflang="ar"'), "Sitemap: Arapça hreflang eksik");
assert(sitemap.includes('hreflang="ko"'), "Sitemap: Korece hreflang eksik");
assert(sitemap.includes('hreflang="x-default"'), "Sitemap: x-default hreflang eksik");

for (const guideUrl of [englishBreakfastBlogUrl, russianBreakfastBlogUrl, arabicBreakfastBlogUrl, koreanHoneyKaymakBlogUrl]) {
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
    `Sitemap: ${guideUrl} için dört keşfedilebilir görsel bulunmalı`,
  );
}

const appDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../src/app");
const appFiles = await readdir(appDirectory, { recursive: true });
const publicPagePaths = appFiles
  .filter((file) => file === "page.tsx" || file.endsWith("/page.tsx"))
  .map((file) => {
    const routePath = `/${file.replace(/\/page\.tsx$/, "")}`;
    return routePath === "/page.tsx" ? "/" : routePath;
  })
  .filter((routePath) => routePath !== "/admin")
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
for (const userAgent of ["Googlebot", "Bingbot", "YandexBot", "Applebot", "OAI-SearchBot", "PerplexityBot"]) {
  assert(robots.includes(`User-Agent: ${userAgent}`), `robots.txt: ${userAgent} keşif kuralı eksik`);
}
assert(robots.includes(`${canonicalSiteUrl}/sitemap.xml`), "robots.txt: sitemap eksik");
assert(!/^Disallow:\s*\/admin\s*$/im.test(robots), "robots.txt: admin noindex talimatının okunmasını engellememeli");
assert(/^Disallow:\s*\/api\/admin\/\s*$/im.test(robots), "robots.txt: yönetim API'si taramaya kapalı olmalı");

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
  "/ru/blog/turetskiy-zavtrak-stambul",
  "/ar/blog/turkish-breakfast-istanbul",
  "/ko/blog/istanbul-bal-kaymak",
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
  assert(response.headers.get("location") === destination, `Eski URL hedefi yanlış: ${path}`);
}

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

const missing = await fetchWithRetry("/seo-contract-missing-page");
const missingHtml = await missing.text();
assert(missing.status === 404, "Bilinmeyen rota gerçek 404 dönmeli");
assert(/<meta\s+name="robots"\s+content="noindex"/i.test(missingHtml), "404 sayfası noindex olmalı");

console.log(
  `SEO sözleşmesi geçti: ${canonicalUrls.size} kanonik sayfa indekslenebilir; ${redirectRules.length} bilinen eski URL doğru hedefe gider; hreflang, kapsamlı görsel sitemap, IndexNow, robots, Restaurant/Menu/FAQ şeması ve 404 doğru.`,
);
