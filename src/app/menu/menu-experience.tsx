"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import styles from "./menu.module.css";
import type { MenuCategory, MenuItem } from "./menu-data";
import { localizeMenuDate, type MenuLocale } from "./menu-localization";
import { getMenuOrderNote } from "./menu-rules";
import { getOrderingQuestions } from "./ordering-questions";
import { OrderingGuide } from "../components/ordering-guide";
import { trackEvent } from "../analytics";

export type HamourChapter = {
  id: string;
  label: { tr: string; en: string };
  iconWhite: string;
  iconDark: string;
  sections: {
    title: { tr: string; en: string };
    categories: string[];
  }[];
  heroImageFallback: string;
};

const HAMOUR_CHAPTERS: HamourChapter[] = [
  {
    id: "serpme-kahvalti",
    label: { tr: "Serpme Kahvaltı", en: "Serpme Breakfast" },
    iconWhite: "/hamour/mi_tab-input-4-img-1.png",
    iconDark: "/hamour/mi_tab-input-4-img-2_1.png",
    sections: [
      {
        title: { tr: "KAHVALTI MENÜLERİ", en: "BREAKFAST MENUS" },
        categories: ["kahvalti-menuleri"],
      },
      {
        title: { tr: "GÖZLEMELER & PİŞİ", en: "FLATBREADS & PİŞİ" },
        categories: ["gozlemeler"],
      },
    ],
    heroImageFallback: "/images/menu-products/serpme-fix-menu.webp",
  },
  {
    id: "sahandan-sicaklar",
    label: { tr: "Sahandan Sıcaklar", en: "Hot Pan Dishes" },
    iconWhite: "/hamour/mi_tab-input-3-img-1.png",
    iconDark: "/hamour/mi_tab-input-3-img-2.png",
    sections: [
      {
        title: { tr: "MENEMENLER", en: "MENEMEN SPECIALTIES" },
        categories: ["menemenler"],
      },
      {
        title: { tr: "OMLETLER", en: "OMELETTES" },
        categories: ["omletler"],
      },
      {
        title: { tr: "SAHANDA YUMURTALAR", en: "FRIED EGGS" },
        categories: ["yumurtalar"],
      },
      {
        title: { tr: "SAHAN LEZZETLERİ & KUYMAK", en: "PAN SPECIALTIES & KUYMAK" },
        categories: ["sahanlar"],
      },
    ],
    heroImageFallback: "/images/menu-products/sucuklu-menemen.webp",
  },
  {
    id: "yoresel-tatlar",
    label: { tr: "Yöresel Lezzetler", en: "Heritage Flavors" },
    iconWhite: "/hamour/mi_tab-input-1-img-1.png",
    iconDark: "/hamour/mi_tab-input-1-img-2.png",
    sections: [
      {
        title: { tr: "VAN MİRASI LEZZETLER", en: "VAN HERITAGE DELIGHTS" },
        categories: ["yoresel-tatlar"],
      },
    ],
    heroImageFallback: "/images/menu-products/tereyagli-cevizli-murtuga.webp",
  },
  {
    id: "peynirler-soguklar",
    label: { tr: "Peynir & Soğuklar", en: "Cheeses & Cold" },
    iconWhite: "/hamour/mi_patisseria-beyaz_1.png",
    iconDark: "/hamour/mi_patisseria.png",
    sections: [
      {
        title: { tr: "GELENEKSEL VAN PEYNİRLERİ", en: "TRADITIONAL VAN CHEESES" },
        categories: ["peynirler"],
      },
      {
        title: { tr: "ZEYTİNLER & SÖĞÜŞ", en: "OLIVES & FRESH SALAD" },
        categories: ["zeytinler"],
      },
    ],
    heroImageFallback: "/images/menu-products/otlu-peynir.webp",
  },
  {
    id: "receller-ballar",
    label: { tr: "Reçeller & Ballar", en: "Jams & Honeys" },
    iconWhite: "/hamour/mi_pasta-beyaz.png",
    iconDark: "/hamour/mi_pasta.png",
    sections: [
      {
        title: { tr: "BALLAR & KAHVALTILIK TATLILAR", en: "HONEYS & BREAKFAST SWEETS" },
        categories: ["ballar"],
      },
      {
        title: { tr: "TARİHİ ANNE REÇELLERİ", en: "HISTORICAL MOTHER'S JAMS" },
        categories: ["receller"],
      },
    ],
    heroImageFallback: "/images/menu-products/bal-kaymak.webp",
  },
  {
    id: "icecekler",
    label: { tr: "Çay, Kahve & İçecek", en: "Drinks & Coffee" },
    iconWhite: "/hamour/mi_tab-input-2-img-1.png",
    iconDark: "/hamour/mi_tab-input-2-img-2.png",
    sections: [
      {
        title: { tr: "SICAK ÇAYLAR & İÇECEKLER", en: "HOT TEAS & BEVERAGES" },
        categories: ["sicak-icecekler"],
      },
      {
        title: { tr: "TÜRK KAHVESİ & KAHVELER", en: "TURKISH COFFEE & SPECIALTY" },
        categories: ["sicak-kahveler"],
      },
      {
        title: { tr: "DOĞAL BİTKİ ÇAYLARI", en: "NATURAL HERBAL TEAS" },
        categories: ["bitki-caylari"],
      },
      {
        title: { tr: "SOĞUK KAHVELER", en: "ICED COFFEES" },
        categories: ["soguk-kahveler"],
      },
      {
        title: { tr: "SOĞUK VE TAZE İÇECEKLER", en: "COLD & FRESH BEVERAGES" },
        categories: ["soft-icecekler", "soguk-icecekler"],
      },
      {
        title: { tr: "SMOOTHIE & MILKSHAKE", en: "SMOOTHIES & MILKSHAKES" },
        categories: ["milkshake-frozen-smoothie"],
      },
    ],
    heroImageFallback: "/images/menu-products/turk-kahvesi.webp",
  },
];

