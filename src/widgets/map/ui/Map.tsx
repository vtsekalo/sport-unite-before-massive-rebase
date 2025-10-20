import { useEffect, useRef } from 'react';

import { load } from '@2gis/mapgl';
import { Map } from '@2gis/mapgl/types';

import { MapContainer } from './Map.styled';

export interface AppMapProps {
  center?: [number, number];
  zoom?: number;
}

export const AppMap = ({
  center = [37.620001, 55.754167],
  zoom = 14,
}: AppMapProps) => {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let map: Map | null = null;
    let isMounted = true;

    load()
      .then((mapglAPI) => {
        if (!isMounted || !mapRef.current) return;

        map = new mapglAPI.Map(mapRef.current, {
          center,
          zoom: 13,
          key: '5b4bb0de-e668-4d76-b383-e5134c3a4ac7',
          zoomControl: false,
          pitch: 0,
          rotation: 0,
        });
      })
      .catch((err) => {
        console.error('Ошибка загрузки карты:', err);
      });

    return () => {
      isMounted = false;
      if (map) map.destroy();
    };
  }, [center, zoom]);

  return <MapContainer ref={mapRef} />;
};
