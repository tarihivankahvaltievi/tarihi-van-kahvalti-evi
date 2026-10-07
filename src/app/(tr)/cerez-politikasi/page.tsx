import type { Metadata } from "next";
import Link from "next/link";
import { LegalPageShell } from "../../components/legal-page-shell";
import { cookiePolicyUrl } from "../../seo";

export const metadata: Metadata = {
  title: "Çerez Politikası",
  description: "Tarihi Van Kahvaltı Evi web sitesinin çerez ve yerel depolama açıklaması.",
  alternates: { canonical: cookiePolicyUrl },
};

export default function CookiePolicyPage() {
  return (
    <LegalPageShell eyebrow="Tarayıcı depolaması" title="Çerez Politikası" lastUpdated="2 Ekim 2026">
      <section>
        <h2>Herkese açık site sayfaları</h2>
        <p>
          Ana sayfa, menü, konum ve İngilizce ziyaretçi rehberi site kullanımını ölçmek için analitik çerezler
          kullanır. Google Ads etiketi telefon, yol tarifi, WhatsApp tıklamaları ve kaydedilen masa taleplerini ayrı dönüşüm eylemleri olarak ölçer. Reklam kişiselleştirme sinyallerinin gönderilmesi kodda kapalıdır.
        </p>
      </section>
      <section>
        <h2>Google Analytics</h2>
        <p>
          Hangi sayfaların ziyaret edildiği ve siteyle nasıl etkileşim kurulduğu hakkında toplu istatistikler
          üretmek için Google Analytics 4 kullanılır. Google Analytics, ziyaret ve oturumları ayırt etmek için
          tarayıcınıza <code>_ga</code> ile başlayan analitik çerezler yerleştirebilir. Google Ads dönüşüm ölçümü de çerez kullanabilir. Google sinyalleri ve reklam
          kişiselleştirme sinyalleri kodda kapalıdır. Reklamdan gelen ziyareti dönüşümle ilişkilendirmek için Google reklam tıklama kimlikleri (gclid, gbraid, wbraid, dclid) ölçüm adresinde korunur; diğer sorgu parametreleri ve adres parçaları temizlenir. Müşteri adı, telefon, rezervasyon tarihi ve notu analitik olay parametrelerine eklenmez. Özel yönetim ve rezervasyon takvimi sayfalarında site etiketleri başlatılmaz.
        </p>
      </section>
      <section>
        <h2>Yönetim oturumu</h2>
        <p>
          Halka açık olmayan yönetim paneline yetkili giriş yapıldığında, güvenli yönetim oturumunu sürdürmek için
          zorunlu ve yalnız sunucu tarafından okunabilen bir oturum çerezi kullanılır. Bu çerez site ziyaretçileri için oluşturulmaz.
        </p>
      </section>
      <section>
        <h2>Harita ve dış bağlantılar</h2>
        <p>
          Konum sayfasındaki etkileşimli harita siz yüklemeyi seçtiğinizde harita sağlayıcısından dosya alır.
          Google Haritalar, Instagram veya WhatsApp bağlantısına geçtiğinizde çerez ve veri işleme tercihleri ilgili hizmete aittir.
        </p>
      </section>
      <section>
        <h2>Tarayıcı ayarları ve değişiklikler</h2>
        <p>
          Tarayıcınızdan çerezleri görüntüleyebilir, silebilir veya engelleyebilirsiniz. Zorunlu yönetim çerezinin
          engellenmesi yalnız yönetim panelinin çalışmasını etkiler. Analitik çerezleri tarayıcı ayarlarınızdan
          engelleyebilir veya bu siteye ait çerezleri dilediğiniz zaman silebilirsiniz.
        </p>
      </section>
      <section>
        <h2>Kişisel veriler</h2>
        <p>İletişim ve rezervasyon verileri hakkında <Link href="/gizlilik">Gizlilik Politikası</Link> sayfasını inceleyin.</p>
      </section>
    </LegalPageShell>
  );
}
