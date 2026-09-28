import { kaymakSources, vanBreakfastSources } from "../content-sources";
import { koreanHoneyKaymakBlogUrl, japaneseHoneyKaymakBlogUrl, siteUrl } from "../seo";
import type { TravelGuide } from "./taksim-travel-guide";

const date = "2026-09-28T12:00:00+03:00";
const zhHoney = `${siteUrl}/zh-cn/blog/istanbul-bal-kaymak`;
const esHoney = `${siteUrl}/es/blog/bal-kaymak-estambul`;
const zhBreakfast = `${siteUrl}/zh-cn/blog/taksim-turkish-breakfast`;
const koTaksim = `${siteUrl}/ko/blog/taksim-kahvalti-rehberi`;

export const koreanTaksimGuide: TravelGuide = {
  path: "/ko/blog/taksim-kahvalti-rehberi", language: "ko-KR",
  title: "탁심 아침 식사 가이드 | 발 카이막과 반식 카흐발트",
  description: "탁심 광장 근처에서 아침 식사를 계획하는 한국인 여행자를 위한 위치, 주문법, 발 카이막과 반식 카흐발트 설명. 주소와 현재 메뉴 확인 방법까지 안내합니다.",
  kicker: "한국인 여행자의 탁심 아침 동선", heading: "탁심에서 아침 식사: 발 카이막부터 반식 카흐발트까지",
  lead: "탁심에 머문다면 아침 식사를 위해 멀리 이동할 필요가 없습니다. 베요글루 잠박 거리에서 발 카이막을 맛보거나, 허브 치즈와 따뜻한 요리가 함께 나오는 반(Van)식 아침상을 나눠 보세요. 이 가이드는 장소를 찾는 단계부터 주문까지 필요한 정보를 모았습니다.",
  image: "/images/hero-parallax/overhead-feast.webp", imageAlt: "발 카이막, 치즈, 빵과 터키 차가 놓인 반식 아침 식탁",
  date, author: "Tarihi Van Kahvaltı Evi 편집팀",
  sections: [
    { id: "where", title: "탁심 근처에서 어디로 가나요?", paragraphs: [
      "Tarihi Van Kahvaltı Evi는 이스탄불 베요글루의 Şehit Muhtar Mahallesi, Zambak Sk. No:8에 있습니다. 탁심 광장과 이스티클랄 거리에서 도보로 접근할 수 있으며, 아래 Google 지도 링크에서 출발 위치에 맞는 실제 경로를 확인할 수 있습니다. 거리와 소요 시간은 출구와 교통 상황에 따라 달라집니다.",
      "아침 일정을 촘촘히 잡았다면 메뉴를 먼저 보고 방문하는 것이 편합니다. 영업시간은 매일 07:00–22:00로 안내하지만 공휴일, 특별 운영 또는 당일 혼잡도는 방문 전에 확인해 주세요."
    ], points: [
      { title: "탁심 광장에서", text: "M2 탁심역 또는 광장을 기준으로 Sıraselviler 방면을 확인하고 Zambak Sokak 주소로 지도를 따라 걸어오세요." },
      { title: "이스티클랄 거리에서", text: "거리 남쪽 출입 방향에서 베요글루 골목으로 이동합니다. 길은 출발 지점에 따라 달라지므로 실시간 도보 경로가 가장 정확합니다." },
    ] },
    { id: "order", title: "발 카이막 한 접시와 아침상 중 무엇을 주문할까요?", paragraphs: [
      "발(bal)은 꿀, 카이막(kaymak)은 우유에서 얻는 진한 유제품입니다. 달콤한 간식처럼 간단히 맛보고 싶다면 발 카이막 단품을 살펴보세요. 카이막 자체는 대체로 담백하고, 단맛은 곁들인 꿀에서 옵니다. 따뜻한 빵에 카이막을 먼저 올리고 꿀을 조금씩 더하면 맛의 차이를 느끼기 좋습니다.",
      "여럿이 식사한다면 serpme kahvaltı(여러 접시를 펼쳐 놓는 공유식 아침상)를 보세요. 반식 아침에는 일반적인 치즈·올리브·달걀·빵에 더해 반 허브 치즈, 무르투아, 카부트 같은 지역 음식이 있습니다. 다만 구성은 메뉴와 당일 준비 상황을 기준으로 확인해야 합니다. 공유식 메뉴의 최소 주문 인원도 메뉴에서 확인하세요."
    ], points: [
      { title: "짧은 방문", text: "발 카이막과 차를 중심으로 현재 단품 메뉴의 구성과 가격을 확인하세요." },
      { title: "느긋한 아침", text: "여러 사람이 함께라면 반식 공유 아침상과 따뜻한 달걀 요리를 비교해 보세요." },
    ] },
    { id: "plan", title: "한국인 여행자를 위한 실전 팁", paragraphs: [
      "카이막이 반드시 물소유로 만들어진다고 가정하지 마세요. 원유가 중요하다면 ‘Bu kaymak manda sütünden mi?’(이 카이막은 물소유인가요?)라고 물을 수 있습니다. 우유 알레르기나 식이 제한이 있다면 주문 전에 재료와 주방의 교차 접촉 가능성을 직접 확인하세요.",
      "가격은 오래된 후기보다 매장의 현재 영문 메뉴가 정확합니다. 주말이나 단체 방문은 좌석 상황을 미리 전화로 확인하면 좋습니다. 터키어로는 ‘Bal kaymak var mı?’(발 카이막이 있나요?), ‘Serpme kahvaltı kaç kişilik?’(공유 아침상은 몇 인분인가요?)라고 물을 수 있습니다."
    ] },
  ],
  faqTitle: "탁심 아침 식사 자주 묻는 질문", faq: [
    { question: "탁심 광장에서 걸어갈 수 있나요?", answer: "네. 매장은 베요글루 잠박 거리에 있으며 탁심 광장과 이스티클랄 거리에서 도보로 접근할 수 있습니다. 정확한 경로와 시간은 지도에서 출발 지점별로 확인하세요." },
    { question: "발 카이막만 주문할 수 있나요?", answer: "현재 메뉴에 발 카이막 단품이 있는지, 가격과 제공 여부를 영문 메뉴에서 확인하세요. 당일 품절 여부는 방문 전에 매장에 문의할 수 있습니다." },
    { question: "한국어 메뉴가 있나요?", answer: "한국어 가이드에서 음식 이름과 주문법을 설명합니다. 상품 구성과 가격은 현재 영문 메뉴를 확인해 주세요." },
  ],
  sourcesTitle: "음식 정보의 출처", sourcesIntro: "반 아침 문화와 카이막의 일반적인 설명은 아래 공공 자료를 참고했습니다. 매장 위치, 시간, 메뉴는 이 사이트의 운영 정보를 기준으로 적었습니다.",
  sources: [
    { name: "TÜRKPATENT — 반 아침 식사 지리적 표시", url: vanBreakfastSources.vanBreakfast },
    { name: "튀르키예 문화 포털 — 반 허브 치즈", url: vanBreakfastSources.herbCheese },
    { name: "GoTürkiye — 터키 아침 식사", url: kaymakSources.turkishBreakfastGoTurkiye },
  ],
  relatedTitle: "이어 읽기", related: [
    { name: "카이막의 뜻과 먹는 법", href: "/ko/blog/kaymak-nedir", language: "ko" },
    { name: "이스탄불 발 카이막 가이드", href: "/ko/blog/istanbul-bal-kaymak", language: "ko" },
    { name: "터키식 아침 식사 전체 가이드", href: "/ko/blog/turkish-breakfast-istanbul", language: "ko" },
    { name: "简体中文：塔克西姆早餐", href: "/zh-cn/blog/taksim-turkish-breakfast", language: "zh-CN" },
  ],
  menuLabel: "현재 메뉴와 가격", mapLabel: "Google 지도 길찾기", callLabel: "전화 문의", homeLabel: "한국어 홈", hoursLabel: "영업시간", addressLabel: "주소",
  translations: { ko: koTaksim, "zh-CN": zhBreakfast },
};

