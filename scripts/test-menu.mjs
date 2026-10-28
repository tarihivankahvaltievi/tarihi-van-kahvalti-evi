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
const reservationFile = path.join(testDirectory, "reservations.json");
const pastReservation = { id: "isolated-past-reservation", customerName: "Isolated visit fixture", customerPhone: "05321234567", date: "2020-01-01", time: "10:00", guests: 2, serviceType: "breakfast", status: "confirmed", source: "website", createdAt: "2020-01-01T07:00:00Z", updatedAt: "2020-01-01T07:00:00Z" };
await writeFile(reservationFile, JSON.stringify({ reservations: [pastReservation], lastUpdated: pastReservation.updatedAt }));
const baseline = JSON.parse(await readFile("src/app/menu/menu-data.json", "utf8"));
await writeFile(menuFile, JSON.stringify(baseline));
const portProbe = createServer();
await new Promise((resolve) => portProbe.listen(0, "127.0.0.1", resolve));
const port = portProbe.address().port;
await new Promise((resolve) => portProbe.close(resolve));
const base = `http://127.0.0.1:${port}`;
const password = randomBytes(24).toString("hex");
const sessionSecret = randomBytes(24).toString("hex");
const server = spawn(process.execPath, ["node_modules/next/dist/bin/next", "start", "--hostname", "127.0.0.1", "--port", String(port)], {
  env: { ...process.env, SUPABASE_URL: "", SUPABASE_SERVICE_ROLE_KEY: "", MENU_DATA_FILE: menuFile, RESERVATION_DATA_FILE: reservationFile, INDEXNOW_DRY_RUN: "1", UPLOAD_DIRECTORY: path.join(testDirectory, "uploads"), ADMIN_PASSWORD: password, ADMIN_SESSION_SECRET: sessionSecret },
  stdio: ["ignore", "pipe", "pipe"],
});
let serverLog = "";
server.stdout.on("data", (chunk) => { serverLog += chunk; });
server.stderr.on("data", (chunk) => { serverLog += chunk; });
const plainHtml = (html) => html.replace(/<script\b[\s\S]*?<\/script>/gi, "").replace(/<style\b[\s\S]*?<\/style>/gi, "");

async function verifyMenu(route, expected, locale, schemaPrices = {}) {
  const response = await fetch(`${base}${route}`);
  assert.equal(response.status, 200);
  const html = await response.text();
  const plain = plainHtml(html);
  const articles = [...plain.matchAll(/<article\b[^>]*data-menu-item="true"[^>]*>[\s\S]*?<\/article>/gi)];
  assert.equal(articles.length, expected.items.length, `${route}: actual HTML product count`);
  const scripts = [...html.matchAll(/<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/gi)];
  const graph = JSON.parse(scripts[0][1])["@graph"];
  const sections = graph.find((entry) => entry["@type"] === "Menu").hasMenuSection;
  const restaurantId = "https://www.tarihivankahvaltievi.com/#restaurant";
  assert.equal(graph.find((entry) => entry["@type"] === "Menu").provider["@id"], restaurantId);
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
    const expectedPrice = Object.hasOwn(schemaPrices, item.id) ? schemaPrices[item.id] : item.price.replace("₺", "");
    assert.equal(schemaItem.offers?.price, expectedPrice, `${route}: ${item.id} machine-readable price`);
    if (expectedPrice === undefined) assert.equal(schemaItem.offers, undefined, `${route}: ambiguous prices must not create an offer`);
    else {
      assert.equal(schemaItem.offers.priceCurrency, "TRY");
      assert.equal(schemaItem.offers.seller["@id"], restaurantId);
      const details = locale === "en" ? item.translations?.en?.details ?? item.details : item.details;
      for (const detail of details) assert.ok(schemaItem.offers.description.includes(detail), `${route}: missing serving detail for ${item.id}`);
    }
  }
  assert.ok(plain.includes('id="main-content"'));
  assert.ok(plain.includes(locale === "en" ? "Minimum 2 people." : "Minimum 2 kişi için servis edilir."));
  const serpme = expected.items.find((item) => item.id === "serpme-fix-menu");
  assert.ok(plain.includes(locale === "en" ? serpme.translations.en.details[1] : serpme.details[1]));
  const orderingGuide = plain.match(/<section[^>]*id="ordering-guide"[\s\S]*?<\/section>/)?.[0];
  assert.ok(orderingGuide?.includes(locale === "en" ? serpme.translations.en.details[1] : serpme.details[1]), `${route}: ordering guide has stale inclusions`);
  assert.ok(plain.includes(locale === "en" ? '/en/rezervasyon' : '/rezervasyon'), `${route}: table-request link missing`);
}

