import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Offline only: no account credentials, browser automation or network requests.
export function parseCsv(text) {
  const rows = []; let row = [], field = '', quoted = false;
  text = text.replace(/^\uFEFF/, '');
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (c === '"') {
      if (quoted && text[i + 1] === '"') { field += '"'; i++; }
      else quoted = !quoted;
    } else if (c === ',' && !quoted) { row.push(field); field = ''; }
    else if ((c === '\n' || c === '\r') && !quoted) {
      if (c === '\r' && text[i + 1] === '\n') i++;
      row.push(field); if (row.some(Boolean)) rows.push(row); row = []; field = '';
    } else field += c;
  }
  if (quoted) throw Error('Incomplete quoted CSV field');
  if (field || row.length) { row.push(field); rows.push(row); }
  const [headers = [], ...data] = rows;
  return data.map(values => Object.fromEntries(headers.map((header, i) => [header, values[i] ?? ''])));
}
function number(value) {
  // Missing/suppressed cells stay missing; never silently turn them into zero.
  if (!value || ['-', '~', 'N/A'].includes(value)) return null;
  const result = Number(value.replace('%', ''));
  return Number.isFinite(result) ? result : null;
}
const args = Object.fromEntries(process.argv.slice(2).reduce((pairs, value, i, all) => {
  if (value.startsWith('--')) pairs.push([value.slice(2), all[i + 1]]);
  return pairs;
}, []));
if (!args.organic || !args.ai || !args.output) {
  console.error('Usage: node scripts/analyze-search-console.mjs --organic PRIVATE_EXPORT_DIR --ai PRIVATE_EXPORT_DIR --output PRIVATE_REPORT.md');
  process.exit(1);
}
const output = path.resolve(args.output);
const repo = fileURLToPath(new URL('../', import.meta.url)).replace(/[\\/]$/, '');
if (output === repo || output.startsWith(`${repo}${path.sep}`)) throw Error('Private Search Console output must stay outside this repository.');
async function csv(dir, name) { return parseCsv(await readFile(path.join(dir, name), 'utf8')); }
const [organic, ai, pages, queries, devices, countries, aiPages, organicFilters, aiFilters] = await Promise.all([
  csv(args.organic, 'Grafik.csv'), csv(args.ai, 'Grafik.csv'), csv(args.organic, 'Sayfa sayısı.csv'),
  csv(args.organic, 'Sorgular.csv'), csv(args.organic, 'Cihazlar.csv'), csv(args.organic, 'Ülkeler.csv'),
  csv(args.ai, 'Sayfa sayısı.csv'), csv(args.organic, 'Filtreler.csv'), csv(args.ai, 'Filtreler.csv'),
]);
const total = (rows, key) => {
  const values = rows.map(row => number(row[key]));
  return values.some(value => value === null) ? null : values.reduce((sum, value) => sum + value, 0);
};
const clicks = total(organic, 'Tıklamalar'), impressions = total(organic, 'Gösterimler');
const displayTotal = value => value === null ? 'hesaplanamadı (eksik/bastırılmış hücre var)' : value;
const ctr = clicks !== null && impressions !== null && impressions > 0 ? `${(100*clicks/impressions).toFixed(2)}%` : 'hesaplanamadı';
const unknown = (rows, key) => rows.filter(row => number(row[key]) === null).length;
const mdCell = value => String(value ?? '').replaceAll('|', '\\|').replace(/[\r\n]+/g, ' ');
function table(rows, keys) {
  return `| ${keys.join(' | ')} |\n| ${keys.map(()=>'---').join(' | ')} |\n` + rows.map(row=>`| ${keys.map(key=>mdCell(row[key])).join(' | ')} |`).join('\n');
}
const report = `# Özel başlangıç ölçümü: Search Console\n\nİndirme günü: ${new Date().toISOString().slice(0,10)}. Ham CSV dışa aktarımlarından çevrimdışı üretildi; halka açık Git deposuna alınmamalıdır.\n\nOrganik dönem: ${organic[0]?.Tarih}–${organic.at(-1)?.Tarih}, ${organic.length} gün. ${displayTotal(clicks)} tıklama, ${displayTotal(impressions)} gösterim, hesaplanan TO ${ctr}. Günlük pozisyonların basit ortalaması toplam mülk pozisyonu yerine kullanılmadı.\n\nAI dönem: ${ai[0]?.Tarih}–${ai.at(-1)?.Tarih}, ${ai.length} gün. ${displayTotal(total(ai,'Gösterimler'))} gösterim; ${unknown(ai,'Gösterimler')} eksik/bastırılmış günlük hücre. AI gösterimi tıklama, marka tavsiyesi veya restoran ziyareti değildir. Tarihler Search Console raporunun zaman dilimindedir; Türkiye gününe çevrilmedi.\n\n## Filtreler\n\nOrganik: ${JSON.stringify(organicFilters)}\n\nAI: ${JSON.stringify(aiFilters)}\n\n## Organik sayfalar\n\n${table(pages,Object.keys(pages[0]??{}))}\n\n## AI sayfaları\n\n${table(aiPages,Object.keys(aiPages[0]??{}))}\n\n## Cihaz ve ülke\n\n${table(devices,Object.keys(devices[0]??{}))}\n\n${table(countries,Object.keys(countries[0]??{}))}\n\n## Yorum sınırları ve bir sonraki karşılaştırma\n\n- Dışa aktarılan sorgu sayısı: ${queries.length}. Gizlilik filtresi ve satır sınırı nedeniyle sorgu toplamı mülk toplamı yerine geçmez.\n- Bu dışa aktarım sorgu × sayfa matrisi değildir. İki yazının aynı sorguyu paylaştığı bu dosyadan çıkarılamaz; sayfa filtresiyle ayrıca sorgu tablosu gerekir.\n- Classic Turkish Breakfast yazısı 28 Eylül'de yayımlandı; 29 Eylül'de biten bu dönem yeni yazıya yalnız iki günlük gözlem sağlar. Yazı silme/birleştirme kararı için yetersizdir.\n- Aynı filtrelerle tam 28 günlük yayım sonrası dönem oluşunca karşılaştırın. Reklam, hafta günleri, özel günler ve yayım tarihlerini kaydedin; gelişimi yalnız SEO değişikliklerine atfetmeyin.\n- GA4 kaydedilmiş talebi, WhatsApp geçişini ve gerçek işletme onayını ayrı değerlendirin. Gerçek onay kaynağı işletmenin rezervasyon durum kayıtlarıdır.\n- Dışa aktarımda sıfıra çevrilmiş bastırılmış değerlerin özgün belirsizliği geri kazanılamaz. Sıfır görünürlüğü iddiası üretmeyin.\n`;
await mkdir(path.dirname(output), { recursive: true }); await writeFile(output, report);
console.log('Private baseline report written outside repository.');
