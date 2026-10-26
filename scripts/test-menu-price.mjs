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
