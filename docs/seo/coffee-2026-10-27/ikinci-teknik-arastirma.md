# Kahve SEO / GEO: içerik, fiyat doğruluğu ve keşif üzerine ikinci araştırma

27 Ekim 2026 · Önceki strateji raporunu tamamlayan uygulama notu.

## Bu turun odağı

Bir işletme sayfasını faydalı kılan bilgi yalnız “kahve sunuyoruz” cümlesi değildir. Ziyaretçi hangi kahvenin bulunduğunu, fiyatını ve nereden sipariş vereceğini birlikte görebilmelidir. Bu turda altı dildeki kahve sayfalarına mevcut menü kaynağından beslenen seçili kahveler eklendi. Ürün adları ve fiyatları ilk HTML’de yer alıyor. Böylece fiyat araştıran kullanıcı ve metni işleyen arama sistemi aynı bilgiye ulaşabiliyor.

Bu karar, sitedeki eksikliği giderme ve ziyaret kararını kolaylaştırma amaçlıdır. Henüz Search Console, Ads veya kasa verisiyle ölçülmüş bir trafik/satış artışı iddiası değildir.

## Araştırmadan çıkan kararlar

| Araştırılan konu | Bulgu | Uygulama |
|---|---|---|
| İç bağlantılar | Google, anlamlı bağlantı metinleri ve gerçek `a href` bağlantılarıyla ilgili sayfalara ulaşmayı öneriyor | Kahvaltı/ziyaret rehberlerine kendi dillerinde kahve bağlantıları eklendi; yalnız dil seçicisine bağlı keşif azaltıldı |
| Görünür içerik ve şema | Google, işaretlenen bilginin görünür içerikle uyuşmasını ve güncel olmasını istiyor | Aynı sunucu verisi hem fiyat listesine hem MenuItem/Offer bilgisine gidiyor |
| Menüdeki ürünün kimliği | Schema.org MenuItem, menüde listelenen yiyecek/içecek için uygun tür | Kahveler mevcut TR/EN menü ürünlerinin URL/kimlikleriyle bağlandı; yeni bir işletme veya uydurma mağaza ürünü yaratılmadı |
| Seçili ürünler | ItemList, birden çok öğeyi tanımlayabiliyor | Altı seçili kahvenin listesi oluşturuldu; öğe sayısı gerçek görünür satır sayısıyla aynı |
| Dil ve bölge | Turist sayfasının dili değişebilir; ürün ve para birimi aynı kalır | Altı dilde ürün adları; Türk lirası açıklaması; Arapçada fiyatın LTR izolasyonu |
| Değişiklik bildirimi | Sitemap son güncelleme tarihi anlamlı içerik değişimini yansıtmalı | Kahve sayfası lastmod değeri, içerik tarihiyle menünün güncel tarihinden yeni olanı kullanıyor |
| Görsel keşfi | Google HTML görseli, bağlam ve açıklayıcı alt metin kullanıyor | Mevcut gerçek kahve paylaşım fotoğrafı, WebPage ana görseli olarak tanımlandı; ölçüler ve yerel açıklama eklendi |
| Yükleme | LCP görselini geç keşfetmek/lazy yüklemek gecikmeye neden olabilir | Mevcut hero görseli preload davranışı korundu; yeni fiyat bölümü için yeni fotoğraf, üçüncü taraf istek veya istemci kütüphanesi eklenmedi |

