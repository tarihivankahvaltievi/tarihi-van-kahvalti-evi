# Tarihi Van Kahvaltı Evi — Mobil Hero Revizyon Raporu

**İnceleme kapsamı:** ana sayfa hero bileşeni, hareket sistemi, görsel yükleme stratejisi, mobil CSS kademesi ve gerçek tarayıcı testi.

## Kısa hüküm

Mevcut hero fikri doğru: uçan, gerçek yemek kesitleri ve alttaki fotoğraf şeridi siteyi sıradan bir kahvaltı evi sayfasından ayırıyor. 390 px ve 430 px testlerinde ilk bakışta güçlü, davetkâr ve hatırlanabilir bir masa hissi veriyor.

Ancak bugün hero aynı anda üç ana fikri anlatmaya çalışıyor:

1. işletmenin adı ve 1978 hikâyesi;
2. havada kurulmuş kahvaltı kompozisyonu;
3. devam eden fotoğraf kolajı.

Bu, ilk karede etkileyici olsa da kaydırmada sahnelerin birbirinin önüne geçmesine, başlığın çok hızlı kaybolmasına ve ziyaretçinin “şimdi neye bakıyorum?” hissine girmesine neden oluyor. Hedef daha fazla obje ya da daha fazla efekt değil; **daha iyi kurgulanmış bir açılış sekansı** olmalı.

Önerilen yönün adı: **Sofranın Uyanışı**. Bu, klasik restoran hero’su değil; Beyoğlu’nda günün ilk masası kuruluyormuş gibi çalışan, dokunmaya karşılık veren ve kaydırıldıkça gerçek mekâna açılan kısa bir mobil sahne olmalı.

---

## Test özeti

| Senaryo | Sonuç | Not |
|---|---|---|
| 375 × 667 kısa telefon, ilk açılış | Geçti | Başlık okunuyor, taşma yok; ancak tüm hero yaklaşık 840 px yüksek olduğu için fotoğraf şeridi çok erken devreye giriyor. |
| 375 × 667, yaklaşık 335 px kaydırma | İyileştirilmeli | Metin yukarı kaçarken yemekler ile galeri aynı zonda kesişiyor; geçişin alt kısmında boşluk ve ritim kırılması oluşuyor. |
| 390 × 844 standart telefon, ilk açılış | Geçti | En dengeli mevcut görünüm. Sabit rezervasyon barı görünür ve görsel taşma yok. |
| 390 × 844, yaklaşık 380 px kaydırma | İyileştirilmeli | Başlık görünür alanı terk etmişken pano ve tabaklar birlikte baskın kalıyor. Hero ile hikâye bölümü arasındaki anlatı sırası belirsizleşiyor. |
| 430 × 932 geniş telefon, ilk açılış | Geçti | Kompozisyon nefes alıyor, yemeklerin ölçeği daha doğal. |
| Tarayıcı konsolu | Geçti | İncelenen mobil turda hata/uyarı bulunmadı. |
| Yatay taşma | Geçti | Test edilen 375, 390 ve 430 px genişliklerinde yatay sayfa taşması saptanmadı. |
| Kod kalitesi / üretim derlemesi | İyileştirilmeli | Lint temiz. Üretim derlemesi `next/font/google` çözümleme hatası ile duruyor; ayrıca hero CSS’i çok fazla üst üste yazılmış kural içeriyor. |

### Testten görülen güçlü noktalar

- Logo, başlık ve ürünlerin ilişkisi 390–430 px’te ilk saniyede anlaşılabiliyor.
- Kesit ürün görselleri gerçek fotoğraf tabanlı; yapay ikon hissi yok.
- Sabit alt aksiyon barı rezervasyon davranışını görünür tutuyor.
- `prefers-reduced-motion` ve `useReducedMotion` için bir temel mevcut.

### Testten görülen zayıf noktalar

