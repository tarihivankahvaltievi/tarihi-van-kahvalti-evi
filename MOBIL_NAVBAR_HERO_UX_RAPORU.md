# Mobil Navbar + Hero UX/UI Denetimi

**Tarih:** 14 Temmuz 2026

**Kapsam:** Ana sayfa navbar, açılır mobil menü, hero ilk ekranı ve sabit hızlı işlem çubuğu

**Test genişlikleri:** 375 × 667, 375 × 812, 390 × 844, 430 × 932

## Yönetici özeti

Navbar ve hero tek tek güçlüydü; bütünlük problemi bileşen kalitesinden değil, aynı anda çok fazla görsel katmanın liderlik etmeye çalışmasından kaynaklanıyordu. İlk ekranda marka başlığı, 12 uçan yemek kesiti, iki sıralı fotoğraf mozaiği ve ayrı bir görsel dile sahip alt işlem çubuğu aynı ağırlıkta görünüyordu. Açılır menü ise dar bir yan panel olarak çalıştığı için başlığı kırpıyor, 375 px'te alt yarıda gereksiz boşluk bırakıyor ve tüm bağlantıları aynı seviyede gösteriyordu.

Uygulanan yön **“Kurulan sofra”**: yeni dekor eklemek yerine marka adı → tek cümlelik vaat → beş ürünlü sofra odağı → gerçek mekân fotoğrafları sırasını kurmak. Navbar, menü ve hızlı işlem çubuğu artık aynı bordo–pirinç–mürekkep sistemini kullanıyor.

## Denetim sonucu

| Alan | Önceki durum | Uygulanan çözüm | Sonuç |
|---|---|---|---|
| Hero odağı | Başlık, 12 ürün ve galeri aynı anda yarışıyordu | Mobil DOM beş ürüne indirildi; galeri aşağı taşındı | İlk bakışta tek odak ve daha net derinlik |
| Hero metni | Malzeme listesi mobilde uzun ve açıklayıcıydı | “1978'den beri Beyoğlu'nda kurulan gerçek Van sofrası.” | Marka vaadi iki satırda okunuyor |
| Mobil menü | Dar yan panel; “Menü” başlığı kırpılıyordu | Navbar altında tam genişlik, tek kolon menü | Başlık, satırlar ve rezervasyon alanı tek kompozisyon |
| Menü hiyerarşisi | Sekiz bağlantı eşit ağırlıktaydı | Birincil bağlantılar ve yardımcı bağlantılar ritimle ayrıldı | Tarama süresi kısaldı |
| Dokunma hedefleri | Menü butonu 42 px'ti | Menü butonu 46 × 46 px; menü satırları 55 px; CTA 44 px | Apple'ın 44 pt pratik ölçüsüne uygun |
| Alt işlem çubuğu | Açık, yuvarlak ve hero'dan kopuk “uygulama widget'ı” görünümü | Koyu mürekkep zemin, pirinç rezervasyon odağı, 12 px yarıçap | Navbar/hero ile aynı marka dili |
| Erişilebilir menü | Dialog adı yalnızca `aria-label` idi; ilk odak ilk linke gidiyordu | Görünür başlık `aria-labelledby` ile dialog adı oldu; ilk odak başlığa gider | Menünün bağlamı ekran okuyucuda daha anlaşılır |
| Klavye akışı | Focus trap ve Escape vardı | Korundu; kapanınca odak menü butonuna dönüyor | WAI-ARIA dialog davranışı doğrulandı |
| Hareket/perf | Mobilde 12 ürün DOM'da ve beş ürün yüksek öncelikliydi | Mobilde yalnızca beş ürün render ediliyor | Daha düşük görsel ve animasyon yükü |

## Uygulanan tasarım kararları

### 1. Bir sahne, bir cümle, bir kahraman ürün

Mobil hero artık restoran şablonu gibi büyük fotoğraf + iki CTA kullanmıyor. Mevcut özgün kesit görsel fikri korunurken sahan merkezde kahraman ürün oldu; çay, peynir, simit ve yeşillik çevresinde dengeli bir sofra kuruyor. Aynı anda görünen sürekli hareketli obje sayısı azaltıldı.

### 2. Fotoğraf mozaiği “kanıt” rolüne taşındı

Fotoğraf şeridi ilk mesajla yarışmak yerine hero'nun alt bölümünde beliriyor. Böylece kesit ürünler marka vaadini kuruyor, gerçek mekan fotoğrafları bu vaadi kanıtlıyor. Bu sıra “görsel efekt → başka efekt” hissini azaltıyor.

