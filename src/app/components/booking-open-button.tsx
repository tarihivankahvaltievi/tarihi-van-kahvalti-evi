"use client";

import { Calendar, Camera } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import type { ButtonHTMLAttributes } from "react";

type BookingOpenButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  category?: string;
  icon?: "calendar" | "camera";
  itemTitle?: string;
};

export function BookingOpenButton({
  category,
  children,
  icon = "calendar",
  itemTitle,
  onClick,
  type = "button",
  ...props
}: BookingOpenButtonProps) {
  const Icon = icon === "camera" ? Camera : Calendar;
  const pathname = usePathname();
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

        const destination = pathname.startsWith("/en") ? "/en/reservation" : "/rezervasyon";
        const search = new URLSearchParams();
        if (category) search.set("service", category);
        if (itemTitle) search.set("item", itemTitle);
        router.push(search.size ? `${destination}?${search.toString()}` : destination);
      }}
    >
      <Icon size={17} />
      {children}
    </button>
  );
}
