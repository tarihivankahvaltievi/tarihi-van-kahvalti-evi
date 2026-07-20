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
- İndekslenebilir kanonik sayfalar: ana sayfa `/`, menü `/menu`, Van kahvaltısı rehberi `/van-kahvaltisi`, hikâye `/hikayemiz`, konum `/konum`, İngilizce ziyaretçi rehberi `/en` ve İngilizce canlı menü `/en/menu`
- SSS ana sayfada, güncel QR menü `/menu`, adres ve yol tarifi ise `/konum` sayfasında yer alır.
- Güncel ve indekslenebilir QR menü `/menu` sayfasındadır; kaldırılan `/iletisim`, `/sss` ve `/kafka-cafe` URL'leri en yakın gerçek içeriğe yönlenir.
- Türkçe `/` ve İngilizce `/en` ana sayfaları aynı `ClientPage` + `HomeContent` bileşen ağacını kullanır. Dil metinleri ve bağlantıları `src/app/home-localization.ts` içinden gelir; iki dil için ayrı ana sayfa tasarımı oluşturulmamalıdır.
- Üst navigasyondaki `EN` / `TR` anahtarı kullanıcıyı karşılık gelen kanonik dil URL'sine götürür. Otomatik IP veya tarayıcı dili yönlendirmesi yapılmaz.
- Eski konu/WordPress URL'leri yalnız bilinen eşdeğer hedefe tek adım kalıcı yönlenir; bilinmeyen URL'ler gerçek `404` döner.
- Sitemap ve tarayıcı kuralları: `src/app/sitemap.ts`, `src/app/robots.ts`. XML sitemap yalnız indekslenebilir kanonik sayfaları; bu sayfalardaki keşfedilebilir özgün görselleri ve iki karşılıklı hreflang kümesini içerir.
- Otomatik SEO/HTTP sözleşmesi: `npm run test:seo`

Adres, telefon, çalışma saatleri veya fiyatlar değiştiğinde önce `seo.ts` güncellenmeli; görünür içerik ile JSON-LD aynı kaynaktan beslenmelidir.

## Yayına alma

Depo bir Next.js üretim sunucusu veya desteklenen bir platformda çalıştırılmalıdır. Alan adı hâlen farklı bir CMS/hostinge bağlıysa yalnızca GitHub'a push etmek canlı siteyi güncellemez; DNS ve dağıtım hedefi ayrıca bağlanmalıdır.

## Google Search Console

Site, Search Console için hazırdır:

- Sitemap: `https://www.tarihivankahvaltievi.com/sitemap.xml`
- Robots: `https://www.tarihivankahvaltievi.com/robots.txt`
- Kanonik alan adı: `https://www.tarihivankahvaltievi.com`
- HTML doğrulama dosyası: `https://www.tarihivankahvaltievi.com/google2920058c70b54fb8.html`
- Google doğrulama meta etiketi site genelinde kalıcı olarak bulunur.
- Önerilen doğrulama: alan adı mülkü + DNS TXT kaydı
- Alternatif doğrulama: URL ön eki + `GOOGLE_SITE_VERIFICATION` ortam değişkeni

Kurulum adımları ve doğrulama kontrolleri için `GOOGLE_SEARCH_CONSOLE_KURULUM.md` dosyasını izleyin.
