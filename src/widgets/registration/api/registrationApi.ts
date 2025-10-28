import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { ApiEndpoints } from '@shared/api';

import { RegistrationFormData } from '../lib/schema';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const registrationApi = createApi({
  reducerPath: 'registrationApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    registrationUser: builder.mutation<string, RegistrationFormData>({
      query: (data) => ({
        url: ApiEndpoints.CREATE_USER,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useRegistrationUserMutation } = registrationApi;
