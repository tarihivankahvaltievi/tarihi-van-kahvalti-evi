# Tarihi Van Kahvaltı Evi — Yorumlar UX/UI ve Motion Raporu

Tarih: 14 Temmuz 2026
Kapsam: Hero, Hakkımızda ve Misafir Yorumları arasındaki görsel/anlatısal bütünlük; mobil carousel kullanılabilirliği; hareket, erişilebilirlik ve güven.

## Yönetici özeti

Sayfanın üç ana bölümü tek bir hikâyenin üç perdesi olarak ele alınmalıdır:

1. **Hero — vaat:** Tarihi Van Kahvaltı Evi’nin karakteri ve ilk izlenim.
2. **Hakkımızda — kanıt:** Mekân, emek ve Van sofrasının gerçek hikâyesi.
3. **Yorumlar — doğrulama:** Bu vaadin misafir deneyimindeki karşılığı.

Önceki sürümde hero başlığı `Bricolage Grotesque`, yorum başlığı ise `Literata` kullanıyordu. Bu ayrım özellikle mobilde iki farklı marka dili yaratıyordu. Hakkımızda bölümünün bordo son bandı ile açık renk yorum bölümü arasında da anlatısal bir geçiş bulunmuyordu. Carousel’de soluk yan kartlar okunabilir içerikmiş gibi görünüyor ancak kırpılıyor; görünmeyen sekiz kartın tamamı klavye sırasına giriyor; reduced-motion tercihinde görsel hareket dursa bile JavaScript 680 ms boyunca etkileşimi kilitliyordu.

Bu çalışmada yorum başlığı hero ile aynı marka fontuna geçirildi, Hakkımızda’dan yorumlara bordo/altın bir geçiş ve köprü cümlesi eklendi, kart hareketi sadeleştirildi ve carousel’in klavye/ekran okuyucu/swipe davranışı yeniden kuruldu.

## Tasarım kararı

### Ortak görsel dil

- Hero ve yorum başlıkları aynı `Bricolage Grotesque` ailesini, benzer 790 ağırlığı ve sıkı ama güvenli harf aralığını kullanır.
- Yorum başlığının ikinci satırı bordo renkle hero’daki “Kahvaltı Evi” vurgusunu devam ettirir.
- Hakkımızda bölümünün bordosu yorumların üst kısmına taşar; ince altın çizgi krem yüzeye geçişi işaretler.
- “Sofrayı biz kuruyoruz; hikâyeyi misafirlerimiz tamamlıyor.” cümlesi iki bölüm arasındaki anlam bağını kurar.
- Aktif yorum kartı bordo odak yüzeyi olarak kalır. Yan kartlar okunamayan kopyalar değil, bir sonraki/önceki yorumu ima eden dekoratif kart sırtlarıdır.

### Bilgi hiyerarşisi

Yorumlar bölümünde odak sırası şöyledir:

1. Hakkımızda’dan gelen kısa köprü cümlesi.
2. Marka tipografisindeki “Misafirlerimizin yorumları” başlığı.
3. Tek aktif yorum.
4. Önceki/sonraki kontrolleri ve `1 / 8` durum bilgisi.
5. İkincil “Deneyiminizi Paylaşın” çağrısı.

Bu sıra, mobilde başlık–kart–kontrol–CTA zincirinin gereksiz boşluklarla dört ayrı blok gibi görünmesini önler.

## Uygulanan motion sistemi

### Başlık

- İki satır 75 ms arayla, aşağıdan kısa bir yükseliş ve `clip-path` açılışıyla gelir.
- Blur yalnız giriş anında `4px → 0` aralığındadır; sürekli filtre veya parlama yoktur.
- Bordo/altın çizgi 440 ms’de soldan açılır.
- İçerik JavaScript çalışmasa da görünürdür; scroll reveal yalnız bir enhancement’tır.

### Carousel

- Önceki 620–680 ms katmanlı geçişler tek bir 480 ms `transform/opacity` koreografisine indirildi.
- Ana hareketi aktif kart taşır. Yalnız iki komşu kart görünür; uzak kartlar compositing ve pointer maliyeti oluşturmaz.
- `will-change` yalnız hareket sırasında uygulanır.
- Mobilde 3D `rotateY` kaldırıldı; küçük yönsel `rotateZ` yalnız kart sırtlarında kaldı.
- Autoplay eklenmedi. Kullanıcı kontrolü, görünür oklar ve swipe birlikte sunulur.

