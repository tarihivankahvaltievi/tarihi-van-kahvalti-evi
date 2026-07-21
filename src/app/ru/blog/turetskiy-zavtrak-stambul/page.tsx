import { InternationalBreakfastGuide, getGuide } from "../../../components/international-breakfast-guide";
import { buildGuideJsonLd, buildGuideMetadata } from "../../../components/international-breakfast-guide-seo";

const guide = getGuide("ru");

export const metadata = buildGuideMetadata(guide);

export default function RussianTurkishBreakfastGuidePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: buildGuideJsonLd(guide) }} />
      <InternationalBreakfastGuide guide={guide} />
    </>
  );
}
