import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { EventFormEntity } from '@entities/event-form';
import { ModalWrapper } from '@entities/modal-wrapper';
import { useCreateEventMutation, useUploadPhotoMutation } from '@shared/api';
import { CreateEventFormData, EventFormInitialData, ROUTES } from '@shared/lib';

export const CreateEventPage = () => {
  const navigate = useNavigate();
  const [createEvent, { isLoading: isCreating }] = useCreateEventMutation();
  const [uploadPhoto, { isLoading: isUploadingPhoto }] =
    useUploadPhotoMutation();

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
            file: data.eventPhoto,
          }).unwrap();
        }

        navigate(`${ROUTES.EVENT.DETAIL(createdEvent.eventId)}`);
      } catch (error) {
        console.error('Error creating event:', error);
      }
    },
    [createEvent, uploadPhoto, navigate],
  );

  const handleClose = () => {
    navigate(ROUTES.HOME);
  };

<<<<<<< HEAD
  const defaultValues: EventFormInitialData = {
    eventType: '',
    eventName: '',
    eventLocation: '',
    eventStartDate: '',
    eventStartTime: '',
    eventEndDate: '',
    eventEndTime: '',
    countUsers: 10,
    eventDescription: '',
    eventPhoto: null,
    coordinates: {
      latitude: 55.754167,
      longitude: 37.620001,
    },
  };
