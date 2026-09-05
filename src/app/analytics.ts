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
const bookingConversionLabel =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_BOOKING_CONVERSION_LABEL ?? "1soqCKS9uu0cEMSe28hC";

function sendEvent(name: string, parameters: AnalyticsParameters = {}) {
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

  // Send Google Ads conversion and interaction events for high-intent customer actions
  if (name === "contact_click") {
    const method = String(parameters.contact_method || "").toLowerCase();
    const surface = String(parameters.surface || "website");

    // Standard contact event
    sendEvent("contact", {
      method,
      surface,
    });

    if (method === "phone" || method === "call") {
      sendEvent("conversion", {
        send_to: googleAdsConversionId,
        event_category: "phone_call",
        event_label: surface,
        value: 1.0,
        currency: "TRY",
      });
    } else if (method === "directions" || method === "maps") {
      sendEvent("conversion", {
        send_to: googleAdsConversionId,
        event_category: "directions",
        event_label: surface,
        value: 1.0,
        currency: "TRY",
      });
    } else if (method === "whatsapp") {
      sendEvent("conversion", {
        send_to: googleAdsConversionId,
        event_category: "whatsapp",
        event_label: surface,
        value: 1.0,
        currency: "TRY",
      });
    }
  }
}

export function trackBookingLead(parameters: AnalyticsParameters = {}) {
  // Fire standard GA4 lead generation event
  sendEvent("generate_lead", {
    currency: "TRY",
    value: 1.0,
    ...parameters,
  });

  // Fire primary Google Ads conversion event with exact conversion label
  if (bookingConversionLabel) {
    sendEvent("conversion", {
      send_to: `${googleAdsConversionId}/${bookingConversionLabel}`,
      value: 1.0,
      currency: "TRY",
      transaction_id: String(parameters.reservation_id || ""),
    });
  }

  // Also send fallback conversion to parent tag ID
  sendEvent("conversion", {
    send_to: googleAdsConversionId,
    event_category: "reservation_lead",
    value: 1.0,
    currency: "TRY",
  });
}

/**
 * Client-side auto tracker for all tel:, Google Maps, and WhatsApp links across the entire site.
 */
export function AnalyticsAutoTracker() {
  if (typeof window !== "undefined") {
    // Only attach once
    if (!(window as unknown as { __van_analytics_attached?: boolean }).__van_analytics_attached) {
      (window as unknown as { __van_analytics_attached?: boolean }).__van_analytics_attached = true;
      document.addEventListener("click", (e) => {
        const target = (e.target as HTMLElement | null)?.closest("a");
        if (!target) return;
        const href = target.getAttribute("href") || "";

        if (href.startsWith("tel:")) {
          trackEvent("contact_click", { contact_method: "phone", surface: "tel_link" });
        } else if (href.includes("google.com/maps") || href.includes("maps.google.com") || href.includes("goo.gl/maps")) {
          trackEvent("contact_click", { contact_method: "directions", surface: "map_link" });
        } else if (href.includes("wa.me") || href.includes("whatsapp.com")) {
          trackEvent("contact_click", { contact_method: "whatsapp", surface: "whatsapp_link" });
        }
      }, { passive: true });
    }
  }
  return null;
}