- Hero içinde doğrudan bir aksiyon yok; dönüşüm tamamen alttaki sabit çubuğa bırakılmış.
- Kaydırma senaryosunda başlık, yemek sahnesi ve galeri aynı anda sahne almaya devam ediyor.
- Hero birincil hikâyeyi bitirmeden galeri başlıyor; bu yüzden galeri “sonraki bölüm” değil, sahnenin gürültüsü gibi davranıyor.
- 375 px kısa ekranda ilk karedeki bilgi yoğunluğu sınırda; daha fazla obje eklemek bu sınırı aşar.

---

## Kod incelemesi

### Sağlam temeller

- `src/app/components/van-hero-parallax.tsx` bileşeni, mobil/masaüstü ayrımı, kaydırma MotionValue’ları ve azaltılmış hareket tercihi açısından iyi bir başlangıç sunuyor.
- Yemekler veri dizisinde tanımlı; sahne yeniden kurgulanabilir.
- Yemek görselleri küçük ve makul boyutlu WebP dosyaları. Yeni görsel üretmeden bile güçlü bir ikinci versiyon yapılabilir.
- Aynı bileşen hem mobil hem masaüstü için farklı hız/mesafe kullanıyor.

### Kritik teknik borç

`src/app/globals.css` 23.195 satır ve yaklaşık 2.498 adet `!important` içeriyor. Aynı `.hero.hero-parallax-dining` seçicisi dokuz kez, `@media (max-width: 680px)` bloğu yirmi bir kez tanımlanmış. Bu, hareketi iyileştirmeyi riskli hale getiriyor: yeni bir küçük karar, çok daha aşağıdaki bir kural tarafından sessizce geçersiz kılınabiliyor.

Özellikle mobile ait hero değerleri farklı bloklarda tekrar tekrar yazılıyor: hero yüksekliği, kopya konumu, yemek sahnesi yüksekliği, galeri konumu ve her ürünün koordinatı. Bu yüzden mevcut haliyle “dinamikliği artırmak” yerine CSS birleştirilmeden eklenen her hareket kırılgan olacaktır.

### Yükleme ve performans riski

- İlk hero sahnesinde 12 adet uçan yemek görseli DOM’da bulunuyor.
- Beş yemek görseli `priority` ile önden yükleniyor.
- Mobilde galeri satırlarından üç görsel daha önden yükleniyor.
- Aynı anda Motion, filtre, iki gölge katmanı, çok sayıda kaydırma transformu ve fotoğraf kartı hesaplanıyor.

Bu, iyi bir cihazda hoş görünür; orta sınıf Android cihazlarda ilk açılışın ve kaydırmanın ağırlaşma riski vardır. Premium hissin yolu daha fazla GPU yükü değil; **görünen anda az ama etkili hareket** kullanmaktır.

---

## Tasarım yönü: Sofranın Uyanışı

### Sahne fikri

Ziyaretçi ilk anda “bir kahvaltı görseli” değil, masanın kurulma anını görür. Başlık sabit bir metin kutusu değil, masanın üzerine basılmış zarif bir isim levhası gibi davranır. Ürünler ekrana rastgele saçılmaz; bir sofra ritmiyle yerlerini bulur. Kaydırınca bu sofra fiziksel mekânın fotoğraflarına dönüşür.

Bu yönün üç kelimesi:

- **Törensel:** aceleci değil; her obje bir sebep ile gelir.
- **Dokunsal:** bakır, çay buharı, ahşap, keten ve masa ağırlığı hissedilir.
- **Canlı:** telefon eldeyken küçük bir yön/parmak tepkisi verir; ama oyunlaştırılmış görünmez.

### Görsel karar

Mevcut açık kâğıt zemini tamamen bırakmak gerekmiyor. Fakat tekdüze bej, hero’nun olağanüstü anını biraz düzleştiriyor. Arka planda sadece %10–15 oranında koyu bir “Beyoğlu gölgesi” kullanılmalı:

