# Kahve satışını büyütmek için SEO / GEO araştırması ve uygulama planı

Araştırma: 27 Ekim 2026. İşletme: Tarihi Van Kahvaltı Evi, Zambak Sk. No:8, Beyoğlu. Hedef: kahve aramasından menü incelemesine ve gerçek işletme ziyaretine geçiş.

## En önemli sonuç

Önce kahve sayfalarını yayımlamak gerekiyor. Canlı alan adına yapılan doğrudan HTTP kontrollerinde altı kahve sayfası da 404 döndü; canlı sitemap bu URL’leri içermiyor. Localhost’ta sayfanın açılması Google’ın erişebildiği anlamına gelmez. Önceki `git push` işlemi 403 ile reddedildiği için yerel değişiklikler henüz yayında değil. Dağıtım çözülmeden bu adreslere reklam veya indeks isteği göndermeyin.

Asıl fırsatımız: **“Taksim ve İstiklal gezisinde, Beyoğlu atmosferinde kahve molası.”** Kahvaltı markasını koruyup gerçek kahve menüsünü görünür kılmalıyız. “İstanbul’un en iyi kahvesi”, “özel kavurucu” veya “çalışmaya uygun kafe” gibi kanıtlanmamış iddialar yerine gerçek mekân, gerçek ürün, açık fiyat kaynağı ve kolay yol tarifi öne çıkmalı.

Bu bir konumlandırma önerisidir; satış veya sıralama garantisi değildir.

## Araştırmanın kapsamı ve sınırları

- Türkçe, İngilizce, Rusça, Arapça, Korece ve Çince kahve aramalarından web araması örneklemesi yapıldı; kaynak sayfalar incelendi. Sonuçlar sabit bir Taksim koordinatında ölçülmüş Google Maps sıralaması değildir. Dil, cihaz, kullanıcı konumu ve zamana göre değişebilir.
- Rakip özellikleri mümkün olduğunca işletmelerin kendi sayfalarından doğrulandı. Liste makaleleri yalnız keşif için kullanıldı; “en iyi” sıralamaları kanıt kabul edilmedi.
- Canlı alan adı, sitemap ve yerel kaynak kod denetlendi. Search Console, Ads, Business Profile veya kasa satış raporlarına erişilmedi; arama hacmi, CPC, dönüşüm oranı veya rakip trafik rakamı uydurulmadı.
- Eski raporlardaki Google yorum sayısı ve puanı yeni ölçüm gibi kullanılmadı. GBP’nin güncel yönetici ekranı bu çalışmada değiştirilmedi.

## 1. Canlı durum ve teknik bulgular

| Bulgu | Etki | Yapılacak iş |
|---|---|---|
| `/taksim-kafe` ve EN/RU/AR/KO/ZH kahve URL’leri 404 | İndeks ve reklam açılış sayfası kullanımı engelleniyor | Yazma yetkisini düzelt, main’i dağıt, altı URL’de 200 doğrula |
| Canlı sitemap kahve URL’lerini içermiyor | Kahve sayfaları sitemap üzerinden keşfedilemiyor | Yeni dağıtımdaki sitemap’i doğrula; Search Console’a sitemap gönder |
| Yerel analytics izin listesinde altı kahve URL’si yoktu | Bu sayfalarda ziyaret ve aksiyon ölçümü engelleniyordu | Düzeltildi; gizli alanlar ve kişisel veriler hâlâ dışarıda |
| Kahve bağlantıları genel “site_navigation/map_link” diye ölçülüyordu | Hangi kahve bölümünün aksiyon getirdiği ayırt edilemiyordu | Hero, hikâye, seçim, ziyaret ve footer için bölüm etiketleri eklendi |
| Yerel IndexNow envanteri ve yardımcı kaynak listesinde kahve sayfaları eksikti | İlgili yardımcı akışlarda kahve keşfi eksik | Envanter tamamlandı; canlıya çıkmadan bildirim gönderilmedi |
| Kanonik, karşılıklı hreflang, statik HTML ve görsel sitemap yerelde mevcut | Sağlam temel | Korundu; JavaScript kapalı bot testleriyle kontrol edildi |

