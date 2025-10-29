import { configureStore } from '@reduxjs/toolkit';

import { baseApi } from '@shared/api';
import { registrationApi } from '@widgets/registration';

import { rtkQuerySnackbarMiddleware } from './middlewares/rtkQueryToastMiddleware';

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    [registrationApi.reducerPath]: registrationApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(baseApi.middleware)
      .concat(registrationApi.middleware)
      .concat(rtkQuerySnackbarMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
