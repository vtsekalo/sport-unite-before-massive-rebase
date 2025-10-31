import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { IUserProfile } from '@shared/lib';

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1',
    credentials: 'include',
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      headers.set('Accept', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['Profile'],
  endpoints: (builder) => ({
    getProfile: builder.query<IUserProfile, string>({
      query: (userId) => `/users/${userId}`,
      providesTags: ['Profile'],
    }),
    getMyProfile: builder.query<IUserProfile, void>({
      query: () => '/users/me',
      providesTags: ['Profile'],
    }),
  }),
});

export const { useGetProfileQuery, useGetMyProfileQuery } = baseApi;
