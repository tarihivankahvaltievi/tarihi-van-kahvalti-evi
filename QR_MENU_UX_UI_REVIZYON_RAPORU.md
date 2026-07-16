# QR Menü UX/UI Revizyon Raporu

## Amaç

Bu sayfa masa üzerindeki QR koddan açılan bir karar yüzeyidir. Misafirin ilk ihtiyacı işletmenin hikâyesini okumak değil; aradığı ürünü, fiyatını ve temel içeriğini birkaç saniye içinde görmektir. Tasarımın başarısı, özellikle 375–430 px ekranlarda rahat kaydırma ve fiyatlara anında erişimle ölçülür.

## Mevcut deneyimde tespit edilen sorunlar

### P0 — Kayan kontrol alanı içerikle çakışıyordu

Arama ve kategori alanı mobilde iki satır yüksekliğinde sabit kalıyor; kullanıcının kaydırdığı ürün kartı bu alanın altında kalıyordu. Ekran görüntülerinde başlık, fiyat ve ürün alanının birbirine girmesi bu sorunun doğrudan sonucuydu. QR menüde bu durum ürün taramayı kesintiye uğrattığı için kritik önceliktedir.

### P0 — İlk ekranın önemli kısmı menü içeriği dışındaki alanlara ayrılmıştı

Yüksek navigasyon, büyük başlık ve iki satırlı arama/filtre yüzeyi birlikte ürünün ilk görünmesini geciktiriyordu. İlk ürün fiyatına ulaşmak için gereksiz kaydırma gerekiyordu.

### P1 — Kategori sistemi fazla yoğun ve kesik görünüyordu

Kategori ve editöryel filtreler aynı yatay şeritte yer alıyor, sayı rozetleri de dar ekranda ek gürültü oluşturuyordu. `Van’dan` gibi başlıklar kesiliyor; bunun kategori sonu mu yoksa yatay kaydırılabilir bir alan mı olduğu ilk bakışta anlaşılmıyordu.

### P1 — Kart hiyerarşisi QR kullanımına göre pahalıydı

Kartlarda açıklama, etiket, ikon ve ayrıntı metni fiyatla yarışıyordu. Öne çıkan ürün ise mobilde fazla büyük, diğer ürünler ise daha sıkışık görünüyordu. Fiyatın güçlü, ürün adının ikinci, açıklamanın ise üçüncü düzeyde olması gerekir.

### P1 — Renk ve yüzey dili dağınıktı

Krem, kahverengi, bordo ve altın farklı yoğunluklarda kullanılıyor; bazı kartlar bordo blok, bazıları beyaz yüzey oluyordu. Bu, markanın istenen bordo–saf beyaz omurgasını zayıflatıyordu.

### P2 — Dokunma, odak ve hareket geri bildirimi eşit değildi

Dokunma hedefleri her yerde aynı netlikte değildi. Sabit alanın yüksekliği değiştiğinde kaydırma hizalaması garanti değildi. Hareket azaltma tercihi için tek bir yerden kapanan, eksiksiz bir davranış bulunmuyordu.

## Tasarım yönü

Mekânın fiziksel karşılığı beyaz masa örtüsü, bordoya yakın menü mührü ve ince siyah çerçevelerdir. Bu nedenle zemin saf beyazdır; bordo yalnızca seçili durum, fiyat ve yönlendirme için kullanılır. Hafif neo-brutalist karakter, geniş ve bulanık gölgelerle değil; 1 px koyu kontur, 2–3 px sert gölge ve kısa köşe yarıçaplarıyla elde edilir.

Bu yaklaşımın imza unsuru, ürün listesindeki **fiyat–isim hizasıdır**: her kartta ürün adı solda, fiyat sağda sabit bir referans oluşturur. Misafir scroll ederken gözünü yeniden eğitmek zorunda kalmaz.

## Uygulanan revizyon planı

1. **Kapak alanını karar yüzeyine dönüştürme**
   - Büyük animasyonlu başlık yerine tek satırlı `QR Menü` hiyerarşisi kuruldu.
   - İşletme adı ve güncel fiyat bilgisi küçük, anlamlı destek metinleri olarak bırakıldı.
   - Mobil üst alan yaklaşık 146 px’e indirildi.

