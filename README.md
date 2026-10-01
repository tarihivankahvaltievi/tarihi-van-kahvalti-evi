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
- İndekslenebilir kanonik sayfalar: ana sayfa `/`, menü `/menu`, yerel Van kahvaltısı rehberi `/van-kahvaltisi`, kaynaklı kültür rehberi `/van-kahvaltisi-nedir`, hikâye `/hikayemiz`, konum `/konum`, İngilizce ziyaretçi rehberi `/en` ve İngilizce canlı menü `/en/menu`
- SSS ana sayfada, güncel QR menü `/menu`, adres ve yol tarifi ise `/konum` sayfasında yer alır.
- Güncel ve indekslenebilir QR menü `/menu` sayfasındadır; kaldırılan `/iletisim`, `/sss` ve `/kafka-cafe` URL'leri en yakın gerçek içeriğe yönlenir.
- Türkçe `/` ve İngilizce `/en` ana sayfaları aynı `ClientPage` + `HomeContent` bileşen ağacını kullanır. Dil metinleri ve bağlantıları `src/app/home-localization.ts` içinden gelir; iki dil için ayrı ana sayfa tasarımı oluşturulmamalıdır.
- Üst navigasyondaki `EN` / `TR` anahtarı kullanıcıyı karşılık gelen kanonik dil URL'sine götürür. Otomatik IP veya tarayıcı dili yönlendirmesi yapılmaz.
- Eski konu/WordPress URL'leri yalnız bilinen eşdeğer hedefe tek adım kalıcı yönlenir; bilinmeyen URL'ler gerçek `404` döner.
- Sitemap ve tarayıcı kuralları: `src/app/sitemap.ts`, `src/app/robots.ts`. XML sitemap yalnız indekslenebilir kanonik sayfaları; canlı menüden okunan keşfedilebilir görselleri ve ana sayfa, menü ve uluslararası rehberler için üç karşılıklı hreflang kümesini içerir.
- Otomatik SEO/HTTP sözleşmesi: `npm run test:seo`

Adres, telefon ve çalışma saatleri `seo.ts` üzerinden; ürün/fiyat ve çeviriler yönetim panelindeki menü verisi üzerinden güncellenir. Görünür içerik ile JSON-LD aynı kaynaktan beslenmelidir. Menü kaydı TR/EN sayfalarının ortak önbelleğini yeniler.

## 30 Eylül 2026 SEO/GEO raporu

Raporun 24 maddesi, araştırma kaynakları, kabul ölçütleri ve beş bölümlü uygulama planı [ayrıntılı analizde](docs/seo-geo/rapor-analizi-ve-bes-asamali-plan-2026-10-01.md) bulunur. Birinci bölümün [doğrulama kaydı](docs/seo-geo/bolum-1-dogrulama-2026-10-01.md) ve [kod envanteri](docs/seo-geo/kod-envanteri-2026-10-01.csv) aynı dizindedir.

İkinci bölümün [ürün, araştırma ve kanıt kaydı](docs/seo-geo/bolum-2-icerik-ve-kanit-2026-10-01.md), [62 ürünün önce/sonra karşılaştırması](docs/seo-geo/bolum-2-urun-degisiklikleri-2026-10-01.csv) ve [güncel kod envanteri](docs/seo-geo/kod-envanteri-bolum-2-2026-10-01.csv) aynı dizindedir. Gözden geçirilmiş kaynak metinler `src/app/menu/menu-editorial.json` içindedir; `node scripts/generate-menu-data.mjs` bu metinleri korur. Yönetim kaydı TR/EN ana sayfa, menü ve rezervasyon rehberini birlikte yeniler.

Menü regresyon kontrolü: `npm run test:menu`. Önce `npm run build` gerekir. Test kendi yerel sunucusunu ve geçici menü dosyasını kullanır; Supabase ve IndexNow bildirimleri kapalıdır. Gerçek HTML ürün/fiyat/açıklama/şema eşleşmesini, rezervasyondaki dahil ürünleri, yeni kategori görünürlüğünü ve yönetim kaydı sonrası cache yenilemeyi doğrular.

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

## Bing ve Yandex

- Bing ve Yandex için aynı kanonik sitemap ve IndexNow akışı kullanılır.
- Bing meta doğrulaması `BING_SITE_VERIFICATION`, Yandex meta doğrulaması `YANDEX_SITE_VERIFICATION` ortam değişkeniyle yayınlanır.
- Yandex Business işletme kaydı `Restaurant.sameAs` içinde siteyle ilişkilendirilir ve konum sayfasında görünür bir Yandex Haritalar bağlantısı bulunur.
- Dağıtımdan sonra değişen kanonik URL'leri bildirmek için `npm run seo:indexnow` çalıştırılır.

Hesap doğrulama, sitemap gönderme ve işletme kaydı düzeltme adımları için `BING_YANDEX_KURULUM.md` dosyasını izleyin.

Üçüncü bölümün [teknik dil ve performans kaydı](docs/seo-geo/bolum-3-teknik-dil-performans-2026-10-01.md) ölçüm kaynaklarını içerir. TR sayfaları URL değiştirmeyen `src/app/(tr)` grubundadır; her dil kendi statik kök layout'undan ortak `root-document.tsx` belgesini kullanır. Yalnız bilinmeyen URL'ler için 404 belgesi istek dilini okur. Dil kökleri arasında gezinme tam belge yükler. `npm run test:seo` kök dili/yönü, hreflang/sitemap eşitliği ve sekiz dilde HTTP 404'ü de denetler.
