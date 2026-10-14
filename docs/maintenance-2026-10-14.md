# Genel bakım — 14 Ekim 2026

## Uygulanan değişiklikler

- Next.js ve eslint-config-next 16.4.0 → 16.4.1. Sharp doğrudan bağımlılık olarak tanımlandı; büyük sürüm yükseltmesi yapılmadı.
- Sitemap, her istekte menü depolamasını okumak yerine menü sayfalarıyla aynı etiketli önbellekten üretiliyor. Üretim derlemesinde sitemap artık statik, 1 dakika revalidation / 5 dakika expire ile oluşturuluyor.
- `llms.txt`, aynı canlı menüden Türkçe/İngilizce ürün adlarını, fiyatları, servis notlarını ve menü güncelleme etiketini üretiyor. Menü kaydı hem sitemap hem GEO metnini yeniliyor. HTTP önbelleği güncel fiyat metni için 60 saniyeye indirildi. Sabit ürün bulunurluğu iddiası kaldırıldı.
- Ana sayfadaki dekoratif başlık görselinin preload önceliği kaldırıldı; kahvaltı fotoğrafının yüksek yükleme önceliği korunuyor. Kullanıcı etkileşiminden önce yapılan gereksiz Google reklam preconnect bağlantıları kaldırıldı.
- Yazma API'leri cross-site Fetch Metadata ve yabancı Origin isteklerini reddediyor. `.txt` gibi uzantı içeren API yolları da korumaya dahil.
- JSON gövdelerinde içerik türü, nesne şekli ve akış sırasında gerçek bayt sınırı kontrol ediliyor. Eksik veya sahte Content-Length sınırı geçemiyor. Bozuk JSON 400, fazla boyut 413, yanlış tür 415 döndürüyor.
- Yönetim menü kaydı ürün/kategori şekli, benzersiz kimlikler ve kategori ilişkilerini kontrol ediyor. Rezervasyonda metin/e-posta alanları sunucuda doğrulanıyor.
- Görsel yükleme: 5 MB dosya, 6 MB multipart form, 16 milyon piksel limitleri; JPEG/PNG/WebP/AVIF kabulü; Sharp ile gerçek piksel çözümleme, metadata temizleme, en fazla 2400 piksel WebP dönüşümü ve UUID dosya adı. SVG ve görüntü gibi sunulan HTML reddediliyor. Yerel yükleme yanıtlarına sandbox CSP, noindex ve immutable cache başlıkları eklendi.
- İngilizce `/en#location` bağlantısının eksik hedefi giderildi. TR/EN ana sayfa SSS yanında aynı işletme kaynağından adres, saat, telefon ve Maps yol tarifi sunuluyor.
- Önceki `Simplify mobile homepage hero` ve `Remove breakfast comparison from menu pages` commitleriyle kaldırılan alanları bekleyen eski testler güncellendi. Gerçek menü fiyatı/içeriği/şeması, ziyaret rehberi karşılaştırması ve rezervasyon dahil ürün kontrolleri korunuyor.

## Doğrulama

- `npm run lint` ve üretim `npm run build`: başarılı; TypeScript kontrolü dahil.
- `npm run test:security`: akış sırasında boyut kontrolü, sahte/eksik Content-Length, bozuk JSON, dizi/null/boolean ve yanlış içerik türü başarılı.
- `npm run test:menu`: izole depolama/sunucuda 142 ürün ve 18 kategori, TR/EN ilk HTML ürünleri, fiyat/açıklama/şema eşleşmesi, yetkisiz yazma, bozuk menü engeli, rezervasyon kaynak/durum kuralları ve önbellek yenileme kontrolü. GEO metninin menü kaydı sonrası fiyatı/ürünleri değiştirmesi de doğrulanıyor.
- Gerçek API üzerinde yabancı Origin, cross-site metadata, uzantılı yol, bozuk/aşırı büyük JSON, SVG, sahte PNG, fazla büyük görsel ve gerçek PNG → WebP dönüşümü doğrulandı. Yükleme çıktıları geçici test dizininde; gerçek menü/rezervasyon dosyaları değişmedi.
- `npm run test:reservations` ve `npm run test:analytics`: başarılı. Rezervasyon testinin kasıtlı depolama hatası senaryosu hata logu üretir ve hatanın başarı yanıtına dönüşmediğini doğrular.
- `npm run test:seo`: yerel üretim sunucusunda 30 kanonik sayfa, 48 eski URL yönlendirmesi, karşılıklı hreflang, sitemap, robots, IndexNow dosyası, Restaurant/Menu/FAQ JSON-LD, dil/404 ve özel alan noindex kontrolleri başarılı.
- Tarayıcıda İngilizce konum fragmentine gezinme, görünür adres/saat/telefon/Maps bağlantısı ve masaüstü yerleşimi kontrol edildi.
- `npm audit --omit=dev`: 0 güvenlik açığı.

## Kalan sınırlamalar

Tam npm audit, geliştirme zincirindeki `braces <=3.0.3` stack-exhaustion bulgusunu ve ona bağlı dört paket uyarısını raporluyor (toplam 5 high). npm registry'deki son braces sürümü hâlâ 3.0.3. Üretim bağımlılıkları etkilenmiyor. Çözüm olarak Next/eslint'i eski ana sürüme düşüren `npm audit fix --force` uygulanmadı. [Upstream takip kaydı](https://github.com/micromatch/braces/issues/84), [advisory](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm).

Bu çalışma saha Core Web Vitals veya arama sıralaması artışı ölçümü değildir. Sunucu/önbellek davranışı ve kaynak yükleme öncelikleri doğrulandı; SEO/GEO sıralama garantisi verilmez. Rate limit/WAF yapılandırması ve hesap tarafındaki Search Console işlemleri bu kaynak kod bakımı kapsamında değiştirilmedi.

## Kaynaklar

- [Next.js yayın kayıtları](https://nextjs.org/blog)
- [Google LocalBusiness yapılandırılmış veri](https://developers.google.com/search/docs/appearance/structured-data/local-business)
- Kurulu Next.js'in `node_modules/next/dist/docs/` altında Route Handlers, Proxy, metadata ve headers referansları.
