"use client";

import {
  ArrowRight,
  Calendar,
  Check,
  ChevronRight,
  Flame,
  Search,
  Sparkles,
  UtensilsCrossed,
  X,
} from "lucide-react";
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

function getCategoryIcon(categoryId: string): MenuCategoryIconName {
  if (["omletler", "menemenler", "yumurtalar", "sahanlar"].includes(categoryId)) return "pan";
  if (["receller", "ballar"].includes(categoryId)) return "jam";
  if (["yoresel-tatlar", "peynirler"].includes(categoryId)) return "van";
  if (["sicak-icecekler", "bitki-caylari", "sicak-kahveler"].includes(categoryId)) return "hot-drink";
  if (["soft-icecekler", "soguk-icecekler", "soguk-kahveler", "milkshake-frozen-smoothie"].includes(categoryId)) return "cold-drink";
  return "breakfast";
}

function getCategoryNavLabel(category: MenuCategory, locale: MenuLocale) {
  if (locale === "en") return category.shortLabel || category.label;

  const turkishLabels: Record<string, string> = {
    "kahvalti-menuleri": "Kahvaltı Menüleri",
    peynirler: "Yöresel Peynirler",
    zeytinler: "Zeytin & Söğüş",
    gozlemeler: "Gözleme & Hamur İşi",
    "yoresel-tatlar": "Van Yöresel Lezzetleri",
    receller: "Anne Reçelleri",
    ballar: "Ballar & Kaymak",
    omletler: "Omletler",
    menemenler: "Menemenler",
    yumurtalar: "Yumurtalar",
    sahanlar: "Bakır Sahanlar",
    "sicak-icecekler": "Sıcak İçecekler & Semaver",
    "bitki-caylari": "Bitki Çayları",
    "soft-icecekler": "Soft İçecekler",
    "soguk-icecekler": "Soğuk İçecekler",
    "sicak-kahveler": "Sıcak Kahveler",
    "soguk-kahveler": "Soğuk Kahveler",
    "milkshake-frozen-smoothie": "Özel İçecekler",
  };
  return turkishLabels[category.id] ?? category.shortLabel ?? category.label;
}

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

