import { API_PATHS, type IUserProfile } from '@shared/lib';
import { WithMeta } from '@shared/lib/types/general';

import { ApiEndpoints } from './api-endpoints';
import { baseApi } from './base-api';

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserById: builder.query<IUserProfile, string>({
      query: (id) => ({
        url: `${API_PATHS.USER_SERVICE}/users/${id}`,
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

export const { useGetMyProfileQuery, useGetUserByIdQuery } = userApi;