Kaynaklar: [Google iç bağlantı rehberi](https://developers.google.com/search/docs/crawling-indexing/links-crawlable), [yapılandırılmış veri kuralları](https://developers.google.com/search/docs/appearance/structured-data/sd-policies), [MenuItem](https://schema.org/MenuItem), [ItemList](https://schema.org/ItemList), [sitemap ve lastmod](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap), [görsel SEO](https://developers.google.com/search/docs/appearance/google-images), [LCP optimizasyonu](https://web.dev/articles/optimize-lcp).

## 1. Fiyatların tek kaynaktan gelmesi neden önemli?

Altı dilde fiyatları elle yazmak, her değişiklikte altı kez düzenleme gerektirirdi. Bunun yerine, yönetici menüsünün zaten kullandığı önbellekli ortak veri okunuyor. Türk kahvesi, espresso, americano, latte, flat white ve cold brew seçili listede gösteriliyor; yalnız kaynakta mevcut olan öğeler alınıyor.

Menü kaydedildiğinde ortak önbellek etiketi ve altı kahve sayfası geçersiz kılınıyor. Otomatik IndexNow menü güncelleme envanterine de bu sayfalar dahil edildi. Menüye bağlı kahve sayfaları üretim derlemesinde hâlâ statik üretiliyor; menü sayfalarıyla aynı 1 dakikalık yeniden doğrulama / 5 dakikalık sona erme politikası kullanılıyor. Bu süreler normal önbellek politikasıdır; yönetici kaydı ayrıca anında geçersiz kılma yapar.

Önemli ayrım: Menüde bir ürünün listelenmesi, o an stokta bulunduğunun doğrulanması değildir. Şemaya stok garantisi, indirim, puan veya yorum sayısı eklenmedi. Fiyat aralığı tek fiyata dönüştürülmüyor. “₺250–300” görünür kalabilir ama bundan kesin “250” tutarlı bir Offer üretilmez. Servis/fiyat notu varsa görünür satırda da korunur.

Fiyat listesi altı dilde sunuluyor; ayrıntılı menü TR/EN olarak kalıyor. Diğer dillerde ayrıntılı menüye geçişin İngilizce olduğu açıkça belirtiliyor. Doğrulanmış konuşma dili listesi sırf sayfalar çevrildi diye genişletilmedi.

## 2. Rehberlerden kahveye anlamlı geçiş

Yeni bağlam içi bağlantılar 11 mevcut sayfanın statik HTML’sinde doğrulandı:

- İngilizce Türk kahvaltısı rehberi.
- Rusça ve Arapça Türk kahvaltısı rehberleri.
- Korece ana rehber ve dört yemek/ziyaret rehberi.
- Çince ana rehber ve iki yemek/ziyaret rehberi.

Örneğin Çince kullanıcı, Çince ziyaret rehberinden Çince kahve sayfasına ve oradan İngilizce menüdeki gerçek Türk kahvesi ürününe ilerleyebiliyor. Bağlantı metni “tıklayın” yerine kahve, konum ve fiyat içeriğini açıklıyor. Bu bir ziyaretçi yolu; aynı kelime varyasyonları için yeni kopya URL üretimi değil.

Tam kaynak/hedef/metin listesi: [İç bağlantı kanıtları](ic-baglanti-kanitlari.json). Türkçe ve İngilizce ana gezinmenin kahve bağlantıları korunuyor.

## 3. GEO açısından ne değişti?

Sayfaların doğrulanabilir bilgi yoğunluğu arttı: işletme kimliği, gerçek konum, altı kahvenin adı ve TRY fiyatı, kaynak menü ürünleri ve gerçek mekân fotoğrafı birbirine bağlı. WebPage, Restaurant ve seçili ürünler aynı site kimlikleriyle ilişkilendiriliyor. Yardımcı dosyalara daha çok metin yığmak yerine kullanıcıya görünen veri geliştirildi.

Bu şema bir “Google’da kahve kartı çıkacak” vaadi değildir. Google, doğru işaretlemenin bile belirli görünümü garanti etmediğini söylüyor. Menü öğesi şeması e-ticaret Product puanı veya doğrulanmamış yorumlarla şişirilmedi. [Google yapılandırılmış veri rehberi](https://developers.google.com/search/docs/appearance/structured-data/sd-policies).

Yeni doğrulamalar Googlebot taramasının yanında Bingbot, OAI-SearchBot, PerplexityBot ve AdsBot-Google kullanıcı aracısı başlıklarıyla altı sayfayı okuyor. Her birinde HTTP 200, doğru kanonik URL ve JavaScript gerektirmeyen fiyat satırları aranıyor. Bunlar yerel yanıt tutarlılığı kontrolleridir; gerçek bot IP doğrulaması, canlı CDN erişimi veya bir cevap motorunun sayfayı seçtiğinin kanıtı değildir.

## 4. Ölçülen ve ölçülmeyen kalite

Üretim kontrolleri: 36 kanonik sayfanın okunabilir HTML’si, 342 iç bölüm bağlantısı, 100 sitemap görseli, dil alternatifleri ve şemalar geçti. Altı kahve sayfasının fiyat listesi ilk derlenen HTML’de bulundu.

Yalıtılmış menü testi gerçek yönetici kaydını kullanarak şunları sınadı:

1. Türk kahvesinin ondalıklı fiyatla güncellenmesi.
2. Espressonun fiyat aralığına dönüştürülmesi ve kesin Offer üretilmemesi.
3. Latte servis notunun görünür kalması.
4. Cold brew silindiğinde altı sayfanın hem görünür listesinden hem şemasından kaldırılması.
5. Başlangıç verisine dönüldüğünde altı sayfanın da geri güncellenmesi.

Testler geçici yerel dosyalar, geçici parola ve ayrı sunucu kullanıyor; gerçek müşteri verisi veya canlı menü değiştirilmedi. IndexNow bildirimi bu testlerde kapalıdır.

Görsel kontrol: Altı dilin fiyat listesi 393px’de incelendi; Arapça 320px’de ve Türkçe 1280px’de ayrıca kontrol edildi. Yatay taşma yok. Çince rehber → Çince kahve → EN Türk kahvesi ürünü akışı tarayıcıda tıklandı.

Bu turda saha Core Web Vitals, gerçek LCP/INP/CLS, arama hacmi, Google sırası veya satış artışı ölçülmedi. Özellikle sayfa deneyiminin sıralamada tek belirleyici olmadığını Google da belirtiyor. [Sayfa deneyimi](https://developers.google.com/search/docs/appearance/page-experience).

## 5. Yayınlandıktan sonra karar nasıl verilecek?

İlk kontrol teknik: altı gerçek URL HTTP 200, fiyat listesi doğru, sitemap ve dil bağlantıları güncel olmalı. Sonra Search Console’da kahve sayfaları için “fiyat / menu / prices / турецкий кофе / قهوة / 커피 / 咖啡” kümelerinin gösterim ve tıklamaları izlenebilir. GA4’te yeni `coffee_prices` bölümünden menü tıklamaları ayrı değerlendirilebilir. Küçük örneklemlerde artış oranları kesin sonuç sayılmamalı.

Aynı sayfaya daha çok kelime eklemek, artık ilk öncelik değil. Bundan sonraki yüksek değerli işler; gerçek ürün/giriş fotoğrafları, işletmenin teyit ettiği kahve servis koşulları, doğru GBP menüsü ve saatler, ölçülen ziyaretçi davranışına göre içerik geliştirmesidir. Önceki araştırmadaki üç özgün yazı planı bu kanıtlarla beslenmeli. Genel Türk kahvesi kültürü anlatılacaksa [UNESCO’nun kültür kaydı](https://ich.unesco.org/en/rl/turkish-coffee-culture-and-tradition-00645) kullanılabilir; bu kültür kaydı işletmenin hazırlama yöntemi veya tarihini doğrulayan kanıt gibi sunulmamalı.

GitHub gönderimi ve canlı dağıtım durumu teslim mesajında ayrıca belirtilir. Yerel testlerin geçmesi, sayfaların yayına çıktığı veya indekslendiği anlamına gelmez.

## Sonradan gelen işletme teyidi

27 Ekim 2026 tarihinde işletme sahibi, kahve için de oturulabildiğini ve Wi-Fi, priz ve çalışma alanları olduğunu teyit etti. Altı dilde ziyaret bölümüne bu bilgi eklendi; Restaurant amenityFeature alanları görünür metinle eşleştirildi. Minimum harcama, ücretsiz kullanım veya sınırsız süre koşulu beyan edilmedi. Önceki araştırmadaki bu olanaklara ilişkin belirsizlik bu teyitle giderildi.