const MenuCard = memo(function MenuCard({
  item,
  onOpen,
  locale,
}: {
  item: MenuItem;
  onOpen: (item: MenuItem) => void;
  locale: MenuLocale;
}) {
  const messages = menuMessages[locale];
  const [imageFailed, setImageFailed] = useState(false);
  const visibleTag = item.tags.find((tag) => tag === messages.featuredTag || tag === messages.newTag || tag === "Tavsiye" || tag === "Recommended");
  const metaLabel =
    item.priceNote ||
    item.tags.find((tag) => tag !== visibleTag) ||
    messages.daily;

  const hasImage = item.image && !imageFailed;

  return (
    <button
      id={item.id}
      type="button"
      className={`${styles.menuCard} ${!hasImage ? styles.menuCardTextOnly : ""}`}
      onClick={() => onOpen(item)}
      aria-label={messages.cardAria(item.name, item.price)}
    >
      {hasImage ? (
        <div className={styles.dishMedia}>
          <Image
            src={item.image}
            alt={item.imageAlt || item.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 560px"
            quality={78}
            onError={() => setImageFailed(true)}
          />
          {visibleTag ? (
            <span className={styles.dishTagBadge}>
              <Sparkles size={12} />
              <span>{visibleTag}</span>
            </span>
          ) : null}
        </div>
      ) : visibleTag ? (
        <span className={styles.dishTagBadge} style={{ position: "static", margin: "1rem 1.4rem 0" }}>
          <Sparkles size={12} />
          <span>{visibleTag}</span>
        </span>
      ) : null}

      <div className={styles.dishBody}>
        <div className={styles.dishHeadRow}>
          <h3 className={styles.dishTitle}>{item.name}</h3>
          <span className={styles.dishPrice}>{item.price}</span>
        </div>
        <p className={styles.dishDesc}>{item.description}</p>
        <div className={styles.dishFooter}>
          <span className={styles.dishServingNote}>{metaLabel}</span>
          <span className={styles.dishDetailPrompt} aria-hidden="true">
            <span>{messages.viewPlateDetails}</span>
            <ArrowRight size={13} />
          </span>
        </div>
      </div>
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
  const categoryNavRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isCatalogPinned, setIsCatalogPinned] = useState(false);
  const deferredSearch = useDeferredValue(searchTerm);

  // Find the signature centerpiece item (Serpme Fix Menü)
  const signatureSerpmeItem = useMemo(() => {
    return (
      initialItems.find((item) => item.id === "serpme-fix-menu") ||
      initialItems.find((item) => item.category === "kahvalti-menuleri") ||
      null
    );
  }, [initialItems]);

  const normalizedMenuCopy = useMemo(() => {
    return new Map(
      initialItems.map((item) => [
        item.id,
        normalize([item.name, item.description, item.story, ...item.tags, ...item.details].join(" "), locale),
      ]),
    );
  }, [initialItems, locale]);

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
      ([entry]) => {
        setIsCatalogPinned(!entry.isIntersecting && entry.boundingClientRect.bottom <= 72);
      },
      { rootMargin: "-72px 0px 0px", threshold: 0 },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  const visibleItems = useMemo(() => {
    const query = normalize(deferredSearch, locale);
    return initialItems.filter((item) => {
      if (query) return normalizedMenuCopy.get(item.id)?.includes(query) ?? false;
      return activeCategory === "all" || item.category === activeCategory;
    });
  }, [activeCategory, initialItems, deferredSearch, locale, normalizedMenuCopy]);

  const groups = useMemo(() => {
    return initialCategories
      .map((category) => ({
        ...category,
        items: visibleItems.filter((item) => item.category === category.id),
      }))
      .filter((group) => group.items.length > 0);
  }, [initialCategories, visibleItems]);

  const navigableCategories = useMemo(
    () => initialCategories.filter((category) => initialItems.some((item) => item.category === category.id)),
    [initialCategories, initialItems],
  );

  const openItem = useCallback((item: MenuItem) => setSelectedItem(item), []);
  const closeItem = useCallback(() => setSelectedItem(null), []);

  const centerCategoryButton = useCallback((categoryId: string) => {
    const trigger = categoryNavRef.current?.querySelector<HTMLButtonElement>(`[data-category-id="${categoryId}"]`);
    const rail = categoryNavRef.current;
    if (!trigger || !rail) return;

    const railRect = rail.getBoundingClientRect();
    const triggerRect = trigger.getBoundingClientRect();
    const comfortInset = Math.min(48, railRect.width * 0.16);
    const comfortablyVisible =
      triggerRect.left >= railRect.left + comfortInset &&
      triggerRect.right <= railRect.right - comfortInset;
    if (comfortablyVisible) return;

    rail.scrollTo({
      left: trigger.offsetLeft - (rail.clientWidth - trigger.offsetWidth) / 2,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }, [reduceMotion]);

  const selectCategory = (categoryId: string) => {
    searchInputRef.current?.blur();
    setSearchTerm("");
    setActiveCategory(categoryId);
    centerCategoryButton(categoryId);

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        const catalog = document.getElementById("menu-catalog");
        const target = document.getElementById("menu-results");
        if (!catalog || !target) return;
        const stickyOffset = 68 + catalog.getBoundingClientRect().height + 14;
        const targetTop = target.getBoundingClientRect().top + window.scrollY - stickyOffset;
        window.scrollTo({ top: Math.max(0, targetTop), behavior: reduceMotion ? "auto" : "smooth" });
      });
    });
  };

  useEffect(() => {
    centerCategoryButton(activeCategory);
  }, [activeCategory, centerCategoryButton]);

  const handleSearchFocus = () => {
    if (!window.matchMedia("(max-width: 768px)").matches) return;
    const catalog = document.getElementById("menu-catalog");
    if (!catalog || catalog.getBoundingClientRect().top <= 72) return;

    catalog.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  const handleCenterpieceBooking = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("open-booking", {
          detail: {
            itemTitle: signatureSerpmeItem?.name || "Serpme Van Kahvaltısı",
            category: "Kahvaltı",
          },
        }),
      );
    }
  };

  return (
    <main id="main-content" className={styles.page} lang={messages.pageLanguage}>
      {/* 1. EDITORIAL MASTHEAD HERO */}
      <section ref={heroRef} className={styles.menuHero} aria-labelledby="menu-page-title">
        <div className={styles.heroAnchorNotch} aria-hidden="true">
          <Image
            src="/hamour/anchor-2.png"
            alt=""
            width={64}
            height={36}
            className={styles.anchorImg}
            priority
          />
        </div>

        <div className={styles.heroContainer}>
          <div className={styles.heroEmblem} aria-hidden="true">
            <Image
              src="/images/brand-emblem-colored.png"
              alt="Tarihi Van Kahvaltı Evi"
              width={52}
              height={36}
              className={styles.heroEmblemImg}
              priority
            />
          </div>

          <span className={styles.heroProvenance}>{messages.heroProvenance}</span>
          <h1 id="menu-page-title" className={styles.heroTitle}>{messages.heroMenu}</h1>
          <p className={styles.heroIntro}>{messages.heroIntro}</p>

          <div className={styles.heroBadgesStrip}>
            <span className={styles.badgeItem}>
              <UtensilsCrossed size={15} />
              <span>{messages.badgeSamovar}</span>
            </span>
            <span className={styles.badgeDivider} aria-hidden="true" />
            <span className={styles.badgeItem}>
              <Sparkles size={15} />
              <span>{messages.badgeCheese}</span>
            </span>
            <span className={styles.badgeDivider} aria-hidden="true" />
            <span className={styles.badgeItem}>
              <Flame size={15} />
              <span>{messages.badgePan}</span>
            </span>
            <span className={styles.badgeDivider} aria-hidden="true" />
            <span className={styles.badgeItem}>
              <Check size={15} />
              <span>{messages.badgeOven}</span>
            </span>
          </div>
        </div>
      </section>

      {/* 2. GRAND SIGNATURE CENTERPIECE (Shown when not actively searching) */}
      {!searchTerm && (activeCategory === "all" || activeCategory === "kahvalti-menuleri") && signatureSerpmeItem ? (
        <section className={styles.centerpieceWrapper} aria-label={messages.centerpieceTitle}>
          <div className={styles.centerpieceCard}>
            <div className={styles.centerpieceMedia}>
              <Image
                src={signatureSerpmeItem.image || "/images/breakfast-spread.webp"}
                alt={signatureSerpmeItem.imageAlt || signatureSerpmeItem.name}
                fill
                priority
                sizes="(max-width: 960px) 100vw, 620px"
                quality={85}
              />
              <span className={styles.centerpieceBadge}>
                <Sparkles size={13} />
                <span>{messages.centerpieceBadge}</span>
              </span>
            </div>

            <div className={styles.centerpieceContent}>
              <div className={styles.centerpieceTopRow}>
                <span className={styles.centerpieceLabel}>
                  {locale === "en" ? "HISTORIC BEYOĞLU TRADITION" : "TARİHİ BEYOĞLU GELENEĞİ"}
                </span>
                <div className={styles.centerpiecePriceLockup}>
                  <span className={styles.centerpiecePrice}>{signatureSerpmeItem.price}</span>
                  <span className={styles.centerpiecePriceNote}>
                    {signatureSerpmeItem.priceNote || messages.centerpiecePerPerson}
                  </span>
                </div>
              </div>

              <h2 className={styles.centerpieceTitle}>{messages.centerpieceTitle}</h2>
              <p className={styles.centerpieceDesc}>{signatureSerpmeItem.description}</p>

              <div className={styles.centerpieceFeatures}>
                <div className={styles.featureItem}>
                  <span className={styles.featureBullet} />
                  <span>{locale === "en" ? "Unlimited Samovar Tea" : "Sınırsız Semaver Çayı"}</span>
                </div>
                <div className={styles.featureItem}>
                  <span className={styles.featureBullet} />
                  <span>{locale === "en" ? "Authentic Van Herb Cheese" : "Hakiki Van Otlu Peyniri"}</span>
                </div>
                <div className={styles.featureItem}>
                  <span className={styles.featureBullet} />
                  <span>{locale === "en" ? "Sizzling Murtuğa & Hot Choice" : "Bakır Sahanda Sıcak Murtuğa"}</span>
                </div>
                <div className={styles.featureItem}>
                  <span className={styles.featureBullet} />
                  <span>{locale === "en" ? "Fresh Hot Pişi & Oven Kete" : "Taş Fırından Kete & Taze Pişi"}</span>
                </div>
              </div>

              <div className={styles.centerpieceActions}>
                <button
                  type="button"
                  className={styles.btnPrimaryBook}
                  onClick={handleCenterpieceBooking}
                >
                  <Calendar size={18} />
                  <span>{messages.centerpieceBook}</span>
                </button>
                <button
                  type="button"
                  className={styles.btnSecondaryDetails}
                  onClick={() => openItem(signatureSerpmeItem)}
                >
                  <span>{messages.centerpieceDetails}</span>
                  <ChevronRight size={17} />
                </button>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {/* 3. LUXURY STICKY DISCOVERY RAIL */}
      <nav
        id="menu-catalog"
        className={`${styles.discoveryBar} ${isCatalogPinned ? styles.discoveryPinned : ""}`}
        aria-label={messages.navigationAria}
      >
        <div className={styles.discoveryInner}>
          <div ref={categoryNavRef} className={styles.categoryNav} role="tablist">
            {[
              { id: "all", label: locale === "en" ? "Full Table" : "Tüm Sofra", icon: "all" as const },
              ...navigableCategories.map((category) => ({
                id: category.id,
                label: getCategoryNavLabel(category, locale),
                icon: getCategoryIcon(category.id),
              })),
            ].map((category) => {
              const isActive = activeCategory === category.id;
              return (
                <button
                  key={category.id}
                  type="button"
                  role="tab"
                  data-category-id={category.id}
                  className={`${styles.categoryTabBtn} ${isActive ? styles.activeCategory : ""}`}
                  aria-selected={isActive}
                  aria-controls="menu-results"
                  aria-label={messages.showCategory(category.label)}
                  onClick={() => selectCategory(category.id)}
                >
                  <span className={styles.categoryIconWell} aria-hidden="true">
                    <MenuCategoryIcon name={category.icon} />
                  </span>
                  <span>{category.label}</span>
                </button>
              );
            })}
          </div>

          <div className={styles.searchWrapper}>
            <div className={styles.searchBox}>
              <Search size={16} aria-hidden="true" />
              <label className={styles.srOnly} htmlFor="menu-search">{messages.searchLabel}</label>
              <input
                ref={searchInputRef}
                id="menu-search"
                type="search"
                placeholder={messages.searchPlaceholder}
                value={searchTerm}
                onChange={(event) => {
                  const nextSearch = event.target.value;
                  setSearchTerm(nextSearch);
                  if (nextSearch) setActiveCategory("all");
                }}
                autoComplete="off"
                inputMode="search"
                enterKeyHint="search"
                aria-controls="menu-results"
                onFocus={handleSearchFocus}
                className={styles.searchInput}
              />
              {searchTerm ? (
                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm("");
                    window.requestAnimationFrame(() => searchInputRef.current?.focus());
                  }}
                  aria-label={messages.clearSearch}
                  className={styles.searchClearBtn}
                >
                  <X size={14} />
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </nav>

      {/* 4. MENU ITEMS CONTAINER */}
      <div id="menu-results" className={styles.menuContainer}>
        <div className={styles.statusSummary} aria-live="polite">
          <span className={styles.statusLiveCount}>
            {searchTerm
              ? messages.searchResult(searchTerm, visibleItems.length)
              : messages.showing(visibleItems.length)}
          </span>
          <span className={styles.currencyNote}>{messages.prices}</span>
        </div>

        {visibleItems.length > 0 ? (
          <div className={styles.menuSectionsGroup}>
            {groups.map((group) => (
              <section
                id={`menu-section-${group.id}`}
                key={group.id}
                className={styles.menuSection}
                aria-labelledby={`cat-${group.id}`}
              >
                <header className={styles.sectionHeader}>
                  <div className={styles.sectionTitleGroup}>
                    <h2 id={`cat-${group.id}`}>{group.label}</h2>
                    <p>{group.description}</p>
                  </div>
                  <span className={styles.sectionCountBadge}>
                    {messages.optionCount(group.items.length)}
                  </span>
                </header>

                <div className={styles.menuGrid}>
                  {group.items.map((item) => (
                    <MenuCard
                      key={item.id}
                      item={item}
                      onOpen={openItem}
                      locale={locale}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <Search size={36} />
            <h3>{messages.emptyTitle}</h3>
            <p>{messages.emptyText}</p>
            <button
              type="button"
              className={styles.btnResetSearch}
              onClick={() => {
                setSearchTerm("");
                setActiveCategory("all");
              }}
            >
              {messages.showAll}
            </button>
          </div>
        )}

        {/* 5. ATMOSPHERIC RESERVATION BANNER */}
        <section className={styles.atmosphereSection} aria-labelledby="atmosphere-banner-title">
          <div className={styles.atmosphereContainer}>
            <h2 id="atmosphere-banner-title" className={styles.atmosphereTitle}>
              {messages.atmosphereTitle}
            </h2>
            <p className={styles.atmosphereDesc}>
              {messages.atmosphereDesc}
            </p>
            <Link
              href={locale === "en" ? "/en/rezervasyon" : "/rezervasyon"}
              className={styles.btnAtmosphereBook}
            >
              <Calendar size={18} />
              <span>{messages.atmosphereAction}</span>
            </Link>
          </div>
        </section>

        {/* 6. DISCLAIMER & LAST UPDATED FOOTER */}
        <footer className={styles.menuDisclaimer}>
          <span className={styles.disclaimerDate}>
            {messages.updated} · {initialLastUpdated}
          </span>
          <p className={styles.disclaimerText}>{messages.availability}</p>
        </footer>
      </div>

      {/* 7. PRODUCT SHEET TASTING MODAL */}
      {selectedItem ? (
        <ProductSheet
          key={selectedItem.id}
          item={selectedItem}
          categoryLabel={initialCategories.find((cat) => cat.id === selectedItem.category)?.label}
          locale={locale}
          onClose={closeItem}
        />
      ) : null}
    </main>
  );
}
