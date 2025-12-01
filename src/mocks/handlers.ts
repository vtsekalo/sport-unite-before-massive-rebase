import { HttpResponse, http } from 'msw';

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
  // Теперь слушаем полный путь как в реальном API
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
];