export const chineseHoneyGuide: TravelGuide = {
  path: "/zh-cn/blog/istanbul-bal-kaymak", language: "zh-CN",
  title: "伊斯坦布尔蜂蜜奶皮 Bal Kaymak 指南｜塔克西姆附近怎么吃",
  description: "中文了解土耳其蜂蜜奶皮 bal kaymak 是什么、怎样搭配面包与红茶，以及在伊斯坦布尔塔克西姆附近的点单、地址和菜单信息。",
  kicker: "伊斯坦布尔美食 · 中文指南", heading: "在伊斯坦布尔吃蜂蜜奶皮：Bal Kaymak 是什么？",
  lead: "“Bal”在土耳其语中是蜂蜜，“kaymak”是浓厚的乳制奶皮。两者放在同一张早餐桌上，配热面包与土耳其红茶，是认识当地早餐的一种简单方式。这里说明味道、吃法，以及从塔克西姆前往店里的实用信息。",
  image: "/images/blog/bal-kaymak-close-up.webp", imageAlt: "土耳其蜂蜜、奶皮和早餐面包的近景",
  date, author: "Tarihi Van Kahvaltı Evi 编辑团队",
  sections: [
    { id: "meaning", title: "蜂蜜奶皮究竟是什么？", paragraphs: [
      "Kaymak 通常由牛奶或水牛奶制作：加热、冷却后收集表面的浓厚乳脂层。不同原料和做法会影响口感，因此不能只凭“kaymak”这个名字断定它一定是水牛奶制成。奶皮本身以乳香和柔滑口感为主；明显的甜味来自蜂蜜。",
      "它和黄油、打发奶油也不完全一样。若有乳制品过敏，点单前请询问原料以及厨房是否可能交叉接触。店里当天使用的奶源也应向工作人员确认。"
    ] },
    { id: "taste", title: "第一次吃，怎样搭配更好？", paragraphs: [
      "先单独尝一小口奶皮，再把它抹在温热面包上，最后少量加入蜂蜜。这样可以分别尝到乳香、面包温度和蜂蜜香气；不需要一次把整份蜂蜜拌进去。旁边的咸奶酪或橄榄能让甜咸味道交替，红茶则适合慢慢喝。",
      "如果只想体验这一道，可先查看菜单中的 Bal - Kaymak 单品。若想吃完整的土耳其早餐，再比较共享式的 Van 早餐。菜单价格和当天供应情况可能变化，出发前以实时菜单为准。"
    ], points: [
      { title: "土耳其语点单", text: "“Bal kaymak var mı?” 意为“有蜂蜜奶皮吗？”；“Bu kaymak manda sütünden mi?” 意为“这份奶皮是水牛奶做的吗？”" },
      { title: "适合怎样吃", text: "热面包先抹奶皮，再加少量蜂蜜。喜欢完整早餐的人可搭配奶酪、鸡蛋和红茶。" },
    ] },
    { id: "visit", title: "从塔克西姆怎么去？", paragraphs: [
      "Tarihi Van Kahvaltı Evi 位于伊斯坦布尔 Beyoğlu 区 Zambak Sk. No:8，从塔克西姆广场和独立大街一带可以步行前往。具体路线取决于您的出发点，请使用下方地图链接导航。店铺公布的营业时间为每天 07:00–22:00；节假日和临时调整请提前确认。",
      "到店后可以让工作人员介绍当日供应的奶皮、蜂蜜与面包。这个页面介绍的是食物和探店准备，实时价格以英文菜单为准。"
    ] },
  ],
  faqTitle: "常见问题", faq: [
    { question: "Bal kaymak 是甜点还是早餐？", answer: "它可以作为早餐桌上的一部分，也可单独品尝。土耳其式早餐通常还包括奶酪、橄榄、鸡蛋、面包和茶。" },
    { question: "所有 kaymak 都是水牛奶做的吗？", answer: "不是。可使用水牛奶或牛奶，具体原料应以产品说明和店员答复为准。" },
    { question: "塔克西姆附近能吃到吗？", answer: "本店位于 Beyoğlu 的 Zambak Sokak，从塔克西姆广场可步行前往。请在出发前查看地图、当前菜单及供应情况。" },
  ],
  sourcesTitle: "资料来源与说明", sourcesIntro: "以下公共资料用于核对奶皮与土耳其早餐的文化背景。店内信息以本网站的当前菜单和到店确认为准。",
  sources: [
    { name: "土耳其文化门户 — Afyon Kaymağı", url: kaymakSources.afyonKaymakCulturePortal },
    { name: "GoTürkiye — Turkish Breakfast", url: kaymakSources.turkishBreakfastGoTurkiye },
  ],
  relatedTitle: "继续阅读", related: [
    { name: "塔克西姆土耳其早餐与 Van 早餐", href: "/zh-cn/blog/taksim-turkish-breakfast", language: "zh-CN" },
    { name: "한국어: 이스탄불 발 카이막", href: "/ko/blog/istanbul-bal-kaymak", language: "ko" },
    { name: "日本語: バル・カイマク", href: "/ja/blog/istanbul-bal-kaymak", language: "ja" },
  ],
  menuLabel: "查看当前菜单及价格", mapLabel: "Google 地图导航", callLabel: "致电咨询", homeLabel: "中文首页", hoursLabel: "营业时间", addressLabel: "地址",
  menuHref: "/en/menu#bal-kaymak",
  translations: { "zh-CN": zhHoney, ko: koreanHoneyKaymakBlogUrl, ja: japaneseHoneyKaymakBlogUrl, es: esHoney },
};

