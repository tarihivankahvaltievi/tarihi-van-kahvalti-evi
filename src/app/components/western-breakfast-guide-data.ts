import { kaymakSources, vanBreakfastSources } from "../content-sources";
import { chineseHoneyKaymakBlogUrl, japaneseHoneyKaymakBlogUrl, koreanHoneyKaymakBlogUrl, siteUrl } from "../seo";
import type { TravelGuide } from "./taksim-travel-guide";

const date = "2026-09-28T19:00:00+03:00";
const enClassic = `${siteUrl}/en/blog/classic-turkish-breakfast`;
const esClassic = `${siteUrl}/es/blog/desayuno-turco-clasico`;
const esHoney = `${siteUrl}/es/blog/bal-kaymak-estambul`;

export const englishClassicGuide: TravelGuide = {
  path: "/en/blog/classic-turkish-breakfast", language: "en-GB",
  title: "Classic Turkish Breakfast: What to Eat Near Taksim, Istanbul",
  description: "A British visitor's guide to classic Turkish breakfast: cheeses, olives, menemen, simit, honey and kaymak, tea, and how a shared Van breakfast works near Taksim.",
  kicker: "A British visitor's breakfast guide", heading: "Classic Turkish breakfast, explained for first-time visitors",
  lead: "If you are used to a cooked full English, a Turkish kahvaltı feels like a different rhythm: small sweet and savoury dishes arrive together, bread moves around the table, and black tea keeps coming. This guide helps you identify the essentials and choose a breakfast near Taksim without guessing what is included.",
  image: "/images/hero-parallax/overhead-feast.webp", imageAlt: "A shared Turkish breakfast with cheese, olives, eggs, honey and tea in Beyoğlu",
  date, author: "Tarihi Van Kahvaltı Evi editorial team",
  sections: [
    { id: "essentials", title: "What is in a classic Turkish breakfast?", paragraphs: [
      "The familiar base is cheese, olives, tomatoes, cucumber, bread, preserves, honey and tea. Eggs may arrive boiled, fried or as menemen, a warm dish of eggs, tomato and peppers. Bal kaymak adds a sweet contrast: bal means honey, while kaymak is a rich dairy cream. A breakfast spread varies by restaurant and season, so treat this as a guide to the tradition rather than a promise that every dish is on every menu.",
      "A serpme kahvaltı literally spreads a selection of small plates over the table for sharing. At our Beyoğlu restaurant, the current menu is the source for the exact dishes, minimum party size and prices. If you want only one dish, compare the à la carte options first."
    ], points: [
      { title: "Savoury first", text: "Taste a little cheese, olives, vegetables and a hot egg dish with fresh bread. You can return to these between sweeter bites." },
      { title: "Sweet after", text: "Try kaymak alone, then add honey a little at a time. Preserves and tahini with grape molasses can bring other flavours to the table." },
      { title: "Tea throughout", text: "Turkish black tea is served in small glasses. It is part of the pace of the meal rather than a single drink at the end." },
    ] },
    { id: "compare", title: "How is it different from a full English?", paragraphs: [
      "Think of a full English as a cooked plate and a Turkish breakfast as a shared table. The Turkish meal often balances cool cheeses and vegetables with hot eggs, bread, fruit preserves and tea. The meal has no compulsory order: alternate salty and sweet bites, and leave time to talk. The comparison is useful for planning, but neither breakfast has one universal recipe.",
      "If the regional Van breakfast catches your eye, look for otlu peynir (herb cheese), murtuğa (a hot flour, butter and egg speciality) and kavut (toasted grain). These are regional additions to the wider Turkish breakfast tradition. Our separate Istanbul Van breakfast guide explains them in more depth."
    ] },
    { id: "bread", title: "Where does simit, the so-called Turkish bagel, fit?", paragraphs: [
      "Simit is a sesame-coated bread ring often eaten on the go or torn into pieces with cheese. English speakers may call it a Turkish bagel because of its shape, but the crust and eating style differ. Simit is common in Turkish breakfast culture; it is not a guaranteed item in our restaurant's current breakfast spread. Check the live menu for what is actually served.",
      "You can read our dedicated simit guide for the meaning, the bagel comparison and practical ways to eat it around Istanbul."
    ] },
    { id: "visit", title: "Planning breakfast near Taksim", paragraphs: [
      "Tarihi Van Kahvaltı Evi is on Zambak Street in Beyoğlu, within walking distance of Taksim Square and İstiklal Avenue. The published hours are 07:00–22:00 daily. Enter your starting point in the map for a real walking route rather than relying on a fixed number of minutes. Check the live English menu for current prices and availability; for a weekend or a larger group, ask about tables before travelling.",
      "Dairy, egg, gluten and sesame can appear in breakfast dishes. Tell staff about allergies before ordering and ask them to check that day's ingredients and possible cross-contact."
    ] },
  ],
  faqTitle: "Classic Turkish breakfast: quick answers", faq: [
    { question: "Is Turkish breakfast a buffet?", answer: "A serpme breakfast is a selection of small plates brought to the table for sharing; it is not automatically a self-service buffet. Check the current menu for the exact format and party size." },
    { question: "Does every Turkish breakfast include simit?", answer: "No. Simit is common in Turkish breakfast culture, but the bread selection varies. Check the current restaurant menu before expecting a specific item." },
    { question: "Can I order just honey and kaymak?", answer: "Check the live menu for the Bal - Kaymak portion and current availability. You do not need to assume that every visitor wants a full shared spread." },
  ],
  sourcesTitle: "Sources and editorial notes", sourcesIntro: "Food and cultural descriptions are checked against Türkiye's official tourism and geographical-indication resources. Our address, opening hours and current menu are maintained separately by the restaurant.",
  sources: [
    { name: "GoTürkiye — Turkish breakfast and serpme kahvaltı", url: kaymakSources.turkishBreakfastGoTurkiye },
    { name: "GoTürkiye İstanbul — breads and breakfast culture", url: kaymakSources.istanbulBreakfastGoTurkiye },
    { name: "TÜRKPATENT — Van breakfast geographical indication", url: vanBreakfastSources.vanBreakfast },
  ],
  relatedTitle: "Continue reading", related: [
    { name: "Simit and the Turkish bagel comparison", href: "/en/blog/simit-turkish-bagel", language: "en" },
    { name: "Our complete Van breakfast guide", href: "/en/blog/turkish-breakfast-istanbul", language: "en" },
    { name: "En español: desayuno turco clásico", href: "/es/blog/desayuno-turco-clasico", language: "es" },
  ],
  menuLabel: "Current English menu and prices", mapLabel: "Walking directions", callLabel: "Call the restaurant", homeLabel: "English home", hoursLabel: "Opening hours", addressLabel: "Address",
  translations: { en: enClassic, es: esClassic },
};

