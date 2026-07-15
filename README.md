# Tarihi Van Kahvaltı Evi

Tarihi Van Kahvaltı Evi'nin Türkçe, mobil öncelikli Next.js web sitesi. Menü, iletişim, sık sorulan sorular ve yerel kahvaltı rehberleri tek bir doğrulanabilir işletme profili üzerinden üretilir.

## Yerel geliştirme

```bash
npm install
npm run dev
```

Üretim doğrulaması:

```bash
npm run lint
npm run build
npm start
```

## İçerik ve SEO kaynağı

- İşletme bilgileri, sayfa içeriği, yapılandırılmış veri ve eski URL yönlendirmeleri: `src/app/seo.ts`
- Site geneli metadata: `src/app/layout.tsx`
- Canonical sayfalar: `/`, `/menu`, `/iletisim`, `/sss`, `/van-kahvaltisi`, `/beyoglu-kahvalti`, `/taksim-kahvalti`, `/kafka-cafe`
- Sitemap ve tarayıcı kuralları: `src/app/sitemap.ts`, `src/app/robots.ts`

Adres, telefon, çalışma saatleri veya fiyatlar değiştiğinde önce `seo.ts` güncellenmeli; görünür içerik ile JSON-LD aynı kaynaktan beslenmelidir.

## Yayına alma

Depo bir Next.js üretim sunucusu veya desteklenen bir platformda çalıştırılmalıdır. Alan adı hâlen farklı bir CMS/hostinge bağlıysa yalnızca GitHub'a push etmek canlı siteyi güncellemez; DNS ve dağıtım hedefi ayrıca bağlanmalıdır.
