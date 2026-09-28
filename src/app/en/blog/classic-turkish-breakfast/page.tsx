import { TaksimTravelGuide, travelGuideMetadata } from "../../../components/taksim-travel-guide";
import { englishClassicGuide } from "../../../components/western-breakfast-guide-data";

export const metadata = travelGuideMetadata(englishClassicGuide);
export default function Page() { return <TaksimTravelGuide guide={englishClassicGuide} />; }
