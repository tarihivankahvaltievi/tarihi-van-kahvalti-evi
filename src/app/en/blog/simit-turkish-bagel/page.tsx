import { TaksimTravelGuide, travelGuideMetadata } from "../../../components/taksim-travel-guide";
import { englishSimitGuide } from "../../../components/western-breakfast-guide-data";

export const metadata = travelGuideMetadata(englishSimitGuide);
export default function Page() { return <TaksimTravelGuide guide={englishSimitGuide} />; }
