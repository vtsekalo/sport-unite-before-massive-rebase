import * as yup from 'yup';

const NICKNAME_REGEX = /^[A-Za-zА-Яа-яЁё0-9_]+$/;
const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d\S]{8,32}$/;
const CITY_REGEX = /^[A-Za-zА-Яа-яЁё\s-]*$/;
const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

export const registrationSchema = yup.object({
  nickname: yup
    .string()
    .trim()
    .required('Введите никнейм')
    .min(3, 'Минимум 3 символа')
    .max(32, 'Максимум 32 символа')
    .matches(NICKNAME_REGEX, 'Недопустимые символы в никнейме'),

  email: yup
    .string()
    .trim()
    .required('Введите email')
    .email('Некорректный email'),

  password: yup
    .string()
    .required('Введите пароль')
    .matches(
      PASSWORD_REGEX,
      'Пароль должен содержать минимум 8 символов, включая заглавную букву и цифру.',
    ),

  confirmPassword: yup
    .string()
    .required('Подтвердите пароль')
    .oneOf([yup.ref('password')], 'Пароли не совпадают'),

  dateOfBirth: yup
    .string()
    .required('Укажите дату рождения')
    .matches(DATE_REGEX, 'Дата рождения указана неверно')
    .test('age', 'Возраст должен быть от 14 до 80 лет', (value) => {
      if (!value) return false;
      const birthDate = new Date(value);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }
      return age >= 14 && age <= 80;
    }),

  city: yup
    .string()
    .trim()
    .optional()
    .matches(CITY_REGEX, 'Название города содержит недопустимые символы'),

  agree: yup.boolean().oneOf([true], 'Необходимо согласиться с условиями'),
});

export type RegistrationFormData = yup.InferType<typeof registrationSchema>;
