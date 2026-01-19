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
  chatRoomId: string;
  userId: string;
  text: string;
  createdAt: string;
  userPhotoUrl: string;
  eventName: string;
  eventType: string;
  eventStartDate: string;
}