async function verifyGuidePrices(expected) {
  const price = expected.items.find((item) => item.id === "serpme-fix-menu").price;
  const guide = plainHtml(await (await fetch(`${base}/van-kahvaltisi`)).text());
  const comparison = guide.match(/<section id="breakfast-options"[\s\S]*?<\/section>/)?.[0];
  assert.ok(comparison?.includes(price), 'Visit guide comparison does not follow live price changes');
  assert.ok(comparison?.includes(expected.items.find(item => item.id === 'serpme-fix-menu').details[1]), 'Visit guide comparison has stale tea inclusion');
}

async function verifyBookingInclusions(expected) {
  const item = expected.items.find((entry) => entry.id === "serpme-fix-menu");
  for (const [route, details] of [["/rezervasyon", item.details], ["/en/rezervasyon", item.translations.en.details]]) {
    const html = plainHtml(await (await fetch(`${base}${route}`)).text());
    assert.ok(html.includes('id="ordering-guide"'), `${route}: ordering guide missing`);
    assert.ok(html.includes(details[1]), `${route}: booking guide still shows stale inclusions`);
  }
}

const coffeeRoutes = ['/taksim-kafe', '/en/coffee-taksim', '/ru/coffee-taksim', '/ar/coffee-taksim', '/ko/coffee-taksim', '/zh-cn/coffee-taksim'];
const coffeeIds = ['turk-kahvesi', 'espresso', 'americano', 'latte', 'flat-white', 'cold-brew'];
async function verifyCoffeePages(expected, specialPrices = {}) {
  const source = expected.items.filter(item => coffeeIds.includes(item.id));
  for (const route of coffeeRoutes) {
    const response = await fetch(`${base}${route}`);
    assert.equal(response.status, 200, `${route}: coffee page unavailable`);
    const html = await response.text();
    const plain = plainHtml(html);
    const graph = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1])['@graph'];
    const list = graph.find(node => node['@type'] === 'ItemList');
    assert.equal(list.numberOfItems, source.length, `${route}: removed coffee persisted`);
    assert.equal((plain.match(/data-coffee-item=/g) ?? []).length, source.length);
    for (const item of source) {
      const row = plain.match(new RegExp(`<li[^>]+data-coffee-item="${item.id}"[^>]*>([\\s\\S]*?)</li>`))?.[1] ?? '';
      assert.ok(row.includes(item.price), `${route}: stale coffee price for ${item.id}`);
      if (item.priceNote) assert.ok(row.includes(item.priceNote), `${route}: serving note omitted`);
      const schemaItem = list.itemListElement.find(entry => entry.item.url.endsWith(`#${item.id}`))?.item;
      assert.ok(schemaItem && row.includes(schemaItem.name), `${route}: visible/schema name mismatch`);
      const price = Object.hasOwn(specialPrices, item.id) ? specialPrices[item.id] : item.price.replace('₺', '');
      assert.equal(schemaItem.offers?.price, price, `${route}: schema price for ${item.id}`);
      if (price === undefined) assert.equal(schemaItem.offers, undefined, `${route}: range became exact offer`);
      else assert.equal(schemaItem.offers.priceCurrency, 'TRY');
    }
    if (!expected.items.some(item => item.id === 'cold-brew')) assert.ok(!plain.includes('data-coffee-item="cold-brew"'), `${route}: deleted item still displayed`);
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
    // React may stream an unrelated widget after the menu. Check each product's
    // actual ancestors rather than rejecting every streamed boundary on the page.
    const stack = [];
    let visibleProducts = 0;
    const voidTags = new Set(["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"]);
    for (const [tag] of prerender.matchAll(/<\/?[a-z][^>]*>/gi)) {
      const name = tag.match(/^<\/?([a-z][a-z0-9-]*)/i)[1].toLowerCase();
      if (tag.startsWith("</")) {
        const index = stack.findLastIndex((entry) => entry.name === name);
        if (index >= 0) stack.length = index;
        continue;
      }
      const hidden = stack.some((entry) => entry.hidden) || /\shidden(?:[\s=>])/i.test(tag) || /style="[^"]*display\s*:\s*none/i.test(tag);
      if (name === "article" && tag.includes('data-menu-item="true"') && !hidden) visibleProducts++;
      if (!voidTags.has(name) && !tag.endsWith("/>")) stack.push({ name, hidden });
    }
    assert.equal(visibleProducts, baseline.items.length, `${route}: product content hidden in streamed chunk`);
  }
  for (const route of coffeeRoutes) {
    const prerender = plainHtml(await readFile(`.next/server/app${route}.html`, 'utf8'));
    assert.equal((prerender.match(/data-coffee-item=/g) ?? []).length, 6, `${route}: coffee prices require JavaScript`);
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
  // Exercise the real POST handler with an expired same-day time. Storage is
  // isolated too, so even a regression cannot create a real customer request.
  const dateParts = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Istanbul", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", hourCycle: "h23" }).formatToParts(new Date());
  const part = (type) => dateParts.find((entry) => entry.type === type).value;
  const today = `${part("year")}-${part("month")}-${part("day")}`;
  const expiredTime = `${part("hour")}:00`;
  const invalidBooking = await fetch(`${base}/api/reservations`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ customerName: "Isolated expired request", customerPhone: "05321234567", date: today, time: expiredTime, guests: 2 }) });
  assert.equal(invalidBooking.status, 400, "Server accepted an expired same-day request");
  assert.ok((await invalidBooking.json()).error);
  const unauthorized = await fetch(`${base}/api/admin/menu`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(baseline) });
  assert.equal(unauthorized.status, 401);
  for (const [body, type, expected] of [["{", "application/json", 400], ["null", "application/json", 400], ["[]", "application/json", 400], ["{}", "text/plain", 415], [JSON.stringify({ password: "x".repeat(5000) }), "application/json", 413]]) {
    const response = await fetch(`${base}/api/admin/auth`, { method: "POST", headers: { "Content-Type": type }, body });
    assert.equal(response.status, expected, "Auth must reject malformed/oversized bodies");
  }
  for (const route of ["/api/admin/auth", "/api/admin/logout", "/api/reservations", `/api/reservations/${pastReservation.id}.txt`]) {
    const response = await fetch(`${base}${route}`, { method: "POST", headers: { "Content-Type": "application/json", Origin: "https://attacker.example" }, body: "{}" });
    assert.equal(response.status, 403, "Cross-origin mutation must be blocked, including paths with extensions");
  }
  assert.equal((await fetch(`${base}/api/reservations`, { method: "POST", headers: { "Content-Type": "application/json", "Sec-Fetch-Site": "cross-site" }, body: "{}" })).status, 403);
  const auth = await fetch(`${base}/api/admin/auth`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }) });
  assert.equal(auth.status, 200);
  const cookie = auth.headers.get("set-cookie")?.split(";")[0];
  assert.ok(cookie);
  assert.match(auth.headers.get("set-cookie"), /HttpOnly/i);
  assert.match(auth.headers.get("set-cookie"), /Secure/i);
  assert.match(auth.headers.get("set-cookie"), /SameSite=lax/i);
  const { createSession, sessionLifetimeSeconds } = await import("../src/app/admin/session.ts");
  const expired = createSession(password, sessionSecret, Date.now() - (sessionLifetimeSeconds + 60) * 1000);
  for (const invalidCookie of [`${cookie}tampered`, `admin_session=${expired}`]) {
    const response = await fetch(`${base}/api/reservations`, { headers: { Cookie: invalidCookie } });
    assert.equal(response.status, 401, "Expired or tampered session gained admin access");
  }

  async function upload(bytes, type, expected) {
    const form = new FormData();
    form.append("file", new Blob([bytes], { type }), "../../untrusted.html");
    const response = await fetch(`${base}/api/admin/upload`, { method: "POST", headers: { Cookie: cookie }, body: form });
    assert.equal(response.status, expected, "Upload validation");
    return response;
  }
  await upload("<svg xmlns='http://www.w3.org/2000/svg'/>", "image/svg+xml", 415);
  await upload("<html>disguised image</html>", "image/png", 400);
  await upload(new Uint8Array(5 * 1024 * 1024 + 1), "image/png", 413);
  const sharp = (await import("sharp")).default;
  const png = await sharp({ create: { width: 8, height: 8, channels: 3, background: "red" } }).png().toBuffer();
  const uploaded = await (await upload(png, "image/png", 200)).json();
  assert.match(uploaded.url, /^\/uploads\/[a-f0-9-]+\.webp$/);
  const metadata = await sharp(await readFile(path.join(testDirectory, "uploads", path.basename(uploaded.url)))).metadata();
  assert.equal(metadata.format, "webp");
  assert.equal(metadata.width, 8);
  console.log("API güvenliği: yabancı kaynak, geçersiz JSON, gövde limiti, SVG/sahte görsel engeli ve gerçek WebP dönüşümü doğrulandı.");
  async function patchVisit(id, body, authenticated = true) {
    return fetch(`${base}/api/reservations/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json", ...(authenticated ? { Cookie: cookie } : {}) }, body: JSON.stringify(body) });
  }
  assert.equal((await fetch(`${base}/api/reservations/${pastReservation.id}`)).status, 401);
  assert.equal((await patchVisit(pastReservation.id, { attendance: "arrived" }, false)).status, 401);
  for (const body of [{}, { attendance: "invalid" }, { status: "invalid" }, { source: "staff" }, { attendance: "arrived", customerName: "forged" }]) {
    assert.equal((await patchVisit(pastReservation.id, body)).status, 400, "Visit API accepted invalid fields");
  }
  assert.equal((await patchVisit("isolated-missing", { attendance: null })).status, 404);
  for (const attendance of ["arrived", "no_show", null]) {
    const response = await patchVisit(pastReservation.id, { attendance });
    assert.equal(response.status, 200);
    assert.equal((await response.json()).reservation.attendance, attendance);
  }
  await patchVisit(pastReservation.id, { attendance: "arrived" });
  const cancelled = await patchVisit(pastReservation.id, { status: "cancelled" });
  assert.equal((await cancelled.json()).reservation.attendance, null, "Cancelled visit still counted as arrived");
  assert.equal((await patchVisit(pastReservation.id, { attendance: "arrived" })).status, 400);
  const future = new Date();
  future.setUTCDate(future.getUTCDate() + 2);
  const bookingBody = { customerName: "Isolated source fixture", customerPhone: "05321234567", date: future.toISOString().slice(0, 10), time: "10:00", guests: 2, source: "staff", status: "confirmed", attendance: "arrived" };
  for (const staff of [false, true]) {
    const response = await fetch(`${base}/api/reservations`, { method: "POST", headers: { "Content-Type": "application/json", ...(staff ? { Cookie: cookie } : {}) }, body: JSON.stringify(bookingBody) });
    assert.equal(response.status, 200);
    const { reservation } = await response.json();
    assert.equal(reservation.source, staff ? "staff" : "website");
    assert.equal(reservation.status, staff ? "confirmed" : "pending");
    assert.ok(!reservation.attendance, "Caller forged a visit outcome");
    assert.equal((await patchVisit(reservation.id, { attendance: "arrived" })).status, 400, "Future visit accepted");
  }
  assert.equal(JSON.parse(await readFile(reservationFile, "utf8")).reservations.length, 3, "Reservation writes escaped the isolated fixture");
  console.log("Rezervasyon API: yönetici yetkisi, kaynak sahteciliği, gerçek ziyaret sonucu, gelecek tarih engeli ve iptal sonrası temizleme doğrulandı.");
  async function verifyAnswerEngineMenu(expected) {
    const response = await fetch(`${base}/llms.txt`);
    assert.equal(response.status, 200);
    const text = await response.text();
    assert.ok(text.includes(expected.lastUpdated));
    for (const item of expected.items) assert.ok(text.includes(`${item.name}${item.translations?.en?.name ? ` / ${item.translations.en.name}` : ""}: ${item.price}`), `llms.txt: stale/missing ${item.id}`);
    for (const item of expected.items) {
      assert.ok(text.includes(item.description), `llms.txt: missing product description ${item.id}`);
      for (const detail of item.details ?? []) assert.ok(text.includes(detail), `llms.txt: missing serving detail ${item.id}`);
      for (const menu of ["/menu", "/en/menu"]) {
        assert.ok(text.includes(`https://www.tarihivankahvaltievi.com${menu}#${item.id}`), `llms.txt: missing citation source ${menu}#${item.id}`);
      }
      const line = text.split("\n").find((entry) => entry.startsWith(`- ${item.name}`));
      if (item.priceNote) assert.ok(line.includes(`(${item.priceNote})`), `llms.txt: missing serving unit ${item.id}`);
      if (item.id === "serpme-fix-menu") assert.ok(line.includes("Order conditions: Minimum 2 people."), "llms.txt: shared breakfast minimum order must stay with its price");
    }
    if (!expected.items.some((item) => item.id === "cold-brew")) assert.ok(!text.includes("/menu#cold-brew"), "llms.txt: removed item still offered as a citation");
    assert.ok(text.includes('"kişi başı"'), "llms.txt: per-person pricing explanation missing");
    assert.ok(!text.includes("kete is not listed"), "Availability must come from live data");
  }
  async function save(data) {
    const response = await fetch(`${base}/api/admin/menu`, { method: "POST", headers: { "Content-Type": "application/json", Cookie: cookie }, body: JSON.stringify(data) });
    assert.equal(response.status, 200, "Admin fixture save failed");
  }
  for (const data of [{ categories: {}, items: [], lastUpdated: "14 Ekim 2026" }, { categories: [], items: [], lastUpdated: "14 Ekim 2026" }, { ...baseline, items: [{ id: "broken" }] }]) {
    const response = await fetch(`${base}/api/admin/menu`, { method: "POST", headers: { "Content-Type": "application/json", Cookie: cookie }, body: JSON.stringify(data) });
    assert.equal(response.status, 400, "Corrupt menu must be rejected before storage");
  }
  // Force a fresh tag so another build/test's cached fixture cannot affect us.
  await save(baseline);
  await verifyMenu("/menu", baseline, "tr");
  await verifyMenu("/en/menu", baseline, "en");
  await verifyGuidePrices(baseline);
  await verifyAnswerEngineMenu(baseline);
  await verifyBookingInclusions(baseline);
  await verifyCoffeePages(baseline);
  const changed = structuredClone(baseline);
  changed.lastUpdated = new Intl.DateTimeFormat("tr-TR", { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Istanbul" }).format(new Date());
  changed.items.find(item => item.id === 'turk-kahvesi').price = '₺175,50';
  changed.items.find(item => item.id === 'espresso').price = '₺250–300';
  changed.items.find(item => item.id === 'latte').priceNote = 'ekstra';
  changed.items = changed.items.filter(item => item.id !== 'cold-brew');
  changed.items[0].price = "₺1.250,50";
  changed.items[1].price = "1.750 TL";
  changed.items[2].price = "₺350–450";
  changed.items[0].description = "Yalnız izole test ürün açıklaması";
  changed.items[0].translations.en.description = "Isolated test product description only";
  changed.items[0].details[1] = "Yalnız izole test çay kapsamı";
  changed.items[0].translations.en.details[1] = "Isolated test tea inclusion only";
  changed.categories.push({ id: "test-category", label: "Deneme Kategorisi", shortLabel: "Deneme", description: "Only an isolated test fixture.", image: "", imageAlt: "", translations: { en: { label: "Test Category" } } });
  changed.items.push({ ...structuredClone(baseline.items[0]), id: "test-item", category: "test-category", name: "Deneme Ürünü", price: "₺123" });
  await save(changed);
  const schemaPrices = { "serpme-fix-menu": "1250.5", "van-golu-tabagi": "1750", "turk-kahvesi": "175.5", espresso: undefined, "pisi-tabagi": undefined };
  await verifyMenu("/menu", changed, "tr", schemaPrices);
  await verifyMenu("/en/menu", changed, "en", schemaPrices);
  await verifyGuidePrices(changed);
  await verifyAnswerEngineMenu(changed);
  await verifyBookingInclusions(changed);
  await verifyCoffeePages(changed, { 'turk-kahvesi': '175.5', espresso: undefined });
  await verifySitemapDates();
  await save(baseline);
  await verifyMenu("/menu", baseline, "tr");
  await verifyMenu("/en/menu", baseline, "en");
  await verifyGuidePrices(baseline);
  await verifyAnswerEngineMenu(baseline);
  await verifyBookingInclusions(baseline);
  await verifyCoffeePages(baseline);
  console.log(`Menü testi geçti: ${baseline.items.length} ürün / ${baseline.categories.length} kategori gerçek prerender HTML'de; TR/EN fiyat-açıklama-şema eşleşmesi, yetkisiz yazma engeli, rezervasyonda güncel dahil ürünler, anında önbellek yenileme ve yeni kategori görünürlüğü doğrulandı.`);
} finally {
  server.kill("SIGTERM");
  await new Promise((resolve) => { if (server.exitCode !== null) resolve(); else server.once("exit", resolve); });
  await rm(testDirectory, { recursive: true, force: true });
}
