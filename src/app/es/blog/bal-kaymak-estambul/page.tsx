import { TaksimTravelGuide, travelGuideMetadata } from "../../../components/taksim-travel-guide";
import { spanishHoneyGuide } from "../../../components/western-breakfast-guide-data";

export const metadata = travelGuideMetadata(spanishHoneyGuide);
export default function Page() { return <TaksimTravelGuide guide={spanishHoneyGuide} />; }
