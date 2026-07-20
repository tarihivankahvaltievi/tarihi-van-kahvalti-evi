"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  Languages,
  MapPin,
  MessageCircle,
  UtensilsCrossed,
} from "lucide-react";
import { mapsUrl, whatsappUrl } from "./seo";
import { messagesFor, type SiteLocale } from "./home-localization";

const BookingModal = dynamic(
  () => import("./components/booking-modal").then((mod) => mod.BookingModal),
  { ssr: false },
);

export default function ClientPage({ children, locale = "tr" }: { children: ReactNode; locale?: SiteLocale }) {
  const messages = messagesFor(locale);
  const pathname = usePathname();
  const isMenuPage = pathname === "/menu" || pathname === "/en/menu";
  const isLocationPage = pathname === "/konum";
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [preselectedItem, setPreselectedItem] = useState("");
  const [preselectedType, setPreselectedType] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileBarHidden, setMobileBarHidden] = useState(false);
  const lastScrollY = useRef(0);
  const scrollFrame = useRef<number | null>(null);
  const scrolledRef = useRef(false);
  const mobileBarHiddenRef = useRef(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuPanelRef = useRef<HTMLDivElement>(null);
  const [hoverStyle, setHoverStyle] = useState<CSSProperties>({
    opacity: 0,
    left: 0,
    width: 0,
  });

  useEffect(() => {
    document.documentElement.lang = messages.documentLanguage;
  }, [messages.documentLanguage]);

  useEffect(() => {
    const updateScrollState = () => {
      scrollFrame.current = null;
      const currentScrollY = Math.max(window.scrollY, 0);
      const nextScrolled = currentScrollY > 40;

      if (nextScrolled !== scrolledRef.current) {
        scrolledRef.current = nextScrolled;
        setScrolled(nextScrolled);
      }

      if (!isMenuPage) {
        const delta = currentScrollY - lastScrollY.current;
        let nextMobileBarHidden = mobileBarHiddenRef.current;
        if (currentScrollY < 56) {
          nextMobileBarHidden = false;
        } else if (Math.abs(delta) > 6) {
          nextMobileBarHidden = delta > 0;
        }

        if (nextMobileBarHidden !== mobileBarHiddenRef.current) {
          mobileBarHiddenRef.current = nextMobileBarHidden;
          setMobileBarHidden(nextMobileBarHidden);
        }
      }

      lastScrollY.current = currentScrollY;
    };

    const handleScroll = () => {
      if (scrollFrame.current === null) {
        scrollFrame.current = window.requestAnimationFrame(updateScrollState);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    lastScrollY.current = Math.max(window.scrollY, 0);
    updateScrollState();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollFrame.current !== null) {
        window.cancelAnimationFrame(scrollFrame.current);
      }
    };
  }, [isMenuPage]);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        return;
      }

      if (event.key === "Tab") {
        const focusable = Array.from(
          menuPanelRef.current?.querySelectorAll<HTMLElement>(
            "[data-menu-title], a[href], button:not([disabled])",
          ) ?? [],
        );

        if (focusable.length === 0) {
          return;
        }

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    const menuButton = menuButtonRef.current;
    const focusFrame = window.requestAnimationFrame(() => {
      menuPanelRef.current?.querySelector<HTMLElement>("[data-menu-title]")?.focus();
    });
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.cancelAnimationFrame(focusFrame);
      document.body.style.overflow = previousOverflow;
      menuButton?.focus();
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleBookingRequest = (event: Event) => {
      const detail = (event as CustomEvent<{ itemTitle?: string; category?: string }>).detail;
      setPreselectedItem(detail?.itemTitle || "");
      setPreselectedType(detail?.category || (locale === "en" ? "Breakfast" : "Kahvaltı"));
      setIsBookingOpen(true);
    };

    window.addEventListener("open-booking", handleBookingRequest);
    return () => window.removeEventListener("open-booking", handleBookingRequest);
  }, [locale]);

  const handleOpenBooking = (itemTitle?: string, category?: string) => {
    setPreselectedItem(itemTitle || "");
    setPreselectedType(category || (locale === "en" ? "Breakfast" : "Kahvaltı"));
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
      <div id="top" lang={messages.documentLanguage} className={`site-shell theme-breakfast ${isMenuPage ? "menu-page-shell" : ""}`}>
        <header className={`nav ${scrolled ? "scrolled" : ""} ${menuOpen ? "menu-open" : ""}`}>
          <div className="logo-wrap">
            <div className="logo-emblem brand-logo-mark" aria-hidden="true">
              <Image
                src="/images/brand-icon-small.png"
                alt="Tarihi Van Kahvaltı Evi"
                width={54}
                height={68}
                loading="eager"
                className="brand-logo-image"
              />
            </div>
            <Link className="logo" href={messages.homeHref} aria-label={locale === "en" ? "Tarihi Van Kahvaltı Evi English home" : "Tarihi Van Kahvaltı Evi ana sayfası"}>
              <span className="logo-word">
                <span className="logo-tarihi">Tarihi</span><span className="logo-van">Van</span>
              </span>
              <span className="logo-subtitle">
                <span>Kahvaltı Evi</span>
              </span>
            </Link>
          </div>

          <nav className="nav-links" aria-label={messages.nav.aria} onMouseLeave={handleMouseLeave}>
            <span className="nav-hover-pill" style={hoverStyle} />
            <Link href={messages.aboutHref} onMouseEnter={handleMouseEnter}>{messages.nav.about}</Link>
            <Link href={messages.menuHref} aria-current={isMenuPage ? "page" : undefined} onMouseEnter={handleMouseEnter}>{messages.nav.menu}</Link>
            <Link href={messages.galleryHref} onMouseEnter={handleMouseEnter}>{messages.nav.gallery}</Link>
            {locale === "en" ? (
              <a href={mapsUrl} target="_blank" rel="noopener noreferrer" onMouseEnter={handleMouseEnter}>{messages.nav.location}</a>
            ) : (
              <Link href="/konum" aria-current={isLocationPage ? "page" : undefined} onMouseEnter={handleMouseEnter}>{messages.nav.location}</Link>
            )}
            <Link href={messages.faqHref} onMouseEnter={handleMouseEnter}>{messages.nav.faq}</Link>
          </nav>

          <div className="nav-actions">
            <Link
              className="nav-language"
              href={messages.alternateHref}
              hrefLang={locale === "en" ? "tr" : "en"}
              lang={locale === "en" ? "tr" : "en"}
              aria-label={messages.alternateLanguageLabel}
            >
              {messages.alternateLanguage}
            </Link>
            <a className="nav-location" href={mapsUrl} target="_blank" rel="noopener noreferrer">
              <MapPin size={16} />
              <span>Beyoğlu</span>
            </a>
            <button
              ref={menuButtonRef}
              type="button"
              className="nav-menu-button"
              aria-label={menuOpen ? messages.nav.close : messages.nav.open}
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
            ref={menuPanelRef}
            id="site-menu"
            className="nav-menu-panel"
            role="dialog"
            aria-modal="true"
            aria-hidden={!menuOpen}
            inert={!menuOpen}
            aria-labelledby="site-menu-title"
          >
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
            <div className="nav-drawer-head">
              <span id="site-menu-title" data-menu-title tabIndex={-1}>{messages.nav.panelTitle}</span>
              <small>1978 · Beyoğlu</small>
            </div>
            <Link className="nav-menu-primary" href={messages.homeHref} tabIndex={menuOpen ? 0 : -1} style={{ "--item-index": 1 } as CSSProperties} onClick={() => setMenuOpen(false)}>
              <Home size={18} />
              <span className="nav-menu-copy">
                <span className="nav-menu-link-text">{messages.nav.home[0]}</span>
                <span className="nav-menu-link-meta">{messages.nav.home[1]}</span>
              </span>
              <ChevronRight size={17} />
            </Link>
            <Link className="nav-menu-primary" href={messages.aboutHref} tabIndex={menuOpen ? 0 : -1} style={{ "--item-index": 2 } as CSSProperties} onClick={() => setMenuOpen(false)}>
              <BookOpen size={18} />
              <span className="nav-menu-copy">
                <span className="nav-menu-link-text">{messages.nav.story[0]}</span>
                <span className="nav-menu-link-meta">{messages.nav.story[1]}</span>
              </span>
              <ChevronRight size={17} />
            </Link>
            <Link className="nav-menu-primary" href={messages.menuHref} aria-current={isMenuPage ? "page" : undefined} tabIndex={menuOpen ? 0 : -1} style={{ "--item-index": 3 } as CSSProperties} onClick={() => setMenuOpen(false)}>
              <BookOpen size={18} />
              <span className="nav-menu-copy">
                <span className="nav-menu-link-text">{messages.nav.liveMenu[0]}</span>
                <span className="nav-menu-link-meta">{messages.nav.liveMenu[1]}</span>
              </span>
              <ChevronRight size={17} />
            </Link>
            <Link className="nav-menu-primary" href={messages.galleryHref} tabIndex={menuOpen ? 0 : -1} style={{ "--item-index": 4 } as CSSProperties} onClick={() => setMenuOpen(false)}>
              <Camera size={18} />
              <span className="nav-menu-copy">
                <span className="nav-menu-link-text">{messages.nav.galleryItem[0]}</span>
                <span className="nav-menu-link-meta">{messages.nav.galleryItem[1]}</span>
              </span>
              <ChevronRight size={17} />
            </Link>
            <a className="nav-menu-primary" href={locale === "en" ? mapsUrl : "/konum"} target={locale === "en" ? "_blank" : undefined} rel={locale === "en" ? "noopener noreferrer" : undefined} aria-current={isLocationPage ? "page" : undefined} tabIndex={menuOpen ? 0 : -1} style={{ "--item-index": 5 } as CSSProperties} onClick={() => setMenuOpen(false)}>
              <MapPin size={18} />
              <span className="nav-menu-copy">
                <span className="nav-menu-link-text">{messages.nav.directions[0]}</span>
                <span className="nav-menu-link-meta">{messages.nav.directions[1]}</span>
              </span>
              <ChevronRight size={17} />
            </a>
            <Link className="nav-menu-utility" href={locale === "en" ? messages.aboutHref : "/van-kahvaltisi"} tabIndex={menuOpen ? 0 : -1} style={{ "--item-index": 6 } as CSSProperties} onClick={() => setMenuOpen(false)}>
              <BookOpen size={18} />
              <span className="nav-menu-copy">
                <span className="nav-menu-link-text">{messages.nav.breakfast[0]}</span>
                <span className="nav-menu-link-meta">{messages.nav.breakfast[1]}</span>
              </span>
              <ChevronRight size={17} />
            </Link>
            <Link className="nav-menu-utility" href={messages.faqHref} tabIndex={menuOpen ? 0 : -1} style={{ "--item-index": 7 } as CSSProperties} onClick={() => setMenuOpen(false)}>
              <CircleHelp size={18} />
              <span className="nav-menu-copy">
                <span className="nav-menu-link-text">{messages.nav.questions[0]}</span>
                <span className="nav-menu-link-meta">{messages.nav.questions[1]}</span>
              </span>
              <ChevronRight size={17} />
            </Link>
            <a
              className="nav-menu-utility"
              href={whatsappUrl}
              tabIndex={menuOpen ? 0 : -1}
              style={{ "--item-index": 8 } as CSSProperties}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
            >
              <MessageCircle size={18} />
              <span className="nav-menu-copy">
                <span className="nav-menu-link-text">{messages.nav.whatsapp[0]}</span>
                <span className="nav-menu-link-meta">{messages.nav.whatsapp[1]}</span>
              </span>
              <ChevronRight size={17} />
            </a>
            <Link
              className="nav-menu-utility nav-menu-language"
              href={messages.alternateHref}
              hrefLang={locale === "en" ? "tr" : "en"}
              lang={locale === "en" ? "tr" : "en"}
              tabIndex={menuOpen ? 0 : -1}
              style={{ "--item-index": 9 } as CSSProperties}
              onClick={() => setMenuOpen(false)}
            >
              <Languages size={18} />
              <span className="nav-menu-copy">
                <span className="nav-menu-link-text">{messages.alternateLanguageLabel}</span>
                <span className="nav-menu-link-meta">{messages.alternateLanguage}</span>
              </span>
              <ChevronRight size={17} />
            </Link>
            <div className="nav-drawer-footer">
              <button
                type="button"
                className="nav-drawer-book"
                tabIndex={menuOpen ? 0 : -1}
                onClick={() => {
                  setMenuOpen(false);
                  handleOpenBooking();
                }}
              >
                <Calendar size={17} />
                <span>{messages.nav.book}</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </header>

        <button
          type="button"
          className={`nav-menu-backdrop ${menuOpen ? "is-visible" : ""}`}
          aria-label={messages.nav.close}
          tabIndex={-1}
          onClick={() => setMenuOpen(false)}
        />

        {children}
      </div>

      {!isMenuPage ? (
        <div className={`mobile-bar ${mobileBarHidden || menuOpen ? "is-hidden" : ""}`} role="navigation" aria-label={messages.mobile.aria}>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label={messages.mobile.whatsappAria}>
            <MessageCircle size={20} />
            <span className="mobile-bar-label">WhatsApp</span>
          </a>
          <Link className="mobile-bar-primary" href={messages.menuHref} aria-label={messages.mobile.menuAria}>
            <UtensilsCrossed size={22} className="mobile-bar-highlight-icon" />
            <span className="mobile-bar-label">{messages.mobile.menu}</span>
          </Link>
          <a href={mapsUrl} target="_blank" rel="noopener noreferrer" aria-label={messages.mobile.directionsAria}>
            <MapPin size={20} />
            <span className="mobile-bar-label">{messages.mobile.directions}</span>
          </a>
        </div>
      ) : null}

      {isBookingOpen ? (
        <BookingModal
          key={`${isBookingOpen}-${preselectedType}-${preselectedItem}`}
          isOpen={isBookingOpen}
          onClose={() => setIsBookingOpen(false)}
          preselectedType={preselectedType}
          preselectedItem={preselectedItem}
          locale={locale}
        />
      ) : null}
    </>
  );
}
