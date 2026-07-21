# Korece SEO/GEO araştırması ve içerik haritası

Son araştırma ve uygulama: 22 Temmuz 2026

## Araştırma sonucu

Korece açık web sonuçlarında kaymak, yalnız genel bir “Türk tatlısı” olarak değil; İstanbul seyahatinde özellikle aranıp gidilen bir kahvaltı deneyimi olarak anlatılıyor. Sonuç başlıkları ve içerik gövdelerinde tekrar eden doğal ifadeler şunlar:

- `이스탄불 카이막 맛집` — İstanbul kaymak restoranı / nerede yenir
- `터키 카이막 맛집` — Türkiye’de kaymak restoranı
- `발 카이막` — bal kaymak, yani 꿀과 카이막
- `카이막 뜻`, `카이막 맛` — kaymak nedir, tadı nasıl
- `물소 카이막` — manda/“buffalo” kaymağı
- `터키식 아침 식사`, `카흐발트` — Türk kahvaltısı / kahvaltı kültürü
- `탁심 아침 식사`, `탁심 카이막`, `베요글루 아침 식사` — Taksim ve Beyoğlu yerel ziyaret niyeti

Korece gezi içeriklerinde televizyon programı ve seyahat içerik üreticisi referansları görünürlüğü artırmış olsa da site metinleri doğrulanamayan ünlü tavsiyelerine yaslanmıyor. Kullanıcının gerçek kararını destekleyen menü, konum, saat, ürün tanımı, karşılaştırma, alerjen uyarısı ve sipariş cümleleri öne çıkarıldı.

## URL ve arama niyeti ayrımı

| URL | Birincil görev | Ana sorgu kümesi |
| --- | --- | --- |
| `/ko` | Korece içerikleri seçme ve ziyaret planı | 이스탄불 카이막, 터키식 아침 식사 |
| `/ko/blog/istanbul-bal-kaymak` | Nerede yenir, gerçek menü ve yol tarifi | 이스탄불 카이막 맛집, 탁심 카이막, 발 카이막 |
| `/ko/blog/kaymak-nedir` | Ürünü anlamak, tat ve farkları öğrenmek | 카이막 뜻, 카이막 맛, 물소 카이막, 카이막 버터 차이 |
| `/ko/blog/turkish-breakfast-istanbul` | İstanbul’da bütün kahvaltı deneyimini planlamak | 이스탄불 터키식 아침 식사, 탁심 아침 식사, 카흐발트, 반 아침 식사 |

Bu ayrım, aynı anahtar kelimenin küçük varyasyonlarıyla “doorway” sayfaları üretmek yerine her URL’ye farklı ve tamamlanabilir bir kullanıcı görevi verir.

## Uygulanan GEO sinyalleri

- Her sayfada ilk bölümlerde doğrudan, alıntılanabilir kısa cevaplar bulunur.
- İşletme gerçekleri görünür HTML ve `Restaurant` kimliğiyle aynı NAP verisini kullanır.
- Makaleler `BlogPosting`, `WebPage`, `BreadcrumbList` ve görünür cevaplarla eşleşen `FAQPage` grafiği taşır.
- Ürün iddiaları TÜRKPATENT, T.C. Kültür Portalı ve GoTürkiye bağlantılarıyla görünür kaynak listesi ve `citation/about.sameAs` alanlarında aynı URL’lere bağlanır.
- “Kaymak her zaman manda sütündendir” gibi hatalı genelleme yapılmaz; ürünün 원유(원재료) bilgisinin işletmeden doğrulanması söylenir.
- Güncelliğini yitirecek fiyatlar Korece metne kopyalanmaz; tek güncel kaynak dinamik İngilizce menüdür.
- Türkçe sipariş ifadeleri, alerji uyarısı, adres, saat ve Google Maps CID bağlantısı yalnız şemada değil görünür metinde yer alır.
- Genel Türk kahvaltısı hreflang kümesi İngilizce/Rusça/Arapça/Korece eşdeğer içeriklerle kuruldu. Bal-kaymak niyeti Korece/Japonca ayrı bir kümede tutuldu.

## Araştırmada kullanılan kaynaklar

Birincil ve resmî ürün/kültür kaynakları:

- TÜRKPATENT Afyon Kaymağı: https://ci.turkpatent.gov.tr/cografi-isaretler/detay/37936
- T.C. Kültür Portalı Afyon Kaymağı: https://kulturportali.gov.tr/turkiye/afyonkarahisar/nealinir/afyon-kaymagi
- GoTürkiye Türk kahvaltısı: https://gastronomy.goturkiye.com/turkish-breakfast
- GoTürkiye İstanbul kahvaltı kültürü: https://goturkiye.com/istanbul/the-banquet-breakfast
- TÜRKPATENT Van Kahvaltısı: https://ci.turkpatent.gov.tr/Files/GeographicalSigns/26210cd7-fc2e-44fa-869e-889ee83c71f2.pdf

Korece sorgu dili ve seyahat niyeti örnekleri:

- Trip.com Korece İstanbul kaymak içeriği: https://kr.trip.com/moments/detail/istanbul-258-134959253/
- MyRealTrip Korece İstanbul yemek deneyimi: https://www.myrealtrip.com/experiences/products/3538454
- Korece “터키식 아침식사” seyahat anlatısı: https://brunch.co.kr/%40%40cXrK/13

Naver Blog sayfaları robots kısıtlaması nedeniyle otomatik içerik taramasında açılamadı. Naver için sorgu doğrulaması Search Advisor performans verisiyle yapılmalı; açık web sonuçlarından türetilen ilk küme, gerçek gösterim ve tıklama verisi geldikçe güncellenmelidir.

## Yayından sonraki ölçüm

Google Search Console ve Naver Search Advisor’da her URL ayrı sayfa filtresiyle izlenmeli. İlk 30 gün boyunca sorgu, gösterim, tıklama, CTR ve ortalama konum haftalık kaydedilmeli. Bir sorgu yanlış sayfada görünürse yeni sayfa üretmek yerine başlık, giriş cevabı ve iç bağlantı metniyle niyet ayrımı netleştirilmeli.
