# SEO ve GEO operasyon planı

Son teknik revizyon, canlı site kontrolü ve dış kaynak denetimi: 21 Temmuz 2026

Bu belge, `van kahvaltıcısı`, `Beyoğlu kahvaltı`, `Taksim kahvaltı`, `Turkish breakfast near Taksim` ve ilgili yerel niyetli aramalarda organik görünürlüğü artırmak için teknik durum ile işletme hesabı gerektiren işleri birlikte izler. Google'da veya başka bir arama motorunda birinci sıra garanti edilemez. Google'ın açıkladığı yerel sonuç bileşenleri alaka düzeyi, mesafe ve bilinirliktir; teknik iyileştirmeler erişimi ve anlaşılabilirliği güçlendirir, kullanıcının konumunu veya rekabeti ortadan kaldırmaz.

## Uygulanan teknik SEO/GEO kapsamı

- Sitemap 15 indekslenebilir kanonik URL'yi içerir: altı Türkçe ana içerik sayfası, Türkçe/İngilizce menü, İngilizce ana ziyaretçi sayfası, İngilizce/Rusça/Arapça/Korece/Japonca uluslararası rehberler ve iki yasal bilgilendirme sayfası. Eski, yönlendirilen, yönetim veya API URL'leri sitemap'e alınmaz.
- Görsel sitemap kapsamı ana sayfadaki galeri/hero varlıklarını, canlı menü verisinden okunan güncel kategori/ürün görsellerini ve rehber/hikâye sayfalarındaki gerçek görselleri sayfa bazında listeler. Yinelenen görsel URL'leri her sayfada tekilleştirilir.
- Türkçe ana sayfa ile İngilizce ziyaretçi rehberi arasında karşılıklı `tr`, `en` ve `x-default` hreflang ilişkisi hem sayfa başlıklarında hem sitemap'te tanımlıdır.
- Türkçe canlı menü ile İngilizce canlı menü arasında ayrı ve karşılıklı `tr`, `en` ve `x-default` hreflang kümesi bulunur. İngilizce menü, aynı Supabase menü kaynağından güncel fiyatları alır ve özgün İngilizce ürün açıklamaları sunar.
- `/van-kahvaltisi`, yerel ziyaret niyeti için Taksim erişimi, servis biçimi, vejetaryen seçenekler ve ziyaret planını görünür HTML'de açıklayan kullanıcı rehberidir. `/van-kahvaltisi-nedir`, bilgi arama niyeti için 1947 süt evi geçmişini, 504 numaralı coğrafi işaret kaydını, otlu peynir, murtuğa, Van kavut ve diğer temel ürünleri resmî kaynaklarla açıklayan ayrı kültür rehberidir. `/hikayemiz`, 1978 aile yolculuğunu ve Zambak Sokak'taki mekân yaklaşımını doğrulanabilir mevcut işletme gerçekleriyle anlatır.
- `/en`, `Content-Language: en` başlığı, İngilizce metadata, tek H1, görünür ziyaretçi rehberi, Van kahvaltısı sözlüğü, SSS ve doğrulanabilir işletme bilgileriyle gerçek bir yerelleştirilmiş sayfadır; yalnızca otomatik çeviri veya anahtar kelime sayfası değildir.
- Güncel fiyatların tek kaynağı dinamik `/menu` sayfasıdır. Ana sayfadaki sabit ve güncelliğini yitirmiş `450 TL` cevabı kaldırıldı; SSS kullanıcıyı canlı menüye yönlendirir.
- Ana sayfada `Restaurant`, `WebSite`, `WebPage` ve görünür cevaplarla eşleşen `FAQPage`; menüde `WebPage`, `BreadcrumbList` ve `Menu`; İngilizce sayfada `Restaurant`, `WebPage`, `BreadcrumbList` ve `FAQPage` grafiği bulunur.
- Site genelinde tek ve kararlı işletme kimlikleri (`#restaurant`, `#website`, sayfa kimlikleri), self-canonical, özgün title/description, Open Graph ve Twitter metadata kullanılır. İngilizce FAQ şemasının dili `en` olarak düzeltilmiştir.
- Konum sayfasındaki yaklaşık 1 MB harita JavaScript'i ilk açılıştan çıkarıldı. Erişilebilir statik konum kartı, adres ve Google Maps bağlantısı hemen gelir; MapLibre yalnız kullanıcı “Etkileşimli haritayı yükle” dediğinde yüklenir.
- Ana sayfanın gerçek LCP görseli `eager` ve `fetchPriority=high` olarak işaretlendi; dekoratif görseller daha ölçülü kaliteyle sunulur. Yinelenen görsel/sr-only H1 ve yinelenen giriş metni kaldırıldı.
- Footer'daki politika metinleri gerçek, self-canonical `/gizlilik` ve `/cerez-politikasi` sayfalarına bağlanır; yönetim ve API yüzeyleri ise ayrı `noindex` ve `X-Robots-Tag` kontrolleriyle arama sonuçlarından çıkarılır.
- `robots.txt` genel botlara ek olarak Googlebot, Bingbot, YandexBot, Applebot, Naver `Yeti`, `OAI-SearchBot` ve `PerplexityBot` için açık arama/grounding grubu yayımlar; yalnız yönetim API'si ve sunucu içi yollar kapalıdır. Kanonik sitemap adresi bildirilir.
- IndexNow anahtarı alan adında yayımlanır ve `npm run seo:indexnow` Bing, Naver, Seznam gibi katılımcı motorlara değişen URL'leri toplu bildirir. Varsayılan liste İngilizce, Rusça, Arapça, Korece ve Japonca rehberleri de kapsar. Bu bir tarama bildirimi olup indeksleme veya sıralama garantisi değildir.
- Eski Türkçe sorgu URL'leri en yakın gerçek içeriğe, eski İngilizce sorgu URL'leri `/en` sayfasına tek adımlı kalıcı yönlenir.
- Derleme sonrası SEO sözleşmesi 15 kanonik sayfada canonical, hreflang, dil başlığı, title, description, H1, görünür metin, JSON-LD, sitemap, en az 50 görsel sitemap kaydı, doğru `lastmod`, yedi arama/AI botu, IndexNow kapsamı, yönlendirme, 404 ve doğrudan `200` dahili bağlantıları otomatik denetler. Korece ve Japonca sayfalarda gerçek bal-kaymak görseli, doğrudan menü bağlantısı, yerelleştirilmiş ziyaretçi bilgileri ve `MenuItem` varlığı ayrıca doğrulanır.

