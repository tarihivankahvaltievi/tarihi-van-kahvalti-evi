# Bölüm 4–5: dış işletme kimliği, ölçüm ve son uygulama kaydı

Kontrol tarihi: 2 Ekim 2026. Kaynak: 30 sayfalık 30 Eylül SEO/GEO raporu. Önceki [bölüm 1](bolum-1-dogrulama-2026-10-01.md), [bölüm 2](bolum-2-icerik-ve-kanit-2026-10-01.md) ve [bölüm 3](bolum-3-teknik-dil-performans-2026-10-01.md) teslimleri korunmuştur. Bu belge kalan önerilerin uygulamasını ve doğrulanamayan alt koşullarını kaydeder. Platforma gönderilen düzeltme, platformun yayımladığı düzeltme ve gelecekte ölçülecek sonuç ayrı durumlardır.

## 1. Bu teslimin sonucu

- Google işletme profilindeki 94 mevcut menü kaydı yeniden kontrol edildi. Güncel web menüsüyle eşleşen 85 kaydın fiyat ve Türkçe/İngilizce açıklamaları düzenlendi. Güncel menüyle eşleştirilemeyen 9 eski kaydın eski fiyatları kaldırıldı; güncel web menüsüne yönlendirildi. Kayıtlar silinmedi, mevcut olmayan ürün/fiyat/alerjen bilgisi uydurulmadı.
- Google profilinin web sitesi HTTPS canonical adrese çevrildi; güncel açıklama kaydedildi. Kamuya açık Maps kartında HTTPS bağlantısı ve AI Mode kaynak kartında yeni açıklama görüldü. Standart saatler zaten her gün 07:00–22:00 idi.
- Yandex’e haftanın yedi günü 07:00–22:00 saat düzeltmesi gönderildi. Arayüz düzeltmenin kontrol edildiğini gösterdi; moderasyon sonucu henüz onaylanmış kabul edilmedi.
- Zambak Sokak No:8’e ait doğru Tripadvisor kaydı bulundu. Cihangir No:52/A kaydı ayrı kimlik olarak elendi. Sitenin görünür profil bağlantısı ve `sameAs` doğru kayda bağlandı. Yandex bağlantısı güncel canonical profile taşındı.
- Google AI Mode ve Gemini gerçek denemelerinde iki adresin “şube” diye birleştirildiği görüldü. TR/EN ana sayfa ve TR konum sayfasına bu sitenin menü/masa taleplerinin Zambak Sokak No:8’e ait olduğu, Defterdar Yokuşu No:52/A’nın bu sitenin ziyaret adresi olmadığı açıklandı. Hukuki ortaklık veya şube sahipliği hakkında kanıtsız iddia eklenmedi.
- Doğru mevcut GA4 web akışının ölçüm kimliğiyle entegrasyon yapıldı. SPA sayfa görüntülemeleri tekilleştirildi; özel/takvim/yönetim/API/404 sayfaları ve localhost/önizleme alanları ölçüm dışında bırakıldı. Kayıtlı talep, iletişim tıklaması ve WhatsApp geçişi ayrı olaylardır.
- Eski hero tasarımından kalmış, kaynakta hiç kullanılmayan 381 CSS selector temizlendi. Dört kaynak dosyada toplam 62.622 bayt, kaynak dosyalar ayrı ayrı gzip edildiğinde toplam 10.398 bayt azalma ölçüldü. Bunlar kaynak ölçüsüdür; tarayıcıdaki minify edilmiş transfer tasarrufu veya LCP kazancı değildir.
- GSC organik ve üretken AI raporlarının gerçek 28 günlük dışa aktarımları indirildi ve çevrimdışı analiz edildi. Ham hesap verisi, ekran görüntüleri, AI sohbetleri ve müşteri verileri Git deposuna alınmadı.

## 2. Dış profil kimlik ve düzeltme tablosu

