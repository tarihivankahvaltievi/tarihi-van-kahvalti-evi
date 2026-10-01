import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { absoluteUrl, buildRestaurantJsonLd, displayAddress, displayPhone, jsonLd, koreanUrl, mapsUrl, openingHours, siteName, siteUrl, telUrl } from "../../../seo";
import styles from "./tour-guide.module.css";

const path = "/ko/blog/korean-tour-guide-van-breakfast";
const url = `${siteUrl}${path}`;
const title = "한국어 투어 가이드를 위한 이스탄불 반식 아침 식사 | Tarihi Van Kahvaltı Evi";
const description = "이스탄불 한국인 투어 가이드와 단체 인솔자를 위한 반식 아침 식사 안내. 1978년 가족의 이야기, 반 허브 치즈와 다양한 메네멘, 탁심 동선, 예약 전 확인 사항을 한국어로 소개합니다.";
const image = absoluteUrl("/images/hero-parallax/overhead-feast.webp");
const published = "2026-09-28T12:00:00+03:00";
const faqs = [
  { q: "한국인 여행 단체가 방문하기 좋은 이유는 무엇인가요?", a: "탁심·이스티클랄 거리 여행 동선에 넣기 쉬운 베요글루 잠박 거리에 있고, 반식 아침상과 따뜻한 메네멘을 한곳에서 소개할 수 있습니다. 단체 좌석과 제공 가능 메뉴는 방문 전에 전화로 확인해 주세요." },
  { q: "어떤 치즈를 맛볼 수 있나요?", a: "메뉴의 반식 아침상에는 반 허브 치즈(otlu Van peyniri)가 포함되며, 구성에 따라 흰 치즈, 땋은 치즈, 마을 치즈와 신선한 치즈도 만날 수 있습니다. 주문 전 현재 메뉴에서 구성과 재고를 확인하세요." },
  { q: "메네멘은 어떤 종류가 있나요?", a: "현재 메뉴에는 기본, 버섯, 치즈, 수죽, 카부르마, 파스트르마 메네멘이 있습니다. 달걀과 토마토를 바탕으로 조리해 따뜻하게 내며, 종류별 제공 여부는 당일 확인이 필요합니다." },
  { q: "채식이나 알레르기 요청은 어떻게 전달하나요?", a: "기본·버섯·치즈 메네멘 등 메뉴 선택지는 있지만 달걀·유제품·글루텐과 조리 공간의 교차 접촉 여부는 현장에서 확인해야 합니다. 수죽·카부르마·파스트르마에는 육류가 들어갑니다." },
  { q: "영업시간과 위치는 어디인가요?", a: `주소는 ${displayAddress}이며 표시된 영업시간은 매일 ${openingHours.opens}–${openingHours.closes}입니다. 공휴일 또는 단체 방문 전에는 전화로 최신 정보를 확인하세요.` },
];

export const metadata: Metadata = {
  title: { absolute: title }, description,
  keywords: ["이스탄불 한국어 투어 가이드 아침 식사", "한국인 단체 이스탄불 조식", "탁심 반 아침 식사", "반 허브 치즈", "이스탄불 메네멘", "베요글루 터키식 아침 식사"],
  alternates: { canonical: url },
  openGraph: { type: "article", locale: "ko_KR", url, siteName, title, description, images: [{ url: image, alt: "Tarihi Van Kahvaltı Evi의 반식 아침 식탁" }] },
  twitter: { card: "summary_large_image", title, description, images: [image] },
};

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    buildRestaurantJsonLd(false),
    { "@type": "BlogPosting", "@id": `${url}#article`, mainEntityOfPage: { "@id": `${url}#webpage` }, headline: title, description, inLanguage: "ko-KR", datePublished: published, dateModified: published, image: [image], author: { "@type": "Organization", name: siteName, url: siteUrl }, publisher: { "@id": `${siteUrl}/#restaurant` }, about: [{ "@type": "Thing", name: "Van kahvaltısı", sameAs: "https://ci.turkpatent.gov.tr/Files/GeographicalSigns/26210cd7-fc2e-44fa-869e-889ee83c71f2.pdf" }, { "@type": "Thing", name: "Van Otlu Peyniri", sameAs: "https://ci.turkpatent.gov.tr/Files/GeographicalSigns/5c08a8d5-8481-48a9-911e-8a5a1b3186b2.pdf" }], mentions: [{ "@type": "Thing", name: "Menemen" }, { "@type": "Place", name: "Beyoğlu" }] },
    { "@type": "WebPage", "@id": `${url}#webpage`, url, name: title, description, inLanguage: "ko-KR", isPartOf: { "@id": `${siteUrl}/#website` }, breadcrumb: { "@id": `${url}#breadcrumb` } },
    { "@type": "BreadcrumbList", "@id": `${url}#breadcrumb`, itemListElement: [{ "@type": "ListItem", position: 1, name: "한국어 홈", item: koreanUrl }, { "@type": "ListItem", position: 2, name: "한국어 투어 가이드 아침 식사", item: url }] },
    { "@type": "FAQPage", "@id": `${url}#faq`, mainEntity: faqs.map(({ q, a }) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) },
  ],
};

