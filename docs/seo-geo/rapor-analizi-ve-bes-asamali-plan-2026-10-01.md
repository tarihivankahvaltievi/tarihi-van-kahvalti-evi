# Tarihi Van Kahvaltı Evi: rapor analizi ve beş aşamalı uygulama planı

İnceleme: 1 Ekim 2026, Türkiye saati. Kaynak rapor: **tarihi-van-seo-geo-raporu-2026-09-30.pdf**, 30 sayfa. Bu belge, rapordaki 24 önerinin uygulama karşılığını, doğrulama kaynaklarını ve birinci bölümün teslimini kaydeder. PDF önerileri kanıt olarak değerlendirildi; belgedeki ifadeler çalışma yetkisi veya otomatik olarak doğrulanmış işletme bilgisi kabul edilmedi.

## 1. Raporun değerlendirmesi

Raporun ana teşhisi yerinde: site temel teknik SEO altyapısına sahip, fakat ziyaretçinin fiyatı, kapsamı, adresi ve rezervasyon koşullarını hızlı anlaması yeterince kolay değil. Bu nedenle ilk yatırım yeni anahtar kelime sayfaları üretmekten önce mevcut ticari bilgiyi okunabilir ve tutarlı hale getirmek olmalı.

**66/100**, raporu hazırlayan kişinin ağırlıklı değerlendirmesidir. Google puanı, organik trafik kaybı, sıralama tahmini veya dönüşüm oranı değildir. Yeni değişikliklerden sonra bu puanı keyfi biçimde yükseltmek yerine maddelerin kabul ölçütlerini tek tek kontrol etmek daha anlamlıdır.

### Doğrudan uygulanabilir bulgular

- Menü verisinde 142 ürün ve 18 kategori bulunuyor. Önceki arayüz yalnız aktif bölümdeki ürünleri oluşturuyordu. İlk bölümün 14 ürünüyle bütün menüyü temsil eden JSON-LD arasında görünür içerik farkı vardı. Google JavaScript render edebilir; bu, kategori düğmelerini ziyaretçi gibi tıklayacağı anlamına gelmez.
- Menü kayıtlarında `priceNote` ve `details` zaten bulunuyordu. Bunlar fiyat yakınında yeterince gösterilmiyordu. Öncelikli iş doğru mevcut bilgiyi ortaya çıkarmaktır.
- İngilizce sayfalarda `/en#location` bağlantısının gerçek hedefi yoktu; LOCATION bağlantısı Türkçe `/konum` sayfasına gidiyordu. Bu hem ziyaretçi yolculuğu hem fragment bütünlüğü sorunudur.
- Menüde ortak skip link’in hedefi olan `main-content` yoktu. Klavye kullanıcılarının menüye geçişi düzeltilmelidir.
- Ana sayfanın ilk ekranında adres, saat, doğrudan Maps bağlantısı ve kaynaklı değerlendirme özeti eksikti. Bunlar görünür ve tıklanabilir olmalıdır.

### İşletme doğrulaması gerektiren bulgular

1978 başlangıcı, üçüncü kuşak, yapının yaşı/tescili, organik ürün, manda sütü, coğrafi işaretli tedarik, alerjen, porsiyon, tek kişi seçeneği ve döviz kabulü koddan doğrulanamaz. Kültürel bir kaynak da belirli işletmenin tarihini veya fiili tedarikini kanıtlamaz. İkinci bölümde her iddiaya ayrı dayanak ve işletme onayı bağlanacaktır.

**1 Ekim 2026 işletme yanıtı:** Serpme Fix Menü’nün 970 TL kişi başı olması ve minimum iki kişi kuralı doğrulandı. “Evet doğrudur” yanıtı, açıklanmamış servis/kuver ücretinin sıfır olduğu veya su/kahvenin dahil olduğu şeklinde genişletilmedi. Menü kaydındaki sınırsız çay ve bir sıcak seçenek bilgisi görünür hale getirildi; bu kapsamın güncel mutfak/işletme kontrolü ikinci bölümde ayrıca tamamlanmalıdır.

### Ölçüm veya hesap gerektiren bulgular

