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
  eventStartDate?: string;
  scope: EventScope;
  useCustomRange: boolean;
  selectedSportIds: string[];
  tempRadius: number;
  searchTerm: string;
  tempDateValue: string | null;
}

interface FilterParams {
  latitude?: number;
  longitude?: number;
  range?: number;
  eventTypes?: string[];
  eventStatuses?: EventStatus[];
  eventStartDate?: string;
  scope?: EventScope;
}

type ApplyFiltersPayload = Partial<EventSearchRequest> | FilterParams;

const initialState: FiltersState = {
  latitude: DEFAULT_MAP_CENTER[1],
  longitude: DEFAULT_MAP_CENTER[0],
  range: BASE_RADIUS,
  calculateRange: BASE_RADIUS,
  eventStatuses: [EventStatus.PLANNED, EventStatus.IN_PROCESS],
  scope: EventScope.ALL,
  eventTypes: undefined,
  eventStartDate: undefined,
  useCustomRange: false,
  selectedSportIds: [],
  tempRadius: 0,
  searchTerm: '',
  tempDateValue: null,
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

    setEventStartDate: (state, action: PayloadAction<string | undefined>) => {
      state.eventStartDate = action.payload;
    },

    setEventScope: (state, action: PayloadAction<EventScope>) => {
      state.scope = action.payload;
    },

    setSelectedSportIds: (state, action: PayloadAction<string[]>) => {
      state.selectedSportIds = action.payload;
    },

    toggleSportId: (state, action: PayloadAction<string>) => {
      const sportId = action.payload;
      if (state.selectedSportIds.includes(sportId)) {
        state.selectedSportIds = state.selectedSportIds.filter(
          (id) => id !== sportId,
        );
      } else {
        state.selectedSportIds.push(sportId);
      }
    },

    setTempRadius: (state, action: PayloadAction<number>) => {
      state.tempRadius = action.payload;
    },

    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },

    setTempDateValue: (state, action: PayloadAction<string | null>) => {
      state.tempDateValue = action.payload;
    },

    applyFilters: (state, action: PayloadAction<ApplyFiltersPayload>) => {
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
          state.eventStartDate = eventSearchPayload.eventStartDate;
        if (eventSearchPayload.scope !== undefined)
          state.scope = eventSearchPayload.scope;
        return;
      }

      const filterParams = payload as FilterParams;

      if (filterParams.latitude !== undefined)
        state.latitude = filterParams.latitude;
      if (filterParams.longitude !== undefined)
        state.longitude = filterParams.longitude;
      if (filterParams.range !== undefined) {
        state.range = filterParams.range;
        state.useCustomRange = true;
      }
      if (filterParams.eventTypes !== undefined)
        state.eventTypes = filterParams.eventTypes;
      if (filterParams.eventStatuses !== undefined)
        state.eventStatuses = filterParams.eventStatuses;
      if (filterParams.eventStartDate !== undefined)
        state.eventStartDate = filterParams.eventStartDate;
      if (filterParams.scope !== undefined) state.scope = filterParams.scope;
    },

    resetCustomRange: (state) => {
      state.useCustomRange = false;
      state.range = state.calculateRange;
      state.tempRadius = 0;
    },

    resetFilters: (state) => {
      state.eventTypes = initialState.eventTypes;
      state.eventStatuses = initialState.eventStatuses;
      state.eventStartDate = initialState.eventStartDate;
      state.scope = initialState.scope;
      state.range = state.calculateRange;
      state.useCustomRange = false;
      state.selectedSportIds = [];
      state.tempRadius = 0;
      state.searchTerm = '';
      state.tempDateValue = null;
    },
  },
});

export const {
  setFilterCoordinates,
  setFilterRange,
  setEventTypes,
  setEventStatuses,
  setEventStartDate,
  setEventScope,
  setSelectedSportIds,
  toggleSportId,
  setTempRadius,
  setSearchTerm,
  setTempDateValue,
  applyFilters,
  resetCustomRange,
  resetFilters,
} = filtersSlice.actions;

export const selectFilters = (state: { filters: FiltersState }) =>
  state.filters;

export const selectUseCustomRange = (state: { filters: FiltersState }) =>
  state.filters.useCustomRange;

export const selectSportIds = (state: { filters: FiltersState }) =>
  state.filters.selectedSportIds;

export const selectTempRadius = (state: { filters: FiltersState }) =>
  state.filters.tempRadius;

export const selectSearchTerm = (state: { filters: FiltersState }) =>
  state.filters.searchTerm;

export const selectTempDateValue = (state: { filters: FiltersState }) =>
  state.filters.tempDateValue;

export const selectEventSearchRequest = createSelector(
  [selectFilters],
  (filters): EventSearchRequest => ({
    eventTypes: filters.eventTypes,
    eventStatuses: filters.eventStatuses,
    eventStartDate: filters.eventStartDate,
    scope: filters.scope,
    coordinateFilterDto: {
      latitude: filters.latitude,
      longitude: filters.longitude,
      range: filters.range,
    },
  }),
);

export const filtersReducer = filtersSlice.reducer;
