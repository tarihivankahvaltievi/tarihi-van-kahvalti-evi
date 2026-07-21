import { coreVanBreakfastCitations } from "../content-sources";

export type GuideLocale = "en" | "ru" | "ar" | "ko" | "ja";

export type GuideContent = {
  locale: GuideLocale;
  languageTag: string;
  direction: "ltr" | "rtl";
  path: string;
  title: string;
  description: string;
  ogLocale: string;
  ogAlternateLocales: string[];
  hero: {
    note: string;
    title: string;
    accent: string;
    lead: string;
    readLabel: string;
    menuLabel: string;
    imageAlt: string;
    imageCaption: string;
  };
  nav: { label: string; answer: string; table: string; choose: string; visit: string; faq: string };
  shortAnswer: { label: string; title: string; paragraphs: string[] };
  table: {
    title: string;
    intro: string;
    items: { name: string; role: string; description: string }[];
  };
  tradition: { title: string; paragraphs: string[]; imageAlt: string; caption: string };
  reasons: {
    title: string;
    intro: string;
    items: { title: string; text: string }[];
  };
  firstVisit: { title: string; intro: string; steps: { title: string; text: string }[] };
  practical: {
    title: string;
    text: string;
    labels: { address: string; hours: string; route: string; menu: string; call: string };
  };
  faq: { title: string; items: { question: string; answer: string }[] };
  sources: {
    title: string;
    note: string;
    items: { label: string; url: string }[];
  };
  closing: { title: string; text: string; menu: string; directions: string };
  footer: { note: string; home: string; menu: string; directions: string };
  updatedLabel: string;
  dateLabel: string;
  authorLabel: string;
  media?: {
    hero: string;
    article: string;
    og: string;
  };
  seo?: {
    articleSection: string;
    about: string[];
    mentions: string[];
    menuItem?: { name: string; description: string; url: string };
  };
  travelerBrief?: {
    label: string;
    title: string;
    intro: string;
    facts: { label: string; value: string }[];
    comparison: {
      title: string;
      columns: [string, string, string];
      rows: { name: string; texture: string; taste: string }[];
    };
    phrases: { title: string; intro: string; items: { turkish: string; translation: string }[] };
  };
};

export const guidePaths = {
  en: "/en/blog/turkish-breakfast-istanbul",
  ru: "/ru/blog/turetskiy-zavtrak-stambul",
  ar: "/ar/blog/turkish-breakfast-istanbul",
  ko: "/ko/blog/istanbul-bal-kaymak",
  ja: "/ja/blog/istanbul-bal-kaymak",
} as const;

const sourceItems = {
  en: [
    { label: "TÜRKPATENT — Van Breakfast, geographical indication No. 504", url: coreVanBreakfastCitations[0] },
    { label: "Republic of Türkiye Culture Portal — Van herb cheese", url: coreVanBreakfastCitations[1] },
    { label: "Republic of Türkiye Culture Portal — Murtuğa", url: coreVanBreakfastCitations[2] },
    { label: "TÜRKPATENT — Van kavut, geographical indication No. 390", url: coreVanBreakfastCitations[3] },
  ],
  ru: [
    { label: "TÜRKPATENT — Ванский завтрак, географическое указание № 504", url: coreVanBreakfastCitations[0] },
    { label: "Культурный портал Турции — Ванский сыр с травами", url: coreVanBreakfastCitations[1] },
    { label: "Культурный портал Турции — Муртуга", url: coreVanBreakfastCitations[2] },
    { label: "TÜRKPATENT — Ванский кавут, географическое указание № 390", url: coreVanBreakfastCitations[3] },
  ],
  ar: [
    { label: "TÜRKPATENT — فطور فان، التسجيل الجغرافي رقم 504", url: coreVanBreakfastCitations[0] },
    { label: "بوابة الثقافة التركية — جبن فان بالأعشاب", url: coreVanBreakfastCitations[1] },
    { label: "بوابة الثقافة التركية — مورتوغا", url: coreVanBreakfastCitations[2] },
    { label: "TÜRKPATENT — كافوت فان، التسجيل الجغرافي رقم 390", url: coreVanBreakfastCitations[3] },
  ],
  ko: [
    { label: "TÜRKPATENT — 반(Van) 아침 식사 지리적 표시 등록 제504호", url: coreVanBreakfastCitations[0] },
    { label: "튀르키예 문화 포털 — 반 허브 치즈", url: coreVanBreakfastCitations[1] },
    { label: "튀르키예 문화 포털 — 무르투아", url: coreVanBreakfastCitations[2] },
    { label: "TÜRKPATENT — 반 카부트 지리적 표시 등록 제390호", url: coreVanBreakfastCitations[3] },
  ],
  ja: [
    { label: "TÜRKPATENT — ヴァン朝食、地理的表示登録第504号", url: coreVanBreakfastCitations[0] },
    { label: "トルコ共和国文化ポータル — ヴァン産ハーブチーズ", url: coreVanBreakfastCitations[1] },
    { label: "トルコ共和国文化ポータル — ムルトゥア", url: coreVanBreakfastCitations[2] },
    { label: "TÜRKPATENT — ヴァン・カヴット、地理的表示登録第390号", url: coreVanBreakfastCitations[3] },
  ],
} as const;

