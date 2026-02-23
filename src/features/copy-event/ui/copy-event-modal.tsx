import dayjs from 'dayjs';
import { FC, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { EventFormEntity } from '@entities/event-form';
import { ModalWrapper } from '@entities/modal-wrapper';
import { useCreateEventMutation, useUploadPhotoMutation } from '@shared/api';
import {
  CreateEventFormData,
  EventFormInitialData,
  ROUTES,
} from '@shared/lib';
import { PhotoVariant } from '@shared/lib';

import { CopyEventModalProps } from '../lib/types';

export const CopyEventModal: FC<CopyEventModalProps> = ({ event, onClose }) => {
  const navigate = useNavigate();

  const [createEvent, { isLoading: isCreating }] = useCreateEventMutation();
  const [uploadPhoto, { isLoading: isUploadingPhoto }] =
    useUploadPhotoMutation();

  const defaultValues: EventFormInitialData = useMemo(() => {
    return {
      eventType: '',
      eventName: event.eventName,
      eventLocation: event.eventLocation,
      eventStartDate: '',
      eventStartTime: '',
      eventEndDate: '',
      eventEndTime: '',
      countUsers: event.countUsers,
      eventDescription: event.eventDescription,
      eventPhoto: event.eventPhoto,
      coordinates: event.coordinates,
    };
  }, [event]);

  const onSubmit = useCallback(
    async (data: CreateEventFormData) => {
      const eventStartDate = dayjs(`${data.eventStartDate} ${data.eventStartTime}`,).format();
      const eventEndDate = dayjs(`${data.eventEndDate} ${data.eventEndTime}`,).format();

        const eventData = {
          eventType: data.eventType,
          eventName: data.eventName,
          eventLocation: data.eventLocation,
          eventStartDate,
          eventEndDate,
          eventDescription: data.eventDescription,
          countUsers: Number(data.countUsers),
          eventPhoto: '',
          coordinates: {
            latitude: Number(data.coordinates.latitude),
            longitude: Number(data.coordinates.longitude),
          },
        };

        const createdEvent = await createEvent(eventData).unwrap();

        if (data.eventPhoto && createdEvent.eventId) {
          await uploadPhoto({
            id: createdEvent.eventId,
            photoType: 'EVENT',
            file: data.eventPhoto,
          }).unwrap();
        }

        onClose();
        navigate(ROUTES.EVENT.DETAIL(createdEvent.eventId));
      },
      [createEvent, uploadPhoto, navigate, onClose],
  );

  const handleClose = () => {
    onClose();
  };

  return (
    <ModalWrapper
      maxWidth={{ xs: 377, md: 480 }}
      height={1220}
      maxHeight='100%'
      overflow='auto'
    >
      <EventFormEntity
        title='Копирование события'
        defaultValues={defaultValues}
        onSubmit={onSubmit}
        onClose={handleClose}
        submitButtonText='СОХРАНИТЬ'
        isSubmitting={isCreating}
        isUploadingPhoto={isUploadingPhoto}
        initialPhotoUrl={event?.eventPhoto}
        photoMode={PhotoVariant.COPY}
      />
    </ModalWrapper>
  );
};
