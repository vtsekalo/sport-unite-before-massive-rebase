import { useCallback, useEffect, useRef } from 'react';

import { load } from '@2gis/mapgl';
import { Map, Marker } from '@2gis/mapgl/types';

import { DEFAULT_MAP_CENTER, DEFAULT_MAP_ZOOM } from '@shared/config/map';

import { MapContainer } from './Map.styled';
import type { IBaseMapProps, IMapMarker } from './types';

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
}: IBaseMapProps) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<Map | null>(null);
  const markersRef = useRef<Marker[]>([]);

  const createMarkers = useCallback(async (markersData: IMapMarker[]) => {
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

        if (markers.length > 0) {
          createMarkers(markers);
        }

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
  }, [
    apiKey,
    showZoomControl,
    center,
    zoom,
    onZoomChange,
    onCenterChange,
    onMoveStart,
    onMapReady,
    createMarkers,
    markers,
  ]);

  useEffect(() => {
    mapInstanceRef.current?.setCenter(center);
  }, [center]);

  useEffect(() => {
    mapInstanceRef.current?.setZoom(zoom);
  }, [zoom]);

  useEffect(() => {
    if (markers.length > 0) {
      createMarkers(markers);
    }
  }, [markers, createMarkers]);

  return <MapContainer ref={mapRef} />;
};
