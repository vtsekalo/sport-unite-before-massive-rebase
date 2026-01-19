import { ApiEndpoints, baseApi } from '@shared/api';
import { WithMeta } from '@shared/lib';
import {
  ICountNotifications,
  INotification,
} from '@shared/lib/types/notification';

export const eventApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyNotifications: builder.query<INotification[], void>({
      query: () => ({
        url: ApiEndpoints.GET_NOTIFICATIONS,
        method: 'PATCH',
      }),
      providesTags: ['GetMyNotifications'],
    }),
    getCountNotifications: builder.query<ICountNotifications, WithMeta<object>>(
      {
        query: () => ({
          url: ApiEndpoints.GET_COUNT_NOTIFICATIONS,
          method: 'GET',
        }),
        providesTags: ['GetCountNotifications'],
      },
    ),
  }),
});

export const { useGetMyNotificationsQuery, useGetCountNotificationsQuery } =
  eventApi;
