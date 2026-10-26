# 26 Ekim 2026 — Genel bakım, SEO ve GEO araştırması

## Sonuç ve kapsam

Mevcut tasarım ve 30 kanonik sayfa korundu. Kaynak kod, üretim HTML'i, tarayıcı görünümü, menü/API akışları, bağımlılıklar ve güncel birincil arama motoru belgeleri incelendi. Sıralama amacıyla yeni, birbirini tekrarlayan açılış sayfaları üretilmedi. Çalışmanın odağı gerçek fiyat doğruluğu, erişilebilirlik, yerel işletme tutarlılığı ve taranabilir içerik oldu.

## Uygulanan düzeltmeler

1. **TR/EN menü şeması tek üreticiye taşındı.** `menu-schema.ts` her iki dilde aynı fiyat, ürün ve servis kurallarını uygular. Ayrı sayfalarda iki farklı uygulamanın zamanla ayrışması önlenir.
2. **Fiyatın yalnız başını okuma hatası düzeltildi.** Önceki ifade `₺1.250,50` için `1` üretiyordu. Yeni dönüştürücü Türkçe binlik/ondalık biçimini tam eşleştirir: `₺1.250,50 → 1250.5`, `1.750 TL → 1750`. Aralıklar ve fiyat yerine yazılmış metinler görünür menüde korunur, yanlış tek fiyatlı `Offer` üretilmez. Mevcut işletme fiyatları değiştirilmedi.
3. **Servis kapsamı yapılandırılmış veriye taşındı.** `Offer.description`, kişi başı notunu, doğrulanmış minimum sipariş koşulunu ve aynı menü kaydındaki dahil ürün/çay/sıcak seçim ayrıntılarını içerir. TR ve EN kendi görünür dil metinlerini kullanır. Stok, diyet uygunluğu veya ödeme yöntemi hakkında yeni iddia eklenmedi.
4. **Korece grup rehberinde ana içeriğe geçiş düzeltildi.** `main-content` ve programatik odak hedefi eklendi. Önce bağlantı mevcut olmasına rağmen hedef yoktu.
5. **Aynı rehberin başlık kontrastı düzeltildi.** Global başlık rengi koyu yeşil zemin üzerinde koyu kalıyordu. Bölüme özgü beyaz renk verildi; başlığın sıkışık harf aralığı da azaltıldı. Tarayıcıda beyaz başlık, yatay taşma olmaması ve Tab/Enter sonrası `main-content` odağı doğrulandı.
6. **Menü değişikliği bildirim kapsamı tamamlandı.** Güncel fiyatları gösteren `/van-kahvaltisi`, yönetim kaydının açık önbellek yenileme ve IndexNow URL listesine eklendi. Testler `INDEXNOW_DRY_RUN=1` kullanır; sahte test fiyatları dış servise gönderilmez.
7. **Bağımlılık bakımı:** Next.js ve eşleşen ESLint yapılandırması `16.4.1 → 16.4.3`; geliştirme zincirindeki Zod `4.6.5 → 4.6.7`. Kilit dosyası güncellendi. Tam `npm audit --audit-level=moderate`: **0 açık**. Önceki tam taramadaki tek yüksek seviye Zod uyarısı giderildi.
8. **Kalıcı regresyon kapsamı genişletildi.** Türkçe fiyat biçimleri ve belirsiz fiyatlar için 20 örnek; gerçek yönetim API kaydından sonra TR/EN HTML/şema fiyat ve servis eşleşmesi; tüm sitemap sayfalarında ana içerik hedefleri ve sayfalar arası bölüm bağlantıları kontrol edilir.

## Araştırma ve uygulama kararları

### Arama ve yapay zekâ yanıtları

Google'ın güncel [üretken yapay zekâ arama rehberi](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide), anlaşılır ve özgün içerik, teknik erişim ve yararlı kullanıcı deneyimini öne çıkarıyor. Google Search `llms.txt` kullanmadığını ve özel AI dosyaları/şeması gerekmediğini açıklıyor. Bu nedenle mevcut yardımcı dosya korundu; Google sıralama etkisi atfedilmedi. Asıl ürün bilgileri sunucu HTML'i ve görünür menüyle uyumlu JSON-LD üzerinde güçlendirildi.

