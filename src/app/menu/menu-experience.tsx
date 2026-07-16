"use client";

import { ChevronRight, Search, X } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { memo, useCallback, useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import styles from "./menu.module.css";
import {
  menuCategories,
  menuItems,
  menuLastUpdated,
  type MenuFilterId,
  type MenuItem,
} from "./menu-data";

const ProductSheet = dynamic(
  () => import("./product-sheet").then((module) => module.ProductSheet),
  { ssr: false },
);

type QuickFilterId = "vegetarian";

const quickFilters: Array<{ id: QuickFilterId; label: string }> = [
  { id: "vegetarian", label: "Vejetaryen" },
];

function normalize(value: string) {
  return value
    .toLocaleLowerCase("tr-TR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

const normalizedMenuCopy = new Map(
  menuItems.map((item) => [
    item.id,
    normalize([item.name, item.description, item.story, ...item.tags, ...item.details].join(" ")),
  ]),
);

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
}: {
  item: MenuItem;
  onOpen: (item: MenuItem) => void;
}) {
  const isSpotlight = item.id === "geleneksel-van-kahvaltisi";
  const visibleTag = item.tags.find((tag) => tag === "Öne çıkan" || tag === "Yeni");
  const metaLabel =
    item.priceNote ||
    item.tags.find((tag) => tag !== visibleTag) ||
    "Günlük hazırlanır";

  return (
    <button
      id={item.id}
      type="button"
      className={`${styles.menuCard} ${isSpotlight ? styles.spotlightCard : ""}`}
      onClick={() => onOpen(item)}
      aria-label={`${item.name}: ${item.price}. Ayrıntıları gör`}
    >
      <span className={styles.cardMedia}>
        <Image
          src={item.image}
          alt={item.imageAlt}
          fill
          sizes={
            isSpotlight
              ? "(max-width: 680px) 32vw, (max-width: 1080px) 38vw, 480px"
              : "(max-width: 680px) 32vw, (max-width: 1080px) 18vw, 180px"
          }
          quality={74}
          loading={isSpotlight ? "eager" : "lazy"}
          fetchPriority={isSpotlight ? "high" : "auto"}
        />
        {visibleTag ? <span className={styles.tagBadge}>{visibleTag}</span> : null}
      </span>

      <span className={styles.cardBody}>
        <span className={styles.cardHeading}>
          <span className={styles.cardTitle}>{item.name}</span>
          <span className={styles.cardPrice}>{item.price}</span>
        </span>
        <span className={styles.cardDescription}>{item.description}</span>
        <span className={styles.cardMeta}>
          <span>{metaLabel}</span>
          <span className={styles.cardDetailCue} aria-hidden="true">
            <ChevronRight size={18} strokeWidth={2.1} />
          </span>
        </span>
      </span>
    </button>
  );
});

