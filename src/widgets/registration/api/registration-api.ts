import { ApiEndpoints, baseApi } from '@shared/api';
import { IUserProfile } from '@shared/lib';

import { RegistrationFormData } from '../lib/schema';

export const registrationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    registrationUser: builder.mutation<IUserProfile, RegistrationFormData>({
      query: (data) => ({
        url: ApiEndpoints.CREATE_USER,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useRegistrationUserMutation } = registrationApi;
