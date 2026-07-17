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
      {/* Plate concentric circles */}
      <circle cx="24" cy="24" r="14" />
      <circle cx="24" cy="24" r="9" opacity="0.4" />
      <circle cx="24" cy="24" r="5" opacity="0.2" />
      
      {/* Fork on the left */}
      <path d="M7 10v5c0 2 1.3 3 3 3s3-1 3-3v-5" />
      <path d="M10 10v8" />
      <path d="M10 18v16" />
      
      {/* Spoon on the right */}
      <path d="M35 15c0-3.5 2-5.5 5-5.5s5 2 5 5.5c0 4.5-2 7.5-5 7.5s-5-3-5-7.5Z" />
      <path d="M40 22.5v11.5" />
      
      {/* Olive leaf in the center of the plate */}
      <path data-motion="herb" d="M21 26c1.5-3.5 4.5-3.5 4.5 0s-3 3.5-4.5 0Z" />
      <path d="M20 28c1-1 2.5-1.5 3.5-1.5" opacity="0.75" />
    </svg>
  );
}

function BreakfastPlateIcon() {
  return (
    <svg {...iconProps}>
      {/* Plate */}
      <circle cx="24" cy="24" r="16" />
      <circle cx="24" cy="24" r="11" opacity="0.4" />
      
      {/* Fried Egg */}
      <path d="M14 26c-1.5-2.5 0-5.5 2.5-6.5s5 0 6-2 3-1.5 4.5.5 1 4 0 5.5-2 3-4 3-4.5 1.5-6.5.5-1.5-1-2.5-1Z" />
      <circle cx="20" cy="22" r="2.5" fill="currentColor" stroke="none" />
      
      {/* Cheese Wedge */}
      <path d="M26 23l8-4v9l-8-5Z" />
      <circle cx="29.5" cy="21.5" r="0.6" fill="currentColor" stroke="none" />
      <circle cx="31.5" cy="23.5" r="0.6" fill="currentColor" stroke="none" />
      
      {/* Olives */}
      <ellipse cx="20" cy="30" rx="1.2" ry="1.8" transform="rotate(30 20 30)" />
      <ellipse cx="23.5" cy="31" rx="1.2" ry="1.8" transform="rotate(-30 23.5 31)" />
    </svg>
  );
}

function CopperPanIcon() {
  return (
    <svg {...iconProps}>
      {/* Sahan Outer Body */}
      <circle cx="24" cy="25" r="13" />
      {/* Sahan Inner Cooking Rim */}
      <circle cx="24" cy="25" r="10.5" opacity="0.4" />
      
      {/* Left loop handle */}
      <path d="M11 21.5c-3.5 0-6 2-6 4s2.5 4 6 4" />
      <path d="M11 23v4" opacity="0.7" />
      
      {/* Right loop handle */}
      <path d="M37 21.5c3.5 0 6 2 6 4s-2.5 4-6 4" />
      <path d="M37 23v4" opacity="0.7" />
      
      {/* Two Eggs inside */}
      {/* Egg 1 */}
      <path d="M17.5 28.5c-1-1 0-2.5 1.2-3s2.2.2 2.5 1.2 0 1.8-1.2 2.2-1.5.6-2.5-.4Z" />
      <circle cx="19.5" cy="27" r="1.5" fill="currentColor" stroke="none" />
      
      {/* Egg 2 */}
      <path d="M24.5 23.5c-1-1 0-2.5 1.2-3s2.2.2 2.5 1.2 0 1.8-1.2 2.2-1.5.6-2.5-.4Z" />
      <circle cx="26.5" cy="22" r="1.5" fill="currentColor" stroke="none" />
      
      {/* Steam lines */}
      <path data-motion="sizzle" d="M21 9c-.5-1.5.5-3 0-4.5M27 9c.5-1.5-.5-3 0-4.5" />
    </svg>
  );
}

function JamBowlIcon() {
  return (
    <svg {...iconProps}>
      {/* Jar lid */}
      <rect x="17" y="11" width="14" height="4" rx="1" />
      <path d="M19 15v2h10v-2" />
      
      {/* Jar Body */}
      <path d="M19 17c-2.5 0-4 1.5-4 4v12c0 2.5 2 4.5 4.5 4.5h11c2.5 0 4.5-2 4.5-4.5V21c0-2.5-1.5-4-4-4H19Z" />
      
      {/* Jar Label */}
      <rect x="19" y="22" width="10" height="7" rx="0.5" opacity="0.8" />
      {/* Berry inside label */}
      <circle cx="24" cy="25.5" r="1.2" fill="currentColor" stroke="none" />
      <path d="M24 23.5v1" opacity="0.8" />
      
      {/* Spoon inside jar */}
      <path d="M28 17l4.5-5.5" />
      <path d="M27.5 19.5l-2.5 2.5" opacity="0.5" />
    </svg>
  );
}