Canlı kontrol özeti aynı klasörde `canli-denetim.json` dosyasındadır. 404, URL’nin yayında olmadığını gösterir; bunun dışında bütün sitenin indeks durumunu açıklamaz.

## 2. Yakındaki rakiplerden ne öğreniyoruz?

Tablo “kim Google’da kaçıncı” ölçümü değildir; resmî sitelerde görülen teklif ve bilgi mimarisi karşılaştırmasıdır. Güçlü yönler ve fırsatlar, bu gözlemlerden çıkardığımız değerlendirmedir.

| Rakip / alan | Gözlenen özellik | Bizim için çıkarım |
|---|---|---|
| Mandabatmaz / Asmalımescit | Resmî sitede Türk kahvesi odaklı ürün kataloğu; Beyoğlu Kaymakamlığı kahve geçmişini belgeliyor | Genel “en iyi Türk kahvesi” iddiasıyla yarışmak yerine kendi fincanımızı, sunumumuzu ve mekân deneyimimizi belgeleyelim |
| Kronotrop / Cihangir | Şube rehberi, menü, espresso/filtre/V60 gibi demleme rehberleri | Kahve uzmanlığını içerikle kanıtlıyor. Bizde de yalnız gerçekten uygulanan hazırlama ve ürün bilgisi kullanılmalı |
| Espressolab / Taksim Odakule | Şubeye özel adres, günlük saatler, yol tarifi ve Wi‑Fi bilgisi | Ziyaret kararını net bilgilerle kolaylaştırıyor. Wi‑Fi/priz/laptop durumunu teyit edince açıkça anlatalım |
| Bravo Coffee / Meşelik Sokak ve İstiklal | Şubeye özel adresler; kahve, yiyecek ve online ürün sayfaları | Taksim’de kahve niyetine doğrudan hitap ediyor. Bizim kahve menüsü kahvaltı sayfaları arasında kaybolmamalı |
| Patisserie de Pera / Tepebaşı | Tarihî atmosferi, özgün mekân fotoğrafları ve menüsüyle anlatıyor; EN ve RU içerik var | Tarihî atmosferi soyut sıfatlar yerine gerçek iç mekân fotoğrafları ve anlaşılır turist metniyle sunalım |
| SesPresso / Kocatepe | TR/EN, menü kategorileri, güncel fiyat yönlendirmesi, mekân fotoğrafları ve konum | Açılış sayfasında ziyaretçinin karar vermesi için gereken temel bilgiler bir arada |

