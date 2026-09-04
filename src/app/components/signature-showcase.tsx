"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import styles from "./signature-showcase.module.css";

interface TabData {
  id: string;
  name: string;
  nameEn: string;
  iconInactive: string;
  iconActive: string;
  plateImg: string;
  floating1: string;
  floating2: string;
  floating3: string;
  title: string;
  titleEn: string;
  desc: string;
  descEn: string;
  btnText: string;
  btnTextEn: string;
  btnHref: string;
}

const TABS: TabData[] = [
  {
    id: "omletler",
    name: "Omletler",
    nameEn: "Omelettes",
    iconInactive: "/hamour/mi_tab-input-4-img-2_1.png",
    iconActive: "/hamour/mi_tab-input-4-img-2_1.png",
    plateImg: "/hamour/van_plate_royal.png",
    floating1: "/hamour/van_float_jam.png",
    floating2: "/hamour/van_float_olives.png",
    floating3: "/hamour/van_float_cheese.png",
    title: "Güne Van Usulü Sahanda Omletle Başla!",
    titleEn: "Start the Day with Van Omelette!",
    desc: "Tarihi Van Kahvaltı Evi'nin tereyağlı, sucuklu ve taze organik yumurtalarla hazırlanan enfes sahanda omletleri ile güne lezzet dolu ve doyurucu bir başlangıç yapın.",
    descEn: "Start your day delightfully with Tarihi Van Kahvaltı Evi's butter-fried, sucuk-infused omelettes prepared with fresh organic eggs.",
    btnText: "Menüyü İncele",
    btnTextEn: "View Menu",
    btnHref: "/menu",
  },
  {
    id: "sahanlar",
    name: "Sahanlar",
    nameEn: "Pan Dishes",
    iconInactive: "/hamour/mi_tab-input-3-img-2.png",
    iconActive: "/hamour/mi_tab-input-3-img-2.png",
    plateImg: "/hamour/van_plate_menemen.png",
    floating1: "/hamour/van_float_tomato.png",
    floating2: "/hamour/van_float_pepper.png",
    floating3: "/hamour/van_float_onion.png",
    title: "Bakır Sahanda Geleneksel Van Lezzetleri!",
    titleEn: "Traditional Van Delights in Copper Pans!",
    desc: "Köz tadında taze domatesler, çıtır biberler ve organik yumurtaların bakır sahanda buluştuğu efsanevi Van menemeni ve sıcak sahan lezzetlerimiz masanızda tütüyor.",
    descEn: "Our legendary Van menemen and sizzling pan delicacies, combining fresh tomatoes, peppers, and organic eggs in a traditional copper sahan.",
    btnText: "Menüyü İncele",
    btnTextEn: "View Menu",
    btnHref: "/menu",
  },
  {
    id: "icecekler",
    name: "İçecekler",
    nameEn: "Beverages",
    iconInactive: "/hamour/mi_tab-input-2-img-2.png",
    iconActive: "/hamour/mi_tab-input-2-img-2.png",
    plateImg: "/hamour/amr1_tab-4-content-img-1.png",
    floating1: "/hamour/amr2_section-3-tab-4-img-1.png",
    floating2: "/hamour/amr3_section-3-tab-4-img-2.png",
    floating3: "/hamour/amr4_section-3-tab-4-img-3.png",
    title: "Van Semaveri & Ferahlatıcı İçecekler!",
    titleEn: "Van Samovar & Refreshing Drinks!",
    desc: "Tavşan kanı demiyle gün boyu tüten geleneksel Van semaver çayı, taze sıkılmış meyve suları ve közde Türk kahvesiyle kahvaltı keyfinizi taçlandırın.",
    descEn: "Crown your breakfast experience with traditional Van samovar tea brewing all day, freshly squeezed fruit juices, and authentic Turkish coffee.",
    btnText: "Menüyü İncele",
    btnTextEn: "View Menu",
    btnHref: "/menu",
  },
];

