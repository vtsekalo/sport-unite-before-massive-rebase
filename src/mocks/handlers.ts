import { HttpResponse, http } from 'msw';

export const handlers = [
  http.get('/api/v1/users/:id', ({ params }) => {
    const { id } = params;
    console.log('[MSW] intercepted user request', id);

    return HttpResponse.json({
      id,
      nickname: '@Ivanov',
      email: 'ivanov@example.com',
      dateOfBirth: '1994-05-25',
      userStatus: 'ACTIVE',
      firstName: 'Иван',
      lastName: 'Иванов',
      city: 'Nabereznie Chelny, Russian Federation',
      gender: 'MALE',
      biography: 'Люблю бегать',
      profilePicture: null,
      averageRating: 4.5,
      interests: [],
    });
  }),
];
