"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
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

const aboutSignals = [
  ["1978", "Aile emeği"],
  ["Rum binası", "Tarihi doku"],
  ["Van sofrası", "Cömert servis"],
];

const aboutOrbitImages = [
  ["/images/tea-service.jpg", "Taze demlenmiş çay servisi"],
  ["/images/interior-chair.jpg", "Tarihi iç mekan dokusu"],
  ["/images/kete-detail.jpg", "Kete ve Van kahvaltısı detayı"],
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
  const aboutRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const reduceMotion = Boolean(prefersReducedMotion);
  const { scrollYProgress: aboutScrollProgress } = useScroll({
    target: aboutRef,
    offset: ["start end", "end start"],
  });
  const aboutSpring = { stiffness: 92, damping: 30, mass: 1 };
  const aboutBackdropY = useSpring(
    useTransform(aboutScrollProgress, [0, 1], reduceMotion ? [0, 0] : [-18, 24]),
    aboutSpring,
  );
  const aboutPlateY = useSpring(
    useTransform(aboutScrollProgress, [0, 1], reduceMotion ? [0, 0] : [24, -32]),
    aboutSpring,
  );
  const aboutSteamY = useSpring(
    useTransform(aboutScrollProgress, [0, 1], reduceMotion ? [0, 0] : [36, -52]),
    aboutSpring,
  );
  const aboutPlateRotate = useSpring(
    useTransform(aboutScrollProgress, [0, 1], reduceMotion ? [0, 0] : [-2.5, 2.5]),
    aboutSpring,
  );
  const aboutRailScale = useSpring(
    useTransform(aboutScrollProgress, [0.15, 0.75], [0.12, 1]),
    aboutSpring,
  );
  const aboutItemInitial = { opacity: 0, y: reduceMotion ? 0 : 22 };
  const aboutItemInView = { opacity: 1, y: 0 };
  const aboutItemTransition = {
    duration: reduceMotion ? 0.01 : 0.72,
    ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
  };
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

        <div className="about-band">
          <motion.article
            id="story"
            ref={aboutRef}
            className="about-scene"
            aria-labelledby="about-title"
            initial={{ opacity: 0, y: reduceMotion ? 0 : 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.26 }}
            transition={aboutItemTransition}
          >
            <motion.div className="about-depth" style={{ y: aboutBackdropY }} aria-hidden="true">
              <span className="about-depth-grid" />
              <span className="about-depth-light" />
              <span className="about-depth-ring about-depth-ring-one" />
              <span className="about-depth-ring about-depth-ring-two" />
            </motion.div>
            <div className="about-motes" aria-hidden="true">
              {Array.from({ length: 14 }).map((_, index) => (
                <span key={index} style={{ "--mote-index": index } as React.CSSProperties} />
              ))}
            </div>

            <motion.div className="about-rail" style={{ scaleY: aboutRailScale }} aria-hidden="true" />

            <div className="about-layout">
              <motion.div className="about-copy">
                <motion.div
                  className="about-kicker"
                  initial={aboutItemInitial}
                  whileInView={aboutItemInView}
                  viewport={{ once: true, amount: 0.45 }}
                  transition={{ ...aboutItemTransition, delay: 0.04 }}
                >
                  <span>Hakkımızda</span>
                  <span>1978&apos;den beri</span>
                </motion.div>
                <motion.h2
                  id="about-title"
                  initial={aboutItemInitial}
                  whileInView={aboutItemInView}
                  viewport={{ once: true, amount: 0.45 }}
                  transition={{ ...aboutItemTransition, delay: 0.1 }}
                >
                  Van sabahını Beyoğlu&apos;nda yaşayan bir sofraya çeviriyoruz.
                </motion.h2>
                <motion.p
                  initial={aboutItemInitial}
                  whileInView={aboutItemInView}
                  viewport={{ once: true, amount: 0.45 }}
                  transition={{ ...aboutItemTransition, delay: 0.16 }}
                >
                  Tarihi Rum binasının taş dokusunda; otlu peynir, murtuğa, kavut
                  ve sınırsız çayı aile işletmesi sıcaklığıyla masaya taşıyoruz.
                </motion.p>
                <motion.div
                  className="about-signal-row"
                  aria-label="Tarihi Van Kahvaltıcısı öne çıkanları"
                  initial={aboutItemInitial}
                  whileInView={aboutItemInView}
                  viewport={{ once: true, amount: 0.45 }}
                  transition={{ ...aboutItemTransition, delay: 0.22 }}
                >
                  {aboutSignals.map(([value, label], index) => (
                    <span
                      key={value}
                      className="about-signal"
                      style={{ "--signal-index": index } as React.CSSProperties}
                    >
                      <strong>{value}</strong>
                      <small>{label}</small>
                    </span>
                  ))}
                </motion.div>
              </motion.div>

              <motion.div
                className="about-tableau"
                style={{ y: aboutPlateY, rotate: aboutPlateRotate }}
                initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.94 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ ...aboutItemTransition, delay: 0.12 }}
                aria-label="Van kahvaltısı sofrası"
              >
                <span className="about-table-shadow" aria-hidden="true" />
                <motion.div className="about-steam" style={{ y: aboutSteamY }} aria-hidden="true">
                  <span />
                  <span />
                  <span />
                  <span />
                </motion.div>
                <figure className="about-main-plate" style={{ margin: 0 }}>
                  <Image
                    src="/images/breakfast-spread.jpg"
                    alt="Tarihi Van Kahvaltıcısı geniş Van kahvaltısı sofrası"
                    fill
                    sizes="(max-width: 820px) 54vw, 540px"
                    loading="lazy"
                  />
                  <figcaption className="sr-only">Geniş Van kahvaltısı sunumu</figcaption>
                </figure>
                <span className="about-copper-ring" aria-hidden="true" />
                {aboutOrbitImages.map(([src, alt], index) => (
                  <figure
                    key={src}
                    className={`about-orbit-card about-orbit-card-${index + 1}`}
                    style={{ "--orbit-index": index } as React.CSSProperties}
                  >
                    <Image
                      src={src}
                      alt={alt}
                      fill
                      sizes="(max-width: 820px) 96px, 150px"
                      loading="lazy"
                    />
                  </figure>
                ))}
              </motion.div>
            </div>

            <motion.div
              className="about-bottom"
              initial={aboutItemInitial}
              whileInView={aboutItemInView}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ ...aboutItemTransition, delay: 0.3 }}
            >
              <div className="about-memory">
                <span>Bugün</span>
                <p>Beyoğlu&apos;nda uzun sohbetli, bol tabaklı, sıcak çaylı Van kahvaltısı.</p>
              </div>
              <a className="about-cta" href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <Calendar size={17} />
                <span>Sofraya geç</span>
                <ChevronRight size={16} />
              </a>
            </motion.div>
          </motion.article>
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

        <div className="bottom-info-band">
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
        </div>

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
