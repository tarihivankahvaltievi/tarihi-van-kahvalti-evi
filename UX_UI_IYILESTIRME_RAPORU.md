# Tarihi Van Kahvaltı Evi — UX/UI İyileştirme Raporu

Tarih: 13 Temmuz 2026  
Kapsam: Ana sayfa, mobil/masaüstü navbar, hero, hakkımızda, yorumlar, galeri, SSS, alt bilgi ve sabit mobil eylem çubuğu.

## Yönetici özeti

Site; gerçek yemek fotoğrafları, 1978 mirası ve Van/Beyoğlu anlatısıyla ayırt edici bir marka temeline sahip. En güçlü tarafı fotoğraf yönetimi ve bordo–krem–Van mavisi birlikteliği. Temel sorun marka kimliği değil; mobilde dönüşüm eylemlerinin ilk ekranın dışında kalması, bazı dekorların içeriğin önüne geçmesi, uzun dikey ritim ve menü/galeri gibi yoğun alanlarda bilişsel yük.

Bu çalışma ile hero içine doğrudan “Masa ayırt” ve “Menüyü incele” eylemleri eklendi; konum yakınlığı görünür kılındı; yorum başlığı çakışması kaldırıldı; mobil menü sıkıştırıldı; galeri, SSS ve SEO bilgi alanlarının mobil yüksekliği azaltıldı; klavye odağı belirginleştirildi. Marka paleti korunurken renk rolleri netleştirildi.

## Öncelikli bulgular

### P0 — dönüşüm ve kullanılabilirlik

- İlk mobil ekranda rezervasyon yalnızca sabit alt çubuktaydı. Hero mesajından sonra doğal bir sonraki adım bulunmuyordu.
- Yorum başlığı üzerindeki bordo dekoratif çizgi metni kesiyor ve okunabilirliği bozuyordu.
- Mobil açılır menüde ikincil açıklamalar ve geniş satırlar ekranı gereğinden fazla kaplıyordu.
- Bazı etkileşimli öğelerde klavye odağı marka zeminleri üzerinde yeterince belirgin değildi.

### P1 — görsel hiyerarşi ve ritim

- Hero görsel olarak güçlü, ancak ziyaretçiye “şimdi ne yapmalıyım?” yanıtını geciktiriyordu.
- Galeride büyük başlık, rezervasyon düğmesi ve kayan fotoğraflar aynı anda dikkat istiyordu.
- SSS satırları mobilde büyük yazı ve uzun sorular nedeniyle gereğinden fazla yüksek görünüyordu.
- Alt SEO bağlantı bulutu mobilde birincil kullanıcı akışına hizmet etmeden sayfayı uzatıyordu.

### P2 — sistem tutarlılığı

- Kodda geçmiş tasarım denemelerinden kalan çok sayıda üst üste binen CSS otorite katmanı bulunuyor. Kısa vadede son otorite katmanı ile güvenli düzeltme yapıldı; orta vadede CSS modüllerine veya bileşen bazlı katmanlara ayrılmalı.
- Bordo, altın, Van mavisi, krem, koyu mürekkep ve fotoğraf renkleri birlikte kullanılabilir. “İkiden fazla renk” sorun değildir; sorun renklerin rolünün belirsiz olmasıdır.

## Renk değerlendirmesi

Önerilen rol dağılımı:

| Rol | Renk | Kullanım |
|---|---|---|
| Ana marka | Bordo `#70151c` | Rezervasyon, vurgu, aktif durum |
| Kimlik vurgusu | Van mavisi | Logo ve hero başlığında sınırlı vurgu |
| Destek | Altın | Fokus, küçük miras detayları, yıldızlar |
| Zemin | Kırık beyaz/krem | Okunabilir ana yüzey |
| Metin | Koyu mürekkep `#241718` | Başlık ve gövde metni |

Üç vurgu rengi aynı ağırlıkta kullanılmamalı. Bordo eylemi, Van mavisi kimliği, altın ise ayrıntıyı taşımalı. Böylece palet zengin kalırken arayüz gürültülü olmaz.

## Bölüm bazında öneriler

### Navbar ve mobil menü

- Masaüstü navigasyon dengeli; sabit yapısı yön bulmayı kolaylaştırıyor.
- Mobilde logo ve menü düğmesi korunmalı, menü satırları tek bakışta taranabilir kalmalı.
- Açık/kapalı durumu masaüstünde yararlı; mobilde alan darlığı nedeniyle gizlenmesi doğru.
- Uygulanan: mobil menü satırları 50 px civarına indirildi, ikincil meta metinleri mobilde kaldırıldı, panel dialog semantiği aldı.
- Sonraki adım: gerçek fokus kapanı ve açan düğmeye fokus iadesi eklenebilir.

