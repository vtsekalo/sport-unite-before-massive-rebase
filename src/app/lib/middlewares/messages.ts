export enum StatusCodes {
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  Conflict = 409,
  InternalServerError = 500,
  ServiceUnavailable = 503,
}

export const StatusMessages = {
  401: 'Вы не авторизованы',
  403: 'У вас нет доступа к этому ресурсу',
};

export const EndPointsMessages = {
  registration: {
    400: 'Некорректные данные. Проверьте введённую информацию',
    409: 'Пользователь с таким email уже существует',
    0: 'Нет соединения с сервером. Проверьте интернет',
    500: 'Ошибка регистрации',
  },
  getChatMessages: {
    404: 'Информация о чате не найдена',
  },
} as const satisfies Record<string, Partial<Record<number, string>>>;
