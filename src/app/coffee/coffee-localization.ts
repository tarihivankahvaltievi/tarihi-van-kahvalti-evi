/** Coffee copy is adapted to visitors' needs, rather than translating Turkish idioms. */
export const coffeeLocales = ["tr", "en", "ru", "ar", "ko", "zh-cn"] as const;
export type CoffeeLocale = typeof coffeeLocales[number];
export const coffeePaths: Record<CoffeeLocale, string> = {
  tr: "/taksim-kafe", en: "/en/coffee-taksim", ru: "/ru/coffee-taksim",
  ar: "/ar/coffee-taksim", ko: "/ko/coffee-taksim", "zh-cn": "/zh-cn/coffee-taksim",
};
export const coffeeLanguageNames: Record<CoffeeLocale, string> = { tr: "Türkçe", en: "English", ru: "Русский", ar: "العربية", ko: "한국어", "zh-cn": "简体中文" };
export const coffeeLanguageTags: Record<CoffeeLocale, string> = { tr: "tr", en: "en", ru: "ru", ar: "ar", ko: "ko", "zh-cn": "zh-CN" };
export const coffeeOgLocales: Record<CoffeeLocale, string> = { tr: "tr_TR", en: "en_US", ru: "ru_RU", ar: "ar_SA", ko: "ko_KR", "zh-cn": "zh_CN" };
export const coffeeGuidePaths: Record<CoffeeLocale, string> = {
  tr: "/van-kahvaltisi", en: "/en/blog/turkish-breakfast-istanbul", ru: "/ru/blog/turetskiy-zavtrak-stambul",
  ar: "/ar/blog/turkish-breakfast-istanbul", ko: "/ko", "zh-cn": "/zh-cn",
};
export type CoffeeCopy = {
  title: string; description: string; hero: [string, string]; introduction: string;
  menu: string; visit: string; discover: string; languages: string;
  story: [string, string]; storyText: string; menuNote: string;
  captions: [string, string]; bar: [string, string]; barText: [string, string];
  choices: [string, string, string, string][];
  venue: string; directions: string; hours: string;
  images: { cup: string; interior: string; guests: string; venue: string };
  nav: { coffee: string; menu: string; guide: string; location: string; open: string; close: string };
  footer: { heading: string; text: string; privacy: string; cookies: string; rights: string };
};
export const coffeeCopy: Record<CoffeeLocale, CoffeeCopy> = {
  tr: {
    title: "Taksim’de Kahve Keyfi | Tarihi Van Kahvaltı Evi",
    description: "Taksim, Beyoğlu Zambak Sokak’ta tarihi atmosferde kahve keyfi. Türk kahvesi, latte ve soğuk kahveler için menüyü keşfedin, yol tarifi alın.",
    hero: ["Tarihi atmosferde", "kahve keyfi."], introduction: "Taksim’in kalbinde, Tarihi Van’da.",
    menu: "Kahve menüsü", visit: "Bize uğrayın", discover: "Kahve sayfasını keşfedin", languages: "Dil seçin",
    story: ["Bir kahve, biraz sohbet.", "Bir de Beyoğlu."],
    storyText: "Oymalı aynalar, ahşap sandalyeler, sokağa açılan masalar… Kahvaltıyla başlayan sohbet, bir fincan kahveyle devam eder.",
    menuNote: "Güncel çeşitler ve fiyatlar menümüzde.", captions: ["Her köşesinde bir hikâye.", "Fincanlarda biriken sohbet."],
    bar: ["Kahvenizi", "nasıl alırsınız?"], barText: ["Kimi zaman alıştığınız tat.", "Kimi zaman yeni bir fincan."],
    choices: [["Türk kahvesi", "Sade, orta ya da şekerli.", "Kendine has bir ritüel.", "Menüde keşfet"], ["Espresso & süt", "Latte, cappuccino, flat white.", "Fincanınızı seçin.", "Sıcak kahveler"], ["Buz gibi", "Ice latte, americano, cold brew.", "Günün serin molası.", "Soğuk kahveler"]],
    venue: "Tarihi Van, Beyoğlu.", directions: "Yol tarifi al", hours: "Her gün",
    images: { cup: "Kalp desenli süt köpüğüyle porselen fincanda kahve", interior: "Tarihi Van’ın antika koltuğu, oymalı aynası ve eski telefonu", guests: "Tarihi Van’da masada paylaşılan Türk kahvesi", venue: "Tarihi Van Kahvaltı Evi’nde radyo, televizyon, tablolar ve ahşap masalarla iç mekân" },
    nav: { coffee: "Kahve", menu: "Menü", guide: "Van kahvaltısı", location: "Yol tarifi", open: "Menüyü aç", close: "Menüyü kapat" },
    footer: { heading: "Van sofrasından bir fincan kahveye.", text: "Tarihi Van Kahvaltı Evi’nde Van kahvaltısını ve kahve seçeneklerini Beyoğlu Zambak Sokak’taki mekânımızda keşfedin. Güncel menüyü inceleyin, ziyaretiniz için yol tarifi alın.", privacy: "Gizlilik Politikası", cookies: "Çerez Politikası", rights: "Tüm hakları saklıdır." },
  },
  en: {
    title: "Coffee near Taksim | Tarihi Van Kahvaltı Evi",
    description: "Take a coffee break near Taksim Square and İstiklal Avenue. Discover Turkish coffee, lattes and iced drinks at Tarihi Van. View the menu and get directions.",
    hero: ["A coffee break", "near Taksim."], introduction: "Turkish coffee, lattes and a welcoming corner of Istanbul.",
    menu: "Coffee menu", visit: "Find us", discover: "Explore our coffee and café", languages: "Choose language",
    story: ["Explore Istanbul.", "Pause for a coffee."],
    storyText: "Between Taksim Square and your next stop along İstiklal Avenue, take a break at Tarihi Van. Discover carved mirrors, wooden chairs and Turkish coffee in our Beyoğlu setting.",
    menuNote: "Our English menu lists current drinks and prices in Turkish lira.", captions: ["A glimpse inside Tarihi Van.", "Turkish coffee, shared at the table."],
    bar: ["What’s your", "coffee today?"], barText: ["Try a Turkish classic", "or choose a familiar favourite."],
    choices: [["Turkish coffee", "Choose no sugar, medium or sweet.", "Tell us your preference when ordering.", "See Turkish coffee"], ["Espresso & milk", "Latte, cappuccino or flat white.", "Find your usual in our menu.", "Explore hot coffees"], ["Over ice", "Iced latte, americano and cold brew.", "A refreshing break while sightseeing.", "Explore iced coffees"]],
    venue: "Visit Tarihi Van.", directions: "Get directions", hours: "Open daily",
    images: { cup: "Porcelain coffee cup with heart-shaped latte art", interior: "Antique chair, carved mirror and vintage telephone inside Tarihi Van", guests: "Guests sharing Turkish coffee at Tarihi Van", venue: "Vintage radios, framed pictures and wooden furniture inside Tarihi Van in Beyoğlu" },
    nav: { coffee: "Coffee", menu: "Menu", guide: "Turkish breakfast", location: "Directions", open: "Open menu", close: "Close menu" },
    footer: { heading: "Turkish breakfast. Coffee in Beyoğlu.", text: "Find Tarihi Van Kahvaltı Evi on Zambak Street near Taksim Square and İstiklal Avenue. Explore our Van-style breakfast and coffee menu, then use the map for the correct address.", privacy: "Privacy policy (Turkish)", cookies: "Cookie policy (Turkish)", rights: "All rights reserved." },
  },
  ru: {
    title: "Кофе рядом с Таксимом | Tarihi Van Kahvaltı Evi",
    description: "Кофейная пауза рядом с площадью Таксим и улицей Истикляль. Турецкий кофе, латте и холодные напитки в Tarihi Van: меню, цены и маршрут к кафе.",
    hero: ["Кофейная пауза", "рядом с Таксимом."], introduction: "Турецкий кофе и уютная остановка во время прогулки по Стамбулу.",
    menu: "Меню на английском", visit: "Как нас найти", discover: "Узнать о кофе и кафе", languages: "Выбрать язык",
    story: ["Прогулка по Стамбулу.", "Время для кофе."],
    storyText: "Загляните в Tarihi Van во время прогулки у площади Таксим и улицы Истикляль. Резные зеркала, деревянные стулья и чашка турецкого кофе помогут ненадолго замедлиться в оживлённом Бейоглу.",
    menuNote: "Актуальные напитки и цены в турецких лирах указаны в английском меню.", captions: ["Один из уголков Tarihi Van.", "Турецкий кофе за общим столом."],
    bar: ["Какой кофе", "выберете сегодня?"], barText: ["Попробуйте турецкую классику", "или закажите привычный напиток."],
    choices: [["Турецкий кофе", "Без сахара, средней сладости или сладкий.", "Сообщите свой выбор при заказе.", "Посмотреть в меню"], ["Эспрессо и молоко", "Латте, капучино или флэт уайт.", "Найдите любимый напиток в меню.", "Горячий кофе"], ["Холодный кофе", "Айс-латте, американо и колд брю.", "Освежитесь между прогулками.", "Холодные напитки"]],
    venue: "Загляните в Tarihi Van.", directions: "Построить маршрут", hours: "Ежедневно",
    images: { cup: "Фарфоровая чашка кофе с сердцем на молочной пенке", interior: "Старинное кресло, резное зеркало и телефон в Tarihi Van", guests: "Гости пьют турецкий кофе в Tarihi Van", venue: "Винтажная техника, картины и деревянная мебель в кафе Tarihi Van в Бейоглу" },
    nav: { coffee: "Кофе", menu: "Меню · EN", guide: "Турецкий завтрак", location: "Маршрут", open: "Открыть меню", close: "Закрыть меню" },
    footer: { heading: "Турецкий завтрак и кофе в Бейоглу.", text: "Tarihi Van Kahvaltı Evi находится на улице Zambak недалеко от площади Таксим и Истикляль. Ознакомьтесь с меню ванского завтрака и кофе на английском языке. Точный адрес и маршрут указаны на карте.", privacy: "Конфиденциальность · TR", cookies: "Файлы cookie · TR", rights: "Все права защищены." },
  },
  ar: {
    title: "قهوة قرب ميدان تقسيم | Tarihi Van Kahvaltı Evi",
    description: "استراحة قهوة قرب ميدان تقسيم وشارع الاستقلال في إسطنبول. اكتشف القهوة التركية واللاتيه والمشروبات الباردة في Tarihi Van، وتصفح القائمة واعرف الطريق.",
    hero: ["استراحة قهوة", "بالقرب من تقسيم"], introduction: "قهوة تركية وأجواء دافئة خلال جولتكم في إسطنبول.",
    menu: "القائمة بالإنجليزية", visit: "زورونا", discover: "اكتشف القهوة والمكان", languages: "اختر اللغة",
    story: ["بين جولات إسطنبول،", "وقت لفنجان قهوة."],
    storyText: "أثناء التجول قرب ميدان تقسيم وشارع الاستقلال، توقفوا في Tarihi Van في بيوغلو. مرايا مزخرفة وكراسٍ خشبية وفنجان قهوة تركية في مكان يحمل طابع الحي.",
    menuNote: "تتوفر المشروبات والأسعار الحالية بالليرة التركية في القائمة الإنجليزية.", captions: ["ركن من داخل Tarihi Van.", "قهوة تركية تجمعنا حول الطاولة."],
    bar: ["كيف تحبون", "قهوتكم اليوم؟"], barText: ["جربوا القهوة التركية", "أو اختاروا مشروبكم المعتاد."],
    choices: [["قهوة تركية", "سادة، متوسطة السكر، أو حلوة.", "يرجى تحديد كمية السكر عند الطلب.", "شاهد القهوة في القائمة"], ["إسبريسو وحليب", "لاتيه، كابتشينو، أو فلات وايت.", "اختاروا مشروبكم من القائمة.", "القهوة الساخنة"], ["قهوة باردة", "آيس لاتيه، أمريكانو، وكولد برو.", "استراحة منعشة أثناء الجولة.", "القهوة الباردة"]],
    venue: "أهلاً بكم في Tarihi Van.", directions: "احصل على الاتجاهات", hours: "يومياً",
    images: { cup: "فنجان قهوة من الخزف مع رسم قلب على رغوة الحليب", interior: "كرسي قديم ومرآة مزخرفة وهاتف عتيق داخل Tarihi Van", guests: "ضيوف يتشاركون القهوة التركية في Tarihi Van", venue: "أجهزة راديو قديمة ولوحات وأثاث خشبي داخل Tarihi Van في بيوغلو" },
    nav: { coffee: "القهوة", menu: "القائمة · EN", guide: "الفطور التركي", location: "الاتجاهات", open: "افتح القائمة", close: "أغلق القائمة" },
    footer: { heading: "فطور تركي وقهوة في بيوغلو.", text: "يقع Tarihi Van Kahvaltı Evi في شارع Zambak قرب ميدان تقسيم وشارع الاستقلال. اطلعوا على قائمة فطور فان والقهوة بالإنجليزية، واستخدموا الخريطة للوصول إلى عنواننا الصحيح.", privacy: "الخصوصية · بالتركية", cookies: "ملفات الارتباط · بالتركية", rights: "جميع الحقوق محفوظة." },
  },
  ko: {
    title: "탁심 근처 커피와 카페 | Tarihi Van Kahvaltı Evi",
    description: "이스탄불 탁심 광장과 이스티클랄 거리 근처에서 커피 한 잔의 여유를 즐겨 보세요. Tarihi Van의 터키식 커피, 라테, 아이스커피와 영문 메뉴, 가격, 매장 위치를 안내합니다.",
    hero: ["탁심에서 즐기는", "커피 한 잔"], introduction: "이스탄불 여행 중 만나는 터키식 커피와 따뜻한 공간.",
    menu: "영문 메뉴 보기", visit: "길찾기", discover: "커피와 매장 둘러보기", languages: "언어 선택",
    story: ["이스탄불을 걷다가,", "잠시 쉬어 가세요."],
    storyText: "탁심 광장과 이스티클랄 거리 주변을 여행한다면 베요글루의 Tarihi Van에 들러 보세요. 조각 장식 거울과 나무 의자가 있는 공간에서 터키식 커피 한 잔으로 여행 사이의 여유를 즐겨 보세요.",
    menuNote: "최신 음료와 터키 리라 가격은 영문 메뉴에서 확인할 수 있습니다.", captions: ["Tarihi Van 매장 안의 한 장면.", "함께 즐기는 터키식 커피."],
    bar: ["오늘은 어떤", "커피가 좋으세요?"], barText: ["터키식 커피를 맛보거나", "익숙한 커피를 골라 보세요."],
    choices: [["터키식 커피", "무설탕, 중간 단맛, 달게 중에서 선택하세요.", "주문할 때 설탕 취향을 알려 주세요.", "메뉴에서 보기"], ["에스프레소와 우유", "라테, 카푸치노, 플랫 화이트.", "메뉴에서 취향에 맞게 골라 보세요.", "따뜻한 커피"], ["시원한 커피", "아이스 라테, 아메리카노, 콜드 브루.", "여행 중 시원하게 쉬어 가세요.", "아이스커피"]],
    venue: "Tarihi Van으로 오세요.", directions: "매장 길찾기", hours: "매일",
    images: { cup: "하트 라테 아트가 있는 도자기 커피잔", interior: "Tarihi Van의 앤티크 의자, 장식 거울과 옛 전화기", guests: "Tarihi Van에서 함께 마시는 터키식 커피", venue: "베요글루 Tarihi Van 매장의 오래된 라디오, 액자와 나무 가구" },
    nav: { coffee: "커피", menu: "메뉴 · EN", guide: "터키식 아침 식사", location: "길찾기", open: "메뉴 열기", close: "메뉴 닫기" },
    footer: { heading: "베요글루에서 만나는 터키식 아침 식사와 커피.", text: "Tarihi Van Kahvaltı Evi는 탁심 광장과 이스티클랄 거리 근처 잠박 거리에 있습니다. 반 지역 스타일의 터키식 아침 식사와 커피를 영문 메뉴에서 확인하고, 지도로 정확한 위치를 찾아오세요.", privacy: "개인정보 처리방침 · 터키어", cookies: "쿠키 정책 · 터키어", rights: "모든 권리 보유." },
  },
  "zh-cn": {
    title: "塔克西姆附近的咖啡馆 | Tarihi Van Kahvaltı Evi",
    description: "游览伊斯坦布尔塔克西姆广场与独立大街时，来 Tarihi Van 喝杯咖啡。这里提供土耳其咖啡、拿铁和冰咖啡。本页介绍咖啡选择、营业时间、英文菜单与土耳其里拉价格，并提供 Beyoğlu 区 Zambak 街门店的地图导航。",
    hero: ["塔克西姆附近", "喝杯咖啡，歇一歇"], introduction: "在伊斯坦布尔的旅途中，品一杯土耳其咖啡。",
    menu: "查看英文菜单", visit: "门店导航", discover: "了解咖啡与门店", languages: "选择语言",
    story: ["漫步伊斯坦布尔，", "给自己一段咖啡时光。"],
    storyText: "逛完塔克西姆广场或独立大街，可以到 Beyoğlu 区的 Tarihi Van 稍作休息。雕花镜子、木椅和一杯土耳其咖啡，让行程多一段放松的时光。",
    menuNote: "最新饮品与土耳其里拉价格，请查看英文菜单。", captions: ["Tarihi Van 店内的一角。", "围坐桌边，分享土耳其咖啡。"],
    bar: ["今天，", "想喝哪一杯？"], barText: ["试试土耳其经典风味，", "或选择熟悉的咖啡。"],
    choices: [["土耳其咖啡", "可选无糖、半糖或甜味。", "请在点单时说明甜度。", "在菜单中查看"], ["浓缩咖啡与牛奶", "拿铁、卡布奇诺、馥芮白。", "从菜单中挑选喜欢的口味。", "查看热咖啡"], ["冰咖啡", "冰拿铁、美式咖啡和冷萃。", "旅行途中，清爽歇一歇。", "查看冰咖啡"]],
    venue: "欢迎来到 Tarihi Van。", directions: "获取路线", hours: "每天",
    images: { cup: "瓷杯中的咖啡，奶泡上有心形拉花", interior: "Tarihi Van 店内的古典座椅、雕花镜与老式电话", guests: "客人在 Tarihi Van 一起享用土耳其咖啡", venue: "Beyoğlu 区 Tarihi Van 店内的老式收音机、装饰画和木质家具" },
    nav: { coffee: "咖啡", menu: "菜单 · EN", guide: "土耳其早餐", location: "路线", open: "打开菜单", close: "关闭菜单" },
    footer: { heading: "在 Beyoğlu，享用土耳其早餐与咖啡。", text: "Tarihi Van Kahvaltı Evi 位于塔克西姆广场和独立大街附近的 Zambak 街。请通过英文菜单查看凡城风味土耳其早餐与咖啡，并使用地图导航前往正确的门店地址。", privacy: "隐私政策 · 土耳其语", cookies: "Cookie 政策 · 土耳其语", rights: "保留所有权利。" },
  },
};
