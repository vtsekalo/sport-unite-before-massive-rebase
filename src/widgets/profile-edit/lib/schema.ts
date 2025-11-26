import * as yup from 'yup';

import { FORM_LIMITS, PROFILE_PICTURE_VALIDATION } from './constants';

const NICKNAME_REGEX = /^[a-zA-Zа-яА-Я0-9_@-]+$/;

const profilePictureSchema = yup
  .mixed<File>()
  .nullable()
  .test(
    'fileType',
    'Пожалуйста, выберите файл в формате JPG или PNG',
    (value) => {
      if (!value) return true;
      const acceptedTypes =
        PROFILE_PICTURE_VALIDATION.ACCEPTED_TYPES as readonly string[];
      return acceptedTypes.includes(value.type);
    },
  )
  .test('fileSize', 'Размер файла не должен превышать 5 МБ', (value) => {
    if (!value) return true;
    return value.size <= PROFILE_PICTURE_VALIDATION.MAX_SIZE;
  });

export const profileEditSchema = yup.object({
  nickname: yup
    .string()
    .trim()
    .required('Никнейм обязателен')
    .min(2, 'Никнейм должен содержать минимум 2 символа')
    .max(FORM_LIMITS.NICKNAME, `Максимум ${FORM_LIMITS.NICKNAME} символов`)
    .matches(
      NICKNAME_REGEX,
      'Можно использовать только буквы, цифры, @ и подчеркивания',
    ),

  email: yup
    .string()
    .trim()
    .required('Email обязателен')
    .email('Введите корректный email'),

  dateOfBirth: yup
    .string()
    .required('Дата рождения обязательна')
    .test('valid-date', 'Введите корректную дату рождения', (value) => {
      if (!value) return false;
      const birthDate = new Date(value);
      const currentDate = new Date();
      const minDate = new Date('1895-01-01');

      return (
        !isNaN(birthDate.getTime()) &&
        birthDate <= currentDate &&
        birthDate >= minDate
      );
    }),

  gender: yup
    .string()
    .required('Пол обязателен')
    .oneOf(['MALE', 'FEMALE'], 'Выберите пол'),

  city: yup
    .string()
    .trim()
    .required('Город обязателен')
    .min(2, 'Город должен содержать минимум 2 символа')
    .max(FORM_LIMITS.CITY, `Максимум ${FORM_LIMITS.CITY} символов`),

  interests: yup
    .string()
    .max(FORM_LIMITS.INTERESTS, `Максимум ${FORM_LIMITS.INTERESTS} символов`),

  biography: yup
    .string()
    .max(FORM_LIMITS.BIOGRAPHY, `Максимум ${FORM_LIMITS.BIOGRAPHY} символов`),

  profilePicture: profilePictureSchema,
});

export type ProfileEditFormData = yup.InferType<typeof profileEditSchema>;