export function SignatureShowcase({ locale = "tr" }: { locale?: string }) {
  const isEn = locale === "en";
  const [activeTab, setActiveTab] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (window.innerWidth / 2 - e.clientX) / 25;
      const y = (window.innerHeight / 2 - e.clientY) / 25;
      setMousePos({ x, y });
    };

    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const currentPos = windowHeight - rect.top;
      const totalDist = (windowHeight + rect.height * 0.45) || 1;
      const progress = Math.max(0, Math.min(1, currentPos / totalDist));
      setScrollProgress(Number.isFinite(progress) ? progress : 0);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const safeTabIdx = Math.max(0, Math.min(activeTab, TABS.length - 1));
  const current = TABS[safeTabIdx] || TABS[0];

  // Upward translation offsets as user scrolls (comes from bottom to top)
  const upOffset1 = (1 - scrollProgress) * 65;
  const upOffset2 = (1 - scrollProgress) * 85;
  const upOffset3 = (1 - scrollProgress) * 75;

  return (
    <section ref={sectionRef} className={styles.section3} id="menumuz">
      {/* Top Wavy Arched Cutout Border */}
      <div className={styles.topCurveBorder} aria-hidden="true" />

      <div className={styles.container}>
        {/* Category Tabs: 3 Luxury Buttons */}
        <div className={styles.tabNavWrapper} data-aos="fade-up" data-aos-duration="900">
          <div className={styles.tabNav} role="tablist" aria-label="Menü Kategorileri">
            {TABS.map((tab, idx) => {
              const isActive = idx === safeTabIdx;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`${styles.tabBtn} ${isActive ? styles.tabBtnActive : ""}`}
                  onClick={() => setActiveTab(idx)}
                >
                  <span className={styles.iconWrapper}>
                    <Image
                      src={tab.iconActive}
                      alt=""
                      width={38}
                      height={34}
                      className={styles.iconImg}
                    />
                  </span>
                  <span className={styles.tabText}>{isEn ? tab.nameEn : tab.name}</span>
                  {isActive && <span className={styles.activeIndicator} aria-hidden="true" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content Pane */}
        <div className={styles.tabContentPane} key={current.id}>
          {/* Floating Ingredients Parallax - Move from bottom to top on scroll */}
          <div
            className={`${styles.movingImg} ${styles.moving1}`}
            style={{
              transform: `translate(${-(mousePos.x * 2) / 10}px, ${upOffset1 + -(mousePos.y * 2) / 10}px)`,
            }}
          >
            <div className={styles.floatBob1}>
              <Image
                src={current.floating1}
                alt=""
                width={140}
                height={140}
                className={styles.floatAsset}
              />
            </div>
          </div>

          <div
            className={`${styles.movingImg} ${styles.moving2}`}
            style={{
              transform: `translate(${-(mousePos.x * 4) / 10}px, ${upOffset2 + -(mousePos.y * 4) / 10}px)`,
            }}
          >
            <div className={styles.floatBob2}>
              <Image
                src={current.floating2}
                alt=""
                width={130}
                height={130}
                className={styles.floatAsset}
              />
            </div>
          </div>

          <div
            className={`${styles.movingImg} ${styles.moving3}`}
            style={{
              transform: `translate(${-(mousePos.x * 3) / 10}px, ${upOffset3 + -(mousePos.y * 3) / 10}px)`,
            }}
          >
            <div className={styles.floatBob3}>
              <Image
                src={current.floating3}
                alt=""
                width={135}
                height={135}
                className={styles.floatAsset}
              />
            </div>
          </div>

          {/* Central Plate Presentation - Enters smoothly from right to left */}
          <div className={styles.plateArea}>
            <div className={styles.plateWrapper}>
              {/* Concentric Arch Contour Rings */}
              <div className={styles.contourArch} aria-hidden="true" />
              <Image
                src={current.plateImg}
                alt={isEn ? current.titleEn : current.title}
                width={500}
                height={500}
                className={styles.plateImg}
                priority
              />
            </div>
          </div>

          {/* Article / Description */}
          <div className={styles.article}>
            <h3 className={styles.articleTitle}>
              {isEn ? current.titleEn : current.title}
            </h3>
            <p className={styles.articleDesc}>
              {isEn ? current.descEn : current.desc}
            </p>
            <Link href={current.btnHref} className={styles.articleBtn}>
              {isEn ? current.btnTextEn : current.btnText}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
