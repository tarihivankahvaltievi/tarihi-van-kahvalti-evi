import assert from "node:assert/strict";
import { writeFile } from "node:fs/promises";
import { coffeeLocales, coffeePaths, coffeeLanguageTags } from "../src/app/coffee/coffee-localization.ts";

// Read-only deployment audit. A successful simulated bot request is evidence of
// accessibility, not evidence that a search engine has crawled or indexed a URL.
const origin = "https://www.tarihivankahvaltievi.com";
const base = process.env.COFFEE_AUDIT_BASE_URL ?? origin;
const agents = ["Mozilla/5.0", "Googlebot", "Bingbot", "OAI-SearchBot", "PerplexityBot"];
const alternates = Object.fromEntries([
  ...coffeeLocales.map(locale => [coffeeLanguageTags[locale], origin + coffeePaths[locale]]),
  ["x-default", origin + coffeePaths.tr],
]);
const attr = (tag, name) => tag.match(new RegExp(`\\b${name}="([^"]*)"`, "i"))?.[1];
const schemaNodes = html => [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)].flatMap(([, json]) => {
  const pending = [JSON.parse(json)];
  const nodes = [];
  while (pending.length) {
    const value = pending.pop();
    if (!value || typeof value !== "object") continue;
    nodes.push(value);
    pending.push(...Object.values(value).flatMap(child => Array.isArray(child) ? child : [child]));
  }
  return nodes;
});
const visible = html => html.replace(/<(script|style)\b[\s\S]*?<\/\1>/gi, " ");
const report = { checkedAt: new Date().toISOString(), base, meaning: "HTTP and rendered HTML checks only; not an indexing or ranking report", pages: [], failures: [] };
async function get(path, agent = agents[0]) {
  const response = await fetch(new URL(path, base), {
    redirect: "manual", headers: { "user-agent": agent }, signal: AbortSignal.timeout(20000),
  });
  assert.equal(response.status, 200, `${path} [${agent}]: HTTP ${response.status}`);
  assert(!/noindex/i.test(response.headers.get("x-robots-tag") ?? ""), `${path}: HTTP noindex`);
  return { response, html: await response.text() };
}

