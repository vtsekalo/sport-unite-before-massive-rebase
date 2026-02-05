import React, {
  ChangeEvent,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { yupResolver } from '@hookform/resolvers/yup';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import ImageIcon from '@mui/icons-material/Image';
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import { ModalWrapper } from '@entities/modal-wrapper';
import {
  CreateEventFormData,
  LocationAutocomplete,
  createEventSchema,
  useCreateEventMutation,
  useUploadPhotoMutation,
} from '@pages/create-event';
import { PhotoPreview } from './copy-event-modal.styled';
import { useGetTypeEventsQuery } from '@shared/api';
import { ROUTES } from '@shared/lib';
import { showSnackbar } from '@shared/lib/show-snackbar';

import { CopyEventModalProps } from '../api/types';

export const CopyEventModal: React.FC<CopyEventModalProps> = ({
  event,
  onClose,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [photoPreview, setPhotoPreview] = useState<string | null>(
    event.eventPhoto || null,
  );

  const { data: eventTypes, isLoading: isLoadingTypes } =
    useGetTypeEventsQuery();

  const [createEvent, { isLoading: isCreating }] = useCreateEventMutation();
  const [uploadPhoto, { isLoading: isUploadingPhoto }] =
    useUploadPhotoMutation();

  const defaultValues = useMemo<CreateEventFormData>(
    () => ({
      eventType: event.eventType,
      eventName: event.eventName,
      eventLocation: event.eventLocation || '',
      eventStartDate: '',
      eventStartTime: '',
      eventEndDate: '',
      eventEndTime: '',
      countUsers: event.countUsers,
      eventDescription: event.eventDescription,
      eventPhoto: null,
      coordinates: event.coordinates,
    }),
    [event],
  );

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    watch,
  } = useForm<CreateEventFormData>({
    resolver: yupResolver(createEventSchema),
    mode: 'onChange',
    defaultValues,
  });

  const eventLocation = watch('eventLocation');

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handlePhotoChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      if (file.size > 5 * 1024 * 1024) {
        showSnackbar('Размер файла не должен превышать 5 МБ', 'error');
        return;
      }

      const allowedTypes = [
        'image/jpg',
        'image/jpeg',
        'image/png',
        'image/webp',
      ];

      if (!allowedTypes.includes(file.type)) {
        showSnackbar(
          'Поддерживаются только изображения (jpg, jpeg, png, webp)',
          'error',
        );
        return;
      }

      setValue('eventPhoto', file, { shouldValidate: true });

      const reader = new FileReader();
      reader.onloadend = () => setPhotoPreview(reader.result as string);
      reader.readAsDataURL(file);
    },
    [setValue],
  );

  const handleRemovePhoto = useCallback(() => {
    setValue('eventPhoto', null, { shouldValidate: true });
    setPhotoPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
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
        const createdEvent = await createEvent({
          eventType: data.eventType,
          eventName: data.eventName,
          eventLocation: data.eventLocation,
          eventStartDate: `${data.eventStartDate}T${data.eventStartTime}:00`,
          eventEndDate: `${data.eventEndDate}T${data.eventEndTime}:00`,
          eventDescription: data.eventDescription,
          countUsers: Number(data.countUsers),
          eventPhoto: '',
          coordinates: {
            latitude: Number(data.coordinates.latitude),
            longitude: Number(data.coordinates.longitude),
          },
        }).unwrap();

        if (data.eventPhoto && createdEvent.eventId) {
          await uploadPhoto({
            id: createdEvent.eventId,
            photoType: 'EVENT',
            file: data.eventPhoto,
          }).unwrap();
        }

        onClose();
        navigate(ROUTES.ADD_EVENT);
      } catch (e) {
        console.error('Error copying event:', e);
      }
    },
    [createEvent, uploadPhoto, navigate, onClose],
  );

  const isFormDisabled = !isValid || isCreating || isUploadingPhoto;

  const sortedEventTypes = useMemo(
    () =>
      eventTypes
        ? [...eventTypes].sort((a, b) =>
            a.typeName.localeCompare(b.typeName, 'ru'),
          )
        : [],
    [eventTypes],
  );

  return (
    <ModalWrapper
      maxWidth={{ xs: 361, md: 480 }}
      height='auto'
      maxHeight='100%'
    >
      <Box
        display='flex'
        flexDirection='column'
        width='100%'
        maxWidth={1200}
        margin='0 auto'
        padding={isMobile ? theme.spacing(2) : theme.spacing(3)}
        gap={isMobile ? theme.spacing(2) : theme.spacing(3)}
      >
        <Box display='flex' alignItems='center' justifyContent='space-between'>
          <Typography
            variant='h5'
            fontFamily='Roboto'
            fontWeight={700}
            fontSize='20px'
            textAlign='center'
            color='textSecondary'
            flex={1}
          >
            Копирование события
          </Typography>
          <IconButton onClick={onClose} size='small'>
            <CloseIcon />
          </IconButton>
        </Box>

        <Box
          component='form'
          onSubmit={handleSubmit(onSubmit)}
          display='flex'
          flexDirection='column'
          width='100%'
          maxWidth={isMobile ? 360 : 480}
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
              borderRadius='10px'
              bgcolor='grey.200'
              display='flex'
              alignItems='center'
              justifyContent='center'
            >
              {photoPreview ? (
                <PhotoPreview src={photoPreview} alt='Event preview' />
              ) : (
                <Box
                  display='flex'
                  flexDirection='column'
                  alignItems='center'
                  gap={1}
                >
                  <ImageIcon />
                  <Typography color='grey.600' variant='body2'>
                    Добавить фото
                  </Typography>
                </Box>
              )}
            </Box>

            <Box display='flex' gap={theme.spacing(2)}>
              <Button
                startIcon={<ImageIcon />}
                disabled={isUploadingPhoto}
                onClick={handlePhotoClick}
                variant='contained'
                fullWidth
              >
                {isUploadingPhoto ? 'Загрузка...' : 'ЗАГРУЗИТЬ ФОТО'}
              </Button>

              {photoPreview && (
                <Button
                  variant='classicWidthAction'
                  onClick={handleRemovePhoto}
                >
                  <DeleteIcon />
                </Button>
              )}
            </Box>
          </Box>

          <Box
            display='flex'
            flexDirection='column'
            flex={1}
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

            <Button
              type='submit'
              disabled={isFormDisabled}
              variant='contained'
              fullWidth
              startIcon={
                isCreating || isUploadingPhoto ? null : (
                  <CheckCircleOutlineIcon />
                )
              }
            >
              {isCreating || isUploadingPhoto ? (
                <CircularProgress size={24} color='inherit' />
              ) : (
                'СОХРАНИТЬ'
              )}
            </Button>

            <Button variant='outlined' fullWidth onClick={onClose}>
              ОТМЕНА
            </Button>
          </Box>
        </Box>
      </Box>
    </ModalWrapper>
  );
};
