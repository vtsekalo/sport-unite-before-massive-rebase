// useEventFilters.ts
import { useCallback, useEffect, useRef, useState } from 'react';

import { useGetFilteredEventsQuery } from '@shared/api/eventApi';
import {
  EventScope,
  EventSearchRequest,
  EventStatus,
  useCurrentMapCoords,
} from '@shared/lib';

import { CoordinateFilterDto, IEvent } from '../types/event';

const CoordinateDefault: CoordinateFilterDto = {
  latitude: 55.754167,
  longitude: 37.620001,
  range: 5000,
};

const FILTER_DEFAULTS: EventSearchRequest = {
  eventStatuses: [EventStatus.PLANNED, EventStatus.IN_PROCESS],
  scope: EventScope.ALL,
  coordinateFilterDto: CoordinateDefault,
  eventTypes: undefined,
  eventStartDateTime: undefined,
};

export const useEventSearch = () => {
  const { coords } = useCurrentMapCoords();

  const prevCoordsRef = useRef(coords);

  const [eventsState, setEventsState] = useState<IEvent[]>([]);

  const [filters, setFilters] = useState<EventSearchRequest>(() => ({
    ...FILTER_DEFAULTS,
    coordinateFilterDto: {
      ...FILTER_DEFAULTS.coordinateFilterDto,
      latitude: coords.latitude,
      longitude: coords.longitude,
    },
  }));

  const { data, isLoading, error, refetch } =
    useGetFilteredEventsQuery(filters);

  useEffect(() => {
    if (data?.events && data.events.length > 0) {
      setEventsState(data.events);
    }
  }, [data?.events]);

  useEffect(() => {
    const coordsChanged =
      prevCoordsRef.current.latitude !== coords.latitude ||
      prevCoordsRef.current.longitude !== coords.longitude;

    if (coordsChanged) {
      setFilters((prev) => ({
        ...prev,
        coordinateFilterDto: {
          ...prev.coordinateFilterDto,
          latitude: coords.latitude,
          longitude: coords.longitude,
        },
      }));
      prevCoordsRef.current = coords;
    }
  }, [coords]);

  const updateFiltersWithCurrentCoords = useCallback(
    (filtersToUpdate: EventSearchRequest): EventSearchRequest => {
      return {
        ...filtersToUpdate,
        coordinateFilterDto: {
          ...filtersToUpdate.coordinateFilterDto,
          latitude: coords.latitude,
          longitude: coords.longitude,
        },
      };
    },
    [coords],
  );

  const applyCurrentFilters = useCallback(() => {
    return refetch();
  }, [refetch]);

  const updateAndApplyFilters = useCallback(
    (
      updater:
        | EventSearchRequest
        | ((prev: EventSearchRequest) => EventSearchRequest),
    ) => {
      setFilters((prev) => {
        const newFilters =
          typeof updater === 'function' ? updater(prev) : updater;

        return updateFiltersWithCurrentCoords(newFilters);
      });
    },
    [updateFiltersWithCurrentCoords],
  );

  const updateFilters = useCallback(
    (
      updater:
        | EventSearchRequest
        | ((prev: EventSearchRequest) => EventSearchRequest),
    ) => {
      setFilters((prev) => {
        const newFilters =
          typeof updater === 'function' ? updater(prev) : updater;

        return updateFiltersWithCurrentCoords(newFilters);
      });
    },
    [updateFiltersWithCurrentCoords],
  );

  const applyFilters = useCallback(
    (newFilters: EventSearchRequest) => {
      setFilters(updateFiltersWithCurrentCoords(newFilters));
    },
    [updateFiltersWithCurrentCoords],
  );

  const resetFilters = useCallback(() => {
    setFilters(updateFiltersWithCurrentCoords(FILTER_DEFAULTS));
  }, [updateFiltersWithCurrentCoords]);

  return {
    filters,
    setFilters: updateFilters,
    updateAndApplyFilters,
    applyCurrentFilters,
    applyFilters,
    resetFilters,
    events: eventsState,
    isLoading,
    error,
    refetch,
  };
};
