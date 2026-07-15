# SEO ve GEO operasyon planı

Son teknik revizyon: 15 Temmuz 2026

Bu belge, `van kahvaltıcısı` ve ilgili yerel niyetli aramalarda görünürlüğü artırmak için kod dışındaki çalışmayı tarif eder. Google'da birinci sıra garanti edilemez; yerel sonuçlar alaka düzeyi, arayan kişinin mesafesi ve işletmenin bilinirliğine göre değişir.

## Canlı teknik durum

- Sitemap yalnız iki indekslenebilir kanonik dil URL'sini (`/` ve `/en`) içerir; eski/yönlendirilen URL'ler sitemap'e alınmaz.
- Türkçe ve İngilizce sayfalar self-canonical kullanır; karşılıklı `tr`, `en` ve `x-default` hreflang hem HTML'de hem sitemap'te bulunur.
- Sitemap kayıtlarında gerçek içerik revizyonunu gösteren `lastmod` ve sayfalarda kullanılan özgün işletme görselleri bulunur.
- Kanonik sayfalardaki dahili bağlantılar yönlendirme zinciri oluşturmadan doğrudan `200` dönen hedeflere gider.
- Taksim, Beyoğlu, İstanbul ve Van kahvaltısı odaklı bilinen eski URL'ler tek adımda ana sayfaya; eski İngilizce URL'ler `/en` sayfasına kalıcı yönlenir.
- Kaldırılan `/menu`, `/iletisim`, `/sss` ve `/kafka-cafe` sayfalarının gerçek içeriği Türkçe ana sayfaya taşındı; URL'ler en yakın ana sayfa bölümüne kalıcı yönlenir.
- Her iki kanonik sayfada `WebSite`, `WebPage`, `Restaurant`, görünür menüyle eşleşen `Menu` ve görünür sorularla eşleşen `FAQPage` şeması bulunur.
- İngilizce `/en` sayfası turistler için menü, fiyat, konum, metro tarifi, saat, rezervasyon ve SSS içeren gerçek bir dil sürümüdür; doorway sayfası değildir.
- `robots.txt`, Googlebot ve AI arama botlarının kanonik sayfalara erişmesine izin verir ve kanonik sitemap adresini bildirir.
- Derleme sırasında canonical, hreflang, title, description, H1, JSON-LD, sitemap, görsel sitemap, `lastmod`, robots, yönlendirme, 404 ve dahili bağlantı sözleşmeleri otomatik test edilir.

## Önce doğrulanacak işletme gerçekleri

- Google Haritalar sonucunda görünen ad `Tarihi Van Kahvaltı Evi 1978`; site şeması bu adla uyumlu hale getirildi. İşletme adına yeni anahtar kelime eklemeyin.
- Site ve şema çalışma saatini her gün `08:00–18:00` gösteriyor. İnceleme sırasında önbellekli Google sonucunda `06:30` açılış; doğrudan Google Maps kartında ise `23:00` kapanış bilgisi görüldü. İşletme sahibi Google Business Profile içinden gerçek saatleri doğrulamalı ve tüm kanalları aynı gün eşitlemeli.
- Site adresi `Zambak Sk. No:8, Şehit Muhtar Mahallesi, Beyoğlu, İstanbul 34435`. Google Business Profile, Instagram ve önemli dizinlerde yazım sırası dahil aynı NAP (ad, adres, telefon) kullanılmalı.
- Doğrudan Google Maps kaydının benzersiz CID'si `10380797280962926014` olarak doğrulandı. Bu kayıttaki pin (`41.0367655, 28.9829478`) site şemasına ve doğrudan yol tarifi bağlantısına eklendi.
- Fiyatlar değişebileceğinden ana sayfa ve İngilizce sürümdeki `450 TL` ve `180 TL` değerleri düzenli doğrulanmalı.

## Üçüncü taraf NAP ve kategori denetimi — 15 Temmuz 2026

Hedef sorgular için Restoranim.net, Menü Burada, Gezip Geliyorum, Tripadvisor, Reddit, MekanRadar, RenkMobil, Yandex Maps ve Google Maps sonuçları tarandı. Kodla değiştirilemeyen aşağıdaki kayıtlar işletme hesabından düzeltilmelidir:

1. Önbellekli Google arama sonucunda kategori `Cafe`, doğrudan Maps kartında `Kahvaltı` görünüyor. Gerçek ana faaliyet kahvaltıysa Google Business Profile'da mevcut en yakın `Kahvaltı restoranı / Breakfast restaurant` kategorisi birincil kategori olarak doğrulanmalı; `Cafe` yalnız gerçekten uygunsa ikincil kalmalı.
2. Google yüzeylerinde `06:30` açılış ve `23:00` kapanış bilgileri görülürken site `08:00–18:00` gösteriyor. Gerçek saat işletme sahibi tarafından doğrulanıp aynı gün site ve profil eşitlenmeli.
3. RenkMobil kaydı işletmeyi yanlış biçimde `24 saat açık` ve `34421` posta koduyla gösteriyor. Kayıt sahiplenilip saat ve posta kodu düzeltilmeli veya kaynağa düzeltme bildirilmeli.
4. Yandex Maps kaydı adresi `Zambak Sokak 10A` ve saatleri bilinmiyor olarak gösteriyor. İşletme kaydı sahiplenilip gerçek kapı numarası ve saat eklenmeli.
5. MekanRadar kaydında telefon doğru, posta kodu `34421`. İşletme sahibi gerçek posta kodunu doğruladıktan sonra kayıt siteyle eşitlenmeli.
6. Menü Burada'nın Taksim kahvaltıcı listesinde aynı sokaktaki başka işletmeler bulunurken Tarihi Van Kahvaltı Evi görünmüyor. Ücretsiz ve doğrulanmış işletme kaydı imkânı varsa gerçek NAP, resmi site ve menü URL'siyle eklenmeli; ücretli bağlantı paketi alınmamalı.
7. Restoranim.net Beyoğlu kahvaltıcı listesinde işletme görünmüyor. Gerçek işletme sahipliği doğrulanabiliyorsa resmi ad, adres, telefon, çalışma saati ve siteyle başvuru yapılmalı.

Kaynaklar:

- https://www.google.com/maps/search/Breakfast%20at%20Van%20Kahvalti%20Evi%20Istanbul
- https://www.google.com/maps?cid=10380797280962926014
- https://renkmobil.com/kahvalti/istanbul/tarihi-van-kahvalti-evi-1978/
- https://yandex.com/maps/org/tarihi_van_kahvalt_ve_arap_evi/237523878781/
- https://mekanradar.com/mekan/istanbul/beyoglu/tarihi-van-kahvalti-evi-1978
- https://menuburada.com/restoranlar/istanbul-taksim-kahvalti
- https://restoranim.net/istanbul/beyoglu/kahvaltici

## Google Business Profile çalışma listesi

1. Birincil kategoriyi gerçek ana faaliyete en yakın seçenek olarak doğrulayın; gereksiz kategori eklemeyin.
2. Web sitesi alanını kanonik `https://www.tarihivankahvaltievi.com/` olarak kaydedin; rezervasyon bağlantısını gerçek rezervasyon akışına yönlendirin.
3. Menü bağlantısını doğrudan `https://www.tarihivankahvaltievi.com/#menu` olarak kullanın.
4. Açılış, bayram ve özel gün saatlerini önceden güncelleyin.
5. Dış cephe, giriş, salon, serpme sofra, otlu peynir, murtuğa, kavut ve menü fotoğraflarını özgün ve güncel olarak yükleyin. Dosya adına anahtar kelime doldurmak yerine açıklayıcı metin kullanın.
6. Hizmet/ürün alanlarında yalnız gerçekten sunulan seçenekleri listeleyin. Site menüsüyle çelişen fiyat veya ürün bırakmayın.
7. Yeni yorumlara gerçek, kısa ve kişiye özel yanıt verin. Yorum karşılığında indirim sunmayın; çalışanlardan veya ilişkili kişilerden sahte yorum istemeyin.
8. Masa üzerindeki QR kartı ve ödeme sonrası mesajıyla gönüllü yorum bağlantısı sunun. Olumlu yorum seçerek yönlendirme yapmayın.

## İçerik ve otorite çalışması

