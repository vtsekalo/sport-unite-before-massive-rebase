import { HttpResponse, http } from 'msw';

import {
  EventSearchRequest,
  EventSearchResponse,
  IEventType,
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
  interestIds: [1, 2],
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

    const allEvents = [
      {
        eventId: 'EVT00001',
        eventName: 'Новогодний утренний бег',
        eventType: 'Бег',
        eventStartDate: '2025-12-01T09:00:00Z',
        eventEndDate: '2025-12-01T11:00:00Z',
        eventDescription:
          'Приглашаем всех на утренний бег по зимнему парку. Дистанция 5км и 10км на выбор.',
        eventPhoto: 'https://cdn.example.com/events/running1.jpg',
        coordinates: { latitude: 55.7558, longitude: 37.6173 },
        countUsers: 50,
        users: [
          {
            keycloakUserId: 'u-1001',
            nickname: 'Алексей Бегов',
            role: 'organizer',
            userMainPhoto: 'https://cdn.example.com/users/u01.jpg',
          },
        ],
      },
      {
        eventId: 'EVT00002',
        eventName: 'Зимний футбольный матч',
        eventType: 'Футбол',
        eventStartDate: '2025-12-05T18:00:00Z',
        eventEndDate: '2025-12-05T20:00:00Z',
        eventDescription:
          'Товарищеский матч на крытом поле. Форма и бутсы обязательны.',
        eventPhoto: 'https://cdn.example.com/events/football1.jpg',
        coordinates: { latitude: 55.7517, longitude: 37.6178 },
        countUsers: 22,
        users: [
          {
            keycloakUserId: 'u-1002',
            nickname: 'Сергей Футболов',
            role: 'organizer',
            userMainPhoto: 'https://cdn.example.com/users/u02.jpg',
          },
        ],
      },
      {
        eventId: 'EVT00003',
        eventName: 'Предновогодний марафон',
        eventType: 'Бег',
        eventStartDate: '2025-12-10T14:30:00Z',
        eventEndDate: '2025-12-10T17:30:00Z',
        eventDescription:
          'Годовой марафон 42км по живописному маршруту города.',
        eventPhoto: 'https://cdn.example.com/events/marathon1.jpg',
        coordinates: { latitude: 55.7601, longitude: 37.6175 },
        countUsers: 100,
        users: [
          {
            keycloakUserId: 'u-1003',
            nickname: 'Мария Марафон',
            role: 'organizer',
            userMainPhoto: 'https://cdn.example.com/users/u03.jpg',
          },
        ],
      },
      {
        eventId: 'EVT00004',
        eventName: 'Зимний велопробег',
        eventType: 'Велоспорт',
        eventStartDate: '2025-12-07T12:00:00Z',
        eventEndDate: '2025-12-07T15:00:00Z',
        eventDescription:
          'Велопрогулка по заснеженным паркам. Горные велосипеды приветствуются.',
        coordinates: { latitude: 55.7539, longitude: 37.6208 },
        countUsers: 30,
        users: [
          {
            keycloakUserId: 'u-1004',
            nickname: 'Дмитрий Велосипедов',
            role: 'organizer',
            userMainPhoto: 'https://cdn.example.com/users/u04.jpg',
          },
        ],
      },
      {
        eventId: 'EVT00005',
        eventName: 'Закрытый теннисный турнир',
        eventType: 'Теннис',
        eventStartDate: '2025-12-15T16:00:00Z',
        eventEndDate: '2025-12-15T19:00:00Z',
        eventDescription: 'Ежегодный зимний теннисный турнир в крытом корте.',
        eventPhoto: 'https://cdn.example.com/events/tennis1.jpg',
        coordinates: { latitude: 55.758, longitude: 37.6162 },
        countUsers: 16,
        users: [
          {
            keycloakUserId: 'u-1005',
            nickname: 'Анна Теннисова',
            role: 'organizer',
            userMainPhoto: 'https://cdn.example.com/users/u05.jpg',
          },
        ],
      },
      {
        eventId: 'EVT00006',
        eventName: 'Рождественский футбол',
        eventType: 'Футбол',
        eventStartDate: '2025-12-20T19:30:00Z',
        eventEndDate: '2025-12-20T21:30:00Z',
        eventDescription:
          'Футбольный матч в рождественской атмосфере с горячими напитками.',
        coordinates: { latitude: 55.7492, longitude: 37.6185 },
        countUsers: 24,
        users: [
          {
            keycloakUserId: 'u-1006',
            nickname: 'Петр Футбольный',
            role: 'organizer',
            userMainPhoto: 'https://cdn.example.com/users/u06.jpg',
          },
        ],
      },
      {
        eventId: 'EVT00007',
        eventName: 'Рождественский забег',
        eventType: 'Бег',
        eventStartDate: '2025-12-25T10:00:00Z',
        eventEndDate: '2025-12-25T12:00:00Z',
        eventDescription:
          'Семейный забег в рождественских костюмах. Призы для всех участников!',
        eventPhoto: 'https://cdn.example.com/events/christmas_run.jpg',
        coordinates: { latitude: 55.7634, longitude: 37.6191 },
        countUsers: 200,
        users: [
          {
            keycloakUserId: 'u-1007',
            nickname: 'Ольга Рождественская',
            role: 'organizer',
            userMainPhoto: 'https://cdn.example.com/users/u07.jpg',
          },
        ],
      },
      {
        eventId: 'EVT00008',
        eventName: 'Зимний баскетбол',
        eventType: 'Баскетбол',
        eventStartDate: '2025-12-12T17:00:00Z',
        eventEndDate: '2025-12-12T19:00:00Z',
        eventDescription:
          'Баскетбольная тренировка в спортивном зале для всех уровней подготовки.',
        eventPhoto: 'https://cdn.example.com/events/basketball1.jpg',
        coordinates: { latitude: 55.7573, longitude: 37.6215 },
        countUsers: 20,
        users: [
          {
            keycloakUserId: 'u-1008',
            nickname: 'Иван Баскетболов',
            role: 'organizer',
            userMainPhoto: 'https://cdn.example.com/users/u08.jpg',
          },
        ],
      },
      {
        eventId: 'EVT00009',
        eventName: 'Новогодние заплывы',
        eventType: 'Плавание',
        eventStartDate: '2025-12-28T11:00:00Z',
        eventEndDate: '2025-12-28T13:00:00Z',
        eventDescription:
          'Соревнования по плаванию в 25-метровом бассейне. Дистанции 50м и 100м.',
        coordinates: { latitude: 55.7527, longitude: 37.6223 },
        countUsers: 40,
        users: [
          {
            keycloakUserId: 'u-1009',
            nickname: 'Екатерина Плавалова',
            role: 'organizer',
            userMainPhoto: 'https://cdn.example.com/users/u09.jpg',
          },
        ],
      },
      {
        eventId: 'EVT00010',
        eventName: 'Прощальный матч года',
        eventType: 'Футбол',
        eventStartDate: '2025-12-31T15:00:00Z',
        eventEndDate: '2025-12-31T17:00:00Z',
        eventDescription:
          'Последний футбольный матч уходящего года с фейерверком в финале.',
        eventPhoto: 'https://cdn.example.com/events/newyear_football.jpg',
        coordinates: { latitude: 55.7544, longitude: 37.6158 },
        countUsers: 26,
        users: [
          {
            keycloakUserId: 'u-1010',
            nickname: 'Николай Новогодний',
            role: 'organizer',
            userMainPhoto: 'https://cdn.example.com/users/u10.jpg',
          },
        ],
      },
    ];

    const transformedEvents = allEvents.map((event) => ({
      eventId: event.eventId,
      userId: event.users[0]?.keycloakUserId || 'default-user',
      eventName: event.eventName,
      eventType: event.eventType,
      eventStartDateTime: event.eventStartDate,
      eventDescription: event.eventDescription,
      eventPhoto: event.eventPhoto || '',
      userRole: true,
      coordinates: event.coordinates,
    }));

    let filteredEvents = transformedEvents;

    if (filters.eventTypes && filters.eventTypes.length > 0) {
      filteredEvents = filteredEvents.filter((event) =>
        filters.eventTypes!.includes(event.eventType),
      );
    }

    if (filters.eventStartDateTime) {
      const filterDate = new Date(filters.eventStartDateTime);
      filteredEvents = filteredEvents.filter((event) => {
        const eventDate = new Date(event.eventStartDateTime);
        return eventDate >= filterDate;
      });
    }

    const mockResponse: EventSearchResponse = {
      events: filteredEvents,
    };

    await new Promise((resolve) => setTimeout(resolve, 500));
    return HttpResponse.json(mockResponse);
  }),
  http.get('*/api/v1/events/types', async () => {
    console.log('[MSW] Mock: /api/v1/events/types');
    const mockSportTypes: IEventType[] = [
      { typeId: 1, typeName: 'Футбол' },
      { typeId: 2, typeName: 'Баскетбол' },
      { typeId: 3, typeName: 'Теннис' },
      { typeId: 4, typeName: 'Бег' },
      { typeId: 5, typeName: 'Плавание' },
    ];
    await new Promise((resolve) => setTimeout(resolve, 500));
    return HttpResponse.json(mockSportTypes);
  }),
];
