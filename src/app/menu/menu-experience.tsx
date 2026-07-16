"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import {
  Check,
  ChevronRight,
  Search,
  X,
} from "lucide-react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import { ParticleTextEffect } from "@/components/ui/particle-text-effect";
import styles from "./menu.module.css";
import {
  menuCategories,
  menuItems,
  menuLastUpdated,
  type MenuFilterId,
  type MenuItem,
} from "./menu-data";

const ease = [0.16, 1, 0.3, 1] as const;

type QuickFilterId = "signature" | "new" | "vegetarian";

const quickFilters: Array<{ id: QuickFilterId; label: string }> = [
  { id: "signature", label: "İmzalar" },
  { id: "new", label: "Yeni" },
  { id: "vegetarian", label: "Vejetaryen" },
];

function normalize(value: string) {
  return value
    .toLocaleLowerCase("tr-TR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function MenuCard({
  item,
  onOpen,
}: {
  item: MenuItem;
  onOpen: () => void;
}) {
  const reduceMotion = useReducedMotion();
  const isSpotlight = item.id === "geleneksel-van-kahvaltisi";
  const visibleTag = item.tags.find((tag) => tag === "Öne çıkan" || tag === "Yeni");

  return (
    <motion.button
      id={item.id}
      type="button"
      className={`${styles.menuCard} ${isSpotlight ? styles.spotlightCard : ""}`}
      onClick={onOpen}
      layout="position"
      initial={false}
      whileHover={reduceMotion ? undefined : { y: -2 }}
      whileTap={reduceMotion ? undefined : { scale: 0.985 }}
      transition={{ duration: reduceMotion ? 0 : 0.18, ease }}
      aria-label={`${item.name}: ${item.price}. Ayrıntıları gör`}
    >
      <span className={styles.cardMedia}>
        <Image
          src={item.image}
          alt={item.imageAlt}
          fill
          sizes={
            isSpotlight
              ? "(max-width: 680px) 36vw, (max-width: 1080px) 38vw, 480px"
              : "(max-width: 680px) 30vw, (max-width: 1080px) 18vw, 180px"
          }
          quality={82}
          priority={isSpotlight}
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
          <span>{item.priceNote || item.tags[0] || "Günlük hazırlanır"}</span>
          <span className={styles.cardDetailCue} aria-hidden="true">
            Ayrıntı <ChevronRight size={15} strokeWidth={1.8} />
          </span>
        </span>
      </span>
    </motion.button>
  );
}

