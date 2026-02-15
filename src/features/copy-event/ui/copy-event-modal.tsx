import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  useCreateEventMutation,
  useUploadPhotoMutation,
} from '@shared/api';

import { EventFormEntity } from '@entities/event-form';
import { ModalWrapper } from '@entities/modal-wrapper';
import { 
  CreateEventFormData, 
  EventFormInitialData, 
  ROUTES 
} from '@shared/lib';
import { CopyEventModalProps } from '../api/types';

export const CopyEventModal: React.FC<CopyEventModalProps> = ({
  event,
  onClose,
}) => {
  const navigate = useNavigate();

  const [createEvent, { isLoading: isCreating }] = useCreateEventMutation();
  const [uploadPhoto, { isLoading: isUploadingPhoto }] = useUploadPhotoMutation();

  const defaultValues: EventFormInitialData = useMemo(() => {
    return {
      eventType: event.eventType,
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
      try {
        const eventStartDate = `${data.eventStartDate}T${data.eventStartTime}:00`;
        const eventEndDate = `${data.eventEndDate}T${data.eventEndTime}:00`;

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
            file: data.eventPhoto, // ✅ File тип
          }).unwrap();
        }

        onClose();
        navigate(`${ROUTES.EVENT.DETAIL(createdEvent.eventId)}`);
      } catch (error) {
        console.error('Error creating event:', error);
      }
    },
    [createEvent, uploadPhoto, navigate, onClose],
  );

  const handleClose = () => {
    onClose();
  };

  return (
    <ModalWrapper
      maxWidth={{ xs: 361, md: 480 }}
      height='auto'
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
        photoVariant='copy'
      />
    </ModalWrapper>
  );
};