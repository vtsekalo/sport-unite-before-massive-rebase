import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import { EventFormValues, createEventSchema } from './schema';

export const useEventForm = (initialValues?: Partial<EventFormValues>) => {
  const form = useForm<EventFormValues>({
    resolver: yupResolver(createEventSchema),
    mode: 'onChange',
    defaultValues: {
      eventType: '',
      eventName: '',
      eventLocation: '',
      eventStartDate: '',
      eventStartTime: '',
      eventEndTime: '',
      eventDescription: '',
      countUsers: '' as unknown as number,
      coordinates: { latitude: 0, longitude: 0 },
      eventPhoto: null,
      ...initialValues,
    },
  });

  return form;
};
