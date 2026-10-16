# 16 Ekim 2026 — SEO, GEO ve performans bakımı

## Uygulanan düzeltmeler

- Commissioner fontunda CSS tarafından kullanılmayan FLAR ve VOLM varyasyon eksenleri kaldırıldı. Değişken ağırlıklar ve mevcut marka fontları korundu.
- Ana sayfa fotoğraf seçicisinde seçilen görsel yüklenemezse seçici son yüklenmiş fotoğrafa döner. Ziyaretçi başarısız slaytta takılı kalmaz ve yeniden deneyebilir.
- Web Vitals gönderiminde `sendBeacon` kuyruğu isteği reddederse `fetch`/`keepalive` devreye girer. Çevrimdışı ölçüm gönderimi yakalanmamış Promise hatası oluşturmaz. Özel sayfalar ölçüme dahil edilmez.
- `llms.txt`, Türkçe ana sayfayla aynı kaynaktan üretilen 11 resmi SSS sorusu ve yanıtını içerir. Kaynak sayfaya atıf, güncel fiyatı menüden kontrol etme ve rezervasyon talebi/teyidi ayrımı korunur.
- `npm test` güvenlik, analitik, Web Vitals, rezervasyon, üretim sitesi/SEO ve menü testlerini tek komutta çalıştırır.
- `test:site`, geçici dosyalarla kendi yerel üretim sunucusunu açar. Gerçek veritabanını veya IndexNow servisini kullanmaz; SEO/GEO sözleşmesini, üretim CSP başlıklarını ve yabancı kaynaktan API yazma engelini doğrular.
- GitHub Actions şablonu main push, pull request ve elle başlatma için lint, build, tüm testler ve üretim bağımlılığı güvenlik taramasını içerir. Action sürümleri commit SHA ile sabitlendi. GitHub erişim anahtarının `workflow` yetkisi olmadığı için `.github/workflows/quality.yml` yüklemesi sunucu tarafından reddedildi; şablon `docs/site-quality-workflow.yml` olarak saklandı. Etkinleştirmek için yetkili bir hesapla bu dosyayı `.github/workflows/quality.yml` konumuna taşımak gerekir. Otomatik test akışı henüz etkinleştirilmedi.

## Doğrulama

- `npm run lint`, `npm run build`, tüm `npm test` alt kontrolleri ve `npm run test:vitals`: başarılı.
- SEO: 30 kanonik sayfa, 48 eski URL, 98 sitemap görseli; hreflang, robots, 404, Restaurant/Menu/FAQ verileri ve JavaScript gerektirmeyen HTML kontrolleri başarılı.
- Menü: 142 ürün / 18 kategori; TR/EN fiyat ve şema eşleşmesi, yetkisiz yazma, rezervasyon ürünleri ve kayıt sonrası önbellek yenileme başarılı.
- Chrome: 390 ve 1440 piksel genişlikte ana sayfa, İngilizce ana sayfa, menü, konum, rezervasyon, Korece ve Çince sayfalarda HTTP 200, tek H1 ve yatay taşma kontrolü başarılı. Mobilde azaltılmış hareket ve JavaScript kapalı senaryoları da başarılı.
- Ana görsel isteği bilerek engellendiğinde seçicinin ilk yüklenmiş fotoğrafa dönmesi doğrulandı. Yakalanmamış tarayıcı JavaScript hatası yok.
- Ekran görüntüleri: çalışma alanındaki `../output/maintenance-2026-10-16/` dizini.
- `npm audit --omit=dev --audit-level=moderate`: 0 açık. Tam taramada geliştirme zincirinde bilinen 5 yüksek seviye bulgu var (`eslint-config-next → fast-glob → micromatch → braces`). Audit önerisi Next ESLint yapılandırmasını eski major sürüme düşürüyor; bu uyumsuz işlem uygulanmadı.

## Performans ölçümü ve sınırlar

Yerel üretim sunucusunda temiz tarayıcı oturumu, 390×844 viewport ve aynı Chrome yapılandırmasıyla ölçülen font aktarımı 519.296 bayttan 482.700 bayta indi: 36.596 bayt, yaklaşık %7 azalma. Font isteği sayısı 12 kaldı. Mobil ilk görünümde CLS yaklaşık 0,00013, yatay taşma yok.

Bu ölçüm ağ/CPU yavaşlatması uygulanmamış yerel kontroldür; Lighthouse skoru veya gerçek kullanıcı Core Web Vitals sonucu değildir. Arama sıralaması ya da yapay zekâ yanıtlarında görünürlük artışı ölçülmedi. GitHub Actions şablonu yerelde incelendi; workflow yetkisi eksik olduğundan GitHub üzerinde çalıştırılamadı.
