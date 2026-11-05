# Yerel SEO / GEO ve müşteri kazanımı — 29 Ekim 2026

## Araştırmanın kapsamı ve sınırları

Mevcut kaynak kodu, önceki SEO raporları, canlı sitenin HTML/bot erişimi, marka ve Taksim kahvaltı arama sonuçları, rakiplerin kendi sayfaları ve Google'ın güncel belgeleri incelendi. Arama sorguları: “Tarihi Van Kahvaltı Evi Taksim kahvaltı”, “Tarihi Van Kahvaltı Evi Zambak”, “Taksim serpme kahvaltı Van kahvaltısı fiyat rezervasyon”, “breakfast near Taksim menu prices reservation”. Bu örneklem kişiselleştirilmemiş sıralama takibi veya aylık arama hacmi ölçümü değildir.

Search Console, GA4 ve Google İşletme Profili hesap raporları bu çalışmada okunmadı. Dolayısıyla mevcut tıklama, dönüşüm, sıralama veya gelir artışı iddia edilemez. Hedef: nitelikli arama ziyaretlerinin menü inceleme, telefon, yol tarifi ve masa talebi adımlarına geçmesini kolaylaştırmak. Bunlar gerçek müşteri ziyaretiyle ayrı ölçülmelidir.

## Bulgular ve uygulama kararları

### 1. Teknik altyapıda tekrar kurulum gerekmiyor

Site zaten sunucuda üretilen içerik, 8 dilde sayfalar, Restaurant/Menu/FAQ verileri, canonical, hreflang, sitemap, IndexNow ve arama botlarına açık robots kuralları içeriyor. Yeni bir GEO dosyası veya çok sayıda benzer blog üretmek yerine gerçek ziyaretçinin karar soruları ele alındı.

Canlı başlangıç denetimi 36 sayfada Googlebot kullanıcı kimliğiyle JavaScript çalıştırmadan içerik, 100 sitemap görselinde HTTP 200 ve 342 bölüm bağlantısını doğruladı. Denetim, henüz yayına alınmayan `/en/location` yerel kaynakta bulunduğu için canlı sitemap eşleşmesinde durdu; tüm canlı testler geçti şeklinde yorumlanmamalı. Kullanıcı kimliği taklidi, gerçek Googlebot IP erişimi veya Google indekslenmesi kanıtı değildir.

### 2. İşletme kimliği ve saat tutarsızlığı gerçek bir risk

