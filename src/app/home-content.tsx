import { AboutStory } from "./components/about-story";
import { AtmosphereBanner } from "./components/atmosphere-banner";
import { SignatureShowcase } from "./components/signature-showcase";
import { VenueAtmosphere } from "./components/venue-atmosphere";
import { AnimatedFooter } from "./components/animated-footer";
import { FaqSection } from "./components/faq-section";
import { VanHeroParallax } from "./components/van-hero-parallax";
import { messagesFor, type SiteLocale } from "./home-localization";

export function HomeContent({ locale = "tr" }: { locale?: SiteLocale }) {
  const messages = messagesFor(locale);

  return (
    <>
      <main id="main-content" lang={messages.documentLanguage}>
        {/* Accessible SEO keywords */}
        {locale === "en" ? (
          <span className="sr-only">
            Traditional Turkish breakfast in Taksim Beyoğlu. Authentic Van breakfast experience and live menu.
          </span>
        ) : (
          <span className="sr-only">
            Tarihi Van Kahvaltı Evi Beyoğlu Zambak Sokak Taksim geleneksel serpme kahvaltı
          </span>
        )}

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

        {/* SEO Required FAQ & Gallery hooks */}
        <div className="gallery-section" style={{ display: "none" }} aria-hidden="true" />
        <FaqSection locale={locale} />
      </main>

      {/* Footer (Hamour Footer) */}
      <AnimatedFooter locale={locale} />
    </>
  );
}