Google’ın seçtiği canonical, gerçek bot erişimi, CWV saha verisi, sorgu niyeti çakışması, GBP eylemleri ve rezervasyon sonuçları HTML yanıtından çıkarılamaz. HTTP 200 indekslenme kanıtı değildir. Bir bot User-Agent’ıyla yapılan istek, doğrulanmış bot IP’si veya gerçek crawl log’u değildir.

Rapor özel hesap verisi görmemişti. Bu çalışmada yayımdan önce açık Search Console oturumundan organik ve üretken AI performans raporlarına salt okunur erişim doğrulandı. Başlangıç gözlemi Git deposu dışında yerel olarak tutulur. Özellikle AI raporunda gösterim bulunması, “AI görünürlüğü hiç yok” şeklinde bir teşhisi desteklemez. Bu veri bütün AI platformlarına veya gerçekleşmiş restoran ziyaretlerine genellenemez. GBP/GA4 ve onaylanan rezervasyon karşılaştırması henüz tamamlanmadı.

### Raporun önerilerindeki sınırlar

- Kendi restoranımız için Google Maps puanını göstermek, kendi Restaurant şemasına yıldız sonucunu garanti eden `AggregateRating` eklemekle aynı şey değildir. Kaynaklı puan özeti gösterildi; self-serving değerlendirme şeması eklenmedi.
- Google’ın güncel belgeleri özel “AI schema”, zorunlu `llms.txt` veya belirli uzunlukta metin parçalarını görünürlük koşulu olarak sunmuyor. Mevcut `llms.txt` yardımcı bilgi dosyası olarak kalabilir; ziyaretçinin okuyamadığı menünün yerine geçmez.
- FAQ içeriği müşteri sorularını yanıtladığı için değerlidir. 2026 FAQ görünüm değişiklikleri nedeniyle bunun için SERP genişlemesi vaadi verilmemelidir.
- Tek kişi uygunluğu, su/servis ücreti ve iki kişinin nihai hesabı bütün ticari koşullar netleşmeden çıkarılamaz. Minimum sipariş ile kişi başı fiyat gösterilebilir; ek ücretler bilinmeden kesin nihai toplam vaat edilmez.
- İki İngilizce yazı arasında olası niyet örtüşmesi tek başına silme/birleştirme gerekçesi değildir. Önce sorgu ve sayfa verisi gerekir.
- Yeni dil, yeni blog ve yeni dizin sayısı başarı ölçütü değildir. Gerçek müşteri sorularını tamamlama ve doğru işletmeyle eşleşme önceliklidir.

## 2. Kod incelemesi: kapsam ve bağımlılıklar

`src` ve `scripts` içindeki **127 metin tabanlı dosya / 43.031 satır**, dosya okuma ve envanter taramasına dahil edildi. TS/TSX/JS dosyalarının tamamı TypeScript sözdizimi ağacıyla tarandı; ayrıştırma hatası bulunmadı. JSON menü verisi bütün ürün ve kategorileriyle incelendi. CSS dosyaları, dil işaretleri, başlıklar ve modül bağımlılıkları envantere işlendi. Kaynak listesi ve dosya özetleri [kod envanterinde](kod-envanteri-2026-10-01.csv) bulunur. Rezervasyon kayıtları kod değildir; müşteri verileri bu envantere ve yayımlanan belgeye alınmadı. Ortam sırları da envantere dahil edilmedi.

İncelemenin uygulama açısından önemli sonuçları:

