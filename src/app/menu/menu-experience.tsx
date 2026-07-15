"use client";

import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowLeft, ArrowUp, Check, ChevronRight, Clock3, Search, Sparkles, UtensilsCrossed, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { createPortal } from "react-dom";
import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import styles from "./menu.module.css";
import { menuCategories, menuItems, menuLastUpdated, type MenuFilterId, type MenuItem } from "./menu-data";

const ease = [0.16, 1, 0.3, 1] as const;
const signatureId = "geleneksel-van-kahvaltisi";

function normalize(value: string) {
  return value.toLocaleLowerCase("tr-TR").normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
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
    const focusFrame = requestAnimationFrame(() => closeRef.current?.focus());
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab") return;
      const nodes = Array.from(dialogRef.current?.querySelectorAll<HTMLElement>("button:not([disabled]), a[href]") ?? []);
      if (!nodes.length) return;
      if (event.shiftKey && document.activeElement === nodes[0]) { event.preventDefault(); nodes.at(-1)?.focus(); }
      if (!event.shiftKey && document.activeElement === nodes.at(-1)) { event.preventDefault(); nodes[0].focus(); }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [item, onClose]);

  if (typeof document === "undefined") return null;
  return createPortal(
    <AnimatePresence>
      {item ? <motion.div className={styles.dialogLayer} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <button className={styles.dialogBackdrop} type="button" aria-label="Ürün detayını kapat" onClick={onClose} />
        <motion.section ref={dialogRef} className={styles.dialog} role="dialog" aria-modal="true" aria-labelledby="menu-dialog-title"
          initial={reduceMotion ? false : { opacity: 0, y: 30, scale: .985 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 16 }} transition={{ duration: reduceMotion ? 0 : .48, ease }}>
          <div className={styles.dialogMedia}>
            <Image src={item.image} alt={item.imageAlt} fill sizes="(max-width: 680px) 100vw, 460px" quality={82} />
            <button ref={closeRef} className={styles.dialogClose} type="button" onClick={onClose} aria-label="Kapat"><X /></button>
            <div className={styles.dialogPrice}><strong>{item.price}</strong>{item.priceNote && <span>{item.priceNote}</span>}</div>
          </div>
          <div className={styles.dialogContent}>
            <div className={styles.tagRow}>{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            <h2 id="menu-dialog-title">{item.name}</h2>
            <p>{item.story}</p>
            <ul>{item.details.map((detail) => <li key={detail}><Check size={15} />{detail}</li>)}</ul>
            <button className={styles.dialogDone} type="button" onClick={onClose}>Menüye dön <ChevronRight size={18} /></button>
          </div>
        </motion.section>
      </motion.div> : null}
    </AnimatePresence>, document.body,
  );
}

function MenuLine({ item, onOpen, index }: { item: MenuItem; onOpen: () => void; index: number }) {
  const reduceMotion = useReducedMotion();
  return <motion.li layout={!reduceMotion} initial={reduceMotion ? false : { opacity: .001, x: 12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: .5 }} transition={{ duration: reduceMotion ? 0 : .42, delay: Math.min(index * .045, .14), ease }}>
    <button type="button" onClick={onOpen} aria-label={`${item.name} ayrıntılarını aç`}>
      <span className={styles.lineCopy}>
        <span className={styles.lineTitle}>{item.name}</span>
        <span className={styles.lineDescription}>{item.description}</span>
        {item.priceNote && <span className={styles.lineNote}>{item.priceNote}</span>}
      </span>
      <span className={styles.linePrice}>{item.price}</span>
      <ChevronRight className={styles.lineArrow} size={16} />
    </button>
  </motion.li>;
}

