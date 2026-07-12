import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
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

const aboutStory = [
  {
    title: "Tarihi bina",
    text: "18. yüzyıl sonu Rum yapısının ahşap ve taş dokusunda, şehirden uzakta bir sofra.",
    note: "Zambak Sokak",
  },
  {
    title: "Aile emeği",
    text: "Üç kuşaktır reçelden sıcak sahana, her tabak aynı aile özeniyle hazırlanır.",
    note: "Aile işletmesi",
  },
  {
    title: "Van sofrası",
    text: "Otlu peynir, kete, kavut, murtuğa ve taze çay; Van'dan gelen asıl karakter.",
    note: "Serpme kahvaltı",
  },
];

export function HomeContent() {
  return (
    <>
      <VanHeroParallax />

      <div className="story-band">
        <article id="story" className="about-sofra about-sofra-authored" data-reveal>
          <div className="about-sofra-visual" data-reveal>
            <figure className="about-sofra-table" style={{ margin: 0 }}>
              <Image
                src="/images/breakfast-spread.jpg"
                alt="Tarihi Van Kahvaltı Evi kahvaltı sofrası"
                fill
                sizes="(max-width: 900px) 92vw, 560px"
                loading="lazy"
                unoptimized
              />
            </figure>
            <figure className="about-sofra-room" style={{ margin: 0 }}>
              <Image
                src="/images/interior-chair.jpg"
                alt="Tarihi Van Kahvaltı Evi iç mekan dokusu"
                fill
                sizes="(max-width: 900px) 34vw, 220px"
                loading="lazy"
              />
            </figure>
            <div className="about-sofra-mark" aria-hidden="true">
              <strong>1978</strong>
              <span>Beyoğlu&apos;nda aile sofrası</span>
            </div>
          </div>

          <div className="about-sofra-copy">
            <div className="about-sofra-heading">
              <div className="about-sofra-kicker" data-reveal>Hakkımızda</div>
              <span className="about-sofra-year" aria-hidden="true">1978 — Beyoğlu</span>
            </div>
            <h2 data-reveal aria-label="Van'dan gelen sofra, Beyoğlu'nda ağır ağır kurulur.">
              <span className="about-title-line">Van&apos;dan gelen sofra,</span>
              <span className="about-title-line about-title-line-accent">Beyoğlu&apos;nda ağır ağır kurulur.</span>
            </h2>
            <p className="about-sofra-lead" data-reveal>
              Van sofrasını, Beyoğlu&apos;nun tarihi Rum binasında 1978&apos;den beri ailece kuruyoruz.
            </p>
            <blockquote className="about-sofra-ritual" data-reveal>
              Sofra aceleye değil; çayın buharına ve masada uzayan muhabbete kurulur.
            </blockquote>

            <div className="about-sofra-story" aria-label="Tarihi Van Kahvaltı Evi hikayesi">
              {aboutStory.map((item, index) => (
                <article key={item.title} data-reveal>
                  <span><i aria-hidden="true">0{index + 1}</i>{item.note}</span>
                  <div>
                    <strong>{item.title}</strong>
                    <p>{item.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </article>
      </div>

      <section className="red-reviews" data-reveal>
        <h2>Misafirlerimizin yorumları</h2>
        <ReviewCarousel />
      </section>

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
