"use client";

import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, Check, ChevronRight, Clock3, Search, Sparkles, UtensilsCrossed, X } from "lucide-react";
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

function MenuCard({ item, index, onOpen }: { item: MenuItem; index: number; onOpen: () => void }) {
  const cardRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: cardRef, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], [-9, 9]);

  return (
    <motion.article
      ref={cardRef}
      className={styles.productCard}
      initial={reduceMotion ? false : { opacity: 0, y: 24, clipPath: "inset(0 0 8% 0)" }}
      whileInView={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }}
      viewport={{ once: true, amount: 0.18 }}
      whileHover={reduceMotion ? undefined : { y: -5 }}
      whileTap={reduceMotion ? undefined : { scale: 0.985 }}
      transition={{ duration: reduceMotion ? 0 : 0.52, delay: Math.min(index * 0.06, 0.16), ease }}
    >
      <button type="button" onClick={onOpen} aria-label={`${item.name} detayını aç`}>
        <span className={styles.cardMedia}>
          <motion.span className={styles.cardImagePlane} style={{ y: reduceMotion ? 0 : imageY }}>
            <Image src={item.image} alt={item.imageAlt} fill sizes="(max-width: 700px) 78vw, (max-width: 1000px) 40vw, 280px" quality={82} />
          </motion.span>
          <span className={styles.cardNumber}>{String(index + 1).padStart(2, "0")}</span>
          {item.tags.includes("Öne çıkan") ? <span className={styles.featuredTag}><Sparkles size={12} /> Öne çıkan</span> : null}
        </span>
        <span className={styles.cardBody}>
          <span className={styles.cardTop}><span className={styles.cardName}>{item.name}</span><span className={styles.cardPrice}>{item.price}</span></span>
          <span className={styles.cardDescription}>{item.description}</span>
          <span className={styles.cardFoot}>{item.priceNote ?? "Detayı incele"}<ChevronRight size={17} /></span>
        </span>
      </button>
    </motion.article>
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
        <motion.div className={styles.dialogLayer} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <button className={styles.dialogBackdrop} type="button" onClick={onClose} aria-label="Ürün detayını kapat" />
          <motion.section ref={dialogRef} className={styles.dialog} role="dialog" aria-modal="true" aria-labelledby="product-title"
            initial={reduceMotion ? false : { opacity: 0, y: 42, scale: 0.975 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 24 }} transition={{ duration: reduceMotion ? 0 : 0.5, ease }}>
            <div className={styles.dialogMedia}>
              <Image src={item.image} alt={item.imageAlt} fill sizes="(max-width: 700px) 100vw, 480px" quality={82} />
              <button ref={closeRef} type="button" className={styles.dialogClose} onClick={onClose} aria-label="Kapat"><X /></button>
              <div className={styles.dialogPrice}><strong>{item.price}</strong>{item.priceNote ? <span>{item.priceNote}</span> : null}</div>
            </div>
            <div className={styles.dialogContent}>
              <div className={styles.dialogTags}>{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              <h2 id="product-title">{item.name}</h2>
              <p>{item.story}</p>
              <ul>{item.details.map((detail) => <li key={detail}><Check size={15} />{detail}</li>)}</ul>
              <button type="button" className={styles.dialogDone} onClick={onClose}>Menüye dön <ChevronRight size={18} /></button>
            </div>
          </motion.section>
        </motion.div>
      ) : null}
    </AnimatePresence>, document.body,
  );
}

