import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { AboutStory } from "./components/about-story";
import { AnimatedFooter } from "./components/animated-footer";
import { BookingOpenButton } from "./components/booking-open-button";
import { FaqSection } from "./components/faq-section";
import { GalleryLightbox } from "./components/gallery-lightbox";
import { VanHeroParallax } from "./components/van-hero-parallax";
import { displayAddress, localSeoFacts } from "./seo";

const gallery: [string, string][] = [
  ["/images/balcony-breakfast.jpg", "Balkonda kahvaltı keyfi"],
  ["/images/sucuk-egg.jpg", "Sıcak sahanda sucuklu yumurta"],
  ["/images/hands-table.jpg", "Masada paylaşım anları"],
  ["/images/interior-chair.jpg", "Tarihi Rum binası iç mekan dokusu"],
  ["/images/tea-service.jpg", "Sınırsız taze demlenmiş çay servisi"],
  ["/images/breakfast-spread.jpg", "Geleneksel serpme Van sofrası"],
  ["/images/historic-mirror.jpg", "Tarihi ayna ve bina detayları"],
  ["/images/terrace-tea.jpg", "Teras keyfi ve çay servisi"],
  ["/images/coffee-moment.jpg", "Kafka Cafe kahve molası"],
  ["/images/street-table.jpg", "Beyoğlu sokaklarında kahvaltı masası"],
];

export function HomeContent() {
  return (
    <>
      <main id="main-content">
      <VanHeroParallax />

      <AboutStory />

      <section id="gallery" className="gallery-section">
        <div className="gallery-head">
          <h2>
            Mekan <span>anları</span>
          </h2>
          <BookingOpenButton className="order-button" icon="camera">
            Rezervasyon al
          </BookingOpenButton>
        </div>

        <GalleryLightbox gallery={gallery} />
      </section>

      <FaqSection />

      <div className="bottom-info-band">
        <section
          className="bg-[var(--soft)] text-[var(--muted)] text-center text-xs sm:text-sm py-4 px-6 border-b border-[var(--line)]"
          aria-label="Tarihi Van Kahvaltı Evi Kısa Bilgi"
        >
          <div className="max-w-4xl mx-auto leading-relaxed">
            <span>
              <strong>Tarihi Van Kahvaltı Evi</strong>, {displayAddress} adresinde hizmet veren köklü bir <em>Van kahvaltıcısıdır</em>. Otlu peynir, murtuğa, kavut, sıcak bakır sahanlar ve sınırsız çayla kurulan serpme sofranın güncel menü ve fiyat bilgilerini ziyaret öncesi inceleyebilirsiniz.
            </span>
            <nav className="seo-inline-links" aria-label="Hızlı bağlantılar">
              <Link href="/menu">Menü ve fiyatlar</Link>
              <Link href="/van-kahvaltisi">Van kahvaltısı nedir?</Link>
              <Link href="/beyoglu-kahvalti">Beyoğlu kahvaltı</Link>
              <Link href="/iletisim">Konum ve rezervasyon</Link>
              <Link href="/kafka-cafe">Kafka Cafe</Link>
            </nav>
          </div>
        </section>

        <section className="local-answer-panel" aria-labelledby="local-answer-heading">
          <div className="local-answer-head">
            <span className="local-answer-label">Ziyaretinizi planlayın</span>
            <h2 id="local-answer-heading">Menüden yol tarifine, ihtiyacınız olan bilgiler</h2>
          </div>
          <div className="local-answer-grid">
            {localSeoFacts.map((fact) => (
              <article key={fact.label} className="local-answer-card">
                <h3>{fact.label}</h3>
                <p>{fact.value}</p>
                <Link href={fact.href} aria-label={`${fact.label} hakkında detay`}>
                  Detay <ChevronRight size={16} />
                </Link>
              </article>
            ))}
          </div>
        </section>


      </div>

      </main>

      <AnimatedFooter />
    </>
  );
}
