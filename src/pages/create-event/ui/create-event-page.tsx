import { ChangeEvent, FC, useCallback, useMemo, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { yupResolver } from '@hookform/resolvers/yup';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import EventIcon from '@mui/icons-material/Event';
import ImageIcon from '@mui/icons-material/Image';
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import { ModalWrapper } from '@entities/modal-wrapper';
import { useGetTypeEventsQuery } from '@shared/api';
import { ROUTES } from '@shared/lib';
import { showSnackbar } from '@shared/lib/show-snackbar';

import {
  useCreateEventMutation,
  useUploadPhotoMutation,
} from '../api/create-event-api';
import { CreateEventFormData } from '../api/types';
import { createEventSchema } from '../lib/schema';
import { PhotoPreview } from './create-event-page.styled';
import { LocationAutocomplete } from './location-autocomplete';

export const CreateEventPage: FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: eventTypes, isLoading: isLoadingTypes } =
    useGetTypeEventsQuery();
  const [createEvent, { isLoading: isCreating }] = useCreateEventMutation();
  const [uploadPhoto, { isLoading: isUploadingPhoto }] =
    useUploadPhotoMutation();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    setValue,
    watch,
  } = useForm<CreateEventFormData>({
    resolver: yupResolver(createEventSchema),
    mode: 'onChange',
    defaultValues: {
      eventType: '',
      eventName: '',
      eventLocation: '',
      eventStartDate: '',
      eventStartTime: '',
      eventEndTime: '',
      countUsers: 10,
      eventDescription: '',
      eventPhoto: null,
      coordinates: {
        latitude: 55.754167,
        longitude: 37.620001,
      },
    },
  });

  const eventLocation = watch('eventLocation');

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const today = new Date();
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 30);
  const formattedToday = today.toISOString().split('T')[0];
  const formattedMaxDate = maxDate.toISOString().split('T')[0];

  const handlePhotoChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      if (file.size > 5 * 1024 * 1024) {
        showSnackbar('Размер файла не должен превышать 5 МБ', 'error');
        return;
      }

      const supportedFormats = [
        'image/jpg',
        'image/jpeg',
        'image/png',
        'image/webp',
      ];
      if (!supportedFormats.includes(file.type)) {
        showSnackbar(
          'Поддерживаются только изображения (jpg, jpeg, png, webp)',
          'error',
        );
        return;
      }

      setValue('eventPhoto', file, { shouldValidate: true });

      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    },
    [setValue],
  );

  const handleRemovePhoto = useCallback(() => {
    setValue('eventPhoto', null, { shouldValidate: true });
    setPhotoPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [setValue]);

  const handleLocationChange = useCallback(
    (
      location: string,
      coordinates?: { latitude: number; longitude: number },
    ) => {
      setValue('eventLocation', location, { shouldValidate: true });
      if (coordinates) {
        setValue('coordinates', coordinates, { shouldValidate: true });
      }
    },
    [setValue],
  );

  const handleCoordinatesChange = useCallback(
    (coordinates: { latitude: number; longitude: number }) => {
      setValue('coordinates', coordinates, { shouldValidate: true });
    },
    [setValue],
  );

  const onSubmit = useCallback(
    async (data: CreateEventFormData) => {
      try {
        const eventStartDate = `${data.eventStartDate}T${data.eventStartTime}:00`;
        const eventEndDate = `${data.eventStartDate}T${data.eventEndTime}:00`;

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

  const isFormDisabled = !isValid || !isDirty || isCreating || isUploadingPhoto;

  const sortedEventTypes = useMemo(() => {
    if (!eventTypes) return [];
    return [...eventTypes].sort((a, b) =>
      a.typeName.localeCompare(b.typeName, 'ru'),
    );
  }, [eventTypes]);

  return (
    <ModalWrapper width={{ xs: 361, md: 440 }} height='auto' maxHeight='100%'>
      <Box
        display='flex'
        flexDirection='column'
        width='100%'
        maxWidth={1200}
        margin='0 auto'
        padding={isMobile ? theme.spacing(2) : theme.spacing(3)}
        gap={theme.spacing(2)}
      >
        <Typography fontSize={20} fontWeight={700} textAlign='center'>
          Создание события
        </Typography>

        <Box
          component='form'
          onSubmit={handleSubmit(onSubmit)}
          display='flex'
          flexDirection='column'
          width='100%'
          maxWidth={isMobile ? 361 : 480}
          margin='0 auto'
          gap={isMobile ? theme.spacing(2) : theme.spacing(3)}
        >
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
              bgcolor='grey.100'
              display='flex'
              alignItems='center'
              justifyContent='center'
              borderRadius='10px'
            >
              {!photoPreview ? (
                <EventIcon fontSize='large' color='disabled' />
              ) : (
                <PhotoPreview src={photoPreview} alt='Preview' />
              )}
            </Box>

            <Box display='flex' gap={theme.spacing(1)}>
              <Button
                startIcon={<ImageIcon />}
                disabled={isUploadingPhoto}
                onClick={handlePhotoClick}
                variant='contained'
                fullWidth
                size='mediumFixed'
              >
                {isUploadingPhoto ? 'Загрузка...' : 'Загрузить фото'}
              </Button>

              {photoPreview && (
                <Button size='classicWidthAction' onClick={handleRemovePhoto}>
                  <DeleteIcon />
                </Button>
              )}
            </Box>
          </Box>

          <Box
            display='flex'
            flexDirection='column'
            flex={1}
            gap={theme.spacing(2)}
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
                    <Select
                      {...field}
                      displayEmpty
                      disabled={isLoadingTypes}
                      size='small'
                    >
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
                <FormHelperText>
                  {errors.eventType?.message || 'Выберите тип события'}
                </FormHelperText>
              </FormControl>
            </Box>

            <Box display='flex' flexDirection='column' gap='4px'>
              <Controller
                name='eventName'
                control={control}
                render={({ field }) => (
                  <TextField
                    size={'small'}
                    {...field}
                    label={'Название события'}
                    InputLabelProps={{ shrink: true }}
                    error={Boolean(errors.eventName)}
                    helperText={
                      errors.eventName?.message || 'Введите название события'
                    }
                  />
                )}
              />
            </Box>

            <Box display='flex' flexDirection='column' gap='4px'>
              <LocationAutocomplete
                value={eventLocation ?? ''}
                onChange={handleLocationChange}
                onCoordinatesChange={handleCoordinatesChange}
                error={Boolean(errors.eventLocation)}
                errorsMassage={errors.eventLocation?.message}
              />
            </Box>
            <Box display='flex' flexDirection='column' gap='4px'>
              <Controller
                name='eventStartDate'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type='date'
                    InputLabelProps={{ shrink: true }}
                    inputProps={{
                      min: formattedToday,
                      max: formattedMaxDate,
                    }}
                    size={'small'}
                    error={Boolean(errors.eventStartDate)}
                    label={'Дата начала мероприятия'}
                    helperText={
                      errors.eventStartDate?.message ||
                      'Укажите дату начала события. '
                    }
                  />
                )}
              />
            </Box>

            <Box display='flex' flexDirection='column' gap='4px'>
              <Controller
                name='eventStartTime'
                control={control}
                render={({ field }) => (
                  <TextField
                    size={'small'}
                    {...field}
                    type='time'
                    InputLabelProps={{ shrink: true }}
                    error={Boolean(errors.eventStartTime)}
                    label={'Время начала события'}
                    helperText={
                      errors.eventStartTime?.message ||
                      'Укажите время начала события.'
                    }
                  />
                )}
              />
            </Box>

            <Box display='flex' flexDirection='column' gap='4px'>
              <Controller
                name='eventEndTime'
                control={control}
                render={({ field }) => (
                  <TextField
                    size={'small'}
                    {...field}
                    type='time'
                    error={Boolean(errors.eventEndTime)}
                    InputLabelProps={{ shrink: true }}
                    label={'Время окончания события'}
                    helperText={
                      errors.eventEndTime?.message ||
                      'Должно быть после времени начала'
                    }
                  />
                )}
              />
            </Box>
            <Box display='flex' flexDirection='column' gap='4px'>
              <Controller
                name='countUsers'
                control={control}
                render={({ field }) => (
                  <TextField
                    size={'small'}
                    {...field}
                    type='number'
                    InputLabelProps={{ shrink: true }}
                    error={Boolean(errors.countUsers)}
                    inputProps={{ min: 2, max: 1000 }}
                    label={'Количество участников'}
                    helperText={
                      errors.countUsers?.message || 'От 2 до 1000 участников'
                    }
                  />
                )}
              />
            </Box>
            <Box display='flex' flexDirection='column' gap='4px'>
              <Controller
                name='eventDescription'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    size={'small'}
                    label='Описание'
                    InputLabelProps={{ shrink: true }}
                    error={Boolean(errors.eventDescription)}
                    multiline
                    helperText={
                      errors.eventDescription?.message ||
                      'Опишите событие подробнее.'
                    }
                  />
                )}
              />
            </Box>

            <Button
              startIcon={<CheckCircleOutlineOutlinedIcon />}
              type='submit'
              variant='contained'
              disabled={isFormDisabled}
              fullWidth
              size='mediumFixed'
            >
              СОЗДАТЬ СОБЫТИЕ
            </Button>

            <Button
              variant='outlined'
              onClick={handleCancel}
              fullWidth
              size='mediumFixed'
            >
              ОТМЕНА
            </Button>
          </Box>
        </Box>
      </Box>
    </ModalWrapper>
  );
};