function SignatureDish({ item, onOpen }: { item: MenuItem; onOpen: () => void }) {
  const reduceMotion = useReducedMotion();
  return <motion.button type="button" className={styles.signature} onClick={onOpen} aria-label={`${item.name} ayrıntılarını aç`}
    initial={reduceMotion ? false : { clipPath: "inset(0 12% 0 0)", opacity: .7 }} whileInView={{ clipPath: "inset(0 0% 0 0)", opacity: 1 }} viewport={{ once: true, amount: .25 }} transition={{ duration: reduceMotion ? 0 : .75, ease }}>
    <span className={styles.signaturePhoto}><Image src={item.image} alt={item.imageAlt} fill priority sizes="(max-width: 760px) 100vw, 44vw" quality={82} /></span>
    <span className={styles.signatureShade} />
    <span className={styles.signatureLabel}><Sparkles size={14} /> Sofranın imzası</span>
    <span className={styles.signatureCopy}>
      <span className={styles.signatureName}>{item.name}</span>
      <span className={styles.signatureDescription}>{item.description}</span>
      <span className={styles.signaturePrice}>{item.price}<small>{item.priceNote}</small></span>
    </span>
    <span className={styles.signatureArrow}>İncele <ChevronRight size={17} /></span>
    <motion.span className={styles.memoryPhoto} initial={reduceMotion ? false : { x: 22, y: 16, rotate: 2 }} whileInView={{ x: 0, y: 0, rotate: -2 }} viewport={{ once: true }} transition={{ duration: reduceMotion ? 0 : .7, delay: .16, ease }} aria-hidden="true">
      <Image src="/images/kete-detail.jpg" alt="" fill sizes="150px" quality={82} />
    </motion.span>
  </motion.button>;
}

