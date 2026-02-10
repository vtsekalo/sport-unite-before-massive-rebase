import { FC, useCallback, useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import * as mapglAPI from '@2gis/mapgl/types';
import { Box } from '@mui/material';

import { MAP_API_KEY } from '@shared/config';
import {
  MapMarker,
  ROUTES,
  useAppDispatch,
  useAppSelector,
  useEventSearch,
} from '@shared/lib';
import { useDebounce } from '@shared/lib';
import {
  selectMapCenter,
  selectMapZoom,
  selectUseCustomRange,
  setFilterCoordinates,
  setFilterRange,
  setMapView,
} from '@shared/store';
import { BaseMap } from '@shared/ui';
import { Marker } from '@shared/ui/marker';

import { getBoundsRadius } from '../lib/map-utils';

interface EventsMapProps {
  onMapReady?: (map: mapglAPI.Map) => void;
}

export const EventsMap: FC<EventsMapProps> = ({ onMapReady }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const coordinatesCenter = useAppSelector(selectMapCenter);
  const zoom = useAppSelector(selectMapZoom);

  const useCustomRange = useAppSelector(selectUseCustomRange);

  const mapInstanceRef = useRef<mapglAPI.Map | null>(null);
  const useCustomRangeRef = useRef(useCustomRange);

  const lastDispatchedCoordsRef = useRef<{ lat: number; lng: number } | null>(
    null,
  );

  useEffect(() => {
    useCustomRangeRef.current = useCustomRange;
  }, [useCustomRange]);

  const center = useMemo<[number, number]>(
    () => [coordinatesCenter.longitude, coordinatesCenter.latitude],
    [coordinatesCenter],
  );

  const debouncedCenter = useDebounce(center, 500);

  const { events } = useEventSearch();

  useEffect(() => {
    const [lng, lat] = debouncedCenter;

    if (
      lastDispatchedCoordsRef.current &&
      lastDispatchedCoordsRef.current.lat === lat &&
      lastDispatchedCoordsRef.current.lng === lng
    ) {
      return;
    }

    lastDispatchedCoordsRef.current = { lat, lng };

    dispatch(
      setFilterCoordinates({
        latitude: lat,
        longitude: lng,
      }),
    );
  }, [debouncedCenter, dispatch]);

  const handleMarkerClick = useCallback(
    (eventId: string) => {
      navigate(ROUTES.EVENT.DETAIL(eventId));
    },
    [navigate],
  );

  const markers = useMemo<MapMarker[]>(() => {
    return events.map((event) => ({
      id: event.eventId,
      coordinates: [event.coordinates.longitude, event.coordinates.latitude],
      icon: <Marker type={event.eventType} />,
      onClick: () => handleMarkerClick(event.eventId),
      zIndex: Math.round((90 - event.coordinates.latitude) * 100),
    }));
  }, [events, handleMarkerClick]);

  const handleCameraChange = useCallback(
    (centerTuple: [number, number], zoom: number) => {
      dispatch(
        setMapView({
          center: {
            latitude: centerTuple[1],
            longitude: centerTuple[0],
          },
          zoom,
        }),
      );
      lastDispatchedCoordsRef.current = {
        lat: centerTuple[1],
        lng: centerTuple[0],
      };

      dispatch(
        setFilterCoordinates({
          latitude: centerTuple[1],
          longitude: centerTuple[0],
        }),
      );
    },

    [dispatch],
  );

  const handleMapReady = useCallback(
    (map: mapglAPI.Map) => {
      mapInstanceRef.current = map;

      const updateRangeFromBounds = () => {
        if (useCustomRangeRef.current) return;

        const bounds = map.getBounds();
        const center = map.getCenter();

        const radius = getBoundsRadius(bounds, center);

        dispatch(setFilterRange({ range: radius, fromUser: false }));
      };

      updateRangeFromBounds();
      map.on('moveend', updateRangeFromBounds);
      map.on('zoomend', updateRangeFromBounds);
      map.on('resize', updateRangeFromBounds);

      onMapReady?.(map);
    },
    [dispatch, onMapReady],
  );

  return (
    <Box
      zIndex={1}
      width='100%'
      height='100%'
      position='absolute'
      top={0}
      left={0}
      right={0}
      bottom={0}
    >
      <BaseMap
        markers={markers}
        center={center}
        zoom={zoom}
        apiKey={MAP_API_KEY}
        onCameraChange={handleCameraChange}
        onMapReady={handleMapReady}
      />
    </Box>
  );
};
