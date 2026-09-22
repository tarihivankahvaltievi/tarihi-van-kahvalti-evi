# Design QA — Hamour referanslı menü sayfası

## Karşılaştırma hedefi

- Kaynak görsel gerçekliği: `https://www.hamour.com.tr/tr/menumuz` canlı sayfası ve kullanıcı tarafından sağlanan dört mobil ekran görüntüsü.
- Ana kaynak görüntüsü: `/tmp/tarihi-van-menu-source-top.png` (814 × 1706 px, yaklaşık 2× yoğunluk).
- Ürün listesi kaynak görüntüsü: `/tmp/tarihi-van-menu-source-items.png` (816 × 1722 px, yaklaşık 2× yoğunluk).
- Uygulama: `http://127.0.0.1:3000/menu`.
- Ana uygulama görüntüsü: `/tmp/tarihi-van-menu-implementation-top.png` (390 × 844 px, 1× yoğunluk).
- Ürün listesi uygulama görüntüsü: `/tmp/tarihi-van-menu-implementation-items.png` (390 × 844 px, 1× yoğunluk).
- CSS görünümü: 390 × 844 px. Kaynak mobil görüntüler 2× yoğunluktan 390 × 844 karşılaştırma alanına ölçeklenip üstten hizalandı; uygulama görüntüleri doğal 1× yoğunlukta yakalandı.
- Durumlar: mobil ilk görünüm, kategori filtresi, ürün listesi, “murtuğa” araması, ürün detay paneli ve mobil navigasyon.

## Tam görünüm karşılaştırma kanıtı

Kaynak ve uygulama ilk görünümü aynı 390 × 844 alan içinde yan yana incelendi. Her iki tasarım da koyu bordo üst navigasyon, yemek fotoğrafı liderliğinde açılış, krem içerik yüzeyi, serif başlık hiyerarşisi ve kategori geçişini koruyor. Hamour logosu, fotoğrafları ve metinleri bilinçli olarak Tarihi Van Kahvaltı Evi logosu, kendi kahvaltı fotoğrafları ve gerçek menü içeriğiyle değiştirildi.

## Odaklı bölge karşılaştırma kanıtı

Ürün listesi ayrıca kullanıcı ekran görüntüsü ile uygulamanın “Kahvaltı” filtresi yan yana karşılaştırıldı. Kaynaktaki küçük ürün görseli + başlık + açıklama ritmi, uygulamada gerçek ürün fotoğrafı bulunan her satıra kompakt görsel eklenerek yaklaştırıldı. Görseli bulunmayan ürünlerde boş yer tutucu kullanılmadı; okunaklı metin satırı korundu.

## Gerekli doğruluk yüzeyleri

- Yazı ve tipografi: geçti. NOCTADO gösterim fontu kaynak sayfanın zarif serif karakterini karşılıyor; Causten gövde metni, fiyat ve kontrol etiketlerinde okunaklı. Başlıklar 390 px genişlikte taşmıyor.
- Boşluk ve düzen ritmi: geçti. Büyük fotoğraflı açılış, yatay kategori şeridi, krem menü yüzeyi, bölüm ayırımları ve kapanış görseli aynı editoryal ritmi sürdürüyor. 420 px altındaki ürün görseli/başlık çakışması düzeltildi.
- Renkler ve görsel belirteçler: geçti. Bordo, sıcak krem, altın ve koyu kahverengi palet kaynak yapıya sadık; aktif kategori, fiyat ve ana eylemler yeterli kontrasta sahip.
- Görsel kalite ve varlık doğruluğu: geçti. Logo ve yemek fotoğrafları proje içindeki Tarihi Van Kahvaltı Evi varlıklarından geliyor; Hamour varlıkları son kullanıcı sayfasında kullanılmıyor ve dış kaynağa hotlink yapılmıyor. 70 ürün yerel görselle gösteriliyor, diğerleri metin tabanlı kalıyor.
- Metin ve içerik: geçti. 18 gerçek kategori, 142 gerçek ürün, güncel fiyatlar, ürün açıklamaları, alerjen/tedarik notları ve Türkçe/İngilizce rota içeriği korunuyor.

## Etkileşim ve tarayıcı doğrulaması

- “Kahvaltı” filtresi 27 ürünü doğru gösterdi.
- “murtuğa” araması iki doğru sonuç döndürdü ve temizleme kontrolü çalıştı.
- Ürün ayrıntı paneli mobilde açıldı, içerik ve fotoğraf doğru yüklendi, `Escape` ile kapandı.
- Mobil navigasyon açılıp kapandı; rota ve WhatsApp rezervasyon bağlantıları görünür kaldı.
- 390 × 844 ve 1440 × 960 görünümleri tarayıcıda incelendi.
- Son tarayıcı konsolu kontrolünde hata bulunmadı.
- `npm run lint` ve `npm run build` başarılı.

## Karşılaştırma geçmişi

1. İlk odaklı karşılaştırmada yalnızca bölümün ilk ürünü görselle gösteriliyordu. Bu, kaynak ritmine ve “kendi fotoğraflarımızı kullan” hedefine göre P2 olarak değerlendirildi.
2. Gerçek yerel fotoğrafı olan tüm ürünler için 68–72 px kompakt görsel satırı eklendi; bölümün ilk ürünü 102–146 px öne çıkan görsel olarak korundu.
3. İlk düzeltme sonrası 390 px görünümde normal ürün görseli 102 px'e çıkıp metin sütunuyla çakışıyordu. 420 px medya kuralı ayrıştırıldı; normal görsel 68 px, öne çıkan görsel 102 px yapıldı.
4. Son görüntü `/tmp/tarihi-van-menu-implementation-items.png` üzerinde başlık, fiyat, açıklama ve görsellerin çakışmadan hizalandığı doğrulandı.

## Bulgular

Eyleme dönük P0, P1 veya P2 bulgusu kalmadı. Kaynaktan kalan farklar marka sahipliği ve içerik gereği bilinçli: Hamour’a ait logo, ürün adları, fotoğraflar ve metinler kullanılmadı.

## Uygulama kontrol listesi

- [x] Kaynak sayfa masaüstü ve mobilde incelendi
- [x] Tarihi Van logo, fotoğraf ve ürün verileri kullanıldı
- [x] Kategori filtreleri, arama ve ürün detayı çalışıyor
- [x] Mobil ve masaüstü düzen doğrulandı
- [x] Ürün fotoğraflı satırlar ve metin-only geri dönüşü doğrulandı
- [x] Mobil navigasyon ve klavye kapatma davranışı doğrulandı
- [x] Lint, TypeScript ve üretim derlemesi geçti

## Takip cilası

Bloklayıcı olmayan P3 bulgusu kalmadı.

final result: passed