const categoryFallbacks: Record<string, string> = {
  "kahvalti-menuleri": "/images/menu-products/serpme-fix-menu.webp",
  gozlemeler: "/images/menu-products/gozleme.webp",
  peynirler: "/images/menu-products/otlu-peynir.webp",
  zeytinler: "/images/menu-products/karisik-zeytin.webp",
  "yoresel-tatlar": "/images/menu-products/tereyagli-cevizli-murtuga.webp",
  receller: "/images/menu-products/ceviz-receli.webp",
  ballar: "/images/menu-products/bal-kaymak.webp",
  omletler: "/images/menu-products/et-karisik-omlet.webp",
  menemenler: "/images/menu-products/sucuklu-menemen.webp",
  yumurtalar: "/images/menu-products/sahanda-sucuk.webp",
  sahanlar: "/images/menu-products/sahanda-kavurma.webp",
  "sicak-icecekler": "/images/tea-service.webp",
  "bitki-caylari": "/images/tea-service.webp",
  "soft-icecekler": "/images/menu-products/milkshake.webp",
  "soguk-icecekler": "/images/menu-products/milkshake.webp",
  "sicak-kahveler": "/images/menu-products/turk-kahvesi.webp",
  "soguk-kahveler": "/images/menu-products/ice-latte.webp",
  "milkshake-frozen-smoothie": "/images/menu-products/milkshake.webp",
};

export function getItemImage(item: MenuItem, fallback: string): string {
  if (item.image && item.image.trim() !== "") {
    return item.image;
  }
  return categoryFallbacks[item.category] || fallback;
}

interface MenuExperienceProps {
  initialItems: MenuItem[];
  initialCategories: MenuCategory[];
  lastUpdated: string;
  locale?: MenuLocale;
  comparison?: ReactNode;
}

