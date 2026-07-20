import type { Metadata } from "next";
import Link from "next/link";
import { LegalPageShell } from "../components/legal-page-shell";
import { siteUrl } from "../seo";

const cookieUrl = `${siteUrl}/cerez-politikasi`;

export const metadata: Metadata = {
  title: "Çerez Politikası",
  description: "Tarihi Van Kahvaltı Evi web sitesinin çerez ve yerel depolama açıklaması.",
  alternates: { canonical: cookieUrl },
  robots: { index: false, follow: true },
};

export default function CookiePolicyPage() {
  return (
    <LegalPageShell eyebrow="Tarayıcı depolaması" title="Çerez Politikası">
      <section>
        <h2>Herkese açık site sayfaları</h2>
        <p>
          Ana sayfa, menü, konum ve İngilizce ziyaretçi rehberi temel içerik ve iletişim bağlantılarına analitik
          izni vermeden de erişmenizi sağlar. Site reklam veya pazarlama çerezi kullanmaz.
        </p>
      </section>
      <section>
        <h2>Google Analytics</h2>
        <p>
          Google etiketi, açık seçiminizden önce analitik depolama reddedilmiş şekilde çalışır ve izin durumunu
          çerezsiz sinyallerle iletebilir. Yalnız “Analitiğe izin ver” seçeneğini kullandığınızda hangi sayfaların
          ziyaret edildiği ve siteyle nasıl etkileşim kurulduğu hakkında toplu istatistikler üretmek için analitik
          depolama açılır. Reklam depolaması ve reklam kişiselleştirmesi her durumda kapalıdır. Tercihiniz
          tarayıcınızın yerel depolama alanında saklanır.
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
          engellenmesi yalnız yönetim panelinin çalışmasını etkiler. Analitik tercihinizi sıfırlamak için
          tarayıcınızın bu siteye ait yerel depolama verilerini silebilirsiniz; sonraki ziyaretinizde seçim yeniden sunulur.
        </p>
      </section>
      <section>
        <h2>Kişisel veriler</h2>
        <p>İletişim ve rezervasyon verileri hakkında <Link href="/gizlilik">Gizlilik Politikası</Link> sayfasını inceleyin.</p>
      </section>
    </LegalPageShell>
  );
}
