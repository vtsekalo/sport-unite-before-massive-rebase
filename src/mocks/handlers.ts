import { HttpResponse, delay, http } from 'msw';

import { ApiEndpoints } from '@shared/api';
import {
  EventScope,
  EventSearchRequest,
  EventStatus,
  GenderVariant,
  IEvent,
  INotification,
  IUserProfile,
  StatusNotification,
  UserRole,
  UserStatusVariant,
} from '@shared/lib';

// --- СОСТОЯНИЕ МОКОВ (DB) ---
const currentProfile: IUserProfile = {
  id: 'user-123',
  nickname: 'Ivanov',
  email: 'ivanov@example.com',
  emailVerified: true,
  dateOfBirth: '1994-05-25',
  userStatus: UserStatusVariant.ACTIVE,
  firstName: 'Иван',
  lastName: 'Иванов',
  city: 'Москва',
  gender: GenderVariant.MALE,
  biography: 'Frontend dev',
  profilePicture: null,
  averageRating: 4.5,
  interests: ['Спорт'],
};

const mockEvents: IEvent[] = [
  {
    eventId: 'e1',
    eventName: 'Турнир по футболу 5х5',
    eventType: 'Футбол',
    eventStatus: EventStatus.PLANNED,
    eventStartDate: '2026-06-01T10:00:00Z',
    eventEndDate: '2026-06-01T12:00:00Z',
    countUsers: 10,
    eventDescription: 'Собираемся на стадионе Динамо. Уровень средний.',
    eventPhoto: 'https://picsum.photos',
    eventLocation: 'ул. Льва Яшина, 5, Москва',
    coordinates: { latitude: 55.7915, longitude: 37.5598 },
    users: [
      {
        userId: 'user-123',
        nickName: 'Ivanov',
        userRole: UserRole.organizer,
        urlUserPhoto: null,
      },
    ],
  },
  {
    eventId: 'e2',
    eventName: 'Забег в парке',
    eventType: 'Бег',
    eventStatus: EventStatus.PLANNED,
    eventStartDate: '2026-06-05T08:00:00Z',
    eventEndDate: '2026-06-05T09:30:00Z',
    countUsers: 50,
    eventDescription: 'Утренняя пробежка 5км. Ждем всех желающих!',
    eventPhoto: 'https://picsum.photos',
    eventLocation: 'Парк Горького, центральный вход',
    coordinates: { latitude: 55.728, longitude: 37.601 },
    users: [
      {
        userId: 'user-456',
        nickName: 'Runner',
        userRole: UserRole.organizer,
        urlUserPhoto: null,
      },
    ],
  },
  {
    eventId: 'e3',
    eventName: 'Баскетбольный Баскетбол',
    eventType: 'Баскетбол',
    eventStatus: EventStatus.IN_PROCESS,
    eventStartDate: '2026-06-10T15:00:00Z',
    eventEndDate: '2026-06-10T20:00:00Z',
    countUsers: 30,
    eventDescription: 'Соревнования по Баскетболу. Призы от спонсоров.',
    eventPhoto: 'https://picsum.photos',
    eventLocation: 'Скейт-парк Садовники',
    coordinates: { latitude: 55.662, longitude: 37.658 },
    users: [
      {
        userId: 'user-789',
        nickName: '@Skater',
        userRole: UserRole.organizer,
        urlUserPhoto: null,
      },
    ],
  },
  {
    eventId: 'e4',
    eventName: 'Товарищеский матч на Красной площади',
    eventType: 'Футбол',
    eventStatus: EventStatus.PLANNED,
    eventStartDate: '2026-06-15T19:00:00Z',
    eventEndDate: '2026-06-15T21:00:00Z',
    countUsers: 10,
    eventDescription:
      'Центрее не бывает! Играем прямо у Кремля. Берем с собой хорошее настроение.',
    eventPhoto: 'https://picsum.photos',
    eventLocation: 'Красная площадь, Москва',
    coordinates: { latitude: 55.7522, longitude: 37.6156 },
    users: [
      {
        userId: 'user-123',
        nickName: '@Ivanov',
        userRole: UserRole.organizer,
        urlUserPhoto: null,
      },
    ],
  },
  {
    eventId: 'e5',
    eventName: 'Мини-футбол у Патриарших прудов',
    eventType: 'Футбол',
    eventStatus: EventStatus.PLANNED,
    eventStartDate: '2026-06-18T18:30:00Z',
    eventEndDate: '2026-06-18T20:00:00Z',
    countUsers: 8,
    eventDescription:
      'Небольшой матч 4х4, поле маленькое. После игры можно посидеть у пруда.',
    eventPhoto: 'https://picsum.photos',
    eventLocation: 'Патриаршие пруды, Москва',
    coordinates: { latitude: 55.766, longitude: 37.595 },
    users: [
      {
        userId: 'user-123',
        nickName: '@Ivanov',
        userRole: UserRole.organizer,
        urlUserPhoto: null,
      },
    ],
  },
];