| Kod grubu | Bulgular ve uygulama karşılığı |
| --- | --- |
| `seo.ts`, sayfa metadata’ları, sitemap, robots, proxy | Merkezi işletme kimliği, canonical ve çok dilli kümeler zaten mevcut. Yapıyı yeniden kurmak gerekmiyor. Tarih/ödeme gibi doğrulanmamış ticari alanlar ikinci bölümde; HTTP apex zinciri hosting katmanıyla üçüncü bölümde kontrol edilecek. |
| Ana sayfa ve ortak gezinme | TR/EN aynı temel tasarımı kullanıyor. Konum hedefi, ilk ekran bilgileri ve bağlantılar ortak kaynaklardan beslenebilir. |
| Menü verisi, saklama, yerelleştirme, sayfalar ve istemci arayüzü | Supabase varsa öncelikli kaynak; yerel JSON geri dönüş kaynağı. Her iki dil aynı fiyat verisini kullanıyor. Ürünlerin seçilen bölüme göre oluşturulması kaldırıldı. |
| Next önbelleği ve yönetim API’si | Yükleme sınırı ve kısa `stale` süresi, ürünler HTML’de bulunsa bile gizli streaming bloğu üretebiliyordu. Başlangıç HTML’i ve güncelleme doğruluğu birlikte çözülmelidir. |
| Yönetim paneli, oturum ve yükleme API’leri | Menü kaydı mevcut yetkili endpoint üzerinden sürüyor. Testte yetkisiz kayıt 401 veriyor. Panelin iş akışını değiştirmeden menü cache etiketi yenileniyor. |
| Rezervasyon, saklama ve takvim | Talep/onay ayrımı korunuyor. EN yol tarifi artık EN hedefe gidiyor. Rezervasyon verisine canlı test kaydı yazılmadı. |
| Analitik | Maps bağlantıları otomatik olarak yol tarifi eylemi sayılıyor. Yeni yorum kaynağı bağlantısı için ayrı `review_source_click` gerekiyor; aksi halde yorum okuma, dönüşüm sayısını yanlış artırır. |
| Blog/kültür/uluslararası rehberler | Eşdeğer dil kümeleri ile farklı niyetli içerikler ayrılmalı. Tarih, tedarik ve tercüme iddiaları ikinci/üçüncü bölümlerde doğrulanacak. |
| CSS ve etkileşim | Mevcut krem/bordo marka, yazı karakterleri ve menü önizlemesi korunuyor. Mobil açıklama kesilmesi kaldırıldı; küçük fiyat yazılarının kontrastı artırıldı; klavye odağı tamamlandı. |
| Testler | Eski SEO testi görünür metin yerine RSC verisine de izin veriyordu. Bu istisna kaldırıldı; gerçek ürün kartı, adı, fiyatı ve şeması eşleştiriliyor. |

Ek içerik gözlemi: yerel menüde **131 ürünün açıklaması başka bir ürünle aynı**. Bu tek başına spam/ceza göstergesi değildir; müşterinin ürünleri ayırabilmesi açısından zayıflıktır. İlk 15–20 önemli üründe gerçek içerik, porsiyon ve servis bilgisiyle düzeltme ikinci bölüme aittir. Gramaj veya alerjen uydurulmayacaktır.

## 3. Beş bölüm

### Bölüm 1 — Ziyaretçi karar bilgileri ve okunabilir menü

**Bu teslimde uygulanan bölüm.** Rapor 01/02/03/04/10/11/12 maddelerinin yazılım ve mevcut doğrulanmış veriyle uygulanabilir kısmı. 08 için Search Console başlangıç gözlemi de yayımdan önce alındı.

Teslimler: adres/saat/canlı serpme fiyatı/Maps/rezervasyon bilgilerini ilk ekranda göstermek; tarihli kaynak bağlantısı; gerçek İngilizce konum bölümü; bütün ürünleri iki dilde HTML’e almak; kişi başı fiyat ve minimum kuralını açıklaştırmak; mevcut dahil ürünleri göstermek; kategori/ürün fragmentlerini çalıştırmak; skip link ve modal klavye davranışını doğrulamak; yönetim kaydından sonra görünür veri ile şemayı birlikte yenilemek.

Kabul: TR/EN menüde 142 ürün, 18 kategori; her şema ürününün gerçek HTML kartı ve aynı fiyatı; ürün içeriğinin gizli yükleme bloğuna bırakılmaması; EN LOCATION/Contact gerçek `location` hedefi; mobilde yatay taşma olmaması; klavye ile main ve ürün ayrıntılarına erişim; kayıt sonrası yeni fiyat ve yeni kategorinin iki dilde görünmesi.

Kalan ticari alt alanlar (ek ücretler, tek kişi uygunluğu, kapsamın son onayı) bölüm 2’de; dış profillerdeki eşleşme bölüm 4’te tamamlanır. Bu nedenle rapor 01 ve 11’in bütün alt koşulları tamamlanmış sayılmaz. Ana sayfa fiyatı menüyle aynı cache kaynağından gelir; ayrı sabit fiyat yazılmadı.