- üstte çok hafif tarihi orman yeşili;
- merkeze doğru sıcak bronz ışık;
- alt geçişte açık kâğıt/sofra tonu.

Bu, sahneye derinlik verir; gastronomik klişe olan kırmızı-altın şatafatına düşmeden markanın tarihini taşır. Ana ürünlerin doğal renkleri hep lider kalır.

---

## Önerilen mobil koreografi

İlk 1,6 saniye bir gösteri değil, net bir ritüel olmalı. İçerik animasyon beklemeden okunabilir kalmalıdır.

| Zaman | Olay | Amaç |
|---|---|---|
| 0–120 ms | Zemin, logo ve hafif gölge görünür. | Kullanıcı nerede olduğunu anlar. |
| 120–420 ms | “Beyoğlu Taksim” etiketi ve iki satırlı marka adı yerleşir. | İsim, görselden önce netleşir. |
| 300–700 ms | Çay bardağı, peynir tabağı ve zeytin yavaşça kendi eksenine oturur. | Sofra çağrışımı kurulur. |
| 520–950 ms | Bakır sahandaki sucuklu yumurta merkezde çok küçük bir derinlik dönüşüyle gelir. | Tek bir kahraman obje yaratılır. |
| 800–1.150 ms | Simit ve yeşillik sahneyi dengeler; en fazla 6–7 obje görünür. | Görsel hiyerarşi korunur. |
| 1.150–1.600 ms | “Bugün masanı ayırt” aksiyonu görünür. | Hareket, rezervasyon niyetiyle sonuçlanır. |

### Sahnede kalacak ürünler

İlk ekranda 12 obje yerine 7 obje kullanılmalı:

- bakır sahandaki sucuklu yumurta (merkez/kahraman),
- çay bardağı (dikey karşıtlık),
- peynir tabağı,
- simit,
- yeşillik,
- küçük zeytin ya da reçel kasesi,
- tek bir nane yaprağı.

Domates, ikinci reçel, tahin-pekmez, ikinci küçük kase ve benzeri ayrıntılar ilk yükte yok olmalı. Bunlar kaydırmanın ikinci anında veya kullanıcı uzun süre sahnede kalırsa görünebilir. Böylece “uçan kahvaltılıklar” azalmaz; **sahne sahne açılır**.

### Metinle ürünlerin ilişkisi

Başlığın altındaki açıklama şu an faydalı ama uzun. İlk ekranda iki satırlık daha keskin bir metin kullanılmalı:

> 1978’den beri Beyoğlu’nda kurulan gerçek Van sofrası.

Malzeme listesi, kaydırma sonrası ince bir şerit veya ikinci bir metin katmanı olarak gösterilebilir. Böylece ilk ekran marka + duygu + aksiyon, ikinci an ise iştah + detay verir.

---

## Kaydırma hikâyesi

Mevcut çözümde yemekler büyürken galeri de sahnede kalıyor. Yeni akışta bu iki hareket birbirini takip etmeli:

1. **0–25% kaydırma — Masa yaklaşır:** başlık %85 opaklığını korur; merkezdeki sahan hafifçe büyür. Fotoğraf şeridi görünmez.
2. **25–55% — Sofra açılır:** küçük ürünler kenarlara sakin biçimde çekilir; tek cümlelik menü detayları birer kısa etiket olarak belirir.
3. **55–78% — Mekâna geçiş:** ürünlerin gölgeleri fotoğraf kartlarının koyu kenarlarına karışır; fotoğraf şeridi ilk kez alttan gelir. Başlık tamamen çıkar.
4. **78–100% — Gerçek yer:** uçan ürünler tamamen kaybolur, fotoğraflar sabitlenir ve “1978 / Beyoğlu’nda aile sofrası” hikâye bölümü başlar.