Kaynaklar: [Mandabatmaz](https://mandabatmaz.com.tr/), [Beyoğlu Kaymakamlığı](https://www.beyoglu.gov.tr/gastronomi-beyoglu-mandabatmaz-kahvesi), [Kronotrop](https://www.kronotrop.com.tr/), [Cihangir şube rehberi](https://www.kronotrop.com.tr/stores), [Espressolab Odakule](https://espressolab.com/kurumsal/magazalar/taksim-odakule), [Bravo şubeleri](https://www.bravocoffeeroastery.com/detay/iletisim/), [Patisserie de Pera](https://perapalace.com/en/restaurants/patisserie-de-pera/), [SesPresso Taksim](https://sespresso-taksim.com/).

## 3. Hangi aramayı hangi sayfa karşılamalı?

| Niyet | Örnek aramalar | Hedef |
|---|---|---|
| Yakında kahve içmek | taksim kafe, taksim kahve, beyoğlu kahve, istiklal yakınında kahve | `/taksim-kafe` |
| Türk kahvesi içmek | taksim türk kahvesi, beyoğlu türk kahvesi | Aynı kahve sayfasındaki Türk kahvesi içeriği → `/menu#turk-kahvesi` |
| Ürün ve fiyat | taksim kahve menüsü, latte fiyatı, tarihi van kahve fiyatları | Kahve sayfası → güncel `/menu#sicak-kahveler` |
| Soğuk kahve | taksim cold brew, beyoğlu buzlu latte | Kahve sayfasındaki seçenekler → `/menu#soguk-kahveler` |
| Ziyaret kararı | tarihi van adres, taksim kahve açık saatler | Kahve ziyaret bölümü / `/konum` / işletme profili |
| Turist kahve molası | coffee near Taksim, Turkish coffee near Istiklal | `/en/coffee-taksim` |
| Diğer diller | кофе рядом с Таксимом; قهوة قرب تقسيم; 탁심 카페; 塔克西姆 咖啡馆 | İlgili yerelleştirilmiş kahve sayfası |

Bunlar test edilecek sorgu kümeleridir; hacim sıralaması değildir. “Taksim kafa” gibi yazım hatası için ayrı sayfa açmayalım. Aynı niyet için `/taksim-kahve`, `/taksim-kafeler`, `/beyoglu-kafe` gibi kopya açılış sayfaları üretmeyelim. Google, kullanıcıya ek değer sunmayan seri içerik ve geçiş sayfalarını spam politikalarında ele alıyor. [Google spam politikası](https://developers.google.com/search/docs/essentials/spam-policies).

## 4. Kaç blog yazısı? İlk etapta üç özgün içerik yeterli

Bu sayı bir Google şartı değildir; ilk ay uygulanabilir bir editoryal başlangıçtır. Mevcut altı dildeki kahve sayfası ana ticari merkezdir. Menü ve konum sayfaları zaten var; bunların kopyası blog yapılmamalı.

| Sıra | İçerik | Ek değer / yayın koşulu | İç bağlantı |
|---|---|---|---|
| 1 · TR | “Türk kahvesini nasıl seversiniz? Sade, orta ve şekerli sipariş rehberi” | Kendi kahvemizin gerçek sunum fotoğrafı ve ekibin doğruladığı sipariş açıklaması. Köpük/çekirdek/cezve iddiaları gözlemlenmedikçe eklenmez | Türk kahvesi ürününe ve ana kahve sayfasına |
| 2 · TR | “İstiklal yürüyüşünde Zambak Sokak’ta bir kahve molası” | Kendi çektiğimiz giriş/dış cephe fotoğrafları, doğrulanmış dönüm noktaları; yürüyüş süresi ölçülmeden dakika iddiası yok | Kahve sayfası ve konum sayfasına |
| 3 · EN | “Ordering Turkish coffee near Taksim: sugar, grounds and the menu” | Turistin gerçek sipariş soruları; kültür bilgisini güvenilir kaynaktan doğrula, işletme uygulamasıyla ayır. Türkçe metnin kelime kelime çevirisi değil | EN kahve sayfası ve EN menüye |

İkinci ay: Search Console’da gelen sorulara göre bu üç içerikten birini genişlet veya gerçekten ayrı bir konu ekle. RU/AR/KO/ZH için ilk günden 12–20 blog üretme; mevcut yerelleştirilmiş merkezlerin gösterimlerini, yön tarifini ve menü kullanımını gör. Yeni dilde yazı ancak anlamlı ihtiyaç ve iyi yerelleştirme varsa yayımlansın.

Her yazı: gerçek bir soru, kısa açık cevap, özgün mekân/ürün kanıtı, ilgili menü bağlantısı, gerçek yayın tarihi ve yalnız içerik değiştiğinde güncellenen tarih. Yazar/işletme rolünü doğru belirt; uydurma barista unvanı veya ziyaret deneyimi ekleme.

## 5. Google Business Profile: en yüksek öncelikli dış işler

Google yerel sonuçlarda alaka, mesafe ve bilinirliği dikkate alır. Eksiksiz işletme bilgisi, doğru saatler ve yorumlar yardımcı olur; üst sıra satın alınamaz. [Google yerel sıralama rehberi](https://support.google.com/business/answer/7091).

1. Mevcut tek gerçek işletme profilini kullan. Sırf kahve için aynı yerde ikinci sahte işletme profili açma. Tabeladaki adı koru; ada “Taksim en iyi kahve” ekleme.
2. Ana faaliyet kahvaltı restoranıysa birincil kategoriyi kahve uğruna değiştirme. “Kafe/Kahve dükkânı” ikincil kategorisi ancak işletmeyi gerçekten tanımlıyor ve hesapta mevcutsa değerlendirilsin. Bu bir sıralama garantisi değildir. [Kategori kuralları](https://support.google.com/business/answer/3038177).
3. Menü alanında güncel resmî menüyü kaynak seç. Menü editörü mevcutsa “Sıcak kahveler” ve “Soğuk kahveler” bölümlerini gerçek ürünlerle doldur. Menü ve fiyat değiştiğinde site ile profili birlikte güncelle. [Google menü editörü](https://support.google.com/business/answer/9455840).
4. Haftada bir küçük çekim: giriş tabelası, Türk kahvesi sunumu, latte, soğuk kahve ve gerçek oturma alanı. Bu sıklık operasyon önerisidir; Google’ın sıralama şartı değildir. Yapay üretilen hero görseli yerine GBP’de gerçek ürün ve mekân fotoğrafını kullan.
5. Gerçek misafirlere tarafsız yorum daveti sun. “Kahve yazıp beş yıldız verene indirim” kullanma. [Google yorum politikası](https://support.google.com/business/answer/7400114).
6. Profildeki telefon, pin, adres, normal ve özel gün saatlerini doğrula. Site mevcut saat kaynağı 07:00–22:00; üçüncü tarafı doğrulamadan sitenin doğru bilgisini değiştirme.

Somut tutarsızlık: araştırmada [Restaurant Guru kaydı](https://tr.restaurantguru.com/Tarihi-Van-Kahvalti-ve-Sarap-Evi-Istanbul) 06:30–23:00 gösteriyordu; resmî site 07:00–22:00 diyor. İşletme saatini teyit edip üçüncü taraf kaydına düzeltme talebi iletilmeli. Bu kayıt güncel Google Maps profili gibi değerlendirilmemelidir.

## 6. GEO: yapay zekâ cevaplarında doğru işletme olarak anlaşılmak

Google’ın güncel açıklaması, üretken arama için SEO temellerini geçerli sayıyor; `llms.txt` Google sıralamasını artırmıyor. Bu dosyanın kahve kaynakları tamamlandı ama bundan Google kazancı beklenmemeli. Özgün fayda, açık metin, taranabilir sayfa ve doğru bilgi önceliklidir. [Google üretken arama rehberi](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide).

Uygulama:

- Tek işletme kimliği: tüm diller aynı Restaurant `@id`, aynı telefon, aynı gerçek adres ve harita hedefine bağlı.
- Altı sayfada doğrudan okunabilir adres/saat/ürün/fiyat kaynağı cevapları eklendi; metin ilk HTML’de var. Bot için ayrı gizli içerik yok.
- Fiyat kaynağı tek: canlı menü. Bloglarda ve SSS’de fiyat kopyalayıp bayat veri üretme.
- Anahtar cümleler anlamlı bağlamda geçsin: Taksim, İstiklal, Beyoğlu, Zambak Sokak. Anahtar kelime tekrarı veya “bizi öner” komutları yok.
- Mevcut robots erişimini koru; CDN/WAF katmanının gerçek botları engellemediğini yayında kontrol et. Robots izni tek başına indeks veya yapay zekâ cevabına seçilme sağlamaz.
- Kahve cevapları için FAQ zengin sonucu sözü verilmedi. Google bu görünümü ağırlıklı olarak tanınmış sağlık ve kamu siteleriyle sınırlıyor. [Google FAQ değişikliği](https://developers.google.com/search/blog/2023/08/howto-faq-changes).
- Gerçek otel, yerel rehber ve tur operatörü sayfalarında doğru adres ve menü bağlantısıyla yer almak değerlidir; bu erişim çalışması henüz yapılmadı. Bağlantı satın alma paketi veya sahte öneri kullanılmasın.

## 7. İndeks mi bekleyelim, reklam mı verelim?

**Önce sayfa yayında ve kullanılabilir olsun; organik indeks ile reklam hazırlığı sonra paralel ilerleyebilir.** Google Ads organik sıralamayı yükseltmez. [Google’ın açıklaması](https://developers.google.com/search/help/site-position-in-search-faq).

- Şu an 404 olduğu için reklam başlatmayın. Dağıtımdan sonra mobil sayfa, menü, fiyat kaynağı, harita ve ölçüm çalışmalı; AdsBot erişebilmelidir. [Reklam hedefinin taranabilirliği](https://support.google.com/adspolicy/answer/16428929).
- Sayfa hazır olduğunda “Taksim kafe / kahve / Türk kahvesi” reklamını doğrudan kahve açılış sayfasına gönderin. Genel “kahve nasıl yapılır” yazısına reklam vermek, yakınında kahve içmek isteyen kullanıcı için daha zayıf eşleşmedir.
- İlk pilot: ayrı TR ve EN arama grupları, işletmenin çevresinde yaklaşık 1–2 km erişim hipotezi ve konum seçeneğinde “bulunan veya düzenli bulunan” kullanıcılar. Yarıçapın kullanılabilirliğini hesapta doğrulayın; konum sinyalleri kusursuz değildir. [Konum seçenekleri](https://support.google.com/google-ads/answer/1722038), [konum hedefleme](https://support.google.com/google-ads/answer/1722043).
- Başlangıç kelimeleri: “taksim kahve”, “taksim türk kahvesi”, “coffee near taksim”, “turkish coffee taksim”. İş, bayilik, makine, çekirdek satın alma ve evde tarif gibi ilgisiz niyetleri arama terimi raporunda eleyin. Marka/rakip reklamı ilk pilotta gerekli değil.
- Başlangıç bütçesini tahmini CPC uydurarak belirlemeyin. Ads Keyword Planner ve gerçek test CPC’siyle sınır koyun; işletme sahibinin bütçesi olmadan bu çalışmada kampanya açılmadı veya harcama yapılmadı.
- Yol tarifi tıklaması satış değildir. Mevcut Ads contact aksiyonları gerçek kasa satışı olarak raporlanmamalı; ikincil/ana dönüşüm ayarları hesapta ayrıca incelensin.

## 8. Ölçüm ve karar kuralları

| Ölçüm | Kaynak | Ne için kullanılacak? |
|---|---|---|
| İndekslenen kahve URL sayısı | Search Console URL Denetleme | Yayın/indeks sorunu var mı? |
| Kahve sorgularında gösterim/tıklama/CTR | Search Console; kahve URL filtresi, ülke/dil kırılımı | İçerik ve başlık doğru niyete ulaşıyor mu? |
| Sayfa ziyareti → menü tıklaması | GA4 `page_view`, `menu_click`; kahve sayfa filtresi | Sayfa menüye yönlendiriyor mu? |
| Yol tarifi/telefon | GA4 `contact_click`, bölüm ve dil parametreleri | Hangi dil/bölüm ziyaret niyeti üretiyor? |
| Profil etkileşimleri | GBP Performance | Maps üzerinden talep artıyor mu? |
| AI alıntıları ve kaynak sayfalar | Bing Webmaster Tools AI Performance, veri varsa | Kahve sayfaları yapay zekâ yanıtlarına kaynak oluyor mu? |
| Kahve adedi ve gelir | Kasa/POS günlük kayıtları | Asıl satış artıyor mu? |

Bing’in AI Performance ekranı alıntı ve kaynak sayfaları sunuyor; varsa yeni Topics Portfolio alanı fırsat sorgularını gösterebilir. Bunlar Google sıralaması veya tüm yapay zekâ platformlarının toplamı değildir. [Bing AI Performance](https://blogs.bing.com/webmaster/2026/2/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview/), [Topics Portfolio](https://blogs.bing.com/webmaster/2026/10/introducing-topics-portfolio-beta-in-ai-performance/).

İlk 14 gün veri tabanı oluşturun; sonra eşit günleri önceki dönemle ve mümkünse geçen haftanın aynı günleriyle karşılaştırın. Hava, hafta sonu, tatil ve turistik yoğunluğu not alın. Gösterim var/tıklama düşükse başlık ve teklif; menü tıklaması var/yol tarifi düşükse fiyat/konum/ziyaret koşulları; ziyaret niyeti var/satış düşükse mağaza deneyimi incelensin. Veri çok azsa yüzdelik artışları başarı diye sunmayın.

GEO kontrolü için haftalık aynı 12 soruluk küçük set kullanılabilir: altı dilde “Taksim yakınında Türk kahvesi nerede?” ve “İstiklal yakınında kahve menüsü ve adresi?” Her denemede tarih, dil, platform ve verilen kaynak URL kaydedilsin. Tek bir cevabı sıralama veya nedensel başarı kabul etmeyin.

Örnek kayıtlı kampanya: `?utm_source=google&utm_medium=cpc&utm_campaign=taksim_coffee`. Yalnız kontrollü kampanya değerleri tutulur; müşteri bilgileri ve serbest sorgu değerleri ölçüme taşınmaz.

## 9. 30–60–90 günlük iş sırası

| Zaman | İş | Tamamlanma ölçütü | Sorumlu |
|---|---|---|---|
| Gün 0–3 | GitHub yetkisi ve dağıtım; altı kahve sayfası | Altı URL HTTP 200; güncel sitemap/canonical; mobil menü ve yol tarifi çalışıyor | Teknik ekip / repo sahibi |
| Gün 3–7 | Search Console ve Bing denetimi; GBP kahve menüsü | URL denetim sonuçları kaydedildi, sitemap gönderildi, gerçek ürün bilgisi profilde | Teknik ekip + işletme |
| Gün 7–14 | Gerçek kahve/giriş fotoğrafları, saat ve dizin düzeltmesi | 6–10 kullanılabilir özgün kare, doğru adres/saat, ölçüm tabanı | İşletme |
| Gün 14–30 | Üç özgün yazı için kanıtlı çekim/editoryal hazırlık; TR/EN reklam pilotu uygunsa | İçerik kontrolü tamam, yayınlanan sayfalar iç bağlantılı; harcama sınırı tanımlı | Editör + işletme + Ads yöneticisi |
| Gün 30–60 | Sorgu ve dil bazında iyileştirme | Gereksiz kelimeler elendi; düşük dönüşümlü içerik/CTA düzeltildi | SEO / Ads |
| Gün 60–90 | Çalışan dili ve konuyu büyütme | Gerçek kahve satış adedi ve maliyetle birlikte ölçek kararı | İşletme + pazarlama |

İndeks isteği her gün tekrar gönderilmez; Google birkaç gün ile birkaç hafta sürebileceğini ve indeks garantisi olmadığını belirtiyor. [Google yeniden tarama rehberi](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl). IndexNow, katılan arama motorlarına değişikliği bildirir; Google indeksleme servisi değildir ve kabul cevabı indeks garantisi vermez. [IndexNow](https://www.bing.com/indexnow/getstarted). Kahve/blog için Google Indexing API kullanılmaz; kapsamı uygun iş ilanı ve canlı yayın sayfalarıdır. [Indexing API kapsamı](https://developers.google.com/search/apis/indexing-api/v3/quickstart).

## 10. İşletmeden netleşmesi gereken bilgiler

27 Ekim işletme sahibi teyidi: Kahvaltı siparişi olmadan kahve için de gelinebilir; Wi‑Fi, priz ve çalışma alanları vardır. Bu bilgiler altı dilde kahve ziyaret bölümüne ve ilgili işletme verisine eklendi. Ücretsiz veya sınırsız kullanım koşulu belirtilmedi; böyle bir vaat eklenmedi. Çekirdek/tedarikçi/demleme bilgisi, tüm kahvelerin servis saatleri ve varsa masa kullanım koşulları hâlâ ayrıca netleştirilebilir.

## Bu turda yapılanlar

Altı kahve sayfasına taranabilir ziyaret cevapları, tek saat kaynağı, tam adres, menü ve harita bağlantıları eklendi. Ölçüm izin listesi ve kahve kampanya adları düzeltildi; bölüm ve dil ayrımı eklendi. İşletme kimliği WebPage ana varlığına bağlandı. Yardımcı kaynak ve IndexNow URL envanteri tamamlandı. Gizlilik kontrolleri korundu. Teknik doğrulama sonuçları ana `design-qa.md` dosyasında kayıtlıdır. Bu değişiklikler yereldir; canlı durum dağıtım sonrası yeniden doğrulanmalıdır.