### Bölüm 2 — Doğrulanmış ürün, ticari koşullar ve tarih kanıtı

Rapor 07/09/14/15/16/19; ayrıca 01 ve 11’in kalan içerik alt işleri.

Önce işletme/mutfak doğrulama tablosu: Serpme ve tek kişi tabaklarının servis miktarı, sıcak seçenek paylaşım kuralı, çay/su/kahve kapsamı, servis/kuver, kahvaltı servis saatleri, ödeme/döviz, kullanılan peynir/et/süt ve alerjen bilgileri. Sonra TR/EN menü ve rezervasyon öncesi metin aynı kaynaktan güncellenir.

Tulum için “Goat Cheese” ve kavurma için “Roast Beef” terimleri fiili ürüne göre doğrulanır. Gerekiyorsa Türkçe ad korunup doğru kısa açıklama eklenir. Sadece çeviri değiştirerek süt/et türü icat edilmez.

Hikâye için 1978’deki başlangıç yeri/adı, bugünkü mekâna geliş tarihi, onaylı aile kronolojisi, tarihli fotoğraf ve yapı kaydı ayrıştırılır. Kültürel kaynaklar ile işletmeye özgü kanıtlar ayrı gösterilir. Özel belgelerin hassas alanları yayımlanmaz.

Sahada doğru kapı, kat/merdiven, tuvalet, bebek arabası ve oturma erişimi gözlenir. Profildeki tek bir “erişilebilir” işareti bütün mekâna genellenmez. Gerçek yorum seçkisi ancak kaynağı, tarihi ve yayımlama koşulları doğrulanarak eklenir.

Kabul: her yeni ticari iddianın sorumlusu, kaynağı ve doğrulama tarihi; ürün adları, fiyat birimleri ve kapsamın iki dilde tutarlılığı; görünür metin ve JSON-LD arasında çelişki olmaması; fotoğrafların gerçek mekâna ait olması.

### Bölüm 3 — Çok dilli teknik tutarlılık ve ölçülmüş performans

Rapor 13/18/21/22.

İlk sunucu yanıtında kök `html lang` ve gerekirse `dir` doğru olmalı. Mevcut `main lang` ve Content-Language yardımcıdır, kök dil tutarlılığını bütünüyle çözmez. Next 16.3’ün güncel kök layout/route yöntemine uygun değişiklik yapılmalı; tüm diller ve not-found yeniden test edilmelidir.

ES/ZH hub’ları gerçek eşdeğer içerik olup olmadığına göre değerlendirilir. Sadece dil sayısını artırmak için aynı hreflang kümesine zorlanmaz. Canonical, karşılıklı alternatif, dil anahtarı ve sitemap birlikte kontrol edilir.

HTTP apex → HTTPS www zinciri uygulama proxy’si ile hosting yönlendirmesinin hangisinden geliyor ayrıştırılır. Uygulamada “tek adım” yazması, dışarıdaki HTTP katmanının tek adım olduğu anlamına gelmez.

Performans: mobil laboratuvar ölçümü, GSC CWV/CrUX varsa gerçek kullanıcı verisi, görsel/LCP/INP/CLS ayrımı. Yeterli saha örneği yoksa “başarılı” veya “başarısız” uydurulmaz. Yalnız gözlenen sorunlar optimize edilir; menünün tamamını gizleme pahasına performans artırılmaz.

Kabul: ilk yanıtta doğru dil/yön; gerçek eşdeğerlerde karşılıklı hreflang; varyantlardan tek kalıcı hedef; tarihlenmiş performans ölçümü ve önce/sonra karşılaştırması.

### Bölüm 4 — Harita profilleri ve dış işletme kimliği

Rapor 05/06/17/23; 10’un dış kaynak tamamlayıcısı.

Google/Yandex/Restaurant Guru/Tripadvisor/Wanderlog için ayrı durum tablosu: kayıt URL’si/kimliği, ad, adres, telefon, saat, menü ve rezervasyon bağlantısı, kontrol tarihi, yönetim erişimi, düzeltme sonucu. Benzer adlı Cihangir işletmesi ile Zambak Sokak No:8’deki işletme karıştırılmamalıdır.