function ProductSheet({ item, onClose }: { item: MenuItem | null; onClose: () => void }) {
  const reduceMotion = useReducedMotion();
  const sheetRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!item) return;

    const previousOverflow = document.body.style.overflow;
    const previousActive = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    document.body.classList.add("menu-sheet-open");
    document.body.style.overflow = "hidden";

    const focusFrame = window.requestAnimationFrame(() => closeRef.current?.focus());
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab") return;
      const focusable = Array.from(
        sheetRef.current?.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], input:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", onKeyDown);
      document.body.classList.remove("menu-sheet-open");
      document.body.style.overflow = previousOverflow;
      previousActive?.focus();
    };
  }, [item, onClose]);

  if (typeof document === "undefined") return null;

  const category = item ? menuCategories.find((entry) => entry.id === item.category) : null;

  return createPortal(
    <AnimatePresence>
      {item ? (
        <div className={styles.sheetLayer}>
          <motion.button
            type="button"
            className={styles.overlayBackdrop}
            aria-label="Ürün ayrıntılarını kapat"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.22 }}
          />
          <motion.div
            ref={sheetRef}
            className={styles.productSheet}
            role="dialog"
            aria-modal="true"
            aria-labelledby="product-sheet-title"
            initial={reduceMotion ? false : { y: 34, opacity: 0, scale: 0.985 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { y: 28, opacity: 0, scale: 0.99 }}
            transition={{ duration: reduceMotion ? 0 : 0.38, ease }}
          >
            <div className={styles.sheetMedia}>
              <Image src={item.image} alt={item.imageAlt} fill sizes="(max-width: 680px) 100vw, 430px" quality={82} priority />
              <span className={styles.sheetCategory}>{category?.label}</span>
            </div>

            <div className={styles.sheetContent}>
              <button ref={closeRef} type="button" className={styles.sheetClose} onClick={onClose} aria-label="Kapat">
                <X size={20} />
              </button>

              <div className={styles.sheetTitleRow}>
                <h2 id="product-sheet-title">{item.name}</h2>
                <div className={styles.sheetPriceBlock}>
                  <strong>{item.price}</strong>
                  {item.priceNote ? <span>{item.priceNote}</span> : null}
                </div>
              </div>

              <p className={styles.sheetStory}>{item.story}</p>

              <div className={styles.sheetRule} />
              <h3 className={styles.sheetSectionTitle}>Bu tabakta</h3>
              <ul className={styles.sheetDetailsList}>
                {item.details.map((detail) => (
                  <li key={detail}>
                    <Check size={15} strokeWidth={2.2} />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>

              <button type="button" className={styles.sheetAction} onClick={onClose}>
                Menüye dön <ChevronRight size={18} />
              </button>
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}

export function MenuExperience() {
  const reduceMotion = useReducedMotion();
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
      if (activeQuickFilter === "signature" && !item.tags.some((tag) => tag === "Öne çıkan" || tag === "Tavsiye")) return false;
      if (activeQuickFilter === "new" && !item.tags.includes("Yeni")) return false;
      if (activeQuickFilter === "vegetarian" && !item.tags.includes("Vejetaryen")) return false;
      if (!query) return true;
      return normalize([item.name, item.description, item.story, ...item.tags, ...item.details].join(" ")).includes(query);
    });
  }, [activeCategory, activeQuickFilter, deferredSearch]);

  const groups = menuCategories
    .map((category) => ({
      ...category,
      items: visibleItems.filter((item) => item.category === category.id),
    }))
    .filter((group) => group.items.length > 0);

  const categoryCounts = useMemo(
    () =>
      Object.fromEntries(
        menuCategories.map((category) => [category.id, menuItems.filter((item) => item.category === category.id).length]),
      ),
    [],
  );

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
      window.requestAnimationFrame(() => {
        const results = document.getElementById("menu-results");
        const discovery = document.getElementById("menu-catalog");
        if (!results || !discovery) return;
        const targetTop = results.getBoundingClientRect().top + window.scrollY - 72 - discovery.getBoundingClientRect().height;
        window.scrollTo({ top: Math.max(0, targetTop), behavior: reduceMotion ? "auto" : "smooth" });
      });
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
        <ParticleTextEffect
          id="menu-page-title"
          className={styles.kineticTitle}
        />
      </section>

      <section
        id="menu-catalog"
        className={`${styles.discoveryBar} ${isCatalogPinned ? styles.discoveryPinned : ""}`}
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
              placeholder="Lezzet ara"
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
              {activeCategory === "all" && !activeQuickFilter ? <motion.span layoutId="category-rail" className={styles.categoryRail} /> : null}
              <span>Tümü</span><small>{menuItems.length}</small>
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
                {activeCategory === category.id ? <motion.span layoutId="category-rail" className={styles.categoryRail} /> : null}
                <span>{category.shortLabel}</span><small>{categoryCounts[category.id]}</small>
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
                {activeQuickFilter === filter.id ? <motion.span layoutId="category-rail" className={styles.categoryRail} /> : null}
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
          <span>Tüm fiyatlar TRY</span>
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
                <motion.div className={styles.menuGrid} layout>
                  <AnimatePresence initial={false} mode="popLayout">
                    {group.items.map((item) => (
                      <MenuCard key={item.id} item={item} onOpen={() => setSelectedItem(item)} />
                    ))}
                  </AnimatePresence>
                </motion.div>
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

      <ProductSheet item={selectedItem} onClose={() => setSelectedItem(null)} />
    </main>
  );
}
