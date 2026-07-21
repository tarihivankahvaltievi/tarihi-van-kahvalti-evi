# Bing ve Yandex yerel görünürlük kurulumu

Bu site teknik olarak Bing ve Yandex taramasına açık, sitemap ve IndexNow için hazırdır. Bu işlemler indekslemeyi ve işletme bilgisinin anlaşılmasını kolaylaştırır; belirli bir sorguda birinci sıra garantisi vermez.

## Önce işletme gerçeğini doğrulayın

20 Temmuz 2026 tarihli canlı kontrolde iki kaynak birbiriyle çelişiyor:

- Site: `Zambak Sk. No:8`, her gün `08:00–18:00`
- Yandex Maps: `Zambak Street 10A`, çalışma saatleri bilinmiyor

Tabela, ruhsat veya işletme belgesine göre doğru kapı numarasını teyit etmeden bir tarafı diğerine kopyalamayın. Doğru bilgi belirlendiğinde site, Google Business Profile, Yandex Business, Bing Places ve sosyal profiller aynı gün güncellenmelidir.

## Yandex Business

1. [Mevcut Yandex Maps kaydını](https://yandex.com/maps/org/tarihi_van_kahvalt_ve_arap_evi/237523878781/) açın ve **Are you the owner? / Bu işletmenin sahibi misiniz?** bağlantısıyla sahipliği doğrulayın.
2. İşletme adını tabeladaki gerçek adla aynı tutun; ada `Beyoğlu kahvaltı` veya `Taksim kahvaltı` gibi anahtar kelime eklemeyin.
3. Doğru adresi, giriş pinini, telefonu, siteyi ve her gün için çalışma saatini girin.
4. Birincil kategoriyi gerçek ana faaliyete en yakın restoran/kahvaltı kategorisi olarak seçin. Yalnız gerçekten sunulan en fazla iki ek kategori kullanın.
5. Menü bağlantısını `https://www.tarihivankahvaltievi.com/menu`, İngilizce menüyü `https://www.tarihivankahvaltievi.com/en/menu` olarak ekleyin.
6. Dış cephe, giriş, salon, Van kahvaltısı sofrası, otlu peynir, murtuğa ve kavut için güncel özgün fotoğraflar yükleyin.
7. Gerçek müşteri yorumlarına kısa ve kişisel yanıt verin. Yorum karşılığı indirim/hediye veya sahte yorum kullanmayın.

## Yandex Webmaster

1. [Yandex Webmaster](https://webmaster.yandex.com/) hesabında tam kanonik adresi ekleyin: `https://www.tarihivankahvaltievi.com`.
2. Meta etiket doğrulamasını seçin. Verilen etikette yalnız `content="..."` içindeki değeri hosting panelinde `YANDEX_SITE_VERIFICATION` ortam değişkenine girin.
3. Siteyi yeniden dağıtın; ana sayfa kaynak kodunda `yandex-verification` etiketinin bulunduğunu kontrol edip doğrulamayı tamamlayın. Etiketi daha sonra kaldırmayın.
4. Sitemap bölümüne `https://www.tarihivankahvaltievi.com/sitemap.xml` adresini ekleyin.
5. Yeniden indeksleme bölümünde `/`, `/menu`, `/van-kahvaltisi`, `/van-kahvaltisi-nedir`, `/hikayemiz`, `/konum`, `/en` ve `/en/menu` adreslerini bir kez gönderin.
6. Site diagnostics, excluded pages ve search queries raporlarını haftalık kontrol edin.

## Bing Webmaster Tools ve Bing Places

1. [Bing Webmaster Tools](https://www.bing.com/webmasters/) içinde siteyi Google Search Console'dan içe aktarın veya `https://www.tarihivankahvaltievi.com` olarak ekleyin.
2. Meta etiket yönteminde verilen `msvalidate.01` etiketinin yalnız `content="..."` değerini hosting panelinde `BING_SITE_VERIFICATION` ortam değişkenine girin ve siteyi yeniden dağıtın.
3. `https://www.tarihivankahvaltievi.com/sitemap.xml` sitemap'ini gönderin; URL Inspection ile 13 kanonik sayfanın sitemap'ten keşfedildiğini kontrol edin.
4. [Bing Places for Business](https://www.bing.com/forbusiness/) içinde işletmeyi ad ve telefonla arayın. Varsa sahiplenin, yoksa tek bir kayıt açın.
5. Yandex bölümünde doğruladığınız aynı ad, adres, telefon, pin, çalışma saatleri, kategori, web sitesi ve menü adreslerini kullanın.
6. Bing Webmaster Tools içindeki **AI Performance** raporunda toplam citation, grounding sorguları ve sayfa bazlı citation aktivitesini aylık dışa aktarın. Bunlar sıralama değil, Bing/Copilot ve desteklenen partner yüzeylerinde kaynak kullanımı göstergeleridir.

## Her dağıtımdan sonra

Yeni veya gerçekten değişen kanonik sayfaları Bing ve Yandex'e bildirin:

```bash
npm run seo:indexnow
```

Önce yalnız payload'ı görmek için:

```bash
INDEXNOW_DRY_RUN=1 npm run seo:indexnow
```

IndexNow bildirimi hızlı tarama isteğidir; indeksleme veya sıralama garantisi değildir.

## Ölçülecek sorgular

Aylık karşılaştırmada cihaz ve ülke kırılımıyla şu sorgu kümelerini izleyin:

- `beyoğlu kahvaltı`, `beyoğlu kahvaltı mekanları`
- `taksim kahvaltı`, `taksim kahvaltı mekanları`
- `istiklal kahvaltı`, `istiklal caddesi kahvaltı`
- `istanbul kahvaltı`, `van kahvaltısı istanbul`
- `turkish breakfast istanbul`, `breakfast near taksim`, `traditional turkish breakfast`

Tek bir kişiselleştirilmiş arama ekranı yerine Bing Webmaster ve Yandex Webmaster'daki gösterim, tıklama, CTR ve ortalama konum verilerini karşılaştırın.