Yandex’te eksik saat ve Restaurant Guru’daki 06:30–23:00 bilgisi, doğru standart/özel gün saatleri işletmece teyit edildikten sonra düzeltilir. Canlı profil ile arama sonucunda kalmış eski metin ayrı takip edilir.

Google Maps’in bu çalışmada görülen web sitesi bağlantısı HTTP kullanıyor. Doğru siteye ulaşsa da canonical HTTPS bağlantısıyla değiştirilmesi dış profil bakımına eklenmelidir. Menü/rezervasyon bağlantılarının eşdeğer doğru dil sayfalarına gitmesi de kontrol edilir.

Bağımsız deneyim kaynakları gerçek ziyaret ve doğru işletme bilgisine dayanmalıdır. İşletme adına editöre, platforma veya müşteriye mesaj gönderme ayrı açık yetki gerektirir; bu kod teslimiyle böyle bir mesaj gönderilmedi.

Kabul: canlı profillerde doğrulanmış standart bilgiler; düzeltilen her alanın tarihli kaydı; doğru CID ve konum; kalan üçüncü taraf gecikmelerinin açık listesi. Yorum teşviki veya sahte deneyim üretilmez.

### Bölüm 5 — Ölçüm, sorgu niyeti ve GEO deneyleri

Rapor 08/20/24. Ölçüm altyapısının başlangıcı bölüm 1’le paraleldir; sonuç karşılaştırması bu bölümde tamamlanır.

GSC organik, GSC Generative AI, Bing AI Performance erişimi varsa, GBP eylemleri, GA4 ve işletmenin onaylanan rezervasyon sayısı farklı metrikler olarak tutulur. Yol tarifi tıklaması gerçek ziyaret, telefon düğmesi gerçek arama, rezervasyon formu da kesinleşmiş masa değildir.

Markalı/markasız sorgular, menü/fiyat niyeti, yerel ziyaret niyeti, ülke/dil ve cihaz ayrımlarıyla 28 günlük karşılaştırma hazırlanır. Mevsimsellik, hafta günleri, reklam, özel gün ve içerik yayım tarihi kayıt edilir. AI raporunun Pacific Time günü ile Türkiye saati karıştırılmaz.

İki İngilizce rehberin gerçekten aynı sorgularda aynı ihtiyacı karşılayıp karşılamadığı sayfa/sorgu verisiyle incelenir. Ayrıştırma veya birleştirme gerekirse URL, yönlendirme ve iç bağlantılar birlikte planlanır.

Sabit AI sorgu paneli: platform/model/tarih/arama kullanımı/ülke/dil kaydı; aynı sorgunun tekrarları; marka anılması, doğru işletme eşleşmesi, fiyat-saat doğruluğu ve kendi alan adına kaynak bağlantısı ayrı alanlar. Tek yanıttan sıra veya görünürlük yüzdesi çıkarılmaz.

Kabul: özel hesap verisiyle başlangıç; yayımdan sonra aynı tanımla tekrar ölçüm; işletme anılması ile domain alıntısının ayrılması; önerilerin ölçüm sonucuyla gerekçelendirilmesi.

## 4. Raporun 24 maddesinin eşlemesi

