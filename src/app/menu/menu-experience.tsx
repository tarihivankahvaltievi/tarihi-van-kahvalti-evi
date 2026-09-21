"use client";

import { ArrowRight, Search, X } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { memo, useCallback, useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import styles from "./menu.module.css";
import type { MenuCategory, MenuItem } from "./menu-data";
import { MenuCategoryIcon } from "./menu-category-icons";
import { menuMessages, type MenuLocale } from "./menu-localization";

const ProductSheet = dynamic(
  () => import("./product-sheet").then((module) => module.ProductSheet),
  { ssr: false },
);

type MenuCategoryIconName = "all" | "breakfast" | "pan" | "jam" | "van" | "hot-drink" | "cold-drink";

function getCategoryIcon(categoryId: string): MenuCategoryIconName {
  if (["omletler", "menemenler", "yumurtalar", "sahanlar"].includes(categoryId)) return "pan";
  if (["receller", "ballar"].includes(categoryId)) return "jam";
  if (["yoresel-tatlar", "peynirler"].includes(categoryId)) return "van";
  if (["sicak-icecekler", "bitki-caylari", "sicak-kahveler"].includes(categoryId)) return "hot-drink";
  if (["soft-icecekler", "soguk-icecekler", "soguk-kahveler", "milkshake-frozen-smoothie"].includes(categoryId)) return "cold-drink";
  return "breakfast";
}

function getCategoryNavLabel(category: MenuCategory, locale: MenuLocale) {
  if (locale === "en") return category.shortLabel || category.label;

  const turkishLabels: Record<string, string> = {
    "kahvalti-menuleri": "Kahvaltı Menüleri",
    peynirler: "Yöresel Peynirler",
    zeytinler: "Zeytin & Söğüş",
    gozlemeler: "Gözleme & Hamur İşi",
    "yoresel-tatlar": "Yöresel Tatlar",
    receller: "Anne Reçelleri",
    ballar: "Ballar & Kaymak",
    omletler: "Omletler",
    menemenler: "Menemenler",
    yumurtalar: "Yumurtalar",
    sahanlar: "Bakır Sahanlar",
    "sicak-icecekler": "Sıcak İçecekler",
    "bitki-caylari": "Bitki Çayları",
    "soft-icecekler": "Soft İçecekler",
    "soguk-icecekler": "Soğuk İçecekler",
    "sicak-kahveler": "Kahveler",
    "soguk-kahveler": "Soğuk Kahveler",
    "milkshake-frozen-smoothie": "Özel İçecekler",
  };
  return turkishLabels[category.id] ?? category.shortLabel ?? category.label;
}

function normalize(value: string, locale: MenuLocale) {
  return value
    .toLocaleLowerCase(locale === "en" ? "en-US" : "tr-TR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
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
  locale,
}: {
  item: MenuItem;
  onOpen: (item: MenuItem) => void;
  locale: MenuLocale;
}) {
  const messages = menuMessages[locale];
  const [imageFailed, setImageFailed] = useState(false);
  const visibleTag = item.tags.find((tag) => tag === messages.featuredTag || tag === messages.newTag || tag === "Tavsiye" || tag === "Recommended");
  const metaLabel =
    item.priceNote ||
    item.tags.find((tag) => tag !== visibleTag) ||
    messages.daily;

  const hasImage = item.image && !imageFailed;

  return (
    <button
      id={item.id}
      type="button"
      className={`${styles.menuCard} ${!hasImage ? styles.menuCardTextOnly : ""}`}
      onClick={() => onOpen(item)}
      aria-label={messages.cardAria(item.name, item.price)}
    >
      {hasImage ? (
        <div className={styles.menuCardMedia}>
          <Image
            src={item.image}
            alt={item.imageAlt || item.name}
            fill
            sizes="(max-width: 640px) 90px, 104px"
            quality={80}
            onError={() => setImageFailed(true)}
          />
        </div>
      ) : null}

      <div className={styles.menuCardBody}>
        <div className={styles.menuCardHeadRow}>
          <h3 className={styles.menuCardTitle}>{item.name}</h3>
          <span className={styles.menuCardPrice}>{item.price}</span>
        </div>
        <p className={styles.menuCardDesc}>{item.description}</p>
        <div className={styles.menuCardFooter}>
          <span className={styles.menuCardTag}>{visibleTag || metaLabel}</span>
          <span className={styles.menuCardActionPrompt} aria-hidden="true">
            <span>{messages.viewPlateDetails}</span>
            <ArrowRight size={13} />
          </span>
        </div>
      </div>
    </button>
  );
});