export const englishSimitGuide: TravelGuide = {
  path: "/en/blog/simit-turkish-bagel", language: "en-GB",
  title: "Simit vs Bagel: The Turkish Sesame Bread in Breakfast",
  description: "What is simit, and is it really a Turkish bagel? Learn about the sesame bread ring, how locals eat it with cheese and tea, and how it fits into Istanbul breakfast.",
  kicker: "Bread and breakfast in Istanbul", heading: "Simit: the Turkish sesame ring often called a bagel",
  lead: "The ring shape makes simit familiar to a British visitor who knows bagels. Its sesame crust, preparation and place in breakfast are its own. Here is how to recognise it, eat it, and decide whether to grab one on the street or sit down for a longer Turkish breakfast.",
  image: "/images/hero-parallax/overhead-feast.webp", imageAlt: "A shared breakfast table with breads, cheeses and hot dishes in Beyoğlu",
  date, author: "Tarihi Van Kahvaltı Evi editorial team",
  sections: [
    { id: "what", title: "What is simit?", paragraphs: [
      "Simit is a ring-shaped Turkish bread coated in sesame seeds. GoTürkiye describes the dough as dipped in molasses before baking, which helps create its deep colour and crisp sesame crust. Texture varies between bakeries and regions, but it is usually torn into pieces rather than sliced horizontally for a sandwich.",
      "You will see simit at street carts and bakeries as well as at some breakfast tables. The name is worth learning: ask for simit, not only for a ‘Turkish bagel’, and you are more likely to be understood."
    ] },
    { id: "bagel", title: "Is simit the same as a bagel?", paragraphs: [
      "No. The useful comparison is the circular shape and its role as a convenient breakfast bread. Simit is typically sesame-covered, often crisp on the outside and commonly eaten with cheese or tea. Bagels have their own preparation and denser texture. Calling simit a Turkish bagel is a quick explanation for a newcomer, not a literal translation or a recipe equivalence.",
      "The differences matter when you order. Rather than expecting a cream-cheese bagel sandwich, try tearing off a piece and pairing it with white cheese, olives, tomato or a little jam."
    ], points: [
      { title: "Quick street breakfast", text: "A fresh simit with tea can be a simple breakfast when you have an early departure." },
      { title: "Longer breakfast", text: "At a shared kahvaltı, bread accompanies cheeses, egg dishes, honey, kaymak and preserves. The exact bread selection depends on the venue." },
    ] },
    { id: "taksim", title: "Simit and a sit-down breakfast near Taksim", paragraphs: [
      "Around Taksim and İstiklal Avenue you can explore bakeries and street vendors for simit. If you have time for a full seated meal, a Van breakfast adds regional dishes such as herb cheese, murtuğa and kavut to the wider Turkish breakfast table. Tarihi Van Kahvaltı Evi is on Zambak Street in Beyoğlu, within walking distance of Taksim Square.",
      "Simit is discussed here as part of Istanbul food culture. We do not list it as a guaranteed menu item at our restaurant. Before visiting, use the live menu for the actual bread and breakfast options, prices and serving conditions."
    ] },
  ],
  faqTitle: "Simit questions", faq: [
    { question: "What does simit taste like?", answer: "It is a baked sesame bread with a toasty crust and a bread interior. Freshness and bakery style change its crunch and chew." },
    { question: "Is simit a bagel?", answer: "It is a comparison based on shape, not the same recipe. Ask for simit by its Turkish name." },
    { question: "Does your restaurant serve simit?", answer: "This guide does not claim simit is currently offered. Check the live English menu or ask staff about that day's bread selection." },
  ],
  sourcesTitle: "Sources and editorial notes", sourcesIntro: "Descriptions of simit and the broader breakfast table draw on GoTürkiye. Restaurant availability is deliberately separated from the cultural guide.",
  sources: [
    { name: "GoTürkiye İstanbul — simit and breakfast breads", url: kaymakSources.istanbulBreakfastGoTurkiye },
    { name: "GoTürkiye — Turkish breakfast", url: kaymakSources.turkishBreakfastGoTurkiye },
  ],
  relatedTitle: "Continue reading", related: [
    { name: "Classic Turkish breakfast for first-time visitors", href: "/en/blog/classic-turkish-breakfast", language: "en" },
    { name: "Van breakfast in Istanbul", href: "/en/blog/turkish-breakfast-istanbul", language: "en" },
    { name: "Desayuno turco en español", href: "/es/blog/desayuno-turco-clasico", language: "es" },
  ],
  menuLabel: "Check the actual menu", mapLabel: "Walking directions", callLabel: "Call the restaurant", homeLabel: "English home", hoursLabel: "Opening hours", addressLabel: "Address",
};

