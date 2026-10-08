# Mobil performans kaydı — 8 Ekim 2026

Lighthouse 12.8.2, masaüstü Chrome headless, üretim build'i, aynı bilgisayar/loopback sunucu, varsayılan mobil simüle yavaşlatma. Her koşul üç ayrı tarayıcı çalıştırmasıdır. Next image sunucu önbelleği yeniden build'ler arasında kalabilir; ilk görsel üretim süresi ve süreç yükü sonuçları etkiler. Ham JSON'lar özel çalışma çıktısında tutulur. Production ağ/CDN, kullanıcı izni sonrası Google etiketleri ve saha CrUX ile aynı koşul değildir.

| Koşul | Çalıştırma | Performance | LCP ms | FCP ms | TBT ms |
| --- | ---: | ---: | ---: | ---: | ---: |
| Önce ana sayfa | 1 | 70 | 6453 | 3332 | 46 |
| Önce ana sayfa | 2 | 68 | 6414 | 3926 | 14 |
| Önce ana sayfa | 3 | 68 | 6386 | 3921 | 5 |
| Önce ana sayfa medyan | 3 | 68 | 6414 | 3921 | 14 |
| Sonra ana sayfa | 1 | 77 | 6393 | 1509 | 16 |
| Sonra ana sayfa | 2 | 68 | 6329 | 3919 | 14 |
| Sonra ana sayfa | 3 | 68 | 6352 | 3920 | 40 |
| Sonra ana sayfa medyan | 3 | 68 | 6352 | 3919 | 16 |
| Sonra menü | 1 | 69 | 8145 | 3167 | 32 |
| Sonra menü | 2 | 81 | 4679 | 2267 | 30 |
| Sonra menü | 3 | 73 | 5759 | 3024 | 27 |
| Sonra menü medyan | 3 | 73 | 5759 | 3024 | 30 |

Ana sayfa LCP medyanı 6,414 → 6,352 saniye; yaklaşık %1 fark, ölçüm değişkenliği içinde. Medyan skor 68 → 68. Bu sonuç belirgin hız artışı veya 2,5 saniye LCP başarısı kanıtlamıyor. Menü için eş koşullu önce ölçümü alınmadı; önce/sonra artış iddiası yapılmaz.

Kesin değişiklikler: dekoratif footer PNG 198.357 → WebP 5.618 bayt (%97,2 küçülme); hero/banner görsel kalite 84 → 75; aynı balkon görselini tekrar kullanan atmosfer bölümü de aynı kaliteyi kullanır. İlk görünür hero katmanı mevcut son CSS kuralında zaten opacity:1/animation:none idi; buna hayalî bir animasyon sorunu atfedilmedi. Boşta will-change katmanı kaldırıldı.

Ana LCP öğesi hero fotoğrafı. İlk HTML'de keşfediliyor, eager ve fetchpriority=high mevcut. Son laboratuvar kaydında gerçek yükleme ve çizim süreleri ile Lighthouse'ın simüle render delay değerleri farklıdır; birini diğerinin saha süresi diye sunmayın. Font/CSS yükü sonraki inceleme alanıdır: marka NOCTADO/Causten ile editoryal Bodoni/Literata/Commissioner aileleri birlikte isteniyor. Bu yayında editoryal fontları topluca değiştirmedik; bütün diller/ekranlar ve gerçek production ağında ayrı ölçülmeli.

Kabul kontrolü: TR/EN menü ve rehber 390 px mobil /1280 px masaüstünde taşmıyor; karşılaştırma içerik bağlantısı gerçek ürün anchor'ına gidiyor; ürün penceresi ve masa talebi geçişi çalışıyor. Yeni fiyat dahil ürünleri izole admin değişimiyle doğrulandı. Saha LCP p75 ≤2,5s, INP ≤200ms, CLS ≤0,1 hedefine ulaşıldığı henüz söylenemez. Sonraki aynı koşullu production/saha ölçümü gerekir.

Ölçüm sırasında erken ara build'de soğuk görsel üretimiyle LCP 9,131s gözlendi; final tablosuna farklı kod varyantı karıştırılmadı, bu gözlem gizlenmedi. Final ev/menü ölçümü ziyaret ölçüm kodunu içerir; daha sonraki metin düzeltmeleri aynı görsel/performance yapısını korur.
