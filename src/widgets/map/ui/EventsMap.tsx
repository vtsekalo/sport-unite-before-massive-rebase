import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useGetFilteredEventsQuery } from '@shared/api';
import {
  DEFAULT_MAP_CENTER,
  DEFAULT_MAP_ZOOM,
  MAP_API_KEY,
  zoomToRadius,
} from '@shared/config';
import { EventStatus, IEvent, IEventWithCoordinates } from '@shared/lib';
import { useDebounce } from '@shared/lib/hooks';
import { mockEvents } from '@shared/mocks';
import {
  selectEventSearchRequest,
  selectUseCustomRange,
  setFilterCoordinates,
  setFilterRange,
} from '@shared/store';
import { BaseMap } from '@shared/ui/map';
import type { IMapMarker } from '@shared/ui/map';

import { getMarkerIcon } from '../lib';
import type { MapProps } from '../model/types';
import { MapWrapper } from './Map.styled';

export const EventsMap = ({
  center = DEFAULT_MAP_CENTER,
  zoom = DEFAULT_MAP_ZOOM,
}: MapProps) => {
  const dispatch = useDispatch();
  const [mapCenter, setMapCenter] = useState<[number, number]>(center);
  const [mapZoom, setMapZoom] = useState<number>(zoom);

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

  const useMocks = import.meta.env.VITE_USE_MOCKS === 'true';
  const { data: eventsData, isError } = useGetFilteredEventsQuery(filters, {
    skip: useMocks,
    refetchOnMountOrArgChange: true,
  });

  const events = useMemo<IEventWithCoordinates[]>(() => {
    if (useMocks) {
      return mockEvents;
    }

    if (isError || !eventsData) {
      return mockEvents;
    }

    if (eventsData.length === 0) {
      return [];
    }

    let filteredEvents = eventsData;

    if (filters.eventStartDateTime) {
      const filterDateOnly = filters.eventStartDateTime.split('T')[0];

      filteredEvents = eventsData.filter((event: IEvent) => {
        const eventWithDate = event as IEvent & { eventStartDate?: string };
        const eventDateField =
          eventWithDate.eventStartDate || event.eventStartDateTime;

        if (!eventDateField) {
          return false;
        }

        const eventDateOnly = eventDateField.split('T')[0];
        const passes = eventDateOnly >= filterDateOnly;

        return passes;
      });
    }

    return filteredEvents.map((event: IEvent) => ({
      eventId: event.eventId,
      eventName: event.eventName,
      eventType: event.eventType,
      eventStatus: EventStatus.PLANNED,
      eventStartDate: event.eventStartDateTime || '',
      eventEndDate: event.eventStartDateTime || '',
      countUsers: 0,
      eventDescription: event.eventDescription,
      eventPhoto: event.eventPhoto,
      coords: [event.coordinates.longitude, event.coordinates.latitude] as [
        number,
        number,
      ],
      users: [],
    }));
  }, [eventsData, isError, useMocks, filters.eventStartDateTime]);

  const handleZoomChange = useCallback((newZoom: number) => {
    setMapZoom(newZoom);
  }, []);

  const handleCenterChange = useCallback((newCenter: [number, number]) => {
    setMapCenter(newCenter);
  }, []);

  const previousMarkerIdsRef = useRef<string>('');
  const previousMarkersRef = useRef<IMapMarker[]>([]);

  const markers = useMemo<IMapMarker[]>(() => {
    const newMarkers = events.map((event) => ({
      id: event.eventId,
      coordinates: event.coords,
      icon: getMarkerIcon(event.eventType),
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
  }, [events]);

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