"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "./signature-showcase.module.css";

interface TabData {
  id: string;
  name: string;
  nameEn: string;
  iconActive: string;
  plateImg: string;
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
    iconActive: "/hamour/mi_tab-input-4-img-2_1.png",
    plateImg: "/hamour/van_plate_royal.png",
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
    iconActive: "/hamour/mi_tab-input-3-img-2.png",
    plateImg: "/hamour/van_plate_menemen.png",
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
    iconActive: "/hamour/mi_tab-input-2-img-2.png",
    plateImg: "/hamour/van_plate_coffee.png",
    title: "Van Kedisi Özel Latte & Semaver Keyfi!",
    titleEn: "Special Van Cat Latte & Samovar Delight!",
    desc: "Tarihi Van Kahvaltı Evi'nin imza lezzeti Van Kedisi latte artlı taze çekirdek kahveleri ve gün boyu tüten geleneksel semaver çayıyla kahvaltı keyfinizi taçlandırın.",
    descEn: "Crown your breakfast experience with Tarihi Van Kahvaltı Evi's signature freshly brewed coffee featuring authentic Van Cat latte art, and our traditional samovar tea brewing all day.",
    btnText: "Menüyü İncele",
    btnTextEn: "View Menu",
    btnHref: "/menu",
  },
];

export function SignatureShowcase({ locale = "tr" }: { locale?: string }) {
  const isEn = locale === "en";
  const [activeTab, setActiveTab] = useState(0);

  const safeTabIdx = Math.max(0, Math.min(activeTab, TABS.length - 1));
  const current = TABS[safeTabIdx] || TABS[0];

  return (
    <section className={styles.section3} id="menumuz">
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
                      width={40}
                      height={36}
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
          {/* Central Plate / Dish Presentation */}
          <div className={styles.plateArea}>
            <div className={styles.plateWrapper}>
              {/* Concentric Arch Contour Rings */}
              <div className={styles.contourArch} aria-hidden="true" />
              <Image
                src={current.plateImg}
                alt={isEn ? current.titleEn : current.title}
                width={520}
                height={520}
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
