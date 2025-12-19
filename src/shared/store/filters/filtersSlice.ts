import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';

import { EventScope, EventSearchRequest, EventStatus } from '@shared/lib';

interface FiltersState {
  latitude: number;
  longitude: number;
  range: number;
  eventTypes?: string[];
  eventStatuses: EventStatus[];
  eventStartDateTime?: string;
  scope: EventScope;
  useCustomRange: boolean;
}

const initialState: FiltersState = {
  latitude: 55.754167,
  longitude: 37.620001,
  range: 5000,
  eventStatuses: [EventStatus.PLANNED, EventStatus.IN_PROCESS],
  scope: EventScope.ALL,
  eventTypes: undefined,
  eventStartDateTime: undefined,
  useCustomRange: false,
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setFilterCoordinates: (
      state,
      action: PayloadAction<{ latitude: number; longitude: number }>,
    ) => {
      state.latitude = action.payload.latitude;
      state.longitude = action.payload.longitude;
    },

    setFilterRange: (
      state,
      action: PayloadAction<{ range: number; fromUser?: boolean }>,
    ) => {
      state.range = action.payload.range;
      if (action.payload.fromUser) {
        state.useCustomRange = true;
      }
    },

    setEventTypes: (state, action: PayloadAction<string[] | undefined>) => {
      state.eventTypes = action.payload;
    },

    setEventStatuses: (state, action: PayloadAction<EventStatus[]>) => {
      state.eventStatuses = action.payload;
    },

    setEventStartDateTime: (
      state,
      action: PayloadAction<string | undefined>,
    ) => {
      state.eventStartDateTime = action.payload;
    },

    setEventScope: (state, action: PayloadAction<EventScope>) => {
      state.scope = action.payload;
    },

    applyFilters: (
      state,
      action: PayloadAction<Partial<Omit<FiltersState, 'useCustomRange'>>>,
    ) => {
      const {
        latitude,
        longitude,
        range,
        eventTypes,
        eventStatuses,
        eventStartDateTime,
        scope,
      } = action.payload;

      if (latitude !== undefined) state.latitude = latitude;
      if (longitude !== undefined) state.longitude = longitude;
      if (range !== undefined) {
        state.range = range;
        state.useCustomRange = true;
      }
      if (eventTypes !== undefined) state.eventTypes = eventTypes;
      if (eventStatuses !== undefined) state.eventStatuses = eventStatuses;
      if (eventStartDateTime !== undefined)
        state.eventStartDateTime = eventStartDateTime;
      if (scope !== undefined) state.scope = scope;
    },

    resetFilters: (state) => {
      state.eventTypes = initialState.eventTypes;
      state.eventStatuses = initialState.eventStatuses;
      state.eventStartDateTime = initialState.eventStartDateTime;
      state.scope = initialState.scope;
      state.range = initialState.range;
      state.useCustomRange = false;
    },

    resetCustomRange: (state) => {
      state.useCustomRange = false;
    },
  },
});

export const {
  setFilterCoordinates,
  setFilterRange,
  setEventTypes,
  setEventStatuses,
  setEventStartDateTime,
  setEventScope,
  applyFilters,
  resetFilters,
  resetCustomRange,
} = filtersSlice.actions;

export const selectFilters = (state: { filters: FiltersState }) =>
  state.filters;

export const selectFilterCoordinates = (state: { filters: FiltersState }) => ({
  latitude: state.filters.latitude,
  longitude: state.filters.longitude,
});

export const selectFilterRange = (state: { filters: FiltersState }) =>
  state.filters.range;

export const selectUseCustomRange = (state: { filters: FiltersState }) =>
  state.filters.useCustomRange;

export const selectEventSearchRequest = createSelector(
  [selectFilters],
  (filters): EventSearchRequest => ({
    eventTypes: filters.eventTypes,
    eventStatuses: filters.eventStatuses,
    eventStartDateTime: filters.eventStartDateTime,
    scope: filters.scope,
    coordinateFilterDto: {
      latitude: filters.latitude,
      longitude: filters.longitude,
      range: filters.range,
    },
  }),
);

export default filtersSlice.reducer;