2. **Kayan gezinmeyi iki duruma ayırma**
   - İlk görünümde arama ve kategoriler birlikte bulunur.
   - Kullanıcı içerik içinde ilerlediğinde ve aktif arama yoksa arama alanı kapanır; yalnız kategori rayı sabit kalır.
   - Aktif arama varken arama görünür kalır; sonuç bağlamı kaybolmaz.

3. **Kategori mimarisini sadeleştirme**
   - Ana kategoriler `Tümü`, `Sofralar`, `Sıcaklar`, `Van’dan` ve `İçecekler` olarak korundu.
   - Editöryel filtrelerin tamamı yerine QR kullanımında en anlamlı yardımcı filtre olan `Vejetaryen` bırakıldı.
   - Sayı rozetleri kaldırıldı; sayı bilgisi bölüm başlıklarında korunarak görsel gürültü azaltıldı.

4. **Kartları hızlı tarama için yeniden kurma**
   - Tüm kartlar mobilde düzenli bir görsel–metin iki kolon yapısına getirildi.
   - Ürün adı ve fiyat aynı satırda, tutarlı konumda tutuldu.
   - Açıklama iki satırla sınırlı; porsiyon/etiket bilgisi en alt satıra alındı.
   - Ayrıntı yönlendirmesi metin yerine belirgin ama sessiz bir ok hedefi oldu.
   - Öne çıkan ürün masaüstünde farklı ölçeğe sahip; mobilde ise liste ritmini bozmayacak şekilde normal karta yakın tutuldu.

5. **Bordo–beyaz–siyah yüzey sistemini yerleştirme**
   - Ana zemin ve kartlar saf beyaza alındı.
   - Seçili kategori, fiyat ve kritik yönlendirmeler bordodur.
   - Kartlar ve kontroller ince siyah çerçeve taşır.
   - Gölge yalnızca fiziksel tıklanabilirlik hissi vermek için sert ve kısa kullanılır.

6. **Mobil başlığı kontrol altına alma**
   - Paylaşılan üst navigasyon QR menü rotasında 72 px’e sabitlendi.
   - Durum rozeti gizlendi; logo ve menü düğmesi küçültüldü.
   - Sabit üst navigasyon ile sabit kategori rayı aynı yükseklik referansını kullanır; içerik altlarına kaçmaz.

7. **Erişilebilirlik ve dayanıklılık**
   - Tek H1, anlamlı bölüm başlıkları, arama etiketi, `aria-pressed` filtreleri ve ürün ayrıntı diyaloğu korundu.
   - Görünür klavye odağı bordo/bronz yüksek kontrastlı hatla tanımlandı.
   - Tüm kart ve kontrol hareketleri `prefers-reduced-motion` altında anında ve eksiksiz çalışır.
   - Fiyatlar tabular sayı karakteriyle hizalanır; uzun ürün adları dengeli satır kırar.

## Mobil kabul kriterleri

- 375 px genişlikte ürün kartının başlığı ve fiyatı kesilmeden görünür.
- Kaydırma sırasında kategori rayı içerik üstüne binmez.
- Aktif arama görünürlüğünü korur; arama yokken sabit alan yalnız tek satır yüksekliğindedir.
- Birincil kategori seçimi ve vejetaryen filtresi en az 42 px dokunma hedefi sağlar.
- Kartlar arasında tutarlı görüntü oranı, çerçeve ve fiyat konumu korunur.
- Ürün ayrıntısı açıldığında odak diyaloğa geçer; `Escape`, arka plan ve kapat düğmesiyle güvenle kapanır.

## Doğrulama

- `npm run lint` başarılı.
- `npm run build` başarılı; `/menu` statik olarak üretildi.
- Menü H1’i, JSON-LD `Menu` şeması, ürün alt metinleri ve filtre semantiği korunuyor.
- Genel SEO betiği çalıştırıldı. Betik ana sayfadaki önceden var olan görünür metin sinyali nedeniyle (`/: hedef görünür metin eksik`) başarısız oluyor; menü rotası ya da bu revizyonun değiştirdiği dosyalarla ilgili bir hata değil.
