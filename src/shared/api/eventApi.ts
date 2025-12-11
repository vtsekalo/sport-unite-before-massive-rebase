import { ApiEndpoints, baseApi } from '@shared/api';
import {
  EventSearchRequest,
  EventSearchResponse,
  IEventType,
} from '@shared/lib';

export const eventApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFilteredEvents: builder.query<EventSearchResponse, EventSearchRequest>({
      query: (filters) => ({
        url: ApiEndpoints.EVENTS_SEARCH,
        method: 'POST',
        body: filters,
      }),
      providesTags: ['Events'],
    }),
    getTypeEvents: builder.query<IEventType[], void>({
      query: () => ({
        url: ApiEndpoints.EVENTS_TYPES,
        method: 'GET',
      }),
      providesTags: ['Events'],
    }),
  }),
});

export const {
  useGetFilteredEventsQuery,
  useGetTypeEventsQuery,
  useLazyGetFilteredEventsQuery,
} = eventApi;
