import { baseApi } from '@shared/api';
import type { IUserProfile } from '@shared/lib';

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
        url: '/users/updateMyProfile',
        method: 'PATCH',
        body,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: ['Profile'],
    }),
  }),
});

export const { useUpdateMyProfileMutation } = profileEditApi;
