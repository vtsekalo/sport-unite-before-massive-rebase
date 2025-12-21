import { configureStore } from '@reduxjs/toolkit';

import { baseApi, chatApi, eventApi } from '@shared/api';
import { filtersReducer, mapReducer } from '@shared/store';
import { registrationApi } from '@widgets/registration';

import { rtkQuerySnackbarMiddleware } from './middlewares/rtkQueryToastMiddleware';

export const store = configureStore({
  reducer: {
    map: mapReducer,
    filters: filtersReducer,
    [baseApi.reducerPath]: baseApi.reducer,
    [registrationApi.reducerPath]: registrationApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(chatApi.middleware)
      .concat(baseApi.middleware)
      .concat(registrationApi.middleware)
      .concat(rtkQuerySnackbarMiddleware)
      .concat(eventApi.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});