export function MenuExperience() {
  const reduceMotion = usePrefersReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchSessionRef = useRef(false);
  const [activeCategory, setActiveCategory] = useState<MenuFilterId>("all");
  const [activeQuickFilter, setActiveQuickFilter] = useState<QuickFilterId | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isCatalogPinned, setIsCatalogPinned] = useState(false);
  const deferredSearch = useDeferredValue(searchTerm);

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
        setIsCatalogPinned(!entry.isIntersecting && entry.boundingClientRect.bottom <= 73);
      },
      { rootMargin: "-73px 0px 0px", threshold: 0 },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  const visibleItems = useMemo(() => {
    const query = normalize(deferredSearch);
    return menuItems.filter((item) => {
      if (activeCategory !== "all" && item.category !== activeCategory) return false;
      if (activeQuickFilter === "vegetarian" && !item.tags.includes("Vejetaryen")) return false;
      if (!query) return true;
      return normalizedMenuCopy.get(item.id)?.includes(query) ?? false;
    });
  }, [activeCategory, activeQuickFilter, deferredSearch]);

  const groups = useMemo(
    () =>
      menuCategories
        .map((category) => ({
          ...category,
          items: visibleItems.filter((item) => item.category === category.id),
        }))
        .filter((group) => group.items.length > 0),
    [visibleItems],
  );

  const openItem = useCallback((item: MenuItem) => setSelectedItem(item), []);
  const closeItem = useCallback(() => setSelectedItem(null), []);

  const alignResults = () => {
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        const results = document.getElementById("menu-results");
        const discovery = document.getElementById("menu-catalog");
        if (!results || !discovery) return;

        const stickyOffset = 72 + discovery.getBoundingClientRect().height;
        const targetTop = results.getBoundingClientRect().top + window.scrollY - stickyOffset;
        window.scrollTo({
          top: Math.max(0, targetTop),
          behavior: reduceMotion ? "auto" : "smooth",
        });
      });
    });
  };

  const selectCategory = (category: MenuFilterId, trigger?: HTMLButtonElement) => {
    const catalog = document.getElementById("menu-catalog");
    const shouldAlignResults =
      isCatalogPinned || searchSessionRef.current || (catalog?.getBoundingClientRect().top ?? Number.POSITIVE_INFINITY) <= 73;

    searchSessionRef.current = false;
    searchInputRef.current?.blur();
    setSearchTerm("");
    setActiveQuickFilter(null);
    setActiveCategory(category);
    if (trigger) {
      const categoryRail = trigger.parentElement;
      categoryRail?.scrollTo({
        left: trigger.offsetLeft - (categoryRail.clientWidth - trigger.offsetWidth) / 2,
        behavior: reduceMotion ? "auto" : "smooth",
      });
    }
    if (shouldAlignResults) {
      alignResults();
    }
  };

  const selectQuickFilter = (filter: QuickFilterId, trigger: HTMLButtonElement) => {
    const catalog = document.getElementById("menu-catalog");
    const shouldAlignResults =
      isCatalogPinned || (catalog?.getBoundingClientRect().top ?? Number.POSITIVE_INFINITY) <= 73;

    searchSessionRef.current = false;
    searchInputRef.current?.blur();
    setSearchTerm("");
    setActiveCategory("all");
    setActiveQuickFilter((current) => (current === filter ? null : filter));
    trigger.parentElement?.scrollTo({
      left: trigger.offsetLeft - (trigger.parentElement.clientWidth - trigger.offsetWidth) / 2,
      behavior: reduceMotion ? "auto" : "smooth",
    });

    if (shouldAlignResults) {
      alignResults();
    }
  };

  const handleSearchFocus = () => {
    searchSessionRef.current = true;
    if (!window.matchMedia("(max-width: 760px)").matches) return;
    const catalog = document.getElementById("menu-catalog");
    if (!catalog || catalog.getBoundingClientRect().top <= 72) return;

    catalog.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <main id="main-content" className={styles.page}>
      <section ref={heroRef} className={styles.menuHero} aria-labelledby="menu-page-title">
        <div className={styles.heroContent}>
          <span className={styles.heroKicker}>Tarihi Van Kahvaltı Evi</span>
          <h1 id="menu-page-title">QR Menü</h1>
          <p>Günlük hazırlanan lezzetler ve güncel fiyatlar</p>
        </div>
      </section>

      <section
        id="menu-catalog"
        className={`${styles.discoveryBar} ${isCatalogPinned ? styles.discoveryPinned : ""} ${searchTerm ? styles.discoveryWithSearch : ""}`}
        aria-label="Menüde gezinme"
      >
        <div className={styles.discoveryInner}>
          <div className={styles.searchField}>
            <Search size={18} aria-hidden="true" />
            <label className={styles.srOnly} htmlFor="menu-search">Menüde ara</label>
            <input
              ref={searchInputRef}
              id="menu-search"
              type="search"
              placeholder="Menüde lezzet ara…"
              value={searchTerm}
              onChange={(event) => {
                const nextSearch = event.target.value;
                setSearchTerm(nextSearch);
                if (nextSearch) {
                  setActiveCategory("all");
                  setActiveQuickFilter(null);
                }
              }}
              autoComplete="off"
              inputMode="search"
              enterKeyHint="search"
              aria-controls="menu-results"
              onFocus={handleSearchFocus}
            />
            {searchTerm ? (
              <button
                type="button"
                onClick={() => {
                  setSearchTerm("");
                  window.requestAnimationFrame(() => searchInputRef.current?.focus());
                }}
                aria-label="Aramayı temizle"
              >
                <X size={17} />
              </button>
            ) : null}
          </div>

          <nav className={styles.categoryNav} aria-label="Menü kategorileri">
            <button
              type="button"
              className={activeCategory === "all" && !activeQuickFilter ? styles.activeCategory : ""}
              aria-pressed={activeCategory === "all" && !activeQuickFilter}
              aria-controls="menu-results"
              onClick={(event) => selectCategory("all", event.currentTarget)}
            >
              <span>Tümü</span>
            </button>
            {menuCategories.map((category) => (
              <button
                key={category.id}
                type="button"
                className={activeCategory === category.id ? styles.activeCategory : ""}
                aria-pressed={activeCategory === category.id}
                aria-controls="menu-results"
                onClick={(event) => selectCategory(category.id, event.currentTarget)}
              >
                <span>{category.shortLabel}</span>
              </button>
            ))}
            <span className={styles.categoryNavDivider} aria-hidden="true" />
            {quickFilters.map((filter) => (
              <button
                key={filter.id}
                type="button"
                className={`${styles.quickFilterButton} ${activeQuickFilter === filter.id ? styles.activeCategory : ""}`}
                aria-pressed={activeQuickFilter === filter.id}
                aria-controls="menu-results"
                onClick={(event) => selectQuickFilter(filter.id, event.currentTarget)}
              >
                <span>{filter.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </section>

      <div id="menu-results" className={styles.menuContainer}>
        <div className={`${styles.resultLine} ${searchTerm || activeQuickFilter ? styles.searchResultLine : ""}`} aria-live="polite">
          <span>
            {searchTerm
              ? `“${searchTerm}” için ${visibleItems.length} sonuç`
              : activeQuickFilter
                ? `${quickFilters.find((filter) => filter.id === activeQuickFilter)?.label} seçkisinde ${visibleItems.length} lezzet`
                : `${visibleItems.length} lezzet gösteriliyor`}
          </span>
          <span>Fiyatlar ₺ olarak gösterilir</span>
        </div>

        {visibleItems.length > 0 ? (
          <div className={styles.menuContent}>
            {groups.map((group) => (
              <section key={group.id} className={styles.menuSection} aria-labelledby={`cat-${group.id}`}>
                <header className={styles.sectionHeader}>
                  <div>
                    <h2 id={`cat-${group.id}`}>{group.label}</h2>
                    <p>{group.description}</p>
                  </div>
                  <span>{group.items.length} seçenek</span>
                </header>
                <div className={styles.menuGrid}>
                  {group.items.map((item) => (
                    <MenuCard key={item.id} item={item} onOpen={openItem} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <Search size={30} />
            <h2>Bu isimde bir lezzet bulamadık.</h2>
            <p>Başka bir kelime deneyin veya tüm sofraya geri dönün.</p>
            <button
              type="button"
              onClick={() => {
                setSearchTerm("");
                setActiveCategory("all");
                setActiveQuickFilter(null);
              }}
            >
              Tüm menüyü göster
            </button>
          </div>
        )}

        <footer className={styles.menuNote}>
          <span>Menü güncelleme · {menuLastUpdated}</span>
          <p>Ürün uygunluğu mevsime ve günlük hazırlığa göre değişebilir. Alerjen bilgisi için ekibimize danışabilirsiniz.</p>
        </footer>
      </div>

      {selectedItem ? <ProductSheet key={selectedItem.id} item={selectedItem} onClose={closeItem} /> : null}
    </main>
  );
}