=======
  const isFormDisabled = !isValid || !isDirty || isCreating || isUploadingPhoto;

  const sortedEventTypes = useMemo(() => {
    if (!eventTypes) return [];
    return [...eventTypes].sort((a, b) =>
      a.typeName.localeCompare(b.typeName, 'ru'),
    );
  }, [eventTypes]);

  const headerNode = (
    <IconButton onClick={handleClose} size='small'>
      <CloseIcon />
    </IconButton>
  );

  const photoNode = (
    <Box display='flex' flexDirection='column' gap={theme.spacing(2)}>
      <input
        ref={fileInputRef}
        type='file'
        hidden
        accept='image/jpeg,image/jpg,image/png,image/webp'
        onChange={handlePhotoChange}
        disabled={isUploadingPhoto}
      />

      <Box
        height={232}
        overflow='hidden'
        position='relative'
        borderRadius='10px'
        bgcolor='grey.200'
        display='flex'
        alignItems='center'
        justifyContent='center'
      >
        {photoPreview ? (
          <img
            src={photoPreview}
            alt='Event preview'
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        ) : (
          <ImageIcon sx={{ fontSize: 48, color: 'grey.400' }} />
        )}
      </Box>

      <Box display='flex' gap={1}>
        <Button
          variant='contained'
          fullWidth
          startIcon={<ImageIcon />}
          onClick={handlePhotoClick}
          disabled={isUploadingPhoto}
        >
          {isUploadingPhoto ? 'Загрузка...' : 'ЗАГРУЗИТЬ ФОТО'}
        </Button>

        {photoPreview && (
          <IconButton
            color='primary'
            onClick={handleRemovePhoto}
            sx={{
              bgcolor: 'primary.main',
              color: 'white',
              '&:hover': {
                bgcolor: 'primary.dark',
              },
            }}
          >
            <DeleteIcon />
          </IconButton>
        )}
      </Box>
    </Box>
  );

  const formFieldsNode = (
    <Box
      component='form'
      onSubmit={handleSubmit(onSubmit)}
      display='flex'
      flexDirection='column'
      gap={theme.spacing(2.5)}
    >
      <Box display='flex' flexDirection='column' gap='4px'>
        <Typography variant='body2' color='textSecondary'>
          Тип события
        </Typography>
        <FormControl error={Boolean(errors.eventType)}>
          <Controller
            name='eventType'
            control={control}
            render={({ field }) => (
              <Select {...field} displayEmpty disabled={isLoadingTypes}>
                <MenuItem value='' disabled>
                  Выберите тип события
                </MenuItem>
                {isLoadingTypes ? (
                  <MenuItem value=''>
                    <CircularProgress size={20} />
                  </MenuItem>
                ) : (
                  sortedEventTypes.map((type) => (
                    <MenuItem key={type.typeId} value={type.typeName}>
                      {type.typeName}
                    </MenuItem>
                  ))
                )}
              </Select>
            )}
          />
          {errors.eventType && (
            <Typography variant='caption' color='error'>
              {errors.eventType.message}
            </Typography>
          )}
        </FormControl>
      </Box>

      <Box display='flex' flexDirection='column' gap='4px'>
        <Typography variant='body2' color='textSecondary'>
          Название события
        </Typography>
        <Controller
          name='eventName'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              placeholder='Введите название события'
              error={Boolean(errors.eventName)}
            />
          )}
        />
        {errors.eventName && (
          <Typography variant='caption' color='error'>
            {errors.eventName.message}
          </Typography>
        )}
      </Box>

      <Box display='flex' flexDirection='column' gap='4px'>
        <Typography variant='body2' color='textSecondary'>
          Место проведения
        </Typography>
        <LocationAutocomplete
          value={eventLocation ?? ''}
          onChange={handleLocationChange}
          onCoordinatesChange={handleCoordinatesChange}
          error={Boolean(errors.eventLocation)}
          helperText={errors.eventLocation?.message}
          placeholder='Начните вводить адрес или название места'
        />
      </Box>

      <Box display='flex' flexDirection='column' gap='4px'>
        <Typography variant='body2' color='textSecondary'>
          Дата начала мероприятия
        </Typography>
        <Controller
          name='eventStartDate'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type='date'
              error={Boolean(errors.eventStartDate)}
              InputLabelProps={{ shrink: true }}
            />
          )}
        />
        <Typography variant='caption' color='textSecondary'>
          Событие должно начаться минимум через 1 час
        </Typography>
        {errors.eventStartDate && (
          <Typography variant='caption' color='error'>
            {errors.eventStartDate.message}
          </Typography>
        )}
      </Box>

      <Box display='flex' flexDirection='column' gap='4px'>
        <Typography variant='body2' color='textSecondary'>
          Время начала события
        </Typography>
        <Controller
          name='eventStartTime'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type='time'
              error={Boolean(errors.eventStartTime)}
              InputLabelProps={{ shrink: true }}
            />
          )}
        />
        <Typography variant='caption' color='textSecondary'>
          Событие должно начаться минимум через 1 час
        </Typography>
        {errors.eventStartTime && (
          <Typography variant='caption' color='error'>
            {errors.eventStartTime.message}
          </Typography>
        )}
      </Box>

      <Box display='flex' flexDirection='column' gap='4px'>
        <Typography variant='body2' color='textSecondary'>
          Дата окончания события
        </Typography>
        <Controller
          name='eventEndDate'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type='date'
              error={Boolean(errors.eventEndDate)}
              InputLabelProps={{ shrink: true }}
            />
          )}
        />
        <Typography variant='caption' color='textSecondary'>
          Должна быть после даты начала
        </Typography>
        {errors.eventEndDate && (
          <Typography variant='caption' color='error'>
            {errors.eventEndDate.message}
          </Typography>
        )}
      </Box>

      <Box display='flex' flexDirection='column' gap='4px'>
        <Typography variant='body2' color='textSecondary'>
          Время окончания события
        </Typography>
        <Controller
          name='eventEndTime'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type='time'
              error={Boolean(errors.eventEndTime)}
              InputLabelProps={{ shrink: true }}
            />
          )}
        />
        <Typography variant='caption' color='textSecondary'>
          Должно быть после времени начала
        </Typography>
        {errors.eventEndTime && (
          <Typography variant='caption' color='error'>
            {errors.eventEndTime.message}
          </Typography>
        )}
      </Box>

      <Box display='flex' flexDirection='column' gap='4px'>
        <Typography variant='body2' color='textSecondary'>
          Количество участников
        </Typography>
        <Controller
          name='countUsers'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type='number'
              error={Boolean(errors.countUsers)}
              inputProps={{ min: 2, max: 1000 }}
            />
          )}
        />
        <Typography variant='caption' color='textSecondary'>
          От 2 до 1000 участников
        </Typography>
        {errors.countUsers && (
          <Typography variant='caption' color='error'>
            {errors.countUsers.message}
          </Typography>
        )}
      </Box>

      <Box display='flex' flexDirection='column' gap='4px'>
        <Typography variant='body2' color='textSecondary'>
          Описание
        </Typography>
        <Controller
          name='eventDescription'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              placeholder='Опишите событие подробнее'
              error={Boolean(errors.eventDescription)}
              multiline
              rows={6}
            />
          )}
        />
        {errors.eventDescription && (
          <Typography variant='caption' color='error'>
            {errors.eventDescription.message}
          </Typography>
        )}
      </Box>

      <Box display='flex' flexDirection='column' gap={theme.spacing(2)}>
        <Button
          type='submit'
          variant='contained'
          disabled={isFormDisabled}
          fullWidth
          startIcon={
            isCreating || isUploadingPhoto ? null : <CheckCircleOutlineIcon />
          }
        >
          {isCreating || isUploadingPhoto ? (
            <CircularProgress size={24} color='inherit' />
          ) : (
            'СОЗДАТЬ СОБЫТИЕ'
          )}
        </Button>

        <Button variant='outlined' fullWidth onClick={handleClose}>
          ОТМЕНА
        </Button>
      </Box>
    </Box>
  );

  const actionsNode = null;
>>>>>>> 1fbe56c (свитч криейтивента и копиивента на энтитис)

  return (
    <ModalWrapper
      maxWidth={{ xs: 361, md: 480 }}
      height='auto'
      maxHeight='100%'
    >
      <EventFormEntity
        title='Создание события'
<<<<<<< HEAD
        defaultValues={defaultValues}
        onSubmit={onSubmit}
        onClose={handleClose}
        submitButtonText='СОЗДАТЬ СОБЫТИЕ'
        isSubmitting={isCreating}
        isUploadingPhoto={isUploadingPhoto}
        photoVariant='create'
=======
        headerNode={headerNode}
        photoNode={photoNode}
        formFieldsNode={formFieldsNode}
        actionsNode={actionsNode}
>>>>>>> 198b00d (новое апи, работа с нодами)
      />
    </ModalWrapper>
  );
};