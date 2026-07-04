"use client";

import { Calendar, Camera } from "lucide-react";
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

  return (
    <button
      {...props}
      type={type}
      onClick={(event) => {
        onClick?.(event);

        if (event.defaultPrevented) {
          return;
        }

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
