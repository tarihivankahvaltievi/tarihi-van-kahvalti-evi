import Link from "next/link";
import { type SiteLanguage } from "../site-languages";

const messages = {
  tr: ["Sayfa bulunamadı", "Aradığınız sayfa bu adreste bulunmuyor.", "Ana sayfa"],
  en: ["Page not found", "The page you requested could not be found.", "Home"],
  ko: ["페이지를 찾을 수 없습니다", "요청한 페이지가 이 주소에 없습니다.", "한국어 가이드"],
  "zh-cn": ["找不到页面", "您请求的页面不存在。", "中文指南"],
  es: ["Página no encontrada", "La página solicitada no existe en esta dirección.", "Guías en español"],
  ar: ["الصفحة غير موجودة", "لم نتمكن من العثور على الصفحة المطلوبة.", "دليل الإفطار"],
  ru: ["Страница не найдена", "Запрошенная страница не найдена.", "Гид по завтраку"],
  ja: ["ページが見つかりません", "お探しのページはこのアドレスにありません。", "朝食ガイド"],
} as const;

const homePaths = {
  tr: "/", en: "/en", ko: "/ko", "zh-cn": "/zh-cn", es: "/es",
  ar: "/ar/blog/turkish-breakfast-istanbul",
  ru: "/ru/blog/turetskiy-zavtrak-stambul",
  ja: "/ja/blog/istanbul-bal-kaymak",
};

export function LocalizedNotFound({ locale }: { locale: SiteLanguage }) {
  const [title, description, home] = messages[locale];
  return (
    <main id="main-content" tabIndex={-1} style={{ maxWidth: 640, margin: "12vh auto", padding: 24 }}>
      <h1>404 — {title}</h1>
      <p>{description}</p>
      <Link href={homePaths[locale]}>{home}</Link>
    </main>
  );
}
