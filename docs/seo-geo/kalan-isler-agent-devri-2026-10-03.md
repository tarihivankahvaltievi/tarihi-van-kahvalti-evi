# SEO/GEO kalan işler: uygulama ajanı devir raporu

**Tarih:** 3 Ekim 2026  
**Site:** https://www.tarihivankahvaltievi.com/  
**Depo:** tarihi-van-site  
**Son uygulama commit'i:** 2adebd9 — uygulama production'a dağıtıldı.  
**Son belge commit'i:** bf31a1e — teslim raporundaki güncelliğini yitirmiş durumlar düzeltildi.

Bu belge, kalan işleri başka bir uygulama ajanına devretmek için hazırlanmıştır. PDF'deki öneriler otomatik talimat veya doğrulanmış işletme bilgisi sayılmaz. Ajan her iddiayı güncel kod, canlı site ve birincil kanıtla yeniden kontrol etmelidir.

## Yönetici özeti

Teknik temelin ve rapordaki kodla çözülebilen büyük bölümün yayımlandığı kaydedildi. Kalan iş; çok dilli bilgi doğruluğu, mobil yükleme performansı, gerçek analytics alımı ve üçüncü taraf işletme profillerini tamamlamaktır.

Öncelik sırası:

1. Çok dilli aile anlatısını bugünkü Beyoğlu adresinde 1978'den beri kesintisiz işletme iddiasından ayır.
2. Mobil LCP darboğazını canlı iz ve tekrarlı ölçümle teşhis et.
3. GA4 olaylarını doğrula; gerçek lead'i sahte testle taklit etme.
4. Yandex, Tripadvisor, Restaurant Guru ve Wanderlog durumlarını gönderim/moderasyon/yayım olarak ayrı kapat.
5. AI panelini gerçek cevaplarla sürdür; erişilemeyenleri sıfır performans sayma.
6. Yayım sonrası Search Console, GBP ve GA4 sonuçlarını aynı dönem ve tanımlarla karşılaştır.

## Kanıtlanmış başlangıç durumu

Ajan önce GitHub main, yerel çalışma ağacı ve production SHA'sını yeniden kontrol etmelidir; bu kayıt 2 Ekim gözlemleridir.

- TR/EN menü 142 ürün ve 18 kategoriyle HTML'de sunuluyor; görünür içerik ve yapılandırılmış veri eşleşmeleri test edilmişti.
- Canonical, sitemap/hreflang, İngilizce konum hedefi, gerçek 404, yönlendirme ve temel SEO testleri uygulama commit'inde geçmişti.
- Zambak Sokak No:8 ile Defterdar/Cihangir No:52/A işletme kayıtları ayrılmış; menüde olmayan kimi pişi/kete vaatleri düzeltilmişti.
- GA4 akışı bağlandı ve privacy-safe sınırlar kuruldu. generate_lead yalnız backend'de başarılı kaydedilmiş masa talebi için tasarlandı. GA4 arayüzünde önemli olay yapıldı; gerçek canlı alım Realtime'da henüz kanıtlanmadı.
- Google işletme profilindeki 94 mevcut menü kaydının 85'i güncellendi, 9 eski fiyat kaldırıldı; site URL HTTPS canonical'a çevrildi.
- Yandex doğru profilinde haftanın her günü 07.00–22.00 düzeltmesi gönderildi; moderasyon ve yayımlanma ayrıca doğrulanmalı.
- Uygulama commit'i 2adebd9, son belge commit'i bf31a1e. 2adebd9 Vercel'de production/current olarak görüldü.
- Uygulama commit'inde lint, build, analytics, menu, SEO ve reservations testleri geçti. Yalnız belge değişikliği uygulama testlerini yeniden gerektirmez.
- Ham GSC/GBP/GA4/AI hesap verileri Git'e konmamalı. Önceki özel kanıt dizini /Users/baran/Desktop/van-seo-ozel-2026-10-02/ olarak kaydedilmişti. Ajan erişim durumunu ve güncel hücre sayısını doğrulamalı.
- Son ana sayfa PSI mobil laboratuvar örneği: LCP 4.893 ms, FCP 3.301 ms, TBT 456 ms, CLS 0. Tek örnek saha dağılımı veya deploy kaynaklı nedensellik kanıtlamaz. Aynı gün ana sayfa URL CrUX p75 değerleri LCP 2,2 sn, INP 127 ms, CLS 0 olarak not edilmişti; güncelliği ve kapsamı tekrar kontrol edilmeli.
- 2 Ekim'e kadar AI panelinde 45 ham cevap tamamlanmış, TR04/1 tekrarı başlamıştı. Bugünkü sayıyı özel kanıttan çıkar; 45'i güncel sayaç varsayma.
- Gerçek üretim rezervasyonu/lead'i oluşturulmadı. Yeni OAuth grant, hesap şartı veya erişim kapsamı verilmedi.

