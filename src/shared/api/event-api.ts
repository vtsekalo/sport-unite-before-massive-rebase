import { ApiEndpoints, baseApi } from '@shared/api';
import {
  CreateEventRequest,
  EventSearchRequest,
  IEvent,
  IEventDetailed,
  IEventType,
  UploadPhotoRequest,
  UploadPhotoResponse,
} from '@shared/lib';
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

    createEvent: builder.mutation<IEventDetailed, CreateEventRequest>({
      query: (eventData) => ({
        url: ApiEndpoints.CREATE_EVENT,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: eventData,
      }),
      invalidatesTags: ['Events'],
    }),

    uploadPhoto: builder.mutation<UploadPhotoResponse, UploadPhotoRequest>({
      query: ({ id, photoType, file }) => {
        const formData = new FormData();
        formData.append('file', file);

        return {
          url: `${ApiEndpoints.UPLOAD_PHOTO}/${id}?photoType=${photoType}`,
          method: 'POST',
          credentials: 'include',
          body: formData,
        };
      },
      invalidatesTags: ['UploadImage'],
    }),
  }),
});

export const {
  useGetFilteredEventsQuery,
  useGetTypeEventsQuery,
  useGetEventByIdQuery,
  useLazyGetFilteredEventsQuery,
  useDeleteEventMutation,
  useGetUserEventsQuery,
  useGetJoinInEventsMutation,
  useCreateEventMutation,
  useUploadPhotoMutation,
} = eventApi;