[Bing Webmaster Guidelines](https://www.bing.com/webmasters/help/bing-webmaster-guidelines-30fba23a), Bing/Copilot için de tarama, indeksleme, kanonikleştirme, açık içerik ve kaynak doğruluğunu esas alıyor. Kamu sayfalarının bot erişimi, tek kanonik URL, iç bağlantılar ve gerçek 404 davranışı test edildi. Yapay zekâ yanıtını zorlayan gizli talimatlar veya anahtar kelime yığınları eklenmedi.

### Yerel işletme kimliği

[Google LocalBusiness belgesi](https://developers.google.com/search/docs/appearance/structured-data/local-business), uygun alt tür ve görünür bilgiyle uyumlu işletme verisi kullanılmasını öneriyor. Mevcut `Restaurant` kimliği, telefon, adres, koordinat, menü ve rezervasyon ilişkileri korundu. İşletmenin kendi sitesindeki üçüncü taraf yorum puanından yeni `aggregateRating` üretilmedi.

[Google yerel sıralama rehberi](https://support.google.com/business/answer/7091?hl=en), eksiksiz/doğru profil, saatler, kategori, görseller ve değerlendirmeleri öne çıkarıyor. Yerel sonuçların ilişki, mesafe ve tanınmışlıkla belirlendiğini açıklıyor. Yalnız site içi kodla tüm yerel sıralama faktörleri kontrol edilemez.

**Saat teyidi:** İşletme sahibi bu çalışma sırasında her gün **07:00–22:00** bilgisini doğruladı. Site zaten bu değeri kullanıyor. [Restaurant Guru işletme sonucu](https://tr.restaurantguru.com/Tarihi-Van-Kahvalti-ve-Sarap-Evi-Istanbul) araştırma sırasında 06:30–23:00 gösteriyordu; doğru saatlerle profil sahibinin düzeltmesi gereken bir tutarsızlık. [Yandex kaydı](https://yandex.com.tr/maps/org/tarihi_van_kahvalti_evi/237523878781/) adres ve telefonu siteyle eşleştiriyor. Bu araştırmada üçüncü taraf profillerine yazma işlemi yapılmadı. Arama sonucu önbelleği, canlı işletme panelinin yerine geçmez.

### Çok dillilik ve menü verisi

[Google hreflang rehberi](https://developers.google.com/search/docs/specialty/international/localized-versions) karşılıklı ve kendisini de içeren tam URL'ler gerektiriyor. HTML/sitemap dil kümeleri mevcut 30 sayfada doğrulandı. Farklı amaçlı rehberler sırf dil kodu eklemek için eşdeğer çeviri gibi işaretlenmedi.

[Schema.org MenuItem](https://schema.org/MenuItem) ve [Offer](https://schema.org/Offer), ürün ve teklif modelinin dayanağıdır. Fiyat para birimi TRY olarak kalır; fiyat aralığı yanlış bir tek fiyat olarak sunulmaz. Servis kapsamı aynı canlı kayıttan açıklamaya eklenir. Bu şema, Google'da belirli bir zengin sonuç görünümünün garantisi değildir.

## Doğrulama

| Kontrol | Sonuç |
| --- | --- |
| ESLint | Başarılı |
| Üretim derlemesi ve TypeScript | Başarılı; Next.js 16.4.3 |
| `npm test` | Tüm alt kontroller başarılı |
| Googlebot, JS çalıştırmadan | 30 kanonik sayfa, 200/başlık/içerik/canonical kontrolü |
| Görsel sitemap | 98 benzersiz görsel, erişilebilir ve image içerik türü |
| Eski URL'ler | 48 kalıcı yönlendirme, slash/alan adı/eski sorgu birleşimi dahil |
| Bölüm bağlantıları | 252 bağlantı ve tüm ana içeriğe geç hedefleri |
| Menü | 142 ürün, 18 kategori; TR/EN, API kaydı sonrası yenileme, şema ve fiyat eşleşmesi |
| Fiyat biçimleri | 20 örnek; binlik, ondalık, para birimi, geçersiz/aralık değerler |
| Rezervasyon/analitik/güvenlik | Mevcut tüm regresyon kontrolleri başarılı |
| Tam bağımlılık taraması | 0 açık |
| Tarayıcı | Yerel üretimde 1280 px: Korece rehber kontrastı, klavye odağı ve İngilizce menüde 142 ürün; yatay taşma yok |

Impeccable mekanik tarayıcısının tek bulgusu mevcut Arial/Korece font fallback tercihi oldu. Bu, işlevsel erişilebilirlik hatası olarak değerlendirilmedi; mevcut tasarımın font sistemi değiştirilmedi. Tarayıcı görsel kanıtı çalışma alanındaki `../output/maintenance-2026-10-26/korean-guide-after.png` dosyasında.

## Sınırlar ve sonraki işletme adımları

- Güncel Search Console/Bing hesap performansı, Google Business Profile yönetim paneli ve gerçek kullanıcı Core Web Vitals verisi bu çalışmada ölçülmedi. Arama görünürlüğünde artış veya indekslenme tamamlandı iddiası yok.
- Bu oturumdaki tarayıcı kontrolü masaüstü boyutundadır; yeni mobil emülasyon, fiziksel telefon ve Lighthouse ölçümü yapılmış sayılmaz.
- Restaurant Guru saatleri 07:00–22:00 olarak düzeltilmeli; Google/Yandex profil panelindeki haftalık ve özel gün saatleri de aynı doğrulanmış kaynakla karşılaştırılmalı.
- Dağıtımdan sonra Search Console URL Denetimi ile `/menu`, `/en/menu` ve Korece rehber kontrol edilmeli; Bing'e yalnız gerçekten değişen yayın URL'leri bildirilmeli. GitHub push tek başına dağıtım doğrulaması sayılmaz.
- Performans takibinde markalı/markasız sorgular, menü/rezervasyon tıklamaları, dil ve ülke kırılımı önceki eşit süreyle karşılaştırılmalı. Bir günlük değişimden SEO/GEO başarısı çıkarılmamalı.
- Önceki çalışmadan kalan GitHub Actions şablonu henüz etkin değil; geçmişte kaydedilmiş `workflow` yetki sınırı bu bakımda aşılmadı.
- PRODUCT.md eski Impeccable formatında. Kullanılmayan Register alanı kaldırılabilir; bağlam belgesinin isteğe bağlı yenileme yolu `impeccable init` komutudur. Bu bakım sırasında ürün belgesi yeniden yazılmadı.

## Ek kaynaklar

- [Zod güvenlik duyurusu](https://github.com/advisories/GHSA-mrhx-c7xc-m3w5)
- Kurulu Next.js `node_modules/next/dist/docs/` içindeki Metadata, use cache ve sitemap referansları.
