import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const getBaseUrl = () => {
  if (import.meta.env.VITE_USE_MOCKS === 'true') {
    return '';
  }

  return import.meta.env.VITE_BASE_URL || '';
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
  tagTypes: [
    'Profile',
    'Events',
    'UploadImage',
    'UpdateMyAvatar',
    'DeleteMyAvatar',
    'ChatMessages',
    'Chats',
    'UpdateMyProfile',
    'MyProfile',
  ],
  endpoints: () => ({}),
});
