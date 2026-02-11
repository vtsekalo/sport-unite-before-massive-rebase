import { configureStore } from '@reduxjs/toolkit';

import { baseApi, geoApi } from '@shared/api';
import { filtersReducer, mapReducer } from '@shared/store';
import { chatReducer } from '@widgets/chat-messages';
import { registrationApi } from '@widgets/registration';

import { rtkQuerySnackbarMiddleware } from './middlewares/rtk-query-toast-middleware';

export const store = configureStore({
  reducer: {
    map: mapReducer,
    filters: filtersReducer,
    [baseApi.reducerPath]: baseApi.reducer,
    [registrationApi.reducerPath]: registrationApi.reducer,
    [geoApi.reducerPath]: geoApi.reducer,
    chat: chatReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(baseApi.middleware)
      .concat(registrationApi.middleware)
      .concat(geoApi.middleware)
      .concat(rtkQuerySnackbarMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
});