export const spanishClassicGuide: TravelGuide = {
  path: "/es/blog/desayuno-turco-clasico", language: "es",
  title: "Desayuno turco clásico en Estambul: qué lleva y dónde probarlo",
  description: "Guía en español del desayuno turco clásico cerca de Taksim: quesos, aceitunas, menemen, simit, miel con kaymak, té y especialidades de Van. Menú y ubicación.",
  kicker: "Guía para viajeros hispanohablantes", heading: "Desayuno turco clásico: una mesa para compartir en Estambul",
  lead: "El kahvaltı turco combina platos salados y dulces que llegan juntos a la mesa. Si te alojas cerca de Taksim, esta guía te ayuda a reconocer cada sabor, decidir entre un desayuno completo y un plato individual, y encontrar nuestra casa de desayunos de Van en Beyoğlu.",
  image: "/images/hero-parallax/overhead-feast.webp", imageAlt: "Mesa de desayuno turco con quesos, aceitunas, huevos, miel y té en Beyoğlu",
  date, author: "Equipo editorial de Tarihi Van Kahvaltı Evi",
  sections: [
    { id: "mesa", title: "¿Qué incluye un desayuno turco clásico?", paragraphs: [
      "Los ingredientes habituales son queso, aceitunas, tomate, pepino, pan, mermeladas, miel y té negro. Los huevos pueden servirse cocidos, fritos o como menemen, preparado con tomate y pimiento. El bal kaymak combina miel con una crema láctea espesa. No existe una composición única: cada restaurante y temporada cambia la selección.",
      "Serpme kahvaltı es una forma de servir varias pequeñas fuentes para compartir. Antes de pedir, consulta el menú vigente: allí figuran la composición, el número mínimo de personas y los precios actuales. Si viajas solo o tienes poco tiempo, compara también los platos individuales."
    ], points: [
      { title: "Sabores salados", text: "Quesos, aceitunas, verduras y huevos se alternan con pan fresco. Prueba pequeñas porciones antes de repetir." },
      { title: "Sabores dulces", text: "Miel, kaymak y mermeladas aportan contraste. Añade la miel poco a poco para notar el sabor de la crema." },
      { title: "Té y pan", text: "El té turco acompaña toda la comida. El simit, aro de pan con sésamo, es frecuente en la cultura del desayuno, pero no está garantizado en todos los menús." },
    ] },
    { id: "van", title: "¿Qué aporta el desayuno de Van?", paragraphs: [
      "Van es una región del este de Türkiye con especialidades propias. Entre ellas están el otlu peynir, queso aromatizado con hierbas; la murtuğa, preparación caliente de harina, mantequilla y huevo; y el kavut, elaborado con cereal tostado. Estas recetas dan carácter regional a una mesa que también conserva los elementos conocidos del desayuno turco.",
      "En Tarihi Van Kahvaltı Evi la familia mantiene esta tradición desde 1978. La información cultural no equivale a una lista fija de productos servidos hoy; consulta el menú actualizado para saber qué trae cada opción."
    ] },
    { id: "visita", title: "Cómo organizar una visita desde Taksim", paragraphs: [
      "El local está en Zambak Sokak, en Beyoğlu, a distancia caminable de la plaza Taksim y de la avenida İstiklal. Abre todos los días de 07:00 a 22:00 según el horario publicado. Usa el enlace del mapa con tu punto de partida para obtener la ruta real y confirma cambios de horario en festivos o mesas para grupos.",
      "Para alergias a lácteos, huevo, gluten, sésamo o frutos secos, pregunta por los ingredientes del día y la posible contaminación cruzada antes de pedir. Los precios cambian; el menú en inglés del restaurante es la referencia actual."
    ] },
  ],
  faqTitle: "Preguntas frecuentes", faq: [
    { question: "¿Es un bufé libre?", answer: "El serpme kahvaltı se sirve en pequeñas fuentes sobre la mesa para compartir. No implica autoservicio; consulta el formato concreto en el menú." },
    { question: "¿Qué diferencia hay entre desayuno turco y desayuno de Van?", answer: "El de Van incorpora especialidades regionales como queso con hierbas, murtuğa y kavut a una mesa turca de quesos, huevos, pan, dulces y té." },
    { question: "¿Siempre hay simit?", answer: "No. Es un pan tradicional muy conocido, pero la selección de panes depende del establecimiento y del día. Consulta el menú actual." },
  ],
  sourcesTitle: "Fuentes y criterio editorial", sourcesIntro: "Contrastamos las descripciones gastronómicas con recursos públicos de turismo y de indicaciones geográficas. Los datos del restaurante se consultan en el menú y la información oficial del sitio.",
  sources: [
    { name: "GoTürkiye — desayuno turco", url: kaymakSources.turkishBreakfastGoTurkiye },
    { name: "GoTürkiye Estambul — cultura del desayuno", url: "https://goturkiye.com/es/istanbul/the-banquet-breakfast" },
    { name: "TÜRKPATENT — indicación geográfica del desayuno de Van", url: vanBreakfastSources.vanBreakfast },
  ],
  relatedTitle: "Sigue leyendo", related: [
    { name: "Miel y kaymak en Estambul", href: "/es/blog/bal-kaymak-estambul", language: "es" },
    { name: "English: classic Turkish breakfast", href: "/en/blog/classic-turkish-breakfast", language: "en" },
    { name: "English: simit, the Turkish sesame ring", href: "/en/blog/simit-turkish-bagel", language: "en" },
  ],
  menuLabel: "Ver menú y precios actuales", mapLabel: "Cómo llegar en Google Maps", callLabel: "Llamar al restaurante", homeLabel: "Inicio en español", hoursLabel: "Horario", addressLabel: "Dirección", contentsLabel: "Contenido", topMenuLabel: "Menú",
  translations: { en: enClassic, es: esClassic },
};

