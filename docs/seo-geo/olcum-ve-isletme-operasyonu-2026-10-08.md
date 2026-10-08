# SEO/GEO ölçüm ve işletme operasyonu — 8 Ekim 2026

## Etkinlik sözlüğü

| Etkinlik | Gerçek tetikleyici | İş anlamı |
| --- | --- | --- |
| menu_click | Site içindeki TR/EN menü bağlantısına tıklama | Menüye geçiş; lead değildir |
| menu_compare_click | Karşılaştırmadaki bir ürünün içerik bağlantısı | Ürün karar adımı |
| menu_category_select | Etkileşimli menü kategorisi seçimi | Kategori ilgisi |
| menu_item_view | Ürün ayrıntı penceresinin açılması | Ürün ilgisi |
| booking_start | Site içindeki TR/EN masa talebi sayfasına geçiş | Form niyeti; kayıt değildir |
| generate_lead | Formun API üzerinden kalıcı olarak başarıyla kaydedilmesi | Yeni masa talebi; işletme onayı değildir |
| contact_click | Telefon, yol tarifi veya WhatsApp bağlantısı | İletişim niyeti; görüşme/mesaj/ziyaret kanıtı değildir |
| booking_whatsapp_handoff | Formdaki WhatsApp devri | Devir tıklaması; kaydedilmiş talep değildir |
| review_source_click | Dış yorum kaynağına geçiş | Güven etkileşimi |

GA4'te menü ve booking_start etkinliklerini işletme dönüşümü olarak işaretlemeyin. generate_lead için mevcut ayarı doğrulayın. Uygulama birim/entegrasyon testleri geçti; gerçek GA4 source/medium raporu ve doğal kaydedilmiş talep eşleşmesi ayrıca hesap içinde doğrulanmalıdır. Test amacıyla production'a sahte rezervasyon göndermeyin.

Etkinlikler yalnız izin verilen alanları taşır: locale, service_type, contact_method, method, surface, reservation_saved, item_id, category_id. Ad, telefon, e-posta, not, rezervasyon kimliği, ziyaret tarihi/saatini analitiğe göndermeyin. Yönetim ve kişisel takvim URL'leri ölçüm dışında kalır. Çerez tercihi mevcut izin akışına bağlıdır.

## Kaynak etiketleri

Kampanyaların source ve medium değerleri birlikte izin listesinde olmalıdır. Kodun kayıtlı sözlüğü `src/app/analytics-policy.ts` içindedir. Serbest utm_term ve bilinmeyen campaign/content değerleri atılır. Yeni etiket eklemek için sözlüğü ve PII testlerini güncelleyin; müşteri veya masa kimliğini UTM'ye koymayın. Site içi bağlantılara UTM eklemeyin.

Kullanıma hazır dış bağlantılar:

- GBP site: https://www.tarihivankahvaltievi.com/?utm_source=google&utm_medium=organic&utm_campaign=gbp&utm_content=website
- GBP menü: https://www.tarihivankahvaltievi.com/menu?utm_source=google&utm_medium=organic&utm_campaign=gbp&utm_content=menu
- Instagram bio: https://www.tarihivankahvaltievi.com/?utm_source=instagram&utm_medium=social&utm_campaign=instagram_bio&utm_content=bio
- Otel yönlendirmesi: https://www.tarihivankahvaltievi.com/en/menu?utm_source=hotel&utm_medium=referral&utm_campaign=hotel_referral&utm_content=menu

Temiz tarayıcı oturumunda yalnız bir kampanya linki açın; analitik izninden sonra doğru stream'de page_view ve session source/medium/campaign eşliğini doğrulayın. DebugView'da çift page_view olmadığını ve menü → ürün → booking_start sırasını kontrol edin. Gerçek doğal talep geldiğinde API kaydıyla generate_lead'i toplu olarak eşleyin. Sunucu tarafı ziyaret sonuçları GA4'e gönderilmez.

## Talep → onay → gerçek ziyaret

Yeni kayıtların kaynağı sunucu tarafından atanır: website veya staff. Kamu formu confirmed/source/attendance göndererek bu alanları taklit edemez. Yönetici onayı otomatik olarak 'geldi' sayılmaz.

İşletme panelinde yalnız onaylanmış, tarihi gelmiş bir kayda 'Geldi', 'Gelmedi' veya 'Henüz işaretlenmedi' girilebilir. Gelmedi için masa saati de geçmiş olmalıdır. İptal/bekleyen statüsüne dönüş ziyaret sonucunu temizler. Eski kayıtlar bilinmiyor olarak korunur. Kaydı gerçek ekip gözlemiyle işaretleyin; veri yoksa boş bırakın.

Panel toplamları bütün kayıtları kapsar; haftalık kohort filtresi değildir. `templates/ziyaret-sonuclari.csv` içine yalnız haftalık toplu sayılar girin. Masa sayısı ve kişi sayısını ayrı tutun. Onay/gelme oranlarını aynı ziyaret tarihi kohortundan hesaplayın; gelecekteki veya sonucu bilinmeyen kayıtları gelmedi saymayın. WhatsApp/telefon görüşmelerinden açılan staff kayıtları website toplamına eklenmez.

## Haftalık kontrol ve başlık testi

Her hafta aynı gün, son veri gecikmesi bitmiş tam haftayı alın. GSC Web, filtreler, ülke, cihaz, marka/markasız sorgu ve sayfayı kaydedin. GBP görüntüleme/yol tarifi/arama/website eylemlerini ve GA4 kullanıcı/oturum/lead değerlerini ayrı tutun; bu üç kaynak farklı tanımlara sahiptir, toplanmaz.

Başlık değişiminden sonraki ilk yeni crawl tarihini kaydedin. 28 tam gün sonra değişim öncesindeki eşit uzunlukta dönemle karşılaştırın. Menü ve ana sayfanın gösterim/CTR/tıklama/konumunu sorgu ve cihaz kırılımında okuyun. Tek genel CTR artışını nedensel başarı saymayın; marka karışımı, sıra, sezon ve reklam etkisini not edin. Google başlığı değiştirebilir.

Kullanılacak boş şablon: `templates/haftalik-olcum.csv`. Hesap dışa aktarımları ve dolu işletme ölçümleri özel depolamada kalmalıdır; bu kamu reposuna eklemeyin.
