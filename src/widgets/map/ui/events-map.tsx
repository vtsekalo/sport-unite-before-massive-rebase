import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useGetFilteredEventsQuery } from '@shared/api';
import {
  DEFAULT_MAP_CENTER,
  DEFAULT_MAP_ZOOM,
  MAP_API_KEY,
  zoomToRadius,
} from '@shared/config';
import {
  CoordinatesTuple,
  EventStatus,
  IEvent,
  IEventWithCoordinates,
  MapMarker,
  ROUTES,
  showSnackbar,
} from '@shared/lib';
import { useDebounce } from '@shared/lib';
import {
  selectEventSearchRequest,
  selectUseCustomRange,
  setFilterCoordinates,
  setFilterRange,
} from '@shared/store';
import { BaseMap } from '@shared/ui';

import { getMarkerIcon } from '../lib';
import { MapWrapper } from './events-map.styled';

const MAP_CENTER_STORAGE_KEY = 'mapCenter';
const MAP_ZOOM_STORAGE_KEY = 'mapZoom';

interface MapProps {
  center?: CoordinatesTuple;
  zoom?: number;
}

export const EventsMap = ({
  center = DEFAULT_MAP_CENTER,
  zoom = DEFAULT_MAP_ZOOM,
}: MapProps) => {
  const dispatch = useDispatch();
  const [mapCenter, setMapCenter] = useState<[number, number]>(() => {
    const saved = sessionStorage.getItem(MAP_CENTER_STORAGE_KEY);
    if (!saved) {
      return center;
    }

    try {
      const parsed = JSON.parse(saved);
      if (
        Array.isArray(parsed) &&
        parsed.length === 2 &&
        typeof parsed[0] === 'number' &&
        typeof parsed[1] === 'number'
      ) {
        return parsed as [number, number];
      }
    } catch {
      return center;
    }

    return center;
  });
  const [mapZoom, setMapZoom] = useState<number>(() => {
    const saved = sessionStorage.getItem(MAP_ZOOM_STORAGE_KEY);
    if (saved) {
      const parsed = parseFloat(saved);
      if (!isNaN(parsed)) {
        return parsed;
      }
    }
    return zoom;
  });

  const navigate = useNavigate();

  const handleMarkerClick = useCallback(
    (eventId: string) => {
      navigate(ROUTES.EVENT.DETAIL(eventId));
    },
    [navigate],
  );

  const debouncedCenter = useDebounce(mapCenter, 1000);
  const debouncedZoom = useDebounce(mapZoom, 1000);
  const radiusFromZoom = useMemo(
    () => zoomToRadius(debouncedZoom),
    [debouncedZoom],
  );
  const filters = useSelector(selectEventSearchRequest);
  const useCustomRange = useSelector(selectUseCustomRange);

  useEffect(() => {
    dispatch(
      setFilterCoordinates({
        latitude: debouncedCenter[1],
        longitude: debouncedCenter[0],
      }),
    );
  }, [debouncedCenter, dispatch]);

  useEffect(() => {
    if (!useCustomRange) {
      dispatch(setFilterRange({ range: radiusFromZoom, fromUser: false }));
    }
  }, [radiusFromZoom, useCustomRange, dispatch]);

  useEffect(() => {
    sessionStorage.setItem(MAP_CENTER_STORAGE_KEY, JSON.stringify(mapCenter));
  }, [mapCenter]);

  useEffect(() => {
    sessionStorage.setItem(MAP_ZOOM_STORAGE_KEY, mapZoom.toString());
  }, [mapZoom]);

  const { data: eventsData, isError } = useGetFilteredEventsQuery(filters, {
    refetchOnMountOrArgChange: true,
  });

  const events = useMemo<IEventWithCoordinates[]>(() => {
    if (isError) {
      showSnackbar('Ошибка фильтра событий!');
    }

    if (!eventsData || eventsData.length === 0) {
      return [];
    }

    let filteredEvents = eventsData || [];

    if (filters.eventStartDate) {
      const filterDateOnly = filters.eventStartDate.split('T')[0];

      filteredEvents = eventsData.filter((event: IEvent) => {
        const eventDateField = event.eventStartDate;

        if (!eventDateField) {
          return false;
        }

        const eventDateOnly = eventDateField.split('T')[0];
        const passes = eventDateOnly >= filterDateOnly;

        return passes;
      });
    }

    if (!Array.isArray(filteredEvents)) {
      return [];
    }

    return filteredEvents.map((event: IEvent) => ({
      eventId: event.eventId,
      eventName: event.eventName,
      eventType: event.eventType,
      eventLocation: event.eventLocation,
      eventStatus: EventStatus.PLANNED,
      eventStartDate: event.eventStartDate || '',
      eventEndDate: event.eventEndDate || event.eventStartDate || '',
      countUsers: event.countUsers ?? 0,
      eventDescription: event.eventDescription,
      eventPhoto: event.eventPhoto,
      coords: [event.coordinates.longitude, event.coordinates.latitude],
      users: [],
    }));
  }, [eventsData, filters.eventStartDate, isError]);

  const handleZoomChange = useCallback((newZoom: number) => {
    setMapZoom(newZoom);
  }, []);

  const handleCenterChange = useCallback((newCenter: [number, number]) => {
    setMapCenter(newCenter);
  }, []);

  const previousMarkerIdsRef = useRef<string>('');
  const previousMarkersRef = useRef<MapMarker[]>([]);

  const markers = useMemo<MapMarker[]>(() => {
    const newMarkers = events.map((event) => ({
      id: event.eventId,
      coordinates: event.coords,
      icon: getMarkerIcon(event.eventType),
      onClick: () => handleMarkerClick(event.eventId),
    }));

    const currentIds = newMarkers
      .map((m) => m.id)
      .sort()
      .join(',');

    if (
      currentIds === previousMarkerIdsRef.current &&
      previousMarkersRef.current.length > 0
    ) {
      return previousMarkersRef.current;
    }

    previousMarkerIdsRef.current = currentIds;
    previousMarkersRef.current = newMarkers;
    return newMarkers;
  }, [events, handleMarkerClick]);

  return (
    <MapWrapper data-testid='base-map'>
      <BaseMap
        markers={markers}
        center={mapCenter}
        zoom={mapZoom}
        apiKey={MAP_API_KEY}
        onZoomChange={handleZoomChange}
        onCenterChange={handleCenterChange}
      />
    </MapWrapper>
  );
};
