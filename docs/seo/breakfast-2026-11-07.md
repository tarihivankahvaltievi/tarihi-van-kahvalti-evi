# Kahvaltı seçimi ve masa talebi iyileştirmesi · 7 Kasım 2026

TR/EN ana sayfada kahvaltı ürünlerinin güncel açıklama ve dahil içerikleri artık doğrudan görünür. Metin ve fiyatlar yönetici menüsüyle aynı kayıt ve önbellekten gelir; yeni fiyat kopyası yoktur. Böylece ziyaretçi çay ve sıcak ürün kapsamını menüye geçmeden anlayabilir; arama motoru da gerçek işletme teklifini sunucu HTML’sinde okuyabilir.

TR/EN rezervasyon formunun başında mevcut serpme ve tek kişilik tabak fiyatları, minimum iki kişilik serpme koşulu ve menü bağlantısı bulunur. Serpme ara toplamı kişi sayısına göre değişir; bir kişide toplam gösterilmez. Kahve tercihi özeti gizler. Ekstralar ve varsa servis/kuver koşulları ayrıca açıklanır. Formun gönderimi işletme teyidi yerine geçmez.

`breakfastSubtotal` yalnız açık kişi başı/per person birimi ve geçerli sayısal fiyatla hesaplar. Menü birimi bilinmiyorsa soru-cevap metni ve şeması artık kişi başı varsayarak tutar üretmez. Aynı hesap ana sayfa ve formda kullanılır; belirsiz aralıklar toplam oluşturmaz. Ana sayfa ve rezervasyon sitemap değişiklik tarihleri güncellendi.

Reklam tarafında mevcut TR/EN kampanyalarının birer genel varyantı ilgili dilde menü/fiyat niyetine göre güncellendi; ana sayfa ve doğrudan rezervasyon varyantları korundu. Minimum sipariş, kişi başı fiyat ve tek kişilik seçenekler açıklandı. Menüde bulunmayan İngiliz kahvaltısı beklentisine yönelik iki dar tam eşlemeli negatif EN kampanyasına eklendi. Bütçe/teklif değişikliği yapılmadı. Ham hesap verileri ve özel denetim raporu depo dışında saklanır.

## Dayanak

- [Google RSA uygulamaları](https://support.google.com/google-ads/answer/6167122): mesaj ve açılış sayfası uyumu.
- [Dönüşüm işlemleri](https://support.google.com/google-ads/answer/11461796): iletişim tıklaması, kaydedilmiş talep ve gerçekleşen ziyaret farklı ölçümlerdir.
- [AI özellikleri ve SEO](https://developers.google.com/search/docs/appearance/ai-features): erişilebilir, yararlı HTML ve görünür içerikle tutarlı yapılandırılmış veri.
- [Yerel sıralama](https://support.google.com/business/answer/7091): alaka, mesafe ve bilinirlik; ilk sıra garantisi yoktur.

## Doğrulama

- ESLint, üretim derlemesi ve tam `npm test` geçti.
- 37 kanonik sayfa, 350 bölüm bağlantısı, 100 sitemap görseli ve 48 eski yönlendirme kontrol edildi.
- 142 ürün/18 kategori; izole depolamada menü fiyat/içerik güncellemesinin ana sayfa ve rezervasyona yansıması doğrulandı.
- Birim değişikliği, fiyat aralığı, silinen ürün ve geçersiz kişi sayısı senaryoları test edildi.
- Chrome: EN ana sayfa ve form 390px; TR form 320px. İncelenen mobil sayfalarda yatay taşma yok. EN formda kişi sayısıyla ara toplam, bir kişide toplamın gizlenmesi, kahve seçimi ve menü hedefine geçiş doğrulandı.
- Impeccable kaynak denetimi değişen UI hedeflerinde bulgu üretmedi.
- Canlı test rezervasyonu veya sahte reklam dönüşümü gönderilmedi. Bu kontroller sıralama veya rezervasyon artışı ölçümü değildir.
