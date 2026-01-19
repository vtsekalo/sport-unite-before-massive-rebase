import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { type IChatMessage } from '../lib/types';

type ChatState = {
  status: 'disconnected' | 'connecting' | 'connected';
  roomId: string | null;
  liveMessages: IChatMessage[];
  error: string | null;
  message: string;
};

const initialState: ChatState = {
  message: '',
  status: 'disconnected',
  roomId: null,
  liveMessages: [],
  error: null,
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    connectRequested: (state, action: PayloadAction<{ roomId: string }>) => {
      state.status = 'connecting';
      state.roomId = action.payload.roomId;
      state.error = null;
      state.liveMessages = [];
    },
    connected: (state) => {
      state.status = 'connected';
    },
    disconnected: (state) => {
      state.status = 'disconnected';
    },
    connectionError: (state, action: PayloadAction<string>) => {
      state.status = 'disconnected';
      state.error = action.payload;
    },
    liveMessageAdded: (state, action: PayloadAction<IChatMessage>) => {
      state.liveMessages.push(action.payload);
    },
    setMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },

    disconnectRequested: () => {},
    sendMessageRequested: (
      state,
      action: PayloadAction<{ roomId: string; message: string }>,
    ) => {
      if (!state || !action.payload) return;
    },
  },
});

export const chatActions = chatSlice.actions;
export const chatReducer = chatSlice.reducer;
