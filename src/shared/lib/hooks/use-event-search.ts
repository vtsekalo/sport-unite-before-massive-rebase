import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useGetFilteredEventsQuery } from '@shared/api/event-api';
import {
  applyFilters as applyFiltersAction,
  resetFilters as resetFiltersAction,
  selectEventSearchRequest,
  setEventScope,
  setEventStartDateTime,
  setEventStatuses,
  setEventTypes,
  setFilterCoordinates,
} from '@shared/store';

import { EventScope, EventStatus } from '../types/enums';
import { EventSearchRequest, IEvent } from '../types/event';
import { useCurrentMapCoords } from './use-current-map-coords';

export const useEventSearch = () => {
  const dispatch = useDispatch();
  const { coords } = useCurrentMapCoords();
  const prevCoordsRef = useRef(coords);
  const filters = useSelector(selectEventSearchRequest);

  const { data, isLoading, error, refetch } =
    useGetFilteredEventsQuery(filters);

  const filteredData = useMemo(() => {
    if (!data) {
      return data;
    }

    if (!filters.eventStartDate) {
      return data;
    }

    try {
      const filterDateOnly = filters.eventStartDate.split('T')[0];

      const filtered = data.filter((event) => {
        const eventWithDate = event as IEvent & { eventStartDate?: string };
        const eventDateField =
          eventWithDate.eventStartDate || event.eventStartDate;

        if (!eventDateField) {
          return false;
        }

        try {
          const eventDateOnly = eventDateField.split('T')[0];
          const passes = eventDateOnly >= filterDateOnly;
          return passes;
        } catch {
          return false;
        }
      });

      return filtered;
    } catch {
      return data;
    }
  }, [data, filters.eventStartDate]);

  useEffect(() => {
    const coordsChanged =
      prevCoordsRef.current.latitude !== coords.latitude ||
      prevCoordsRef.current.longitude !== coords.longitude;

    if (coordsChanged) {
      dispatch(
        setFilterCoordinates({
          latitude: coords.latitude,
          longitude: coords.longitude,
        }),
      );
      prevCoordsRef.current = coords;
    }
  }, [coords, dispatch]);

  const applyCurrentFilters = useCallback(() => {
    return refetch();
  }, [refetch]);

  const updateAndApplyFilters = useCallback(
    (
      updater:
        | Partial<EventSearchRequest>
        | ((prev: EventSearchRequest) => Partial<EventSearchRequest>),
    ) => {
      const updates =
        typeof updater === 'function' ? updater(filters) : updater;
      dispatch(applyFiltersAction(updates));
    },
    [dispatch, filters],
  );

  const updateFilters = useCallback(
    (
      updater:
        | Partial<EventSearchRequest>
        | ((prev: EventSearchRequest) => Partial<EventSearchRequest>),
    ) => {
      const updates =
        typeof updater === 'function' ? updater(filters) : updater;
      dispatch(applyFiltersAction(updates));
    },
    [dispatch, filters],
  );

  const applyFilters = useCallback(
    (newFilters: Partial<EventSearchRequest>) => {
      dispatch(applyFiltersAction(newFilters));
    },
    [dispatch],
  );

  const resetFilters = useCallback(() => {
    dispatch(resetFiltersAction());
  }, [dispatch]);

  const setTypes = useCallback(
    (types: string[] | undefined) => {
      dispatch(setEventTypes(types));
    },
    [dispatch],
  );

  const setStatuses = useCallback(
    (statuses: EventStatus[]) => {
      dispatch(setEventStatuses(statuses));
    },
    [dispatch],
  );

  const setStartDateTime = useCallback(
    (dateTime: string | undefined) => {
      dispatch(setEventStartDateTime(dateTime));
    },
    [dispatch],
  );

  const setScope = useCallback(
    (scope: EventScope) => {
      dispatch(setEventScope(scope));
    },
    [dispatch],
  );

  return {
    filters,

    setFilters: updateFilters,
    updateAndApplyFilters,
    applyCurrentFilters,
    applyFilters,
    resetFilters,

    setTypes,
    setStatuses,
    setStartDateTime,
    setScope,

    events: filteredData || [],
    isLoading,
    error,
    refetch,
  };
};
