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
import journey from "./components/home-journey.module.css";

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

        <section id="gallery" className={journey.gallery}>
          <div className={journey.galleryHead}>
            <h2>
              {messages.gallery.title}{" "}<span>{messages.gallery.titleAccent}</span>
            </h2>
            <BookingOpenButton className={journey.galleryBooking} icon="camera">
              {messages.gallery.booking}
            </BookingOpenButton>
          </div>

          <GalleryLightbox gallery={gallery} locale={locale} />
        </section>

        <GuestReviews locale={locale} />

        <FaqSection locale={locale} />
      </main>

      <AnimatedFooter locale={locale} />
    </>
  );
}