Hareket süreleri ve easing için mesafe/ağırlık odaklı kısa geçiş yaklaşımı kullanıldı. Kaynak: [Material Design — Duration & easing](https://m1.material.io/motion/duration-easing.html).

## Mobil UX ve erişilebilirlik

### Yapılan iyileştirmeler

- Kart boyutu artık `window.innerWidth` sonrası state güncellemesiyle değişmiyor; CSS `clamp()`/viewport sınırı kullanılıyor. İlk boyamadaki büyükten küçüğe sıçrama riski kaldırıldı.
- Stage `touch-action: pan-y pinch-zoom` kullanır. Dikey sayfa kaydırması ve pinch zoom korunur.
- Swipe yalnız yatay hareket 42 px’i geçtiğinde ve yatay mesafe dikey mesafenin en az 1,2 katı olduğunda çalışır.
- Pointer capture eklendi; parmak stage dışına çıksa bile gesture tamamlanır.
- Kart tıklaması en fazla bir adım ilerler; uzak karta basınca çoklu indeks sıçraması yoktur.
- Carousel `role="region"`, `aria-roledescription="carousel"` ve görünür başlığa `aria-labelledby` ile bağlanır.
- Yalnız aktif yorum erişilebilirlik ağacında içerik olarak kalır. Görünmeyen kartlar klavye sırasına girmez.
- `1 / 8` durumu `aria-live="polite"` ile değişikliklerde duyurulur.
- Sol/sağ ok tuşları desteklenir.
- Yorum görselleri dekoratif kabul edilerek boş `alt` kullanılır; yorumcu adını görsel açıklaması gibi tekrar etmez.
- 320, 375, 390 ve 1280 px genişliklerde yatay taşma kontrolü yapıldı.

Carousel semantiği ve kontrol sırası [W3C WAI-ARIA Carousel Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/) esas alınarak düzenlendi. Gesture davranışı için [MDN `touch-action`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/touch-action), mobil touch hedefleri için [WCAG 2.2 Target Size](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) referans alındı.

### Reduced motion

- `prefers-reduced-motion: reduce` altında başlık, kart, kontrol ve CTA animasyon/transition’ları final authority katmanında kapatılır.
- JavaScript hareket kilidi `0 ms` olur; kullanıcı görünürde bitmiş bir hareket için 480 ms beklemez.
- İçerik ve kontroller eksiksiz kalır; yalnız mekânsal hareket çıkarılır.

Kaynaklar: [WCAG 2.3.3 Animation from Interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions), [MDN `prefers-reduced-motion`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/%40media/prefers-reduced-motion).

## Güven ve içerik bulgusu

“Deneyiminizi Paylaşın” formu şu anda yalnız React state’ine yorum ekler; backend, moderasyon veya kalıcı kayıt yoktur. Önceki başarı mesajı kalıcı yayın yapılmış izlenimi verebilirdi. Mesaj bu sürümde “Notunuz bu ziyaret için yorumlara eklendi” olarak düzeltildi.

Önerilen sonraki karar iki seçenekten biri olmalıdır:

1. Formu gerçek bir backend + moderasyon + açık rıza akışına bağlamak.
2. Formu kaldırıp kullanıcıyı doğrulanabilir Google/Tripadvisor değerlendirme sayfasına yönlendirmek.

Gerçek değerlendirmeler kullanıldığında kaynak, tarih ve mümkünse doğrulanabilir dış bağlantı göstermek sosyal kanıtın güvenilirliğini artırır.

## Neden autoplay kullanılmadı?

Mobil carousel’in kendi kendine hareket etmesi okuma ritmini bozar, odağı çalar ve kullanıcı yorum metnini bitirmeden kartı değiştirebilir. Bu nedenle görünür kontroller + swipe + durum göstergesi tercih edildi. Araştırma özeti: [Baymard — Homepage Carousel UX](https://baymard.com/blog/homepage-carousel).

## Kabul kriterleri ve sonuç

- [x] Yorum başlığı hero ile aynı font ailesinde.
- [x] Hero–Hakkımızda–Yorumlar tek anlatı gibi bağlanıyor.
- [x] 320, 375, 390, 768 ve masaüstü düzenlerinde başlık dengeli iki satır kalıyor.
- [x] Yatay overflow yok.
- [x] Klavyede yalnız gerçek kontroller odaklanıyor.
- [x] Ok tuşları ve swipe çalışıyor.
- [x] Aktif yorum ve `n / 8` durumu ekran okuyucuya aktarılıyor.
- [x] Dikey scroll ile yatay swipe birbirinden ayrılıyor.
- [x] Reduced-motion altında geçiş ve JavaScript kilidi kaldırılıyor.
- [x] Production build ve TypeScript doğrulaması geçiyor.

## Sonraki faz önerileri

1. Gerçek yorum kaynağı/backendi kararlaştırılmalı; geçici client-state formu kalıcı ürün özelliği gibi bırakılmamalı.
2. Gerçek yorum tarihi ve doğrulanabilir kaynak bağlantısı eklenmeli.
3. Carousel değişimi, CTA tıklaması ve rezervasyona geçiş için anonim event ölçümü eklenmeli.
4. %200 zoom ve özel text-spacing ayarlarında manuel QA tekrarlanmalı. Reflow referansı: [WCAG 1.4.10 Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html), [WCAG 1.4.12 Text Spacing](https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html).
