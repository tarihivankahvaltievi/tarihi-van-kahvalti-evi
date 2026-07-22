import { AboutStory } from "./components/about-story";
import { AnimatedFooter } from "./components/animated-footer";
import { BookingOpenButton } from "./components/booking-open-button";
import { FaqSection } from "./components/faq-section";
import { GalleryLightbox } from "./components/gallery-lightbox";
import { GuestReviews } from "./components/guest-reviews";
import { VanHeroParallax } from "./components/van-hero-parallax";
import { messagesFor, type SiteLocale } from "./home-localization";

export function HomeContent({ locale = "tr" }: { locale?: SiteLocale }) {
  const messages = messagesFor(locale);
  const gallery = messages.gallery.images;

  return (
    <>
      <main id="main-content" lang={messages.documentLanguage}>
      <VanHeroParallax locale={locale} />

      <AboutStory locale={locale} />

      <GuestReviews locale={locale} />

      <section id="gallery" className="gallery-section">
        <div className="gallery-head">
          <h2>
            {messages.gallery.title} <span>{messages.gallery.titleAccent}</span>
          </h2>
          <BookingOpenButton className="order-button" icon="camera">
            {messages.gallery.booking}
          </BookingOpenButton>
        </div>

        <GalleryLightbox gallery={gallery} locale={locale} />
      </section>

      <FaqSection locale={locale} />

      </main>

      <AnimatedFooter locale={locale} />
    </>
  );
}