export const guides: Record<GuideLocale, GuideContent> = {
  en: {
    locale: "en",
    languageTag: "en",
    direction: "ltr",
    path: guidePaths.en,
    title: "Turkish Breakfast in Istanbul: A Local Guide to Van Breakfast",
    description:
      "Discover what a traditional Turkish and Van breakfast includes, why locals choose Tarihi Van Kahvaltı Evi near Taksim, and practical tips for your visit.",
    ogLocale: "en_GB",
    ogAlternateLocales: ["ru_RU", "ar_SA", "ko_KR", "ja_JP"],
    hero: {
      note: "A visitor’s guide to breakfast in Istanbul",
      title: "Turkish breakfast,",
      accent: "the Van way.",
      lead:
        "A proper Turkish breakfast is not one plate and it is not a rushed brunch. It is a table built for sharing: regional cheeses, warm copper pans, preserves, bread and glass after glass of fresh tea. This guide explains what to expect—and where to experience it a short walk from Taksim Square.",
      readLabel: "Start with the essentials",
      menuLabel: "View the English menu",
      imageAlt:
        "Traditional Van breakfast with herb cheese, eggs, preserves and Turkish tea at Tarihi Van Kahvaltı Evi",
      imageCaption: "One table, many small tastes, and time enough to share them.",
    },
    nav: {
      label: "In this guide",
      answer: "What it is",
      table: "What is served",
      choose: "Why choose us",
      visit: "Plan your visit",
      faq: "Questions",
    },
    shortAnswer: {
      label: "The short answer",
      title: "What is a traditional Turkish breakfast?",
      paragraphs: [
        "Turkish breakfast—kahvaltı—is a shared meal of savoury and sweet dishes served together. Cheese, olives, tomatoes, cucumber, eggs, bread, honey, clotted cream and preserves form the familiar foundation. Tea is not a side note: it sets the pace of the meal and is refreshed throughout the table.",
        "A Van breakfast is a distinctive regional expression of that tradition. It adds flavours associated with Van in eastern Türkiye, including aromatic Van herb cheese, murtuğa, kavut, thick herb-filled cacık, kete and hot egg dishes. The result is generous, but its real character comes from variety, contrast and the habit of lingering together.",
        "At Tarihi Van Kahvaltı Evi, our family has carried this breakfast culture since 1978. Today we serve it in a historic building on Zambak Street in Beyoğlu, close to Taksim Square, İstiklal Avenue and Cihangir.",
      ],
    },
    table: {
      title: "What comes on a Van breakfast table?",
      intro:
        "Every table can vary with the season and current menu, but these flavours explain why Van breakfast feels different from a standard hotel buffet or café brunch.",
      items: [
        {
          name: "Van herb cheese",
          role: "The regional signature",
          description:
            "A savoury, fragrant cheese traditionally made with local herbs. Its depth pairs especially well with warm bread, tomatoes and tea.",
        },
        {
          name: "Murtuğa",
          role: "A hot Van speciality",
          description:
            "Flour toasted in butter and finished with egg. Rich, comforting and best tasted while the pan is still warm.",
        },
        {
          name: "Kavut",
          role: "Toasted grain flavour",
          description:
            "A traditional preparation based on roasted grain and butter, often balanced with honey, molasses or preserves.",
        },
        {
          name: "Van-style cacık",
          role: "Cool and herbaceous",
          description:
            "Thicker than the familiar side-dish cacık, with strained yoghurt or curd, fresh herbs and peppers for a bright counterpoint.",
        },
        {
          name: "Honey and kaymak",
          role: "The classic sweet pairing",
          description:
            "Floral honey and silky clotted cream spread over fresh bread create one of the table’s simplest and most memorable bites.",
        },
        {
          name: "Warm egg pans",
          role: "Cooked to order",
          description:
            "Fried eggs, menemen, or eggs with sucuk or kavurma arrive hot and give the shared spread its hearty centre.",
        },
        {
          name: "Bread, kete and pastries",
          role: "Made for dipping and sharing",
          description:
            "Different textures carry the savoury cheeses, pan juices, butter, honey and preserves from one bite to the next.",
        },
        {
          name: "Fresh Turkish tea",
          role: "The rhythm of breakfast",
          description:
            "Served in tulip-shaped glasses and replenished throughout the meal, tea turns breakfast into an unhurried social ritual.",
        },
      ],
    },
    tradition: {
      title: "More than brunch: a culture of the shared table",
      paragraphs: [
        "The Turkish breakfast table is designed to be explored rather than consumed in a fixed order. A salty piece of cheese may be followed by bread with honey and kaymak, then a spoonful from a hot pan, then another glass of tea. This movement between flavours is part of the pleasure.",
        "Van’s breakfast culture grew around early-morning milk houses and the city’s regional dairy, grain and herb traditions. That history still matters because it explains the table’s balance: substantial warm dishes sit beside fresh herbs, dairy products and small sweet tastes.",
        "For travellers, it is also a gentle way to enter everyday Turkish hospitality. There is no need to know every dish before you sit down. Ask what is seasonal, taste a little of everything and leave enough time for the tea.",
      ],
      imageAlt: "Friends reaching across a shared Van breakfast table in Beyoğlu",
      caption: "Breakfast here is a conversation carried by small plates.",
    },
    reasons: {
      title: "Why choose Tarihi Van Kahvaltı Evi?",
      intro:
        "Istanbul has countless breakfast addresses. Ours is for travellers who want a place with a real family history, a clear regional identity and a central location without losing the feeling of a neighbourhood table.",
      items: [
        {
          title: "A family story since 1978",
          text: "Our connection to Van breakfast was built over decades, not invented for a trend. The dishes and the pace of service come from a living family tradition.",
        },
        {
          title: "Van specialities, not a generic buffet",
          text: "Herb cheese, murtuğa, kavut and warm pans give the table a regional vocabulary. You can understand what makes Van breakfast distinctive in one sitting.",
        },
        {
          title: "A historic Beyoğlu setting",
          text: "The restaurant occupies a historic building on Zambak Street. Its old details, intimate rooms and street-facing tables make the setting part of the meal.",
        },
        {
          title: "Easy to reach while sightseeing",
          text: "We are within walking distance of Taksim Square, İstiklal Avenue and Cihangir, so breakfast fits naturally before a day in Beyoğlu, Galata or the historic peninsula.",
        },
        {
          title: "A table made for families and friends",
          text: "The shared service works especially well for couples, families and groups. For larger parties or busy weekends, contacting us before arrival is recommended.",
        },
        {
          title: "A clear menu before you arrive",
          text: "Our live English menu shows current dishes and prices, helping international visitors plan comfortably before taking a seat.",
        },
      ],
    },
    firstVisit: {
      title: "How to enjoy your first Turkish breakfast",
      intro: "There is no formal etiquette, but a few small choices make the table easier to enjoy.",
      steps: [
        { title: "Come hungry and leave time", text: "Allow at least an hour; a shared breakfast is meant to unfold slowly." },
        { title: "Start with small portions", text: "Taste the regional cheeses and cold dishes before the hot pans arrive." },
        { title: "Mix savoury and sweet", text: "Moving between herb cheese, warm eggs, honey and preserves is completely natural." },
        { title: "Ask about ingredients", text: "Tell our team about allergies or dietary preferences before ordering so they can explain the current table." },
        { title: "Check the live menu", text: "Seasonal availability and prices can change; the online menu is the best current reference." },
      ],
    },
    practical: {
      title: "Plan your breakfast near Taksim",
      text:
        "Find us at Zambak Sk. No:8 in Şehit Muhtar, Beyoğlu. We are open every day from 08:00 to 18:00. Mornings and weekends can be lively, so groups may wish to call or message ahead.",
      labels: { address: "Address", hours: "Opening hours", route: "Open in Google Maps", menu: "English menu & prices", call: "Call us" },
    },
    faq: {
      title: "Questions international visitors ask",
      items: [
        { question: "What is the difference between Turkish breakfast and Van breakfast?", answer: "Turkish breakfast is the broad national tradition of sharing cheese, olives, vegetables, eggs, bread, honey, preserves and tea. Van breakfast is a regional version distinguished by products such as Van herb cheese, murtuğa, kavut and Van-style cacık." },
        { question: "Is Tarihi Van Kahvaltı Evi close to Taksim Square?", answer: "Yes. The restaurant is on Zambak Street in Beyoğlu, within walking distance of Taksim Square, İstiklal Avenue and Cihangir. Use our verified Google Maps link for the most accurate walking route." },
        { question: "Do I need a reservation for breakfast?", answer: "Walk-ins are welcome when tables are available. For weekends, holidays and larger groups, calling or sending a WhatsApp message before your visit is recommended." },
        { question: "Can I see the menu and prices in English?", answer: "Yes. Our English menu is available online and is kept aligned with the current dishes and prices served at the restaurant." },
        { question: "Is Turkish breakfast suitable for vegetarians?", answer: "Many traditional breakfast dishes are based on cheese, vegetables, eggs, bread, honey and preserves, but some hot dishes contain meat. Please tell the team your preferences and ask about the current ingredients before ordering." },
        { question: "What time is best for breakfast in Istanbul?", answer: "We serve from 08:00. Earlier weekday mornings are usually calmer, while late mornings and weekends have a more social atmosphere. Availability can vary, especially for groups." },
      ],
    },
    sources: {
      title: "Sources and editorial note",
      note: "The cultural definitions in this guide were checked against Türkiye’s official geographical-indication records and public culture inventory. Current restaurant dishes, availability and prices are stated separately in the live menu.",
      items: [...sourceItems.en],
    },
    closing: {
      title: "Come for breakfast. Stay for the table.",
      text: "Taste the ingredients that make Van breakfast distinct, in a historic Beyoğlu address shaped by a family story that began in 1978.",
      menu: "See today’s English menu",
      directions: "Get walking directions",
    },
    footer: { note: "Traditional Van breakfast in Beyoğlu since 1978.", home: "English home", menu: "Menu", directions: "Directions" },
    updatedLabel: "Last reviewed",
    dateLabel: "21 July 2026",
    authorLabel: "Tarihi Van Kahvaltı Evi editorial team",
  },
  ru: {
    locale: "ru",
    languageTag: "ru",
    direction: "ltr",
    path: guidePaths.ru,
    title: "Турецкий завтрак в Стамбуле: гид по ванскому завтраку",
    description:
      "Что входит в турецкий и ванский завтрак, почему стоит выбрать Tarihi Van Kahvaltı Evi рядом с Таксимом и как подготовиться к визиту.",
    ogLocale: "ru_RU",
    ogAlternateLocales: ["en_GB", "ar_SA", "ko_KR", "ja_JP"],
    hero: {
      note: "Гид по завтраку для гостей Стамбула",
      title: "Турецкий завтрак",
      accent: "по-вански.",
      lead:
        "Настоящий турецкий завтрак — это не одно блюдо и не быстрый бранч. Это общий стол с региональными сырами, горячими блюдами в медных сковородках, вареньем, хлебом и свежим чаем. Рассказываем, что попробовать и где найти такую традицию рядом с площадью Таксим.",
      readLabel: "Узнать главное",
      menuLabel: "Открыть меню с ценами",
      imageAlt: "Традиционный ванский завтрак с сыром с травами, яйцами, вареньем и турецким чаем",
      imageCaption: "Много небольших вкусов за одним общим столом.",
    },
    nav: { label: "В этом гиде", answer: "Что это", table: "Что подают", choose: "Почему мы", visit: "Спланировать визит", faq: "Вопросы" },
    shortAnswer: {
      label: "Короткий ответ",
      title: "Что такое традиционный турецкий завтрак?",
      paragraphs: [
        "Турецкий завтрак — kahvaltı — это совместная трапеза, где солёные и сладкие блюда появляются на столе одновременно. Сыры, оливки, помидоры, огурцы, яйца, свежий хлеб, мёд, каймак и варенье составляют привычную основу. Чай задаёт ритм завтрака: его подливают в небольшие стаканы на протяжении всей встречи.",
        "Ванский завтрак — особая региональная версия этой традиции. В ней важны продукты восточной провинции Ван: ароматный сыр с травами, муртуга, кавут, густой зелёный джаджик, выпечка кете и горячие блюда с яйцом. Главное здесь не количество, а разнообразие вкусов и неторопливое общение.",
        "Семейная история Tarihi Van Kahvaltı Evi связана с ванским завтраком с 1978 года. Сегодня мы продолжаем её в историческом здании на улице Zambak в Бейоглу — недалеко от площади Таксим, улицы Истикляль и района Джихангир.",
      ],
    },
    table: {
      title: "Что бывает на столе ванского завтрака?",
      intro: "Состав может меняться по сезону и актуальному меню, но именно эти вкусы отличают ванский завтрак от гостиничного буфета или обычного городского бранча.",
      items: [
        { name: "Ванский сыр с травами", role: "Главный региональный вкус", description: "Выразительный солёный сыр с местными ароматными травами. Особенно хорош с тёплым хлебом, помидорами и крепким чаем." },
        { name: "Муртуга", role: "Горячее блюдо из Вана", description: "Мука, обжаренная в сливочном масле, с добавлением яйца. Сытное блюдо, которое лучше пробовать сразу, пока сковородка горячая." },
        { name: "Кавут", role: "Аромат обжаренного зерна", description: "Традиционное блюдо на основе обжаренной зерновой муки и сливочного масла; вкус раскрывается с мёдом, пекмезом или вареньем." },
        { name: "Ванский джаджик", role: "Свежий акцент", description: "Гуще привычного джаджика: процеженный йогурт или творожная основа, свежая зелень и перец уравновешивают горячие блюда." },
        { name: "Мёд и каймак", role: "Классическая сладкая пара", description: "Ароматный мёд и нежные густые сливки на свежем хлебе — один из самых простых и запоминающихся вкусов стола." },
        { name: "Яйца на горячей сковороде", role: "Готовятся перед подачей", description: "Яичница, менемен, яйца с суджуком или кавурмой подаются горячими и становятся сытным центром общей трапезы." },
        { name: "Хлеб, кете и выпечка", role: "Для каждого соуса и намазки", description: "Разные виды выпечки соединяют сыр, сок горячих блюд, масло, мёд и варенье в постоянно меняющиеся сочетания." },
        { name: "Свежий турецкий чай", role: "Ритм завтрака", description: "Чай в стаканах-тюльпанах регулярно подливают, поэтому завтрак превращается в спокойный ритуал общения." },
      ],
    },
    tradition: {
      title: "Больше, чем бранч: культура общего стола",
      paragraphs: [
        "У турецкого завтрака нет строгой последовательности. За солёным сыром может следовать хлеб с мёдом и каймаком, затем горячее блюдо и новый стакан чая. Свободное чередование вкусов — важная часть удовольствия.",
        "Культура ванского завтрака выросла из утренних молочных домов и региональных традиций Вана, связанных с молочными продуктами, зерном и травами. Поэтому сытные горячие блюда здесь естественно соседствуют со свежей зеленью, сырами и небольшими сладкими порциями.",
        "Для путешественника это ещё и мягкое знакомство с турецким гостеприимством. Необязательно заранее знать все названия. Спросите, что подают сегодня, пробуйте понемногу и не торопите чай.",
      ],
      imageAlt: "Друзья делятся блюдами за ванским завтраком в Бейоглу",
      caption: "Здесь завтрак — это разговор, который ведут маленькие тарелки.",
    },
    reasons: {
      title: "Почему стоит выбрать Tarihi Van Kahvaltı Evi?",
      intro: "В Стамбуле много мест для завтрака. Наш адрес подойдёт тем, кто ищет настоящую семейную историю, узнаваемую региональную кухню и удобное расположение с атмосферой старого Бейоглу.",
      items: [
        { title: "Семейная история с 1978 года", text: "Наша связь с ванским завтраком создавалась десятилетиями. Блюда и неторопливый ритм сервиса происходят из живой семейной традиции." },
        { title: "Не безликий буфет, а кухня Вана", text: "Сыр с травами, муртуга, кавут и горячие сковородки дают столу ясный региональный характер, который можно понять за один завтрак." },
        { title: "Историческая атмосфера Бейоглу", text: "Ресторан находится в старинном здании на улице Zambak. Сохранившиеся детали, небольшие залы и столики у улицы становятся частью впечатления." },
        { title: "Удобно для прогулки по центру", text: "От нас можно пешком дойти до площади Таксим, Истикляля и Джихангира. Завтрак легко совместить с прогулкой по Бейоглу, Галате или историческому центру." },
        { title: "Для пары, семьи и компании", text: "Общий формат подачи особенно удобен для семей и друзей. Для большой группы или визита в выходной лучше заранее связаться с нами." },
        { title: "Актуальное меню до визита", text: "Онлайн-меню на английском показывает актуальные блюда и цены, чтобы иностранным гостям было проще спланировать заказ." },
      ],
    },
    firstVisit: {
      title: "Как получить удовольствие от первого турецкого завтрака",
      intro: "Строгих правил нет, но несколько советов помогут лучше почувствовать общий стол.",
      steps: [
        { title: "Приходите голодными и не спешите", text: "Оставьте не меньше часа: вкус завтрака раскрывается постепенно." },
        { title: "Начните с маленьких порций", text: "Сначала попробуйте региональные сыры и холодные закуски, затем переходите к горячим блюдам." },
        { title: "Чередуйте солёное и сладкое", text: "Сыр с травами, яйца, мёд и варенье естественно сменяют друг друга." },
        { title: "Сообщите об ограничениях", text: "До заказа расскажите команде об аллергии и предпочтениях, чтобы уточнить актуальный состав блюд." },
        { title: "Проверьте онлайн-меню", text: "Сезонное наличие и цены могут меняться; актуальная версия опубликована на сайте." },
      ],
    },
    practical: {
      title: "Спланируйте завтрак рядом с Таксимом",
      text: "Мы находимся по адресу Zambak Sk. No:8, Şehit Muhtar, Beyoğlu. Открыты ежедневно с 08:00 до 18:00. По утрам и в выходные бывает оживлённо, поэтому большим компаниям лучше позвонить заранее.",
      labels: { address: "Адрес", hours: "Часы работы", route: "Открыть Google Maps", menu: "Меню и цены", call: "Позвонить" },
    },
    faq: {
      title: "Частые вопросы гостей",
      items: [
        { question: "Чем турецкий завтрак отличается от ванского?", answer: "Турецкий завтрак — общее название традиции с сырами, оливками, овощами, яйцами, хлебом, мёдом, вареньем и чаем. Ванская версия отличается региональными продуктами: сыром с травами, муртугой, кавутом и густым ванским джаджиком." },
        { question: "Ресторан находится рядом с площадью Таксим?", answer: "Да. Мы находимся на улице Zambak в Бейоглу, в пешей доступности от площади Таксим, Истикляля и Джихангира. Для точного маршрута используйте ссылку на нашу подтверждённую точку в Google Maps." },
        { question: "Нужна ли бронь на завтрак?", answer: "Если есть свободные столики, мы принимаем гостей без брони. В выходные, праздники и для большой компании рекомендуем заранее позвонить или написать в WhatsApp." },
        { question: "Можно ли посмотреть меню и цены онлайн?", answer: "Да. Актуальное английское меню опубликовано на сайте и соответствует текущим блюдам и ценам ресторана." },
        { question: "Подойдёт ли турецкий завтрак вегетарианцам?", answer: "Многие блюда состоят из сыра, овощей, яиц, хлеба, мёда и варенья, но некоторые горячие позиции содержат мясо. Сообщите о предпочтениях и уточните состав до заказа." },
        { question: "В какое время лучше приходить на завтрак?", answer: "Мы открываемся в 08:00. Утром в будни обычно спокойнее, а поздним утром и в выходные атмосфера оживлённее. Для групп доступность столов может меняться." },
      ],
    },
    sources: {
      title: "Источники и редакционная заметка",
      note: "Описания культуры и блюд сверены с официальными реестрами географических указаний и культурным порталом Турции. Актуальные блюда, наличие и цены указаны отдельно в онлайн-меню.",
      items: [...sourceItems.ru],
    },
    closing: { title: "Приходите за завтраком. Оставайтесь ради общения.", text: "Попробуйте вкусы настоящего ванского завтрака в историческом Бейоглу — там, где семейная история продолжается с 1978 года.", menu: "Посмотреть актуальное меню", directions: "Построить маршрут" },
    footer: { note: "Традиционный ванский завтрак в Бейоглу с 1978 года.", home: "Главная на английском", menu: "Меню", directions: "Как добраться" },
    updatedLabel: "Проверено",
    dateLabel: "21 июля 2026",
    authorLabel: "Редакция Tarihi Van Kahvaltı Evi",
  },
  ar: {
    locale: "ar",
    languageTag: "ar",
    direction: "rtl",
    path: guidePaths.ar,
    title: "الفطور التركي في إسطنبول: دليل فطور فان التقليدي",
    description:
      "تعرّف على مكونات الفطور التركي وفطور فان، ولماذا يختار الزوار مطعم Tarihi Van Kahvaltı Evi قرب تقسيم، مع معلومات الزيارة والأسعار.",
    ogLocale: "ar_SA",
    ogAlternateLocales: ["en_GB", "ru_RU", "ko_KR", "ja_JP"],
    hero: {
      note: "دليل الفطور لزوار إسطنبول",
      title: "الفطور التركي،",
      accent: "على طريقة فان.",
      lead:
        "الفطور التركي الأصيل ليس طبقاً واحداً ولا وجبة سريعة. إنه مائدة مشتركة تجمع الأجبان المحلية والأطباق الساخنة في المقالي النحاسية والمربيات والخبز وأكواب الشاي المتجددة. في هذا الدليل نوضح ما الذي ستتذوقه وأين تعيش التجربة بالقرب من ميدان تقسيم.",
      readLabel: "ابدأ بالخلاصة",
      menuLabel: "شاهد القائمة والأسعار",
      imageAlt: "مائدة فطور فان تقليدية تضم جبن الأعشاب والبيض والمربى والشاي التركي",
      imageCaption: "مائدة واحدة، نكهات صغيرة كثيرة، ووقت كافٍ للمشاركة.",
    },
    nav: { label: "في هذا الدليل", answer: "ما هو الفطور", table: "ماذا يقدم", choose: "لماذا نحن", visit: "خطط لزيارتك", faq: "الأسئلة" },
    shortAnswer: {
      label: "الإجابة المختصرة",
      title: "ما هو الفطور التركي التقليدي؟",
      paragraphs: [
        "الفطور التركي، أو kahvaltı، وجبة جماعية تجتمع فيها الأصناف المالحة والحلوة في الوقت نفسه. تشكل الأجبان والزيتون والطماطم والخيار والبيض والخبز والعسل والقيمر والمربى أساس المائدة. أما الشاي فليس إضافة جانبية؛ بل هو الذي يحدد إيقاع الجلسة ويُعاد ملء أكوابه طوال الفطور.",
        "فطور فان هو التعبير الإقليمي المميز لهذه العادة. يضيف نكهات مرتبطة بمدينة فان شرقي تركيا، مثل جبن فان بالأعشاب والمورتوغا والكاڤوت والجاجيك الكثيف بالأعشاب وكعك الكِتِه وأطباق البيض الساخنة. سر التجربة في التنوع والتوازن والجلوس من دون استعجال.",
        "تحمل عائلة Tarihi Van Kahvaltı Evi ثقافة فطور فان منذ عام 1978. واليوم نقدمها في مبنى تاريخي بشارع زامباك في بيوغلو، على مسافة قريبة سيراً من ميدان تقسيم وشارع الاستقلال وجيهانغير.",
      ],
    },
    table: {
      title: "ماذا تجد على مائدة فطور فان؟",
      intro: "قد تتغير بعض الأصناف بحسب الموسم والقائمة الحالية، لكن هذه النكهات هي التي تجعل فطور فان مختلفاً عن بوفيه الفندق أو البرنش المعتاد.",
      items: [
        { name: "جبن فان بالأعشاب", role: "النكهة الإقليمية الأساسية", description: "جبن مالح عطري يُحضّر تقليدياً بأعشاب محلية. ينسجم خصوصاً مع الخبز الدافئ والطماطم والشاي." },
        { name: "المورتوغا", role: "طبق فان ساخن", description: "دقيق يُحمّص بالزبدة ثم يضاف إليه البيض. طبق غني ومريح يُفضّل تذوقه فور وصول المقلاة ساخنة." },
        { name: "الكاڤوت", role: "نكهة الحبوب المحمصة", description: "تحضير تقليدي يعتمد على الحبوب المحمصة والزبدة، ويتوازن مذاقه مع العسل أو دبس العنب أو المربى." },
        { name: "جاجيك فان", role: "نكهة باردة وعشبية", description: "أكثر كثافة من الجاجيك المعتاد، ويجمع اللبن المصفى أو الجبن الطري مع الأعشاب الطازجة والفلفل." },
        { name: "العسل والقيمر", role: "الثنائي الحلو الكلاسيكي", description: "عسل عطري وقيمر ناعم فوق الخبز الطازج يصنعان واحدة من أبسط وأجمل لقمات المائدة." },
        { name: "مقالي البيض الساخنة", role: "تُطهى عند الطلب", description: "بيض مقلي أو منمن أو بيض مع السجق أو اللحم المطهو يصل ساخناً ليمنح المائدة مركزها المشبع." },
        { name: "الخبز والكِتِه والمعجنات", role: "للتغميس والمشاركة", description: "قوامات مختلفة تحمل الجبن وعصارة الأطباق الساخنة والزبدة والعسل والمربى من لقمة إلى أخرى." },
        { name: "الشاي التركي الطازج", role: "إيقاع الفطور", description: "يُقدم في كؤوس بشكل زهرة التوليب ويُجدّد طوال الجلسة، فيحوّل الفطور إلى طقس اجتماعي هادئ." },
      ],
    },
    tradition: {
      title: "أكثر من برنش: ثقافة المائدة المشتركة",
      paragraphs: [
        "لا يفرض الفطور التركي ترتيباً ثابتاً. قد تتبع قطعة الجبن المالحة لقمة خبز بالعسل والقيمر، ثم ملعقة من طبق ساخن وكأس آخر من الشاي. هذا الانتقال الحر بين النكهات جزء أصيل من المتعة.",
        "نشأت ثقافة فطور فان حول بيوت الحليب الصباحية وتقاليد المنطقة في منتجات الألبان والحبوب والأعشاب. لذلك تجاور الأطباق الساخنة المشبعة الخضرة الطازجة والأجبان والنكهات الحلوة الصغيرة بتوازن طبيعي.",
        "وبالنسبة للمسافر، إنها طريقة لطيفة للتعرف إلى الضيافة التركية اليومية. لا تحتاج إلى معرفة أسماء جميع الأطباق قبل الجلوس؛ اسأل عن أصناف اليوم، تذوق قليلاً من كل شيء واترك وقتاً للشاي.",
      ],
      imageAlt: "أصدقاء يتشاركون أطباق فطور فان على مائدة في بيوغلو",
      caption: "الفطور هنا حوار تقوده الأطباق الصغيرة.",
    },
    reasons: {
      title: "لماذا تختار Tarihi Van Kahvaltı Evi؟",
      intro: "تضم إسطنبول أماكن كثيرة للفطور. مكاننا يناسب من يبحث عن قصة عائلية حقيقية وهوية إقليمية واضحة وموقع مركزي يحتفظ بروح مائدة الحي.",
      items: [
        { title: "قصة عائلية منذ 1978", text: "علاقتنا بفطور فان بُنيت عبر عقود ولم تُنشأ من أجل موضة عابرة. الأطباق وإيقاع الخدمة امتداد لتقليد عائلي حي." },
        { title: "تخصصات فان لا بوفيه عام", text: "جبن الأعشاب والمورتوغا والكاڤوت والمقالي الساخنة تمنح المائدة مفرداتها المحلية، فتفهم خصوصية فطور فان في جلسة واحدة." },
        { title: "أجواء تاريخية في بيوغلو", text: "يشغل المطعم مبنى تاريخياً في شارع زامباك. تفاصيله القديمة وغرفه الحميمة وطاولاته المطلة على الشارع تصبح جزءاً من الوجبة." },
        { title: "سهل الوصول أثناء جولتك", text: "نحن على مسافة مشي من ميدان تقسيم وشارع الاستقلال وجيهانغير، ويمكن أن يبدأ الفطور يوماً في بيوغلو أو غلطة أو المدينة القديمة." },
        { title: "مائدة للعائلة والأصدقاء", text: "أسلوب المشاركة مناسب للأزواج والعائلات والمجموعات. وللمجموعات الكبيرة أو عطلة نهاية الأسبوع ننصح بالتواصل قبل الوصول." },
        { title: "قائمة واضحة قبل الزيارة", text: "تعرض قائمتنا الإنجليزية المباشرة الأطباق والأسعار الحالية، لتتمكن من التخطيط براحة قبل الجلوس." },
      ],
    },
    firstVisit: {
      title: "كيف تستمتع بأول فطور تركي؟",
      intro: "لا توجد قواعد رسمية، لكن بعض الخطوات الصغيرة تجعل التجربة أسهل وأمتع.",
      steps: [
        { title: "تعال جائعاً واترك وقتاً", text: "خصص ساعة على الأقل؛ فالمائدة المشتركة مصممة لتتطور بهدوء." },
        { title: "ابدأ بكميات صغيرة", text: "تذوق الأجبان الإقليمية والأطباق الباردة قبل وصول المقالي الساخنة." },
        { title: "انتقل بين المالح والحلو", text: "التنقل بين جبن الأعشاب والبيض والعسل والمربى أمر طبيعي تماماً." },
        { title: "اسأل عن المكونات", text: "أخبر فريقنا عن الحساسية أو التفضيلات الغذائية قبل الطلب لشرح مكونات مائدة اليوم." },
        { title: "راجع القائمة المباشرة", text: "قد يتغير التوفر الموسمي والأسعار؛ والقائمة الإلكترونية هي المرجع الأحدث." },
      ],
    },
    practical: {
      title: "خطط لفطورك بالقرب من تقسيم",
      text: "ستجدنا في Zambak Sk. No:8، Şehit Muhtar، Beyoğlu. نفتح يومياً من 08:00 إلى 18:00. قد تكون ساعات الصباح وعطلات نهاية الأسبوع نشطة، لذلك يُفضّل أن تتواصل المجموعات معنا مسبقاً.",
      labels: { address: "العنوان", hours: "ساعات العمل", route: "افتح خرائط Google", menu: "القائمة والأسعار", call: "اتصل بنا" },
    },
    faq: {
      title: "أسئلة يطرحها الزوار العرب",
      items: [
        { question: "ما الفرق بين الفطور التركي وفطور فان؟", answer: "الفطور التركي هو التقليد العام الذي يجمع الأجبان والزيتون والخضار والبيض والخبز والعسل والمربى والشاي. أما فطور فان فهو نسخة إقليمية تتميز بجبن فان بالأعشاب والمورتوغا والكاڤوت وجاجيك فان الكثيف." },
        { question: "هل المطعم قريب من ميدان تقسيم؟", answer: "نعم. يقع المطعم في شارع زامباك ببيوغلو، على مسافة مشي من ميدان تقسيم وشارع الاستقلال وجيهانغير. استخدم رابط موقعنا الموثق على خرائط Google للحصول على أدق مسار." },
        { question: "هل أحتاج إلى حجز للفطور؟", answer: "نستقبل الزوار من دون حجز عند توفر الطاولات. ننصح بالاتصال أو إرسال رسالة واتساب قبل الزيارة في عطلة نهاية الأسبوع والأعياد وللمجموعات الكبيرة." },
        { question: "هل يمكنني رؤية القائمة والأسعار قبل الزيارة؟", answer: "نعم. القائمة الإنجليزية متاحة على الموقع ويتم تحديثها بما يتوافق مع الأطباق والأسعار الحالية في المطعم." },
        { question: "هل الفطور التركي مناسب للنباتيين؟", answer: "تعتمد أصناف تقليدية كثيرة على الجبن والخضار والبيض والخبز والعسل والمربى، لكن بعض الأطباق الساخنة تحتوي على اللحم. أخبر الفريق بتفضيلاتك واسأل عن المكونات الحالية قبل الطلب." },
        { question: "ما أفضل وقت للفطور في إسطنبول؟", answer: "نقدم الفطور من الساعة 08:00. تكون صباحات أيام الأسبوع المبكرة أهدأ عادة، بينما تكون الساعات المتأخرة وعطلات نهاية الأسبوع أكثر حيوية. قد يختلف توفر الطاولات للمجموعات." },
      ],
    },
    sources: {
      title: "المصادر وملاحظة التحرير",
      note: "تمت مراجعة التعريفات الثقافية في هذا الدليل بالرجوع إلى سجلات المؤشرات الجغرافية الرسمية وبوابة الثقافة التركية. تُذكر الأطباق الحالية والتوفر والأسعار بشكل منفصل في القائمة المباشرة.",
      items: [...sourceItems.ar],
    },
    closing: { title: "تعال من أجل الفطور، وابقَ من أجل المائدة.", text: "تذوق ما يميز فطور فان في عنوان تاريخي ببيوغلو، تصوغه قصة عائلية بدأت عام 1978.", menu: "شاهد قائمة اليوم", directions: "احصل على الاتجاهات" },
    footer: { note: "فطور فان التقليدي في بيوغلو منذ 1978.", home: "الصفحة الإنجليزية", menu: "القائمة", directions: "الاتجاهات" },
    updatedLabel: "آخر مراجعة",
    dateLabel: "21 يوليو 2026",
    authorLabel: "فريق تحرير Tarihi Van Kahvaltı Evi",
  },
  ko: {
    locale: "ko",
    languageTag: "ko-KR",
    direction: "ltr",
    path: guidePaths.ko,
    title: "이스탄불 발 카이막 맛집: 터키 꿀·카이막 가이드 | Tarihi Van",
    description:
      "이스탄불 탁심 근처에서 터키식 발 카이막을 맛보세요. 꿀과 카이막을 먹는 법, 반 아침 식사 구성, 위치와 영업시간을 한국어로 안내합니다.",
    ogLocale: "ko_KR",
    ogAlternateLocales: ["en_GB", "ru_RU", "ar_SA", "ja_JP"],
    hero: {
      note: "한국인 여행자를 위한 이스탄불 아침 식사 가이드",
      title: "이스탄불에서 만나는",
      accent: "발 카이막.",
      lead:
        "향긋한 꿀과 부드럽고 진한 카이막을 따뜻한 빵에 함께 올리는 발 카이막은 터키식 아침 식사의 가장 기억에 남는 한입입니다. 탁심 광장에서 걸어갈 수 있는 베요글루의 역사적인 공간에서, 1978년부터 이어온 반(Van)식 아침 식사와 함께 즐겨 보세요.",
      readLabel: "발 카이막부터 알아보기",
      menuLabel: "영문 메뉴와 가격 보기",
      imageAlt: "꿀과 카이막, 치즈, 피시, 차가 차려진 Tarihi Van Kahvaltı Evi의 반식 아침 식탁",
      imageCaption: "꿀 한 스푼, 카이막 한 조각, 따뜻한 빵 한입에서 시작되는 터키의 아침.",
    },
    nav: {
      label: "이 가이드에서",
      answer: "발 카이막이란",
      table: "함께 나오는 음식",
      choose: "이곳을 찾는 이유",
      visit: "방문 정보",
      faq: "자주 묻는 질문",
    },
    shortAnswer: {
      label: "먼저, 핵심만",
      title: "발 카이막은 어떤 음식인가요?",
      paragraphs: [
        "발 카이막(bal kaymak)은 꿀을 뜻하는 ‘발(bal)’과 진하고 부드러운 유제품인 ‘카이막(kaymak)’을 함께 먹는 터키의 대표적인 아침 조합입니다. 카이막은 버터처럼 짜지 않고 생크림보다 밀도 있는 질감이 특징입니다. 따뜻한 빵이나 피시에 카이막을 먼저 얹고 꿀을 곁들이면 고소함과 꽃향기 나는 단맛이 자연스럽게 이어집니다.",
        "터키식 아침 식사인 카흐발트(kahvaltı)는 달콤한 음식과 짭짤한 음식을 한 상에서 번갈아 맛보는 식사입니다. 발 카이막만 단독으로 주문하기보다 치즈, 올리브, 달걀 요리, 잼, 빵, 차와 함께 천천히 즐길 때 그 매력이 더 잘 드러납니다.",
        "Tarihi Van Kahvaltı Evi는 1978년부터 이어온 가족의 반 아침 식사 문화를 베요글루 잠박 거리의 역사적인 건물에서 선보입니다. 탁심 광장, 이스티클랄 거리, 지한기르에서 걸어서 방문할 수 있습니다.",
      ],
    },
    table: {
      title: "발 카이막과 무엇을 함께 먹나요?",
      intro:
        "계절과 당일 준비 상황에 따라 세부 구성은 달라질 수 있지만, 다음 음식들은 발 카이막을 중심으로 반 아침 식사의 단맛과 짠맛을 균형 있게 경험하게 해 줍니다.",
      items: [
        {
          name: "발 카이막",
          role: "꿀과 진한 우유 풍미의 조합",
          description:
            "따뜻한 빵에 카이막을 넉넉히 올린 뒤 꿀을 조금 더합니다. 처음부터 모두 섞기보다 한입씩 비율을 바꿔 보면 카이막의 고소함과 꿀의 향을 각각 느낄 수 있습니다.",
        },
        {
          name: "피시와 신선한 빵",
          role: "발 카이막을 담는 따뜻한 한입",
          description:
            "갓 튀긴 피시의 가벼운 바삭함과 부드러운 속살, 또는 담백한 빵은 꿀과 카이막을 가장 편하게 즐기는 바탕이 됩니다.",
        },
        {
          name: "반 허브 치즈",
          role: "달콤함을 깨우는 짭짤한 맛",
          description:
            "향긋한 지역 허브가 들어간 반의 대표 치즈입니다. 발 카이막 사이에 조금씩 맛보면 단맛과 짠맛의 대비가 선명해집니다.",
        },
        {
          name: "무르투아",
          role: "버터와 달걀의 따뜻한 풍미",
          description:
            "밀가루를 버터에 볶고 달걀을 더하는 반의 따뜻한 음식입니다. 팬이 따뜻할 때 조금씩 나누어 먹는 것이 좋습니다.",
        },
        {
          name: "카부트",
          role: "구운 곡물의 깊은 고소함",
          description:
            "볶은 곡물과 버터를 바탕으로 한 반의 전통 음식입니다. 꿀이나 페크메즈와 곁들이면 발 카이막과는 다른 고소한 단맛을 비교할 수 있습니다.",
        },
        {
          name: "따뜻한 달걀 팬",
          role: "식탁의 든든한 중심",
          description:
            "달걀 프라이, 메네멘, 수죽 또는 카부르마를 넣은 달걀 요리가 뜨겁게 제공되어 여러 작은 접시를 하나의 식사로 이어 줍니다.",
        },
        {
          name: "수제 잼과 올리브",
          role: "달고 짠 맛의 리듬",
          description:
            "잼의 과일 향과 올리브의 짭짤함을 번갈아 맛보면 발 카이막의 부드러운 단맛이 지루하지 않게 이어집니다.",
        },
        {
          name: "터키 차이",
          role: "천천히 이어지는 아침의 리듬",
          description:
            "튤립 모양 잔에 담긴 따뜻한 차이는 입안을 가볍게 정리하고, 여러 접시를 서두르지 않고 즐기도록 식사의 속도를 만들어 줍니다.",
        },
      ],
    },
    tradition: {
      title: "디저트가 아니라, 아침 식사의 한 장면",
      paragraphs: [
        "발 카이막은 식사 끝에 따로 먹는 디저트라기보다 터키식 아침 식탁의 일부입니다. 허브 치즈 한입 다음에 꿀과 카이막을 올린 빵을 먹고, 다시 따뜻한 달걀 요리와 차로 이어 가는 자유로운 순서가 자연스럽습니다.",
        "반 아침 식사는 유제품, 곡물, 지역 허브와 따뜻한 요리를 한 상에 함께 놓는 전통으로 알려져 있습니다. 풍성해 보이지만 핵심은 많은 양을 빨리 먹는 데 있지 않습니다. 작은 접시를 함께 나누고 서로 다른 맛을 천천히 비교하는 것이 이 식사의 방식입니다.",
        "처음 방문한다면 발 카이막의 양을 한 번에 정하지 않아도 됩니다. 카이막을 먼저 맛보고 꿀을 조금씩 더해 자신에게 맞는 비율을 찾아보세요. 알레르기나 식단 제한이 있다면 주문 전에 직원에게 현재 재료를 확인하는 것이 좋습니다.",
      ],
      imageAlt: "Tarihi Van Kahvaltı Evi 식탁의 꿀을 올린 카이막, 신선한 빵과 터키 차",
      caption: "매장에서 실제 제공된 식탁의 카이막과 꿀, 빵, 터키 차.",
    },
    reasons: {
      title: "왜 Tarihi Van Kahvaltı Evi인가요?",
      intro:
        "이스탄불에는 카이막을 파는 곳이 많습니다. 이곳은 발 카이막 한 접시뿐 아니라 반 지역의 아침 문화, 가족의 역사, 베요글루의 공간까지 함께 경험하고 싶은 여행자에게 어울립니다.",
      items: [
        { title: "1978년부터 이어진 가족의 식탁", text: "유행을 위해 만든 콘셉트가 아니라 오랜 시간 이어온 가족의 반 아침 식사 경험을 바탕으로 음식을 준비합니다." },
        { title: "발 카이막을 한 상 안에서 경험", text: "꿀과 카이막을 피시, 허브 치즈, 잼, 따뜻한 팬 요리와 번갈아 맛보며 터키식 아침 식사의 균형을 이해할 수 있습니다." },
        { title: "역사적인 베요글루 공간", text: "잠박 거리의 오래된 건물, 작은 방과 거리 쪽 테이블이 식사의 분위기를 만듭니다. 실제 공간과 아침 식탁을 함께 기억하게 됩니다." },
        { title: "탁심 여행 동선에 편리한 위치", text: "탁심 광장과 이스티클랄 거리, 지한기르에서 걸어갈 수 있어 베요글루와 갈라타 여행을 시작하기 좋습니다." },
        { title: "둘이서도, 가족과도 좋은 공유 방식", text: "여러 접시를 나누는 구성은 커플, 가족, 친구 여행에 잘 맞습니다. 주말이나 인원이 많은 경우 방문 전에 연락하는 것을 권합니다." },
        { title: "방문 전 확인할 수 있는 실시간 메뉴", text: "영문 온라인 메뉴에서 현재 음식과 가격을 확인할 수 있습니다. 계절과 당일 준비에 따라 제공 여부가 달라질 수 있습니다." },
      ],
    },
    firstVisit: {
      title: "발 카이막을 더 맛있게 즐기는 순서",
      intro: "정해진 예절은 없지만, 처음이라면 다음 순서가 각 재료의 차이를 느끼는 데 도움이 됩니다.",
      steps: [
        { title: "카이막만 먼저 맛보기", text: "작은 양을 먼저 맛보며 우유의 고소함과 질감을 확인하세요." },
        { title: "꿀을 조금씩 더하기", text: "한 번에 섞지 말고 한입마다 비율을 바꿔 향과 단맛을 조절해 보세요." },
        { title: "따뜻한 빵과 피시 사용하기", text: "빵의 온기와 식감이 카이막을 부드럽게 풀어 주고 꿀의 향을 살려 줍니다." },
        { title: "짭짤한 음식과 번갈아 먹기", text: "허브 치즈, 올리브, 달걀을 사이에 맛보면 단맛이 더 또렷해집니다." },
        { title: "차를 곁들이며 천천히 즐기기", text: "차이는 입안을 정리하고 공유 식탁의 여유로운 속도를 이어 줍니다." },
      ],
    },
    practical: {
      title: "탁심 근처 발 카이막 방문 정보",
      text:
        "주소는 Zambak Sk. No:8, Şehit Muhtar, Beyoğlu입니다. 매일 08:00–18:00에 문을 엽니다. 주말 늦은 아침에는 붐빌 수 있으므로 단체 방문이라면 전화나 WhatsApp으로 미리 좌석 상황을 확인하세요.",
      labels: { address: "주소", hours: "영업시간", route: "Google 지도에서 길찾기", menu: "영문 메뉴와 가격", call: "전화하기" },
    },
    faq: {
      title: "한국인 여행자가 자주 묻는 질문",
      items: [
        { question: "발 카이막은 무엇인가요?", answer: "발은 터키어로 꿀, 카이막은 우유에서 얻는 진하고 부드러운 유제품입니다. 따뜻한 빵이나 피시에 카이막을 올리고 꿀을 곁들여 먹는 터키식 아침 식사의 대표 조합입니다." },
        { question: "카이막은 버터나 생크림과 같은가요?", answer: "완전히 같지 않습니다. 카이막은 일반적인 버터처럼 짜지 않고, 휘핑한 생크림보다 더 조밀하고 진한 질감을 가집니다. 생산 방식과 원유에 따라 맛과 질감은 달라질 수 있습니다." },
        { question: "Tarihi Van Kahvaltı Evi는 탁심 광장에서 가까운가요?", answer: "네. 베요글루 잠박 거리에 있으며 탁심 광장, 이스티클랄 거리, 지한기르에서 걸어갈 수 있습니다. 정확한 도보 경로는 페이지의 인증된 Google 지도 링크를 이용하세요." },
        { question: "발 카이막만 주문할 수 있나요?", answer: "메뉴 구성과 제공 여부는 당일 준비 상황에 따라 달라질 수 있습니다. 방문 전 온라인 메뉴를 확인하거나 매장에 문의하세요. 반식 공유 아침과 함께 맛보면 다양한 조합을 경험할 수 있습니다." },
        { question: "예약이 필요한가요?", answer: "자리가 있으면 예약 없이도 방문할 수 있습니다. 주말, 공휴일, 단체 방문은 전화나 WhatsApp으로 미리 좌석 상황을 확인하는 것을 권합니다." },
        { question: "알레르기가 있으면 어떻게 해야 하나요?", answer: "카이막은 유제품이며 아침 식탁에는 달걀, 글루텐, 견과류 등 알레르기 유발 재료가 포함될 수 있습니다. 주문 전에 직원에게 알레르기를 알리고 당일 사용하는 재료와 교차 접촉 가능성을 확인하세요." },
      ],
    },
    sources: {
      title: "출처와 편집 안내",
      note: "반 아침 식사와 지역 음식에 대한 설명은 튀르키예의 공식 지리적 표시 자료와 문화 포털을 기준으로 검토했습니다. 매장의 현재 구성, 가격, 제공 여부는 실시간 메뉴에서 별도로 확인할 수 있습니다.",
      items: [...sourceItems.ko],
    },
    closing: {
      title: "발 카이막 한입에서 반의 아침 식탁으로.",
      text: "1978년부터 이어온 가족의 아침 문화를 베요글루의 역사적인 공간에서 천천히 경험해 보세요.",
      menu: "오늘의 영문 메뉴 보기",
      directions: "도보 길찾기",
    },
    footer: { note: "1978년부터 베요글루에서 이어온 전통 반 아침 식사.", home: "영문 홈페이지", menu: "메뉴", directions: "길찾기" },
    updatedLabel: "마지막 검토",
    dateLabel: "2026년 7월 21일",
    authorLabel: "Tarihi Van Kahvaltı Evi 편집팀",
    media: {
      hero: "/images/blog/istanbul-bal-kaymak.webp",
      article: "/images/blog/bal-kaymak-close-up.webp",
      og: "/images/og/istanbul-bal-kaymak.jpg",
    },
    seo: {
      articleSection: "이스탄불 발 카이막과 터키식 아침 식사",
      about: ["발 카이막", "터키식 아침 식사", "반 아침 식사", "베요글루"],
      mentions: ["카이막", "꿀", "피시", "반 허브 치즈", "무르투아", "카부트"],
      menuItem: {
        name: "꿀, 버팔로 카이막과 수제 잼",
        description: "체에 거른 꿀, 버팔로 카이막, 계절에 따라 준비하는 수제 잼 2종",
        url: "/en/menu#bal-kaymak-recel",
      },
    },
    travelerBrief: {
      label: "한눈에 보기",
      title: "한국인 여행자를 위한 발 카이막 핵심 정보",
      intro: "검색 결과에서 바로 확인할 수 있도록 메뉴, 위치, 영업시간과 주문 표현을 한곳에 정리했습니다. 가격과 당일 제공 여부는 실시간 영문 메뉴가 가장 정확합니다.",
      facts: [
        { label: "현재 메뉴 구성", value: "체에 거른 꿀, 버팔로 카이막, 계절 수제 잼 2종" },
        { label: "위치", value: "Zambak Sk. No:8, Şehit Muhtar, Beyoğlu, İstanbul" },
        { label: "영업시간", value: "매일 08:00–18:00" },
        { label: "여행 동선", value: "탁심 광장·이스티클랄 거리·지한기르에서 도보 이동 가능" },
      ],
      comparison: {
        title: "카이막·버터·생크림은 어떻게 다른가요?",
        columns: ["음식", "질감", "맛과 먹는 법"],
        rows: [
          { name: "카이막", texture: "조밀하고 부드러움", taste: "고소하고 진한 우유 풍미. 꿀과 빵에 곁들임" },
          { name: "버터", texture: "단단하거나 녹는 지방", taste: "제품에 따라 짠맛이 있으며 빵이나 조리에 사용" },
          { name: "생크림", texture: "액체 또는 휘핑한 거품", taste: "카이막보다 가볍고 디저트와 음료에 자주 사용" },
        ],
      },
      phrases: {
        title: "주문할 때 유용한 터키어",
        intro: "짧은 문장을 화면으로 보여 주거나 그대로 읽어도 됩니다. 알레르기는 주문 전에 반드시 직원에게 알려 주세요.",
        items: [
          { turkish: "Bal kaymak var mı?", translation: "발 카이막이 있나요?" },
          { turkish: "İki kişilik Van kahvaltısı, lütfen.", translation: "2인용 반 아침 식사 부탁합니다." },
          { turkish: "İçinde kuruyemiş var mı?", translation: "견과류가 들어 있나요?" },
        ],
      },
    },
  },
  ja: {
    locale: "ja",
    languageTag: "ja-JP",
    direction: "ltr",
    path: guidePaths.ja,
    title: "イスタンブールのバル・カイマク｜タクシム近くのトルコ朝食ガイド",
    description:
      "イスタンブールで蜂蜜とカイマクを味わう日本人旅行者向けガイド。タクシム近くの店舗、食べ方、ヴァン朝食、営業時間、メニュー、注文に役立つトルコ語を紹介します。",
    ogLocale: "ja_JP",
    ogAlternateLocales: ["en_GB", "ru_RU", "ar_SA", "ko_KR"],
    hero: {
      note: "日本人旅行者のためのイスタンブール朝食ガイド",
      title: "イスタンブールで味わう",
      accent: "バル・カイマク。",
      lead:
        "香りのよい蜂蜜と濃厚でなめらかなカイマクを温かいパンに重ねるバル・カイマクは、トルコ朝食を代表する一品です。タクシム広場から歩けるベヨールの歴史ある店で、1978年から続くヴァン式の朝食と一緒にお楽しみください。",
      readLabel: "バル・カイマクを知る",
      menuLabel: "英語メニューと価格を見る",
      imageAlt: "Tarihi Van Kahvaltı Eviで提供する蜂蜜とカイマク、チーズ、ピシ、トルコ紅茶のヴァン朝食",
      imageCaption: "蜂蜜、カイマク、温かいパンから始まるトルコの朝。",
    },
    nav: {
      label: "このガイドの内容",
      answer: "バル・カイマクとは",
      table: "一緒に味わう料理",
      choose: "この店を選ぶ理由",
      visit: "店舗・アクセス",
      faq: "よくある質問",
    },
    shortAnswer: {
      label: "まずは要点",
      title: "バル・カイマクとは？",
      paragraphs: [
        "バル・カイマク（bal kaymak）は、トルコ語で蜂蜜を意味する「バル」と、乳から作る濃厚でなめらかな乳製品「カイマク」を合わせた定番の朝食です。カイマクは一般的なバターのような塩気がなく、ホイップクリームより密度があります。パンや揚げパンのピシにカイマクをのせ、蜂蜜を少量かけて味わいます。",
        "トルコ朝食のカフヴァルトゥ（kahvaltı）は、甘い料理と塩味の料理を同じテーブルで少しずつ楽しむ食事です。バル・カイマクだけでなく、チーズ、オリーブ、卵料理、ジャム、パン、チャイと交互に味わうと、甘さと塩味のバランスがよく分かります。",
        "Tarihi Van Kahvaltı Eviは、1978年から家族で受け継いできたヴァン朝食の文化を、ベヨールのザンバック通りにある歴史的な建物で紹介しています。タクシム広場、イスティクラル通り、ジハンギルから徒歩でアクセスできます。",
      ],
    },
    table: {
      title: "バル・カイマクと何を食べる？",
      intro:
        "季節や当日の仕込みによって内容は変わりますが、次の料理を組み合わせると、ヴァン朝食ならではの甘味、塩味、温かい料理のコントラストを楽しめます。",
      items: [
        { name: "バル・カイマク", role: "蜂蜜と濃厚な乳の組み合わせ", description: "温かいパンにカイマクをのせ、蜂蜜を少し加えます。最初から混ぜ切らず、一口ごとに割合を変えると、それぞれの香りとコクが分かります。" },
        { name: "ピシと焼きたてのパン", role: "カイマクを受け止める温かい生地", description: "外は軽く香ばしく中はやわらかな揚げパンのピシ、または素朴なパンに合わせると、カイマクがほどよくなじみます。" },
        { name: "ヴァン産ハーブチーズ", role: "甘味を引き立てる塩味", description: "地域のハーブを使ったヴァンを代表するチーズです。バル・カイマクの合間に少し食べると、甘味と塩味の対比がはっきりします。" },
        { name: "ムルトゥア", role: "バターと卵の温かな郷土料理", description: "小麦粉をバターで炒め、卵を加えるヴァンの料理です。銅鍋が温かいうちにテーブルで取り分けます。" },
        { name: "カヴット", role: "香ばしい穀物の深い味", description: "炒った穀物とバターを使うヴァンの伝統料理です。蜂蜜やペクメズと合わせると、カイマクとは異なる香ばしい甘さを楽しめます。" },
        { name: "温かい卵料理", role: "朝食テーブルの主役", description: "目玉焼き、メネメン、スジュクやカヴルマ入りの卵料理を熱々で提供します。たくさんの小皿を一つの食事につなぐ存在です。" },
        { name: "自家製ジャムとオリーブ", role: "甘味と塩味のリズム", description: "果実味のあるジャムと塩味のあるオリーブを交互に味わうことで、カイマクのやさしい甘さを最後まで楽しめます。" },
        { name: "トルコのチャイ", role: "ゆっくり続く朝食のリズム", description: "チューリップ形のグラスで飲む温かいチャイが口の中を整え、さまざまな小皿を急がず味わう時間を作ります。" },
      ],
    },
    tradition: {
      title: "デザートではなく、朝食の一場面",
      paragraphs: [
        "バル・カイマクは食後に単独で食べるデザートというより、トルコ朝食の一部です。ハーブチーズの次に蜂蜜とカイマクをのせたパンを食べ、温かい卵料理に戻り、チャイを飲む。決まった順番はありません。",
        "ヴァン朝食は、乳製品、穀物、地域のハーブ、温かい料理を一つの食卓で分け合う文化として知られています。大切なのは量を急いで食べることではなく、小皿を共有しながら異なる味をゆっくり比べることです。",
        "初めてなら、まずカイマクだけを少量味わい、蜂蜜を少しずつ加えて好みの割合を探してください。アレルギーや食事制限がある場合は、注文前に当日の材料と交差接触の可能性をスタッフにご確認ください。",
      ],
      imageAlt: "Tarihi Van Kahvaltı Eviの食卓に並ぶ蜂蜜をかけたカイマク、パン、トルコ紅茶",
      caption: "店内で実際に提供したカイマクと蜂蜜、パン、トルコ紅茶。",
    },
    reasons: {
      title: "Tarihi Van Kahvaltı Eviを選ぶ理由",
      intro:
        "イスタンブールにはカイマクを味わえる店が数多くあります。当店は一皿だけでなく、ヴァンの朝食文化、家族の歴史、ベヨールらしい空間まで体験したい旅行者に向いています。",
      items: [
        { title: "1978年から続く家族の朝食", text: "一時的な流行のためのコンセプトではなく、家族が長年受け継いできたヴァン朝食の経験をもとに料理を用意しています。" },
        { title: "ヴァン朝食の中で味わうカイマク", text: "蜂蜜とカイマクをピシ、ハーブチーズ、ジャム、温かい鍋料理と交互に味わい、トルコ朝食全体のバランスを体験できます。" },
        { title: "歴史あるベヨールの空間", text: "ザンバック通りの古い建物、小さな部屋、通りに面したテーブルが食事の雰囲気を作ります。料理と場所を一緒に記憶できる店です。" },
        { title: "タクシム観光に便利な立地", text: "タクシム広場、イスティクラル通り、ジハンギルから徒歩圏内。ベヨールやガラタ観光の一日の始まりに立ち寄れます。" },
        { title: "二人旅にも家族旅行にも", text: "小皿を共有するスタイルは、カップル、家族、友人との旅行に適しています。週末や大人数の場合は来店前の連絡をおすすめします。" },
        { title: "来店前に確認できる最新メニュー", text: "英語のオンラインメニューで現在の料理と価格を確認できます。季節や当日の仕込みにより提供状況が変わる場合があります。" },
      ],
    },
    firstVisit: {
      title: "バル・カイマクを楽しむ順番",
      intro: "正式な作法はありませんが、初めての方は次の順番で味わうと素材の違いが分かりやすくなります。",
      steps: [
        { title: "最初にカイマクだけを味わう", text: "少量をそのまま食べ、乳のコクとなめらかな質感を確かめます。" },
        { title: "蜂蜜を少しずつ加える", text: "一度に混ぜず、一口ごとに割合を変えて香りと甘さを調整します。" },
        { title: "温かいパンやピシにのせる", text: "生地の温かさと食感がカイマクをやわらかくし、蜂蜜の香りを引き立てます。" },
        { title: "塩味の料理と交互に食べる", text: "ハーブチーズ、オリーブ、卵料理を間に挟むと甘味がより鮮明になります。" },
        { title: "チャイと一緒にゆっくり", text: "チャイで口の中を整えながら、共有する朝食の時間をお楽しみください。" },
      ],
    },
    practical: {
      title: "タクシム近くの店舗・アクセス情報",
      text:
        "住所はZambak Sk. No:8, Şehit Muhtar, Beyoğluです。毎日08:00〜18:00に営業しています。週末の遅い朝は混み合うことがあるため、グループの場合は電話またはWhatsAppで事前に席の状況をご確認ください。",
      labels: { address: "住所", hours: "営業時間", route: "Googleマップで経路を見る", menu: "英語メニューと価格", call: "電話する" },
    },
    faq: {
      title: "日本人旅行者からよくある質問",
      items: [
        { question: "バル・カイマクとは何ですか？", answer: "バルはトルコ語で蜂蜜、カイマクは乳から作る濃厚でなめらかな乳製品です。温かいパンやピシにカイマクをのせ、蜂蜜をかけて食べるトルコ朝食の定番です。" },
        { question: "カイマクはバターや生クリームと同じですか？", answer: "同じではありません。一般的なバターのような塩気がなく、ホイップクリームより密度が高く濃厚です。原料乳や製法によって味と質感は異なります。" },
        { question: "タクシム広場から近いですか？", answer: "はい。ベヨールのザンバック通りにあり、タクシム広場、イスティクラル通り、ジハンギルから徒歩でアクセスできます。正確な経路はページ内の公式Googleマップリンクをご利用ください。" },
        { question: "バル・カイマクだけを注文できますか？", answer: "メニュー構成と提供状況は当日の仕込みにより変わります。来店前にオンラインメニューをご確認いただくか、店舗へお問い合わせください。ヴァン式の共有朝食と一緒に味わうと、さまざまな組み合わせを楽しめます。" },
        { question: "予約は必要ですか？", answer: "空席があれば予約なしでもご案内できます。週末、祝日、大人数での来店は、電話またはWhatsAppで事前に席の状況を確認することをおすすめします。" },
        { question: "アレルギーがある場合はどうすればよいですか？", answer: "カイマクは乳製品です。朝食には卵、小麦、ナッツ類などのアレルゲンが含まれる場合があります。注文前にスタッフへ伝え、当日の材料と交差接触の可能性をご確認ください。" },
      ],
    },
    sources: {
      title: "出典と編集方針",
      note: "ヴァン朝食と郷土料理の説明は、トルコの公式地理的表示資料と文化ポータルを参照して確認しています。現在の料理、価格、提供状況は最新のオンラインメニューでご確認ください。",
      items: [...sourceItems.ja],
    },
    closing: {
      title: "バル・カイマクから、ヴァンの朝食文化へ。",
      text: "1978年から家族で受け継ぐ朝食文化を、ベヨールの歴史ある空間でゆっくり体験してください。",
      menu: "本日の英語メニューを見る",
      directions: "徒歩ルートを見る",
    },
    footer: { note: "1978年からベヨールで続く伝統的なヴァン朝食。", home: "英語ホーム", menu: "メニュー", directions: "アクセス" },
    updatedLabel: "最終確認",
    dateLabel: "2026年7月21日",
    authorLabel: "Tarihi Van Kahvaltı Evi 編集チーム",
    media: {
      hero: "/images/blog/istanbul-bal-kaymak.webp",
      article: "/images/blog/bal-kaymak-close-up.webp",
      og: "/images/og/istanbul-bal-kaymak.jpg",
    },
    seo: {
      articleSection: "イスタンブールのバル・カイマクとトルコ朝食",
      about: ["バル・カイマク", "トルコ朝食", "ヴァン朝食", "ベヨール"],
      mentions: ["カイマク", "蜂蜜", "ピシ", "ヴァン産ハーブチーズ", "ムルトゥア", "カヴット"],
      menuItem: {
        name: "蜂蜜、水牛のカイマク、自家製ジャム",
        description: "濾した蜂蜜、水牛のカイマク、季節の自家製ジャム2種",
        url: "/en/menu#bal-kaymak-recel",
      },
    },
    travelerBrief: {
      label: "ひと目で分かる基本情報",
      title: "日本人旅行者のための基本情報",
      intro: "メニュー、場所、営業時間、注文に使える表現を簡潔にまとめました。価格と当日の提供状況は、最新の英語メニューが最も正確です。",
      facts: [
        { label: "現在のメニュー内容", value: "濾した蜂蜜、水牛のカイマク、季節の自家製ジャム2種" },
        { label: "住所", value: "Zambak Sk. No:8, Şehit Muhtar, Beyoğlu, İstanbul" },
        { label: "営業時間", value: "毎日 08:00〜18:00" },
        { label: "周辺エリア", value: "タクシム広場、イスティクラル通り、ジハンギルから徒歩圏内" },
      ],
      comparison: {
        title: "カイマク、バター、生クリームの違い",
        columns: ["食品", "質感", "味と食べ方"],
        rows: [
          { name: "カイマク", texture: "濃厚でなめらか", taste: "乳のコクがあり、蜂蜜やパンと一緒に食べる" },
          { name: "バター", texture: "固形で、温めると溶ける", taste: "製品により塩味があり、パンや調理に使う" },
          { name: "生クリーム", texture: "液体、または泡立てた軽い質感", taste: "カイマクより軽く、デザートや飲み物に使われる" },
        ],
      },
      phrases: {
        title: "注文に役立つトルコ語",
        intro: "短い文をそのまま読んだり、画面で見せたりできます。アレルギーがある場合は必ず注文前にスタッフへお伝えください。",
        items: [
          { turkish: "Bal kaymak var mı?", translation: "バル・カイマクはありますか？" },
          { turkish: "İki kişilik Van kahvaltısı, lütfen.", translation: "2人分のヴァン朝食をお願いします。" },
          { turkish: "İçinde kuruyemiş var mı?", translation: "ナッツ類は入っていますか？" },
        ],
      },
    },
  },
};
