import { HttpResponse, http } from 'msw';

import {
  EventSearchRequest,
  EventStatus,
  IEvent,
  IEventType,
  UserRole,
} from '@shared/lib';
import { GenderVariant, IUserProfile, UserStatusVariant } from '@shared/lib';

let currentProfile: IUserProfile = {
  id: '1',
  nickname: '@Ivanov',
  email: 'ivanov@example.com',
  emailVerified: false,
  dateOfBirth: '1994-05-25',
  userStatus: UserStatusVariant.ACTIVE,
  firstName: 'Иван',
  lastName: 'Иванов',
  city: 'Nabereznie Chelny, Russian Federation',
  gender: GenderVariant.MALE,
  biography: 'Супер работник',
  profilePicture: null,
  averageRating: 4.5,
  interests: ['Люблю бегать'],
};

const fileToDataURL = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const handlers = [
  http.get('/user-service/api/v1/users/me', () => {
    console.log('[MSW] Mock: GET /user-service/api/v1/users/me');
    return HttpResponse.json(currentProfile);
  }),

  http.patch(
    '/user-service/api/v1/users/update-profile-text',
    async ({ request }) => {
      console.log(
        '[MSW] Mock: PATCH /user-service/api/v1/users/update-profile-text',
      );

      try {
        const updatedFields = (await request.json()) as Partial<IUserProfile>;
        console.log('[MSW] Received JSON data for text update:', updatedFields);

        currentProfile = {
          ...currentProfile,
          ...updatedFields,
          profilePicture: currentProfile.profilePicture,
        };

        console.log('[MSW] Profile text updated:', {
          ...currentProfile,
          profilePicture: currentProfile.profilePicture
            ? 'Data URL (preserved)'
            : null,
        });

        return HttpResponse.json(currentProfile);
      } catch (error) {
        console.error(
          '[MSW] Error in PATCH /user-service/api/v1/users/update-profile-text:',
          error,
        );

        return HttpResponse.json(
          {
            message: 'Invalid request body',
            timestamp: new Date().toISOString(),
          },
          { status: 400 },
        );
      }
    },
  ),

  http.patch(
    '/user-service/api/v1/users/update-profile-avatar',
    async ({ request }) => {
      console.log(
        '[MSW] Mock: PATCH /user-service/api/v1/users/update-profile-avatar',
      );

      try {
        const formData = await request.formData();
        const profilePicture = formData.get('profilePicture');

        console.log(
          '[MSW] Profile picture field for avatar update:',
          profilePicture,
        );

        if (profilePicture instanceof File && profilePicture.size > 0) {
          try {
            console.log(
              `[MSW] Processing profile picture file: ${profilePicture.name}, ${profilePicture.size} bytes`,
            );
            currentProfile.profilePicture = await fileToDataURL(profilePicture);
            console.log('[MSW] Profile picture converted to Data URL');
          } catch (error) {
            console.error(
              '[MSW] Error processing profile picture file:',
              error,
            );
            return HttpResponse.json(
              {
                message: 'Error processing profile picture file',
                timestamp: new Date().toISOString(),
              },
              { status: 400 },
            );
          }
        } else if (profilePicture === '') {
          console.log('[MSW] Profile picture removed (explicit empty string)');
          currentProfile.profilePicture = null;
        } else {
          console.log('[MSW] No changes to profile picture');
        }

        console.log('[MSW] Profile avatar updated:', {
          ...currentProfile,
          profilePicture: currentProfile.profilePicture
            ? 'Data URL (updated)'
            : null,
        });

        return HttpResponse.json(currentProfile);
      } catch (error) {
        console.error(
          '[MSW] Error in PATCH /user-service/api/v1/users/update-profile-avatar:',
          error,
        );

        return HttpResponse.json(
          {
            message: 'Invalid request body',
            timestamp: new Date().toISOString(),
          },
          { status: 400 },
        );
      }
    },
  ),

  http.patch(
    '/user-service/api/v1/users/updateMyProfile',
    async ({ request }) => {
      console.log(
        '[MSW] Mock: PATCH /user-service/api/v1/users/updateMyProfile (legacy)',
      );

      try {
        const contentType = request.headers.get('content-type') || '';

        if (contentType.includes('multipart/form-data')) {
          const formData = await request.formData();
          const updatedFields: Partial<IUserProfile> = {};

          const stringFields = [
            'nickname',
            'dateOfBirth',
            'city',
            'biography',
            'email',
          ] as const;

          stringFields.forEach((field) => {
            const value = formData.get(field);
            if (typeof value === 'string') {
              updatedFields[field] = value;
            }
          });

          const gender = formData.get('gender');
          if (
            typeof gender === 'string' &&
            Object.values(GenderVariant).includes(gender as GenderVariant)
          ) {
            updatedFields.gender = gender as GenderVariant;
          }

          const interests = formData.get('interests');
          if (typeof interests === 'string') {
            updatedFields.interests = interests
              .split(',')
              .map((s) => s.trim())
              .filter(Boolean);
          }

          const profilePicture = formData.get('profilePicture');

          if (profilePicture instanceof File && profilePicture.size > 0) {
            updatedFields.profilePicture = await fileToDataURL(profilePicture);
          } else if (profilePicture === '') {
            updatedFields.profilePicture = null;
          }

          currentProfile = {
            ...currentProfile,
            ...updatedFields,
          };
        } else {
          const updatedFields = (await request.json()) as Partial<IUserProfile>;
          currentProfile = {
            ...currentProfile,
            ...updatedFields,
          };
        }

        return HttpResponse.json(currentProfile);
      } catch (error) {
        console.error(
          '[MSW] Error in legacy PATCH /user-service/api/v1/users/updateMyProfile:',
          error,
        );

        return HttpResponse.json(
          {
            message: 'Invalid request body',
            timestamp: new Date().toISOString(),
          },
          { status: 400 },
        );
      }
    },
  ),

  http.get('/user-service/api/v1/auth/check', () => {
    return HttpResponse.json({ authenticated: true });
  }),

  http.post('*/api/v1/events/search', async ({ request }) => {
    const filters = (await request.json()) as EventSearchRequest;

    console.log('[MSW] Mock: /api/v1/events/search', filters);

    const events: IEvent[] = [
      {
        eventId: '12345677fse',
        eventName: 'Баскетбол:московская лига',
        eventLocation: 'г. Москва, ул. Ленина, 5, на входе',
        eventType: 'Баскетбол',
        eventStatus: EventStatus.PLANNED,
        eventStartDate: '2026-09-24T11:30:00Z',
        eventEndDate: '2026-09-24T14:00:00Z',
        countUsers: 12,
        eventDescription:
          "Баскетбол — это командная спортивная игра, популярная во всем мире, в которой две команды по пять игроков пытаются забросить мяч руками в кольцо (корзину) соперника. Название игры происходит от английских слов 'basket' (корзина) и 'ball' (мяч). Баскетбол развивает координацию, выносливость и командный дух, поэтому его часто включают в программы физической подготовки.",
        eventPhoto: 'https://example.com/events/EVT-2077-099/photo.png',
        coordinates: {
          latitude: 55.7558,
          longitude: 37.6173,
        },
        users: [
          {
            userId: '7b21a8f2-2dcd-489b-9d2d-f43a67e98a1e',
            nickName: 'nick1989',
            userRole: UserRole.ORGANIZER,
            urlUserPhoto: 'https://example.com/events/EVT-2025-002/photo.png',
          },
        ],
      },
      {
        eventId: '12345678abc',
        eventName: 'Футбол: Московская лига',
        eventLocation: "г. Москва, Стадион 'Лужники', Северная трибуна",
        eventType: 'Футбол',
        eventStatus: EventStatus.PLANNED,
        eventStartDate: '2026-09-25T18:00:00Z',
        eventEndDate: '2026-09-25T20:00:00Z',
        countUsers: 22,
        eventDescription:
          "Футбол — это командная спортивная игра, популярная во всем мире, в которой две команды по одиннадцать игроков пытаются забить мяч ногами или другими частями тела (кроме рук) в ворота соперника. Название игры происходит от английских слов 'foot' (нога) и 'ball' (мяч). Футбол развивает скорость, выносливость, координацию и командную тактику, поэтому он считается самым популярным видом спорта на планете и включен в программу физического воспитания во многих странах.",
        eventPhoto: 'https://example.com/events/EVT-2077-100/photo.png',
        coordinates: {
          latitude: 55.7587,
          longitude: 37.6192,
        },
        users: [
          {
            userId: '8c31b9g3-3ede-590c-0e3e-g54b78h09b2f',
            nickName: 'capitan2024',
            userRole: UserRole.ORGANIZER,
            urlUserPhoto: 'https://example.com/avatars/capitan2024.png',
          },
        ],
      },
      {
        eventId: 'EVT00001',
        eventName: 'Новогодний утренний бег',
        eventLocation: 'Центральный парк, Москва',
        eventType: 'Бег',
        eventStatus: EventStatus.PLANNED,
        eventStartDate: '2026-12-01T09:00:00Z',
        eventEndDate: '2026-12-01T11:00:00Z',
        countUsers: 50,
        eventDescription:
          'Приглашаем всех на утренний бег по зимнему парку. Дистанция 5км и 10км на выбор.',
        eventPhoto: 'https://cdn.example.com/events/running1.jpg',
        coordinates: {
          latitude: 55.7558,
          longitude: 37.6173,
        },
        users: [
          {
            userId: 'u-1001',
            nickName: 'Алексей Бегов',
            userRole: UserRole.ORGANIZER,
            urlUserPhoto: 'https://cdn.example.com/users/u01.jpg',
          },
        ],
      },
      {
        eventId: 'EVT00002',
        eventName: 'Зимний футбольный матч',
        eventLocation: "Стадион 'Спартак', Москва",
        eventType: 'Футбол',
        eventStatus: EventStatus.PLANNED,
        eventStartDate: '2026-12-05T18:00:00Z',
        eventEndDate: '2026-12-05T20:00:00Z',
        countUsers: 22,
        eventDescription:
          'Товарищеский матч на крытом поле. Форма и бутсы обязательны.',
        eventPhoto: 'https://cdn.example.com/events/football1.jpg',
        coordinates: {
          latitude: 55.7517,
          longitude: 37.6178,
        },
        users: [
          {
            userId: 'u-1002',
            nickName: 'Сергей Футболов',
            userRole: UserRole.ORGANIZER,
            urlUserPhoto: 'https://cdn.example.com/users/u02.jpg',
          },
        ],
      },
      {
        eventId: 'EVT00003',
        eventName: 'Предновогодний марафон',
        eventLocation: 'ВДНХ, Москва',
        eventType: 'Бег',
        eventStatus: EventStatus.PLANNED,
        eventStartDate: '2026-12-10T14:30:00Z',
        eventEndDate: '2026-12-10T17:30:00Z',
        countUsers: 100,
        eventDescription:
          'Годовой марафон 42км по живописному маршруту города.',
        eventPhoto: 'https://cdn.example.com/events/marathon1.jpg',
        coordinates: {
          latitude: 55.7601,
          longitude: 37.6175,
        },
        users: [
          {
            userId: 'u-1003',
            nickName: 'Мария Марафон',
            userRole: UserRole.ORGANIZER,
            urlUserPhoto: 'https://cdn.example.com/users/u03.jpg',
          },
        ],
      },
      {
        eventId: 'EVT00004',
        eventName: 'Зимний велопробег',
        eventLocation: 'Парк Горького, Москва',
        eventType: 'Велоспорт',
        eventStatus: EventStatus.PLANNED,
        eventStartDate: '2026-12-07T12:00:00Z',
        eventEndDate: '2026-12-07T15:00:00Z',
        countUsers: 30,
        eventDescription:
          'Велопрогулка по заснеженным паркам. Горные велосипеды приветствуются.',
        eventPhoto: 'https://cdn.example.com/events/cycling1.jpg',
        coordinates: {
          latitude: 55.7539,
          longitude: 37.6208,
        },
        users: [
          {
            userId: 'u-1004',
            nickName: 'Дмитрий Велосипедов',
            userRole: UserRole.ORGANIZER,
            urlUserPhoto: 'https://cdn.example.com/users/u04.jpg',
          },
        ],
      },
      {
        eventId: 'EVT00005',
        eventName: 'Закрытый теннисный турнир',
        eventLocation: "Теннисный клуб 'Чемпион', Москва",
        eventType: 'Теннис',
        eventStatus: EventStatus.PLANNED,
        eventStartDate: '2026-12-15T16:00:00Z',
        eventEndDate: '2026-12-15T19:00:00Z',
        countUsers: 16,
        eventDescription: 'Ежегодный зимний теннисный турнир в крытом корте.',
        eventPhoto: 'https://cdn.example.com/events/tennis1.jpg',
        coordinates: {
          latitude: 55.758,
          longitude: 37.6162,
        },
        users: [
          {
            userId: 'u-1005',
            nickName: 'Анна Теннисова',
            userRole: UserRole.ORGANIZER,
            urlUserPhoto: 'https://cdn.example.com/users/u05.jpg',
          },
        ],
      },
      {
        eventId: 'EVT00006',
        eventName: 'Рождественский футбол',
        eventLocation: "Футбольное поле 'Северное', Москва",
        eventType: 'Футбол',
        eventStatus: EventStatus.PLANNED,
        eventStartDate: '2026-12-20T19:30:00Z',
        eventEndDate: '2026-12-20T21:30:00Z',
        countUsers: 24,
        eventDescription:
          'Футбольный матч в рождественской атмосфере с горячими напитками.',
        eventPhoto: 'https://cdn.example.com/events/football2.jpg',
        coordinates: {
          latitude: 55.7492,
          longitude: 37.6185,
        },
        users: [
          {
            userId: 'u-1006',
            nickName: 'Петр Футбольный',
            userRole: UserRole.ORGANIZER,
            urlUserPhoto: 'https://cdn.example.com/users/u06.jpg',
          },
        ],
      },
      {
        eventId: 'EVT00007',
        eventName: 'Рождественский забег',
        eventLocation: 'Красная площадь, Москва',
        eventType: 'Бег',
        eventStatus: EventStatus.PLANNED,
        eventStartDate: '2026-12-25T10:00:00Z',
        eventEndDate: '2026-12-25T12:00:00Z',
        countUsers: 200,
        eventDescription:
          'Семейный забег в рождественских костюмах. Призы для всех участников!',
        eventPhoto: 'https://cdn.example.com/events/christmas_run.jpg',
        coordinates: {
          latitude: 55.7634,
          longitude: 37.6191,
        },
        users: [
          {
            userId: 'u-1007',
            nickName: 'Ольга Рождественская',
            userRole: UserRole.ORGANIZER,
            urlUserPhoto: 'https://cdn.example.com/users/u07.jpg',
          },
        ],
      },
      {
        eventId: 'EVT00008',
        eventName: 'Зимний баскетбол',
        eventLocation: "Спорткомплекс 'Олимпийский', Москва",
        eventType: 'Баскетбол',
        eventStatus: EventStatus.PLANNED,
        eventStartDate: '2026-12-12T17:00:00Z',
        eventEndDate: '2026-12-12T19:00:00Z',
        countUsers: 20,
        eventDescription:
          'Баскетбольная тренировка в спортивном зале для всех уровней подготовки.',
        eventPhoto: 'https://cdn.example.com/events/basketball1.jpg',
        coordinates: {
          latitude: 55.7573,
          longitude: 37.6215,
        },
        users: [
          {
            userId: 'u-1008',
            nickName: 'Иван Баскетболов',
            userRole: UserRole.ORGANIZER,
            urlUserPhoto: 'https://cdn.example.com/users/u08.jpg',
          },
        ],
      },
      {
        eventId: 'EVT00009',
        eventName: 'Новогодние заплывы',
        eventLocation: "Бассейн 'Чайка', Москва",
        eventType: 'Плавание',
        eventStatus: EventStatus.PLANNED,
        eventStartDate: '2026-12-28T11:00:00Z',
        eventEndDate: '2026-12-28T13:00:00Z',
        countUsers: 40,
        eventDescription:
          'Соревнования по плаванию в 25-метровом бассейне. Дистанции 50м и 100м.',
        eventPhoto: 'https://cdn.example.com/events/swimming1.jpg',
        coordinates: {
          latitude: 55.7527,
          longitude: 37.6223,
        },
        users: [
          {
            userId: 'u-1009',
            nickName: 'Екатерина Плавалова',
            userRole: UserRole.ORGANIZER,
            urlUserPhoto: 'https://cdn.example.com/users/u09.jpg',
          },
        ],
      },
      {
        eventId: 'EVT00010',
        eventName: 'Прощальный матч года',
        eventLocation: "Стадион 'Лужники', Москва",
        eventType: 'Футбол',
        eventStatus: EventStatus.PLANNED,
        eventStartDate: '2026-12-31T15:00:00Z',
        eventEndDate: '2026-12-31T17:00:00Z',
        countUsers: 26,
        eventDescription:
          'Последний футбольный матч уходящего года с фейерверком в финале.',
        eventPhoto: 'https://cdn.example.com/events/newyear_football.jpg',
        coordinates: {
          latitude: 55.7544,
          longitude: 37.6158,
        },
        users: [
          {
            userId: 'u-1010',
            nickName: 'Николай Новогодний',
            userRole: UserRole.ORGANIZER,
            urlUserPhoto: 'https://cdn.example.com/users/u10.jpg',
          },
        ],
      },
      // 5 новых событий
      {
        eventId: 'EVT00011',
        eventName: 'Волейбол на снегу',
        eventLocation: "Парк 'Сокольники', Москва",
        eventType: 'Волейбол',
        eventStatus: EventStatus.PLANNED,
        eventStartDate: '2026-12-02T14:00:00Z',
        eventEndDate: '2026-12-02T16:00:00Z',
        countUsers: 18,
        eventDescription:
          'Зимний волейбол на открытой площадке. Теплая спортивная форма обязательна!',
        eventPhoto: 'https://cdn.example.com/events/volleyball1.jpg',
        coordinates: {
          latitude: 55.7592,
          longitude: 37.6189,
        },
        users: [
          {
            userId: 'u-1011',
            nickName: 'Андрей Волейболов',
            userRole: UserRole.ORGANIZER,
            urlUserPhoto: 'https://cdn.example.com/users/u11.jpg',
          },
        ],
      },
      {
        eventId: 'EVT00012',
        eventName: 'Хоккей на льду',
        eventLocation: "Каток 'ВДНХ', Москва",
        eventType: 'Хоккей',
        eventStatus: EventStatus.PLANNED,
        eventStartDate: '2026-12-08T19:00:00Z',
        eventEndDate: '2026-12-08T21:00:00Z',
        countUsers: 14,
        eventDescription:
          'Товарищеский матч по хоккею на открытом катке. Коньки и клюшки приветствуются!',
        eventPhoto: 'https://cdn.example.com/events/hockey1.jpg',
        coordinates: {
          latitude: 55.7613,
          longitude: 37.6179,
        },
        users: [
          {
            userId: 'u-1012',
            nickName: 'Игорь Хоккеистов',
            userRole: UserRole.ORGANIZER,
            urlUserPhoto: 'https://cdn.example.com/users/u12.jpg',
          },
        ],
      },
      {
        eventId: 'EVT00013',
        eventName: 'Йога в парке',
        eventLocation: "Парк 'Зарядье', Москва",
        eventType: 'Йога',
        eventStatus: EventStatus.PLANNED,
        eventStartDate: '2026-12-03T08:00:00Z',
        eventEndDate: '2026-12-03T09:30:00Z',
        countUsers: 25,
        eventDescription:
          'Утренняя йога на свежем воздухе. Коврики приносите с собой. Подходит для всех уровней подготовки.',
        eventPhoto: 'https://cdn.example.com/events/yoga1.jpg',
        coordinates: {
          latitude: 55.7547,
          longitude: 37.6201,
        },
        users: [
          {
            userId: 'u-1013',
            nickName: 'Марина Йогина',
            userRole: UserRole.ORGANIZER,
            urlUserPhoto: 'https://cdn.example.com/users/u13.jpg',
          },
        ],
      },
      {
        eventId: 'EVT00014',
        eventName: 'Боксерский спарринг',
        eventLocation: "Спортзал 'Атлет', Москва",
        eventType: 'Бокс',
        eventStatus: EventStatus.PLANNED,
        eventStartDate: '2026-12-18T17:00:00Z',
        eventEndDate: '2026-12-18T19:00:00Z',
        countUsers: 8,
        eventDescription:
          'Тренировочные спарринги для боксеров начального и среднего уровня. Защитное снаряжение обязательно.',
        eventPhoto: 'https://cdn.example.com/events/boxing1.jpg',
        coordinates: {
          latitude: 55.7502,
          longitude: 37.6195,
        },
        users: [
          {
            userId: 'u-1014',
            nickName: 'Денис Боксеров',
            userRole: UserRole.ORGANIZER,
            urlUserPhoto: 'https://cdn.example.com/users/u14.jpg',
          },
        ],
      },
      {
        eventId: 'EVT00015',
        eventName: 'Скалолазание для начинающих',
        eventLocation: "Скалодром 'Вертикаль', Москва",
        eventType: 'Скалолазание',
        eventStatus: EventStatus.PLANNED,
        eventStartDate: '2026-12-22T12:00:00Z',
        eventEndDate: '2026-12-22T15:00:00Z',
        countUsers: 15,
        eventDescription:
          'Вводное занятие по скалолазанию для новичков. Все необходимое снаряжение предоставляется.',
        eventPhoto: 'https://cdn.example.com/events/climbing1.jpg',
        coordinates: {
          latitude: 55.7568,
          longitude: 37.6169,
        },
        users: [
          {
            userId: 'u-1015',
            nickName: 'Артем Скалолазов',
            userRole: UserRole.ORGANIZER,
            urlUserPhoto: 'https://cdn.example.com/users/u15.jpg',
          },
        ],
      },
    ];

    let filteredEvents = events;

    // Применяем фильтры
    if (filters.eventTypes && filters.eventTypes.length > 0) {
      filteredEvents = filteredEvents.filter((event) =>
        filters.eventTypes!.includes(event.eventType),
      );
    }

    if (filters.eventStartDateTime) {
      const filterDate = new Date(filters.eventStartDateTime);
      filteredEvents = filteredEvents.filter((event) => {
        const eventDate = new Date(event.eventStartDate);
        return eventDate >= filterDate;
      });
    }

    await new Promise((resolve) => setTimeout(resolve, 500));
    return HttpResponse.json(filteredEvents);
  }),

  http.get('*/api/v1/events/types', async () => {
    console.log('[MSW] Mock: /api/v1/events/types');
    const mockSportTypes: IEventType[] = [
      { typeId: 1, typeName: 'Футбол' },
      { typeId: 2, typeName: 'Баскетбол' },
      { typeId: 3, typeName: 'Теннис' },
      { typeId: 4, typeName: 'Бег' },
      { typeId: 5, typeName: 'Плавание' },
      { typeId: 6, typeName: 'Велоспорт' },
      { typeId: 7, typeName: 'Волейбол' },
      { typeId: 8, typeName: 'Хоккей' },
      { typeId: 9, typeName: 'Йога' },
      { typeId: 10, typeName: 'Бокс' },
      { typeId: 11, typeName: 'Скалолазание' },
    ];
    await new Promise((resolve) => setTimeout(resolve, 500));
    return HttpResponse.json(mockSportTypes);
  }),
];
