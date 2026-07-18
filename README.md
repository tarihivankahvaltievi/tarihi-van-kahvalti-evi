# Tarihi Van Kahvaltı Evi

Tarihi Van Kahvaltı Evi'nin mobil öncelikli Next.js web sitesi. Menü, iletişim, sık sorulan sorular ve yerel işletme şeması tek bir doğrulanabilir veri kaynağından üretilir.

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
- İndekslenebilir kanonik sayfalar: ana sayfa `/` ve menü `/menu`
- İletişim ve SSS Türkçe ana sayfada, güncel QR menü ise `/menu` sayfasında yer alır.
- Güncel ve indekslenebilir QR menü `/menu` sayfasındadır; kaldırılan `/iletisim`, `/sss` ve `/kafka-cafe` URL'leri en yakın gerçek içeriğe yönlenir.
- Eski konu/WordPress URL'leri yalnız bilinen eşdeğer hedefe tek adım kalıcı yönlenir; bilinmeyen URL'ler gerçek `404` döner.
- Sitemap ve tarayıcı kuralları: `src/app/sitemap.ts`, `src/app/robots.ts`
- Otomatik SEO/HTTP sözleşmesi: `npm run test:seo`

Adres, telefon, çalışma saatleri veya fiyatlar değiştiğinde önce `seo.ts` güncellenmeli; görünür içerik ile JSON-LD aynı kaynaktan beslenmelidir.

## Yayına alma

Depo bir Next.js üretim sunucusu veya desteklenen bir platformda çalıştırılmalıdır. Alan adı hâlen farklı bir CMS/hostinge bağlıysa yalnızca GitHub'a push etmek canlı siteyi güncellemez; DNS ve dağıtım hedefi ayrıca bağlanmalıdır.
