type MenuCategoryIconName =
  | "all"
  | "breakfast"
  | "pan"
  | "jam"
  | "van"
  | "hot-drink"
  | "cold-drink";

const iconProps = {
  width: 40,
  height: 40,
  viewBox: "0 0 48 48",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  shapeRendering: "geometricPrecision" as const,
  focusable: false,
  "aria-hidden": true,
};

function AllTableIcon() {
  return (
    <svg {...iconProps}>
      <circle cx="24" cy="24" r="12.7" />
      <circle cx="24" cy="24" r="8" opacity=".5" />
      <path d="M9.2 9.2v9.4M6.8 9.2v6.2c0 2.2 1.1 3.2 2.4 3.2s2.4-1 2.4-3.2V9.2M9.2 18.6v20.2" />
      <path d="M38.8 22.4v16.4M38.8 22.4c-2.3 0-4.1-2.4-4.1-6.2s1.8-7 4.1-7 4.1 3.2 4.1 7-1.8 6.2-4.1 6.2Z" />
      <path data-motion="herb" d="M20.1 24.8c2-3 5.1-3.8 7.8-2.1-1.6 3.2-4.8 4.3-7.8 2.1Z" />
      <path d="M23.3 22.7c-.1-1.4.4-2.6 1.5-3.6" opacity=".75" />
    </svg>
  );
}

function BreakfastPlateIcon() {
  return (
    <svg {...iconProps}>
      <circle cx="24" cy="24" r="15.2" />
      <path d="M15.2 17.6c1.1-2.8 4.3-4.1 7-2.7 1.2.6 1.8 1.8 2 3.1.3 1.5 1.5 2.4 1.1 4.2-.5 2.5-3.2 4-6 3.2-3.3-.9-5.5-4.2-4.1-7.8Z" />
      <circle cx="20.1" cy="20.2" r="2.3" fill="currentColor" stroke="none" />
      <path d="m27.8 29.7 5.9-9.8 3.7 11.7-9.6-1.9Z" />
      <circle cx="30.9" cy="27.3" r=".9" fill="currentColor" stroke="none" />
      <path data-motion="lift" d="M13.5 31.9c3.9 2 7.8 2.2 11.9.7" />
    </svg>
  );
}

function CopperPanIcon() {
  return (
    <svg {...iconProps}>
      <path d="m33.4 24.2 7.8-3.1c1.3-.5 2.8.1 3.3 1.4l.2.5c.5 1.3-.1 2.8-1.4 3.3l-8.2 3.2" />
      <ellipse cx="22.1" cy="29" rx="13.7" ry="8.5" />
      <path d="M9.2 30.6c1.8 5.2 7.5 8.2 13.8 7.6 5.4-.5 9.8-3.6 11.2-7.8" opacity=".5" />
      <path d="M15.2 28.5c.5-3.2 3-5.2 5.8-4.6 1 .2 1.7 1 2.2 1.9.6 1.1 1.9 1.4 2.6 2.5 1.1 1.9-.4 4.5-3 4.9-3.6.5-8-1-7.6-4.7Z" />
      <circle cx="20.8" cy="28.8" r="2.3" fill="currentColor" stroke="none" />
      <path data-motion="sizzle" d="M16.7 13.7c1.4 1.4 1.4 2.9 0 4.3M24 10.4c1.5 1.6 1.5 3.2.1 4.8" />
    </svg>
  );
}

function JamBowlIcon() {
  return (
    <svg {...iconProps}>
      <path d="m27.7 22.6 8.5-11.4c.9-1.2 2.6-1.4 3.8-.5l.4.3c1.2.9 1.4 2.6.5 3.8l-8.6 11.5" />
      <ellipse cx="22.5" cy="25.1" rx="13.8" ry="4.7" />
      <path d="M9.3 26.4c1.4 7.7 6.1 12.2 13.2 12.2s11.8-4.5 13.2-12.2" />
      <path d="M13.1 24.4c5.8-2.1 12.7-2.1 18.5 0" opacity=".55" />
      <circle cx="19.6" cy="25.1" r="2.1" fill="currentColor" stroke="none" />
      <circle cx="24.2" cy="26" r="2.1" fill="currentColor" stroke="none" />
      <path data-motion="herb" d="M21.7 22.4c.4-2.5 1.8-4.2 4.2-5.1" />
      <path d="M14.2 38.8h16.6" />
    </svg>
  );
}

function VanCheeseIcon() {
  return (
    <svg {...iconProps}>
      <path d="m8.7 21.4 14.4-10 16.2 7.4-14.5 10-16.1-7.4Z" />
      <path d="M8.7 21.4v10.8l16.1 7.4V28.8L8.7 21.4Z" />
      <path d="m24.8 28.8 14.5-10v10.8l-14.5 10V28.8Z" />
      <ellipse cx="23.6" cy="18.5" rx="2.3" ry="1.4" />
      <ellipse cx="32.2" cy="21.5" rx="1.8" ry="1.1" />
      <path data-motion="herb" d="M12.4 27.2c3.1-.2 5.1 1.1 6.1 3.8-3.1.4-5.2-.9-6.1-3.8Z" />
      <path d="M18.2 30.8c1.5 1 2.5 2.4 3 4.1" opacity=".75" />
      <circle cx="32.7" cy="31.8" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TurkishTeaIcon() {
  return (
    <svg {...iconProps}>
      <path data-motion="steam" d="M19.4 11.7c-2-2.4 1.8-3.6.1-6M27.8 11.7c2-2.4-1.8-3.6-.1-6" />
      <path d="M15.1 14.8h17.8" />
      <path d="M17.2 14.8c.4 5 2.6 6.1 2.6 9.1 0 3.1-1.7 4.1-2 9.8-.1 2.2 1.6 4 3.8 4h4.8c2.2 0 3.9-1.8 3.8-4-.3-5.7-2-6.7-2-9.8 0-3 2.2-4.1 2.6-9.1" />
      <path d="M19.4 25.5c2.9.9 6.3.9 9.2 0M16.3 38.6h15.4" />
      <path d="M20 30.1h8" opacity=".55" />
      <ellipse cx="24" cy="40.5" rx="11.4" ry="2.1" />
    </svg>
  );
}

function ColdDrinkIcon() {
  return (
    <svg {...iconProps}>
      <path d="M14.7 14.2h18.1l-1.9 22.1c-.2 2-1.8 3.5-3.8 3.5h-6.7c-2 0-3.6-1.5-3.8-3.5l-1.9-22.1Z" />
      <path d="M12.8 14.2h21.9M29.2 5.8l-4.6 15.1" />
      <path d="M17 22.1c4.3-1.2 9-1.2 13.3 0" opacity=".55" />
      <g data-motion="ice">
        <path d="m19.3 25.2 4.1-1.3 1.3 4.1-4.1 1.3-1.3-4.1Z" />
        <path d="m25.8 31.5 3.3-1 1 3.3-3.3 1-1-3.3Z" />
      </g>
      <circle cx="35" cy="19.8" r="5.2" />
      <path d="m31.3 16.1 7.4 7.4M35 14.6v10.5" />
    </svg>
  );
}

export function MenuCategoryIcon({ name }: { name: MenuCategoryIconName }) {
  if (name === "all") return <AllTableIcon />;
  if (name === "breakfast") return <BreakfastPlateIcon />;
  if (name === "pan") return <CopperPanIcon />;
  if (name === "jam") return <JamBowlIcon />;
  if (name === "van") return <VanCheeseIcon />;
  if (name === "hot-drink") return <TurkishTeaIcon />;
  return <ColdDrinkIcon />;
}
