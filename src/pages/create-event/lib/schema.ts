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
      'Событие должно начаться минимум через 1 час от текущего времени',
      function (value) {
        if (!value) return false;
        const { eventStartTime } = this.parent;
        if (!eventStartTime) return true;

        const eventDateTime = new Date(`${value}T${eventStartTime}:00`);
        const now = new Date();
        const minDateTime = new Date(now.getTime() + 60 * 60 * 1000);

        return eventDateTime >= minDateTime;
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

  eventEndDate: yup
    .string()
    .required('Укажите дату окончания')
    .test(
      'after-start',
      'Дата окончания должна быть после даты начала',
      function (value) {
        if (!value) return false;
        const { eventStartDate, eventStartTime, eventEndTime } = this.parent;
        if (!eventStartDate || !eventStartTime || !eventEndTime) return true;

        const startDateTime = new Date(
          `${eventStartDate}T${eventStartTime}:00`,
        );
        const endDateTime = new Date(`${value}T${eventEndTime}:00`);

        return endDateTime > startDateTime;
      },
    )
    .test(
      'not-equal',
      'Время начала и окончания события не могут совпадать',
      function (value) {
        if (!value) return false;
        const { eventStartDate, eventStartTime, eventEndTime } = this.parent;
        if (!eventStartDate || !eventStartTime || !eventEndTime) return true;

        const startDateTime = new Date(
          `${eventStartDate}T${eventStartTime}:00`,
        );
        const endDateTime = new Date(`${value}T${eventEndTime}:00`);

        return endDateTime.getTime() !== startDateTime.getTime();
      },
    ),

  eventEndTime: yup
    .string()
    .required('Укажите время окончания')
    .test(
      'after-start',
      'Время окончания должно быть после времени начала',
      function (value) {
        if (!value) return false;
        const { eventStartDate, eventStartTime, eventEndDate } = this.parent;
        if (!eventStartDate || !eventStartTime || !eventEndDate) return true;

        const startDateTime = new Date(
          `${eventStartDate}T${eventStartTime}:00`,
        );
        const endDateTime = new Date(`${eventEndDate}T${value}:00`);

        return endDateTime > startDateTime;
      },
    )
    .test(
      'not-equal',
      'Время начала и окончания события не могут совпадать',
      function (value) {
        if (!value) return false;
        const { eventStartDate, eventStartTime, eventEndDate } = this.parent;
        if (!eventStartDate || !eventStartTime || !eventEndDate) return true;

        const startDateTime = new Date(
          `${eventStartDate}T${eventStartTime}:00`,
        );
        const endDateTime = new Date(`${eventEndDate}T${value}:00`);

        return endDateTime.getTime() !== startDateTime.getTime();
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
