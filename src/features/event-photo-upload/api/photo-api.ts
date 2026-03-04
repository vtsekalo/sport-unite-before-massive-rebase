import { baseApi } from '@shared/api';
import { ApiEndpoints } from '@shared/api';

export const photoApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    uploadPhoto: builder.mutation<
      { url: string },
      { id: string; file: FormData }
    >({
      query: ({ id, file }) => ({
        url: `${ApiEndpoints.UPLOAD_PHOTO}/${id}?photoType=EVENT`,
        method: 'POST',
        body: file,
      }),
    }),

    deletePhoto: builder.mutation<void, string>({
      query: (id) => ({
        url: `${ApiEndpoints.DELETE_PHOTO}/${id}/delete`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useUploadPhotoMutation, useDeletePhotoMutation } = photoApi;