Mobilde toplam hero yüksekliği 155–175 svh bandında tutulmalı. Mevcut 224vw yaklaşımı cihazdan cihaza farklı bir süre üretir; kısa telefonda gereğinden uzun, uzun telefonda ise galeriyi ilk ekrana fazla yaklaştırır.

---

## Mikro etkileşimler: sıradışı ama kaliteli

### 1. Sofra nefesi

Sadece çay, nane ve buhar hissi çok yavaş hareket eder. Tabakların tamamı aynı anda yüzmez. Bu, “havada asılı PNG’ler” hissi yerine gerçek masanın canlılığı hissini verir.

### 2. Parmağı takip eden masa eğimi

Telefon ekranında kullanıcı hero üzerinde parmağını çok hafif sürüklediğinde tüm sahne en fazla 2–3 derece eğilir. Merkezdeki sahan en yakında, çay orta mesafede, arka ışık en uzakta kalır. Hareket bırakılınca 600–800 ms’de sakin şekilde merkezine döner.

Bu, cihaz yön sensörü izni gerektirmez; `pointermove`/touch yönü yeterlidir. İzin istemeyen hareket daha güvenilir ve daha az rahatsız edicidir.

### 3. Buhar izi

Çayın üzerinde yalnızca iki çok hafif, geniş ve düşük opaklıklı buhar eğrisi kullanılabilir. Bu CSS ile yapılacaksa agresif doku/çizgi yerine maskeli, bulanık iki katman olmalı. Performans düşükse tamamen devreden çıkmalıdır.

### 4. Rezervasyonun sahneye katılması

Mobil alt çubuk hero içindeyken ikinci bir bağımsız CTA gibi hissettirmemeli. Hero açılışı tamamlanınca, başlığın altına tek aksiyon yerleşsin: **“Bugünün masalarını gör”**. Tıklama rezervasyon penceresini açabilir. Kullanıcı kaydırmaya başladığında bu aksiyon kaybolur ve sabit alt bar görevi devralır.

### 5. Haptik destek (opsiyonel)

Destekleyen cihazlarda ana CTA’ya basıldığında çok kısa `navigator.vibrate(8)` kullanılabilir. Bu özellik zorunlu olmamalı ve yalnızca kullanıcı açıkça dokunduğunda çalışmalıdır.

---

## Uygulama mimarisi

### 1. Hero için tek bir sahiplik alanı oluşturun

`globals.css` içindeki hero tekrarları yeni bir yerde arttırılmamalı. Hero stilleri ayrı, bileşene yakın bir dosyaya alınmalı (ör. `van-hero-parallax.module.css` veya tek bir kontrollü `hero-mobile.css`). Mobil için tek bir breakpoint bloğu ve tek bir kaynak doğruluk noktası olmalı.

### 2. Sahne verisini katmanlara ayırın

Her ürün için yalnızca `className` yerine şu bilgiler tanımlanmalı:

- `layer`: foreground / hero / ambient;
- `mobileVisible`: true/false;
- `entryDelay`, `idleDrift`, `scrollExit`;
- `initialPriority`;
- `mobilePosition`.

Bu, CSS’in yüzlerce koordinat kuralı yerine bileşen verisiyle yönetilmesini sağlar.

### 3. Mobil ve masaüstünü aynı koreografiye zorlamayın

Masaüstü kaydırma galerisi ve fareye göre 3D dönüş iyi bir fikir. Mobilde ise bir ana sahne + kontrollü geçiş daha güçlü olur. Mobil için ayrı bir `MobileHeroScene` alt bileşeni oluşturmak, mevcut bileşeni çok sayıda `isMobile ? ...` dalından kurtarır.

### 4. Görsel yükleme bütçesi koyun