## Paket A — 1978, adres ve tarih iddiaları

### Bulgular

Kod taramasında bazı çok dilli metinler aile anlatısını bugünkü Beyoğlu adresinde 1978'den beri işletme çalışıyormuş gibi ifade ediyor. Kontrol için başlangıç dosyaları:

- src/app/components/international-breakfast-guide-data.ts — EN/RU/AR/KO/JA giriş, kapanış ve footer.
- src/app/ko/page.tsx — cevap kutusu ve footer.
- src/app/ko/blog/korean-guide-data.ts — Korece rehber giriş/not/footer.

Bu, docs/seo-geo/bolum-2-icerik-ve-kanit-2026-10-01.md içindeki sınırla tutarsız: 1978 mevcut aile anlatısıdır; bağımsız kuruluş belgesi, No:8 adresinde 1978'den beri faaliyet kanıtı veya binanın yaşı kanıtı bulunmadığı kaydedilmiştir. Güvenli anlam: “Aile anlatımız 1978'e uzanıyor; bugün kahvaltımızı Beyoğlu'nda sunuyoruz.” Bu, işletme anlatısı olarak kalmalı; resmî kuruluş tarihi veya adreste kesintisiz faaliyet gibi sunulmamalı.

### İş ve kabul ölçütleri

Tüm src/app içinde 1978, since, Beyoğlu ve ilgili dil karşılıklarını ara. Görünür içerik, metadata/title/description/OG, JSON-LD, footer, blog, alt metin ve sayfa tarihlerini tara. Her iddiayı dayanağıyla eşleştir; tarihli kanıt yoksa kesinliği azalt, kaynak kapsamını açıkça yaz. Yalnız değiştirilen sayfaların modified/visible tarihini güncelle; yayın tarihi uydurma.

- Hiçbir dil bugünkü No:8 işletmesinin 1978'den beri orada olduğunu veya binanın o tarihte kurulduğunu iddia etmiyor.
- Altı dilde metinler aynı anlamı veriyor ve doğal okunuyor.
- Görünür metin, metadata, JSON-LD ve sitemap arasında çelişki yok.
- İlgili build, lint ve SEO testleri geçiyor; canlı HTML'de kalan iddialar taranıyor.

## Paket B — mobil LCP ve ana iş parçacığı

2 Ekim PSI render-blocking CSS ve JavaScript ana-thread yükü işaret etti. Bunlar kök neden değil, inceleme ipuçlarıdır. Google etiketini geciktirmek erken ziyaret olaylarını kaybettirebilir; ölçmeden lazy yükleme veya sabit gecikme ekleme.

1. Production SHA/alan adı, PSI cihazı, CPU/ağ throttling ve Lighthouse sürümünü kaydet. Ana sayfa, /menu, /en/menu, /rezervasyon ve /en/reservation için aynı koşulda en az üç mobil deneme al.
2. Gerçek LCP öğesini ve TTFB, resource-load delay/duration, element-render-delay fazlarını kaydet.
3. LCP görseliyse HTML'den keşfedilebilirliği, format/byte, mobil boyut/crop, priority ve cache'i incele. Metinse font/CSS/JS render gecikmesini ölç.
4. Uzun görevleri ve üçüncü taraf script yükünü dosya/işlem/süre bazında ilişkilendir. Nedeni kanıtlanmadan analytics, menü veya rezervasyon işlevini kaldırma.
5. Her küçük değişiklikten sonra aynı koşullarda üç ölçüm tekrarla; SSR 142 ürün, rezervasyon, erişilebilirlik ve event işleyişini regresyon testine tabi tut.
6. Lab ile saha metriklerini ayrı raporla. CrUX saha verisi yoksa CWV geçti deme.

