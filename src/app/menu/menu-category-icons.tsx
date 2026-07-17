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
      {/* Main Central Plate */}
      <circle cx="24" cy="24" r="10" />
      <circle cx="24" cy="24" r="7.5" opacity="0.4" />
      {/* Egg inside central plate */}
      <path d="M20 25.5c-1-1.5 0-3 1.5-3.5s2.5 0 2.8 1 0 1.5-1 2-2 .8-3.3.5Z" />
      <circle cx="21.5" cy="24" r="1.5" fill="currentColor" stroke="none" />
      
      {/* Top-Left Plate (Olives/Mezze) */}
      <circle cx="13" cy="14" r="5" opacity="0.8" />
      <circle cx="11.5" cy="13.5" r="0.8" fill="currentColor" stroke="none" />
      <circle cx="14" cy="12.5" r="0.8" fill="currentColor" stroke="none" />
      <circle cx="13" cy="15" r="0.8" fill="currentColor" stroke="none" />
      
      {/* Top-Right Plate (Cheese) */}
      <circle cx="35" cy="14" r="5" opacity="0.8" />
      <path d="M33 13l4-2v4Z" opacity="0.9" />
      
      {/* Bottom-Left Plate (Butter/Mezze) */}
      <circle cx="12" cy="34" r="4.5" opacity="0.8" />
      <path d="M10.5 33.5c1-1 2.5-1 2.5.5s-1 1.5-2.5-.5" opacity="0.9" />
      
      {/* Bottom-Right Plate (Tomato Slice) */}
      <circle cx="36" cy="34" r="4.5" opacity="0.8" />
      <path d="M34 34h4M36 32v4" opacity="0.6" />
      
      {/* Fork on the left */}
      <path d="M3 15v5c0 1.5.8 2.2 2 2.2s2-.7 2-2.2v-5" />
      <path d="M5 15v5" />
      <path d="M5 22.2v11.8" />
      
      {/* Spoon on the right */}
      <path d="M41 12c-1.5 0-2.5 2-2.5 4.5s1 5.5 2.5 5.5 2.5-3 2.5-5.5-1-4.5-2.5-4.5Z" />
      <path d="M41 22v12" />
    </svg>
  );
}

function BreakfastPlateIcon() {
  return (
    <svg {...iconProps}>
      {/* Plate */}
      <circle cx="24" cy="24" r="16" />
      <circle cx="24" cy="24" r="12" opacity="0.4" />
      
      {/* Simit slice (crescent shaped with sesame seed dots) */}
      <path d="M11 25c1-6 5.5-10.5 11.5-11.5" />
      <path d="M13.5 27c1-4.5 4.5-8 9-9" />
      <path d="M22.5 13.5l1.5 4.5" />
      <path d="M11 25l2.5 2" />
      <circle cx="14" cy="21" r="0.5" fill="currentColor" stroke="none" />
      <circle cx="17.5" cy="17.5" r="0.5" fill="currentColor" stroke="none" />
      <circle cx="21" cy="16" r="0.5" fill="currentColor" stroke="none" />
      
      {/* Cheese Wedge */}
      <path d="M26 23l8-4v9l-8-5Z" />
      <circle cx="29.5" cy="21.5" r="0.6" fill="currentColor" stroke="none" />
      <circle cx="31.5" cy="23.5" r="0.6" fill="currentColor" stroke="none" />
      
      {/* Tomato Slice */}
      <circle cx="28" cy="30" r="4.5" />
      <path d="M28 25.5v9M23.5 30h9" opacity="0.6" />
      <circle cx="26" cy="28" r="0.4" fill="currentColor" stroke="none" />
      <circle cx="30" cy="28" r="0.4" fill="currentColor" stroke="none" />
      <circle cx="26" cy="32" r="0.4" fill="currentColor" stroke="none" />
      <circle cx="30" cy="32" r="0.4" fill="currentColor" stroke="none" />
      
      {/* Olives */}
      <ellipse cx="17" cy="31" rx="1.5" ry="2" transform="rotate(30 17 31)" />
      <ellipse cx="20.5" cy="33" rx="1.5" ry="2" transform="rotate(-30 20.5 33)" />
    </svg>
  );
}

