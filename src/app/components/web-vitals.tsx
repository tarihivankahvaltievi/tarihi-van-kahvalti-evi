"use client";

import { useReportWebVitals } from "next/web-vitals";

export function WebVitals() {
  useReportWebVitals((metric) => {
    if (process.env.NODE_ENV !== "production") {
      console.debug("[Web Vitals]", metric.name, Math.round(metric.value * 100) / 100, metric);
    }

    const endpoint = process.env.NEXT_PUBLIC_WEB_VITALS_ENDPOINT;
    if (!endpoint) return;

    const payload = JSON.stringify({
      id: metric.id,
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      navigationType: metric.navigationType,
    });

    if (navigator.sendBeacon) {
      navigator.sendBeacon(endpoint, payload);
      return;
    }

    void fetch(endpoint, {
      body: payload,
      keepalive: true,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  });

  return null;
}
