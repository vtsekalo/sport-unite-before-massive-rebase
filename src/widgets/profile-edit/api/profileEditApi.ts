import { baseApi } from '@shared/api';
import { API_PATHS, type IUserProfile } from '@shared/lib';
import { IUploadImage } from '@shared/lib';

export type UserUpdate = {
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
    updateMyProfile: builder.mutation<IUserProfile, UserUpdate>({
      query: (body) => ({
        url: `${API_PATHS.USER_SERVICE}/users/me`,
        method: 'PATCH',
        body,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: [{ type: 'MyProfile', id: 'me' }, 'MyProfile'],
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
      invalidatesTags: [{ type: 'MyProfile', id: 'me' }, 'MyProfile'],
    }),
    deleteMyAvatar: builder.mutation<IUploadImage, { id: string }>({
      query: ({ id }) => ({
        url: `${API_PATHS.IMAGE_SERVICE}/resources/images/${id}/delete?photoType=USER`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'MyProfile', id: 'me' }, 'MyProfile'],
    }),
  }),
});

export const {
  useUpdateMyProfileMutation,
  useUpdateMyAvatarMutation,
  useDeleteMyAvatarMutation,
} = profileEditApi;
