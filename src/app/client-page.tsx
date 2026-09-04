"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  Calendar,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import { displayPhone, instagramUrl, mapsUrl, telUrl, whatsappUrl } from "./seo";
import { messagesFor, type SiteLocale } from "./home-localization";
import { trackEvent } from "./analytics";

export default function ClientPage({ children, locale = "tr" }: { children: ReactNode; locale?: SiteLocale }) {
  const messages = messagesFor(locale);
  const router = useRouter();
  const pathname = usePathname();
  const isMenuPage = pathname === "/menu" || pathname === "/en/menu";
  const isLocationPage = pathname === "/konum";
  const isReservationPage = pathname === "/rezervasyon" || pathname === "/en/rezervasyon";
  const alternateHref = isMenuPage
    ? locale === "en" ? "/menu" : "/en/menu"
    : isReservationPage
    ? locale === "en" ? "/rezervasyon" : "/en/rezervasyon"
    : messages.alternateHref;
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileBarHidden, setMobileBarHidden] = useState(false);
  const lastScrollY = useRef(0);
  const scrollFrame = useRef<number | null>(null);
  const scrolledRef = useRef(false);
  const mobileBarHiddenRef = useRef(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuPanelRef = useRef<HTMLDivElement>(null);


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
      const targetPath = locale === "en" ? "/en/rezervasyon" : "/rezervasyon";
      const params = new URLSearchParams();
      if (detail?.category) {
        params.set("service", detail.category.toLowerCase().includes("cafe") ? "cafe" : "breakfast");
      }
      if (detail?.itemTitle) {
        params.set("item", detail.itemTitle);
      }
      const queryStr = params.toString() ? `?${params.toString()}` : "";
      router.push(`${targetPath}${queryStr}`);
    };

    window.addEventListener("open-booking", handleBookingRequest);
    return () => window.removeEventListener("open-booking", handleBookingRequest);
  }, [locale, router]);



  return (
    <>
      <div id="top" lang={messages.documentLanguage} className={`site-shell theme-breakfast ${isMenuPage ? "menu-page-shell" : ""}`}>
        <header className={`header-wrapper ${scrolled ? "is-scrolled" : ""}`}>
          <div className="navbar-topbar">
            <div className="topbar-container">
              <div className="topbar-left">
                <a
                  href={telUrl}
                  className="topbar-info"
                  onClick={() => trackEvent("contact_click", { contact_method: "phone", surface: "topbar" })}
                >
                  <Phone size={13} />
                  <span>{displayPhone}</span>
                </a>
              </div>
              <div className="topbar-right">
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="topbar-social-link"
                  title="Instagram"
                  aria-label="Instagram"
                  onClick={() => trackEvent("contact_click", { contact_method: "instagram", surface: "topbar" })}
                >
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="topbar-social-link"
                  title="WhatsApp"
                  aria-label="WhatsApp"
                  onClick={() => trackEvent("contact_click", { contact_method: "whatsapp", surface: "topbar" })}
                >
                  <MessageCircle size={14} />
                </a>
                <span className="topbar-separator" aria-hidden="true">|</span>
                <Link
                  className="topbar-lang-toggle"
                  href={alternateHref}
                  hrefLang={locale === "en" ? "tr" : "en"}
                  lang={locale === "en" ? "tr" : "en"}
                  aria-label={messages.alternateLanguageLabel}
                >
                  {locale === "en" ? "TR" : "EN"}
                </Link>
              </div>
            </div>
          </div>

          <nav className="glass-nav">
            <div className="nav-container">
              <Link
                className="nav-logo"
                href={messages.homeHref}
                aria-label="Tarihi Van Kahvaltı Evi"
                onClick={(e) => {
                  setMenuOpen(false);
                  if (pathname === "/" || pathname === "/en") {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
              >
                <div className="nav-logo-emblem" aria-hidden="true">
                  <Image
                    src="/images/brand-icon-small.png"
                    alt="Tarihi Van Kahvaltı Evi"
                    width={42}
                    height={52}
                    loading="eager"
                    className="brand-logo-image"
                  />
                </div>
                <div className="nav-logo-text">
                  <span className="nav-logo-main">TARİHİ VAN</span>
                  <span className="nav-logo-sub">KAHVALTI EVİ</span>
                </div>
              </Link>

              <ul className="nav-links">
                <li>
                  <Link
                    href={messages.homeHref}
                    className={`nav-link ${pathname === "/" || pathname === "/en" ? "active" : ""}`}
                  >
                    {locale === "en" ? "HOME" : "ANA SAYFA"}
                  </Link>
                </li>
                <li>
                  <Link
                    href={messages.aboutHref}
                    className={`nav-link ${pathname === "/hikayemiz" ? "active" : ""}`}
                  >
                    {locale === "en" ? "ABOUT US" : "HİKAYEMİZ"}
                  </Link>
                </li>
                <li>
                  <Link
                    href={messages.menuHref}
                    className={`nav-link ${isMenuPage ? "active" : ""}`}
                  >
                    {locale === "en" ? "MENU" : "MENÜ"}
                  </Link>
                </li>
                <li>
                  <Link
                    href={locale === "en" ? "/en/rezervasyon" : "/rezervasyon"}
                    className={`nav-link ${isReservationPage ? "active" : ""}`}
                  >
                    {locale === "en" ? "RESERVATION" : "REZERVASYON"}
                  </Link>
                </li>
                <li>
                  <Link
                    href={messages.galleryHref}
                    className="nav-link"
                  >
                    {locale === "en" ? "GALLERY" : "GALERİ"}
                  </Link>
                </li>
                <li>
                  <Link
                    href={messages.faqHref}
                    className="nav-link"
                  >
                    {locale === "en" ? "FAQ" : "SSS"}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/konum"
                    className={`nav-link ${isLocationPage ? "active" : ""}`}
                  >
                    {locale === "en" ? "LOCATION" : "KONUM"}
                  </Link>
                </li>
              </ul>

              <button
                ref={menuButtonRef}
                type="button"
                className={`mobile-toggle ${menuOpen ? "open" : ""}`}
                aria-label={menuOpen ? messages.nav.close : messages.nav.open}
                aria-expanded={menuOpen}
                aria-controls="mobile-drawer-menu"
                onClick={() => setMenuOpen((open) => !open)}
              >
                <span className="toggle-bar top-bar" />
                <span className="toggle-bar mid-bar" />
                <span className="toggle-bar bot-bar" />
              </button>
            </div>

            {menuOpen && (
              <div
                id="mobile-drawer-menu"
                ref={menuPanelRef}
                className="mobile-drawer"
                role="dialog"
                aria-modal="true"
              >
                <ul className="mobile-links">
                  <li>
                    <Link
                      href={messages.homeHref}
                      className={`mobile-link ${pathname === "/" || pathname === "/en" ? "active" : ""}`}
                      onClick={() => setMenuOpen(false)}
                    >
                      {locale === "en" ? "ANA SAYFA" : "ANA SAYFA"}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={messages.aboutHref}
                      className={`mobile-link ${pathname === "/hikayemiz" ? "active" : ""}`}
                      onClick={() => setMenuOpen(false)}
                    >
                      {locale === "en" ? "HİKAYEMİZ" : "HİKAYEMİZ"}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={messages.menuHref}
                      className={`mobile-link ${isMenuPage ? "active" : ""}`}
                      onClick={() => setMenuOpen(false)}
                    >
                      {locale === "en" ? "MENÜ" : "MENÜ"}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={locale === "en" ? "/en/rezervasyon" : "/rezervasyon"}
                      className={`mobile-link ${isReservationPage ? "active" : ""}`}
                      onClick={() => setMenuOpen(false)}
                    >
                      {locale === "en" ? "REZERVASYON" : "REZERVASYON"}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={messages.galleryHref}
                      className="mobile-link"
                      onClick={() => setMenuOpen(false)}
                    >
                      {locale === "en" ? "GALERİ" : "GALERİ"}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={messages.faqHref}
                      className="mobile-link"
                      onClick={() => setMenuOpen(false)}
                    >
                      {locale === "en" ? "SSS" : "SSS"}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/konum"
                      className={`mobile-link ${isLocationPage ? "active" : ""}`}
                      onClick={() => setMenuOpen(false)}
                    >
                      {locale === "en" ? "KONUM" : "KONUM"}
                    </Link>
                  </li>
                </ul>
                <div className="mobile-drawer-actions">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mobile-drawer-whatsapp-btn"
                    onClick={() => {
                      setMenuOpen(false);
                      trackEvent("contact_click", { contact_method: "whatsapp", surface: "mobile_drawer" });
                    }}
                  >
                    <MessageCircle size={16} />
                    <span>{locale === "en" ? "WhatsApp Reservation" : "WhatsApp Rezervasyon"}</span>
                  </a>
                </div>
              </div>
            )}
          </nav>
        </header>

        {menuOpen && (
          <button
            type="button"
            className="mobile-drawer-backdrop"
            aria-label={messages.nav.close}
            tabIndex={-1}
            onClick={() => setMenuOpen(false)}
          />
        )}

        {children}
      </div>

      <div className={`mobile-bar ${mobileBarHidden || menuOpen || isReservationPage ? "is-hidden" : ""}`} role="navigation" aria-label={messages.mobile.aria}>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={messages.mobile.whatsappAria}
            onClick={() => trackEvent("contact_click", { contact_method: "whatsapp", surface: "mobile_bar" })}
          >
            <MessageCircle size={20} />
            <span className="mobile-bar-label">WhatsApp</span>
          </a>
          <Link
            href={locale === "en" ? "/en/rezervasyon" : "/rezervasyon"}
            className="mobile-bar-primary"
            aria-label={locale === "en" ? "Request a table" : "Rezervasyon yap"}
            onClick={() => trackEvent("booking_modal_open", { locale, entry_point: "mobile_bar" })}
          >
            <Calendar size={22} className="mobile-bar-highlight-icon" />
            <span className="mobile-bar-label">{locale === "en" ? "Book" : "Rezervasyon"}</span>
          </Link>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={messages.mobile.directionsAria}
            onClick={() => trackEvent("contact_click", { contact_method: "directions", surface: "mobile_bar" })}
          >
            <MapPin size={20} />
            <span className="mobile-bar-label">{messages.mobile.directions}</span>
          </a>
      </div>
    </>
  );
}
