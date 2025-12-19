import { IEventWithCoordinates } from '@shared/lib';
import { EventStatus } from '@shared/lib';
import { basketballLogo, footballLogo, volleyballLogo } from '@shared/ui/icons';

export const sportIconMap: Record<string, string> = {
  FOOTBALL: footballLogo,
  BASKETBALL: basketballLogo,
  VOLLEYBALL: volleyballLogo,
};

export const sportNameMap: Record<string, string> = {
  FOOTBALL: 'Футбол',
  BASKETBALL: 'Баскетбол',
  VOLLEYBALL: 'Волейбол',
};

export const mockEvents: IEventWithCoordinates[] = [
  {
    eventId: '1',
    eventName: 'Мини-футбол',
    eventType: 'FOOTBALL',
    eventStatus: EventStatus.PLANNED,
    eventStartDate: '2025-06-24T10:00:00',
    eventEndDate: '2025-06-24T12:00:00',
    countUsers: 3,
    eventLocation: 'Футбольное поле "Планета спорт"',
    eventDescription:
      'Футбол представляет хорошие условия в качестве аэробной тренировки, которая увеличивает срок выносливости, положительно влияет на сердечно-сосудистую систему.',
    eventPhoto: null,
    coords: [37.618423, 55.751244],
    users: [
      { userCode: 'user1', nickname: 'Алексей', urlUserPhoto: null },
      { userCode: 'user2', nickname: 'Михаил', urlUserPhoto: null },
      { userCode: 'user3', nickname: 'Дмитрий', urlUserPhoto: null },
    ],
  },

  {
    eventId: '2',
    eventName: 'Баскетбол 3×3',
    eventType: 'BASKETBALL',
    eventStatus: EventStatus.PLANNED,
    eventStartDate: '2025-06-25T14:00:00',
    eventEndDate: '2025-06-25T16:00:00',
    countUsers: 4,
    eventLocation: 'Спортивная площадка "Центральный парк"',
    eventDescription:
      'Стритбол на открытой площадке. Формат игры 3 на 3, приглашаем всех желающих! Уровень подготовки - любой. Главное желание играть и хорошее настроение.',
    eventPhoto: null,
    coords: [37.6173, 55.755826],
    users: [
      { userCode: 'user4', nickname: 'Игорь', urlUserPhoto: null },
      { userCode: 'user5', nickname: 'Сергей', urlUserPhoto: null },
      { userCode: 'user6', nickname: 'Андрей', urlUserPhoto: null },
      { userCode: 'user7', nickname: 'Павел', urlUserPhoto: null },
    ],
  },

  {
    eventId: '3',
    eventName: 'Волейбол на пляже',
    eventType: 'VOLLEYBALL',
    eventStatus: EventStatus.PLANNED,
    eventStartDate: '2025-06-26T18:00:00',
    eventEndDate: '2025-06-26T20:00:00',
    countUsers: 5,
    eventLocation: 'Пляж "Серебряный бор"',
    eventDescription:
      'Пляжный волейбол для всех желающих! Играем на песчаной площадке с сеткой стандартной высоты. Формат: 2 на 2 или 3 на 3, в зависимости от количества участников.',
    eventPhoto: null,
    coords: [37.621108, 55.748663],
    users: [
      { userCode: 'user8', nickname: 'Елена', urlUserPhoto: null },
      { userCode: 'user9', nickname: 'Ольга', urlUserPhoto: null },
      { userCode: 'user10', nickname: 'Максим', urlUserPhoto: null },
      { userCode: 'user11', nickname: 'Владимир', urlUserPhoto: null },
      { userCode: 'user12', nickname: 'Анна', urlUserPhoto: null },
    ],
  },
];