| No | Öncelik | Bölüm | Bu teslimdeki durum / kalan iş |
| --- | --- | --- | --- |
| 01 | P1 | 1 → 2 → 4 | Kişi başı, minimum 2, mevcut içerik/dahil çay görünür. Ek ücret, tek kişi, kapsam teyidi ve GBP eşleşmesi tamamlanacak. |
| 02 | P1 | 1 | TR/EN ilk ekranda adres, saat, canlı serpme fiyatı/birimi/minimum, kaynaklı puan, Maps, menü ve rezervasyon bağlantıları uygulandı. |
| 03 | P1 | 1 | `/en#location` oluşturuldu; masaüstü/mobil gezinme ve EN rezervasyon bağlantısı düzeltildi. |
| 04 | P1 | 1 | 142 ürün/18 kategori etkileşime bağlı oluşturma yerine gerçek başlangıç HTML’inde. |
| 05 | P1 | 4 | Yandex standart ve özel gün saatleri, profil erişimi ve işletme teyidiyle güncellenecek. |
| 06 | P1 | 4 | Restaurant Guru saat düzeltmesi takip edilecek. |
| 07 | P1 | 2 | İşletme kronolojisi ve yapı kanıtı hazırlanacak. |
| 08 | P1 | 1 + 5 | GSC organik/AI başlangıç erişimi gözlendi; tam GBP/GA4/rezervasyon ölçümü açık. |
| 09 | P2 | 2 | Önce 15–20 ürünün açıklaması mutfak doğrulamasıyla iyileştirilecek. |
| 10 | P2 | 1 + 4 | Zambak No:8 / Beyoğlu / Taksim kimliği ve doğru CID görünür; dış kaynak tutarlılığı devam edecek. |
| 11 | P2 | 1 → 2 | Tarihli puan/yorum sayısı ve kaynak bağlantısı uygulandı; gerçek yorum seçkisi ve düzenli bakım devam edecek. |
| 12 | P2 | 1 | Gerçek ve odaklanabilir `main-content` hedefi eklendi. |
| 13 | P2 | 3 | SSR kök dil/yön düzenlemesi henüz yapılmadı. |
| 14 | P2 | 2 | Tulum/kavurma çevirilerinin mutfak doğrulaması açık. Serpme kategori adı anlamlı hale getirildi. |
| 15 | P2 | 2 | Minimum kuralı ve mevcut dahil içecek görünür; tek kişi ve ek ücret ayrıntıları açık. |
| 16 | P2 | 2 | Tedarik/malzeme/ödeme alanlarının fiili doğrulaması açık. |
| 17 | P2 | 4 | Dış dizinlerin eski ad/saat ve bağlantıları kontrol edilecek. |
| 18 | P2 | 3 | CWV ölçümü ve yalnız doğrulanan sorunlara müdahale açık. |
| 19 | P2 | 2 | Giriş/erişim saha doğrulaması ve gerçek fotoğraf açık. |
| 20 | P3 | 5 | GSC sorgu/sayfa analizi sonrası içerik niyeti kararı verilecek. |
| 21 | P3 | 3 | Hosting kaynaklı HTTP apex zinciri kontrolü açık. |
| 22 | P3 | 3 | ES/ZH eşdeğerlik ve hreflang değerlendirmesi açık. |
| 23 | P3 | 4 | Bağımsız gerçek ziyaret/editoryal kaynak geliştirme açık. |
| 24 | P3 | 5 | Tekrarlı AI sorgu paneli ve sonuç ölçümü açık. |

## 5. Birinci bölümün değişiklik ve doğrulama kaydı

