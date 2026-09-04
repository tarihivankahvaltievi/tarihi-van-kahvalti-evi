import { AboutStory } from "./components/about-story";
import { AtmosphereBanner } from "./components/atmosphere-banner";
import { SignatureShowcase } from "./components/signature-showcase";
import { VenueAtmosphere } from "./components/venue-atmosphere";
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
        {/* Hero Section */}
        <VanHeroParallax locale={locale} />

        {/* Section 1: About & Heritage (Hamour Section 1) */}
        <AboutStory locale={locale} />

        {/* Section 2: Atmosphere Transition Banner (Hamour Section 2) */}
        <AtmosphereBanner locale={locale} />

        {/* Section 3: Signature Lezzetler Showcase Tabs (Hamour Section 3) */}
        <SignatureShowcase locale={locale} />

        {/* Section 4: Historic Venue & Hospitality (Hamour Section 4) */}
        <VenueAtmosphere locale={locale} />

        {/* Section 5: Curated Visual Moments / Gallery */}
        <section id="gallery" className="gallery-section">
          <div className="gallery-head">
            <h2>
              {messages.gallery.title}{" "}<span>{messages.gallery.titleAccent}</span>
            </h2>
            <BookingOpenButton className="order-button" icon="camera">
              {messages.gallery.booking}
            </BookingOpenButton>
          </div>

          <GalleryLightbox gallery={gallery} locale={locale} />
        </section>

        {/* Section 6: Guest Registry / Reviews */}
        <GuestReviews locale={locale} />

        {/* Section 7: Concierge FAQ */}
        <FaqSection locale={locale} />
      </main>

      {/* Section 8: Grand Hamour-Style Prestigious Footer */}
      <AnimatedFooter locale={locale} />
    </>
  );
}
