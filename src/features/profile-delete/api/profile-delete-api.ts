import { baseApi } from '@shared/api';
import { API_PATHS } from '@shared/lib';

export const profileDeleteApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    deleteMyProfile: builder.mutation<
      { user_status: string; reason?: string },
      { reason?: string }
    >({
      query: ({ reason }) => ({
        url: `${API_PATHS.USER_SERVICE}/users/deactivate`,
        method: 'PATCH',
        body: {
          'user_status': 'deleted',
          'reason': reason || 'Запрос пользователя',
        },
        headers: {
          'Content-Type': 'application/json',
        },
        providesTags: ['MyProfile'],
      }),
    }),
  }),
});

export const { useDeleteMyProfileMutation } = profileDeleteApi;
