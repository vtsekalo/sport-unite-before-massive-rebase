export interface IChat {
  id: string;
  eventId: string;
  title: string;
  eventLocation: string;
  eventType: string;
  lastMessage: string | null;
  lastMessageDateTime: string | null;
  eventStartDate: string | null;
}

export interface IMessage {
  id: string;
  createdAt: string;
  updatedAt: string;
  chatRoomId: string;
  senderId: string;
  senderName: string;
  message: string;
}
