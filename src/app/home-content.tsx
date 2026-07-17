import { AboutStory } from "./components/about-story";
import { AnimatedFooter } from "./components/animated-footer";
import { BookingOpenButton } from "./components/booking-open-button";
import { DeferredGallery } from "./components/deferred-gallery";
import { FaqSection } from "./components/faq-section";
import { VanHeroParallax } from "./components/van-hero-parallax";

const gallery: [string, string][] = [
  ["/images/balcony-breakfast.webp", "Balkonda kahvaltı keyfi"],
  ["/images/sucuk-egg.webp", "Sıcak sahanda sucuklu yumurta"],
  ["/images/hands-table.webp", "Masada paylaşım anları"],
  ["/images/interior-chair.webp", "Tarihi Rum binası iç mekan dokusu"],
  ["/images/tea-service.webp", "Sınırsız taze demlenmiş çay servisi"],
  ["/images/breakfast-spread.webp", "Geleneksel serpme Van sofrası"],
  ["/images/historic-mirror.webp", "Tarihi ayna ve bina detayları"],
  ["/images/terrace-tea.webp", "Teras keyfi ve çay servisi"],
  ["/images/coffee-moment.webp", "Kafka Cafe kahve molası"],
  ["/images/street-table.webp", "Beyoğlu sokaklarında kahvaltı masası"],
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

        <DeferredGallery gallery={gallery} />
      </section>

      <FaqSection />

      </main>

      <AnimatedFooter />
    </>
  );
}
