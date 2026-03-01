export const ROUTES = {
  HOME: '/',
  AUTH: '/auth',
  REGISTRATION: '/registration',
  SEND_EMAIL: '/send-email',

  CHATS: {
    INDEX: '/chats',
    DETAIL: (id: string | number) => `/chats/${id}`,
  },
  CREATE_EVENT: '/create-event',
  ADD_EVENT: '/addevent',
  COPY_EVENT: '/copy',
  NOTIFICATIONS: '/notifications',
  LIST: '/list',

  PROFILE: {
    INDEX: '/profile',
    EDIT: '/profile/edit',
    DELETED: '/profile/deleted',
    MY_EVENTS: '/profile/my-events',
    DETAIL: (id: string | number) => `/profile/${id}`,
  },

  EVENT: {
    DETAIL: (id: string | number) => `/events/${id}`,
  },

  NOT_FOUND: '*',
} as const;
