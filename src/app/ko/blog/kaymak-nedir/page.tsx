import { InternationalBreakfastGuide } from "../../../components/international-breakfast-guide";
import { buildGuideJsonLd, buildGuideMetadata } from "../../../components/international-breakfast-guide-seo";
import { kaymakExplainerGuide } from "../korean-guide-data";

export const metadata = buildGuideMetadata(kaymakExplainerGuide);

export default function KoreanKaymakExplainerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: buildGuideJsonLd(kaymakExplainerGuide) }}
      />
      <InternationalBreakfastGuide guide={kaymakExplainerGuide} />
    </>
  );
}
