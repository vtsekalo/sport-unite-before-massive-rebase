export enum ApiEndpoints {
  CREATE_USER = '/user-service/api/v1/users',
  EVENTS_SEARCH = '/event-service/api/v1/events/search',
  EVENTS_TYPES = '/event-service/api/v1/events/types',
  EVENTS_JOININ = '/event-service/api/v1/events/{eventId}/join',
  EVENT_BY_ID = '/event-service/api/v1/events/',
  USER_CHATS = '/chat-service/api/v1/chat-rooms/my',
  CHAT_MESSAGES = '/chat-service/api/v1/chat-rooms',
  USER_EVENTS = '/event-service/api/v1/events/user',
  GET_NOTIFICATIONS = 'notification-service/api/v1/inapp',
  GET_COUNT_NOTIFICATIONS = 'notification-service/api/v1/inapp/count',
  MARK_AS_READ_NOTIFICATIONS = 'notification-service/api/v1/inapp/read',
  DELETE_NOTIFICATIONS = 'notification-service/api/v1/inapp/delete',
}
