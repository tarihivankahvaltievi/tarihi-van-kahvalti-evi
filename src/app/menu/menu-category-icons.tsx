import { Coffee, CupSoda, EggFried, MapPin, Soup, Utensils } from "lucide-react";

type MenuCategoryIconName =
  | "all"
  | "breakfast"
  | "pan"
  | "jam"
  | "van"
  | "hot-drink"
  | "cold-drink";

const libraryIconProps = {
  "aria-hidden": true,
  absoluteStrokeWidth: true,
  size: 40,
  strokeWidth: 2.1,
};

const customIconProps = {
  "aria-hidden": true,
  fill: "none",
  focusable: false,
  height: 24,
  shapeRendering: "geometricPrecision" as const,
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  strokeWidth: 1.28,
  viewBox: "0 0 24 24",
  width: 24,
};

function JamJarIcon() {
  return (
    <svg {...customIconProps}>
      <path d="M8 5.5h8" />
      <path d="M9 3.5h6v2H9z" />
      <path d="M8.25 7h7.5l.7 10.1A2.1 2.1 0 0 1 14.35 19.5h-4.7a2.1 2.1 0 0 1-2.1-2.4L8.25 7Z" />
      <path d="M9.8 12.1h4.4v3.7H9.8z" />
      <path d="M11 14.3c.55.65 1.45.65 2 0" />
    </svg>
  );
}

/**
 * Menu-category pictograms use one 24px outline system: a single subject,
 * consistent optical stroke weight, and no decorative texture at small sizes.
 */
export function MenuCategoryIcon({ name }: { name: MenuCategoryIconName }) {
  if (name === "all") return <Utensils {...libraryIconProps} />;
  if (name === "breakfast") return <EggFried {...libraryIconProps} />;
  if (name === "pan") return <Soup {...libraryIconProps} />;
  if (name === "jam") return <JamJarIcon />;
  if (name === "van") return <MapPin {...libraryIconProps} />;
  if (name === "hot-drink") return <Coffee {...libraryIconProps} />;
  return <CupSoda {...libraryIconProps} />;
}
