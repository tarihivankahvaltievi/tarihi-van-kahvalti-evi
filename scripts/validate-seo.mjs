const baseUrl = process.env.SEO_TEST_BASE_URL ?? "http://127.0.0.1:3100";

const routes = [
  { path: "/", canonical: "https://www.tarihivankahvaltievi.com", types: ["WebSite", "Restaurant", "WebPage", "FAQPage"], indexable: true },
  { path: "/menu", canonical: "https://www.tarihivankahvaltievi.com/menu", types: ["WebPage", "BreadcrumbList", "Menu"], indexable: false },
  { path: "/iletisim", canonical: "https://www.tarihivankahvaltievi.com/iletisim", types: ["ContactPage", "BreadcrumbList"], indexable: false },
  { path: "/sss", canonical: "https://www.tarihivankahvaltievi.com/sss", types: ["WebPage", "BreadcrumbList", "FAQPage"], indexable: false },
  { path: "/kafka-cafe", canonical: "https://www.tarihivankahvaltievi.com/kafka-cafe", types: ["WebPage", "BreadcrumbList"], indexable: false },
];

const canonicalUrls = new Set(routes.filter((route) => route.indexable).map((route) => route.canonical));
const internalPaths = new Set();
const redirectPaths = [
  "/istanbul-van-kahvaltisi", "/van-kahvaltisi", "/beyoglu-kahvalti", "/taksim-kahvalti",
  "/serpme-van-kahvaltisi", "/serpme-kahvalti-beyoglu", "/istiklal-caddesi-kahvalti",
  "/cihangir-kahvalti", "/galata-kahvalti", "/aile-kahvaltisi-beyoglu", "/grup-kahvaltisi",
  "/hafta-sonu-kahvalti", "/kahvalti-rezervasyon", "/kahvalti-yol-tarifi",
  "/zambak-sokak-kahvalti", "/siraselviler-kahvalti", "/kahvalti-fiyatlari",
  "/van-otlu-peynir", "/murtuga-kavut", "/tarihi-mekanda-kahvalti",
  "/kahvalti-sonrasi-kahve", "/vejetaryen-kahvalti-beyoglu",
  "/beyoglu-kahvalti-mekanlari", "/taksim-brunch-kahvalti",
  "/anasayfa", "/tarihi-van-kahvaltisi-evi-menu", "/van-kahvalti",
  "/gercek-van-kahvaltisinda-neler-olur", "/tarihi-van-kahvalti-evi-hikayemiz",
  "/galeri-van-kahvalti-evi-taksim", "/urun/van-serpme-kahvalti",
  "/urun/cift-kisilik-serpme-kahvalti", "/urun/turk-kahvesi",
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

async function fetchWithRetry(path, attempts = 30, redirect = "follow") {
  let lastError;
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    try {
      const response = await fetch(`${baseUrl}${path}`, { redirect });
      return response;
    } catch (error) {
      lastError = error;
      await new Promise((resolve) => setTimeout(resolve, 250));
    }
  }
  throw lastError;
}

