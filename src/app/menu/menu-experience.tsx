"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import styles from "./menu.module.css";
import type { MenuItem } from "./menu-data";
import type { MenuLocale } from "./menu-localization";

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
    label: { tr: "Serpme Kahvaltı", en: "Royal Breakfast" },
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
  locale?: MenuLocale;
}

export function MenuExperience({
  initialItems,
  locale = "tr",
}: MenuExperienceProps) {
  const isEn = locale === "en";

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
      const targetId = decodeURIComponent(window.location.hash.slice(1));
      if (!targetId) return;

      const targetItem = initialItems.find((item) => item.id === targetId);
      if (!targetItem) return;

      const targetChapter = HAMOUR_CHAPTERS.find((chapter) =>
        chapter.sections.some((section) => section.categories.includes(targetItem.category)),
      );
      if (!targetChapter) return;

      setActiveChapterId(targetChapter.id);
      setActiveItemId(targetItem.id);
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
  }, [initialItems]);

  const activeItem = useMemo(() => {
    return chapterItems.find((it) => it.id === activeItemId) || chapterItems[0] || null;
  }, [chapterItems, activeItemId]);

  // Modal Item (for mobile click & desktop detail view)
  const [modalItem, setModalItem] = useState<MenuItem | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const modalTriggerRef = useRef<HTMLElement | null>(null);

  const handleOpenModal = useCallback((item: MenuItem) => {
    modalTriggerRef.current = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;
    setModalItem(item);
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalItem(null);
  }, []);

  useEffect(() => {
    if (!modalItem) return;

    const previousOverflow = document.body.style.overflow;
    const focusFrame = window.requestAnimationFrame(() => closeButtonRef.current?.focus());
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") handleCloseModal();
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
    <main className={styles.menuContainer} lang={isEn ? "en" : "tr"}>
      {/* ====================================================================
          1. BANNER SECTION (.banner)
          ==================================================================== */}
      <section className={styles.banner}>
        <div className={styles.bannerImg}>
          <Image
            src="/images/breakfast-spread.webp"
            alt={isEn ? "Tarihi Van Kahvaltı Evi Menu" : "Tarihi Van Kahvaltı Evi Menü"}
            fill
            priority
            sizes="100vw"
            quality={85}
          />
        </div>

        <div className={styles.bannerText}>
          <h1 className={styles.bannerTitle}>
            {isEn ? "Menu" : "Menü"}
          </h1>
        </div>

        <div className={styles.bannerVector}>
          <Image
            src="/hamour/logo-vector-icon.png"
            alt="Emblem"
            width={65}
            height={55}
            className={styles.bannerVectorImg}
          />
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
          {/* CATEGORY TABS (.nav-pills) */}
          <ul className={styles.navPills} role="tablist" aria-label={isEn ? "Menu categories" : "Menü kategorileri"}>
            {HAMOUR_CHAPTERS.map((chapter) => {
              const isActive = chapter.id === activeChapterId;
              return (
                <li key={chapter.id} className={styles.navItem} role="presentation">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls="menu-chapter-panel"
                    id={`menu-tab-${chapter.id}`}
                    className={`${styles.navLink} ${isActive ? styles.navLinkActive : ""}`}
                    onClick={() => setActiveChapterId(chapter.id)}
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
                  </button>
                </li>
              );
            })}
          </ul>

          {/* MENU LIST ARTICLE (.menu-list-article) */}
          <div
            className={styles.menuListArticle}
            id="menu-chapter-panel"
            role="tabpanel"
            aria-labelledby={`menu-tab-${activeChapterId}`}
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
                      quality={85}
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
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Scrollable Menu Article (.menu-article) */}
            <div className={styles.menuArticle}>
              <div className={styles.menuArticleScroll}>
                {activeChapter.sections.map((section, secIdx) => {
                  const sectionCategorySet = new Set(section.categories);
                  const itemsInSection = initialItems.filter((it) =>
                    sectionCategorySet.has(it.category),
                  );

                  if (itemsInSection.length === 0) return null;

                  return (
                    <div key={secIdx} className={styles.subSection}>
                      <h2 className={styles.subCategoryTitle}>
                        {isEn ? section.title.en : section.title.tr}
                      </h2>

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
                          <button
                            type="button"
                            key={item.id}
                            id={item.id}
                            className={`${styles.menuItem} ${isCurrentActive ? styles.menuItemActive : ""}`}
                            onMouseEnter={() => setActiveItemId(item.id)}
                            onClick={() => {
                              setActiveItemId(item.id);
                              // On mobile or on click, open detail modal
                              handleOpenModal(item);
                            }}
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
                                  {displayName}
                                </h3>
                                <span className={styles.menuItemPrice}>
                                  {item.price}
                                </span>
                              </div>

                              {displayDesc && (
                                <p className={styles.menuItemDesc}>
                                  {displayDesc}
                                </p>
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
                          </button>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
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
                  ? "Tarihi Van Kahvaltı Evi brings together centuries-old breakfast traditions, Beyoğlu's historic Greek townhouse architecture, and heartfelt Eastern hospitality to offer an authentic gourmet journey. We invite you to Tarihi Van Kahvaltı Evi to experience memorable moments in this enchanting atmosphere!"
                  : "Tarihi Van Kahvaltı Evi, asırlık kahvaltı geleneğini, Beyoğlu'nun tarihi Rum konağı dokusu ve sıcacık misafirperverliğiyle bir araya getirerek özgün bir lezzet deneyimini misafirlerine iftiharla sunuyor. Bu eşsiz atmosferde, keyif dolu anlar yaşamak için sizleri Tarihi Van Kahvaltı Evi'ne bekliyoruz!"}
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
                  <span className={styles.sheetPrice}>{modalItem.price}</span>
                </div>

                <p className={styles.sheetDesc}>
                  {isEn && modalItem.translations?.en?.description
                    ? modalItem.translations.en.description
                    : modalItem.description}
                </p>

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
                  onClick={handleCloseModal}
                >
                  {isEn ? "Reserve Table for This Item" : "Bu Lezzet İçin Masa Ayırt"}
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
