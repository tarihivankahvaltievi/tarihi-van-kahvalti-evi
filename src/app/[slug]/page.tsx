import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  absoluteUrl,
  buildArticleJsonLd,
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildMenuJsonLd,
  createPageMetadata,
  getSeoPage,
  jsonLd,
  mapsUrl,
  menuSections,
  pageOgImagePath,
  seoPages,
  siteUrl,
  telUrl,
  whatsappUrl,
} from "../seo";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return seoPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getSeoPage(slug);

  if (!page) {
    return {};
  }

  return createPageMetadata(page);
}

export default async function SeoPage({ params }: PageProps) {
  const { slug } = await params;
  const page = getSeoPage(slug);

  if (!page) {
    notFound();
  }

  const pageUrl = absoluteUrl(page.slug);
  const labels = {
    nav: "Sayfa navigasyonu",
    menu: "Menü",
    contact: "İletişim",
    faq: "SSS",
    whatsapp: "WhatsApp",
    directions: "Yol tarifi",
    call: "Ara",
    quick: "Kısa cevap",
    details: "Detaylar",
    questions: "Merak edilenler",
    related: "İlgili sayfalar",
    home: "Ana Sayfa",
  };
  const graph: unknown[] = [
    {
      "@type": page.schemaType ?? "WebPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: page.title,
      headline: page.h1,
      description: page.description,
      inLanguage: "tr-TR",
      isPartOf: {
        "@id": `${siteUrl}/#website`,
      },
      about: { "@id": `${siteUrl}/#restaurant` },
      mainEntity:
        slug === "menu"
          ? { "@id": `${siteUrl}/menu#menu` }
          : slug === "sss"
            ? { "@id": `${pageUrl}#faq` }
            : { "@id": `${siteUrl}/#restaurant` },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: absoluteUrl(page.image),
        caption: page.imageAlt,
      },
      image: {
        "@type": "ImageObject",
        url: absoluteUrl(pageOgImagePath(page.slug)),
        width: 1200,
        height: 630,
        caption: page.imageAlt,
      },
      breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
    },
    buildBreadcrumbJsonLd(
      [
        { name: labels.home, url: siteUrl },
        { name: page.h1, url: pageUrl },
      ],
      pageUrl,
      false,
    ),
  ];

  if (slug === "menu") {
    graph.push(buildMenuJsonLd());
  }

  if (slug === "sss") {
    graph.push(buildFaqJsonLd(page.questions, pageUrl, false));
  }

  if (page.article) {
    graph.push(buildArticleJsonLd(page, pageUrl, false));
  }

  const pageJsonLd = {
    "@context": "https://schema.org",
    "@graph": graph,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(pageJsonLd) }}
      />

      <nav className="seo-topbar" aria-label={labels.nav}>
        <Link href="/" className="seo-brand">
          <Image src="/images/brand-icon-small.png" alt="" width={38} height={48} />
          <span>Tarihi Van Kahvaltı Evi</span>
        </Link>
        <div className="seo-toplinks">
          <Link href="/menu">{labels.menu}</Link>
          <Link href="/iletisim">{labels.contact}</Link>
          <Link href="/sss">{labels.faq}</Link>
        </div>
      </nav>

      <main id="main-content" className="seo-page theme-breakfast">
        <nav className="seo-breadcrumb" aria-label="Sayfa yolu">
          <Link href="/">Ana Sayfa</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{page.h1}</span>
        </nav>

      <section className="seo-hero">
        <div className="seo-hero-copy">
          <span className="seo-eyebrow">{page.eyebrow}</span>
          <h1>{page.h1}</h1>
          {page.intro.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <div className="seo-actions">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              {labels.whatsapp}
            </a>
            <a href={mapsUrl} target="_blank" rel="noopener noreferrer">
              {labels.directions}
            </a>
            <a href={telUrl}>{labels.call}</a>
          </div>
        </div>
        <figure className="seo-hero-media">
          <Image
            src={page.image}
            alt={page.imageAlt}
            fill
            preload
            sizes="(max-width: 900px) 100vw, 44vw"
          />
        </figure>
      </section>

      <section
        className="seo-answer-box"
        id={slug === "menu" ? "fiyatlar" : undefined}
        aria-labelledby="quick-answer"
      >
        <h2 id="quick-answer">{labels.quick}</h2>
        <ul>
          {page.highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
      </section>

      {slug === "menu" ? (
        <section className="seo-content-grid" aria-label="Menü kalemleri ve fiyatları">
          {menuSections.map((section, sectionIndex) => (
            <article
              key={section.name}
              id={sectionIndex === 0 ? "serpme-kahvalti" : undefined}
            >
              <h2>{section.name}</h2>
              <p>{section.description}</p>
              <ul className="seo-menu-list">
                {section.items.map((item) => (
                  <li key={item.name}>
                    <div>
                      <h3>{item.name}</h3>
                      <p>{item.description}</p>
                    </div>
                    {"price" in item && item.price ? (
                      <p className="seo-menu-price">
                        <strong>{item.price} {item.priceCurrency}</strong>
                        {"unit" in item && item.unit ? <span>{item.unit}</span> : null}
                      </p>
                    ) : null}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </section>
      ) : (
        <section className="seo-content-grid" aria-label={`${page.h1} ${labels.details}`}>
          {page.sections.map((section) => (
            <article key={section.title} id={section.id}>
              <h2>{section.title}</h2>
              <p>{section.body}</p>
            </article>
          ))}
        </section>
      )}

      <section className="seo-faq-list" aria-labelledby="page-faq">
        <h2 id="page-faq">{labels.questions}</h2>
        {page.questions.map((item) => (
          <details key={item.question}>
            <summary>{item.question}</summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </section>

        <section className="seo-related" aria-label={labels.related}>
          <Link href="/van-kahvaltisi">Van kahvaltısı nedir?</Link>
          <Link href="/beyoglu-kahvalti">Beyoğlu kahvaltı</Link>
          <Link href="/menu">Kahvaltı fiyatları</Link>
          <Link href="/kafka-cafe">Kafka Cafe</Link>
          <Link href="/iletisim">Zambak Sokak ve yol tarifi</Link>
        </section>
      </main>
    </>
  );
}
