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

export function HomeContent() {
  return (
    <>
      <VanHeroParallax />

      <div className="story-band">
        <div className="about-sofra-blobs" aria-hidden="true">
          <span className="blob blob-1" />
          <span className="blob blob-2" />
          <span className="blob blob-3" />
        </div>

        <article id="story" className="about-sofra" data-reveal>
          <div className="about-sofra-steam" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>

          <div className="about-sofra-visual" data-reveal>
            <figure className="about-sofra-table" style={{ margin: 0 }}>
              <Image
                src="/images/hero-parallax/overhead-feast.webp"
                alt="Tarihi Van Kahvaltı Evi kahvaltı sofrası"
                fill
                sizes="(max-width: 900px) 92vw, 560px"
                loading="lazy"
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
            <div className="about-sofra-kicker" data-reveal>Hakkımızda</div>
            <h2 data-reveal>Van&apos;dan gelen sofra, Beyoğlu&apos;nda ağır ağır kurulur.</h2>
            <p className="about-sofra-lead" data-reveal>
              Tarihi Van Kahvaltı Evi, Taksim&apos;in kalabalığı içinde Van kahvaltısının
              bereketini, tarihi Rum binasının sakin dokusuyla aynı masaya getirir.
            </p>

            <div className="about-sofra-story" aria-label="Tarihi Van Kahvaltı Evi hikayesi">
              <p data-reveal>
                <strong>Tarihi bina</strong>
                18. yüzyılın sonlarında inşa edilen yapının ahşap, taş ve motifli
                atmosferi kahvaltının temposunu yavaşlatır.
              </p>
              <p data-reveal>
                <strong>Aile emeği</strong>
                1978&apos;den beri süren yolculuk bugün üçüncü kuşakta aynı özenle devam
                eder; her servis aceleye değil sohbete yer açar.
              </p>
              <p data-reveal>
                <strong>Van sofrası</strong>
                Otlu peynir, bal kaymak, Van ketesi, sıcak sahanlar ve taze çay masaya
                tek tek gelir; mekanın ruhu sofranın içinde hissedilir.
              </p>
            </div>

            <div className="about-sofra-facts" data-reveal aria-label="Tarihi Van Kahvaltı Evi kısa bilgiler">
              <span>2. derece tarihi eser</span>
              <span>Üçüncü kuşak</span>
              <span>Kafka Cafe ile gün boyu</span>
            </div>
          </div>
        </article>
      </div>

      <section className="red-reviews" data-reveal>
        <h2>Misafirlerimizin söylediği şey basit: masa uzasın.</h2>
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
            <span className="light-pill">Yerel bilgi</span>
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