Referans ziyaret adresi: **Şehit Muhtar Mahallesi, Zambak Sokak No:8, 34421 Beyoğlu / İstanbul**. Referans telefon: **+90 541 525 2868**. Referans standart saat: **her gün 07:00–22:00**. Web menüsü: **https://www.tarihivankahvaltievi.com/menu**. Masa talebi: **https://www.tarihivankahvaltievi.com/rezervasyon**. Özel gün saati standart haftalık programdan türetilmez.

| Profil | Doğrulanan kimlik / sorun | İşlem ve son durum |
| --- | --- | --- |
| [Google Maps](https://www.google.com/maps?cid=10380797280962926014) | CID `10380797280962926014`, No:8, doğru telefon. 2 Ekim gözlemi 4,8/5 ve 1.602 yorum. | HTTPS web bağlantısı ve açıklama kaydedildi; kamu kartında yeni HTTPS görüldü. 94 menü kaydı editörde son kez doğrulandı. Menü değişikliğinin bütün Google yüzeylerine aynı anda yayıldığı garanti edilmez. |
| [Yandex](https://yandex.com.tr/maps/org/tarihi_van_kahvalti_evi/237523878781/) | Canlı profil doğru No:8/telefon; arama snippet’lerinde eski No:10A metni görülebiliyor. | 07:00–22:00 yedi günlük düzeltme gönderildi; kontrol/moderasyon bekliyor. Eski snippet canlı kayıtla aynı veri sayılmadı. |
| [Tripadvisor: doğru kayıt](https://www.tripadvisor.com.tr/Restaurant_Review-g293974-d34166952-Reviews-Tarihi_Van_KahvaltI_ve_Sarap_Evi-Istanbul.html) | `d34166952`, No:8, doğru telefon. Eski ad, eski menü fiyatları, 00:00–23:59 saatleri ve Instagram’a giden web alanı mevcut. | Sitedeki profil eşleşmesi düzeltildi. Profil verisi henüz düzeltilmedi; yeni hesap bağlantısı/işletme paneli erişimi gerektiriyor. |
| [Tripadvisor: elenen kayıt](https://www.tripadvisor.com.tr/Restaurant_Review-g293974-d2279958-Reviews-Van_Kahvalti_Evi-Istanbul.html) | `d2279958`, Defterdar Yokuşu No:52/A, farklı telefon. | Sitemizin `sameAs` kaynağı değildir. Ad benzerliği ilişki veya şube kanıtı sayılmadı. |
| [Restaurant Guru](https://tr.restaurantguru.com/Tarihi-Van-Kahvalti-ve-Sarap-Evi-Istanbul) | Doğru No:8/telefon; 06:30–23:00 saatleri, eski kategori ve önbellek değerlendirme bilgileri. | Düzeltme formu incelendi; e-posta, serbest mesaj ve CAPTCHA gerektiriyor. Düzeltme yayımlanmış veya mesaj gönderilmiş sayılmadı. Doğru alanlar aşağıdaki düzeltme paketinde hazır. |
| [Wanderlog](https://wanderlog.com/tr/place/details/17022776/tarihi-van-kahvalt%C4%B1-evi-1978) | No:8/telefon doğru; eski HTTP linki ve saatler. Tripadvisor yorum bağlantısında yanlış Cihangir kaydı. | Saat, HTTPS, kategori ve doğru Tripadvisor hedefi için düzeltme paketi hazırlandı. Canlı platform değişikliği doğrulanmadan tamamlandı sayılmaz. |

Google menü denetiminin kamuya açık, kişisel veri içermeyen özeti [kanıt dosyasındadır](evidence-2026-10-02/google-menu-verification.json). 85 eşleşme bütün web menüsünün 85 ürün olduğu anlamına gelmez: web menüsü **142 ürün / 18 kategori** içerir. Eski Google kayıtlarında aynı serpme ürününün iki adı bulunur. Google’daki 94 kayıt ile web’deki 142 ürünün kapsamı farklıdır.

Eski fiyatı kaldırılan ürünler: Nescafe; genel Bitki Çayları; Kutu Meyve Suları; Dil Peyniri; İncir, Vişne, Ahududu ve Üzüm Reçeli; Karışık Omlet. Güncel menüdeki ayrı gerçek çay/kahve/reçel ürünleri bunlarla tahmin yoluyla birleştirilmedi.

### Profil düzeltme paketi

Restaurant Guru/Wanderlog/Tripadvisor için kullanılacak doğrulanmış alanlar:

- Adres ve telefon: yukarıdaki No:8 ve +90 541 525 2868.
- Standart saatler: Pazartesi–Pazar 07:00–22:00; özel günler işletmenin ayrıca doğruladığı programa göre.
- Website: `https://www.tarihivankahvaltievi.com/`; menü: `/menu`; rezervasyon: `/rezervasyon`.
- Fiyat/kapsam: Serpme Fix Menü 970 TL kişi başı, minimum iki kişi; güncel dahil ürünler web menüsündeki aynı kayıttan alınmalı. Su/kahve/kuverin ücretsiz olduğu yazılmamalı.
- Temel faaliyet: Van kahvaltısı sunan kahvaltı restoranı. Şarap/kokteyl/otopark/basamaksız erişim gibi özellikler fiili işletme doğrulaması olmadan taşınmamalı.
- Doğru Tripadvisor kimliği `d34166952`; Cihangir `d2279958` ayrı adrestir.

Bu paket gönderilmiş bir e-posta, müşteri yorumu veya bağımsız editoryal yayın değildir. Güncel profil bilgisi, bağımsız ziyaretçinin deneyim yazısını ikame etmez. Başkaları adına yorum, ziyaret veya alıntı oluşturulmadı.

## 3. Ölçüm: olayların anlamı ve veri sınırları

Mevcut Ads etiketi GA4 web akışının yerine geçmiyordu. GA4 arayüzündeki gerçek web akışı doğrulandı; aynı ölçüm kimliği kullanıldı, yeni mülk açılmadı. İlk ziyaret ve SPA yol değişiminde bir kez manuel `page_view` gönderilir. Google’ın `send_page_view:false` ayarı Enhanced Measurement geçmiş olayını tek başına kapatmadığından, GA4 arayüzünde history kaynaklı otomatik sayfa görüntüleme ayrıca kapatıldı. Otomatik dış bağlantı, site araması, form etkileşimi, video, dosya indirme ve scroll ölçümleri de kapatıldı. Müşteri mesajı içerebilen WhatsApp adresleri ve özel takvim bağlantıları otomatik link olaylarıyla toplanmaz.

| Olay | Tam olarak neyi ölçer? | Neyi kanıtlamaz? |
| --- | --- | --- |
| `page_view` | İzin verilen üretim URL’sinin görüntülenmesi; query/hash çıkarılır. | Benzersiz gerçek müşteri veya fiziksel ziyaret. |
| `contact_click` / `contact` | Telefon, WhatsApp veya yol tarifi bağlantısına tıklama. | Aramanın bağlanması, mesaj gönderilmesi veya restoran ziyareti. |
| `review_source_click` | Maps/Tripadvisor kaynak profilini açma tıklaması. | Yol tarifi veya birincil rezervasyon dönüşümü. |
| `generate_lead` | Backend’in başarıyla kaydettiği masa talebi. | İşletmece onaylanmış rezervasyon, ciro veya ödeme. |
| `booking_whatsapp_handoff` | Formdan WhatsApp’a yönelme. | WhatsApp mesajının gönderilmesi veya masa onayı. |
| `web_vitals` | LCP/INP/CLS gibi tarayıcı gözlemleri ve metrik türü/değeri. | Yeterli örnek oluşmadan p75 saha başarısı veya CrUX kapsamı. |

Ad, müşteri telefonu, tarih/not ve ham rezervasyon/takvim erişim kimliği custom analytics olaylarına gönderilmez. Ads tekilleştirmesinde ham kimlik yerine sabit SHA-256 değeri kullanılır. Özel yollar, bilinmeyen 404 ve önizleme hostları izin listesi dışındadır. Dış referrer sadece origin’e; iç referrer sadece bilinen canonical sayfaya indirgenir. `allow_google_signals` ve reklam kişiselleştirme sinyalleri kapatıldı. Bu teknik ayarlar hukuki uyumluluk sertifikası değildir.

GA4 lead olayından yapay 1 TL gelir değeri kaldırıldı. Mevcut Ads dönüşümlerinin 1 TL nominal lead değeri korundu; bu restoran satış hasılatı değildir. Telefon/yol tarifi/WhatsApp etiketleri rezervasyonun birincil etiketinden ayrı kalır.

**Atıf sınırlaması:** güvenli URL politikası bütün query/hash değerlerini çıkarır. `utm_*` kampanya parametreleri de çıkarıldığı için bu teslimde kampanya düzeyindeki ayrıntılı GA4 atfının eksiksiz olduğu iddia edilmez. Ads `gclid` çerez davranışı ayrıca doğrulanmış değildir. Mahrem müşteri metni toplamamak için otomatik dış link/form olayları kapalı tutulur.

`WebVitals` GA4’e doğrudan güvenli olay gönderir; önceki isteğe bağlı aynı-origin endpoint desteği korunur. Harici rastgele telemetry endpoint’i eklenmedi. Kodun işlevi test edildi; gerçek kullanıcı dağılımını değerlendirmek için yeterli süre ve örnek gerekir.

### Özel başlangıç raporu

2 Ekim’de organik/AI raporları aynı **2–29 Eylül 2026 / 28 gün** dönemiyle CSV dışa aktarıldı. Sayfa, ülke, cihaz, sorgu ve rapor filtreleri özel klasörde tutulur. Çevrimdışı analiz aracı eksik/bastırılmış değeri sıfır yapmaz; toplam hesaplanamıyorsa bunu açıkça yazar. Günlük pozisyonların aritmetik ortalaması mülkün toplam pozisyonu diye sunulmaz. Sorgu satırları gizlilik ve satır sınırı nedeniyle tüm nüfusu temsil etmez.

Ham hesap verisi deposunun dışında tutulur. Kamu raporunda özel trafik hacimleri ve kullanıcı/hesap kimlikleri yayımlanmadı. Gerçek onaylı rezervasyonlar, `generate_lead` veya WhatsApp tıklamasıyla eşitlenmedi. Yeni üretim talebi açılarak sahte dönüşüm testi yapılmadı.

Bing mevcut oturumla otomatik erişilebilir değildi; Google bağlantısı yeni veri erişimi/onay gerektiren ekrana geldi. Yeni grant verilmedi. Bu nedenle Bing AI görünürlüğü ölçülmedi, sıfır kabul edilmedi. Vercel'de doğru proje ve alan adı ayarları doğrulandı; GitHub bağlantısı mevcut ve yeni `main` commit'i otomatik olarak production'a dağıtıldı. Alan adında apex→www yönü kalıcı olarak doğrulandı. HTTP isteklerinin önce HTTPS'e, ardından www'ye 308 ile yönlenmesi uygulama kaynaklı değil; Vercel'in HTTPS zorlamasının alan adı yönlendirmesinden önce çalışması nedeniyle gözlenen platform zinciridir. Vercel'in zorunlu HTTPS yönlendirmesi kapatılamaz; bu nedenle iki adım uygulama kodundan teke indirilemez.

## 4. İngilizce içerik niyeti kararı

`/en/blog/turkish-breakfast-istanbul` İstanbul’da genel Türk kahvaltısı ve ziyaret planlamasını; `/en/blog/classic-turkish-breakfast` klasik kahvaltı bileşenleri ve başka kahvaltı türleriyle karşılaştırmayı; simit yazısı ise belirli yiyeceği ve menüde garanti edilmeyen ürün sınırını karşılar. Canonical ve iç bağlantıları kendi niyetlerine göre korundu.

Classic yazısı 28 Eylül’de yayımlanmıştı. 29 Eylül’de biten başlangıç penceresi bu yazıya yalnız iki günlük gözlem sağlar. Sayfa düzeyindeki farklı trafik, aynı sorguda birbirini gerileten içerik kanıtı değildir. Sağlıklı karşılaştırma tam 28 günlük yayım sonrası dönem, aynı filtreler ve sayfa filtresinde sorgu tabloları gerektirir. Yeni içeriği iki günlük veriyle silme veya 301 birleştirme kararı verilmedi.

## 5. Sabit GEO paneli ve gerçek denemeler

[Panel yapılandırması](ai-query-panel.json) rapordaki 7 TR + 7 EN sorusunu korur. Google AI Mode, ChatGPT Search, Perplexity ve Gemini için üç tekrar: **168 planlı hücre**. Marka verilen sorular markasız kohorta dahil edilmez; “this restaurant” sorusunun restoran bağlamı ayrıca kayıtlıdır.

`scripts/geo-panel.mjs` ham gözlemleri Git dışına yazar. Her tamamlanan gözlem gerçek tarih, UI model etiketi, arama modu, bölge/oturum, okunabilen kanıt dosyası, anılma ve açılmış kaynakların iddia desteğini gerektirir. Çalıştırılmayan, erişilemeyen ve ölçülen hücreler ayrı tutulur. Payda sadece gerçekten ölçülen hücrelerden oluşur; hiç gözlem yoksa oran `null` olur.

İlk gerçek markalı denemede ChatGPT Search doğru No:8, 07:00–22:00 ve 970 TL kişi başı/minimum iki kişiyi web sitemizi kaynak göstererek verdi. Google AI Mode ve Gemini farklı adresteki Cihangir kaydını “şube” diye birleştirdi; ayrıca kaynakta doğrulanmayan tedarik/ürün ayrıntıları kullandı. Yeni adres ayrımı bu tanısal gözleme dayanır. Tek cevap, genel GEO görünürlük yüzdesi veya değişikliğin neden olduğu başarı sayılmadı.

Perplexity’nin gerçek ilk denemesi “kaydolun ve isteğinizi tekrar edin” ekranında durdu. Hesap/koşul onayı aşılmadı; cevap yokluğu marka anılmama olarak kodlanmadı. UI’nin gösterdiği “High” veya “Flash” etiketi, açıklanmayan kesin model sürümü olarak genişletilmedi. Panelin tam tekrarları ve sonraki aynı-kohort karşılaştırması çalıştırılmadan 168 hücrenin tamamlandığı söylenmez.

## 6. Performans ve doğrulama

[CSS denetimi](evidence-2026-10-02/css-cleanup.json) 119 kaynak dosyada eski classname referanslarını kontrol eder; canlı hero/menu/reservation sınıfları korunur. Karışık selector gruplarında kullanılan parçalar tutulur. Masaüstü önce/sonra başlık ve gezinme ölçüleri karşılaştırıldı. Chrome cihaz görünümünde gerçek 390 px genişlik doğrulandı; ana sayfa, EN menü ve EN rezervasyonda document genişliği 390 px kaldı. EN menüde 142 ürün kartı vardı; mobil gezinme açıldı ve rezervasyon bağlantısı çalıştı. Görseller yüklenip form görünür kaldı. Dış hesap veya müşteri kaydıyla test yapılmadı.

| Kontrol | Sonuç |
| --- | --- |
| `npm run lint` | Geçti. |
| İzole `npm run build` | Geçti; mevcut prerender/dil yapısı korundu. |
| `npm run test:seo` | Geçti: 30 canonical sayfa, 48 eski URL; görünür içerik/şema, diller, hreflang, sitemap, robots, özel yollar ve gerçek 404. Yeni FAQ sayıları TR 11, EN 7, konum 5. |
| `npm run test:menu` | Geçti: 142/18 gerçek HTML; TR/EN fiyat/açıklama/şema, yetkisiz yazma, izole güncellemede iki dil ve ana sayfanın cache yenilemesi. |
| `npm run test:reservations` | Geçti: izole kayıt/durum/takvim ve kalıcı saklama hatasının sahte başarı vermemesi. Konsoldaki kasıtlı bağlantı hatası bu olumsuz senaryo testidir. |
| `npm run test:analytics` | Geçti: gerçek rezervasyon ID biçimi, hash, query/referrer ve parametre temizliği, SPA tekrarları, özel yol engeli, ayrı contact/lead etiketleri. |

Canlı yayım, yeni PageSpeed ölçümleri ve hesap akışına gerçek tag erişimi aşağıdaki son kontrol kaydına eklenir. Önceki bölümdeki tek laboratuvar ölçümü yeni deploy başarısı diye sunulmaz; CrUX p75 ile laboratuvar LCP’si ayrı tutulur.

## 7. Raporun kalan 24 maddesi: nihai durum

| No | Konu | Uygulanan / doğrulanan | Dış koşul veya sınır |
| --- | --- | --- | --- |
| 01 | Serpme karar bilgileri | Web/Google fiyat, kişi başı, minimum ve menüden gerçek kapsam eşleştirildi. | Gramaj, ilave servis/kuver, su/kahve kapsamı işletme belgesi olmadan kesinleştirilmedi. |
| 02 | İlk ekran | Adres, saat, canlı fiyat, kaynak puanı, menü/Maps/talep bağlantıları tamam. | Puan anlık değil, 2 Ekim tarihli gözlemdir. |
| 03 | EN konum | Gerçek `location` hedefi, nav/footer/talep yönü tamam. | — |
| 04 | Tüm menü HTML | 142 ürün, 18 kategori, iki dil başlangıç HTML ve şema eşleşmesi tamam. | — |
| 05 | Yandex saatleri | Yedi günlük 07–22 düzeltmesi gönderildi. | Platform moderasyonu bekliyor; özel gün tahmin edilmedi. |
| 06 | Restaurant Guru | Yanlış saatler ve düzeltme yolu doğrulandı; alan paketi hazır. | E-posta mesajı/CAPTCHA gerektiren form gönderilmedi. |
| 07 | Tarih kanıtı | Kanıtsız kuşak/yapı/kuruluş iddiaları giderildi; aile anlatısı ayrıldı. | Tarihli aile belgesi, eski fotoğraf ve bina kaydı mevcut değil. |
| 08 | Başlangıç ölçümü | GSC organik/AI dışa aktarımları, mevcut GA4 akışı ve yeni doğru olay entegrasyonu hazır. | Onaylı masa ve Bing verisi ölçülmedi; yayım sonrası tam dönem henüz oluşmadı. |
| 09 | Ürün açıklamaları | 62 ürünün TR/EN açıklama/çevirisi iyileştirildi; Google eşleşen kayıtları güncel. | Mutfakta doğrulanmamış gramaj/alerjen eklenmedi. |
| 10 | No:8 kimliği | Doğru CID, ad/adres/telefon, doğru Tripadvisor ve açık Cihangir ayrımı tamam. | AI modellerinin yeniden taraması ve üçüncü taraf cache’i kontrolümüzde değil. |
| 11 | Kaynaklı değerlendirme | 4,8/1.602/2 Ekim ve gerçek profil linkleri; review eylemi dönüşümden ayrı. | İzin/bağlam doğrulanmış müşteri alıntıları eklenmedi. |
| 12 | Skip link | Gerçek main hedefi/odak ve modal klavye davranışı tamam. | — |
| 13 | Kök dil/yön | 8 bağımsız SSR dil kökü, Arapça RTL ve gerçek yerel 404 tamam. | — |
| 14 | Ürün tercümeleri | Goat Cheese/Roast Beef gibi temelsiz tür dönüşümleri kaldırıldı. | Tür/reçete mutfak belgesi olmadan tahmin edilmedi. |
| 15 | Sipariş koşulları | TR/EN ortak rehber, bireysel tabak alternatifi, çay ve sıcak seçenek açıklaması tamam. | Kesin nihai hesap/kuver sıfır garantisi verilmedi. |
| 16 | Tedarik/ödeme | Kanıtsız organik/manda/menşe ve ödeme şeması giderildi; TL korunur. | Sertifika, fatura, tüm alerjenler ve ödeme kabulü bağımsız doğrulanmadı. |
| 17 | Dış dizin eşleşmesi | Beş profil incelendi, Google düzeltildi, Yandex’e gönderildi, doğru Tripadvisor bağlandı. | Guru/Wanderlog/Tripadvisor canlı düzeltmeleri erişim/onay gerektiriyor. |
| 18 | CWV | Ölçüme dayanan görsel yükleme ve sınırlı CSS temizliği; güvenli vitals toplama hazır. | Yeni saha p75’i yeterli örnek oluşmadan başarı sayılmaz. |
| 19 | Fiziksel erişim | Belirsiz erişilebilirlik iddiaları yerine ziyaret öncesi gerçek ihtiyaç teyidi. | Kapı/basamak/tuvalet saha ölçümü ve onaylı fotoğraf uzaktan üretilemez. |
| 20 | EN niyet ayrımı | Farklı rehber niyetleri korunur; başlangıç/veri yaşı incelendi. | Tam 28 gün ve sayfa×sorgu matrisiyle tekrar değerlendirme gerekir. |
| 21 | HTTP apex zinciri | Apex→www alan adı yönlendirmesi ve production hedefi doğrulandı. | HTTP→HTTPS→www iki adım Vercel'in zorunlu HTTPS yönlendirme sırasından kaynaklanır; uygulama kodu bu platform kuralını değiştiremez. |
| 22 | ES/ZH hreflang | Gerçek hub ve eşdeğer yazı kümeleri; karşılıklı hreflang/sitemap testleri tamam. | — |
| 23 | Bağımsız kaynak | Doğru olgusal işletme paketi ve profil kaynakları hazır. | Bağımsız ziyaret/editoryal deneyim satın alınmadı veya uydurulmadı; dış iletişim yapılmadı. |
| 24 | Tekrarlı AI paneli | 14 sorgu/4 platform/3 tekrar protokolü ve doğrulayıcı; gerçek tanısal denemeler mevcut. | Tam 168 hücre ve sonraki karşılaştırma tamamlanmış sayılmaz; erişilemeyen ölçümler null. |

Bu tablo kalan işlerin yok sayıldığı anlamına gelmez. Kodla çözülebilen düzenlemeler, yapılmış hesap işlemleri ve gerçek engeller tek tek kaydedilmiştir. Yeni platform erişimi, fiziksel işletme belgesi, bağımsız ziyaret ve geçen zaman yazılım değişikliğiyle üretilemez.

## 8. Araştırma dayanakları

2 Ekim 2026’da birincil platform belgeleri ve doğrudan ilgili işletme kartları incelendi. Kaynakların her biri yalnız desteklediği alan için kullanılır.

| Kaynak | Uygulamadaki karşılığı |
| --- | --- |
| [GA4 sayfa görüntülemeleri](https://developers.google.com/analytics/devguides/collection/ga4/views) ve [SPA ölçümü](https://developers.google.com/analytics/devguides/collection/ga4/single-page-applications) | Manuel view ile otomatik history olayının birlikte çift sayım üretmesini önlemek. |
| [GA4 config parametreleri](https://developers.google.com/analytics/devguides/collection/ga4/reference/config) | Google signals ve reklam kişiselleştirme sinyallerini kapatmak; güvenli URL/referrer. |
| [Google Tag gizlilik ayarları](https://developers.google.com/tag-platform/security/guides/privacy) | Reklam kişiselleştirme sinyali sınırlaması. |
| [Google Tag CSP rehberi](https://developers.google.com/tag-platform/security/guides/csp) | Önceki ölçümde görülen Google ülke alanı ihtiyacı için yalnız `google.nl` img/connect eklemek; geniş wildcard/unsafe-eval eklememek. |
| [Google işletme menü düzenleme](https://support.google.com/business/answer/9455840?hl=en) | Menü fiyatı/açıklaması ve yayıma yansıma ayrımı. |
| [Google işletme saatleri](https://support.google.com/business/answer/15300403?hl=en) | Standart haftalık saat ile özel gün programının ayrılması. |
| [Google profil temsil kuralları](https://support.google.com/business/answer/3039617?hl=en) | Gerçek işletme adı/adres/temel faaliyet; temelsiz özellik eklememek. |
| [Google AI optimizasyon rehberi](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide) | Teknik erişim, görünür doğru içerik ve gerçek kaynak; özel AI şeması veya yapay bağımsız bahsetme üretmemek. |
| [GSC AI performans raporu](https://support.google.com/webmasters/answer/16984139?hl=en) | Gösterim/ziyaret ayrımı, rapor günü ve bastırılmış veri sınırları. |
| [Bing AI Visibility](https://blogs.bing.com/search/2026/6/New-AI-Visibility-Insights-in-Bing-Webmaster-Tools-Intents-Topics-Citation-Share-Compare/) | Farklı motor raporlarının ayrı veri kaynağı olarak ele alınması; erişim yokluğunun sıfır sayılmaması. |

Kurulu Next 16.3.5 Script, usePathname, useReportWebVitals ve CSS belgeleri yerel `node_modules/next/dist/docs` kaynağından okundu. Dış belge ile kurulu sürüm ayrımında gerçek üretim build’i ve uygulama testleri esas alındı.

## 9. Son canlı kontrol

- Uygulama commit'i: [`2adebd9`](https://github.com/tarihivankahvaltievi/tarihi-van-kahvalti-evi/commit/2adebd9eedb79b4a4ec49c11f79a7f07f21c8979), `main`. Commit GitHub `origin/main` ile karşılaştırıldı; gönderilmemiş yerel değişiklik yoktu.
- Production: Vercel'in GitHub entegrasyonu bu commit'i production'a otomatik dağıttı; deployment Ready/Current olarak doğrulandı. Production alias `https://www.tarihivankahvaltievi.com/`.
- Canlı temel SEO kontrolü: 30 canonical sayfa ve 48 eski URL için denetim geçti. Ana sayfa, TR/EN rehberleri ve `llms.txt` canlı yanıtlarda güncel menüyle çelişen “kete sunuluyor” ifadesi vermiyor; kültürel rehberde kete ile güncel işletme menüsü ayrıca ayrılıyor.
- Yayımdan sonra alınan bir PageSpeed mobil laboratuvar örneğinde ana sayfa LCP 4.893 ms, FCP 3.301 ms, TBT 456 ms, CLS 0 ölçüldü. Bu tek sentetik laboratuvar çalışmasıdır; saha p75'i veya deploy öncesi/sonrası nedensel karşılaştırma değildir. Kullanılabilir URL düzeyi CrUX örneği ana sayfa için 28 günlük LCP 2,2 sn, INP 127 ms ve CLS 0 gösteriyordu. URL düzeyi olmayan diğer sayfalara ana sayfa sonucu genellenmez.
- Build, lint, analytics, menü ve yerel/canlı SEO doğrulamaları bu uygulama commit'i için geçti. GA4 arayüzünde `generate_lead` önemli olay yapıldı ve sekiz düşük kardinaliteli özel boyut ile bir metrik kaydedildi. Gerçek üretim `generate_lead` alımı Realtime'da görülmeden veri alımı doğrulandı sayılmaz; sahte talep oluşturulmadı.
- Bu kapanış belgesi ile ilk beş aşamalı analiz notu hesap oturumundan sonra güncellendi. Dizin düzeltmeleri, AI panelinin tüm ölçümleri ve yeterli süreye yayılan SEO/CWV sonuçları aşağıdaki açık koşullardır.
