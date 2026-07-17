import Image from "next/image";

type MenuCategoryIconName =
  | "all"
  | "breakfast"
  | "pan"
  | "jam"
  | "van"
  | "hot-drink"
  | "cold-drink";

const categoryIconAssets: Record<MenuCategoryIconName, string> = {
  all: "/images/menu-category-icons/all.png",
  breakfast: "/images/menu-category-icons/breakfast.png",
  pan: "/images/menu-category-icons/pan.png",
  jam: "/images/menu-category-icons/jam.png",
  van: "/images/menu-category-icons/van.png",
  "hot-drink": "/images/menu-category-icons/hot-drink.png",
  "cold-drink": "/images/menu-category-icons/cold-drink.png",
};

export function MenuCategoryIcon({ name }: { name: MenuCategoryIconName }) {
  return (
    <Image
      src={categoryIconAssets[name]}
      alt=""
      width={192}
      height={192}
      sizes="(max-width: 760px) 36px, 39px"
    />
  );
}
