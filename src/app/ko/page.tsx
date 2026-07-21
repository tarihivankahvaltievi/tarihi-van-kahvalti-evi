import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, MapPin } from "lucide-react";
import styles from "./ko-home.module.css";
import {
  absoluteUrl,
  buildFaqJsonLd,
  buildRestaurantJsonLd,
  displayAddress,
  englishUrl,
  jsonLd,
  koreanHoneyKaymakBlogUrl,
  koreanKaymakExplainerUrl,
  koreanTurkishBreakfastBlogUrl,
  koreanUrl,
  mapsUrl,
  openingHours,
  siteName,
  siteUrl,
} from "../seo";

const title = "이스탄불 카이막·터키식 아침 식사 한국어 가이드";
const description =
  "탁심 근처 이스탄불 발 카이막과 터키식 반 아침 식사를 한국어로 안내합니다. 카이막 뜻과 먹는 법, 현재 메뉴, 영업시간, 주소와 길찾기를 확인하세요.";

const faq = [
  { question: "이스탄불에서 발 카이막을 어디에서 먹을 수 있나요?", answer: "Tarihi Van Kahvaltı Evi는 베요글루 잠박 거리에 있으며 탁심 광장, 이스티클랄 거리와 지한기르에서 걸어갈 수 있습니다. 현재 발 카이막 구성과 가격은 실시간 영문 메뉴에서 확인하세요." },
  { question: "발 카이막은 무엇인가요?", answer: "터키어 bal은 꿀, kaymak은 우유에서 얻는 진하고 부드러운 유제품입니다. 카이막을 따뜻한 빵이나 피시에 올리고 꿀을 곁들여 먹는 대표적인 터키 아침 조합입니다." },
  { question: "반 아침 식사는 일반 터키식 아침과 어떻게 다른가요?", answer: "치즈, 올리브, 달걀, 빵, 꿀과 차 같은 넓은 터키 아침 식사에 반 허브 치즈, 무르투아, 카부트, 반식 자즉과 케테 등 지역 음식이 더해집니다." },
  { question: "한국어 메뉴가 있나요?", answer: "이 한국어 허브와 세부 가이드에서 음식 이름과 주문법을 설명합니다. 가격은 바뀔 수 있으므로 동적으로 갱신되는 영문 메뉴를 가장 정확한 기준으로 연결합니다." },
  { question: "영업시간은 언제인가요?", answer: "매일 08:00–18:00에 운영합니다. 공휴일이나 특별 운영일에는 방문 전에 매장에 최신 시간을 확인하세요." },
];

export const metadata: Metadata = {
  title: { absolute: `${title} | Tarihi Van` },
  description,
  keywords: ["이스탄불 카이막", "이스탄불 카이막 맛집", "발 카이막", "탁심 아침 식사", "터키식 아침 식사", "반 아침 식사", "베요글루 맛집"],
  alternates: {
    canonical: koreanUrl,
    languages: { tr: siteUrl, en: englishUrl, ko: koreanUrl, "x-default": siteUrl },
  },
  openGraph: {
    title,
    description,
    url: koreanUrl,
    siteName,
    locale: "ko_KR",
    alternateLocale: ["tr_TR", "en_US"],
    type: "website",
    images: [{ url: absoluteUrl("/images/og/istanbul-bal-kaymak.jpg"), width: 1200, height: 630, alt: "이스탄불의 발 카이막과 터키식 반 아침 식사" }],
  },
  twitter: { card: "summary_large_image", title, description, images: [absoluteUrl("/images/og/istanbul-bal-kaymak.jpg")] },
};

const guides = [
  { label: "먹으러 가기", title: "이스탄불 발 카이막 맛집 가이드", description: "실제 메뉴 구성, 꿀과 카이막을 먹는 순서, 탁심 근처 위치와 방문 정보를 확인하세요.", href: "/ko/blog/istanbul-bal-kaymak" },
  { label: "음식 이해하기", title: "카이막은 무엇이고 어떤 맛일까요?", description: "물소·소 카이막, 버터·생크림과의 차이, 발 카이막의 뜻과 터키어 주문 표현을 정리했습니다.", href: "/ko/blog/kaymak-nedir" },
  { label: "한 상 경험하기", title: "이스탄불 터키식 아침 식사", description: "카흐발트와 반 아침 식사의 대표 메뉴, 공유 방식, 주문 순서와 여행 팁을 안내합니다.", href: "/ko/blog/turkish-breakfast-istanbul" },
];