Kabul: Her URL'de en az üç kıyaslanabilir ölçüm, LCP öğe/fazı ve medyan/dağılım mevcut. Google'ın iyi saha eşikleri 75. yüzdelikte LCP ≤2,5 sn, INP ≤200 ms, CLS ≤0,1'dir. Lighthouse TBT, laboratuvar göstergesidir ve INP yerine geçmez.

## Paket C — GA4 ve dönemsel ölçüm

### GA4 kontrolü

- Canlı tag ve doğru GA4 web stream'ini tarayıcı Network ve Realtime ile doğrula. page_view tekil mi? Özel URL, müşteri bilgisi veya geniş referrer sızıyor mu?
- Test ortamında başarılı kayıt, hata, doğrulama hatası ve WhatsApp geçişinin event davranışını kontrol et. generate_lead yalnız başarılı backend kaydından sonra ve bir kez gitmeli.
- Sahte production rezervasyonu/lead oluşturma. Gerçek talep doğal olarak geldiyse Realtime'da doğrula; henüz gelmediyse açıkça beklemede bırak.
- contact_click, booking_whatsapp_handoff, review_source_click ve generate_lead olaylarını ayrı tut. Tıklama; mesaj, çağrı, rezervasyon onayı veya ziyaret değildir.
- Sekiz özel boyut ve metric_value event parametreleriyle eşleşiyor mu denetle. LCP/INP ms, CLS birimsizdir; metric_value ortalaması p75 değildir.
- Realtime alımı, key-event ayarı ve özel boyutların işlenmiş raporda görünmesi ayrı kontrollerdir. Bazı GA4 raporları 24–48 saatte işlenir.

### Search Console/GBP/rezervasyon

- Yayım sonrasındaki ilk tam 28 günü, aynı uzunluktaki önceki dönem ve uygunsa önceki yıl ile aynı filtrelerle karşılaştır. GSC genel arama ve Google AI performans raporlarını ayır.
- Markalı, markasız ticari ve bilgi sorgularını ayrı analiz et. Sayfa×sorgu matrisinde bastırılmış veriyi sıfır sayma.
- GBP arama/menü/telefon/yol tarifi/site/booking metriklerini tanım ve tarih aralığıyla ayrı raporla. Yol tarifi tıklaması fiziksel ziyaret değildir.
- Rezervasyonları yalnız yetkili toplulaştırılmış analizde kullan; ad/telefon/tarih/notu GA4'e veya Git'e taşıma.
- AI panel cevapları ile Search Console AI gösterimlerini aynı payda yapma.

Kabul: Her ölçüm için kaynak, dönem, filtre, payda, örneklem ve eksik veri durumu yazılı. Gerçek lead oluşmamışsa event alımı doğrulandı denmiyor.

## Paket D — dış işletme profilleri

Doğru referans: Şehit Muhtar Mahallesi, Zambak Sokak No:8, Beyoğlu/İstanbul; +90 541 525 2868; normal saat her gün 07.00–22.00. Serpme Fix 970 TL kişi başı, minimum iki kişi. Su, kahve, servis/kuver ve kesin nihai hesap teyit edilmedi. Doğru Tripadvisor kimliği d34166952; Defterdar/Cihangir No:52/A ve d2279958 bu siteye bağlanmamalı.

| Profil | Bilinen durum | Sonraki iş | Tamamlanma ölçütü |
| --- | --- | --- | --- |
| Google Business Profile | 94 kayıt kontrol edildi; 85 güncellendi, 9 eski fiyat kaldırıldı; HTTPS URL kaydedildi. | Kamu kartı ve yetkili panelde NAP/saat/site/menüyü örnekle; menü yayımlandı mı kaydet. | Canlı kart ve panel durumu ayrı kanıtla tutarlı. |
| Yandex | Doğru profil; 07–22 düzeltmesi gönderildi. | Moderasyon ve kamu kartını kontrol et; snippet'i canlı kartla karıştırma. | Saat yayımlandı veya bekleme/ret durumu ve takip tarihi kayıtlı. |
| Tripadvisor d34166952 | Eski ad/saat/fiyat/site linki; form giriş/şart ekranında kaldı. | Mevcut yetkili Management Center varsa claim/verify edip gerçek alanları düzelt. Yeni onay/grant gerekiyorsa engel yaz. | Gönderim ve yayımlanma aşamaları kanıtlı. |
| Restaurant Guru | Yanlış 06.30–23.00 saat; form e-posta/mesaj/CAPTCHA istiyor. | Normal akışla doğrulanmış alanları öner. CAPTCHA veya iletişim aşamasını otomatik geçme. | Moderasyon sonucu veya somut erişim engeli kaydı. |
| Wanderlog | No:8/telefon doğru; HTTP/eski saat ve yanlış Tripadvisor yorumu bağlantısı. Edit UI ilk kontrolde bulunmadı. | Edit/öneri yolunu yeniden araştır; işletme adına mesaj gönderme. | Canlı düzeltme veya kanıtlı öneri yolu; taslak yayım sayılmaz. |

