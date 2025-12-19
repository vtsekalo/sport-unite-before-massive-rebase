import { Middleware } from '@reduxjs/toolkit';
import { isFulfilled, isRejectedWithValue } from '@reduxjs/toolkit';

import { showSnackbar } from '@shared/lib';
import { RequestMeta } from '@shared/lib';

import { StatusCodes, StatusMessages } from './messages';

const getStatus = (action: unknown): number | null => {
  if (
    typeof action === 'object' &&
    action !== null &&
    'payload' in action &&
    typeof action.payload === 'object' &&
    action.payload !== null &&
    'status' in action.payload &&
    typeof action.payload.status === 'number'
  ) {
    return action.payload.status;
  }

  return null;
};

const getEndpointName = (action: unknown): string | null => {
  if (
    typeof action === 'object' &&
    action !== null &&
    'meta' in action &&
    typeof action.meta === 'object' &&
    action.meta !== null &&
    'arg' in action.meta &&
    typeof action.meta.arg === 'object' &&
    action.meta.arg !== null &&
    'endpointName' in action.meta.arg &&
    typeof action.meta.arg.endpointName === 'string'
  ) {
    return action.meta.arg.endpointName;
  }

  return null;
};

const getMeta = (action: unknown): RequestMeta | null => {
  if (
    typeof action === 'object' &&
    action !== null &&
    'meta' in action &&
    typeof action.meta === 'object' &&
    action.meta !== null &&
    'arg' in action.meta &&
    typeof action.meta.arg === 'object' &&
    action.meta.arg !== null &&
    'originalArgs' in action.meta.arg &&
    typeof action.meta.arg.originalArgs === 'object' &&
    action.meta.arg.originalArgs !== null &&
    '__meta' in action.meta.arg.originalArgs &&
    typeof action.meta.arg.originalArgs.__meta === 'object'
  ) {
    return action.meta.arg.originalArgs.__meta;
  }

  return null;
};

export const rtkQuerySnackbarMiddleware: Middleware =
  () => (next) => (action) => {
    const meta = getMeta(action);

    if (meta?.toast === false) {
      return next(action);
    }

    const status = getStatus(action) as keyof typeof StatusMessages | null;

    if (
      status === StatusCodes.Unauthorized ||
      status === StatusCodes.Forbidden
    ) {
      const message = StatusMessages[status];

      if (message) {
        showSnackbar(StatusMessages[status], 'error');
      }

      return next(action);
    }

    if (isRejectedWithValue(action)) {
      const errorMessage =
        (action.payload as { data?: { message?: string } })?.data?.message ||
        'Произошла ошибка';
      showSnackbar(errorMessage, 'error');
    }

    if (isFulfilled(action)) {
      const endpointName = getEndpointName(action);
      if (endpointName === 'registrationUser') {
        showSnackbar('Регистрация прошла успешно!', 'success');
      }
    }

    return next(action);
  };
