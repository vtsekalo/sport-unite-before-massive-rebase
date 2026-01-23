export const ROUTES = {
  HOME: '/',
  AUTH: '/auth',
  REGISTRATION: '/registration',
  SEND_EMAIL: '/send-email',
  TEST_PAGE: '/testPage',

  CHATS: {
    INDEX: '/chats',
    DETAIL: (id: string | number) => `/chats/${id}`,
  },

  ADD_EVENT: '/addevent',
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
