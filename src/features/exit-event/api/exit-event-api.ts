import { baseApi } from '@shared/api';
import { API_PATHS, IEvent } from '@shared/lib';

export type ExitEventResponse = {
  success: boolean;
  message?: string;
};

export const exitEventApi = baseApi.injectEndpoints({
  endpoints: (bulder) => ({
    exitEvent: bulder.mutation<IEvent, string>({
      query: (eventId) => ({
        url: `${API_PATHS.EVENT_SERVICE}/events/${eventId}/exit`,
        method: 'POST',
      }),
      invalidatesTags: (_result, _error, eventId) => [
        { type: 'Events', id: 'LIST' },
        { type: 'EventById', id: eventId },
      ],
    }),
  }),
});

export const { useExitEventMutation } = exitEventApi;
