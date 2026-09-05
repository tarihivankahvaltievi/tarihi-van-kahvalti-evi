"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
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
    iconActive: "/images/tab-icons/icon-omletler.png",
    plateImg: "/hamour/van_plate_royal.webp",
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
    iconActive: "/images/tab-icons/icon-sahanlar.png",
    plateImg: "/hamour/van_plate_menemen.webp",
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
    iconActive: "/images/tab-icons/icon-icecekler.png",
    plateImg: "/hamour/van_plate_coffee.webp",
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
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.18 });
  const reduceMotion = useReducedMotion();

  const safeTabIdx = Math.max(0, Math.min(activeTab, TABS.length - 1));
  const current = TABS[safeTabIdx] || TABS[0];

  return (
    <section ref={sectionRef} className={styles.section3} id="menumuz">
      <div className={styles.container}>
        {/* Category Tabs: 3 Luxury Buttons */}
        <motion.div
          className={styles.tabNavWrapper}
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className={styles.tabNav} role="tablist" aria-label="Menü Kategorileri">
            {TABS.map((tab, idx) => {
              const isActive = idx === safeTabIdx;
              return (
                <motion.button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`${styles.tabBtn} ${isActive ? styles.tabBtnActive : ""}`}
                  onClick={() => setActiveTab(idx)}
                  whileHover={reduceMotion ? undefined : { y: -2 }}
                  whileTap={reduceMotion ? undefined : { scale: 0.97 }}
                >
                  {/* Sliding active pill indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTabPill"
                      className={styles.activePill}
                      transition={{
                        type: "spring",
                        stiffness: 420,
                        damping: 32,
                      }}
                    />
                  )}

                  <span className={styles.iconWrapper}>
                    <Image
                      src={tab.iconActive}
                      alt={isEn ? tab.nameEn : tab.name}
                      width={56}
                      height={56}
                      className={styles.iconImg}
                      priority
                    />
                  </span>
                  <span className={styles.tabText}>{isEn ? tab.nameEn : tab.name}</span>

                  {isActive && (
                    <motion.span
                      layoutId="activeTabAccent"
                      className={styles.activeIndicator}
                      transition={{
                        type: "spring",
                        stiffness: 450,
                        damping: 35,
                      }}
                      aria-hidden="true"
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Tab Content Pane with Fluid Transitions */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            className={styles.tabContentPane}
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={
              reduceMotion
                ? undefined
                : { opacity: 0, transition: { duration: 0.2 } }
            }
            transition={{ duration: 0.35 }}
          >
            {/* Central Plate / Dish Presentation - Enters smoothly from left to right on scroll & settles */}
            <div className={styles.plateArea}>
              <motion.div
                className={styles.plateWrapper}
                initial={
                  reduceMotion
                    ? false
                    : isInView
                    ? { opacity: 0, x: -75, rotate: -3, scale: 0.95 }
                    : { opacity: 0, x: -95, rotate: -4, scale: 0.93 }
                }
                animate={
                  isInView
                    ? { opacity: 1, x: 0, rotate: 0, scale: 1 }
                    : { opacity: 0, x: -95, rotate: -4, scale: 0.93 }
                }
                transition={{
                  duration: 0.88,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {/* Subtle continuous luxury breathing floating animation */}
                <motion.div
                  className={styles.plateFloating}
                  animate={
                    reduceMotion
                      ? undefined
                      : {
                          y: [0, -6, 0],
                        }
                  }
                  transition={{
                    duration: 5.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <div className={styles.plateFloorShadow} aria-hidden="true" />
                  <Image
                    src={current.plateImg}
                    alt={isEn ? current.titleEn : current.title}
                    width={520}
                    height={520}
                    className={styles.plateImg}
                    priority
                  />
                </motion.div>
              </motion.div>
            </div>

            {/* Article / Description */}
            <div className={styles.article}>
              <motion.h3
                className={styles.articleTitle}
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                {isEn ? current.titleEn : current.title}
              </motion.h3>

              <motion.p
                className={styles.articleDesc}
                initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
              >
                {isEn ? current.descEn : current.desc}
              </motion.p>

              <motion.div
                className={styles.btnWrapper}
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.26, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link href={current.btnHref} className={styles.articleBtn}>
                  <span className={styles.btnLabel}>
                    {isEn ? current.btnTextEn : current.btnText}
                  </span>
                  <span className={styles.btnIconWrap} aria-hidden="true">
                    <ArrowRight className={styles.btnArrow} />
                  </span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
