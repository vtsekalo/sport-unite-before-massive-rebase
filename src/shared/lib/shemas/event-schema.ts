import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import * as yup from 'yup';

dayjs.extend(isBetween);

export const createEventSchema = yup.object({
  eventType: yup.string().required('Выберите тип события'),

  eventName: yup
    .string()
    .required('Введите название события')
    .min(3, 'Название должно содержать минимум 3 символа')
    .max(100, 'Название не должно превышать 100 символов'),

  eventLocation: yup
    .string()
    .required('Укажите место проведения')
    .min(3, 'Место проведения должно содержать минимум 3 символа'),

  eventStartDate: yup
    .string()
    .required('Укажите дату начала')
    .test(
      'min-future-datetime',
      'Событие должно начинаться в пределах 30 дней',
      (value) => {
        if (!value) return false;
        const eventDate = dayjs(value);
        const now = dayjs();
        return eventDate.isBetween(
          now.startOf('day'),
          now.add(30, 'day').endOf('day'),
          null,
          '[]',
        );
      },
    ),

  eventStartTime: yup
    .string()
    .required('Укажите время начала')
    .test(
      'min-future-datetime',
      'Событие должно начаться минимум через 1 час от текущего времени',
      (value, { parent }) => {
        if (!value || !parent.eventStartDate) return true;

        const eventDateTime = dayjs(`${parent.eventStartDate}T${value}`);
        const minDateTime = dayjs().add(1, 'hour');

        return (
          eventDateTime.isAfter(minDateTime) ||
          eventDateTime.isSame(minDateTime)
        );
      },
    ),

  eventEndTime: yup
    .string()
    .required('Укажите время окончания')
    .test(
      'min-1-hour',
      'Время окончания должно быть как минимум на 1 час позже времени начала',
      (value, { parent }) => {
        if (!value || !parent.eventStartDate || !parent.eventStartTime)
          return true;

        const startDateTime = dayjs(
          `${parent.eventStartDate}T${parent.eventStartTime}`,
        );
        const endDateTime = dayjs(`${parent.eventStartDate}T${value}`);
        const minEndTime = startDateTime.add(1, 'hour');

        return (
          endDateTime.isAfter(minEndTime) || endDateTime.isSame(minEndTime)
        );
      },
    ),

  countUsers: yup
    .number()
    .typeError('Введите число')
    .required('Укажите количество участников')
    .min(2, 'Минимум 2 участника')
    .max(1000, 'Максимум 1000 участников')
    .integer('Количество должно быть целым числом'),

  eventDescription: yup
    .string()
    .required('Добавьте описание события')
    .min(10, 'Описание должно содержать минимум 10 символов')
    .max(1000, 'Описание не должно превышать 1000 символов'),

  eventPhoto: yup.mixed<File>().nullable().optional(),

  coordinates: yup.object({
    latitude: yup.number().required(),
    longitude: yup.number().required(),
  }),
});
