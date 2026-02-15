import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';

import { DEFAULT_MAP_CENTER, DEFAULT_MAP_ZOOM } from '@shared/config';
import { Coordinates, RootState } from '@shared/lib';

interface MapViewState {
  center: Coordinates;
  zoom: number;
}

const STORAGE_KEY = 'map_view_state';

const mapPersistence = {
  save: (state: MapViewState) => {
    if (state.center.latitude && state.center.longitude) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
  },

  load: (): MapViewState | undefined => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (!saved) return undefined;

      const parsed = JSON.parse(saved);
      if (parsed?.center?.latitude && parsed?.zoom) {
        return parsed;
      }
      return undefined;
    } catch {
      return undefined;
    }
  },

  getInitialState: (): MapViewState => {
    const saved = mapPersistence.load();
    if (saved) return saved;

    return {
      center: {
        latitude: DEFAULT_MAP_CENTER[1],
        longitude: DEFAULT_MAP_CENTER[0],
      },
      zoom: DEFAULT_MAP_ZOOM,
    };
  },
};

const mapSlice = createSlice({
  name: 'map',
  initialState: mapPersistence.getInitialState(),
  reducers: {
    setMapCenter(state, action: PayloadAction<Coordinates>) {
      state.center = action.payload;
      mapPersistence.save(state);
    },
    setMapZoom(state, action: PayloadAction<number>) {
      state.zoom = action.payload;
      mapPersistence.save(state);
    },
    setMapView(state, action: PayloadAction<MapViewState>) {
      state.center = action.payload.center;
      state.zoom = action.payload.zoom;
      mapPersistence.save(state);
    },
  },
});

export const { setMapCenter, setMapZoom, setMapView } = mapSlice.actions;
export const mapReducer = mapSlice.reducer;

export const selectMapCenter = createSelector(
  [(state: RootState) => state.map.center],
  (center) => ({
    latitude: center.latitude,
    longitude: center.longitude,
  }),
  {
    memoizeOptions: {
      resultEqualityCheck: (a, b) =>
        a.latitude === b.latitude && a.longitude === b.longitude,
    },
  },
);
export const selectMapZoom = (state: RootState) => state.map.zoom;