## Ölçülen performans etkisi

19 Temmuz 2026'da aynı yerel production build üzerinde Lighthouse 13.4.0 mobil laboratuvar ölçümü alındı. Bunlar saha Core Web Vitals verisi değildir fakat değişikliğin ilk yük etkisini karşılaştırır.

| Sayfa | Performans | LCP | Total Blocking Time | İlk yük | A11y / Best Practices / SEO |
| --- | ---: | ---: | ---: | ---: | ---: |
| Ana sayfa — önce | 77 | 6,0 sn | 120 ms | 1.015 KiB | 100 / 100 / 100 |
| Ana sayfa — sonra | 82 | 4,6 sn | 40 ms | 947 KiB | 100 / 100 / 100 |
| Konum — önce | 54 | 4,0 sn | 3.590 ms | 1.712 KiB | 100 / 100 / 100 |
| Konum — sonra | 97 | 2,0 sn | 70 ms | 687 KiB | 100 / 100 / 100 |

Konum sayfasındaki en büyük kazanım harita kütüphanesinin kullanıcı isteğine kadar ertelenmesinden gelir. Gerçek kullanıcı verisi için Search Console Core Web Vitals raporu 28 günlük dönemlerle izlenmelidir.

## İşletme sahibi tarafından doğrulanacak gerçekler

Kod, işletme sahibinin erişemediğimiz Google Business Profile, Yandex Business ve üçüncü taraf dizin kayıtlarını değiştiremez. 19 Temmuz 2026 taramasında şu çelişkiler görüldü:

1. Site ve şema çalışma saatini her gün `08:00–18:00` gösteriyor; Google Maps arama görünümünde `06:30` açılış bilgisi görüldü. Gerçek saat birincil kaynaktan doğrulanmalı; site, Google, Yandex ve dizinler aynı gün eşitlenmelidir.
2. Site adresi `Zambak Sk. No:8, Şehit Muhtar Mahallesi, Beyoğlu, İstanbul 34435`; Yandex Maps kaydı `Zambak Sokak 10A` gösteriyor ve saatleri bilinmiyor. Gerçek kapı numarası işletme belgesiyle doğrulanıp yanlış kayıt düzeltilmelidir.
3. RenkMobil işletmeyi `24 saat açık` ve `34421` posta koduyla gösteriyor. MekanRadar da `34421` kullanıyor. Gerçek posta kodu doğrulandıktan sonra her iki kaynakta düzeltme istenmelidir.
4. Google görünümündeki kategori `Cafe`. Gerçek ana faaliyet kahvaltıysa Google Business Profile'da mevcut en yakın kahvaltı restoranı kategorisi birincil olarak doğrulanmalı; işletme adına anahtar kelime eklenmemelidir.
5. Sitede kullanılan telefon `+90 541 525 2868` ve işletme adı `Tarihi Van Kahvaltı Evi 1978` tüm önemli yüzeylerde aynı yazımla tutulmalıdır.
6. Google Maps CID'si `10380797280962926014`; sitedeki yol tarifi ve koordinatlar `41.0367655, 28.9829478` noktasına bağlıdır. Pin gerçek giriş kapısında değilse profil içinden düzeltilmelidir.

Denetlenen kayıtlar:

- Google Maps: https://www.google.com/maps?cid=10380797280962926014
- Google Maps hedef sorgusu: https://www.google.com/maps/search/Breakfast%20at%20Van%20Kahvalti%20Evi%20Istanbul
- Yandex Maps: https://yandex.com/maps/org/tarihi_van_kahvalt_ve_arap_evi/237523878781/
- RenkMobil: https://renkmobil.com/kahvalti/istanbul/tarihi-van-kahvalti-evi-1978/
- MekanRadar: https://mekanradar.com/mekan/istanbul/beyoglu/tarihi-van-kahvalti-evi-1978

## Google Business Profile çalışma listesi

1. İşletme adını tabeladaki gerçek adla aynı tutun; konum veya ürün anahtar kelimesi eklemeyin.
2. Birincil kategoriyi gerçek ana faaliyete en yakın seçenek olarak seçin; yalnız gerçekten sunulan ikincil kategorileri ekleyin.
3. Web sitesi alanını `https://www.tarihivankahvaltievi.com/`, menü alanını doğrudan `https://www.tarihivankahvaltievi.com/menu` yapın.
4. Gerçek adres, pin, telefon, standart saatler ve bayram/özel gün saatlerini doğrulayın. Siteyle aynı gün güncelleyin.
5. Dış cephe, giriş, salon, serpme sofra, otlu peynir, murtuğa, kavut ve güncel menünün özgün fotoğraflarını düzenli yükleyin.
6. Hizmet ve ürün alanlarında yalnız gerçekten sunulan seçenekleri kullanın; sitedeki canlı menüyle çelişen fiyat veya ürün bırakmayın.
7. Gerçek müşterilerin tüm yeni yorumlarına kısa, kişisel ve olgusal yanıt verin. Yorum karşılığında hediye/indirim vermeyin; çalışanlardan, ilişkili kişilerden veya sahte hesaplardan yorum istemeyin.
8. Masadaki QR kartı veya ödeme sonrası nötr mesajla gönüllü yorum bağlantısı sunulabilir; yalnız memnun müşterileri seçerek yönlendirme yapılmamalıdır.
9. Profil performansında arama, web sitesi tıklaması, arama/telefon ve yol tarifi eylemlerini aylık kaydedin.

## Arama motoru ve yapay zekâ keşif planı

### Google