for (const route of routes) {
  const response = await fetchWithRetry(route.path);
  const html = await response.text();
  const text = visibleText(html);
  const routeLabel = route.path || "/";

  assert(response.status === 200, `${routeLabel}: HTTP ${response.status}`);

  const canonicalMatches = [...html.matchAll(/<link\s+rel="canonical"\s+href="([^"]+)"/gi)];
  assert(canonicalMatches.length === 1, `${routeLabel}: tek canonical bulunmalı`);
  assert(canonicalMatches[0][1] === route.canonical, `${routeLabel}: canonical yanlış`);

  const title = decodeHtml(html.match(/<title>([^<]*)<\/title>/i)?.[1] ?? "");
  const description = decodeHtml(html.match(/<meta\s+name="description"\s+content="([^"]*)"/i)?.[1] ?? "");
  assert(title.length >= 20 && title.length <= 65, `${routeLabel}: title uzunluğu ${title.length}`);
  assert(description.length >= 80 && description.length <= 160, `${routeLabel}: description uzunluğu ${description.length}`);
  assert((visibleHtml(html).match(/<h1\b/gi) ?? []).length === 1, `${routeLabel}: tam bir H1 bulunmalı`);
  const isNoindex = /<meta\s+name="robots"\s+content="[^"]*noindex/i.test(html);
  assert(route.indexable ? !isNoindex : isNoindex, `${routeLabel}: indeksleme tercihi yanlış`);

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
  assert(!actualTypes.includes("Article"), `${routeLabel}: doğrulanmamış Article şeması var`);
  if (route.path === "/") {
    const restaurant = graphDocument["@graph"].find((node) => node["@type"] === "Restaurant");
    assert(restaurant?.alternateName === "Tarihi Van Kahvaltı Evi 1978", "Ana sayfa: işletme aliası yanlış");
    assert(restaurant?.logo === "https://www.tarihivankahvaltievi.com/icons/icon-512.png", "Ana sayfa: logo yanlış");
    assert(restaurant?.email === "info@tarihivankahvaltievi.com", "Ana sayfa: işletme e-postası yanlış");
    assert(!("geo" in restaurant), "Ana sayfa: doğrulanmamış koordinat yayınlanmamalı");
    assert(text.toLocaleLowerCase("tr-TR").includes("van kahvaltıcısı"), "Ana sayfa: hedef ifade görünür değil");
  }

  if (route.path === "/" || route.path === "/sss") {
    const faq = graphDocument["@graph"].find((node) => node["@type"] === "FAQPage");
    const questions = faq?.mainEntity?.map((item) => item.name) ?? [];
    const summaries = [...visibleHtml(html).matchAll(/<summary[^>]*>([\s\S]*?)<\/summary>/gi)]
      .map((match) => decodeHtml(match[1].replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim());
    assert(questions.length === 10 && new Set(questions).size === questions.length, "/sss: şema soruları benzersiz değil");
    assert(summaries.length === 10 && new Set(summaries).size === summaries.length, "/sss: görünür sorular benzersiz değil");
    assert(questions.every((question) => summaries.includes(question)), "/sss: görünür içerik ve şema eşleşmiyor");
  }
}

const sitemap = await (await fetchWithRetry("/sitemap.xml")).text();
assert(sitemap.includes(`<loc>https://www.tarihivankahvaltievi.com</loc>`), "Sitemap: ana sayfa eksik");
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
const sitemapLastModified = [...sitemap.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)].map((match) => match[1]);
const sitemapImages = [...sitemap.matchAll(/<image:loc>([^<]+)<\/image:loc>/g)].map((match) => match[1]);
assert(sitemapUrls.length === 1, "Sitemap: yalnız ana sayfa bulunmalı");
assert(sitemapUrls.every((url) => canonicalUrls.has(url)), "Sitemap: kanonik olmayan URL var");
assert(sitemapLastModified.length === 1, "Sitemap: ana sayfada lastmod bulunmalı");
assert(
  sitemapLastModified.every((value) => Number.isFinite(Date.parse(value)) && Date.parse(value) <= Date.now()),
  "Sitemap: lastmod geçerli ve gelecekte olmayan bir tarih olmalı",
);
assert(sitemapImages.length >= 4, "Sitemap: ana sayfa görselleri eksik");
assert(
  sitemapImages.every((url) => url.startsWith("https://www.tarihivankahvaltievi.com/images/")),
  "Sitemap: görsel URL'si kanonik alan adında olmalı",
);

const robots = await (await fetchWithRetry("/robots.txt")).text();
assert(robots.includes("User-Agent: *"), "robots.txt: genel bot kuralı eksik");
assert(robots.includes("https://www.tarihivankahvaltievi.com/sitemap.xml"), "robots.txt: sitemap eksik");

for (const path of redirectPaths) {
  const response = await fetchWithRetry(path, 30, "manual");
  assert(response.status === 308, `Arama URL'si kalıcı 308 dönmeli: ${path}`);
  assert(response.headers.get("location") === "/", `Arama URL'si ana sayfaya gitmeli: ${path}`);
}

for (const path of internalPaths) {
  const response = await fetchWithRetry(path, 30, "manual");
  assert(response.status === 200, `Dahili bağlantı doğrudan 200 dönmeli: ${path} (HTTP ${response.status})`);
}

const missing = await fetchWithRetry("/seo-contract-missing-page");
const missingHtml = await missing.text();
assert(missing.status === 404, "Bilinmeyen rota gerçek 404 dönmeli");
assert(/<meta\s+name="robots"\s+content="noindex"/i.test(missingHtml), "404 sayfası noindex olmalı");

console.log(
  `SEO sözleşmesi geçti: yalnız ana sayfa indekslenebilir; ${redirectPaths.length} arama URL'si doğrudan ana sayfaya gider; sitemap, dahili bağlantılar, robots ve 404 doğru.`,
);
