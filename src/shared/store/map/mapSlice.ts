import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Coordinates } from '@shared/lib';

const initialState: Coordinates = {
  latitude: 55.754167,
  longitude: 37.620001,
};

const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setMapCenter: (
      state,
      action: PayloadAction<{ latitude: number; longitude: number }>,
    ) => {
      state.latitude = action.payload.latitude;
      state.longitude = action.payload.longitude;
    },
  },
});

export const { setMapCenter } = mapSlice.actions;
export default mapSlice.reducer;