- Search Console'da alan adı mülkünü doğrulayın ve `https://www.tarihivankahvaltievi.com/sitemap.xml` gönderin.
- `/`, `/menu`, `/van-kahvaltisi`, `/van-kahvaltisi-nedir`, `/hikayemiz`, `/konum`, `/en` ve `/en/menu` sayfalarını URL Denetleme ile bir kez kontrol edin. Yalnız gerektiğinde indeks isteği gönderin; tekrar tekrar istek göndermek taramayı hızlandırmaz.
- Eski URL'lerin tek adımlı yönlendirmeden sonra kanonik hedefte birleşmesini, yinelenen title/canonical ve soft-404 raporlarını izleyin.
- Haftalık sorgu grupları: marka, `van kahvaltıcısı`, `van kahvaltısı`, `murtuğa`, `kavut`, `beyoğlu kahvaltı`, `taksim kahvaltı`, `turkish breakfast istanbul`, `breakfast near taksim`, `van breakfast menu`. Sayfa bazında gösterim, tıklama, CTR ve ortalama konumu kaydedin.

### Bing, Yandex, Safari ve Opera

- IndexNow gönderimi dağıtımdan sonra çalıştırılır. Ayrıca Bing Webmaster Tools'a sitemap eklenip tarama hataları kontrol edilmelidir.
- Yandex Webmaster'da alan adı doğrulanmalı, sitemap gönderilmeli ve Yandex Business kaydındaki adres/saat çelişkisi düzeltilmelidir.
- Safari ve Opera ayrı birer arama motoru değildir. Safari/Apple yüzeyleri için Applebot'un erişimi açık tutulur; Opera'da kullanılan arama sağlayıcısının Google/Bing/Yandex tarayıcı ve indeks kuralları geçerlidir. Tarayıcı adına özel sahte schema veya sayfa üretilmez.

### Naver ve Koreli turistler

- Naver Search Advisor'da alan adı doğrulanmalı, `https://www.tarihivankahvaltievi.com/sitemap.xml` gönderilmeli ve `/ko/blog/istanbul-bal-kaymak` için URL 수집 (URL toplama) isteği bir kez çalıştırılmalıdır. Bu işlemler işletme hesabı erişimi gerektirir.
- Korece rehberde 발 카이막, 이스탄불 카이막 맛집, 탁심 아침 식사 niyetleri; gerçek menü içeriği, açık adres, her gün `08:00–18:00` çalışma saati, ulaşılabilir semtler ve Türkçe sipariş cümleleri görünür metin olarak sunulur.
- Naver'ın içerik rehberine uygun olarak önemli bilgiler yalnız görsele gömülmez; anlamlı Korece alt metin, özgün restoran fotoğrafı ve görünür açıklama birlikte kullanılır. İlgisiz anahtar kelime tekrarına gidilmez.
- Naver Blog, Korece İstanbul gezi içerikleri ve Koreli yemek/seyahat üreticilerinde ücretli link ağı yerine gerçek editoryal deneyim hedeflenmelidir. Davet veya iş birliği varsa açıkça belirtilmeli; sahte Korece yorum üretilmemelidir.
- Aylık sorgu kümesi: `이스탄불 발 카이막`, `이스탄불 카이막 맛집`, `터키 카이막 맛집`, `탁심 아침 식사`, `터키식 아침 식사`. Naver Search Advisor ve Search Console'da gösterim, tıklama, CTR ve hedef sayfa birlikte izlenmelidir.

### Japonca arama ve Japon turistler

