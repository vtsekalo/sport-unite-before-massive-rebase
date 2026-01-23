import SockJS from 'sockjs-client';

import { createListenerMiddleware } from '@reduxjs/toolkit';
import { Client, IMessage } from '@stomp/stompjs';
import type { IFrame, IStompSocket } from '@stomp/stompjs';

import { chatApi } from '@shared/api';

import { type IChatMessage } from '../lib/types';
import { chatActions } from './messages';

export const stompListener = createListenerMiddleware();

let client: Client | null = null;

stompListener.startListening({
  actionCreator: chatActions.connectRequested,
  effect: async (action, api) => {
    const { roomId } = action.payload;

    if (client?.active) {
      await client.deactivate();
      client = null;
    }

    const sock = new SockJS(
      'http://api-gateway.dev.sport-unite.it-mentor.space/chat-service/ws',
      undefined,
      { transports: ['websocket'] },
    );

    const nextClient = new Client({
      webSocketFactory: () => sock as unknown as IStompSocket,
      reconnectDelay: 3000,
      debug: (str) => console.log('[STOMP]', str),

      onConnect: () => {
        api.dispatch(chatActions.connected());

        api.dispatch(
          chatApi.endpoints.getChatMessages.initiate(roomId, {
            forceRefetch: true,
          }),
        );

        nextClient.subscribe(`/topic/chat.${roomId}`, (msg: IMessage) => {
          let dto: IChatMessage;
          const now = new Date().toISOString();

          try {
            const body = JSON.parse(msg.body);
            dto = {
              chatRoomId: body.chatRoomId ?? roomId,
              senderId: body.senderId ?? 'unknown',
              senderName: body.senderName ?? null,
              message: body.message ?? '',
              createdAt: body.createdAt ?? now,
              updatedAt: body.updatedAt ?? body.createdAt ?? now,
            };
          } catch {
            dto = {
              chatRoomId: roomId,
              senderId: 'unknown',
              senderName: null,
              message: msg.body,
              createdAt: now,
              updatedAt: now,
            };
          }

          api.dispatch(chatActions.liveMessageAdded(dto));
        });
      },

      onStompError: (frame: IFrame) => {
        api.dispatch(
          chatActions.connectionError(frame?.headers?.message ?? 'STOMP error'),
        );
      },

      onWebSocketClose: () => {
        api.dispatch(chatActions.disconnected());
      },
    });

    client = nextClient;
    nextClient.activate();
  },
});

stompListener.startListening({
  actionCreator: chatActions.disconnectRequested,
  effect: async (_action, api) => {
    if (client) {
      await client.deactivate();
      client = null;
    }
    api.dispatch(chatActions.disconnected());
  },
});

stompListener.startListening({
  actionCreator: chatActions.sendMessageRequested,
  effect: (action) => {
    const { roomId, message } = action.payload;
    if (!message.trim()) return;
    if (!client || !client.connected) return;

    client.publish({
      destination: `/app/chat.send.${roomId}`,
      body: JSON.stringify({ message }),
    });
  },
});
