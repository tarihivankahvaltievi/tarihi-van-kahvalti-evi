export type GuideLocale = "en" | "ru" | "ar";

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
  closing: { title: string; text: string; menu: string; directions: string };
  footer: { note: string; home: string; menu: string; directions: string };
  updatedLabel: string;
  dateLabel: string;
  authorLabel: string;
};

export const guidePaths = {
  en: "/en/blog/turkish-breakfast-istanbul",
  ru: "/ru/blog/turetskiy-zavtrak-stambul",
  ar: "/ar/blog/turkish-breakfast-istanbul",
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
    ogAlternateLocales: ["ru_RU", "ar_SA"],
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
    ogAlternateLocales: ["en_GB", "ar_SA"],
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
    ogAlternateLocales: ["en_GB", "ru_RU"],
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
    closing: { title: "تعال من أجل الفطور، وابقَ من أجل المائدة.", text: "تذوق ما يميز فطور فان في عنوان تاريخي ببيوغلو، تصوغه قصة عائلية بدأت عام 1978.", menu: "شاهد قائمة اليوم", directions: "احصل على الاتجاهات" },
    footer: { note: "فطور فان التقليدي في بيوغلو منذ 1978.", home: "الصفحة الإنجليزية", menu: "القائمة", directions: "الاتجاهات" },
    updatedLabel: "آخر مراجعة",
    dateLabel: "21 يوليو 2026",
    authorLabel: "فريق تحرير Tarihi Van Kahvaltı Evi",
  },
};
