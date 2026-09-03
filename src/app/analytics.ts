"use client";

type AnalyticsValue = string | number | boolean | undefined;
type AnalyticsParameters = Record<string, AnalyticsValue>;

declare global {
  interface Window {
    dataLayer?: unknown[][];
    gtag?: (...args: unknown[]) => void;
  }
}

const googleAdsConversionId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID ?? "AW-17869229892";
const bookingConversionLabel = process.env.NEXT_PUBLIC_GOOGLE_ADS_BOOKING_CONVERSION_LABEL;

function sendEvent(name: string, parameters: AnalyticsParameters) {
  if (typeof window === "undefined") return;

  if (typeof window.gtag === "function") {
    window.gtag("event", name, parameters);
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(["event", name, parameters]);
}

/**
 * Sends only operational, non-identifying interaction data. Customer names,
 * phone numbers, dates, notes, and reservation IDs must never be passed here.
 */
export function trackEvent(name: string, parameters: AnalyticsParameters = {}) {
  sendEvent(name, parameters);
}

export function trackBookingLead(parameters: AnalyticsParameters = {}) {
  sendEvent("generate_lead", parameters);

  if (bookingConversionLabel) {
    sendEvent("conversion", {
      send_to: `${googleAdsConversionId}/${bookingConversionLabel}`,
    });
  }
}
