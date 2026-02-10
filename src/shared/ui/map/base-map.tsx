import { memo, useEffect, useRef, useState } from 'react';

import { load } from '@2gis/mapgl';
import * as mapgl from '@2gis/mapgl/types';

import { CoordinatesTuple, MapMarker } from '@shared/lib';

import { Styled } from './base-map.styled';
import { MarkerPortal } from './marker-portal';

interface BaseMapProps {
  center: CoordinatesTuple;
  zoom: number;
  apiKey: string;
  markers?: MapMarker[];
  onCameraChange?: (center: CoordinatesTuple, zoom: number) => void;
  onMapReady?: (map: mapgl.Map) => void;
}

export const BaseMap = memo(
  ({
    center,
    zoom,
    apiKey,
    markers = [],
    onCameraChange,
    onMapReady,
  }: BaseMapProps) => {
    const mapRef = useRef<HTMLDivElement>(null);
    const [instance, setInstance] = useState<{
      map: mapgl.Map;
      api: typeof mapgl;
    } | null>(null);

    const onCameraChangeRef = useRef(onCameraChange);
    onCameraChangeRef.current = onCameraChange;

    const lastCenterRef = useRef<CoordinatesTuple>(center);
    const lastZoomRef = useRef<number>(zoom);

    useEffect(() => {
      let map: mapgl.Map | null = null;

      load().then((api) => {
        if (!mapRef.current) return;

        map = new api.Map(mapRef.current, {
          center,
          zoom,
          key: apiKey,
          zoomControl: false,
        });

        map.invalidateSize();

        lastCenterRef.current = center;
        lastZoomRef.current = zoom;

        const handleMove = () => {
          if (!map) return;

          const [lng, lat] = map.getCenter();
          const currentZoom = map.getZoom();

          lastCenterRef.current = [lng, lat];
          lastZoomRef.current = currentZoom;

          onCameraChangeRef.current?.([lng, lat], currentZoom);
        };

        map.on('moveend', handleMove);
        map.on('zoomend', handleMove);

        setInstance({ map, api });
        onMapReady?.(map);
      });

      return () => {
        map?.destroy();
        setInstance(null);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [apiKey]);

    useEffect(() => {
      if (!instance) return;

      const handleResize = () => {
        instance.map.invalidateSize();
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, [instance]);

    useEffect(() => {
      if (!instance) return;

      const [lng, lat] = center;
      const [lastLng, lastLat] = lastCenterRef.current;

      const changed = lng !== lastLng || lat !== lastLat;
      if (!changed) return;

      instance.map.setCenter(center, { animate: false });
      lastCenterRef.current = center;
    }, [center, instance]);

    useEffect(() => {
      if (!instance) return;

      if (zoom === lastZoomRef.current) return;

      instance.map.setZoom(zoom, { animate: false });
      lastZoomRef.current = zoom;
    }, [zoom, instance]);

    return (
      <>
        <Styled.MapContainer ref={mapRef} />
        {instance &&
          markers.map((m) => (
            <MarkerPortal
              key={m.id}
              map={instance.map}
              api={instance.api}
              data={m}
            />
          ))}
      </>
    );
  },
);