function CopperPanIcon() {
  return (
    <svg {...iconProps}>
      {/* Sahan Outer Body */}
      <circle cx="24" cy="25" r="13" />
      {/* Sahan Inner Cooking Rim */}
      <circle cx="24" cy="25" r="11" opacity="0.3" />
      {/* Hammered texture (concentric dashed circles) */}
      <circle cx="24" cy="25" r="9" strokeDasharray="2,4" opacity="0.25" />
      
      {/* Left loop handle with rivets */}
      <path d="M11 21c-3.5 0-6 2-6 4s2.5 4 6 4" />
      <path d="M11 22.5v5" opacity="0.7" />
      <circle cx="11.5" cy="23" r="0.7" fill="currentColor" stroke="none" />
      <circle cx="11.5" cy="27" r="0.7" fill="currentColor" stroke="none" />
      
      {/* Right loop handle with rivets */}
      <path d="M37 21c3.5 0 6 2 6 4s-2.5 4-6 4" />
      <path d="M37 22.5v5" opacity="0.7" />
      <circle cx="36.5" cy="23" r="0.7" fill="currentColor" stroke="none" />
      <circle cx="36.5" cy="27" r="0.7" fill="currentColor" stroke="none" />
      
      {/* Two Eggs inside */}
      {/* Egg 1 */}
      <path d="M16.5 28c-1-1 0-2.5 1.5-3s2.5 0 2.5 1.5-1 2.5-2.5 2.5-1-.5-1.5-1Z" />
      <circle cx="18.5" cy="26.5" r="1.5" fill="currentColor" stroke="none" />
      
      {/* Egg 2 */}
      <path d="M23.5 23c-1-1 0-2.5 1.5-3s2.5 0 2.5 1.5-1 2.5-2.5 2.5-1-.5-1.5-1Z" />
      <circle cx="25.5" cy="21.5" r="1.5" fill="currentColor" stroke="none" />
      
      {/* Sucuk & Pepper slices */}
      <circle cx="27" cy="27" r="2.2" />
      <circle cx="27" cy="27" r="1.1" strokeDasharray="1,2" opacity="0.6" />
      <circle cx="18" cy="21" r="2" strokeDasharray="2,2" opacity="0.7" />
      
      {/* Steam lines */}
      <path data-motion="sizzle" d="M20 9c0-1.5 1-2 0-3.5s-1-2 0-3.5M28 9c0-1.5-1-2 0-3.5s1-2 0-3.5" />
    </svg>
  );
}

function JamBowlIcon() {
  return (
    <svg {...iconProps}>
      {/* Jar lid fabric cover scallops */}
      <path d="M14.5 17.5c1 0 1.5-1 2.5-1s1.5 1 2.5 1 1.5-1 2.5-1 1.5 1 2.5 1 1.5-1 2.5-1 1.5 1 2.5 1 1.5-1 2.5-1" />
      {/* Jar lid fabric cover top */}
      <path d="M16 17c-1-2-1-4.5 1-5.5s4-.5 7-.5 7-.5 7 .5 2 3.5 1 5.5" />
      
      {/* Tied string ribbon bow */}
      <path d="M15 17.5c4.5.5 9.5.5 14 0" opacity="0.8" />
      <path d="M29.5 17.5c1-1 2-1.5 1-2.2s-2 .2-.8 1.5" />
      <path d="M29.5 17.5c.8 1 .8 2 0 3" />
      
      {/* Jar Body */}
      <path d="M19 19c-2 0-3.5 1.5-3.5 3.5v11.5c0 2.5 2 4.5 4.5 4.5h8c2.5 0 4.5-2 4.5-4.5V22.5c0-2-1.5-3.5-3.5-3.5H19Z" />
      
      {/* Jar Label */}
      <rect x="18.5" y="24" width="11" height="7" rx="0.5" opacity="0.8" />
      {/* Strawberry inside label */}
      <path d="M24 26.5c-1 0-1.8.8-1.8 1.8 0 1.5 1.8 3.2 1.8 3.2s1.8-1.7 1.8-3.2c0-1-.8-1.8-1.8-1.8Z" fill="currentColor" stroke="none" />
      <path d="M22.5 26.5c.5-.5 1-.2 1.5-.2s1-.3 1.5.2" opacity="0.6" />
      
      {/* Spoon inside jar */}
      <path d="M28 17l4.5-5.5" />
      <path d="M27.5 19.5l-2.5 2.5" opacity="0.4" />
    </svg>
  );
}

