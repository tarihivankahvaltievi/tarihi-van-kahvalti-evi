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
          Ana sayfa, menü, konum ve İngilizce ziyaretçi rehberi zorunlu olmayan reklam veya pazarlama çerezi
          yerleştirmez. Site, bir çerez onayı duvarı olmadan temel içerik ve iletişim bağlantılarına erişmenizi sağlar.
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
          engellenmesi yalnız yönetim panelinin çalışmasını etkiler. Siteye yeni bir ölçüm ya da pazarlama aracı
          eklenirse bu açıklama, araç kullanılmadan önce güncellenir.
        </p>
      </section>
      <section>
        <h2>Kişisel veriler</h2>
        <p>İletişim ve rezervasyon verileri hakkında <Link href="/gizlilik">Gizlilik Politikası</Link> sayfasını inceleyin.</p>
      </section>
    </LegalPageShell>
  );
}
