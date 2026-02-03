import { configureStore } from '@reduxjs/toolkit';

import { baseApi } from '@shared/api';
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
    chat: chatReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(baseApi.middleware)
      .concat(registrationApi.middleware)
      .concat(rtkQuerySnackbarMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
});
