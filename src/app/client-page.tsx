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
import { MessageCircle, Calendar, X } from "lucide-react";
import { whatsappUrl } from "./seo";
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
  const lastScrollY = useRef(0);
  const scrollFrame = useRef<number | null>(null);
  const scrolledRef = useRef(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.lang = messages.documentLanguage;
  }, [messages.documentLanguage]);

  useEffect(() => {
    const updateScrollState = () => {
      scrollFrame.current = null;
      const currentScrollY = Math.max(window.scrollY, 0);
      const nextScrolled = currentScrollY > 20;

      if (nextScrolled !== scrolledRef.current) {
        scrolledRef.current = nextScrolled;
        setScrolled(nextScrolled);
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
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("aos-animate");
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -20px 0px" }
    );

    const observeNewElements = () => {
      const elements = document.querySelectorAll("[data-aos]:not(.aos-animate)");
      elements.forEach((el) => observer.observe(el));
    };

    observeNewElements();

    const mutationObserver = new MutationObserver(() => {
      observeNewElements();
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [pathname]);


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
      menuPanelRef.current?.querySelector<HTMLElement>(".drawer-close-trigger, a")?.focus();
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
        <header className={`header-wrapper ${scrolled ? "is-scrolled" : ""} ${menuOpen ? "drawer-is-open" : ""}`}>
          <nav className="glass-nav" aria-label={messages.nav.aria}>
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
                    width={36}
                    height={46}
                    loading="eager"
                    className="brand-logo-image"
                    style={{ width: "100%", height: "auto" }}
                  />
                </div>
                <div className="nav-logo-text">
                  <span className="nav-logo-main">TARİHİ VAN</span>
                  <span className="nav-logo-sub">
                    KAHVALTI EVİ<span className="nav-logo-sub-tag"> · 1978 BEYOĞLU</span>
                  </span>
                </div>
              </Link>

              {/* Desktop Primary Navigation Links */}
              <ul className="nav-links">
                <li>
                  <Link
                    href={messages.aboutHref}
                    className={`nav-link ${pathname === "/hikayemiz" ? "active" : ""}`}
                  >
                    {locale === "en" ? "OUR STORY" : "HİKAYEMİZ"}
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
                    href="/van-kahvaltisi"
                    className={`nav-link ${pathname === "/van-kahvaltisi" ? "active" : ""}`}
                  >
                    {locale === "en" ? "VAN BREAKFAST" : "VAN KAHVALTISI"}
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
                    href="/konum"
                    className={`nav-link ${isLocationPage ? "active" : ""}`}
                  >
                    {locale === "en" ? "LOCATION" : "KONUM"}
                  </Link>
                </li>
              </ul>

              {/* Desktop Action Cluster */}
              <div className="nav-actions-desktop">
                <Link
                  className="nav-lang-toggle"
                  href={alternateHref}
                  hrefLang={locale === "en" ? "tr" : "en"}
                  lang={locale === "en" ? "tr" : "en"}
                  aria-label={messages.alternateLanguageLabel}
                >
                  <span className={locale === "tr" ? "lang-opt is-active" : "lang-opt"}>TR</span>
                  <span className="lang-divider" aria-hidden="true">/</span>
                  <span className={locale === "en" ? "lang-opt is-active" : "lang-opt"}>EN</span>
                </Link>
                <Link
                  href={locale === "en" ? "/en/rezervasyon" : "/rezervasyon"}
                  className={`nav-reserve-btn ${isReservationPage ? "is-active" : ""}`}
                  onClick={() => {
                    trackEvent("booking_cta_click", { location: "header_desktop", surface: "navbar" });
                  }}
                >
                  <span>{locale === "en" ? "Reserve Table" : "Masa Ayırt"}</span>
                </Link>
              </div>

              {/* Mobile Action Cluster */}
              <div className="nav-actions-mobile">
                <Link
                  className="mobile-lang-badge"
                  href={alternateHref}
                  hrefLang={locale === "en" ? "tr" : "en"}
                  lang={locale === "en" ? "tr" : "en"}
                  aria-label={messages.alternateLanguageLabel}
                >
                  <span>{locale === "en" ? "TR" : "EN"}</span>
                </Link>
                <button
                  ref={menuButtonRef}
                  type="button"
                  className={`luxury-hamburger ${menuOpen ? "is-open" : ""}`}
                  aria-label={menuOpen ? messages.nav.close : messages.nav.open}
                  aria-expanded={menuOpen}
                  aria-controls="mobile-editorial-drawer"
                  onClick={() => setMenuOpen((open) => !open)}
                >
                  <span className="hamburger-line bar-top" />
                  <span className="hamburger-line bar-bottom" />
                </button>
              </div>
            </div>
          </nav>
        </header>

        {/* Full-Height Mobile Editorial Sheet Drawer */}
        <div
          id="mobile-editorial-drawer"
          ref={menuPanelRef}
          className={`mobile-editorial-drawer ${menuOpen ? "is-open" : ""}`}
          role="dialog"
          aria-modal="true"
          aria-hidden={!menuOpen}
          aria-label={messages.nav.aria}
        >
          <div className="drawer-header">
            <div className="drawer-brand">
              <Image
                src="/images/brand-icon-small.png"
                alt=""
                width={26}
                height={34}
                aria-hidden="true"
                className="drawer-brand-emblem"
              />
              <div className="drawer-brand-text">
                <span className="drawer-brand-title">TARİHİ VAN</span>
                <span className="drawer-brand-sub">1978 · BEYOĞLU</span>
              </div>
            </div>
            <button
              type="button"
              className="drawer-close-trigger"
              aria-label={messages.nav.close}
              onClick={() => setMenuOpen(false)}
            >
              <X size={20} aria-hidden="true" />
            </button>
          </div>

          <div className="drawer-body">
            <nav className="drawer-nav" aria-label={messages.nav.aria}>
              <ul className="drawer-nav-list">
                <li>
                  <Link
                    href={messages.homeHref}
                    className={`drawer-nav-link ${pathname === "/" || pathname === "/en" ? "is-active" : ""}`}
                    onClick={() => setMenuOpen(false)}
                  >
                    <span className="drawer-link-num">01</span>
                    <div className="drawer-link-content">
                      <span className="drawer-link-title">{locale === "en" ? "Home" : "Ana Sayfa"}</span>
                      <span className="drawer-link-desc">{locale === "en" ? "A table waiting in Beyoğlu" : "Sıcak sofra açılışı"}</span>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link
                    href={messages.aboutHref}
                    className={`drawer-nav-link ${pathname === "/hikayemiz" ? "is-active" : ""}`}
                    onClick={() => setMenuOpen(false)}
                  >
                    <span className="drawer-link-num">02</span>
                    <div className="drawer-link-content">
                      <span className="drawer-link-title">{locale === "en" ? "Our Story" : "Hikayemiz"}</span>
                      <span className="drawer-link-desc">{locale === "en" ? "A family tradition since 1978" : "1978'den bugüne aile emeği"}</span>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link
                    href={messages.menuHref}
                    className={`drawer-nav-link ${isMenuPage ? "is-active" : ""}`}
                    onClick={() => setMenuOpen(false)}
                  >
                    <span className="drawer-link-num">03</span>
                    <div className="drawer-link-content">
                      <span className="drawer-link-title">{locale === "en" ? "Menu & Prices" : "Menü ve Fiyatlar"}</span>
                      <span className="drawer-link-desc">{locale === "en" ? "Traditional Van table & warm pans" : "Serpme kahvaltı ve bakır sahanlar"}</span>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/van-kahvaltisi"
                    className={`drawer-nav-link ${pathname === "/van-kahvaltisi" ? "is-active" : ""}`}
                    onClick={() => setMenuOpen(false)}
                  >
                    <span className="drawer-link-num">04</span>
                    <div className="drawer-link-content">
                      <span className="drawer-link-title">{locale === "en" ? "Van Breakfast" : "Van Kahvaltısı"}</span>
                      <span className="drawer-link-desc">{locale === "en" ? "Herb cheese, murtuğa, kavut" : "Otlu peynir, murtuğa ve kavut"}</span>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link
                    href={messages.galleryHref}
                    className="drawer-nav-link"
                    onClick={() => setMenuOpen(false)}
                  >
                    <span className="drawer-link-num">05</span>
                    <div className="drawer-link-content">
                      <span className="drawer-link-title">{locale === "en" ? "Gallery" : "Galeri"}</span>
                      <span className="drawer-link-desc">{locale === "en" ? "Atmosphere & breakfast moments" : "Mekan ve sofra anları"}</span>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/konum"
                    className={`drawer-nav-link ${isLocationPage ? "is-active" : ""}`}
                    onClick={() => setMenuOpen(false)}
                  >
                    <span className="drawer-link-num">06</span>
                    <div className="drawer-link-content">
                      <span className="drawer-link-title">{locale === "en" ? "Location & Contact" : "Konum ve Ulaşım"}</span>
                      <span className="drawer-link-desc">{locale === "en" ? "Zambak Street, Taksim / Beyoğlu" : "Zambak Sokak, Taksim / Beyoğlu"}</span>
                    </div>
                  </Link>
                </li>
              </ul>
            </nav>

            <div className="drawer-cta-section">
              <Link
                href={locale === "en" ? "/en/rezervasyon" : "/rezervasyon"}
                className="drawer-cta-reserve"
                onClick={() => {
                  setMenuOpen(false);
                  trackEvent("booking_cta_click", { location: "drawer_mobile_primary", surface: "mobile_drawer" });
                }}
              >
                <Calendar size={18} aria-hidden="true" />
                <span>{locale === "en" ? "Reserve a Table" : "Masa Rezervasyonu"}</span>
              </Link>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="drawer-cta-whatsapp"
                onClick={() => {
                  setMenuOpen(false);
                  trackEvent("contact_click", { contact_method: "whatsapp", surface: "mobile_drawer" });
                }}
              >
                <MessageCircle size={18} aria-hidden="true" />
                <span>{locale === "en" ? "WhatsApp Concierge" : "WhatsApp İletişim"}</span>
              </a>
            </div>

            <div className="drawer-footer">
              <p className="drawer-venue-info">
                <span>{locale === "en" ? "Open Daily: 07:00 – 22:00" : "Her Gün: 07:00 – 22:00"}</span>
                <span className="drawer-info-sep" aria-hidden="true">·</span>
                <span>Beyoğlu, İstanbul</span>
              </p>
              <Link
                className="drawer-lang-switch-btn"
                href={alternateHref}
                hrefLang={locale === "en" ? "tr" : "en"}
                lang={locale === "en" ? "tr" : "en"}
                onClick={() => setMenuOpen(false)}
              >
                <span>{locale === "en" ? "Türkçe versiyona geç (TR)" : "Switch to English (EN)"}</span>
              </Link>
              <div className="drawer-intl-guide-chips">
                <Link href="/en/blog/turkish-breakfast-istanbul" hrefLang="en" onClick={() => setMenuOpen(false)}>English Guide</Link>
                <Link href="/ko" hrefLang="ko" onClick={() => setMenuOpen(false)}>한국어 안내</Link>
                <Link href="/ru/blog/turetskiy-zavtrak-stambul" hrefLang="ru" onClick={() => setMenuOpen(false)}>Русский гид</Link>
                <Link href="/ar/blog/turkish-breakfast-istanbul" hrefLang="ar" onClick={() => setMenuOpen(false)}>دليل تركي</Link>
                <Link href="/ja/blog/istanbul-bal-kaymak" hrefLang="ja" onClick={() => setMenuOpen(false)}>日本語</Link>
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          className={`mobile-drawer-backdrop ${menuOpen ? "open" : ""}`}
          aria-label={messages.nav.close}
          tabIndex={-1}
          onClick={() => setMenuOpen(false)}
        />

        {children}
      </div>
    </>
  );
}
