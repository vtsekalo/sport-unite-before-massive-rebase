import { API_PATHS, type IUserProfile } from '@shared/lib';

import { baseApi } from './baseApi';

export const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<IUserProfile, string>({
      query: (userId) => `${API_PATHS.USER_SERVICE}/users/${userId}`,
      providesTags: ['Profile'],
    }),
    getMyProfile: builder.query<IUserProfile, void>({
      query: () => `${API_PATHS.USER_SERVICE}/users/me`,
      providesTags: ['Profile'],
    }),
  }),
});

export const { useGetProfileQuery, useGetMyProfileQuery } = usersApi;
