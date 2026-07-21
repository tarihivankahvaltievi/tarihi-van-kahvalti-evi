import { InternationalBreakfastGuide } from "../../../components/international-breakfast-guide";
import { buildGuideJsonLd, buildGuideMetadata } from "../../../components/international-breakfast-guide-seo";
import { turkishBreakfastKoreanGuide } from "../korean-guide-data";

export const metadata = buildGuideMetadata(turkishBreakfastKoreanGuide);

export default function KoreanTurkishBreakfastGuidePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: buildGuideJsonLd(turkishBreakfastKoreanGuide) }}
      />
      <InternationalBreakfastGuide guide={turkishBreakfastKoreanGuide} />
    </>
  );
}
