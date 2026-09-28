import { TaksimTravelGuide, travelGuideMetadata } from "../../../components/taksim-travel-guide";
import { chineseBreakfastGuide } from "../../../components/taksim-travel-guide-data";

export const metadata = travelGuideMetadata(chineseBreakfastGuide);

export default function Page() { return <TaksimTravelGuide guide={chineseBreakfastGuide} />; }