export function MenuExperience({
  initialItems,
  initialCategories,
  lastUpdated,
  locale = "tr",
  comparison,
}: MenuExperienceProps) {
  const isEn = locale === "en";
  // Every category and item is rendered once. Navigation scrolls to existing
  // HTML rather than mounting products only after a category click.
  const orderedCategories = useMemo(() => {
    const chapterOrder = HAMOUR_CHAPTERS.flatMap((chapter) =>
      chapter.sections.flatMap((section) => section.categories),
    );
    const order = (id: string) => {
      const index = chapterOrder.indexOf(id);
      return index === -1 ? chapterOrder.length : index;
    };
    return [...initialCategories].sort((a, b) => order(a.id) - order(b.id));
  }, [initialCategories]);

  // Active Chapter
  const [activeChapterId, setActiveChapterId] = useState<string>("serpme-kahvalti");
  const activeChapter = useMemo(() => {
    return (
      HAMOUR_CHAPTERS.find((ch) => ch.id === activeChapterId) || HAMOUR_CHAPTERS[0]
    );
  }, [activeChapterId]);

  // Chapter Items
  const chapterItems = useMemo(() => {
    const validCatIds = new Set(
      activeChapter.sections.flatMap((sec) => sec.categories),
    );
    return initialItems.filter((it) => validCatIds.has(it.category));
  }, [activeChapter, initialItems]);

  // Active item for desktop preview
  const [activeItemId, setActiveItemId] = useState<string>("");

  useEffect(() => {
    const revealHashTarget = () => {
      let targetId: string;
      try {
        targetId = decodeURIComponent(window.location.hash.slice(1));
      } catch {
        return; // Ignore malformed fragments without breaking menu interaction.
      }
      if (!targetId) return;

      const targetItem = initialItems.find((item) => item.id === targetId);
      const targetCategory = initialCategories.find((category) => category.id === targetId);
      const categoryId = targetItem?.category ?? targetCategory?.id;
      if (!categoryId) return;
      const targetChapter = HAMOUR_CHAPTERS.find((chapter) =>
        chapter.sections.some((section) => section.categories.includes(categoryId)),
      );
      if (targetChapter) setActiveChapterId(targetChapter.id);
      setActiveItemId(targetItem?.id ?? initialItems.find((item) => item.category === categoryId)?.id ?? "");
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          document.getElementById(targetId)?.scrollIntoView({ block: "start" });
        });
      });
    };

    const frame = window.requestAnimationFrame(revealHashTarget);
    window.addEventListener("hashchange", revealHashTarget);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", revealHashTarget);
    };
  }, [initialItems, initialCategories]);

  const activeItem = useMemo(() => {
    return initialItems.find((it) => it.id === activeItemId) || chapterItems[0] || null;
  }, [chapterItems, activeItemId, initialItems]);

  // Modal Item (for mobile click & desktop detail view)
  const [modalItem, setModalItem] = useState<MenuItem | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const modalTriggerRef = useRef<HTMLElement | null>(null);

  const handleOpenModal = useCallback((item: MenuItem) => {
    modalTriggerRef.current = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;
    setModalItem(item);
    trackEvent("menu_item_view", { locale, item_id: item.id, surface: "menu_details" });
  }, [locale]);

  const handleCloseModal = useCallback(() => {
    setModalItem(null);
  }, []);

  useEffect(() => {
    if (!modalItem) return;

    const previousOverflow = document.body.style.overflow;
    const focusFrame = window.requestAnimationFrame(() => closeButtonRef.current?.focus());
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") handleCloseModal();
      if (event.key !== "Tab") return;
      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], input:not([disabled]), [tabindex="0"]');
      if (!focusable?.length) return;
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

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      modalTriggerRef.current?.focus();
    };
  }, [handleCloseModal, modalItem]);

  const activePreviewImage = activeItem
    ? getItemImage(activeItem, activeChapter.heroImageFallback)
    : activeChapter.heroImageFallback;

  return (
    <main id="main-content" tabIndex={-1} className={styles.menuContainer} lang={isEn ? "en" : "tr"}>
      {/* ====================================================================
          1. BANNER SECTION (.banner)
          ==================================================================== */}
      <section className={styles.banner}>
        <div className={styles.bannerImg}>
          <Image
            src="/images/breakfast-spread.webp"
            alt={isEn ? "Tarihi Van Kahvaltı Evi Menu" : "Tarihi Van Kahvaltı Evi Menü"}
            fill
            loading="eager"
            fetchPriority="high"
            sizes="100vw"
            quality={75}
          />
        </div>

        <div className={styles.bannerText}>
          <h1 className={styles.bannerTitle}>
            {isEn ? "Menu & Prices" : "Menü ve Fiyatlar"}
          </h1>
        </div>

      </section>

      {/* ====================================================================
          2. SECTION-3: TABS & MENU ITEMS (.section-3)
          ==================================================================== */}
      <section className={styles.section3}>
        {/* Arch Vector Emblem */}
        <div className={styles.logoVectorImg} aria-hidden="true">
          <Image
            src="/hamour/main-logo-vector-2.png"
            alt="Vector Logo"
            width={80}
            height={55}
          />
        </div>

        <div className={styles.container}>
          {comparison}
          {/* CATEGORY TABS (.nav-pills) */}
          <p className={styles.menuIntro}>
            {isEn ? "All dishes and prices are listed below in Turkish lira (TRY). Choose a category to jump to it." : "Tüm ürünler ve Türk lirası (TL) fiyatları aşağıda listelenir. İlgili bölüme gitmek için bir kategori seçin."}
          </p>
          <nav aria-label={isEn ? "Menu categories" : "Menü kategorileri"}>
          <ul className={styles.navPills}>
            {HAMOUR_CHAPTERS.map((chapter) => {
              const isActive = chapter.id === activeChapterId;
              const categoryIds = chapter.sections.flatMap((section) => section.categories);
              const firstCategory = orderedCategories.find((category) => categoryIds.includes(category.id));
              if (!firstCategory) return null;
              return (
                <li key={chapter.id} className={styles.navItem}>
                  <a
                    href={`#${firstCategory.id}`}
                    aria-current={isActive ? "location" : undefined}
                    className={`${styles.navLink} ${isActive ? styles.navLinkActive : ""}`}
                    onClick={() => {
                      setActiveChapterId(chapter.id);
                      setActiveItemId(initialItems.find((item) => categoryIds.includes(item.category))?.id ?? "");
                      trackEvent("menu_category_select", { locale, category_id: chapter.id, surface: "menu_categories" });
                    }}
                  >
                    <span className={styles.navLinkIcon} aria-hidden="true">
                      <Image
                        src={isActive ? chapter.iconWhite : chapter.iconDark}
                        alt=""
                        width={64}
                        height={52}
                      />
                    </span>
                    <span className={styles.navLinkText}>
                      {isEn ? chapter.label.en : chapter.label.tr}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
          </nav>

          {/* MENU LIST ARTICLE (.menu-list-article) */}
          <div
            className={styles.menuListArticle}
            aria-label={isEn ? "Complete menu" : "Tam menü"}
          >
            {/* Desktop Left Image Preview (.menu-img-animate) */}
            <div className={styles.menuImgAnimate}>
              <div className={styles.menuImg}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeItem?.id || activeChapter.id}
                    initial={{ opacity: 0.6, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0.7 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    style={{ width: "100%", height: "100%", position: "relative" }}
                  >
                    <Image
                      src={activePreviewImage}
                      alt={activeItem?.name || "Menu item"}
                      fill
                      sizes="50vw"
                      quality={84}
                      style={{ objectFit: "cover" }}
                    />
                  </motion.div>
                </AnimatePresence>

                {activeItem && (
                  <div className={styles.menuImgBadge}>
                    <div>
                      <div className={styles.menuImgBadgeTitle}>
                        {isEn && activeItem.translations?.en?.name
                          ? activeItem.translations.en.name
                          : activeItem.name}
                      </div>
                    </div>
                    <div className={styles.menuImgBadgePrice}>
                      {activeItem.price}
                      {activeItem.priceNote && <small className={styles.priceNote}>{activeItem.priceNote}</small>}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Scrollable Menu Article (.menu-article) */}
            <div className={styles.menuArticle}>
              <div className={styles.menuArticleScroll}>
                {orderedCategories.map((category) => {
                  const itemsInSection = initialItems.filter((item) => item.category === category.id);

                  if (itemsInSection.length === 0) return null;

                  return (
                    <section key={category.id} id={category.id} className={styles.subSection} aria-labelledby={`category-title-${category.id}`}>
                      <h2 id={`category-title-${category.id}`} className={styles.subCategoryTitle}>{category.label}</h2>
                      <p className={styles.categoryDescription}>{category.description}</p>

                      {itemsInSection.map((item) => {
                        const isCurrentActive = activeItem?.id === item.id;
                        const itemImg = getItemImage(
                          item,
                          activeChapter.heroImageFallback,
                        );
                        const displayName =
                          isEn && item.translations?.en?.name
                            ? item.translations.en.name
                            : item.name;
                        const displayDesc =
                          isEn && item.translations?.en?.description
                            ? item.translations.en.description
                            : item.description;

                        return (
                          <article
                            data-menu-item="true"
                            key={item.id}
                            id={item.id}
                            className={`${styles.menuItem} ${isCurrentActive ? styles.menuItemActive : ""}`}
                            onMouseEnter={() => setActiveItemId(item.id)}

                          >
                            {/* Mobile Thumbnail */}
                            <div className={styles.menuItemThumb}>
                              <Image
                                src={itemImg}
                                alt={displayName}
                                width={72}
                                height={72}
                              />
                            </div>

                            <div className={styles.menuItemContent}>
                              <div className={styles.menuItemHeader}>
                                <h3 className={styles.menuItemTitle}>
                                  <button type="button" className={styles.itemDetailsButton}
                                    onFocus={() => setActiveItemId(item.id)}
                                    onClick={() => { setActiveItemId(item.id); handleOpenModal(item); }}
                                    aria-label={isEn ? `View details: ${displayName}` : `Ayrıntıları gör: ${displayName}`}>
                                    {displayName}
                                  </button>
                                </h3>
                                <span className={styles.menuItemPrice}>
                                  {item.price}
                                  {item.priceNote && <small className={styles.priceNote}>{item.priceNote}</small>}
                                </span>
                              </div>

                              {displayDesc && (
                                <p className={styles.menuItemDesc}>
                                  {displayDesc}
                                </p>
                              )}

                              {getMenuOrderNote(item.id, locale) && <p className={styles.orderNote}>{getMenuOrderNote(item.id, locale)}</p>}
                              {item.category === "kahvalti-menuleri" && item.details.length > 0 && (
                                <ul className={styles.servingDetails}>
                                  {item.details.map((detail) => <li key={detail}>{detail}</li>)}
                                </ul>
                              )}
                              {item.tags && item.tags.length > 0 && (
                                <div className={styles.menuItemTags}>
                                  {item.tags.map((tag, idx) => (
                                    <span key={idx} className={styles.menuItemTag}>
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          </article>
                        );
                      })}
                    </section>
                  );
                })}
              </div>
            </div>
          </div>
          {lastUpdated && <p className={styles.menuUpdated}>{isEn ? "Price record last updated" : "Fiyat kaydı son güncelleme"}: {localizeMenuDate(locale, lastUpdated)}</p>}
          <OrderingGuide questions={getOrderingQuestions(locale, initialItems)} locale={locale} />
        </div>
      </section>

      {/* ====================================================================
          3. SECTION-4: VENUE ATMOSPHERE (.section-4)
          "Keyif Dolu Anlar Sizi Bekliyor!"
          ==================================================================== */}
      <section className={styles.section4}>
        {/* Top Pointed Anchor Notch */}
        <div className={styles.topAnchor} aria-hidden="true">
          <Image
            src="/hamour/anchor-1_1.png"
            alt=""
            width={74}
            height={41}
          />
        </div>

        <div className={styles.section4Bg} aria-hidden="true">
          <Image
            src="/images/balcony-breakfast.webp"
            alt="Tarihi Van Kahvaltı Evi Atmosferi"
            fill
            sizes="100vw"
            quality={80}
          />
        </div>

        <div className={styles.section4Container}>
          <div className={styles.section4Row}>
            <div className={styles.section4Head}>
              <h2 className={styles.section4Title}>
                {isEn
                  ? "Delightful Moments Await You!"
                  : "Keyif Dolu Anlar Sizi Bekliyor!"}
              </h2>
              <p className={styles.section4Subtitle}>
                {isEn
                  ? "The enchanting atmosphere of Tarihi Van Kahvaltı Evi meets authentic flavors!"
                  : "Tarihi Van Kahvaltı Evi'nin büyüleyici atmosferi lezzetleriyle birleşiyor!"}
              </p>
            </div>

            <div className={styles.section4Article}>
              <p className={styles.section4Text}>
                {isEn
                  ? "Tarihi Van Kahvaltı Evi brings together centuries-old breakfast traditions, the atmosphere of Beyoğlu, and heartfelt Eastern hospitality to offer an authentic gourmet journey. We invite you to Tarihi Van Kahvaltı Evi to experience memorable moments in this enchanting atmosphere!"
                  : "Tarihi Van Kahvaltı Evi, asırlık kahvaltı geleneğini, Beyoğlu'nun Beyoğlu atmosferi ve sıcacık misafirperverliğiyle bir araya getirerek özgün bir lezzet deneyimini misafirlerine iftiharla sunuyor. Bu eşsiz atmosferde, keyif dolu anlar yaşamak için sizleri Tarihi Van Kahvaltı Evi'ne bekliyoruz!"}
              </p>

              <a href="tel:+905415252868" className={styles.section4Btn}>
                {isEn ? "Call Us" : "Bizi Ara"}
              </a>
            </div>
          </div>
        </div>


      </section>

      {/* ====================================================================
          4. PRODUCT DETAIL MODAL SHEET (Mobile / Click Lightbox)
          ==================================================================== */}
      <AnimatePresence>
        {modalItem && (
          <div className={styles.sheetOverlay}>
            <motion.div
              className={styles.sheetBackdrop}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
            />

            <motion.div
              className={styles.sheetDialog}
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="menu-detail-title"
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              <button
                ref={closeButtonRef}
                type="button"
                className={styles.sheetCloseBtn}
                onClick={handleCloseModal}
                aria-label={isEn ? "Close" : "Kapat"}
              >
                <X size={20} />
              </button>

              <div className={styles.sheetMedia}>
                <Image
                  src={getItemImage(modalItem, activeChapter.heroImageFallback)}
                  alt={modalItem.name}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 600px) 100vw, 540px"
                />
              </div>

              <div className={styles.sheetBody}>
                <div className={styles.sheetTitleRow}>
                  <h3 className={styles.sheetTitle} id="menu-detail-title">
                    {isEn && modalItem.translations?.en?.name
                      ? modalItem.translations.en.name
                      : modalItem.name}
                  </h3>
                  <span className={styles.sheetPrice}>{modalItem.price}{modalItem.priceNote && <small className={styles.priceNote}>{modalItem.priceNote}</small>}</span>
                </div>

                <p className={styles.sheetDesc}>
                  {isEn && modalItem.translations?.en?.description
                    ? modalItem.translations.en.description
                    : modalItem.description}
                </p>

                {getMenuOrderNote(modalItem.id, locale) && <p className={styles.orderNote}>{getMenuOrderNote(modalItem.id, locale)}</p>}
                {modalItem.details.length > 0 && <ul className={styles.servingDetails}>{modalItem.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>}
                {modalItem.tags && modalItem.tags.length > 0 && (
                  <div className={styles.sheetTags}>
                    {modalItem.tags.map((tag, i) => (
                      <span key={i} className={styles.sheetTag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <Link
                  href={isEn ? "/en/rezervasyon" : "/rezervasyon"}
                  className={styles.sheetActionBtn}
                  data-analytics-surface="menu_details"
                  onClick={handleCloseModal}
                >
                  {isEn ? "Request a Table" : "Masa Talebi Gönder"}
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