export default function KoreanTourGuideBreakfastPage() {
  return <main className={styles.page} lang="ko">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} />
    <nav className={styles.top} aria-label="한국어 탐색"><Link href="/ko">Tarihi Van Kahvaltı Evi</Link><Link href="/ko">한국어 홈</Link><Link href="/en/menu" hrefLang="en">현재 메뉴</Link></nav>
    <article>
      <header className={styles.hero}>
        <div className={styles.heroText}><p className={styles.eyebrow}>KOREAN TOUR GUIDE FIELD GUIDE · ISTANBUL</p><h1>한국어 투어 가이드를 위한<br/><em>반의 아침 식탁</em></h1><p className={styles.lead}>탁심에서 여행을 시작하는 한국인 손님에게 어떤 아침을 소개할까요? Tarihi Van Kahvaltı Evi의 가족 이야기, 여러 치즈의 맛, 갓 조리한 메네멘과 단체 방문에 필요한 실무 정보를 한 장에 담았습니다.</p><div className={styles.actions}><a href={mapsUrl} target="_blank" rel="noopener noreferrer">지도에서 위치 보기 ↗</a><Link href="/en/menu" hrefLang="en">현재 메뉴 보기 ↗</Link></div><p className={styles.date}>Tarihi Van Kahvaltı Evi 편집팀 · 2026년 9월 28일</p></div>
        <Image src="/images/hero-parallax/overhead-feast.webp" alt="치즈, 달걀 요리, 빵과 차가 놓인 반식 아침 식탁" width={1000} height={1100} priority className={styles.heroImage} />
      </header>
      <div className={styles.wrap}>
        <aside className={styles.summary}><strong>가이드용 한 문장 소개</strong><p>“1978년부터 이어온 가족의 반식 아침 문화를, 탁심 근처 베요글루의 역사적인 공간에서 치즈·따뜻한 달걀 요리·차를 나누며 경험하는 곳입니다.”</p></aside>
        <nav className={styles.contents} aria-label="이 글의 목차"><a href="#story">우리 이야기</a><a href="#cheese">치즈</a><a href="#menemen">메네멘</a><a href="#plan">단체 방문</a><a href="#visit">위치와 문의</a></nav>
        <section id="story"><p className={styles.eyebrow}>01 · OUR STORY</p><h2>왜 이곳에 와야 할까요?</h2><p>이스탄불에는 아침 식사 선택지가 많습니다. 저희가 한국 손님에게 보여드리고 싶은 것은 한 접시의 유행 음식보다 넓은 반(Van) 지역의 식탁입니다. 가족이 1978년부터 이어 온 환대 속에 허브 치즈, 무르투아, 카부트, 꿀과 카이막, 빵과 차를 함께 놓습니다. 여러 접시를 조금씩 나누는 방식은 가이드가 지역 음식의 차이를 설명하기에도 좋습니다.</p><p>매장은 탁심 광장과 이스티클랄 거리에서 걸어갈 수 있는 베요글루 잠박 거리에 있습니다. 아침 관광 전 식사 지점으로 동선을 짜기 쉽지만, 도보 시간은 출발 위치와 교통 상황에 따라 달라집니다. 건물의 역사적인 분위기와 식탁의 지역성을 함께 경험할 수 있습니다.</p><div className={styles.callout}>가이드 설명 포인트: “터키식 아침 식사”는 한 가지 요리가 아닙니다. 반식 아침상은 그 넓은 문화 안에서 허브 치즈·무르투아·카부트 같은 반 지역의 맛을 소개합니다.</div></section>
        <section id="cheese"><p className={styles.eyebrow}>02 · CHEESE TASTING</p><h2>반 허브 치즈부터, 질감이 다른 치즈까지</h2><p>반 허브 치즈(otlu Van peyniri)는 향긋한 허브와 짭짤한 풍미로 식탁의 중심을 잡습니다. 한국 손님에게는 꿀·카이막의 단맛을 맛본 뒤 이 치즈로 넘어가 보라고 안내해 주세요. 맛의 대비가 선명해집니다. <a href="https://ci.turkpatent.gov.tr/Files/GeographicalSigns/5c08a8d5-8481-48a9-911e-8a5a1b3186b2.pdf" target="_blank" rel="noopener noreferrer">TÜRKPATENT의 Van Otlu Peyniri 등록 문서 ↗</a>에서 지역 음식의 배경을 확인할 수 있습니다. 메뉴의 치즈가 특정 인증 요건을 충족한다는 별도 증명으로 해석하지는 마세요.</p><div className={styles.cards}><div><h3>Otlu Van peyniri</h3><p>허브 향이 특징인 반식 치즈. 빵, 채소, 뜨거운 차와 함께 맛보세요.</p></div><div><h3>Beyaz &amp; örgü peyniri</h3><p>흰 치즈와 땋은 치즈는 모양과 씹는 질감을 비교하기 좋습니다.</p></div><div><h3>Köy &amp; taze peynir</h3><p>마을 치즈와 신선한 치즈도 메뉴 구성에 따라 제공됩니다. 실제 제공 종류는 주문 전 확인하세요.</p></div></div><p>반식 아침상과 다른 세트는 치즈 구성이 다를 수 있습니다. 정확한 구성과 가격은 <Link href="/en/menu" hrefLang="en">현재 메뉴</Link>를 기준으로 확인해 주세요.</p></section>
        <section id="menemen"><p className={styles.eyebrow}>03 · HOT PAN</p><h2>갓 나온 메네멘은 이렇게 소개하세요</h2><p>메네멘(menemen)은 토마토와 달걀을 바탕으로 팬에서 따뜻하게 내는 터키식 달걀 요리입니다. 여러 사람이 빵을 곁들여 나누면 차가운 치즈 접시와 온도 차이까지 경험할 수 있습니다. 저희 메뉴에는 다음 선택지가 있습니다.</p><div className={styles.menuGrid}>{[{name:"Sade",ko:"기본 메네멘",note:"토마토와 달걀의 기본 맛"},{name:"Mantarlı",ko:"버섯 메네멘",note:"버섯을 더한 선택"},{name:"Peynirli",ko:"치즈 메네멘",note:"치즈 풍미를 더한 선택"},{name:"Sucuklu",ko:"수죽 메네멘",note:"터키식 소시지를 더한 선택"},{name:"Kavurmalı",ko:"카부르마 메네멘",note:"고기 풍미가 있는 선택"},{name:"Pastırmalı",ko:"파스트르마 메네멘",note:"숙성 쇠고기를 더한 선택"}].map(item=><div key={item.name}><b>{item.ko}</b><small>{item.name} menemen</small><span>{item.note}</span></div>)}</div><p>고기를 피하는 손님에게는 기본·버섯·치즈 종류를 먼저 설명할 수 있습니다. 달걀·유제품 알레르기, 채식 기준, 할랄 요구 또는 조리 공간의 교차 접촉 여부는 주문 전에 직원에게 직접 확인해 주세요. 메뉴 및 재고는 달라질 수 있습니다.</p></section>
        <section id="plan"><p className={styles.eyebrow}>04 · GUIDE CHECKLIST</p><h2>한국인 단체 방문을 위한 실전 순서</h2><ol className={styles.steps}><li><b>방문 전</b><span>날짜, 도착 시간, 인원, 어린이 동반 여부를 전화로 알려 좌석 가능 여부를 확인하세요. 단체 전용 메뉴나 별도 서비스가 필요한 경우 미리 문의해 주세요.</span></li><li><b>메뉴 선택</b><span>반식 아침상으로 여러 지역 음식을 소개할지, 메네멘과 치즈를 중심으로 주문할지 손님 취향에 맞춰 정하세요. 가격과 구성은 실시간 메뉴를 확인하세요.</span></li><li><b>식탁에서</b><span>처음에는 허브 치즈와 빵, 이어서 따뜻한 메네멘·무르투아, 마지막에 꿀·카이막과 차 순서로 소개하면 맛을 비교하기 쉽습니다. 이는 추천 동선이며 정해진 코스는 아닙니다.</span></li><li><b>제한 식단</b><span>우유, 달걀, 밀, 견과류 및 육류 관련 제한은 미리 전달하고 재료와 교차 접촉 가능성을 당일 다시 확인하세요.</span></li></ol><div className={styles.callout}><b>가이드용 터키어 표현</b><p>“Grup için yer var mı?” — 단체 좌석이 있나요?<br/>“Menemende yumurta ve süt ürünü var mı?” — 메네멘에 달걀과 유제품이 있나요?<br/>“Güncel menüyü görebilir miyiz?” — 최신 메뉴를 볼 수 있나요?</p></div></section>
        <section id="visit"><p className={styles.eyebrow}>05 · VISIT</p><h2>탁심 일정에 바로 넣을 정보</h2><dl className={styles.facts}><div><dt>상호</dt><dd>{siteName}</dd></div><div><dt>주소</dt><dd>{displayAddress}</dd></div><div><dt>표시 영업시간</dt><dd>매일 {openingHours.opens}–{openingHours.closes}</dd></div><div><dt>전화</dt><dd><a href={telUrl}>{displayPhone}</a></dd></div></dl><p>공휴일 운영, 단체 좌석, 당일 메뉴 및 가격은 방문 전에 확인해 주세요. 예약이 자동 확정되는 것으로 안내하지 않습니다.</p><div className={styles.actions}><a href={mapsUrl} target="_blank" rel="noopener noreferrer">Google 지도에서 길찾기 ↗</a><a href={telUrl}>전화 문의 ↗</a><Link href="/en/menu" hrefLang="en">현재 메뉴·가격 ↗</Link></div></section>
        <section className={styles.faq}><p className={styles.eyebrow}>QUICK ANSWERS</p><h2>가이드가 자주 받는 질문</h2>{faqs.map(({q,a})=><details key={q}><summary>{q}</summary><p>{a}</p></details>)}</section>
        <section className={styles.sources}><h2>음식 배경과 관련 가이드</h2><p>음식의 지역적 배경은 <a href="https://ci.turkpatent.gov.tr/Files/GeographicalSigns/26210cd7-fc2e-44fa-869e-889ee83c71f2.pdf" target="_blank" rel="noopener noreferrer">TÜRKPATENT Van Kahvaltısı 등록 문서</a>와 <a href="https://ci.turkpatent.gov.tr/Files/GeographicalSigns/5c08a8d5-8481-48a9-911e-8a5a1b3186b2.pdf" target="_blank" rel="noopener noreferrer">Van Otlu Peyniri 등록 문서</a>를 참고했습니다. 매장 음식의 현재 구성은 자체 메뉴를 기준으로 설명했습니다.</p><p><Link href="/ko/blog/turkish-breakfast-istanbul">터키식 아침 식사 전체 가이드</Link> · <Link href="/ko/blog/istanbul-bal-kaymak">발 카이막 가이드</Link> · <Link href="/ko/blog/taksim-kahvalti-rehberi">탁심 아침 동선</Link></p></section>
      </div>
    </article>
  </main>;
}
