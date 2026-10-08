"use client";

import { useEffect } from "react";
import { analyticsId, measurementPageLocation, safeInteractionParameters, bookingTransactionId, isBookingId, type AnalyticsParameters } from "./analytics-policy";

declare global {
  interface Window {
    dataLayer?: (unknown[] | IArguments)[];
    gtag?: (...args: unknown[]) => void;
    vanTagsInitialized?: boolean;
    [key: `ga-disable-${string}`]: boolean | undefined;
  }
}

const googleAdsConversionId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID ?? "AW-17869229892";
const bookingConversionLabel =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_BOOKING_CONVERSION_LABEL ?? "1soqCKS9uu0cEMSe28hC";
// Each contact action has its own secondary Google Ads conversion. Never reuse
// the booking label, even if a deployment environment is misconfigured.
const phoneConversionLabel =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_PHONE_CONVERSION_LABEL ?? "ijbVCO2b3oYdEMSe28hC";
const directionsConversionLabel =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_DIRECTIONS_CONVERSION_LABEL ?? "liadCPOb3oYdEMSe28hC";
const whatsappConversionLabel =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_WHATSAPP_CONVERSION_LABEL ?? "z-PkCPCb3oYdEMSe28hC";

export function getGtag(): (...args: unknown[]) => void {
  if (typeof window === "undefined") return () => {};
  if (typeof window.gtag === "function") return window.gtag;

  window.dataLayer = window.dataLayer || [];
  const fn = function () {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer?.push(arguments);
  };
  window.gtag = fn;
  return fn;
}

function sendEvent(name: string, parameters: AnalyticsParameters = {}, callback?: () => void): boolean {
  if (typeof window === "undefined") return false;
  const page = measurementPageLocation(window.location.href);
  if (!page) return false;
  if (name === "conversion") {
    if (!/^AW-\d+\/[A-Za-z0-9_-]+$/.test(String(parameters.send_to ?? ""))) return false;
  } else if (!/^G-[A-Z0-9]+$/.test(analyticsId)) return false;
  const gtag = getGtag();
  gtag("event", name, {
    ...parameters,
    page_location: page,
    ...(name === "conversion" ? {} : { send_to: analyticsId }),
    ...(callback ? { event_callback: callback, event_timeout: 2000 } : {}),
  });
  return true;
}

/**
 * Sends only operational, non-identifying interaction data. Customer names,
 * phone numbers, dates, notes, and reservation IDs must never be passed here.
 */
export function trackEvent(name: string, parameters: AnalyticsParameters = {}) {
  if (!["contact_click", "review_source_click", "booking_whatsapp_handoff", "menu_click", "menu_compare_click", "menu_category_select", "menu_item_view", "booking_start"].includes(name)) return;
  parameters = safeInteractionParameters(parameters);
  sendEvent(name, parameters);

  // Send Google Ads conversion and interaction events for high-intent customer actions
  if (name === "contact_click") {
    const method = String(parameters.contact_method || "").toLowerCase();
    const surface = String(parameters.surface || "website");

    // Standard contact event
    sendEvent("contact", {
      method,
      surface,
      transport_type: "beacon",
    });

    if ((method === "phone" || method === "call") && phoneConversionLabel !== bookingConversionLabel) {
      sendEvent("conversion", {
        send_to: `${googleAdsConversionId}/${phoneConversionLabel}`,
        event_category: "phone_call",
        event_label: surface,
        value: 1.0,
        currency: "TRY",
        transport_type: "beacon",
      });
    } else if ((method === "directions" || method === "maps") && directionsConversionLabel !== bookingConversionLabel) {
      sendEvent("conversion", {
        send_to: `${googleAdsConversionId}/${directionsConversionLabel}`,
        event_category: "directions",
        event_label: surface,
        value: 1.0,
        currency: "TRY",
        transport_type: "beacon",
      });
    } else if (method === "whatsapp" && whatsappConversionLabel !== bookingConversionLabel) {
      sendEvent("conversion", {
        send_to: `${googleAdsConversionId}/${whatsappConversionLabel}`,
        event_category: "whatsapp",
        event_label: surface,
        value: 1.0,
        currency: "TRY",
        transport_type: "beacon",
      });
    }
  }
}

export async function trackBookingLead(parameters: AnalyticsParameters = {}) {
  const reservationId = String(parameters.reservation_id ?? "");
  if (!isBookingId(reservationId)) return;
  const eventParameters = safeInteractionParameters(parameters);
  // Fire standard GA4 lead generation event
  sendEvent("generate_lead", {
    transport_type: "beacon",
    ...eventParameters,
  });

  // Fire primary Google Ads conversion event with exact conversion label
  if (bookingConversionLabel) {
    const transactionId = await bookingTransactionId(reservationId);
    // Allow the tag to process the event before a same-tab WhatsApp handoff.
    // This callback is not a receipt from Google. Blocked tags must not trap users.
    await new Promise<void>((resolve) => {
      const timer = setTimeout(resolve, 2000);
      const finish = () => { clearTimeout(timer); resolve(); };
      const queued = sendEvent("conversion", {
        send_to: `${googleAdsConversionId}/${bookingConversionLabel}`,
        value: 1.0,
        currency: "TRY",
        transaction_id: transactionId,
        transport_type: "beacon",
      }, finish);
      if (!queued) finish();
    });
  }
}

/**
 * Client-side auto tracker for all tel:, Google Maps, and WhatsApp links across the entire site.
 */
export function AnalyticsAutoTracker() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = (event.target as HTMLElement | null)?.closest("a");
      if (!target) return;

      const href = target.getAttribute("href") || "";
      const surface = target.dataset.analyticsSurface;
      const locale = target.closest("[lang]")?.getAttribute("lang") || document.documentElement.lang || "tr";
      // Internal navigation is a funnel step, never a saved reservation lead.
      let destination: URL | undefined;
      try { destination = new URL(href, window.location.href); } catch { /* Invalid links are not measurable navigation. */ }
      if (destination?.origin === window.location.origin) {
        if (target.dataset.analyticsPurpose === "menu_compare") {
          trackEvent("menu_compare_click", { locale, surface: surface || "menu_comparison", item_id: target.dataset.analyticsItem });
        } else if (["/menu", "/en/menu"].includes(destination.pathname)) {
          trackEvent("menu_click", { locale, surface: surface || "site_navigation" });
        } else if (["/rezervasyon", "/en/rezervasyon"].includes(destination.pathname)) {
          trackEvent("booking_start", { locale, surface: surface || "site_navigation" });
        }
      }
      if (target.dataset.analyticsPurpose === "review_source") {
        // Reading reviews is a trust interaction, not a directions conversion.
        trackEvent("review_source_click", { surface: surface || "review_link" });
      } else if (href.startsWith("tel:")) {
        trackEvent("contact_click", { contact_method: "phone", surface: surface || "tel_link" });
      } else if (href.includes("google.com/maps") || href.includes("maps.google.com") || href.includes("goo.gl/maps")) {
        trackEvent("contact_click", { contact_method: "directions", surface: surface || "map_link" });
      } else if (href.includes("wa.me") || href.includes("whatsapp.com")) {
        trackEvent("contact_click", { contact_method: "whatsapp", surface: surface || "whatsapp_link" });
      }
    };

    document.addEventListener("click", handleClick, { passive: true });
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