- `/ja/blog/istanbul-bal-kaymak` ayrı, self-canonical bir Japonca URL'dir; `ja-JP` içerik dili, `ja` HTTP başlığı, karşılıklı hreflang ve sitemap alternatifi taşır. Kullanıcılar tüm dil sürümlerine görünür dil seçiciden ulaşabilir.
- Google'ın görünür içerik–structured data eşleşmesi politikasına göre Japonca breadcrumb, bağlantılı editör bilgisi, hazırlama/doğrulama yöntemi ve dokuz görünür SSS sayfada yer alır. `BlogPosting.about` içindeki dört yöresel varlık, sayfadaki aynı dört resmî kaynağa `sameAs` ile bağlanır; görünmeyen puan, yorum veya ödül şeması kullanılmaz.
- Japonca rehber `イスタンブール カイマク`, `バル カイマク`, `タクシム 朝食`, `イスタンブール 朝食`, `トルコ朝食` niyetlerini; gerçek ürün içeriği, adres, saatler, çevredeki gezi noktaları ve sipariş ifadeleriyle karşılar.
- Google'ın Japonca çok dilli site rehberine uygun biçimde önemli içerik bütünüyle Japonca ve görünür HTML olarak sunulur; dil yalnız meta etiketleriyle bildirilmez. Gerçek restoran fotoğrafı, Japonca alt metin ve açıklayıcı başlık birlikte kullanılır.
- Google Search Console'da Japonca URL bir kez denetlenmeli ve sitemap yeniden gönderilmelidir. Japonca sorgular sayfa filtresiyle aylık izlenmeli; düşük gösterimde içerik kopyalamak yerine gerçek Japon ziyaretçilerin soruları ve Search Console verisiyle mevcut rehber geliştirilmelidir.
- Japonca İstanbul gezi blogları, Google Maps yorumları ve gerçek seyahat/yemek içerik üreticilerinde editoryal deneyim hedeflenmelidir. Ücretli bağlantı ağı, makine çevirisi toplu sayfalar ve sahte Japonca yorum kullanılmamalıdır.

### ChatGPT ve diğer yapay zekâ sistemleri

- `OAI-SearchBot` erişimi ChatGPT arama görünürlüğü içindir; OpenAI'nin açıkladığı üzere `GPTBot` eğitim tercihini ayrı kontrol eder. Mevcut robots politikası arama botuna açık kanonik içerik sunar.
- Perplexity'nin resmî yayıncı dokümanı `PerplexityBot` erişiminin arama sonuçlarında kaynak gösterimi için açık tutulmasını önerir. Bot artık robots dosyasında açıkça tanımlıdır; Vercel katmanında ek bir WAF engeli bulunmadığı canlı HTTP kontrolüyle doğrulanmıştır.
- Bing'in Şubat 2026'da açtığı AI Performance raporu; grounding sorgularını, kaynak gösterim sayısını ve sayfa bazlı citation aktivitesini sunar. Bing Webmaster Tools doğrulandıktan sonra klasik tıklama metrikleriyle birlikte bu rapor aylık izlenmelidir.
- Uluslararası rehberlerdeki Van kahvaltısı, otlu peynir, murtuğa ve kavut tanımları TÜRKPATENT ile T.C. Kültür Portalı kaynaklarına görünür biçimde bağlanır; aynı URL'ler `BlogPosting.citation`, `about.sameAs` ve `mentions.sameAs` alanlarında kullanılır. Bu, görünür metin ile makine-okunur iddiaları aynı kanıta bağlar.
- Google, AI Overviews/AI Mode için özel bir AI dosyası veya ek şema gerekmediğini açıklar. Ayrı `llms.txt`, “GEO schema” ya da görünmez anahtar kelime bloğu eklenmedi; yararlı görünür metin, taranabilir bağlantı, doğru schema ve güncel işletme gerçekleri güçlendirildi.
- İngilizce ziyaretçi rehberi ve İngilizce canlı menü; turistlerin kullandığı yemek adlarını, güncel fiyatları, konumu, saatleri ve kısa cevapları görünür HTML'de sunar. Böylece bilgi yalnız script veya görsel içinde kalmaz.
- Şemaya yapay puan, yorum, ödül, hizmet alanı, kurucu hikâyesi veya doğrulanmamış `sameAs` eklenmemelidir.

## İçerik, itibar ve bağlantı çalışması

