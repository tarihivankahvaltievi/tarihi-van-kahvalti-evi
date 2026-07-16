"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, Check, ChevronRight, Clock3, Leaf, Search, Grid, List, Sparkles, UtensilsCrossed, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { createPortal } from "react-dom";
import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import styles from "./menu.module.css";
import { menuCategories, menuItems, menuLastUpdated, type MenuFilterId, type MenuItem } from "./menu-data";

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
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.5, ease }}
        >
          <div className={styles.loaderContent}>
            {/* Elegant SVG ornament animation */}
            <motion.svg 
              width="80" 
              height="80" 
              viewBox="0 0 100 100" 
              fill="none" 
              stroke="currentColor" 
              className={styles.loaderOrnament}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1, ease: "easeInOut" }}
            >
              <path d="M50 15 C30 15, 20 35, 20 50 C20 70, 35 85, 50 85 C65 85, 80 70, 80 50 C80 35, 70 15, 50 15 Z" strokeWidth="2" strokeDasharray="4 2" />
              <path d="M50 25 C40 25, 30 40, 30 50 C30 65, 40 75, 50 75 C60 75, 70 65, 70 50 C70 40, 60 25, 50 25 Z" strokeWidth="1" />
              <circle cx="50" cy="50" r="6" fill="var(--gold)" stroke="none" />
            </motion.svg>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Tarihi Van Sofrası
            </motion.h2>
            <motion.span
              className={styles.loaderSubtitle}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              Yöresel Lezzet Seçkisi
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* --- Bistro List Row View Component --- */
function MenuRow({ item, index, onOpen }: { item: MenuItem; index: number; onOpen: () => void }) {
  const reduceMotion = useReducedMotion();
  const isIncluded = item.price.toLowerCase().includes("dahil") || item.price.toLowerCase().includes("sofraya");

  return (
    <motion.article
      className={styles.productRow}
      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: reduceMotion ? 0 : 0.4, delay: Math.min(index * 0.02, 0.1), ease }}
    >
      <button type="button" onClick={onOpen} aria-label={`${item.name} detayını aç`} className={styles.rowButton}>
        <div className={styles.rowThumbnail}>
          <Image src={item.image} alt={item.imageAlt} fill sizes="64px" quality={82} />
          {item.tags.includes("Öne çıkan") && (
            <span className={styles.rowHighlightBadge}>
              <Sparkles size={8} /> Popüler
            </span>
          )}
        </div>
        <div className={styles.rowInfo}>
          <div className={styles.rowHeader}>
            <span className={styles.rowName}>{item.name}</span>
            {isIncluded ? (
              <span className={styles.rowIncludedBadge}>Sofraya Dahil</span>
            ) : (
              <span className={styles.rowPrice}>{item.price}</span>
            )}
          </div>
          <p className={styles.rowDescription}>{item.description}</p>
          {item.tags.filter(t => t !== "Öne çıkan").length > 0 && (
            <div className={styles.rowBadges}>
              {item.tags.filter(t => t !== "Öne çıkan").map(tag => (
                <span key={tag} className={`${styles.rowBadge} ${tag === "Vejetaryen" ? styles.badgeVeggie : styles.badgeRecommend}`}>
                  {tag === "Vejetaryen" && <Leaf size={9} />} {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        <ChevronRight size={16} className={styles.rowChevron} />
      </button>
    </motion.article>
  );
}

/* --- Visual Grid Card View Component --- */
function MenuGridCard({ item, index, onOpen }: { item: MenuItem; index: number; onOpen: () => void }) {
  const reduceMotion = useReducedMotion();
  const isIncluded = item.price.toLowerCase().includes("dahil") || item.price.toLowerCase().includes("sofraya");

  return (
    <motion.article
      className={styles.gridCard}
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: reduceMotion ? 0 : 0.45, delay: Math.min(index * 0.03, 0.12), ease }}
    >
      <button type="button" onClick={onOpen} aria-label={`${item.name} detayını aç`} className={styles.gridCardButton}>
        <div className={styles.gridCardMedia}>
          <Image src={item.image} alt={item.imageAlt} fill sizes="(max-width: 680px) 50vw, 300px" quality={82} />
          {item.tags.includes("Öne çıkan") && (
            <span className={styles.gridCardBadge}>
              <Sparkles size={8} /> Popüler
            </span>
          )}
        </div>
        <div className={styles.gridCardBody}>
          <div className={styles.gridCardHeader}>
            <span className={styles.gridCardName}>{item.name}</span>
            {isIncluded ? (
              <span className={styles.rowIncludedBadge}>Dahil</span>
            ) : (
              <span className={styles.gridCardPrice}>{item.price}</span>
            )}
          </div>
          <p className={styles.gridCardDescription}>{item.description}</p>
        </div>
      </button>
    </motion.article>
  );
}

/* --- Featured Signature Dish Banner --- */
function SignatureDish({ item, onOpen }: { item: MenuItem; onOpen: () => void }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.article 
      className={styles.signatureDish} 
      initial={reduceMotion ? false : { opacity: 0, y: 20 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      viewport={{ once: true, amount: 0.15 }} 
      transition={{ duration: reduceMotion ? 0 : 0.5, ease }}
    >
      <button type="button" onClick={onOpen} aria-label={`${item.name} detayını aç`} className={styles.signatureButton}>
        <span className={styles.signatureMedia}>
          <Image src="/images/hero-table.jpg" alt="Masaya kurulmuş geleneksel Van kahvaltısı" fill sizes="(max-width: 700px) 100vw, 600px" quality={88} />
          <span className={styles.signatureNote}>En Az İki Kişilik</span>
        </span>
        <span className={styles.signatureContent}>
          <span className={styles.signatureLabel}><Sparkles size={12} fill="currentColor" /> İmza Sofra Deneyimi</span>
          <span className={styles.signatureName}>{item.name}</span>
          <span className={styles.signatureDescription}>{item.description}</span>
          <div className={styles.signaturePriceRow}>
            <div>
              <span className={styles.signaturePriceVal}>{item.price}</span>
              <span className={styles.signaturePriceNote}>{item.priceNote}</span>
            </div>
            <span className={styles.signatureDetailBtn}>
              Detayları Keşfet <ChevronRight size={14} />
            </span>
          </div>
        </span>
      </button>
    </motion.article>
  );
}

/* --- Magazine Spread Details Modal --- */
function ProductDialog({ item, onClose }: { item: MenuItem | null; onClose: () => void }) {
  const reduceMotion = useReducedMotion();
  const dialogRef = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!item) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const frame = requestAnimationFrame(() => closeRef.current?.focus());
    
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab") return;
      const nodes = Array.from(dialogRef.current?.querySelectorAll<HTMLElement>("button:not([disabled])") ?? []);
      if (!nodes.length) return;
      if (event.shiftKey && document.activeElement === nodes[0]) { event.preventDefault(); nodes.at(-1)?.focus(); }
      if (!event.shiftKey && document.activeElement === nodes.at(-1)) { event.preventDefault(); nodes[0].focus(); }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [item, onClose]);

  if (typeof document === "undefined") return null;
  
  return createPortal(
    <AnimatePresence>
      {item ? (
        <div className={styles.dialogLayer}>
          <button className={styles.dialogBackdrop} type="button" onClick={onClose} aria-label="Ürün detayını kapat" />
          <motion.section 
            ref={dialogRef} 
            className={styles.dialog} 
            role="dialog" 
            aria-modal="true" 
            aria-labelledby="product-title"
            initial={reduceMotion ? false : { opacity: 0, y: 30, scale: 0.98 }} 
            animate={{ opacity: 1, y: 0, scale: 1 }} 
            exit={{ opacity: 0, y: 15, scale: 0.99 }} 
            transition={{ duration: reduceMotion ? 0 : 0.35, ease }}
          >
            <div className={styles.dialogMedia}>
              <Image src={item.image} alt={item.imageAlt} fill sizes="(max-width: 700px) 100vw, 480px" quality={85} />
              <button ref={closeRef} type="button" className={styles.dialogClose} onClick={onClose} aria-label="Kapat"><X size={16} /></button>
              <div className={styles.dialogPrice}>
                <strong>{item.price}</strong>
                {item.priceNote ? <span>{item.priceNote}</span> : null}
              </div>
            </div>
            <div className={styles.dialogContent}>
              <div className={styles.dialogTags}>
                {item.tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
              <h2 id="product-title">{item.name}</h2>
              <p className={styles.dialogStory}>{item.story}</p>
              
              <div className={styles.dialogDetailsList}>
                <h4>Soframızın Detayları</h4>
                <ul>
                  {item.details.map((detail) => <li key={detail}><Check size={13} /> {detail}</li>)}
                </ul>
              </div>

              <button type="button" className={styles.dialogDone} onClick={onClose}>
                Menüye Dön <ChevronRight size={15} />
              </button>
            </div>
          </motion.section>
        </div>
      ) : null}
    </AnimatePresence>, document.body,
  );
}

/* --- Main Layout Component --- */
export function MenuExperience() {
  const reduceMotion = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState<MenuFilterId>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [searchFocused, setSearchFocused] = useState(false);
  
  const deferredSearch = useDeferredValue(searchTerm);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const visibleItems = useMemo(() => {
    const query = normalize(deferredSearch);
    return menuItems.filter((item) => {
      if (activeCategory !== "all" && item.category !== activeCategory) return false;
      return !query || normalize([item.name, item.description, item.story, ...item.tags, ...item.details].join(" ")).includes(query);
    });
  }, [activeCategory, deferredSearch]);

  const signatureItem = visibleItems.find((item) => item.id === "geleneksel-van-kahvaltisi");
  const groups = menuCategories.map((category) => ({
    ...category,
    items: visibleItems.filter((item) => item.category === category.id && item.id !== signatureItem?.id)
  })).filter((group) => group.items.length);

  const selectCategory = (category: MenuFilterId) => {
    setActiveCategory(category);
    if (window.scrollY > 200) {
      requestAnimationFrame(() => contentRef.current?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" }));
    }
  };

  return (
    <>
      <PageLoader visible={loading} />

      <main id="main-content" className={styles.page}>
        <section className={styles.masthead} aria-labelledby="menu-title">
          <div className={styles.mastheadInner}>
            <motion.div 
              className={styles.mastheadCopy} 
              initial={reduceMotion ? false : { opacity: 0, y: 15 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: reduceMotion ? 0 : 0.5, ease }}
            >
              <div className={styles.breadcrumb}>
                <Link href="/"><ArrowLeft size={14} /> Ana sayfa</Link>
                <span>1978 · Beyoğlu</span>
              </div>
              <h1 id="menu-title">
                <span className={styles.titleLine}>Tarihi Van</span>
                <span className={styles.titleLineHighlight}>Kahvaltı Menüsü</span>
              </h1>
              <p className={styles.subtitle}>Her tabağı fotoğrafı ve güncel fiyatıyla görün.</p>
              <div className={styles.mastheadMeta}>
                <span><Clock3 size={14} /> Her gün <strong>08:00–18:00</strong></span>
                <span><UtensilsCrossed size={14} /> KDV dahil fiyatlar</span>
              </div>
            </motion.div>
            <div className={styles.mastheadVisual}>
              <Image src="/images/hands-table.jpg" alt="Van kahvaltısı tabaklarını masaya uzatan eller" fill priority sizes="(max-width: 700px) 100vw, 500px" quality={86} />
              <div className={styles.mastheadStamp}>
                <strong>Van</strong>
                <span>sofrası · 1978</span>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.menuSection} aria-label="Fotoğraflı kahvaltı menüsü">
          <div className={styles.menuTools}>
            <div className={styles.toolsInner}>
              <nav className={styles.categoryNav} aria-label="Menü kategorileri">
                <button 
                  type="button" 
                  className={activeCategory === "all" ? styles.activeCategory : ""} 
                  aria-pressed={activeCategory === "all"} 
                  onClick={() => selectCategory("all")}
                >
                  {activeCategory === "all" ? <motion.span layoutId="menu-active" className={styles.activePill} transition={{ duration: 0.3, ease }} /> : null}
                  <span className={styles.navBtnText}>Tümü</span>
                  <span className={styles.navBtnCount}>{menuItems.length}</span>
                </button>
                {menuCategories.map((category) => (
                  <button 
                    key={category.id} 
                    type="button" 
                    className={activeCategory === category.id ? styles.activeCategory : ""} 
                    aria-pressed={activeCategory === category.id} 
                    onClick={() => selectCategory(category.id)}
                  >
                    {activeCategory === category.id ? <motion.span layoutId="menu-active" className={styles.activePill} transition={{ duration: 0.3, ease }} /> : null}
                    <span className={styles.navBtnText}>{category.shortLabel}</span>
                    <span className={styles.navBtnCount}>{menuItems.filter((item) => item.category === category.id).length}</span>
                  </button>
                ))}
              </nav>

              <div className={styles.toolsRight}>
                {/* Visual View Mode Selector Toggle */}
                <div className={styles.viewToggleWrap}>
                  <button 
                    type="button" 
                    className={viewMode === "list" ? styles.activeViewBtn : ""} 
                    onClick={() => setViewMode("list")}
                    aria-label="Liste görünümü"
                  >
                    <List size={15} />
                  </button>
                  <button 
                    type="button" 
                    className={viewMode === "grid" ? styles.activeViewBtn : ""} 
                    onClick={() => setViewMode("grid")}
                    aria-label="Izgara görünümü"
                  >
                    <Grid size={15} />
                  </button>
                </div>

                <div className={styles.searchBox}>
                  <motion.div
                    animate={{ rotate: searchFocused ? 15 : 0, scale: searchFocused ? 1.15 : 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    className={styles.searchIconWrap}
                  >
                    <Search size={16} />
                  </motion.div>
                  <label htmlFor="menu-search" className={styles.srOnly}>Menüde ara</label>
                  <input 
                    id="menu-search" 
                    type="search" 
                    value={searchTerm} 
                    onChange={(event) => setSearchTerm(event.target.value)} 
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => setSearchFocused(false)}
                    placeholder="Menüde ara..." 
                  />
                  {searchTerm ? <button type="button" onClick={() => setSearchTerm("")} aria-label="Aramayı temizle"><X size={14} /></button> : null}
                </div>
              </div>
            </div>
          </div>

          <div ref={contentRef} className={styles.menuContent}>
            <header className={styles.menuIntro}>
              <h2>{activeCategory === "all" ? "Bugün Sofrada" : menuCategories.find((category) => category.id === activeCategory)?.label}</h2>
              <p role="status" aria-live="polite">
                <strong>{visibleItems.length}</strong> lezzet
              </p>
            </header>

            {visibleItems.length ? (
              <>
                <AnimatePresence mode="popLayout">
                  {signatureItem ? <SignatureDish key={signatureItem.id} item={signatureItem} onOpen={() => setSelectedItem(signatureItem)} /> : null}
                </AnimatePresence>

                <motion.div className={`${styles.categoryGallery} ${activeCategory !== "all" ? styles.filteredGallery : ""}`} layout={!reduceMotion}>
                  {groups.map((group, groupIndex) => (
                    <motion.section 
                      key={group.id} 
                      className={styles.category} 
                      layout={!reduceMotion} 
                      aria-labelledby={`category-${group.id}`} 
                      initial={reduceMotion ? false : { opacity: 0, y: 20 }} 
                      whileInView={{ opacity: 1, y: 0 }} 
                      viewport={{ once: true, amount: 0.05 }} 
                      transition={{ duration: reduceMotion ? 0 : 0.5, delay: Math.min(groupIndex * 0.05, 0.15), ease }}
                    >
                      <header className={styles.categoryHeader}>
                        <div>
                          <h3 id={`category-${group.id}`}>{group.label}</h3>
                          <p>{group.description}</p>
                        </div>
                      </header>

                      {viewMode === "list" ? (
                        <div className={styles.productList}>
                          {group.items.map((item, index) => <MenuRow key={item.id} item={item} index={index} onOpen={() => setSelectedItem(item)} />)}
                        </div>
                      ) : (
                        <div className={styles.gridList}>
                          {group.items.map((item, index) => <MenuGridCard key={item.id} item={item} index={index} onOpen={() => setSelectedItem(item)} />)}
                        </div>
                      )}
                    </motion.section>
                  ))}
                </motion.div>
              </>
            ) : (
              <div className={styles.emptyState}>
                <Search size={28} />
                <h3>Aradığınız lezzeti bulamadık</h3>
                <p className={styles.emptyStateText}>
                  Yazım hatası yapmış olabilirsiniz veya aradığınız lezzet şu an menümüzde yer almıyor olabilir. Dilerseniz arama kutusunu temizleyerek tüm yöresel lezzetlerimize göz atabilirsiniz.
                </p>
                <button type="button" onClick={() => { setSearchTerm(""); setActiveCategory("all"); }}>Tüm Menüyü Göster</button>
              </div>
            )}

            <footer className={styles.menuFooter}>
              <p><strong>Alerjen bilgisi:</strong> Özel beslenme ihtiyacınızı sipariş öncesinde ekibimize iletebilirsiniz.</p>
              <span>Güncelleme · {menuLastUpdated}</span>
            </footer>
          </div>
        </section>
        <ProductDialog item={selectedItem} onClose={() => setSelectedItem(null)} />
      </main>
    </>
  );
}
