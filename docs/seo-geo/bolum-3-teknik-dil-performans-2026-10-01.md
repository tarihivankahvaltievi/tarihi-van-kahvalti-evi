# Bölüm 3 — Çok dilli teknik SEO ve ölçülmüş performans

Tarih: 1 Ekim 2026. Rapor maddeleri: **13, 18, 21, 22**. Başlangıç sürümü: `d2bb7484d34e0ed465bb5c42049a9867fb266bf4`. PDF önerileri araştırma girdisidir; yetki ve kapsam kullanıcının talebinden gelir. Bu bölümde ticari bilgi ve fiyat uydurulmadı.

## 1. İlk HTML yanıtındaki dil ve yön

Önceki kök belge bütün sayfalarda `lang="tr"` üretiyordu. İstemci tarafındaki dil değişimi ilk sunucu yanıtını düzeltmiyordu. TR sayfaları URL değiştirmeyen `(tr)` route grubuna taşındı; EN, KO, ZH-CN, ES, AR, RU, JA ayrı statik kök layout kullanıyor. Paylaşılan `root-document.tsx` font, doğrulama, analitik ve metadata ayarlarını koruyor. KO/JA Noto font değişkenleri kendi kökünde korunuyor; Japonca fontların tamamı zorunlu preload edilmiyor.

`html lang`, `dir` ve HTTP `Content-Language` birlikte doğrulanıyor. Arapça kökte `rtl`, diğer yedi dilde `ltr`. Skip link metni yerelleştirildi; rehberlerde hedef main klavyeyle odaklanabilir yapıldı. URL'den hesaplanan dahili dil başlığı Proxy'de her zaman yeniden yazılıyor; kullanıcı tarafından verilen değer kullanılmıyor.

Bilinmeyen adresler, normal layout'lardan bağımsız küçük `global-not-found.tsx` belgesiyle gerçek HTTP 404 + noindex dönüyor. Yalnız bu hata belgesi istek başlığını okuyor; Next 16.3'te `instant=false` ile dinamik hata belgesi açıkça tanımlandı. İndekslenebilir sayfalar statik üretim/menü önbelleğini koruyor. Sahte catch-all sayfalar eklenmedi. Admin noindex layout'u da TR route grubuna taşındı.

**Teknik karşılık:** ayrı dil kökleri arasında gezinme tam belge yükler. Aynı kök içindeki gezinme Next istemci gezinmesini korur. Bu, Next'in belgelenmiş davranışıdır. Statik sayfaları isteğe bağımlı ortak köke dönüştürmeden doğru başlangıç dilini sağlar.

