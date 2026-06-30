"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  Calendar,
  Camera,
  Clock3,
  MapPin,
  MessageCircle,
} from "lucide-react";
import { UiMotion } from "./ui-motion";
import { InteractiveMenu } from "./components/interactive-menu";
import { GalleryLightbox } from "./components/gallery-lightbox";
import { BookingModal } from "./components/booking-modal";
import { MenuDetailModal } from "./components/menu-detail-modal";
import { ReviewCarousel } from "./components/review-carousel";
import { AnimatedFooter } from "./components/animated-footer";
import { VanHeroParallax } from "./components/van-hero-parallax";

const mapsUrl =
  "https://www.google.com/maps/search/?api=1&query=Tarihi%20Van%20Kahvalt%C4%B1%20Evi%20Zambak%20Sk.%20No%3A8%20Beyo%C4%9Flu";
const whatsappUrl =
  "https://wa.me/905415252868?text=Merhaba%2C%20Tarihi%20Van%20Kahvalt%C4%B1%20Evi%20i%C3%A7in%20rezervasyon%20bilgisi%20almak%20istiyorum.";

const menuItems = [
  {
    title: "Serpme Van Kahvaltısı",
    tag: "İmza",
    category: "Serpme",
    image: "/images/breakfast-spread.jpg",
    desc: "Yöresel otlu peynir, hakiki Van balı, taze kaymak, kete, kavut, murtuğa, zeytin çeşitleri, domates-salatalık, pişi ve sınırsız çay.",
    detail: "En az 2 kişilik",
    price: "₺550",
  },
  {
    title: "Sahanda Sucuklu Yumurta",
    tag: "Sıcak",
    category: "Sıcaklar",
    image: "/images/sucuk-egg.jpg",
    desc: "Yerli kasap sucukları ve çiftlik yumurtası ile bakır sahanda tereyağlı sıcak servis.",
    detail: "Sıcak Servis",
    price: "₺280",
  },
  {
    title: "Murtuğa (Van Spesiyali)",
    tag: "Van",
    category: "Van Lezzetleri",
    image: "/images/kete-detail.jpg",
    desc: "Un ve tereyağının sahanda özenle kavrulup organik yumurtayla buluştuğu yöresel sıcak lezzet.",
    detail: "Yöresel Sıcak",
    price: "₺210",
  },
  {
    title: "Kavut (Kavrulmuş Buğday)",
    tag: "Van",
    category: "Van Lezzetleri",
    image: "/images/hands-table.jpg",
    desc: "Kavrulmuş buğday ununun tereyağı ve cevizle kavrulup bal eşliğinde sunulan tarihi Van tarifi.",
    detail: "Geleneksel Tat",
    price: "₺190",
  },
  {
    title: "Sahanda Tereyağlı Menemen",
    tag: "Sıcak",
    category: "Sıcaklar",
    image: "/images/balcony-breakfast.jpg",
    desc: "Taze tarla domatesi, tatlı biber ve erimiş kaşar peyniri veya sade köy yumurtası eşliğinde.",
    detail: "Sıcak Servis",
    price: "₺220",
  },
  {
    title: "Kete & Sıcak Pişi Tabağı",
    tag: "Sıcak",
    category: "Sıcaklar",
    image: "/images/kete-detail.jpg",
    desc: "Eski usul Van ketesi ve taze kızarmış sıcak pişiler, yanında süzme peynir ve domatesle.",
    detail: "Paylaşmalık",
    price: "₺240",
  },
  {
    title: "Kafka Cafe Kahveleri",
    tag: "Cafe",
    category: "Kahve",
    image: "/images/coffee-moment.jpg",
    desc: "Espresso, Americano, Latte ve Flat White gibi taze çekilmiş nitelikli kahve çeşitleri.",
    detail: "Gün boyu",
    price: "₺90",
  },
  {
    title: "Geleneksel Türk Kahvesi",
    tag: "Cafe",
    category: "Kahve",
    image: "/images/terrace-tea.jpg",
    desc: "Közde ağır ağır pişmiş, çikolatalı lokum ve su eşliğinde sunulan geleneksel kahve keyfi.",
    detail: "Gün boyu",
    price: "₺80",
  }
];

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
  const [selectedMenuItem, setSelectedMenuItem] = useState<typeof menuItems[0] | null>(null);
  
  const [preselectedItem, setPreselectedItem] = useState("");
  const [preselectedType, setPreselectedType] = useState("");

  const [isOpenNow, setIsOpenNow] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileBarQuiet, setMobileBarQuiet] = useState(false);
  const scrollQuietTimer = useRef<number | null>(null);
  const [hoverStyle, setHoverStyle] = useState<React.CSSProperties>({
    opacity: 0,
    left: 0,
    width: 0,
  });

  useEffect(() => {
    const settleMobileBar = () => {
      setMobileBarQuiet(true);
      if (scrollQuietTimer.current) {
        window.clearTimeout(scrollQuietTimer.current);
      }
      scrollQuietTimer.current = window.setTimeout(() => {
        setMobileBarQuiet(false);
      }, 520);
    };

    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      settleMobileBar();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("wheel", settleMobileBar, { passive: true });
    window.addEventListener("touchmove", settleMobileBar, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", settleMobileBar);
      window.removeEventListener("touchmove", settleMobileBar);
      if (scrollQuietTimer.current) {
        window.clearTimeout(scrollQuietTimer.current);
      }
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

  const handleSelectItem = (itemTitle: string) => {
    const item = menuItems.find((i) => i.title === itemTitle);
    if (item) {
      setSelectedMenuItem(item);
    }
  };

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

      <main className="site-shell theme-breakfast">
        <header className={`nav ${scrolled ? "scrolled" : ""}`}>
          <div className="logo-wrap">
            <div className="logo-emblem brand-logo-mark" aria-hidden="true">
              <Image
                src="/images/brand-icon.svg"
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
            <a href="#menu" onMouseEnter={handleMouseEnter}>Menü</a>
            <a href="#story" onMouseEnter={handleMouseEnter}>Hikaye</a>
            <a href="#gallery" onMouseEnter={handleMouseEnter}>Galeri</a>
            <a href="#contact" onMouseEnter={handleMouseEnter}>Konum</a>
          </nav>

          <button 
            type="button" 
            className="order-button" 
            onClick={() => handleOpenBooking()}
          >
            <span className="nav-button-label">Rezervasyon</span> <ArrowRight size={16} />
          </button>
        </header>

        <VanHeroParallax />

        <div className="story-band">
          <section id="story" className="red-story" data-reveal>
            <OrganicLeaf className="leaf-story-1" />
            <div className="story-content">
              <div>
                <div className="light-pill">Hakkımızda</div>
                <h2>Eski usul hazırlanır, sofrada uzun uzun yaşanır.</h2>
                <p>
                  Tarihi Rum binasının sakin dokusunda, 1978’den beri gelen aile
                  emeğini Van kahvaltısının cömertliğiyle aynı sofrada
                  buluşturuyoruz.
                </p>
              </div>
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
            <div className="story-plate" data-reveal>
              <Image
                src="/images/breakfast-spread.jpg"
                alt="Geniş Van kahvaltısı"
                fill
                sizes="(max-width: 900px) 92vw, 760px"
                loading="lazy"
              />
            </div>
          </section>
        </div>

        <section id="menu" className="menu-section">
          <OrganicLeaf className="leaf-menu-1" />
          <div className="center-heading" data-reveal>
            <div className="pill">
              <Clock3 size={14} /> Menü kitabı
            </div>
            <h2>
              Kahvaltı <span>menüsü</span>
            </h2>
            <p>
              Van sofrasının imza lezzetleri, sıcak tabakları ve kahveleri
              masaya gelen geleneksel sunum düzeninde.
            </p>
          </div>

          <InteractiveMenu items={menuItems} onSelectItem={handleSelectItem} />
        </section>

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

      <div className={`mobile-bar ${mobileBarQuiet ? "scrolling" : ""}`}>
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

      <MenuDetailModal
        item={selectedMenuItem}
        onClose={() => setSelectedMenuItem(null)}
        onSelectForBooking={(title) => handleOpenBooking(title)}
      />
    </>
  );
}
