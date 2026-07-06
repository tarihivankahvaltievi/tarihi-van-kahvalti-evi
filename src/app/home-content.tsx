import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { AnimatedFooter } from "./components/animated-footer";
import { BookingOpenButton } from "./components/booking-open-button";
import { FaqSection } from "./components/faq-section";
import { GalleryLightbox } from "./components/gallery-lightbox";
import { ReviewCarousel } from "./components/review-carousel";
import { VanHeroParallax } from "./components/van-hero-parallax";
import { displayAddress, internationalTouristFacts, localSeoFacts } from "./seo";

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
        <article id="story" className="red-story" data-reveal>
          <div className="story-content">
            <div className="story-copy">
              <div className="light-pill story-pill">Hakkımızda</div>
              <h2>Eski usul hazırlanır, sofrada uzun uzun yaşanır.</h2>
              <p>
                Tarihi Rum binasının sakin dokusunda, 1978&apos;den beri gelen aile emeğini Van
                kahvaltısının cömertliğiyle aynı sofrada buluşturuyoruz.
              </p>
              <div className="story-text">
                <p>
                  Burada kahvaltı aceleye gelmez. Bakır sahanlar masaya tek tek yerleşir,
                  çay tazelenir, sohbet kendine yer açar; eski binanın ruhu her tabakta
                  usulca hissedilir.
                </p>
                <p>
                  Üçüncü kuşak aile işletmesi olarak mirasımızı koruyor; Van&apos;ın bereketli
                  sofrasını Beyoğlu&apos;nun kalbinde özenli, samimi ve hatırlanacak bir
                  kahvaltıya dönüştürüyoruz.
                </p>
              </div>
            </div>
            <div className="story-archive" data-reveal>
              <figure className="story-arch" style={{ margin: 0 }}>
                <Image
                  src="/images/interior-chair.jpg"
                  alt="Tarihi Rum binasının taş ve ahşap iç mekan dokusu"
                  fill
                  sizes="(max-width: 900px) 88vw, 420px"
                  loading="lazy"
                />
                <figcaption className="sr-only">Tarihi Rum binasının taş ve ahşap iç mekan dokusu</figcaption>
              </figure>
              <div className="story-memory-list" aria-label="Tarihi Van Kahvaltıcısı kısa hikaye">
                <div>
                  <span>1978</span>
                  <p>Aile emeğiyle başlayan sofra kültürü.</p>
                </div>
                <div>
                  <span>Taş doku</span>
                  <p>Rum binasının sakin, yaşanmış atmosferi.</p>
                </div>
                <div>
                  <span>Bugün</span>
                  <p>Beyoğlu&apos;nda uzun sohbetli Van kahvaltısı.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="story-stats" data-reveal>
            <div>
              <strong>1978</strong>
              <span>Aile yolculuğu</span>
            </div>
            <div>
              <strong>2.</strong>
              <span>Derece tarihi eser</span>
            </div>
          </div>
          <figure className="story-plate" data-reveal style={{ margin: 0 }}>
            <Image
              src="/images/breakfast-spread.jpg"
              alt="Geniş Van kahvaltısı"
              fill
              sizes="(max-width: 900px) 92vw, 760px"
              loading="lazy"
            />
            <figcaption className="sr-only">Geniş Van kahvaltısı sunumu</figcaption>
          </figure>
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
              <Link href="/turkish-breakfast-istanbul">Turkish breakfast</Link>
              <Link href="/zavtrak-taksim-stambul">Русский</Link>
              <Link href="/arabic-breakfast-taksim">العربية</Link>
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

        <section className="tourist-language-panel" aria-labelledby="tourist-language-heading" data-reveal>
          <div className="tourist-language-head">
            <span className="light-pill">Tourist search</span>
            <h2 id="tourist-language-heading">Taksim çevresindeki turistler için kahvaltı bilgisi</h2>
            <p>
              Yabancı ziyaretçiler için İngilizce, Rusça ve Arapça sayfalar; Taksim,
              Istiklal ve Beyoğlu aramalarına uygun açık adres, saat, menü ve rezervasyon
              bilgisi içerir.
            </p>
          </div>
          <div className="tourist-language-grid">
            {internationalTouristFacts.map((fact) => (
              <article key={fact.language} className="tourist-language-card">
                <span>{fact.language}</span>
                <h3>{fact.title}</h3>
                <p>{fact.value}</p>
                <small>{fact.intent}</small>
                <Link href={fact.href} aria-label={`${fact.title} sayfasına git`}>
                  Aç <ChevronRight size={16} />
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
