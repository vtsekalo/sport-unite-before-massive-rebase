import { createSelector } from '@reduxjs/toolkit';

import { ApiEndpoints, baseApi } from '@shared/api';
import { type IChat, type IMessage, RootState } from '@shared/lib';

export const chatApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserChats: builder.query<IChat[], void>({
      query: () => ({
        url: ApiEndpoints.USER_CHATS,
        method: 'GET',
      }),
      providesTags: ['Chats'],
    }),
    getChatMessages: builder.query<IMessage[], string | undefined>({
      query: (id) => ({
        url: `${ApiEndpoints.CHAT_MESSAGES}/${id}/messages`,
        method: 'GET',
      }),
      providesTags: ['ChatMessages'],
    }),
  }),
});

export const selectUserChatsQueryResult = (state: RootState) =>
  chatApi.endpoints.getUserChats.select(undefined)(state);

export const selectUserChats = createSelector(
  [selectUserChatsQueryResult],
  (res) => res.data ?? [],
);

export const selectChatById = createSelector(
  [selectUserChats, (_: RootState, eventId?: string) => eventId],
  (chats, eventId) => chats.find((c) => c.eventId === eventId),
);

export const { useGetChatMessagesQuery, useGetUserChatsQuery } = chatApi;