export const spanishHoneyGuide: TravelGuide = {
  path: "/es/blog/bal-kaymak-estambul", language: "es",
  title: "Bal kaymak en Estambul: miel y crema turca cerca de Taksim",
  description: "Qué es bal kaymak, cómo se come con pan y té, y dónde encontrar miel con kaymak cerca de Taksim. Guía en español con dirección y menú vigente.",
  kicker: "Sabores de Estambul · guía en español", heading: "Bal kaymak: cómo probar la miel con crema turca",
  lead: "Bal significa miel en turco; kaymak es una crema láctea densa. Juntos forman uno de los bocados dulces del desayuno turco. Su atractivo está en la diferencia entre el sabor lácteo, la miel y el pan caliente, no en mezclar todo desde el primer momento.",
  image: "/images/blog/bal-kaymak-close-up.webp", imageAlt: "Miel y kaymak servidos junto al pan y el té turco",
  date, author: "Equipo editorial de Tarihi Van Kahvaltı Evi",
  sections: [
    { id: "que-es", title: "¿Qué es exactamente el kaymak?", paragraphs: [
      "El kaymak se elabora concentrando la capa grasa de leche calentada y enfriada. Puede proceder de leche de vaca o de búfala; el nombre por sí solo no asegura el tipo de leche. Su textura es más densa que la nata montada y su sabor suele ser lácteo y suave. En bal kaymak, la dulzura perceptible viene principalmente de la miel.",
      "No es mantequilla ni un postre universal con receta fija. La textura, el origen de la leche y la presentación cambian según el productor y el local. Si necesitas saber la procedencia de la leche o tienes alergia a los lácteos, pregunta antes de consumirlo."
    ] },
    { id: "comer", title: "Cómo comer bal kaymak por primera vez", paragraphs: [
      "Prueba una pequeña cantidad de kaymak solo. Después extiéndelo sobre pan tibio y añade poca miel. Así distinguirás las tres capas de sabor. Alterna con queso o aceitunas si formas parte de un desayuno completo; el té negro equilibra la experiencia sin imponer un orden rígido.",
      "Puedes preguntar ‘Bal kaymak var mı?’ para saber si está disponible. En el menú actual del restaurante figura una porción de Bal - Kaymak, pero los precios y la disponibilidad pueden variar: compruébalos antes de salir."
    ], points: [
      { title: "Para una parada breve", text: "Compara la porción individual con el té y confirma si se sirve ese día." },
      { title: "Para una mesa completa", text: "Busca el desayuno compartido de Van si también quieres probar queso con hierbas, platos calientes y otras especialidades." },
    ] },
    { id: "taksim", title: "Dónde probarlo cerca de Taksim", paragraphs: [
      "Tarihi Van Kahvaltı Evi se encuentra en Zambak Sk. No:8, Beyoğlu, a distancia caminable de la plaza Taksim y de la avenida İstiklal. El horario publicado es todos los días de 07:00 a 22:00. Abre la ruta en el mapa desde tu ubicación; la duración dependerá del punto de partida.",
      "Para grupos o fines de semana, consulta la disponibilidad de mesas. Si evitas productos de origen animal, recuerda que el kaymak es lácteo y la miel procede de abejas. Para cualquier restricción alimentaria, pide al personal los ingredientes y la información de contacto cruzado del día."
    ] },
  ],
  faqTitle: "Preguntas sobre bal kaymak", faq: [
    { question: "¿El kaymak ya contiene miel?", answer: "No necesariamente. Bal kaymak nombra la combinación de miel y kaymak; comprueba cómo se sirve la porción concreta." },
    { question: "¿Todo el kaymak es de leche de búfala?", answer: "No. También existe kaymak elaborado con leche de vaca. Confirma el origen del producto servido ese día." },
    { question: "¿Puedo pedirlo sin el desayuno completo?", answer: "Consulta la porción Bal - Kaymak del menú vigente y pregunta por su disponibilidad antes de viajar." },
  ],
  sourcesTitle: "Fuentes y criterio editorial", sourcesIntro: "Las explicaciones sobre el producto y la cultura del desayuno se basan en fuentes públicas. El menú y la disponibilidad del local deben confirmarse con la información actual del restaurante.",
  sources: [
    { name: "Portal de Cultura de Türkiye — Afyon kaymağı", url: kaymakSources.afyonKaymakCulturePortal },
    { name: "GoTürkiye — desayuno turco y bal kaymak", url: kaymakSources.turkishBreakfastGoTurkiye },
  ],
  relatedTitle: "Sigue leyendo", related: [
    { name: "Desayuno turco clásico cerca de Taksim", href: "/es/blog/desayuno-turco-clasico", language: "es" },
    { name: "한국어: 이스탄불 발 카이막", href: "/ko/blog/istanbul-bal-kaymak", language: "ko" },
    { name: "简体中文: 蜂蜜奶皮", href: "/zh-cn/blog/istanbul-bal-kaymak", language: "zh-CN" },
  ],
  menuLabel: "Ver Bal - Kaymak en el menú", menuHref: "/en/menu#bal-kaymak", mapLabel: "Cómo llegar en Google Maps", callLabel: "Llamar al restaurante", homeLabel: "Inicio en español", hoursLabel: "Horario", addressLabel: "Dirección", contentsLabel: "Contenido", topMenuLabel: "Menú",
  translations: { es: esHoney, ko: koreanHoneyKaymakBlogUrl, ja: japaneseHoneyKaymakBlogUrl, "zh-CN": chineseHoneyKaymakBlogUrl },
};
