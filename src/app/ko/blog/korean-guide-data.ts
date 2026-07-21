import { kaymakSources, vanBreakfastSources } from "../../content-sources";
import type { GuideContent } from "../../components/international-breakfast-guide-data";

const koreanLanguageLinks = [
  { label: "한국어 홈", href: "/ko", hrefLang: "ko" },
  { label: "발 카이막", href: "/ko/blog/istanbul-bal-kaymak", hrefLang: "ko" },
  { label: "카이막이란", href: "/ko/blog/kaymak-nedir", hrefLang: "ko" },
  { label: "터키식 아침", href: "/ko/blog/turkish-breakfast-istanbul", hrefLang: "ko" },
];

const sharedDates = {
  published: "2026-07-22T00:30:00+03:00",
  modified: "2026-07-22T00:30:00+03:00",
  visible: "2026-07-22",
};

const sharedFooter = {
  note: "1978년부터 베요글루에서 이어온 전통 반 아침 식사.",
  home: "한국어 홈",
  menu: "영문 메뉴",
  directions: "길찾기",
};

export const kaymakExplainerGuide: GuideContent = {
  locale: "ko",
  languageTag: "ko-KR",
  direction: "ltr",
  path: "/ko/blog/kaymak-nedir",
  title: "카이막이란? 맛·먹는 법·발 카이막 완벽 가이드",
  description:
    "카이막은 무엇이고 어떤 맛일까요? 물소·소 카이막, 버터·생크림과의 차이, 꿀과 빵에 곁들이는 법, 이스탄불에서 주문하는 표현을 한국어로 설명합니다.",
  ogLocale: "ko_KR",
  ogAlternateLocales: ["en_GB", "tr_TR"],
  metadataKeywords: [
    "카이막 뜻",
    "카이막 맛",
    "카이막 먹는 법",
    "발 카이막",
    "터키 카이막",
    "튀르키예 카이막",
    "물소 카이막",
    "카이막 버터 차이",
    "이스탄불 카이막",
  ],
  metadataAlternates: {
    ko: "https://www.tarihivankahvaltievi.com/ko/blog/kaymak-nedir",
  },
  languageLinks: koreanLanguageLinks,
  hero: {
    note: "한국인 여행자를 위한 카이막 사전",
    title: "카이막,",
    accent: "우유가 만든 부드러운 층.",
    lead:
      "카이막(kaymak)은 우유를 천천히 가열한 뒤 표면에 생긴 진한 크림층을 모아 만드는 유제품입니다. 버터처럼 짜지 않고 휘핑크림처럼 가볍지도 않습니다. 터키의 아침 식탁에서는 꿀을 뜻하는 발(bal)과 따뜻한 빵을 곁들인 ‘발 카이막’으로 자주 만납니다.",
    readLabel: "1분 요약부터 읽기",
    menuLabel: "현재 발 카이막 메뉴 보기",
    imageAlt: "꿀과 버팔로 카이막이 빵, 차와 함께 놓인 터키식 아침 식탁",
    imageCaption: "카이막의 담백한 고소함에 꿀의 향을 더하는 것이 발 카이막의 핵심입니다.",
  },
  nav: {
    label: "이 가이드에서",
    answer: "카이막 정의",
    table: "핵심 8가지",
    choose: "여행 전 확인",
    visit: "이스탄불에서 맛보기",
    faq: "질문과 답",
  },
  shortAnswer: {
    label: "1분 요약",
    title: "카이막은 크림일까요, 버터일까요?",
    paragraphs: [
      "카이막은 우유의 지방과 단백질이 농축된 부드러운 유제품입니다. 제조 방식과 원유에 따라 색, 향, 지방감과 질감이 달라질 수 있습니다. 일반적으로 버터처럼 소금 맛이 강하지 않고, 생크림보다 조밀하며 입안에서 천천히 녹는 느낌이 납니다.",
      "‘발 카이막(bal kaymak)’에서 발은 터키어로 꿀을 뜻합니다. 카이막 자체를 달게 만드는 이름이 아니라, 담백한 카이막과 향긋한 꿀을 한 접시에서 함께 먹는 조합을 가리킵니다. 따뜻한 빵이나 피시(pişi)에 카이막을 먼저 얹고 꿀을 소량 더하면 두 재료의 맛을 구분하기 쉽습니다.",
      "물소유로 만든 카이막과 우유로 만든 카이막은 모두 존재합니다. 튀르키예 문화 포털은 등록된 아피온 카이막을 설명하면서 물소유 제품이 더 희고 지방감이 높으며, 우유 제품은 조금 더 노란빛을 띨 수 있다고 안내합니다. 다만 모든 ‘카이막’이 물소유인 것은 아니므로 매장에서 원유를 확인하는 편이 정확합니다.",
      "카이막은 한국에서 흔히 디저트로 소개되지만, 터키에서는 꿀·잼·치즈·올리브·달걀·차와 나란히 놓이는 아침 식사의 일부이기도 합니다. 그래서 현지에서는 카이막 한 접시만 보기보다 전체 카흐발트(kahvaltı) 식탁 안에서 맛의 대비를 경험하는 것이 좋습니다.",
    ],
  },
  travelerBrief: {
    label: "맛과 질감",
    title: "처음 먹기 전에 알아둘 네 가지",
    intro:
      "카이막의 맛은 원유와 제조법, 신선도에 따라 달라집니다. 아래 설명은 하나의 절대적인 맛을 약속하기보다 주문할 때 확인해야 할 기준을 정리한 것입니다.",
    facts: [
      { label: "터키어", value: "kaymak(카이막), bal(꿀), bal kaymak(꿀과 카이막)" },
      { label: "기본 질감", value: "생크림보다 조밀하고 버터보다 부드럽게 느껴지는 층상 크림" },
      { label: "대표 조합", value: "꿀, 따뜻한 빵, 피시, 잼과 함께 아침 식탁에서 제공" },
      { label: "알레르기", value: "우유로 만든 유제품이므로 유제품 알레르기·불내증은 주문 전에 확인" },
    ],
    comparison: {
      title: "카이막·버터·생크림 비교",
      columns: ["음식", "질감", "맛과 쓰임"],
      rows: [
        { name: "카이막", texture: "조밀하고 매끄럽거나 얇은 층이 느껴짐", taste: "담백하고 진한 우유 풍미. 꿀·빵·디저트와 곁들임" },
        { name: "버터", texture: "차가울 때 단단하고 열에 녹음", taste: "제품에 따라 소금 맛이 있으며 빵과 조리에 널리 사용" },
        { name: "생크림", texture: "액체 또는 공기를 넣어 가볍게 휘핑", taste: "카이막보다 가벼우며 케이크·음료·소스에 자주 사용" },
      ],
    },
    phrases: {
      title: "매장에서 바로 쓰는 터키어",
      intro: "원유와 당일 제공 여부가 궁금하다면 아래 문장을 직원에게 보여 주세요.",
      items: [
        { turkish: "Bu kaymak manda sütünden mi?", translation: "이 카이막은 물소유로 만들었나요?" },
        { turkish: "Bal kaymak var mı?", translation: "발 카이막이 있나요?" },
        { turkish: "Ayrı servis eder misiniz?", translation: "따로 담아 주실 수 있나요?" },
        { turkish: "Süt ürünlerine alerjim var.", translation: "유제품 알레르기가 있습니다." },
      ],
    },
  },
  table: {
    title: "카이막을 이해하는 핵심 8가지",
    intro:
      "검색할 때 가장 많이 궁금해하는 정의, 맛, 원유, 먹는 법을 짧은 답으로 나눴습니다.",
    items: [
      { name: "무엇인가요?", role: "우유에서 얻는 농축 유제품", description: "우유를 가열하고 식히는 과정에서 표면에 형성된 진한 층을 모아 만듭니다. 지역과 생산자에 따라 세부 공정은 다를 수 있습니다." },
      { name: "어떤 맛인가요?", role: "담백하고 진한 우유 풍미", description: "설탕을 넣은 크림처럼 강하게 달기보다 고소하고 부드럽습니다. 발 카이막의 단맛은 주로 함께 내는 꿀에서 옵니다." },
      { name: "물소 카이막인가요?", role: "원유는 제품마다 다름", description: "물소유 카이막이 유명하지만 소의 우유로도 만듭니다. 이름만으로 단정하지 말고 메뉴 설명이나 직원에게 원유를 확인하세요." },
      { name: "왜 꿀과 먹나요?", role: "담백함과 향긋한 단맛의 대비", description: "카이막의 지방감이 꿀의 향을 오래 머물게 하고, 꿀은 카이막의 담백함에 선명한 단맛을 더합니다." },
      { name: "어떤 빵이 맞나요?", role: "따뜻하고 담백한 빵", description: "신선한 빵, 피시, 바삭한 시미트나 지역 빵과 잘 어울립니다. 빵이 너무 달지 않아야 꿀과 카이막의 차이가 잘 느껴집니다." },
      { name: "디저트인가요?", role: "아침 식사이자 디저트의 곁들임", description: "터키식 아침에는 꿀과 함께, 다른 때에는 바클라바나 우유 디저트 같은 단 음식의 곁들임으로도 사용됩니다." },
      { name: "어떻게 보관하나요?", role: "신선한 유제품", description: "구매 제품은 포장지의 냉장 보관과 소비기한 안내를 따르세요. 여행 중 상온에 오래 두지 않는 것이 안전합니다." },
      { name: "누가 주의해야 하나요?", role: "유제품 알레르기와 식단", description: "우유 알레르기나 유당 관련 제한이 있다면 먹기 전에 재료와 교차 접촉 가능성을 매장에 직접 확인해야 합니다." },
    ],
  },
  tradition: {
    title: "‘천상의 맛’보다 정확하게 이해하기",
    paragraphs: [
      "한국에서는 방송과 여행 콘텐츠를 통해 카이막이 ‘천상의 맛’이라는 표현으로 널리 알려졌습니다. 기대를 높이는 별명은 흥미롭지만, 실제 카이막의 매력은 강한 설탕 맛보다 우유의 농축된 고소함, 조밀한 질감, 꿀과 빵 사이의 균형에 있습니다.",
      "좋은 첫 경험을 위해서는 카이막만 작은 양으로 먼저 맛본 뒤, 꿀을 조금씩 더해 보세요. 처음부터 모두 섞으면 원유 향과 카이막 고유의 담백함을 구분하기 어렵습니다. 그다음 따뜻한 빵, 짭짤한 치즈, 터키 차를 번갈아 먹으면 식탁 전체의 리듬이 보입니다.",
      "아피온 카이막처럼 지리적 표시로 등록된 특정 지역 제품과, 일반적인 메뉴명으로 제공되는 카이막은 같은 표현 안에서도 범위가 다릅니다. 이스탄불의 식당에서 카이막을 주문할 때 특정 지리적 표시 제품이라고 가정하지 않고 원유와 출처를 묻는 것이 가장 정확합니다.",
    ],
    imageAlt: "숟가락으로 질감을 확인할 수 있는 카이막과 꿀의 가까운 사진",
    caption: "먼저 카이막만, 다음 한입에 꿀을 조금—비율을 바꾸며 맛을 비교해 보세요.",
  },
  reasons: {
    title: "여행자가 확인하면 좋은 것",
    intro:
      "카이막은 신선도와 원유, 제공 방식에 따라 경험이 달라질 수 있습니다. 유명하다는 말보다 실제 메뉴와 당일 정보를 먼저 보세요.",
    items: [
      { title: "원유", text: "물소유인지 우유인지 궁금하다면 직접 물어보세요. 모든 카이막이 물소유라는 가정은 정확하지 않습니다." },
      { title: "제공 방식", text: "꿀과 카이막이 따로 나오는지, 이미 섞여 있는지 확인하면 단맛을 스스로 조절하기 쉽습니다." },
      { title: "빵의 종류", text: "따뜻한 빵이나 피시가 함께 있으면 질감과 온도의 대비가 커집니다. 메뉴에서 함께 주문할 수 있는지 보세요." },
      { title: "현재 가격", text: "환율과 원재료 비용으로 가격이 바뀔 수 있으므로 오래된 후기보다 매장의 실시간 메뉴를 기준으로 계획하세요." },
      { title: "알레르기", text: "유제품, 글루텐, 견과류 등 제한이 있다면 주문 전에 당일 재료와 주방의 교차 접촉 가능성을 확인하세요." },
      { title: "전체 아침 식사", text: "발 카이막만 먹는 것도 가능하지만 치즈, 올리브, 달걀, 차와 함께 맛보면 터키 아침 식사의 맥락을 더 잘 이해할 수 있습니다." },
    ],
  },
  firstVisit: {
    title: "발 카이막을 맛보는 순서",
    intro: "정답은 없지만, 아래 순서로 먹으면 카이막과 꿀의 차이를 선명하게 느낄 수 있습니다.",
    steps: [
      { title: "카이막만 한입", text: "차가운 상태의 향, 지방감과 질감을 먼저 확인합니다." },
      { title: "꿀을 소량 더하기", text: "꿀을 한꺼번에 붓지 않고 한입마다 양을 바꿉니다." },
      { title: "따뜻한 빵에 올리기", text: "빵의 온기가 카이막을 부드럽게 풀어 주는 변화를 느껴 보세요." },
      { title: "짠 음식으로 전환", text: "치즈나 올리브를 사이에 먹어 단맛을 환기합니다." },
      { title: "차로 마무리", text: "따뜻한 터키 차와 함께 천천히 다음 접시로 넘어갑니다." },
    ],
  },
  practical: {
    title: "이스탄불에서 발 카이막 맛보기",
    text:
      "Tarihi Van Kahvaltı Evi는 베요글루 잠박 거리에서 매일 08:00–18:00에 운영합니다. 현재 메뉴에는 체에 거른 꿀, 버팔로 카이막, 계절 수제 잼 2종 구성이 있으며, 가격과 당일 제공 여부는 방문 전에 실시간 영문 메뉴에서 확인할 수 있습니다.",
    labels: { address: "주소", hours: "영업시간", route: "Google 지도에서 길찾기", menu: "현재 메뉴와 가격", call: "전화하기" },
  },
  faq: {
    title: "카이막 질문과 짧은 답",
    items: [
      { question: "카이막은 무엇으로 만드나요?", answer: "우유를 가열하고 식히며 표면에 형성되는 진한 지방·단백질층을 모아 만듭니다. 물소유나 소의 우유 등 원유와 세부 제조법에 따라 결과가 달라집니다." },
      { question: "카이막은 달콤한가요?", answer: "카이막 자체는 대체로 담백하고 고소합니다. 발 카이막으로 먹을 때 느끼는 뚜렷한 단맛은 함께 제공되는 꿀에서 옵니다." },
      { question: "발 카이막에서 ‘발’은 무슨 뜻인가요?", answer: "터키어 bal은 꿀을 뜻합니다. 따라서 bal kaymak은 꿀과 카이막을 함께 먹는 조합입니다." },
      { question: "카이막과 버터는 같은가요?", answer: "같지 않습니다. 둘 다 우유 지방이 중요하지만 제조 과정과 수분, 질감, 쓰임이 다릅니다. 카이막은 보통 버터보다 부드럽고 짠맛이 없습니다." },
      { question: "카이막과 클로티드 크림은 같은가요?", answer: "영어 메뉴에서는 이해를 돕기 위해 clotted cream으로 번역하는 경우가 많지만, 지역별 원유와 제조법이 달라 맛과 질감이 완전히 동일하다고 단정하기는 어렵습니다." },
      { question: "모든 카이막은 물소유로 만드나요?", answer: "아닙니다. 물소유 카이막이 유명하지만 소의 우유로 만든 제품도 있습니다. 정확한 원유는 제품 표시나 매장에 확인하세요." },
      { question: "카이막은 아침에만 먹나요?", answer: "아침에는 꿀과 빵에 곁들이고, 다른 시간에는 바클라바나 여러 터키 디저트와 함께 먹기도 합니다." },
      { question: "이스탄불에서 발 카이막을 어떻게 주문하나요?", answer: "‘Bal kaymak var mı?’라고 물으면 ‘발 카이막이 있나요?’라는 뜻입니다. 메뉴와 당일 제공 여부를 함께 확인하세요." },
    ],
  },
  sources: {
    title: "공식 자료와 편집 기준",
    note:
      "카이막의 지역적 특성과 터키 아침 식사 속 역할은 TÜRKPATENT, 튀르키예 문화 포털과 GoTürkiye의 공개 자료를 교차 확인했습니다. 특정 매장의 원유와 현재 구성은 공식 메뉴 정보로 구분했습니다.",
    items: [
      { label: "TÜRKPATENT — 아피온 카이막 지리적 표시 등록 제115호", url: kaymakSources.afyonKaymakRegistration },
      { label: "튀르키예 문화 포털 — 아피온 카이막의 원유와 쓰임", url: kaymakSources.afyonKaymakCulturePortal },
      { label: "GoTürkiye — 터키식 아침 식사와 발 카이막", url: kaymakSources.turkishBreakfastGoTurkiye },
      { label: "GoTürkiye İstanbul — 이스탄불 아침 식사 문화", url: kaymakSources.istanbulBreakfastGoTurkiye },
    ],
  },
  closing: {
    title: "이제 이름보다 맛의 구조가 보입니다.",
    text: "카이막만 먼저, 꿀은 조금씩, 따뜻한 빵과 짭짤한 접시는 번갈아—이스탄불의 아침 식탁에서 직접 비교해 보세요.",
    menu: "현재 메뉴 확인",
    directions: "매장 길찾기",
  },
  footer: sharedFooter,
  updatedLabel: "마지막 검토",
  dateLabel: "2026년 7월 22일",
  authorLabel: "Tarihi Van Kahvaltı Evi 편집팀",
  dates: sharedDates,
  breadcrumbs: { aria: "경로", home: "한국어 홈", current: "카이막이란" },
  media: {
    hero: "/images/blog/bal-kaymak-close-up.webp",
    article: "/images/blog/istanbul-bal-kaymak.webp",
    og: "/images/og/istanbul-bal-kaymak.jpg",
  },
  seo: {
    articleSection: "카이막 정의와 발 카이막 먹는 법",
    entityRefs: [
      { name: "카이막", sameAs: kaymakSources.afyonKaymakCulturePortal },
      { name: "아피온 카이막", sameAs: kaymakSources.afyonKaymakRegistration },
      { name: "터키식 아침 식사", sameAs: kaymakSources.turkishBreakfastGoTurkiye },
      { name: "이스탄불", type: "Place", sameAs: kaymakSources.istanbulBreakfastGoTurkiye },
    ],
    mentions: ["발 카이막", "물소 카이막", "꿀", "피시", "터키 차"],
    menuItem: {
      name: "꿀, 버팔로 카이막과 수제 잼",
      description: "체에 거른 꿀, 버팔로 카이막, 계절에 따라 준비하는 수제 잼 2종",
      url: "/en/menu#bal-kaymak-recel",
    },
  },
  relatedGuides: [
    { label: "먹으러 가기", title: "이스탄불 발 카이막 맛집 가이드", description: "탁심 근처 위치, 메뉴 구성, 먹는 순서와 방문 정보를 한 번에 확인하세요.", href: "/ko/blog/istanbul-bal-kaymak" },
    { label: "한 상 이해하기", title: "이스탄불 터키식 아침 식사 가이드", description: "카흐발트와 반 아침 식사의 대표 메뉴, 주문법과 여행 팁을 정리했습니다.", href: "/ko/blog/turkish-breakfast-istanbul" },
  ],
};