| Değişiklik | Dayanak | Doğrulama / sınır |
| --- | --- | --- |
| Bütün menü kartları ve kategorileri render edilir; kategori seçimi gerçek fragmentlere gider. | Google’ın etkileşime bağlı içerik uyarısı [S1/S2]. | Başlangıç `.html` dosyası, HTTP HTML ve tarayıcı DOM’u karşılaştırılır. Şema/RSC içinde bulunmak tek başına yeterli sayılmaz. |
| `getPublicMenuData` ortak cache kaynağı; `stale:30`, `revalidate:60`, `expire:300`; menü sayfasındaki yükleme sınırı kaldırıldı. | Kurulu Next 16.3.5 belgeleri [S8/S9] ve yerel üretim deneyi. | 30 saniyeden kısa stale, prerender dışı içerik oluşturuyordu. Ürünlerin gizli `S:0` streaming bloğuna bırakılmadığı ayrıca test edilir. |
| Admin başarılı kaydı `public-menu` etiketini hemen geçersiz kılar. | Next revalidateTag belgesi [S9]. | İzole menüde 970 → 971 test fiyatı ve yeni kategori eklenir; TR/EN menü HTML ve şeması ile TR/EN ana sayfa fiyatı yeni veriyi gösterir; baseline geri yüklenir. Canlı fiyat değiştirilmez. |
| Kişi başı fiyat notu, minimum 2 ve mevcut servis ayrıntıları kart/modala taşındı. | Menü kaydı ve işletme onayı. | Birim/minimum iki dilde görünür; Offers açıklamasıyla uyumlu. Bilinmeyen servis/kuver veya içecek bedeli vaat edilmez. |
| Ürün `@id`, `url` ve Offer hedefleri gerçek ürün kartına bağlanır. | Schema.org MenuItem [S5], görünür içerik ilkesi [S3]. | Her ürünün gerçek id’si, görünen adı ve fiyatı şemayla eşleştirilir. Bu özel bir Menu rich-result garantisi değildir. |
| TR/EN ilk ekranda adres, saat, menü verisinden canlı serpme fiyatı ve doğrudan Maps; EN konum bölümü ve doğru nav hedefi. | Mevcut merkezi işletme verisi, kamuya açık Maps profili. | Doğru CID `10380797280962926014`; Zambak Sk. No:8, 34421 Beyoğlu. Kesin yürüyüş süresi veya saha erişim iddiası eklenmez. |
| Google Maps 4,9/5, 1.599 yorum, 1 Ekim kontrol tarihi ve kaynağı görünür. | Canlı kamu profili [S10]. | Tarih statik gerçek gözlem günüdür; her derlemede “bugün”e dönmez. Yorum metni veya AggregateRating şeması eklenmedi. |
| Yorum kaynağı bağlantısı ayrı analitik olayı üretir. | Mevcut otomatik Maps eylemi sınıflandırmasının kod incelemesi. | `review_source_click` ile yorum okumayı yön tarifi dönüşümünden ayırır. Tıklama gerçek ziyaret sayılmaz. |
| Main odağı, ürün detay düğmesi, modal Tab/Escape/odağı geri verme. | W3C skip link tekniği [S6]. | Gerçek focusable main; modal odağı içeride tutulur ve kapatılınca tetikleyiciye döner. |
| Mobil açıklama kesilmesi kaldırıldı; fiyat/ürün rengi koyulaştırıldı. | Görünür içerik ve ölçülen kontrast. | Eski fiyat rengi `#b45a38` / `#faf6f0` yaklaşık 4,37:1; yeni `#99482c` yaklaşık 5,88:1. Bu bütün sitenin WCAG uygunluğu iddiası değildir. |
| Menü banner quality 85 → 84. | `next.config.ts` izinli görsel kalite listesi. | 85 listede yoktu; yeni değer izinli. |
| Sitemap yalnız değişen home/menu/EN rezervasyon tarihlerini günceller. | Gerçek görünür içerik değişikliği. | Bütün URL’ler otomatik bugüne çekilmez. Menü fiyatını gösteren home tarihleri veri güncellemesini izler; tarih-only kayda gelecek öğlen saati eklenmez. |
| SEO testi RSC istisnasını kaldırır; yeni menü entegrasyon testi eklenir. | Eski testin yanlış başarı koşulu, yukarıdaki regresyon riski. | Gerçek HTML kartları, eşleşen fiyat/şema, yeni kategori ve anında yenileme kontrol edilir. |

### Veri güncelliği ve bakım

Menü sayfasındaki tarih **menü veri kaydının son güncellemesidir**; tüm fiyatların bugün işletmece onaylandığı anlamına gelmez. Yerel veri tarihi 28 Temmuz 2026 olduğu için bu tarih keyfi olarak 1 Ekim’e çevrilmedi. Serpme için yeni işletme teyidi bu belgede ayrı kayıt edilir.

Yönetim panelinde kayıt fiyat/çeviri/görünür menü ve şema için aynı veri kaynağını yeniler. Doğrudan veritabanında yapılan değişikliklerin de cache süresiyle tekrar alınması sağlanır. Zaten açık bir tarayıcı sekmesindeki içerik canlı bildirimle kendiliğinden güncellenmez; yeniden yükleme veya sayfaya yeniden geliş gerekir.

Maps puan/yorum sayısı bakımında aynı CID yeniden açılmalı; hem sayı hem `checkedAt` gerçek gözlemle güncellenmeli. Otomatik tarih değiştirerek eski sayıyı güncelmiş gibi göstermeyin. İşletme saatleri/özel günler ve fiili fiyat değişiklikleri için sorumlu kişi işletme tarafından belirlenmelidir.

