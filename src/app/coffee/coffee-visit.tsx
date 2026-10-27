import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { displayAddress, mapsUrl, openingHours } from "../seo";
import { coffeeCopy, type CoffeeLocale } from "./coffee-localization";
import styles from "./coffee.module.css";

type VisitCopy = { heading: string; location: [string, string]; drinks: [string, string]; hours: [string, string]; prices: [string, string] };
const visits: Record<CoffeeLocale, VisitCopy> = {
  tr: {
    heading: "Kahve molanızdan önce",
    location: ["Taksim’de kahve için neredeyiz?", "Tarihi Van Kahvaltı Evi, Beyoğlu Zambak Sokak No:8’de; Taksim Meydanı ve İstiklal Caddesi çevresindedir. Güncel yaya rotası için haritayı kullanın."],
    drinks: ["Hangi kahveler var?", "Menümüzde Türk kahvesi, espresso, americano, filtre kahve, latte, cappuccino, flat white ve cold brew gibi sıcak ve soğuk seçenekler bulunur. Güncel çeşitleri menüden kontrol edebilirsiniz."],
    hours: ["Hangi saatlerde açığız?", "Haftanın her günü aşağıdaki saatlerde açığız. Özel günlerde gelmeden önce ekibimizden bilgi alabilirsiniz."],
    prices: ["Kahve fiyatlarını nereden görebilirsiniz?", "Güncel kahve fiyatları Türk lirası olarak menümüzde yer alır. Türk kahvesini sipariş ederken sade, orta veya şekerli tercihinizi belirtebilirsiniz."],
  },
  en: {
    heading: "Before your coffee break",
    location: ["Where can you find us near Taksim?", "Tarihi Van Kahvaltı Evi is on Zambak Street in Beyoğlu, near Taksim Square and İstiklal Avenue. Use our map link for the current walking route."],
    drinks: ["Which coffees are on the menu?", "Choose from Turkish coffee, espresso, americano, filter coffee, latte, cappuccino, flat white and cold brew. Check the current menu for the full hot and iced selection."],
    hours: ["When are we open?", "We open every day at the hours below. Contact the restaurant before visiting on public holidays to check for changes."],
    prices: ["Where can you check coffee prices?", "Our English menu shows current prices in Turkish lira (TRY). When ordering Turkish coffee, tell us whether you prefer no sugar, medium sweetness or sweet."],
  },
  ru: {
    heading: "Перед кофейной паузой",
    location: ["Где мы находимся рядом с Таксимом?", "Tarihi Van Kahvaltı Evi находится на улице Zambak в Бейоглу, недалеко от площади Таксим и Истикляль. Актуальный пешеходный маршрут можно посмотреть на карте."],
    drinks: ["Какой кофе есть в меню?", "Турецкий кофе, эспрессо, американо, фильтр-кофе, латте, капучино, флэт уайт и колд брю. Полный выбор горячих и холодных напитков смотрите в актуальном меню."],
    hours: ["Когда мы открыты?", "Мы работаем ежедневно по расписанию ниже. В праздничные дни уточните часы работы перед посещением."],
    prices: ["Где посмотреть цены на кофе?", "Актуальные цены в турецких лирах (TRY) указаны в английском меню. При заказе турецкого кофе сообщите, хотите ли вы кофе без сахара, средней сладости или сладкий."],
  },
  ar: {
    heading: "قبل استراحة القهوة",
    location: ["أين تجدوننا بالقرب من تقسيم؟", "يقع Tarihi Van Kahvaltı Evi في شارع Zambak في بيوغلو، قرب ميدان تقسيم وشارع الاستقلال. استخدموا رابط الخريطة لمعرفة مسار المشي الحالي."],
    drinks: ["ما أنواع القهوة المتوفرة في القائمة؟", "القهوة التركية والإسبريسو والأمريكانو والقهوة المفلترة واللاتيه والكابتشينو والفلات وايت والكولد برو. راجعوا القائمة الحالية للاطلاع على خيارات القهوة الساخنة والباردة."],
    hours: ["ما ساعات العمل؟", "نفتح يومياً في الأوقات المذكورة أدناه. يرجى التواصل مع المطعم قبل الزيارة في العطلات الرسمية للتأكد من ساعات العمل."],
    prices: ["أين تجدون أسعار القهوة؟", "تتوفر الأسعار الحالية بالليرة التركية في القائمة الإنجليزية. عند طلب القهوة التركية، حددوا كمية السكر: سادة أو متوسطة السكر أو حلوة."],
  },
  ko: {
    heading: "커피 한 잔을 즐기기 전에",
    location: ["탁심 근처 어디에 있나요?", "Tarihi Van Kahvaltı Evi는 탁심 광장과 이스티클랄 거리 근처, 베요글루의 잠박 거리에 있습니다. 현재 도보 경로는 지도 링크에서 확인하세요."],
    drinks: ["어떤 커피를 주문할 수 있나요?", "터키식 커피, 에스프레소, 아메리카노, 필터 커피, 라테, 카푸치노, 플랫 화이트, 콜드 브루가 메뉴에 있습니다. 따뜻한 커피와 아이스커피의 전체 종류는 최신 메뉴를 확인하세요."],
    hours: ["영업시간은 어떻게 되나요?", "아래 시간에 매일 영업합니다. 공휴일에는 방문 전에 매장에 영업시간을 확인해 주세요."],
    prices: ["커피 가격은 어디서 확인하나요?", "영문 메뉴에서 최신 가격을 터키 리라(TRY)로 확인할 수 있습니다. 터키식 커피는 주문할 때 무설탕, 중간 단맛, 달게 중에서 취향을 알려 주세요."],
  },
  "zh-cn": {
    heading: "咖啡小憩前，了解一下",
    location: ["门店在塔克西姆附近哪里？", "Tarihi Van Kahvaltı Evi 位于 Beyoğlu 区的 Zambak 街，靠近塔克西姆广场和独立大街。请通过地图链接查看当前的步行路线。"],
    drinks: ["菜单上有哪些咖啡？", "提供土耳其咖啡、浓缩咖啡、美式咖啡、滤泡咖啡、拿铁、卡布奇诺、馥芮白和冷萃。完整的热咖啡和冰咖啡选择请查看最新菜单。"],
    hours: ["营业时间是什么时候？", "我们每天按以下时间营业。公共假日期间，请在到店前联系餐厅确认营业时间。"],
    prices: ["在哪里查看咖啡价格？", "英文菜单列有以土耳其里拉（TRY）计价的最新价格。点土耳其咖啡时，请说明需要无糖、半糖还是甜味。"],
  },
};