- İlk ekranda yalnızca 5–7 sahne görselini yükleyin.
- İlk fotoğraf şeridi için iki görsel yeterli; gerisi `loading="lazy"` kalsın.
- Görünmeyen ürünleri DOM’da tutmak yerine kaydırma eşiğinde ekleyin ya da sadece CSS ile gizlemeyin.
- `saveData`, düşük cihaz belleği ve reduced motion durumlarında ikinci katmanları tamamen kapatın.

### 5. Hareket bütçesi tanımlayın

- Aynı anda en fazla üç sürekli hareket: çay/buhar, tek nane, çok hafif ortam ışığı.
- Kaydırma sırasında `transform` ve `opacity` dışındaki değerleri hareket ettirmeyin.
- Blur sadece girişte kısa süreli kullanılmalı; sürekli büyük `filter: blur()` mobil GPU’da pahalıdır.
- Tüm başlangıç metni JavaScript/animasyon çalışmasa da görünür kalmalıdır.

### 6. Azaltılmış hareket ve erişilebilirlik

Azaltılmış harekette ürünler sabit düzenle görünmeli; giriş sıralaması, 3D eğim, buhar ve kaydırma büyütmesi devre dışı kalmalı. Kullanıcı yine aynı başlığı, aynı görsel hiyerarşiyi ve aynı rezervasyon yolunu görmelidir.

---

## Önceliklendirilmiş iş planı

### Faz 1 — Sağlam zemin (önce yapılmalı)

1. Hero ile ilgili tekrar eden CSS bloklarını tek dosyada birleştirin.
2. Mobil hero yüksekliğini sabit piksel/`vw` karması yerine anlamlı bir `svh` aralığına taşıyın.
3. İlk ekranda görünen objeleri yediye indirin; sekiz yüksek öncelikli görsel yüklemeyi en fazla dört veya beşe düşürün.
4. Hero içine tek, net bir rezervasyon aksiyonu ekleyin; scroll sonrası alt bar devralsın.

### Faz 2 — Yeni koreografi

1. `MobileHeroScene` oluşturun.
2. Beş aşamalı giriş sekansını uygulayın.
3. Galeriyi kaydırmanın ikinci yarısına taşıyın; ürünler çıkmadan galeri başlamasın.
4. Dokunmaya bağlı 2–3 derecelik sahne eğimini ekleyin.

### Faz 3 — İmza detaylar ve ölçüm

1. Çay buharı ve tek nane yaprağı için çok düşük enerjili ambient hareket ekleyin.
2. Düşük güçlü cihazlar / `saveData` için sade varyantı test edin.
3. Gerçek mobil cihazlarda 375×667, 390×844, 430×932, 768×1024 ve masaüstü 1280×800 test turu yapın.
4. Web Vitals ile LCP, INP ve uzun görevleri kontrol edin; hero nedeniyle rezervasyon akışının yavaşlamadığını doğrulayın.

---

## Kaçınılması gerekenler

- Her ürüne aynı yüzen animasyonu vermek.
- Yeni bir gradient, parıltı, kart veya yazı efekti ekleyerek problemi örtmek.
- İlk ekrana 12–15 ürün, iki CTA ve galeri yerleştirmek.
- Telefon yön sensörü için açılışta izin istemek.
- Daha fazla `!important` ile mobile rötuş yapmak.
- Hero metnini yalnızca animasyon bitince görünür kılmak.

## Başarı ölçütü

Yeni hero şu üç testi geçerse hedefe ulaşmış sayılmalı:

1. Bir ziyaretçi 1 saniye içinde **mekânın adını, Van kahvaltısı sunduğunu ve rezervasyon yolunu** anlar.
2. Bir ziyaretçi 3 saniye içinde sahnenin sıradan stok görsel olmadığını hisseder.
3. İlk kaydırmada ürün, metin ve galeri birbirini kapatmaz; hikâye doğal biçimde gerçek mekâna akar.

Bu revizyonun doğru tonu “daha çok animasyon” değil: **daha az obje, daha iyi zamanlama, daha güçlü sahne yönetimi** olmalı.
