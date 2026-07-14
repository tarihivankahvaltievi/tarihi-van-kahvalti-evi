import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { AboutStory } from "./components/about-story";
import { AnimatedFooter } from "./components/animated-footer";
import { BookingOpenButton } from "./components/booking-open-button";
import { FaqSection } from "./components/faq-section";
import { GalleryLightbox } from "./components/gallery-lightbox";
import { ReviewCarousel } from "./components/review-carousel";
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
      <VanHeroParallax />

      <div className="story-reviews-flow">
        <AboutStory />

        <section className="red-reviews" aria-labelledby="reviews-heading">
          <p className="reviews-bridge">
            Sofrayı biz kuruyoruz; hikâyeyi misafirlerimiz tamamlıyor.
          </p>
          <h2
            id="reviews-heading"
            className="reviews-heading"
            data-reveal
            aria-label="Misafirlerimizin yorumları"
          >
            <span className="reviews-heading-line reviews-heading-line-primary" aria-hidden="true">
              Misafirlerimizin
            </span>
            <span className="reviews-heading-line reviews-heading-line-secondary" aria-hidden="true">
              yorumları
            </span>
            <span className="reviews-heading-rule" aria-hidden="true" />
          </h2>
          <ReviewCarousel />
        </section>
      </div>

      <section id="gallery" className="gallery-section">
        <div className="gallery-head" data-reveal>
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
              <strong>Tarihi Van Kahvaltı Evi</strong>, İstanbul Beyoğlu Taksim&apos;de {displayAddress} adresinde yer alan ve 1978&apos;den beri Van otlu peyniri, murtuğa, kavut ve sınırsız çay eşliğinde geleneksel <em>serpme Van kahvaltısı</em> sunan tarihi bir restorandır. Kahvaltı fiyatı kişi başı yaklaşık 450 TL&apos;dir.
            </span>
            <nav className="seo-inline-links" aria-label="Hızlı bağlantılar">
              <Link href="/menu">Menü ve fiyatlar</Link>
              <Link href="/van-kahvaltisi">Van kahvaltısı nedir?</Link>
              <Link href="/beyoglu-kahvalti">Beyoğlu kahvaltı</Link>
              <Link href="/taksim-kahvalti">Taksim kahvaltı</Link>
              <Link href="/istanbul-van-kahvaltisi">İstanbul Van kahvaltısı</Link>
              <Link href="/serpme-kahvalti-beyoglu">Serpme kahvaltı</Link>
              <Link href="/istiklal-caddesi-kahvalti">İstiklal kahvaltı</Link>
              <Link href="/zambak-sokak-kahvalti">Zambak Sokak</Link>
              <Link href="/siraselviler-kahvalti">Sıraselviler</Link>
              <Link href="/kahvalti-rezervasyon">Rezervasyon</Link>
              <Link href="/kafka-cafe">Kafka Cafe</Link>
            </nav>
          </div>
        </section>

        <section className="local-answer-panel" aria-labelledby="local-answer-heading" data-reveal>
          <div className="local-answer-head">
            <span className="local-answer-label">Yerel bilgi</span>
            <h2 id="local-answer-heading">Beyoğlu Taksim Van kahvaltısı için hızlı bilgiler</h2>
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

      <AnimatedFooter />
    </>
  );
}
