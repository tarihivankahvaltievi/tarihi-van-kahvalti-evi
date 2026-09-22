"use client";

import { ArrowRight, Search, X } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { memo, useCallback, useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import styles from "./menu.module.css";
import type { MenuCategory, MenuItem } from "./menu-data";
import { MenuCategoryIcon } from "./menu-category-icons";
import { menuMessages, type MenuLocale } from "./menu-localization";

const ProductSheet = dynamic(
  () => import("./product-sheet").then((module) => module.ProductSheet),
  { ssr: false },
);

type MenuCategoryIconName = "all" | "breakfast" | "pan" | "jam" | "van" | "hot-drink" | "cold-drink";

type MenuChapter = {
  id: string;
  label: Record<MenuLocale, string>;
  icon: MenuCategoryIconName;
  categories: string[];
};

const menuChapters: MenuChapter[] = [
  { id: "all", label: { tr: "Tüm Menü", en: "Full Menu" }, icon: "all", categories: [] },
  {
    id: "kahvalti",
    label: { tr: "Kahvaltı", en: "Breakfast" },
    icon: "breakfast",
    categories: ["kahvalti-menuleri", "peynirler", "zeytinler", "gozlemeler"],
  },
  {
    id: "van-sofrasi",
    label: { tr: "Van Sofrası", en: "Van Table" },
    icon: "van",
    categories: ["yoresel-tatlar", "receller", "ballar"],
  },
  {
    id: "sicaklar",
    label: { tr: "Sahandan", en: "From the Pan" },
    icon: "pan",
    categories: ["omletler", "menemenler", "yumurtalar", "sahanlar"],
  },
  {
    id: "caylar",
    label: { tr: "Çay & Sıcak", en: "Tea & Hot" },
    icon: "hot-drink",
    categories: ["sicak-icecekler", "bitki-caylari"],
  },
  {
    id: "kahveler",
    label: { tr: "Kahveler", en: "Coffee" },
    icon: "jam",
    categories: ["sicak-kahveler", "soguk-kahveler"],
  },
  {
    id: "soguklar",
    label: { tr: "Soğuk İçecek", en: "Cold Drinks" },
    icon: "cold-drink",
    categories: ["soft-icecekler", "soguk-icecekler", "milkshake-frozen-smoothie"],
  },
];

function normalize(value: string, locale: MenuLocale) {
  return value
    .toLocaleLowerCase(locale === "en" ? "en-US" : "tr-TR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function usePrefersReducedMotion() {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return reduceMotion;
}

const MenuRow = memo(function MenuRow({
  item,
  onOpen,
  locale,
  featured = false,
}: {
  item: MenuItem;
  onOpen: (item: MenuItem) => void;
  locale: MenuLocale;
  featured?: boolean;
}) {
  const messages = menuMessages[locale];
  const [imageFailed, setImageFailed] = useState(false);
  const visibleTag = item.tags.find(
    (tag) => tag === messages.featuredTag || tag === messages.newTag || tag === "Tavsiye" || tag === "Recommended",
  );
  const hasImage = Boolean(item.image && !imageFailed);

  return (
    <button
      id={item.id}
      type="button"
      className={`${styles.menuRow} ${hasImage ? styles.menuRowWithImage : styles.menuRowTextOnly} ${featured ? styles.menuRowFeatured : ""}`}
      onClick={() => onOpen(item)}
      aria-label={messages.cardAria(item.name, item.price)}
    >
      {hasImage ? (
        <span className={styles.menuRowMedia}>
          <Image
            src={item.image!}
            alt={item.imageAlt || item.name}
            fill
            sizes="(max-width: 760px) calc(100vw - 40px), 360px"
            quality={78}
            onError={() => setImageFailed(true)}
          />
        </span>
      ) : null}

      <span className={styles.menuRowBody}>
        <span className={styles.menuRowHeading}>
          <span className={styles.menuRowTitle}>{item.name}</span>
          <span className={styles.menuRowLeader} aria-hidden="true" />
          <span className={styles.menuRowPrice}>{item.price}</span>
        </span>
        <span className={styles.menuRowDescription}>{item.description}</span>
        {visibleTag ? <span className={styles.menuRowTag}>{visibleTag}</span> : null}
      </span>

      <span className={styles.menuRowArrow} aria-hidden="true">
        <ArrowRight size={16} />
      </span>
    </button>
  );
});

export function MenuExperience({
  initialCategories,
  initialItems,
  initialLastUpdated,
  locale = "tr",
}: {
  initialCategories: MenuCategory[];
  initialItems: MenuItem[];
  initialLastUpdated: string;
  locale?: MenuLocale;
}) {
  const messages = menuMessages[locale];
  const reduceMotion = usePrefersReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [activeChapter, setActiveChapter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isCatalogPinned, setIsCatalogPinned] = useState(false);
  const deferredSearch = useDeferredValue(searchTerm);

  const signatureSerpmeItem = useMemo(
    () =>
      initialItems.find((item) => item.id === "serpme-fix-menu") ||
      initialItems.find((item) => item.category === "kahvalti-menuleri") ||
      null,
    [initialItems],
  );

  const searchableCopy = useMemo(
    () =>
      new Map(
        initialItems.map((item) => [
          item.id,
          normalize([item.name, item.description, item.story, ...item.tags, ...item.details].join(" "), locale),
        ]),
      ),
    [initialItems, locale],
  );

  useEffect(() => {
    document.documentElement.classList.add("menu-scroll-root");
    document.body.classList.add("menu-scroll-root");
    return () => {
      document.documentElement.classList.remove("menu-scroll-root");
      document.body.classList.remove("menu-scroll-root");
    };
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsCatalogPinned(!entry.isIntersecting && entry.boundingClientRect.bottom <= 72),
      { rootMargin: "-72px 0px 0px", threshold: 0 },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  const activeChapterDefinition = menuChapters.find((chapter) => chapter.id === activeChapter) ?? menuChapters[0];

  const visibleItems = useMemo(() => {
    const query = normalize(deferredSearch, locale);
    return initialItems.filter((item) => {
      if (query) return searchableCopy.get(item.id)?.includes(query) ?? false;
      return activeChapterDefinition.id === "all" || activeChapterDefinition.categories.includes(item.category);
    });
  }, [activeChapterDefinition, deferredSearch, initialItems, locale, searchableCopy]);

  const groups = useMemo(
    () =>
      initialCategories
        .map((category) => ({
          ...category,
          items: visibleItems.filter((item) => item.category === category.id),
        }))
        .filter((group) => group.items.length > 0),
    [initialCategories, visibleItems],
  );

  const openItem = useCallback((item: MenuItem) => setSelectedItem(item), []);
  const closeItem = useCallback(() => setSelectedItem(null), []);

  const scrollToResults = () => {
    window.requestAnimationFrame(() => {
      const target = document.getElementById("menu-results");
      const catalog = document.getElementById("menu-catalog");
      if (!target || !catalog) return;
      const offset = 72 + catalog.getBoundingClientRect().height + 18;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: Math.max(0, top), behavior: reduceMotion ? "auto" : "smooth" });
    });
  };

  const selectChapter = (chapterId: string) => {
    setSearchTerm("");
    setActiveChapter(chapterId);
    searchInputRef.current?.blur();
    scrollToResults();
  };

  const handleBooking = () => {
    window.dispatchEvent(
      new CustomEvent("open-booking", {
        detail: {
          itemTitle: signatureSerpmeItem?.name || "Serpme Van Kahvaltısı",
          category: "Kahvaltı",
        },
      }),
    );
  };

  return (
    <main id="main-content" className={styles.page} lang={messages.pageLanguage}>
      <section ref={heroRef} className={styles.menuHero} aria-labelledby="menu-page-title">
        <Image
          src="/images/hero-parallax/overhead-feast.webp"
          alt={
            locale === "en"
              ? "A generous Van breakfast table set with copper pans, tea and regional dishes"
              : "Bakır sahanlar, çay ve yöresel lezzetlerle kurulmuş zengin Van kahvaltısı sofrası"
          }
          fill
          priority
          quality={84}
          sizes="100vw"
          className={styles.heroImage}
        />
        <div className={styles.heroShade} aria-hidden="true" />
        <div className={styles.heroContent}>
          <p className={styles.heroProvenance}>1978 · BEYOĞLU</p>
          <h1 id="menu-page-title" className={styles.heroTitle}>
            {locale === "en" ? "The Van breakfast," : "Van kahvaltısı,"}
            <span>{locale === "en" ? "served as it should be." : "olması gerektiği gibi."}</span>
          </h1>
          <p className={styles.heroIntro}>
            {locale === "en"
              ? "Highland cheeses, warm copper pans and samovar tea. Explore our current menu and prices."
              : "Yayla peynirleri, sıcak bakır sahanlar ve semaver çayı. Güncel menümüzü ve fiyatlarımızı keşfedin."}
          </p>

          {signatureSerpmeItem ? (
            <div className={styles.heroSignature}>
              <div className={styles.heroSignatureCopy}>
                <span>{locale === "en" ? "Our signature table" : "İmza soframız"}</span>
                <strong>{signatureSerpmeItem.name}</strong>
              </div>
              <div className={styles.heroSignaturePrice}>
                <strong>{signatureSerpmeItem.price}</strong>
                {signatureSerpmeItem.priceNote ? <span>{signatureSerpmeItem.priceNote}</span> : null}
              </div>
              <div className={styles.heroActions}>
                <button type="button" onClick={() => openItem(signatureSerpmeItem)} className={styles.heroDetailButton}>
                  {locale === "en" ? "See the table" : "Sofrayı incele"}
                  <ArrowRight size={17} />
                </button>
                <button type="button" onClick={handleBooking} className={styles.heroBookingButton}>
                  {locale === "en" ? "Reserve" : "Masa ayırt"}
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <nav
        id="menu-catalog"
        className={`${styles.discoveryBar} ${isCatalogPinned ? styles.discoveryPinned : ""}`}
        aria-label={messages.navigationAria}
      >
        <div className={styles.discoveryInner}>
          <div className={styles.chapterNav} aria-label={locale === "en" ? "Menu sections" : "Menü bölümleri"}>
            {menuChapters.map((chapter) => {
              const isActive = activeChapter === chapter.id && !searchTerm;
              return (
                <button
                  key={chapter.id}
                  type="button"
                  className={`${styles.chapterButton} ${isActive ? styles.activeChapter : ""}`}
                  aria-pressed={isActive}
                  onClick={() => selectChapter(chapter.id)}
                >
                  <span className={styles.chapterIcon} aria-hidden="true">
                    <MenuCategoryIcon name={chapter.icon} />
                  </span>
                  <span>{chapter.label[locale]}</span>
                </button>
              );
            })}
          </div>

          <div className={styles.searchBox}>
            <Search size={18} aria-hidden="true" />
            <label className={styles.srOnly} htmlFor="menu-search">{messages.searchLabel}</label>
            <input
              ref={searchInputRef}
              id="menu-search"
              type="search"
              placeholder={locale === "en" ? "Search the menu" : "Menüde ara"}
              value={searchTerm}
              onChange={(event) => {
                setSearchTerm(event.target.value);
                if (event.target.value) setActiveChapter("all");
              }}
              autoComplete="off"
              inputMode="search"
              enterKeyHint="search"
              aria-controls="menu-results"
              className={styles.searchInput}
            />
            {searchTerm ? (
              <button
                type="button"
                onClick={() => {
                  setSearchTerm("");
                  searchInputRef.current?.focus();
                }}
                aria-label={messages.clearSearch}
                className={styles.searchClearButton}
              >
                <X size={16} />
              </button>
            ) : null}
          </div>
        </div>
      </nav>

      <div id="menu-results" className={styles.menuContainer}>
        <header className={styles.resultsHeader}>
          <div>
            <p className={styles.resultsContext}>
              {searchTerm
                ? messages.searchResult(searchTerm, visibleItems.length)
                : activeChapterDefinition.label[locale]}
            </p>
            <h2>{locale === "en" ? "Choose what belongs on your table." : "Sofranıza yakışanı seçin."}</h2>
          </div>
          <div className={styles.resultsMeta} aria-live="polite">
            <strong>{visibleItems.length}</strong>
            <span>{locale === "en" ? "items · current ₺ prices" : "lezzet · güncel ₺ fiyat"}</span>
          </div>
        </header>

        {visibleItems.length > 0 ? (
          <div className={styles.menuSectionsGroup}>
            {groups.map((group) => (
              <section
                id={`menu-section-${group.id}`}
                key={group.id}
                className={styles.menuSection}
                aria-labelledby={`cat-${group.id}`}
                data-aos="fade-up"
              >
                <header className={styles.sectionHeader}>
                  <div>
                    <h2 id={`cat-${group.id}`} className={styles.sectionTitle}>{group.label}</h2>
                    {group.description ? <p className={styles.sectionSubtitle}>{group.description}</p> : null}
                  </div>
                  <span className={styles.sectionCount} aria-label={`${group.items.length} ${locale === "en" ? "items" : "ürün"}`}>
                    {group.items.length}
                  </span>
                </header>

                <div className={styles.menuList}>
                  {group.items.map((item, index) => (
                    <MenuRow
                      key={item.id}
                      item={item}
                      onOpen={openItem}
                      locale={locale}
                      featured={index === 0 && activeChapter !== "all"}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <Image src="/images/brand-emblem-colored.png" alt="" width={58} height={40} style={{ width: "auto", height: "auto" }} />
            <h3>{messages.emptyTitle}</h3>
            <p>{messages.emptyText}</p>
            <button
              type="button"
              className={styles.primaryActionBtn}
              onClick={() => {
                setSearchTerm("");
                setActiveChapter("all");
              }}
            >
              {messages.showAll}
            </button>
          </div>
        )}

        <section className={styles.closingSection} aria-labelledby="menu-closing-title">
          <Image
            src="/images/interior-chair.webp"
            alt={locale === "en" ? "Historic dining room at Tarihi Van Kahvaltı Evi" : "Tarihi Van Kahvaltı Evi'nin tarihi salonu"}
            fill
            sizes="(max-width: 900px) 100vw, 45vw"
            className={styles.closingImage}
          />
          <div className={styles.closingCopy}>
            <Image src="/images/brand-emblem-colored.png" alt="" width={48} height={34} style={{ width: "auto", height: "auto" }} />
            <h2 id="menu-closing-title">
              {locale === "en" ? "Your table is waiting in Beyoğlu." : "Beyoğlu'nda sofranız hazır."}
            </h2>
            <p>
              {locale === "en"
                ? "Take your time over breakfast in our historic rooms or at our street-side tables."
                : "Tarihi salonlarımızda ya da sokak masalarımızda, kahvaltının tadını telaş etmeden çıkarın."}
            </p>
            <Link href={locale === "en" ? "/en/rezervasyon" : "/rezervasyon"} className={styles.closingLink}>
              {locale === "en" ? "Reserve a table" : "Masa rezervasyonu yap"}
              <ArrowRight size={18} />
            </Link>
          </div>
        </section>

        <footer className={styles.menuDisclaimer}>
          <span>{messages.updated} · {initialLastUpdated}</span>
          <p>{messages.availability}</p>
        </footer>
      </div>

      {selectedItem ? (
        <ProductSheet
          key={selectedItem.id}
          item={selectedItem}
          categoryLabel={initialCategories.find((category) => category.id === selectedItem.category)?.label}
          locale={locale}
          onClose={closeItem}
        />
      ) : null}
    </main>
  );
}
