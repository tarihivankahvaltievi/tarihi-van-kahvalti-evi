"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
  type ReactNode,
} from "react";
import {
  BookOpen,
  Calendar,
  Camera,
  ChevronRight,
  CircleHelp,
  Home,
  MapPin,
  MessageCircle,
} from "lucide-react";
import { UiMotion } from "./ui-motion";
import { mapsUrl, whatsappUrl } from "./seo";

const BookingModal = dynamic(
  () => import("./components/booking-modal").then((mod) => mod.BookingModal),
  { ssr: false },
);

export default function ClientPage({ children }: { children: ReactNode }) {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [preselectedItem, setPreselectedItem] = useState("");
  const [preselectedType, setPreselectedType] = useState("");
  const [isOpenNow, setIsOpenNow] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileBarHidden, setMobileBarHidden] = useState(false);
  const lastScrollY = useRef(0);
  const [hoverStyle, setHoverStyle] = useState<CSSProperties>({
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
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const checkOpenStatus = () => {
      const now = new Date();
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const turkeyTime = new Date(utc + 3600000 * 3);
      const timeInMinutes = turkeyTime.getHours() * 60 + turkeyTime.getMinutes();

      setIsOpenNow(timeInMinutes >= 8 * 60 && timeInMinutes < 18 * 60);
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
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleBookingRequest = (event: Event) => {
      const detail = (event as CustomEvent<{ itemTitle?: string; category?: string }>).detail;
      setPreselectedItem(detail?.itemTitle || "");
      setPreselectedType(detail?.category || "Kahvaltı");
      setIsBookingOpen(true);
    };

    window.addEventListener("open-booking", handleBookingRequest);
    return () => window.removeEventListener("open-booking", handleBookingRequest);
  }, []);

  const handleOpenBooking = (itemTitle?: string, category?: string) => {
    setPreselectedItem(itemTitle || "");
    setPreselectedType(category || "Kahvaltı");
    setIsBookingOpen(true);
  };

  const handleMouseEnter = (event: MouseEvent<HTMLAnchorElement>) => {
    const target = event.currentTarget;
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
            <a className="logo" href="#top" aria-label="Tarihi Van Kahvaltı Evi">
              <span className="logo-word">
                Tarihi<em>Van</em>
              </span>
              <span className="logo-subtitle">Kahvaltı Evi</span>
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

          <div
            id="site-menu"
            className="nav-menu-panel"
            aria-hidden={!menuOpen}
            aria-label="Site menüsü"
          >
            <div className="nav-menu-intro" aria-hidden="true">
              <span>Van&apos;dan Beyoğlu&apos;na</span>
              <small>08.00 — 18.00</small>
            </div>
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
            <a href="#top" tabIndex={menuOpen ? 0 : -1} style={{ "--item-index": 1 } as CSSProperties} onClick={() => setMenuOpen(false)}>
              <span className="nav-menu-index">01</span>
              <Home size={18} />
              <span className="nav-menu-copy">
                <span className="nav-menu-link-text">Ana sayfa</span>
                <span className="nav-menu-link-meta">Sıcak sofra açılışı</span>
              </span>
              <ChevronRight size={17} />
            </a>
            <a href="#story" tabIndex={menuOpen ? 0 : -1} style={{ "--item-index": 2 } as CSSProperties} onClick={() => setMenuOpen(false)}>
              <span className="nav-menu-index">02</span>
              <BookOpen size={18} />
              <span className="nav-menu-copy">
                <span className="nav-menu-link-text">Hikaye</span>
                <span className="nav-menu-link-meta">Tarihi Rum binası</span>
              </span>
              <ChevronRight size={17} />
            </a>
            <Link href="/menu" tabIndex={menuOpen ? 0 : -1} style={{ "--item-index": 3 } as CSSProperties} onClick={() => setMenuOpen(false)}>
              <span className="nav-menu-index">03</span>
              <BookOpen size={18} />
              <span className="nav-menu-copy">
                <span className="nav-menu-link-text">Menü</span>
                <span className="nav-menu-link-meta">Fiyatlar ve içerik</span>
              </span>
              <ChevronRight size={17} />
            </Link>
            <a href="#gallery" tabIndex={menuOpen ? 0 : -1} style={{ "--item-index": 4 } as CSSProperties} onClick={() => setMenuOpen(false)}>
              <span className="nav-menu-index">04</span>
              <Camera size={18} />
              <span className="nav-menu-copy">
                <span className="nav-menu-link-text">Galeri</span>
                <span className="nav-menu-link-meta">Bakır, çay, masa</span>
              </span>
              <ChevronRight size={17} />
            </a>
            <Link href="/iletisim" tabIndex={menuOpen ? 0 : -1} style={{ "--item-index": 5 } as CSSProperties} onClick={() => setMenuOpen(false)}>
              <span className="nav-menu-index">05</span>
              <MapPin size={18} />
              <span className="nav-menu-copy">
                <span className="nav-menu-link-text">Konum</span>
                <span className="nav-menu-link-meta">Beyoğlu rotası</span>
              </span>
              <ChevronRight size={17} />
            </Link>
            <Link href="/van-kahvaltisi" tabIndex={menuOpen ? 0 : -1} style={{ "--item-index": 6 } as CSSProperties} onClick={() => setMenuOpen(false)}>
              <span className="nav-menu-index">06</span>
              <BookOpen size={18} />
              <span className="nav-menu-copy">
                <span className="nav-menu-link-text">Van kahvaltısı</span>
                <span className="nav-menu-link-meta">Rehber ve içerik</span>
              </span>
              <ChevronRight size={17} />
            </Link>
            <Link href="/sss" tabIndex={menuOpen ? 0 : -1} style={{ "--item-index": 7 } as CSSProperties} onClick={() => setMenuOpen(false)}>
              <span className="nav-menu-index">07</span>
              <CircleHelp size={18} />
              <span className="nav-menu-copy">
                <span className="nav-menu-link-text">Sıkça sorulanlar</span>
                <span className="nav-menu-link-meta">Kısa ve net cevaplar</span>
              </span>
              <ChevronRight size={17} />
            </Link>
            <a
              href={whatsappUrl}
              tabIndex={menuOpen ? 0 : -1}
              style={{ "--item-index": 8 } as CSSProperties}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
            >
              <span className="nav-menu-index">08</span>
              <MessageCircle size={18} />
              <span className="nav-menu-copy">
                <span className="nav-menu-link-text">WhatsApp</span>
                <span className="nav-menu-link-meta">Hızlı iletişim</span>
              </span>
              <ChevronRight size={17} />
            </a>
            <div className="nav-menu-signature" aria-hidden="true" style={{ "--item-index": 9 } as CSSProperties}>
              <span>
                Tarihi<em>Van</em>
              </span>
              <small>Kahvaltıcısı</small>
            </div>
          </div>
        </header>

        {children}
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
