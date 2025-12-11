import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { load } from '@2gis/mapgl';
import { Map } from '@2gis/mapgl/types';

import { setMapCenter } from '@shared/store';

import { Styled } from './Map.styled';

export interface AppMapProps {
  center?: [number, number];
  zoom?: number;
}

export const AppMap = ({ center = [37.620001, 55.754167], zoom = 14 }) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch();
  useEffect(() => {
    let map: Map | null = null;
    let isMounted = true;

    load()
      .then((mapglAPI) => {
        if (!isMounted || !mapRef.current) return;

        map = new mapglAPI.Map(mapRef.current, {
          center,
          zoom,
          key: '5b4bb0de-e668-4d76-b383-e5134c3a4ac7',
          zoomControl: false,
          pitch: 0,
          rotation: 0,
        });

        const initialCenter = map.getCenter();
        dispatch(
          setMapCenter({
            latitude: initialCenter[1],
            longitude: initialCenter[0],
          }),
        );

        map.on('moveend', () => {
          const currentCenter = map?.getCenter();
          if (currentCenter) {
            dispatch(
              setMapCenter({
                latitude: currentCenter[1],
                longitude: currentCenter[0],
              }),
            );
          }
        });
      })

      .catch((err) => {
        console.error('Ошибка загрузки карты:', err);
      });

    return () => {
      isMounted = false;
      if (map) map.destroy();
      mapRef.current = null;
    };
  }, [center, zoom, dispatch]);

  return <Styled.MapContainer ref={mapRef} />;
};