Her platformda gönderildi, moderasyonda, reddedildi ve kamuya yayımlandı durumlarını ayır. Google düzenlemeleri inceleyebilir; Yandex değişiklikleri moderasyona alabilir; Tripadvisor için sahiplik doğrulaması gerekir.

## Paket E — tekrarlı AI GEO paneli

Yapılandırma docs/seo-geo/ai-query-panel.json: 7 TR + 7 EN soru; Google AI Mode, ChatGPT Search, Perplexity, Gemini; her hücre üç tekrar; toplam 168 planlı gözlem.

- Önce özel kanıtlardaki mevcut sohbetleri say. 2 Ekim'de 45 cevap vardı ve TR04/1 başlamıştı; bugünkü sayıyı yeniden doğrula.
- Her gözlemde tarih/saat ve timezone, UI model etiketi, gerçek arama modu, dil/konum, fresh chat durumu, tam yanıt kanıtı, açılmış kaynak URL'si ve iddia-başına desteği kaydet.
- Soru içinde marka veya “bu restoran” bağlamı varsa branded say. Google AI cevabındaki eski kopyala/düzenle UI metnini model yanıtı sanma.
- ChatGPT Search gerçekten etkin olmalı. Gemini Flash tek başına Search grounding kanıtı değildir; gerçek arama/harita kartını doğrula.
- Perplexity login/signup gate varsa hesap açma veya şart/CAPTCHA atlama. Hücreyi erişilemez kodla; sıfır marka başarısı sayma.
- Doğru kimlik, adres, saat, kişi fiyatı/minimum, menü iddiaları, şube karışıklığı ve kaynak desteğini ayrı değerlendir.
- Yanıtta olmayan olgu null olsun. Açılmayan URL doğrulanmış kaynak değildir. Yanlış ek ücret veya ürün iddiası, doğru fiyatı da otomatik doğru yapmaz.
- Aynı hesap/oturumdaki üç tekrar bağımsız kullanıcılar değildir. 3 tekrardan önce başarı oranı çıkarma.
- Ham sohbet/hesap verisi özel dizinde kalır; Git'e anonim metodoloji ve özet dışında veri koyma.

Kabul: Bütün planlı hücreler measured/unavailable/not_run olarak ayrılmış; payda yalnız ölçülenlerden oluşuyor; platform, prompt, tarih ve mod açık; önce/sonra değişimi nedensel başarı diye sunulmuyor.

## Öncelik, tahmini efor ve teslim

| Öncelik | İş | Tek ajan eforu | Teslim |
| --- | --- | --- | --- |
| P0 | A — 1978/adres tüm dillerde doğruluk denetimi | 2–4 saat | Kod diff, iddia/kaynak listesi, build/SEO/live kontrol |
| P0 | D — Google/Yandex kart teyidi | 1–2 saat + moderasyon | Platform bazlı durum ve kanıt |
| P1 | B — beş URL LCP teşhisi/optimizasyonu | 4–8 saat | En az 3 koşullu ölçüm ve LCP faz karşılaştırması |
| P1 | C — GA4 güvenli doğrulama | 2–3 saat + doğal lead bekleme | Tag/event teyidi; gerçek lead yoksa açık sınır |
| P1 | D — Tripadvisor/Guru/Wanderlog | 2–4 saat + dış onay | Gönderim/moderasyon/yayın/engel durumu |
| P2 | E — AI paneli | 1–2 gün | Tam ölçülebilen hücre matrisi ve engel kaydı |
| P2 | Dönemsel sonuç raporu | 28+ gün | Aynı filtreli GSC/GBP/GA4 karşılaştırması |

## Güvenlik ve doğruluk sınırları

