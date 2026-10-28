import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { displayAddress, mapsUrl, openingHours } from "../seo";
import type { FeaturedCoffee } from "./coffee-menu-data";
import { coffeeCopy, type CoffeeLocale } from "./coffee-localization";
import styles from "./coffee.module.css";

type VisitCopy = { heading: string; work: [string, string]; location: [string, string]; drinks: [string, string]; hours: [string, string]; prices: [string, string] };
const visits: Record<CoffeeLocale, VisitCopy> = {
  tr: {
    work: ["Wi‑Fi ve laptopla çalışma alanı var mı?", "Wi‑Fi, priz ve laptopla çalışmaya uygun alanlarımız bulunur. Kahvaltı dışında bir kahve molası için de uğrayabilirsiniz; içecek seçeneklerini menüden inceleyebilirsiniz."],
    heading: "Kahve molanızdan önce",
    location: ["Taksim’de kahve için neredeyiz?", "Tarihi Van Kahvaltı Evi, Beyoğlu Zambak Sokak No:8’de; Taksim Meydanı ve İstiklal Caddesi çevresindedir. Güncel yaya rotası için haritayı kullanın."],
    drinks: ["Hangi kahveler var?", "Menümüzden bazı kahveler: {coffees}. Tüm çeşitler ve güncel fiyatlar için menüyü inceleyebilirsiniz."],
    hours: ["Hangi saatlerde açığız?", "Haftanın her günü aşağıdaki saatlerde açığız. Özel günlerde gelmeden önce ekibimizden bilgi alabilirsiniz."],
    prices: ["Kahve fiyatlarını nereden görebilirsiniz?", "Güncel kahve fiyatları Türk lirası olarak menümüzde yer alır. Türk kahvesini sipariş ederken sade, orta veya şekerli tercihinizi belirtebilirsiniz."],
  },
  en: {
    work: ["Is there Wi-Fi and space to work with a laptop?", "We have Wi-Fi, power outlets and areas suitable for working with a laptop. You can also visit for a coffee break without ordering breakfast. Explore our drinks in the menu."],
    heading: "Before your coffee break",
    location: ["Where can you find us near Taksim?", "Tarihi Van Kahvaltı Evi is on Zambak Street in Beyoğlu, near Taksim Square and İstiklal Avenue. Use our map link for the current walking route."],
    drinks: ["Which coffees are on the menu?", "Some coffees from our current menu: {coffees}. See the menu for the full selection and current prices."],
    hours: ["When are we open?", "We open every day at the hours below. Contact the restaurant before visiting on public holidays to check for changes."],
    prices: ["Where can you check coffee prices?", "Our English menu shows current prices in Turkish lira (TRY). When ordering Turkish coffee, tell us whether you prefer no sugar, medium sweetness or sweet."],
  },
  ru: {
    work: ["Есть ли Wi-Fi и место для работы с ноутбуком?", "У нас есть Wi-Fi, розетки и зоны, подходящие для работы с ноутбуком. Можно зайти на кофе, не заказывая завтрак. Напитки представлены в меню."],
    heading: "Перед кофейной паузой",
    location: ["Где мы находимся рядом с Таксимом?", "Tarihi Van Kahvaltı Evi находится на улице Zambak в Бейоглу, недалеко от площади Таксим и Истикляль. Актуальный пешеходный маршрут можно посмотреть на карте."],
    drinks: ["Какой кофе есть в меню?", "Некоторые виды кофе из нашего актуального меню: {coffees}. Полный выбор и текущие цены смотрите в меню."],
    hours: ["Когда мы открыты?", "Мы работаем ежедневно по расписанию ниже. В праздничные дни уточните часы работы перед посещением."],
    prices: ["Где посмотреть цены на кофе?", "Актуальные цены в турецких лирах (TRY) указаны в английском меню. При заказе турецкого кофе сообщите, хотите ли вы кофе без сахара, средней сладости или сладкий."],
  },
  ar: {
    work: ["هل يتوفر واي فاي ومكان للعمل بالحاسوب المحمول؟", "يتوفر واي فاي ومقابس كهربائية ومساحات مناسبة للعمل بالحاسوب المحمول. يمكنكم أيضاً زيارتنا لاستراحة قهوة دون طلب الفطور. تصفحوا خيارات المشروبات في القائمة."],
    heading: "قبل استراحة القهوة",
    location: ["أين تجدوننا بالقرب من تقسيم؟", "يقع Tarihi Van Kahvaltı Evi في شارع Zambak في بيوغلو، قرب ميدان تقسيم وشارع الاستقلال. استخدموا رابط الخريطة لمعرفة مسار المشي الحالي."],
    drinks: ["ما أنواع القهوة المتوفرة في القائمة؟", "من أنواع القهوة في قائمتنا الحالية: {coffees}. راجعوا القائمة للاطلاع على جميع الخيارات والأسعار الحالية."],
    hours: ["ما ساعات العمل؟", "نفتح يومياً في الأوقات المذكورة أدناه. يرجى التواصل مع المطعم قبل الزيارة في العطلات الرسمية للتأكد من ساعات العمل."],
    prices: ["أين تجدون أسعار القهوة؟", "تتوفر الأسعار الحالية بالليرة التركية في القائمة الإنجليزية. عند طلب القهوة التركية، حددوا كمية السكر: سادة أو متوسطة السكر أو حلوة."],
  },
  ko: {
    work: ["와이파이와 노트북으로 작업할 공간이 있나요?", "와이파이, 콘센트와 노트북으로 작업하기에 적합한 공간이 있습니다. 아침 식사를 주문하지 않고 커피 한 잔을 즐기러 오셔도 됩니다. 음료 종류는 메뉴에서 확인하세요."],
    heading: "커피 한 잔을 즐기기 전에",
    location: ["탁심 근처 어디에 있나요?", "Tarihi Van Kahvaltı Evi는 탁심 광장과 이스티클랄 거리 근처, 베요글루의 잠박 거리에 있습니다. 현재 도보 경로는 지도 링크에서 확인하세요."],
    drinks: ["어떤 커피를 주문할 수 있나요?", "현재 메뉴에 있는 커피 중 일부입니다: {coffees}. 전체 종류와 최신 가격은 메뉴에서 확인하세요."],
    hours: ["영업시간은 어떻게 되나요?", "아래 시간에 매일 영업합니다. 공휴일에는 방문 전에 매장에 영업시간을 확인해 주세요."],
    prices: ["커피 가격은 어디서 확인하나요?", "영문 메뉴에서 최신 가격을 터키 리라(TRY)로 확인할 수 있습니다. 터키식 커피는 주문할 때 무설탕, 중간 단맛, 달게 중에서 취향을 알려 주세요."],
  },
  "zh-cn": {
    work: ["有 Wi-Fi 和适合用笔记本电脑工作的空间吗？", "店内提供 Wi-Fi、电源插座和适合使用笔记本电脑工作的空间。不点早餐，也可以来喝杯咖啡。饮品选择请查看菜单。"],
    heading: "咖啡小憩前，了解一下",
    location: ["门店在塔克西姆附近哪里？", "Tarihi Van Kahvaltı Evi 位于 Beyoğlu 区的 Zambak 街，靠近塔克西姆广场和独立大街。请通过地图链接查看当前的步行路线。"],
    drinks: ["菜单上有哪些咖啡？", "当前菜单中的部分咖啡：{coffees}。完整种类与最新价格请查看菜单。"],
    hours: ["营业时间是什么时候？", "我们每天按以下时间营业。公共假日期间，请在到店前联系餐厅确认营业时间。"],
    prices: ["在哪里查看咖啡价格？", "英文菜单列有以土耳其里拉（TRY）计价的最新价格。点土耳其咖啡时，请说明需要无糖、半糖还是甜味。"],
  },
};

