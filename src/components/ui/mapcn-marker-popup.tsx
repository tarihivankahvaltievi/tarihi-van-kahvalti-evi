"use client";

import maplibregl, {
  type Map as MapLibreMap,
  type MapOptions,
  type PopupOptions,
} from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { LocateFixed, Minus, Plus } from "lucide-react";
import {
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";

type MapContextValue = {
  map: MapLibreMap | null;
  loaded: boolean;
};

const MapContext = createContext<MapContextValue | null>(null);

function useMap() {
  const context = useContext(MapContext);
  if (!context) throw new Error("Map bileşenleri Map içinde kullanılmalıdır.");
  return context;
}

type MapProps = {
  children?: ReactNode;
  className?: string;
  center: [number, number];
  zoom?: number;
  pitch?: number;
  bearing?: number;
  ariaLabel?: string;
  styleUrl?: MapOptions["style"];
};

export type MapRef = MapLibreMap;

export const Map = forwardRef<MapRef, MapProps>(function Map(
  {
    children,
    className,
    center,
    zoom = 15.2,
    pitch = 0,
    bearing = 0,
    ariaLabel = "Etkileşimli harita",
    styleUrl = "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
  },
  forwardedRef,
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<MapLibreMap | null>(null);
  const [loaded, setLoaded] = useState(false);

  useImperativeHandle(forwardedRef, () => map as MapLibreMap, [map]);

  useEffect(() => {
    if (!containerRef.current) return;

    const instance = new maplibregl.Map({
      container: containerRef.current,
      style: styleUrl,
      center,
      zoom,
      pitch,
      bearing,
      maxZoom: 18,
      minZoom: 11,
      renderWorldCopies: false,
      attributionControl: { compact: true },
    });

    const handleLoad = () => setLoaded(true);
    instance.on("load", handleLoad);
    setMap(instance);

    const resizeObserver = new ResizeObserver(() => instance.resize());
    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
      instance.off("load", handleLoad);
      instance.remove();
      setMap(null);
      setLoaded(false);
    };
  }, [bearing, center, pitch, styleUrl, zoom]);

  return (
    <MapContext.Provider value={{ map, loaded }}>
      <div ref={containerRef} className={className} role="region" aria-label={ariaLabel} />
      {map ? children : null}
    </MapContext.Provider>
  );
});

type MarkerContextValue = {
  element: HTMLDivElement | null;
  longitude: number;
  latitude: number;
};

const MarkerContext = createContext<MarkerContextValue | null>(null);

function useMarker() {
  const context = useContext(MarkerContext);
  if (!context) throw new Error("Marker bileşenleri MapMarker içinde kullanılmalıdır.");
  return context;
}

export function MapMarker({
  longitude,
  latitude,
  ariaLabel = "Harita işaretçisi",
  children,
}: {
  longitude: number;
  latitude: number;
  ariaLabel?: string;
  children: ReactNode;
}) {
  const { map } = useMap();
  const [element] = useState(() => {
    if (typeof document === "undefined") return null;
    const markerElement = document.createElement("div");
    markerElement.className = "mapcn-marker-root";
    markerElement.setAttribute("aria-label", ariaLabel);
    return markerElement;
  });

  useEffect(() => {
    if (!map || !element) return;
    const instance = new maplibregl.Marker({ element, anchor: "bottom" })
      .setLngLat([longitude, latitude])
      .addTo(map);
    return () => {
      instance.remove();
    };
  }, [element, latitude, longitude, map]);

  return (
    <MarkerContext.Provider value={{ element, longitude, latitude }}>
      {element ? children : null}
    </MarkerContext.Provider>
  );
}

export function MarkerContent({ children }: { children: ReactNode }) {
  const { element } = useMarker();
  return element ? createPortal(children, element) : null;
}

export function MarkerLabel({ children }: { children: ReactNode }) {
  return <span className="mapcn-marker-label">{children}</span>;
}

export function MarkerPopup({
  children,
  className,
  defaultOpen = false,
  offset = 34,
}: {
  children: ReactNode;
  className?: string;
  defaultOpen?: boolean;
  offset?: PopupOptions["offset"];
}) {
  const { map, loaded } = useMap();
  const { element, longitude, latitude } = useMarker();
  const [portalElement] = useState(() => {
    if (typeof document === "undefined") return null;
    const popupElement = document.createElement("div");
    popupElement.className = className ?? "";
    return popupElement;
  });

  useEffect(() => {
    if (!map || !element || !portalElement) return;
    const popup = new maplibregl.Popup({
      closeButton: false,
      closeOnClick: true,
      focusAfterOpen: false,
      offset,
      anchor: "bottom",
      maxWidth: "300px",
      className: "mapcn-popup",
    })
      .setLngLat([longitude, latitude])
      .setDOMContent(portalElement);

    const togglePopup = () => {
      if (popup.isOpen()) popup.remove();
      else popup.addTo(map);
    };
    element.addEventListener("click", togglePopup);

    if (defaultOpen && loaded) {
      const timer = window.setTimeout(() => {
        if (!popup.isOpen()) popup.addTo(map);
      }, 520);
      return () => {
        window.clearTimeout(timer);
        element.removeEventListener("click", togglePopup);
        popup.remove();
      };
    }

    return () => {
      element.removeEventListener("click", togglePopup);
      popup.remove();
    };
  }, [defaultOpen, element, latitude, loaded, longitude, map, offset, portalElement]);

  return portalElement ? createPortal(children, portalElement) : null;
}

export function MapControls({
  center,
  zoom = 15.2,
}: {
  center: [number, number];
  zoom?: number;
}) {
  const { map } = useMap();

  return (
    <div className="mapcn-controls" aria-label="Harita kontrolleri">
      <button type="button" onClick={() => map?.zoomIn()} aria-label="Yakınlaştır">
        <Plus size={17} aria-hidden="true" />
      </button>
      <button type="button" onClick={() => map?.zoomOut()} aria-label="Uzaklaştır">
        <Minus size={17} aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={() => map?.easeTo({ center, zoom, duration: 900 })}
        aria-label="İşletme konumuna dön"
      >
        <LocateFixed size={17} aria-hidden="true" />
      </button>
    </div>
  );
}

export { useMap };