export const turkishBreakfastKoreanGuide: GuideContent = {
  locale: "ko",
  languageTag: "ko-KR",
  direction: "ltr",
  path: "/ko/blog/turkish-breakfast-istanbul",
  title: "이스탄불 터키식 아침 식사: 탁심 카흐발트 가이드",
  description:
    "이스탄불 터키식 아침 식사 카흐발트와 반 아침 식사를 한국어로 안내합니다. 발 카이막, 허브 치즈, 무르투아, 주문법, 탁심 위치와 영업시간을 확인하세요.",
  ogLocale: "ko_KR",
  ogAlternateLocales: ["en_GB", "tr_TR"],
  metadataKeywords: [
    "이스탄불 터키식 아침 식사",
    "터키식 아침식사",
    "탁심 아침 식사",
    "이스탄불 아침 맛집",
    "카흐발트",
    "반 아침 식사",
    "이스탄불 카이막",
    "탁심 카이막",
    "베요글루 아침 식사",
  ],
  metadataAlternates: {
    ko: "https://www.tarihivankahvaltievi.com/ko/blog/turkish-breakfast-istanbul",
    en: "https://www.tarihivankahvaltievi.com/en/blog/turkish-breakfast-istanbul",
    ru: "https://www.tarihivankahvaltievi.com/ru/blog/turetskiy-zavtrak-stambul",
    ar: "https://www.tarihivankahvaltievi.com/ar/blog/turkish-breakfast-istanbul",
    "x-default": "https://www.tarihivankahvaltievi.com/en/blog/turkish-breakfast-istanbul",
  },
  languageLinks: koreanLanguageLinks,
  hero: {
    note: "탁심에서 시작하는 이스탄불 미식 여행",
    title: "터키식 아침 식사,",
    accent: "한 접시가 아니라 한 상.",
    lead:
      "카흐발트(kahvaltı)는 치즈, 올리브, 채소, 달걀, 잼, 꿀과 카이막, 따뜻한 빵, 차를 한 상에 놓고 함께 나누는 터키의 아침 식사입니다. 이스탄불 탁심 근처에서는 반(Van) 지역의 허브 치즈, 무르투아, 카부트까지 더한 뚜렷한 지역식 아침을 경험할 수 있습니다.",
    readLabel: "카흐발트부터 알아보기",
    menuLabel: "현재 영문 메뉴와 가격",
    imageAlt: "이스탄불 베요글루에서 치즈, 발 카이막, 달걀, 빵과 차를 함께 차린 터키식 반 아침 식사",
    imageCaption: "달고 짠 작은 접시를 번갈아 맛보고 차를 계속 나누는 것이 터키식 아침의 리듬입니다.",
  },
  nav: {
    label: "이 가이드에서",
    answer: "카흐발트란",
    table: "대표 메뉴",
    choose: "반 아침 식사",
    visit: "탁심 방문 정보",
    faq: "자주 묻는 질문",
  },
  shortAnswer: {
    label: "먼저, 핵심만",
    title: "터키식 아침 식사 카흐발트란?",
    paragraphs: [
      "터키어 ‘kahvaltı’는 아침 식사를 뜻합니다. 대표적인 세르프메 카흐발트(serpme kahvaltı)는 여러 작은 접시를 식탁 전체에 펼쳐 놓는 공유 방식입니다. 치즈, 올리브, 토마토와 오이, 달걀 요리, 잼, 꿀과 카이막, 빵과 차가 기본 축을 이룹니다.",
      "먹는 순서는 정해져 있지 않습니다. 짭짤한 치즈 다음에 꿀과 카이막을 올린 빵을 먹고, 뜨거운 메네멘이나 달걀 팬을 나눈 뒤 차로 입안을 정리하는 식입니다. 한 접시를 끝내고 다음으로 넘어가기보다 맛과 온도를 오가는 경험에 가깝습니다.",
      "반 아침 식사는 이 넓은 터키 아침 문화의 지역적 형태입니다. 반 허브 치즈, 밀가루·버터·달걀로 만드는 무르투아, 볶은 곡물 풍미의 카부트, 걸쭉한 반식 자즉과 케테 같은 메뉴가 지역의 성격을 보여 줍니다. TÜRKPATENT는 반 아침 식사를 지리적 표시 제504호로 등록하고 있습니다.",
      "Tarihi Van Kahvaltı Evi는 1978년부터 이어온 가족의 반 아침 식사 문화를 베요글루 잠박 거리에서 선보입니다. 탁심 광장, 이스티클랄 거리와 지한기르에서 걸어서 이동할 수 있어 오전 여행 동선에 넣기 좋습니다.",
    ],
  },
  travelerBrief: {
    label: "방문 전 한눈에",
    title: "주문·시간·위치 핵심 정보",
    intro: "가격과 당일 구성은 바뀔 수 있으므로 현재 메뉴를 기준으로 하고, 아래 정보로 방문 동선을 준비하세요.",
    facts: [
      { label: "서비스 방식", value: "전통 반 아침 식사는 최소 2인부터 공유식으로 제공" },
      { label: "대표적인 맛", value: "반 허브 치즈, 무르투아, 카부트, 발 카이막, 따뜻한 달걀 팬" },
      { label: "위치", value: "Zambak Sk. No:8, Şehit Muhtar, Beyoğlu, İstanbul" },
      { label: "영업시간", value: "매일 08:00–18:00" },
    ],
    comparison: {
      title: "일반 호텔 조식·카페 브런치·반 아침 식사",
      columns: ["형태", "구성", "경험"],
      rows: [
        { name: "호텔 조식", texture: "뷔페 또는 개인 접시", taste: "익숙한 메뉴를 빠르게 선택하기 쉬움" },
        { name: "카페 브런치", texture: "한두 가지 메인 접시", taste: "달걀·토스트 중심으로 개인 주문" },
        { name: "반 아침 식사", texture: "여러 지역 음식을 한 상에 공유", taste: "단맛·짠맛·뜨거운 팬·차를 천천히 오감" },
      ],
    },
    phrases: {
      title: "주문할 때 유용한 터키어",
      intro: "직원에게 화면을 보여 주거나 메뉴 이름을 그대로 말해도 됩니다.",
      items: [
        { turkish: "İki kişilik Van kahvaltısı, lütfen.", translation: "2인용 반 아침 식사 부탁합니다." },
        { turkish: "Bal kaymak var mı?", translation: "발 카이막이 있나요?" },
        { turkish: "Sucuksuz olsun, lütfen.", translation: "수주크는 빼 주세요." },
        { turkish: "Hesap, lütfen.", translation: "계산서 부탁합니다." },
      ],
    },
  },
  table: {
    title: "터키·반 아침 식탁의 대표 메뉴",
    intro:
      "당일 구성은 계절과 준비 상황에 따라 달라질 수 있습니다. 아래 목록은 식탁에서 메뉴 이름을 알아보고 맛의 역할을 이해하기 위한 안내입니다.",
    items: [
      { name: "반 허브 치즈", role: "지역의 향을 보여 주는 치즈", description: "여러 지역 허브가 들어가 향이 뚜렷합니다. 토마토, 따뜻한 빵과 차 사이에서 짭짤한 중심을 만듭니다." },
      { name: "발 카이막", role: "꿀과 카이막의 달콤한 조합", description: "담백하고 진한 카이막에 꿀을 곁들입니다. 따뜻한 빵이나 피시에 올려 먹고, 짠 치즈와 번갈아 맛보세요." },
      { name: "무르투아", role: "버터·밀가루·달걀의 뜨거운 메뉴", description: "버터에 밀가루를 볶고 달걀을 더하는 반 지역 음식입니다. 팬이 따뜻할 때 작은 양부터 나눠 먹는 것이 좋습니다." },
      { name: "카부트", role: "볶은 곡물의 구수한 풍미", description: "볶은 곡물과 버터의 고소함이 특징입니다. 꿀이나 페크메즈를 곁들이면 단맛과 구수함의 층이 생깁니다." },
      { name: "반식 자즉", role: "걸쭉하고 허브 향이 나는 상쾌함", description: "일반적으로 마시는 자즉보다 진한 질감으로, 요거트와 신선한 허브가 뜨거운 팬 요리 사이를 가볍게 이어 줍니다." },
      { name: "메네멘과 달걀 팬", role: "식탁의 따뜻한 중심", description: "토마토·고추·달걀을 익힌 메네멘이나 수주크·카부르마를 넣은 달걀 요리가 뜨겁게 제공됩니다." },
      { name: "케테·피시·빵", role: "치즈와 소스를 담는 바탕", description: "결이 있는 케테, 갓 튀긴 피시와 따뜻한 빵을 치즈, 꿀, 카이막과 팬 요리에 각각 곁들입니다." },
      { name: "터키 차", role: "식사의 속도를 만드는 음료", description: "튤립 모양 잔에 담긴 차를 여러 번 나누며 작은 접시를 서두르지 않고 맛보게 됩니다." },
    ],
  },
  tradition: {
    title: "브런치와 다른 공유 식탁의 방식",
    paragraphs: [
      "터키식 아침 식사의 핵심은 접시 수를 과시하는 데 있지 않습니다. 한 상에 놓인 서로 다른 맛을 대화하듯 오가며 함께 먹는 방식에 있습니다. 그래서 커플, 가족, 친구가 같은 접시를 나누고 차를 계속 따라 마시는 시간이 식사의 일부가 됩니다.",
      "반의 아침 문화는 지역 유제품, 곡물과 허브를 통해 터키 아침 식사의 폭을 보여 줍니다. 허브 치즈의 짠 향, 무르투아와 카부트의 볶은 고소함, 자즉의 상쾌함, 발 카이막의 부드러운 단맛이 한 상에서 서로 균형을 이룹니다.",
      "처음이라면 모든 메뉴를 많이 담지 말고 작은 양씩 맛보세요. 뜨거운 음식은 먼저 한입 나누고, 차가운 치즈와 채소, 발 카이막 사이를 오가면 배부름보다 다양성을 오래 즐길 수 있습니다.",
    ],
    imageAlt: "여러 사람이 이스탄불의 반 아침 식사 접시를 함께 나누는 모습",
    caption: "한 접시씩 끝내는 식사가 아니라, 모두가 식탁 중앙의 맛을 함께 오가는 아침입니다.",
  },
  reasons: {
    title: "왜 반 아침 식사를 선택할까요?",
    intro:
      "이스탄불에는 다양한 카흐발트가 있습니다. 반식 아침은 익숙한 터키 아침 메뉴에 뚜렷한 지역 음식까지 함께 경험하고 싶은 여행자에게 맞습니다.",
    items: [
      { title: "지리적 표시로 기록된 전통", text: "반 아침 식사는 TÜRKPATENT 지리적 표시 제504호로 등록되어 지역 음식의 구성과 문화적 배경이 공식 문서에 기록되어 있습니다." },
      { title: "한 상에서 만나는 지역 메뉴", text: "허브 치즈, 무르투아, 카부트, 반식 자즉과 케테를 통해 일반적인 호텔 조식과 다른 지역의 언어를 맛볼 수 있습니다." },
      { title: "1978년부터 이어진 가족 경험", text: "Tarihi Van Kahvaltı Evi는 유행을 위한 콘셉트가 아니라 가족이 이어 온 반 아침 식사 경험을 바탕으로 식탁을 준비합니다." },
      { title: "탁심 여행 동선", text: "잠박 거리의 매장은 탁심 광장, 이스티클랄 거리와 지한기르에서 도보로 접근할 수 있어 베요글루 여행 전에 들르기 좋습니다." },
      { title: "현재 메뉴를 미리 확인", text: "온라인 영문 메뉴에서 현재 구성과 가격을 확인할 수 있습니다. 오래된 블로그의 가격보다 방문일의 실시간 메뉴를 기준으로 하세요." },
      { title: "달고 짠 맛의 균형", text: "발 카이막만 따로 먹는 것보다 짭짤한 허브 치즈, 뜨거운 달걀 요리와 차 사이에서 맛보면 카이막의 매력이 더 선명해집니다." },
    ],
  },
  firstVisit: {
    title: "처음 주문하는 순서",
    intro: "메뉴가 많아 보여도 공유 인원, 알레르기, 대표 지역 메뉴 순서로 결정하면 어렵지 않습니다.",
    steps: [
      { title: "인원과 공유식 확인", text: "전통 반 아침 식사는 최소 2인 서비스이므로 인원과 현재 구성을 먼저 확인합니다." },
      { title: "식단 제한 알리기", text: "유제품, 달걀, 글루텐, 견과류나 육류 제한을 주문 전에 직원에게 말합니다." },
      { title: "지역 메뉴부터 맛보기", text: "허브 치즈, 무르투아, 카부트의 맛과 이름을 먼저 익혀 보세요." },
      { title: "뜨거운 팬을 바로 나누기", text: "메네멘과 달걀 요리는 식기 전에 작은 양씩 나눕니다." },
      { title: "발 카이막과 차로 이어가기", text: "마지막에 몰아 먹지 말고 짠 음식 사이에 꿀과 카이막, 차를 번갈아 즐깁니다." },
    ],
  },
  practical: {
    title: "탁심·베요글루 방문 정보",
    text:
      "매장은 Zambak Sk. No:8, Şehit Muhtar, Beyoğlu에 있으며 매일 08:00–18:00에 운영합니다. 주말 늦은 아침과 단체 방문은 좌석 상황이 달라질 수 있으므로 전화나 WhatsApp으로 미리 확인하세요. 현재 가격은 실시간 영문 메뉴에서 확인할 수 있습니다.",
    labels: { address: "주소", hours: "영업시간", route: "Google 지도에서 길찾기", menu: "영문 메뉴와 가격", call: "전화하기" },
  },
  faq: {
    title: "한국인 여행자의 질문",
    items: [
      { question: "터키식 아침 식사 카흐발트에는 무엇이 나오나요?", answer: "보통 치즈, 올리브, 토마토와 오이, 달걀 요리, 잼, 꿀과 카이막, 빵과 터키 차가 함께 나옵니다. 지역과 매장에 따라 구성은 달라집니다." },
      { question: "반 아침 식사는 일반 터키식 아침과 어떻게 다른가요?", answer: "넓은 터키 아침 문화 안에서 반 지역의 허브 치즈, 무르투아, 카부트, 반식 자즉과 케테 같은 음식이 지역적 성격을 더합니다." },
      { question: "발 카이막은 디저트인가요?", answer: "달콤하지만 아침 식탁의 한 부분으로도 먹습니다. 짭짤한 치즈, 달걀, 올리브와 번갈아 맛보고 차를 곁들이는 것이 자연스럽습니다." },
      { question: "전통 반 아침 식사는 1인 주문이 가능한가요?", answer: "현재 전통 반 아침 식사는 최소 2인부터 제공합니다. 1인 방문이라면 온라인 메뉴에서 개별 접시를 확인하고 매장에 가능한 구성을 문의하세요." },
      { question: "채식 여행자도 먹을 수 있나요?", answer: "치즈, 채소, 달걀, 빵, 잼과 발 카이막 등 고기 없는 음식이 많지만 수주크·카부르마가 들어간 팬도 있습니다. 주문 전에 식단 제한과 당일 재료를 알리세요." },
      { question: "탁심 광장에서 가까운가요?", answer: "베요글루 잠박 거리에 있어 탁심 광장, 이스티클랄 거리와 지한기르에서 걸어갈 수 있습니다. 정확한 경로는 페이지의 Google 지도 링크를 이용하세요." },
      { question: "예약이 필요한가요?", answer: "자리가 있으면 예약 없이 방문할 수 있습니다. 주말, 공휴일과 단체 방문은 전화나 WhatsApp으로 좌석 상황을 먼저 확인하는 것이 좋습니다." },
      { question: "메뉴와 가격을 한국어로 볼 수 있나요?", answer: "현재 가격은 동적으로 갱신되는 영문 메뉴에서 확인할 수 있습니다. 이 한국어 가이드에서는 메뉴 이름과 먹는 법을 설명하고, 가격은 오래된 정보가 남지 않도록 실시간 메뉴에 연결합니다." },
    ],
  },
  sources: {
    title: "공식 출처와 편집 안내",
    note:
      "터키식 아침 식사와 발 카이막의 일반 설명은 GoTürkiye, 반 아침 식사와 지역 메뉴는 TÜRKPATENT 및 튀르키예 문화 포털 자료로 확인했습니다. 매장 정보는 현재 메뉴·주소·운영시간과 분리해 관리합니다.",
    items: [
      { label: "GoTürkiye — 터키식 아침 식사와 세르프메 카흐발트", url: kaymakSources.turkishBreakfastGoTurkiye },
      { label: "TÜRKPATENT — 반 아침 식사 지리적 표시 제504호", url: vanBreakfastSources.vanBreakfast },
      { label: "튀르키예 문화 포털 — 반 허브 치즈", url: vanBreakfastSources.herbCheese },
      { label: "튀르키예 문화 포털 — 무르투아", url: vanBreakfastSources.murtuga },
      { label: "TÜRKPATENT — 반 카부트 지리적 표시 제390호", url: vanBreakfastSources.kavutRegistration },
    ],
  },
  closing: {
    title: "이스탄불의 하루를 한 상에서 시작하세요.",
    text: "발 카이막 한입에 그치지 않고 반 허브 치즈, 따뜻한 지역 메뉴와 차까지—탁심 근처에서 터키 아침 식사의 전체 리듬을 경험해 보세요.",
    menu: "현재 영문 메뉴 보기",
    directions: "도보 길찾기",
  },
  footer: sharedFooter,
  updatedLabel: "마지막 검토",
  dateLabel: "2026년 7월 22일",
  authorLabel: "Tarihi Van Kahvaltı Evi 편집팀",
  dates: sharedDates,
  breadcrumbs: { aria: "경로", home: "한국어 홈", current: "이스탄불 터키식 아침 식사" },
  media: {
    hero: "/images/hero-parallax/overhead-feast.webp",
    article: "/images/hands-table.webp",
    og: "/images/og/van-kahvaltisi.jpg",
  },
  seo: {
    articleSection: "이스탄불 터키식 아침 식사와 반 아침 식사",
    entityRefs: [
      { name: "터키식 아침 식사", sameAs: kaymakSources.turkishBreakfastGoTurkiye },
      { name: "반 아침 식사", sameAs: vanBreakfastSources.vanBreakfast },
      { name: "반 허브 치즈", sameAs: vanBreakfastSources.herbCheese },
      { name: "베요글루, 이스탄불", type: "Place", sameAs: kaymakSources.istanbulBreakfastGoTurkiye },
    ],
    mentions: ["발 카이막", "무르투아", "카부트", "반식 자즉", "메네멘", "터키 차"],
    menuItem: {
      name: "전통 반 아침 식사",
      description: "반 허브 치즈, 무르투아, 카부트, 자즉, 케테, 발 카이막과 무제한 차로 구성된 최소 2인 공유 아침 식사",
      url: "/en/menu#geleneksel-van-kahvaltisi",
    },
  },
  relatedGuides: [
    { label: "대표적인 달콤한 한입", title: "이스탄불 발 카이막 맛집 가이드", description: "꿀과 카이막을 먹는 순서, 실제 메뉴, 탁심 근처 위치와 방문 팁을 확인하세요.", href: "/ko/blog/istanbul-bal-kaymak" },
    { label: "음식 사전", title: "카이막은 무엇이고 어떤 맛일까요?", description: "물소·소 카이막, 버터·생크림과의 차이, 원유와 주문 표현을 자세히 설명합니다.", href: "/ko/blog/kaymak-nedir" },
  ],
};
