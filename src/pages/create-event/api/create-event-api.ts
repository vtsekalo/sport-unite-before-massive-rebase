import { ApiEndpoints, baseApi } from '@shared/api';
import { IEventDetailed } from '@shared/lib';

import { CreateEventRequest } from '../lib/types';
import { UploadPhotoRequest, UploadPhotoResponse } from './types';

export const createEventApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
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

export const { useCreateEventMutation, useUploadPhotoMutation } =
  createEventApi;
