"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { analyticsId, adsId, measurementPageLocation, safeReferrer } from "../analytics-policy";
import { getGtag } from "../analytics";

export function GoogleTags() {
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const previous = useRef<string | null>(null);
  useEffect(() => {
    const page = measurementPageLocation(window.location.href);
    window[`ga-disable-${analyticsId}`] = !page;
    if (!page) return;
    const gtag = getGtag();
    if (!window.vanTagsInitialized) {
      window.vanTagsInitialized = true;
      gtag("js", new Date());
      gtag("set", "allow_ad_personalization_signals", false);
      if (/^AW-\d+$/.test(adsId)) gtag("config", adsId, { page_location: page, page_referrer: safeReferrer(document.referrer) });
      if (/^G-[A-Z0-9]+$/.test(analyticsId)) {
        gtag("config", analyticsId, { allow_google_signals: false, allow_ad_personalization_signals: false, send_page_view: false, page_location: page, page_referrer: safeReferrer(document.referrer) });
      }
    }
    if (previous.current !== page && /^G-[A-Z0-9]+$/.test(analyticsId)) {
      gtag("event", "page_view", {
        send_to: analyticsId, page_location: page,
        page_referrer: previous.current ?? safeReferrer(document.referrer),
        page_title: document.title,
      });
    }
    previous.current = page;
    // Start the external loader only after the browser origin and public path
    // are checked. Server rendering must not load tags on private routes.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReady(true);
  }, [pathname]);

  const loaderId = /^AW-\d+$/.test(adsId) ? adsId : /^G-[A-Z0-9]+$/.test(analyticsId) ? analyticsId : "";
  return ready && loaderId ? <Script src={`https://www.googletagmanager.com/gtag/js?id=${loaderId}`} strategy="afterInteractive" /> : null;
}
