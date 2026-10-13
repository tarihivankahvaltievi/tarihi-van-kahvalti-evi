# Genel bakım — 13 Ekim 2026

## Değişiklikler

- Next.js ve ESLint Next yapılandırması 16.4.0'a güncellendi. Kilit dosyası, güvenlik düzeltmeleri içeren sharp 0.35.5 ve source-map-js 1.2.2 sürümlerini içeriyor.
- Cache Components ile Partial Prefetching etkinleştirildi. Aynı hedefe giden bağlantılar ortak sayfa kabuğunu kullanıyor. Mevcut kodda özel full-prefetch bağlantısı bulunmuyor; İngilizce ana sayfadan menüye istemci geçişi tarayıcıda doğrulandı.
- Kaydırma efektleri artık ana sayfa hikâyesini, menü önizlemesini, mekân bilgisini ve altbilgiyi JavaScript/IntersectionObserver çalışana kadar gizlemiyor.
- Hareket azaltma tercihinde hikâye ve tabak yer değiştirmeleri sıfırlanıyor; logo tıklamasında yumuşak kaydırma devre dışı. Tabak hareketi ekran dışında duruyor.
- Her DOM değişiminde bütün sayfayı taramak yerine eklenen alt ağaçlar taranıyor; tamamlanan giriş animasyonları gözlemden çıkarılıyor. Gereksiz kalıcı will-change katmanları kaldırıldı.
- Atmosfer görselinde yapılandırmada bulunmayan quality=85 yerine desteklenen 75 kullanılıyor.
- Menü önizleme sekmeleri ok tuşları, Home/End, aktif sekmeye odak ve odaklanabilir panel ile kullanılabiliyor. İngilizce sekme grubu etiketi yerelleştirildi.
- llms.txt eksik Rusça, Arapça, Japonca ve Korece rehberleri içeriyor; koordinatlar merkezi işletme verisinden alınıyor. Masa talebi ile onaylanmış rezervasyon ve aile hikâyesi ile açılış tarihi ayrımı açıklandı.
- SEO testi yeni Next.js CSS modül adlandırmasıyla uyumlu; llms.txt rehber kapsamı ve rezervasyon açıklaması regresyon kontrolüne eklendi.

## Doğrulama

- npm run lint: geçti.
- npm run build: geçti; 46 derleme girdisi, Partial Prefetching etkin.
- npm run test:seo: geçti; 30 kanonik sayfa, 48 eski URL, karşılıklı hreflang, sitemap, görseller, robots, Restaurant/Menu/FAQ şemaları ve gerçek 404 kontrolleri.
- npm run test:menu: geçti; 142 ürün / 18 kategori, TR/EN HTML-şema-fiyat eşleşmesi, anında önbellek yenileme, yetkisiz yazma ve rezervasyon dahil ürünleri.
- npm run test:reservations: geçti; İstanbul saat dilimi, takvim doğrulaması, ICS ve kalıcı depolama hata davranışı. Başarısız depolama senaryosunun hata günlükleri testin beklenen çıktısıdır.
- npm run test:analytics: geçti; kişisel veri temizleme, özel sayfa hariç tutma, UTM/reklam ilişkilendirmesi ve dönüşüm akışı.
- Chrome/Playwright 390×844: normal hareket, azaltılmış hareket ve JavaScript kapalı senaryolarında görünür içerik, görseller ve yatay taşma kontrolleri geçti. JS açıkken sekme klavye kullanımı ve /en → /en/menu geçişi doğrulandı; tarayıcı hata kaydı yok.
- Ekran görüntüleri: ../output/maintenance-2026-10-12/ (bakımın başladığı tarih ile adlandırıldı).
- npm audit --omit=dev: 0 açık. Tam audit, ESLint → fast-glob → micromatch → braces zincirinde 5 yüksek seviyeli geliştirme bağımlılığı bulgusu raporluyor. Yayındaki üretim bağımlılıklarında yok. braces için mevcut en güncel sürüm 3.0.3; audit'in önerdiği force işlemi ESLint Next'i eski major sürüme düşürdüğü için uygulanmadı.

Gerçek kullanıcı Core Web Vitals / Lighthouse önce-sonra skoru ölçülmedi; hız puanı veya sıralama artışı iddia edilmiyor. llms.txt yardımcı bir kaynak, arama görünürlüğü garantisi değil. Mevcut Google Business, adres, telefon ve saat bilgileri değiştirilmedi.
