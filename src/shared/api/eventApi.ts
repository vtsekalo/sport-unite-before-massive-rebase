import { ApiEndpoints, baseApi } from '@shared/api';
import {
  EventSearchRequest,
  IEvent,
  IEventType,
  providesList,
} from '@shared/lib';

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

    getJoinInEvents: builder.mutation<IEvent, string>({
      query: (eventId) => ({
        url: `/event-service/api/v1/events/${eventId}/join`,
        method: 'POST',
      }),
      invalidatesTags: ['Events', 'EventById'],
    }),

    getTypeEvents: builder.query<IEventType[], void>({
      query: () => ({
        url: ApiEndpoints.EVENTS_TYPES,
        method: 'GET',
      }),
      providesTags: ['Events'],
    }),
    getUserEvents: builder.query<IEvent[], void>({
      query: () => ({ url: ApiEndpoints.USER_EVENTS, method: 'GET' }),
      providesTags: (result) => providesList(result, 'Events', 'eventId'),
    }),
    getEventById: builder.query<IEvent, string>({
      query: (eventId) => ({
        url: `${ApiEndpoints.EVENT_BY_ID}${eventId}`,
        method: 'GET',
      }),
      providesTags: ['EventById'],
    }),
  }),
});

export const {
  useGetFilteredEventsQuery,
  useGetTypeEventsQuery,
  useGetEventByIdQuery,
  useLazyGetFilteredEventsQuery,
  useGetUserEventsQuery,
  useGetJoinInEventsMutation,
} = eventApi;