export function MenuExperience() {
  const reduceMotion = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState<MenuFilterId>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [showTop, setShowTop] = useState(false);
  const deferredSearch = useDeferredValue(searchTerm);
  const menuRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const progress = useSpring(scrollYProgress, { stiffness: 110, damping: 28 });
  const imageY = useTransform(progress, [0, 1], [0, 38]);
  const imageScale = useTransform(progress, [0, 1], [1.02, 1.08]);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 850);
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const visibleItems = useMemo(() => {
    const query = normalize(deferredSearch);
    return menuItems.filter((item) => {
      if (activeCategory !== "all" && item.category !== activeCategory) return false;
      return !query || normalize([item.name, item.description, item.story, ...item.tags, ...item.details].join(" ")).includes(query);
    });
  }, [activeCategory, deferredSearch]);

  const signatureItem = visibleItems.find((item) => item.id === signatureId);
  const visibleGroups = menuCategories.map((category) => ({ ...category, items: visibleItems.filter((item) => item.category === category.id && item.id !== signatureId) })).filter((group) => group.items.length);

  const selectCategory = (category: MenuFilterId) => {
    setActiveCategory(category);
    if (window.scrollY > 320) requestAnimationFrame(() => menuRef.current?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" }));
  };

  return <main id="main-content" className={styles.page}>
    <section ref={heroRef} className={styles.hero} aria-labelledby="menu-title">
      <motion.div className={styles.heroImagePlane} style={{ y: reduceMotion ? 0 : imageY, scale: reduceMotion ? 1.02 : imageScale }}><Image src="/images/hero-parallax/overhead-feast.webp" alt="Bakır sahanlarla kurulmuş Van kahvaltısı sofrası" fill priority loading="eager" sizes="100vw" quality={82} /></motion.div>
      <div className={styles.heroShade} />
      <motion.div className={styles.heroCopy} initial={reduceMotion ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : .72, ease }}>
        <div className={styles.heroTopline}><Link href="/"><ArrowLeft size={16} /> Ana sayfa</Link><span>1978’den beri · Beyoğlu</span></div>
        <h1 id="menu-title">Sofraya <em>buyurun.</em></h1>
        <p>Van’dan gelen tatlar, bakır sahanlar ve demini hiç aceleye getirmeyen çay.</p>
        <div className={styles.heroMeta}><span><Clock3 size={15} /> 08:00–18:00</span><span><UtensilsCrossed size={15} /> {menuItems.length} lezzet</span></div>
      </motion.div>
      <div className={styles.heroStamp} aria-hidden="true"><span>Van</span><small>sofrası · 1978</small></div>
    </section>

    <section className={styles.menuArea} aria-label="Dijital menü">
      <div className={styles.stickyTools}><div className={styles.toolInner}>
        <nav className={styles.categories} aria-label="Menü kategorileri">
          <button type="button" className={activeCategory === "all" ? styles.activeCategory : ""} aria-pressed={activeCategory === "all"} onClick={() => selectCategory("all")}>Tümü <span>{menuItems.length}</span></button>
          {menuCategories.map((category) => <button key={category.id} type="button" className={activeCategory === category.id ? styles.activeCategory : ""} aria-pressed={activeCategory === category.id} onClick={() => selectCategory(category.id)}>{category.shortLabel} <span>{menuItems.filter((item) => item.category === category.id).length}</span></button>)}
        </nav>
        <div className={styles.searchWrap}><Search size={17} /><label htmlFor="menu-search" className={styles.srOnly}>Menüde ara</label><input id="menu-search" type="search" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Menüde ara" autoComplete="off" />{searchTerm && <button type="button" onClick={() => setSearchTerm("")} aria-label="Aramayı temizle"><X size={15} /></button>}</div>
      </div></div>

      <div ref={menuRef} className={styles.results}>
        <header className={styles.menuHeading}><div><span>Bugünün menüsü</span><h2>{activeCategory === "all" ? <>Sofranın tamamı.<em> Tek bakışta.</em></> : menuCategories.find((category) => category.id === activeCategory)?.label}</h2></div><p role="status" aria-live="polite"><strong>{visibleItems.length}</strong> lezzet</p></header>

        {visibleItems.length ? <div className={`${styles.menuComposition} ${signatureItem ? styles.hasSignature : ""}`}>
          {signatureItem && <SignatureDish item={signatureItem} onOpen={() => setSelectedItem(signatureItem)} />}
          <div className={styles.menuLedger}>
            <AnimatePresence initial={false} mode="popLayout">
              {visibleGroups.map((group, groupIndex) => <motion.section key={group.id} className={styles.categorySection} layout={!reduceMotion} aria-labelledby={`category-${group.id}`} initial={reduceMotion ? false : { opacity: .001, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : .48, delay: groupIndex * .05, ease }}>
                <header className={styles.categoryHeader}><div><h3 id={`category-${group.id}`}>{group.label}</h3><p>{group.description}</p></div><span>{group.items.length} çeşit</span></header>
                <ul>{group.items.map((item, index) => <MenuLine key={item.id} item={item} index={index} onOpen={() => setSelectedItem(item)} />)}</ul>
              </motion.section>)}
            </AnimatePresence>
          </div>
        </div> : <div className={styles.emptyState} role="status"><Search size={24} /><h3>Aradığınız lezzeti bulamadık.</h3><p>Ürün adını değiştirin veya tüm menüye dönün.</p><button type="button" onClick={() => { setSearchTerm(""); setActiveCategory("all"); }}>Tüm menüyü göster</button></div>}

        <footer className={styles.menuNote}><p><strong>İyi bilinsin:</strong> Ürün uygunluğu dönemsel olarak değişebilir. Alerjen veya özel beslenme ihtiyacınızı ekibimize söyleyin.</p><span>Fiyatlarımıza KDV dahildir · {menuLastUpdated}</span></footer>
      </div>
    </section>

    <AnimatePresence>{showTop && <motion.button className={styles.toTop} type="button" aria-label="Menünün başına dön" onClick={() => window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" })} initial={{ opacity: 0, scale: .85 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: .9 }} transition={{ duration: .28, ease }}><ArrowUp size={18} /></motion.button>}</AnimatePresence>
    <ProductDialog item={selectedItem} onClose={() => setSelectedItem(null)} />
  </main>;
}
