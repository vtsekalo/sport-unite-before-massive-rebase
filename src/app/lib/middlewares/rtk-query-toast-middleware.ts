import { Middleware } from '@reduxjs/toolkit';
import { isFulfilled, isRejectedWithValue } from '@reduxjs/toolkit';

import { showSnackbar } from '@shared/lib';
import { RequestMeta } from '@shared/lib';

import { EndPointsMessages, StatusCodes, StatusMessages } from './messages';

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

const getEndpointName = (
  action: unknown,
): keyof typeof EndPointsMessages | null => {
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
    return action.meta.arg.endpointName as keyof typeof EndPointsMessages;
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
  (res) => (next) => (action) => {
    console.log(action, res);
    const meta = getMeta(action);
    const endPoint = getEndpointName(action);

    if (meta?.toast === false) {
      return next(action);
    }

    const status = getStatus(action);

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
      let errorMessage =
        (action.payload as { data?: { message?: string } })?.data?.message ||
        'Произошла ошибка';

      if (endPoint && status != null) {
        const map = EndPointsMessages[endPoint];
        const arrayKeys = map ? Object.keys(map).map(Number) : [];

        if (arrayKeys.includes(status)) {
          errorMessage = map[status as keyof typeof map];
        }
      }

      if (errorMessage) {
        showSnackbar(errorMessage, 'error');
      }
    }

    if (isFulfilled(action) && endPoint) {
      const defaultMessages: Record<string, string> = {
        registration: 'Регистрация прошла успешно!',
        deleteMyProfile: 'Профиль успешно удален!',
        updateMyProfile: 'Профиль обновлен',
      };

      const message = defaultMessages[endPoint];

      if (message) {
        showSnackbar(message, 'success');
      }
    }

    return next(action);
  };
