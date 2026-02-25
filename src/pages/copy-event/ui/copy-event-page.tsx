import dayjs from 'dayjs';
import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { EventFormEntity } from '@entities/event-form';
import { ModalWrapper } from '@entities/modal-wrapper';
import { useCreateEventMutation, useUploadPhotoMutation } from '@shared/api';
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
    eventEndDate: '',
    eventEndTime: '',
    countUsers: newEvent?.countUsers ?? 2,
    eventDescription: newEvent?.eventDescription ?? '',
    eventPhoto: newEvent?.eventPhoto ?? null,
    coordinates: newEvent?.coordinates ?? { latitude: 0, longitude: 0 },
  };

  const onSubmit = async (data: CreateEventFormData) => {
    const eventStartDate = dayjs(
      `${data.eventStartDate} ${data.eventStartTime}`,
    ).format();
    const eventEndDate = dayjs(
      `${data.eventStartDate} ${data.eventEndTime}`,
    ).format();

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

    if (data.eventPhoto && createdEvent.eventId) {
      await uploadPhoto({
        id: createdEvent.eventId,
        file: data.eventPhoto,
      }).unwrap();
    }

    navigate(ROUTES.EVENT.DETAIL(createdEvent.eventId));
  };

  return (
    <ModalWrapper
      maxWidth={{ xs: 377, md: 480 }}
      height='auto'
      maxHeight={{ xs: 'calc(100vh - 176px)', md: 'calc(100vh - 168px)' }}
      overflow='auto'
    >
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
