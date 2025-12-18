import { ApiEndpoints, baseApi } from '@shared/api';
import { type IChat, type IMessage } from '@shared/lib';

export const chatApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserChats: builder.query<IChat[], void>({
      query: () => ({
        url: ApiEndpoints.USER_CHATS,
        method: 'GET',
      }),
      providesTags: ['Chats'],
    }),
    getChatMessages: builder.query<IMessage[], string>({
      query: (id) => ({
        url: `${ApiEndpoints.CHAT_MESSAGES}/${id}/messages`,
        method: 'GET',
      }),
      providesTags: ['ChatMessages'],
    }),
  }),
});

export const { useGetChatMessagesQuery, useGetUserChatsQuery } = chatApi;