export function MenuExperience() {
  const reduceMotion = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState<MenuFilterId>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const deferredSearch = useDeferredValue(searchTerm);
  const contentRef = useRef<HTMLDivElement>(null);

  const visibleItems = useMemo(() => {
    const query = normalize(deferredSearch);
    return menuItems.filter((item) => {
      if (activeCategory !== "all" && item.category !== activeCategory) return false;
      return !query || normalize([item.name, item.description, item.story, ...item.tags, ...item.details].join(" ")).includes(query);
    });
  }, [activeCategory, deferredSearch]);

  const groups = menuCategories.map((category) => ({ ...category, items: visibleItems.filter((item) => item.category === category.id) })).filter((group) => group.items.length);

  const selectCategory = (category: MenuFilterId) => {
    setActiveCategory(category);
    if (window.scrollY > 300) requestAnimationFrame(() => contentRef.current?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" }));
  };

  return (
    <main id="main-content" className={styles.page}>
      <section className={styles.hero} aria-labelledby="menu-title">
        <div className={styles.heroWash} aria-hidden="true" />
        <motion.div className={`${styles.heroPhoto} ${styles.heroPhotoMain}`} initial={reduceMotion ? false : { x: 60, clipPath: "inset(0 0 0 35%)" }} animate={{ x: 0, clipPath: "inset(0 0 0 0%)" }} transition={{ duration: reduceMotion ? 0 : 0.85, ease }}><Image src="/images/breakfast-spread.jpg" alt="Van kahvaltısı sofrası" fill priority loading="eager" sizes="(max-width: 700px) 100vw, 48vw" quality={82} /></motion.div>
        <motion.div className={`${styles.heroPhoto} ${styles.heroPhotoSmall}`} initial={reduceMotion ? false : { opacity: 0, y: 35, rotate: 3 }} animate={{ opacity: 1, y: 0, rotate: -2 }} transition={{ duration: reduceMotion ? 0 : 0.72, delay: 0.18, ease }}><Image src="/images/sucuk-egg.jpg" alt="Bakır sahanda sucuklu yumurta" fill priority sizes="220px" quality={82} /></motion.div>
        <motion.span className={styles.heroOrb} animate={reduceMotion ? undefined : { scale: [1, 1.08, 1], opacity: [0.45, 0.7, 0.45] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} aria-hidden="true" />
        <motion.div className={styles.heroCopy} initial={reduceMotion ? false : { opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : 0.68, delay: 0.08, ease }}>
          <div className={styles.breadcrumb}><Link href="/"><ArrowLeft size={16} /> Ana sayfa</Link><span>1978 · Beyoğlu</span></div>
          <span className={styles.heroKicker}>Günlük hazırlanan Van sofrası</span>
          <h1 id="menu-title">Menü</h1>
          <p>Her tabağı görün, fiyatı bilin, sofranızı kolayca seçin.</p>
          <div className={styles.heroMeta}><span><Clock3 size={15} />08:00–18:00</span><span><UtensilsCrossed size={15} />{menuItems.length} lezzet</span></div>
        </motion.div>
      </section>

      <section className={styles.menuSection} aria-label="Fotoğraflı kahvaltı menüsü">
        <div className={styles.menuTools}><div className={styles.toolsInner}>
          <nav className={styles.categoryNav} aria-label="Menü kategorileri">
            <button type="button" className={activeCategory === "all" ? styles.activeCategory : ""} aria-pressed={activeCategory === "all"} onClick={() => selectCategory("all")}>
              {activeCategory === "all" ? <motion.span layoutId="menu-active" className={styles.activePill} transition={{ duration: 0.38, ease }} /> : null}<b>Tümü</b><small>{menuItems.length}</small>
            </button>
            {menuCategories.map((category) => <button key={category.id} type="button" className={activeCategory === category.id ? styles.activeCategory : ""} aria-pressed={activeCategory === category.id} onClick={() => selectCategory(category.id)}>
              {activeCategory === category.id ? <motion.span layoutId="menu-active" className={styles.activePill} transition={{ duration: 0.38, ease }} /> : null}<b>{category.shortLabel}</b><small>{menuItems.filter((item) => item.category === category.id).length}</small>
            </button>)}
          </nav>
          <div className={styles.searchBox}><Search size={18} /><label htmlFor="menu-search" className={styles.srOnly}>Menüde ara</label><input id="menu-search" type="search" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Menüde ara" />{searchTerm ? <button type="button" onClick={() => setSearchTerm("")} aria-label="Aramayı temizle"><X size={16} /></button> : null}</div>
        </div></div>

        <div ref={contentRef} className={styles.menuContent}>
          <header className={styles.menuIntro}><div><span>Fotoğraflı menü</span><h2>{activeCategory === "all" ? "Sofrayı keşfedin" : menuCategories.find((category) => category.id === activeCategory)?.label}</h2></div><p role="status" aria-live="polite"><strong>{visibleItems.length}</strong> lezzet</p></header>

          {visibleItems.length ? <motion.div className={`${styles.categoryGallery} ${activeCategory !== "all" ? styles.filteredGallery : ""}`} layout={!reduceMotion}>
            {groups.map((group, groupIndex) => <motion.section key={group.id} className={styles.category} layout={!reduceMotion} aria-labelledby={`category-${group.id}`} initial={reduceMotion ? false : { opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.08 }} transition={{ duration: reduceMotion ? 0 : 0.58, delay: groupIndex * 0.06, ease }}>
              <header className={styles.categoryHeader}><div><h3 id={`category-${group.id}`}>{group.label}</h3><p>{group.description}</p></div><span className={styles.swipeHint}>Kaydır <ChevronRight size={15} /></span></header>
              <div className={styles.productRail}>{group.items.map((item, index) => <MenuCard key={item.id} item={item} index={index} onOpen={() => setSelectedItem(item)} />)}</div>
            </motion.section>)}
          </motion.div> : <div className={styles.emptyState}><Search size={24} /><h3>Aradığınız lezzeti bulamadık.</h3><button type="button" onClick={() => { setSearchTerm(""); setActiveCategory("all"); }}>Tüm menüyü göster</button></div>}

          <footer className={styles.menuFooter}><p><strong>Alerjen bilgisi:</strong> Özel beslenme ihtiyacınızı sipariş öncesinde ekibimize iletebilirsiniz.</p><span>Güncelleme · {menuLastUpdated}</span></footer>
        </div>
      </section>
      <ProductDialog item={selectedItem} onClose={() => setSelectedItem(null)} />
    </main>
  );
}
