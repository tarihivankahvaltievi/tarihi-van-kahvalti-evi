import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { absoluteUrl, displayAddress, mapsUrl, openingHours, siteName, siteUrl } from "../seo";
import { jsonLd } from "../seo";
import styles from "../components/taksim-travel-guide.module.css";

const url = `${siteUrl}/zh-cn`;
const title = "伊斯坦布尔塔克西姆早餐中文指南｜蜂蜜奶皮与 Van 早餐";
const description = "给中文旅客的塔克西姆早餐指南：了解土耳其蜂蜜奶皮、Van 风味早餐、Beyoğlu 地址、营业时间和实时菜单。";
export const metadata: Metadata = {
  title: { absolute: title }, description,
  alternates: { canonical: url },
  twitter: { card: "summary_large_image", title, description, images: [absoluteUrl("/images/hero-parallax/overhead-feast.webp")] },
  openGraph: { type: "website", title, description, url, siteName, locale: "zh_CN", images: [{ url: absoluteUrl("/images/hero-parallax/overhead-feast.webp"), alt: "伊斯坦布尔的 Van 风味早餐" }] },
};

export default function ChineseHomePage() {
  const graph = { "@context": "https://schema.org", "@type": "CollectionPage", "@id": `${url}#webpage`, url, name: title, description, inLanguage: "zh-CN", isPartOf: { "@id": `${siteUrl}/#website` }, mainEntity: { "@type": "ItemList", itemListElement: [
    { "@type": "ListItem", position: 1, name: "蜂蜜奶皮指南", url: `${url}/blog/istanbul-bal-kaymak` },
    { "@type": "ListItem", position: 2, name: "塔克西姆土耳其早餐指南", url: `${url}/blog/taksim-turkish-breakfast` },
  ] } };
  return <main id="main-content" tabIndex={-1} lang="zh-CN" className={styles.page}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(graph) }} />
    <header className={styles.topbar}><Link href="/zh-cn">{siteName}</Link><nav aria-label="语言"><Link href="/ko" hrefLang="ko">한국어</Link><Link href="/en" hrefLang="en">English</Link><Link href="/en/menu" hrefLang="en">Menu</Link></nav></header>
    <div className={styles.hero}><div><p className={styles.kicker}>中文旅行美食指南</p><h1>塔克西姆的早晨，从蜂蜜奶皮到 Van 早餐</h1><p className={styles.lead}>在伊斯坦布尔 Beyoğlu，认识土耳其早餐的甜味与咸味。先选一篇指南：蜂蜜奶皮的味道和吃法，或塔克西姆附近共享式早餐的点单方法。</p><p className={styles.byline}>Tarihi Van Kahvaltı Evi · {displayAddress} · 每天 {openingHours.opens}–{openingHours.closes}</p></div><figure><Image src="/images/hero-parallax/overhead-feast.webp" alt="蜂蜜奶皮、奶酪、面包和红茶组成的土耳其早餐" fill priority sizes="(max-width: 800px) 100vw, 50vw" /></figure></div>
    <div className={styles.body}><section className={styles.section}><h2>选择您需要的指南</h2><div className={styles.points}><div><h3><Link href="/zh-cn/blog/istanbul-bal-kaymak">蜂蜜奶皮 Bal Kaymak</Link></h3><p>它是什么、怎么吃、奶源如何确认，以及塔克西姆附近的实际到店信息。</p></div><div><h3><Link href="/zh-cn/blog/taksim-turkish-breakfast">塔克西姆土耳其早餐</Link></h3><p>共享式 kahvaltı、Van 地区菜品、两人点单与步行路线。</p></div></div></section><aside className={styles.visit}><h2>计划到店</h2><p>{displayAddress}</p><div className={styles.actions}><Link href="/en/menu" hrefLang="en">查看当前菜单及价格</Link><a href={mapsUrl} target="_blank" rel="noopener noreferrer">Google 地图导航</a></div></aside></div>
  </main>;
}
