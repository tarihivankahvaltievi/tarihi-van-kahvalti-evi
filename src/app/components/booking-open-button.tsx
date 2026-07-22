"use client";

import { Calendar, Camera } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import type { ButtonHTMLAttributes } from "react";

type BookingOpenButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: "calendar" | "camera";
};

export function BookingOpenButton({
  children,
  icon = "calendar",
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

        const isEnglish = pathname.startsWith("/en");
        const destination = isEnglish ? "/en/reservation" : "/rezervasyon";
        router.push(destination);
      }}
    >
      <Icon size={17} />
      {children}
    </button>
  );
}
