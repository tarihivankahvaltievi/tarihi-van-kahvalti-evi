# Google Search Console kurulumu

## Bu site için hazır doğrulama

Google'ın verdiği HTML dosyası ve HTML meta etiketi projeye kalıcı olarak eklenmiştir. Yeni dağıtım canlıya geçtiğinde Search Console'daki **HTML dosyası** veya **HTML etiketi** bölümünden doğrudan **Doğrula** düğmesine basabilirsiniz.

- Doğrulama dosyası: `https://www.tarihivankahvaltievi.com/google2920058c70b54fb8.html`
- Meta etiketi: ana sayfanın `<head>` bölümünde `google-site-verification` olarak yayınlanır.

Doğrulama başarılı olduktan sonra bu dosya ve etiket kaldırılmamalıdır.

## Önerilen yöntem: Alan adı + DNS

1. [Google Search Console](https://search.google.com/search-console/) sayfasını açın ve işletmenin Google hesabıyla giriş yapın.
2. **Mülk ekle** seçeneğine basın.
3. Soldaki **Alan adı** kutusuna yalnız `tarihivankahvaltievi.com` yazın. `https://`, `www` veya `/` eklemeyin.
4. Google'ın verdiği `google-site-verification=...` değerini kopyalayın.
5. Alan adını satın aldığınız firmanın DNS yönetimine girin ve yeni bir **TXT** kaydı ekleyin:
   - Tür: `TXT`
   - Ad / Host: `@` (panel boş bırakmanızı söylüyorsa boş bırakın)
   - Değer: Google'ın verdiği `google-site-verification=...` metninin tamamı
   - TTL: Otomatik veya varsayılan
6. Kaydedin. Search Console'a dönüp **Doğrula** düğmesine basın. Hemen bulunmazsa DNS yayılımı için bekleyip yeniden deneyin.
7. Doğrulama başarılı olduktan sonra TXT kaydını silmeyin; Google sahipliği yeniden kontrol edebilir.

Bu yöntem hem `www` hem www'siz alan adını ve tüm `http/https` çeşitlerini tek mülkte toplar.

## Sitemap gönderme

1. Search Console'da `tarihivankahvaltievi.com` mülkünü seçin.
2. Sol menüden **Site Haritaları** bölümünü açın.
3. **Yeni bir site haritası ekleyin** alanına `sitemap.xml` yazın ve **Gönder** düğmesine basın.
4. Durumun **Başarılı** olmasını bekleyin. Google'ın verileri göstermesi birkaç gün sürebilir.

Canlı adresler:

- `https://www.tarihivankahvaltievi.com/sitemap.xml`
- `https://www.tarihivankahvaltievi.com/robots.txt`

## İlk indeks kontrolü

Üstteki **URL denetleme** kutusunda aşağıdaki adresleri sırayla kontrol edin:

1. `https://www.tarihivankahvaltievi.com/`
2. `https://www.tarihivankahvaltievi.com/menu`
3. `https://www.tarihivankahvaltievi.com/van-kahvaltisi`
4. `https://www.tarihivankahvaltievi.com/van-kahvaltisi-nedir`
5. `https://www.tarihivankahvaltievi.com/hikayemiz`
6. `https://www.tarihivankahvaltievi.com/konum`
7. `https://www.tarihivankahvaltievi.com/en`
8. `https://www.tarihivankahvaltievi.com/en/menu`

Bir sayfa Google'da yoksa bir kez **Dizine eklenmesini iste** seçeneğini kullanın. Aynı isteği sık sık tekrarlamayın.

## Alternatif yöntem: HTML etiketi

DNS yönetimine erişiminiz yoksa Search Console'da **URL ön eki** mülkü oluşturun:

Bu proje için verilen etiket zaten kodda yer aldığı için dağıtım sonrasında aşağıdaki elle kurulum adımlarını tekrarlamanız gerekmez. Bu bölüm ileride doğrulama kodu değiştirilirse kullanılabilir.

1. Mülk adresi olarak tam `https://www.tarihivankahvaltievi.com/` değerini girin.
2. **HTML etiketi** yöntemini açın.
3. Google'ın verdiği etikette yalnız `content="..."` içindeki değeri kopyalayın.
4. Hosting panelinde `GOOGLE_SITE_VERIFICATION` adlı ortam değişkeni oluşturup bu değeri yapıştırın.
5. Siteyi yeniden dağıtın.
6. Ana sayfanın kaynak kodunda `google-site-verification` etiketinin göründüğünü kontrol edip Search Console'da **Doğrula** düğmesine basın.
7. Doğrulama sonrasında ortam değişkenini veya etiketi kaldırmayın.

Örnek: Google `<meta name="google-site-verification" content="abc123" />` verdiyse değişkenin değeri yalnız `abc123` olmalıdır.

## Düzenli takip

- İlk hafta **Sayfa dizine ekleme** ve **Site haritaları** bölümlerindeki hataları kontrol edin.
- Sonraki haftalarda **Performans > Arama sonuçları** bölümünde tıklama, gösterim, sorgu ve sayfaları izleyin.
- Ana sayfa/İngilizce rehber ile Türkçe/İngilizce menü çiftlerinde Google'ın doğru canonical ve hreflang sayfasını seçtiğini URL Denetleme ekranından kontrol edin.
- Menü, adres veya çalışma saatleri değiştiğinde siteyi güncelleyin; sitemap otomatik olarak aynı adreste kalır.
