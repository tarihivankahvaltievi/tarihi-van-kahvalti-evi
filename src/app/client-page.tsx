"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Camera,
  ChevronRight,
  BookOpen,
  Home,
  MapPin,
  MessageCircle,
} from "lucide-react";
import { UiMotion } from "./ui-motion";
import dynamic from "next/dynamic";
import { VanHeroParallax } from "./components/van-hero-parallax";
import { displayAddress, internationalTouristFacts, localSeoFacts, mapsUrl, whatsappUrl } from "./seo";

const BookingModal = dynamic(() => import("./components/booking-modal").then(mod => mod.BookingModal), { ssr: false });
const GalleryLightbox = dynamic(() => import("./components/gallery-lightbox").then(mod => mod.GalleryLightbox), { ssr: false });
const ReviewCarousel = dynamic(() => import("./components/review-carousel").then(mod => mod.ReviewCarousel), { ssr: true });
const FaqSection = dynamic(() => import("./components/faq-section").then(mod => mod.FaqSection), { ssr: true });
const AnimatedFooter = dynamic(() => import("./components/animated-footer").then(mod => mod.AnimatedFooter), { ssr: false });

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

export default function ClientPage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [preselectedItem, setPreselectedItem] = useState("");
  const [preselectedType, setPreselectedType] = useState("");

  const [isOpenNow, setIsOpenNow] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileBarHidden, setMobileBarHidden] = useState(false);
  const lastScrollY = useRef(0);
  const [hoverStyle, setHoverStyle] = useState<React.CSSProperties>({
    opacity: 0,
    left: 0,
    width: 0,
  });

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = Math.max(window.scrollY, 0);
      const delta = currentScrollY - lastScrollY.current;

      setScrolled(currentScrollY > 40);

      if (currentScrollY < 56) {
        setMobileBarHidden(false);
      } else if (Math.abs(delta) > 6) {
        setMobileBarHidden(delta > 0);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    lastScrollY.current = Math.max(window.scrollY, 0);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const checkOpenStatus = () => {
      const now = new Date();
      const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
      const turkeyTime = new Date(utc + (3600000 * 3));
      const hours = turkeyTime.getHours();
      const minutes = turkeyTime.getMinutes();
      const timeInMinutes = hours * 60 + minutes;

      const openTime = 8 * 60; // 08:00
      const closeTime = 18 * 60; // 18:00

      if (timeInMinutes >= openTime && timeInMinutes < closeTime) {
        setIsOpenNow(true);
      } else {
        setIsOpenNow(false);
      }
    };
    checkOpenStatus();
    const interval = setInterval(checkOpenStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  const handleOpenBooking = (itemTitle?: string, category?: string) => {
    setPreselectedItem(itemTitle || "");
    setPreselectedType(category || "Kahvaltı");
    setIsBookingOpen(true);
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const target = e.currentTarget;
    setHoverStyle({
      opacity: 1,
      left: target.offsetLeft,
      width: target.offsetWidth,
    });
  };

  const handleMouseLeave = () => {
    setHoverStyle((prev) => ({
      ...prev,
      opacity: 0,
    }));
  };

  return (
    <>
      <UiMotion />

      <main id="top" className="site-shell theme-breakfast">
        <header className={`nav ${scrolled ? "scrolled" : ""} ${menuOpen ? "menu-open" : ""}`}>
          <div className="logo-wrap">
            <div className="logo-emblem brand-logo-mark" aria-hidden="true">
              <Image
                src="/images/brand-icon-small.png"
                alt="Tarihi Van Kahvaltı Evi"
                width={54}
                height={68}
                className="brand-logo-image"
                priority
                fetchPriority="high"
              />
            </div>
            <a className="logo" href="#top" aria-label="Tarihi Van Kahvaltıcısı">
              <span className="logo-word">
                Tarihi<em>Van</em>
              </span>
              <span className="logo-subtitle">Kahvaltıcısı</span>
            </a>
            <div className={`nav-status-pill ${isOpenNow ? "open" : "closed"}`}>
              <span className="nav-status-dot" />
              <span>{isOpenNow ? "Açık" : "Kapalı"}</span>
            </div>
          </div>
          
          <nav className="nav-links" aria-label="Ana menü" onMouseLeave={handleMouseLeave}>
            <span className="nav-hover-pill" style={hoverStyle} />
            <a href="#story" onMouseEnter={handleMouseEnter}>Hikaye</a>
            <Link href="/menu" onMouseEnter={handleMouseEnter}>Menü</Link>
            <a href="#gallery" onMouseEnter={handleMouseEnter}>Galeri</a>
            <Link href="/iletisim" onMouseEnter={handleMouseEnter}>Konum</Link>
            <Link href="/sss" onMouseEnter={handleMouseEnter}>SSS</Link>
          </nav>

          <div className="nav-actions">
            <a className="nav-location" href={mapsUrl} target="_blank" rel="noopener noreferrer">
              <MapPin size={16} />
              <span>Beyoğlu</span>
            </a>
            <button
              type="button"
              className="nav-menu-button"
              aria-label={menuOpen ? "Menüyü kapat" : "Menüyü aç"}
              aria-expanded={menuOpen}
              aria-controls="site-menu"
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span className="nav-menu-glyph" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
            </button>
          </div>

          <div id="site-menu" className="nav-menu-panel" aria-hidden={!menuOpen}>
            <div className="nav-menu-ambient" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <div className="nav-menu-art" aria-hidden="true">
              <span className="nav-menu-art-mark">Van</span>
              <span className="nav-menu-art-line" />
              <span className="nav-menu-art-steam" />
              <span className="nav-menu-art-steam" />
            </div>
            <a href="#top" style={{ "--item-index": 1 } as React.CSSProperties} onClick={() => setMenuOpen(false)}>
              <span className="nav-menu-index">01</span>
              <Home size={18} />
              <span className="nav-menu-copy">
                <span className="nav-menu-link-text">Ana sayfa</span>
                <span className="nav-menu-link-meta">Sıcak sofra açılışı</span>
              </span>
              <ChevronRight size={17} />
            </a>
            <a href="#story" style={{ "--item-index": 2 } as React.CSSProperties} onClick={() => setMenuOpen(false)}>
              <span className="nav-menu-index">02</span>
              <BookOpen size={18} />
              <span className="nav-menu-copy">
                <span className="nav-menu-link-text">Hikaye</span>
                <span className="nav-menu-link-meta">Tarihi Rum binası</span>
              </span>
              <ChevronRight size={17} />
            </a>
            <Link href="/menu" style={{ "--item-index": 3 } as React.CSSProperties} onClick={() => setMenuOpen(false)}>
              <span className="nav-menu-index">03</span>
              <BookOpen size={18} />
              <span className="nav-menu-copy">
                <span className="nav-menu-link-text">Menü</span>
                <span className="nav-menu-link-meta">Fiyatlar ve içerik</span>
              </span>
              <ChevronRight size={17} />
            </Link>
            <a href="#gallery" style={{ "--item-index": 4 } as React.CSSProperties} onClick={() => setMenuOpen(false)}>
              <span className="nav-menu-index">04</span>
              <Camera size={18} />
              <span className="nav-menu-copy">
                <span className="nav-menu-link-text">Galeri</span>
                <span className="nav-menu-link-meta">Bakır, çay, masa</span>
              </span>
              <ChevronRight size={17} />
            </a>
            <Link href="/iletisim" style={{ "--item-index": 5 } as React.CSSProperties} onClick={() => setMenuOpen(false)}>
              <span className="nav-menu-index">05</span>
              <MapPin size={18} />
              <span className="nav-menu-copy">
                <span className="nav-menu-link-text">Konum</span>
                <span className="nav-menu-link-meta">Beyoğlu rotası</span>
              </span>
              <ChevronRight size={17} />
            </Link>
            <Link href="/van-kahvaltisi" style={{ "--item-index": 6 } as React.CSSProperties} onClick={() => setMenuOpen(false)}>
              <span className="nav-menu-index">06</span>
              <BookOpen size={18} />
              <span className="nav-menu-copy">
                <span className="nav-menu-link-text">Van kahvaltısı</span>
                <span className="nav-menu-link-meta">Rehber ve içerik</span>
              </span>
              <ChevronRight size={17} />
            </Link>
            <a
              href={whatsappUrl}
              style={{ "--item-index": 7 } as React.CSSProperties}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
            >
              <span className="nav-menu-index">07</span>
              <MessageCircle size={18} />
              <span className="nav-menu-copy">
                <span className="nav-menu-link-text">WhatsApp</span>
                <span className="nav-menu-link-meta">Hızlı iletişim</span>
              </span>
              <ChevronRight size={17} />
            </a>
            <div className="nav-menu-signature" aria-hidden="true" style={{ "--item-index": 8 } as React.CSSProperties}>
              <span>
                Tarihi<em>Van</em>
              </span>
              <small>Kahvaltıcısı</small>
            </div>
          </div>
        </header>

        <VanHeroParallax />

        {/* Kısa işletme bilgisi */}
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
        <div className="story-band">
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
                Yabancı ziyaretçiler için İngilizce, Rusça ve Arapça sayfalar; Taksim, Istiklal ve Beyoğlu aramalarına uygun açık adres, saat, menü ve rezervasyon bilgisi içerir.
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

          <article id="story" className="red-story" data-reveal>
            <div className="story-content">
              <div className="story-copy">
                <div className="light-pill story-pill">Hakkımızda</div>
                <h2>Eski usul hazırlanır, sofrada uzun uzun yaşanır.</h2>
                <p>
                  Tarihi Rum binasının sakin dokusunda, 1978’den beri gelen aile
                  emeğini Van kahvaltısının cömertliğiyle aynı sofrada
                  buluşturuyoruz.
                </p>
                <div className="story-text">
                  <p>
                    Burada kahvaltı aceleye gelmez. Bakır sahanlar masaya tek tek
                    yerleşir, çay tazelenir, sohbet kendine yer açar; eski binanın
                    ruhu her tabakta usulca hissedilir.
                  </p>
                  <p>
                    Üçüncü kuşak aile işletmesi olarak mirasımızı koruyor; Van’ın
                    bereketli sofrasını Beyoğlu’nun kalbinde özenli, samimi ve
                    hatırlanacak bir kahvaltıya dönüştürüyoruz.
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
                    <p>Beyoğlu’nda uzun sohbetli Van kahvaltısı.</p>
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
            <button 
              type="button" 
              className="order-button"
              onClick={() => handleOpenBooking()}
            >
              <Camera size={17} /> Rezervasyon al
            </button>
          </div>
          
          <GalleryLightbox gallery={gallery} />
        </section>

        <FaqSection />

        <AnimatedFooter onOpenBooking={() => handleOpenBooking()} />
      </main>

      <div className={`mobile-bar ${mobileBarHidden ? "is-hidden" : ""}`}>
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp üzerinden mesaj gönderin">
          <MessageCircle size={20} />
          <span>WhatsApp</span>
        </a>
        <button type="button" onClick={() => handleOpenBooking()} aria-label="Rezervasyon yapın">
          <Calendar size={22} className="mobile-bar-highlight-icon" />
          <span>Rezervasyon</span>
        </button>
        <a href={mapsUrl} target="_blank" rel="noopener noreferrer" aria-label="Haritada yol tarifi alın">
          <MapPin size={20} />
          <span>Yol Tarifi</span>
        </a>
      </div>

      <BookingModal 
        key={`${isBookingOpen}-${preselectedType}-${preselectedItem}`}
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
        preselectedType={preselectedType}
        preselectedItem={preselectedItem}
      />

    </>
  );
}
