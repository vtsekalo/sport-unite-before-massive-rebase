import { ApiEndpoints, baseApi } from '@shared/api';
import { EventSearchRequest, IEvent, IEventType } from '@shared/lib';
import { providesList } from '@shared/lib/utils/provides-list';

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
      providesTags: (result) => providesList(result, 'EventTypes', 'typeId'),
    }),
    getUserEvents: builder.query<IEvent[], void>({
      query: () => ({ url: ApiEndpoints.USER_EVENTS, method: 'GET' }),
      providesTags: (result) => providesList(result, 'Events', 'eventId'),
    }),
    getEventById: builder.query<IEvent, string>({
      query: (eventId) => ({
        url: `${ApiEndpoints.EVENT_BY_ID}/${eventId}`,
        method: 'GET',
      }),
      providesTags: (_result, _error, eventId) => [
        { type: 'EventById', id: eventId },
      ],
    }),
  }),
});

export const {
  useGetFilteredEventsQuery,
  useGetTypeEventsQuery,
  useGetEventByIdQuery,
  useLazyGetFilteredEventsQuery,
  useGetUserEventsQuery,
} = eventApi;
