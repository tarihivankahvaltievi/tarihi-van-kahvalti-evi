import type { Metadata } from "next";
import Link from "next/link";
import { LegalPageShell } from "../../components/legal-page-shell";
import { privacyUrl } from "../../seo";

export const metadata: Metadata = {
  title: "Gizlilik Politikası",
  description: "Tarihi Van Kahvaltı Evi web sitesi ve iletişim kanalları için gizlilik açıklaması.",
  alternates: { canonical: privacyUrl },
};

export default function PrivacyPage() {
  return (
    <LegalPageShell eyebrow="Kişisel veriler" title="Gizlilik Politikası" lastUpdated="28 Eylül 2026">
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
          <li>Rezervasyon formuna yazdığınız ad, telefon, tarih, saat, kişi sayısı, hizmet tercihi ve isteğe bağlı not.</li>
          <li>Form gönderildiğinde rezervasyon talebinizi yönetmek ve size yanıt vermek için rezervasyon kaydında işlenen bilgiler.</li>
          <li>WhatsApp üzerinden sizin gönderdiğiniz tarih, saat, kişi sayısı, tercih ve isteğe bağlı not.</li>
          <li>Telefon veya e-posta yoluyla sizin paylaştığınız iletişim ve rezervasyon bilgileri.</li>
          <li>Sunucu güvenliği için hosting sağlayıcısının tutabileceği temel istek ve hata kayıtları.</li>
          <li>Google Analytics tarafından üretilen sayfa görüntüleme ve etkileşim ölçümleri.</li>
        </ul>
        <p>
          Formu gönderdiğinizde talebinizin bilgileri rezervasyon kaydına alınır ve WhatsApp&apos;ta size
          göndermeniz için bir mesaj taslağı açılır. Bu kayıt kesin masa onayı değildir; müsaitliği işletme
          WhatsApp üzerinden ayrıca teyit eder.
        </p>
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
