import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { IUserProfile } from '@shared/lib';

const getBaseUrl = () => {
  if (import.meta.env.PROD) {
    return import.meta.env.VITE_API_BASE_URL + '/user-service/api/v1';
  }

  if (import.meta.env.VITE_USE_MOCKS === 'true') {
    return '/api/v1';
  }

  return '/user-service/api/v1';
};

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: getBaseUrl(),
    credentials: 'include',
    prepareHeaders: (headers) => {
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