/** Visible, server-rendered answers; no promise of FAQ rich results for a cafe. */
export function CoffeeVisit({ locale, items }: { locale: CoffeeLocale; items: FeaturedCoffee[] }) {
  const v = visits[locale];
  const c = coffeeCopy[locale];
  const coffeeNames = items.map((item) => item.name).join(locale === "ar" ? "، " : locale === "zh-cn" ? "、" : ", ");
  const menu = locale === "tr" ? "/menu" : "/en/menu";
  return <section className={styles.visitGuide} aria-labelledby="coffee-visit-title" data-analytics-surface="coffee_visit">
    <h2 id="coffee-visit-title">{v.heading}</h2>
    <dl className={styles.visitAnswers}>
      {(["location", "drinks", "work", "hours", "prices"] as const).map((kind) => <div key={kind}>
        <dt>{v[kind][0]}</dt>
        <dd><p>{kind === "drinks" ? (items.length ? v.drinks[1].replace("{coffees}", coffeeNames) : c.menuNote) : v[kind][1]}</p>
          {kind === "location" && <><p><bdi dir="ltr">{displayAddress}</bdi></p><a href={mapsUrl} target="_blank" rel="noopener noreferrer">{c.directions} <ArrowUpRight size={16} /></a></>}
          {kind === "hours" && <p>{c.hours} · <bdi dir="ltr">{openingHours.opens}–{openingHours.closes}</bdi></p>}
          {kind === "prices" && <Link href={`${menu}#sicak-kahveler`} hrefLang={locale === "tr" ? "tr" : "en"}>{c.menu} <ArrowUpRight size={16} /></Link>}
        </dd>
      </div>)}
    </dl>
  </section>;
}
