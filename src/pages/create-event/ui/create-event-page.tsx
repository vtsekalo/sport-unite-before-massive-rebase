import { useNavigate } from 'react-router-dom';

import { ModalWrapper } from '@entities/modal-wrapper';
import { EventFormValues } from '@features/event-form';
import { useUploadPhotoMutation } from '@features/event-photo-upload';
import { ROUTES, buildEventDates } from '@shared/lib';
import { EventFormWidget } from '@widgets/event-form';
import { useCreateEventMutation } from '@widgets/event-form';

export const CreateEventPage = () => {
  const navigate = useNavigate();
  const [createEvent, { isLoading: isCreating }] = useCreateEventMutation();
  const [uploadPhoto, { isLoading: isUploadingPhoto }] =
    useUploadPhotoMutation();

  const handleSubmit = async (values: EventFormValues) => {
    const { eventStartDate, eventEndDate } = buildEventDates(values);

    const eventData = {
      eventType: values.eventType,
      eventName: values.eventName,
      eventLocation: values.eventLocation,
      eventStartDate,
      eventEndDate,
      eventDescription: values.eventDescription,
      countUsers: values.countUsers,
      eventPhoto: '',
      coordinates: values.coordinates,
    };

    const result = await createEvent(eventData).unwrap();

    if (values.eventPhoto instanceof File && result.eventId) {
      const formData = new FormData();
      formData.append('file', values.eventPhoto);
      await uploadPhoto({ id: result.eventId, file: formData }).unwrap();
    }

    navigate(ROUTES.EVENT.DETAIL(result.eventId));
  };

  const handleCancel = () => {
    navigate(ROUTES.HOME);
  };

  return (
    <ModalWrapper
      maxWidth={{ xs: 377, md: 480 }}
      height='auto'
      maxHeight='100%'
    >
      <EventFormWidget
        title='Создание события'
        submitLabel='СОЗДАТЬ СОБЫТИЕ'
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isLoading={isCreating || isUploadingPhoto}
      />
    </ModalWrapper>
  );
};
