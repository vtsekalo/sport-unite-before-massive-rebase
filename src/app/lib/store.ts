import { configureStore } from '@reduxjs/toolkit';

import { baseApi } from '@shared/api';
import { filtersReducer, mapReducer } from '@shared/store';
import { chatReducer } from '@widgets/chat-messages';

import { rtkQuerySnackbarMiddleware } from './middlewares/rtk-query-toast-middleware';

export const store = configureStore({
  reducer: {
    map: mapReducer,
    filters: filtersReducer,
    [baseApi.reducerPath]: baseApi.reducer,
    chat: chatReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(baseApi.middleware)
      .concat(rtkQuerySnackbarMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
});