- Farklı adres/telefon taşıyan profilleri aynı işletme, şube veya sameAs ilişkisi yapma.
- İşletme onayı olmayan alerjen, porsiyon, içecek, servis/kuver, nihai hesap veya tedarik iddiası ekleme.
- Yorum, ziyaret, arama, rezervasyon veya bağımsız yayın uydurma; production'a sahte dönüşüm basma.
- HTTP 200, schema geçerliliği, bot User-Agent veya llms.txt varlığını indekslenme/GEO başarısı sayma.
- PSI tek koşusunu saha CWV veya sıralama garantisi olarak sunma.
- Ham rezervasyon, müşteri bilgisi, hesap ID/e-postası, secret veya sohbet kayıtlarını Git'e koyma.
- Yeni OAuth grant, Terms, kimlik doğrulama veya CAPTCHA adımını mevcut yetkinin dışına taşıma.
- Kod deploy'undan önce diff/test/canlı kontrol yap. Belge-only değişikliği için uygulama deploy'u gerektiğini varsayma.

## Başka ajana verilecek hazır görev

Bu repoda docs/seo-geo/kalan-isler-agent-devri-2026-10-03.md ve bağlı 1–4. bölüm raporlarını oku. Önce main, temiz çalışma ağacı ve production SHA/domain'i doğrula. Tamamlanmış işleri tekrarlama. Paket A'da 1978 ve bugünkü adresle ilgili çok dilli iddiaları dayanak kapsamına göre düzelt; aile anlatısını resmi kuruluş veya mevcut adreste 1978'den beri faaliyet iddiasına dönüştürme. Paket B'de beş kritik URL için aynı koşulda en az üç mobil PSI çalıştır; gerçek LCP öğe/fazını ve ana thread yükünü ölç, yalnız kanıtlı küçük değişikliği uygula. Menü SSR'i, rezervasyon, erişilebilirlik ve analitik çalışmasını koru. Paket C'de GA4 stream/event'lerini doğrula; sahte production lead üretme, doğal lead yoksa bekliyor olarak raporla. Paket D'de doğru profilleri kontrol et; gönderim/moderasyon/yayım aşamalarını ayrı tut, Terms/CAPTCHA/yeni grant/outreach sınırını aşma. Paket E'de özel kanıttaki mevcut hücreleri sayıp 168 hücre protokolünde kaldığı yerden devam et; erişilemeyen cevapları sıfır sayma. Hassas veriyi Git'e alma. İlgili lint/build/test ve canlı doğrulamaları yap. Son rapora diff, commit SHA, production sonucu, testler, gerçek ölçüm kapsamı ve kalan engelleri yaz. Kullanıcı daha önce anlamlı değişiklikleri GitHub main'e pushlama yetkisi verdi: test edilmiş değişiklikleri main'e gönder ve deploy durumunu doğrula.

## Birincil araştırma kaynakları

- Core Web Vitals eşikleri ve lab/saha ayrımı: https://web.dev/articles/vitals?hl=en
- LCP teşhis adımları: https://web.dev/articles/optimize-lcp?hl=en
- GA4 önerilen lead olayı: https://support.google.com/analytics/answer/9267735?hl=en-EN
- GA4 veri işlenme aralıkları: https://support.google.com/analytics/answer/11198161?hl=en
- Google Business Profile alanları: https://support.google.com/business/answer/3039617?hl=en
- Google Business Profile saatleri: https://support.google.com/business/answer/15300403?hl=en
- Yandex Business moderasyon: https://yandex.com/support/business-priority/en/manage/data?lang=en
- Yandex edit kuralları: https://yandex.com/support/mapeditor/en/cat_organizations_rul2
- Tripadvisor restoran profilini yönetme: https://www.tripadvisor.com/business/insights/manage-tripadvisor-restaurant-listing-guide
- Vercel alan adı yönlendirmesi: https://vercel.com/docs/domains/working-with-domains/deploying-and-redirecting
- Google Search Console üretken AI raporu kapsamı: https://support.google.com/webmasters/answer/16984139?hl=en-GB

Bu belge 3 Ekim'deki kanıtları başlangıç kabul eder. Uygulamadan önce canlı durumu yeniden doğrula; dış moderasyon, doğal lead ve 28 günlük ölçüm meydana gelmeden tamamlandı sayılmaz.
