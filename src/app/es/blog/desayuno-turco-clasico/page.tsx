import { TaksimTravelGuide, travelGuideMetadata } from "../../../components/taksim-travel-guide";
import { spanishClassicGuide } from "../../../components/western-breakfast-guide-data";

export const metadata = travelGuideMetadata(spanishClassicGuide);
export default function Page() { return <TaksimTravelGuide guide={spanishClassicGuide} />; }
