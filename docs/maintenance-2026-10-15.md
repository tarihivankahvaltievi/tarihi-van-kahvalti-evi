# SEO/GEO, performans ve güvenlik bakımı — 15 Ekim 2026

## Değişiklikler

- Yönetici oturumu artık rastgele bileşenli, HMAC imzalı ve son kullanma tarihi içeren bir token kullanır. Yedi günlük süre sunucuda doğrulanır; çerezi elle yeniden göndermek süreyi uzatmaz. Parola veya oturum anahtarı değişirse oturum geçersizleşir. Eski tarihsiz tokenlar reddedilir; dağıtımdan sonra mevcut yöneticiler yeniden giriş yapmalıdır. HttpOnly, Secure ve SameSite çerez korumaları korunur. Çıkış tarayıcıdaki çerezi temizler; tokenlar sunucu tarafında ayrı bir iptal listesinde tutulmaz.
- Yerel WOFF2 fontları Proxy çalıştırmadan sunulur. Haftalık tarayıcı önbelleği ve stale-while-revalidate, tekrar ziyaretlerde font aktarımını azaltır. Dosya adları içerik hash'i taşımadığından bir yıllık immutable cache uygulanmadı.
- robots.txt, sitemap.xml ve llms.txt, uygulama seviyesinde de apex alan adından www kanoniğine tek adımda yönlendirilir. Statik kaynaklara ilişkin genel Proxy istisnası bu üç keşif kaynağını artık atlamaz.
- llms.txt ürün/fiyat bilgisine, aynı canlı menüden ürün açıklamaları ve servis ayrıntıları ekler. Dahil ürün ve porsiyon koşulları cevap motorlarına da aktarılır. Görünür menü kaynak olmaya devam eder; ayrı fiyat veya işletme gerçeği üretilmez.
- SEO testi Googlebot User-Agent ile tüm sitemap sayfalarında doğrudan HTTP 200, doğru canonical, noindex bulunmaması ve JS olmadan okunabilir başlık/içerik arar. Sitemap görsellerini HEAD istekleriyle kontrol eder; font önbelleği ve metadata alan adı yönlendirmeleri de doğrulanır.

## Doğrulama

- Üretim build ve TypeScript kontrolü, ESLint, test:security, test:menu, test:reservations, test:analytics ve test:seo başarılı.
- 30 kanonik sayfa Googlebot kimliğiyle JS çalıştırmadan okunabilir; 98 benzersiz sitemap görseli HTTP 200 ve image içerik türü döndürür. 48 eski URL, hreflang, JSON-LD, noindex ve gerçek 404 sözleşmeleri geçer.
- İzole menü/API testleri 142 ürün / 18 kategori, güncel açıklama/fiyat/şema, GEO servis ayrıntıları ve kayıt sonrası cache yenilenmesini doğrular. Süresi dolmuş ve bozulmuş oturumlarla gerçek yönetim API erişimi 401 döner; geçerli oturumla giriş/kayıt/yükleme çalışır.
- npm audit --omit=dev: 0 açık. Tam audit: geliştirme zincirinde braces ve ona bağlı paketler için 5 high uyarısı devam ediyor. Registry'deki son braces sürümü 3.0.3; güvenli yama yayımlanmamış. Next.js'i eski ana sürüme düşüren audit fix --force uygulanmadı. Ayrıntılar: [önceki bakım kaydı](maintenance-2026-10-14.md).
- Başlangıçta canlı www ana sayfasının HTTP 200, robots dosyasının erişilebilir olduğu ve apex sitemap adresinin www'ye HTTP 308 yönlendiği kontrol edildi. Yeni değişikliklerin kabul kontrolleri yerel üretim sunucusunda yapıldı.

## Kapsam ve kaynaklar

Google'ın temel koşulları bot erişimi, başarılı HTTP yanıtı ve indekslenebilir içeriktir. Teknik uygunluk tarama, indeksleme, sıralama veya AI yanıtlarında görünme garantisi değildir. llms.txt ek bir yardımcı kaynaktır; Google için özel bir GEO gerekliliği değildir. Search Console hesap işlemleri ve saha Core Web Vitals ölçümü bu kayıtta yapılmış sayılmaz.

- [Google teknik gereklilikleri](https://developers.google.com/search/docs/essentials/technical)
- [Google AI özellikleri ve siteniz](https://developers.google.com/search/docs/appearance/ai-features)
- [Google görsel SEO rehberi](https://developers.google.com/search/docs/appearance/google-images)
- [Braces güvenlik duyurusu](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm)
- Kurulu Next.js'in node_modules/next/dist/docs/ altındaki Proxy, robots ve headers referansları.