/** Visible, server-rendered answers; no promise of FAQ rich results for a cafe. */
export function CoffeeVisit({ locale }: { locale: CoffeeLocale }) {
  const v = visits[locale];
  const c = coffeeCopy[locale];
  const menu = locale === "tr" ? "/menu" : "/en/menu";
  return <section className={styles.visitGuide} aria-labelledby="coffee-visit-title" data-analytics-surface="coffee_visit">
    <h2 id="coffee-visit-title">{v.heading}</h2>
    <dl className={styles.visitAnswers}>
      {(["location", "drinks", "hours", "prices"] as const).map((kind) => <div key={kind}>
        <dt>{v[kind][0]}</dt>
        <dd><p>{v[kind][1]}</p>
          {kind === "location" && <><p><bdi dir="ltr">{displayAddress}</bdi></p><a href={mapsUrl} target="_blank" rel="noopener noreferrer">{c.directions} <ArrowUpRight size={16} /></a></>}
          {kind === "hours" && <p>{c.hours} · <bdi dir="ltr">{openingHours.opens}–{openingHours.closes}</bdi></p>}
          {kind === "prices" && <Link href={`${menu}#sicak-kahveler`} hrefLang={locale === "tr" ? "tr" : "en"}>{c.menu} <ArrowUpRight size={16} /></Link>}
        </dd>
      </div>)}
    </dl>
  </section>;
}
