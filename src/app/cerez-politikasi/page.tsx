import type { Metadata } from "next";
import Link from "next/link";
import { LegalPageShell } from "../components/legal-page-shell";
import { cookiePolicyUrl } from "../seo";

export const metadata: Metadata = {
  title: "Çerez Politikası",
  description: "Tarihi Van Kahvaltı Evi web sitesinin çerez ve yerel depolama açıklaması.",
  alternates: { canonical: cookiePolicyUrl },
};

export default function CookiePolicyPage() {
  return (
    <LegalPageShell eyebrow="Tarayıcı depolaması" title="Çerez Politikası">
      <section>
        <h2>Herkese açık site sayfaları</h2>
        <p>
          Ana sayfa, menü, konum ve İngilizce ziyaretçi rehberi site kullanımını ölçmek için analitik çerezler
          kullanır. Site reklam veya kişiselleştirilmiş pazarlama çerezi kullanmaz.
        </p>
      </section>
      <section>
        <h2>Google Analytics</h2>
        <p>
          Hangi sayfaların ziyaret edildiği ve siteyle nasıl etkileşim kurulduğu hakkında toplu istatistikler
          üretmek için Google Analytics 4 kullanılır. Google Analytics, ziyaret ve oturumları ayırt etmek için
          tarayıcınıza <code>_ga</code> ile başlayan analitik çerezler yerleştirebilir. Google sinyalleri ve reklam
          kişiselleştirmesi kapalıdır.
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
