"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Check,
  ChevronRight,
  Clock3,
  Search,
  UtensilsCrossed,
  X,
} from "lucide-react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import styles from "./menu.module.css";
import {
  menuCategories,
  menuItems,
  menuLastUpdated,
  type MenuFilterId,
  type MenuItem,
} from "./menu-data";

const ease = [0.16, 1, 0.3, 1] as const;

function normalize(value: string) {
  return value
    .toLocaleLowerCase("tr-TR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function MenuCard({
  item,
  index,
  onOpen,
}: {
  item: MenuItem;
  index: number;
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
      whileHover={reduceMotion ? undefined : { y: -3 }}
      whileTap={reduceMotion ? undefined : { scale: 0.99 }}
      transition={{ duration: reduceMotion ? 0 : 0.28, delay: Math.min(index * 0.025, 0.14), ease }}
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
  const [activeCategory, setActiveCategory] = useState<MenuFilterId>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const deferredSearch = useDeferredValue(searchTerm);

  useEffect(() => {
    document.documentElement.classList.add("menu-scroll-root");
    document.body.classList.add("menu-scroll-root");
    return () => {
      document.documentElement.classList.remove("menu-scroll-root");
      document.body.classList.remove("menu-scroll-root");
    };
  }, []);

  const visibleItems = useMemo(() => {
    const query = normalize(deferredSearch);
    return menuItems.filter((item) => {
      if (activeCategory !== "all" && item.category !== activeCategory) return false;
      if (!query) return true;
      return normalize([item.name, item.description, item.story, ...item.tags, ...item.details].join(" ")).includes(query);
    });
  }, [activeCategory, deferredSearch]);

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

  const selectCategory = (category: MenuFilterId) => {
    setActiveCategory(category);
    if (window.scrollY > 430) {
      document.getElementById("menu-results")?.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start",
      });
    }
  };

  return (
    <main id="main-content" className={styles.page}>
      <section className={styles.menuHero} aria-labelledby="menu-page-title">
        <div className={styles.heroCopy}>
          <p className={styles.heroProvenance}>
            <span>1978</span>
            <span>Beyoğlu · Van sofrası</span>
          </p>
          <h1 id="menu-page-title">
            Van sofrası,
            <strong>tek bakışta.</strong>
          </h1>
          <p className={styles.heroLead}>
            Her lezzetin görseli, içeriği ve fiyatı aynı yerde. Seçin, yakından bakın, sofranızı kolayca kurun.
          </p>
          <div className={styles.heroFacts} aria-label="Menü özeti">
            <span><UtensilsCrossed size={17} /> {menuItems.length} lezzet</span>
            <span><Clock3 size={17} /> Her gün 08:00—18:00</span>
          </div>
        </div>

        <div className={styles.heroVisual} aria-hidden="true">
          <motion.figure
            className={styles.heroMainPhoto}
            initial={reduceMotion ? false : { opacity: 0.82, x: 28, rotate: 1.5 }}
            animate={{ opacity: 1, x: 0, rotate: -1.2 }}
            transition={{ duration: reduceMotion ? 0 : 0.85, ease }}
          >
            <Image src="/images/hero-parallax/overhead-feast.webp" alt="" fill priority sizes="(max-width: 760px) 58vw, 500px" quality={82} />
          </motion.figure>
          <motion.figure
            className={styles.heroSmallPhoto}
            initial={reduceMotion ? false : { opacity: 0, y: 24, rotate: -3 }}
            animate={{ opacity: 1, y: 0, rotate: 2.5 }}
            transition={{ duration: reduceMotion ? 0 : 0.72, delay: reduceMotion ? 0 : 0.16, ease }}
          >
            <Image src="/images/sucuk-egg.jpg" alt="" fill priority sizes="(max-width: 760px) 31vw, 220px" quality={82} />
          </motion.figure>
          <motion.div
            className={styles.heroTea}
            animate={reduceMotion ? undefined : { y: [0, -7, 0], rotate: [-1, 1, -1] }}
            transition={{ duration: 5.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image src="/images/hero-float/tea-glass.webp" alt="" fill sizes="120px" quality={82} />
          </motion.div>
          <span className={styles.heroStamp}>Beyoğlu<br />sofrası</span>
        </div>
      </section>

      <section id="menu-catalog" className={styles.discoveryBar} aria-label="Menüde gezinme">
        <div className={styles.discoveryInner}>
          <div className={styles.searchField}>
            <Search size={18} aria-hidden="true" />
            <label className={styles.srOnly} htmlFor="menu-search">Menüde ara</label>
            <input
              id="menu-search"
              type="search"
              placeholder="Lezzet ara"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              autoComplete="off"
            />
            {searchTerm ? (
              <button type="button" onClick={() => setSearchTerm("")} aria-label="Aramayı temizle">
                <X size={17} />
              </button>
            ) : null}
          </div>

          <nav className={styles.categoryNav} aria-label="Menü kategorileri">
            <button
              type="button"
              className={activeCategory === "all" ? styles.activeCategory : ""}
              aria-pressed={activeCategory === "all"}
              onClick={() => selectCategory("all")}
            >
              {activeCategory === "all" ? <motion.span layoutId="category-rail" className={styles.categoryRail} /> : null}
              <span>Tümü</span><small>{menuItems.length}</small>
            </button>
            {menuCategories.map((category) => (
              <button
                key={category.id}
                type="button"
                className={activeCategory === category.id ? styles.activeCategory : ""}
                aria-pressed={activeCategory === category.id}
                onClick={() => selectCategory(category.id)}
              >
                {activeCategory === category.id ? <motion.span layoutId="category-rail" className={styles.categoryRail} /> : null}
                <span>{category.shortLabel}</span><small>{categoryCounts[category.id]}</small>
              </button>
            ))}
          </nav>
        </div>
      </section>

      <div id="menu-results" className={styles.menuContainer}>
        <div className={`${styles.resultLine} ${searchTerm ? styles.searchResultLine : ""}`} aria-live="polite">
          <span>{searchTerm ? `“${searchTerm}” için ${visibleItems.length} sonuç` : `${visibleItems.length} lezzet gösteriliyor`}</span>
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
                    {group.items.map((item, index) => (
                      <MenuCard key={item.id} item={item} index={index} onOpen={() => setSelectedItem(item)} />
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
