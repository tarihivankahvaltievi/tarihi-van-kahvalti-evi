type MenuCategoryIconName =
  | "all"
  | "breakfast"
  | "pan"
  | "jam"
  | "van"
  | "hot-drink"
  | "cold-drink";

export function MenuCategoryIcon({ name }: { name: MenuCategoryIconName }) {
  const commonProps = {
    width: 40,
    height: 40,
    viewBox: "0 0 48 48",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  if (name === "all") {
    return (
      <svg {...commonProps}>
        <circle cx="24" cy="24" r="15.5" />
        <circle cx="24" cy="24" r="9.5" strokeDasharray="1.2 3.2" />
        <path data-motion="turn" d="M24 5.5v3M24 39.5v3M5.5 24h3M39.5 24h3M10.9 10.9l2.1 2.1M35 35l2.1 2.1M37.1 10.9 35 13M13 35l-2.1 2.1" />
        <path d="M20.2 25.7c1.8-4.7 5.7-7.2 9.9-6.1-1.7 4.3-5.3 7.2-9.9 6.1Z" />
        <path d="M20.6 25.4c-1.5-2.6-3.6-4-6.4-3.8.6 3.2 2.6 5.1 6.4 3.8Z" />
      </svg>
    );
  }

  if (name === "breakfast") {
    return (
      <svg {...commonProps}>
        <ellipse cx="24" cy="34.5" rx="17" ry="4.5" />
        <path d="M9.5 32.5c1.9-7.1 7.2-11.4 14.5-11.4s12.6 4.3 14.5 11.4" />
        <path d="M24 21v-3.8" />
        <path data-motion="lift" d="M17.2 26.5c1.5-2.8 4-4.5 6.8-4.5s5.3 1.7 6.8 4.5" />
        <circle cx="15" cy="14" r="3.4" />
        <path d="M31.5 11.5c2.8.2 4.7 2.1 4.8 4.8-2.8.2-4.7-1.8-4.8-4.8Z" />
        <path d="M31.7 16.1c-1.5.2-2.7.8-3.7 1.8" />
      </svg>
    );
  }

  if (name === "pan") {
    return (
      <svg {...commonProps}>
        <circle cx="20.5" cy="25" r="12.5" />
        <circle cx="20.5" cy="25" r="9" opacity=".5" />
        <path d="m30 16.8 3.2-3.2c1.2-1.2 3-1.2 4.2 0l.9.9c1.1 1.1 1.1 2.9 0 4l-5.2 5.2" />
        <path d="M15.1 25.4c.4-3.1 2.1-5 5.1-5 1.1 0 1.9.6 2.5 1.6.8 1.4 2.5 1.6 3 3.2.7 2.3-1.3 4.8-4.1 4.8-3.7 0-6.9-1-6.5-4.6Z" />
        <circle cx="20.6" cy="25.5" r="2.2" />
        <path data-motion="sizzle" d="M13 9.5c1.2 1.2 1.2 2.5 0 3.7M20 7.5c1.2 1.4 1.2 2.8 0 4.2" />
      </svg>
    );
  }

  if (name === "jam") {
    return (
      <svg {...commonProps}>
        <path d="M15 15.5h18l-1.5 5v16.2c0 2-1.6 3.6-3.6 3.6h-7.8c-2 0-3.6-1.6-3.6-3.6V20.5l-1.5-5Z" />
        <path d="M14.3 11.7h19.4v3.8H14.3zM16.5 21h15" />
        <path d="M19.8 28.7c1.7-2.4 4.6-3.1 7-1.7-1.4 2.7-4.2 3.6-7 1.7Z" />
        <path d="M24.4 26.2c-.2-1.5.3-2.8 1.5-3.9" />
        <circle data-motion="seed" cx="21.1" cy="33.8" r=".8" fill="currentColor" stroke="none" />
        <circle data-motion="seed" cx="26.9" cy="34.5" r=".8" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  if (name === "van") {
    return (
      <svg {...commonProps}>
        <path d="m8.5 31.5 14.7-18 15.9 20.8-30.6-2.8Z" />
        <path d="M23.2 13.5v17.2M23.2 30.7l15.9 3.6" />
        <circle cx="17.5" cy="26" r="1.3" />
        <circle cx="29.5" cy="25" r="1.5" />
        <path data-motion="herb" d="M34.5 15.5c-4 .6-6.1 3.3-5.9 7.4 4-.6 6-3.3 5.9-7.4ZM28.8 22.6c-1.4-2.1-3.2-3.2-5.4-3.2" />
        <path d="M10.5 36.5c8 2.7 19 2.7 27 0" />
      </svg>
    );
  }

  if (name === "hot-drink") {
    return (
      <svg {...commonProps}>
        <path d="M16 17.5h16l-2.1 17.2c-.2 1.7-1.7 3-3.4 3h-5c-1.7 0-3.2-1.3-3.4-3L16 17.5Z" />
        <path d="M14 17.5h20M15.5 38.5h17" />
        <path d="M19.2 22.5c2.9 1.6 6.7 1.6 9.6 0" opacity=".55" />
        <path data-motion="steam" d="M20.2 13.3c-2.5-3.3 2.6-4.4.3-7.5M27.2 13.3c2.6-3.3-2.5-4.4-.2-7.5" />
      </svg>
    );
  }

  return (
    <svg {...commonProps}>
      <path d="M16 13.5h16l-1.7 23c-.1 1.6-1.5 2.8-3.1 2.8h-6.4c-1.6 0-3-1.2-3.1-2.8l-1.7-23Z" />
      <path d="M14.5 13.5h19M17.2 20.5h13.6" />
      <path d="m27.5 6.5-4.4 15.2" />
      <path data-motion="ice" d="m19.2 25.3 4-1.7 1.7 4-4 1.7-1.7-4ZM25.8 31.2l3-1.3 1.3 3-3 1.3-1.3-3Z" />
      <path d="M34.4 19.3a6 6 0 0 1 5.1 6.8 6 6 0 0 1-6.8-5.1l1.7-1.7Z" />
      <path d="m34.1 20 4.8 5.2" />
    </svg>
  );
}