let notifications: INotification[] = [
  {
    messageId: 'n1',
    eventId: 'e1',
    eventName: 'Футбол 5х5',
    eventType: 'Футбол',
    eventUrl: '/events/e1',
    userRole: UserRole.participant,
    createdAtNotif: new Date().toISOString(),
    statusNotif: StatusNotification.new,
    titleNotif: 'Вас пригласили',
    bodyNotif: 'Приходите играть!',
  },
];

// --- HANDLERS ---
export const handlers = [
  // ПОИСК СОБЫТИЙ (POST)
  http.post(ApiEndpoints.EVENTS_SEARCH, async ({ request }) => {
    const filters = (await request.json()) as EventSearchRequest;
    await delay(500);

    let filtered = [...mockEvents];

    if (filters.eventTypes?.length) {
      filtered = filtered.filter((e) =>
        filters.eventTypes?.includes(e.eventType),
      );
    }
    if (filters.eventStatuses?.length) {
      filtered = filtered.filter((e) =>
        filters.eventStatuses.includes(e.eventStatus),
      );
    }
    if (filters.scope === EventScope.ORGANIZER) {
      filtered = filtered.filter(
        (e) => e.users[0]?.userId === currentProfile.id,
      );
    }

    return HttpResponse.json(filtered);
  }),

  // ТИПЫ СОБЫТИЙ
  http.get(ApiEndpoints.EVENTS_TYPES, () => {
    return HttpResponse.json([
      { typeId: 1, typeName: 'Футбол' },
      { typeId: 2, typeName: 'Баскетбол' },
      { typeId: 3, typeName: 'Теннис' },
      { typeId: 4, typeName: 'Бег' },
      { typeId: 5, typeName: 'Скейтбординг' },
      { typeId: 6, typeName: 'BMX' },
      { typeId: 7, typeName: 'Роллер-спорт' },
      { typeId: 8, typeName: 'Велоспорт' },
      { typeId: 9, typeName: 'Сноубординг' },
    ]);
  }),

  // СОБЫТИЕ ПО ID
  http.get(`${ApiEndpoints.EVENT_BY_ID}/:id`, ({ params }) => {
    const event = mockEvents.find((e) => e.eventId === params.id);
    return event
      ? HttpResponse.json(event)
      : new HttpResponse(null, { status: 404 });
  }),

  // ПРОФИЛЬ (Используем API_PATHS.USER_SERVICE из твоих констант)
  http.get(ApiEndpoints.GET_MY_USER, () => {
    return HttpResponse.json(currentProfile);
  }),

  // УВЕДОМЛЕНИЯ: СПИСОК
  http.patch(ApiEndpoints.GET_NOTIFICATIONS, () => {
    return HttpResponse.json(notifications);
  }),

  // УВЕДОМЛЕНИЯ: СЧЕТЧИК
  http.get(ApiEndpoints.GET_COUNT_NOTIFICATIONS, () => {
    const unread = notifications.filter(
      (n) => n.statusNotif === StatusNotification.new,
    ).length;
    return HttpResponse.json({
      countAllActualMessages: notifications.length,
      countReadMessages: notifications.length - unread,
    });
  }),

  // УВЕДОМЛЕНИЯ: ПРОЧИТАТЬ
  http.post(ApiEndpoints.MARK_AS_READ_NOTIFICATIONS, async ({ request }) => {
    const { messageIds } = (await request.json()) as { messageIds: string[] };
    notifications = notifications.map((n) =>
      messageIds.includes(n.messageId)
        ? { ...n, statusNotif: StatusNotification.read }
        : n,
    );
    return new HttpResponse(null, { status: 200 });
  }),

  // ЧАТЫ
  http.get(ApiEndpoints.USER_CHATS, () => {
    return HttpResponse.json([]);
  }),
];