### Tekrar üretilebilir kontroller

```sh
npm run lint
SUPABASE_URL='' SUPABASE_SERVICE_ROLE_KEY='' npm run build
npm run test:menu
SUPABASE_URL='' SUPABASE_SERVICE_ROLE_KEY='' npm run start -- --hostname 127.0.0.1 --port 3100
npm run test:seo
SUPABASE_URL='' SUPABASE_SERVICE_ROLE_KEY='' npm run test:reservations
```

`test:menu` kendi loopback sunucusunu, geçici menü dosyasını ve test şifresini üretir. Supabase bağlantısını kapatır, `INDEXNOW_DRY_RUN=1` kullanır; fixture fiyatlarını arama motoruna bildirmez. Üretim oturumunu ve gerçek rezervasyon/menü verisini kullanmaz. `MENU_DATA_FILE` yalnız izole test saklama yolu içindir; normal üretimde tanımlanmamalıdır. Üretim dağıtımı gerçek Supabase ayarlarıyla çalışmaya devam eder.

Nihai doğrulama sonuçları ve görsel kontrol kaydı [birinci bölüm teslim kaydına](bolum-1-dogrulama-2026-10-01.md) işlenir. GitHub push’un başarılı olması ile hosting dağıtımının canlıda tamamlanması ayrı kontrol edilir.

## 6. Araştırma kaynakları

Kaynaklar 1 Ekim 2026’da incelendi. Platform kuralları için birincil kaynaklar tercih edildi. Üçüncü taraf SEO araştırmalarından işletmeye özgü trafik/sıralama yüzdesi türetilmedi.

| Kod | Birincil kaynak | Bu işte kullanımı |
| --- | --- | --- |
| S1 | [Google: JavaScript SEO temelleri](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics) | HTML/render ve etkileşim ayrımı. |
| S2 | [Google: lazy-loaded content](https://developers.google.com/search/docs/crawling-indexing/javascript/lazy-loading) | Kategori tıklamasına bağımlı içerik; rendered HTML kontrolü. |
| S3 | [Google: yapılandırılmış veri kuralları](https://developers.google.com/search/docs/appearance/structured-data/sd-policies) | Görünür ve doğru içerikle şema eşleşmesi. |
| S4 | [Google: review snippet kuralları](https://developers.google.com/search/docs/appearance/structured-data/review-snippet) | Kendi yerel işletme puanının yıldız görünümü sınırı. |
| S5 | [Schema.org: MenuItem](https://schema.org/MenuItem) | Gerçek ürün URL’si ve Offer ilişkisi. |
| S6 | [W3C: ana içeriğe geçiş G1](https://www.w3.org/WAI/WCAG22/Techniques/general/G1) | Skip link hedefi ve klavye odağı. |
| S7 | [Google: generative AI optimizasyon rehberi](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide) | Doğru/özgün ticari içerik, özel GEO şeması vaadinden kaçınma. |
| S8 | [Next: cacheLife](https://nextjs.org/docs/app/api-reference/functions/cacheLife) | Kurulu 16.3.5 docs ile birlikte prerender/cache davranışı. |
| S9 | [Next: revalidateTag](https://nextjs.org/docs/app/api-reference/functions/revalidateTag) | Başarılı admin kaydından sonra veriyi yenileme. |
| S10 | [Google Maps işletme kaydı](https://www.google.com/maps?cid=10380797280962926014) | Adres/kimlik ve tarihli değerlendirme gözlemi. |
| S11 | [Google belge güncelleme günlüğü](https://developers.google.com/search/updates) | 2026 FAQ/AI belge değişikliklerini kontrol. |
| S12 | [GSC Generative AI performans raporu](https://support.google.com/webmasters/answer/16984139?hl=en) | Erişim, metrikler ve AI ölçüm sınırları. |

Kurulu Next belgeleri ayrıca `node_modules/next/dist/docs/` altından okundu. Web belgesi ile kurulu sürüm farklı olduğunda uygulamanın kullandığı sürüm ve üretim testi esas alındı.
