import { createSelector } from '@reduxjs/toolkit';

import { chatApi } from '@shared/api';
import { RootState } from '@shared/lib';

export const selectChatStatus = (s: RootState) => s.chat.status;
export const selectChatError = (s: RootState) => s.chat.error;
export const selectLiveMessages = (s: RootState) => s.chat.liveMessages;

export const makeSelectAllMessages = (roomId: string) =>
  createSelector(
    [
      (state: RootState) =>
        chatApi.endpoints.getChatMessages.select(roomId)(state)?.data ?? [],
      selectLiveMessages,
    ],
    (history, live) =>
      [...history, ...live].sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      ),
  );