function VanCheeseIcon() {
  return (
    <svg {...iconProps}>
      {/* Van Ketesi (Round flatbread) */}
      <circle cx="18" cy="28" r="9.5" />
      {/* Decorative patterns on Kete */}
      <path d="M12 28h12M18 22v12" strokeDasharray="1.5,2" opacity="0.8" />
      <path d="M13.7 23.7l8.6 8.6M13.7 32.3l8.6-8.6" strokeDasharray="1.5,2" opacity="0.8" />
      
      {/* Herbed Cheese Block */}
      {/* Top Face */}
      <path d="M26 23l5-3.5 7.5 2.5-5 3.5-7.5-2.5Z" />
      {/* Left Face */}
      <path d="M26 23v9.5l7.5 2.5v-9.5Z" />
      {/* Right Face */}
      <path d="M33.5 25.5v9.5l5-3.5v-9.5Z" />
      
      {/* Herb flecks (sirmo herbs) in cheese */}
      <path data-motion="herb" d="M28 28c.5-.5.5-1 0-1.5" opacity="0.8" />
      <path d="M35 27c.4.4.4 1 0 1.4" opacity="0.8" />
      <circle cx="30" cy="32" r="0.6" fill="currentColor" stroke="none" />
      <circle cx="36" cy="29" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TurkishTeaIcon() {
  return (
    <svg {...iconProps}>
      {/* Steam lines */}
      <path data-motion="steam" d="M21 11c0-1.8-1-3 0-4.5s1-3 0-4.5M27 11c0-1.8 1-3 0-4.5s-1-3 0-4.5" />
      
      {/* Tea Glass upper rim */}
      <ellipse cx="24" cy="13" rx="8" ry="1.8" />
      
      {/* Tea Glass body */}
      <path d="M16 13c0 3 2.5 6.5 2.5 10s-2.5 7.5-3.5 10.5c0 2.5 2 4.5 4.5 4.5h9c2.5 0 4.5-2 4.5-4.5c-1-3-3.5-7-3.5-10.5s2.5-7 2.5-10" />
      
      {/* Saucer */}
      <ellipse cx="24" cy="39" rx="14" ry="2.8" />
      <path d="M10 39c0 1.5 6 3 14 3s14-1.5 14-3" />
      
      {/* Tea liquid lines */}
      <ellipse cx="24" cy="23.5" rx="5.9" ry="1.2" opacity="0.6" />
      <path d="M18.2 24.5c0 4.5-1.7 6.5-1.7 9 0 2 1.5 3.5 3 4" opacity="0.75" />
      <path d="M29.8 24.5c0 4.5 1.7 6.5 1.7 9 0 2-1.5 3.5-3 4" opacity="0.75" />
      <path d="M18.2 24.5h11.6" opacity="0.5" />
    </svg>
  );
}

function ColdDrinkIcon() {
  return (
    <svg {...iconProps}>
      {/* Tall Tumbler Glass */}
      <ellipse cx="24" cy="14" rx="10" ry="2" />
      <path d="M14 14l3 23c.2 2 1.8 3.5 3.8 3.5h6.4c2 0 3.6-1.5 3.8-3.5l3-23" />
      
      {/* Liquid level */}
      <ellipse cx="24" cy="19" rx="9.3" ry="1.8" opacity="0.5" />
      
      {/* Straw */}
      {/* Inner part inside the glass */}
      <path d="M22 20l-4 15" opacity="0.75" />
      {/* Outer part rising above the rim */}
      <path d="M22.5 18l3.5-12.5 4-2" />
      
      {/* Ice Cubes */}
      <path d="M17 26l3.5-1.2 1.2 3.5-3.5 1.2Z" opacity="0.85" />
      <path d="M22.5 31l3-1 1 3-3 1Z" opacity="0.85" />
      
      {/* Lemon Wheel on Rim */}
      <circle cx="31.5" cy="15.5" r="4.5" />
      <path d="M31.5 11v9M27 15.5h9" opacity="0.6" />
      <path d="M28.3 12.3l6.4 6.4M28.3 18.7l6.4-6.4" opacity="0.6" />
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