| Kaynak / gözlem | Siteyle fark | Yapılması gereken |
| --- | --- | --- |
| [Google Maps arama sonucu](https://www.google.com/maps/search/Breakfast%20at%20Van%20Kahvalti%20Evi%20%C4%B0stanbul) | Cihangir Defterdar Yokuşu 52/A ile Zambak No:8 ayrı sonuçlar; Zambak kaydında 06:30 açılış görünüyor | Profil sahibi güncel yönetim ekranında saat ve pin bilgisini doğrulamalı; arama özeti eski olabilir |
| [Restaurant Guru](https://restaurantguru.com/Tarihi-Van-Kahvalti-ve-Sarap-Evi-Istanbul) | 06:30–23:00 ve wine/cocktail kategorileri; site 07:00–22:00 | Profilde saat, faaliyet, menü bağlantısı kontrol edilmeli; üçüncü taraf erişilebilirlik/otopark iddiaları doğrulanmadan siteye taşınmamalı |
| [Yandex Türkçe](https://yandex.com.tr/maps/org/tarihi_van_kahvalti_evi/237523878781/) | No:8 ve telefon siteyle uyumlu | Bu işletme kimliği korunmalı |
| [Aynı Yandex kimliğinin başka URL/dil görünümü](https://yandex.com/maps/org/tarihi_van_kahvalt_ve_arap_evi/237523878781/) | Arama çıktısında 10A ve bilinmeyen saatler | Farklı işletme varsayılmamalı; aynı kimlik için dil/önbellek farkı profil hesabından kontrol edilmeli |

Bu veriler 29 Ekim'de erişilen arama çıktılarıdır; platformların canlı yönetim paneli değildir. Kaynakların saatleri esas alınarak sitenin 07:00–22:00 kaydı değiştirilmedi. Dış profiller bu çalışma kapsamında düzenlenmedi.

### 3. Arama niyeti: toplam tutar ve tek kişi koşulu

[Sa Va'nın kendi Türkçe sayfası](https://www.savaanatolianbreakfasthouse.com/breakfast-near-me) ve [İngilizce sürümü](https://www.savaanatolianbreakfasthouse.com/en/breakfast-near-me), ulaşımın yanında grup boyutu ve toplam fiyatı açıkça anlatıyor. Çıkarım: “fiyat ne kadar / iki kişi ne öderiz / yalnız gelebilir miyim?” sorularını çözmek satın alma kararını kolaylaştırabilir. Bu bir talep veya rakibin dönüşüm oranı ölçümü değildir; rakip metni veya fiyatı sitemize kopyalanmadı.

Uygulama:
- Türkçe ve İngilizce menü SSS'sine iki kişilik serpme kahvaltı ara toplamı eklendi. Aynı canlı fiyat kaydından hesaplanır; sabit 2026 fiyatı yazılmadı.
- Ek sipariş ve varsa servis/kuver koşulları toplamla birlikte açıklanır. Hesaplanan tutar nihai hesap veya kampanya değildir.
- Fiyat aralığı, belirsiz fiyat veya kaldırılmış serpme ürünü varsa sayı üretilmez; menü/işletmeye yönlendirilir.
- Tek kişi cevabında ürünler ve fiyatlar canlı kayıttan gelir. Kaldırılan tabak önerilmeye devam etmez.
- Türkçe Van kahvaltısı rehberine aynı iki cevap eklendi; görünen metin ve FAQ JSON-LD aynı kaynaktan üretilir.

### 4. İngilizce ulaşım akışındaki eksik sayfa

İngilizce gezinmede Directions bağlantısı önceden anasayfa bölümüne gidiyordu. `/en/location`, adresi, Taksim ulaşımını, saatleri, erişim teyidini, doğru işletme ayrımını ve masa talebini bir arada sunuyor. Mevcut mekân fotoğrafları ve konum tasarımı kullanıldı. Dakika cinsinden doğrulanmamış mesafe, ücretsiz otopark veya basamaksız erişim sözü verilmedi.

Türkçe konumla karşılıklı hreflang, kendi canonical adresi, İngilizce belge dili, tek ortak Restaurant kimliği, WebPage/Breadcrumb/FAQ verisi ve sitemap kaydı eklendi. Ana navigasyon, alt bilgi ve dil geçişi güncellendi. Yeni sayfa analytics izinli yollarına ve mevcut yardımcı llms kaynağına eklendi; kişisel bilgi gönderme kuralları korunur.

## Sayfa / sorgu niyeti haritası

Yeni URL yığını yerine her niyete birincil bir sayfa:

| Sorgu kümesi | Ana hedef | İstenen sonraki adım |
| --- | --- | --- |
| Taksim Van kahvaltısı, Beyoğlu kahvaltı | `/van-kahvaltisi` | Menü / masa talebi |
| iki kişilik serpme kahvaltı fiyatı, tek kişilik kahvaltı | `/menu` | Seçimi anlama / masa talebi |
| Turkish breakfast menu prices Taksim, breakfast for one | `/en/menu` | İngilizce masa talebi |
| Tarihi Van Kahvaltı Evi adres, Zambak Sokak | `/konum` | Doğru yol tarifi / telefon |
| Tarihi Van breakfast directions, Taksim opening hours | `/en/location` | Yol tarifi / masa talebi |
| Turkish coffee near Taksim, Taksim kafe | Mevcut `/taksim-kafe` ve dil karşılıkları | Kahve menüsü / ziyaret |

Sorgular hipotezdir. Gerçek Search Console verisinde iki sayfa aynı sorguda yarışıyorsa önce içerik görevi ve iç bağlantı metni netleştirilmeli; kanıtsız şekilde sayfa silinmemeli.

## Google belgelerine dayanan sınırlar

- [AI features](https://developers.google.com/search/docs/appearance/ai-features): normal SEO temelleri geçerli; özel GEO şeması veya llms.txt sıralama şartı yok. Buradaki geliştirme erişilebilir, açık ve güncel işletme bilgisidir.
- [Yerel sıralama](https://support.google.com/business/answer/7091): alaka, mesafe ve bilinirlik önemlidir. Doğru profil, fotoğraflar ve gerçek değerlendirmeler kod dışındaki temel çalışma alanlarıdır.
- [LocalBusiness](https://developers.google.com/search/docs/appearance/structured-data/local-business): işletmenin kimlik, adres, saat ve menü alanları tutarlı olmalı. Yeni sahte işletme veya kendi kendine yıldız sonucu üretmek için değerlendirme şeması eklenmedi.
- [Dil sürümleri](https://developers.google.com/search/docs/specialty/international/localized-versions): dil karşılıkları kendisini ve diğer sürümü belirtir. İngilizce sayfa Türkçe sayfaya canonical edilmez.
- [Başlıklar](https://developers.google.com/search/docs/appearance/title-link) ve [açıklamalar](https://developers.google.com/search/docs/appearance/snippet): açıklayıcı başlık ve özgün sayfa açıklaması kullanılır; Google'ın metni aynen göstereceği garanti değildir. Fiyatı başlığa dondurarak eskime riski oluşturulmadı.
- [Canonical](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls): mevcut niyeti çoğaltan benzer semt sayfaları yerine mevcut URL'ler güçlendirildi.
- [Dokümantasyon güncellemeleri](https://developers.google.com/search/updates): eski FAQ belgesi bu incelemede güncellemeler sayfasına yönlendi. FAQ verisi semantik tutarlılık için korunuyor; restoran için Google'da FAQ zengin sonucu vaat edilmiyor.

## 28 günlük ölçüm ve işletme aksiyonları

1. **İlk 3 gün:** Profil sahibi Google/Yandex/Restaurant Guru'da adres, pin, telefon, normal/özel gün saatleri ve güncel menü URL'sini karşılaştırmalı. 29 Ekim gibi özel gün saatleri ayrıca teyit edilmeli. Google profilinde website/menü/rezervasyon alanları doğru sayfaya bağlanmalı. Profil değişiklikleri bu commit'in yaptığı işler değildir.
2. **İlk hafta:** Gerçek sokak girişi, kahvaltı tabakları ve iç mekân fotoğrafları güncellenmeli. Misafirlerden teşviksiz ve seçmeden yorum istenmeli; hazır anahtar kelime metni verilmemeli.
3. **Yayın sonrası:** Search Console URL Denetimi'nde yeni İngilizce sayfa ve güncellenen menü/rehber incelenmeli, sitemap takip edilmeli. Günlük tekrar gönderim yapılmamalı. Bu çalışmada Search Console'a indeks isteği gönderilmedi.
4. **Başlangıç ölçümü:** Search Console'dan son tamamlanmış 28 günün sorgu/sayfa/ülke/cihaz verisi alınmalı. Marka sorguları ile markasız Taksim/kahvaltı/fiyat sorguları ayrı tutulmalı. GA4'te organik oturumlar ve menü, telefon, WhatsApp, yol tarifi, masa talebi adımları kaydedilmeli.
5. **28 gün sonra:** Aynı gün sayısı ve hafta günü dağılımıyla karşılaştırılmalı. CTR = tıklama / gösterim; ziyaretçi eylem oranı = ilgili eylemi yapan oturum / organik oturum. Gösterim yoksa indeks/niyet, gösterim var tıklama yoksa başlık/sonuç uyumu, tıklama var talep yoksa fiyat/rezervasyon akışı incelenmeli. Mevsim, tatil ve reklam etkileri not edilmeli.
6. **Gerçek sonuç:** Telefon tıklaması arama gerçekleşti demek değildir; yol tarifi müşteri ziyareti değildir; masa talebi onaylı rezervasyon değildir. Gerçekleşen ziyaretler mevcut işletme takip akışında ayrıca sayılmalı.
7. **GEO kontrolü:** Aynı dil ve sabit soru paneliyle kaynak gösterilme, doğru adres/saat, kişi başı fiyatın yanlış toplam sayılmaması ve güncel menüye bağlantı incelenmeli. Model, tarih ve cevap kaydedilmeli; tek yanıt görünürlük yüzdesi diye sunulmamalı.

## Kontrol sonuçları

Son doğrulama sonuçları `dogrulama.md` dosyasında tutulur. Testler izole menü/rezervasyon verisi kullanır; canlı menü veya müşteri kaydı değiştirilmez. Bu çalışmadan önceki yerel dosya değişiklikleri commit'e dahil edilmez.