function VanCheeseIcon() {
  return (
    <svg {...iconProps}>
      {/* Karakovan Honeycomb Bal */}
      {/* Hexagon 1 */}
      <path d="M13 10l4.3 2.5v5l-4.3 2.5-4.3-2.5v-5Z" />
      {/* Hexagon 2 */}
      <path d="M17.3 12.5l4.3 2.5v5l-4.3 2.5-4.3-2.5v-5Z" />
      {/* Hexagon 3 */}
      <path d="M13 17.5l4.3 2.5v5L13 27.5l-4.3-2.5v-5Z" />
      {/* Honeycomb interior cell */}
      <path d="M13 12.5l3.5 2v4l-3.5 2-3.5-2v-4Z" opacity="0.4" />
      
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
      <path d="M30 34c.5-.5 1-.5 1-1" opacity="0.8" />
      <circle cx="30" cy="31" r="0.6" fill="currentColor" stroke="none" />
      <circle cx="36" cy="29" r="0.6" fill="currentColor" stroke="none" />
      <circle cx="28" cy="26" r="0.5" fill="currentColor" stroke="none" />
      
      {/* Van Ketesi (Round flatbread) */}
      <circle cx="17" cy="33" r="8" />
      {/* Decorative patterns on Kete */}
      <path d="M10 33h14M17 26v14" strokeDasharray="1.5,2" opacity="0.6" />
      <path d="M12 28l10 10M12 38l10-10" strokeDasharray="1.5,2" opacity="0.4" />
    </svg>
  );
}

function TurkishTeaIcon() {
  return (
    <svg {...iconProps}>
      {/* Steam lines */}
      <path data-motion="steam" d="M21 9c0-1.8-1-3 0-4.5s1-3 0-4.5M27 9c0-1.8 1-3 0-4.5s-1-3 0-4.5" />
      
      {/* Tea Glass upper rim */}
      <ellipse cx="24" cy="13" rx="8" ry="1.8" />
      
      {/* Tea Glass body */}
      <path d="M16 13c0 3.5 2.5 6.5 2.5 10.5s-2.5 7.5-3.5 10.5c0 2.5 2 4.5 4.5 4.5h9c2.5 0 4.5-2 4.5-4.5c-1-3-3.5-7-3.5-10.5s2.5-7 2.5-10.5" />
      
      {/* Double-ring Saucer */}
      <ellipse cx="24" cy="39" rx="14" ry="2.8" />
      <path d="M12 39c0 1.5 5 2.5 12 2.5s12-1 12-2.5" />
      <ellipse cx="24" cy="38.5" rx="9" ry="1.8" opacity="0.4" />
      
      {/* Tea liquid lines */}
      <ellipse cx="24" cy="24" rx="5.9" ry="1.2" opacity="0.6" />
      <path d="M18.2 24.5c0 4.5-1.7 6.5-1.7 9 0 2 1.5 3.5 3 4" opacity="0.75" />
      <path d="M29.8 24.5c0 4.5 1.7 6.5 1.7 9 0 2-1.5 3.5-3 4" opacity="0.75" />
      <path d="M18.2 24.5h11.6" opacity="0.5" />
      
      {/* Tea Spoon inside glass */}
      <path d="M26 21l6-10" />
      <path d="M25.5 23l-3 4.5c-.5.8-1.5 1-2.2.5s-.8-1.5-.3-2.2l3-4.8" opacity="0.5" />
    </svg>
  );
}

function ColdDrinkIcon() {
  return (
    <svg {...iconProps}>
      {/* Tall Tumbler Glass */}
      <ellipse cx="24" cy="14" rx="10" ry="2" />
      <path d="M14 14l3 23c.2 2 1.8 3.5 3.8 3.5h6.4c2 0 3.6-1.5 3.8-3.5l3-23" />
      {/* Rib lines */}
      <path d="M18 16v20" opacity="0.15" />
      <path d="M24 16v20" opacity="0.15" />
      <path d="M30 16v20" opacity="0.15" />
      
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
      
      {/* Mint leaves */}
      <path d="M23 16c1-2 3-2 3 0s-2 3-3 0Z" opacity="0.85" />
      <path d="M21 17c-1-1.5-2.5-1.5-2.5 0s1.5 2 2.5 0Z" opacity="0.85" />
      
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