export default function KoreanHomePage() {
  const pageJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildRestaurantJsonLd(false),
      {
        "@type": ["WebPage", "CollectionPage"],
        "@id": `${koreanUrl}#webpage`,
        url: koreanUrl,
        name: title,
        description,
        inLanguage: "ko-KR",
        isPartOf: { "@id": `${siteUrl}/#website` },
        about: { "@id": `${siteUrl}/#restaurant` },
        mainEntity: {
          "@type": "ItemList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "이스탄불 발 카이막 맛집 가이드", url: koreanHoneyKaymakBlogUrl },
            { "@type": "ListItem", position: 2, name: "카이막이란?", url: koreanKaymakExplainerUrl },
            { "@type": "ListItem", position: 3, name: "이스탄불 터키식 아침 식사", url: koreanTurkishBreakfastBlogUrl },
          ],
        },
        primaryImageOfPage: { "@type": "ImageObject", url: absoluteUrl("/images/og/istanbul-bal-kaymak.jpg"), width: 1200, height: 630 },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${koreanUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: siteName, item: siteUrl },
          { "@type": "ListItem", position: 2, name: "한국어 가이드", item: koreanUrl },
        ],
      },
      buildFaqJsonLd(faq, koreanUrl, false, "ko-KR"),
    ],
  };

  return (
    <main id="main-content" className={styles.page} lang="ko-KR">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(pageJsonLd) }} />
      <header className={styles.topbar}>
        <Link className={styles.brand} href="/ko">
          <Image src="/images/brand-icon-small.png" alt="" width={44} height={56} priority />
          <span>Tarihi Van Kahvaltı Evi</span>
        </Link>
        <nav aria-label="한국어 가이드 메뉴">
          <Link href="/ko/blog/istanbul-bal-kaymak">발 카이막</Link>
          <Link href="/ko/blog/kaymak-nedir">카이막이란</Link>
          <Link href="/ko/blog/turkish-breakfast-istanbul">터키식 아침</Link>
          <Link href="/en/menu" hrefLang="en">메뉴</Link>
        </nav>
      </header>

      <section className={styles.hero} aria-labelledby="ko-home-title">
        <figure className={styles.heroImage}>
          <Image src="/images/blog/istanbul-bal-kaymak.webp" alt="" fill priority sizes="100vw" quality={84} />
        </figure>
        <div className={styles.heroCopy}>
          <p className={styles.heroKicker}>한국인 여행자를 위한 이스탄불 아침 식사 안내</p>
          <h1 id="ko-home-title">꿀과 카이막에서 <span>반의 아침 식탁까지.</span></h1>
          <p className={styles.heroLead}>이스탄불에서 꼭 맛보고 싶은 발 카이막, 그 음식의 정확한 뜻과 먹는 법, 탁심 근처에서 경험하는 터키식 반 아침 식사를 한국어로 차근차근 안내합니다.</p>
          <div className={styles.heroActions}>
            <a href="#korean-guides">가이드 선택하기 <ArrowDown size={16} aria-hidden="true" /></a>
            <Link href="/en/menu" hrefLang="en">현재 메뉴와 가격 <ArrowUpRight size={16} aria-hidden="true" /></Link>
          </div>
        </div>
      </section>

      <div className={styles.tasteLine} aria-label="터키식 아침 식사의 맛의 흐름">
        <span>단맛 · 발 카이막</span><i aria-hidden="true" /><span>짠맛 · 반 허브 치즈</span>
      </div>

      <section className={styles.intro} aria-labelledby="ko-intro-title">
        <p className={styles.sectionLabel}>먼저, 답부터</p>
        <div className={styles.introCopy}>
          <h2 id="ko-intro-title">발 카이막은 터키 아침 식사의 달콤한 한 부분입니다.</h2>
          <p>발(bal)은 터키어로 꿀, 카이막(kaymak)은 우유에서 얻는 진하고 부드러운 유제품입니다. 따뜻한 빵이나 피시에 카이막을 올리고 꿀을 곁들여 먹습니다. 카이막 자체는 대체로 담백하고 고소하며, 선명한 단맛은 꿀에서 옵니다.</p>
          <p>하지만 현지의 아침은 발 카이막 한 접시에서 끝나지 않습니다. 카흐발트(kahvaltı)는 치즈, 올리브, 채소, 달걀, 잼, 따뜻한 빵과 차를 함께 나누는 식사입니다. 반(Van)식 아침에는 허브 치즈, 무르투아, 카부트와 걸쭉한 자즉처럼 지역의 맛이 더해집니다.</p>
          <div className={styles.answerBox}>Tarihi Van Kahvaltı Evi는 베요글루 잠박 거리에서 1978년부터 이어온 가족의 반 아침 문화를 선보입니다. 매일 08:00–18:00 운영하며 탁심 광장과 이스티클랄 거리에서 걸어서 방문할 수 있습니다.</div>
        </div>
      </section>

      <section id="korean-guides" className={styles.guides} aria-labelledby="guide-list-title">
        <header className={styles.guidesHeader}>
          <h2 id="guide-list-title">궁금한 것부터 골라 읽으세요.</h2>
          <p>세 페이지는 같은 표현을 반복하지 않습니다. 방문 장소를 찾는 단계, 음식 자체를 이해하는 단계, 전체 터키 아침 식사를 계획하는 단계로 나뉩니다.</p>
        </header>
        <div className={styles.guideGrid}>
          {guides.map((guide) => (
            <Link key={guide.href} className={styles.guideCard} href={guide.href} hrefLang="ko">
              <span>{guide.label}</span><h3>{guide.title}</h3><p>{guide.description}</p><b>한국어 가이드 읽기 <ArrowUpRight size={15} aria-hidden="true" /></b>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.tableStory} aria-labelledby="table-story-title">
        <figure className={styles.storyImage}>
          <Image src="/images/hands-table.webp" alt="이스탄불 베요글루에서 여러 사람이 터키식 반 아침 식사를 함께 나누는 모습" fill sizes="(max-width: 800px) 100vw, 44vw" quality={82} />
          <figcaption>반 아침 식사는 여러 작은 접시를 한가운데 놓고 함께 맛보는 공유 식사입니다.</figcaption>
        </figure>
        <div className={styles.storyCopy}>
          <h2 id="table-story-title">단맛과 짠맛을 오가는 한 상의 리듬</h2>
          <p>처음부터 모든 접시를 많이 담기보다 조금씩 맛보는 편이 좋습니다. 카이막만 먼저 맛보고 꿀을 더한 뒤, 허브 치즈나 올리브로 전환하고, 뜨거운 무르투아·메네멘을 나누며 차를 곁들이세요.</p>
          <ol className={styles.rhythm}>
            <li><strong>01 · 담백</strong><span>카이막만 작은 양으로 맛보며 원유의 향과 질감을 확인합니다.</span></li>
            <li><strong>02 · 달콤</strong><span>따뜻한 빵에 카이막을 올리고 꿀을 조금씩 더합니다.</span></li>
            <li><strong>03 · 짭짤</strong><span>반 허브 치즈와 올리브로 단맛을 환기합니다.</span></li>
            <li><strong>04 · 따뜻</strong><span>무르투아, 카부트와 달걀 팬을 식기 전에 함께 나눕니다.</span></li>
            <li><strong>05 · 차</strong><span>터키 차로 입안을 정리하며 천천히 다음 접시로 넘어갑니다.</span></li>
          </ol>
        </div>
      </section>

      <section className={styles.visit} aria-labelledby="visit-title">
        <div className={styles.visitCopy}>
          <h2 id="visit-title">탁심 여행 동선에 넣기</h2>
          <p>탁심 광장, 이스티클랄 거리와 지한기르에서 걸어서 도착할 수 있는 베요글루 잠박 거리의 역사적인 공간입니다. 주말이나 단체 방문은 좌석 상황을 미리 확인하세요.</p>
        </div>
        <dl className={styles.visitFacts}>
          <div><dt>주소</dt><dd>{displayAddress}</dd></div>
          <div><dt>영업시간</dt><dd>매일 {openingHours.opens}–{openingHours.closes}</dd></div>
          <div><dt>대표 메뉴</dt><dd>전통 반 아침 식사, 발 카이막, 무르투아, 카부트, 따뜻한 달걀 팬</dd></div>
        </dl>
        <div className={styles.visitActions}>
          <a href={mapsUrl} target="_blank" rel="noopener noreferrer"><MapPin size={16} aria-hidden="true" /> Google 지도에서 길찾기</a>
          <Link href="/en/menu" hrefLang="en">현재 메뉴와 가격</Link>
        </div>
      </section>

      <section className={styles.faq} aria-labelledby="ko-faq-title">
        <h2 id="ko-faq-title">방문 전에 자주 묻는 질문</h2>
        <div>{faq.map((item) => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</div>
      </section>

      <footer className={styles.footer}>
        <Link className={styles.brand} href="/ko"><Image src="/images/brand-icon-small.png" alt="" width={38} height={48} /><span>{siteName} <small>· 1978년부터 이어온 반 아침 식사</small></span></Link>
        <nav aria-label="하단 메뉴"><Link href="/">Türkçe</Link><Link href="/en" hrefLang="en">English</Link><Link href="/en/menu" hrefLang="en">메뉴</Link><a href={mapsUrl} target="_blank" rel="noopener noreferrer">길찾기</a></nav>
      </footer>
    </main>
  );
}
