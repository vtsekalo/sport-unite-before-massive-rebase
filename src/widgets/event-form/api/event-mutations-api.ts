import { ApiEndpoints, baseApi } from '@shared/api';
import { IEvent } from '@shared/lib';

export interface CreateEventRequest {
  eventType: string;
  eventName: string;
  eventLocation: string;
  eventStartDate: string;
  eventEndDate: string;
  eventDescription: string;
  countUsers?: number;
  eventPhoto: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

export interface UpdateEventRequest {
  id: string;
  data: Partial<CreateEventRequest>;
}

export const eventMutationsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createEvent: builder.mutation<IEvent, CreateEventRequest>({
      query: (eventData) => ({
        url: ApiEndpoints.CREATE_EVENT,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: eventData,
      }),
      invalidatesTags: ['Events'],
    }),

    updateEvent: builder.mutation<IEvent, UpdateEventRequest>({
      query: ({ id, data }) => ({
        url: `${ApiEndpoints.CREATE_EVENT}/${id}`,
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Events', id: 'LIST' },
        { type: 'EventById', id },
      ],
    }),
  }),
});

export const { useCreateEventMutation, useUpdateEventMutation } =
  eventMutationsApi;
