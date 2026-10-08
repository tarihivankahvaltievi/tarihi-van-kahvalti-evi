# AI gözlem paneli ve takip

Mevcut `ai-query-panel.json` protokolünü koruyan yeni şablon: `templates/ai-panel-baslangic-2026-10-08.csv`. 14 soru × 4 platform × 3 tekrar = 168 **planlı** hücre. Yeni şablonun bütün satırları not_run; eski cevaplar yeni ölçüm diye taşınmadı. Bu yayında 168 cevap deneyi yapılmadı.

Her hücre yeni sohbetle, protokoldeki aynı metinle çalıştırılmalı. Search modu, dil, konum, tarih, kaynak URL ve özel ham cevap kanıtı kaydedilmeli. Erişilemiyorsa unavailable ve gerçek nedeni; cevap varsa measured yazılmalı. Marka verilen sorular keşif oranına katılmamalı. Erişilmeyen/not_run hücreler sıfır başarı sayılmaz. Marka geçme ve doğru siteye kaynak bağlantısı ayrı sonuçtur. Cevapta bulunmayan adres/saat/fiyat alanı yanlış diye puanlanmaz. Bütün gözlem dosyalarını kamu reposuna koymayın.

GSC Aramada üretken yapay zekâ kontrolü 8 Ekim'de işletme hesabında incelendi: domain ayarını devralan **Dahil Et** seçiliydi. Menü Google'da mevcut, kullanıcı canonical'ı `/menu`, Google seçimi incelenen URL idi. Bu ayarlar görünürlük veya trafik garantisi değildir.

7 gün: yeni sürüm/crawl/menü fiyatı/form/etkinlik kontrolü, profil düzeltmeleri ve çekim planı.
28 tam gün: eşit dönemlerde sayfa+sorgu+cihaz CTR ve gerçek masa talebi karşılaştırması.
60 gün: yönlendiren otel/kaynak ve doğrulanmış ziyaret sonuçlarını değerlendirme.
90 gün: trafik, nitelikli talep ve ziyaret birlikte bütçe/içerik kararı.

Bu dosya bir takip planıdır; gelecekte otomatik çalışacak görev kurulmadı. Trafik artışı, AI kaynak oranı artışı veya saha Core Web Vitals başarısı bugün tamamlanmış sonuç olarak sunulmaz.
