import type { Metadata } from "next";
import Link from "next/link";
import { LegalPageShell } from "../components/legal-page-shell";
import { siteUrl } from "../seo";

const privacyUrl = `${siteUrl}/gizlilik`;

export const metadata: Metadata = {
  title: "Gizlilik Politikası",
  description: "Tarihi Van Kahvaltı Evi web sitesi ve iletişim kanalları için gizlilik açıklaması.",
  alternates: { canonical: privacyUrl },
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <LegalPageShell eyebrow="Kişisel veriler" title="Gizlilik Politikası">
      <section>
        <h2>Bu sayfanın kapsamı</h2>
        <p>
          Bu açıklama, Tarihi Van Kahvaltı Evi web sitesini ziyaret ettiğinizde ve telefon ya da WhatsApp
          üzerinden rezervasyon bilgisi talep ettiğinizde oluşabilecek veri işlemlerini açıklar.
        </p>
      </section>
      <section>
        <h2>Hangi bilgiler işlenebilir?</h2>
        <ul>
          <li>WhatsApp üzerinden sizin gönderdiğiniz tarih, saat, kişi sayısı, tercih ve isteğe bağlı not.</li>
          <li>Telefon veya e-posta yoluyla sizin paylaştığınız iletişim ve rezervasyon bilgileri.</li>
          <li>Sunucu güvenliği için hosting sağlayıcısının tutabileceği temel istek ve hata kayıtları.</li>
          <li>Google Analytics tarafından üretilen sayfa görüntüleme ve etkileşim ölçümleri.</li>
        </ul>
        <p>Site üzerindeki rezervasyon formu bilgileri kendi sunucumuza kaydetmez; gönderim düğmesi WhatsApp&apos;ta sizin onaylayacağınız bir mesaj hazırlar.</p>
      </section>
      <section>
        <h2>Üçüncü taraf hizmetleri</h2>
        <p>
          Site kullanım istatistikleri için Google Analytics 4 kullanılır. Google sinyalleri ve reklam
          kişiselleştirmesi kapalıdır. Google Haritalar,
          Instagram ve WhatsApp bağlantılarını açtığınızda ilgili hizmetin kendi gizlilik koşulları geçerlidir.
          Harita, siz “Haritayı yükle” seçeneğini kullanmadan üçüncü taraf harita dosyalarını indirmez.
        </p>
      </section>
      <section>
        <h2>Saklama, güvenlik ve talepler</h2>
        <p>
          İletişim kayıtları rezervasyonu yürütmek, talebinizi yanıtlamak ve yasal yükümlülükleri yerine getirmek
          için gereken süreyle sınırlı tutulur. Size ait bir iletişim kaydı hakkında bilgi veya silme talebi için
          sayfanın altındaki e-posta ya da telefon kanalını kullanabilirsiniz.
        </p>
      </section>
      <section>
        <h2>Çerezler</h2>
        <p>Herkese açık sayfalardaki çerez kullanımı hakkında ayrıntı için <Link href="/cerez-politikasi">Çerez Politikası</Link> sayfasını inceleyin.</p>
      </section>
    </LegalPageShell>
  );
}
