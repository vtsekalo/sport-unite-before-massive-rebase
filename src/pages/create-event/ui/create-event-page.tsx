import dayjs from 'dayjs';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { EventFormEntity } from '@entities/event-form';
import { ModalWrapper } from '@entities/modal-wrapper';
import { useCreateEventMutation } from '@shared/api';
import { useUploadPhotoMutation } from '@shared/api';
import { CreateEventFormData, EventFormInitialData, ROUTES } from '@shared/lib';

export const CreateEventPage = () => {
  const navigate = useNavigate();
  const [createEvent, { isLoading: isCreating }] = useCreateEventMutation();
  const [uploadPhoto, { isLoading: isUploadingPhoto }] =
    useUploadPhotoMutation();

  const onSubmit = useCallback(
    async (data: CreateEventFormData) => {
      try {
        const eventStartDate = dayjs(
          `${data.eventStartDate} ${data.eventStartTime}`,
        )
          .utc()
          .format('YYYY-MM-DDTHH:mm:ss[Z]');

        const eventEndDate = dayjs(
          `${data.eventStartDate} ${data.eventEndTime}`,
        )
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

        if (data.eventPhoto && createdEvent.eventId) {
          const uploadResult = await uploadPhoto({
            id: createdEvent.eventId,
            photoType: 'EVENT',
            file: data.eventPhoto,
          }).unwrap();
          console.log('Upload result:', uploadResult); 
        }

        navigate(ROUTES.EVENT.DETAIL(createdEvent.eventId));
      } catch (error) {
        console.error('Error creating common-event-card-list:', error);
      }
    },
    [createEvent, uploadPhoto, navigate],
  );

  const handleCancel = () => {
    navigate(ROUTES.HOME);
  };

  const defaultValues: EventFormInitialData = {
    eventType: '',
    eventName: '',
    eventLocation: '',
    eventStartDate: '',
    eventStartTime: '',
    eventEndTime: '',
    countUsers: 0,
    eventDescription: '',
    eventPhoto: null,
    coordinates: {
      latitude: 55.754167,
      longitude: 37.620001,
    },
  };

  return (
    <ModalWrapper
      maxWidth={{ xs: 361, md: 480 }}
      height='auto'
      maxHeight='100%'
    >
      <EventFormEntity
        title='Создание события'
        defaultValues={defaultValues}
        onSubmit={onSubmit}
        onClose={handleCancel}
        submitButtonText='СОЗДАТЬ СОБЫТИЕ'
        isSubmitting={isCreating}
        isUploadingPhoto={isUploadingPhoto}
      />
    </ModalWrapper>
  );
};
