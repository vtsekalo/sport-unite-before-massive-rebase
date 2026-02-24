import dayjs from 'dayjs';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { EventFormEntity } from '@entities/event-form';
import { ModalWrapper } from '@entities/modal-wrapper';
import { useUploadPhotoMutation } from '@shared/api';
import { useCreateEventMutation } from '@shared/api';
import { CreateEventFormData, EventFormInitialData, ROUTES } from '@shared/lib';
import { ConfirmModal } from '@shared/ui/confirm-modal';

import { CopyEventModalProps } from '../lib/types';

interface Props extends CopyEventModalProps {
  open: boolean;
}

export const CopyEventModal: FC<Props> = ({ event, onClose, open }) => {
  const navigate = useNavigate();

  const [createEvent, { isLoading: isCreating }] = useCreateEventMutation();
  const [uploadPhoto, { isLoading: isUploadingPhoto }] =
    useUploadPhotoMutation();

  const defaultValues: EventFormInitialData = {
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
  };

  return (
    <ConfirmModal open={open} onClose={onClose}>
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
          onClose={onClose}
          submitButtonText='СОХРАНИТЬ'
          isSubmitting={isCreating}
          isUploadingPhoto={isUploadingPhoto}
          initialPhotoUrl={event?.eventPhoto}
        />
      </ModalWrapper>
    </ConfirmModal>
  );
};