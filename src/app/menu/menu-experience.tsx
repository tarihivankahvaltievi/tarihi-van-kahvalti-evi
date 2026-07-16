"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, Check, ChevronRight, Clock3, Search, UtensilsCrossed, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { createPortal } from "react-dom";
import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import styles from "./menu.module.css";
import { menuCategories, menuItems, type MenuFilterId, type MenuItem } from "./menu-data";

const ease = [0.16, 1, 0.3, 1] as const;

function normalize(value: string) {
  return value.toLocaleLowerCase("tr-TR").normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
}

/* --- Loader Component --- */
function PageLoader({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={styles.loaderContainer}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease }}
        >
          <div className={styles.loaderContent}>
            <motion.div
              className={styles.loaderSpinner}
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            />
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              Yükleniyor...
            </motion.h2>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* --- Visual Grid Card Component --- */
function MenuCard({ item, index, onOpen }: { item: MenuItem; index: number; onOpen: () => void }) {
  const reduceMotion = useReducedMotion();
  const isIncluded = item.price.toLowerCase().includes("dahil") || item.price.toLowerCase().includes("sofraya");

  return (
    <motion.button
      type="button"
      className={styles.menuCard}
      onClick={onOpen}
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: reduceMotion ? 0 : 0.4, delay: Math.min(index * 0.04, 0.2), ease }}
      aria-label={`${item.name} detayını gör`}
    >
      <div className={styles.cardMedia}>
        <Image src={item.image} alt={item.imageAlt} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" quality={80} />
        {item.tags.includes("Öne çıkan") && (
          <span className={styles.tagBadge}>Popüler</span>
        )}
      </div>
      <div className={styles.cardContent}>
        <div className={styles.cardHeader}>
          <h3 className={styles.cardTitle}>{item.name}</h3>
          <span className={styles.cardPrice}>
            {isIncluded ? "Dahil" : item.price}
          </span>
        </div>
        <p className={styles.cardDesc}>{item.description}</p>
      </div>
    </motion.button>
  );
}

