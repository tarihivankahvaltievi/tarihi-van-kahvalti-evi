# Design QA — Hamour referanslı menü sayfası

## Karşılaştırma hedefi

- Kaynak görsel gerçekliği: `https://www.hamour.com.tr/tr/menumuz` canlı sayfası ve kullanıcı tarafından sağlanan dört mobil ekran görüntüsü.
- Ana kaynak görüntüsü: `/tmp/tarihi-van-menu-source-top.png` (814 × 1706 px, yaklaşık 2× yoğunluk).
- Ürün listesi kaynak görüntüsü: `/tmp/tarihi-van-menu-source-items.png` (816 × 1722 px, yaklaşık 2× yoğunluk).
- Uygulama: `http://127.0.0.1:3000/menu`.
- Ana uygulama görüntüsü: `/tmp/tarihi-van-menu-implementation-top.png` (390 × 844 px, 1× yoğunluk).
- Ürün listesi uygulama görüntüsü: `/tmp/tarihi-van-menu-implementation-items.png` (390 × 844 px, 1× yoğunluk).
- CSS görünümü: 390 × 844 px. Kaynak mobil görüntüler 2× yoğunluktan 390 × 844 karşılaştırma alanına ölçeklenip üstten hizalandı; uygulama görüntüleri doğal 1× yoğunlukta yakalandı.
- Durumlar: mobil ilk görünüm, kategori filtresi, ürün listesi, “murtuğa” araması, ürün detay paneli ve mobil navigasyon.

## Tam görünüm karşılaştırma kanıtı

Kaynak ve uygulama ilk görünümü aynı 390 × 844 alan içinde yan yana incelendi. Her iki tasarım da koyu bordo üst navigasyon, yemek fotoğrafı liderliğinde açılış, krem içerik yüzeyi, serif başlık hiyerarşisi ve kategori geçişini koruyor. Hamour logosu, fotoğrafları ve metinleri bilinçli olarak Tarihi Van Kahvaltı Evi logosu, kendi kahvaltı fotoğrafları ve gerçek menü içeriğiyle değiştirildi.

## Odaklı bölge karşılaştırma kanıtı

Ürün listesi ayrıca kullanıcı ekran görüntüsü ile uygulamanın “Kahvaltı” filtresi yan yana karşılaştırıldı. Kaynaktaki küçük ürün görseli + başlık + açıklama ritmi, uygulamada gerçek ürün fotoğrafı bulunan her satıra kompakt görsel eklenerek yaklaştırıldı. Görseli bulunmayan ürünlerde boş yer tutucu kullanılmadı; okunaklı metin satırı korundu.

## Gerekli doğruluk yüzeyleri

- Yazı ve tipografi: geçti. NOCTADO gösterim fontu kaynak sayfanın zarif serif karakterini karşılıyor; Causten gövde metni, fiyat ve kontrol etiketlerinde okunaklı. Başlıklar 390 px genişlikte taşmıyor.
- Boşluk ve düzen ritmi: geçti. Büyük fotoğraflı açılış, yatay kategori şeridi, krem menü yüzeyi, bölüm ayırımları ve kapanış görseli aynı editoryal ritmi sürdürüyor. 420 px altındaki ürün görseli/başlık çakışması düzeltildi.
- Renkler ve görsel belirteçler: geçti. Bordo, sıcak krem, altın ve koyu kahverengi palet kaynak yapıya sadık; aktif kategori, fiyat ve ana eylemler yeterli kontrasta sahip.
- Görsel kalite ve varlık doğruluğu: geçti. Logo ve yemek fotoğrafları proje içindeki Tarihi Van Kahvaltı Evi varlıklarından geliyor; Hamour varlıkları son kullanıcı sayfasında kullanılmıyor ve dış kaynağa hotlink yapılmıyor. 70 ürün yerel görselle gösteriliyor, diğerleri metin tabanlı kalıyor.
- Metin ve içerik: geçti. 18 gerçek kategori, 142 gerçek ürün, güncel fiyatlar, ürün açıklamaları, alerjen/tedarik notları ve Türkçe/İngilizce rota içeriği korunuyor.

## Etkileşim ve tarayıcı doğrulaması

- “Kahvaltı” filtresi 27 ürünü doğru gösterdi.
- “murtuğa” araması iki doğru sonuç döndürdü ve temizleme kontrolü çalıştı.
- Ürün ayrıntı paneli mobilde açıldı, içerik ve fotoğraf doğru yüklendi, `Escape` ile kapandı.
- Mobil navigasyon açılıp kapandı; rota ve WhatsApp rezervasyon bağlantıları görünür kaldı.
- 390 × 844 ve 1440 × 960 görünümleri tarayıcıda incelendi.
- Son tarayıcı konsolu kontrolünde hata bulunmadı.
- `npm run lint` ve `npm run build` başarılı.

