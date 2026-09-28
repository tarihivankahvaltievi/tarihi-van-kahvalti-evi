import { TaksimTravelGuide, travelGuideMetadata } from "../../../components/taksim-travel-guide";
import { chineseHoneyGuide } from "../../../components/taksim-travel-guide-data";

export const metadata = travelGuideMetadata(chineseHoneyGuide);

export default function Page() { return <TaksimTravelGuide guide={chineseHoneyGuide} />; }
