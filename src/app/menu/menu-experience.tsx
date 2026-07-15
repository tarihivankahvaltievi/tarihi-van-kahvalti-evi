"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, Check, ChevronDown, Clock3, Search, UtensilsCrossed, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useDeferredValue, useMemo, useRef, useState } from "react";
import styles from "./menu.module.css";
import { menuCategories, menuItems, menuLastUpdated, type MenuFilterId, type MenuItem } from "./menu-data";

const ease = [0.16, 1, 0.3, 1] as const;

function normalize(value: string) {
  return value.toLocaleLowerCase("tr-TR").normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
}

function MenuRow({ item, expanded, onToggle }: { item: MenuItem; expanded: boolean; onToggle: () => void }) {
  const reduceMotion = useReducedMotion();

  return (
    <li className={styles.menuItem} id={item.id}>
      <button type="button" className={styles.itemButton} onClick={onToggle} aria-expanded={expanded} aria-controls={`details-${item.id}`}>
        <span className={styles.itemSummary}>
          <span className={styles.itemName}>{item.name}</span>
          <span className={styles.priceLeader} aria-hidden="true" />
          <span className={styles.itemPrice}>{item.price}</span>
          <ChevronDown className={styles.itemChevron} size={15} aria-hidden="true" />
        </span>
        <span className={styles.itemDescription}>{item.description}</span>
        {item.priceNote ? <span className={styles.itemNote}>{item.priceNote}</span> : null}
      </button>

      <AnimatePresence initial={false}>
        {expanded ? (
          <motion.div
            id={`details-${item.id}`}
            className={styles.itemDetails}
            initial={reduceMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.36, ease }}
          >
            <div className={styles.detailsInner}>
              <p>{item.story}</p>
              <ul>{item.details.map((detail) => <li key={detail}><Check size={13} />{detail}</li>)}</ul>
              <div className={styles.tags}>{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </li>
  );
}

export function MenuExperience() {
  const reduceMotion = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState<MenuFilterId>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const deferredSearch = useDeferredValue(searchTerm);
  const contentRef = useRef<HTMLDivElement>(null);

  const visibleItems = useMemo(() => {
    const query = normalize(deferredSearch);
    return menuItems.filter((item) => {
      if (activeCategory !== "all" && item.category !== activeCategory) return false;
      if (!query) return true;
      return normalize([item.name, item.description, item.story, ...item.tags, ...item.details].join(" ")).includes(query);
    });
  }, [activeCategory, deferredSearch]);

  const groups = menuCategories
    .map((category) => ({ ...category, items: visibleItems.filter((item) => item.category === category.id) }))
    .filter((category) => category.items.length);

  const selectCategory = (category: MenuFilterId) => {
    setActiveCategory(category);
    setExpandedItem(null);
    if (window.scrollY > 260) requestAnimationFrame(() => contentRef.current?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" }));
  };

  return (
    <main id="main-content" className={styles.page}>
      <section className={styles.masthead} aria-labelledby="menu-title">
        <div className={styles.mastheadPhoto}>
          <Image src="/images/breakfast-spread.jpg" alt="Tarihi Van Kahvaltı Evi kahvaltı sofrası" fill priority loading="eager" sizes="(max-width: 700px) 100vw, 55vw" quality={82} />
        </div>
        <div className={styles.mastheadShade} aria-hidden="true" />
        <motion.div className={styles.mastheadCopy} initial={reduceMotion ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : 0.58, ease }}>
          <div className={styles.breadcrumb}><Link href="/"><ArrowLeft size={15} /> Ana sayfa</Link><span>1978 · Beyoğlu</span></div>
          <div className={styles.titleLine}>
            <div><span className={styles.kicker}>Tarihi Van</span><h1 id="menu-title">Kahvaltı Menüsü</h1></div>
            <div className={styles.serviceMeta}><span><Clock3 size={14} />08:00–18:00</span><span><UtensilsCrossed size={14} />{menuItems.length} lezzet</span></div>
          </div>
        </motion.div>
      </section>

      <section className={styles.menuSection} aria-label="Menü ve fiyatlar">
        <div className={styles.menuTools}>
          <div className={styles.toolsInner}>
            <nav className={styles.categoryNav} aria-label="Menü kategorileri">
              <button type="button" className={activeCategory === "all" ? styles.active : ""} aria-pressed={activeCategory === "all"} onClick={() => selectCategory("all")}>Tümü <span>{menuItems.length}</span></button>
              {menuCategories.map((category) => (
                <button key={category.id} type="button" className={activeCategory === category.id ? styles.active : ""} aria-pressed={activeCategory === category.id} onClick={() => selectCategory(category.id)}>
                  {category.shortLabel}<span>{menuItems.filter((item) => item.category === category.id).length}</span>
                </button>
              ))}
            </nav>

            <div className={styles.searchBox}>
              <Search size={16} aria-hidden="true" />
              <label htmlFor="menu-search" className={styles.srOnly}>Menüde ara</label>
              <input id="menu-search" type="search" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Menüde ara" autoComplete="off" />
              {searchTerm ? <button type="button" onClick={() => setSearchTerm("")} aria-label="Aramayı temizle"><X size={15} /></button> : null}
            </div>
          </div>
        </div>

        <div ref={contentRef} className={styles.menuContent}>
          <header className={styles.contentHeader}>
            <div><span>Fiyatlarımıza KDV dahildir</span><h2>{activeCategory === "all" ? "Sofradaki tüm lezzetler" : menuCategories.find((category) => category.id === activeCategory)?.label}</h2></div>
            <p role="status" aria-live="polite"><strong>{visibleItems.length}</strong> ürün</p>
          </header>

          {visibleItems.length ? (
            <motion.div className={`${styles.menuGrid} ${activeCategory !== "all" ? styles.filteredGrid : ""}`} layout={!reduceMotion}>
              {groups.map((group, groupIndex) => (
                <motion.section key={group.id} className={styles.category} aria-labelledby={`category-${group.id}`} layout={!reduceMotion}
                  initial={reduceMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : 0.42, delay: groupIndex * 0.04, ease }}>
                  <header className={styles.categoryHeader}>
                    <div><h3 id={`category-${group.id}`}>{group.label}</h3><p>{group.description}</p></div>
                    <span>{group.items.length}</span>
                  </header>
                  <ul className={styles.itemList}>
                    {group.items.map((item) => <MenuRow key={item.id} item={item} expanded={expandedItem === item.id} onToggle={() => setExpandedItem((current) => current === item.id ? null : item.id)} />)}
                  </ul>
                </motion.section>
              ))}
            </motion.div>
          ) : (
            <div className={styles.emptyState} role="status"><Search size={22} /><h3>Bu isimde bir lezzet bulamadık.</h3><button type="button" onClick={() => { setSearchTerm(""); setActiveCategory("all"); }}>Tüm menüyü göster</button></div>
          )}

          <footer className={styles.menuFooter}>
            <p><strong>Alerjen bilgisi:</strong> Özel beslenme ihtiyacınızı sipariş öncesinde ekibimize iletebilirsiniz.</p>
            <span>Güncelleme · {menuLastUpdated}</span>
          </footer>
        </div>
      </section>
    </main>
  );
}
