import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({
    baseUrl:
      import.meta.env.VITE_USE_MOCKS === 'true'
        ? ''
        : import.meta.env.VITE_BASE_URL,
    credentials: 'include',
    prepareHeaders: (headers) => {
      headers.set('Accept', 'application/json');
      return headers;
    },
  }),
  tagTypes: [
    'Profile',
    'Events',
    'EventById',
    'EventTypes',
    'UploadImage',
    'UpdateMyAvatar',
    'DeleteMyAvatar',
    'ChatMessages',
    'Chats',
    'UpdateMyProfile',
    'getUserById',
    'MyProfile',
    'GetMyNotifications',
    'GetCountNotifications',
  ],
  endpoints: () => ({}),
});
