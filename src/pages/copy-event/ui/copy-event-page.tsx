import { useNavigate, useParams } from 'react-router-dom';

import { Skeleton } from '@mui/material';

import { ModalWrapper } from '@entities/modal-wrapper';
import { EventFormValues } from '@features/event-form';
import { useUploadPhotoMutation } from '@features/event-photo-upload';
import { useGetEventByIdQuery } from '@shared/api';
import { ROUTES, buildEventDates } from '@shared/lib';
import { EventFormWidget } from '@widgets/event-form';
import { useCreateEventMutation } from '@widgets/event-form';

export const CopyEventPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data, isLoading: isFetching } = useGetEventByIdQuery(id!);
  const [createEvent, { isLoading: isCreating }] = useCreateEventMutation();
  const [uploadPhoto, { isLoading: isUploadingPhoto }] =
    useUploadPhotoMutation();

  const initialValues: Partial<EventFormValues> | undefined = data
    ? {
        eventType: data.eventType,
        eventName: data.eventName,
        eventLocation: data.eventLocation,
        eventDescription: data.eventDescription,
        countUsers: data.countUsers,
        coordinates: data.coordinates,
        eventStartDate: '',
        eventStartTime: '',
        eventEndTime: '',
        eventPhoto: null,
      }
    : undefined;

  const handleSubmit = async (values: EventFormValues) => {
    const { eventStartDate, eventEndDate } = buildEventDates(values);
    const {
      eventType,
      eventName,
      eventLocation,
      eventDescription,
      countUsers,
      coordinates,
      eventPhoto,
    } = values;

    const eventData = {
      eventType,
      eventName,
      eventLocation,
      eventStartDate,
      eventEndDate,
      eventDescription,
      countUsers,
      eventPhoto: '',
      coordinates,
    };

    const result = await createEvent(eventData).unwrap();

    if (result.eventId) {
      let photoFile: File | null = null;

      if (eventPhoto instanceof File) {
        photoFile = eventPhoto;
      } else if (data?.eventPhoto) {
        const response = await fetch(data.eventPhoto);
        const blob = await response.blob();
        photoFile = new File([blob], 'photo.jpg', { type: blob.type });
      }

      if (photoFile) {
        const formData = new FormData();
        formData.append('file', photoFile);
        await uploadPhoto({ id: result.eventId, file: formData }).unwrap();
      }
    }

    navigate(ROUTES.EVENT.DETAIL(result.eventId));
  };

  const handleCancel = () => {
    navigate(-1);
  };

  if (isFetching) return <Skeleton />;

  return (
    <ModalWrapper
      maxWidth={{ xs: 377, md: 480 }}
      height='auto'
      maxHeight='100%'
    >
      <EventFormWidget
        title='Копирование события'
        submitLabel='СОЗДАТЬ СОБЫТИЕ'
        initialValues={initialValues}
        initialPhotoUrl={data?.eventPhoto ?? null}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isLoading={isCreating || isUploadingPhoto}
      />
    </ModalWrapper>
  );
};
