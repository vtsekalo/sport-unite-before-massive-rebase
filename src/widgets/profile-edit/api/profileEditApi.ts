import { baseApi } from '@shared/api';
import { API_PATHS, type IUserProfile } from '@shared/lib';
import { IUploadImage } from '@shared/lib';

export type UserUpdateDto = {
  nickname?: string;
  dateOfBirth?: string;
  firstName?: string;
  lastName?: string;
  city?: string;
  gender?: string;
  biography?: string;
  profilePicture?: string | null;
  interestIds?: number[];
};

export const profileEditApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateMyProfile: builder.mutation<IUserProfile, UserUpdateDto>({
      query: (body) => ({
        url: `${API_PATHS.USER_SERVICE}/users/updateMyProfile`,
        method: 'PATCH',
        body,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: ['Profile'],
    }),
    updateMyAvatar: builder.mutation<
      IUploadImage,
      { file: FormData; id: string }
    >({
      query: ({ id, file }) => ({
        url: `${API_PATHS.IMAGE_SERVICE}/resources/images/${id}?photoType=USER`,
        method: 'POST',
        body: file,
      }),
      invalidatesTags: ['UpdateMyAvatar'],
    }),
    deleteMyAvatar: builder.mutation<IUploadImage, { id: string }>({
      query: ({ id }) => ({
        url: `${API_PATHS.IMAGE_SERVICE}/resources/images/${id}/delete?photoType=USER`,
        method: 'DELETE',
      }),
      invalidatesTags: ['DeleteMyAvatar'],
    }),
  }),
});

export const {
  useUpdateMyProfileMutation,
  useUpdateMyAvatarMutation,
  useDeleteMyAvatarMutation,
} = profileEditApi;
