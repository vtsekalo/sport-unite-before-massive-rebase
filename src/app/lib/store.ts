import { configureStore } from '@reduxjs/toolkit';

import { registrationApi } from '@widgets/registration';

import { rtkQuerySnackbarMiddleware } from './middlewares/rtkQueryToastMiddleware';

export const store = configureStore({
  reducer: {
    [registrationApi.reducerPath]: registrationApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(registrationApi.middleware)
      .concat(rtkQuerySnackbarMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
