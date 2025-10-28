import { Middleware } from '@reduxjs/toolkit';
import { isFulfilled, isRejectedWithValue } from '@reduxjs/toolkit';

import { showSnackbar } from '@shared/lib/showSnackbar';

interface MutationMetaArg {
  endpointName: string;
}

export const rtkQuerySnackbarMiddleware: Middleware =
  () => (next) => (action) => {
    if (isRejectedWithValue(action)) {
      const errorMessage =
        (action.payload as { data?: { message?: string } })?.data?.message ||
        'Произошла ошибка';
      showSnackbar(errorMessage, 'error');
    }

    if (isFulfilled(action)) {
      const endpointName = (action.meta?.arg as MutationMetaArg)?.endpointName;
      if (endpointName === 'registrationUser') {
        showSnackbar('Регистрация прошла успешно!', 'success');
      }
    }

    return next(action);
  };