Kaynaklar: [Next route groups](https://nextjs.org/docs/app/api-reference/file-conventions/route-groups), [global not-found](https://nextjs.org/docs/app/api-reference/file-conventions/not-found), [W3C H57](https://www.w3.org/WAI/WCAG22/Techniques/html/H57), [W3C yön rehberi](https://www.w3.org/International/questions/qa-html-dir). Google içerik dilini ağırlıklı olarak görünür metinden belirler; `html lang` düzeltmesini tek başına sıralama artışı diye sunmuyoruz.

## 2. Gerçek eşdeğer içerik ve hreflang

TR/EN ana sayfalar aynı işletme sunumu ve ziyaret niyetini paylaşır. `/ko` ise farklı rehberlerden oluşan bir CollectionPage; TR/EN ana sayfanın çevirisi değildir. Korece hub ana sayfa hreflang kümesinden çıkarıldı. KO, ES, ZH-CN hub'larının kendi canonical adresleri ve gerçek dahili gezinme bağlantıları korunuyor. ES/ZH-CN için kendi dilindeki Twitter başlık ve açıklamaları eklendi.

Menü TR/EN ve rezervasyon TR/EN eşleştirmeleri korunuyor. Gerçek rehber çevirilerinin kümeleri: uluslararası kahvaltı EN/RU/AR/KO, bal-kaymak KO/JA/ZH-CN/ES, Taksim KO/ZH-CN, klasik kahvaltı EN/ES. Kaymak açıklaması yalnız kendisini eşliyor; aynı kayıt sitemap'e de alındı. Tur rehberi için gereksiz tek dil alternatifi çıkarıldı. Farklı konulu rehberler birbirlerinin dil alternatifi yapılmadı.

SEO testi artık sadece beklenen etiketin bulunmasını kontrol etmiyor: **kümenin tamamını**, canonical hedefleri, karşılıklı bağlantıları ve her sitemap kaydının HTML ile birebir aynı alternatifleri taşımasını denetliyor. Kaynak: [Google yerelleştirilmiş sürümler](https://developers.google.com/search/docs/specialty/international/localized-versions).

## 3. Yönlendirme zincirleri

Uygulamada birbirinden önce çalışan Next redirects ve Proxy kuralları birleştirildi. Eski adres, son slash, apex host ve `wc-ajax` temizliği aynı hedef üzerinde hesaplanıyor. HTTP 308 kalıcı yanıt; geçerli query/UTM parametreleri korunur, yalnız eski `wc-ajax` kaldırılır. Ürün fragment hedefleri kaybolmaz. 48 eski adres ve slash'li halleri doğrulanır; birleşik varyantlar ayrıca test edilir.

Başlangıç canlı kaydı [yönlendirme JSON'undadır](bolum-3-yonlendirme-once.json). Örnek `/en/?wc-ajax=1` iki yönlendirme yapıyordu. HTTPS apex + eski iletişim adresi de iki yönlendirme yapıyordu.

**Platform sınırı:** HTTP apex önce Vercel'in HTTPS yükseltmesinden geçer. Bu işlem uygulama Proxy'sinden önce gerçekleşir. Vercel bunu [resmî destek belgesinde](https://vercel.com/kb/guide/resolve-err-too-many-redirects-when-using-cloudflare-proxy-with-vercel) açıklar. Koddan bu katmanın kaldırıldığını veya bütün HTTP varyantlarının tek sıçrama olduğunu iddia etmiyoruz. Canlı yayın sonrası zincirler ayrı kaydedilecek; dış profillerin HTTPS www bağlantıları bölüm 4 kapsamındadır.

## 4. Performans: laboratuvar ve gerçek kullanıcı ayrımı

Başlangıç canlı ölçümleri: PageSpeed Insights, mobil Moto G Power, yavaş 4G, ilk yükleme, Lighthouse 13.5.0 / Chromium 153.0.8010.36. Rapor tarihleri ve bağlantıları [ölçüm manifestinde](bolum-3-pagespeed-rapor-baglantilari.json), açılan teşhisler `bolum-3-pagespeed-once-*.txt` dosyalarında.

| Mobil laboratuvar | Ana sayfa | EN menü | EN rezervasyon |
| --- | ---: | ---: | ---: |
| Performans puanı | 82 | 80 | 76 |
| LCP | 3,988 s | 4,733 s | 6,995 s |
| FCP | 2,701 s | 2,251 s | 1,351 s |
| TBT (hesaplama bağlantısı) | 70 ms | 62 ms | 54 ms |
| CLS (ekran değeri) | 0 | 0,004 | 0 |
| Erişilebilirlik / SEO | 100 / 100 | 100 / 100 | 100 / 100 |
| En iyi uygulamalar | 100 | 100 | 92 |

CrUX: ana sayfada URL düzeyindeki son 28 gün p75 LCP **2,2 s**, INP **127 ms**, CLS **0**, araç değerlendirmesi başarılı. EN menü/rezervasyonda yeterli URL verisi yok; araç origin verisine düşüyor: yuvarlanmış LCP **2,5 s**, INP **131 ms**, CLS **0**, değerlendirme başarısız. Bunlar o iki sayfaya özgü saha ölçümü değildir. Yuvarlanmış 2,5 s değerinden eşik altı sonucu çıkarılmaz. Güncel değişiklikler 28 günlük veriye hemen mal edilemez. Kaynaklar: [Core Web Vitals](https://web.dev/articles/vitals), [CrUX API — URL ve origin](https://developer.chrome.com/docs/crux/api).

Gözlenen sorunlar ve uygulama:

- Ana sayfada üst üste duran beş hero fotoğrafı başlangıçta DOM'da bulunuyordu. Yalnız aktif fotoğraf, geçiş sırasında da önceki fotoğraf oluşturuluyor. Beş seçim düğmesi ve mevcut geçiş tasarımı korunuyor; diğer fotoğraflar seçildiğinde yükleniyor. İlk fotoğraf eager/high, seçilen diğer fotoğraf eager/auto. İlk yükleme DOM'unda beş yerine bir slayt doğrulandı.
- Menü LCP öğesi `breakfast-spread.webp`. Mevcut deprecated `priority` yerine açık `loading=eager` ve `fetchPriority=high` kullanıldı. Başlangıç ölçümündeki kaynak keşfi teşhisinde yüksek öncelik eksikti; sunucu HTML'i ve tarayıcı DOM'u yeni işareti doğruluyor.
- Rezervasyon LCP öğesi `historic-corner.webp` zaten eager/high. Bulgularla çelişen ikinci preload veya bütün galeriye yüksek öncelik eklenmedi.
- Ana sayfada yaklaşık 83 KiB render engelleyen CSS ve 2.660 ms tahmini tasarruf gözlendi. Bu tahmin gerçek kazanım değildir. Küresel cascade birçok sayfa tarafından kullanılıyor. Next `inlineCss` deneysel ve CSS'i HTML/RSC içinde çoğaltıp sayfalar arası önbellekten vazgeçiyor; tüm CSS körlemesine inline edilmedi. Kaynak: [Next inlineCss](https://nextjs.org/docs/app/api-reference/config/next-config-js/inlineCss).
- Rezervasyondaki 92 best-practices puanında Google Ads'in `google.nl` bölgesel pikseli mevcut CSP tarafından engellenmiş. Bu, menü/rezervasyon uygulama hatası diye yanlış sınıflandırılmadı. CSP'ye genel wildcard eklenmedi. Bölgesel analitik gereksinimi ayrıca dar kapsamlı değerlendirilmelidir.

LCP alt süreleri teşhis trace'inden gelir; kısıtlanmış laboratuvar LCP değeriyle doğrudan toplanmaz. TBT laboratuvar ölçüsüdür; gerçek INP yerine geçmez. SEO 100 ve ajan tarama 3/3 puanları sıralama veya yapay zekâ önerilme garantisi değildir. Kaynaklar: [LCP optimizasyonu](https://web.dev/articles/optimize-lcp), [Next Image](https://nextjs.org/docs/app/api-reference/components/image).

## 5. Doğrulama ve yayın kaydı

Yerel üretim derlemesi başarılı. Lint başarılı. SEO sözleşmesi: 30 canonical sayfa, 48 eski URL + slash varyantları; ilk HTML dili/yönü/başlığı, tam karşılıklı hreflang/sitemap, gerçek 404, özel yüzey noindex ve mevcut Restaurant/Menu/FAQ eşleşmesi. Menü testi: 142 ürün/18 kategori, gerçek prerender HTML, TR/EN şema/fiyat/açıklama eşleşmesi ve izole yönetim kaydı sonrası anlık güncelleme. Rezervasyon/takvim testi izole fixture ile geçti; canlı müşteri kaydı yazılmadı.

Tarayıcı: mobilde TR → EN → EN menü geçişi, 142 ürün ve yatay taşma olmaması; fotoğraf seçimi; masaüstünde AR → EN kök yönünün rtl → ltr dönmesi; skip link'in main'e odak vermesi doğrulandı. Özel veriler ve ortam sırları envantere alınmadı. [Güncel kaynak envanteri](kod-envanteri-bolum-3-2026-10-01.csv) dosya özetlerini içerir.

Yayın sonrası kontrol sonuçları aynı belgede tamamlanacaktır. Performans kabulü ölçüm ve doğrulanmış kaynak iyileştirmesidir; tüm laboratuvar LCP değerlerinin eşik altına indiği henüz iddia edilmez.
