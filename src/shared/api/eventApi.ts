import { ApiEndpoints, baseApi } from '@shared/api';
import { EventSearchRequest, IEvent, IEventType, providesList } from '@shared/lib';

export const eventApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFilteredEvents: builder.query<IEvent[], EventSearchRequest>({
      query: (filters) => ({
        url: ApiEndpoints.EVENTS_SEARCH,
        method: 'POST',
        body: filters,
      }),
      providesTags: (result) => providesList(result, 'Events', 'eventId'),
    }),
    getTypeEvents: builder.query<IEventType[], void>({
      query: () => ({
        url: ApiEndpoints.EVENTS_TYPES,
        method: 'GET',
      }),
      providesTags: ['EventTypes'],
    }),
    getUserEvents: builder.query<IEvent[], void>({
      query: () => ({ url: ApiEndpoints.USER_EVENTS, method: 'GET' }),
      providesTags: (result) => providesList(result, 'Events', 'eventId'),
    }),
  }),
});

export const {
  useGetFilteredEventsQuery,
  useGetTypeEventsQuery,
  useGetUserEventsQuery,
} = eventApi;
