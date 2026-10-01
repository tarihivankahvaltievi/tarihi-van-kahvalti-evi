import assert from "node:assert/strict";
import { mkdtemp, readFile, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { spawn } from "node:child_process";
import { randomBytes } from "node:crypto";
import { createServer } from "node:net";

// Starts its own loopback-only production server with isolated menu storage.
// It cannot target a live website, database, or IndexNow endpoint.
const testDirectory = await mkdtemp(path.join(tmpdir(), "van-menu-test-"));
const menuFile = path.join(testDirectory, "menu.json");
const baseline = JSON.parse(await readFile("src/app/menu/menu-data.json", "utf8"));
await writeFile(menuFile, JSON.stringify(baseline));
const portProbe = createServer();
await new Promise((resolve) => portProbe.listen(0, "127.0.0.1", resolve));
const port = portProbe.address().port;
await new Promise((resolve) => portProbe.close(resolve));
const base = `http://127.0.0.1:${port}`;
const password = randomBytes(24).toString("hex");
const server = spawn(process.execPath, ["node_modules/next/dist/bin/next", "start", "--hostname", "127.0.0.1", "--port", String(port)], {
  env: { ...process.env, SUPABASE_URL: "", SUPABASE_SERVICE_ROLE_KEY: "", MENU_DATA_FILE: menuFile, INDEXNOW_DRY_RUN: "1", ADMIN_PASSWORD: password, ADMIN_SESSION_SECRET: randomBytes(24).toString("hex") },
  stdio: ["ignore", "pipe", "pipe"],
});
let serverLog = "";
server.stdout.on("data", (chunk) => { serverLog += chunk; });
server.stderr.on("data", (chunk) => { serverLog += chunk; });
const plainHtml = (html) => html.replace(/<script\b[\s\S]*?<\/script>/gi, "").replace(/<style\b[\s\S]*?<\/style>/gi, "");

async function verifyMenu(route, expected, locale) {
  const response = await fetch(`${base}${route}`);
  assert.equal(response.status, 200);
  const html = await response.text();
  const plain = plainHtml(html);
  const articles = [...plain.matchAll(/<article\b[^>]*data-menu-item="true"[^>]*>[\s\S]*?<\/article>/gi)];
  assert.equal(articles.length, expected.items.length, `${route}: actual HTML product count`);
  const scripts = [...html.matchAll(/<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/gi)];
  const graph = JSON.parse(scripts[0][1])["@graph"];
  const sections = graph.find((entry) => entry["@type"] === "Menu").hasMenuSection;
  assert.equal(sections.length, expected.categories.length);
  const schemaItems = sections.flatMap((section) => section.hasMenuItem);
  const escapedText = (value) => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#x27;");
  for (const item of expected.items) {
    const article = articles.find((entry) => entry[0].includes(`id="${item.id}"`))?.[0];
    assert.ok(article, `${route}: missing real anchor ${item.id}`);
    assert.ok(article.includes(item.price), `${route}: wrong visible price ${item.id}`);
    const schemaItem = schemaItems.find((entry) => entry.url.endsWith(`#${item.id}`));
    assert.ok(schemaItem, `${route}: schema item ${item.id}`);
    const description = locale === "en" ? item.translations?.en?.description ?? item.description : item.description;
    assert.equal(schemaItem.description, description);
    assert.ok(article.includes(escapedText(description)), `${route}: stale visible description ${item.id}`);
    assert.equal(schemaItem.offers?.price, item.price.match(/^₺?(\d+)/)?.[1]);
    assert.equal(schemaItem.offers?.priceCurrency, "TRY");
  }
  assert.ok(plain.includes('id="main-content"'));
  assert.ok(plain.includes(locale === "en" ? "Minimum 2 people." : "Minimum 2 kişi için servis edilir."));
  const serpme = expected.items.find((item) => item.id === "serpme-fix-menu");
  assert.ok(plain.includes(locale === "en" ? serpme.translations.en.details[1] : serpme.details[1]));
}

async function verifyHomePrices(expected) {
  const price = expected.items.find((item) => item.id === "serpme-fix-menu").price;
  for (const route of ["/", "/en"]) {
    const html = plainHtml(await (await fetch(`${base}${route}`)).text());
    const preview = html.match(/<p class="hero-breakfast-price">[\s\S]*?<\/p>/)?.[0];
    assert.ok(preview?.includes(price), `${route}: homepage price does not match live menu`);
  }
}

async function verifyBookingInclusions(expected) {
  const item = expected.items.find((entry) => entry.id === "serpme-fix-menu");
  for (const [route, details] of [["/rezervasyon", item.details], ["/en/rezervasyon", item.translations.en.details]]) {
    const html = plainHtml(await (await fetch(`${base}${route}`)).text());
    assert.ok(html.includes('id="ordering-guide"'), `${route}: ordering guide missing`);
    assert.ok(html.includes(details[1]), `${route}: booking guide still shows stale inclusions`);
  }
}

async function verifySitemapDates() {
  const xml = await (await fetch(`${base}/sitemap.xml`)).text();
  for (const match of xml.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)) {
    assert.ok(Date.parse(match[1]) <= Date.now(), `Future sitemap lastmod: ${match[1]}`);
  }
}

