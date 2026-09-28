import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { absoluteUrl, buildRestaurantJsonLd, displayAddress, jsonLd, mapsUrl, openingHours, siteName, siteUrl } from "../seo";
import styles from "../components/taksim-travel-guide.module.css";

const url = `${siteUrl}/es`;
const title = "Desayuno turco en Estambul | Guías en español cerca de Taksim";
const description = "Guías en español para descubrir el desayuno turco clásico, el desayuno regional de Van y el bal kaymak cerca de Taksim. Dirección, horario y menú vigente.";
export const metadata: Metadata = {
  title: { absolute: title }, description,
  alternates: { canonical: url },
  openGraph: { type: "website", title, description, url, siteName, locale: "es_ES", images: [{ url: absoluteUrl("/images/hero-parallax/overhead-feast.webp"), alt: "Mesa de desayuno turco en Estambul" }] },
};

export default function SpanishHomePage() {
  const graph = { "@context": "https://schema.org", "@graph": [buildRestaurantJsonLd(false), { "@type": "CollectionPage", "@id": `${url}#webpage`, url, name: title, description, inLanguage: "es", isPartOf: { "@id": `${siteUrl}/#website` }, mainEntity: { "@type": "ItemList", itemListElement: [
    { "@type": "ListItem", position: 1, name: "Desayuno turco clásico", url: `${url}/blog/desayuno-turco-clasico` },
    { "@type": "ListItem", position: 2, name: "Bal kaymak en Estambul", url: `${url}/blog/bal-kaymak-estambul` },
  ] } }] };
  return <main id="main-content" lang="es" className={styles.page}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(graph) }} />
    <header className={styles.topbar}><Link href="/es">{siteName}</Link><nav aria-label="Idiomas"><Link href="/en" hrefLang="en">English</Link><Link href="/zh-cn" hrefLang="zh-CN">简体中文</Link><Link href="/en/menu" hrefLang="en">Menú</Link></nav></header>
    <div className={styles.hero}><div><p className={styles.kicker}>Estambul · guías gastronómicas en español</p><h1>Descubre el desayuno turco cerca de Taksim</h1><p className={styles.lead}>Una mesa de quesos, aceitunas, huevos, pan, miel con kaymak y té. Lee cómo funciona un desayuno compartido, qué aporta la tradición de Van y cómo probar bal kaymak en Beyoğlu.</p><p className={styles.byline}>Tarihi Van Kahvaltı Evi · {displayAddress} · Todos los días {openingHours.opens}–{openingHours.closes}</p></div><figure><Image src="/images/hero-parallax/overhead-feast.webp" alt="Desayuno turco compartido con quesos, huevos, miel y té" fill priority sizes="(max-width: 800px) 100vw, 50vw" /></figure></div>
    <div className={styles.body}><section className={styles.section}><h2>Elige una guía</h2><div className={styles.points}><div><h3><Link href="/es/blog/desayuno-turco-clasico">Desayuno turco clásico</Link></h3><p>Qué lleva un kahvaltı, en qué se distingue el desayuno de Van y cómo pedir una mesa compartida.</p></div><div><h3><Link href="/es/blog/bal-kaymak-estambul">Miel y kaymak</Link></h3><p>Qué es esta crema turca, cómo se come con pan y dónde preguntar por la porción actual cerca de Taksim.</p></div></div></section><aside className={styles.visit}><h2>Planifica tu visita</h2><p>{displayAddress}</p><div className={styles.actions}><Link href="/en/menu" hrefLang="en">Ver menú y precios actuales</Link><a href={mapsUrl} target="_blank" rel="noopener noreferrer">Cómo llegar</a></div></aside></div>
  </main>;
}
