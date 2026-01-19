import { ApiEndpoints, baseApi } from '@shared/api';

type NotificationMutationRequestBody = string[];

export const notificationsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    markAsRead: builder.mutation<void, NotificationMutationRequestBody>({
      query: (ids) => ({
        url: ApiEndpoints.MARK_AS_READ_NOTIFICATIONS,
        method: 'POST',
        body: {
          messageIds: ids,
        },
      }),
      invalidatesTags: ['GetCountNotifications', 'GetMyNotifications'],
    }),
    deleteNotifications: builder.mutation<
      void,
      NotificationMutationRequestBody
    >({
      query: (ids) => ({
        url: ApiEndpoints.DELETE_NOTIFICATIONS,
        method: 'POST',
        body: {
          messageIds: ids,
        },
      }),
      invalidatesTags: ['GetCountNotifications', 'GetMyNotifications'],
    }),
  }),
});

export const { useMarkAsReadMutation, useDeleteNotificationsMutation } =
  notificationsApi;
