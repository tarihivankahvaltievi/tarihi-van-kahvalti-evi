import { TaksimTravelGuide, travelGuideMetadata } from "../../../components/taksim-travel-guide";
import { koreanTaksimGuide } from "../../../components/taksim-travel-guide-data";

export const metadata = travelGuideMetadata(koreanTaksimGuide);

export default function Page() { return <TaksimTravelGuide guide={koreanTaksimGuide} />; }
