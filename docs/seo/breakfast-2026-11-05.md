# Kahvaltı seçimi ve turist ziyaret akışı · 5 Kasım 2026

Ana reklam açılışları kahvaltı seçeneklerini, fiyat bağlamını ve masa talebini daha erken gösterir. Yeni `BreakfastVisit` sunucu bileşeni Türkçe/İngilizce ana sayfada hero sonrasında, mevcut marka düzeni içinde görünür. Serpme ve tek kişilik tabak kayıtları güncel menü önbelleğinden gelir; ayrı bir fiyat kopyası yoktur. Kişi başı notu ve sayısal fiyat doğrulanırsa iki kişilik kahvaltı ara toplamı hesaplanır. Ek ürünler ve varsa servis/kuver koşulları ayrıca açıklanır. Silinmiş ürün gösterilmez; belirsiz fiyat aralığından toplam üretilmez.

Türkçe sayfa başlığı ve erişilebilir H1 serpme kahvaltı/Taksim niyetini açıklar. İngilizce CTA `Request a Table` kullanır. Yeni bölümün menü/kişi sayısı/ulaşım bağlantıları mevcut analitik olaylarını kullanır; gezinme veya iletişim tıklaması kaydedilmiş rezervasyon gibi ölçülmez.

Rezervasyon isteğine 12 saniyelik zaman aşımı, ikinci gönderim kontrolü ve başarı/fallback ekranına aynı WhatsApp talebini tekrar açan bağlantı eklendi. Yeniden açma bağlantısı yeni rezervasyon API kaydı oluşturmaz. WhatsApp mesajının ziyaretçi tarafından gönderilmesi ve işletmenin ayrıca teyit vermesi gerekir. Zaman aşımı kalıcı kaydın kesin başarısızlığı demek değildir; sunucu başarı yanıtı olmadan birincil lead ölçülmez. Analitik müşteri adı, telefon veya takvim erişim kodu içermez.

Önceden yerelde bulunan `/en/location`, karşılıklı TR/EN canonical/hreflang, gezinme, sitemap ve menü SSS geliştirmeleri incelendi ve bu teslimde tamamlandı. İngilizce konumun eksik ana içerik dil işareti ve testlerdeki eski SSS/hreflang beklentileri düzeltildi. İlgisiz yerel rapor üretim scriptleri ve kurulum belgesi düzenlemeleri gönderime alınmadı.

## Araştırma dayanağı

- [Google AI özellikleri](https://developers.google.com/search/docs/appearance/ai-features): mevcut indekslenebilir HTML, erişilebilir metin, iç bağlantılar ve görünür içerikle tutarlı yapılandırılmış veri. Özel GEO dosyası veya sonuç garantisi yoktur.
- [Yerel sıralama](https://support.google.com/business/answer/7091): alaka, mesafe ve bilinirlik. Kod değişikliği her kullanıcı için ilk sıra sağlamaz.
- [LocalBusiness verisi](https://developers.google.com/search/docs/appearance/structured-data/local-business): ortak işletme kimliği, gerçek adres, saat, menü ve rezervasyon bilgisi korunur.
- [Reklam ve açılış uyumu](https://support.google.com/google-ads/answer/6167122): masa talebi amacı için ilgili rezervasyon sayfası; menü amacı için güncel menü.
- [Birincil/ikincil dönüşüm](https://support.google.com/google-ads/answer/11461796): talep ve iletişim eylemleri ayrılır.
- [Rakibin kendi ziyaret sayfası](https://www.savaanatolianbreakfasthouse.com/en/breakfast-near-me) kişi sayısı ve toplam fiyat sorularını ele alır. Çıkarım: bu bağlamı ziyaretçinin karar anında sunmak faydalıdır. Fiyat/metin kopyalanmadı; rakibin dönüşüm başarısı bilinmiyor.

## Doğrulama

- Üretim derlemesi, ESLint, tam `npm test` ve `npm audit --omit=dev` başarılı.
- 37 kanonik sayfa, 348 bölüm bağlantısı, 100 sitemap görseli ve 48 eski URL doğrulandı.
- İzole menü testi: fiyat güncellenince her iki ana sayfa ve iki kişilik ara toplam da yenilenir. Menü/rezervasyon testleri canlı depolama ve IndexNow kullanmaz.
- Chrome görsel kontrolü: EN kahvaltı bölümü masaüstü/390px; TR ana sayfa ve rezervasyona geçiş 320px; EN konum 390px. İncelenen mobil sayfalarda yatay taşma yok.
- Yeni Türkçe masa talebi bağlantısı `/rezervasyon` sayfasına açıldı. Gerçek WhatsApp mesajı veya canlı test rezervasyonu gönderilmedi. Yeniden açma akışı kaynak düzeyinde incelendi; gerçek mesaj teslimi test edilmedi.
- Bu kontroller dağıtım, Google indekslenmesi, sıralama veya rezervasyon artışı ölçümü değildir.

Yayın sonrası Search Console'da serpme/Taksim ve İngilizce yakınlık sorguları, kaydedilmiş talep ve işletme tarafından teyit edilmiş/gelen masa ayrı takip edilmelidir. Google İşletme Profili saat, pin, menü ve rezervasyon bağlantıları koddan bağımsız kontrol edilmelidir.
