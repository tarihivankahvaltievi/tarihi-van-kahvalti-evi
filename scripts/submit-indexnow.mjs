import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const siteUrl = "https://www.tarihivankahvaltievi.com";
const host = new URL(siteUrl).host;
const key = "4f9d1a7c8b6e3f205d72a941ce8b604a";
const keyLocation = `${siteUrl}/${key}.txt`;
const defaultUrls = [
  siteUrl,
  `${siteUrl}/menu`,
  `${siteUrl}/konum`,
  `${siteUrl}/en`,
  `${siteUrl}/turkish-breakfast-istanbul`,
  `${siteUrl}/breakfast-near-taksim`,
];

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const publicKeyFile = path.join(scriptDirectory, "..", "public", `${key}.txt`);
const publicKey = (await readFile(publicKeyFile, "utf8")).trim();

if (publicKey !== key) {
  throw new Error("IndexNow anahtar dosyası ile gönderim anahtarı eşleşmiyor.");
}

const requestedUrls = process.env.INDEXNOW_URLS
  ? process.env.INDEXNOW_URLS.split(",").map((value) => value.trim()).filter(Boolean)
  : defaultUrls;

const urlList = [...new Set(requestedUrls)];
for (const value of urlList) {
  const url = new URL(value);
  if (url.protocol !== "https:" || url.host !== host) {
    throw new Error(`IndexNow URL'si kanonik alan adına ait değil: ${value}`);
  }
}

const payload = { host, key, keyLocation, urlList };

if (process.env.INDEXNOW_DRY_RUN === "1") {
  console.log(JSON.stringify(payload, null, 2));
  process.exit(0);
}

const endpoint = process.env.INDEXNOW_ENDPOINT || "https://api.indexnow.org/indexnow";
const response = await fetch(endpoint, {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify(payload),
});

if (![200, 202].includes(response.status)) {
  const body = await response.text();
  throw new Error(`IndexNow gönderimi başarısız: HTTP ${response.status}${body ? ` — ${body}` : ""}`);
}

console.log(`IndexNow bildirimi kabul edildi (HTTP ${response.status}): ${urlList.length} URL.`);
