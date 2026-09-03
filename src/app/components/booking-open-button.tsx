"use client";

import { Calendar, Camera } from "lucide-react";
import { useRouter } from "next/navigation";
import type { ButtonHTMLAttributes } from "react";

type BookingOpenButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  category?: string;
  icon?: "calendar" | "camera";
  itemTitle?: string;
  href?: string;
};

export function BookingOpenButton({
  category,
  children,
  icon = "calendar",
  itemTitle,
  onClick,
  type = "button",
  href,
  ...props
}: BookingOpenButtonProps) {
  const Icon = icon === "camera" ? Camera : Calendar;
  const router = useRouter();

  return (
    <button
      {...props}
      type={type}
      onClick={(event) => {
        onClick?.(event);

        if (event.defaultPrevented) {
          return;
        }

        if (href) {
          router.push(href);
          return;
        }

        const params = new URLSearchParams();
        if (category) {
          params.set("service", category.toLowerCase().includes("cafe") ? "cafe" : "breakfast");
        }
        if (itemTitle) {
          params.set("item", itemTitle);
        }
        const queryStr = params.toString() ? `?${params.toString()}` : "";
        router.push(`/rezervasyon${queryStr}`);

        window.dispatchEvent(
          new CustomEvent("open-booking", {
            detail: {
              category,
              itemTitle,
            },
          }),
        );
      }}
    >
      <Icon size={17} />
      {children}
    </button>
  );
}
