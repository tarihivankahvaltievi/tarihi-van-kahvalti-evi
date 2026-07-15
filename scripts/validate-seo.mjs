import { request as httpRequest } from "node:http";

const baseUrl = process.env.SEO_TEST_BASE_URL ?? "http://127.0.0.1:3100";
const canonicalSiteUrl = "https://www.tarihivankahvaltievi.com";
const englishPageUrl = `${canonicalSiteUrl}/en`;

const routes = [
  {
    path: "/",
    canonical: canonicalSiteUrl,
    language: "tr",
    types: ["WebSite", "Restaurant", "WebPage", "Menu", "FAQPage"],
    faqCount: 10,
    visibleSignals: ["van kahvaltıcısı", "beyoğlu", "taksim", "van kahvaltısı menüsü"],
  },
  {
    path: "/en",
    canonical: englishPageUrl,
    language: "en",
    types: ["WebSite", "Restaurant", "WebPage", "Menu", "FAQPage"],
    faqCount: 6,
    visibleSignals: [
      "authentic van breakfast",
      "traditional turkish breakfast",
      "taksim square",
      "istanbul",
    ],
  },
];

const canonicalUrls = new Set(routes.map((route) => route.canonical));
const internalPaths = new Set();
const redirectRules = [
  ["/istanbul-van-kahvaltisi", "/"],
  ["/van-kahvaltisi", "/"],
  ["/beyoglu-kahvalti", "/"],
  ["/taksim-kahvalti", "/"],
  ["/serpme-van-kahvaltisi", "/"],
  ["/serpme-kahvalti-beyoglu", "/"],
  ["/istiklal-caddesi-kahvalti", "/"],
  ["/cihangir-kahvalti", "/"],
  ["/galata-kahvalti", "/"],
  ["/aile-kahvaltisi-beyoglu", "/"],
  ["/grup-kahvaltisi", "/"],
  ["/hafta-sonu-kahvalti", "/"],
  ["/kahvalti-rezervasyon", "/"],
  ["/kahvalti-yol-tarifi", "/"],
  ["/zambak-sokak-kahvalti", "/"],
  ["/siraselviler-kahvalti", "/"],
  ["/kahvalti-fiyatlari", "/"],
  ["/van-otlu-peynir", "/"],
  ["/murtuga-kavut", "/"],
  ["/tarihi-mekanda-kahvalti", "/"],
  ["/kahvalti-sonrasi-kahve", "/"],
  ["/vejetaryen-kahvalti-beyoglu", "/"],
  ["/beyoglu-kahvalti-mekanlari", "/"],
  ["/taksim-brunch-kahvalti", "/"],
  ["/menu", "/#menu"],
  ["/iletisim", "/#contact"],
  ["/sss", "/#faq"],
  ["/kafka-cafe", "/#menu"],
  ["/turkish-breakfast-istanbul", "/en"],
  ["/breakfast-near-taksim", "/en"],
  ["/zavtrak-taksim-stambul", "/"],
  ["/arabic-breakfast-taksim", "/"],
  ["/anasayfa", "/"],
  ["/tarihi-van-kahvaltisi-evi-menu", "/"],
  ["/van-kahvalti", "/"],
  ["/gercek-van-kahvaltisinda-neler-olur", "/"],
  ["/tarihi-van-kahvalti-evi-hikayemiz", "/"],
  ["/galeri-van-kahvalti-evi-taksim", "/"],
  ["/urun/van-serpme-kahvalti", "/"],
  ["/urun/cift-kisilik-serpme-kahvalti", "/"],
  ["/urun/turk-kahvesi", "/"],
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

const attribute = (tag, name) =>
  decodeHtml(tag.match(new RegExp(`${name}="([^"]*)"`, "i"))?.[1] ?? "");

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
    const request = httpRequest(
      {
        hostname: target.hostname,
        port: target.port,
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
  const lowerText = text.toLocaleLowerCase(route.language === "tr" ? "tr-TR" : "en-US");
  const routeLabel = route.path;

  assert(response.status === 200, `${routeLabel}: HTTP ${response.status}`);

  const canonicalMatches = [...html.matchAll(/<link\s+rel="canonical"\s+href="([^"]+)"/gi)];
  assert(canonicalMatches.length === 1, `${routeLabel}: tek canonical bulunmalı`);
  assert(canonicalMatches[0][1] === route.canonical, `${routeLabel}: canonical yanlış`);

  const alternateTags = [...html.matchAll(/<link\b[^>]*\brel="alternate"[^>]*>/gi)].map(
    (match) => match[0],
  );
  const alternates = new Map(
    alternateTags.map((tag) => [attribute(tag, "hreflang"), attribute(tag, "href")]),
  );
  assert(alternates.get("tr") === canonicalSiteUrl, `${routeLabel}: tr hreflang yanlış`);
  assert(alternates.get("en") === englishPageUrl, `${routeLabel}: en hreflang yanlış`);
  assert(alternates.get("x-default") === canonicalSiteUrl, `${routeLabel}: x-default yanlış`);

  const title = decodeHtml(html.match(/<title>([^<]*)<\/title>/i)?.[1] ?? "");
  const description = decodeHtml(
    html.match(/<meta\s+name="description"\s+content="([^"]*)"/i)?.[1] ?? "",
  );
  assert(title.length >= 35 && title.length <= 70, `${routeLabel}: title uzunluğu ${title.length}`);
  assert(
    description.length >= 100 && description.length <= 170,
    `${routeLabel}: description uzunluğu ${description.length}`,
  );
  assert((visibleHtml(html).match(/<h1\b/gi) ?? []).length === 1, `${routeLabel}: tam bir H1 bulunmalı`);
  assert(!/<meta\s+name="robots"\s+content="[^"]*noindex/i.test(html), `${routeLabel}: noindex olmamalı`);
  assert(route.visibleSignals.every((signal) => lowerText.includes(signal)), `${routeLabel}: hedef görünür metin eksik`);

  for (const match of html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/gi)) {
    const href = decodeHtml(match[1]);
    if (!href.startsWith("/")) continue;
    internalPaths.add(new URL(href, baseUrl).pathname);
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

  const menu = graphDocument["@graph"].find((node) => node["@type"] === "Menu");
  assert(menu?.url === `${route.canonical}#menu`, `${routeLabel}: menü URL'si yanlış`);
  assert(menu?.hasMenuSection?.length === 3, `${routeLabel}: menü bölümleri eksik`);

  const faq = graphDocument["@graph"].find((node) => node["@type"] === "FAQPage");
  const questions = faq?.mainEntity?.map((item) => item.name) ?? [];
  const summaries = [...visibleHtml(html).matchAll(/<summary[^>]*>([\s\S]*?)<\/summary>/gi)]
    .map((match) => decodeHtml(match[1].replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim());
  assert(questions.length === route.faqCount, `${routeLabel}: şema SSS sayısı yanlış`);
  assert(new Set(questions).size === questions.length, `${routeLabel}: şema soruları benzersiz değil`);
  assert(summaries.length === route.faqCount, `${routeLabel}: görünür SSS sayısı yanlış`);
  assert(questions.every((question) => summaries.includes(question)), `${routeLabel}: görünür SSS ve şema eşleşmiyor`);
}

const sitemap = await (await fetchWithRetry("/sitemap.xml")).text();
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
const sitemapLastModified = [...sitemap.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)].map((match) => match[1]);
const sitemapImages = [...sitemap.matchAll(/<image:loc>([^<]+)<\/image:loc>/g)].map((match) => match[1]);
assert(sitemapUrls.length === 2, "Sitemap: iki kanonik dil URL'si bulunmalı");
assert(sitemapUrls.every((url) => canonicalUrls.has(url)), "Sitemap: kanonik olmayan URL var");
assert(sitemapLastModified.length === 2, "Sitemap: lastmod sayısı yanlış");
assert(
  sitemapLastModified.every((value) => Number.isFinite(Date.parse(value)) && Date.parse(value) <= Date.now()),
  "Sitemap: lastmod geçerli ve gelecekte olmayan bir tarih olmalı",
);
assert(sitemapImages.length >= 6, "Sitemap: görseller eksik");
assert(
  sitemapImages.every((url) => url.startsWith(`${canonicalSiteUrl}/images/`)),
  "Sitemap: görsel URL'si kanonik alan adında olmalı",
);
assert((sitemap.match(/hreflang="tr"/g) ?? []).length === 2, "Sitemap: tr alternates eksik");
assert((sitemap.match(/hreflang="en"/g) ?? []).length === 2, "Sitemap: en alternates eksik");
assert((sitemap.match(/hreflang="x-default"/g) ?? []).length === 2, "Sitemap: x-default eksik");

const robots = await (await fetchWithRetry("/robots.txt")).text();
assert(robots.includes("User-Agent: *"), "robots.txt: genel bot kuralı eksik");
assert(robots.includes("User-Agent: OAI-SearchBot"), "robots.txt: OAI-SearchBot kuralı eksik");
assert(robots.includes(`${canonicalSiteUrl}/sitemap.xml`), "robots.txt: sitemap eksik");

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
  `SEO sözleşmesi geçti: TR ve EN kanonik sayfalar indekslenebilir; ${redirectRules.length} bilinen eski URL doğru hedefe gider; hreflang, sitemap, robots, Restaurant/Menu/FAQ şeması ve 404 doğru.`,
);