## Karşılaştırma geçmişi

1. İlk odaklı karşılaştırmada yalnızca bölümün ilk ürünü görselle gösteriliyordu. Bu, kaynak ritmine ve “kendi fotoğraflarımızı kullan” hedefine göre P2 olarak değerlendirildi.
2. Gerçek yerel fotoğrafı olan tüm ürünler için 68–72 px kompakt görsel satırı eklendi; bölümün ilk ürünü 102–146 px öne çıkan görsel olarak korundu.
3. İlk düzeltme sonrası 390 px görünümde normal ürün görseli 102 px'e çıkıp metin sütunuyla çakışıyordu. 420 px medya kuralı ayrıştırıldı; normal görsel 68 px, öne çıkan görsel 102 px yapıldı.
4. Son görüntü `/tmp/tarihi-van-menu-implementation-items.png` üzerinde başlık, fiyat, açıklama ve görsellerin çakışmadan hizalandığı doğrulandı.

## Bulgular

Eyleme dönük P0, P1 veya P2 bulgusu kalmadı. Kaynaktan kalan farklar marka sahipliği ve içerik gereği bilinçli: Hamour’a ait logo, ürün adları, fotoğraflar ve metinler kullanılmadı.

## Uygulama kontrol listesi

- [x] Kaynak sayfa masaüstü ve mobilde incelendi
- [x] Tarihi Van logo, fotoğraf ve ürün verileri kullanıldı
- [x] Kategori filtreleri, arama ve ürün detayı çalışıyor
- [x] Mobil ve masaüstü düzen doğrulandı
- [x] Ürün fotoğraflı satırlar ve metin-only geri dönüşü doğrulandı
- [x] Mobil navigasyon ve klavye kapatma davranışı doğrulandı
- [x] Lint, TypeScript ve üretim derlemesi geçti

## Takip cilası

Bloklayıcı olmayan P3 bulgusu kalmadı.

final result: passed

---

# Coffee page QA — 26 October 2026

## Visual source and evidence

- Layout source: `/Users/baran/Downloads/IMG_6349 2.jpg` (1179 × 1656), the user's photographed and annotated mobile web sketch.
- Background/art-direction source: `/Users/baran/Downloads/IMG_6345.jpg` (1160 × 1777), supplied Kroffee example. Used for pale architectural background and photographic floating objects, not its logo, typography or products.
- Implementation: `/taksim-kafe`, verified with the production build at `http://localhost:3001/taksim-kafe`.
- Full-page mobile evidence: `tmp/coffee-qa/mobile-final.png`, 393 CSS px wide, browser viewport 393 × 852, screenshot density 1×.
- Full-page desktop evidence: `tmp/coffee-qa/desktop-final.png`, 1280 CSS px wide, browser viewport 1280 × 900, density 1×.
- Focused evidence: `tmp/coffee-qa/mobile-story.png` (frames and background), `tmp/coffee-qa/desktop-hero.png` (cup, beans, title and navigation).
- Tablet evidence: `tmp/coffee-qa/tablet-final.png`, viewport 768 × 1024, density 1×.

The photographed sketch contains perspective, annotations and no exact CSS viewport, so pixel-exact overlay would be misleading. It is a structural source: header → centered cup/beans → title → curved transition → crest/text → two framed photographs → large venue photograph → existing footer. Source images and the rendered mobile full-page image were opened together in one visual comparison input; the frame and hero regions were then inspected separately. Existing NOCTADO/Causten fonts, crest, burgundy header, cream surface and footer are intentional identity preservation.

## Comparison history

1. The previous side-by-side hero, tabs and menu-list composition was rejected by the user. Removed it entirely and rebuilt the page to the supplied sketch.
2. [P2, image/content] First new version used a breakfast-table image and large promotional heading in the venue section. Replaced with the actual interior photo (`atmosphere-banner-bg.webp`), preserving the view of the room and keeping address/directions discreet at the bottom. Post-fix mobile and desktop full-page captures confirm the change.
3. [P2, desktop spacing] The lowest floating bean approached the first headline line. Moved its desktop baseline from -4% to 7% inside the visual scene. Recaptured `desktop-hero.png`; bean and headline no longer overlap.
4. [P1, HTML] Streaming fallback briefly duplicated the complete page's H1/main in raw HTML. Removed the duplicate fallback and used the documented route-level instant-navigation opt-out for the shared URL-dependent navigation. Production build remains static; browser confirms exactly one H1 and one main. The SEO inventory now includes the new route with zero FAQ items, plus valid sitemap lastmod/changefreq/priority.

## Required fidelity surfaces

