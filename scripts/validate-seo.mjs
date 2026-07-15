const baseUrl = process.env.SEO_TEST_BASE_URL ?? "http://127.0.0.1:3100";

const routes = [
  { path: "/", canonical: "https://www.tarihivankahvaltievi.com", types: ["WebSite", "Restaurant", "WebPage"] },
  { path: "/menu", canonical: "https://www.tarihivankahvaltievi.com/menu", types: ["WebPage", "BreadcrumbList", "Menu"] },
  { path: "/iletisim", canonical: "https://www.tarihivankahvaltievi.com/iletisim", types: ["ContactPage", "BreadcrumbList"] },
  { path: "/sss", canonical: "https://www.tarihivankahvaltievi.com/sss", types: ["WebPage", "BreadcrumbList", "FAQPage"] },
  { path: "/van-kahvaltisi", canonical: "https://www.tarihivankahvaltievi.com/van-kahvaltisi", types: ["WebPage", "BreadcrumbList"] },
  { path: "/beyoglu-kahvalti", canonical: "https://www.tarihivankahvaltievi.com/beyoglu-kahvalti", types: ["WebPage", "BreadcrumbList"] },
  { path: "/kafka-cafe", canonical: "https://www.tarihivankahvaltievi.com/kafka-cafe", types: ["WebPage", "BreadcrumbList"] },
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

  if (route.path === "/sss") {
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
assert(routes.every((route) => sitemap.includes(`<loc>${route.canonical}</loc>`)), "Sitemap: kanonik rota eksik");

const robots = await (await fetchWithRetry("/robots.txt")).text();
assert(robots.includes("User-Agent: *"), "robots.txt: genel bot kuralı eksik");
assert(robots.includes("https://www.tarihivankahvaltievi.com/sitemap.xml"), "robots.txt: sitemap eksik");

const googleResultRedirect = await fetchWithRetry("/istanbul-van-kahvaltisi", 30, "manual");
assert(googleResultRedirect.status === 308, "Google sonuç URL'si kalıcı 308 dönmeli");
assert(googleResultRedirect.headers.get("location") === "/", "Google sonuç URL'si ana sayfaya gitmeli");

const missing = await fetchWithRetry("/seo-contract-missing-page");
const missingHtml = await missing.text();
assert(missing.status === 404, "Bilinmeyen rota gerçek 404 dönmeli");
assert(/<meta\s+name="robots"\s+content="noindex"/i.test(missingHtml), "404 sayfası noindex olmalı");

console.log(`SEO sözleşmesi geçti: ${routes.length} kanonik rota, sitemap, robots ve 404.`);
