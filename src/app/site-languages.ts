export const siteLanguages = {
  tr: { lang: "tr", dir: "ltr", skip: "Ana içeriğe geç" },
  en: { lang: "en", dir: "ltr", skip: "Skip to content" },
  ko: { lang: "ko", dir: "ltr", skip: "본문으로 건너뛰기" },
  "zh-cn": { lang: "zh-CN", dir: "ltr", skip: "跳到主要内容" },
  es: { lang: "es", dir: "ltr", skip: "Saltar al contenido" },
  ar: { lang: "ar", dir: "rtl", skip: "انتقل إلى المحتوى الرئيسي" },
  ru: { lang: "ru", dir: "ltr", skip: "Перейти к основному содержимому" },
  ja: { lang: "ja", dir: "ltr", skip: "本文へスキップ" },
} as const;

export type SiteLanguage = keyof typeof siteLanguages;
