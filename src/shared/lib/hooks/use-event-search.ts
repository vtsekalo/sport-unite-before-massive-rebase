import { useCallback, useMemo } from 'react';
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
} from '@shared/store';

import { EventScope, EventStatus } from '../types/enums';
import { EventSearchRequest, IEvent } from '../types/event';

export const useEventSearch = () => {
  const dispatch = useDispatch();
  const filters = useSelector(selectEventSearchRequest);

  const { data, isLoading, error, refetch } =
    useGetFilteredEventsQuery(filters);

  const filteredData = useMemo(() => {
    if (!data || !filters.eventStartDate) return data;

    const filterDateOnly = filters.eventStartDate.split('T')[0];

    return data.filter((event: IEvent) => {
      if (!event.eventStartDate) return false;
      return event.eventStartDate.split('T')[0] >= filterDateOnly;
    });
  }, [data, filters.eventStartDate]);

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