### Hero

- Fotoğraf kolajı ve yüzen kahvaltılık kompozisyonu markaya özgü ve korunmalı.
- Başlık iki renkli kullanılabilir; metin ile fotoğraf arasında yeterli sakin alan bırakılmalı.
- Uygulanan: “Masa ayırt”, “Menüyü incele” ve “Taksim · 4 dk” eylem kümesi eklendi. Mobilde iki ana düğme yan yana, konum bilgisi ikinci satırda.
- Sabit alt çubuk hero CTA'nın yerine değil, sayfanın ilerleyen bölümünde devamlı erişim desteği olarak çalışıyor.

### Hakkımızda

- Fotoğraf çakıştırması, 1978 yılı ve bina hikayesi güven üretmede başarılı.
- Üç hikâye maddesi içerik olarak yerinde; mobilde sıra numaralarının dekor yerine gerçek bir anlatı sırası gibi okunmasına dikkat edilmeli.
- Metin satır uzunluğu masaüstünde yaklaşık 65–70 karakterle sınırlandırılmalı.

### Misafir yorumları

- Sosyal kanıt doğru konumda, ancak dekoratif çizgi başlığı kesiyordu.
- Uygulanan: başlık 9–12 karakterlik dengeli satıra alındı, çakışan pseudo-element'ler kaldırıldı, mobil sahne yüksekliği düşürüldü.
- Yorum ekleme özelliği şu an yalnızca istemci belleğinde çalışıyor; gerçek yayın algısı yaratmaması için ileride “Google'da yorum yap” bağlantısına dönüştürülmesi veya arka uç moderasyonu eklenmesi önerilir.

### Galeri

- Gerçek fotoğraf kullanımı en güçlü marka varlığıdır; kaldırılmamalı.
- Uygulanan: mobil üst/alt boşluklar azaltıldı, kart köşe yarıçapı 12 px'e çekildi, başlık ve CTA daha dengeli ölçeklendi.
- Sonraki adım: otomatik kayan üç satır yerine mobilde tek yatay seçki veya 2×3 düzen performans ve kontrol hissini artırabilir.

### SSS

- Sorular gerçek ziyaretçi niyetleriyle uyumlu; fiyat, ulaşım ve kişi sayısı soruları dönüşüme hizmet ediyor.
- Uygulanan: mobil satır yüksekliği ve tipografi sıkılaştırıldı; dokunma alanları erişilebilir boyutta tutuldu.
- Fiyat ve çalışma saatleri değişken veridir; tek kaynaktan yönetilmeli ve düzenli güncellenmelidir.

### Footer ve alt bilgi

- İletişim, telefon, WhatsApp, adres ve çalışma saatleri korunmalı.
- SEO amaçlı uzun bağlantı listesi masaüstünde yardımcı olabilir; mobilde kullanıcı görevini dağıtıyordu ve gizlendi.
- Footer görsel anlatımı performans açısından ağırlaşırsa WebGL/dekor katmanları kademeli olarak azaltılmalı; temel iletişim içeriği her koşulda görünür kalmalı.

## Erişilebilirlik ve teknik kalite

- Gövde metni için en az 4.5:1, büyük metin için 3:1 kontrast hedefi esas alındı.
- Önemli mobil kontroller 42–50 px yüksekliğinde tutuldu.
- Bağlantı, düğme, özet ve form kontrollerine belirgin altın fokus halkası eklendi.
- `prefers-reduced-motion` desteği korunuyor.
- 390×844 ve 1440×900 görünümde yatay taşma bulunmadığı doğrulandı.
- `npm run lint` ve `npm run build` başarılı.

## Ölçüm planı

Değişikliklerin etkisi şu olaylarla izlenmeli:

1. `hero_reservation_click`
2. `hero_menu_click`
3. `mobile_bar_reservation_click`
4. `whatsapp_click`
5. `directions_click`
6. `faq_open` (soru etiketiyle)
7. Hero → rezervasyon dönüşüm oranı ve cihaz kırılımı

İki hafta sonra hero CTA tıklama oranı, rezervasyon modalı tamamlama oranı ve mobil çıkış oranı birlikte değerlendirilmelidir.

## Kaynak ilkeleri

- WCAG 2.2 — Contrast Minimum: https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html
- WCAG 2.2 — Target Size Minimum: https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum
- WCAG 2.2 — Focus Appearance: https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance.html

## Uygulanan dosyalar

- `src/app/components/van-hero-parallax.tsx`
- `src/app/client-page.tsx`
- `src/app/globals.css`

