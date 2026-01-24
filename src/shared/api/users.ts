import { API_PATHS, type IUserProfile } from '@shared/lib';
import { WithMeta } from '@shared/lib/types/general';

import { ApiEndpoints } from './api-endpoints';
import { baseApi } from './base-api';

export const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserById: builder.query<IUserProfile, string>({
      query: (userId) => ({
        url: `${API_PATHS.USER_SERVICE}/users/${userId}`,
        method: 'GET',
      }),
      providesTags: (_result, _error, id) => [{ type: 'Profile', id }],
    }),
    getMyProfile: builder.query<IUserProfile, WithMeta<object>>({
      query: () => ({
        url: ApiEndpoints.GET_MY_USER,
        method: 'GET',
      }),
      providesTags: [{ type: 'MyProfile', id: 'me' }],
      serializeQueryArgs: () => 'getMyProfile',
    }),
  }),
});

export const { useGetMyProfileQuery, useGetUserByIdQuery } = usersApi;
