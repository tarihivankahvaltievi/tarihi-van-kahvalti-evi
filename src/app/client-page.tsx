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
import { MessageCircle } from "lucide-react";
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
                    width={38}
                    height={48}
                    loading="eager"
                    className="brand-logo-image"
                    style={{ width: "100%", height: "auto" }}
                  />
                </div>
                <div className="nav-logo-text">
                  <span className="nav-logo-provenance">1978 · BEYOĞLU</span>
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
                <li className="nav-lang-item">
                  <Link
                    className="nav-language"
                    href={alternateHref}
                    hrefLang={locale === "en" ? "tr" : "en"}
                    lang={locale === "en" ? "tr" : "en"}
                    aria-label={messages.alternateLanguageLabel}
                  >
                    {locale === "en" ? "TR" : "EN"}
                  </Link>
                </li>
              </ul>

              <div className="nav-actions-mobile">
                <Link
                  className="nav-language"
                  href={alternateHref}
                  hrefLang={locale === "en" ? "tr" : "en"}
                  lang={locale === "en" ? "tr" : "en"}
                  aria-label={messages.alternateLanguageLabel}
                >
                  {locale === "en" ? "TR" : "EN"}
                </Link>
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
            </div>

            <div
              id="mobile-drawer-menu"
              ref={menuPanelRef}
              className={`mobile-drawer ${menuOpen ? "open" : ""}`}
              role="dialog"
              aria-modal="true"
              aria-hidden={!menuOpen}
            >
              <div className="mobile-drawer-heading" tabIndex={-1} data-menu-title>
                <span>{locale === "en" ? "DISCOVER" : "KEŞFET"}</span>
                <p>{locale === "en" ? "A table with a story." : "Hikâyesi olan bir sofra."}</p>
              </div>
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
                <Link
                  className="mobile-drawer-lang-btn"
                  href={alternateHref}
                  hrefLang={locale === "en" ? "tr" : "en"}
                  lang={locale === "en" ? "tr" : "en"}
                  onClick={() => setMenuOpen(false)}
                >
                  <span>{locale === "en" ? "Türkçe versiyona geç (TR)" : "Switch to English (EN)"}</span>
                </Link>
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
                <div className="mobile-drawer-intl-list">
                  <Link href="/en/blog/turkish-breakfast-istanbul" hrefLang="en" onClick={() => setMenuOpen(false)}>English Guide</Link>
                  <Link href="/ru/blog/turetskiy-zavtrak-stambul" hrefLang="ru" onClick={() => setMenuOpen(false)}>Русский гид</Link>
                  <Link href="/ar/blog/turkish-breakfast-istanbul" hrefLang="ar" onClick={() => setMenuOpen(false)}>دليل تركي</Link>
                  <Link href="/ko" hrefLang="ko" onClick={() => setMenuOpen(false)}>한국어 안내</Link>
                  <Link href="/ja/blog/istanbul-bal-kaymak" hrefLang="ja" onClick={() => setMenuOpen(false)}>日本語ガイド</Link>
                </div>
              </div>
            </div>
          </nav>
        </header>

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
