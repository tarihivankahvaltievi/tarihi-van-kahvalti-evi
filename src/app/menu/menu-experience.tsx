"use client";

import { ChevronRight, Search, UtensilsCrossed, X } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
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
  if (category.id === "receller") return locale === "en" ? "Preserves" : "Reçeller";
  return category.label.length <= 18 ? category.label : category.shortLabel || category.label;
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
  prioritizeImage = false,
}: {
  item: MenuItem;
  onOpen: (item: MenuItem) => void;
  locale: MenuLocale;
  prioritizeImage?: boolean;
}) {
  const messages = menuMessages[locale];
  const isSpotlight = item.tags.includes(messages.featuredTag);
  const [imageFailed, setImageFailed] = useState(false);
  const visibleTag = item.tags.find((tag) => tag === messages.featuredTag || tag === messages.newTag);
  const metaLabel =
    item.priceNote ||
    item.tags.find((tag) => tag !== visibleTag) ||
    messages.daily;

  return (
    <button
      id={item.id}
      type="button"
      className={`${styles.menuCard} ${isSpotlight ? styles.spotlightCard : ""}`}
      onClick={() => onOpen(item)}
      aria-label={messages.cardAria(item.name, item.price)}
    >
      <span className={styles.cardMedia}>
        {item.image && !imageFailed ? (
          <Image
            src={item.image}
            alt={item.imageAlt}
            fill
            sizes={
              isSpotlight
                ? "(max-width: 680px) 36vw, (max-width: 1080px) 38vw, 480px"
                : "(max-width: 680px) 36vw, (max-width: 1080px) 18vw, 180px"
            }
            quality={80}
            loading={prioritizeImage ? "eager" : "lazy"}
            fetchPriority={prioritizeImage ? "high" : "auto"}
            onError={() => setImageFailed(true)}
          />
        ) : (
          <span className={styles.mediaPlaceholder} aria-hidden="true">
            <UtensilsCrossed />
          </span>
        )}
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
  const searchSessionRef = useRef(false);
  const categoryNavRef = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isCatalogPinned, setIsCatalogPinned] = useState(false);
  const deferredSearch = useDeferredValue(searchTerm);

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
        setIsCatalogPinned(!entry.isIntersecting && entry.boundingClientRect.bottom <= 73);
      },
      { rootMargin: "-73px 0px 0px", threshold: 0 },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  const visibleItems = useMemo(() => {
    const query = normalize(deferredSearch, locale);
    return initialItems.filter((item) => {
      if (!query) return true;
      return normalizedMenuCopy.get(item.id)?.includes(query) ?? false;
    });
  }, [initialItems, deferredSearch, locale, normalizedMenuCopy]);

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

  const centerCategoryButton = useCallback((categoryId: string, behavior: ScrollBehavior = "smooth") => {
    const trigger = categoryNavRef.current?.querySelector<HTMLButtonElement>(`[data-category-id="${categoryId}"]`);
    const rail = categoryNavRef.current;
    if (!trigger || !rail) return;
    rail.scrollTo({
      left: trigger.offsetLeft - (rail.clientWidth - trigger.offsetWidth) / 2,
      behavior: reduceMotion ? "auto" : behavior,
    });
  }, [reduceMotion]);

  const selectCategory = (categoryId: string) => {
    searchSessionRef.current = false;
    searchInputRef.current?.blur();
    setSearchTerm("");
    setActiveCategory(categoryId);
    centerCategoryButton(categoryId);

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        const catalog = document.getElementById("menu-catalog");
        const target = categoryId === "all"
          ? document.getElementById("menu-results")
          : document.getElementById(`menu-section-${categoryId}`);
        if (!catalog || !target) return;
        const stickyOffset = 72 + catalog.getBoundingClientRect().height + 14;
        const targetTop = target.getBoundingClientRect().top + window.scrollY - stickyOffset;
        window.scrollTo({ top: Math.max(0, targetTop), behavior: reduceMotion ? "auto" : "smooth" });
      });
    });
  };

  useEffect(() => {
    if (deferredSearch) return;

    let frame: number | null = null;
    const updateActiveCategory = () => {
      frame = null;
      const catalog = document.getElementById("menu-catalog");
      const results = document.getElementById("menu-results");
      if (!catalog || !results) return;

      const marker = 72 + catalog.getBoundingClientRect().height + 24;
      if (results.getBoundingClientRect().top > marker) {
        setActiveCategory("all");
        return;
      }

      let nextCategory = navigableCategories[0]?.id ?? "all";
      for (const category of navigableCategories) {
        const section = document.getElementById(`menu-section-${category.id}`);
        if (section && section.getBoundingClientRect().top <= marker) nextCategory = category.id;
      }
      setActiveCategory((current) => current === nextCategory ? current : nextCategory);
    };
    const handleScroll = () => {
      if (frame === null) frame = window.requestAnimationFrame(updateActiveCategory);
    };

    updateActiveCategory();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (frame !== null) window.cancelAnimationFrame(frame);
    };
  }, [deferredSearch, navigableCategories]);

  useEffect(() => {
    centerCategoryButton(activeCategory, "auto");
  }, [activeCategory, centerCategoryButton]);

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
    <main id="main-content" className={styles.page} lang={messages.pageLanguage}>
      <section ref={heroRef} className={styles.menuHero} aria-labelledby="menu-page-title">
        <div className={styles.heroContent}>
          <h1 id="menu-page-title">
            <span className={styles.heroBrand}>Tarihi Van Kahvaltı Evi</span>
            <span className={styles.heroMenu}>{messages.heroMenu}</span>
          </h1>
        </div>
      </section>

      <section
        id="menu-catalog"
        className={`${styles.discoveryBar} ${isCatalogPinned ? styles.discoveryPinned : ""}`}
        aria-label={messages.navigationAria}
      >
        <div className={styles.discoveryInner}>
          <div className={styles.discoveryTop}>
            <div className={styles.searchField}>
              <Search size={18} aria-hidden="true" />
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
              />
              {searchTerm ? (
                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm("");
                    window.requestAnimationFrame(() => searchInputRef.current?.focus());
                  }}
                  aria-label={messages.clearSearch}
                >
                  <X size={17} />
                </button>
              ) : null}
            </div>
          </div>

          <nav ref={categoryNavRef} className={styles.categoryNav} aria-label={messages.categoriesAria}>
            {[
              { id: "all", label: locale === "en" ? "Full menu" : "Tüm sofra", icon: "all" as const },
              ...navigableCategories.map((category) => ({
                id: category.id,
                label: getCategoryNavLabel(category, locale),
                icon: getCategoryIcon(category.id),
              })),
            ].map((category, index) => (
              <button
                key={category.id}
                type="button"
                data-category-id={category.id}
                className={activeCategory === category.id ? styles.activeCategory : ""}
                aria-current={activeCategory === category.id ? "true" : undefined}
                aria-controls="menu-results"
                aria-label={messages.showCategory(category.label)}
                style={{ animationDelay: `${index * 34}ms` }}
                onClick={() => selectCategory(category.id)}
              >
                <span className={styles.categoryIconWell} aria-hidden="true">
                  <MenuCategoryIcon name={category.icon} />
                </span>
                <span className={styles.categoryLabel}>{category.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </section>

      <div id="menu-results" className={styles.menuContainer}>
        <div className={`${styles.resultLine} ${searchTerm ? styles.searchResultLine : ""}`} aria-live="polite">
          <span>
            {searchTerm
              ? messages.searchResult(searchTerm, visibleItems.length)
              : messages.showing(visibleItems.length)}
          </span>
          <span>{messages.prices}</span>
        </div>

        {visibleItems.length > 0 ? (
          <div className={styles.menuContent}>
            {groups.map((group, groupIndex) => (
              <section id={`menu-section-${group.id}`} key={group.id} className={styles.menuSection} aria-labelledby={`cat-${group.id}`}>
                <header className={styles.sectionHeader}>
                  <div>
                    <h2 id={`cat-${group.id}`}>{group.label}</h2>
                    <p>{group.description}</p>
                  </div>
                  <span>{messages.optionCount(group.items.length)}</span>
                </header>
                <div className={styles.menuGrid}>
                  {group.items.map((item, itemIndex) => (
                    <MenuCard
                      key={item.id}
                      item={item}
                      onOpen={openItem}
                      locale={locale}
                      prioritizeImage={groupIndex === 0 && itemIndex === 0}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <Search size={30} />
            <h2>{messages.emptyTitle}</h2>
            <p>{messages.emptyText}</p>
            <button
              type="button"
              onClick={() => {
                setSearchTerm("");
                setActiveCategory("all");
              }}
            >
              {messages.showAll}
            </button>
          </div>
        )}

        <footer className={styles.menuNote}>
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
