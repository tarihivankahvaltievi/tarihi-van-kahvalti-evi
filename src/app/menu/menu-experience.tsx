"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowUp,
  Check,
  ChevronRight,
  Clock3,
  Leaf,
  Search,
  Sparkles,
  UtensilsCrossed,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { createPortal } from "react-dom";
import {
  useDeferredValue,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import styles from "./menu.module.css";
import {
  menuCategories,
  menuItems,
  menuLastUpdated,
  type MenuFilterId,
  type MenuItem,
  type MenuTag,
} from "./menu-data";

const tagIcon: Partial<Record<MenuTag, typeof Sparkles>> = {
  "Öne çıkan": Sparkles,
  Vejetaryen: Leaf,
};

function normalizeSearch(value: string) {
  return value
    .toLocaleLowerCase("tr-TR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function MenuImage({ item, sizes }: { item: MenuItem; sizes: string }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <span className={`${styles.imageFrame} ${loaded ? styles.imageLoaded : ""}`}>
      <Image
        src={item.image}
        alt={item.imageAlt}
        fill
        sizes={sizes}
        quality={74}
        onLoad={() => setLoaded(true)}
      />
      <span className={styles.imageWash} aria-hidden="true" />
    </span>
  );
}

function ProductDialog({ item, onClose }: { item: MenuItem | null; onClose: () => void }) {
  const reduceMotion = useReducedMotion();
  const dialogRef = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!item) return;

    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusFrame = window.requestAnimationFrame(() => closeRef.current?.focus());

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab") return;
      const focusable = Array.from(
        dialogRef.current?.querySelectorAll<HTMLElement>(
          "a[href], button:not([disabled]), [tabindex]:not([tabindex='-1'])",
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

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [item, onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {item ? (
        <motion.div
          className={styles.dialogLayer}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.2 }}
        >
          <button className={styles.dialogBackdrop} type="button" aria-label="Ürün detayını kapat" onClick={onClose} />
          <motion.section
            ref={dialogRef}
            className={styles.dialog}
            role="dialog"
            aria-modal="true"
            aria-labelledby="menu-dialog-title"
            initial={reduceMotion ? false : { opacity: 0, y: 32, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.99 }}
            transition={{ duration: reduceMotion ? 0 : 0.36, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.dialogMedia}>
              <Image src={item.image} alt={item.imageAlt} fill sizes="(max-width: 680px) 100vw, 560px" quality={82} />
              <div className={styles.dialogMediaShade} aria-hidden="true" />
              <button ref={closeRef} className={styles.dialogClose} type="button" onClick={onClose} aria-label="Kapat">
                <X aria-hidden="true" />
              </button>
              <div className={styles.dialogPrice}>
                <strong>{item.price}</strong>
                {item.priceNote ? <span>{item.priceNote}</span> : null}
              </div>
            </div>

            <div className={styles.dialogContent}>
              <div className={styles.tagRow} aria-label="Ürün özellikleri">
                {item.tags.map((tag) => {
                  const Icon = tagIcon[tag];
                  return (
                    <span key={tag} className={styles.tag}>
                      {Icon ? <Icon size={13} aria-hidden="true" /> : null}
                      {tag}
                    </span>
                  );
                })}
              </div>
              <h2 id="menu-dialog-title">{item.name}</h2>
              <p>{item.story}</p>
              <ul className={styles.detailList}>
                {item.details.map((detail) => (
                  <li key={detail}>
                    <Check size={15} aria-hidden="true" />
                    {detail}
                  </li>
                ))}
              </ul>
              <button className={styles.dialogDone} type="button" onClick={onClose}>
                Menüye dön
                <ChevronRight size={18} aria-hidden="true" />
              </button>
            </div>
          </motion.section>
        </motion.div>
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
  const [showTop, setShowTop] = useState(false);
  const deferredSearch = useDeferredValue(searchTerm);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 720);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const visibleItems = useMemo(() => {
    const query = normalizeSearch(deferredSearch);
    return menuItems.filter((item) => {
      const matchesCategory = activeCategory === "all" || item.category === activeCategory;
      if (!matchesCategory) return false;
      if (!query) return true;
      const searchable = normalizeSearch(
        [item.name, item.description, item.story, item.tags.join(" "), item.details.join(" ")].join(" "),
      );
      return searchable.includes(query);
    });
  }, [activeCategory, deferredSearch]);

  const visibleGroups = menuCategories
    .map((category) => ({
      ...category,
      items: visibleItems.filter((item) => item.category === category.id),
    }))
    .filter((category) => category.items.length > 0);

  const selectCategory = (category: MenuFilterId) => {
    setActiveCategory(category);
    window.requestAnimationFrame(() => {
      const top = resultsRef.current?.getBoundingClientRect().top ?? 0;
      window.scrollTo({ top: window.scrollY + top - 190, behavior: reduceMotion ? "auto" : "smooth" });
    });
  };

  return (
    <main id="main-content" className={styles.page}>
      <section className={styles.hero} aria-labelledby="menu-title">
        <div className={styles.heroInner}>
          <motion.div
            className={styles.heroCopy}
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.64, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link href="/" className={styles.backLink}>
              <ArrowLeft size={17} aria-hidden="true" />
              Ana sayfa
            </Link>
            <span className={styles.heroDate}>1978 · Beyoğlu</span>
            <h1 id="menu-title">
              Sofranın <em>hikâyesi</em>,<br /> şimdi avucunda.
            </h1>
            <p>
              Van’dan gelen tatları, bakır sahanları ve hiç acele etmeyen çayı keşfet.
              Bir ürüne dokun; ayrıntısı sofradaki gibi önüne açılsın.
            </p>
            <div className={styles.heroMeta}>
              <span><Clock3 size={16} aria-hidden="true" /> Her gün 08:00–18:00</span>
              <span><UtensilsCrossed size={16} aria-hidden="true" /> {menuItems.length} sofra lezzeti</span>
            </div>
          </motion.div>

          <motion.div
            className={styles.heroMosaic}
            initial={reduceMotion ? false : { opacity: 0, clipPath: "inset(8% 0 8% 0 round 12px)" }}
            animate={{ opacity: 1, clipPath: "inset(0% 0 0% 0 round 12px)" }}
            transition={{ duration: reduceMotion ? 0 : 0.82, delay: reduceMotion ? 0 : 0.08, ease: [0.16, 1, 0.3, 1] }}
            aria-hidden="true"
          >
            <div className={styles.heroMainImage}>
              <Image src="/images/hero-parallax/overhead-feast.webp" alt="" fill priority sizes="(max-width: 760px) 62vw, 36vw" quality={82} />
            </div>
            <div className={styles.heroSideImage}>
              <Image src="/images/tea-service.jpg" alt="" fill priority sizes="(max-width: 760px) 34vw, 16vw" quality={74} />
            </div>
            <div className={styles.heroStamp}>Van<br /><span>sofrası</span></div>
          </motion.div>
        </div>
      </section>

      <section className={styles.menuArea} aria-label="Dijital menü">
        <div className={styles.stickyTools}>
          <div className={styles.searchWrap}>
            <Search size={19} aria-hidden="true" />
            <label htmlFor="menu-search" className={styles.srOnly}>Menüde ara</label>
            <input
              id="menu-search"
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Peynir, sıcaklar, çay…"
              autoComplete="off"
            />
            {searchTerm ? (
              <button type="button" onClick={() => setSearchTerm("")} aria-label="Aramayı temizle">
                <X size={17} aria-hidden="true" />
              </button>
            ) : null}
          </div>

          <nav className={styles.categories} aria-label="Menü kategorileri">
            <button
              type="button"
              className={activeCategory === "all" ? styles.categoryActive : ""}
              aria-pressed={activeCategory === "all"}
              onClick={() => selectCategory("all")}
            >
              Tümü <span>{menuItems.length}</span>
            </button>
            {menuCategories.map((category) => {
              const count = menuItems.filter((item) => item.category === category.id).length;
              return (
                <button
                  key={category.id}
                  type="button"
                  className={activeCategory === category.id ? styles.categoryActive : ""}
                  aria-pressed={activeCategory === category.id}
                  onClick={() => selectCategory(category.id)}
                >
                  <span className={styles.longCategory}>{category.label}</span>
                  <span className={styles.shortCategory}>{category.shortLabel}</span>
                  <span>{count}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div ref={resultsRef} id="menu-results" className={styles.results}>
          <div className={styles.resultsIntro}>
            <div>
              <span className={styles.resultsKicker}>Bugünün sofrası</span>
              <h2>{activeCategory === "all" ? "Van kahvaltısını keşfet" : menuCategories.find((category) => category.id === activeCategory)?.label}</h2>
            </div>
            <p className={styles.resultCount} role="status" aria-live="polite">
              {visibleItems.length} ürün gösteriliyor
            </p>
          </div>

          {visibleItems.length ? (
            <AnimatePresence initial={false} mode="popLayout">
              {visibleGroups.map((group, groupIndex) => (
                <motion.section
                  key={group.id}
                  className={styles.categorySection}
                  aria-labelledby={`category-${group.id}`}
                  layout={!reduceMotion}
                  initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
                  transition={{ duration: reduceMotion ? 0 : 0.28, delay: reduceMotion ? 0 : groupIndex * 0.035 }}
                >
                  <header className={styles.categoryHeader}>
                    <div>
                      <h3 id={`category-${group.id}`}>{group.label}</h3>
                      <p>{group.description}</p>
                    </div>
                    <span>{group.items.length.toString().padStart(2, "0")}</span>
                  </header>

                  <div className={styles.itemGrid}>
                    <AnimatePresence initial={false} mode="popLayout">
                      {group.items.map((item, itemIndex) => (
                        <motion.article
                          key={item.id}
                          id={item.id}
                          className={styles.menuItem}
                          layout={!reduceMotion}
                          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: reduceMotion ? 1 : 0.985 }}
                          transition={{ duration: reduceMotion ? 0 : 0.3, delay: reduceMotion ? 0 : Math.min(itemIndex, 5) * 0.045 }}
                          style={{ "--item-order": itemIndex } as CSSProperties}
                        >
                          <button type="button" className={styles.itemButton} onClick={() => setSelectedItem(item)} aria-label={`${item.name} ayrıntılarını aç`}>
                            <MenuImage item={item} sizes="(max-width: 640px) 112px, (max-width: 1100px) 150px, 180px" />
                            <span className={styles.itemContent}>
                              <span className={styles.itemTopline}>
                                <span className={styles.itemTags}>
                                  {item.tags.slice(0, 2).map((tag) => {
                                    const Icon = tagIcon[tag];
                                    return <span key={tag}>{Icon ? <Icon size={12} aria-hidden="true" /> : null}{tag}</span>;
                                  })}
                                </span>
                                <ChevronRight className={styles.itemArrow} size={18} aria-hidden="true" />
                              </span>
                              <span className={styles.itemName}>{item.name}</span>
                              <span className={styles.itemDescription}>{item.description}</span>
                              <span className={styles.itemPrice}>
                                <strong>{item.price}</strong>
                                {item.priceNote ? <small>{item.priceNote}</small> : null}
                              </span>
                            </span>
                          </button>
                        </motion.article>
                      ))}
                    </AnimatePresence>
                  </div>
                </motion.section>
              ))}
            </AnimatePresence>
          ) : (
            <motion.div className={styles.emptyState} initial={{ opacity: 0 }} animate={{ opacity: 1 }} role="status">
              <Search size={28} aria-hidden="true" />
              <h3>Bu aramayla eşleşen bir lezzet bulamadık.</h3>
              <p>Başka bir ürün adı deneyebilir veya tüm sofraya dönebilirsin.</p>
              <button type="button" onClick={() => { setSearchTerm(""); setActiveCategory("all"); }}>Tüm menüyü göster</button>
            </motion.div>
          )}

          <footer className={styles.menuNote}>
            <p><strong>İyi bilinsin:</strong> Ürün uygunluğu ve fiyatlar dönemsel olarak değişebilir. Alerjen veya özel beslenme ihtiyacın varsa ekibimize söyle.</p>
            <span>Son güncelleme: {menuLastUpdated}</span>
          </footer>
        </div>
      </section>

      <AnimatePresence>
        {showTop ? (
          <motion.button
            className={styles.toTop}
            type="button"
            aria-label="Menünün başına dön"
            onClick={() => window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" })}
            initial={reduceMotion ? false : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
          >
            <ArrowUp size={19} aria-hidden="true" />
          </motion.button>
        ) : null}
      </AnimatePresence>

      <ProductDialog item={selectedItem} onClose={() => setSelectedItem(null)} />
    </main>
  );
}