### 3. Menü bir yan çekmece değil, mobil sayfa katmanı

375 px genişlikte 310 px'lik yan panel hem metni sıkıştırıyor hem arka planda anlamsız bir şerit bırakıyordu. Menü navbar altında tam genişliğe alındı. 375 × 667 kısa ekranda panel içeriği kaydırma gerektirmeden sığıyor; daha uzun ekranlarda footer doğal olarak alt ritmi tamamlıyor.

### 4. Sabit işlem çubuğunda tek baskın eylem

WhatsApp ve Yol Tarifi ikincil, Rezervasyon birincil eylem olarak korunuyor. Üç hedef de 48 px yüksekliğinde; rezervasyon pirinç zeminle öne çıkıyor. Geniş gölge, cam efekti ve aşırı oval kapsül kaldırıldı.

## Erişilebilirlik ve araştırma dayanağı

- WCAG 2.2'nin hedef boyutu ölçütü, işaretçi hedefleri için en az 24 × 24 CSS px veya yeterli aralık ister. Bu çalışma kritik mobil hedeflerde daha güçlü 44–55 px aralığını kullandı: [W3C — Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum).
- Apple'ın erişilebilirlik rehberi iOS/iPadOS için 44 × 44 pt hedef ve kontroller arasında yeterli boşluk önerir: [Apple HIG — Accessibility](https://developer.apple.com/design/human-interface-guidelines/accessibility).
- Modal dialog açıldığında odağın dialog içine taşınması, Tab döngüsünün içeride kalması, Escape ile kapanması ve kapanınca tetikleyiciye dönmesi WAI-ARIA dialog örüntüsüyle uyumludur: [W3C APG — Modal Dialog Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/).
- Görünür odak göstergesi 2 CSS px çevre alanına denk gelecek biçimde ele alındı: [W3C — Focus Appearance](https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance).

## Doğrulama sonuçları

| Kontrol | Sonuç |
|---|---|
| 375 × 667 yatay taşma | Yok (`scrollWidth = 375`) |
| 375 × 667 menü taşması | Yok (`scrollHeight = clientHeight = 595`) |
| 390 × 844 menü hedefleri | Linkler 55 px, rezervasyon CTA 44 px |
| 430 × 932 hızlı işlem hedefleri | Üç hedef de 48 px |
| Menü butonu | 46 × 46 px |
| Mobil hero ürün sayısı | 12 → 5 |
| Dialog ilk odak | `#site-menu-title` |
| Escape sonrası odak | `.nav-menu-button` |
| Üretim derlemesi | Başarılı; 37/37 statik sayfa üretildi |
| ESLint | Hatasız |

## Değiştirilen dosyalar

- `src/app/components/van-hero-parallax.tsx`: mobil ürün bütçesi, kısa mobil metin, dekoratif sahnenin ekran okuyucudan gizlenmesi.
- `src/app/client-page.tsx`: görünür menü başlığıyla dialog adlandırma ve açılış odağı.
- `src/app/mobile-header-hero.css`: mobil navbar, menü, hero ve hızlı işlem çubuğunun tek yetkili düzen katmanı.
- `src/app/layout.tsx`: yeni mobil tasarım katmanının global CSS'ten sonra yüklenmesi.

## Kalan teknik borç

`globals.css` 29.055 satır ve 4.463 adet `!important` içeriyor. Bu çalışma mevcut görsel sistemi kırmamak için mobil navbar/hero kararlarını ayrı ve okunabilir bir dosyada topladı; ancak orta vadede legacy hero/navbar kurallarının silinip bu dosyanın CSS Module veya bileşen tabanlı tek kaynağa dönüştürülmesi önerilir. Bu, görsel kalite kadar bakım maliyeti ve regresyon riskini de azaltacaktır.

## Başarı ölçütü

Yeni mobil açılış şu sırayı kuruyor:

1. **Neredeyim?** Tarihi Van Kahvaltı Evi.
2. **Neden farklı?** 1978'den beri Beyoğlu'nda kurulan gerçek Van sofrası.
3. **Ne görmeliyim?** Beş parçalı, tek merkezli sofra sahnesi.
4. **Kanıt ne?** Gerçek mekan ve masa fotoğrafları.
5. **Ne yapabilirim?** 48 px hedefli Rezervasyon, WhatsApp ve Yol Tarifi.

Bu sıra navbar, hero ve aksiyon katmanlarını ayrı “güzel parçalar” olmaktan çıkarıp tek bir mobil marka anlatısına bağlıyor.