- Yeni sayfa yalnız farklı ve gerçekten yararlı bir kullanıcı ihtiyacını karşılıyorsa açılmalı. Semt adını değiştirerek çoğaltılan kapı sayfaları oluşturulmamalı.
- Menü, fiyat, saat, telefon ve adres değişiklikleri önce sitede ve Google Business Profile'da aynı gün güncellenmeli.
- İstanbul/Beyoğlu gastronomi rehberleri, yerel basın, turizm kaynakları ve gerçek tedarikçi/etkinlik ortaklarından editoryal bağlantı hedeflenmeli. Ücretli bağlantı veya toplu dizin paketi satın alınmamalı.
- Marka hikâyesi için doğrulanabilir arşiv fotoğrafları, kurucu/aile bilgisi ve tarih kaynakları toplanırsa görünür yazar ve güncelleme tarihi olan özgün bir tarihçe hazırlanmalı. Doğrulanmadan Article şeması kullanılmamalı.
- Instagram profilindeki ad, biyografi, adres, telefon ve site bağlantısı Google Business Profile ile aynı olmalı.

## Ölçüm ve Search Console rutini

- Google Search Console'a `https://www.tarihivankahvaltievi.com/sitemap.xml` gönderin.
- Türkçe `/` ve İngilizce `/en` sayfalarını URL Denetleme ile birer kez kontrol edin ve gerekirse dizine ekleme isteği gönderin; tekrar tekrar istek göndermeyin.
- `/taksim-brunch-kahvalti`, `/taksim-kahvalti`, `/beyoglu-kahvalti`, `/van-kahvaltisi` ve diğer eski arama URL'lerinin Google yeniden taradıktan sonra ana sayfada birleştiğini kontrol edin.
- Haftalık sorgu görünümü: `van kahvaltıcısı`, `van kahvaltısı`, `beyoğlu kahvaltı`, `taksim kahvaltı`, `turkish breakfast istanbul`, `breakfast near taksim`, `van breakfast istanbul` ve marka sorguları. Tıklama, gösterim, CTR ve ortalama konumu sayfa bazında kaydedin.
- Google Business Profile performansında yol tarifi, arama ve web sitesi tıklamalarını aylık karşılaştırın.
- Core Web Vitals saha verisini 28 günlük dönemlerle izleyin. Tek bir laboratuvar testini sıralama sonucu gibi yorumlamayın.
- UTM kullanılacaksa yalnız Google Business Profile web sitesi bağlantısında tutarlı etiket kullanın; kanonik URL'yi değiştirmeyin.

## GEO / yapay zekâ arama görünürlüğü

- Ayrı bir “AI dosyası”, özel GEO şeması veya `llms.txt` sıralama şartı değildir. Botların erişebildiği görünür metin, güçlü iç bağlantılar, doğru yapılandırılmış veri ve güncel işletme profili esas alınır.
- İngilizce turist soruları için `/en` sayfasında kısa cevaplar, gerçek menü/fiyat, açık adres, doğrudan Maps kaydı ve Taksim metro tarifi görünür metin olarak sunulur.
- Sorulara kısa ve doğrudan cevap veren görünür SSS içeriği korunur. FAQ şeması semantik taşınabilirlik için mevcut olsa da Google, Mayıs 2026 itibarıyla FAQ zengin sonucunu Search'te göstermiyor; bir sıralama avantajı beklenmemeli.
- Şemadaki her işletme iddiası sayfada görünür veya işletme sahibi tarafından doğrulanabilir olmalı. Yapay yorum, puan, ödül, hizmet alanı veya `sameAs` eklenmemeli.

## Resmî kaynaklar

- Google yerel sıralama: https://support.google.com/business/answer/7091
- LocalBusiness verisi: https://developers.google.com/search/docs/appearance/structured-data/local-business
- AI özellikleri ve site görünürlüğü: https://developers.google.com/search/docs/appearance/ai-features
- Spam politikaları: https://developers.google.com/search/docs/essentials/spam-policies
- Başlık bağlantıları: https://developers.google.com/search/docs/appearance/title-link
- Sitemap `lastmod` doğruluğu: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
- Çok dilli site yönetimi: https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites
- FAQ sonucu değişikliği: https://developers.google.com/search/updates#removing-faq-rich-result
