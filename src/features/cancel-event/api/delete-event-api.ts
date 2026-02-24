import { ApiEndpoints, baseApi } from '@shared/api';

export const eventDeleteApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    deleteEvent: builder.mutation<void, string>({
      query: (eventId) => ({
        url: `${ApiEndpoints.EVENT_BY_ID}/${eventId}/delete`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, eventId) => [
        { type: 'Events', id: 'LIST' },
        { type: 'EventById', id: eventId },
      ],
    }),
  }),
});

export const { useDeleteEventMutation } = eventDeleteApi;
