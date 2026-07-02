"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Calendar,
  Camera,
  ChevronRight,
  Clock,
  Home,
  MapPin,
  MessageCircle,
} from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { UiMotion } from "./ui-motion";
import { GalleryLightbox } from "./components/gallery-lightbox";
import { BookingModal } from "./components/booking-modal";
import { ReviewCarousel } from "./components/review-carousel";
import { AnimatedFooter } from "./components/animated-footer";
import { VanHeroParallax } from "./components/van-hero-parallax";

const mapsUrl =
  "https://www.google.com/maps/search/?api=1&query=Tarihi%20Van%20Kahvalt%C4%B1%20Evi%20Zambak%20Sk.%20No%3A8%20Beyo%C4%9Flu";
const whatsappUrl =
  "https://wa.me/905415252868?text=Merhaba%2C%20Tarihi%20Van%20Kahvalt%C4%B1%20Evi%20i%C3%A7in%20rezervasyon%20bilgisi%20almak%20istiyorum.";

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

const OrganicLeaf = ({ className }: { className: string }) => (
  <div className={`organic-leaf-wrapper ${className}`}>
    <svg className="organic-leaf-svg" viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 60C35 40 85 45 110 20C90 40 45 40 10 60Z" fill="url(#leaf-grad-1)"/>
      <path d="M10 60C45 35 75 10 110 20C80 25 50 45 10 60Z" fill="url(#leaf-grad-2)"/>
      <path d="M10 60C30 55 60 52 110 20" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M35 48C45 44 55 43 65 40" stroke="rgba(255,255,255,0.22)" strokeWidth="1"/>
      <path d="M55 42C62 38 70 37 78 33" stroke="rgba(255,255,255,0.22)" strokeWidth="1"/>
      <path d="M75 35C82 30 90 28 98 23" stroke="rgba(255,255,255,0.22)" strokeWidth="1"/>
      <defs>
        <linearGradient id="leaf-grad-1" x1="10" y1="60" x2="110" y2="20" gradientUnits="userSpaceOnUse">
          <stop stopColor="#689643" />
          <stop offset="1" stopColor="#8cb761" />
        </linearGradient>
        <linearGradient id="leaf-grad-2" x1="10" y1="60" x2="110" y2="20" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4b6e2f" stopOpacity="0.85"/>
          <stop offset="1" stopColor="#7ba757" stopOpacity="0.85"/>
        </linearGradient>
      </defs>
    </svg>
  </div>
);

export default function ClientPage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const storyRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress: storyScroll } = useScroll({
    target: storyRef,
    offset: ["start end", "end start"],
  });
  const storyBrickY = useTransform(storyScroll, [0, 1], ["-42px", "42px"]);
  const storyGlowY = useTransform(storyScroll, [0, 1], ["54px", "-48px"]);
  const storyImageY = useTransform(storyScroll, [0, 1], ["30px", "-30px"]);
  const storyPlateY = useTransform(storyScroll, [0, 1], ["24px", "-34px"]);
  
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
                alt=""
                width={54}
                height={68}
                className="brand-logo-image"
                priority
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
            <a href="#gallery" onMouseEnter={handleMouseEnter}>Galeri</a>
            <a href="#contact" onMouseEnter={handleMouseEnter}>Konum</a>
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
            <div className="nav-menu-meta" style={{ "--item-index": 0 } as React.CSSProperties}>
              <span className={`nav-menu-status ${isOpenNow ? "open" : "closed"}`}>
                <span />
                {isOpenNow ? "Bugün açık" : "Şu an kapalı"}
              </span>
              <span className="nav-menu-hours">
                <Clock size={14} />
                08:00 - 18:00
              </span>
            </div>
            <a href="#top" style={{ "--item-index": 1 } as React.CSSProperties} onClick={() => setMenuOpen(false)}>
              <span className="nav-menu-index">01</span>
              <Home size={18} />
              <span className="nav-menu-link-text">Ana sayfa</span>
              <ChevronRight size={17} />
            </a>
            <a href="#story" style={{ "--item-index": 2 } as React.CSSProperties} onClick={() => setMenuOpen(false)}>
              <span className="nav-menu-index">02</span>
              <span className="nav-menu-link-text">Hikaye</span>
              <ChevronRight size={17} />
            </a>
            <a href="#gallery" style={{ "--item-index": 3 } as React.CSSProperties} onClick={() => setMenuOpen(false)}>
              <span className="nav-menu-index">03</span>
              <span className="nav-menu-link-text">Galeri</span>
              <ChevronRight size={17} />
            </a>
            <a href="#contact" style={{ "--item-index": 4 } as React.CSSProperties} onClick={() => setMenuOpen(false)}>
              <span className="nav-menu-index">04</span>
              <MapPin size={18} />
              <span className="nav-menu-link-text">Konum</span>
              <ChevronRight size={17} />
            </a>
            <a
              href={whatsappUrl}
              style={{ "--item-index": 5 } as React.CSSProperties}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
            >
              <span className="nav-menu-index">05</span>
              <MessageCircle size={18} />
              <span className="nav-menu-link-text">WhatsApp</span>
              <ChevronRight size={17} />
            </a>
            <div className="nav-menu-signature" aria-hidden="true" style={{ "--item-index": 6 } as React.CSSProperties}>
              <span>
                Tarihi<em>Van</em>
              </span>
              <small>Kahvaltıcısı</small>
            </div>
          </div>
        </header>

        <VanHeroParallax />

        <div className="story-band">
          <section id="story" className="red-story" data-reveal ref={storyRef}>
            <motion.div
              className="story-depth story-depth-bricks"
              style={{ y: storyBrickY }}
              aria-hidden="true"
            />
            <motion.div
              className="story-depth story-depth-glow"
              style={{ y: storyGlowY }}
              aria-hidden="true"
            />
            <div className="story-scroll-rail" aria-hidden="true">
              <motion.span style={{ scaleY: storyScroll }} />
            </div>
            <OrganicLeaf className="leaf-story-1" />
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
                <motion.div className="story-arch" style={{ y: storyImageY }}>
                  <Image
                    src="/images/interior-chair.jpg"
                    alt="Tarihi Rum binasının taş ve ahşap iç mekan dokusu"
                    fill
                    sizes="(max-width: 900px) 88vw, 420px"
                    loading="lazy"
                  />
                </motion.div>
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
            <motion.div className="story-plate" data-reveal style={{ y: storyPlateY }}>
              <Image
                src="/images/breakfast-spread.jpg"
                alt="Geniş Van kahvaltısı"
                fill
                sizes="(max-width: 900px) 92vw, 760px"
                loading="lazy"
              />
            </motion.div>
          </section>
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
