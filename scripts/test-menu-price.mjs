import assert from "node:assert/strict";
import { menuSchemaPrice } from "../src/app/menu/menu-price.ts";

for (const [input, expected] of [
  ["₺970", "970"], [" ₺ 970 ", "970"], ["970 TL", "970"],
  ["1.250 TRY", "1250"], ["₺1.250,50", "1250.5"], ["₺970,5", "970.5"],
  ["1250,05", "1250.05"], ["1.250.000,99 TL", "1250000.99"], ["₺0", "0"],
  ["₺970–1.250", undefined], ["₺970 kişi başı", undefined],
  ["fiyat sorunuz", undefined], ["", undefined], ["₺", undefined],
  ["₺-970", undefined], ["₺12.50", undefined], ["₺1,250.50", undefined],
  ["₺1.250,500", undefined], ["₺970abc", undefined], ["Infinity", undefined],
]) assert.equal(menuSchemaPrice(input), expected, `Price conversion: ${input}`);

console.log("Menü fiyatları: Türkçe binlik/ondalık ayracı ve para birimi; belirsiz ve geçersiz fiyatların şemadan çıkarılması doğrulandı.");

// Exercise live FAQ calculations independently of the UI, including deleted
// products and non-numeric prices that must never become invented totals.
const { readFileSync } = await import("node:fs");
const { default: ts } = await import("typescript");
const { default: vm } = await import("node:vm");
const compiled = ts.transpileModule(readFileSync("src/app/menu/ordering-questions.ts", "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;
const exports = {};
vm.runInNewContext(compiled, { exports, Intl, require: (name) => {
  assert.equal(name, "./menu-price");
  return { menuSchemaPrice };
} });
const item = { id: "serpme-fix-menu", name: "Serpme", price: "₺1.250,50", details: [] };
for (const locale of ["tr", "en"]) {
  const answer = exports.getOrderingQuestions(locale, [item])[0].answer;
  assert.ok(answer.includes(locale === "tr" ? "2.501,00" : "2,501.00"), answer);
  for (const price of ["fiyat sorunuz", "₺970–1.250"]) {
    const fallback = exports.getOrderingQuestions(locale, [{ ...item, price }])[0].answer;
    assert.ok(!fallback.includes("NaN") && !fallback.includes("2.501"));
    assert.ok(fallback.includes(locale === "tr" ? "hesaplanamıyor" : "cannot be calculated"));
  }
  const removed = exports.getOrderingQuestions(locale, []);
  assert.ok(removed[0].answer.includes(locale === "tr" ? "hesaplanamıyor" : "cannot be calculated"));
  assert.ok(!removed[1].answer.includes("Van Gölü"), "Removed plates must not be recommended");
}
console.log("Ordering answers: decimal two-person totals, ambiguous prices and removed products passed.");
