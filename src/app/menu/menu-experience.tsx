"use client";

import { ChevronRight, Search, X } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { memo, useCallback, useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import styles from "./menu.module.css";
import type { MenuCategory, MenuItem } from "./menu-data";
import { MenuCategoryIcon } from "./menu-category-icons";

const ProductSheet = dynamic(
  () => import("./product-sheet").then((module) => module.ProductSheet),
  { ssr: false },
);

type MenuCollectionId =
  | "all"
  | "breakfast"
  | "pans"
  | "jams"
  | "from-van"
  | "hot-drinks"
  | "cold-drinks";

const menuCollections: Array<{
  id: MenuCollectionId;
  label: string;
  description: string;
  icon: "all" | "breakfast" | "pan" | "jam" | "van" | "hot-drink" | "cold-drink";
}> = [
  {
    id: "all",
    label: "Tüm sofra",
    description: "Sofradaki bütün lezzetleri bir arada keşfedin.",
    icon: "all",
  },
  {
    id: "breakfast",
    label: "Kahvaltılıklar",
    description: "Paylaşımlık Van sofraları, peynirler ve kahvaltı tabakları.",
    icon: "breakfast",
  },
  {
    id: "pans",
    label: "Sahanlar",
    description: "Tereyağı hâlâ cızırdarken masaya gelen sıcak bakır sahanlar.",
    icon: "pan",
  },
  {
    id: "jams",
    label: "Reçeller",
    description: "Ev yapımı reçeller, bal ve kaymakla sofranın tatlı köşesi.",
    icon: "jam",
  },
  {
    id: "from-van",
    label: "Van’dan",
    description: "Otlu peynirden keteye, yöre hafızasını taşıyan lezzetler.",
    icon: "van",
  },
  {
    id: "hot-drinks",
    label: "Sıcak içecekler",
    description: "İnce belli bardakta taze çay ve ağır ağır pişen kahveler.",
    icon: "hot-drink",
  },
  {
    id: "cold-drinks",
    label: "Soğuk içecekler",
    description: "Kahvaltının sıcaklarına ferah ve ev yapımı eşlikçiler.",
    icon: "cold-drink",
  },
];

function normalize(value: string) {
  return value
    .toLocaleLowerCase("tr-TR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function isItemInCollection(item: MenuItem, collection: MenuCollectionId) {
  if (collection === "all") return true;

  const itemCopy = normalize([item.id, item.name, item.description, ...item.tags, ...item.details].join(" "));
  const itemName = normalize([item.id, item.name].join(" "));
  const isJam = itemName.includes("recel");
  const isColdDrink = ["soguk", "limonata", "meyve suyu", "ayran", "soda", "serbet"]
    .some((term) => itemCopy.includes(term));

  if (collection === "breakfast") return item.category === "sofra" && !isJam;
  if (collection === "pans") return item.category === "sicaklar";
  if (collection === "jams") return isJam;
  if (collection === "from-van") return item.category === "vandan";
  if (collection === "hot-drinks") return item.category === "icecekler" && !isColdDrink;
  return item.category === "icecekler" && isColdDrink;
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
  prioritizeImage = false,
}: {
  item: MenuItem;
  onOpen: (item: MenuItem) => void;
  prioritizeImage?: boolean;
}) {
  const isSpotlight = item.tags.includes("Öne çıkan");
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
              ? "(max-width: 680px) 36vw, (max-width: 1080px) 38vw, 480px"
              : "(max-width: 680px) 36vw, (max-width: 1080px) 18vw, 180px"
          }
          quality={80}
          loading={prioritizeImage ? "eager" : "lazy"}
          fetchPriority={prioritizeImage ? "high" : "auto"}
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

export function MenuExperience({
  initialCategories,
  initialItems,
  initialLastUpdated,
}: {
  initialCategories: MenuCategory[];
  initialItems: MenuItem[];
  initialLastUpdated: string;
}) {
  const reduceMotion = usePrefersReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchSessionRef = useRef(false);
  const [activeCollection, setActiveCollection] = useState<MenuCollectionId>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isCatalogPinned, setIsCatalogPinned] = useState(false);
  const deferredSearch = useDeferredValue(searchTerm);

  const normalizedMenuCopy = useMemo(() => {
    return new Map(
      initialItems.map((item) => [
        item.id,
        normalize([item.name, item.description, item.story, ...item.tags, ...item.details].join(" ")),
      ]),
    );
  }, [initialItems]);

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
    return initialItems.filter((item) => {
      if (!isItemInCollection(item, activeCollection)) return false;
      if (!query) return true;
      return normalizedMenuCopy.get(item.id)?.includes(query) ?? false;
    });
  }, [initialItems, activeCollection, deferredSearch, normalizedMenuCopy]);

  const groups = useMemo(() => {
    if (activeCollection !== "all" && !deferredSearch) {
      const collection = menuCollections.find((entry) => entry.id === activeCollection)!;
      return [{
        id: `collection-${collection.id}`,
        label: collection.label,
        description: collection.description,
        items: visibleItems,
      }];
    }

    return initialCategories
        .map((category) => ({
          ...category,
          items: visibleItems.filter((item) => item.category === category.id),
        }))
        .filter((group) => group.items.length > 0);
  }, [activeCollection, deferredSearch, initialCategories, visibleItems]);

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

  const selectCollection = (collection: MenuCollectionId, trigger?: HTMLButtonElement) => {
    const catalog = document.getElementById("menu-catalog");
    const shouldAlignResults =
      isCatalogPinned || searchSessionRef.current || (catalog?.getBoundingClientRect().top ?? Number.POSITIVE_INFINITY) <= 73;

    searchSessionRef.current = false;
    searchInputRef.current?.blur();
    setSearchTerm("");
    setActiveCollection(collection);
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
          <h1 id="menu-page-title">
            <span className={styles.heroBrand}>Tarihi Van Kahvaltı Evi</span>
            <span className={styles.heroMenu}>Menü</span>
          </h1>
        </div>
      </section>

      <section
        id="menu-catalog"
        className={`${styles.discoveryBar} ${isCatalogPinned ? styles.discoveryPinned : ""}`}
        aria-label="Menüde gezinme"
      >
        <div className={styles.discoveryInner}>
          <div className={styles.discoveryTop}>
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
                  if (nextSearch) setActiveCollection("all");
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
          </div>

          <nav className={styles.categoryNav} aria-label="Menü kategorileri">
            {menuCollections.map((collection, index) => (
              <button
                key={collection.id}
                type="button"
                className={activeCollection === collection.id ? styles.activeCategory : ""}
                aria-pressed={activeCollection === collection.id}
                aria-controls="menu-results"
                aria-label={`${collection.label} kategorisini göster`}
                style={{ animationDelay: `${index * 34}ms` }}
                onClick={(event) => selectCollection(collection.id, event.currentTarget)}
              >
                <span className={styles.categoryIconWell} aria-hidden="true">
                  <MenuCategoryIcon name={collection.icon} />
                </span>
                <span className={styles.categoryLabel}>{collection.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </section>

      <div id="menu-results" className={styles.menuContainer}>
        <div className={`${styles.resultLine} ${searchTerm ? styles.searchResultLine : ""}`} aria-live="polite">
          <span>
            {searchTerm
              ? `“${searchTerm}” için ${visibleItems.length} sonuç`
              : `${visibleItems.length} lezzet gösteriliyor`}
          </span>
          <span>Fiyatlar ₺ olarak gösterilir</span>
        </div>

        {visibleItems.length > 0 ? (
          <div className={styles.menuContent}>
            {groups.map((group, groupIndex) => (
              <section key={group.id} className={styles.menuSection} aria-labelledby={`cat-${group.id}`}>
                <header className={styles.sectionHeader}>
                  <div>
                    <h2 id={`cat-${group.id}`}>{group.label}</h2>
                    <p>{group.description}</p>
                  </div>
                  <span>{group.items.length} seçenek</span>
                </header>
                <div className={styles.menuGrid}>
                  {group.items.map((item, itemIndex) => (
                    <MenuCard
                      key={item.id}
                      item={item}
                      onOpen={openItem}
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
            <h2>Bu isimde bir lezzet bulamadık.</h2>
            <p>Başka bir kelime deneyin veya tüm sofraya geri dönün.</p>
            <button
              type="button"
              onClick={() => {
                setSearchTerm("");
                setActiveCollection("all");
              }}
            >
              Tüm menüyü göster
            </button>
          </div>
        )}

        <footer className={styles.menuNote}>
          <span>Menü güncelleme · {initialLastUpdated}</span>
          <p>Ürün uygunluğu mevsime ve günlük hazırlığa göre değişebilir. Alerjen bilgisi için ekibimize danışabilirsiniz.</p>
        </footer>
      </div>

      {selectedItem ? (
        <ProductSheet
          key={selectedItem.id}
          item={selectedItem}
          categoryLabel={initialCategories.find((category) => category.id === selectedItem.category)?.label}
          onClose={closeItem}
        />
      ) : null}
    </main>
  );
}