/* --- Native App Bottom Sheet / Modal --- */
function ProductSheet({ item, onClose }: { item: MenuItem | null; onClose: () => void }) {
  const reduceMotion = useReducedMotion();
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!item) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [item, onClose]);

  if (typeof document === "undefined") return null;
  
  return createPortal(
    <AnimatePresence>
      {item ? (
        <>
          <motion.div 
            className={styles.overlayBackdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div 
            ref={sheetRef}
            className={styles.bottomSheet} 
            role="dialog" 
            aria-modal="true" 
            initial={reduceMotion ? false : { y: "100%", opacity: 0.5 }} 
            animate={{ y: 0, opacity: 1 }} 
            exit={{ y: "100%", opacity: 0 }} 
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            <div className={styles.sheetHandle} />
            <button type="button" className={styles.sheetCloseBtn} onClick={onClose} aria-label="Kapat">
              <X size={20} />
            </button>

            <div className={styles.sheetMedia}>
              <Image src={item.image} alt={item.imageAlt} fill sizes="(max-width: 768px) 100vw, 500px" quality={85} priority />
            </div>

            <div className={styles.sheetContent}>
              <div className={styles.sheetTitleRow}>
                <h2>{item.name}</h2>
                <div className={styles.sheetPriceBlock}>
                  <strong>{item.price}</strong>
                  {item.priceNote ? <span>{item.priceNote}</span> : null}
                </div>
              </div>

              <p className={styles.sheetStory}>{item.story}</p>
              
              <h3 className={styles.sheetSectionTitle}>İçerik & Bilgiler</h3>
              <ul className={styles.sheetDetailsList}>
                {item.details.map((detail) => (
                  <li key={detail}><Check size={16} /> {detail}</li>
                ))}
              </ul>

              <button type="button" className={styles.sheetAction} onClick={onClose}>
                Menüye Dön <ChevronRight size={18} />
              </button>
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>, document.body,
  );
}

/* --- Main Application View --- */
export function MenuExperience() {
  const reduceMotion = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState<MenuFilterId>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [loading, setLoading] = useState(true);
  
  const deferredSearch = useDeferredValue(searchTerm);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const visibleItems = useMemo(() => {
    const query = normalize(deferredSearch);
    return menuItems.filter((item) => {
      if (activeCategory !== "all" && item.category !== activeCategory) return false;
      return !query || normalize([item.name, item.description, item.story, ...item.tags, ...item.details].join(" ")).includes(query);
    });
  }, [activeCategory, deferredSearch]);

  const groups = menuCategories.map((category) => ({
    ...category,
    items: visibleItems.filter((item) => item.category === category.id)
  })).filter((group) => group.items.length);

  const selectCategory = (category: MenuFilterId) => {
    setActiveCategory(category);
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <>
      <PageLoader visible={loading} />

      <main className={styles.page}>
        {/* Top App Header */}
        <header className={styles.appHeader}>
          <div className={styles.headerTitle}>
            <Link href="/" className={styles.headerBack} aria-label="Geri Dön">
              <ArrowLeft size={18} />
            </Link>
            Tarihi Van Sofrası
          </div>
          <div className={styles.searchWrapper}>
            <Search className={styles.searchIcon} size={18} />
            <input 
              type="search" 
              className={styles.searchInput}
              placeholder="Menüde ara..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button type="button" className={styles.clearSearch} onClick={() => setSearchTerm("")}>
                <X size={16} />
              </button>
            )}
          </div>
        </header>

        {/* Sticky Horizontal Categories */}
        <div className={styles.categoryNavWrapper}>
          <nav className={styles.categoryNav} aria-label="Kategoriler">
            <button 
              type="button" 
              className={`${styles.categoryBtn} ${activeCategory === "all" ? styles.activeCategory : ""}`}
              onClick={() => selectCategory("all")}
            >
              {activeCategory === "all" && <motion.span layoutId="activePill" className={styles.activePill} transition={{ duration: 0.3 }} />}
              Tümü
            </button>
            {menuCategories.map((cat) => (
              <button 
                key={cat.id}
                type="button" 
                className={`${styles.categoryBtn} ${activeCategory === cat.id ? styles.activeCategory : ""}`}
                onClick={() => selectCategory(cat.id)}
              >
                {activeCategory === cat.id && <motion.span layoutId="activePill" className={styles.activePill} transition={{ duration: 0.3 }} />}
                {cat.shortLabel}
              </button>
            ))}
          </nav>
        </div>

        {/* Main Menu Content */}
        <div className={styles.menuContainer}>
          {visibleItems.length > 0 ? (
            <div className={styles.menuContent}>
              {groups.map((group) => (
                <section key={group.id} aria-labelledby={`cat-${group.id}`}>
                  {activeCategory === "all" && (
                    <h2 id={`cat-${group.id}`} className={styles.sectionTitle}>{group.label}</h2>
                  )}
                  <div className={styles.menuGrid}>
                    {group.items.map((item, index) => (
                      <MenuCard 
                        key={item.id} 
                        item={item} 
                        index={index} 
                        onOpen={() => setSelectedItem(item)} 
                      />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <Search size={40} />
              <h3>Sonuç bulunamadı</h3>
              <p>"{searchTerm}" aramasıyla eşleşen bir lezzet bulamadık. Başka bir kelime deneyebilir veya menüye göz atabilirsiniz.</p>
              <button type="button" onClick={() => { setSearchTerm(""); setActiveCategory("all"); }}>Tüm Menüyü Gör</button>
            </div>
          )}
        </div>

        {/* Selected Product Bottom Sheet */}
        <ProductSheet item={selectedItem} onClose={() => setSelectedItem(null)} />
      </main>
    </>
  );
}
