import * as yup from 'yup';

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
      function (value) {
        if (!value) return false;

        const [year, month, day] = value.split('-').map(Number);
        const eventDate = new Date(year, month - 1, day);

        const now = new Date();

        const minDate = new Date(now);
        minDate.setDate(minDate.getDate());
        minDate.setHours(0, 0, 0, 0);

        const maxDate = new Date(now);
        maxDate.setDate(maxDate.getDate() + 30);
        maxDate.setHours(23, 59, 59, 999);

        return eventDate >= minDate && eventDate <= maxDate;
      },
    ),

  eventStartTime: yup
    .string()
    .required('Укажите время начала')
    .test(
      'min-future-datetime',
      'Событие должно начаться минимум через 1 час от текущего времени',
      function (value) {
        if (!value) return false;
        const { eventStartDate } = this.parent;
        if (!eventStartDate) return true;

        const eventDateTime = new Date(`${eventStartDate}T${value}:00`);
        const now = new Date();
        const minDateTime = new Date(now.getTime() + 60 * 60 * 1000);

        return eventDateTime >= minDateTime;
      },
    ),

  eventEndTime: yup
    .string()
    .required('Укажите время окончания')
    .test(
      'min-1-hour',
      'Время окончания должно быть как минимум на 1 час позже времени начала',
      function (value) {
        if (!value) return false;

        const { eventStartDate, eventStartTime } = this.parent;
        if (!eventStartDate || !eventStartTime) return true;

        const startDateTime = new Date(
          `${eventStartDate}T${eventStartTime}:00`,
        );
        const endDateTime = new Date(`${eventStartDate}T${value}:00`);

        const minEndTime = new Date(startDateTime.getTime() + 60 * 60 * 1000);

        return endDateTime >= minEndTime;
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