// Explicit bot groups supersede wildcard rules, so check the applicable group.
function crawlAllowed(robots, agent, path) {
  const groups = [];
  let group;
  for (const raw of robots.split(/\r?\n/)) {
    const line = raw.replace(/#.*/, "").trim();
    const [, directive, value] = line.match(/^([\w-]+)\s*:\s*(.*)$/) ?? [];
    if (!directive) continue;
    if (directive.toLowerCase() === "user-agent") {
      if (!group || group.rules.length) groups.push(group = { agents: [], rules: [] });
      group.agents.push(value.toLowerCase());
    } else if (group && /^(allow|disallow)$/i.test(directive) && value) {
      group.rules.push({ allow: directive.toLowerCase() === "allow", path: value });
    }
  }
  const exact = groups.filter(g => g.agents.some(a => a !== "*" && agent.toLowerCase().includes(a)));
  const selected = exact.length ? exact : groups.filter(g => g.agents.includes("*"));
  const rules = selected.flatMap(g => g.rules).filter(r => {
    const pattern = r.path.replace(/[.+?^{}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*");
    return new RegExp(`^${pattern}`).test(path);
  }).sort((a, b) => b.path.length - a.path.length || Number(b.allow) - Number(a.allow));
  return rules[0]?.allow ?? true;
}

const [{ html: sitemap }, { html: robots }, { html: trMenu }, { html: enMenu }] = await Promise.all([
  get("/sitemap.xml"), get("/robots.txt"), get("/menu"), get("/en/menu"),
]);
for (const locale of coffeeLocales) {
  const path = coffeePaths[locale];
  const url = origin + path;
  for (const agent of agents) {
    try {
      assert(crawlAllowed(robots, agent, path), `${path} [${agent}]: robots disallow`);
      const { response, html } = await get(path, agent);
      const body = visible(html);
      const head = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1] ?? "";
      const links = [...head.matchAll(/<link\b[^>]*>/gi)].map(([tag]) => tag);
      assert.equal(attr(links.find(tag => attr(tag, "rel") === "canonical") ?? "", "href"), url, `${path}: canonical`);
      const languages = Object.fromEntries(links.filter(tag => attr(tag, "hreflang")).map(tag => [attr(tag, "hreflang"), attr(tag, "href")]));
      assert.deepEqual(languages, alternates, `${path}: reciprocal hreflang`);
      for (const [tag] of head.matchAll(/<meta\b[^>]*>/gi)) {
        if (/^(robots|googlebot)$/i.test(attr(tag, "name") ?? "")) assert(!/noindex|nosnippet/i.test(attr(tag, "content") ?? ""), `${path}: restrictive meta robots`);
      }
      assert.equal(response.headers.get("content-language"), coffeeLanguageTags[locale], `${path}: Content-Language`);
      assert(body.includes('id="coffee-heading"') && body.includes('id="coffee-visit-title"'), `${path}: content requires JavaScript`);
      const nodes = schemaNodes(html);
      const restaurant = nodes.find(node => node["@type"] === "Restaurant");
      assert.equal(restaurant?.["@id"], `${origin}/#restaurant`, `${path}: conflicting business identity`);
      const items = nodes.find(node => node["@type"] === "ItemList")?.itemListElement ?? [];
      assert.equal(items.length, (body.match(/data-coffee-item=/g) ?? []).length, `${path}: schema/visible inventory differs`);
      const fullMenu = schemaNodes(locale === "tr" ? trMenu : enMenu);
      const expectedIds = ["turk-kahvesi", "espresso", "americano", "latte", "flat-white", "cold-brew"].filter(id => fullMenu.some(node => node["@type"] === "MenuItem" && node.url?.endsWith(`#${id}`)));
      assert.deepEqual(items.map(({ item }) => new URL(item.url).hash.slice(1)), expectedIds, `${path}: live menu inventory mismatch`);
      for (const { item } of items) {
        const target = new URL(item.url);
        assert.equal(target.origin, origin);
        const id = target.hash.slice(1);
        const menu = target.pathname === "/menu" ? trMenu : target.pathname === "/en/menu" ? enMenu : "";
        assert(menu.includes(`id="${id}"`), `${path}: broken source ${item.url}`);
        const row = body.match(new RegExp(`<li[^>]+data-coffee-item="${id}"[^>]*>([\\s\\S]*?)</li>`))?.[1] ?? "";
        assert(row.includes(item.name), `${path}: invisible schema name ${id}`);
        const source = schemaNodes(menu).find(node => node["@type"] === "MenuItem" && node["@id"] === item["@id"]);
        assert.equal(item.offers?.price, source?.offers?.price, `${path}: coffee and full menu price differ for ${id}`);
        if (item.offers) {
          assert.equal(item.offers.priceCurrency, "TRY");
          assert.equal(item.offers.seller?.["@id"], restaurant["@id"]);
        }
      }
      const sitemapEntry = [...sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)].find(([, xml]) => xml.includes(`<loc>${url}</loc>`))?.[1];
      assert(sitemapEntry, `${path}: absent from sitemap`);
      for (const href of Object.values(alternates)) assert(sitemapEntry.includes(`href="${href}"`), `${path}: sitemap language missing`);
      report.pages.push({ path, agent, status: 200, menuItems: items.length, canonical: url });
    } catch (error) { report.failures.push({ path, agent, message: error.message }); }
  }
}
const outputIndex = process.argv.indexOf("--output");
if (outputIndex !== -1) await writeFile(process.argv[outputIndex + 1], JSON.stringify(report, null, 2) + "\n");
console.log(`${report.pages.length} coffee page/bot checks passed; ${report.failures.length} failures.`);
for (const failure of report.failures) console.error(failure);
if (report.failures.length) process.exitCode = 1;
