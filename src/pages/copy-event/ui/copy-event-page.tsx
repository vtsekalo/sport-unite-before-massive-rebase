import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { EventFormEntity } from '@entities/event-form';
import { ModalWrapper } from '@entities/modal-wrapper';
import { useCreateEventMutation, useUploadPhotoMutation } from '@shared/api';
import { dayjs } from '@shared/lib';
import { CreateEventFormData, EventFormInitialData, ROUTES } from '@shared/lib';

export const CopyEventPage: FC = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const newEvent = state?.newEvent;

  const [createEvent, { isLoading: isCreating }] = useCreateEventMutation();
  const [uploadPhoto, { isLoading: isUploadingPhoto }] =
    useUploadPhotoMutation();

  const defaultValues: EventFormInitialData = {
    eventType: newEvent?.eventType ?? '',
    eventName: newEvent?.eventName ?? '',
    eventLocation: newEvent?.eventLocation ?? '',
    eventStartDate: '',
    eventStartTime: '',
    eventEndTime: '',
    countUsers: newEvent?.countUsers ?? 2,
    eventDescription: newEvent?.eventDescription ?? '',
    eventPhoto: null,
    coordinates: newEvent?.coordinates ?? { latitude: 0, longitude: 0 },
  };

  const onSubmit = async (data: CreateEventFormData) => {
    const eventStartDate = dayjs(
      `${data.eventStartDate} ${data.eventStartTime}`,
    )
      .utc()
      .format('YYYY-MM-DDTHH:mm:ss[Z]');

    const eventEndDate = dayjs(`${data.eventStartDate} ${data.eventEndTime}`)
      .utc()
      .format('YYYY-MM-DDTHH:mm:ss[Z]');

    const eventData = {
      eventType: data.eventType,
      eventName: data.eventName,
      eventLocation: data.eventLocation,
      eventStartDate,
      eventEndDate,
      eventDescription: data.eventDescription,
      countUsers: data.countUsers,
      eventPhoto: '',
      coordinates: {
        latitude: data.coordinates.latitude,
        longitude: data.coordinates.longitude,
      },
    };

    const createdEvent = await createEvent(eventData).unwrap();

    if (data.eventPhoto instanceof File && createdEvent.eventId) {
      await uploadPhoto({
        id: createdEvent.eventId,
        photoType: 'EVENT',
        file: data.eventPhoto,
      }).unwrap();
    }

    navigate(ROUTES.EVENT.DETAIL(createdEvent.eventId));
  };

  return (
    <ModalWrapper width={{ xs: 377, md: 480 }}>
      <EventFormEntity
        title='Копирование события'
        defaultValues={defaultValues}
        onSubmit={onSubmit}
        onClose={() => navigate(-1)}
        submitButtonText='СОХРАНИТЬ'
        isSubmitting={isCreating}
        isUploadingPhoto={isUploadingPhoto}
        initialPhotoUrl={newEvent?.eventPhoto}
      />
    </ModalWrapper>
  );
};
