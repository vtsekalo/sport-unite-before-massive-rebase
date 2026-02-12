import dayjs from 'dayjs';
import * as yup from 'yup';

const NICKNAME_REGEX = /^[A-Za-z0-9._-]+$/;
const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*]{8,32}$/;
const CITY_REGEX = /^[А-Яа-яЁё\s-]*$/;

export const registrationSchema = yup.object({
  nickname: yup
    .string()
    .trim()
    .required('Обязательное поле!')
    .min(3, 'Никнейм должен содержать от 3 до 30 символов')
    .max(30, 'Никнейм должен содержать от 3 до 30 символов')
    .matches(NICKNAME_REGEX, 'Недопустимые символы в никнейме'),

  email: yup
    .string()
    .trim()
    .required('Обязательное поле!')
    .email('Некорректный email')
    .max(254, 'Максимум 254 символа'),

  password: yup
    .string()
    .required('Обязательное поле!')
    .min(3, 'Пароль должен содержать от 8 до 32 символов')
    .max(30, 'Пароль должен содержать от 8 до 32 символов')
    .matches(PASSWORD_REGEX, 'Ошибка: недопустимый пароль.'),

  confirmPassword: yup
    .string()
    .required('Обязательное поле')
    .oneOf(
      [yup.ref('password')],
      'Пароли не совпадают, пожалуйста, повторите ввод',
    ),

  dateOfBirth: yup
    .string()
    .required('Обязательное поле')
    .test('is-valid-date', 'Дата рождения указана неверно', (value) => {
      if (!value || value === 'invalid') return false;
      return dayjs(value).isValid();
    })
    .test(
      'age-check',
      'Возраст должен быть от 14 до 80 лет',
      (value, context) => {
        if (!value || value === 'invalid') return false;

        const birthDate = dayjs(value);
        const today = dayjs();

        const age = today.diff(birthDate, 'year');

        if (age < 14) {
          return context.createError({
            message: 'Регистрация доступна с 14 лет',
          });
        }
        if (age > 80) {
          return context.createError({
            message: 'Максимальный возраст для регистрации - 80 лет',
          });
        }

        return true;
      },
    ),

  city: yup
    .string()
    .trim()
    .nullable()
    .transform((value) => (value === '' ? null : value))
    .optional()
    .min(3, 'Название города должно содержать от 3 до 50 символов')
    .max(50, 'Название города должно содержать от 3 до 50 символов')
    .matches(CITY_REGEX, 'Название города содержит недопустимые символы'),

  agree: yup.boolean().oneOf([true], 'Обязательное поле!'),
});

export type RegistrationFormData = yup.InferType<typeof registrationSchema>;
