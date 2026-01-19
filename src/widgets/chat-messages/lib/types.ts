export type IChatMessage = {
  id?: string;
  chatRoomId: string;
  senderId: string;
  senderName: string | null;
  message: string;
  createdAt: string;
  updatedAt: string;
};