export function MenuExperience({
  initialCategories,
  initialItems,
  initialLastUpdated,
  locale = "tr",
}: {
  initialCategories: MenuCategory[];
  initialItems: MenuItem[];
  initialLastUpdated: string;
  locale?: MenuLocale;
}) {
  const messages = menuMessages[locale];
  const reduceMotion = usePrefersReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const categoryNavRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isCatalogPinned, setIsCatalogPinned] = useState(false);
  const deferredSearch = useDeferredValue(searchTerm);

  const signatureSerpmeItem = useMemo(() => {
    return (
      initialItems.find((item) => item.id === "serpme-fix-menu") ||
      initialItems.find((item) => item.category === "kahvalti-menuleri") ||
      null
    );
  }, [initialItems]);

  const normalizedMenuCopy = useMemo(() => {
    return new Map(
      initialItems.map((item) => [
        item.id,
        normalize([item.name, item.description, item.story, ...item.tags, ...item.details].join(" "), locale),
      ]),
    );
  }, [initialItems, locale]);

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
        setIsCatalogPinned(!entry.isIntersecting && entry.boundingClientRect.bottom <= 72);
      },
      { rootMargin: "-72px 0px 0px", threshold: 0 },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  const visibleItems = useMemo(() => {
    const query = normalize(deferredSearch, locale);
    return initialItems.filter((item) => {
      if (query) return normalizedMenuCopy.get(item.id)?.includes(query) ?? false;
      return activeCategory === "all" || item.category === activeCategory;
    });
  }, [activeCategory, initialItems, deferredSearch, locale, normalizedMenuCopy]);

  const groups = useMemo(() => {
    return initialCategories
      .map((category) => ({
        ...category,
        items: visibleItems.filter((item) => item.category === category.id),
      }))
      .filter((group) => group.items.length > 0);
  }, [initialCategories, visibleItems]);

  const navigableCategories = useMemo(
    () => initialCategories.filter((category) => initialItems.some((item) => item.category === category.id)),
    [initialCategories, initialItems],
  );

  const openItem = useCallback((item: MenuItem) => setSelectedItem(item), []);
  const closeItem = useCallback(() => setSelectedItem(null), []);

  const centerCategoryButton = useCallback((categoryId: string) => {
    const trigger = categoryNavRef.current?.querySelector<HTMLButtonElement>(`[data-category-id="${categoryId}"]`);
    const rail = categoryNavRef.current;
    if (!trigger || !rail) return;

    const railRect = rail.getBoundingClientRect();
    const triggerRect = trigger.getBoundingClientRect();
    const comfortInset = Math.min(48, railRect.width * 0.16);
    const comfortablyVisible =
      triggerRect.left >= railRect.left + comfortInset &&
      triggerRect.right <= railRect.right - comfortInset;
    if (comfortablyVisible) return;

    rail.scrollTo({
      left: trigger.offsetLeft - (rail.clientWidth - trigger.offsetWidth) / 2,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }, [reduceMotion]);

  const selectCategory = (categoryId: string) => {
    searchInputRef.current?.blur();
    setSearchTerm("");
    setActiveCategory(categoryId);
    centerCategoryButton(categoryId);

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        const catalog = document.getElementById("menu-catalog");
        const target = document.getElementById("menu-results");
        if (!catalog || !target) return;
        const stickyOffset = 68 + catalog.getBoundingClientRect().height + 14;
        const targetTop = target.getBoundingClientRect().top + window.scrollY - stickyOffset;
        window.scrollTo({ top: Math.max(0, targetTop), behavior: reduceMotion ? "auto" : "smooth" });
      });
    });
  };

  useEffect(() => {
    centerCategoryButton(activeCategory);
  }, [activeCategory, centerCategoryButton]);

  const handleSearchFocus = () => {
    if (!window.matchMedia("(max-width: 768px)").matches) return;
    const catalog = document.getElementById("menu-catalog");
    if (!catalog || catalog.getBoundingClientRect().top <= 72) return;

    catalog.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  const handleCenterpieceBooking = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("open-booking", {
          detail: {
            itemTitle: signatureSerpmeItem?.name || "Serpme Van Kahvaltısı",
            category: "Kahvaltı",
          },
        }),
      );
    }
  };

  return (
    <main id="main-content" className={styles.page} lang={messages.pageLanguage}>
      {/* 1. HERO BÖLÜMÜ (ANA SAYFA SECTION 1 HAKKIMIZDA DİLİ İLE BİREBİR) */}
      <section ref={heroRef} className={styles.menuHero} aria-labelledby="menu-page-title">
        <div className={styles.heroAnchorNotch} aria-hidden="true">
          <Image
            src="/hamour/anchor-2.png"
            alt=""
            width={68}
            height={38}
            className={styles.anchorImg}
            priority
          />
        </div>

        <div className={styles.heroContainer}>
          <div className={styles.heroCrestMini} aria-hidden="true">
            <Image
              src="/images/brand-emblem-colored.png"
              alt="Tarihi Van Kahvaltı Evi"
              width={52}
              height={36}
              className={styles.heroCrestImg}
              priority
            />
          </div>

          <h1 id="menu-page-title" className={styles.heroTitle}>
            <span className={styles.heroTitleLine}>
              {locale === "en" ? "The Van Table" : "Van Sofrasının Bereketi"}
            </span>
            <span className={styles.heroTitleLineAccent}>
              {locale === "en" ? "in the Heart of Beyoğlu" : "Beyoğlu'nun Kalbinde"}
            </span>
          </h1>

          <div className={styles.heroIntro}>
            <p>
              {locale === "en"
                ? "A generous feast of highland cheeses, warm copper pans, and unhurried conversation—this is our invitation to gather around the table."
                : "Taze yayla lezzetleri, bakır sahanda cızırdayan sıcaklar ve uzun sohbetler için kurulan cömert bir sofra."}
            </p>
          </div>

          <div className={styles.heroStoryText}>
            <p>
              {locale === "en"
                ? "Since 1978, in our historic 18th-century Greek townhouse, we bring you genuine Van breakfast culture, geographical-indication herb cheese, wild honeycomb, and slow-brewed samovar tea."
                : "1978 yılından bu yana, asırlık Rum konağımızın tarihi dokusunda Van yaylalarından coğrafi işaretli hakiki otlu peyniri, Karakovan petek balını ve semaverden süzülen tavşan kanı çayı aynı aile sıcaklığıyla sofranıza taşıyoruz."}
            </p>
          </div>
        </div>
      </section>

      {/* 2. İMZA SERPME VAN SOFRASI (SIGNATURE SHOWCASE FORMATI) */}
      {!searchTerm && (activeCategory === "all" || activeCategory === "kahvalti-menuleri") && signatureSerpmeItem ? (
        <section className={styles.centerpieceSection} aria-label={messages.centerpieceTitle}>
          <div className={styles.centerpieceCard}>
            <div className={styles.centerpieceMedia}>
              <div className={styles.plateFloating}>
                <div className={styles.plateFloorShadow} aria-hidden="true" />
                <Image
                  src="/hamour/van_plate_royal.webp"
                  alt={signatureSerpmeItem.name}
                  width={520}
                  height={520}
                  className={styles.plateImg}
                  priority
                />
              </div>
            </div>

            <div className={styles.centerpieceContent}>
              <span className={styles.centerpieceTag}>
                {locale === "en" ? "TRADITIONAL SIGNATURE FEAST" : "GELENEKSEL İMZA SOFRA"}
              </span>

              <h2 className={styles.centerpieceTitle}>{signatureSerpmeItem.name}</h2>

              <div className={styles.centerpiecePriceRow}>
                <span className={styles.centerpiecePrice}>{signatureSerpmeItem.price}</span>
                <span className={styles.centerpiecePriceNote}>
                  {signatureSerpmeItem.priceNote || messages.centerpiecePerPerson}
                </span>
              </div>

              <p className={styles.centerpieceDesc}>{signatureSerpmeItem.description}</p>

              <ul className={styles.centerpieceDetailsList}>
                <li className={styles.centerpieceDetailItem}>
                  <span className={styles.detailBullet} />
                  <span>{locale === "en" ? "Complimentary samovar tea all day" : "Gün boyu tüten semaver çayı ikramımızdır"}</span>
                </li>
                <li className={styles.centerpieceDetailItem}>
                  <span className={styles.detailBullet} />
                  <span>{locale === "en" ? "Authentic highland herb cheese & regional cheeses" : "Van yaylalarından coğrafi işaretli hakiki otlu peynir ve peynir çeşitleri"}</span>
                </li>
                <li className={styles.centerpieceDetailItem}>
                  <span className={styles.detailBullet} />
                  <span>{locale === "en" ? "Sizzling buttery murtuğa in copper pan" : "Bakır sahanda tereyağlı cevizli murtuğa"}</span>
                </li>
                <li className={styles.centerpieceDetailItem}>
                  <span className={styles.detailBullet} />
                  <span>{locale === "en" ? "Fresh oven kete & warm fried pişi basket" : "Taş fırından sıcak kete ve taze pişi sepeti"}</span>
                </li>
              </ul>

              <div className={styles.centerpieceBtnRow}>
                <button
                  type="button"
                  className={styles.primaryActionBtn}
                  onClick={handleCenterpieceBooking}
                >
                  <span>{messages.centerpieceBook}</span>
                  <ArrowRight size={18} />
                </button>
                <button
                  type="button"
                  className={styles.secondaryActionBtn}
                  onClick={() => openItem(signatureSerpmeItem)}
                >
                  <span>{messages.centerpieceDetails}</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {/* 3. LÜKS KATEGORİ NAVİGASYONU (SIGNATURE SHOWCASE TABLARI İLE BİREBİR) */}
      <nav
        id="menu-catalog"
        className={`${styles.discoveryBar} ${isCatalogPinned ? styles.discoveryPinned : ""}`}
        aria-label={messages.navigationAria}
      >
        <div className={styles.discoveryInner}>
          <div ref={categoryNavRef} className={styles.categoryNav} role="tablist">
            {[
              { id: "all", label: locale === "en" ? "All Dishes" : "Tüm Sofra", icon: "all" as const },
              ...navigableCategories.map((category) => ({
                id: category.id,
                label: getCategoryNavLabel(category, locale),
                icon: getCategoryIcon(category.id),
              })),
            ].map((category) => {
              const isActive = activeCategory === category.id;
              return (
                <button
                  key={category.id}
                  type="button"
                  role="tab"
                  data-category-id={category.id}
                  className={`${styles.categoryBtn} ${isActive ? styles.activeCategory : ""}`}
                  aria-selected={isActive}
                  aria-controls="menu-results"
                  aria-label={messages.showCategory(category.label)}
                  onClick={() => selectCategory(category.id)}
                >
                  <span className={styles.categoryIconWrap} aria-hidden="true">
                    <MenuCategoryIcon name={category.icon} />
                  </span>
                  <span className={styles.categoryText}>{category.label}</span>
                </button>
              );
            })}
          </div>

          <div className={styles.searchWrapper}>
            <div className={styles.searchBox}>
              <Search size={16} aria-hidden="true" />
              <label className={styles.srOnly} htmlFor="menu-search">{messages.searchLabel}</label>
              <input
                ref={searchInputRef}
                id="menu-search"
                type="search"
                placeholder={locale === "en" ? "Search dishes…" : "Menüde lezzet ara…"}
                value={searchTerm}
                onChange={(event) => {
                  const nextSearch = event.target.value;
                  setSearchTerm(nextSearch);
                  if (nextSearch) setActiveCategory("all");
                }}
                autoComplete="off"
                inputMode="search"
                enterKeyHint="search"
                aria-controls="menu-results"
                onFocus={handleSearchFocus}
                className={styles.searchInput}
              />
              {searchTerm ? (
                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm("");
                    window.requestAnimationFrame(() => searchInputRef.current?.focus());
                  }}
                  aria-label={messages.clearSearch}
                  className={styles.searchClearBtn}
                >
                  <X size={14} />
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </nav>

      {/* 4. MENÜ LİSTESİ */}
      <div id="menu-results" className={styles.menuContainer}>
        <div className={styles.statusSummary} aria-live="polite">
          <span className={styles.statusLiveCount}>
            {searchTerm
              ? messages.searchResult(searchTerm, visibleItems.length)
              : messages.showing(visibleItems.length)}
          </span>
          <span className={styles.currencyNote}>{messages.prices}</span>
        </div>

        {visibleItems.length > 0 ? (
          <div className={styles.menuSectionsGroup}>
            {groups.map((group) => (
              <section
                id={`menu-section-${group.id}`}
                key={group.id}
                className={styles.menuSection}
                aria-labelledby={`cat-${group.id}`}
              >
                <header className={styles.sectionHeader}>
                  <div className={styles.sectionFlowerEmblem} aria-hidden="true">
                    <Image
                      src="/images/brand-emblem-colored.png"
                      alt=""
                      width={38}
                      height={26}
                      className={styles.sectionFlowerImg}
                    />
                  </div>
                  <h2 id={`cat-${group.id}`} className={styles.sectionTitle}>{group.label}</h2>
                  {group.description ? (
                    <p className={styles.sectionSubtitle}>{group.description}</p>
                  ) : null}
                </header>

                <div className={styles.menuGrid}>
                  {group.items.map((item) => (
                    <MenuCard
                      key={item.id}
                      item={item}
                      onOpen={openItem}
                      locale={locale}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <h3 className={styles.emptyTitle}>{messages.emptyTitle}</h3>
            <p className={styles.emptyText}>{messages.emptyText}</p>
            <button
              type="button"
              className={styles.primaryActionBtn}
              onClick={() => {
                setSearchTerm("");
                setActiveCategory("all");
              }}
            >
              <span>{messages.showAll}</span>
            </button>
          </div>
        )}

        {/* 5. ATMOSFERİK KAPANIŞ BÖLÜMÜ (VENUE ATMOSPHERE SECTION 4 İLE BİREBİR) */}
        <section className={styles.atmosphereSection} aria-labelledby="atmosphere-heading">
          <div className={styles.atmosphereTopAnchor} aria-hidden="true">
            <Image
              src="/hamour/anchor-2.png"
              alt=""
              width={74}
              height={41}
            />
          </div>
          <h2 id="atmosphere-heading" className={styles.atmosphereTitle}>
            {locale === "en" ? "Delightful Moments Await You!" : "Keyif Dolu Anlar Sizi Bekliyor!"}
          </h2>
          <p className={styles.atmosphereDesc}>
            {locale === "en"
              ? "In our historic rooms and at our street-side tables, the generous spirit of Van meets the warmth of Beyoğlu. We invite you to experience delightful breakfast moments in this unique atmosphere!"
              : "Tarihi salonlarımızda ya da sokak masalarımızda, Van sofrasının cömertliği Beyoğlu'nun sıcaklığıyla buluşuyor. Bu eşsiz atmosferde keyif dolu bir sofra için sizi bekliyoruz!"}
          </p>
          <Link
            href={locale === "en" ? "/en/rezervasyon" : "/rezervasyon"}
            className={styles.atmosphereBtn}
          >
            <span>{locale === "en" ? "Reserve a Table" : "Masa Rezervasyonu Yapın"}</span>
          </Link>
        </section>

        {/* 6. GÜNCELLEME VE ALERJEN BİLGİSİ */}
        <footer className={styles.menuDisclaimer}>
          <span className={styles.disclaimerDate}>
            {messages.updated} · {initialLastUpdated}
          </span>
          <p className={styles.disclaimerText}>{messages.availability}</p>
        </footer>
      </div>

      {/* 7. TADIM KARTI MODALI */}
      {selectedItem ? (
        <ProductSheet
          key={selectedItem.id}
          item={selectedItem}
          categoryLabel={initialCategories.find((cat) => cat.id === selectedItem.category)?.label}
          locale={locale}
          onClose={closeItem}
        />
      ) : null}
    </main>
  );
}