try {
  // Assert the build itself contains real products, before any streaming JS.
  for (const route of ["menu", "en/menu"]) {
    const prerender = plainHtml(await readFile(`.next/server/app/${route}.html`, "utf8"));
    assert.equal((prerender.match(/data-menu-item="true"/g) ?? []).length, baseline.items.length, `${route}: prerender requires JavaScript`);
    assert.ok(!prerender.includes('id="S:0"'), `${route}: product content hidden in streamed chunk`);
  }
  let ready = false;
  for (let attempt = 0; attempt < 60; attempt++) {
    if (server.exitCode !== null) throw new Error(`Test server exited: ${serverLog}`);
    if (serverLog.includes("Ready")) {
      try { ready = (await fetch(`${base}/api/admin/menu`)).ok; } catch { /* starting */ }
    }
    if (ready) break;
    await new Promise((resolve) => setTimeout(resolve, 150));
  }
  assert.ok(ready, `Local test server did not start: ${serverLog}`);
  const unauthorized = await fetch(`${base}/api/admin/menu`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(baseline) });
  assert.equal(unauthorized.status, 401);
  const auth = await fetch(`${base}/api/admin/auth`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }) });
  assert.equal(auth.status, 200);
  const cookie = auth.headers.get("set-cookie")?.split(";")[0];
  assert.ok(cookie);
  async function save(data) {
    const response = await fetch(`${base}/api/admin/menu`, { method: "POST", headers: { "Content-Type": "application/json", Cookie: cookie }, body: JSON.stringify(data) });
    assert.equal(response.status, 200, "Admin fixture save failed");
  }
  // Force a fresh tag so another build/test's cached fixture cannot affect us.
  await save(baseline);
  await verifyMenu("/menu", baseline, "tr");
  await verifyMenu("/en/menu", baseline, "en");
  await verifyHomePrices(baseline);
  await verifyBookingInclusions(baseline);
  const changed = structuredClone(baseline);
  changed.lastUpdated = new Intl.DateTimeFormat("tr-TR", { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Istanbul" }).format(new Date());
  changed.items[0].price = "₺971";
  changed.items[0].description = "Yalnız izole test ürün açıklaması";
  changed.items[0].translations.en.description = "Isolated test product description only";
  changed.items[0].details[1] = "Yalnız izole test çay kapsamı";
  changed.items[0].translations.en.details[1] = "Isolated test tea inclusion only";
  changed.categories.push({ id: "test-category", label: "Deneme Kategorisi", shortLabel: "Deneme", description: "Only an isolated test fixture.", image: "", imageAlt: "", translations: { en: { label: "Test Category" } } });
  changed.items.push({ ...structuredClone(baseline.items[0]), id: "test-item", category: "test-category", name: "Deneme Ürünü", price: "₺123" });
  await save(changed);
  await verifyMenu("/menu", changed, "tr");
  await verifyMenu("/en/menu", changed, "en");
  await verifyHomePrices(changed);
  await verifyBookingInclusions(changed);
  await verifySitemapDates();
  await save(baseline);
  await verifyMenu("/menu", baseline, "tr");
  await verifyMenu("/en/menu", baseline, "en");
  await verifyHomePrices(baseline);
  await verifyBookingInclusions(baseline);
  console.log(`Menü testi geçti: ${baseline.items.length} ürün / ${baseline.categories.length} kategori gerçek prerender HTML'de; TR/EN fiyat-açıklama-şema eşleşmesi, yetkisiz yazma engeli, rezervasyonda güncel dahil ürünler, anında önbellek yenileme ve yeni kategori görünürlüğü doğrulandı.`);
} finally {
  server.kill("SIGTERM");
  await new Promise((resolve) => { if (server.exitCode !== null) resolve(); else server.once("exit", resolve); });
  await rm(testDirectory, { recursive: true, force: true });
}
