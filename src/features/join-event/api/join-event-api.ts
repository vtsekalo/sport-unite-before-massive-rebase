import { ApiEndpoints, baseApi } from '@shared/api';
import { IEvent } from '@shared/lib';

export const eventJoinInApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    joinInEvents: builder.mutation<IEvent, string>({
      query: (eventId) => ({
        url: `${ApiEndpoints.EVENT_BY_ID}/${eventId}/join`,
        method: 'POST',
      }),
      invalidatesTags: ['Events', 'EventById'],
    }),
  }),
});

export const { useJoinInEventsMutation } = eventJoinInApi;
