import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useGetFilteredEventsQuery } from '@shared/api/event-api';
import {
  applyFilters as applyFiltersAction,
  resetFilters as resetFiltersAction,
  selectEventSearchRequest,
  selectUseCustomRange,
  setEventScope,
  setEventStartDate,
  setEventStatuses,
  setEventTypes,
  setFilterRange,
} from '@shared/store';

import { EventScope, EventStatus } from '../types/enums';
import { EventSearchRequest } from '../types/event';

export const useEventSearch = () => {
  const dispatch = useDispatch();
  const filters = useSelector(selectEventSearchRequest);
  const useCustomRange = useSelector(selectUseCustomRange);

  const { data, isLoading, error, refetch } =
    useGetFilteredEventsQuery(filters);

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

  const setStartDate = useCallback(
    (dateTime: string | undefined) => {
      dispatch(setEventStartDate(dateTime));
    },
    [dispatch],
  );

  const setRange = useCallback(
    (range: number, fromUser: boolean = false) => {
      dispatch(setFilterRange({ range, fromUser }));
    },
    [dispatch],
  );

  const setScope = useCallback(
    (scope: EventScope) => {
      dispatch(setEventScope(scope));
    },
    [dispatch],
  );

  const hasAppliedSportFilter = Boolean(filters.eventTypes?.length);
  const hasAppliedDateFilter = Boolean(filters.eventStartDate);
  const hasAppliedRangeFilter = useCustomRange;
  const hasAppliedFilters =
    hasAppliedSportFilter || hasAppliedDateFilter || hasAppliedRangeFilter;

  return {
    filters,
    hasAppliedFilters,
    hasAppliedSportFilter,
    hasAppliedDateFilter,
    hasAppliedRangeFilter,

    applyFilters,
    resetFilters,
    setTypes,
    setStatuses,
    setStartDate,
    setScope,
    setRange,
    events: data || [],
    isLoading,
    error,
    refetch,
  };
};
