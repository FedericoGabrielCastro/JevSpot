"use client";

import {
  LngLatBounds,
  Map,
  Marker,
  NavigationControl,
  Popup,
} from "maplibre-gl";
import { useEffect, useRef } from "react";
import "maplibre-gl/dist/maplibre-gl.css";
import type { PlaceRecord } from "@/logic/types/places";

const BUENOS_AIRES_CENTER: [number, number] = [-58.3816, -34.6037];
const MAP_STYLE = "https://tiles.openfreemap.org/styles/liberty";

type LocationMapProps = {
  places: PlaceRecord[];
};

export function LocationMap({ places }: LocationMapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<Map | null>(null);
  const markersRef = useRef<Marker[]>([]);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) {
      return;
    }

    const map = new Map({
      container: containerRef.current,
      style: MAP_STYLE,
      center: BUENOS_AIRES_CENTER,
      zoom: 10,
    });
    map.addControl(new NavigationControl(), "top-right");
    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) {
      return;
    }

    for (const marker of markersRef.current) {
      marker.remove();
    }
    markersRef.current = [];

    for (const place of places) {
      const marker = new Marker()
        .setLngLat([place.longitude, place.latitude])
        .setPopup(new Popup({ offset: 16 }).setText(place.name))
        .addTo(map);
      markersRef.current.push(marker);
    }

    if (places.length === 0) {
      map.easeTo({ center: BUENOS_AIRES_CENTER, zoom: 10 });
      return;
    }

    const bounds = new LngLatBounds();
    for (const place of places) {
      bounds.extend([place.longitude, place.latitude]);
    }
    map.fitBounds(bounds, { padding: 48, maxZoom: 13 });
  }, [places]);

  return (
    <div
      ref={containerRef}
      className="h-full min-h-[24rem] w-full"
      aria-label="Map"
    />
  );
}