export const chineseBreakfastGuide: TravelGuide = {
  path: "/zh-cn/blog/taksim-turkish-breakfast", language: "zh-CN",
  title: "塔克西姆早餐指南｜伊斯坦布尔土耳其早餐与 Van 早餐",
  description: "塔克西姆附近吃土耳其早餐：了解 serpme kahvaltı、Van 香草奶酪、蜂蜜奶皮、热菜和红茶，并查看 Beyoğlu 地址、营业时间与菜单。",
  kicker: "塔克西姆旅行 · 中文早餐指南", heading: "塔克西姆早餐怎么选？从土耳其早餐到 Van 早餐",
  lead: "土耳其早餐 kahvaltı 往往是一桌人分享的小盘菜，不是一份固定的单人套餐。住在塔克西姆附近的旅客，可以从 Beyoğlu 的 Van 风味早餐认识香草奶酪、热菜、蜂蜜奶皮和不断续杯的红茶。",
  image: "/images/hero-parallax/overhead-feast.webp", imageAlt: "在 Beyoğlu 分享的 Van 风味土耳其早餐全桌",
  date, author: "Tarihi Van Kahvaltı Evi 编辑团队",
  sections: [
    { id: "breakfast", title: "土耳其早餐和 Van 早餐有什么区别？", paragraphs: [
      "常见的土耳其早餐包括奶酪、橄榄、番茄、黄瓜、鸡蛋、面包、果酱、蜂蜜和红茶。Serpme kahvaltı 指把多种小盘菜铺满桌面、适合分享的早餐形式；不同店的具体组合和人数要求不同。",
      "Van 是土耳其东部的地区。Van 风味早餐在常见食材之外加入带香草风味的 Van 奶酪、murtuğa（黄油烘炒面粉与鸡蛋）、kavut（烘焙谷物料理）等地域味道。蜂蜜与 kaymak 也是餐桌上的甜味部分。菜品会随实际菜单和季节变化。"
    ], points: [
      { title: "咸味", text: "香草奶酪、橄榄、蔬菜与鸡蛋构成早餐的基础，适合与热面包交替吃。" },
      { title: "甜味", text: "蜂蜜奶皮、果酱和其他甜味小碟可在咸味之间少量品尝。" },
      { title: "热菜", text: "Murtuğa、kavut 或蛋类热锅料理最好在上桌后趁热分享。" },
      { title: "红茶", text: "土耳其红茶通常贯穿整餐；想慢慢吃，可留出比普通咖啡早餐更充裕的时间。" },
    ] },
    { id: "order", title: "两个人如何点单？", paragraphs: [
      "先查看当前菜单中的共享式早餐、单品和人数要求。想完整体验时，比较 serpme kahvaltı 的包含菜品；只想吃蜂蜜奶皮则查看 Bal - Kaymak 单品。共享餐按店内当前规则点单，不应假设所有小盘都能单独更换。",
      "菜单价格可能调整，旧游记和截图未必准确。若有乳制品、鸡蛋、麸质或坚果过敏，请在点单时让工作人员核对当天食材与交叉接触情况。"
    ] },
    { id: "route", title: "位置、时间与行程安排", paragraphs: [
      "Tarihi Van Kahvaltı Evi 在 Beyoğlu 的 Zambak Sk. No:8，从塔克西姆广场及独立大街周边可以步行到达。打开地图链接输入自己的出发地，比固定的步行分钟数更准确。店铺公布每天 07:00–22:00 营业，特殊日期或多人同行建议出发前致电确认。",
      "如果上午计划继续逛独立大街，可以先吃早餐再步行游览；如果只想短暂停留，可选蜂蜜奶皮与茶。完整早餐通常需要更多用餐时间。"
    ] },
  ],
  faqTitle: "塔克西姆早餐常见问题", faq: [
    { question: "Van 早餐是自助餐吗？", answer: "这里介绍的 serpme kahvaltı 是摆在桌上的共享式小盘早餐，不等同于自助餐。实际菜品与人数要求请看当前菜单。" },
    { question: "只有一个人，可以点蜂蜜奶皮吗？", answer: "可以先查看菜单中的 Bal - Kaymak 单品与当天供应。共享早餐的人数要求可能不同，点单前请确认。" },
    { question: "店里离塔克西姆广场远吗？", answer: "店在 Beyoğlu 的 Zambak Sokak，可从广场步行前往。实际路程取决于出发点，请使用地图导航。" },
  ],
  sourcesTitle: "资料来源与说明", sourcesIntro: "地域菜品和早餐文化参考土耳其公共资料；本店地址、营业时间及菜单由本站提供，出发前请核对当天信息。",
  sources: [
    { name: "TÜRKPATENT — Van 早餐地理标志", url: vanBreakfastSources.vanBreakfast },
    { name: "土耳其文化门户 — Van 香草奶酪", url: vanBreakfastSources.herbCheese },
    { name: "土耳其文化门户 — Murtuğa", url: vanBreakfastSources.murtuga },
    { name: "GoTürkiye — Turkish Breakfast", url: kaymakSources.turkishBreakfastGoTurkiye },
  ],
  relatedTitle: "继续阅读", related: [
    { name: "伊斯坦布尔蜂蜜奶皮指南", href: "/zh-cn/blog/istanbul-bal-kaymak", language: "zh-CN" },
    { name: "한국어: 탁심 아침 식사", href: "/ko/blog/taksim-kahvalti-rehberi", language: "ko" },
    { name: "English: Turkish breakfast in Istanbul", href: "/en/blog/turkish-breakfast-istanbul", language: "en" },
  ],
  menuLabel: "查看当前菜单及价格", mapLabel: "Google 地图导航", callLabel: "致电咨询", homeLabel: "中文首页", hoursLabel: "营业时间", addressLabel: "地址",
  translations: { "zh-CN": zhBreakfast, ko: koTaksim },
};
