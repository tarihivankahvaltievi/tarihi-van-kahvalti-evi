"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BookingOpenButton } from "./booking-open-button";
import { messagesFor, type SiteLocale } from "../home-localization";
import styles from "./signature-showcase.module.css";

export function SignatureShowcase({ locale = "tr" }: { locale?: SiteLocale }) {
  const messages = messagesFor(locale);
  const showcase = messages.showcase;
  const [activeTabId, setActiveTabId] = useState<string>(showcase.tabs[0].id);

  const activeTab = showcase.tabs.find((t) => t.id === activeTabId) ?? showcase.tabs[0];
  const activeIndex = showcase.tabs.findIndex((t) => t.id === activeTabId);

  return (
    <section id="signature-menu" className={styles.section} aria-labelledby="showcase-title">
      {/* Top Decorative Transition Anchor */}
      <div className={styles.topAnchor} aria-hidden="true">
        <svg viewBox="0 0 120 28" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.anchorSvg}>
          <path d="M0 0C30 0 45 28 60 28C75 28 90 0 120 0H0Z" fill="#240b0e" />
        </svg>
      </div>

      <div className={styles.container}>
        {/* Section Header */}
        <header className={styles.header}>
          <span className={styles.eyebrow}>{showcase.eyebrow}</span>
          <h2 id="showcase-title" className={styles.title}>
            {showcase.title} <span className={styles.titleAccent}>{showcase.titleAccent}</span>
          </h2>
          <p className={styles.lead}>{showcase.lead}</p>
        </header>

        {/* Category Navigation Tabs (Mobile Horizontally Scrollable) */}
        <div className={styles.tabsTrackWrapper}>
          <div className={styles.tabsTrack} role="tablist" aria-label={showcase.title}>
            {showcase.tabs.map((tab, idx) => {
              const isActive = tab.id === activeTabId;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  id={`tab-${tab.id}`}
                  aria-selected={isActive}
                  aria-controls={`panel-${tab.id}`}
                  tabIndex={isActive ? 0 : -1}
                  className={`${styles.tabBtn} ${isActive ? styles.tabBtnActive : ""}`}
                  onClick={() => setActiveTabId(tab.id)}
                >
                  <span className={styles.tabIconWrap}>
                    <Image
                      src={tab.icon}
                      alt=""
                      width={44}
                      height={44}
                      className={styles.tabIcon}
                      aria-hidden="true"
                    />
                  </span>
                  <span className={styles.tabLabel}>{tab.label}</span>
                  <span className={styles.tabIndex}>0{idx + 1}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content Card Panel */}
        <div
          id={`panel-${activeTab.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeTab.id}`}
          className={styles.panel}
        >
          {/* Dish Photography Frame */}
          <div className={styles.visualCol}>
            <div className={styles.imageFrame}>
              <Image
                key={activeTab.id}
                src={activeTab.image}
                alt={activeTab.heading}
                fill
                sizes="(max-width: 768px) 92vw, (max-width: 1200px) 50vw, 580px"
                className={styles.dishImage}
                quality={84}
              />
              <div className={styles.badgeGroup}>
                <span className={styles.badge}>{activeTab.badge}</span>
                <span className={styles.tag}>{activeTab.tag}</span>
              </div>
            </div>
          </div>

          {/* Editorial Dish Details */}
          <div className={styles.infoCol}>
            <div className={styles.metaRow}>
              <span className={styles.counter}>0{activeIndex + 1} / 0{showcase.tabs.length}</span>
              <span className={styles.metaDot} aria-hidden="true">•</span>
              <span className={styles.metaCategory}>{activeTab.label}</span>
            </div>

            <h3 className={styles.dishHeading}>{activeTab.heading}</h3>
            <h4 className={styles.dishSubtitle}>{activeTab.subtitle}</h4>
            <p className={styles.dishDesc}>{activeTab.description}</p>

            <div className={styles.actions}>
              <Link href={messages.menuHref} className={styles.menuLink}>
                <span>{showcase.viewMenuAction}</span>
                <span className={styles.arrow} aria-hidden="true">→</span>
              </Link>
              <BookingOpenButton className={styles.bookBtn}>
                <span>{showcase.tableBookingAction}</span>
              </BookingOpenButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
