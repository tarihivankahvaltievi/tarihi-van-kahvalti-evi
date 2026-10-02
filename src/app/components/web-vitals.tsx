"use client";

import { useReportWebVitals } from "next/web-vitals";
import { useCallback, useRef } from "react";
import { analyticsId, safePageLocation } from "../analytics-policy";
import { getGtag } from "../analytics";

export function WebVitals({ endpoint }: { endpoint?: string }) {
  const page = useRef<string | null>(null);
  const report = useCallback<Parameters<typeof useReportWebVitals>[0]>((metric) => {
    const currentPage = safePageLocation(window.location.href);
    if (!currentPage) return;
    page.current ??= currentPage;
    if (process.env.NODE_ENV !== "production") {
      console.debug("[Web Vitals]", metric.name, Math.round(metric.value * 100) / 100, metric);
    }

    const observation = {
      id: metric.id,
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      navigationType: metric.navigationType,
    };

    if (/^G-[A-Z0-9]+$/.test(analyticsId)) getGtag()("event", "web_vitals", {
      send_to: analyticsId,
      page_location: page.current,
      metric_name: metric.name,
      metric_id: metric.id,
      metric_value: metric.value,
      metric_delta: metric.delta,
      metric_rating: metric.rating,
      navigation_type: metric.navigationType,
      non_interaction: true,
    });
    if (!endpoint) return;
    const payload = JSON.stringify(observation);

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
  }, [endpoint]);
  useReportWebVitals(report);

  return null;
}