- Yeni sayfa yalnız farklı ve gerçek bir kullanıcı ihtiyacını karşılıyorsa açılmalıdır. Semt adını değiştirerek çoğaltılan doorway/kapı sayfaları oluşturulmaz.
- Doğrulanabilir arşiv fotoğrafları, kurucu/aile anlatısı ve tarih kaynağı toplanırsa görünür kaynak ve güncelleme tarihi olan özgün bir tarihçe hazırlanabilir. Doğrulanmadan `Article` şeması kullanılmaz.
- İstanbul/Beyoğlu gastronomi rehberleri, yerel basın, turizm kaynakları ve gerçek tedarikçi/etkinlik ortaklarından editoryal anılma hedeflenir. Ücretli bağlantı, toplu dizin paketi ve otomatik misafir yazı ağı kullanılmaz.
- Instagram ve diğer sosyal profillerde ad, adres, telefon, saat ve site URL'si Google Business Profile ile aynı tutulur.
- Reddit ve yerel SEO topluluklarındaki saha deneyimleri; gerçek yorum, eksiksiz profil, tutarlı NAP ve yerel editoryal bağlantıların önemini tekrar ediyor. Bunlar resmî sıralama belgesi değil, yalnız operasyon fikri kaynağı olarak değerlendirilmiştir.

## 30/60/90 günlük ölçüm rutini

- İlk 30 gün: Search Console/Bing/Yandex/Naver doğrulama, sitemap, profil saat-adres düzeltmeleri, 15 kanonik URL'nin indeks durumu ve ilk sorgu tablosu. Bing'de Search Performance yanında AI Performance / grounding sorgularının başlangıç görüntüsünü kaydedin.
- 31–60 gün: gerçek müşteri yorum akışı, fotoğraf güncellemeleri, İngilizce sorguların gösterim/CTR incelemesi, düşük CTR title/description testi. Aynı anda tek anlamlı değişiklik yapın.
- 61–90 gün: sorgu niyetine göre yeni içeriğe gerçekten ihtiyaç olup olmadığını değerlendirin; NAP düzeltmelerinin yayılımını ve 28 günlük Core Web Vitals saha verisini karşılaştırın.
- Sıralamayı kişiselleştirilmiş tek bir tarayıcı aramasından değil, Search Console sorgu/sayfa verisi ve profil eylemlerinden değerlendirin.

## Resmî ve yardımcı araştırma kaynakları

- Google yerel sıralama: https://support.google.com/business/answer/7091
- Google LocalBusiness yapılandırılmış verisi: https://developers.google.com/search/docs/appearance/structured-data/local-business
- Google AI özellikleri ve site görünürlüğü: https://developers.google.com/search/docs/appearance/ai-features
- Google generative AI optimizasyon rehberi: https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
- Google yararlı içerik: https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- Google taranabilir bağlantılar: https://developers.google.com/search/docs/crawling-indexing/links-crawlable
- Google hreflang: https://developers.google.com/search/docs/specialty/international/localized-versions
- Bing Webmaster Guidelines: https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a
- IndexNow dokümantasyonu: https://www.indexnow.org/documentation?hl=en
- Bing IndexNow açıklaması: https://www.bing.com/webmasters/help/indexnow-0z209wby
- Bing AI Performance ve GEO ölçümü: https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview
- Yandex indeksleme: https://yandex.com/support/webmaster/en/yandex-indexing/site-indexing
- Yandex sitemap: https://yandex.com/support/webmaster/en/indexing-options/sitemap
- Applebot: https://support.apple.com/en-us/119829
- OpenAI yayıncı ve geliştirici SSS: https://help.openai.com/en/articles/12627856-publishers-and-developers-faq
- Naver Search Advisor SEO temelleri: https://searchadvisor.naver.com/guide/seo-basic-intro
- Naver Search Advisor içerik rehberi: https://searchadvisor.naver.com/guide/content-basic
- Google Japonca çok dilli site rehberi: https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites?hl=ja
- Perplexity tarayıcıları: https://docs.perplexity.ai/docs/resources/perplexity-crawlers
- Reddit yerel SEO tartışması (resmî olmayan saha deneyimi): https://www.reddit.com/r/localseo/comments/1uv6pvk/what_local_seo_strategies_are_still_getting_you/
