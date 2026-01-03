import { useCallback, useEffect, useRef } from 'react';

import { load } from '@2gis/mapgl';
import { Map, Marker } from '@2gis/mapgl/types';

import { DEFAULT_MAP_CENTER, DEFAULT_MAP_ZOOM } from '@shared/config/map';
import { CoordinatesTuple, MapMarker } from '@shared/lib';

import { MapContainer } from './Map.styled';

interface BaseMapProps {
  center?: CoordinatesTuple;
  zoom?: number;
  apiKey: string;
  markers?: MapMarker[];
  showZoomControl?: boolean;
  onZoomChange?: (zoom: number) => void;
  onCenterChange?: (center: CoordinatesTuple) => void;
  onMoveStart?: () => void;
  onMapReady?: (mapInstance: Map) => void;
}

export const BaseMap = ({
  center = DEFAULT_MAP_CENTER,
  zoom = DEFAULT_MAP_ZOOM,
  apiKey,
  markers = [],
  showZoomControl = false,
  onZoomChange,
  onCenterChange,
  onMoveStart,
  onMapReady,
}: BaseMapProps) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<Map | null>(null);
  const markersRef = useRef<Marker[]>([]);

  const createMarkers = useCallback(async (markersData: MapMarker[]) => {
    if (!mapInstanceRef.current) return;

    markersRef.current.forEach((marker) => marker.destroy());
    markersRef.current = [];

    const mapglAPI = await load();

    markersRef.current = markersData.map((markerData) => {
      const marker = new mapglAPI.Marker(mapInstanceRef.current!, {
        coordinates: markerData.coordinates,
        icon: markerData.icon,
      });

      if (markerData.onClick) {
        marker.on('click', markerData.onClick);
      }

      return marker;
    });
  }, []);

  useEffect(() => {
    let isMounted = true;

    const initMap = async () => {
      try {
        const mapglAPI = await load();
        if (!isMounted || !mapRef.current) return;

        const mapInstance = new mapglAPI.Map(mapRef.current, {
          center,
          zoom,
          key: apiKey,
          zoomControl: showZoomControl,
        });
        mapInstanceRef.current = mapInstance;

        onMapReady?.(mapInstance);

        createMarkers(markers);

        if (onZoomChange) {
          mapInstance.on('zoomend', () => onZoomChange(mapInstance.getZoom()));
        }

        if (onCenterChange) {
          mapInstance.on('moveend', () => {
            const newCenter = mapInstance.getCenter();
            onCenterChange([newCenter[0], newCenter[1]]);
          });
        }

        if (onMoveStart) {
          mapInstance.on('movestart', onMoveStart);
        }
      } catch {
        // Ошибка инициализации карты проигнорирована
      }
    };

    initMap();

    return () => {
      isMounted = false;

      markersRef.current.forEach((m) => m.destroy());
      markersRef.current = [];
      mapInstanceRef.current?.destroy();
      mapInstanceRef.current = null;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    createMarkers(markers);
  }, [markers, createMarkers]);

  return <MapContainer ref={mapRef} />;
};
