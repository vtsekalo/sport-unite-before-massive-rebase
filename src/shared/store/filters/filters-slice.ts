import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';

import { BASE_RADIUS, DEFAULT_MAP_CENTER } from '@shared/config';
import { EventScope, EventSearchRequest, EventStatus } from '@shared/lib';

interface FiltersState {
  latitude: number;
  longitude: number;
  range: number;
  calculateRange: number;
  eventTypes?: string[];
  eventStatuses: EventStatus[];
  eventStartDateTime?: string;
  scope: EventScope;
  useCustomRange: boolean;
}

const initialState: FiltersState = {
  latitude: DEFAULT_MAP_CENTER[1],
  longitude: DEFAULT_MAP_CENTER[0],
  range: BASE_RADIUS,
  calculateRange: BASE_RADIUS,
  eventTypes: undefined,
  eventStatuses: [EventStatus.PLANNED, EventStatus.IN_PROCESS],
  eventStartDateTime: undefined,
  scope: EventScope.ALL,
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
      } else {
        state.calculateRange = action.payload.range;
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
      action: PayloadAction<
        | Partial<Omit<FiltersState, 'useCustomRange'>>
        | Partial<EventSearchRequest>
      >,
    ) => {
      const payload = action.payload;

      if ('coordinateFilterDto' in payload) {
        const eventSearchPayload = payload as Partial<EventSearchRequest>;
        if (eventSearchPayload.coordinateFilterDto) {
          state.latitude = eventSearchPayload.coordinateFilterDto.latitude;
          state.longitude = eventSearchPayload.coordinateFilterDto.longitude;
          state.range = eventSearchPayload.coordinateFilterDto.range;
          state.useCustomRange = true;
        }
        if (eventSearchPayload.eventTypes !== undefined)
          state.eventTypes = eventSearchPayload.eventTypes;
        if (eventSearchPayload.eventStatuses !== undefined)
          state.eventStatuses = eventSearchPayload.eventStatuses;
        if (eventSearchPayload.eventStartDate !== undefined)
          state.eventStartDateTime = eventSearchPayload.eventStartDate;
        if (eventSearchPayload.scope !== undefined)
          state.scope = eventSearchPayload.scope;
        return;
      }

      const {
        latitude,
        longitude,
        range,
        eventTypes,
        eventStatuses,
        eventStartDateTime,
        scope,
      } = payload as Partial<Omit<FiltersState, 'useCustomRange'>>;

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
      state.latitude = initialState.latitude;
      state.longitude = initialState.longitude;
      state.eventTypes = initialState.eventTypes;
      state.eventStatuses = initialState.eventStatuses;
      state.eventStartDateTime = initialState.eventStartDateTime;
      state.scope = initialState.scope;
      state.range = state.calculateRange;
      state.useCustomRange = false;
    },

    resetCustomRange: (state) => {
      state.useCustomRange = false;
      state.range = state.calculateRange;
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
    eventStartDate: filters.eventStartDateTime,
    scope: filters.scope,
    coordinateFilterDto: {
      latitude: filters.latitude,
      longitude: filters.longitude,
      range: filters.range,
    },
  }),
);

export const filtersReducer = filtersSlice.reducer;