- Typography: passed. Existing NOCTADO display and Causten body preserve the homepage identity. Mobile H1 wraps into the requested two lines without clipping; body copy and captions remain readable. No replacement font system introduced.
- Spacing/layout: passed. Centered coffee scene, copy below cup, crest-led middle section, side-by-side frames even on mobile, full-width room image and shared footer match the sketch's order. No horizontal document overflow at 393, 768 or 1280 CSS px.
- Colors/tokens: passed. Existing warm cream, burgundy and gold are retained. Pale taupe architecture follows the supplied reference. Text uses dark burgundy/brown; room caption has a restrained bottom scrim for contrast.
- Images/assets: passed. New cup, bean, engraved background and frame are optimized local WebP raster assets. Transparent cutouts were inspected; no visible opaque rectangles or broken images. Real venue and coffee photos are reused from the project. No substitute CSS drawings or handmade SVG illustrations.
- Copy/content: passed. Main heading is the user's requested “Tarihi atmosferde kahve keyfi.” Address, links and shared footer use existing business information. No invented ratings, seating conditions, coffee sourcing claims or prices.

## Interactions and technical checks

- Mobile menu opens, includes KAHVE, and closes when the link is selected.
- Discovery arrow scrolls to the story; final story top is approximately 90px below the viewport top.
- Coffee-menu link opens `/menu#sicak-kahveler`; target and Sıcak Kahveler heading verified.
- Directions points to the existing verified Google Maps business URL.
- Cup/beans respond to scroll through Motion values; short entrance animation completes in under 5 seconds. No perpetual animation. CSS and Motion both gate spatial animation for reduced-motion preferences. OS preference emulation was not available in this browser, so the reduced-motion branch was reviewed in source rather than claimed as an emulated visual test.
- Production browser error log: no errors.
- Production build, targeted ESLint and existing production site regression suite pass. The suite verifies Googlebot-readable HTML on 31 canonical pages, sitemap images, canonical/schema consistency and internal anchors.

## Open questions / follow-up polish

None blocking. Sketch-based comparison is structural, not a pixel-for-pixel reproduction of the photographed paper. The existing shared footer is intentionally preserved.

final result: passed

---

# Coffee refinement QA

## Target and evidence

The user requested a stronger, fuller refinement of the existing approved structure. The structural reference is the preceding implementation capture `tmp/coffee-qa/mobile-final.png` (393 × 2513, 1×), compared together with `tmp/coffee-qa/mobile-refined.png` (393 × 3468, 1×) in the same visual input. The original Downloads sketch is no longer available at its former path; this pass uses the existing implementation as the layout baseline rather than claiming a new pixel match to that photographed sketch.

Latest evidence: `tmp/coffee-qa/hero-refined.png` (1280 × 900 focused opening), `tmp/coffee-qa/desktop-refined.png` (1280px full page) and `tmp/coffee-qa/mobile-refined.png` (393px full page). Additional 320px viewport checks show document width exactly 320px, no overflowing page and no broken images. Full-page images have different heights because the user asked for more content; no height-normalized typography comparison was assumed.

## Intentional improvements

- Enlarged cup from 405px to 510px on desktop and 290px to 335px on mobile; redistributed beans to support the larger object. Static, restrained drop shadow adds product depth.
- Hero heading uses existing brand NOCTADO for the first line and the already loaded Bodoni Moda at weight 600 for the coffee emphasis. No new font download or palette introduced.
- Added useful menu and directions actions to the opening.
- Larger framed photographs now retain their deliberate angles on the inner image containers; the outer AOS scroll transform no longer overwrites the rotation. Their shadow is applied to the transparent frame asset, not to a rectangular card.
- Reduced architecture opacity so the real photographs lead.
- Added a burgundy coffee selection section linking directly to Turkish coffee, hot coffees and cold coffees in the existing menu. This is the deliberate new content requested in this iteration; the centered hero, crest, paired photographs, real venue photo and shared footer remain.
- Consolidated the CSS cascade and media-query overrides, and increased responsive image sizing for the larger cup.

## Fidelity and functional checks

Typography, spacing, palette, image quality and content were checked in the full mobile/desktop captures and the focused hero view. No headline/image collisions, clipped text or placeholder artwork remain. Existing brand assets and restaurant photography are reused. New coffee copy describes items already in the menu and makes no new sourcing or seating claims.

The Turkish coffee choice was clicked and reached `/menu#turk-kahvesi` with a real matching target. The existing production regression suite verifies all new menu section links, 31 canonical pages and 100 sitemap images. Targeted ESLint and production build pass. Production browser error log is empty. Reduced-motion gates remain in CSS and Motion; this pass does not claim OS-preference emulation.

No actionable P0/P1/P2 findings remain. Earlier sketch-based QA stays above as historical evidence; this pass intentionally adds the requested weight and coffee navigation.

final result: passed
